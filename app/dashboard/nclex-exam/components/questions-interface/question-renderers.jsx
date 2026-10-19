"use client";

import { PARTIAL_CREDIT_TYPES, LETTERS } from "../data";

// ═══════════════════════════════════════════════════════
// SHARED SVG ICONS
// ═══════════════════════════════════════════════════════
export const CheckIcon = ({ size = 16, color = "#16a34a", strokeWidth = 2.5 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10.5l4 4 8-9" />
  </svg>
);

export const CrossIcon = ({ size = 16, color = "#FE5E7E", strokeWidth = 2.5 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5l10 10M15 5L5 15" />
  </svg>
);

// ═══════════════════════════════════════════════════════
// SHARED HELPERS
// ═══════════════════════════════════════════════════════

/** Check if a user has made a valid selection based on question type */
export function hasValidSelection(q, selected) {
  if (!q) return { canSubmit: false, needsAll: false, needLabel: "" };
  if (q.type === "matrix") {
    const filled = Array.isArray(selected) ? selected.filter((v) => v !== undefined).length : 0;
    return { canSubmit: filled === q.matrixRows.length, needsAll: filled > 0 && filled < q.matrixRows.length, needLabel: `Answer all ${q.matrixRows.length} rows to submit` };
  }
  if (q.type === "cloze") {
    const filled = Array.isArray(selected) ? selected.filter((v) => v !== undefined).length : 0;
    return { canSubmit: filled === q.clozeBlanks.length, needsAll: filled > 0 && filled < q.clozeBlanks.length, needLabel: `Fill in all ${q.clozeBlanks.length} blanks to submit` };
  }
  if (q.type === "fill-blank" || q.type === "input") {
    return { canSubmit: typeof selected === "string" && selected.trim().length > 0, needsAll: false, needLabel: "" };
  }
  if (Array.isArray(selected) && selected.length > 0) {
    return { canSubmit: true, needsAll: false, needLabel: "" };
  }
  if (typeof selected === "number" && selected !== null) {
    return { canSubmit: true, needsAll: false, needLabel: "" };
  }
  return { canSubmit: false, needsAll: false, needLabel: "" };
}

/** Resolve the peer solve percentage from feedback/question data */
export function resolveSolvePercent(currentFeedback, q) {
  const raw =
    currentFeedback?.avg_solve_percent ?? currentFeedback?.data?.avg_solve_percent ?? q?.avg_solve_percent ?? q?.peerCorrectPct;
  if (raw === undefined || raw === null) return null;
  const num = typeof raw === "string" ? parseFloat(raw.replace("%", "").trim()) : Number(raw);
  if (isNaN(num)) return null;
  return `${Math.round(num)}%`;
}

/** Get highlight class based on answer state */
function getHighlightClass(isAnsweredNow, isPicked, isCorrect, variant = "inline") {
  const wasCorrect = isAnsweredNow && isPicked && isCorrect;
  const wasWrong = isAnsweredNow && isPicked && !isCorrect;
  const wasCorrectUnpicked = isAnsweredNow && !isPicked && isCorrect;

  if (variant === "card") {
    // Card-style (fallback list rendering)
    if (isAnsweredNow) {
      if (wasCorrect) return "p-3.5 border border-solid border-[#16a34a] bg-[#ecfdf3] text-[#15803d] rounded-xl font-medium text-[14px]";
      if (wasWrong) return "p-3.5 border border-solid border-[#FE5E7E] bg-[#fdecef] text-[#b91c1c] rounded-xl font-medium text-[14px]";
      if (wasCorrectUnpicked) return "p-3.5 border border-dashed border-[#16a34a] bg-transparent text-[#16a34a] rounded-xl font-medium text-[14px]";
      return "p-3.5 border border-solid border-transparent bg-transparent text-[#94a3b8] opacity-60 rounded-xl text-[14px]";
    }
    if (isPicked) return "p-3.5 border border-solid border-[#eab308] bg-[#fef08a] text-[#854d0e] rounded-xl font-medium text-[14px] shadow-sm";
    return "p-3.5 border border-dashed border-[#cbd5e1] bg-[#f8fafc] text-[#1e293b] hover:bg-[#f1f5f9] rounded-xl cursor-pointer transition-all duration-150 font-medium text-[14px]";
  }

  // Inline style (bracket or regex match)
  if (isAnsweredNow) {
    if (wasCorrect) return "px-1.5 py-0.5 mx-0.5 rounded font-semibold bg-[#ecfdf3] text-[#15803d] border border-solid border-[#16a34a] cursor-default";
    if (wasWrong) return "px-1.5 py-0.5 mx-0.5 rounded font-semibold bg-[#fdecef] text-[#b91c1c] border border-solid border-[#FE5E7E] cursor-default";
    if (wasCorrectUnpicked) return "px-1.5 py-0.5 mx-0.5 rounded font-semibold bg-transparent text-[#16a34a] border border-dashed border-[#16a34a] cursor-default";
    return "px-1.5 py-0.5 mx-0.5 rounded text-[#94a3b8] opacity-60 cursor-default";
  }
  if (isPicked) return "px-1.5 py-0.5 mx-0.5 rounded font-semibold bg-[#fef08a] text-[#854d0e] border border-solid border-[#eab308] cursor-pointer";
  return "px-1.5 py-0.5 mx-0.5 rounded transition-all duration-150 cursor-pointer font-semibold border border-dashed border-[#cbd5e1] bg-[#f1f5f9] text-[#1e293b] hover:bg-[#cbd5e1] hover:border-[#94a3b8]";
}

// ═══════════════════════════════════════════════════════
// PEER SOLVE PERCENTAGE BADGE
// ═══════════════════════════════════════════════════════
export function PeerSolveBadge({ feedback, question, className = "" }) {
  const display = resolveSolvePercent(feedback, question);
  if (!display) return null;
  return (
    <div className={`flex items-center gap-2.5 text-[13px] text-[#475569] select-none ${className}`}>
      <div className="w-6.5 h-6.5 rounded-lg bg-[#ecfdf5] border border-[#a7f3d0]/60 text-[#16a34a] flex items-center justify-center shrink-0 text-sm shadow-2xs">
        🏃
      </div>
      <span className="font-bold text-[#0f172a] text-sm">{display}</span>
      <span className="text-[#64748b]">of peers got it right</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// QUESTION TYPE LABEL (tag badge)
// ═══════════════════════════════════════════════════════
export function QuestionTypeLabel({ question }) {
  const q = question;
  let typeLabel = null;
  if (q.type === "extended-multi" || q.type === "multiple" || q.multiSelect) typeLabel = "SATA";
  else if (q.type === "matrix") typeLabel = "Matrix";
  else if (q.type === "cloze") typeLabel = "Drop-Down";
  else if (q.type === "fill-blank" || q.type === "input") typeLabel = "Fill-in-the-Blank";
  else if (q.type === "order") typeLabel = "Ordering";
  else if (q.type === "highlight") typeLabel = "Highlighting";
  if (!typeLabel) return null;
  const isPartialCredit = PARTIAL_CREDIT_TYPES.includes(q.type);
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[11px] font-bold"
      style={{
        background: isPartialCredit ? "#f5f3ff" : "#fef3f2",
        color: isPartialCredit ? "#7c3aed" : "#be185d",
        border: `1px solid ${isPartialCredit ? "#ddd6fe" : "#fce7f3"}`,
      }}
    >
      {typeLabel}
      {isPartialCredit ? " ⚖" : ""}
    </span>
  );
}

// ═══════════════════════════════════════════════════════
// INSTRUCTION BAR (for special question types)
// ═══════════════════════════════════════════════════════
export function InstructionBar({ question }) {
  const q = question;
  let instructionText = null;
  if (q.type === "order") {
    instructionText = `Drag each step into the correct sequence (1 = first, ${q.options?.length || "last"} = last).`;
  } else if (q.type === "highlight") {
    instructionText = "Click to highlight each finding that is of immediate concern to the nurse.";
  } else if (q.type === "multiple" || q.type === "extended-multi" || q.multiSelect) {
    instructionText = "Select all that apply. Each correct selection earns 1 point; incorrect selections deduct 1 point (minimum 0).";
  }
  if (!instructionText) return null;
  return (
    <div className="mb-4 py-2.5 px-3.5 bg-[#f1f5f9] border-l-3 border-[#2C5F8D] rounded-r-lg text-[13px] text-[#475569] font-medium font-sans leading-relaxed">
      {instructionText}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// CLOZE RENDERER
// ═══════════════════════════════════════════════════════
export function ClozeRenderer({ q, selected, userAnswer, isAnswered, isTutorial, onClozeSelect }) {
  const isAnsweredNow = isTutorial && isAnswered;
  const parts = q.clozeText.split(/(\{\{\d+\}\})/g);

  return (
    <div className="text-[15.5px] leading-[2.2] text-[#0f172a] mb-4.5 p-4.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
      {parts.map((part, pi) => {
        const m = part.match(/^\{\{(\d+)\}\}$/);
        if (!m) return <span key={pi}>{part}</span>;
        const blankIdx = parseInt(m[1], 10);
        const blank = q.clozeBlanks[blankIdx];
        if (!blank) return <span key={pi}>[blank {blankIdx} missing]</span>;
        const userPicks = Array.isArray(userAnswer) ? userAnswer : Array.isArray(selected) ? selected : [];
        const userPick = userPicks[blankIdx];
        const correctOpt = blank.correct;
        const isEmpty = userPick === undefined;
        const wasCorrect = isAnsweredNow && userPick === correctOpt;
        const wasWrong = isAnsweredNow && userPick !== correctOpt;

        let cls = "font-sans text-sm font-semibold px-1 py-1 border rounded-md cursor-pointer transition-all min-w-[120px] max-w-[280px]";
        if (isEmpty) cls += " text-[#94a3b8] border-dashed border-[#cbd5e1] bg-white";
        else if (wasCorrect) cls += " bg-[#ecfdf3] text-[#15803d] border-[#16a34a] cursor-default";
        else if (wasWrong) cls += " bg-[#fdecef] text-[#b91c1c] border-[#FE5E7E] cursor-default";
        else cls += " text-[#2C5F8D] border-[#2C5F8D] bg-white hover:bg-[#eef4fb]";

        const bgImage = wasCorrect
          ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 6l3 3 5-6' stroke='%2316a34a' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E\")"
          : wasWrong
            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 3l6 6m0-6l-6 6' stroke='%23FE5E7E' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E\")"
            : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2 4l3 3 3-3' stroke='%232C5F8D' strokeWidth='1.6' strokeLinecap='round' strokeLinejoin='round'/%3E%3C/svg%3E\")";

        return (
          <span key={pi} className="inline-block relative mx-0.5">
            <select
              className={cls}
              disabled={isAnsweredNow}
              value={userPick === undefined ? "" : String(userPick)}
              onChange={(e) => onClozeSelect(blankIdx, parseInt(e.target.value, 10))}
              style={{
                backgroundImage: bgImage,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 9px center",
                WebkitAppearance: "none",
                MozAppearance: "none",
                appearance: "none",
                paddingRight: 28,
              }}
            >
              <option value="" disabled>Select…</option>
              {blank.options.map((opt, oi) => (
                <option key={oi} value={oi}>{opt}</option>
              ))}
            </select>
            {wasWrong && (
              <span className="block text-[11px] text-[#16a34a] font-semibold mt-1 pl-0.5">
                ✓ {blank.options[correctOpt]}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// ORDER RENDERER
// ═══════════════════════════════════════════════════════
export function OrderRenderer({ q, selected, userAnswer, isAnswered, isTutorial, isQBank, getQbankCorrectIndices, setSelected }) {
  const isAnsweredNow = isTutorial && isAnswered;
  const currentOrder = isAnsweredNow
    ? (Array.isArray(userAnswer) ? userAnswer : [])
    : (Array.isArray(selected) ? selected : Array.from({ length: q.options.length }, (_, i) => i));

  return (
    <div className="flex flex-col gap-2.5 mb-5 select-none font-sans">
      <div className="flex flex-col gap-2">
        {currentOrder.map((optIdx, displayIdx) => {
          const optText = q.options[optIdx];
          if (optText === undefined) return null;

          const correctIndices = isQBank ? getQbankCorrectIndices(q) : (Array.isArray(q.correct) ? q.correct : []);
          const isCorrectlyPlaced = correctIndices[displayIdx] === optIdx;

          let cardBg = "bg-white", cardBorder = "border-[#e2e8f0]", badgeBg = "bg-[#2C5F8D] text-white";
          if (isAnsweredNow) {
            if (isCorrectlyPlaced) { cardBg = "bg-[#f0fdf4]"; cardBorder = "border-[#bbf7d0]"; badgeBg = "bg-[#16a34a] text-white"; }
            else { cardBg = "bg-[#fef2f2]"; cardBorder = "border-[#fecaca]"; badgeBg = "bg-[#FE5E7E] text-white"; }
          }

          const handleDragStart = (e) => {
            if (isAnsweredNow) return;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(displayIdx));
            e.currentTarget.style.opacity = "0.5";
          };
          const handleDragEnd = (e) => { e.currentTarget.style.opacity = "1"; };
          const handleDragOver = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; };
          const handleDrop = (e) => {
            if (isAnsweredNow) return;
            e.preventDefault();
            const dragIdxStr = e.dataTransfer.getData("text/plain");
            if (!dragIdxStr) return;
            const dragIdx = parseInt(dragIdxStr, 10);
            if (isNaN(dragIdx) || dragIdx === displayIdx) return;
            const newOrder = [...currentOrder];
            const [removed] = newOrder.splice(dragIdx, 1);
            newOrder.splice(displayIdx, 0, removed);
            setSelected(newOrder);
          };

          return (
            <div
              key={optIdx}
              draggable={!isAnsweredNow}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`flex items-center gap-3.5 px-4 py-3.5 border rounded-lg transition-all duration-150 ${cardBg} ${cardBorder} ${!isAnsweredNow ? "hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-grab active:cursor-grabbing" : ""}`}
            >
              <div className={`shrink-0 flex items-center justify-center w-5 ${isAnsweredNow ? "opacity-40" : "text-[#94a3b8]"}`}>
                <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor">
                  <circle cx="4" cy="2" r="1.5" /><circle cx="10" cy="2" r="1.5" />
                  <circle cx="4" cy="9" r="1.5" /><circle cx="10" cy="9" r="1.5" />
                  <circle cx="4" cy="16" r="1.5" /><circle cx="10" cy="16" r="1.5" />
                </svg>
              </div>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-sans font-bold text-[13px] shrink-0 ${badgeBg}`}>
                {displayIdx + 1}
              </div>
              <div className="flex-1 font-sans text-[14px] text-[#1e293b] font-medium leading-relaxed">
                {optText}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// HIGHLIGHT RENDERER
// ═══════════════════════════════════════════════════════
export function HighlightRenderer({ q, selected, userAnswer, isAnswered, isTutorial, isQBank, getQbankCorrectIndices, setSelected }) {
  const passage = q.passage || q.question || q.title || "";
  const isAnsweredNow = isTutorial && isAnswered;
  const userPicks = Array.isArray(userAnswer) ? userAnswer : Array.isArray(selected) ? selected : [];
  const correctIndices = isQBank ? getQbankCorrectIndices(q) : (Array.isArray(q.correct) ? q.correct : []);

  const handleToggle = (optIdx) => {
    if (isAnsweredNow) return;
    const next = userPicks.includes(optIdx)
      ? userPicks.filter(x => x !== optIdx)
      : [...userPicks, optIdx].sort((a, b) => a - b);
    setSelected(next);
  };

  const renderInlineHighlight = (optIdx, text, key) => {
    const isPicked = userPicks.includes(optIdx);
    const isCorrect = correctIndices.includes(optIdx);
    const highlightClass = getHighlightClass(isAnsweredNow, isPicked, isCorrect, "inline");
    return (
      <span key={key} onClick={() => handleToggle(optIdx)} className={highlightClass}>
        {text}
      </span>
    );
  };

  // Bracket-based rendering
  const hasBrackets = passage.includes("[") && passage.includes("]");
  if (hasBrackets) {
    const parts = passage.split(/(\[[^\]]+\])/g);
    let optionCounter = 0;
    return (
      <div className="select-none mb-5 font-sans">
        <div className="text-[15.5px] leading-[2.2] text-[#0f172a] p-4.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl font-sans font-normal">
          {parts.map((part, pi) => {
            if (part.startsWith("[") && part.endsWith("]")) {
              const optIdx = optionCounter++;
              return renderInlineHighlight(optIdx, part.slice(1, -1), pi);
            }
            return <span key={pi}>{part}</span>;
          })}
        </div>
      </div>
    );
  }

  // Regex-based inline rendering
  const foundOptions = q.options.filter(opt => passage.toLowerCase().includes(opt.toLowerCase()));
  if (foundOptions.length > 0) {
    const sortedOpts = [...q.options]
      .map((text, index) => ({ text, index }))
      .sort((a, b) => b.text.length - a.text.length);
    const escapedOptions = sortedOpts.map(o => o.text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
    const regex = new RegExp(`(${escapedOptions.join('|')})`, 'gi');
    const parts = passage.split(regex);

    return (
      <div className="select-none mb-5 font-sans">
        <div className="text-[15.5px] leading-[2.2] text-[#0f172a] p-4.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl font-sans font-normal">
          {parts.map((part, pi) => {
            const matchingOpt = sortedOpts.find(o => o.text.toLowerCase() === part.toLowerCase());
            if (matchingOpt) {
              return renderInlineHighlight(matchingOpt.index, part, pi);
            }
            return <span key={pi}>{part}</span>;
          })}
        </div>
      </div>
    );
  }

  // Fallback: card-style list
  return (
    <div className="select-none mb-5 font-sans">
      <div className="flex flex-col gap-2">
        {q.options.map((optText, optIdx) => {
          const isPicked = userPicks.includes(optIdx);
          const isCorrect = correctIndices.includes(optIdx);
          const highlightClass = getHighlightClass(isAnsweredNow, isPicked, isCorrect, "card");
          return (
            <div key={optIdx} onClick={() => handleToggle(optIdx)} className={highlightClass}>
              {optText}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MATRIX RENDERER
// ═══════════════════════════════════════════════════════
export function MatrixRenderer({ q, selected, userAnswer, isAnswered, isTutorial, onMatrixSelect }) {
  return (
    <div className="border border-[#e2e8f0] rounded-xl overflow-x-auto mb-4.5 bg-white">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr>
            <th className="bg-[#f8fafc] text-[#475569] px-3.5 py-2.5 font-bold text-[11px] tracking-wide uppercase border-b border-[#e2e8f0] text-left w-[40%]">
              {" "}
            </th>
            {q.matrixCols.map((col, ci) => (
              <th key={ci} className="bg-[#f8fafc] text-[#475569] px-3.5 py-2.5 text-center font-bold text-[11px] tracking-wide uppercase border-b border-[#e2e8f0] whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {q.matrixRows.map((row, ri) => {
            const userPicks = Array.isArray(userAnswer) ? userAnswer : Array.isArray(selected) ? selected : [];
            const userPickedCol = userPicks[ri];
            const correctCol = q.correct[ri];
            const rowAnswered = isTutorial && isAnswered;
            const rowGotItRight = rowAnswered && userPickedCol === correctCol;
            return (
              <tr key={ri}>
                <td className="px-3.5 py-3 text-[13px] text-[#0f172a] font-medium leading-relaxed border-b border-[#f1f5f9]">
                  <div className="flex items-center">
                    <span className="flex-1">{row}</span>
                    {rowAnswered && (
                      <span className="inline-flex items-center justify-center w-w-4.5 h-4.5 ml-1.5 shrink-0">
                        {rowGotItRight ? <CheckIcon /> : <CrossIcon />}
                      </span>
                    )}
                  </div>
                </td>
                {q.matrixCols.map((col, ci) => {
                  const isPicked = userPickedCol === ci;
                  const wasCorrect = rowAnswered && isPicked && ci === correctCol;
                  const wasWrong = rowAnswered && isPicked && ci !== correctCol;
                  const wasCorrectUnpicked = rowAnswered && !isPicked && ci === correctCol;

                  let cellBg = "", radioBg = "", radioInner = "";
                  if (wasCorrect) { cellBg = "bg-[#ecfdf3]"; radioBg = "border-[#16a34a] bg-[#16a34a]"; radioInner = "bg-white opacity-100"; }
                  else if (wasWrong) { cellBg = "bg-[#fdecef]"; radioBg = "border-[#FE5E7E] bg-[#FE5E7E]"; radioInner = "bg-white opacity-100"; }
                  else if (wasCorrectUnpicked) { radioBg = "border-[#16a34a] border-dashed"; }
                  else if (isPicked && !rowAnswered) { radioBg = "border-[#2C5F8D]"; radioInner = "opacity-100"; }

                  return (
                    <td key={ci} className="p-0 border-b border-[#f1f5f9]">
                      <div
                        className={`flex items-center justify-center py-2.5 px-2 cursor-pointer transition-colors min-h-11.5 ${cellBg} ${rowAnswered ? "cursor-default" : "hover:bg-[#f3f6fa]"}`}
                        style={{ borderLeft: "1px solid #f1f5f9" }}
                        onClick={() => !rowAnswered && onMatrixSelect(ri, ci)}
                      >
                        <div
                          className="w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 transition-all bg-white"
                          style={{ borderColor: radioBg || "#cbd5e1" }}
                        >
                          <div
                            className={`w-2.5 h-2.5 rounded-full transition-opacity ${radioInner || "opacity-0"}`}
                            style={{ background: wasCorrect || wasWrong ? "white" : "#2C5F8D" }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// FILL-BLANK RENDERER
// ═══════════════════════════════════════════════════════
export function FillBlankRenderer({ q, selected, userAnswer, isAnswered, isTutorial, isQBank, backendFeedback, setSelected, onSubmitAnswer, submitCurrentAnswer, current, setRevealed, setAnswers }) {
  const cfg = q.blankInput || {};
  const isAnsweredNow = isTutorial && isAnswered;
  const userVal = userAnswer !== undefined ? userAnswer : selected !== null ? selected : "";
  let isUserCorrect = false;
  if (isAnsweredNow) {
    if (isQBank) {
      isUserCorrect = !!backendFeedback[q.id]?.is_correct;
    } else if (cfg.kind === "numeric") {
      const u = parseFloat(userAnswer);
      const c = parseFloat(cfg.correct);
      const tol = cfg.tolerance != null ? parseFloat(cfg.tolerance) : 0;
      isUserCorrect = !isNaN(u) && !isNaN(c) && Math.abs(u - c) <= tol;
    } else {
      const acceptable = Array.isArray(cfg.correct) ? cfg.correct : [cfg.correct];
      const norm = (s) => (cfg.caseSensitive ? String(s).trim() : String(s).trim().toLowerCase());
      isUserCorrect = acceptable.some((a) => norm(a) === norm(userAnswer));
    }
  }
  let correctDisplay = "";
  if (isQBank) {
    const caVal = backendFeedback[q.id]?.correct_answer;
    correctDisplay = typeof caVal === "object" ? (caVal?.answer || "") : String(caVal || "");
  } else {
    correctDisplay = Array.isArray(cfg.correct) ? cfg.correct[0] : cfg.correct;
  }
  const borderColor = isAnsweredNow ? (isUserCorrect ? "#16a34a" : "#FE5E7E") : "#cbd5e1";
  const bgColor = isAnsweredNow ? (isUserCorrect ? "#ecfdf3" : "#fdecef") : "white";

  return (
    <div className="mb-5">
      <div>
        <div
          className="flex items-center gap-2.5 p-3.5 border rounded-xl transition-all max-w-120"
          style={{ borderColor, background: bgColor }}
        >
          <input
            type={cfg.kind === "numeric" ? "number" : "text"}
            step={cfg.kind === "numeric" ? "any" : undefined}
            value={userVal}
            disabled={isAnsweredNow}
            placeholder={cfg.placeholder || (cfg.kind === "numeric" ? "Enter a number" : "Type your answer")}
            onChange={(e) => setSelected(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && isTutorial && !isAnsweredNow && String(selected).trim().length > 0) {
                if (onSubmitAnswer) {
                  await submitCurrentAnswer(selected, current);
                }
                if (setRevealed) setRevealed(true);
                if (setAnswers) setAnswers((a) => ({ ...a, [current]: selected }));
              }
            }}
            className="flex-1 min-w-0 border-none outline-none bg-transparent font-sans text-[15px] font-semibold text-[#0f172a] p-0"
          />
          {cfg.unit && (
            <span className="text-[13px] font-semibold text-[#64748b] font-mono whitespace-nowrap border-l border-[#e5e7eb] pl-2.5">
              {cfg.unit}
            </span>
          )}
          {isAnsweredNow && (
            <span className="shrink-0">
              {isUserCorrect ? <CheckIcon size={20} /> : <CrossIcon size={20} />}
            </span>
          )}
        </div>
        {isAnsweredNow && !isUserCorrect && (
          <div className="mt-2 text-xs text-[#16a34a] font-semibold">
            ✓ Correct answer:{" "}
            <span className={cfg.kind === "numeric" ? "font-mono" : ""}>
              {correctDisplay}
              {cfg.unit ? ` ${cfg.unit}` : ""}
            </span>
          </div>
        )}
        {!isAnsweredNow && (
          <div className="mt-1.5 text-[11px] text-[#94a3b8]">
            {cfg.kind === "numeric"
              ? "Enter a numeric value · press Enter or Submit when done"
              : "Type your answer · press Enter or Submit when done"}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// STANDARD OPTIONS RENDERER (MCQ / SATA)
// ═══════════════════════════════════════════════════════
export function StandardOptionsRenderer({ q, selected, userAnswer, isAnswered, isTutorial, isQBank, getQbankCorrectIndices, onSelect }) {
  const isAnsweredNow = isTutorial && isAnswered;
  const isCheckbox = q.multiSelect || q.type === "extended-multi" || q.type === "multiple" || q.type === "highlight";

  return (
    <div className="flex flex-col gap-px mb-5">
      {q.options.map((opt, i) => {
        const userAnsArr = Array.isArray(userAnswer) ? userAnswer : userAnswer !== undefined ? [userAnswer] : [];
        const correctArr = isQBank
          ? getQbankCorrectIndices(q)
          : (Array.isArray(q.correct) ? q.correct : [q.correct]);
        const selectedArr = Array.isArray(selected) ? selected : selected !== null && selected !== undefined ? [selected] : [];
        const isSelectedNow = selectedArr.includes(i);
        const isCorrectOpt = correctArr.includes(i);
        const isUserPicked = isAnsweredNow && userAnsArr.includes(i);
        const isUserWrong = isUserPicked && !isCorrectOpt;

        let optBg = "bg-transparent", optBorder = "border-transparent";
        if (!isAnsweredNow && isSelectedNow) { optBg = "bg-[#eaf2fb]"; optBorder = ""; }
        else if (isAnsweredNow && isCorrectOpt) { optBg = "bg-[#ecfdf3] !border-[#bbf7d0]"; optBorder = "!border-[#bbf7d0]"; }
        else if (isUserWrong) { optBg = "bg-[#fdecef] !border-[#fca5a5]"; optBorder = "!border-[#fca5a5]"; }
        else if (isAnsweredNow) { optBg = "bg-transparent"; }

        const optionText = opt.startsWith("A) ") || opt.startsWith("B) ") || opt.startsWith("C) ") || opt.startsWith("D) ") || /^[A-Z]\)\s/.test(opt)
          ? opt.slice(3)
          : opt;

        return (
          <button
            key={i}
            disabled={isAnsweredNow}
            onClick={() => onSelect(i)}
            className={`w-full text-left px-3 py-2 rounded-lg border cursor-pointer font-sans text-sm font-normal transition-all flex items-start gap-2.5 leading-relaxed mb-0.5 text-[#1e293b] ${isAnsweredNow ? "cursor-default" : "hover:bg-[#f3f6fa]"} ${optBg} ${optBorder}`}
            style={{ borderColor: "transparent" }}
          >
            <div
              className={`shrink-0 w-4.5 h-4.5 flex items-center justify-center mt-0.5 border transition-all bg-white ${isCheckbox ? "rounded" : "rounded-full"}`}
              style={{
                borderColor: isAnsweredNow && isCorrectOpt ? "#16a34a" : isUserWrong ? "#FE5E7E" : isSelectedNow ? "#2C5F8D" : "#cbd5e1",
                background: isAnsweredNow && isCorrectOpt ? "#16a34a" : isUserWrong ? "#FE5E7E" : isSelectedNow && isCheckbox ? "#2C5F8D" : "white",
              }}
            >
              {isCheckbox ? (
                (isSelectedNow || (isAnsweredNow && isUserPicked)) && (
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6l2.5 2.5L9.5 3.5" />
                  </svg>
                )
              ) : (
                <div
                  className="w-2.5 h-2.5 rounded-full transition-opacity"
                  style={{
                    background: isCorrectOpt && isAnsweredNow ? "white" : "#2C5F8D",
                    opacity: isSelectedNow || (isAnsweredNow && isUserPicked) ? 1 : isCorrectOpt && isAnsweredNow ? 1 : 0,
                  }}
                />
              )}
            </div>
            <div className="flex-1 flex items-start justify-between gap-2.5">
              <span>
                <span className="font-semibold text-[#475569]">{LETTERS[i]}.</span>{" "}
                {optionText}
              </span>
              {isAnsweredNow && isCorrectOpt && (
                <span className="shrink-0 text-[#16a34a] mt-0.5">
                  <CheckIcon size={18} />
                </span>
              )}
              {isUserWrong && (
                <span className="shrink-0 text-[#FE5E7E] mt-0.5">
                  <CrossIcon size={18} />
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// RESULT BANNER (right panel answer feedback)
// ═══════════════════════════════════════════════════════
export function ResultBanner({ q, isCorrectAns, credit, isQBank, backendFeedback, getQbankCorrectIndices }) {
  const isPartial = !isCorrectAns && credit.points > 0;
  const bannerBg = isCorrectAns ? "#f0fdf4" : isPartial ? "#fffbeb" : "#fff5f5";
  const iconBg = isCorrectAns ? "#dcfce7" : isPartial ? "#fef3c7" : "#fee2e2";
  const titleColor = isCorrectAns ? "#166534" : isPartial ? "#92400e" : "#991b1b";
  const subColor = isCorrectAns ? "#16a34a" : isPartial ? "#d97706" : "#dc2626";
  const title = isCorrectAns ? "Correct!" : isPartial ? `Partial credit — ${credit.percent}%` : "Incorrect";
  const icon = isCorrectAns ? "✓" : isPartial ? "◐" : "✗";

  let sub;
  if (isCorrectAns) sub = "Well done — see the breakdown below";
  else if (isPartial) sub = `${credit.points} of ${credit.max} correct selections — see breakdown`;
  else if (q.type === "fill-blank" || q.type === "input") {
    if (isQBank) {
      const caVal = backendFeedback[q.id]?.correct_answer;
      const correctDisplay = typeof caVal === "object" ? (caVal.answer || "") : String(caVal || "");
      sub = `Correct answer: ${correctDisplay}`;
    } else {
      const cfg = q.blankInput || {};
      const correctDisplay = Array.isArray(cfg.correct) ? cfg.correct[0] : cfg.correct;
      sub = `Correct answer: ${correctDisplay}${cfg.unit ? ` ${cfg.unit}` : ""}`;
    }
  } else if (q.type === "matrix" || q.type === "cloze") {
    sub = "See the breakdown below";
  } else {
    const correctLetters = isQBank
      ? getQbankCorrectIndices(q).map((ci) => LETTERS[ci]).join(", ")
      : (Array.isArray(q.correct) ? q.correct : [q.correct]).map((ci) => LETTERS[ci]).join(", ");
    sub = `Correct answer: ${correctLetters}`;
  }

  return (
    <div className="px-5 py-3.5 border-b border-[#f1f5f9] shrink-0" style={{ background: bannerBg }}>
      <div className="flex items-center gap-2.5">
        <div className="w-8.5 h-8.5 rounded-lg flex items-center justify-center text-base shrink-0" style={{ background: iconBg }}>
          {icon}
        </div>
        <div>
          <div className="text-sm font-bold" style={{ color: titleColor }}>{title}</div>
          <div className="text-[11px]" style={{ color: subColor }}>{sub}</div>
        </div>
      </div>
    </div>
  );
}
