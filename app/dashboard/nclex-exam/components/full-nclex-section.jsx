"use client";

import { useGetExamList } from "@/hooks";
import Link from "next/link";

const fmtRemaining = (sec) => {
  if (sec === null || sec === undefined || sec <= 0) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

export default function FullNCLEXSection({
  onStartExam,
  onResumeExam,
  onReviewExam,
  isStarting = false,
  activeStartingExamId = null,
}) {
  const { examsCategoryList, isLoading, isError, refetch } = useGetExamList();
  console.log("NCLEX examsCategoryList", examsCategoryList);

  return (
    <div className="w-full">
      {/* Simulation Exam Card Container */}
      <div className="bg-white rounded-3xl border border-[#e5e9f0] p-4 sm:p-6 lg:p-8 shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-[#f1f5f9]">
          <div>
            <h2 className="text-xl font-bold text-[#0f172a]">
              Next-Gen NCLEX Simulation examsCategoryList
            </h2>
            <p className="text-xs text-[#64748b] mt-0.5">
              Complete each stage sequentially to unlock the next level.
            </p>
          </div>
          <div className="text-xs sm:text-sm text-[#64748b] flex items-center gap-1.5">
            <span>Adaptive NCLEX-style timing (150 min). Full analytics report upon completion.</span>
          </div>
        </div>

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="flex flex-col gap-3 sm:gap-3.5 pt-4 sm:pt-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="bg-white border border-[#edf2f7] rounded-xl p-4 sm:p-5 flex items-center justify-between animate-pulse"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-8 h-8 rounded-full bg-slate-200" />
                  <div className="w-10 h-10 rounded-lg bg-slate-200" />
                  <div className="space-y-2 flex-1 max-w-sm">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
                <div className="w-28 h-9 bg-slate-200 rounded-lg" />
              </div>
            ))}
          </div>
        ) : isError || !examsCategoryList || examsCategoryList.length === 0 ? (
          /* No Data Found UI */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center mb-4 text-[#94a3b8] shadow-xs">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M10 4v4" />
                <path d="M2 8h20" />
                <line x1="9" y1="13" x2="15" y2="17" />
                <line x1="15" y1="13" x2="9" y2="17" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0f172a] mb-1">
              No Data Found
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm leading-relaxed mb-5">
              {isError
                ? "Failed to retrieve simulation examsCategoryList from the server. Please try refreshing."
                : "No simulation exam categories are currently available for your account."}
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#162e4e] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2 shadow-xs"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              <span>Try Again</span>
            </button>
          </div>
        ) : (
          /* Exam List from API */
          <div className="flex flex-col gap-3 sm:gap-3.5 pt-4 sm:pt-6">
            {examsCategoryList?.map((exam, i) => {
              const isCompleted = exam.status === "completed" || exam.can_review;
              const canResume = !isCompleted && (exam.can_resume || exam.status === "in_progress");
              const isAvailable = !isCompleted && !canResume && (exam.can_start || exam.is_unlocked);

              const remainingFormatted = fmtRemaining(exam.remaining_seconds);

              return (
                <div
                  key={exam.id || i}
                  className={`bg-white border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${isCompleted
                    ? "border-[#edf2f7] hover:border-[#cbd5e1]"
                    : canResume
                      ? "border-[#bae6fd] bg-info-50/30"
                      : isAvailable
                        ? "border-[#cbd5e1] hover:border-[#94a3b8]"
                        : "border-[#f1f5f9] bg-[#fafafa] opacity-85"
                    }`}
                >
                  {/* Left side: Number, Icon, Title, Details */}
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Number Badge */}
                    <div
                      className={`w-7.5 h-7.5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isCompleted
                        ? "bg-[#ecfdf5] text-[#16a34a]"
                        : canResume
                          ? "bg-info-100 text-info"
                          : isAvailable
                            ? "bg-[#eff6ff] text-[#1E3A5F]"
                            : "bg-[#f1f5f9] text-[#94a3b8]"
                        }`}
                    >
                      {exam.order || i + 1}
                    </div>

                    {/* Status Icon Box */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isCompleted
                        ? "bg-[#dcfce7] text-[#16a34a]"
                        : canResume
                          ? "bg-info-100 text-info"
                          : isAvailable
                            ? "bg-[#eef4fb] text-[#1E3A5F]"
                            : "bg-[#f1f5f9] text-[#94a3b8]"
                        }`}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : canResume ? (
                        <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      ) : isAvailable ? (
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
                          {exam?.title ?? "N/A"}
                        </span>

                        {exam?.tag && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fffbeb] text-[#b45309] border border-[#fde68a]">
                            {exam?.tag}
                          </span>
                        )}

                        {canResume && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-info-100 text-[#0369a1] border border-[#bae6fd]">
                            In Progress
                          </span>
                        )}

                        {/* {exam.readiness_level && isCompleted && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0]">
                            {exam.readiness_level}
                          </span>
                        )} */}
                      </div>

                      <p className="text-xs text-[#64748b] font-medium">
                        {exam?.total_question || exam?.total_questions || 85} Questions • {exam?.time_limit_mins || 150} Minutes
                        {/* {exam?.level && ` • ${exam?.level}`} */}
                      </p>

                      {isCompleted && exam?.completed_date && (
                        <div className="text-xs text-[#94a3b8] mt-0.5">
                          Completed {exam?.completed_date}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side: Action, Status or Score */}
                  <div className="flex items-center justify-end gap-3 sm:gap-4 lg:gap-6 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f1f5f9]">
                    {isCompleted ? (
                      <div className="flex items-center gap-3">

                        {/* completed badge and report see button */}
                        <div className="flex items-center gap-1.5">

                        



                          {exam.session_id ? (
                            <Link
                              href={`/dashboard/nclex-exam/report/${exam.session_id}`}
                              className="bg-white hover:bg-[#f8fafc] text-[#1E3A5F] border border-[#1E3A5F] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                              <span>Report</span>
                            </Link>
                          ) : (
                            <button
                              onClick={() => onReviewExam && onReviewExam(exam)}
                              className="bg-white hover:bg-[#f8fafc] text-[#1E3A5F] border border-[#1E3A5F] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                              <span>Report</span>
                            </button>
                          )}
                        </div>


                        <div className="text-right min-w-12">
                          <span className="text-xl sm:text-2xl font-black text-[#0f172a] leading-none">
                            {exam?.score != null ? `${Math.round(exam?.score)}%` : "Done"}
                          </span>
                          <div className="text-[11px] text-[#94a3b8] font-medium mt-0.5">
                            Score
                          </div>
                        </div>
                      </div>
                    ) : canResume ? (
                      <button
                        onClick={() => onResumeExam && onResumeExam(exam)}
                        disabled={isStarting}
                        className="w-full sm:w-auto bg-info hover:bg-[#0369a1] active:scale-[0.99] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isStarting && (activeStartingExamId === exam.id || activeStartingExamId === null) ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                            <span>Resuming...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            <span>
                              Resume Exam {remainingFormatted ? `(${remainingFormatted})` : ""}
                            </span>
                          </>
                        )}
                      </button>
                    ) : isAvailable ? (
                      <button
                        onClick={() => onStartExam && onStartExam(exam)}
                        disabled={isStarting}
                        className="w-full sm:w-auto bg-[#1E3A5F] hover:bg-[#162e4e] active:scale-[0.99] text-white px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isStarting && (activeStartingExamId === exam.id || activeStartingExamId === null) ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                            <span>Starting...</span>
                          </>
                        ) : (
                          <>
                            <span>Start Exam</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#94a3b8] bg-[#f1f5f9] px-3.5 py-2 rounded-lg border border-[#e2e8f0]">
                        <svg className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 10H18V7A6 6 0 0 0 6 7V10H5A2 2 0 0 0 3 12V20A2 2 0 0 0 5 22H19A2 2 0 0 0 21 20V12A2 2 0 0 0 19 10ZM8 7A4 4 0 0 1 16 7V10H8V7ZM19 20H5V12H19V20Z" />
                        </svg>
                        <span className="truncate max-w-64 sm:max-w-xs">
                          {exam.lock_message || (exam.order > 1 ? `Complete Exam ${exam.order - 1} to unlock` : "Locked")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}