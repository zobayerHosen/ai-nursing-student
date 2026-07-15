"use client";

import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import { Mic, PhoneOff, Volume2, Loader2 } from 'lucide-react';

export default function ChatWindow({
  messages,
  connectionStatus,
  isStreaming,
  streamingText,
  activeMode,
  voiceStatus,
  voiceError,
  onToggleVoiceChat,
}) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Voice mode UI — shown when activeMode is 'voice'
  const isVoiceActive =
    voiceStatus === 'connected' ||
    voiceStatus === 'connecting' ||
    voiceStatus === 'requesting';

  if (activeMode === 'voice') {
    return (
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-6 bg-white flex flex-col min-h-0">
        {/* IDLE — show Tap to Speak */}
        {voiceStatus === 'idle' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/10 to-blue-100 flex items-center justify-center mb-6 shadow-lg shadow-primary/5">
              <Volume2 className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Voice Mode Ready
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mb-8">
              Tap the button below and start speaking. I&apos;ll listen and
              respond to your medical questions in real time.
            </p>

            <button
              type="button"
              onClick={onToggleVoiceChat}
              className="group relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-primary to-blue-600 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {/* Ripple rings */}
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-20 group-hover:opacity-30" />
              <span className="absolute inset-2 rounded-full bg-primary/10 animate-ping opacity-10 group-hover:opacity-20 [animation-delay:0.3s]" />

              <Mic className="w-10 h-10 relative z-10 group-hover:scale-110 transition-transform" />
            </button>

            <p className="text-xs text-gray-400 mt-5 font-medium tracking-wide">
              Tap to speak
            </p>

            <div className="flex items-center gap-1.5 mt-8 px-4 py-2 bg-amber-50 rounded-xl border border-amber-100">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <p className="text-[11px] text-amber-700 font-medium">
                Microphone access will be requested when you tap
              </p>
            </div>
          </div>
        )}

        {/* REQUESTING / CONNECTING */}
        {(voiceStatus === 'requesting' || voiceStatus === 'connecting') && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative w-28 h-28 flex items-center justify-center mb-6">
              {/* Outer spinning arc */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
              <div className="absolute inset-3 rounded-full border-4 border-transparent border-r-primary/60 animate-spin [animation-delay:-0.15s] [animation-duration:1.5s]" />

              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-7 h-7 text-primary animate-spin" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-2">
              {voiceStatus === 'requesting'
                ? 'Setting up your session...'
                : 'Connecting to voice AI...'}
            </h2>
            <p className="text-sm text-gray-500 max-w-xs mb-6">
              {voiceStatus === 'requesting'
                ? 'We\'re preparing your personalized tutor session.'
                : 'Establishing a secure real-time audio connection.'}
            </p>

            {/* Audio visualizer bars */}
            <div className="flex items-center gap-1 h-8 mb-4">
              {[1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-primary/40 rounded-full animate-bounce"
                  style={{
                    height: `${h * 5 + 8}px`,
                    animationDelay: `${i * 0.08}s`,
                    animationDuration: '0.6s',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onToggleVoiceChat}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 transition"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              Cancel
            </button>
          </div>
        )}

        {/* CONNECTED — speak freely */}
        {voiceStatus === 'connected' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              {/* Live audio visualization */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping" />
              <div className="absolute inset-4 rounded-full bg-emerald-500/10 animate-ping [animation-delay:0.5s]" />
              <div className="absolute inset-8 rounded-full bg-emerald-500/20 animate-ping [animation-delay:1s]" />

              {/* Center mic */}
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary/50 to-primary flex items-center justify-center shadow-xl shadow-emerald-500/30">
                <Mic className="w-9 h-9 text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Listening...
            </h2>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
              I&apos;m all ears — go ahead and ask your question clearly.
            </p>

            {/* Live waveform — stable preset heights for smooth visual */}
            <div className="flex items-center gap-0.75 h-12 mb-6">
              {(() => {
                // Pre-compute stable waveform heights
                const heights = Array.from({ length: 32 }, (_, i) => {
                  const base = Math.sin(i * 0.4) * 0.5 + 0.5; // 0..1 sine wave
                  const jitter = Math.sin(i * 1.7) * 0.2 + 0.3; // secondary variation
                  return Math.round((base * 0.6 + jitter * 0.4) * 32 + 8);
                });
                const durations = Array.from({ length: 32 }, (_, i) =>
                  (Math.sin(i * 0.9) * 0.15 + 0.45).toFixed(2)
                );
                return heights.map((h, i) => (
                  <span
                    key={i}
                    className="w-0.75 bg-linear-to-t from-primary/50 to-primary rounded-full animate-pulse"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 0.04}s`,
                      animationDuration: `${durations[i]}s`,
                    }}
                  />
                ));
              })()}
            </div>

            <button
              type="button"
              onClick={onToggleVoiceChat}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30"
            >
              <PhoneOff className="w-4 h-4" />
              End Voice Call
            </button>
          </div>
        )}

        {/* ERROR state */}
        {voiceStatus === 'error' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mb-5">
              <PhoneOff className="w-8 h-8 text-red-500" />
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Connection Failed
            </h2>
            <p className="text-sm text-gray-500 max-w-xs mb-2">
              Unable to start the voice session.
            </p>
            {voiceError && (
              <p className="text-xs text-red-500 max-w-xs mb-6 bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                {voiceError}
              </p>
            )}
            {!voiceError && (
              <p className="text-xs text-gray-400 max-w-xs mb-6">
                Please check your microphone permissions and try again.
              </p>
            )}

            <button
              type="button"
              onClick={onToggleVoiceChat}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl transition-all duration-200 shadow-sm"
            >
              <Mic className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    );
  }

  // CHAT MODE UI (existing)
  return (
    <div className="flex-1 h-full overflow-y-auto p-4 md:p-6 space-y-6 min-h-0 bg-white">
      {/* Empty state */}
      {messages.length === 0 && !isStreaming && (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-3xl">💬</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs">
            Start a conversation with{' '}
            <span className="font-semibold text-primary">Cara</span>, your AI
            medical tutor. Ask any NCLEX, MBBS, or nursing question.
          </p>
          {connectionStatus === 'disconnected' && (
            <p className="text-xs text-amber-500 mt-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Reconnecting to tutor service...
            </p>
          )}
        </div>
      )}

      {/* Message bubbles */}
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        return (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-xl ${
              isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <Image
              src={msg.avatar}
              alt={msg.sender}
              width={40}
              height={40}
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />

            <div className="space-y-1 max-w-[85%]">
              <div
                className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
              {msg.timestamp && (
                <p className="text-[10px] text-gray-400 text-center w-full block py-2">
                  {msg.timestamp}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Live streaming bubble (tutor typing) */}
      {isStreaming && streamingText && (
        <div className="flex gap-3 max-w-3xl mr-auto">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100"
            alt="Cara"
            width={40}
            height={40}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <div className="space-y-1">
            <div className="rounded-2xl rounded-tl-none p-4 text-sm leading-relaxed bg-gray-50 text-gray-800 border border-gray-100 shadow-sm">
              {streamingText}
              <span className="inline-block w-1.5 h-4 bg-primary/70 rounded-sm ml-0.5 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Typing dots (waiting for first chunk) */}
      {isStreaming && !streamingText && (
        <div className="flex gap-3 max-w-3xl mr-auto">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100"
            alt="Cara"
            width={40}
            height={40}
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} />
    </div>
  );
}
