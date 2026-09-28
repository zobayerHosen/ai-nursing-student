"use client";

import { useExamPerformance } from "@/hooks";
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  BookOpen,
  Target,
} from "lucide-react";
import { useMemo } from "react";

// SKELETON LOADING
function PerformanceSkeleton() {
  return (
    <div className="w-full space-y-5 animate-pulse">
      {/* Row 1: Overall Progress & Metrics */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left: Donut Chart Skeleton */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="w-40 h-6 bg-slate-200 rounded mb-5" />
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 my-auto">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-slate-100 border-16 border-slate-200" />
                <div className="text-center mt-3">
                  <div className="w-20 h-4 bg-slate-200 rounded mx-auto mb-1" />
                  <div className="w-16 h-3 bg-slate-100 rounded mx-auto" />
                </div>
              </div>
              <div className="flex-1 w-full flex flex-col justify-center space-y-4 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                      <div>
                        <div className="w-20 h-3.5 bg-slate-200 rounded mb-1" />
                        <div className="w-16 h-2.5 bg-slate-100 rounded hidden sm:block" />
                      </div>
                    </div>
                    <div className="w-14 h-4 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 2x2 Metric Cards Skeleton */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#f8fafc]/80 rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="w-20 h-3 bg-slate-200 rounded mb-3" />
                    <div className="w-16 h-8 bg-slate-200 rounded" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-200" />
                </div>
                <div className="w-28 h-3 bg-slate-100 rounded mt-3" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Topic Mastery Skeleton */}
      <div className="space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="w-36 h-6 bg-slate-200 rounded" />
          <div className="flex items-center gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <div className="w-14 h-3 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col justify-between shadow-xs"
            >
              <div className="flex items-start gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-200 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="w-24 h-3.5 bg-slate-200 rounded mb-1.5" />
                  <div className="w-32 h-2.5 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="mt-4 pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-10 h-4 bg-slate-200 rounded" />
                  <div className="w-16 h-3 bg-slate-200 rounded" />
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Priority Insights Skeleton */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs">
        <div className="w-36 h-6 bg-slate-200 rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {Array.from({ length: 2 }).map((_, col) => (
            <div key={col} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-200" />
                <div className="w-28 h-3 bg-slate-200 rounded" />
              </div>
              <div className="space-y-2.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-4 py-3 flex items-center justify-between bg-slate-50 border border-slate-100"
                  >
                    <div className="flex-1 pr-3">
                      <div className="w-28 h-3.5 bg-slate-200 rounded mb-1.5" />
                      <div className="w-40 h-2.5 bg-slate-100 rounded" />
                    </div>
                    <div className="w-10 h-4 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// EMPTY STATE
function PerformanceEmptyState() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center mb-5 shadow-xs">
        <BarChart3 className="w-8 h-8 text-[#94a3b8]" />
      </div>
      <h3 className="text-lg font-bold text-[#0f172a] mb-2 text-center">
        No Performance Data Yet
      </h3>
      <p className="text-sm text-[#64748b] max-w-md text-center leading-relaxed mb-4">
        Start practicing questions to see your accuracy, topic mastery, and
        personalized insights here. Your progress will be tracked
        automatically as you answer questions.
      </p>
      <div className="flex items-center gap-6 text-xs text-[#94a3b8]">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>Answer questions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4" />
          <span>Track mastery</span>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4" />
          <span>See insights</span>
        </div>
      </div>
    </div>
  );
}

// BREAKDOWN COLORS
const BREAKDOWN_CONFIG = {
  correct: { color: "#1e3a5f", label: "Correct" },
  incorrect: { color: "#f43f5e", label: "Incorrect" },
  unanswered: { color: "#93c5fd", label: "Unanswered" },
  under_review: { color: "#f59e0b", label: "Under Review" },
};

// TOPIC ICON MAPPING
const CATEGORY_ICON_STYLES = [
  { iconColor: "text-rose-500", iconBg: "bg-rose-50 border-rose-100" },
  { iconColor: "text-blue-500", iconBg: "bg-blue-50 border-blue-100" },
  { iconColor: "text-amber-500", iconBg: "bg-amber-50 border-amber-100" },
  { iconColor: "text-purple-500", iconBg: "bg-purple-50 border-purple-100" },
  { iconColor: "text-emerald-500", iconBg: "bg-emerald-50 border-emerald-100" },
  { iconColor: "text-cyan-500", iconBg: "bg-cyan-50 border-cyan-100" },
  { iconColor: "text-orange-500", iconBg: "bg-orange-50 border-orange-100" },
  { iconColor: "text-indigo-500", iconBg: "bg-indigo-50 border-indigo-100" },
  { iconColor: "text-pink-500", iconBg: "bg-pink-50 border-pink-100" },
];

