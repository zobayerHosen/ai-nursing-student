"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Download,
  Clock,
  BarChart3,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  FileText,
  FileCheck,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { useGetVideoDetails, usePostVideoProgress } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LESSON_DETAIL_DATA } from "../data/video-lessons-data";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function VideoLessonDetails({ videoId }) {
  const queryClient = useQueryClient();
  const { videoData, isLoading } = useGetVideoDetails(videoId);
  const { videoProgress } = usePostVideoProgress();

  const [activeTab, setActiveTab] = useState("Overview"); // "Overview" | "Resources"
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.25x");
  const [isFavorite, setIsFavorite] = useState(false);
  const [progressPercent, setProgressPercent] = useState(36);
  const [currentTimeStr, setCurrentTimeStr] = useState("04:32");
  const [totalDurationStr, setTotalDurationStr] = useState("12:45");

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  const videoSrc = videoData?.video_url
    ? `${videoData.video_url.startsWith("http") ? videoData.video_url : `${BASEURL}${videoData.video_url}`}`
    : null;

  // Title & Metadata
  const title =
    videoData?.title || LESSON_DETAIL_DATA.title;
  const series =
    videoData?.module_title || videoData?.category || LESSON_DETAIL_DATA.series;
  const lessonNumber =
    videoData?.serial_number ? `Lesson ${videoData.serial_number} of 8` : LESSON_DETAIL_DATA.lessonNumber;
  const aboutText =
    videoData?.overview || videoData?.description || LESSON_DETAIL_DATA.aboutText;

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
      toast.success("Lesson completed!");
    } catch {
      // ignore
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setProgressPercent((cur / dur) * 100);

      const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
      };

      setCurrentTimeStr(formatTime(cur));
      setTotalDurationStr(formatTime(dur));
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* TOP HEADER / BREADCRUMB                                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="w-full bg-white border-b border-[#e2e8f0] px-3.5 sm:px-6 lg:px-8 xl:px-10 py-3.5 sm:py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/video-lessons"
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors"
            title="Back to all videos"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

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
            {/* 1. Video Player Container */}
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
                />
              ) : (
                <Image
                  src="/images/nursing_video_thumb.jpg"
                  alt={title}
                  fill
                  className="object-cover"
                />
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
                      videoRef.current.currentTime = (newPercent / 100) * videoRef.current.duration;
                    }
                  }}
                  className="w-full h-1.5 hover:h-2 bg-white/30 hover:bg-white/40 rounded-full cursor-pointer relative transition-all"
                >
                  <div
                    className="h-full bg-[#e14564] rounded-full relative"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
                  </div>
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between text-white text-xs sm:text-sm">
                  {/* Left Controls */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
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
                      onClick={() => handleSeek(-10)}
                      className="hover:text-blue-300 transition-colors cursor-pointer"
                      title="Back 10s"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleSeek(10)}
                      className="hover:text-blue-300 transition-colors cursor-pointer"
                      title="Forward 10s"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    <button
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
                      onClick={handleSpeedChange}
                      className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[11px] font-bold cursor-pointer transition-colors"
                      title="Playback Speed"
                    >
                      {playbackSpeed}
                    </button>

                    <button
                      className="px-1.5 py-0.5 rounded border border-white/40 text-[10px] font-bold hover:bg-white/20 transition-colors cursor-pointer"
                      title="Subtitles"
                    >
                      CC
                    </button>

                    <button
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

            {/* 2. Action Bar: Add to Favorites & Download */}
            <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-[#1e3a5f]">
              <button
                onClick={() => {
                  setIsFavorite(!isFavorite);
                  toast.success(
                    isFavorite ? "Removed from favorites" : "Added to favorites!"
                  );
                }}
                className="inline-flex items-center gap-2 hover:text-info transition-colors cursor-pointer"
              >
                {isFavorite ? (
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                ) : (
                  <Heart className="w-4 h-4" />
                )}
                <span>Add to Favorites</span>
              </button>

              <button
                onClick={() => toast.success("Download started for offline viewing")}
                className="inline-flex items-center gap-2 hover:text-info transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            {/* 3. Tabbed Content Card (Overview / Resources) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-7 shadow-xs">
              {/* Tabs */}
              <div className="flex items-center gap-8 border-b border-[#f1f5f9] -mt-1 pb-3 mb-5 sm:mb-6">
                <button
                  onClick={() => setActiveTab("Overview")}
                  className={`text-sm sm:text-[15px] font-bold pb-2 transition-all cursor-pointer relative ${
                    activeTab === "Overview"
                      ? "text-[#0f172a] border-b-2 border-[#1e3a5f]"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  Overview
                </button>

                <button
                  onClick={() => setActiveTab("Resources")}
                  className={`text-sm sm:text-[15px] font-bold pb-2 transition-all cursor-pointer relative ${
                    activeTab === "Resources"
                      ? "text-[#0f172a] border-b-2 border-[#1e3a5f]"
                      : "text-[#64748b] hover:text-[#0f172a]"
                  }`}
                >
                  Resources
                </button>
              </div>

              {activeTab === "Overview" ? (
                <div className="flex flex-col gap-6">
                  {/* About This Lesson */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-2">
                      About this lesson
                    </h3>
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
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
                          {LESSON_DETAIL_DATA.duration}
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
                          {LESSON_DETAIL_DATA.difficulty}
                        </span>
                        <span className="text-xs text-[#64748b]">Difficulty Level</span>
                      </div>
                    </div>
                  </div>

                  {/* What You'll Learn */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-3">
                      What you&apos;ll learn
                    </h3>
                    <div className="space-y-2.5">
                      {LESSON_DETAIL_DATA.whatYouLearn.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]">
                          <CheckCircle2 className="w-4 h-4 text-info shrink-0 mt-0.5" />
                          <span className="leading-snug">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Resources Tab */
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
                    Lesson Handouts & Guides
                  </h3>
                  <div className="space-y-3">
                    {LESSON_DETAIL_DATA.resources.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1e3a5f] flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-info" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-[#0f172a] truncate">
                              {item.name}
                            </h4>
                            <span className="text-[11px] text-[#64748b]">
                              {item.type} • {item.size}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => toast.success(`Downloading ${item.name}`)}
                          className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-[#1e3a5f] transition-colors cursor-pointer"
                          title="Download resource"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: NEXT LESSONS & SIMILAR LESSONS (~32% on XL) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6">
            {/* Next Lessons Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#f1f5f9]">
                <h3 className="font-bold text-sm sm:text-base text-[#0f172a]">
                  Next Lessons
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#64748b]">1/8</span>
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer hover:text-[#1e3a5f] transition-colors" />
                </div>
              </div>

              {/* Lesson Items List */}
              <div className="divide-y divide-[#f8fafc] mt-2 space-y-1">
                {LESSON_DETAIL_DATA.nextLessons.map((lesson, index) => {
                  const isFirst = index === 0;
                  const isSecond = index === 1;

                  return (
                    <div
                      key={lesson.id}
                      className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2.5 sm:gap-3 transition-colors cursor-pointer ${
                        isSecond
                          ? "bg-[#eef4fb] text-[#1e3a5f]"
                          : "hover:bg-gray-50 text-[#334155]"
                      }`}
                    >
                      {/* Left Icon (Completed check, active play, or chevron) */}
                      {isFirst ? (
                        <div className="w-5 h-5 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white fill-current" />
                        </div>
                      ) : isSecond ? (
                        <div className="w-5 h-5 text-[#1e3a5f] flex items-center justify-center shrink-0">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                      )}

                      {/* Small Thumbnail */}
                      <div className="w-14 h-9 rounded-lg overflow-hidden bg-slate-900 relative shrink-0 border border-gray-100">
                        <Image
                          src="/images/nursing_video_thumb.jpg"
                          alt={lesson.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Title & Duration */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-semibold truncate leading-tight">
                          {lesson.title}
                        </h4>
                        <span className="text-[10px] text-[#64748b] block mt-0.5">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Similar Lessons Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
              <div className="pb-3 border-b border-[#f1f5f9]">
                <h3 className="font-bold text-sm sm:text-base text-[#0f172a]">
                  Similar Lessons
                </h3>
              </div>

              <div className="mt-2 space-y-1">
                {LESSON_DETAIL_DATA.similarLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-2 sm:p-2.5 rounded-xl flex items-center gap-2.5 sm:gap-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />

                    <div className="w-14 h-9 rounded-lg overflow-hidden bg-slate-900 relative shrink-0 border border-gray-100">
                      <Image
                        src="/images/nursing_video_thumb.jpg"
                        alt={lesson.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-[#0f172a] truncate leading-tight">
                        {lesson.title}
                      </h4>
                      <span className="text-[10px] text-[#64748b] block mt-0.5">
                        {lesson.duration}
                      </span>
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
