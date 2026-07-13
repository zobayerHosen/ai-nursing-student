// ============================================================
//  Header - App header with map title editor and action buttons
//  Contains: title input, My Maps button, Share, Export PDF
// ============================================================

'use client';

import React from 'react';
import { GitFork, Sparkles } from 'lucide-react';

export default function Header({
  mapTitle,
  onTitleChange,
  onHistoryOpen,
  onShareOpen,
  onExport,
  nodeCount,
  edgeCount,
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-3">
      <div className="flex items-center justify-between max-w-full mx-auto">
        {/* Left: Logo + Title Editor */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-indigo-500/20 flex-none">
            <GitFork className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <input
                id="mapTitle"
                value={mapTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                className="bg-transparent outline-none text-sm font-semibold border-b border-transparent
                           focus:border-rose-500 transition-colors pb-0.5 min-w-[160px] w-full text-slate-800
                           placeholder-slate-400"
                placeholder="Untitled Concept Map"
              />
            </div>
            <p className="text-[10px] text-slate-500 flex items-center gap-1.5 font-mono mt-0.5">
              <Sparkles className="w-3 h-3 text-rose-500" />
              STEMRN · AI-Guided Concept Map
            </p>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 flex-none">
          {/* Node/edge stats */}
          <div className="hidden sm:flex items-center gap-3 mr-3 text-xs text-slate-500 font-mono">
            <span>{nodeCount} nodes</span>
            <span className="text-slate-300">·</span>
            <span>{edgeCount} links</span>
          </div>

          {/* My Maps */}
          <button
            onClick={onHistoryOpen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                       border border-slate-200 bg-white text-slate-600
                       hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5M12 7v5l3 3" />
            </svg>
            My Maps
          </button>

          {/* Share */}
          <button
            onClick={onShareOpen}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                       border border-slate-200 bg-white text-slate-600
                       hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
            </svg>
            Share
          </button>

          {/* Export PDF */}
          <button
            onClick={onExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                       bg-rose-600 text-white border border-rose-600
                       hover:bg-rose-500 transition-all shadow-md shadow-rose-600/10 cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </header>
  );
}
