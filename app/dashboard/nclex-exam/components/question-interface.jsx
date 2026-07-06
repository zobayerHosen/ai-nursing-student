"use client";

import { useState, useEffect, useMemo } from "react";
import { PARTIAL_CREDIT_TYPES, LETTERS } from "./data";
import { RationaleBlock, QuestionStats, Calculator } from "./sub-components";

const NGN_TYPES = new Set(["extended-multi", "matrix", "cloze", "bowtie", "trend", "highlight", "rank"]);

const fmtTime = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => n.toString().padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
};

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
      const norm = (s) => (cfg.caseSensitive ? String(s).trim() : String(s).trim().toLowerCase());
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

const isAnswerScored = (question, userAns) => {
  if (userAns === undefined || userAns === null) return false;
  return getCredit(question, userAns).percent >= 80;
};

export default function QuestionInterface({ questions, mode, title, examMeta, onSessionEnd, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState({});
  const [showNav, setShowNav] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mode === "test" ? 9000 : null);
  const [finished, setFinished] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const q = questions[current];

  const attemptExit = () => {
    const isFullExamInReview = examMeta && examMeta.isFullExam && finished;
    if (isFullExamInReview) {
      setShowExitConfirm(true);
      return;
    }
    confirmExit();
  };

  const confirmExit = () => {
    if (onSessionEnd) {
      onSessionEnd({ answers, flagged, isAnswerScored, examId: examMeta ? examMeta.examId : null, isFullExam: examMeta ? examMeta.isFullExam : false });
    }
    onFinish();
  };

  useEffect(() => {
    if (mode === "test" && timeLeft > 0 && !finished && !paused) {
      const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timeLeft === 0) handleFinish();
  }, [timeLeft, finished, paused]);

  useEffect(() => {
    if (answers[current] !== undefined) {
      setSelected(answers[current]);
      if (mode === "practice") setRevealed(true);
    } else {
      setSelected(null);
      setRevealed(false);
    }
  }, [current]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes scaleIn { from { opacity:0; transform:scale(.97) } to { opacity:1; transform:scale(1) } }
        @keyframes slideInRight { from { opacity:0; transform:translateX(8px) } to { opacity:1; transform:translateX(0) } }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }
  }, []);

  const handleSelect = (i) => {
    if (answers[current] !== undefined) return;
    if (q.multiSelect || q.type === "extended-multi") {
      const cur = Array.isArray(selected) ? selected : [];
      const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i].sort((a, b) => a - b);
      setSelected(next);
    } else {
      setSelected(i);
      if (mode === "practice") {
        setRevealed(true);
        setAnswers((a) => ({ ...a, [current]: i }));
      }
    }
  };

  const handleMatrixSelect = (rowIdx, colIdx) => {
    if (answers[current] !== undefined) return;
    const cur = Array.isArray(selected) ? [...selected] : new Array(q.matrixRows.length).fill(undefined);
    cur[rowIdx] = colIdx;
    setSelected(cur);
  };

  const handleClozeSelect = (blankIdx, optionIdx) => {
    if (answers[current] !== undefined) return;
    const cur = Array.isArray(selected) ? [...selected] : new Array(q.clozeBlanks.length).fill(undefined);
    cur[blankIdx] = optionIdx;
    setSelected(cur);
  };

  const lockTestAnswer = (targetIdx) => {
    if (mode === "test" && selected !== null && answers[current] === undefined) {
      const hasAnswer = Array.isArray(selected) ? selected.length > 0 : true;
      if (hasAnswer) setAnswers((a) => ({ ...a, [current]: selected }));
    }
    setCurrent(targetIdx);
  };

  const handleFinish = () => {
    if (mode === "practice") setFinished(true);
    else {
      setRevealed(true);
      setFinished(true);
    }
  };

  const score = useMemo(() => {
    const answered = Object.keys(answers).length;
    const correct = Object.entries(answers).filter(([idx, ans]) => isAnswerScored(questions[+idx], ans)).length;
    return { answered, correct, total: questions.length, pct: answered > 0 ? Math.round((correct / answered) * 100) : 0 };
  }, [answers, questions]);

  const isAnswered = answers[current] !== undefined;
  const userAnswer = answers[current];
  const isCorrectAns = q ? isAnswerScored(q, userAnswer) : false;

  // Results screen
  if (finished) {
    const pass = score.pct >= 70;
    return (
      <div className="w-full flex-1 overflow-auto bg-[#f4f6f9] p-7 xl:p-8 relative">
        <div className="w-full" style={{ animation: "fadeUp 0.4s ease" }}>
          {/* Hero */}
          <div className="bg-white rounded-xl p-9 mb-4.5 text-center border border-[#e2e8f0] shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <div className="text-xs text-[#94a3b8] font-semibold tracking-widest uppercase mb-2.5">
              Session Complete — {title}
            </div>
            <div
              className="text-[64px] font-black leading-none mb-2"
              style={{ color: pass ? "#16a34a" : "#dc2626" }}
            >
              {score.pct}%
            </div>
            <div className="text-base text-[#64748b] mb-5">
              {score.correct} of {score.total} correct
            </div>
            <div
              className={`inline-flex items-center px-5.5 py-2 rounded-full font-bold text-sm ${
                pass ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#991b1b]"
              }`}
            >
              {pass ? "✓ Passing Score — Great work!" : "Keep Practicing — You're Getting There!"}
            </div>
          </div>

          {/* Filter stats cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3.5">
            {[
              { key: "all", label: "All", val: score.total, color: "#2C5F8D" },
              { key: "correct", label: "Correct", val: score.correct, color: "#16a34a" },
              { key: "incorrect", label: "Incorrect", val: score.answered - score.correct, color: "#dc2626" },
              { key: "flagged", label: "Flagged", val: Object.values(flagged).filter(Boolean).length, color: "#d97706" },
              { key: "skipped", label: "Skipped", val: score.total - score.answered, color: "#94a3b8" },
            ].map((s) => {
              const isActive = reviewFilter === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setReviewFilter(s.key)}
                  className="bg-white rounded-xl p-4 border text-center cursor-pointer transition-all font-sans"
                  style={{
                    borderColor: isActive ? s.color : "#e2e8f0",
                    boxShadow: isActive ? `0 0 0 3px ${s.color}1a, 0 1px 3px rgba(0,0,0,0.04)` : "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <div className="text-[26px] font-extrabold leading-none" style={{ color: s.color }}>
                    {s.val}
                  </div>
                  <div className="text-[11px] text-[#94a3b8] mt-1 font-medium">{s.label}</div>
                </button>
              );
            })}
          </div>

          {/* Pill filter */}
          <div className="inline-flex bg-white border border-[#e2e8f0] rounded-full p-1 mb-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            {[
              { key: "all", label: "ALL" },
              { key: "correct", label: "CORRECT" },
              { key: "incorrect", label: "INCORRECT" },
              { key: "flagged", label: "FLAGGED" },
              { key: "skipped", label: "OMITTED" },
            ].map((p) => {
              const isActive = reviewFilter === p.key;
              return (
                <button
                  key={p.key}
                  onClick={() => setReviewFilter(p.key)}
                  className="px-4 py-1.5 rounded-full border-none text-[11px] font-bold tracking-wide cursor-pointer font-sans transition-all"
                  style={{
                    background: isActive ? "#2C5F8D" : "transparent",
                    color: isActive ? "white" : "#64748b",
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Review list */}
          <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
            <div className="px-6 py-4.5 border-b border-[#f1f5f9] flex items-center justify-between">
              <div className="text-[15px] font-bold text-[#0f172a]">
                {reviewFilter === "all"
                  ? "Full Question Review"
                  : reviewFilter === "correct"
                  ? "Correct Answers"
                  : reviewFilter === "incorrect"
                  ? "Incorrect Answers"
                  : reviewFilter === "flagged"
                  ? "Flagged Questions"
                  : "Skipped Questions"}
              </div>
              <div className="text-xs text-[#94a3b8]">
                {(() => {
                  const filtered = questions.filter((qq, i) => {
                    const userAns = answers[i];
                    const unans = userAns === undefined;
                    if (reviewFilter === "all") return true;
                    if (reviewFilter === "correct") return !unans && isAnswerScored(qq, userAns);
                    if (reviewFilter === "incorrect") return !unans && !isAnswerScored(qq, userAns);
                    if (reviewFilter === "flagged") return !!flagged[i];
                    if (reviewFilter === "skipped") return unans;
                    return true;
                  });
                  return `Showing ${filtered.length} of ${questions.length}`;
                })()}
              </div>
            </div>
            {(() => {
              const visibleEntries = questions
                .map((qq, i) => ({ qq, i }))
                .filter(({ qq, i }) => {
                  const userAns = answers[i];
                  const unans = userAns === undefined;
                  if (reviewFilter === "all") return true;
                  if (reviewFilter === "correct") return !unans && isAnswerScored(qq, userAns);
                  if (reviewFilter === "incorrect") return !unans && !isAnswerScored(qq, userAns);
                  if (reviewFilter === "flagged") return !!flagged[i];
                  if (reviewFilter === "skipped") return unans;
                  return true;
                });

              if (visibleEntries.length === 0) {
                return (
                  <div className="py-16 px-6 text-center">
                    <div className="text-[32px] mb-3 opacity-40">—</div>
                    <div className="text-sm font-semibold text-[#64748b] mb-1.5">
                      No questions match this filter
                    </div>
                    <div className="text-xs text-[#94a3b8]">
                      {reviewFilter === "flagged" && "You didn't flag any questions in this session."}
                      {reviewFilter === "skipped" && "You answered every question — nothing skipped."}
                      {reviewFilter === "incorrect" && "Perfect score — no incorrect answers!"}
                      {reviewFilter === "correct" && "No correct answers in this session."}
                    </div>
                  </div>
                );
              }

              return visibleEntries.map(({ qq, i }, idx) => {
                const userAns = answers[i];
                const isCorrect = isAnswerScored(qq, userAns);
                const credit = getCredit(qq, userAns);
                const unans = userAns === undefined;
                return (
                  <div
                    key={i}
                    className="px-6 py-5"
                    style={{ borderBottom: idx < visibleEntries.length - 1 ? "1px solid #f8fafc" : "none" }}
                  >
                    <div className="flex gap-3.5 items-start mb-3.5">
                      {/* Number bubble */}
                      {(() => {
                        const isPartial = !unans && !isCorrect && credit.points > 0;
                        const bubbleBg = unans ? "#f1f5f9" : isCorrect ? "#dcfce7" : isPartial ? "#fef3c7" : "#fee2e2";
                        const bubbleColor = unans ? "#94a3b8" : isCorrect ? "#16a34a" : isPartial ? "#d97706" : "#dc2626";
                        const bubbleBorder = unans ? "#e2e8f0" : isCorrect ? "#86efac" : isPartial ? "#fcd34d" : "#fca5a5";
                        const bubbleContent = unans ? i + 1 : isCorrect ? "✓" : isPartial ? `${credit.percent}%` : "✗";
                        return (
                          <div
                            className="flex items-center justify-center font-bold flex-shrink-0"
                            style={{
                              width: isPartial ? 40 : 32,
                              height: 32,
                              borderRadius: isPartial ? 16 : "50%",
                              fontSize: isPartial ? 10 : 12,
                              background: bubbleBg,
                              color: bubbleColor,
                              border: `2px solid ${bubbleBorder}`,
                            }}
                          >
                            {bubbleContent}
                          </div>
                        );
                      })()}
                      <div className="flex-1">
                        <div className="text-sm text-[#1e293b] leading-relaxed mb-3 font-medium">
                          {qq.question}
                        </div>
                        <div className="flex gap-2.5 text-xs mb-3.5 flex-wrap">
                          <span className="text-[#94a3b8]">Your answer:</span>
                          <span
                            className="font-semibold"
                            style={{
                              color: unans
                                ? "#94a3b8"
                                : isCorrect
                                ? "#16a34a"
                                : credit.points > 0
                                ? "#d97706"
                                : "#dc2626",
                            }}
                          >
                            {unans
                              ? "Skipped"
                              : qq.type === "matrix"
                              ? `${credit.points} of ${credit.max} rows correct`
                              : qq.type === "cloze"
                              ? `${credit.points} of ${credit.max} blanks correct`
                              : qq.type === "fill-blank"
                              ? String(userAns).trim() || "(empty)"
                              : Array.isArray(userAns)
                              ? userAns.map((ai) => LETTERS[ai]).join(", ")
                              : qq.options[userAns]}
                          </span>
                          {!isCorrect && !unans && qq.type !== "matrix" && qq.type !== "cloze" && (
                            <>
                              <span className="text-[#94a3b8]">Correct:</span>
                              <span className="font-semibold text-[#16a34a]">
                                {qq.type === "fill-blank"
                                  ? (() => {
                                      const cfg = qq.blankInput || {};
                                      const c = Array.isArray(cfg.correct) ? cfg.correct[0] : cfg.correct;
                                      return `${c}${cfg.unit ? ` ${cfg.unit}` : ""}`;
                                    })()
                                  : Array.isArray(qq.correct)
                                  ? qq.correct.map((ci) => LETTERS[ci]).join(", ")
                                  : qq.options[qq.correct]}
                              </span>
                            </>
                          )}
                          {!isCorrect && !unans && credit.points > 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] font-bold text-[11px]">
                              {credit.percent}% credit
                            </span>
                          )}
                        </div>
                      </div>
                      {flagged[i] && <span className="text-amber-500 text-base flex-shrink-0">⚑</span>}
                    </div>

                    <div className="ml-[46px]">
                      <RationaleBlock question={qq} userAnswer={userAns} />
                      <QuestionStats question={qq} />
                    </div>
                  </div>
                );
              });
            })()}
          </div>

          <div className="flex gap-2.5 mt-5 justify-center">
            <button
              onClick={attemptExit}
              className="bg-transparent text-[#6b7280] border border-[#e5e7eb] rounded-lg px-3.5 py-2 font-sans text-xs font-medium cursor-pointer transition-all hover:bg-[#f9fafb] hover:text-[#111827] inline-flex items-center gap-1.5"
            >
              ← Back to Practice
            </button>
            {!(examMeta && examMeta.isFullExam) && (
              <button
                onClick={() => {
                  setCurrent(0);
                  setSelected(null);
                  setRevealed(false);
                  setAnswers({});
                  setFlagged({});
                  setFinished(false);
                  setTimeLeft(mode === "test" ? 9000 : null);
                }}
                className="bg-[#1E3A5F] text-white border-none rounded-lg px-5 py-2.5 font-sans text-[13px] font-semibold cursor-pointer inline-flex items-center gap-1.5 hover:bg-[#162d4a]"
              >
                Retry Session ↺
              </button>
            )}
          </div>
        </div>

        {/* Exit confirm overlay */}
        {showExitConfirm && (
          <ExitConfirmOverlay
            onCancel={() => setShowExitConfirm(false)}
            onConfirm={() => {
              setShowExitConfirm(false);
              confirmExit();
            }}
          />
        )}
      </div>
    );
  }

  // Question screen
  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden bg-[#f4f6f9] relative">
      {/* Top status bar */}
      <div className="w-full bg-[#2C5F8D] px-4 h-11.5 flex items-center justify-between shrink-0 z-11 text-white gap-2">
        <div className="w-full flex items-center gap-2.5  flex-[0_1_auto]">
          <div className="w-full flex items-center gap-1.5 ">
            <span className="text-sm font-extrabold font-serif tracking-tight whitespace-nowrap">
              STEM<span className="text-[#FE5E7E]">RN</span>
            </span>
            <span className="text-[11px] opacity-70 whitespace-nowrap hidden sm:inline">—</span>
            <span className="text-[11px] font-semibold opacity-85 whitespace-nowrap overflow-hidden text-ellipsis hidden sm:inline">
              Student
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center leading-tight flex-[1_1_auto] text-center min-w-0 px-2">
          <div className="text-[11px] font-semibold opacity-95 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            {examMeta && examMeta.isFullExam ? title : mode === "test" ? "Timed Tutorial" : "Tutorial Mode"}
          </div>
          <div className="text-[10px] opacity-65 whitespace-nowrap">
            QID: {q?.id?.replace(/^q/, "") || "—"}
          </div>
        </div>

        <div className="flex flex-col items-end leading-tight flex-[0_1_auto] gap-0.5">
          {mode === "test" && timeLeft !== null && (
            <div
              className="flex items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap"
              style={{ color: timeLeft < 60 ? "#fecaca" : "white" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                Time Remaining :{" "}
                <span className="font-mono font-bold">{fmtTime(timeLeft)}</span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs font-semibold opacity-95 whitespace-nowrap">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <rect x="4" y="5" width="16" height="16" rx="2" /><path d="M9 5V3h6v2" /><line x1="8" y1="11" x2="16" y2="11" /><line x1="8" y1="15" x2="13" y2="15" />
            </svg>
            <span>
              {current + 1} of {questions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Secondary toolbar */}
      <div className="bg-[#3a7ab2] px-3 h-9.5 flex items-center justify-between shrink-0 z-10 gap-1.5">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFlagged((f) => ({ ...f, [current]: !f[current] }))}
            className="flex items-center gap-1.5 px-2 py-1 border-none rounded-sm cursor-pointer transition-all text-[11px] font-semibold tracking-wide font-sans"
            style={{
              background: flagged[current] ? "rgba(255,255,255,0.22)" : "transparent",
              color: "white",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={flagged[current] ? "#fde047" : "none"} stroke={flagged[current] ? "#fde047" : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M4 21V4h13l-2 4 2 4H4" />
            </svg>
            <span className="whitespace-nowrap">{flagged[current] ? "FLAGGED" : "MARK FOR LATER"}</span>
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowCalc((s) => !s)}
            title="Calculator"
            className="w-7 h-7 border-none rounded-sm cursor-pointer flex items-center justify-center"
            style={{
              background: showCalc ? "rgba(255,255,255,0.22)" : "transparent",
              color: "white",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="12" x2="8" y2="12" /><line x1="12" y1="12" x2="12" y2="12" /><line x1="16" y1="12" x2="16" y2="12" />
            </svg>
          </button>
          <button
            onClick={() => setShowNav((s) => !s)}
            title="Navigator"
            className="w-7 h-7 border-none rounded-sm cursor-pointer flex items-center justify-center"
            style={{
              background: showNav ? "rgba(255,255,255,0.22)" : "transparent",
              color: "white",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Split layout */}
      <div className="w-full flex-1 flex overflow-hidden">
        {/* Left - Question */}
        <div className="flex-1 overflow-auto p-5 xl:p-6 min-w-0" style={{ borderRight: revealed ? "1px solid #e2e8f0" : "none" }}>
          <div className="max-w-[920px]" style={{ animation: "fadeUp 0.25s ease" }}>
            {/* Tags */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-[13px] text-[#94a3b8] font-semibold">Q{current + 1}</span>
              <span className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
              <span className="px-2 py-0.5 rounded-full bg-[#eef4fb] text-[#2C5F8D] text-[11px] font-bold">
                {q.category}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-[11px] font-semibold"
                style={{
                  background: q.difficulty === "beginner" ? "#dcfce7" : q.difficulty === "advanced" ? "#fee2e2" : "#fef3c7",
                  color: q.difficulty === "beginner" ? "#166534" : q.difficulty === "advanced" ? "#991b1b" : "#92400e",
                }}
              >
                {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
              </span>
              {(() => {
                let typeLabel = null;
                if (q.type === "extended-multi") typeLabel = "Extended MR";
                else if (q.type === "matrix") typeLabel = "Matrix";
                else if (q.type === "cloze") typeLabel = "Drop-Down";
                else if (q.type === "fill-blank") typeLabel = "Fill-in-the-Blank";
                else if (q.multiSelect) typeLabel = "SATA";
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
              })()}
              <span className="text-[10px] text-[#cbd5e1] ml-auto">{q.nclexCategory}</span>
            </div>

            {/* Question stem */}
            <div className="text-[15.5px] font-medium text-[#0f172a] leading-relaxed mb-5 tracking-tight">
              {q.question}
            </div>

            {/* CLOZE type */}
            {q.type === "cloze" ? (
              <div className="text-[15.5px] leading-[2.2] text-[#0f172a] mb-4.5 p-4.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl">
                {(() => {
                  const parts = q.clozeText.split(/(\{\{\d+\}\})/g);
                  return parts.map((part, pi) => {
                    const m = part.match(/^\{\{(\d+)\}\}$/);
                    if (!m) return <span key={pi}>{part}</span>;
                    const blankIdx = parseInt(m[1], 10);
                    const blank = q.clozeBlanks[blankIdx];
                    if (!blank) return <span key={pi}>[blank {blankIdx} missing]</span>;
                    const userPicks = Array.isArray(userAnswer)
                      ? userAnswer
                      : Array.isArray(selected)
                      ? selected
                      : [];
                    const userPick = userPicks[blankIdx];
                    const correctOpt = blank.correct;
                    const isAnsweredNow = isAnswered;
                    const isEmpty = userPick === undefined;
                    const wasCorrect = isAnsweredNow && userPick === correctOpt;
                    const wasWrong = isAnsweredNow && userPick !== correctOpt;

                    let cls = "font-sans text-sm font-semibold px-1 py-1 border rounded-md cursor-pointer transition-all min-w-[120px] max-w-[280px]";
                    if (isEmpty) cls += " text-[#94a3b8] border-dashed border-[#cbd5e1] bg-white";
                    else if (wasCorrect) cls += " bg-[#ecfdf3] text-[#15803d] border-[#16a34a] cursor-default";
                    else if (wasWrong) cls += " bg-[#fdecef] text-[#b91c1c] border-[#FE5E7E] cursor-default";
                    else cls += " text-[#2C5F8D] border-[#2C5F8D] bg-white hover:bg-[#eef4fb]";

                    return (
                      <span key={pi} className="inline-block relative mx-0.5">
                        <select
                          className={cls}
                          disabled={isAnsweredNow}
                          value={userPick === undefined ? "" : String(userPick)}
                          onChange={(e) => handleClozeSelect(blankIdx, parseInt(e.target.value, 10))}
                          style={{
                            backgroundImage:
                              wasCorrect
                                ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M2 6l3 3 5-6' stroke='%2316a34a' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"
                                : wasWrong
                                ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 3l6 6m0-6l-6 6' stroke='%23FE5E7E' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"
                                : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10' fill='none'%3E%3Cpath d='M2 4l3 3 3-3' stroke='%232C5F8D' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 9px center",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            appearance: "none",
                            paddingRight: 28,
                          }}
                        >
                          <option value="" disabled>
                            Select…
                          </option>
                          {blank.options.map((opt, oi) => (
                            <option key={oi} value={oi}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {wasWrong && (
                          <span className="block text-[11px] text-[#16a34a] font-semibold mt-1 pl-0.5">
                            ✓ {blank.options[correctOpt]}
                          </span>
                        )}
                      </span>
                    );
                  });
                })()}
              </div>
            ) : q.type === "matrix" ? (
              /* MATRIX type */
              <div className="border border-[#e2e8f0] rounded-xl overflow-x-auto mb-4.5 bg-white">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr>
                      <th className="bg-[#f8fafc] text-[#475569] px-3.5 py-2.5 text-center font-bold text-[11px] tracking-wide uppercase border-b border-[#e2e8f0] text-left w-[40%]">
                        {" "}
                      </th>
                      {q.matrixCols.map((col, ci) => (
                        <th
                          key={ci}
                          className="bg-[#f8fafc] text-[#475569] px-3.5 py-2.5 text-center font-bold text-[11px] tracking-wide uppercase border-b border-[#e2e8f0] whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {q.matrixRows.map((row, ri) => {
                      const userPicks = Array.isArray(userAnswer)
                        ? userAnswer
                        : Array.isArray(selected)
                        ? selected
                        : [];
                      const userPickedCol = userPicks[ri];
                      const correctCol = q.correct[ri];
                      const rowAnswered = isAnswered;
                      const rowGotItRight = rowAnswered && userPickedCol === correctCol;
                      return (
                        <tr key={ri}>
                          <td className="px-3.5 py-3 text-[13px] text-[#0f172a] font-medium leading-relaxed border-b border-[#f1f5f9]">
                            <div className="flex items-center">
                              <span className="flex-1">{row}</span>
                              {rowAnswered && (
                                <span className="inline-flex items-center justify-center w-[18px] h-[18px] ml-1.5 flex-shrink-0">
                                  {rowGotItRight ? (
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M4 10.5l4 4 8-9" />
                                    </svg>
                                  ) : (
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#FE5E7E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M5 5l10 10M15 5L5 15" />
                                    </svg>
                                  )}
                                </span>
                              )}
                            </div>
                          </td>
                          {q.matrixCols.map((col, ci) => {
                            const isPicked = userPickedCol === ci;
                            const wasCorrect = rowAnswered && isPicked && ci === correctCol;
                            const wasWrong = rowAnswered && isPicked && ci !== correctCol;
                            const wasCorrectUnpicked = rowAnswered && !isPicked && ci === correctCol;

                            let cellBg = "";
                            let radioBg = "";
                            let radioInner = "";

                            if (wasCorrect) {
                              cellBg = "bg-[#ecfdf3]";
                              radioBg = "border-[#16a34a] bg-[#16a34a]";
                              radioInner = "bg-white opacity-100";
                            } else if (wasWrong) {
                              cellBg = "bg-[#fdecef]";
                              radioBg = "border-[#FE5E7E] bg-[#FE5E7E]";
                              radioInner = "bg-white opacity-100";
                            } else if (wasCorrectUnpicked) {
                              radioBg = "border-[#16a34a] border-dashed";
                            } else if (isPicked && !rowAnswered) {
                              radioBg = "border-[#2C5F8D]";
                              radioInner = "opacity-100";
                            }

                            return (
                              <td key={ci} className="p-0 border-b border-[#f1f5f9]">
                                <div
                                  className={`flex items-center justify-center py-2.5 px-2 cursor-pointer transition-colors min-h-[46px] ${cellBg} ${
                                    rowAnswered ? "cursor-default" : "hover:bg-[#f3f6fa]"
                                  }`}
                                  style={{ borderLeft: "1px solid #f1f5f9" }}
                                  onClick={() => !rowAnswered && handleMatrixSelect(ri, ci)}
                                >
                                  <div
                                    className="w-[18px] h-[18px] rounded-full border flex items-center justify-center flex-shrink-0 transition-all bg-white"
                                    style={{ borderColor: radioBg || "#cbd5e1" }}
                                  >
                                    <div
                                      className={`w-[10px] h-[10px] rounded-full transition-opacity ${radioInner || "opacity-0"}`}
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
            ) : q.type === "fill-blank" ? (
              /* FILL-BLANK type */
              <div className="mb-5">
                {(() => {
                  const cfg = q.blankInput || {};
                  const isAnsweredNow = isAnswered;
                  const userVal = userAnswer !== undefined ? userAnswer : selected !== null ? selected : "";
                  let isUserCorrect = false;
                  if (isAnsweredNow) {
                    if (cfg.kind === "numeric") {
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
                  const correctDisplay = Array.isArray(cfg.correct) ? cfg.correct[0] : cfg.correct;
                  const borderColor = isAnsweredNow ? (isUserCorrect ? "#16a34a" : "#FE5E7E") : "#cbd5e1";
                  const bgColor = isAnsweredNow ? (isUserCorrect ? "#ecfdf3" : "#fdecef") : "white";

                  return (
                    <div>
                      <div
                        className="flex items-center gap-2.5 p-3.5 border rounded-xl transition-all max-w-[480px]"
                        style={{ borderColor, background: bgColor }}
                      >
                        <input
                          type={cfg.kind === "numeric" ? "number" : "text"}
                          step={cfg.kind === "numeric" ? "any" : undefined}
                          value={userVal}
                          disabled={isAnsweredNow}
                          placeholder={cfg.placeholder || (cfg.kind === "numeric" ? "Enter a number" : "Type your answer")}
                          onChange={(e) => setSelected(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !isAnsweredNow && String(selected).trim().length > 0) {
                              if (mode === "practice") {
                                setRevealed(true);
                                setAnswers((a) => ({ ...a, [current]: selected }));
                              }
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
                          <span className="flex-shrink-0">
                            {isUserCorrect ? (
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 10.5l4 4 8-9" />
                              </svg>
                            ) : (
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#FE5E7E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 5l10 10M15 5L5 15" />
                              </svg>
                            )}
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
                  );
                })()}
              </div>
            ) : (
              /* Standard options */
              <div className="flex flex-col gap-px mb-5">
                {q.options.map((opt, i) => {
                  const userAnsArr = Array.isArray(userAnswer) ? userAnswer : userAnswer !== undefined ? [userAnswer] : [];
                  const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
                  const selectedArr = Array.isArray(selected) ? selected : selected !== null ? [selected] : [];
                  const isSelectedNow = selectedArr.includes(i);
                  const isAnsweredNow = isAnswered;
                  const isCorrectOpt = correctArr.includes(i);
                  const isUserPicked = isAnsweredNow && userAnsArr.includes(i);
                  const isUserWrong = isUserPicked && !isCorrectOpt;

                  let optBg = "bg-transparent";
                  let optBorder = "border-transparent";
                  if (!isAnsweredNow && isSelectedNow) {
                    optBg = "bg-[#eaf2fb]";
                    optBorder = "";
                  } else if (isAnsweredNow && isCorrectOpt) {
                    optBg = "bg-[#ecfdf3] !border-[#bbf7d0]";
                    optBorder = "!border-[#bbf7d0]";
                  } else if (isUserWrong) {
                    optBg = "bg-[#fdecef] !border-[#fca5a5]";
                    optBorder = "!border-[#fca5a5]";
                  } else if (isAnsweredNow) {
                    optBg = "bg-transparent";
                  }

                  const isCheckbox = q.multiSelect || q.type === "extended-multi";

                  return (
                    <button
                      key={i}
                      disabled={isAnsweredNow}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left px-3 py-2 rounded-lg border cursor-pointer font-sans text-sm font-normal transition-all flex items-start gap-2.5 leading-relaxed mb-0.5 text-[#1e293b] ${
                        isAnsweredNow ? "cursor-default" : "hover:bg-[#f3f6fa]"
                      } ${optBg} ${optBorder}`}
                      style={{ borderColor: "transparent" }}
                    >
                      <div
                        className={`flex-shrink-0 w-[18px] h-[18px] flex items-center justify-center mt-0.5 border transition-all bg-white ${
                          isCheckbox ? "rounded" : "rounded-full"
                        }`}
                        style={{
                          borderColor:
                            isAnsweredNow && isCorrectOpt
                              ? "#16a34a"
                              : isUserWrong
                              ? "#FE5E7E"
                              : isSelectedNow
                              ? "#2C5F8D"
                              : "#cbd5e1",
                          background:
                            isAnsweredNow && isCorrectOpt
                              ? "#16a34a"
                              : isUserWrong
                              ? "#FE5E7E"
                              : isSelectedNow && isCheckbox
                              ? "#2C5F8D"
                              : "white",
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
                            className="w-[10px] h-[10px] rounded-full transition-opacity"
                            style={{
                              background: isCorrectOpt && isAnsweredNow ? "white" : "#2C5F8D",
                              opacity:
                                isSelectedNow || (isAnsweredNow && isUserPicked) ? 1 : isCorrectOpt && isAnsweredNow ? 1 : 0,
                            }}
                          />
                        )}
                      </div>
                      <div className="flex-1 flex items-start justify-between gap-2.5">
                        <span>
                          <span className="font-semibold text-[#475569]">
                            {LETTERS[i]}.
                          </span>{" "}
                          {opt.slice(3)}
                        </span>
                        {isAnsweredNow && isCorrectOpt && (
                          <span className="flex-shrink-0 text-[#16a34a] mt-0.5">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 10.5l4 4 8-9" />
                            </svg>
                          </span>
                        )}
                        {isUserWrong && (
                          <span className="flex-shrink-0 text-[#FE5E7E] mt-0.5">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 5l10 10M15 5L5 15" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Stats */}
            {mode === "practice" && isAnswered && <QuestionStats question={q} />}

            {/* Submit button */}
            {(() => {
              if (mode !== "practice" || isAnswered) return null;
              let canSubmit = false;
              let needsAll = false;
              let needLabel = "";
              if (q.type === "matrix") {
                const filled = Array.isArray(selected) ? selected.filter((v) => v !== undefined).length : 0;
                canSubmit = filled === q.matrixRows.length;
                needsAll = !canSubmit && filled > 0;
                needLabel = `Answer all ${q.matrixRows.length} rows to submit`;
              } else if (q.type === "cloze") {
                const filled = Array.isArray(selected) ? selected.filter((v) => v !== undefined).length : 0;
                canSubmit = filled === q.clozeBlanks.length;
                needsAll = !canSubmit && filled > 0;
                needLabel = `Fill in all ${q.clozeBlanks.length} blanks to submit`;
              } else if (q.type === "fill-blank") {
                canSubmit = typeof selected === "string" && selected.trim().length > 0;
              } else if (Array.isArray(selected) && selected.length > 0) {
                canSubmit = true;
              } else if (typeof selected === "number") {
                canSubmit = true;
              }
              if (!canSubmit && !needsAll) return null;
              return (
                <div className="flex justify-center mt-4.5 pt-4.5 border-t border-[#f1f5f9] gap-3 items-center">
                  {needsAll && (
                    <span className="text-xs text-amber-600 font-semibold">{needLabel}</span>
                  )}
                  {canSubmit && (
                    <button
                      onClick={() => {
                        setRevealed(true);
                        setAnswers((a) => ({ ...a, [current]: selected }));
                      }}
                      className="bg-[#2C5F8D] text-white border-none rounded-lg px-7 py-2.5 font-sans text-[13px] font-bold cursor-pointer inline-flex items-center gap-1.5 tracking-wide hover:bg-[#1e4773]"
                    >
                      Submit Answer ✓
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
        </div>

        {/* Right - Rationale panel */}
        {revealed && (
          <div
            className="w-[440px] flex-shrink-0 flex flex-col bg-white overflow-hidden animate-[slideInRight_0.25s_ease]"
            style={{ borderLeft: "1px solid #e2e8f0" }}
          >
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Result banner */}
              {(() => {
                const credit = getCredit(q, userAnswer);
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
                else if (q.type === "fill-blank") {
                  const cfg = q.blankInput || {};
                  const correctDisplay = Array.isArray(cfg.correct) ? cfg.correct[0] : cfg.correct;
                  sub = `Correct answer: ${correctDisplay}${cfg.unit ? ` ${cfg.unit}` : ""}`;
                } else if (q.type === "matrix" || q.type === "cloze") {
                  sub = "See the breakdown below";
                } else {
                  const correctLetters = (Array.isArray(q.correct) ? q.correct : [q.correct])
                    .map((ci) => LETTERS[ci])
                    .join(", ");
                  sub = `Correct answer${Array.isArray(q.correct) ? "" : ""}: ${correctLetters}`;
                }
                return (
                  <div
                    className="px-5 py-3.5 border-b border-[#f1f5f9] flex-shrink-0"
                    style={{ background: bannerBg }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-base flex-shrink-0"
                        style={{ background: iconBg }}
                      >
                        {icon}
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: titleColor }}>
                          {title}
                        </div>
                        <div className="text-[11px]" style={{ color: subColor }}>
                          {sub}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Rationale */}
              <div className="flex-1 overflow-auto p-4">
                <RationaleBlock question={q} userAnswer={userAnswer} />
              </div>
            </div>
          </div>
        )}

        {/* Navigator */}
        {showNav && (
          <div
            className="w-[220px] bg-white border-l border-[#e2e8f0] p-4 overflow-auto flex-shrink-0 animate-[slideInRight_0.2s_ease]"
          >
            <div className="text-xs font-bold text-[#0f172a] mb-3">Navigator</div>
            <div className="grid grid-cols-5 gap-1.5 mb-3.5">
              {questions.map((_, i) => {
                const isAns = answers[i] !== undefined;
                const isCur = i === current;
                const isCorr = isAns && isAnswerScored(questions[i], answers[i]);
                const isFlag = flagged[i];
                return (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="w-full aspect-square rounded-lg cursor-pointer text-[11px] font-bold transition-all relative"
                    style={{
                      border: `2px solid ${
                        isCur ? "#2C5F8D" : isAns ? (isCorr ? "#86efac" : "#fca5a5") : "#e2e8f0"
                      }`,
                      background: isCur
                        ? "#eef4fb"
                        : isAns
                        ? isCorr
                          ? "#f0fdf4"
                          : "#fff5f5"
                        : "white",
                      color: isCur
                        ? "#2C5F8D"
                        : isAns
                        ? isCorr
                          ? "#16a34a"
                          : "#dc2626"
                        : "#94a3b8",
                    }}
                  >
                    {i + 1}
                    {isFlag && (
                      <div className="absolute top-0 right-0 w-[6px] h-[6px] rounded-full bg-amber-500" style={{ transform: "translate(2px,-2px)" }} />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-1 mb-3.5">
              {[
                ["#f0fdf4", "#86efac", "Correct"],
                ["#fff5f5", "#fca5a5", "Incorrect"],
                ["#eef4fb", "#2C5F8D", "Current"],
                ["white", "#e2e8f0", "Unanswered"],
              ].map(([bg, bdr, lbl]) => (
                <div key={lbl} className="flex items-center gap-1.5 text-[11px] text-[#94a3b8]">
                  <div
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ background: bg, border: `1.5px solid ${bdr}` }}
                  />
                  {lbl}
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-[#f1f5f9]">
              <div className="text-[10px] text-[#94a3b8] mb-1.5 uppercase tracking-wide">Session Stats</div>
              {[
                ["Answered", Object.keys(answers).length],
                ["Correct", Object.values(answers).filter((a, i) => isAnswerScored(questions[i], a)).length],
                ["Flagged", Object.values(flagged).filter(Boolean).length],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between text-xs mb-1">
                  <span className="text-[#64748b]">{l}</span>
                  <span className="font-bold text-[#0f172a]">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="bg-[#0f3a5f] text-white h-8.5 flex items-stretch justify-between shrink-0 z-11 font-sans text-[13px]">
        <div className="flex items-stretch">
          <button
            onClick={attemptExit}
            className="flex items-center gap-1.5 px-3.5 border-none bg-transparent text-white cursor-pointer text-[13px] font-normal font-sans transition-all h-full"
            style={{ borderRight: "1px solid rgba(255,255,255,0.18)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M16 17l5-5-5-5" /><line x1="21" y1="12" x2="9" y2="12" /><path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
            </svg>
            <span><u>E</u>nd</span>
          </button>
          {mode === "test" && (
            <button
              onClick={() => setPaused((p) => !p)}
              className="flex items-center gap-1.5 px-3.5 border-none cursor-pointer text-[13px] font-normal font-sans transition-all h-full"
              style={{
                borderRight: "1px solid rgba(255,255,255,0.18)",
                background: paused ? "rgba(252,211,77,0.18)" : "transparent",
                color: paused ? "#fde047" : "white",
              }}
            >
              {paused ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="flex-shrink-0">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <line x1="9" y1="4" x2="9" y2="20" /><line x1="15" y1="4" x2="15" y2="20" />
                </svg>
              )}
              <span><u>{paused ? "R" : "P"}</u>{paused ? "esume" : "ause"}</span>
            </button>
          )}
        </div>
        <div className="flex items-stretch">
          <button
            onClick={() => {
              mode === "test" ? lockTestAnswer(Math.max(0, current - 1)) : setCurrent((c) => Math.max(0, c - 1));
            }}
            disabled={current === 0}
            className="flex items-center gap-1.5 px-3.5 border-none bg-transparent cursor-pointer text-[13px] font-normal font-sans transition-all h-full"
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.18)",
              color: "white",
              opacity: current === 0 ? 0.4 : 1,
              cursor: current === 0 ? "not-allowed" : "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            <span><u>P</u>revious</span>
          </button>
          <button
            onClick={() => {
              if (mode === "test") {
                if (current < questions.length - 1) {
                  lockTestAnswer(current + 1);
                } else {
                  if (selected !== null && answers[current] === undefined)
                    setAnswers((a) => ({ ...a, [current]: selected }));
                  handleFinish();
                }
              } else {
                if (!isAnswered) {
                  let hasSelection = false;
                  if (q.type === "matrix") {
                    const filled = Array.isArray(selected) ? selected.filter((v) => v !== undefined).length : 0;
                    hasSelection = filled === q.matrixRows.length;
                  } else if (q.type === "cloze") {
                    const filled = Array.isArray(selected) ? selected.filter((v) => v !== undefined).length : 0;
                    hasSelection = filled === q.clozeBlanks.length;
                  } else if (q.type === "fill-blank") {
                    hasSelection = typeof selected === "string" && selected.trim().length > 0;
                  } else if (Array.isArray(selected) && selected.length > 0) {
                    hasSelection = true;
                  } else if (typeof selected === "number") {
                    hasSelection = true;
                  }
                  if (hasSelection) {
                    setRevealed(true);
                    setAnswers((a) => ({ ...a, [current]: selected }));
                  } else {
                    return;
                  }
                } else {
                  if (current < questions.length - 1) setCurrent((c) => c + 1);
                  else handleFinish();
                }
              }
            }}
            className="flex items-center gap-1.5 px-3.5 border-none bg-transparent text-white cursor-pointer text-[13px] font-normal font-sans transition-all h-full"
            style={{ borderLeft: "1px solid rgba(255,255,255,0.18)" }}
          >
            {current < questions.length - 1 ? (
              <>
                <span><u>N</u>ext</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            ) : (
              <>
                <span><u>F</u>inish</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Pause overlay */}
      {paused && mode === "test" && (
        <div className="absolute inset-0 bg-[#0f172a/92] z-[300] flex items-center justify-center backdrop-blur-lg">
          <div className="text-center" style={{ animation: "scaleIn 0.2s ease" }}>
            <div className="text-[64px] mb-3.5">⏸</div>
            <div className="text-2xl font-extrabold text-white mb-1.5 font-serif">Exam Paused</div>
            <div className="text-sm text-[#cbd5e1] mb-6">The timer is frozen. Click Resume when you're ready.</div>
            <button
              onClick={() => setPaused(false)}
              className="bg-[#FE5E7E] text-white border-none rounded-lg px-8 py-3 font-sans text-sm font-bold cursor-pointer inline-flex items-center gap-2 tracking-wide"
            >
              <span className="text-sm">▶</span> Resume
            </button>
          </div>
        </div>
      )}

      {/* Exit confirm */}
      {showExitConfirm && <ExitConfirmOverlay onCancel={() => setShowExitConfirm(false)} onConfirm={() => { setShowExitConfirm(false); confirmExit(); }} />}

      {/* Calculator */}
      {showCalc && (
        <div className="absolute z-[200] top-[92px]" style={{ right: showNav ? 250 : 16, animation: "scaleIn 0.2s ease" }}>
          <div className="relative">
            <button
              onClick={() => setShowCalc(false)}
              className="absolute -top-2 -right-2 w-[22px] h-[22px] rounded-full bg-red-500 border-2 border-white text-white text-[11px] cursor-pointer flex items-center justify-center font-bold z-[201] shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
            >
              ✕
            </button>
            <Calculator />
          </div>
        </div>
      )}
    </div>
  );
}

function ExitConfirmOverlay({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-[#0f172a]/70 z-400 flex items-center justify-center backdrop-blur-md p-5">
      <div
        className="bg-white rounded-xl p-7 max-w-120 w-full shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
        style={{ animation: "scaleIn 0.2s ease" }}
      >
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#fee2e2] flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[17px] font-extrabold text-[#0f172a] mb-1.5 tracking-tight">
              Lock and exit this exam?
            </div>
            <div className="text-[13.5px] text-[#475569] leading-relaxed">
              This is a <strong>Next-Gen NCLEX RN Simulator</strong> exam. Once you exit, this exam will be{" "}
              <strong className="text-[#dc2626]">permanently locked</strong> — you won't be able to retake it or review
              your answers again.
            </div>
          </div>
        </div>
        <div className="bg-[#fef3c7] border border-[#fde68a] rounded-lg px-3.5 py-2.5 mb-2.5 text-xs text-[#78350f] leading-relaxed">
          💡 If you'd like to spend more time reviewing your rationales, click Cancel — there's no time limit on the review screen.
        </div>
        <div className="bg-[#fef2f2] border border-[#fecaca] rounded-lg px-3.5 py-2.5 mb-4.5 text-xs text-[#7f1d1d] leading-relaxed flex gap-2 items-start">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span><strong>Account Integrity Notice:</strong> Sharing exam content, taking screenshots, downloading, copying, or pasting any part of this exam will result in <strong>permanent termination of your account</strong> with no refund.</span>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="bg-white text-[#475569] border border-[#e2e8f0] rounded-lg px-5 py-2.5 font-sans text-[13px] font-semibold cursor-pointer transition-all hover:bg-[#f8fafc]"
          >
            Cancel — keep reviewing
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#dc2626] text-white border-none rounded-lg px-5 py-2.5 font-sans text-[13px] font-bold cursor-pointer transition-all hover:bg-[#991b1b]"
          >
            Lock exam &amp; exit
          </button>
        </div>
      </div>
    </div>
  );
}
