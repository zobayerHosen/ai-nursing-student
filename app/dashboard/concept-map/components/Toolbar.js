// ============================================================
//  Toolbar - Canvas toolbar with node/link tools, undo/redo,
//  zoom controls, save, and print
// ============================================================

'use client';

import React from 'react';

export default function Toolbar({
  onSelect,
  onAdd,
  onLink,
  onEdit,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onFit,
  onSave,
  onPrint,
  zoomLevel,
  nodeCount,
  edgeCount,
  activeTool, // 'select' | 'add' | 'link'
}) {
  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-slate-200 bg-white/80 backdrop-blur-sm flex-wrap">
      {/* Select / Pointer */}
      <ToolbarButton
        active={activeTool === 'select'}
        onClick={onSelect}
        title="Select / Pan (V)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          <path d="M13 13l6 6" />
        </svg>
      </ToolbarButton>

      {/* Add Node */}
      <ToolbarButton
        active={activeTool === 'add'}
        onClick={onAdd}
        title="Add Node (A)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
          <path d="M12 7v3M12 10l-5.5 7M12 10l5.5 7" />
        </svg>
      </ToolbarButton>

      {/* Link / Connect */}
      <ToolbarButton
        active={activeTool === 'link'}
        onClick={onLink}
        title="Connect Nodes (L)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </ToolbarButton>

      {/* Edit selected node */}
      <ToolbarButton
        onClick={onEdit}
        title="Edit selected node (E)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
      </ToolbarButton>

      <div className="w-px h-5 mx-1.5 bg-slate-200" />

      {/* Undo */}
      <ToolbarButton onClick={onUndo} title="Undo (Ctrl+Z)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 14L4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H10" />
        </svg>
      </ToolbarButton>

      {/* Redo */}
      <ToolbarButton onClick={onRedo} title="Redo (Ctrl+Y)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14l5-5-5-5" />
          <path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H14" />
        </svg>
      </ToolbarButton>

      <div className="w-px h-5 mx-1.5 bg-slate-200" />

      {/* Zoom In */}
      <ToolbarButton onClick={onZoomIn} title="Zoom In">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
        </svg>
      </ToolbarButton>

      {/* Zoom Out */}
      <ToolbarButton onClick={onZoomOut} title="Zoom Out">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3M8 11h6" />
        </svg>
      </ToolbarButton>

      {/* Fit to View */}
      <ToolbarButton onClick={onFit} title="Fit to View">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8V5a2 2 0 0 1 2-2h3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M21 16v3a2 2 0 0 1-2 2h-3" />
        </svg>
      </ToolbarButton>

      <div className="w-px h-5 mx-1.5 bg-slate-200" />

      {/* Save */}
      <ToolbarButton onClick={onSave} title="Save (Ctrl+S)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <path d="M17 21v-8H7v8M7 3v5h8" />
        </svg>
      </ToolbarButton>

      {/* Print */}
      <ToolbarButton onClick={onPrint} title="Print (Ctrl+P)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" rx="1" />
        </svg>
      </ToolbarButton>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Stats */}
      <div className="text-xs text-slate-500 flex items-center gap-2 font-mono">
        <span>{zoomLevel}</span>
        <span className="text-slate-300">·</span>
        <span>{nodeCount} nodes</span>
        <span className="text-slate-300">·</span>
        <span>{edgeCount} links</span>
      </div>
    </div>
  );
}

/** Small toolbar button component */
function ToolbarButton({ active, onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        w-8 h-8 rounded-lg inline-flex items-center justify-center transition-all duration-150 cursor-pointer
        ${active
          ? 'bg-[#2C5F8D] text-white shadow-sm'
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
        }
      `}
    >
      {children}
    </button>
  );
}
