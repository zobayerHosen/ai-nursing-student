// ============================================================
//  LeftSidebar - Tabbed left sidebar with AI Guided chat and
//  Add Node palette with legend
// ============================================================

'use client';

import React, { useState } from 'react';
import ChatPanel from './ChatPanel';
import { NODE_TYPES } from '@/lib/concept-map/constants';

const LEGEND_ITEMS = [
  { label: 'Subjective', color: '#F0F7FC', border: '#D0E0EE' },
  { label: 'Objective', color: '#EEF4FA', border: '#C5D9EB' },
  { label: 'Nursing Dx', color: '#FFE8ED', border: '#FBC4CE' },
  { label: 'Intervention', color: '#FFF5E6', border: '#FBDFB0' },
  { label: 'Outcome', color: '#E8F8EE', border: '#B8E4C9' },
  { label: 'Risk Factor', color: '#F3EEF9', border: '#D6C7EA' },
  { label: 'Complication', color: '#FDE7E7', border: '#F5B8B8' },
  { label: 'Medication', color: '#E3F2FD', border: '#90CAF9' },
];

export default function LeftSidebar({
  onGenerateMap,
  onRefineMap,
  currentMap,
  caraHasGenerated,
  onAddNode,
}) {
  const [activeTab, setActiveTab] = useState('guided');
  const [activeTool, setActiveTool] = useState('select');

  /**
   * Handle adding a node from the palette.
   */
  const handlePaletteClick = (nodeType) => {
    onAddNode(nodeType);
  };

  return (
    <aside className="w-[300px] flex-none flex flex-col border-r border-slate-200 bg-white min-h-0 relative z-20">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 flex-none">
        <TabButton
          label="AI Guided"
          active={activeTab === 'guided'}
          onClick={() => setActiveTab('guided')}
        />
        <TabButton
          label="Add Node"
          active={activeTab === 'nodes'}
          onClick={() => setActiveTab('nodes')}
        />
      </div>

      {/* AI Guided Tab */}
      {activeTab === 'guided' && (
        <div className="flex-1 flex flex-col min-h-0">
          <ChatPanel
            onGenerateMap={onGenerateMap}
            onRefineMap={onRefineMap}
            currentMap={currentMap}
            caraHasGenerated={caraHasGenerated}
          />
        </div>
      )}

      {/* Add Node Tab */}
      {activeTab === 'nodes' && (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Node Palette */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-slate-400">
              Click a type, then click the canvas
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {Object.entries(NODE_TYPES).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => handlePaletteClick(key)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50
                             text-xs font-semibold text-slate-700 hover:border-rose-500/50 hover:bg-[#2C5F8D]/5
                             hover:text-[#2C5F8D] transition-all text-left w-full cursor-pointer"
                >
                  <span
                    className="w-3 h-3 rounded-sm flex-none"
                    style={{ background: cfg.color, border: `1px solid ${cfg.border}` }}
                  />
                  <span>{cfg.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Map Style selector */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-slate-400">
              Map Style
            </div>
            <select
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700
                         focus:outline-none focus:border-[#2C5F8D] cursor-pointer"
            >
              <option value="spider">Spider (Radial)</option>
              <option value="hierarchical">Hierarchical</option>
              <option value="flowchart">Flowchart (Sequential)</option>
            </select>
          </div>

          {/* Legend */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-slate-400">
              Legend
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {LEGEND_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-[11px] text-slate-600">
                  <span
                    className="w-3 h-3 rounded-sm flex-none"
                    style={{ background: item.color, border: `1px solid ${item.border}` }}
                  />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

/** Tab button component */
function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
        active
          ? 'text-[#2C5F8D] border-b-2 border-[#2C5F8D] bg-slate-50/50'
          : 'text-slate-500 border-b-2 border-transparent hover:text-slate-800 hover:bg-slate-50/20'
      }`}
    >
      {label}
    </button>
  );
}
