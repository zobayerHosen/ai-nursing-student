"use client";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const formatAnswerText = (ans) => {
  if (!ans) return null;
  if (typeof ans === "string") return ans;
  if (typeof ans === "number") return String(ans);
  if (Array.isArray(ans)) {
    return ans
      .map((item) => (typeof item === "object" ? item?.text || item?.answer || "" : item))
      .filter(Boolean)
      .join("; ");
  }
  if (typeof ans === "object") {
    if (ans.text) return ans.text;
    if (ans.answer) return `${ans.answer}${ans.unit ? ` ${ans.unit}` : ""}`;
  }
  return String(ans);
};

export default function QuestionReviewItem({ question, index }) {
  const q = question;
  const isCorrect = !!q.is_correct;
  const isSkipped = !!q.is_skipped || !q.user_answer;
  const userAnswerText = formatAnswerText(q.user_answer);
  const correctAnswerText = formatAnswerText(q.correct_answer);

  const level = (q.level || "Intermediate").toLowerCase();
  const levelColor =
    level === "beginner" ? "#16a34a" : level === "advanced" ? "#e11d48" : "#d97706";

  const options = q.option_explanations || [];

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 sm:p-7 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all">
      {/* ─── QUESTION HEADER & TITLE ────────────────────────── */}
      <div className="flex items-start gap-3 sm:gap-4 mb-4">
        {/* Question Index Badge */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] text-[#475569] flex items-center justify-center text-xs sm:text-sm font-bold shrink-0">
          {index + 1}
        </div>

        {/* Title & User Answer Status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="text-[15px] sm:text-base font-semibold text-[#1e293b] leading-relaxed">
              {q.title}
            </h4>

            {q.is_flagged && (
              <span className="shrink-0 px-2 py-0.5 rounded text-[11px] font-bold bg-[#fffbeb] text-[#b45309] border border-[#fde68a] inline-flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>Flagged</span>
              </span>
            )}
          </div>

          {/* User Answer vs Correct Answer Summary */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-[13px] pt-1 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b] font-medium">Your answer:</span>
              {isSkipped ? (
                <span className="font-semibold text-[#94a3b8]">Skipped</span>
              ) : (
                <span
                  className={`font-bold ${
                    isCorrect ? "text-[#16a34a]" : "text-[#e11d48]"
                  }`}
                >
                  {userAnswerText || "Answered"}
                </span>
              )}
            </div>

            {(!isCorrect || isSkipped) && correctAnswerText && (
              <div className="flex items-center gap-1.5">
                <span className="text-[#64748b] font-medium">Correct:</span>
                <span className="font-bold text-[#15803d]">
                  {correctAnswerText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── RATIONALE & EXPLANATION BLOCK ──────────────────── */}
      <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl overflow-hidden mt-4">
        {/* Rationale Section Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-white border-b border-[#e2e8f0]">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#fe5e7e] text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h5 className="text-[14px] sm:text-[15px] font-bold text-[#0f172a] tracking-tight">
              Rationale &amp; Explanation
            </h5>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#16a34a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
            <span>Verified</span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex flex-col gap-4.5">
          {/* Clinical Reasoning — Reading the Trend */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-[3px] h-3.5 bg-[#fe5e7e] rounded-sm shrink-0" />
              <div className="text-[11px] sm:text-xs font-extrabold text-[#fe5e7e] tracking-wider uppercase">
                CLINICAL REASONING — READING THE TREND
              </div>
            </div>
            <p className="text-[13px] sm:text-[13.5px] text-[#334155] leading-relaxed">
              {q.explanation ||
                q.rationale_takeaway ||
                "Understand the pathophysiological mechanisms, clinical priorities, and safety parameters relevant to this scenario."}
            </p>
          </div>

          {/* Why Others Fail / Option Breakdown */}
          {options.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-[3px] h-3.5 bg-[#fe5e7e] rounded-sm shrink-0" />
                <div className="text-[11px] sm:text-xs font-extrabold text-[#fe5e7e] tracking-wider uppercase">
                  WHY OTHERS FAIL / OPTION ANALYSIS
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {options.map((opt, oi) => {
                  const letter = LETTERS[oi] || String(oi + 1);
                  const isOptCorrect = !!opt.is_correct;

                  return (
                    <div
                      key={opt.id || oi}
                      className={`flex items-start gap-3 p-3 sm:p-3.5 border rounded-xl transition-all ${
                        isOptCorrect
                          ? "bg-[#f0fdf4] border-[#bbf7d0]"
                          : "bg-white border-[#e2e8f0]"
                      }`}
                    >
                      {/* Option Letter Badge */}
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-bold ${
                          isOptCorrect
                            ? "bg-[#dcfce7] text-[#16a34a]"
                            : "bg-[#fff1f2] text-[#e11d48]"
                        }`}
                      >
                        {letter}
                      </div>

                      {/* Option Content & Explanation */}
                      <div className="flex-1 text-[13px] text-[#475569] leading-relaxed pt-0.5 min-w-0">
                        <span
                          className={`font-bold mr-1.5 ${
                            isOptCorrect ? "text-[#15803d]" : "text-[#e11d48]"
                          }`}
                        >
                          {isOptCorrect ? "Correct." : `${opt.text}`}
                        </span>

                        {isOptCorrect ? (
                          <span>{opt.text}</span>
                        ) : null}

                        {opt.rationale && (
                          <div className="text-xs text-[#64748b] mt-1 italic">
                            {opt.rationale}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── STATISTICS FOOTER ───────────────────────────────── */}
      <div className="border border-[#e2e8f0] rounded-xl bg-white p-4 sm:p-5 mt-4">
        <div className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-3">
          Statistics
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Left Column: Difficulty & Category */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <div className="w-5 h-5 rounded bg-[#fff1f2] text-[#fe5e7e] flex items-center justify-center text-[10px] shrink-0 font-bold">
                ⚡
              </div>
              <span className="text-[#64748b]">Difficulty level —</span>
              <span
                className="font-bold uppercase tracking-wide"
                style={{ color: levelColor }}
              >
                {q.level || "Intermediate"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#475569]">
              <div className="w-5 h-5 rounded bg-[#fef3c7] text-[#d97706] flex items-center justify-center text-[10px] shrink-0 font-bold">
                ★
              </div>
              <span className="text-[#64748b]">Category —</span>
              <span className="font-bold text-[#1e293b]">
                {q.subtopic || q.topic || q.body_system || "Clinical Concept"}
              </span>
            </div>
          </div>

          {/* Right Column: Badges for Subject, Client Needs, CJMM */}
          <div className="flex flex-wrap items-center gap-2">
            {q.topic && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0] text-[11px] font-semibold">
                Subject: {q.topic}
              </span>
            )}

            {q.client_needs && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#fff7ed] text-[#9a3412] border border-[#fed7aa] text-[11px] font-semibold">
                Client Need: {q.client_needs}
              </span>
            )}

            {q.cjmm_function && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe] text-[11px] font-semibold">
                CJMM: {q.cjmm_function}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
