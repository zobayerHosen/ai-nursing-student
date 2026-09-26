"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Heart,
  Clock,
  BarChart3,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  FileText,
  Download,
  Video,
  AlertCircle,
  Loader2,
  BookmarkCheck,
  Bookmark,
} from "lucide-react";
import { useAddVideoToFavorite, useGetVideoDetails, usePostVideoProgress } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "";

function VideoLessonSkeleton({ onBack }) {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden animate-pulse">
      {/* Top Header Skeleton */}
      <div className="w-full bg-white border-b border-[#e2e8f0] px-3.5 sm:px-6 lg:px-8 xl:px-10 py-3.5 sm:py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="h-5 sm:h-6 w-56 sm:w-80 bg-slate-200 rounded-md mb-2" />
            <div className="h-3.5 w-36 sm:w-48 bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      {/* Main Container Skeleton */}
      <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-6">
            {/* Video Player Skeleton */}
            <div className="w-full aspect-video rounded-2xl sm:rounded-3xl bg-slate-900 border border-[#e2e8f0] flex items-center justify-center relative overflow-hidden shadow-sm">
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-slate-800/90 border border-slate-700/60 flex items-center justify-center">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-slate-500 fill-slate-500 ml-1" />
              </div>
            </div>

            {/* Action Bar Skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-8 w-36 bg-slate-200 rounded-xl" />
            </div>

            {/* Tabbed Card Skeleton */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-7 shadow-xs">
              {/* Tab Header */}
              <div className="flex items-center gap-8 border-b border-[#f1f5f9] -mt-1 pb-3 mb-5 sm:mb-6">
                <div className="h-5 w-20 bg-slate-200 rounded" />
                <div className="h-5 w-20 bg-slate-100 rounded" />
              </div>

              {/* About shimmer */}
              <div className="space-y-3">
                <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                <div className="h-3.5 w-full bg-slate-100 rounded" />
                <div className="h-3.5 w-11/12 bg-slate-100 rounded" />
                <div className="h-3.5 w-4/5 bg-slate-100 rounded" />
              </div>

              {/* 2 Metric Boxes Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                    <div className="h-3 w-12 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-20 bg-slate-200 rounded" />
                    <div className="h-3 w-16 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>

              {/* What You'll Learn Skeleton */}
              <div className="mt-6 space-y-3">
                <div className="h-4 w-36 bg-slate-200 rounded mb-3" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
                    <div className="h-3.5 w-full max-w-md bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6">
            {/* Next Lessons Skeleton */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#f1f5f9]">
                <div className="h-4 w-28 bg-slate-200 rounded" />
                <div className="h-4 w-10 bg-slate-100 rounded" />
              </div>
              <div className="mt-3 space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-2.5 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 w-full bg-slate-200 rounded" />
                      <div className="h-2.5 w-16 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Lessons Skeleton */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
              <div className="pb-3 border-b border-[#f1f5f9]">
                <div className="h-4 w-32 bg-slate-200 rounded" />
              </div>
              <div className="mt-3 space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-2.5 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 w-full bg-slate-200 rounded" />
                      <div className="h-2.5 w-24 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoLessonDetails({ videoId }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { videoData, isLoading, isError } = useGetVideoDetails(videoId);
  const { addVideoToFavorite, isPending } = useAddVideoToFavorite();
  console.log("Video data", videoData);
  const { videoProgress } = usePostVideoProgress();

  // Extract raw details object safely
  const details = useMemo(() => {
    return videoData?.data || videoData || null;
  }, [videoData]);

  const [activeTab, setActiveTab] = useState("Overview"); // "Overview" | "Resources"
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0x");
  const [isFavorite, setIsFavorite] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  const [totalDurationStr, setTotalDurationStr] = useState("00:00");

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  // Time formatter helper
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Sync initial state when details arrive
  useEffect(() => {
    if (details) {
      if (details.is_favorite !== undefined) {
        setIsFavorite(Boolean(details.is_favorite));
      }
      if (details.progress?.progress_percent !== undefined) {
        setProgressPercent(details.progress.progress_percent);
      }
      if (details.progress?.current_duration) {
        setCurrentTimeStr(formatTime(details.progress.current_duration));
      }
      if (details.duration_formatted) {
        setTotalDurationStr(details.duration_formatted);
      } else if (details.duration) {
        setTotalDurationStr(details.duration);
      } else if (details.duration_seconds) {
        setTotalDurationStr(formatTime(details.duration_seconds));
      }
    }
  }, [details]);

  // Resolve video URL without using any thumbnail
  const videoSrc = useMemo(() => {
    const rawUrl = details?.video_url;
    if (!rawUrl || typeof rawUrl !== "string") return null;
    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
      return rawUrl;
    }
    const cleanBase = BASEURL.replace(/\/+$/, "");
    const cleanPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
    return cleanBase ? `${cleanBase}${cleanPath}` : rawUrl;
  }, [details?.video_url]);

  // Back button handler: Navigate back to the previous page
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard/video-lessons");
    }
  };

  // Video playback controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (offsetSeconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += offsetSeconds;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleSpeedChange = () => {
    const speeds = ["1.0x", "1.25x", "1.5x", "2.0x"];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(nextSpeed);
    }
  };

  const toggleFullscreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerContainerRef.current.requestFullscreen();
      }
    }
  };

  const handleVideoEnded = async () => {
    setIsPlaying(false);
    try {
      if (videoRef.current) {
        await videoProgress({
          id: videoId,
          total_duration: Math.round(videoRef.current.duration),
          current_duration: Math.round(videoRef.current.currentTime),
          is_completed: true,
        });
      }
      queryClient.invalidateQueries({ queryKey: ["video-module"] });
      queryClient.invalidateQueries({ queryKey: ["video-modules"] });
      queryClient.invalidateQueries({ queryKey: ["video-details", videoId] });
      toast.success("Lesson completed!");
    } catch {
      // ignore
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      if (details?.progress?.current_duration && !videoRef.current.currentTime) {
        videoRef.current.currentTime = details.progress.current_duration;
      }
      if (videoRef.current.duration) {
        setTotalDurationStr(formatTime(videoRef.current.duration));
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setProgressPercent((cur / dur) * 100);
      setCurrentTimeStr(formatTime(cur));
      setTotalDurationStr(formatTime(dur));
    }
  };

  // Render skeleton when data is loading
  if (isLoading && !details) {
    return <VideoLessonSkeleton onBack={handleBack} />;
  }

  // Render error state if failed
  if (isError) {
    return (
      <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col">
        <div className="w-full bg-white border-b border-[#e2e8f0] px-3.5 sm:px-6 lg:px-8 xl:px-10 py-3.5 sm:py-4">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center text-red-500 mb-3 shadow-xs">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#0f172a] mb-1">
            Failed to load video lesson
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] max-w-sm mb-4">
            Could not retrieve video details. Please try again or navigate back.
          </p>
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 rounded-xl bg-[#1e3a5f] text-white text-xs font-semibold hover:bg-[#142d4a] transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    );
  }

  // Real mapped values from API data
  const title = details?.title || "Video Lesson";
  const series =
    details?.module_name || details?.module_title || details?.category || "Nursing Video Lessons";
  const lessonNumber = details?.serial_number
    ? `Lesson ${details.serial_number}${details.module_total_videos ? ` of ${details.module_total_videos}` : ""
    }`
    : "Nursing Lesson";
  const aboutText =
    details?.overview_data?.about || details?.description || "No overview available for this lesson.";
  const durationText =
    details?.overview_data?.duration_formatted ||
    details?.overview_data?.duration ||
    details?.duration_formatted ||
    details?.duration ||
    "00:00";
  const difficultyText = details?.overview_data?.difficulty_level || "Beginner";
  const whatYouLearn = Array.isArray(details?.overview_data?.what_you_will_learn)
    ? details.overview_data.what_you_will_learn
    : [];
  const resources = Array.isArray(details?.resources) ? details.resources : [];
  const nextLessons = Array.isArray(details?.next_lessons) ? details.next_lessons : [];
  const similarLessons = Array.isArray(details?.similar_lessons) ? details.similar_lessons : [];

  const watchedCount = details?.module_watched_videos ?? 0;
  const totalCount = details?.module_total_videos ?? (nextLessons.length || 0);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* TOP HEADER / BREADCRUMB                                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-[#e2e8f0] px-3.5 sm:px-6 lg:px-8 xl:px-10 py-3.5 sm:py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            title="Back to previous page"
            aria-label="Back to previous page"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg lg:text-xl font-bold text-[#0f172a] truncate">
              {title}
            </h1>
            <p className="text-[11px] sm:text-xs text-[#64748b]">
              {lessonNumber} • {series}
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* MAIN TWO-COLUMN CONTAINER (RESPONSIVE)                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: VIDEO PLAYER & LESSON DETAILS (~68% on XL)    */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-6">
            {/* 1. Video Player Container - No Thumbnail used */}
            <div
              ref={playerContainerRef}
              className="w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 relative shadow-sm border border-[#e2e8f0] group select-none"
            >
              {videoSrc ? (
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="w-full h-full object-contain"
                  onEnded={handleVideoEnded}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  playsInline
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                    <Video className="w-7 h-7 text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-300">Video Lesson</p>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs truncate">{title}</p>
                </div>
              )}

              {/* Big Center Play / Pause Button Overlay */}
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 group-hover:bg-black/30 transition-colors"
              >
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/95 text-[#1e3a5f] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current" />
                  )}
                </div>
              </div>

              {/* Bottom Custom Controls Bar */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4.5 flex flex-col gap-2 opacity-95 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Scrubber Progress Bar */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newPercent = (clickX / rect.width) * 100;
                    setProgressPercent(newPercent);
                    if (videoRef.current && videoRef.current.duration) {
                      videoRef.current.currentTime =
                        (newPercent / 100) * videoRef.current.duration;
                    }
                  }}
                  className="w-full h-1.5 hover:h-2 bg-white/30 hover:bg-white/40 rounded-full cursor-pointer relative transition-all"
                >
                  <div
                    className="h-full bg-[#e14564] rounded-full relative"
                    style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                  {/* Left Controls */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSeek(-10)}
                      className="hover:text-blue-300 transition-colors cursor-pointer"
                      title="Back 10s"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSeek(10)}
                      className="hover:text-blue-300 transition-colors cursor-pointer"
                      title="Forward 10s"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>

                    <span className="text-[11px] sm:text-xs font-medium text-gray-200">
                      {currentTimeStr} / {totalDurationStr}
                    </span>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={handleSpeedChange}
                      className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[11px] font-bold cursor-pointer transition-colors"
                      title="Playback Speed"
                    >
                      {playbackSpeed}
                    </button>

                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="hover:text-blue-300 transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      <Maximize className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Action Bar: Add to Favorites */}
            <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-[#1e3a5f]">
              <button
                type="button"
                disabled={isPending}
                onClick={async () => {
                  try {
                    await addVideoToFavorite(videoId);
                  } catch (e) {
                    // Handled by mutation hook toast
                  }
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 hover:border-[#1e3a5f]/40 hover:bg-white text-[#1e3a5f] bg-white transition-all cursor-pointer shadow-2xs font-semibold w-fit ${
                  isPending ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 text-[#1e3a5f] animate-spin" />
                ) : isFavorite ? (
                  <BookmarkCheck className="w-4 h-4 text-[#e14564] fill-current transition-all duration-200" />
                ) : (
                  <Bookmark className="w-4 h-4 text-[#1e3a5f] transition-all duration-200" />
                )}
                <span>{isFavorite ? "Favorited" : "Add to Favorites"}</span>
              </button>
            </div>

            {/* 3. Tabbed Content Card (Overview / Resources) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-7 shadow-xs">
              {/* Tabs */}
              <div className="flex items-center gap-8 border-b border-[#f1f5f9] -mt-1 pb-3 mb-5 sm:mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("Overview")}
                  className={`text-sm sm:text-[15px] font-bold pb-2 transition-all cursor-pointer relative ${activeTab === "Overview"
                    ? "text-[#0f172a] border-b-2 border-[#1e3a5f]"
                    : "text-[#64748b] hover:text-[#0f172a]"
                    }`}
                >
                  Overview
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("Resources")}
                  className={`text-sm sm:text-[15px] font-bold pb-2 transition-all cursor-pointer relative ${activeTab === "Resources"
                    ? "text-[#0f172a] border-b-2 border-[#1e3a5f]"
                    : "text-[#64748b] hover:text-[#0f172a]"
                    }`}
                >
                  Resources {resources.length > 0 ? `(${resources.length})` : ""}
                </button>
              </div>

              {activeTab === "Overview" ? (
                <div className="flex flex-col gap-6">
                  {/* About This Lesson */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-2">
                      About this lesson
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed whitespace-pre-line">
                      {aboutText}
                    </p>
                  </div>

                  {/* 2 Metric Boxes: Duration & Difficulty Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Duration Box */}
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] shrink-0 shadow-2xs">
                        <Clock className="w-5 h-5 text-[#64748b]" />
                      </div>
                      <div>
                        <span className="text-base sm:text-lg font-bold text-[#0f172a] block leading-tight">
                          {durationText}
                        </span>
                        <span className="text-xs text-[#64748b]">Duration</span>
                      </div>
                    </div>

                    {/* Difficulty Box */}
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] shrink-0 shadow-2xs">
                        <BarChart3 className="w-5 h-5 text-[#64748b]" />
                      </div>
                      <div>
                        <span className="text-base sm:text-lg font-bold text-[#0f172a] block leading-tight">
                          {difficultyText}
                        </span>
                        <span className="text-xs text-[#64748b]">Difficulty Level</span>
                      </div>
                    </div>
                  </div>

                  {/* What You'll Learn */}
                  {whatYouLearn.length > 0 && (
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-3">
                        What you&apos;ll learn
                      </h3>
                      <div className="space-y-2.5">
                        {whatYouLearn.map((outcome, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-info shrink-0 mt-0.5" />
                            <span className="leading-snug">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Resources Tab */
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
                    Lesson Handouts & Guides
                  </h3>
                  {resources.length > 0 ? (
                    <div className="space-y-3">
                      {resources.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1e3a5f] flex items-center justify-center shrink-0">
                              <FileText className="w-5 h-5 text-info" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs sm:text-sm font-semibold text-[#0f172a] truncate">
                                {item.name || item.title || "Lesson Resource"}
                              </h4>
                              <span className="text-[11px] text-[#64748b]">
                                {item.type || "Document"} {item.size ? `• ${item.size}` : ""}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              toast.success(`Downloading ${item.name || "resource"}`)
                            }
                            className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-[#1e3a5f] transition-colors cursor-pointer"
                            title="Download resource"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-gray-50/70 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a5f] flex items-center justify-center mb-2">
                        <FileText className="w-5 h-5 text-info" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#0f172a]">
                        No downloadable resources
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#64748b] mt-0.5 max-w-xs">
                        There are currently no additional guides or handouts attached to this lesson.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: NEXT LESSONS & SIMILAR LESSONS (~32% on XL) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6">
            {/* Next Lessons Card - No Thumbnail used */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#f1f5f9]">
                <h3 className="font-bold text-sm sm:text-base text-[#0f172a]">
                  Next Lessons
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#64748b]">
                    {watchedCount}/{totalCount}
                  </span>
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer hover:text-[#1e3a5f] transition-colors" />
                </div>
              </div>

              {/* Next Lesson Items List without thumbnails */}
              {nextLessons.length > 0 ? (
                <div className="divide-y divide-[#f8fafc] mt-2 space-y-1">
                  {nextLessons.map((lesson, index) => {
                    const isCurrent = Boolean(
                      lesson.is_current || String(lesson.video_id) === String(videoId)
                    );
                    const isCompleted = Boolean(
                      lesson.status === "watched" ||
                      lesson.status === "completed" ||
                      lesson.is_completed ||
                      lesson.progress_percent === 100
                    );

                    return (
                      <Link
                        key={lesson.video_id || lesson.id || index}
                        href={`/dashboard/video-lessons/${lesson.video_id || lesson.id}`}
                        className={`p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 sm:gap-3 transition-colors cursor-pointer group ${isCurrent
                          ? "bg-[#eef4fb] text-[#1e3a5f] border border-[#1e3a5f]/20 shadow-2xs"
                          : "hover:bg-gray-50 text-[#334155] border border-transparent"
                          }`}
                      >
                        {/* Status / Lesson Number Badge */}
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${isCompleted
                            ? "bg-emerald-100 text-emerald-600"
                            : isCurrent
                              ? "bg-[#1e3a5f] text-white"
                              : "bg-gray-100 group-hover:bg-gray-200 text-[#1e3a5f]"
                            }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                          ) : isCurrent ? (
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          ) : (
                            <span>{lesson.serial_number || index + 1}</span>
                          )}
                        </div>

                        {/* Title & Duration */}
                        <div className="min-w-0 flex-1">
                          <h4
                            className={`text-xs font-semibold truncate leading-tight ${isCurrent ? "text-[#1e3a5f]" : "group-hover:text-[#1e3a5f]"
                              }`}
                          >
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-[#64748b]">
                              {lesson.duration || lesson.duration_formatted || "00:00"}
                            </span>
                            {lesson.progress_percent > 0 && !isCompleted && (
                              <span className="text-[9px] font-semibold text-info">
                                • {lesson.progress_percent}% watched
                              </span>
                            )}
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1e3a5f] shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-[#64748b] mt-3">No further lessons in this module.</p>
              )}
            </div>

            {/* Similar Lessons Card - No Thumbnail used */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
              <div className="pb-3 border-b border-[#f1f5f9]">
                <h3 className="font-bold text-sm sm:text-base text-[#0f172a]">
                  Similar Lessons
                </h3>
              </div>

              {similarLessons.length > 0 ? (
                <div className="mt-2 space-y-1">
                  {similarLessons.map((lesson, idx) => (
                    <Link
                      key={lesson.video_id || lesson.id || idx}
                      href={`/dashboard/video-lessons/${lesson.video_id || lesson.id}`}
                      className="p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 sm:gap-3 hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-[#1e3a5f] group-hover:bg-[#1e3a5f] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-semibold text-[#0f172a] truncate leading-tight group-hover:text-[#1e3a5f]">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-info font-medium uppercase tracking-wider truncate max-w-30">
                            {lesson.module_name || "Nursing Lesson"}
                          </span>
                          <span className="text-[10px] text-[#64748b] shrink-0">
                            • {lesson.duration || lesson.duration_formatted || "00:00"}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1e3a5f] shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#64748b] mt-3">No similar lessons available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
