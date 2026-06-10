"use client";

import React, { useState } from 'react';
import Toolbar from './toolbar';
import ChatWindow from './chat-window';
import ChatInput from './chat-input';

export default function TutorChat() {
  const [activeMode, setActiveMode] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
      text: 'Lets study Explain ABG interpretation step by step. Explain this topic in a way that helps with NCLEX, including key nursing actions, mnemonics, and important values.'
    },
    {
      id: 2,
      sender: 'tutor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100',
      text: 'Lets study Explain ABG interpretation step by step. Explain this topic in a way that helps with NCLEX,',
      timestamp: 'Thursday, April 16'
    }
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
      text: text
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 md:p-6 flex flex-col h-[calc(100vh-100px)] overflow-hidden">
      {/* Page Header */}
      <header className="flex-shrink-0 mb-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Welcome, Tonny!</h1>
        <p className="text-xs text-gray-500 mt-0.5">My Tutor / Conversation</p>
      </header>

      {/* 
        FIX: Changing items-stretch to xl:items-start stops the toolbar 
        from matching the full height of the chat box.
      */}
      <div className="flex flex-col xl:flex-row gap-6 items-stretch xl:items-start flex-1 h-full min-h-0 w-full overflow-hidden">
        
        {/* Responsive Toolbar Component */}
        <Toolbar activeMode={activeMode} setActiveMode={setActiveMode} />

        {/* Chat Area Panel (This will still safely stretch full-height) */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden flex-1 w-full h-full min-h-0 xl:self-stretch">
          <ChatWindow messages={messages} activeMode={activeMode} />
          <ChatInput onSendMessage={handleSendMessage} activeMode={activeMode} setActiveMode={setActiveMode} />
        </div>

      </div>
    </div>
  );
}