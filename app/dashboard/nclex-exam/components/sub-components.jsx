"use client";

import { useState } from "react";
import { RATIONALE_IMAGES, PARTIAL_CREDIT_TYPES, LETTERS } from "./data";

const isUrl = (str) => typeof str === "string" && (str.startsWith("http://") || str.startsWith("https://"));

// ═══════════════════════════════════════════════════════
// DONUT CHART
// ═══════════════════════════════════════════════════════
export function Donut({ size = 140, stroke = 14, value, color = "#16a34a", bg = "#f1f5f9", label, sublabel }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (value / 100) * circ;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <div className="text-[22px] font-extrabold text-[#1e293b] leading-none">{label}</div>}
        {sublabel && <div className="text-[11px] text-[#94a3b8] mt-0.5 font-medium">{sublabel}</div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// CALCULATOR
// ═══════════════════════════════════════════════════════
export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(false);
  const [hist, setHist] = useState([]);

  const press = (v) => {
    if (v === "C") {
      setDisplay("0");
      setPrev(null);
      setOp(null);
      setFresh(false);
      return;
    }
    if (v === "±") {
      setDisplay((d) => (d.startsWith("-") ? d.slice(1) : "-" + d));
      return;
    }
    if (v === "%") {
      setDisplay((d) => String(parseFloat(d) / 100));
      return;
    }
    if (v === "⌫") {
      setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
      return;
    }
    if (["+", "-", "×", "÷"].includes(v)) {
      setPrev(parseFloat(display));
      setOp(v);
      setFresh(true);
      return;
    }
    if (v === "=") {
      if (prev === null || !op) return;
      const cur = parseFloat(display);
      let res;
      if (op === "+") res = prev + cur;
      else if (op === "-") res = prev - cur;
      else if (op === "×") res = prev * cur;
      else if (op === "÷") res = cur === 0 ? "Error" : prev / cur;
      const rs = typeof res === "number" ? (Number.isInteger(res) ? String(res) : parseFloat(res.toFixed(8)).toString()) : res;
      setHist((h) => [`${prev} ${op} ${cur} = ${rs}`, ...h].slice(0, 4));
      setDisplay(rs);
      setPrev(null);
      setOp(null);
      setFresh(true);
      return;
    }
    if (v === ".") {
      if (fresh) {
        setDisplay("0.");
        setFresh(false);
        return;
      }
      if (!display.includes(".")) setDisplay((d) => d + ".");
      return;
    }
    setDisplay((d) => (fresh || d === "0") ? String(v) : d + v);
    setFresh(false);
  };

  const rows = [
    ["C", "±", "%", "÷"],
    [7, 8, 9, "×"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    ["⌫", 0, ".", "="],
  ];

  const isOp = (v) => ["+", "-", "×", "÷", "="].includes(v);
  const isFn = (v) => ["C", "±", "%", "⌫"].includes(String(v));

  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#e2e8f0]"
      style={{ width: 260 }}
    >
      <div className="bg-[#f3f4f6] p-3.5 pb-2.5">
        {hist.slice(0, 2).map((h, i) => (
          <div key={i} className="text-[10px] text-[#94a3b8] font-mono leading-relaxed text-right">
            {h}
          </div>
        ))}
        {op && (
          <div className="text-[11px] text-[#94a3b8] text-right font-mono">
            {prev} {op}
          </div>
        )}
        <div className="text-[28px] font-bold text-[#0f172a] text-right font-mono overflow-hidden text-ellipsis whitespace-nowrap">
          {display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-px bg-[#e8ecf0]">
        {rows.map((row, ri) =>
          row.map((btn, ci) => (
            <button
              key={`${ri}-${ci}`}
              onClick={() => press(btn)}
              className={`py-3.5 border-none cursor-pointer text-sm transition-all duration-100 font-mono ${btn === "="
                  ? "bg-[#2C5F8D] text-white font-bold"
                  : isOp(btn)
                    ? "bg-[#dbeafe] text-[#2C5F8D] font-bold"
                    : isFn(btn)
                      ? "bg-[#f1f5f9] text-[#5a6474]"
                      : "bg-white text-[#1a2332]"
                }`}
              style={{ fontSize: btn === "=" ? 18 : 14 }}
            >
              {btn}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// EXPLANATION IFRAME
function ExplanationIframe({ url }) {
  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <div className="rounded-xl overflow-hidden border border-[#e2e8f0] bg-white" style={{ minHeight: 320 }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#f1f5f9] bg-[#f8fafc]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#eef4fb] flex items-center justify-center">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2C5F8D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-[#1e3a5f] tracking-wide">DETAILED EXPLANATION</span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-[#2C5F8D] font-semibold hover:text-[#1e4773] transition-colors"
        >
          Open
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      {/* iframe wrapper */}
      <div className="relative" style={{ height: 500 }}>
        {iframeLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white gap-3 z-10">
            <div className="w-8 h-8 rounded-full border-2 border-[#e2e8f0] border-t-[#2C5F8D] animate-spin" />
            <span className="text-[11px] text-[#94a3b8] font-medium">Loading explanation…</span>
          </div>
        )}
        <iframe
          src={url}
          title="Question Explanation"
          className="w-full h-full border-none"
          sandbox="allow-same-origin allow-scripts"
          onLoad={() => setIframeLoading(false)}
          style={{ opacity: iframeLoading ? 0 : 1, transition: "opacity 0.3s ease" }}
        />
      </div>
    </div>
  );
}

// RATIONALE BLOCK
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8.5l3 3 7-7" />
  </svg>
);

export function RationaleBlock({ question, userAnswer, isQBank, backendFeedback }) {
  const q = question;

  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4.5 py-3.5 bg-white border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2.5">
          <div className="w-7.5 h-7.5 rounded-lg bg-[#FE5E7E] flex items-center justify-center shrink-0 shadow-[0_2px_5px_rgba(254,94,126,0.28)]">
            <CheckIcon />
          </div>
          <div className="text-[15px] font-bold text-[#0f172a] tracking-tight">
            Rationale &amp; Explanation
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16a34a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] shadow-[0_0_0_3px_rgba(22,163,74,0.15)]" />
          Auto
        </div>
      </div>

      {/* Body */}
      <div className="pt-4">
        {/* Clinical Reasoning */}
        <div className="mb-4">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-0.75 h-3.5 bg-[#FE5E7E] rounded-sm shrink-0" />
            <div className="text-[11px] font-bold text-[#FE5E7E] tracking-wide uppercase">
              Clinical Reasoning — Reading the Trend
            </div>
          </div>
          {(() => {
            const explanationVal = isQBank
              ? (backendFeedback?.[q.id]?.explanation || q.rationale || q.note || "")
              : q.rationale;

            // Render as an iframe if it's a URL (S3 signed HTML link)
            if (isUrl(explanationVal)) {
              return <ExplanationIframe url={explanationVal} />;
            }

            if (!explanationVal) {
              return (
                <div className="flex items-center gap-3 px-4 py-3.5 rounded-lg bg-[#eff6ff] border border-[#bfdbfe]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <div className="text-[13px] text-[#1e40af] font-medium leading-snug">
                    Detailed explanation will be available soon. Review the correct answer above to reinforce your learning.
                  </div>
                </div>
              );
            }
            return (
              <div className="text-[13.5px] text-[#1e293b] leading-relaxed px-0.5">
                {explanationVal}
              </div>
            );
          })()}
        </div>

        {/* Diagram */}
        {RATIONALE_IMAGES[q.id] && (
          <div className="mb-4">
            <div className="overflow-hidden bg-white">
              <div
                dangerouslySetInnerHTML={{ __html: RATIONALE_IMAGES[q.id].svg }}
                className="block w-full"
              />
              {RATIONALE_IMAGES[q.id].caption && (
                <div className="px-3 py-1.5 bg-[#f8fafc] border-t border-[#f1f5f9] text-[10px] text-[#64748b] italic">
                  {RATIONALE_IMAGES[q.id].caption}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// QUESTION STATS
export function QuestionStats({ question }) {
  const q = question;
  const diffLabel = q.difficulty.toUpperCase();
  const diffColor =
    q.difficulty === "beginner" ? "#16a34a" : q.difficulty === "advanced" ? "#FE5E7E" : "#d97706";

  return (
    <div className="border border-[#e5e7eb] rounded-xl bg-white p-5.5 mt-5 animate-[fadeUp_0.25s_ease]">
      <div className="text-sm font-bold text-[#0f172a] mb-4 tracking-tight">Statistics</div>
      <div className="grid grid-cols-[auto_1px_1fr] gap-6 items-start">
        {/* Left */}
        <div>
          <div className="flex items-center gap-2.5 text-[13px] text-[#475569] mb-3.5">
            <div className="w-6.5 h-6.5 rounded-lg bg-[#fde8ec] text-[#FE5E7E] flex items-center justify-center shrink-0 text-sm">
              ⚙
            </div>
            <span className="text-[#64748b]">Difficulty level —</span>
            <span
              className="font-bold uppercase tracking-wide"
              style={{ color: diffColor }}
            >
              {diffLabel}
            </span>
          </div>
          {typeof q.peerCorrectPct === "number" && (
            <div className="flex items-center gap-2.5 text-[13px] text-[#475569] mb-3.5">
              <div className="w-6.5 h-6.5 rounded-lg bg-[#ecfdf5] text-[#16a34a] flex items-center justify-center shrink-0 text-sm">
                🏃
              </div>
              <span className="font-bold text-[#0f172a]">{q.peerCorrectPct}%</span>
              <span className="text-[#64748b]">of peers got it right</span>
            </div>
          )}
          <div className="flex items-center gap-2.5 text-[13px] text-[#475569]">
            <div className="w-6.5 h-6.5 rounded-lg bg-[#fef3c7] text-[#d97706] flex items-center justify-center shrink-0 text-sm">
              ★
            </div>
            <span className="text-[#64748b]">Category —</span>
            <span className="font-bold text-[#1e293b]">{q.category}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-[#e5e7eb] self-stretch" />

        {/* Right */}
        <div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3.5 mb-2.5">
            <span className="text-xs text-[#64748b] font-medium">Subject</span>
            <span>
              <span className="inline-block px-3 py-1 rounded-full bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] text-xs font-semibold">
                {q.category}
              </span>
            </span>
          </div>
          <div className="grid grid-cols-[140px_1fr] items-center gap-3.5">
            <span className="text-xs text-[#64748b] font-medium">Client Need Area</span>
            <span>
              <span className="inline-block px-3 py-1 rounded-full bg-[#fff7ed] text-[#9a3412] border border-[#fed7aa] text-xs font-semibold">
                {q.nclexCategory}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
