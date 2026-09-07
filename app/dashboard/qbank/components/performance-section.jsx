"use client";

import {
  Heart,
  Brain,
  FlaskConical,
  Pill,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Activity,
  Award,
  HelpCircle,
  RotateCcw,
  Clock,
  BookmarkCheck,
} from "lucide-react";

export default function PerformanceSection() {
  // Overall progress breakdown
  const stats = {
    completedPct: 35,
    answeredCount: 1045,
    totalCount: 1600,
    breakdown: [
      {
        label: "Correct",
        sub: "Got it right",
        count: 485,
        pct: 52,
        color: "#1e3a5f",
      },
      {
        label: "Incorrect",
        sub: "Worth a re-attempt",
        count: 403,
        pct: 25,
        color: "#f43f5e",
      },
      {
        label: "Unanswered",
        sub: "Skipped",
        count: 355,
        pct: 22,
        color: "#93c5fd",
      },
      {
        label: "Under Review",
        sub: "Marked for review",
        count: 45,
        pct: 3,
        color: "#f59e0b",
      },
    ],
  };

  // Topic mastery list (matching Image 2)
  const topicMasteryList = [
    {
      id: "cardio-1",
      name: "Cardiovascular",
      category: "Medical-Surgical • 8 subtopics",
      score: 95,
      status: "STRENGTH",
      statusType: "strength",
      icon: Heart,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50 border-rose-100",
    },
    {
      id: "mental-1",
      name: "Mental Health",
      category: "Psychiatric • 5 subtopics",
      score: 79,
      status: "ON TRACK",
      statusType: "on_track",
      icon: Brain,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50 border-blue-100",
    },
    {
      id: "resp-1",
      name: "Respiratory & Renal",
      category: "Med-Surg • 12 subtopics",
      score: 72,
      status: "NEEDS WORK",
      statusType: "needs_work",
      icon: FlaskConical,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 border-amber-100",
    },
    {
      id: "resp-2",
      name: "Respiratory & Renal",
      category: "Med-Surg • 12 subtopics",
      score: 72,
      status: "NEEDS WORK",
      statusType: "needs_work",
      icon: FlaskConical,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 border-amber-100",
    },
    {
      id: "pharm-1",
      name: "Pharmacology",
      category: "Multi-system • 10 subtopics",
      score: 64,
      status: "WEAK SPOT",
      statusType: "needs_work",
      icon: Pill,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50 border-purple-100",
    },
    {
      id: "cardio-2",
      name: "Cardiovascular",
      category: "Medical-Surgical • 8 subtopics",
      score: 95,
      status: "STRENGTH",
      statusType: "strength",
      icon: Heart,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50 border-rose-100",
    },
    {
      id: "mental-2",
      name: "Mental Health",
      category: "Psychiatric • 5 subtopics",
      score: 79,
      status: "ON TRACK",
      statusType: "on_track",
      icon: Brain,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50 border-blue-100",
    },
    {
      id: "resp-3",
      name: "Respiratory & Renal",
      category: "Med-Surg • 12 subtopics",
      score: 72,
      status: "NEEDS WORK",
      statusType: "needs_work",
      icon: FlaskConical,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 border-amber-100",
    },
    {
      id: "resp-4",
      name: "Respiratory & Renal",
      category: "Med-Surg • 12 subtopics",
      score: 72,
      status: "NEEDS WORK",
      statusType: "needs_work",
      icon: FlaskConical,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50 border-amber-100",
    },
    {
      id: "pharm-2",
      name: "Pharmacology",
      category: "Multi-system • 10 subtopics",
      score: 64,
      status: "WEAK SPOT",
      statusType: "needs_work",
      icon: Pill,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50 border-purple-100",
    },
  ];

  // Priority Insights
  const strengths = [
    {
      name: "Cardiovascular",
      detail: "85 questions answered • +7% vs peers",
      score: "95%",
    },
    {
      name: "Maternal & Newborn",
      detail: "110 questions answered • +5% vs peers",
      score: "81%",
    },
    {
      name: "Mental Health",
      detail: "72 questions answered • +3% vs peers",
      score: "79%",
    },
  ];

  const focusAreas = [
    {
      name: "Community & Public Health",
      detail: "22 answered • -15% vs peers",
      score: "64%",
    },
    {
      name: "Pharmacology",
      detail: "95 answered • -5% below peers",
      score: "95%",
    },
    {
      name: "Labs & Diagnostics",
      detail: "12 answered • barely touched",
      score: "67%",
    },
  ];

  // Helper for multi-segment SVG donut chart
  // Radius = 60, circumference = 2 * PI * 60 ≈ 376.99
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="w-full space-y-5 animate-[fadeIn_0.3s_ease]">
      {/* ─── ROW 1: OVERALL PROGRESS & METRICS ─────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left: Overall Progress Donut Chart (5 or 6 cols on lg) */}
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
                    {stats.breakdown.map((item, idx) => {
                      const strokeDasharray = `${(item.pct / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -(accumulatedPercent / 100) * circumference;
                      accumulatedPercent += item.pct;

                      return (
                        <circle
                          key={idx}
                          cx="80"
                          cy="80"
                          r={radius}
                          fill="none"
                          stroke={item.color}
                          strokeWidth="16"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-700 ease-out"
                        />
                      );
                    })}
                  </svg>

                  {/* Center Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-none">
                      {stats.completedPct}%
                    </span>
                    <span className="text-xs text-[#94a3b8] font-bold mt-1 uppercase tracking-wider">
                      Completed
                    </span>
                  </div>
                </div>

                {/* Subtext below chart */}
                <div className="text-center mt-3">
                  <span className="text-sm font-extrabold text-[#0f172a]">
                    {stats.answeredCount}/{stats.totalCount}
                  </span>
                  <div className="text-xs text-[#94a3b8] font-medium">
                    Questions
                  </div>
                </div>
              </div>

              {/* Legend List */}
              <div className="flex-1 w-full flex flex-col justify-center space-y-3.5 pt-2">
                {stats.breakdown.map((item, i) => (
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

          {/* Right: 2x2 Metric Cards (6 cols on lg) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: ACCURACY */}
            <div className="bg-[#f8fafc]/80 hover:bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                    ACCURACY
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0284c7] mt-2 mb-1">
                    79%
                  </div>
                </div>
                {/* Blue sparkline SVG icon */}
                <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-[#0284c7] flex items-center justify-center">
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
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] mt-3">
                <span className="text-xs">▲</span>
                <span>6%</span>
                <span className="text-[#64748b] font-normal">
                  from last Exam
                </span>
              </div>
            </div>

            {/* Card 2: QUESTIONS ANSWERED */}
            <div className="bg-[#f8fafc]/80 hover:bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                    QUESTIONS ANSWERED
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#f97316] mt-2 mb-1">
                    1,235
                  </div>
                </div>
                {/* Orange sparkline SVG icon */}
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
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0284c7] mt-3">
                <span className="text-xs">▲</span>
                <span>18%</span>
                <span className="text-[#64748b] font-normal">
                  vs last 30 days
                </span>
              </div>
            </div>

            {/* Card 3: AVERAGE SCORE */}
            <div className="bg-[#f8fafc]/80 hover:bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                    AVERAGE SCORE
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mt-2 mb-1">
                    80%
                  </div>
                </div>
                {/* Upward trend arrow */}
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#1e3a5f] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div className="text-xs text-[#64748b] font-medium mt-3">
                Consistent improvement
              </div>
            </div>

            {/* Card 4: PERCENTILE RANK */}
            <div className="bg-[#f8fafc]/80 hover:bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-4.5 sm:p-5 flex flex-col justify-between transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                    PERCENTILE RANK
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mt-2 mb-1">
                    65<span className="text-xl font-bold">th</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-[#64748b] font-medium mt-3 flex items-center gap-1">
                <span>Among</span>
                <span className="text-[#94a3b8]">•</span>
                <span className="font-bold text-[#0f172a]">STEMRN</span>
                <span>cohort</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ROW 2: TOPIC MASTERY ──────────────────────────────── */}
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
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
              <span>On Track</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span>Needs Work</span>
            </div>
          </div>
        </div>

        {/* 5-Column Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {topicMasteryList.map((topic) => {
            const IconComp = topic.icon;
            const isStrength = topic.statusType === "strength";
            const isOnTrack = topic.statusType === "on_track";
            const isNeedsWork = topic.statusType === "needs_work";

            let barColor = "#ef4444";
            let statusTextColor = "text-[#ef4444]";
            if (isStrength) {
              barColor = "#16a34a";
              statusTextColor = "text-[#16a34a]";
            } else if (isOnTrack) {
              barColor = "#0284c7";
              statusTextColor = "text-[#0284c7]";
            }

            return (
              <div
                key={topic.id}
                className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col justify-between shadow-xs hover:shadow-sm hover:border-[#cbd5e1] transition-all"
              >
                <div>
                  {/* Icon & Category */}
                  <div className="flex items-start gap-3 mb-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${topic.iconBg} ${topic.iconColor}`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[13px] font-bold text-[#0f172a] truncate leading-tight">
                        {topic.name}
                      </h4>
                      <p className="text-[10px] text-[#94a3b8] truncate mt-0.5 font-medium">
                        {topic.category}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Score & Status Bar */}
                <div className="mt-4 pt-2">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-extrabold text-[#0f172a] text-sm">
                      {topic.score}%
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
                        width: `${topic.score}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── ROW 3: PRIORITY INSIGHTS ──────────────────────────── */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs">
        <h3 className="text-lg font-bold text-[#0f172a] mb-4">
          Priority Insights
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Column 1: TOP STRENGTHS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#16a34a] uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>TOP STRENGTHS</span>
            </div>

            <div className="space-y-2.5">
              {strengths.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#f0fdf4] border border-[#dcfce7] rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#bbf7d0] transition-colors"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <span className="text-sm font-bold text-[#15803d]">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-[#64748b]">
                        ({item.detail})
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-[#15803d] shrink-0">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: FOCUS AREAS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#ef4444] uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>FOCUS AREAS</span>
            </div>

            <div className="space-y-2.5">
              {focusAreas.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#fef2f2] border border-[#fee2e2] rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#fecaca] transition-colors"
                >
                  <div className="min-w-0 flex-1 pr-3">
                    <div className="flex flex-wrap items-baseline gap-1.5">
                      <span className="text-sm font-bold text-[#b91c1c]">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-[#64748b]">
                        ({item.detail})
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold text-[#b91c1c] shrink-0">
                    {item.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
