"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  CheckCircle2,
  Video,
  Flame,
  Bookmark,
  BookmarkCheck,
  X,
  Sparkles,

} from "lucide-react";
import dummayImage from "@/public/med_dumm.png";
import { useGetBrowseVideoCategories } from "@/hooks";

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
      className="w-6 h-full object-contain"
      onError={() => {
        setHasError(true);
        setSrc(dummayImage);
      }}
    />
  );
}

export default function CategoriesView({
  savedVideos,
  toggleBookmark,
}) {
  const { browseVideoCategoriesData, isLoading, isError } = useGetBrowseVideoCategories();
  const stats = browseVideoCategoriesData?.stats ?? {};
  const categories = browseVideoCategoriesData?.categories ?? [];
  const popularThisWeek = browseVideoCategoriesData?.popular_this_week ?? [];
  console.log("Categories", categories)

  const [searchCategoryQuery, setSearchCategoryQuery] = useState("");
  const [isLumiOpen, setIsLumiOpen] = useState(true);


  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top 2 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stat 1: 200+ Videos */}
        <div className="bg-white rounded-2xl border border-[#e5e9f0] p-5 sm:p-6 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight">{stats?.total_videos ?? 0}+ Videos</h3>
            <p className="text-xs sm:text-sm text-[#64748b]">High-yield video lessons</p>
          </div>
        </div>

        {/* Stat 2: 20+ Categories */}
        <div className="bg-white rounded-2xl border border-[#e5e9f0] p-5 sm:p-6 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-success flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight">{stats?.total_categories ?? 0}+ Categories</h3>
            <p className="text-xs sm:text-sm text-[#64748b]">All major nursing topics</p>
          </div>
        </div>
      </div>

      {/* Two-column layout: Left (70-75%) Categories Grid, Right (25-30%) Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Categories */}
        <div className="lg:col-span-8 xl:col-span-8.5 bg-white rounded-2xl border border-[#e5e9f0] p-4 sm:p-6 shadow-xs">
          {/* Header row with search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#f1f5f9]">
            <h2 className="text-lg sm:text-xl font-bold text-[#0f172a]">
              Browse All Lessons
            </h2>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchCategoryQuery}
                onChange={(e) => setSearchCategoryQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-gray-200 rounded-xl outline-none focus:border-info transition-colors"
              />
            </div>
          </div>

          {/* 2-Column Grid of 16 categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-5">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#eef2f6] p-4 flex items-start gap-3.5 transition-all shadow-2xs animate-pulse"
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-200 shrink-0" />
                  <div className="min-w-0 flex-1 py-0.5">
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                    <div className="h-3.5 w-1/2 bg-gray-100 rounded mb-2.5" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                </div>
              ))
            ) : categories?.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center h-48">
                <Video className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-500">No categories found</p>
              </div>
            ) : (
              categories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/dashboard/video-lessons/category/${category.id}?from=categories`}
                  className="bg-white rounded-2xl border border-[#eef2f6] hover:border-[#cbd5e1] p-4 flex items-start gap-3.5 transition-all shadow-2xs hover:shadow-md cursor-pointer group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl border border-gray-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden`}
                  >
                    <CategoryLogo logo={category?.logo} title={category?.title} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-[#0f172a] group-hover:text-[#1e3a5f] transition-colors truncate">
                      {category.title}
                    </h4>
                    <p className="text-xs text-[#64748b] mt-0.5">
                      {category?.total_lessons ?? 0} Lessons • {category?.completed_lessons ?? 0} Completed
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-info mt-2 group-hover:translate-x-0.5 transition-transform">
                      <span>View Lessons</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Popular This Week & Ask Lumi */}
        <div className="lg:col-span-4 xl:col-span-3.5 flex flex-col gap-5">
          {/* Popular This Week Card */}
          <div className="bg-white rounded-2xl border border-[#e5e9f0] p-5 shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-[#f1f5f9]">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h3 className="font-bold text-sm sm:text-base text-[#0f172a]">
                Popular This Week
              </h3>
            </div>

            <div className="divide-y divide-[#f1f5f9]">
              {popularThisWeek?.map((item) => (
                <div
                  key={item.id}
                  className="py-3.5 flex items-center justify-between gap-3 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                      <Video className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs sm:text-sm font-semibold text-[#0f172a] truncate group-hover:text-[#1e3a5f] transition-colors">
                        {item?.title ?? "N/F"}
                      </h5>
                      <span className="text-[11px] text-[#64748b]">{item?.category ?? "N/F"}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => toggleBookmark(item.id, e)}
                    className="text-gray-400 hover:text-[#1e3a5f] p-1 transition-colors cursor-pointer"
                  >
                    {savedVideos[item.id] ? (
                      <BookmarkCheck className="w-4 h-4 text-[#e14564] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Need a Simpler Explanation? (Ask Lumi) Card */}
          {isLumiOpen && (
            <div className="bg-white rounded-2xl border border-[#e5e9f0] p-5 shadow-xs relative">
              <button
                onClick={() => setIsLumiOpen(false)}
                className="absolute top-3.5 right-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-50 relative shrink-0 border border-blue-100">
                  <Image
                    src="/images/ai-tutor-avatar.png"
                    alt="Lumi AI Tutor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#0f172a]">
                    Need a Simpler Explanation?
                  </h4>
                  <p className="text-[11px] text-[#64748b]">
                    Ask CARA about any concept or video
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/my-tutor"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#1e3a5f] hover:bg-[#142d4a] text-white text-xs font-semibold transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Ask CARA</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
