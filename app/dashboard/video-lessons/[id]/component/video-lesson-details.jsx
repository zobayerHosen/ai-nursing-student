"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, BookmarkCheck, Bookmark } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useAddVideoToFavorite, useGetVideoDetails, usePostVideoProgress } from "@/hooks";
import VideoLessonSkeleton from "./video-lesson-skeleton";
import VideoLessonError from "./video-lesson-error";
import VideoLessonPlayer from "./video-lesson-player";
import VideoLessonTabbedContent from "./video-lesson-tabbed-content";
import NextAndSimilarLessons from "./next-similar-lessons";

export default function VideoLessonDetails({ videoId }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Queries & Mutations
  const { videoData, isLoading, isError } = useGetVideoDetails(videoId);
  const { addVideoToFavorite, isPending } = useAddVideoToFavorite();
  const { videoProgress } = usePostVideoProgress();

  // Extract raw details object safely
  const details = useMemo(() => videoData?.data || videoData || null, [videoData]);

  // Local favorite state with sync from API details
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (details?.is_favorite !== undefined) {
      setIsFavorite(Boolean(details.is_favorite));
    }
  }, [details?.is_favorite]);

  // Back button handler
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard/video-lessons");
    }
  };

  // Toggle favorite with optimistic feedback
  const handleFavoriteToggle = async () => {
    if (isPending) return;
    const previous = isFavorite;
    setIsFavorite(!previous);
    try {
      await addVideoToFavorite(videoId);
    } catch {
      setIsFavorite(previous);
    }
  };

  // Video completion callback: sends progress and invalidates caches
  const handleVideoEnded = async ({ duration, currentTime } = {}) => {
    try {
      await videoProgress({
        id: videoId,
        total_duration: duration || 0,
        current_duration: currentTime || duration || 0,
        is_completed: true,
      });
      queryClient.invalidateQueries({ queryKey: ["video-module"] });
      queryClient.invalidateQueries({ queryKey: ["video-modules"] });
      queryClient.invalidateQueries({ queryKey: ["video-details", videoId] });
      toast.success("Lesson completed!");
    } catch {
      // Handled silently
    }
  };

  // 1. Loading Skeleton
  if (isLoading && !details) {
    return <VideoLessonSkeleton onBack={handleBack} />;
  }

  // 2. Error State
  if (isError) {
    return <VideoLessonError onBack={handleBack} />;
  }

  // Derived lesson metadata
  const title = details?.title || "Video Lesson";
  const series =
    details?.module_name || details?.module_title || details?.category || "Nursing Video Lessons";
  const lessonNumber = details?.serial_number
    ? `Lesson ${details.serial_number}${details.module_total_videos ? ` of ${details.module_total_videos}` : ""}`
    : "Nursing Lesson";

  const nextLessons = Array.isArray(details?.next_lessons) ? details.next_lessons : [];
  const similarLessons = Array.isArray(details?.similar_lessons) ? details.similar_lessons : [];
  const watchedCount = details?.module_watched_videos ?? 0;
  const totalCount = details?.module_total_videos ?? nextLessons.length;

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden">
      {/* Top Header / Breadcrumb */}
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

      {/* Main Two-Column Container */}
      <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Left Column: Video Player, Action Bar, & Tabbed Content */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-6">
            {/* Video Player */}
            <VideoLessonPlayer
              videoUrl={details?.video_url}
              title={title}
              initialProgress={details?.progress?.current_duration}
              initialDuration={
                details?.duration_formatted ||
                details?.duration ||
                details?.duration_seconds
              }
              onEnded={handleVideoEnded}
            />

            {/* Action Bar: Add to Favorites */}
            <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-[#1e3a5f]">
              <button
                type="button"
                disabled={isPending}
                onClick={handleFavoriteToggle}
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

            {/* Tabbed Content Card (Overview / Resources) */}
            <VideoLessonTabbedContent details={details} />
          </div>

          {/* Right Column: Next Lessons & Similar Lessons */}
          <NextAndSimilarLessons
            nextLessons={nextLessons}
            similarLessons={similarLessons}
            watchedCount={watchedCount}
            totalCount={totalCount}
            currentVideoId={videoId}
          />
        </div>
      </div>
    </div>
  );
}
