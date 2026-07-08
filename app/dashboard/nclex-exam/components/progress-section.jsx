"use client";

import { PERF_DATA, scoreColor } from "./data";
import { Donut } from "./sub-components";

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const weekActivity = [42, 38, 55, 60, 72, 30, 0];
const maxAct = Math.max(...weekActivity);

export default function ProgressSection() {
  return (
    <div className="flex-1 overflow-auto p-7 xl:p-8 bg-[#f4f6f9]">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="mb-5.5">
          <h2 className="text-[22px] font-extrabold text-[#0f172a] font-serif mb-1">
            Your Progress
          </h2>
          <p className="text-sm text-[#64748b]">Keep going — you're on track to pass.</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4.5">
          {[
            {
              label: "TOTAL QUESTIONS",
              val: "700",
              sub: "485 correct (69%)",
              color: "#16a34a",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="12" height="17" rx="1.5" /><path d="M9 4V2.5h6V4" /><polyline points="9 13 11 15 15 11" />
                </svg>
              ),
            },
            {
              label: "PERCENTILE RANK",
              val: "65",
              sub: "Among all students",
              color: "#2C5F8D",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="6" y1="20" x2="6" y2="13" /><line x1="12" y1="20" x2="12" y2="8" /><line x1="18" y1="20" x2="18" y2="4" />
                </svg>
              ),
            },
            {
              label: "EXAMS COMPLETED",
              val: "2/5",
              sub: "40% complete",
              color: "#8b5cf6",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M5 4H3v3a3 3 0 0 0 3 3" /><path d="M19 4h2v3a3 3 0 0 1-3 3" />
                </svg>
              ),
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-4.5 border border-[#e2e8f0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-[10px] font-bold text-[#94a3b8] tracking-wide uppercase">
                  {s.label}
                </div>
                <span className="flex items-center justify-center" style={{ color: s.color }}>
                  {s.icon}
                </span>
              </div>
              <div
                className="text-[28px] font-extrabold leading-none mb-1"
                style={{ color: s.color }}
              >
                {s.val}
              </div>
              <div className="text-xs text-[#94a3b8]">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mb-4.5">
          {/* Pass Predictor */}
          <div className="bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="text-[15px] font-bold text-[#0f172a] mb-4.5">NCLEX Pass Predictor</div>
            <div className="flex justify-center mb-4">
              <Donut size={140} stroke={14} value={40} color="#2C5F8D" bg="#e2e8f0" label="40%" sublabel="Readiness" />
            </div>
            <div className="text-center mb-3.5">
              <div className="text-[13px] font-bold text-[#2C5F8D] mb-0.5">
                Complete all 5 NCLEX Practice Exams
              </div>
              <div className="text-xs text-[#94a3b8]">2 of 5 exams completed</div>
            </div>
            <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden mb-3.5">
              <div
                className="h-full bg-[#2C5F8D] rounded-full transition-all duration-1000"
                style={{ width: "40%" }}
              />
            </div>
            <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl p-3">
              <div className="text-xs font-bold text-[#92400e] mb-1">
                To unlock your predictor score:
              </div>
              <div className="text-xs text-[#78350f] leading-relaxed">
                Complete at least 3 full exams and 200+ practice questions across all categories.
              </div>
            </div>
          </div>

          {/* Overall Performance */}
          <div className="bg-white rounded-xl p-6 border border-[#e2e8f0] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-4.5">
              <div className="text-[15px] font-bold text-[#0f172a]">Overall Performance</div>
              <div className="text-xs text-[#94a3b8]">Total questions attempted</div>
            </div>

            <div className="flex items-center gap-6 mb-5.5">
              <div className="relative shrink-0" style={{ width: 140, height: 140 }}>
                <svg width={140} height={140} style={{ transform: "rotate(-90deg)" }}>
                  <circle cx={70} cy={70} r={56} fill="none" stroke="#fee2e2" strokeWidth={14} />
                  <circle
                    cx={70}
                    cy={70}
                    r={56}
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth={14}
                    strokeDasharray={2 * Math.PI * 56}
                    strokeDashoffset={2 * Math.PI * 56 * (1 - 0.69)}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[22px] font-extrabold text-[#1e293b]">69%</div>
                  <div className="text-[11px] text-[#94a3b8] font-medium">Correct</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a] shrink-0" />
                  <div>
                    <div className="text-lg font-extrabold text-[#16a34a]">485</div>
                    <div className="text-xs text-[#64748b]">Correct (69%)</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f87171] shrink-0" />
                  <div>
                    <div className="text-lg font-extrabold text-[#dc2626]">215</div>
                    <div className="text-xs text-[#64748b]">Incorrect (31%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly activity */}
            <div>
              <div className="text-xs text-[#94a3b8] mb-2.5">This week's activity</div>
              <div className="flex items-end gap-1.5" style={{ height: 52 }}>
                {weekDays.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm"
                      style={{
                        background: weekActivity[i] > 0 ? "rgba(44,95,141,0.3)" : "#f1f5f9",
                        height: `${maxAct > 0 ? (weekActivity[i] / maxAct) * 34 + 4 : 4}px`,
                        minHeight: 4,
                        transition: "height 0.6s ease",
                      }}
                    />
                    <div className="text-[10px] text-[#94a3b8] font-medium">{day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance by Category */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
          <div className="px-6 py-4.5 border-b border-[#f1f5f9] flex items-center justify-between">
            <div className="text-[15px] font-bold text-[#0f172a]">Performance by Category</div>
            <div className="text-xs text-[#94a3b8]">
              Your scores across different NCLEX categories
            </div>
          </div>
          <div className="py-2">
            {PERF_DATA.map((cat, i) => {
              const ahead = cat.delta >= 0;
              return (
                <div
                  key={cat.name}
                  className="px-6 py-3.5"
                  style={{
                    borderBottom: i < PERF_DATA.length - 1 ? "1px solid #f8fafc" : "none",
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="text-sm font-bold text-[#1e293b] min-w-[140px]">
                      {cat.name}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                        ahead ? "bg-[#dcfce7] text-[#166534]" : "bg-[#fee2e2] text-[#991b1b]"
                      }`}
                    >
                      {ahead ? "+" : ""}
                      {cat.delta}% vs peers
                    </span>
                    <div className="flex-1" />
                    <div className="text-xs text-[#64748b] shrink-0">
                      {cat.questions} questions
                    </div>
                    <div
                      className="text-base font-extrabold w-[42px] text-right shrink-0"
                      style={{ color: scoreColor(cat.score) }}
                    >
                      {cat.score}%
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden relative mb-1.5">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        background: scoreColor(cat.score),
                        width: `${cat.score}%`,
                      }}
                    />
                    <div
                      className="absolute top-0 h-full w-0.5 bg-black/18 rounded-sm"
                      style={{ left: `${cat.peer}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#94a3b8]">
                    <span>Your score: {cat.score}%</span>
                    <span>Peer average: {cat.peer}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
