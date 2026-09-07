"use client";

import { NCSBN_CLIENT_NEEDS } from "./data";

export default function ProgressSection() {
  const simulationExams = [
    { name: "Exam 1", status: "completed", score: "78%", date: "JAN 4, 2026" },
    { name: "Exam 2", status: "completed", score: "78%", date: "JAN 4, 2026" },
    { name: "Exam 4", status: "ready", label: "Ready To Start" },
    { name: "Exam 4", status: "locked", label: "Locked" },
    { name: "Exam 5", status: "locked", label: "Locked" },
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-[#e5e9f0] p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 shadow-sm">
      {/* ─── ROW 1: TOP 3 CARDS ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Card 1: Simulation Progress (md:col-span-2, lg:col-span-6) */}
        <div className="md:col-span-2 lg:col-span-6 bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3">
            <h3 className="font-bold text-lg text-[#1E3A5F]">
              Simulation Progress
            </h3>
            <span className="text-xs text-[#64748b] font-medium">
              2/5 Completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center py-2">
            {/* Exam List (sm:col-span-6) */}
            <div className="sm:col-span-6 flex flex-col gap-2.5">
              {simulationExams.map((exam, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {exam.status === "completed" && (
                      <div className="w-5 h-5 rounded-full bg-[#1E3A5F] text-white flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                    {exam.status === "ready" && (
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
                    <span className={`font-bold ${exam.status === "ready" ? "text-[#f43f5e]" : "text-[#1e293b]"}`}>
                      {exam.name}
                    </span>
                  </div>

                  <div className="text-right">
                    {exam.status === "completed" && (
                      <div>
                        <div className="font-extrabold text-[#1e293b] text-xs">{exam.score}</div>
                        <div className="text-[9px] text-[#94a3b8] font-medium leading-none">{exam.date}</div>
                      </div>
                    )}
                    {exam.status === "ready" && (
                      <span className="text-[#f43f5e] font-semibold text-[11px]">
                        {exam.label}
                      </span>
                    )}
                    {exam.status === "locked" && (
                      <span className="text-[#94a3b8] font-medium text-[11px]">
                        {exam.label}
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
                    strokeDashoffset={2 * Math.PI * 32 * (1 - 0.35)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-extrabold text-[#0f172a] leading-none">
                    35%
                  </span>
                  <span className="text-[9px] text-[#94a3b8] font-bold mt-0.5">
                    Completed
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <div className="font-bold text-xs text-[#0f172a]">Keep going!</div>
                <div className="text-[10px] text-[#64748b] leading-tight mt-0.5">
                  You&apos;re making excellent progress
                </div>
              </div>
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
                <div className="text-3xl font-extrabold text-[#16a34a] leading-none">
                  82 %
                </div>
                <div className="text-[9px] font-bold text-[#16a34a] tracking-wider uppercase mt-1.5">
                  HIGH LIKELIHOOD OF PASSING
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
                    stroke="#16a34a"
                    strokeWidth="4.5"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - 0.75)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[#16a34a]">
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
              <span className="text-[#16a34a] flex items-center gap-1 font-bold">
                <span>▲</span> +6% <span className="font-normal text-[#64748b]">from last Exam</span>
              </span>
              <span className="text-[#0f172a] font-bold">Goal : 90%</span>
            </div>
            <div className="w-full h-2 bg-info-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#16a34a] rounded-full"
                style={{ width: "82%" }}
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
                <div className="text-3xl font-extrabold text-[#f97316] leading-none">
                  87 %
                </div>
                <div className="text-[9px] font-bold text-[#0f172a] tracking-wider uppercase mt-1.5">
                  HIGH CONFIDENCE
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
                    stroke="#f97316"
                    strokeWidth="4.5"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - 0.75)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[#f97316]">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-2">
            <p className="text-xs text-[#64748b] leading-relaxed">
              Based on your simulation scores, practice performance, and consistency.
            </p>
          </div>
        </div>
      </div>

      {/* ─── ROW 2: 3 METRIC CARDS ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#16a34a] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
            <span>OVERALL ACURACY</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mt-3 mb-1">
            79%
          </div>
          <div className="text-xs text-[#64748b] font-medium">
            131 correct
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f97316] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span>AVERAGE TIME / QUESTION</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mt-3 mb-1">
            1:38<span className="text-base font-normal text-[#94a3b8] ml-0.5">min</span>
          </div>
          <div className="text-xs text-[#64748b] font-medium">
            Target • 1:45 max
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl border border-[#e5e7eb] p-4.5 sm:p-5.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#f97316] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span>AVERAGE PERFORMANCE</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#1E3A5F] mt-3 mb-1">
            88%
          </div>
          <div className="text-xs text-[#64748b] font-medium">
            Among • <span className="font-bold text-[#1E3A5F]">STEM RN</span> cohort
          </div>
        </div>
      </div>

      {/* ─── ROW 3: WHERE YOU STAND ────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#0f172a]">
              Where you stand
            </h3>
            <p className="text-xs text-[#64748b] mt-0.5">
              Performance distribution vs. STEMRN students
            </p>
          </div>

          <div className="text-right">
            <div className="text-3xl font-extrabold text-[#1E3A5F] leading-none">
              75th
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

            {/* 75th Percentile Vertical Dashed Marker Line */}
            <line
              x1="450"
              y1="40"
              x2="450"
              y2="145"
              stroke="#f43f5e"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />

            {/* Red/Pink Dot on Top of 75th Marker */}
            <circle cx="450" cy="40" r="3.5" fill="#f43f5e" />
          </svg>

          {/* X-Axis Percentile Labels */}
          <div className="flex justify-between text-[11px] text-[#94a3b8] font-medium px-4 mt-1">
            <span>10th</span>
            <span>25th</span>
            <span>50th</span>
            <span className="text-[#f43f5e] font-bold">75th</span>
            <span>90th</span>
          </div>
        </div>

        {/* Insight Highlight Banner */}
        <div className="bg-info-50 border border-[#bae6fd] rounded-xl p-3.5 flex items-center gap-3 text-xs text-[#0369a1] leading-relaxed">
          <div className="w-6 h-6 rounded-full bg-info text-white flex items-center justify-center shrink-0">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <div>
            Students in the <strong className="text-[#0f172a] font-bold">75th percentile</strong> at this stage have an{" "}
            <strong className="text-[#e11d48] font-bold">87% pass rate</strong> on their first attempt of the actual NCLEX-RN. Keep your trajectory.
          </div>
        </div>
      </div>

      {/* ─── ROW 4: NCSBN CLIENT NEEDS ────────────────────────────────────── */}
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
              8 Areas Tracked
            </div>
            <button className="text-xs font-bold text-[#1E3A5F] hover:underline cursor-pointer flex items-center gap-0.5 mt-0.5">
              <span>Detailed Breakdown</span>
              <span>&gt;</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-5 sm:gap-y-6 pt-5">
          {NCSBN_CLIENT_NEEDS.map((item, idx) => {
            const isGap = item.statusType === "gap";
            const isFocus = item.statusType === "focus";
            const isAbove = item.statusType === "above";
            const isMastery = item.statusType === "mastery";

            const barColor = isGap
              ? "#f43f5e"
              : isFocus
              ? "#ea580c"
              : "#1E3A5F";

            const tagColor = isGap
              ? "text-[#f43f5e]"
              : isFocus
              ? "text-[#ea580c]"
              : isMastery
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
                      {item.weight}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xl font-extrabold text-[#1e293b] leading-tight">
                      {item.score}%
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
                      width: `${item.score}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>

                {/* Peer Average & Target */}
                <div className="flex items-center justify-between text-[11px] text-[#64748b] pt-0.5">
                  <span>Peer Average: {item.peer}%</span>
                  <span>Target: {item.target}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
