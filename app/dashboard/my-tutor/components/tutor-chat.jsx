"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Toolbar from './toolbar';
import ChatWindow from './chat-window';
import ChatInput from './chat-input';
import { useTutorChat, useGetVoiceSession } from '@/hooks/interactive-tools';
import { useGetUser } from '@/hooks';

// Avatar Constants
const TUTOR_AVATAR = '/images/ai-tutor-avatar.png';

// ─── Local chat history helpers ────────────────────────────────────
// The conversation is mirrored into localStorage so it survives a
// browser reload, and merged with any server-side history.

const CHAT_LOG_KEY = 'mytutor_chat_log_v1';

function readLocalChatLog() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CHAT_LOG_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn('Could not read local tutor chat log:', error);
    return [];
  }
}

function writeLocalChatLog(messages) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHAT_LOG_KEY, JSON.stringify(messages));
  } catch (error) {
    console.warn('Could not save local tutor chat log:', error);
  }
}

// Normalize server message content (may be an array of content blocks)
function normalizeContent(content) {
  if (Array.isArray(content)) {
    const parts = content
      .map((block) => {
        if (block && typeof block === 'object' && block.type === 'text') {
          return block.text || '';
        }
        if (
          block &&
          typeof block === 'object' &&
          block.type === 'image_url'
        ) {
          return '[Image attachment]';
        }
        return '';
      })
      .filter(Boolean);
    return parts.join('\n') || '[Attachment]';
  }
  return content || '';
}

