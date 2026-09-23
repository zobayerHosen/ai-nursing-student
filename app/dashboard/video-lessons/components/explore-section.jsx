"use client";
import React, { useState, useEffect } from "react";
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
  Video,
  FolderOpen,
  AlertCircle,
} from "lucide-react";
import { useGetExploreModules } from "@/hooks";
import dummayImage from "@/public/med_dumm.png";

function SafeVideoThumbnail({ src, alt, className = "" }) {
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
      className={`object-cover ${className}`}
      onError={() => {
        setHasError(true);
        setImgSrc(dummayImage);
      }}
    />
  );
}

function CategoryLogo({ logo, title }) {
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const resolveLogoUrl = (url) => {
    if (!url || typeof url !== "string") return null;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    const cleanBase = BASEURL.replace(/\/+$/, "");
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return cleanBase ? `${cleanBase}${cleanPath}` : url;
  };

  const initialSrc = resolveLogoUrl(logo) || dummayImage;
  const [src, setSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(!logo);

  useEffect(() => {
    const resolved = resolveLogoUrl(logo);
    setSrc(resolved || dummayImage);
    setHasError(!resolved);
  }, [logo]);

  return (
    <Image
      src={hasError || !src ? dummayImage : src}
      alt={title || "Category logo"}
      width={44}
      height={44}
      unoptimized={typeof src === "string" && src.startsWith("http")}
      className="w-8 h-full object-contain p-1"
      onError={() => {
        setHasError(true);
        setSrc(dummayImage);
      }}
    />
  );
}

export default function ExploreSection({
  onViewAllCategories,
  onOpenCategory,
  savedVideos,
  toggleBookmark,
}) {

  const { modulesData, isLoading, isError, isFetching } = useGetExploreModules();
  console.log("Module data", modulesData);

  const continueWatching = modulesData?.continue_watching;

  const popularVideos = Array.isArray(modulesData?.popular_videos)
    ? modulesData.popular_videos
    : modulesData?.popular_videos?.results || [];

  const newReleases = Array.isArray(modulesData?.new_releases)
    ? modulesData.new_releases
    : modulesData?.new_releases?.results || [];

  return (
    <div className="w-full flex flex-col gap-6 sm:gap-8">
      {/* 1. Continue Watching Section */}
      <section className="w-full">
        <h2 className="text-lg sm:text-xl font-bold text-[#0f172a] mb-3 sm:mb-4">
          Continue Watching
        </h2>

        {isLoading ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-4 sm:gap-6 animate-pulse">
            <div className="w-full md:w-80 lg:w-96 aspect-video rounded-xl sm:rounded-2xl bg-slate-200 shrink-0" />
            <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
              <div>
                <div className="w-24 h-3.5 bg-slate-200 rounded" />
                <div className="w-3/4 h-6 bg-slate-200 rounded mt-2.5" />
                <div className="w-full h-4 bg-slate-200 rounded mt-2" />
                <div className="w-1/2 h-4 bg-slate-200 rounded mt-1.5" />
              </div>
              <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="w-full sm:max-w-xs">
                  <div className="w-full h-2 bg-slate-200 rounded-full" />
                  <div className="w-28 h-3 bg-slate-200 rounded mt-2" />
                </div>
                <div className="w-28 h-10 bg-slate-200 rounded-xl" />
              </div>
            </div>
          </div>
        ) : isError ? (
          <div className="bg-red-50/50 rounded-2xl sm:rounded-3xl border border-dashed border-red-200 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-100/70 border border-red-200 flex items-center justify-center text-red-500 mb-3 shadow-xs">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
              Failed to Load Continue Watching
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
              Could not load your recent video progress. Please try refreshing the page.
            </p>
          </div>
        ) : !continueWatching || !(continueWatching.title || continueWatching.id) ? (
          <div className="bg-slate-50/50 rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 p-8 sm:p-10 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2C5F8D] mb-3 shadow-xs">
              <Play className="w-6 h-6 ml-0.5 fill-current" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
              No Videos in Progress
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
              You haven&apos;t started watching any video lessons yet. Select a lesson below to start learning!
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-4 sm:gap-6">
            {/* Thumbnail Preview */}
            <Link
              href={`/dashboard/video-lessons/${continueWatching.video_id || continueWatching.id}`}
              className="relative w-full md:w-80 lg:w-96 aspect-video rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-900 shadow-xs border border-gray-100 group block"
            >
              <SafeVideoThumbnail
                src={continueWatching.thumbnail}
                alt={continueWatching.title}
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 text-[#1e3a5f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </div>
              </div>
            </Link>

            {/* Info & Progress */}
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-info">
                  {continueWatching.module_name || continueWatching.category_name || "Video Lesson"}
                </span>
                <Link href={`/dashboard/video-lessons/${continueWatching.video_id || continueWatching.id}`}>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1e3a5f] mt-1 tracking-tight hover:underline cursor-pointer">
                    {continueWatching.title}
                  </h3>
                </Link>
                {continueWatching.description && (
                  <p className="text-xs sm:text-sm text-[#64748b] mt-1.5 line-clamp-2 leading-relaxed">
                    {continueWatching.description}
                  </p>
                )}
              </div>

              {/* Progress Bar & Actions */}
              <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="w-full sm:max-w-xs">
                  <div className="w-full h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e14564] rounded-full"
                      style={{ width: `${Math.min(100, Math.max(0, continueWatching.progress_percent ?? 0))}%` }}
                    />
                  </div>
                  <span className="text-[11px] sm:text-xs text-[#64748b] font-medium mt-1.5 inline-block">
                    {continueWatching.current_duration_formatted || "0m"} | {continueWatching.duration_formatted || "0m"}
                    {continueWatching.time_left ? ` (${continueWatching.time_left})` : ""}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  <Link
                    href={`/dashboard/video-lessons/${continueWatching.video_id || continueWatching.id}`}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#1e3a5f] hover:bg-[#142d4a] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Resume</span>
                  </Link>

                  <button
                    onClick={(e) => toggleBookmark(continueWatching.id || continueWatching.video_id, e)}
                    className="p-2 sm:p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-[#1e3a5f] transition-colors cursor-pointer"
                    title="Save to favorites"
                  >
                    {savedVideos?.[continueWatching.id || continueWatching.video_id] ?? continueWatching.is_favorite ? (
                      <BookmarkCheck className="w-4 h-4 text-[#e14564] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#e5e9f0] p-4 sm:p-4.5 flex items-start gap-3.5 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#eef4fb] border border-[#d8e6f5] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-[#eef4fb] border border-[#d8e6f5]"></div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="w-24 h-5 rounded-xl bg-[#eef4fb] border border-[#d8e6f5]"></div>
                  <div className="w-16 h-4 rounded-xl bg-[#eef4fb] border border-[#d8e6f5] mt-2"></div>
                  <div className="w-20 h-5 rounded-xl bg-[#eef4fb] border border-[#d8e6f5] mt-2"></div>
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10 px-4 text-center bg-red-50/50 rounded-2xl border border-dashed border-red-200">
              <div className="w-12 h-12 rounded-2xl bg-red-100/70 border border-red-200 flex items-center justify-center text-red-500 mb-3 shadow-xs">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
                Failed to Load Categories
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
                Could not load video categories at this time. Please try refreshing the page.
              </p>
            </div>
          ) : !modulesData?.categories || modulesData?.categories?.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-10 px-4 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2C5F8D] mb-3 shadow-xs">
                <FolderOpen className="w-6 h-6 text-[#2C5F8D]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
                No Categories Available
              </h3>
              <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
                We couldn&apos;t find any video categories right now. Check back later for new content.
              </p>
            </div>
          ) : (
            modulesData?.categories?.slice(0, 8).map((category) => (
              <div
                key={category.id}
                onClick={() => onOpenCategory(category)}
                className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] p-4 sm:p-4.5 flex items-start gap-3.5 transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md cursor-pointer group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${category.bgClass || "bg-[#eef4fb]"} ${category.iconColor || "text-[#1e3a5f]"} border ${category.borderClass || "border-[#d8e6f5]"} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden`}
                >
                  <CategoryLogo logo={category?.logo} title={category?.title} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm sm:text-[15px] text-[#0f172a] group-hover:text-[#1e3a5f] transition-colors truncate">
                    {category.title}
                  </h3>
                  <p className="text-xs text-[#64748b] mt-0.5">
                    {category.total_lessons ?? "0"} Lessons
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-info mt-2 group-hover:translate-x-0.5 transition-transform">
                    <span>View Lessons</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
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

        {/* 6 Cards Row/Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#e5e9f0] overflow-hidden shadow-xs flex flex-col animate-pulse"
              >
                <div className="aspect-video w-full bg-slate-200" />
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-full h-4 bg-slate-200 rounded" />
                    <div className="w-2/3 h-4 bg-slate-200 rounded mt-1.5" />
                    <div className="w-16 h-3 bg-slate-200 rounded mt-2.5" />
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
                    <div className="w-12 h-3 bg-slate-200 rounded" />
                    <div className="w-7 h-7 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="bg-red-50/50 rounded-2xl border border-dashed border-red-200 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-red-100/70 border border-red-200 flex items-center justify-center text-red-500 mb-2.5 shadow-xs">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
              Failed to Load Popular Videos
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
              Could not load popular videos at this time. Please try refreshing the page.
            </p>
          </div>
        ) : !popularVideos || popularVideos.length === 0 ? (
          <div className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2C5F8D] mb-2.5 shadow-xs">
              <Video className="w-5 h-5 text-[#2C5F8D]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
              No Popular Videos Found
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
              Popular video lessons will appear here once they become available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {popularVideos?.slice(0, 6).map((video) => (
              <Link
                key={video.id || video.video_id}
                href={`/dashboard/video-lessons/${video.video_id || video.id}`}
                className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <SafeVideoThumbnail
                    src={video.thumbnail}
                    alt={video.title}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] line-clamp-2 leading-snug group-hover:text-[#1e3a5f] transition-colors">
                      {video.title ?? "Title"}
                    </h4>
                    <span className="text-[10px] font-bold text-info uppercase tracking-wider block mt-1 truncate">
                      {video.module_name || video.category_name || video.module_title || "Nursing Lesson"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
                    <span className="text-[11px] text-[#64748b] flex items-center gap-1 font-medium">
                      <Play className="w-3 h-3 fill-current text-[#94a3b8]" />
                      <span>{video.views_formatted || `${video.views_count ?? 0} Views`}</span>
                    </span>

                    <div className="w-7 h-7 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <Play className="w-3 h-3 ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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

        {/* 6 Cards Row/Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#e5e9f0] overflow-hidden shadow-xs flex flex-col animate-pulse"
              >
                <div className="aspect-video w-full bg-slate-200" />
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-full h-4 bg-slate-200 rounded" />
                    <div className="w-2/3 h-4 bg-slate-200 rounded mt-1.5" />
                    <div className="w-16 h-3 bg-slate-200 rounded mt-2.5" />
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
                    <div className="w-12 h-3 bg-slate-200 rounded" />
                    <div className="w-7 h-7 rounded-full bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="bg-red-50/50 rounded-2xl border border-dashed border-red-200 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-red-100/70 border border-red-200 flex items-center justify-center text-red-500 mb-2.5 shadow-xs">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
              Failed to Load New Releases
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
              Could not load new releases at this time. Please try refreshing the page.
            </p>
          </div>
        ) : !newReleases || newReleases.length === 0 ? (
          <div className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2C5F8D] mb-2.5 shadow-xs">
              <Video className="w-5 h-5 text-[#2C5F8D]" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
              No New Releases Found
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
              New video lessons will appear here as soon as they are published.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
            {newReleases.slice(0, 6).map((video) => (
              <Link
                key={video.id || video.video_id}
                href={`/dashboard/video-lessons/${video.video_id || video.id}`}
                className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <SafeVideoThumbnail
                    src={video.thumbnail}
                    alt={video.title}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  {(video.duration_formatted || video.duration_seconds !== undefined) && (
                    <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {video.duration_formatted || (video.duration_seconds > 0 ? `${Math.round(video.duration_seconds / 60)}m` : "0m")}
                    </div>
                  )}
                </div>

                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] line-clamp-2 leading-snug group-hover:text-[#1e3a5f] transition-colors">
                      {video.title}
                    </h4>
                    <span className="text-[10px] font-bold text-info uppercase tracking-wider block mt-1 truncate">
                      {video.module_name || video.category_name || video.module_title || "Nursing Lesson"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
                    <span className="text-[11px] text-[#64748b] flex items-center gap-1 font-medium">
                      <Play className="w-3 h-3 fill-current text-[#94a3b8]" />
                      <span>{video.views_formatted || `${video.views_count ?? 0} Views`}</span>
                    </span>

                    <div className="w-7 h-7 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                      <Play className="w-3 h-3 ml-0.5 fill-current" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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