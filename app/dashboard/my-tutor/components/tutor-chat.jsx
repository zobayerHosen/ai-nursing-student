"use client";

import React, { useState, useCallback, useRef } from 'react';
import Toolbar from './toolbar';
import ChatWindow from './chat-window';
import ChatInput from './chat-input';
import { useTutorChat, useGetVoiceSession } from '@/hooks/interactive-tools';

// Avatar Constants 

const USER_AVATAR =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100';
const TUTOR_AVATAR =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100';

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

  // When streaming completes, append the tutor's full message
  const handleChatComplete = useCallback((finalText) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'tutor',
        avatar: TUTOR_AVATAR,
        text: finalText,
      },
    ]);
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
  });

  //  Send message handler
  const handleSendMessage = useCallback(
    async ({ type, content, file }) => {
      if (type === 'text' && content) {
        // Optimistically add user message
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'user',
            avatar: USER_AVATAR,
            text: content,
          },
        ]);

        const sent = await wsSendMessage({ text: content });
        if (!sent) {
          console.warn('[TutorChat] Message failed to send');
        }
      } else if (type === 'file' && file) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'user',
            avatar: USER_AVATAR,
            text: `[Attached File: ${file.name}]`,
          },
        ]);
        try {
          await wsSendFile({ file, text: '' });
        } catch (err) {
          console.error('Failed to send file:', err);
        }
      }
    },
    [wsSendMessage, wsSendFile]
  );

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
    <div className="w-full mx-auto p-4 md:p-6 flex flex-col h-[calc(100vh-100px)] overflow-hidden">
      {/* Page Header */}
      <header className="shrink-0 mb-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          Welcome, Tonny!
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">My Tutor / Conversation</p>
      </header>

      <div className="flex flex-col xl:flex-row gap-6 items-stretch xl:items-start flex-1 h-full min-h-0 w-full overflow-hidden">
        {/* Toolbar */}
        <Toolbar activeMode={activeMode} setActiveMode={setActiveMode} />

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
