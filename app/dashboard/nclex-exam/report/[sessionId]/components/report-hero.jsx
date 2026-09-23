"use client";

export default function ReportHero({
  examTitle,
  examSubtitle,
  score = 0,
  passed = false,
  totalCorrect = 0,
  totalQuestions = 0,
  readinessLevel,
}) {
  const isPassing = passed || score >= 70;
  const roundedScore = typeof score === "number" ? Math.round(score * 10) / 10 : 0;

  return (
    <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 mb-5 text-center border border-[#e2e8f0] shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      {/* Session Title Header */}
      <div className="text-[11px] sm:text-xs text-[#64748b] font-bold tracking-widest uppercase mb-2 sm:mb-3">
        SESSION COMPLETE — {examTitle || "NCLEX SIMULATION"}
        {examSubtitle ? ` • ${examSubtitle}` : ""}
      </div>

      {/* Main Score Display */}
      <div
        className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none mb-2 sm:mb-3 transition-colors"
        style={{ color: isPassing ? "#16a34a" : "#e11d48" }}
      >
        {roundedScore}%
      </div>

      {/* Correct / Total Subtext */}
      <div className="text-sm sm:text-base text-[#64748b] font-medium mb-4 sm:mb-5">
        <span className="font-bold text-[#1e293b]">{totalCorrect}</span> of{" "}
        <span className="font-bold text-[#1e293b]">{totalQuestions}</span> correct
      </div>

      {/* Readiness / Passing Status Badge */}
      <div className="inline-flex items-center gap-2 flex-wrap justify-center">
        <div
          className={`inline-flex items-center gap-1.5 px-4 sm:px-5.5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm border shadow-xs transition-all ${
            isPassing
              ? "bg-[#ecfdf5] border-[#a7f3d0] text-[#15803d]"
              : "bg-[#fff1f2] border-[#fecdd3] text-[#e11d48]"
          }`}
        >
          {isPassing ? (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Passing Score — Great work!</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#e11d48] animate-pulse" />
              <span>Keep Practicing — You&apos;re Getting There!</span>
            </>
          )}
        </div>

        {readinessLevel && (
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#f8fafc] border border-[#e2e8f0] text-[#475569]">
            Readiness: <strong className="ml-1 text-[#1e293b]">{readinessLevel}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
