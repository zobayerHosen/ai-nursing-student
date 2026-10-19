"use client";

import { useState } from "react";
import Link from "next/link";
import { LETTERS } from "../data";
import { RationaleBlock, QuestionStats } from "../sub-components";
import { PeerSolveBadge } from "./question-renderers";

function ExitConfirmOverlay({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-[#0f172a]/70 z-400 flex items-center justify-center backdrop-blur-md p-5">
      <div
        className="bg-white rounded-xl p-7 max-w-120 w-full shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
        style={{ animation: "scaleIn 0.2s ease" }}
      >
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-lg bg-error-100 flex items-center justify-center shrink-0">
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
              <strong className="text-error">permanently locked</strong> — you won&apos;t be able to retake it or review
              your answers again.
            </div>
          </div>
        </div>
        <div className="bg-[#fef3c7] border border-[#fde68a] rounded-lg px-3.5 py-2.5 mb-2.5 text-xs text-[#78350f] leading-relaxed">
          💡 If you&apos;d like to spend more time reviewing your rationales, click Cancel — there&apos;s no time limit on the review screen.
        </div>
        <div className="bg-error-50 border border-[#fecaca] rounded-lg px-3.5 py-2.5 mb-4.5 text-xs text-[#7f1d1d] leading-relaxed flex gap-2 items-start">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
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
            className="bg-error text-white border-none rounded-lg px-5 py-2.5 font-sans text-[13px] font-bold cursor-pointer transition-all hover:bg-[#991b1b]"
          >
            Lock exam &amp; exit
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsScreen({
  score,
  title,
  questions,
  answers,
  flagged = {},
  isQBank,
  backendFeedback,
  examMeta,
  localIsAnswerScored,
  localGetCredit,
  getQbankCorrectIndices,
  onSessionEnd,
  onFinish,
  onRetrySession,
}) {
  const [reviewFilter, setReviewFilter] = useState("all");
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const confirmExit = () => {
    if (onSessionEnd) {
      onSessionEnd({
        answers,
        flagged,
        isAnswerScored: localIsAnswerScored,
        examId: examMeta ? examMeta.examId : null,
        isFullExam: examMeta ? examMeta.isFullExam : false,
      });
    }
    if (onFinish) onFinish();
  };

  const attemptExit = () => {
    const isFullExamInReview = examMeta && examMeta.isFullExam;
    if (isFullExamInReview) {
      setShowExitConfirm(true);
      return;
    }
    confirmExit();
  };

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
            className={`inline-flex items-center px-5.5 py-2 rounded-full font-bold text-sm ${pass ? "bg-success-100 text-[#166534]" : "bg-error-100 text-[#991b1b]"
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
            // { key: "flagged", label: "Flagged", val: Object.values(flagged).filter(Boolean).length, color: "#d97706" },
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
            // { key: "flagged", label: "FLAGGED" },
            { key: "skipped", label: "SKIPPED" },
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
                  if (reviewFilter === "correct") return !unans && localIsAnswerScored(qq, userAns);
                  if (reviewFilter === "incorrect") return !unans && !localIsAnswerScored(qq, userAns);
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
                if (reviewFilter === "correct") return !unans && localIsAnswerScored(qq, userAns);
                if (reviewFilter === "incorrect") return !unans && !localIsAnswerScored(qq, userAns);
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
              const isCorrect = localIsAnswerScored(qq, userAns);
              const credit = localGetCredit(qq, userAns);
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
                          className="flex items-center justify-center font-bold shrink-0"
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
                                : (qq.type === "fill-blank" || qq.type === "input")
                                  ? String(userAns).trim() || "(empty)"
                                  : Array.isArray(userAns)
                                    ? userAns.map((ai) => LETTERS[ai]).join(", ")
                                    : qq.options[userAns]}
                        </span>
                        {!isCorrect && !unans && qq.type !== "matrix" && qq.type !== "cloze" && (
                          <>
                            <span className="text-[#94a3b8]">Correct:</span>
                            <span className="font-semibold text-[#16a34a]">
                              {isQBank
                                ? (() => {
                                  const indices = getQbankCorrectIndices(qq);
                                  if (qq.type === "fill-blank" || qq.type === "input") {
                                    const caVal = backendFeedback[qq.id]?.correct_answer;
                                    return typeof caVal === "object" ? (caVal.answer || "") : String(caVal || "");
                                  }
                                  return qq.type === "radio" || qq.type === "multiple" || qq.type === "highlight" || qq.type === "order"
                                    ? indices.map((ci) => LETTERS[ci]).join(", ")
                                    : "";
                                })()
                                : (qq.type === "fill-blank" || qq.type === "input")
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
                    {flagged[i] && <span className="text-amber-500 text-base shrink-0">⚑</span>}
                  </div>

                  <div>
                    <RationaleBlock question={qq} userAnswer={userAns} isQBank={isQBank} backendFeedback={backendFeedback} />
                    {!isQBank && <QuestionStats question={qq} backendFeedback={backendFeedback} />}
                    {isQBank && <PeerSolveBadge feedback={backendFeedback?.[qq?.id] || backendFeedback?.[qq?.question_id]} question={qq} className="mt-3" />}
                  </div>
                </div>
              );
            });
          })()}
        </div>

        <div className="flex gap-2.5 mt-5 justify-center flex-wrap items-center">
          <button
            onClick={attemptExit}
            className="bg-transparent text-[#6b7280] border border-[#e5e7eb] rounded-lg px-4 py-2 font-sans text-xs font-medium cursor-pointer transition-all hover:bg-[#f9fafb] hover:text-text-primary inline-flex items-center gap-1.5"
          >
            ← Back to Practice
          </button>
          {examMeta?.sessionId && (
            <Link
              href={`/dashboard/nclex-exam/report/${examMeta.sessionId}`}
              className="bg-[#1E3A5F] text-white border-none rounded-lg px-5 py-2 font-sans text-xs sm:text-sm font-semibold cursor-pointer inline-flex items-center gap-1.5 hover:bg-[#162d4a] transition-all shadow-xs"
            >
              <span>View Full Performance Report</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          )}
          {!(examMeta && examMeta.isFullExam) && (
            <button
              onClick={onRetrySession}
              className="bg-[#1E3A5F] text-white border-none rounded-lg px-5 py-2 font-sans text-xs sm:text-sm font-semibold cursor-pointer inline-flex items-center gap-1.5 hover:bg-[#162d4a]"
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
