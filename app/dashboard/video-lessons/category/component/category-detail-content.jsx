"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ChevronDown, Video, AlertCircle } from "lucide-react";
import {
  singleSubCategoryVideosData,
  useAddVideoToFavorite,
  useGetSingleBrowseCategoriesVideos,
} from "@/hooks";
import VideoCardSkeleton from "./video-card-skeleton";
import CategoryVideoCard from "./category-video-card";

export { VideoCardSkeleton } from "./video-card-skeleton";
export { default as CategoryVideoCard } from "./category-video-card";

export default function CategoryDetailContent({
  params: propParams,
  topic_id,
  categoryId: propCategoryId,
  selectedCategory,
  hasSubcategory: propHasSubcategory,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routeParams = useParams();

  const from = searchParams.get("from");
  const type = searchParams.get("type");
  const hasSubcategoryParam = searchParams.get("hasSubcategory") || searchParams.get("has_subcategory");

  // Determine whether this page represents a subcategory
  const isSubcategory = Boolean(
    propHasSubcategory ||
      type === "subcategory" ||
      hasSubcategoryParam === "true" ||
      hasSubcategoryParam === "1"
  );

  const categoryId =
    propCategoryId ||
    topic_id ||
    selectedCategory?.id ||
    routeParams?.categoryId ||
    propParams?.categoryId;

  // Single subcategory videos API (active only when isSubcategory is true)
  const {
    data: subCategoryData,
    isLoading: subLoading,
    isError: subError,
  } = singleSubCategoryVideosData(isSubcategory ? categoryId : null);

  // Browse category videos API with infinite pagination (active only when isSubcategory is false)
  const {
    data: infiniteData,
    singleBrowseCategoriesVideosData,
    isLoading: browseLoading,
    isError: browseError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSingleBrowseCategoriesVideos(isSubcategory ? null : categoryId);

  const isLoading = isSubcategory ? subLoading : browseLoading;
  const isError = isSubcategory ? subError : browseError;

  const { addVideoToFavorite, isPending, pendingId } = useAddVideoToFavorite();
  const loadMoreRef = useRef(null);

  // Infinite scroll observer for paginated browse categories
  useEffect(() => {
    if (isSubcategory || !hasNextPage || isFetchingNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      },
      { rootMargin: "250px" }
    );

    const el = loadMoreRef.current;
    observer.observe(el);
    return () => observer.disconnect();
  }, [isSubcategory, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleBack = () => {
    if (from === "categories" || from === "all-categories") {
      router.push("/dashboard/video-lessons?view=all-categories");
    } else if (from === "explore") {
      router.push("/dashboard/video-lessons");
    } else if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard/video-lessons");
    }
  };

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Active payload resolution
  const categoryPayload =
    infiniteData?.pages?.[0]?.data ||
    infiniteData?.pages?.[0] ||
    singleBrowseCategoriesVideosData;
  const payload = isSubcategory
    ? subCategoryData?.data || subCategoryData
    : categoryPayload?.data || categoryPayload;

  // Video list resolution & deduplication
  const results = useMemo(() => {
    if (isSubcategory) return payload?.results || [];

    const pages = infiniteData?.pages;
    if (!pages?.length) return payload?.results || [];

    const seen = new Set();
    return pages
      .flatMap((page) => (page?.data || page)?.results || [])
      .filter((item) => {
        const id = item?.id || item?.video_id;
        if (!id || seen.has(id)) return !id;
        seen.add(id);
        return true;
      });
  }, [isSubcategory, infiniteData, payload]);

  // Headers and progress counts
  const categoryTitle = isSubcategory
    ? payload?.subcategory_name || "Subcategory Lessons"
    : payload?.module?.name || payload?.module_name || results[0]?.category_name || "Video Lessons";

  const categorySubtitle = isSubcategory && (payload?.category_name || payload?.module_name)
    ? payload.category_name || payload.module_name
    : "High-yield video lessons";

  const progress = payload?.video_progress;
  const totalVideos = progress?.total_videos ?? payload?.total_count ?? results.length;
  const inProgressCount = progress?.in_progress_count ?? 0;
  const watchedCount = progress?.watched_count ?? 0;
  const notStartedCount = progress?.not_started_count ?? Math.max(0, totalVideos - inProgressCount - watchedCount);

  // Filter and sort videos
  const filteredCategoryVideos = useMemo(() => {
    const list = results.filter((v) => {
      const isCompleted = v.is_completed || v.user_progress?.is_completed || v.status === "watched" || v.status === "completed";
      const inProgress = (v.progress_percent > 0 || v.user_progress?.progress_percent > 0 || v.status === "in_progress" || v.status === "in-progress") && !isCompleted;

      if (categoryFilter === "in-progress") return inProgress;
      if (categoryFilter === "watched") return isCompleted;
      if (categoryFilter === "not-started") return !inProgress && !isCompleted;
      return true;
    });

    if (sortBy === "popular") list.sort((a, b) => (b.views_count ?? 0) - (a.views_count ?? 0));
    if (sortBy === "newest") list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    if (sortBy === "lesson") list.sort((a, b) => (a.serial_number ?? 0) - (b.serial_number ?? 0));

    return list;
  }, [results, categoryFilter, sortBy]);

  const filterTabs = [
    { id: "all", label: `All ${totalVideos}` },
    { id: "in-progress", label: `In progress ${inProgressCount}` },
    { id: "watched", label: `Watched ${watchedCount}` },
    { id: "not-started", label: `Not started ${notStartedCount}` },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Header */}
      <div className="w-full bg-white border-b border-[#e2e8f0] px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <button
            type="button"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            title="Back"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5 text-[#1e3a5f]" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-[#044e79] tracking-tight truncate">
              {categoryTitle}
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
              {totalVideos} {totalVideos === 1 ? "Video" : "Videos"} • {categorySubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-7 flex flex-col gap-6">
        {/* Filter Tabs & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  categoryFilter === tab.id
                    ? "bg-[#0f172a] text-white"
                    : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative self-end sm:self-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-[#e2e8f0] rounded-xl pl-4 pr-8 py-1.5 text-xs font-semibold text-[#0f172a] outline-none cursor-pointer shadow-2xs hover:border-gray-300 transition-colors"
            >
              <option value="popular">Most popular</option>
              <option value="newest">Newest</option>
              <option value="lesson">Lesson order</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Video Grid States */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <VideoCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
        ) : isError ? (
          <div className="bg-red-50/50 rounded-2xl border border-dashed border-red-200 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-100/70 border border-red-200 flex items-center justify-center text-red-500 mb-3 shadow-xs">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
              Failed to load category videos
            </h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm mb-4">
              Could not load videos for this category. Please try again.
            </p>
            <Link
              href="/dashboard/video-lessons"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e3a5f] text-white text-xs font-semibold hover:bg-[#142d4a] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Categories</span>
            </Link>
          </div>
        ) : filteredCategoryVideos.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#e5e9f0] p-12 flex flex-col items-center justify-center text-center shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2C5F8D] mb-3 shadow-xs">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#0f172a] mb-1">No videos found</h3>
            <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
              {categoryFilter !== "all"
                ? `No videos match the "${categoryFilter.replace("-", " ")}" filter.`
                : "No lessons available in this category yet."}
            </p>
            {categoryFilter !== "all" && (
              <button
                type="button"
                onClick={() => setCategoryFilter("all")}
                className="mt-4 px-4 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-[#1e3a5f] transition-colors cursor-pointer"
              >
                Clear filter
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredCategoryVideos.map((video) => {
                const videoId = video.id || video.video_id;
                return (
                  <CategoryVideoCard
                    key={videoId}
                    video={video}
                    onToggleFavorite={addVideoToFavorite}
                    isFavoritePending={isPending && pendingId === videoId}
                  />
                );
              })}

              {!isSubcategory &&
                isFetchingNextPage &&
                Array.from({ length: 5 }).map((_, index) => (
                  <VideoCardSkeleton key={`pagination-skeleton-${index}`} />
                ))}
            </div>

            {!isSubcategory && <div ref={loadMoreRef} className="h-6 w-full" />}
          </>
        )}
      </div>
    </div>
  );
}

export { CategoryDetailContent };