function formatTime(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

// Ephemeral Key Extraction

function extractEphemeralKey(responseData) {
  if (!responseData) return null;
  if (responseData?.data?.value) return responseData.data.value;
  if (responseData?.client_secret?.value) return responseData.client_secret.value;
  if (responseData?.value) return responseData.value;
  return responseData?.ephemeral_key || null;
}

// Component

export default function TutorChat() {
  const { user } = useGetUser()
  // UI state
  const [activeMode, setActiveMode] = useState('chat');
  const [messages, setMessages] = useState([]);

  // Voice state
  const [voiceStatus, setVoiceStatus] = useState('idle'); // idle | requesting | connecting | connected | error
  const [voiceError, setVoiceError] = useState('');
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const audioElRef = useRef(null);

  const { getVoiceSession, isPending: voiceSessionPending } =
    useGetVoiceSession();

  // Load persisted chat history from localStorage on mount
  useEffect(() => {
    const localMessages = readLocalChatLog();
    if (localMessages.length) {
      setMessages((prev) => {
        // Avoid clobbering any messages that arrived before this effect ran
        if (prev.length) return prev;
        return localMessages.map((m, i) => ({
          id: `local-${m.created_at || Date.now()}-${i}`,
          sender: m.sender === 'user' ? 'user' : 'tutor',
          avatar: m.sender === 'user' ? user?.profile_photo : TUTOR_AVATAR,
          text: m.content || m.text || '',
          file: m.file || null,
          created_at: m.created_at || '',
          timestamp: formatTime(m.created_at) || m.timestamp || '',
        }));
      });
    }
  }, []);

  // When streaming completes, append the tutor's full message
  const handleChatComplete = useCallback((finalText) => {
    if (!finalText) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'tutor',
        avatar: TUTOR_AVATAR,
        text: finalText,
        file: null,
        created_at: new Date().toISOString(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  }, []);

  // Merge server-side chat history with the current (local) messages,
  // deduplicating by sender + content + timestamp.
  const handleChatHistory = useCallback((serverMessages = []) => {
    if (!Array.isArray(serverMessages) || !serverMessages.length) return;

    setMessages((prev) => {
      const merged = [...prev];
      // Dedupe on sender + text so local & server copies of the same
      // message collide even when their timestamps differ (client vs
      // server clock skew) — avoids duplicate bubbles on reload.
      const seenKeys = new Set(
        merged.map((m) => `${m.sender}|${m.text}`)
      );

      serverMessages.forEach((raw, i) => {
        const sender = raw.role === 'user' ? 'user' : 'tutor';
        const text = normalizeContent(raw.content);
        if (!text) return;
        const key = `${sender}|${text}`;
        if (seenKeys.has(key)) return;
        seenKeys.add(key);
        const createdAt = raw.created_at || '';
        merged.push({
          id: `server-${createdAt || Date.now()}-${i}`,
          sender,
          avatar: sender === 'user' ? user?.profile_photo : TUTOR_AVATAR,
          text,
          file: null,
          created_at: createdAt,
          timestamp: formatTime(createdAt),
        });
      });

      return merged;
    });
  }, []);

  const {
    sendMessage: wsSendMessage,
    sendFile: wsSendFile,
    connectionStatus,
    isStreaming,
    streamingText,
  } = useTutorChat({
    autoConnect: true,
    onChatComplete: handleChatComplete,
    onChatHistory: handleChatHistory,
  });

  //  Send message handler (text and/or file)
  const handleSendMessage = useCallback(
    async ({ content, file }) => {
      const text = (content || '').trim();

      if (!text && !file) return;

      // Optimistically add user message (with file info if attached)
      const nowIso = new Date().toISOString();

      // Build file metadata with persistent base64 preview for images
      let fileMeta = null;
      if (file) {
        const isImage = file.type?.startsWith('image/');
        let previewUrl = null;

        if (isImage) {
          // Convert to base64 data URL so it survives page reloads
          previewUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          });
        }

        fileMeta = {
          name: file.name,
          type: file.type || 'file',
          previewUrl,
        };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'user',
          avatar: user?.profile_photo,
          text,
          file: fileMeta,
          created_at: nowIso,
          timestamp: formatTime(nowIso),
        },
      ]);

      try {
        if (file) {
          // AI reads the file and responds to the optional prompt
          await wsSendFile({ file, text });
        } else if (text) {
          const sent = await wsSendMessage({ text });
          if (!sent) {
            console.warn('[TutorChat] Message failed to send');
          }
        }
      } catch (err) {
        console.error('[TutorChat] Failed to send message:', err);
      }
    },
    [wsSendMessage, wsSendFile]
  );

  // Persist the conversation to localStorage whenever it changes
  useEffect(() => {
    if (!messages.length) return;
    writeLocalChatLog(
      messages.map((m) => ({
        sender: m.sender,
        content: m.text,
        created_at: m.created_at || new Date().toISOString(),
        file: m.file || null,
        timestamp: m.timestamp || '',
      }))
    );
  }, [messages]);

  // WebRTC Voice Call
  const stopVoiceChat = useCallback(() => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    if (audioElRef.current) {
      audioElRef.current.remove();
      audioElRef.current = null;
    }
    if (voiceStatus !== 'error') {
      setVoiceStatus('idle');
    }
  }, [voiceStatus]);

  const startVoiceChat = useCallback(async () => {
    setVoiceStatus('requesting');
    setVoiceError('');

    try {
      // 1. Get ephemeral session key from backend
      const sessionData = await getVoiceSession();
      const ephemeralKey = extractEphemeralKey(sessionData);

      if (!ephemeralKey) {
        throw new Error('Could not obtain voice session token from server');
      }

      setVoiceStatus('connecting');

      // 2. Set up RTCPeerConnection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // 3. Handle incoming audio track from AI
      const audioEl = document.createElement('audio');
      audioEl.autoplay = true;
      audioElRef.current = audioEl;

      pc.ontrack = (event) => {
        audioEl.srcObject = event.streams[0];
        document.body.appendChild(audioEl);
      };

      // 4. Get local microphone
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localStreamRef.current = stream;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      // 5. Create WebRTC offer SDP
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // 6. Send SDP to OpenAI Realtime API
      const sdpResponse = await fetch(
        'https://api.openai.com/v1/realtime/calls',
        {
          method: 'POST',
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${ephemeralKey}`,
            'Content-Type': 'application/sdp',
          },
        }
      );

      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        throw new Error(`OpenAI SDP handshake failed: ${errorText}`);
      }

      const answerSdp = await sdpResponse.text();
      await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

      setVoiceStatus('connected');
    } catch (err) {
      console.error('Voice chat error:', err);
      setVoiceStatus('error');
      setVoiceError(err.message || 'Voice call failed');
      // Clean up WebRTC resources without resetting status to 'idle'
      if (pcRef.current) {
        pcRef.current.close();
        pcRef.current = null;
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;
      }
      if (audioElRef.current) {
        audioElRef.current.remove();
        audioElRef.current = null;
      }
    }
  }, [getVoiceSession]);

  const toggleVoiceChat = useCallback(() => {
    if (
      voiceStatus === 'connected' ||
      voiceStatus === 'connecting' ||
      voiceStatus === 'requesting'
    ) {
      stopVoiceChat();
    } else {
      startVoiceChat();
    }
  }, [voiceStatus, startVoiceChat, stopVoiceChat]);

  // Render

  return (
    <div className="w-full mx-auto p-4 md:p-6 flex flex-col h-[calc(100vh-60px)] overflow-hidden">
      {/* Page Header */}
      {/* <header className="shrink-0 mb-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Welcome, Tonny!
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">My Tutor / Conversation</p>
      </header> */}

      <div className="flex flex-col xl:flex-row gap-6 items-stretch xl:items-start flex-1 h-full min-h-0 w-full overflow-hidden">
        {/* Toolbar */}
        <Toolbar activeMode={activeMode} setActiveMode={setActiveMode} connectionStatus={connectionStatus} />

        {/* Chat Area */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden flex-1 w-full h-full min-h-0 xl:self-stretch">
          <ChatWindow
            messages={messages}
            activeMode={activeMode}
            connectionStatus={connectionStatus}
            isStreaming={isStreaming}
            streamingText={streamingText}
            voiceStatus={voiceStatus}
            voiceError={voiceError}
            onToggleVoiceChat={toggleVoiceChat}
          />
          {activeMode === 'chat' && (
            <ChatInput
              onSendMessage={handleSendMessage}
              activeMode={activeMode}
              setActiveMode={setActiveMode}
              voiceStatus={voiceStatus}
              voiceError={voiceError}
              onToggleVoiceChat={toggleVoiceChat}
              connectionStatus={connectionStatus}
              isStreaming={isStreaming}
            />
          )}
        </div>
      </div>
    </div>
  );
}
