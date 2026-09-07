"use client";

import { FULL_EXAMS, SAMPLE_QUESTIONS } from "./data";

export default function FullNCLEXSection({ onStartExam, consumedExams }) {
  return (
    <div className="w-full">
      {/* Simulation Exam Card Container */}
      <div className="bg-white rounded-3xl border border-[#e5e9f0] p-4 sm:p-6 lg:p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-[#f1f5f9]">
          <h2 className="text-xl font-bold text-[#0f172a]">
            Your Simulation Exam
          </h2>
          <div className="text-xs sm:text-sm text-[#64748b] flex items-center gap-1.5">
            <span>Adaptive NCLEX-style timing. Review results after completion.</span>
            <svg
              className="w-4 h-4 text-[#94a3b8] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
        </div>

        {/* Exam List */}
        <div className="flex flex-col gap-3 sm:gap-3.5 pt-4 sm:pt-6">
          {FULL_EXAMS.map((exam, i) => {
            const isConsumed = !!(consumedExams && consumedExams[exam.id]);
            const locked = exam.status === "locked" || isConsumed;
            const completed = exam.status === "completed" && !isConsumed;
            const available = exam.status === "available" && !isConsumed;

            return (
              <div
                key={exam.id}
                className="bg-white border border-[#edf2f7] hover:border-[#cbd5e1] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                {/* Left side: Number, Icon, Title, Details */}
                <div className="flex items-center gap-3 sm:gap-4 flex-1">
                  {/* Number Badge */}
                  <div
                    className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      completed
                        ? "bg-[#ecfdf5] text-[#059669]"
                        : available
                        ? "bg-[#f1f5f9] text-[#64748b]"
                        : "bg-[#f8fafc] text-[#94a3b8]"
                    }`}
                  >
                    {exam.order || i + 1}
                  </div>

                  {/* Status Icon Box */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      completed
                        ? "bg-[#dcfce7] text-[#16a34a]"
                        : available
                        ? "bg-[#e0f2fe] text-[#0284c7]"
                        : "bg-[#fff7ed] text-[#ea580c]"
                    }`}
                  >
                    {completed ? (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : available ? (
                      <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-bold text-[15px] sm:text-base text-[#1e293b]">
                        {exam.title}
                      </span>
                      {exam.tag && !isConsumed && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">
                          {exam.tag}
                        </span>
                      )}
                      {isConsumed && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fee2e2] text-[#991b1b]">
                          Locked
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#64748b] font-medium">
                      {exam.questions} Questions • {exam.duration || "2hr 30 min"}
                    </div>
                    {completed && (
                      <div className="text-xs text-[#94a3b8] mt-0.5">
                        Completed {exam.completedDate}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: Action, Status or Score */}
                <div className="flex items-center justify-end gap-4 sm:gap-6 lg:gap-8 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f1f5f9]">
                  {completed ? (
                    <>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border border-[#86efac] bg-[#f0fdf4] text-[#16a34a]">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Completed</span>
                      </div>
                      <div className="text-right min-w-[54px]">
                        <div className="text-2xl font-extrabold text-[#0f172a] leading-none">
                          {exam.score}%
                        </div>
                        <div className="text-[11px] text-[#94a3b8] font-medium mt-0.5">
                          Score
                        </div>
                      </div>
                    </>
                  ) : available ? (
                    <button
                      onClick={() =>
                        onStartExam(SAMPLE_QUESTIONS, "test", exam.title, {
                          examId: exam.id,
                          isFullExam: true,
                        })
                      }
                      className="w-full sm:w-auto bg-[#1E3A5F] hover:bg-[#162e4e] active:scale-[0.99] text-white px-7 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm cursor-pointer"
                    >
                      Start Exam
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#1e293b]">
                      <svg className="w-3.5 h-3.5 text-[#1e293b]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 10H18V7A6 6 0 0 0 6 7V10H5A2 2 0 0 0 3 12V20A2 2 0 0 0 5 22H19A2 2 0 0 0 21 20V12A2 2 0 0 0 19 10ZM8 7A4 4 0 0 1 16 7V10H8V7ZM19 20H5V12H19V20Z" />
                      </svg>
                      <span>{exam.unlockAfter ? `Unlock After ${exam.unlockAfter}` : "Locked"}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
