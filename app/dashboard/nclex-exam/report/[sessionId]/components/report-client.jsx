"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetExamReview } from "@/hooks";
import ReportHero from "./report-hero";
import ReportFilters from "./report-filters";
import QuestionReviewItem from "./question-review-item";
import PerformanceAnalytics from "./performance-analytics";

export default function ReportClient() {
  const params = useParams();
  const sessionId = params?.sessionId;

  const { reviewData, isLoading, isError, refetch } = useGetExamReview(sessionId);

  const [activeTab, setActiveTab] = useState("questions"); // "questions" | "analytics"
  const [activeFilter, setActiveFilter] = useState("all"); // "all" | "correct" | "incorrect" | "flagged" | "skipped"

  const examInfo = reviewData;
  const result = reviewData?.result;
  const questions = useMemo(() => reviewData?.result?.review ?? [], [reviewData?.result?.review]);

  // Compute stats for 5 top cards
  const stats = useMemo(() => {
    const total = result?.total_questions ?? questions.length;
    const correct = result?.total_correct ?? questions.filter((q) => q.is_correct).length;
    const flagged = questions.filter((q) => q.is_flagged).length;
    const skipped =
      result?.total_skipped ?? questions.filter((q) => q.is_skipped || !q.user_answer).length;
    const incorrect =
      result?.total_incorrect ??
      questions.filter((q) => !q.is_correct && !q.is_skipped && q.user_answer != null).length;

    return { total, correct, incorrect, flagged, skipped };
  }, [result?.total_questions, result?.total_correct, result?.total_skipped, result?.total_incorrect, questions]);

  // Filtered questions list
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const isCorrect = !!q.is_correct;
      const isSkipped = !!q.is_skipped || !q.user_answer;
      const isIncorrect = !isCorrect && !isSkipped;
      const isFlagged = !!q.is_flagged;

      if (activeFilter === "all") return true;
      if (activeFilter === "correct") return isCorrect;
      if (activeFilter === "incorrect") return isIncorrect;
      if (activeFilter === "flagged") return isFlagged;
      if (activeFilter === "skipped") return isSkipped;
      return true;
    });
  }, [questions, activeFilter]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8fafc] px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-5">
          {/* Top Bar Skeleton */}
          <div className="h-9 w-48 bg-slate-200 rounded-lg animate-pulse" />

          {/* Hero Skeleton */}
          <div className="h-56 bg-white rounded-3xl border border-[#e2e8f0] p-8 flex flex-col items-center justify-center gap-4 animate-pulse">
            <div className="h-4 w-40 bg-slate-200 rounded" />
            <div className="h-16 w-32 bg-slate-200 rounded-xl" />
            <div className="h-4 w-48 bg-slate-100 rounded" />
          </div>

          {/* Stat Cards Skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-white rounded-xl border border-[#e2e8f0] animate-pulse" />
            ))}
          </div>

          {/* Question Review Skeleton */}
          <div className="space-y-4 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-2xl border border-[#e2e8f0] p-6 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !reviewData) {
    return (
      <div className="w-full min-h-screen bg-[#f8fafc] px-4 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-center mb-4 text-[#94a3b8] shadow-xs">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M10 4v4" />
            <path d="M2 8h20" />
            <line x1="9" y1="13" x2="15" y2="17" />
            <line x1="15" y1="13" x2="9" y2="17" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[#0f172a] mb-1">Report Not Found</h2>
        <p className="text-xs sm:text-sm text-[#64748b] max-w-sm mb-6">
          Unable to retrieve the exam review session. Please verify the session or try refreshing.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#162e4e] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/dashboard/nclex-exam"
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#334155] text-xs font-semibold rounded-lg transition-colors"
          >
            Back to NCLEX Simulator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] pb-16">
      {/* ─── STICKY TOP NAV ────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-[#e2e8f0] px-4 sm:px-6 lg:px-8 py-3.5 sticky top-0 z-20 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/dashboard/nclex-exam"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#64748b] hover:text-[#1E3A5F] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Back to Simulation Exams</span>
          </Link>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-[#f1f5f9] p-1 rounded-xl border border-[#e2e8f0]">
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "questions"
                  ? "bg-white text-[#1E3A5F] shadow-xs"
                  : "text-[#64748b] hover:text-[#1E3A5F]"
              }`}
            >
              Question Review
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-white text-[#1E3A5F] shadow-xs"
                  : "text-[#64748b] hover:text-[#1E3A5F]"
              }`}
            >
              Performance Analytics
            </button>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT CONTAINER ────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Top Hero Card */}
        <ReportHero
          examTitle={examInfo.exam_title}
          examSubtitle={examInfo.exam_subtitle}
          score={examInfo.score ?? result.overall_score ?? 0}
          passed={result.passed}
          totalCorrect={stats.correct}
          totalQuestions={stats.total}
          readinessLevel={examInfo.readiness_level || result.readiness_level}
        />

        {/* Tab 1: Question Review */}
        {activeTab === "questions" ? (
          <div>
            {/* 5 Filter Cards & Pill Selector */}
            <ReportFilters
              stats={stats}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Questions Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e2e8f0]">
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a]">
                {activeFilter === "all"
                  ? "All Questions Breakdown"
                  : activeFilter === "correct"
                  ? "Correct Questions"
                  : activeFilter === "incorrect"
                  ? "Incorrect Questions"
                  : activeFilter === "flagged"
                  ? "Flagged Questions"
                  : "Skipped / Omitted Questions"}
              </h3>
              <span className="text-xs text-[#64748b]">
                Showing {filteredQuestions.length} of {questions.length}
              </span>
            </div>

            {/* Questions List */}
            {filteredQuestions.length === 0 ? (
              <div className="bg-white border border-[#e2e8f0] rounded-2xl p-12 text-center my-4">
                <div className="text-3xl mb-2">📋</div>
                <h4 className="text-sm font-bold text-[#1e293b] mb-1">
                  No questions match the selected filter
                </h4>
                <p className="text-xs text-[#64748b]">
                  Try selecting &quot;ALL&quot; to see the entire question review.
                </p>
              </div>
            ) : (
              <div>
                {filteredQuestions.map((q, idx) => (
                  <QuestionReviewItem
                    key={q.question_id || idx}
                    question={q}
                    index={idx}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Tab 2: Performance Analytics */
          <PerformanceAnalytics result={result} />
        )}
      </div>
    </div>
  );
}
