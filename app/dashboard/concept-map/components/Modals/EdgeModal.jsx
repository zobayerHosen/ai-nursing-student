// ============================================================
//  EdgeModal - Modal for editing edge labels/linking phrases.
//  Shows common phrase chips and a custom input field.
// ============================================================

'use client';

import React, { useState, useEffect } from 'react';
import { COMMON_PHRASES } from '@/lib/concept-map/constants';

export default function EdgeModal({ isOpen, onClose, edge, onSave, onDelete }) {
  const [phrase, setPhrase] = useState('');
  const [emphasis, setEmphasis] = useState(false);

  // Sync when edge changes
  useEffect(() => {
    if (edge) {
      setPhrase(edge.label || '');
      setEmphasis(edge.data?.emphasis || false);
    } else {
      setPhrase('leads to');
      setEmphasis(false);
    }
  }, [edge?.id]);

  if (!isOpen) return null;

  /** Save the edge label */
  function handleSave(e) {
    e.preventDefault();
    onSave(edge?.id, {
      label: phrase.trim(),
      data: { ...edge?.data, emphasis },
    });
    onClose();
  }

  /** Delete the edge */
  function handleDelete() {
    if (confirm('Delete this connection?')) {
      onDelete(edge?.id);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md mx-4 relative z-30">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Linking Phrase</h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Connect the two concepts with a relationship</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Common Phrases */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                Common Phrases
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_PHRASES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPhrase(p);
                      if (/↻|cycle|loop|escalate/i.test(p)) setEmphasis(true);
                    }}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      phrase === p
                        ? 'bg-[#2C5F8D]/5 border-[#2C5F8D] text-[#2C5F8D]'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-350 hover:text-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Phrase */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Custom Phrase
              </label>
              <input
                type="text"
                value={phrase}
                onChange={(e) => setPhrase(e.target.value)}
                placeholder="leads to"
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-800
                           focus:outline-none focus:border-[#2C5F8D] transition-all"
                autoFocus
              />
            </div>

            {/* Emphasis toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={emphasis}
                onChange={(e) => setEmphasis(e.target.checked)}
                className="w-4 h-4 rounded border-slate-200 bg-slate-50 text-[#2C5F8D] focus:ring-[#2C5F8D]/30
                           accent-[#2C5F8D]"
              />
              <span className="text-xs font-semibold text-slate-600">
                Emphasize{' '}
                <span className="text-[10px] text-slate-400 font-medium">
                  (use for feedback loops &amp; vicious cycles)
                </span>
              </span>
            </label>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {edge && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-red-500 border border-red-200
                             hover:bg-red-50 transition-all cursor-pointer bg-white"
                >
                  Delete link
                </button>
              )}
              <div className="flex-1" />
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all border border-transparent cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#2C5F8D] text-white hover:bg-[#1E4266]
                           shadow-md shadow-[#2C5F8D]/10 transition-all border border-[#2C5F8D] cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
