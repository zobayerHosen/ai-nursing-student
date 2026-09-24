"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    ChevronDown,
    Play,
    CheckCircle2,
    Heart,
    BookmarkCheck,
    Video,
    AlertCircle,
} from "lucide-react";
import dummayImage from "@/public/med_dumm.png";
import { useGetSingleBrowseCategoriesVideos } from "@/hooks";

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

export default function CategoryDetailContent({
    params: propParams,
    topic_id,
    categoryId: propCategoryId,
    selectedCategory,
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from");

    const routeParams = useParams();
    const categoryId =
        propCategoryId ||
        topic_id ||
        selectedCategory?.id ||
        routeParams?.categoryId ||
        propParams?.categoryId;

    const { singleBrowseCategoriesVideosData, isLoading, isError } =
        useGetSingleBrowseCategoriesVideos(categoryId);

    const handleBack = () => {
        if (from === "categories" || from === "all-categories") {
            router.push("/dashboard/video-lessons?view=all-categories");
        } else if (from === "explore") {
            router.push("/dashboard/video-lessons");
        } else if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            router.push("/dashboard/video-lessons?view=all-categories");
        }
    };

    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortBy, setSortBy] = useState("popular");

    // Extract data WITHOUT using the `module` object data
    const payload = singleBrowseCategoriesVideosData?.results
        ? singleBrowseCategoriesVideosData
        : singleBrowseCategoriesVideosData?.data || singleBrowseCategoriesVideosData;

    const results = useMemo(() => {
        return Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload)
                ? payload
                : [];
    }, [payload]);

    const categoryTitle = useMemo(() => {
        return (
            payload?.module_name ||
            results[0]?.category_name ||
            results[0]?.module_name ||
            "Video Lessons"
        );
    }, [payload, results]);

    const progress = payload?.video_progress;
    const totalVideos =
        progress?.total_videos ??
        payload?.total_count ??
        payload?.count ??
        results.length;

    const inProgressCount =
        progress?.in_progress_count ??
        results.filter(
            (v) =>
                v.status === "in_progress" ||
                (v.progress_percent > 0 && !v.is_completed)
        ).length;

    const watchedCount =
        progress?.watched_count ??
        results.filter(
            (v) => v.status === "watched" || v.is_completed
        ).length;

    const notStartedCount =
        progress?.not_started_count ??
        results.filter(
            (v) =>
                v.status === "not_started" ||
                (!v.is_completed && (!v.progress_percent || v.progress_percent === 0))
        ).length;

    const filteredCategoryVideos = useMemo(() => {
        let list = [...results];

        if (categoryFilter === "in-progress") {
            list = list.filter(
                (v) =>
                    v.status === "in_progress" ||
                    v.status === "in-progress" ||
                    (v.progress_percent > 0 && !v.is_completed) ||
                    (v.user_progress?.progress_percent > 0 &&
                        !v.user_progress?.is_completed)
            );
        } else if (categoryFilter === "watched") {
            list = list.filter(
                (v) =>
                    v.status === "watched" ||
                    v.status === "completed" ||
                    v.is_completed ||
                    v.user_progress?.is_completed
            );
        } else if (categoryFilter === "not-started") {
            list = list.filter(
                (v) =>
                    v.status === "not_started" ||
                    v.status === "not-started" ||
                    (!v.is_completed &&
                        !v.user_progress?.is_completed &&
                        (!v.progress_percent || v.progress_percent === 0) &&
                        (!v.user_progress?.progress_percent ||
                            v.user_progress?.progress_percent === 0))
            );
        }

        if (sortBy === "popular") {
            list.sort((a, b) => (b.views_count ?? 0) - (a.views_count ?? 0));
        } else if (sortBy === "newest") {
            list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
        } else if (sortBy === "lesson") {
            list.sort((a, b) => (a.serial_number ?? 0) - (b.serial_number ?? 0));
        }

        return list;
    }, [results, categoryFilter, sortBy]);

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col">
            {/* Top Header Bar */}
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
                        <h1 className="text-xl sm:text-2xl font-bold text-[#044e79] tracking-tight">
                            {categoryTitle}
                        </h1>
                        <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
                            {totalVideos} {totalVideos === 1 ? "Video" : "Videos"} • High-yield video lessons
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-5 sm:py-7 flex flex-col gap-6">
                {/* Filter Pills and Sort */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                    {/* Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
                        <button
                            type="button"
                            onClick={() => setCategoryFilter("all")}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                                categoryFilter === "all"
                                    ? "bg-[#0f172a] text-white"
                                    : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
                            }`}
                        >
                            All {totalVideos}
                        </button>

                        <button
                            type="button"
                            onClick={() => setCategoryFilter("in-progress")}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                                categoryFilter === "in-progress"
                                    ? "bg-[#0f172a] text-white"
                                    : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
                            }`}
                        >
                            In progress {inProgressCount}
                        </button>

                        <button
                            type="button"
                            onClick={() => setCategoryFilter("watched")}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                                categoryFilter === "watched"
                                    ? "bg-[#0f172a] text-white"
                                    : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
                            }`}
                        >
                            Watched {watchedCount}
                        </button>

                        <button
                            type="button"
                            onClick={() => setCategoryFilter("not-started")}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                                categoryFilter === "not-started"
                                    ? "bg-[#0f172a] text-white"
                                    : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
                            }`}
                        >
                            Not started {notStartedCount}
                        </button>
                    </div>

                    {/* Sort Dropdown */}
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

                {/* Video Grid, Skeleton, Error or Empty state */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-[#e5e9f0] overflow-hidden shadow-2xs flex flex-col animate-pulse"
                            >
                                <div className="aspect-video w-full bg-slate-200" />
                                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="w-16 h-3 bg-slate-200 rounded mb-2" />
                                        <div className="w-full h-4 bg-slate-200 rounded mb-1.5" />
                                        <div className="w-3/4 h-4 bg-slate-200 rounded mb-2.5" />
                                        <div className="w-full h-3 bg-slate-100 rounded mb-1" />
                                        <div className="w-2/3 h-3 bg-slate-100 rounded" />
                                    </div>
                                    <div className="mt-4 pt-2.5 border-t border-[#f1f5f9] flex justify-between">
                                        <div className="w-16 h-3 bg-slate-200 rounded" />
                                        <div className="w-4 h-4 bg-slate-200 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="bg-red-50/50 rounded-2xl border border-dashed border-red-200 p-8 sm:p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-red-100/70 border border-red-200 flex items-center justify-center text-red-500 mb-3 shadow-xs">
                            <AlertCircle className="w-6 h-6 text-red-500" />
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
                            <Video className="w-6 h-6 text-[#2C5F8D]" />
                        </div>
                        <h3 className="text-base font-bold text-[#0f172a] mb-1">
                            No videos found
                        </h3>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredCategoryVideos?.map((video) => (
                            <Link
                                key={video.id || video.video_id}
                                href={`/dashboard/video-lessons/${video.video_id || video.id}`}
                                className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
                            >
                                {/* Thumbnail with Center Play Overlay */}
                                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                                    <SafeThumbnail
                                        src={video.thumbnail}
                                        alt={video.title}
                                    />

                                    {/* Play icon overlay */}
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-white/95 text-[#1e3a5f] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                                        </div>
                                    </div>

                                    {/* Favorite Button on Top-Right Corner */}
                                    <button
                                        type="button"
                                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer z-10 group/fav shadow-md hover:scale-105 active:scale-95"
                                    >
                                        <Heart
                                            className="w-4 h-4 transition-all duration-200 group-hover/fav:scale-110"
                                        />
                                    </button>

                                    {/* Completed Badge */}
                                    {(video.is_completed || video.user_progress?.is_completed) && (
                                        <div className="absolute top-2.5 left-2.5 bg-emerald-500/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                            <CheckCircle2 className="w-3 h-3" />
                                            <span>Completed</span>
                                        </div>
                                    )}
                                </div>

                                {/* Body Content */}
                                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        {/* Tag / Category / Lesson Number */}
                                        <span className="text-[10px] font-bold text-info uppercase tracking-wider block mb-1 truncate">
                                            {video.serial_number
                                                ? `Lesson ${video.serial_number}`
                                                : video.category_name ||
                                                video.module_name ||
                                                "Nursing Lesson"}
                                        </span>

                                        {/* Title */}
                                        <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] line-clamp-2 leading-snug group-hover:text-[#1e3a5f] transition-colors">
                                            {video.title}
                                        </h4>

                                        {/* Description */}
                                        {video.description && (
                                            <p className="text-[11px] sm:text-xs text-[#64748b] mt-1.5 line-clamp-2 leading-relaxed">
                                                {video.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Footer with Views & Favorite Bookmark */}
                                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
                                        <span className="text-[11px] text-[#64748b] flex items-center gap-1 font-medium">
                                            <Play className="w-3 h-3 fill-current text-[#94a3b8]" />
                                            <span>
                                                {video.views_formatted ||
                                                    `${video.views_count ?? 0} Views`}
                                            </span>
                                        </span>

                                        {video.is_favorite && (
                                            <BookmarkCheck className="w-4 h-4 text-[#e14564] fill-current" />
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export { CategoryDetailContent };
