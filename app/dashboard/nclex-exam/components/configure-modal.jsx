"use client";

import { useState } from "react";

const MODE_OPTIONS = [
  {
    id: "practice",
    label: "Tutorial Mode",
    desc: "Receive instant explanations after submitting your answers.",
  },
  {
    id: "test",
    label: "Test Mode",
    desc: "Answers and explanations are not shown until you complete your test.",
  },
];

export default function ConfigureModal({ category, subtopic, onClose, onStart }) {
  const [mode, setMode] = useState("practice");
  const [count, setCount] = useState(10);

  const title = subtopic || category.label;
  const sub = subtopic
    ? `${category.label} — subtopic`
    : `${category.count} questions available`;

  return (
    <div
      className="fixed inset-0 bg-black/45 backdrop-blur-sm z-900 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-xl p-7 w-full max-h-[90vh] overflow-y-auto animate-[scaleIn_0.22s_ease]"
        style={{ maxWidth: 540 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5.5 gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-lg font-extrabold text-[#0f172a] tracking-tight">
              {title}
            </div>
            <div className="text-xs text-[#94a3b8] mt-0.5">{sub}</div>
          </div>
          <button
            onClick={onClose}
            className="bg-transparent text-[#6b7280] border border-[#e5e7eb] rounded-lg px-2.5 py-1.5 text-xs font-medium cursor-pointer transition-all hover:bg-[#f9fafb] hover:text-[#111827] shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Mode */}
        <div className="mb-4.5">
          <div className="text-[11px] font-bold text-[#64748b] tracking-wide uppercase mb-2.5">
            Mode
          </div>
          <div className="grid grid-cols-2 gap-2">
            {MODE_OPTIONS.map((m) => (
              <div
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  mode === m.id
                    ? "border-[#2C5F8D] bg-[#eef4fb]"
                    : "border-[#e2e8f0] bg-white"
                }`}
              >
                <div
                  className={`text-[13px] font-bold mb-1 ${
                    mode === m.id ? "text-[#2C5F8D]" : "text-[#1e293b]"
                  }`}
                >
                  {m.label}
                </div>
                <div className="text-[11px] text-[#94a3b8] leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Count */}
        <div className="mb-4.5">
          <div className="flex justify-between items-center mb-2.5">
            <div className="text-[11px] font-bold text-[#64748b] tracking-wide uppercase">
              Questions
            </div>
            <div className="text-sm font-bold text-[#2C5F8D]">{count}</div>
          </div>
          <input
            type="range"
            min={5}
            max={40}
            step={5}
            value={count}
            onChange={(e) => setCount(+e.target.value)}
            className="w-full accent-[#2C5F8D]"
          /> 
          <div className="flex justify-between text-[11px] text-[#94a3b8] mt-1">
            <span>5</span>
            <span>40</span>
          </div>
        </div>

        <button
          onClick={() => onStart({ mode, count })}
          className="w-full bg-[#1E3A5F] text-white border-none rounded-lg py-3.5 font-sans text-sm font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 hover:bg-[#162d4a]"
        >
          Start Session →
        </button>
      </div>
    </div>
  );
};