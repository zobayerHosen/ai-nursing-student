"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Target,
  Heart,
  Pill,
  Wind,
  Baby,
  Play,
  ArrowUp,
  ChevronRight,
} from "lucide-react";
import { PROGRESS_PAGE_DATA } from "../data/video-lessons-data";

function getTopicIcon(iconName, className = "w-4 h-4") {
  switch (iconName) {
    case "heart":
      return <Heart className={className} />;
    case "pill":
      return <Pill className={className} />;
    case "wind":
      return <Wind className={className} />;
    case "baby":
      return <Baby className={className} />;
    default:
      return <Heart className={className} />;
  }
}

export default function ProgressSection() {
  const { metrics, topics, continueWatching } = PROGRESS_PAGE_DATA;

  // SVG Donut metrics
  const radius = 60;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius; // ~376.99

  // Segment 1: Completed (52%)
  const seg1Length = (52 / 100) * circumference;
  const seg1Offset = 0;

  // Segment 2: In Progress (25%)
  const seg2Length = (25 / 100) * circumference;
  const seg2Offset = -seg1Length - 3;

  // Segment 3: Not Started (22%)
  const seg3Length = (22 / 100) * circumference;
  const seg3Offset = -seg1Length - seg2Length - 6;

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. TOP DASHBOARD CARDS (DONUT CHART + 3 METRIC CARDS)       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Column (lg:col-span-6 xl:col-span-6): Video lessons Donut Card */}
        <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
              Video lessons
            </h2>
            <p className="text-xs text-[#64748b] mt-0.5">{metrics.totalVideos}</p>
          </div>

          <div className="my-5 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Donut Chart */}
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                {/* Background track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth={strokeWidth}
                />

                {/* Segment 1: Completed (Deep Blue) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="#1e3a5f"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${seg1Length} ${circumference}`}
                  strokeDashoffset={seg1Offset}
                  strokeLinecap="round"
                />

                {/* Segment 2: In Progress (Coral / Red) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="#f43f5e"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${seg2Length} ${circumference}`}
                  strokeDashoffset={seg2Offset}
                  strokeLinecap="round"
                />

                {/* Segment 3: Not Started (Sky Blue) */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke="#38bdf8"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${seg3Length} ${circumference}`}
                  strokeDashoffset={seg3Offset}
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-bold text-[#0f172a] leading-none">
                  {metrics.completePercent}%
                </span>
                <span className="text-xs font-semibold text-[#64748b] mt-1">Complete</span>
              </div>
            </div>

            {/* Legend & Breakdown List */}
            <div className="flex-1 w-full flex flex-col gap-4">
              {metrics.chartSegments.map((seg, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <div>
                      <span className="font-bold text-[#0f172a] block">{seg.label}</span>
                      <span className="text-[11px] text-[#64748b]">{seg.sub}</span>
                    </div>
                  </div>

                  <span className="font-bold text-[#0f172a]">
                    {seg.count}
                    <span className="text-xs text-[#64748b] font-normal">({seg.percent}%)</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-6 xl:col-span-6): 3 Metric Cards */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-4 sm:gap-5 justify-between">
          {/* Row 1: 2 Cards (Lessons Completed & Total Watch Time) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
            {/* Card 1: Lessons Completed */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 shadow-xs flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-success flex items-center justify-center shrink-0 mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#64748b] font-medium block">Lessons Completed</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                    {metrics.lessonsCompleted.value}
                  </span>
                  <span className="text-xs text-[#64748b]">
                    {metrics.lessonsCompleted.pctOfTotal}
                  </span>
                </div>
                <span className="text-xs text-success font-bold flex items-center gap-1 mt-2">
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{metrics.lessonsCompleted.trend}</span>
                </span>
              </div>
            </div>

            {/* Card 2: Total Watch Time */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 shadow-xs flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-accent-violet-50 text-[#7c3aed] flex items-center justify-center shrink-0 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#64748b] font-medium block">Total Watch Time</span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                    {metrics.totalWatchTime.value}
                  </span>
                  <span className="text-xs text-[#64748b]">
                    {metrics.totalWatchTime.pctOfTotal}
                  </span>
                </div>
                <span className="text-xs text-success font-bold flex items-center gap-1 mt-2">
                  <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{metrics.totalWatchTime.trend}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Row 2: Average Progress (Full Width of Right Col) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-6 shadow-xs flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#fff1f2] text-[#e11d48] flex items-center justify-center shrink-0 mb-2">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs text-[#64748b] font-medium block">Average Progress</span>
            <div className="flex items-baseline justify-center gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#0f172a]">
                {metrics.avgProgress.value}
              </span>
              <span className="text-xs text-[#64748b]">
                {metrics.avgProgress.pctOfTotal}
              </span>
            </div>
            <span className="text-xs text-success font-bold flex items-center justify-center gap-1 mt-1.5">
              <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{metrics.avgProgress.trend}</span>
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. BY TOPIC SECTION (4 COLUMNS GRID)                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
            By Topic
          </h2>
          <button className="text-xs sm:text-sm font-semibold text-info hover:text-[#0369a1] transition-colors cursor-pointer">
            View All Topics
          </button>
        </div>

        {/* 4-Column Grid of 12 Topics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
            >
              {/* Header row: icon, title, count */}
              <div className="flex items-center justify-between gap-2.5 mb-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg ${topic.iconBg} ${topic.iconColor} flex items-center justify-center shrink-0`}
                  >
                    {getTopicIcon(topic.icon, "w-4 h-4")}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] truncate group-hover:text-[#1e3a5f] transition-colors">
                    {topic.title}
                  </h4>
                </div>

                <span className="text-xs font-bold text-info shrink-0">
                  {topic.count}
                </span>
              </div>

              {/* Bottom Progress Bar */}
              <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                <div
                  className={`h-full ${topic.barColor} rounded-full`}
                  style={{ width: `${topic.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. CONTINUE WATCHING SECTION (2 COLUMNS GRID)               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
            Continue Watching
          </h2>
          <button className="text-xs sm:text-sm font-semibold text-info hover:text-[#0369a1] transition-colors cursor-pointer">
            View All
          </button>
        </div>

        {/* 2-Column Grid of 6 Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {continueWatching.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 group"
            >
              {/* Thumbnail */}
              <div className="relative w-full sm:w-28 sm:h-24 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0 bg-slate-900">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white/90 text-[#1e3a5f] flex items-center justify-center shadow-xs">
                    <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] truncate mt-0.5 group-hover:text-[#1e3a5f] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#64748b] line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>

                {/* Progress bar + Continue button */}
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex-1 max-w-44">
                    <div className="w-full h-1 bg-[#e2e8f0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#06b6d4] rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#64748b] mt-1 block">
                      {item.watched}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/video-lessons/heart-failure-patho`}
                    className="px-3.5 py-1 rounded-full bg-[#eef4fb] hover:bg-[#dbeafe] text-[#1e3a5f] text-xs font-semibold transition-colors shrink-0"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
