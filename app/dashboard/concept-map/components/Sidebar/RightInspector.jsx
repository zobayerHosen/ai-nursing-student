// ============================================================
//  RightInspector - Right sidebar panel for inspecting and
//  editing selected nodes. Shows node details, hierarchy,
//  and inline editing capabilities.
// ============================================================

'use client';

import React, { useState, useEffect } from 'react';
import { NODE_TYPES } from '@/lib/concept-map/constants';

export default function RightInspector({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onSelectNode,
  allNodes,
}) {
  const [editMode, setEditMode] = useState(false);
  const [editLabel, setEditLabel] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Sync state when selectedNode changes
  useEffect(() => {
    if (selectedNode) {
      setEditLabel(selectedNode.data?.title || '');
      setEditDescription(selectedNode.data?.body || '');
      setEditMode(false); // Reset to view mode
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <div className="w-80 flex-none border-l border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
             className="text-slate-300 mb-3">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <p className="text-xs font-bold text-slate-500">No node selected</p>
        <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
          Click any node on the canvas to inspect or edit its details.
        </p>
      </div>
    );
  }

  const nodeData = selectedNode.data || {};
  const nodeType = nodeData.nodeType || 'diagnosis';
  const typeDef = NODE_TYPES[nodeType] || NODE_TYPES.diagnosis;
  const children = allNodes.filter((n) => n.data?.parentId === selectedNode.id);

  /** Save edited node properties */
  function handleSave(e) {
    e.preventDefault();
    if (!editLabel.trim()) return;
    onUpdateNode(selectedNode.id, {
      title: editLabel,
      body: editDescription,
    });
    setEditMode(false);
  }

  return (
    <div className="w-80 flex-none border-l border-slate-200 bg-white flex flex-col min-h-0 overflow-y-auto relative z-20">
      <div className="p-4 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {editMode ? 'Edit Node' : 'Node Inspector'}
          </h2>
          <div className="flex items-center gap-1">
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
                title="Edit this node"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                </svg>
              </button>
            )}
            <button
              onClick={() => {
                if (confirm('Delete this node?')) onDeleteNode(selectedNode.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-all cursor-pointer"
              title="Delete this node"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              </svg>
            </button>
          </div>
        </div>

        {editMode ? (
          /* ---------- EDIT FORM ---------- */
          <form onSubmit={handleSave} className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-800
                             focus:outline-none focus:border-[#2C5F8D] focus:ring-1 focus:ring-[#2C5F8D]/30"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Description / Body
                </label>
                <textarea
                  rows={6}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-slate-800
                             focus:outline-none focus:border-[#2C5F8D] focus:ring-1 focus:ring-[#2C5F8D]/30 resize-none leading-relaxed"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-slate-200 mt-4">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold
                           bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all cursor-pointer border border-transparent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold
                           bg-[#2C5F8D] text-white hover:bg-[#1E4266] transition-all shadow-md shadow-[#2C5F8D]/10 cursor-pointer border border-transparent"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          /* ---------- VIEW MODE ---------- */
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Type badge + color indicator */}
              <div
                className="w-full py-3 px-4 rounded-xl border-2 flex flex-col gap-1"
                style={{
                  background: typeDef.color,
                  borderColor: typeDef.border,
                  color: typeDef.textColor,
                }}
              >
                <div className="text-[9px] font-bold uppercase tracking-widest opacity-60">
                  {typeDef.label}
                </div>
                <div className="font-bold text-xs leading-snug">
                  {nodeData.title || 'Untitled'}
                </div>
              </div>

              {/* Body content */}
              {nodeData.body && (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Details
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                    {nodeData.body}
                  </p>
                </div>
              )}

              {/* Node ID */}
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Node ID</span>
                <span className="text-[10px] font-mono text-slate-500">{selectedNode.id}</span>
              </div>

              {/* Parent info */}
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Parent</span>
                <span className="text-xs text-slate-500">
                  {nodeData.parentId ? (
                    <button
                      onClick={() => {
                        const parent = allNodes.find((n) => n.id === nodeData.parentId);
                        if (parent) onSelectNode(parent);
                      }}
                      className="text-rose-600 hover:underline font-semibold cursor-pointer"
                    >
                      {allNodes.find((n) => n.id === nodeData.parentId)?.data?.title || 'Root'}
                    </button>
                  ) : (
                    <span className="text-slate-400 font-medium">None (Root)</span>
                  )}
                </span>
              </div>

              {/* Children list */}
              {children.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Children ({children.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => onSelectNode(child)}
                        className="px-2 py-1 rounded-lg text-xs bg-slate-50 border border-slate-200
                                   text-rose-600 hover:bg-rose-50/50 hover:border-rose-350 transition-all font-semibold cursor-pointer"
                      >
                        {child.data?.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Edit button */}
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-2 px-4 rounded-xl text-xs font-semibold
                         bg-[#2C5F8D] text-white hover:bg-[#1E4266] transition-all border border-[#2C5F8D]
                         flex items-center justify-center gap-2 mt-6 cursor-pointer shadow-md shadow-[#2C5F8D]/10"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
              </svg>
              Modify Node Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
