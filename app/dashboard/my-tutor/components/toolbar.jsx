import React from 'react';
import { MessageSquare, Volume2 } from 'lucide-react';

export default function Toolbar({ activeMode, setActiveMode }) {
  return (
    <div className="w-full xl:w-72 bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col sm:flex-row xl:flex-col sm:items-center xl:items-start sm:justify-between xl:justify-start gap-4 select-none flex-shrink-0">
      
      <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto xl:w-full xl:border-b xl:border-gray-100 xl:pb-4 flex-shrink-0">
        <div className="relative flex-shrink-0">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100" 
            alt="Cara" 
            className="w-10 h-10 rounded-full object-cover border border-gray-100/80"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>
        
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 tracking-tight leading-snug truncate">
            I&apos;m Cara
          </h4>
          <p className="text-xs text-emerald-600 font-medium tracking-wide flex items-center gap-1 truncate">
            Online <span className="text-gray-300">•</span> Always ready
          </p>
        </div>
      </div>

      <div className="flex w-full sm:w-auto xl:w-full bg-gray-100/70 p-1 rounded-xl items-center gap-1 border border-gray-200/20 backdrop-blur-sm flex-shrink-0 sm:flex-row xl:flex-col">
        <button 
          type="button" 
          onClick={() => setActiveMode('chat')}
          className={`cursor-pointer flex flex-1 sm:flex-initial xl:w-full items-center justify-center xl:justify-start gap-2 px-3 sm:px-4 py-3 sm:py-2 text-xs font-semibold rounded-lg transition-all duration-300 subpixel-antialiased tracking-wide whitespace-nowrap ${
            activeMode === 'chat' 
              ? 'bg-primary text-white shadow-[0_2px_10px_rgba(29,78,216,0.15)]' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Chat Mode</span>
        </button>

        <button 
          type="button" 
          onClick={() => setActiveMode('voice')}
          className={`cursor-pointer flex flex-1 sm:flex-initial xl:w-full items-center justify-center xl:justify-start gap-2 px-3 sm:px-4 py-3 sm:py-2 text-xs font-semibold rounded-lg transition-all duration-300 subpixel-antialiased tracking-wide whitespace-nowrap ${
            activeMode === 'voice' 
              ? 'bg-primary text-white shadow-[0_2px_10px_rgba(29,78,216,0.15)]' 
              : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'
          }`}
        >
          <Volume2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Voice Mode</span>
        </button>
      </div>

    </div>
  );
}