"use client";

import { useState } from "react";
import { RATIONALE_IMAGES, PARTIAL_CREDIT_TYPES, LETTERS } from "./data";

// ═══════════════════════════════════════════════════════
// DONUT CHART
// ═══════════════════════════════════════════════════════
export function Donut({ size = 140, stroke = 14, value, color = "#16a34a", bg = "#f1f5f9", label, sublabel }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (value / 100) * circ;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
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
              className={`py-3.5 border-none cursor-pointer text-sm transition-all duration-100 font-mono ${
                btn === "="
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

// ═══════════════════════════════════════════════════════
// RATIONALE BLOCK
// ═══════════════════════════════════════════════════════
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8.5l3 3 7-7" />
  </svg>
);

export function RationaleBlock({ question, userAnswer }) {
  const q = question;

  const getCredit = (question, userAns) => {
    if (userAns === undefined || userAns === null) {
      return { percent: 0, points: 0, max: 1, isFullCorrect: false, answered: false };
    }
    const correctAns = question.correct;

    if (question.type === "matrix") {
      const max = correctAns.length;
      const userArr = Array.isArray(userAns) ? userAns : [];
      let points = 0;
      for (let r = 0; r < max; r++) {
        if (userArr[r] === correctAns[r]) points++;
      }
      const percent = Math.round((points / max) * 100);
      return { percent, points, max, isFullCorrect: points === max, answered: true };
    }

    if (question.type === "cloze") {
      const max = correctAns.length;
      const userArr = Array.isArray(userAns) ? userAns : [];
      let points = 0;
      for (let b = 0; b < max; b++) {
        if (userArr[b] === correctAns[b]) points++;
      }
      const percent = Math.round((points / max) * 100);
      return { percent, points, max, isFullCorrect: points === max, answered: true };
    }

    if (question.type === "fill-blank") {
      const cfg = question.blankInput || {};
      let ok = false;
      if (cfg.kind === "numeric") {
        const userNum = parseFloat(userAns);
        const correctNum = parseFloat(cfg.correct);
        const tolerance = cfg.tolerance != null ? parseFloat(cfg.tolerance) : 0;
        if (!isNaN(userNum) && !isNaN(correctNum)) {
          ok = Math.abs(userNum - correctNum) <= tolerance;
        }
      } else {
        const acceptable = Array.isArray(cfg.correct) ? cfg.correct : [cfg.correct];
        const norm = (s) => cfg.caseSensitive ? String(s).trim() : String(s).trim().toLowerCase();
        const u = norm(userAns);
        ok = acceptable.some((a) => norm(a) === u);
      }
      return { percent: ok ? 100 : 0, points: ok ? 1 : 0, max: 1, isFullCorrect: ok, answered: true };
    }

    const usePartial = PARTIAL_CREDIT_TYPES.includes(question.type);

    if (!Array.isArray(correctAns)) {
      const ok = userAns === correctAns;
      return { percent: ok ? 100 : 0, points: ok ? 1 : 0, max: 1, isFullCorrect: ok, answered: true };
    }

    const userArr = Array.isArray(userAns) ? userAns : [userAns];
    const correctSet = new Set(correctAns);
    const userSet = new Set(userArr);

    if (!usePartial) {
      const allRight = correctAns.length === userArr.length && correctAns.every((c) => userSet.has(c));
      return { percent: allRight ? 100 : 0, points: allRight ? 1 : 0, max: 1, isFullCorrect: allRight, answered: true };
    }

    const max = correctAns.length;
    let points = 0;
    userArr.forEach((u) => {
      if (correctSet.has(u)) points += 1;
      else points -= 1;
    });
    points = Math.max(0, points);
    const percent = Math.round((points / max) * 100);
    return { percent, points, max, isFullCorrect: percent === 100, answered: true };
  };

  return (
    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4.5 py-3.5 bg-white border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2.5">
          <div className="w-7.5 h-7.5 rounded-lg bg-[#FE5E7E] flex items-center justify-center flex-shrink-0 shadow-[0_2px_5px_rgba(254,94,126,0.28)]">
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
      <div className="p-4.5">
        {/* Clinical Reasoning */}
        <div className="mb-4">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-[3px] h-3.5 bg-[#FE5E7E] rounded-sm flex-shrink-0" />
            <div className="text-[11px] font-bold text-[#FE5E7E] tracking-wide uppercase">
              Clinical Reasoning — Reading the Trend
            </div>
          </div>
          <div className="text-[13.5px] text-[#1e293b] leading-relaxed px-0.5">
            {q.rationale}
          </div>
        </div>

        {/* Diagram */}
        {RATIONALE_IMAGES[q.id] && (
          <div className="mb-4">
            <div className="border border-[#e2e8f0] rounded-lg overflow-hidden bg-white">
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

        {/* Why Others Fail */}
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-[3px] h-3.5 bg-[#FE5E7E] rounded-sm flex-shrink-0" />
            <div className="text-[11px] font-bold text-[#FE5E7E] tracking-wide uppercase">
              {q.type === "matrix"
                ? "Row-by-Row Breakdown"
                : q.type === "cloze"
                ? "Blank-by-Blank Breakdown"
                : "Why Others Fail"}
            </div>
          </div>
          <div>
            {q.type === "cloze"
              ? q.clozeBlanks.map((blank, bi) => {
                  const correctOpt = blank.correct;
                  const userPicks = Array.isArray(userAnswer) ? userAnswer : [];
                  const userOpt = userPicks[bi];
                  const gotItRight = userOpt === correctOpt;
                  const correctText = blank.options[correctOpt];
                  const userText = userOpt !== undefined ? blank.options[userOpt] : "(blank)";
                  const explanation = q.clozeExplanations ? q.clozeExplanations[bi] : "";
                  return (
                    <div
                      key={bi}
                      className={`flex items-start gap-3 p-3 border border-[#e5e7eb] rounded-lg mb-2 last:mb-0 bg-white transition-all duration-150 ${
                        gotItRight ? "bg-[#f0fdf4] border-[#bbf7d0]" : ""
                      }`}
                    >
                      <div
                        className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-extrabold font-mono ${
                          gotItRight ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[#fde8ec] text-[#FE5E7E]"
                        }`}
                      >
                        {bi + 1}
                      </div>
                      <div className="flex-1 text-[13px] text-[#475569] leading-relaxed pt-0.5">
                        <div className="text-xs text-[#64748b] mb-1">
                          Your pick:{" "}
                          <span className={`font-semibold ${gotItRight ? "text-[#15803d]" : "text-[#b91c1c]"}`}>
                            {userText}
                          </span>
                          {!gotItRight && (
                            <>
                              {" "}· Correct:{" "}
                              <span className="font-semibold text-[#15803d]">{correctText}</span>
                            </>
                          )}
                        </div>
                        <span
                          className={`font-bold ${gotItRight ? "text-[#16a34a]" : "text-[#FE5E7E]"}`}
                        >
                          {gotItRight ? "Correct." : "Incorrect."}
                        </span>{" "}
                        {explanation}
                      </div>
                    </div>
                  );
                })
              : q.type === "fill-blank"
              ? (() => {
                  const cfg = q.blankInput || {};
                  let isUserCorrect = false;
                  if (cfg.kind === "numeric") {
                    const u = parseFloat(userAnswer);
                    const c = parseFloat(cfg.correct);
                    const t = cfg.tolerance != null ? parseFloat(cfg.tolerance) : 0;
                    isUserCorrect = !isNaN(u) && !isNaN(c) && Math.abs(u - c) <= t;
                  } else {
                    const acc = Array.isArray(cfg.correct) ? cfg.correct : [cfg.correct];
                    const norm = (s) => cfg.caseSensitive ? String(s).trim() : String(s).trim().toLowerCase();
                    isUserCorrect = userAnswer != null && acc.some((a) => norm(a) === norm(userAnswer));
                  }
                  const correctText = Array.isArray(cfg.correct) ? cfg.correct[0] : cfg.correct;
                  const userText =
                    userAnswer != null && String(userAnswer).trim() !== ""
                      ? String(userAnswer)
                      : "(no answer)";
                  return (
                    <div
                      className={`flex items-start gap-3 p-3 border rounded-lg bg-white transition-all ${
                        isUserCorrect ? "bg-[#f0fdf4] border-[#bbf7d0]" : "border-[#e5e7eb]"
                      }`}
                    >
                      <div
                        className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-extrabold font-mono ${
                          isUserCorrect ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[#fde8ec] text-[#FE5E7E]"
                        }`}
                      >
                        {isUserCorrect ? "✓" : "✗"}
                      </div>
                      <div className="flex-1 text-[13px] text-[#475569] leading-relaxed pt-0.5">
                        <div className="text-xs text-[#64748b] mb-1">
                          Your answer:{" "}
                          <span
                            className={`font-semibold ${isUserCorrect ? "text-[#15803d]" : "text-[#b91c1c]"}`}
                          >
                            {userText}
                            {cfg.unit && userAnswer != null ? ` ${cfg.unit}` : ""}
                          </span>
                          {!isUserCorrect && (
                            <>
                              {" "}· Correct:{" "}
                              <span className="font-semibold text-[#15803d]">
                                {correctText}
                                {cfg.unit ? ` ${cfg.unit}` : ""}
                              </span>
                            </>
                          )}
                        </div>
                        <span className={`font-bold ${isUserCorrect ? "text-[#16a34a]" : "text-[#FE5E7E]"}`}>
                          {isUserCorrect ? "Correct." : "Incorrect."}
                        </span>
                      </div>
                    </div>
                  );
                })()
              : q.type === "matrix"
              ? q.matrixRows.map((row, ri) => {
                  const correctCol = q.correct[ri];
                  const userPicks = Array.isArray(userAnswer) ? userAnswer : [];
                  const userCol = userPicks[ri];
                  const gotItRight = userCol === correctCol;
                  const explanation = q.matrixExplanations ? q.matrixExplanations[ri] : "";
                  return (
                    <div
                      key={ri}
                      className={`flex items-start gap-3 p-3 border rounded-lg mb-2 last:mb-0 bg-white transition-all ${
                        gotItRight ? "bg-[#f0fdf4] border-[#bbf7d0]" : "border-[#e5e7eb]"
                      }`}
                    >
                      <div
                        className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-extrabold font-mono ${
                          gotItRight ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[#fde8ec] text-[#FE5E7E]"
                        }`}
                      >
                        {ri + 1}
                      </div>
                      <div className="flex-1 text-[13px] text-[#475569] leading-relaxed pt-0.5">
                        <div className="text-xs text-[#64748b] font-semibold mb-1">{row}</div>
                        <span
                          className={`font-bold ${gotItRight ? "text-[#16a34a]" : "text-[#FE5E7E]"}`}
                        >
                          {q.matrixCols[correctCol]}.
                        </span>{" "}
                        {explanation}
                      </div>
                    </div>
                  );
                })
              : q.options.map((opt, oi) => {
                  const isCorrect = Array.isArray(q.correct) ? q.correct.includes(oi) : oi === q.correct;
                  const letter = LETTERS[oi];
                  const explanation = q.optionExplanations ? q.optionExplanations[oi] : "";
                  return (
                    <div
                      key={oi}
                      className={`flex items-start gap-3 p-3 border rounded-lg mb-2 last:mb-0 bg-white transition-all ${
                        isCorrect ? "bg-[#f0fdf4] border-[#bbf7d0]" : "border-[#e5e7eb]"
                      }`}
                    >
                      <div
                        className={`w-6.5 h-6.5 rounded-lg flex items-center justify-center flex-shrink-0 text-[11px] font-extrabold font-mono ${
                          isCorrect ? "bg-[#dcfce7] text-[#16a34a]" : "bg-[#fde8ec] text-[#FE5E7E]"
                        }`}
                      >
                        {letter}
                      </div>
                      <div className="flex-1 text-[13px] text-[#475569] leading-relaxed pt-0.5">
                        <span className={`font-bold ${isCorrect ? "text-[#16a34a]" : "text-[#FE5E7E]"}`}>
                          {isCorrect ? "Correct." : "Incorrect."}
                        </span>{" "}
                        {explanation}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// QUESTION STATS
// ═══════════════════════════════════════════════════════
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
            <div className="w-6.5 h-6.5 rounded-lg bg-[#fde8ec] text-[#FE5E7E] flex items-center justify-center flex-shrink-0 text-sm">
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
              <div className="w-6.5 h-6.5 rounded-lg bg-[#ecfdf5] text-[#16a34a] flex items-center justify-center flex-shrink-0 text-sm">
                🏃
              </div>
              <span className="font-bold text-[#0f172a]">{q.peerCorrectPct}%</span>
              <span className="text-[#64748b]">of peers got it right</span>
            </div>
          )}
          <div className="flex items-center gap-2.5 text-[13px] text-[#475569]">
            <div className="w-6.5 h-6.5 rounded-lg bg-[#fef3c7] text-[#d97706] flex items-center justify-center flex-shrink-0 text-sm">
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
}
