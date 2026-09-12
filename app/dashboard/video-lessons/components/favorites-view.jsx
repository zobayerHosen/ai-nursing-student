"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Grid, ArrowUpDown, ChevronDown, Play } from "lucide-react";
import { FAVORITE_VIDEOS } from "../data/video-lessons-data";

export default function FavoritesView() {
  const [searchSavedQuery, setSearchSavedQuery] = useState("");
  const [savedCategoryFilter, setSavedCategoryFilter] = useState("all");
  const [savedSortFilter, setSavedSortFilter] = useState("recently-added");

  const filteredSavedVideos = useMemo(() => {
    return FAVORITE_VIDEOS.filter((v) => {
      const matchesSearch =
        !searchSavedQuery.trim() ||
        v.title.toLowerCase().includes(searchSavedQuery.toLowerCase()) ||
        v.description.toLowerCase().includes(searchSavedQuery.toLowerCase());
      const matchesCat =
        savedCategoryFilter === "all" ||
        v.category.toLowerCase().includes(savedCategoryFilter.toLowerCase());
      return matchesSearch && matchesCat;
    });
  }, [searchSavedQuery, savedCategoryFilter]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchSavedQuery}
            onChange={(e) => setSearchSavedQuery(e.target.value)}
            placeholder="Search your saved videos..."
            className="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm border border-[#e2e8f0] rounded-xl outline-none focus:border-info transition-colors shadow-2xs"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={savedCategoryFilter}
              onChange={(e) => setSavedCategoryFilter(e.target.value)}
              className="appearance-none bg-white border border-[#e2e8f0] rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-[#0f172a] outline-none cursor-pointer shadow-2xs"
            >
              <option value="all">All Categories</option>
              <option value="cardio">Cardiovascular</option>
              <option value="pharma">Pharmacology</option>
            </select>
            <Grid className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={savedSortFilter}
              onChange={(e) => setSavedSortFilter(e.target.value)}
              className="appearance-none bg-white border border-[#e2e8f0] rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-[#0f172a] outline-none cursor-pointer shadow-2xs"
            >
              <option value="recently-added">Recently Added</option>
              <option value="most-popular">Most Popular</option>
              <option value="title">Alphabetical</option>
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 5-Column Grid of Saved Videos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredSavedVideos.map((video) => (
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
