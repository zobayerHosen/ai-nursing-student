"use client";

import { useNclexPerformance } from "@/hooks";

// SKELETON LOADING
function ProgressSkeleton() {
  return (
    <div className="w-full bg-white rounded-3xl border border-[#e5e9f0] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 shadow-sm animate-pulse">
      {/* Row 1: Top 3 Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Card 1: Simulation Progress */}
        <div className="md:col-span-2 lg:col-span-6 bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5">
          <div className="flex items-center justify-between pb-3">
            <div className="w-40 h-5 bg-slate-200 rounded" />
            <div className="w-20 h-3 bg-slate-200 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-2">
            <div className="sm:col-span-6 flex flex-col gap-2.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200" />
                    <div className="w-20 h-3 bg-slate-200 rounded" />
                  </div>
                  <div className="w-12 h-3 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
            <div className="sm:col-span-6 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-[7px] border-slate-200" />
              <div className="w-28 h-3 bg-slate-200 rounded mt-3" />
              <div className="w-36 h-2.5 bg-slate-100 rounded mt-1.5" />
            </div>
          </div>
        </div>

        {/* Card 2: NCLEX Readiness */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5 flex flex-col justify-between">
          <div className="w-28 h-4 bg-slate-200 rounded mb-3" />
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="w-20 h-8 bg-slate-200 rounded mb-2" />
              <div className="w-36 h-3 bg-slate-100 rounded" />
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-100 border-[4.5px] border-slate-200 shrink-0" />
          </div>
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-32 h-3 bg-slate-200 rounded" />
              <div className="w-16 h-3 bg-slate-200 rounded" />
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full" />
          </div>
        </div>

        {/* Card 3: Pass Predictor */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5 flex flex-col justify-between">
          <div className="w-36 h-4 bg-slate-200 rounded mb-3" />
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="w-20 h-8 bg-slate-200 rounded mb-2" />
              <div className="w-28 h-3 bg-slate-100 rounded" />
            </div>
            <div className="w-16 h-16 rounded-full bg-slate-100 border-[4.5px] border-slate-200 shrink-0" />
          </div>
          <div className="mt-auto pt-2">
            <div className="w-full h-3 bg-slate-100 rounded" />
            <div className="w-48 h-2.5 bg-slate-100 rounded mt-1.5" />
          </div>
        </div>
      </div>

      {/* Row 2: 3 Metric Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-slate-200" />
              <div className="w-28 h-3 bg-slate-200 rounded" />
            </div>
            <div className="w-16 h-8 bg-slate-200 rounded mb-1" />
            <div className="w-20 h-3 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      {/* Row 3: Where You Stand Skeleton */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 pb-4">
          <div>
            <div className="w-36 h-5 bg-slate-200 rounded mb-1.5" />
            <div className="w-56 h-3 bg-slate-100 rounded" />
          </div>
          <div className="text-right">
            <div className="w-14 h-8 bg-slate-200 rounded mb-1" />
            <div className="w-24 h-3 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="w-full h-44 bg-slate-50 rounded-xl mt-2 mb-4" />
        <div className="w-full h-12 bg-slate-50 rounded-xl" />
      </div>

      {/* Row 4: NCSBN Client Needs Skeleton */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-7">
        <div className="flex items-center justify-between pb-5 border-b border-[#f1f5f9]">
          <div>
            <div className="w-40 h-5 bg-slate-200 rounded mb-1.5" />
            <div className="w-60 h-3 bg-slate-100 rounded" />
          </div>
          <div className="w-20 h-3 bg-slate-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-5 sm:gap-y-6 pt-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="w-40 h-4 bg-slate-200 rounded mb-1" />
                  <div className="w-28 h-3 bg-slate-100 rounded" />
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded" />
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-1" />
              <div className="flex items-center justify-between pt-0.5">
                <div className="w-24 h-2.5 bg-slate-100 rounded" />
                <div className="w-16 h-2.5 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// EMPTY STATE
function ProgressEmptyState() {
  return (
    <div className="w-full bg-white rounded-3xl border border-[#e5e9f0] p-8 sm:p-12 flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-16 h-16 rounded-2xl bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center mb-5 shadow-xs">
        <svg className="w-8 h-8 text-[#94a3b8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-[#0f172a] mb-2">
        No NCLEX Progress Data Yet
      </h3>
      <p className="text-sm text-[#64748b] max-w-md leading-relaxed mb-4">
        Start your first simulation exam to see your readiness score, pass
        prediction, performance metrics, and detailed breakdown across all
        NCSBN client need areas.
      </p>
      <div className="flex items-center gap-6 text-xs text-[#94a3b8]">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          <span>Take an exam</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span>Track readiness</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          <span>See predictions</span>
        </div>
      </div>
    </div>
  );
}

// MAIN COMPONENT
export default function ProgressSection() {
  const { performanceData, isLoading } = useNclexPerformance();

  // Loading
  if (isLoading) {
    return <ProgressSkeleton />;
  }

  // Empty state
  if (!performanceData) {
    return <ProgressEmptyState />;
  }

  const {
    simulation_progress,
    readiness,
    pass_predictor,
    kpi_metrics,
    where_you_stand,
    ncsbn_client_needs,
  } = performanceData;

  const exams = simulation_progress?.exams ?? [];
  const completedCount = simulation_progress?.completed_count ?? 0;
  const totalExams = simulation_progress?.total_exams ?? 0;
  const completedPct = simulation_progress?.completed_percentage ?? 0;
  const encouragementText = simulation_progress?.encouragement_text ?? "";

  const readinessScore = readiness?.score ?? 0;
  const readinessLabel = readiness?.status_label ?? "";
  const readinessDelta = readiness?.delta_from_last_exam ?? "";
  const readinessGoal = readiness?.goal_percentage ?? 90;

  const passProbability = pass_predictor?.probability_percentage ?? 0;
  const passConfidence = pass_predictor?.confidence_level ?? "";
  const passDescription = pass_predictor?.description ?? "";

  const overallAccuracy = kpi_metrics?.overall_accuracy;
  const avgTime = kpi_metrics?.average_time_per_question;
  const avgPerformance = kpi_metrics?.average_performance;

  const percentileRank = where_you_stand?.percentile_rank ?? 0;
  const advisoryBanner = where_you_stand?.advisory_banner ?? "";
  const bellCurveMarkers = where_you_stand?.bell_curve_markers ?? [];

  const clientNeeds = ncsbn_client_needs ?? [];

  // Helper: get readiness color based on score
  const getReadinessColor = (score) => {
    if (score >= 70) return "#16a34a";
    if (score >= 40) return "#f97316";
    return "#f43f5e";
  };
  const readinessColor = getReadinessColor(readinessScore);

  // Helper: get pass predictor color
  const getPassColor = (prob) => {
    if (prob >= 70) return "#16a34a";
    if (prob >= 40) return "#f97316";
    return "#f43f5e";
  };
  const passColor = getPassColor(passProbability);

  // Bell curve X positions (evenly distributed across 600-wide SVG)
  const bellCurvePositions = [60, 180, 300, 420, 540];
  // Y positions on the bell curve for these x values
  const bellCurveYPositions = [142, 130, 20, 100, 142];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#e5e9f0] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 shadow-sm">
      {/* ROW 1: TOP 3 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Card 1: Simulation Progress (md:col-span-2, lg:col-span-6) */}
        <div className="md:col-span-2 lg:col-span-6 bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <h3 className="font-bold text-lg text-[#1E3A5F]">
              Simulation Progress
            </h3>
            <span className="text-xs text-[#64748b] font-medium">
              {completedCount}/{totalExams} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-2">
            {/* Exam List (sm:col-span-6) */}
            <div className="sm:col-span-6 flex flex-col gap-2.5">
              {exams.map((exam, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {exam.status === "completed" && (
                      <div className="w-5 h-5 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                    {exam.status === "available" && (
                      <div className="w-5 h-5 rounded-full bg-[#f43f5e] text-white flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5 fill-current ml-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    )}
                    {exam.status === "locked" && (
                      <div className="w-5 h-5 rounded-full bg-[#94a3b8] text-white flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 10H18V7A6 6 0 0 0 6 7V10H5A2 2 0 0 0 3 12V20A2 2 0 0 0 5 22H19A2 2 0 0 0 21 20V12A2 2 0 0 0 19 10ZM8 7A4 4 0 0 1 16 7V10H8V7ZM19 20H5V12H19V20Z" />
                        </svg>
                      </div>
                    )}
                    <span className={`font-bold ${exam.status === "available" ? "text-[#f43f5e]" : "text-[#1e293b]"}`}>
                      {exam.title}
                    </span>
                  </div>

                  <div className="text-right">
                    {exam.status === "completed" && (
                      <div>
                        <div className="font-extrabold text-[#1e293b] text-xs">
                          {exam.score != null ? `${Math.round(exam.score)}%` : "—"}
                        </div>
                        {exam.completed_date && (
                          <div className="text-[9px] text-[#94a3b8] font-medium leading-none">
                            {exam.completed_date}
                          </div>
                        )}
                      </div>
                    )}
                    {exam.status === "available" && (
                      <span className="text-[#f43f5e] font-semibold text-[11px]">
                        {exam.action_label}
                      </span>
                    )}
                    {exam.status === "locked" && (
                      <span className="text-[#94a3b8] font-medium text-[11px]">
                        {exam.action_label}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Circular Chart & Subtext (sm:col-span-6) */}
            <div className="sm:col-span-6 flex flex-col items-center justify-center text-center pl-2">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#e0f2fe"
                    strokeWidth="7"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="7"
                    strokeDasharray={2 * Math.PI * 32}
                    strokeDashoffset={2 * Math.PI * 32 * (1 - completedPct / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-extrabold text-[#0f172a] leading-none">
                    {Math.round(completedPct)}%
                  </span>
                  <span className="text-[9px] text-[#94a3b8] font-bold mt-0.5">
                    Completed
                  </span>
                </div>
              </div>

              {encouragementText && (
                <div className="mt-2">
                  <div className="text-[10px] text-[#64748b] leading-tight mt-0.5">
                    {encouragementText}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: NCLEX Readiness (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#0f172a] mb-3">
              NCLEX Readiness
            </h3>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-extrabold leading-none" style={{ color: readinessColor }}>
                  {Math.round(readinessScore)} %
                </div>
                <div className="text-[9px] font-bold tracking-wider uppercase mt-1.5" style={{ color: readinessColor }}>
                  {readinessLabel}
                </div>
              </div>

              {/* Shield Gauge Icon */}
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="#e0f2fe"
                    strokeWidth="4.5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke={readinessColor}
                    strokeWidth="4.5"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - readinessScore / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center" style={{ color: readinessColor }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              {readinessDelta && (
                <span className="flex items-center gap-1 font-bold" style={{ color: readinessColor }}>
                  <span>▲</span> {readinessDelta} <span className="font-normal text-[#64748b]">from last Exam</span>
                </span>
              )}
              <span className="text-[#0f172a] font-bold">Goal : {readinessGoal}%</span>
            </div>
            <div className="w-full h-2 bg-info-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${Math.min(readinessScore, 100)}%`, backgroundColor: readinessColor }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: NCLEX Pass Predictor (lg:col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#0f172a] mb-3">
              NCLEX Pass Predictor
            </h3>

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-extrabold leading-none" style={{ color: passColor }}>
                  {Math.round(passProbability)} %
                </div>
                <div className="text-[9px] font-bold text-[#0f172a] tracking-wider uppercase mt-1.5">
                  {passConfidence}
                </div>
              </div>

              {/* Trending Arrow Gauge */}
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 60 60">
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke="#e0f2fe"
                    strokeWidth="4.5"
                  />
                  <circle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="none"
                    stroke={passColor}
                    strokeWidth="4.5"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - passProbability / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center" style={{ color: passColor }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {passDescription && (
            <div className="mt-auto pt-2">
              <p className="text-xs text-[#64748b] leading-relaxed">
                {passDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ROW 2: 3 METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Metric 1: Overall Accuracy */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#16a34a] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
            <span>OVERALL ACCURACY</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mt-3 mb-1">
            {overallAccuracy ? `${Math.round(overallAccuracy.percentage)}%` : "—"}
          </div>
          <div className="text-xs text-[#64748b] font-medium">
            {overallAccuracy
              ? `${overallAccuracy.correct_count} correct out of ${overallAccuracy.total_attempted}`
              : "No data yet"}
          </div>
        </div>

        {/* Metric 2: Average Time / Question */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f97316] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span>AVERAGE TIME / QUESTION</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mt-3 mb-1">
            {avgTime?.formatted_time ?? "—"}
          </div>
          <div className="text-xs text-[#64748b] font-medium">
            {avgTime?.target_max ? `Target • ${avgTime.target_max}` : "No target set"}
          </div>
        </div>

        {/* Metric 3: Average Performance */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f97316] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span>AVERAGE PERFORMANCE</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mt-3 mb-1">
            {avgPerformance ? `${Math.round(avgPerformance.percentage)}%` : "—"}
          </div>
          <div className="text-xs text-[#64748b] font-medium">
            {avgPerformance?.cohort_name
              ? <>Among • <span className="font-bold text-[#1E3A5F]">{avgPerformance.cohort_name}</span></>
              : "No cohort data"}
          </div>
        </div>
      </div>

      {/* ROW 3: WHERE YOU STAND */}
      {where_you_stand && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#0f172a]">
                Where you stand
              </h3>
              <p className="text-xs text-[#64748b] mt-0.5">
                Performance distribution vs. GENCLEX students
              </p>
            </div>

            <div className="text-right">
              <div className="text-3xl font-extrabold text-[#1E3A5F] leading-none">
                {percentileRank}th
              </div>
              <div className="text-[10px] font-bold text-[#64748b] tracking-wider uppercase mt-1">
                PERCENTILE RANK
              </div>
            </div>
          </div>

          {/* Bell Curve SVG Distribution Chart */}
          <div className="w-full relative mt-2 mb-4">
            <svg
              className="w-full h-44 overflow-visible"
              viewBox="0 0 600 160"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="bellGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Bell Curve Area Fill */}
              <path
                d="M 0 145 
                   C 90 145, 150 140, 210 100 
                   C 260 65, 280 20, 300 20 
                   C 320 20, 340 65, 390 100 
                   C 450 140, 510 145, 600 145 
                   L 600 145 L 0 145 Z"
                fill="url(#bellGradient)"
              />

              {/* Bell Curve Outline */}
              <path
                d="M 0 145 
                   C 90 145, 150 140, 210 100 
                   C 260 65, 280 20, 300 20 
                   C 320 20, 340 65, 390 100 
                   C 450 140, 510 145, 600 145"
                fill="none"
                stroke="#bae6fd"
                strokeWidth="2"
              />

              {/* Base Baseline */}
              <line x1="0" y1="145" x2="600" y2="145" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* User's Percentile Marker */}
              {bellCurveMarkers.map((marker, idx) => {
                if (!marker.is_user) return null;
                const xPos = bellCurvePositions[idx] ?? (idx / (bellCurveMarkers.length - 1)) * 600;
                const yPos = bellCurveYPositions[idx] ?? 80;
                return (
                  <g key={idx}>
                    <line
                      x1={xPos}
                      y1={yPos}
                      x2={xPos}
                      y2="145"
                      stroke="#f43f5e"
                      strokeWidth="1.5"
                      strokeDasharray="4,4"
                    />
                    <circle cx={xPos} cy={yPos} r="3.5" fill="#f43f5e" />
                  </g>
                );
              })}
            </svg>

            {/* X-Axis Percentile Labels */}
            <div className="flex justify-between text-[11px] text-[#94a3b8] font-medium px-4 mt-1">
              {bellCurveMarkers.map((marker, idx) => (
                <span
                  key={idx}
                  className={marker.is_user ? "text-[#f43f5e] font-bold" : ""}
                >
                  {marker.label}
                </span>
              ))}
            </div>
          </div>

          {/* Insight Highlight Banner */}
          {advisoryBanner && (
            <div className="bg-info-50 border border-[#bae6fd] rounded-xl p-3.5 flex items-center gap-3 text-xs text-[#0369a1] leading-relaxed">
              <div className="w-6 h-6 rounded-full bg-info text-white flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <div dangerouslySetInnerHTML={{ __html: advisoryBanner }} />
            </div>
          )}
        </div>
      )}

      {/* ROW 4: NCSBN CLIENT NEEDS */}
      {clientNeeds.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#f1f5f9]">
            <div>
              <h3 className="text-lg font-bold text-[#0f172a]">
                NCSBN Client Needs
              </h3>
              <p className="text-xs text-[#64748b] mt-0.5">
                Mapped to official NCLEX-RN content domains
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
              <div className="text-xs text-[#64748b] font-medium">
                {clientNeeds.length} Areas Tracked
              </div>
              <button className="text-xs font-bold text-[#1E3A5F] hover:underline cursor-pointer flex items-center gap-0.5 mt-0.5">
                <span>Detailed Breakdown</span>
                <span>&gt;</span>
              </button>
            </div>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-5 sm:gap-y-6 pt-5">
            {clientNeeds.map((item, idx) => {
              const statusUpper = (item.status || "").toUpperCase();
              const isNeedFocus = statusUpper === "NEED FOCUS";
              const isCriticalGap = statusUpper === "CRITICAL GAP";

              const barColor = isCriticalGap
                ? "#f43f5e"
                : isNeedFocus
                ? "#ea580c"
                : "#1E3A5F";

              const tagColor = isCriticalGap
                ? "text-[#f43f5e]"
                : isNeedFocus
                ? "text-[#ea580c]"
                : statusUpper === "MASTERY"
                ? "text-[#0d9488]"
                : "text-[#16a34a]";

              return (
                <div key={idx} className="flex flex-col gap-1.5">
                  {/* Title & Score */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-[14px] sm:text-[15px] text-[#1e293b] leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-[#64748b] font-medium">
                        {item.weight_range}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xl font-extrabold text-[#1e293b] leading-tight">
                        {Math.round(item.score_percentage)}%
                      </div>
                      <div className={`text-[10px] font-bold tracking-wider uppercase ${tagColor}`}>
                        {item.status}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[#e2e8f0] rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(item.score_percentage, 100)}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>

                  {/* Peer Average & Target */}
                  <div className="flex items-center justify-between text-[11px] text-[#64748b] pt-0.5">
                    <span>Peer Average: {Math.round(item.peer_average)}%</span>
                    <span>Target: {Math.round(item.target)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
