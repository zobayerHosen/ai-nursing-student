"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Play } from "lucide-react";
import { CATEGORY_DETAIL_VIDEOS } from "../data/video-lessons-data";

export default function CategoryDetailView({ selectedCategory }) {
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredCategoryVideos = useMemo(() => {
    if (categoryFilter === "all") return CATEGORY_DETAIL_VIDEOS;
    return CATEGORY_DETAIL_VIDEOS.filter((v) => v.status === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Filter Pills and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        {/* Pills */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
          <button
            onClick={() => setCategoryFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === "all"
                ? "bg-[#0f172a] text-white"
                : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
            }`}
          >
            All 24
          </button>

          <button
            onClick={() => setCategoryFilter("in-progress")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === "in-progress"
                ? "bg-[#0f172a] text-white"
                : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
            }`}
          >
            In progress 2
          </button>

          <button
            onClick={() => setCategoryFilter("watched")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === "watched"
                ? "bg-[#0f172a] text-white"
                : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
            }`}
          >
            Watched 3
          </button>

          <button
            onClick={() => setCategoryFilter("not-started")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              categoryFilter === "not-started"
                ? "bg-[#0f172a] text-white"
                : "bg-white border border-gray-200 text-[#64748b] hover:text-[#0f172a]"
            }`}
          >
            Not started 7
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="relative self-end sm:self-auto">
          <select className="appearance-none bg-white border border-[#e2e8f0] rounded-xl pl-4 pr-8 py-1.5 text-xs font-semibold text-[#0f172a] outline-none cursor-pointer shadow-2xs">
            <option>Most popular</option>
            <option>Newest</option>
            <option>Highest rated</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* 5-Column Grid of Category Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCategoryVideos.map((video) => (
          <Link
            key={video.id}
            href={`/dashboard/video-lessons/${video.id}`}
            className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
          >
            {/* Thumbnail with Center Play Overlay */}
            <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/95 text-[#1e3a5f] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                {/* Priority Tag */}
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block mb-1">
                  {video.priorityTag}
                </span>

                {/* Title */}
                <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] line-clamp-2 leading-snug group-hover:text-[#1e3a5f] transition-colors">
                  {video.title}
                </h4>

                {/* Description */}
                <p className="text-[11px] sm:text-xs text-[#64748b] mt-1.5 line-clamp-3 leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
