"use client";

import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function VideoLessonsHeader({
  activeTab,
  onTabChange,
  subView,
  selectedCategory,
  onBack,
}) {
  return (
    <div className="w-full bg-white border-b border-[#e2e8f0] px-3.5 sm:px-6 lg:px-8 xl:px-10 pt-4 sm:pt-5 lg:pt-6">
      <div className="w-full">
        {/* Header Title & Subtitle */}
        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
          {subView === "category-detail" && selectedCategory ? (
            <div className="flex items-start gap-3">
              <button
                onClick={onBack}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                title="Back to categories"
              >
                <ArrowLeft className="w-5 h-5 text-[#1e3a5f]" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#044e79] tracking-tight">
                  {selectedCategory.title}
                </h1>
                <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
                  24 Videos. Learn the heart, save lives
                </p>
              </div>
            </div>
          ) : activeTab === "favorites" ? (
            <div className="flex items-start gap-3">
              <button
                onClick={() => onTabChange("explore")}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                title="Back to Explore"
              >
                <ArrowLeft className="w-5 h-5 text-[#1e3a5f]" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#044e79] tracking-tight">
                  My List
                </h1>
                <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
                  24 Videos. Learn the heart, save lives
                </p>
              </div>
            </div>
          ) : subView === "all-categories" ? (
            <div className="flex items-start gap-3">
              <button
                onClick={onBack}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                title="Back to Explore"
              >
                <ArrowLeft className="w-5 h-5 text-[#1e3a5f]" />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#044e79] tracking-tight">
                  Browse Video Categories
                </h1>
                <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
                  Short, visual lessons that make complex nursing concepts easier to understand.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 sm:gap-3.5">
              {/* Logo badge icon matching the screenshot */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-[#eef4fb] text-[#1e3a5f] flex items-center justify-center shrink-0 shadow-xs border border-primary-100">
                <BookOpen className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#1e3a5f]" strokeWidth={2.2} />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#044e79] tracking-tight">
                  Nursing Video Lessons
                </h1>
                <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
                  Short, visual lessons that make complex nursing concepts easier to understand.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs (Explore, Favorites, My Progress) */}
        {subView !== "category-detail" && (
          <div className="flex items-center gap-5 sm:gap-7 lg:gap-9 -mb-px overflow-x-auto hide-scrollbar">
            <button
              onClick={() => onTabChange("explore")}
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm lg:text-[15px] font-bold transition-colors cursor-pointer relative whitespace-nowrap ${
                activeTab === "explore"
                  ? "text-[#1e3a5f] border-b-2 border-[#1e3a5f]"
                  : "text-[#64748b] hover:text-[#1e3a5f]"
              }`}
            >
              Explore
            </button>

            <button
              onClick={() => onTabChange("favorites")}
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm lg:text-[15px] font-bold transition-colors cursor-pointer relative whitespace-nowrap ${
                activeTab === "favorites"
                  ? "text-[#1e3a5f] border-b-2 border-[#1e3a5f]"
                  : "text-[#64748b] hover:text-[#1e3a5f]"
              }`}
            >
              Favorites
            </button>

            <button
              onClick={() => onTabChange("progress")}
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm lg:text-[15px] font-bold transition-colors cursor-pointer relative whitespace-nowrap ${
                activeTab === "progress"
                  ? "text-[#1e3a5f] border-b-2 border-[#1e3a5f]"
                  : "text-[#64748b] hover:text-[#1e3a5f]"
              }`}
            >
              My Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
