"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Target,
  Play,
  ArrowUp,
  AlertCircle,
  Video,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import dummayImage from "@/public/med_dumm.png";
import { useGetVideoLessonsProgress } from "@/hooks";

function SafeThumbnail({ src, alt }) {
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const resolveUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    const cleanBase = BASEURL.replace(/\/+$/, "");
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return cleanBase ? `${cleanBase}${cleanPath}` : url;
  };

  const initialSrc = resolveUrl(src) || dummayImage;
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    const resolved = resolveUrl(src);
    setImgSrc(resolved || dummayImage);
    setHasError(!resolved);
  }, [src]);

  return (
    <Image
      src={hasError || !imgSrc ? dummayImage : imgSrc}
      alt={alt || "Video thumbnail"}
      fill
      unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      onError={() => {
        setHasError(true);
        setImgSrc(dummayImage);
      }}
    />
  );
}

function SafeLogo({ src, alt }) {
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const resolveUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    const cleanBase = BASEURL.replace(/\/+$/, "");
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return cleanBase ? `${cleanBase}${cleanPath}` : url;
  };

  const initialSrc = resolveUrl(src) || dummayImage;
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(!src);

  useEffect(() => {
    const resolved = resolveUrl(src);
    setImgSrc(resolved || dummayImage);
    setHasError(!resolved);
  }, [src]);

  if (hasError || !imgSrc) {
    return <FolderOpen className="w-4 h-4 text-[#1e3a5f]" />;
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || "Topic icon"}
      width={24}
      height={24}
      unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
      className="w-5 h-5 object-contain"
      onError={() => {
        setHasError(true);
      }}
    />
  );
}

