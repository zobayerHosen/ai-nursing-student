"use client";

import {
  BookOpen,
  Layers,
  Target,
  Crown,
  TrendingUp,
  Stethoscope,
} from "lucide-react";
import { useGetFlashcardProgress } from "@/hooks/flashcards";
import { TOPIC_MASTERY_LIST, DEFAULT_MASTERY_STATS } from "./dummy-data";

export default function PerformanceTab() {

  const { categories, overall, isLoading } = useGetFlashcardProgress();

  // Stats matching Screenshot 3
  const masteryData = {
    percent: DEFAULT_MASTERY_STATS.percent,
    breakdown: [
      {
        label: "Easy",
        sub: "Got it right",
        count: overall?.easy || DEFAULT_MASTERY_STATS.breakdown[0].count,
        pct: 52,
        color: "#1B4B66",
      },
      {
        label: "Hard",
        sub: "Worth a re-attempt",
        count: overall?.hard || DEFAULT_MASTERY_STATS.breakdown[1].count,
        pct: 25,
        color: "#F43F5E",
      },
      {
        label: "Not Attempted",
        sub: "Still to attempt",
        count: overall?.total_cards ? Math.max(0, overall.total_cards - (overall.reviewed_cards || 0)) : DEFAULT_MASTERY_STATS.breakdown[2].count,
        pct: 22,
        color: "#BAE6FD",
      },
    ],
  };

  // SVG Donut calculation
  const radius = 52;
  const circumference = 2 * Math.PI * radius; // ~326.7
  let accumulatedPct = 0;

  return (
    <div className="w-full space-y-8 animate-[fadeIn_0.3s_ease]">
      {/* ─── ROW 1: FLASHCARD MASTERY & 4 STAT CARDS ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Flashcard Mastery (Donut Chart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1B4B66]">Flashcard Mastery</h2>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              SRS health across your library
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 my-auto pt-4 pb-2">
            {/* Donut Chart */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
                {/* Background Ring */}
                <circle
                  cx="65"
                  cy="65"
                  r={radius}
                  fill="none"
                  stroke="#F8FAFC"
                  strokeWidth="14"
                />

                {/* Segments */}
                {masteryData.breakdown.map((item, idx) => {
                  const strokeDasharray = `${(item.pct / 100) * circumference} ${circumference}`;
                  const strokeDashoffset = -(accumulatedPct / 100) * circumference;
                  accumulatedPct += item.pct;

                  return (
                    <circle
                      key={idx}
                      cx="65"
                      cy="65"
                      r={radius}
                      fill="none"
                      stroke={item.color}
                      strokeWidth="14"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="transition-all duration-700"
                    />
                  );
                })}
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-[#1B4B66] leading-none">
                  {masteryData.percent}%
                </span>
                <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">
                  CARDS
                </span>
              </div>
            </div>

            {/* Legend List */}
            <div className="flex-1 w-full space-y-3">
              {masteryData.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-1 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <span className="font-bold text-gray-800">{item.label}</span>
                      <p className="text-[11px] text-gray-400 leading-tight">
                        {item.sub}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-gray-800">{item.count}</span>
                    <span className="text-gray-400 ml-1 font-medium">({item.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 4 Stat Cards in 2x2 Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Cards Studied */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BookOpen size={20} strokeWidth={2.2} />
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500">Cards Studied</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B4B66] tracking-tight mt-0.5">
                {overall?.reviewed_cards || 665}
              </h3>

              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-1">
                <TrendingUp size={13} />
                <span>18% vs last 7 days</span>
              </div>
            </div>
          </div>

          {/* 2. Total Cards */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Layers size={20} strokeWidth={2.2} />
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500">Total Cards</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B4B66] tracking-tight mt-0.5">
                {overall?.total_cards ? overall.total_cards.toLocaleString() : "1,402"}
              </h3>

              <p className="text-xs text-gray-400 font-medium mt-1">
                Across all topics
              </p>
            </div>
          </div>

          {/* 3. Avg. Recall */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Target size={20} strokeWidth={2.2} />
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500">Avg. Recall</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B4B66] tracking-tight mt-0.5">
                {overall?.percentage ? `${overall.percentage}%` : "78%"}
              </h3>

              <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-1">
                <TrendingUp size={13} />
                <span>6% vs last 7 days</span>
              </div>
            </div>
          </div>

          {/* 4. Mastered Cards */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Crown size={20} strokeWidth={2.2} />
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500">Mastered Cards</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B4B66] tracking-tight mt-0.5">
                {overall?.easy || 312}
              </h3>

              <p className="text-xs text-gray-400 font-medium mt-1">
                22% of total
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ROW 2: TOPIC MASTERY (4 COLUMNS GRID) ──────────────────── */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B4B66] tracking-tight">
          Topic Mastery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TOPIC_MASTERY_LIST.map((topic, index) => {
            const Icon = topic.icon || Stethoscope;

            return (
              <div
                key={`${topic.id}-${index}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between space-y-3.5 group cursor-pointer hover:-translate-y-0.5"
              >
                {/* Top Row: Icon, Title, Due Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${topic.iconBg}`}
                    >
                      <Icon size={16} className={topic.iconColor} strokeWidth={2.2} />
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                      {topic.name}
                    </h3>
                  </div>

                  <span className="bg-pink-100 text-rose-500 text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    {topic.dueCount} Due
                  </span>
                </div>

                {/* Middle: Progress Bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${topic.progressColor}`}
                    style={{ width: `${topic.progressPct}%` }}
                  />
                </div>

                {/* Bottom Row: Stats & Easy count */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="text-gray-500 font-medium">
                    {topic.cardsCount} cards •{" "}
                    <span className="font-bold text-gray-700">{topic.recallRate}</span> recall
                  </span>

                  <span className={`font-bold ${topic.easyColor}`}>
                    {topic.easyCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
