"use client";

import React, { useState, useRef } from 'react';
import {
  SendHorizontal,
  Paperclip,
  Mic,
  Keyboard,
  PhoneOff,
  Phone,
} from 'lucide-react';

export default function ChatInput({
  onSendMessage,
  activeMode,
  setActiveMode,
  voiceStatus,
  voiceError,
  onToggleVoiceChat,
  connectionStatus,
}) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeMode === 'voice' || !text.trim()) return;
    onSendMessage({ type: 'text', content: text });
    setText('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onSendMessage({
      type: 'file',
      name: file.name,
      size: file.size,
      file: file,
    });

    e.target.value = '';
  };

  const isVoiceActive =
    voiceStatus === 'connected' ||
    voiceStatus === 'connecting' ||
    voiceStatus === 'requesting';

  const getVoiceButtonIcon = () => {
    // When a call is active, show end-call icon
    if (isVoiceActive) return <PhoneOff className="w-4 h-4" />;
    // In voice mode but idle, show keyboard to go back to chat
    if (activeMode === 'voice') return <Keyboard className="w-4 h-4" />;
    // In chat mode, show mic to switch to voice
    return <Mic className="w-4 h-4" />;
  };

  const getVoiceButtonTitle = () => {
    if (voiceStatus === 'connected') return 'End voice call';
    if (voiceStatus === 'connecting' || voiceStatus === 'requesting')
      return 'Connecting...';
    return 'Switch to Mic Layout';
  };

  const getVoiceModeDisplay = () => {
    // Idle voice mode — show a start button
    if (voiceStatus === 'idle') {
      return (
        <div className="flex-1 flex items-center justify-center gap-3 px-2">
          <span className="text-xs text-gray-400">Voice mode ready</span>
          <button
            type="button"
            onClick={onToggleVoiceChat}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Phone className="w-3.5 h-3.5" />
            Start Voice Chat
          </button>
        </div>
      );
    }

    // Requesting/Connecting
    if (voiceStatus === 'requesting' || voiceStatus === 'connecting') {
      return (
        <div className="flex-1 flex items-center gap-3 px-2">
          <span className="text-xs text-primary font-semibold tracking-wide animate-pulse">
            {voiceStatus === 'requesting'
              ? 'Requesting voice session...'
              : 'Connecting to voice AI...'}
          </span>
          <div className="flex items-center gap-1 h-4">
            <span className="w-0.5 h-3.5 bg-primary/70 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-0.5 h-5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-0.5 h-4 bg-primary/80 rounded-full animate-bounce [animation-delay:-0.45s]" />
            <span className="w-0.5 h-2.5 bg-primary/60 rounded-full animate-bounce" />
          </div>
        </div>
      );
    }

    // Connected — show active call status
    if (voiceStatus === 'connected') {
      return (
        <div className="flex-1 flex items-center gap-3 px-2">
          <span className="text-xs text-emerald-600 font-semibold tracking-wide animate-pulse">
            Voice call active — speak freely
          </span>
          <div className="flex items-center gap-1 h-4">
            <span className="w-0.5 h-3.5 bg-emerald-400/70 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-0.5 h-5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-0.5 h-4 bg-emerald-400/80 rounded-full animate-bounce [animation-delay:-0.45s]" />
            <span className="w-0.5 h-2.5 bg-emerald-400/60 rounded-full animate-bounce" />
          </div>
        </div>
      );
    }

    // Error state
    if (voiceStatus === 'error') {
      return (
        <div className="flex-1 flex items-center gap-3 px-2">
          <span className="text-xs text-red-500 font-semibold">
            Voice call failed
          </span>
          {voiceError && (
            <span className="text-[10px] text-red-400 ml-1 max-w-[180px] truncate">
              {voiceError}
            </span>
          )}
          <button
            type="button"
            onClick={onToggleVoiceChat}
            className="inline-flex items-center gap-1 px-3 py-1 border border-red-300 text-red-600 text-xs font-semibold rounded-lg hover:bg-red-50 transition"
          >
            Retry
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300">
        {/* Attach file button */}
        <label className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <Paperclip className="w-4 h-4" />
          <input
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt,image/*"
            onChange={handleFileChange}
          />
        </label>

        {/* ─── CHAT MODE: text input ─────────────────────────────── */}
        {activeMode === 'chat' && (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              connectionStatus === 'connected'
                ? 'Type your message . . .'
                : connectionStatus === 'connecting'
                ? 'Connecting to tutor...'
                : 'Type your message . . .'
            }
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 focus:ring-0"
            disabled={connectionStatus === 'connecting'}
          />
        )}

        {/* ─── VOICE MODE: status / start button ─────────────────── */}
        {activeMode === 'voice' && getVoiceModeDisplay()}

        {/* Action buttons */}
        <div className="flex items-center gap-1 pl-1 border-l border-gray-200/60">
          {/* Voice toggle button */}
          <button
            type="button"
            onClick={() => {
              if (isVoiceActive) {
                // During an active call -> end it and remain in voice mode
                onToggleVoiceChat();
              } else if (activeMode === 'voice') {
                // In voice mode but idle -> go back to chat
                setActiveMode('chat');
              } else {
                // In chat mode -> switch to voice mode (show start button)
                setActiveMode('voice');
              }
            }}
            className={`p-2 rounded-xl transition flex items-center justify-center ${
              isVoiceActive
                ? 'bg-red-50 text-red-500 hover:bg-red-100'
                : activeMode === 'voice'
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
            title={getVoiceButtonTitle()}
          >
            {getVoiceButtonIcon()}
          </button>

          {/* Send button (chat mode only) */}
          {activeMode === 'chat' && (
            <button
              type="submit"
              className="p-2 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-sm transition disabled:opacity-40 flex items-center justify-center"
              disabled={!text.trim() || connectionStatus === 'connecting'}
            >
              <SendHorizontal className="w-3.5 h-3.5" />
            </button>
          )}

          {/* End-call button (voice mode, active call) */}
          {activeMode === 'voice' && voiceStatus === 'connected' && (
            <button
              type="button"
              onClick={() => {
                onToggleVoiceChat();
                setActiveMode('chat');
              }}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm transition flex items-center justify-center"
              title="End call and return to chat"
            >
              <PhoneOff className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
