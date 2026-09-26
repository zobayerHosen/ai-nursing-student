"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Grid,
  ArrowUpDown,
  ChevronDown,
  Play,
  BookmarkCheck,
  Bookmark,
  Loader2,
  AlertCircle,
  Video,
} from "lucide-react";
import dummayImage from "@/public/med_dumm.png";
import {
  useGetVideoFavorites,
  useGetVideoCategories,
  useAddVideoToFavorite,
} from "@/hooks";

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

export default function FavoritesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recently_added");

  // Debounce search query input by 350ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Categories & Sort Options from API
  const { videoCategoriesData, isLoading: isCategoriesLoading } =
    useGetVideoCategories();

  const categories = useMemo(() => {
    return Array.isArray(videoCategoriesData?.categories)
      ? videoCategoriesData.categories
      : [];
  }, [videoCategoriesData]);

  const sortOptions = useMemo(() => {
    if (Array.isArray(videoCategoriesData?.sort_options) && videoCategoriesData.sort_options.length > 0) {
      return videoCategoriesData.sort_options;
    }
    return [
      { key: "recently_added", label: "Recently Added" },
      { key: "most_popular", label: "Most Popular" },
      { key: "alphabetical", label: "Alphabetical" },
    ];
  }, [videoCategoriesData]);

  // Query Parameters for Favorites API
  const queryParams = useMemo(() => {
    const params = {};
    if (selectedCategory && selectedCategory !== "all") {
      params.module = selectedCategory;
    }
    if (debouncedSearch && debouncedSearch.trim()) {
      params.search = debouncedSearch.trim();
    }
    if (selectedSort) {
      params.sort = selectedSort;
    }
    return params;
  }, [selectedCategory, debouncedSearch, selectedSort]);

  // Fetch Video Favorites with query parameters
  const { videoFavoritesData, isLoading, isError } =
    useGetVideoFavorites(queryParams);
  const { addVideoToFavorite, isPending, pendingId } = useAddVideoToFavorite();

  // Normalize favorites list
  const favoriteList = useMemo(() => {
    if (!videoFavoritesData) return [];
    if (Array.isArray(videoFavoritesData.results)) return videoFavoritesData.results;
    if (Array.isArray(videoFavoritesData)) return videoFavoritesData;
    if (Array.isArray(videoFavoritesData.data?.results))
      return videoFavoritesData.data.results;
    if (Array.isArray(videoFavoritesData.data)) return videoFavoritesData.data;
    return [];
  }, [videoFavoritesData]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedSort !== "recently_added";

  const handleClearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedCategory("all");
    setSelectedSort("recently_added");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your saved videos..."
            className="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm border border-[#e2e8f0] rounded-xl outline-none focus:border-info transition-colors shadow-2xs"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-[#e2e8f0] rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-[#0f172a] outline-none cursor-pointer shadow-2xs"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Grid className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none bg-white border border-[#e2e8f0] rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-[#0f172a] outline-none cursor-pointer shadow-2xs"
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-[#e5e9f0] overflow-hidden shadow-xs flex flex-col animate-pulse"
            >
              <div className="aspect-video w-full bg-slate-200" />
              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-20 h-3 bg-slate-200 rounded mb-2" />
                  <div className="w-full h-4 bg-slate-200 rounded" />
                  <div className="w-2/3 h-4 bg-slate-200 rounded mt-1.5" />
                  <div className="w-full h-3 bg-slate-200 rounded mt-2.5" />
                </div>
                <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-slate-100">
                  <div className="w-16 h-3 bg-slate-200 rounded" />
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
            Failed to Load Favorites
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
            Could not load your saved video lessons at this time. Please try again.
          </p>
        </div>
      ) : favoriteList.length === 0 ? (
        <div className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-10 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1e3a5f] mb-3 shadow-xs">
            <Video className="w-6 h-6 text-[#1e3a5f]" />
          </div>
          <h3 className="text-base font-bold text-[#0f172a] mb-1">
            No saved videos found
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
            {hasActiveFilters
              ? "No favorite lessons match your search or filter criteria."
              : "You haven't added any video lessons to your favorites yet."}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="mt-4 px-4 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-[#1e3a5f] transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        /* 5-Column Grid of Saved Videos */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {favoriteList.map((video) => {
            const targetVideoId = video.video_id || video.id;
            const isThisPending =
              isPending && (pendingId === targetVideoId || pendingId === video.id);

            return (
              <Link
                key={video.id || targetVideoId}
                href={`/dashboard/video-lessons/${targetVideoId}`}
                className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
              >
                {/* Thumbnail with Center Play Overlay */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <SafeThumbnail src={video.thumbnail} alt={video.title} />

                  {/* Play icon overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/95 text-[#1e3a5f] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Favorite Button on Top-Right Corner */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addVideoToFavorite(targetVideoId);
                    }}
                    disabled={isThisPending}
                    title="Remove from favorites"
                    aria-label="Remove from favorites"
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer z-20 group/fav shadow-md hover:scale-105 active:scale-95 ${
                      isThisPending ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {isThisPending ? (
                      <Loader2 className="w-4 h-4 text-[#1e3a5f] animate-spin" />
                    ) : (
                      <BookmarkCheck className="w-4 h-4 text-[#e14564] fill-current transition-all duration-200 group-hover/fav:scale-110" />
                    )}
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tag / Module / Lesson Number */}
                    <span className="text-[10px] font-bold text-info uppercase tracking-wider block mb-1 truncate">
                      {video.serial_number
                        ? `Lesson ${video.serial_number}`
                        : video.module_name ||
                          video.category_name ||
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

                  {/* Footer with Views */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
                    <span className="text-[11px] text-[#64748b] flex items-center gap-1 font-medium">
                      <Play className="w-3 h-3 fill-current text-[#94a3b8]" />
                      <span>
                        {video.views_formatted ||
                          `${video.views_count ?? 0} Views`}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}


