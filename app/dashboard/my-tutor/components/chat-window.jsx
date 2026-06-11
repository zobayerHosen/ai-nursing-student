import React from 'react';

export default function ChatWindow({ messages }) {
  return (

    <div className="flex-1 h-full overflow-y-auto p-4 md:p-6 space-y-6 min-h-0 bg-white">
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        return (
          <div key={msg.id} className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
            <img 
              src={msg.avatar} 
              alt={msg.sender} 
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
            />
            
            <div className="space-y-1">
              <div className={`rounded-2xl p-4 text-sm leading-relaxed shadow-sm ${
                isUser 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-gray-50 text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
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

      {/* Typing Bubble State */}
      <div className="flex gap-3 max-w-3xl mr-auto">
        <img 
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100" 
          alt="Cara" 
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
}