// MAIN COMPONENT
export default function PerformanceSection() {
  const { examPerformance, isLoading } = useExamPerformance();

  const overall_progress = examPerformance?.overall_progress;
  const metrics = examPerformance?.metrics;
  const topic_mastery = examPerformance?.topic_mastery;
  const priority_insights = examPerformance?.priority_insights;

  // Build breakdown array from API data
  const breakdownList = useMemo(() => {
    if (!overall_progress?.breakdown) return [];
    const order = ["correct", "incorrect", "unanswered", "under_review"];
    return order
      .filter((key) => overall_progress.breakdown[key])
      .map((key) => {
        const item = overall_progress.breakdown[key];
        const config = BREAKDOWN_CONFIG[key];
        return {
          label: config.label,
          sub: item.label,
          count: item.count,
          pct: item.percentage,
          color: config.color,
        };
      });
  }, [overall_progress?.breakdown]);

  // Donut chart segments
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const chartSegments = useMemo(() => {
    return breakdownList.map((item, idx) => {
      const precedingSum = breakdownList
        .slice(0, idx)
        .reduce((sum, prev) => sum + prev.pct, 0);
      const strokeDasharray = `${(item.pct / 100) * circumference} ${circumference}`;
      const strokeDashoffset = -(precedingSum / 100) * circumference;
      return {
        ...item,
        strokeDasharray,
        strokeDashoffset,
      };
    });
  }, [breakdownList, circumference]);

  // Check if data is genuinely empty (API returned but no meaningful data)
  const hasData =
    examPerformance &&
    (overall_progress?.total_bank_questions > 0 ||
      (topic_mastery && topic_mastery.length > 0));

  // ── Loading ──
  if (isLoading) {
    return <PerformanceSkeleton />;
  }

  // ── Empty State ──
  if (!hasData) {
    return <PerformanceEmptyState />;
  }

  // ── Derived values ──
  const completedPct = overall_progress?.completed_percentage ?? 0;
  const totalAttempted = overall_progress?.total_attempted ?? 0;
  const totalBankQuestions = overall_progress?.total_bank_questions ?? 0;

  const topStrengths = priority_insights?.top_strengths ?? [];
  const focusAreas = priority_insights?.focus_areas ?? [];

  return (
    <div className="w-full space-y-5 animate-[fadeIn_0.3s_ease]">
      {/* ─── ROW 1: OVERALL PROGRESS & METRICS */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left: Overall Progress Donut Chart */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-[#0f172a] mb-5">
              Overall Progress
            </h3>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 my-auto">
              {/* Donut Chart */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 160 160"
                  >
                    {/* Background Circle */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="16"
                    />
                    {/* Segments */}
                    {chartSegments.map((item, idx) => (
                      <circle
                        key={idx}
                        cx="80"
                        cy="80"
                        r={radius}
                        fill="none"
                        stroke={item.color}
                        strokeWidth="16"
                        strokeDasharray={item.strokeDasharray}
                        strokeDashoffset={item.strokeDashoffset}
                        className="transition-all duration-700 ease-out"
                      />
                    ))}
                  </svg>

                  {/* Center Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-none">
                      {Math.round(completedPct)}%
                    </span>
                    <span className="text-xs text-[#94a3b8] font-bold mt-1 uppercase tracking-wider">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Subtext below chart */}
                <div className="text-center mt-3">
                  <span className="text-sm font-extrabold text-[#0f172a]">
                    {totalAttempted}/{totalBankQuestions}
                  </span>
                  <div className="text-xs text-[#94a3b8] font-medium">
                    Questions
                  </div>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 w-full flex flex-col justify-center space-y-3.5 pt-2">
                {breakdownList.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs sm:text-sm py-1 border-b border-[#f8fafc] last:border-0"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <span className="font-bold text-[#1e293b]">
                          {item.label}
                        </span>
                        <p className="text-[11px] text-[#94a3b8] hidden sm:block">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-[#0f172a]">
                        {item.count}
                      </span>
                      <span className="text-[11px] text-[#64748b] ml-1 font-semibold">
                        ({item.pct}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 2x2 Metric Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: ACCURACY */}
            <div className="bg-[#f8fafc]/80 hover:bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                    ACCURACY
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-info mt-2 mb-1">
                    {metrics?.accuracy?.formatted ?? "—"}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-info flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
              </div>
              {metrics?.accuracy?.delta_text && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-info mt-3">
                  <span className="text-xs">▲</span>
                  <span className="text-[#64748b] font-normal">
                    {metrics.accuracy.delta_text}
                  </span>
                </div>
              )}
            </div>

            {/* Card 2: QUESTIONS ANSWERED */}
            <div className="bg-[#f8fafc]/80 hover:bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                    QUESTIONS ANSWERED
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#f97316] mt-2 mb-1">
                    {metrics?.questions_answered?.formatted ?? "—"}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-100/70 text-[#f97316] flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
              </div>
              {metrics?.questions_answered?.delta_text && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-info mt-3">
                  <span className="text-xs">▲</span>
                  <span className="text-[#64748b] font-normal">
                    {metrics.questions_answered.delta_text}
                  </span>
                </div>
              )}
            </div>

            {/* Card 3: AVERAGE SCORE */}
            <div className="bg-[#f8fafc]/80 hover:bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                    AVERAGE SCORE
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mt-2 mb-1">
                    {metrics?.average_score?.formatted ?? "—"}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#1e3a5f] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              {metrics?.average_score?.subtext && (
                <div className="text-xs text-[#64748b] font-medium mt-3">
                  {metrics.average_score.subtext}
                </div>
              )}
            </div>

            {/* Card 4: PERCENTILE RANK */}
            <div className="bg-[#f8fafc]/80 hover:bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                    PERCENTILE RANK
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mt-2 mb-1">
                    {metrics?.percentile_rank?.formatted ?? "—"}
                  </div>
                </div>
              </div>
              {metrics?.percentile_rank?.cohort_name && (
                <div className="text-xs text-[#64748b] font-medium mt-3 flex items-center gap-1">
                  <span>Among</span>
                  <span className="text-[#94a3b8]">•</span>
                  <span className="font-bold text-[#0f172a]">
                    {metrics.percentile_rank.cohort_name}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: TOPIC MASTERY */}
      {topic_mastery && topic_mastery.length > 0 && (
        <div className="space-y-3.5">
          {/* Header & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <h3 className="text-xl font-bold text-[#0f172a]">
              Topic Mastery
            </h3>
            <div className="flex items-center gap-4 text-xs font-semibold text-[#64748b]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
                <span>Strength</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-info" />
                <span>On Track</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span>Weak Spot</span>
              </div>
            </div>
          </div>

          {/* 5-Column Responsive Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {topic_mastery.map((topic, index) => {
              const statusUpper = (topic.status || "").toUpperCase();
              const isStrength = statusUpper === "STRENGTH";
              const isOnTrack = statusUpper === "ON TRACK";

              let barColor = "#ef4444";
              let statusTextColor = "text-[#ef4444]";
              if (isStrength) {
                barColor = "#16a34a";
                statusTextColor = "text-[#16a34a]";
              } else if (isOnTrack) {
                barColor = "#0284c7";
                statusTextColor = "text-[#0284c7]";
              }

              const iconStyle =
                CATEGORY_ICON_STYLES[index % CATEGORY_ICON_STYLES.length];
              const score = topic.accuracy_percentage ?? 0;

              return (
                <div
                  key={topic.id}
                  className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col justify-between shadow-xs hover:shadow-sm hover:border-[#cbd5e1] transition-all"
                >
                  <div>
                    {/* Icon & Category */}
                    <div className="flex items-start gap-3 mb-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${iconStyle.iconBg} ${iconStyle.iconColor}`}
                      >
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[13px] font-bold text-[#0f172a] truncate leading-tight">
                          {topic.title}
                        </h4>
                        <p className="text-[10px] text-[#94a3b8] truncate mt-0.5 font-medium">
                          {topic.category_title} • {topic.subtopics_count}{" "}
                          subtopic{topic.subtopics_count !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score & Status Bar */}
                  <div className="mt-4 pt-2">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-extrabold text-[#0f172a] text-sm">
                        {Math.round(score)}%
                      </span>
                      <span
                        className={`text-[10px] font-extrabold tracking-wider uppercase ${statusTextColor}`}
                      >
                        {topic.status}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(score, 100)}%`,
                          backgroundColor: barColor,
                        }}
                      />
                    </div>
                    {topic.questions_answered > 0 && (
                      <p className="text-[10px] text-[#94a3b8] mt-1.5 font-medium">
                        {topic.questions_answered} questions answered
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ROW 3: PRIORITY INSIGHTS */}
      {(topStrengths.length > 0 || focusAreas.length > 0) && (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs">
          <h3 className="text-lg font-bold text-[#0f172a] mb-4">
            Priority Insights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Column 1: TOP STRENGTHS */}
            {topStrengths.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#16a34a] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>TOP STRENGTHS</span>
                </div>

                <div className="space-y-2.5">
                  {topStrengths.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#bbf7d0] transition-colors"
                    >
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-sm font-bold text-[#15803d]">
                            {item.title}
                          </span>
                          {item.subtext && (
                            <span className="text-[11px] text-[#64748b]">
                              ({item.subtext})
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-[#15803d] shrink-0">
                        {Math.round(item.accuracy_percentage)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Column 2: FOCUS AREAS */}
            {focusAreas.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#ef4444] uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>FOCUS AREAS</span>
                </div>

                <div className="space-y-2.5">
                  {focusAreas.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-error-50 border border-error-100 rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#fecaca] transition-colors"
                    >
                      <div className="min-w-0 flex-1 pr-3">
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span className="text-sm font-bold text-[#b91c1c]">
                            {item.title}
                          </span>
                          {item.subtext && (
                            <span className="text-[11px] text-[#64748b]">
                              ({item.subtext})
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm font-extrabold text-[#b91c1c] shrink-0">
                        {Math.round(item.accuracy_percentage)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