export default function ProgressSection() {
  const { progressData, isLoading, isError } = useGetVideoLessonsProgress();

  const payload = progressData?.data || progressData;
  const summary = payload?.library_summary;
  const stats = payload?.stats;
  const topics = Array.isArray(payload?.topics) ? payload.topics : [];
  const recentlyWatched = Array.isArray(payload?.recently_watched)
    ? payload.recently_watched
    : [];

  // Summary Metrics
  const totalVideos = summary?.total_videos ?? 0;
  const completePercent =
    summary?.overall_completion_percentage ??
    summary?.completed?.percentage_value ??
    0;

  const completedCount = summary?.completed?.count ?? 0;
  const completedPct = summary?.completed?.percentage_value ?? 0;
  const completedProgress = summary?.completed?.progress || `${completedCount}/${totalVideos}`;

  const inProgressCount = summary?.in_progress?.count ?? 0;
  const inProgressPct = summary?.in_progress?.percentage_value ?? 0;
  const inProgressProgress = summary?.in_progress?.progress || `${inProgressCount}/${totalVideos}`;

  const notStartedCount = summary?.not_started?.count ?? 0;
  const notStartedPct = summary?.not_started?.percentage_value ?? 0;
  const notStartedProgress = summary?.not_started?.progress || `${notStartedCount}/${totalVideos}`;

  // SVG Donut metrics
  const radius = 60;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius; // ~376.99

  const seg1Length = (completedPct / 100) * circumference;
  const seg1Offset = 0;

  const seg2Length = (inProgressPct / 100) * circumference;
  const seg2Offset = -seg1Length - (completedPct > 0 ? 3 : 0);

  const seg3Length = (notStartedPct / 100) * circumference;
  const seg3Offset =
    -seg1Length -
    seg2Length -
    (completedPct > 0 || inProgressPct > 0 ? 6 : 0);

  const chartSegments = [
    {
      label: "Completed",
      sub: `${completedProgress} videos`,
      count: completedCount,
      percent: completedPct,
      color: "#1e3a5f",
    },
    {
      label: "In Progress",
      sub: `${inProgressProgress} videos`,
      count: inProgressCount,
      percent: inProgressPct,
      color: "#f43f5e",
    },
    {
      label: "Not Started",
      sub: `${notStartedProgress} videos`,
      count: notStartedCount,
      percent: notStartedPct,
      color: "#38bdf8",
    },
  ];

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 sm:gap-8 animate-pulse">
        {/* Top Skeletons */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-6 h-64" />
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-[#e5e9f0] p-5 h-28" />
            <div className="bg-white rounded-2xl border border-[#e5e9f0] p-5 h-28" />
            <div className="sm:col-span-2 bg-white rounded-2xl border border-[#e5e9f0] p-5 h-28" />
          </div>
        </div>

        {/* Topics Skeleton */}
        <div className="w-full">
          <div className="w-32 h-6 bg-slate-200 rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#e5e9f0] p-4 h-20"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50/50 rounded-2xl border border-dashed border-red-200 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-11 h-11 rounded-2xl bg-red-100/70 border border-red-200 flex items-center justify-center text-red-500 mb-2.5 shadow-xs">
          <AlertCircle className="w-5 h-5 text-red-500" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
          Failed to Load Progress
        </h3>
        <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
          Could not load your video lessons progress data at this time. Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. TOP DASHBOARD CARDS (DONUT CHART + 3 METRIC CARDS)       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {/* Left Column (lg:col-span-6): Video lessons Donut Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0f172a] tracking-tight">
              Video lessons
            </h2>
            <p className="text-xs text-[#64748b] mt-0.5">
              {totalVideos} {totalVideos === 1 ? "Video" : "Videos"} total
            </p>
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
                {completedPct > 0 && (
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
                )}

                {/* Segment 2: In Progress (Coral / Red) */}
                {inProgressPct > 0 && (
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
                )}

                {/* Segment 3: Not Started (Sky Blue) */}
                {notStartedPct > 0 && (
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
                )}
              </svg>

              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl sm:text-3xl font-bold text-[#0f172a] leading-none">
                  {completePercent}%
                </span>
                <span className="text-xs font-semibold text-[#64748b] mt-1">
                  Complete
                </span>
              </div>
            </div>

            {/* Legend & Breakdown List */}
            <div className="flex-1 w-full flex flex-col gap-4">
              {chartSegments.map((seg, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: seg.color }}
                    />
                    <div>
                      <span className="font-bold text-[#0f172a] block">
                        {seg.label}
                      </span>
                      <span className="text-[11px] text-[#64748b]">{seg.sub}</span>
                    </div>
                  </div>

                  <span className="font-bold text-[#0f172a]">
                    {seg.count}{" "}
                    <span className="text-xs text-[#64748b] font-normal">
                      ({seg.percent}%)
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-6): 3 Metric Cards */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5 justify-between">
          {/* Row 1: 2 Cards (Lessons Completed & Total Watch Time) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
            {/* Card 1: Lessons Completed */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 shadow-xs flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-emerald-600 flex items-center justify-center shrink-0 mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#64748b] font-medium block">
                  Lessons Completed
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                    {stats?.lessons_completed?.count ?? 0}
                  </span>
                  <span className="text-xs text-[#64748b]">
                    {stats?.lessons_completed?.label ? `(${stats.lessons_completed.label})` : ""}
                  </span>
                </div>
                {stats?.lessons_completed?.this_week_label && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-2">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{stats.lessons_completed.this_week_label}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Card 2: Total Watch Time */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 shadow-xs flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#64748b] font-medium block">
                  Total Watch Time
                </span>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#0f172a]">
                    {stats?.total_watch_time?.formatted ?? "0m"}
                  </span>
                  <span className="text-xs text-[#64748b]">
                    {stats?.total_watch_time?.label ? `(${stats.total_watch_time.label})` : ""}
                  </span>
                </div>
                {stats?.total_watch_time?.this_week_label && (
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-2">
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{stats.total_watch_time.this_week_label}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Row 2: Average Progress */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-6 shadow-xs flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#fff1f2] text-[#e11d48] flex items-center justify-center shrink-0 mb-2">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs text-[#64748b] font-medium block">
              Average Progress
            </span>
            <div className="flex items-baseline justify-center gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-bold text-[#0f172a]">
                {stats?.average_progress?.percentage ??
                  `${stats?.average_progress?.percentage_value ?? 0}%`}
              </span>
              <span className="text-xs text-[#64748b]">
                {stats?.average_progress?.label ? `(${stats.average_progress.label})` : ""}
              </span>
            </div>
            {stats?.average_progress?.this_week_label && (
              <span className="text-xs text-emerald-600 font-bold flex items-center justify-center gap-1 mt-1.5">
                <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{stats.average_progress.this_week_label}</span>
              </span>
            )}
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
          <Link
            href="/dashboard/video-lessons?view=all-categories"
            className="text-xs sm:text-sm font-semibold text-info hover:text-[#0369a1] transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>View All Topics</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Topics Grid */}
        {topics.length === 0 ? (
          <div className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs text-[#64748b]">
            No topic progress available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {topics.map((topic) => {
              const pct = topic.percentage_value ?? 0;
              const progressText = topic.progress || `${topic.completed_count ?? 0}/${topic.total_count ?? 0}`;

              return (
                <Link
                  key={topic.module_id}
                  href={`/dashboard/video-lessons/category/${topic.module_id}?from=progress`}
                  className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between cursor-pointer group"
                >
                  {/* Header row: logo/icon, title, count */}
                  <div className="flex items-center justify-between gap-2.5 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-50/80 border border-blue-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                        <SafeLogo src={topic.logo} alt={topic.module_name} />
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] truncate group-hover:text-[#1e3a5f] transition-colors">
                        {topic.module_name}
                      </h4>
                    </div>

                    <span className="text-xs font-bold text-info shrink-0">
                      {progressText}
                    </span>
                  </div>

                  {/* Bottom Progress Bar */}
                  <div className="w-full h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1e3a5f] rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. CONTINUE WATCHING / RECENTLY WATCHED SECTION             */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
            Continue Watching
          </h2>
        </div>

        {recentlyWatched.length === 0 ? (
          <div className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1e3a5f] mb-2 shadow-xs">
              <Video className="w-5 h-5 text-[#1e3a5f]" />
            </div>
            <h3 className="text-sm font-bold text-[#0f172a] mb-1">
              No videos in progress
            </h3>
            <p className="text-xs text-[#64748b] max-w-sm">
              Lessons you start watching will appear here so you can easily resume your learning.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {recentlyWatched.map((item) => {
              const videoId = item.video_id || item.id;
              const progressPct = item.progress_percent ?? item.completed_percentage ?? 0;

              return (
                <div
                  key={videoId}
                  className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 group"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/dashboard/video-lessons/${videoId}`}
                    className="relative w-full sm:w-28 sm:h-24 aspect-video sm:aspect-square rounded-xl overflow-hidden shrink-0 bg-slate-900 block"
                  >
                    <SafeThumbnail src={item.thumbnail} alt={item.title} />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/90 text-[#1e3a5f] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                        <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
                      </div>
                    </div>
                  </Link>

                  {/* Details & Actions */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-info uppercase tracking-wider block truncate">
                        {item.serial_number
                          ? `Lesson ${item.serial_number}`
                          : item.module_name || "Nursing Lesson"}
                      </span>
                      <Link
                        href={`/dashboard/video-lessons/${videoId}`}
                        className="font-bold text-xs sm:text-sm text-[#0f172a] truncate mt-0.5 block group-hover:text-[#1e3a5f] transition-colors"
                      >
                        {item.title || item.lesson}
                      </Link>
                      {item.description && (
                        <p className="text-[11px] sm:text-xs text-[#64748b] line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Progress bar + Continue button */}
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex-1 max-w-44">
                        <div className="w-full h-1 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-info rounded-full"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-[#64748b] mt-1 block">
                          {progressPct}% completed
                        </span>
                      </div>

                      <Link
                        href={`/dashboard/video-lessons/${videoId}`}
                        className="px-3.5 py-1 rounded-full bg-[#eef4fb] hover:bg-[#dbeafe] text-[#1e3a5f] text-xs font-semibold transition-colors shrink-0"
                      >
                        Continue
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

