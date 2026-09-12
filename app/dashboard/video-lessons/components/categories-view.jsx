"use client";

import React, { useState, useMemo } from "react";
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
  Stethoscope,
  UserCheck,
  Pill,
  Calculator,
  Droplets,
  Baby,
  Bed,
  Activity,
  Smile,
  Brain,
  Siren,
  ShieldCheck,
  TestTube,
  User,
  Users,
  Apple,
} from "lucide-react";
import {
  VIDEO_CATEGORIES,
  POPULAR_THIS_WEEK,
} from "../data/video-lessons-data";

function getCategoryIcon(iconName, className = "w-5 h-5") {
  switch (iconName) {
    case "stethoscope":
      return <Stethoscope className={className} />;
    case "user-check":
      return <UserCheck className={className} />;
    case "pill":
      return <Pill className={className} />;
    case "calculator":
      return <Calculator className={className} />;
    case "droplets":
      return <Droplets className={className} />;
    case "baby":
      return <Baby className={className} />;
    case "bed":
      return <Bed className={className} />;
    case "activity":
      return <Activity className={className} />;
    case "smile":
      return <Smile className={className} />;
    case "brain":
      return <Brain className={className} />;
    case "siren":
      return <Siren className={className} />;
    case "shield-check":
      return <ShieldCheck className={className} />;
    case "test-tube":
      return <TestTube className={className} />;
    case "user":
      return <User className={className} />;
    case "users":
      return <Users className={className} />;
    case "apple":
      return <Apple className={className} />;
    default:
      return <Video className={className} />;
  }
}

export default function CategoriesView({
  onOpenCategory,
  savedVideos,
  toggleBookmark,
}) {
  const [searchCategoryQuery, setSearchCategoryQuery] = useState("");
  const [isLumiOpen, setIsLumiOpen] = useState(true);

  const filteredCategories = useMemo(() => {
    if (!searchCategoryQuery.trim()) return VIDEO_CATEGORIES;
    return VIDEO_CATEGORIES.filter((c) =>
      c.title.toLowerCase().includes(searchCategoryQuery.toLowerCase())
    );
  }, [searchCategoryQuery]);

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
            <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight">200+ Videos</h3>
            <p className="text-xs sm:text-sm text-[#64748b]">High-yield video lessons</p>
          </div>
        </div>

        {/* Stat 2: 20+ Categories */}
        <div className="bg-white rounded-2xl border border-[#e5e9f0] p-5 sm:p-6 flex items-center gap-4 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#ecfdf5] text-success flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#0f172a] tracking-tight">20+ Categories</h3>
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
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => onOpenCategory(category)}
                className="bg-white rounded-2xl border border-[#eef2f6] hover:border-[#cbd5e1] p-4 flex items-start gap-3.5 transition-all shadow-2xs hover:shadow-md cursor-pointer group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${category.bgClass} ${category.iconColor} border ${category.borderClass} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  {getCategoryIcon(category.icon, "w-5 h-5")}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-sm text-[#0f172a] group-hover:text-[#1e3a5f] transition-colors truncate">
                    {category.title}
                  </h4>
                  <p className="text-xs text-[#64748b] mt-0.5">
                    {category.lessonsCount} Lessons • {category.completedCount} Completed
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-info mt-2 group-hover:translate-x-0.5 transition-transform">
                    <span>View Lessons</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
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
              {POPULAR_THIS_WEEK.map((item) => (
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
                        {item.title}
                      </h5>
                      <span className="text-[11px] text-[#64748b]">{item.category}</span>
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
                    Ask Lumi about any concept or video
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/my-tutor"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#1e3a5f] hover:bg-[#142d4a] text-white text-xs font-semibold transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Ask Lumi</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
