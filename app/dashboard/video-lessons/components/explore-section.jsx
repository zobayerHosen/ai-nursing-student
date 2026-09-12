"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Bookmark,
  BookmarkCheck,
  ChevronRight,
  Clock,
  TrendingUp,
  Download,
  Stethoscope,
  UserCheck,
  Pill,
  Calculator,
  Droplets,
  Baby,
  Bed,
  Activity,
  Video,
} from "lucide-react";
import {
  VIDEO_CATEGORIES,
  CONTINUE_WATCHING_LESSON,
  POPULAR_VIDEOS,
  NEW_RELEASES,
} from "../data/video-lessons-data";

export function getCategoryIcon(iconName, className = "w-5 h-5") {
  switch (iconName) {
    case "stethoscope":
      return <Stethoscope className={className} />;
    case "user-check":
      return <UserCheck className={className} />;
    case "pill":
      return <Pill className={className} />;
    case "calculator":
      return <Calculator className={className} />;
    case "droplets":
      return <Droplets className={className} />;
    case "baby":
      return <Baby className={className} />;
    case "bed":
      return <Bed className={className} />;
    case "activity":
      return <Activity className={className} />;
    default:
      return <Video className={className} />;
  }
}

export default function ExploreSection({
  onViewAllCategories,
  onOpenCategory,
  savedVideos,
  toggleBookmark,
}) {
  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {/* 1. Continue Watching Section */}
      <section className="w-full">
        <h2 className="text-lg sm:text-xl font-bold text-[#0f172a] mb-3 sm:mb-4">
          Continue Watching
        </h2>
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-4 sm:gap-6">
          {/* Thumbnail Preview */}
          <div className="relative w-full md:w-80 lg:w-96 aspect-video rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-900 shadow-xs border border-gray-100 group">
            <Image
              src={CONTINUE_WATCHING_LESSON.thumbnail}
              alt={CONTINUE_WATCHING_LESSON.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#1e3a5f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 ml-0.5 fill-current" />
              </div>
            </div>
          </div>

          {/* Info & Progress */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-info">
                {CONTINUE_WATCHING_LESSON.categoryTag}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#1e3a5f] mt-1 tracking-tight">
                {CONTINUE_WATCHING_LESSON.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] mt-1.5 line-clamp-2 leading-relaxed">
                {CONTINUE_WATCHING_LESSON.description}
              </p>
            </div>

            {/* Progress Bar & Actions */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="w-full sm:max-w-xs">
                <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#e14564] rounded-full"
                    style={{ width: `${CONTINUE_WATCHING_LESSON.progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] sm:text-xs text-[#64748b] font-medium mt-1.5 inline-block">
                  {CONTINUE_WATCHING_LESSON.currentTime} | {CONTINUE_WATCHING_LESSON.totalTime}
                </span>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <Link
                  href={`/dashboard/video-lessons/${CONTINUE_WATCHING_LESSON.id}`}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#142d4a] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume</span>
                </Link>

                <button
                  onClick={(e) => toggleBookmark(CONTINUE_WATCHING_LESSON.id, e)}
                  className="p-2 sm:p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-[#1e3a5f] transition-colors cursor-pointer"
                  title="Save to favorites"
                >
                  {savedVideos[CONTINUE_WATCHING_LESSON.id] ? (
                    <BookmarkCheck className="w-4 h-4 text-[#e14564] fill-current" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Browse by Categories Section */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
            Browse by Categories
          </h2>
          <button
            onClick={onViewAllCategories}
            className="text-xs sm:text-sm font-bold text-info hover:text-[#0369a1] transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {VIDEO_CATEGORIES.slice(0, 8).map((category) => (
            <div
              key={category.id}
              onClick={() => onOpenCategory(category)}
              className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] p-4 sm:p-4.5 flex items-start gap-3.5 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md cursor-pointer group"
            >
              <div
                className={`w-11 h-11 rounded-xl ${category.bgClass} ${category.iconColor} border ${category.borderClass} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
              >
                {getCategoryIcon(category.icon, "w-5 h-5")}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm sm:text-[15px] text-[#0f172a] group-hover:text-[#1e3a5f] transition-colors truncate">
                  {category.title}
                </h3>
                <p className="text-xs text-[#64748b] mt-0.5">
                  {category.lessonsCount} Lessons
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-info mt-2 group-hover:translate-x-0.5 transition-transform">
                  <span>View Lessons</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Popular Videos Section */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
            Popular Videos
          </h2>
          <button
            onClick={onViewAllCategories}
            className="text-xs sm:text-sm font-bold text-info hover:text-[#0369a1] transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Cards Row/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {POPULAR_VIDEOS.map((video) => (
            <Link
              key={video.id}
              href={`/dashboard/video-lessons/${video.id}`}
              className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] line-clamp-2 leading-snug group-hover:text-[#1e3a5f] transition-colors">
                    {video.title}
                  </h4>
                  <span className="text-[10px] font-bold text-info uppercase tracking-wider block mt-1">
                    {video.series}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
                  <span className="text-[11px] text-[#64748b] flex items-center gap-1 font-medium">
                    <Play className="w-3 h-3 fill-current text-[#94a3b8]" />
                    <span>{video.plays}</span>
                  </span>

                  <div className="w-7 h-7 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <Play className="w-3 h-3 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. New Releases Section */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
            New Releases
          </h2>
          <button
            onClick={onViewAllCategories}
            className="text-xs sm:text-sm font-bold text-info hover:text-[#0369a1] transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Cards Row/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {NEW_RELEASES.map((video) => (
            <Link
              key={video.id}
              href={`/dashboard/video-lessons/${video.id}`}
              className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {video.duration}
                </div>
              </div>

              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] line-clamp-2 leading-snug group-hover:text-[#1e3a5f] transition-colors">
                    {video.title}
                  </h4>
                  <span className="text-[10px] font-bold text-info uppercase tracking-wider block mt-1">
                    {video.series}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
                  <span className="text-[11px] text-[#64748b] flex items-center gap-1 font-medium">
                    <Play className="w-3 h-3 fill-current text-[#94a3b8]" />
                    <span>{video.plays}</span>
                  </span>

                  <div className="w-7 h-7 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                    <Play className="w-3 h-3 ml-0.5 fill-current" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Feature Benefits Banner */}
      <section className="w-full bg-primary-50 border border-[#dce6f1] rounded-2xl p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-primary-100">
          {/* 1. Bite-sized Lessons */}
          <div className="flex items-start gap-3.5 sm:pr-4">
            <div className="w-10 h-10 rounded-xl bg-white text-[#1e3a5f] shadow-xs flex items-center justify-center shrink-0 border border-primary-100">
              <Clock className="w-5 h-5 text-info" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1e3a5f]">Bite-sized Lessons</h4>
              <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                Short, focused videos that fit your busy schedule.
              </p>
            </div>
          </div>

          {/* 2. Save & Organize */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-10 h-10 rounded-xl bg-white text-[#1e3a5f] shadow-xs flex items-center justify-center shrink-0 border border-primary-100">
              <Bookmark className="w-5 h-5 text-info" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1e3a5f]">Save & Organize</h4>
              <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                Bookmark and organize lessons in your library.
              </p>
            </div>
          </div>

          {/* 3. Track Progress */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-10 h-10 rounded-xl bg-white text-[#1e3a5f] shadow-xs flex items-center justify-center shrink-0 border border-primary-100">
              <TrendingUp className="w-5 h-5 text-info" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1e3a5f]">Track Progress</h4>
              <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                Monitor your learning and stay on track.
              </p>
            </div>
          </div>

          {/* 4. Learn Anywhere */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:pl-4">
            <div className="w-10 h-10 rounded-xl bg-white text-[#1e3a5f] shadow-xs flex items-center justify-center shrink-0 border border-primary-100">
              <Download className="w-5 h-5 text-info" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1e3a5f]">Learn Anywhere</h4>
              <p className="text-xs text-[#64748b] mt-0.5 leading-relaxed">
                Download videos and watch offline.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
