"use client";

import Image from 'next/image';
import React, { useRef, useEffect } from 'react';

export default function ChatWindow({
  messages,
  connectionStatus,
  isStreaming,
  streamingText,
}) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

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
            className={`flex gap-3 max-w-3xl ${
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

            <div className="space-y-1">
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
