// ============================================================
//  EditNodeModal - Full node editing modal with:
//  - Node type selector
//  - Title & body inputs
//  - Custom color pickers (fill + text)
//  - Live preview
//  - Delete action
// ============================================================

'use client';

import React, { useState, useEffect } from 'react';
import { NODE_TYPES, FILL_PRESETS, TEXT_PRESETS, TYPE_DEFAULT_COLORS } from '@/lib/concept-map/constants';
import { shadeColor, readableTextOn } from '@/lib/concept-map/colors';

export default function EditNodeModal({ isOpen, onClose, node, onSave, onDelete }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [nodeType, setNodeType] = useState('diagnosis');
  const [fillColor, setFillColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#0F172A');
  const [colorsTouched, setColorsTouched] = useState(false);

  // Sync state when the node changes
  useEffect(() => {
    if (node) {
      setTitle(node.data?.title || '');
      setBody(node.data?.body || '');
      const nt = node.data?.nodeType || 'diagnosis';
      setNodeType(nt);
      const def = TYPE_DEFAULT_COLORS[nt] || TYPE_DEFAULT_COLORS.diagnosis;
      setFillColor(node.data?.fill || def.fill);
      setTextColor(node.data?.textColor || def.text);
      setColorsTouched(false);
    }
  }, [node?.id]);

  if (!isOpen || !node) return null;

  /** Handle node type change - reset colors to type defaults if not custom */
  function handleTypeChange(newType) {
    setNodeType(newType);
    if (!colorsTouched) {
      const def = TYPE_DEFAULT_COLORS[newType] || TYPE_DEFAULT_COLORS.diagnosis;
      setFillColor(def.fill);
      setTextColor(def.text);
    }
  }

  /** Save and close */
  function handleSave(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(node.id, {
      title: title.trim(),
      body,
      nodeType,
      fill: fillColor !== (TYPE_DEFAULT_COLORS[nodeType]?.fill || '#FFFFFF') ? fillColor : null,
      textColor: textColor !== (TYPE_DEFAULT_COLORS[nodeType]?.text || '#0F172A') ? textColor : null,
    });
    onClose();
  }

  /** Delete with confirmation */
  function handleDelete() {
    if (node.data?.nodeType === 'central') {
      alert('The central concept node cannot be deleted.');
      return;
    }
    if (confirm('Delete this node and all its connections?')) {
      onDelete(node.id);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
         onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto relative z-30">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Edit Node</h2>
              <p className="text-[10px] text-slate-400 mt-0.5">Update title, details, and appearance</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Node Type Grid */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                Node Type
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.entries(NODE_TYPES).map(([key, cfg]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTypeChange(key)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-semibold border transition-all text-left flex items-center gap-1.5 cursor-pointer ${
                      nodeType === key
                        ? 'border-[#2C5F8D] bg-[#2C5F8D]/5 text-[#2C5F8D]'
                        : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-350'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-sm flex-none" style={{ background: cfg.color }} />
                    {cfg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Risk for Unstable Blood Glucose"
                className="w-full px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-800
                           focus:outline-none focus:border-[#2C5F8D] transition-all"
              />
            </div>

            {/* Body textarea */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 block">
                Details (Body)
              </label>
              <textarea
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="• bullet one&#10;r/t ...&#10;AEB ..."
                className="w-full px-3 py-2 rounded-xl text-xs font-medium bg-slate-50 border border-slate-200 text-slate-800
                           focus:outline-none focus:border-[#2C5F8D] transition-all resize-none font-sans leading-relaxed"
              />
              <p className="text-[9px] text-slate-400 mt-1">Use new lines for bullets. Ctrl+Enter to save.</p>
            </div>

            {/* Color Customization */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Colors
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const def = TYPE_DEFAULT_COLORS[nodeType] || TYPE_DEFAULT_COLORS.diagnosis;
                    setFillColor(def.fill);
                    setTextColor(def.text);
                    setColorsTouched(false);
                  }}
                  className="text-[10px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  Reset to default
                </button>
              </div>

              {/* Fill Color - Swatches */}
              <div className="mb-3">
                <div className="text-[10px] font-bold text-slate-400 mb-1.5">Background</div>
                <div className="grid grid-cols-10 gap-1.5 mb-2">
                  {FILL_PRESETS.slice(0, 30).map((color, idx) => (
                    <button
                      key={`${color}-${idx}`}
                      type="button"
                      onClick={() => { setFillColor(color); setColorsTouched(true); }}
                      className={`w-full aspect-square rounded-lg border-2 transition-all cursor-pointer ${
                        fillColor.toLowerCase() === color.toLowerCase()
                          ? 'border-[#2C5F8D] scale-110 shadow-sm'
                          : 'border-transparent hover:scale-110'
                      }`}
                      style={{ background: color }}
                      title={color}
                    />
                  ))}
                </div>
                {/* Custom fill color */}
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fillColor}
                    onChange={(e) => { setFillColor(e.target.value); setColorsTouched(true); }}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={fillColor}
                    onChange={(e) => { setFillColor(e.target.value); setColorsTouched(true); }}
                    className="flex-1 text-xs font-mono px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600"
                    maxLength={7}
                  />
                </div>
              </div>

              {/* Text Color - Swatches */}
              <div className="mb-3">
                <div className="text-[10px] font-bold text-slate-400 mb-1.5">Font Color</div>
                <div className="grid grid-cols-10 gap-1.5 mb-2">
                  {TEXT_PRESETS.slice(0, 20).map((color, idx) => (
                    <button
                      key={`${color}-${idx}`}
                      type="button"
                      onClick={() => { setTextColor(color); setColorsTouched(true); }}
                      className={`w-full aspect-square rounded-lg border-2 transition-all cursor-pointer ${
                        textColor.toLowerCase() === color.toLowerCase()
                          ? 'border-[#2C5F8D] scale-110 shadow-sm'
                          : 'border-transparent hover:scale-110'
                      }`}
                      style={{ background: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => { setTextColor(e.target.value); setColorsTouched(true); }}
                    className="w-8 h-8 rounded-lg border border-slate-200 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => { setTextColor(e.target.value); setColorsTouched(true); }}
                    className="flex-1 text-xs font-mono px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600"
                    maxLength={7}
                  />
                </div>
              </div>

              {/* Live Preview */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Preview</div>
                <div
                  className="inline-block px-4 py-2.5 rounded-xl border text-xs max-w-full font-semibold"
                  style={{
                    background: fillColor,
                    borderColor: shadeColor(fillColor, -15),
                    color: textColor,
                  }}
                >
                  <div className="text-[9px] font-bold uppercase tracking-wider opacity-60 mb-0.5">
                    {NODE_TYPES[nodeType]?.label || 'Node'}
                  </div>
                  <div className="font-bold">{title || 'Node title preview'}</div>
                  {body && (
                    <div className="text-[11px] mt-0.5 opacity-85 whitespace-pre-wrap font-medium">{body}</div>
                  )}
                </div>
              </div>
            </div>

            {/* CARA Tip */}
            <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 text-[11px] text-slate-600 leading-relaxed font-medium">
              <strong className="text-rose-500">✦ CARA Tip:</strong> For nursing diagnoses, use <em>r/t</em> (related to)
              for the etiology and <em>AEB</em> (as evidenced by) for the cues.
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-red-500 border border-red-500/30
                           hover:bg-red-50 transition-all flex items-center gap-1.5 cursor-pointer bg-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                </svg>
                Delete
              </button>
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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
