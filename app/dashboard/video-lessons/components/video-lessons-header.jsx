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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 15H5C3.27496 14.9979 1.87707 13.6 1.875 11.875V5.625C1.87707 3.89996 3.27496 2.50207 5 2.5H15C16.725 2.50207 18.1229 3.89996 18.125 5.625V11.875C18.1229 13.6 16.725 14.9979 15 15ZM5 3.75C3.96445 3.75 3.125 4.58945 3.125 5.625V11.875C3.125 12.9105 3.96445 13.75 5 13.75H15C16.0355 13.75 16.875 12.9105 16.875 11.875V5.625C16.875 4.58945 16.0355 3.75 15 3.75H5Z" fill="#64748B" />
                  <path d="M16.25 17.5H3.75C3.4048 17.5 3.125 17.2202 3.125 16.875C3.125 16.5298 3.4048 16.25 3.75 16.25H16.25C16.5952 16.25 16.875 16.5298 16.875 16.875C16.875 17.2202 16.5952 17.5 16.25 17.5Z" fill="#64748B" />
                  <path d="M8.82031 12.0448C8.13125 12.0418 7.5734 11.4839 7.57031 10.7948V6.70797C7.57031 6.01762 8.13 5.45797 8.82035 5.45801C9.03977 5.45801 9.25531 5.51578 9.44531 5.62547L12.9822 7.66797C13.58 8.01316 13.7848 8.77766 13.4396 9.37551C13.33 9.56551 13.1722 9.72324 12.9822 9.83297L9.44531 11.8755C9.25559 11.9861 9.03996 12.0445 8.82031 12.0448ZM12.3578 8.75047L8.82031 6.70797V10.793L12.3578 8.75047Z" fill="#64748B" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 15H5C3.27496 14.9979 1.87707 13.6 1.875 11.875V5.625C1.87707 3.89996 3.27496 2.50207 5 2.5H15C16.725 2.50207 18.1229 3.89996 18.125 5.625V11.875C18.1229 13.6 16.725 14.9979 15 15ZM5 3.75C3.96445 3.75 3.125 4.58945 3.125 5.625V11.875C3.125 12.9105 3.96445 13.75 5 13.75H15C16.0355 13.75 16.875 12.9105 16.875 11.875V5.625C16.875 4.58945 16.0355 3.75 15 3.75H5Z" fill="#64748B" />
                  <path d="M16.25 17.5H3.75C3.4048 17.5 3.125 17.2202 3.125 16.875C3.125 16.5298 3.4048 16.25 3.75 16.25H16.25C16.5952 16.25 16.875 16.5298 16.875 16.875C16.875 17.2202 16.5952 17.5 16.25 17.5Z" fill="#64748B" />
                  <path d="M8.82031 12.0448C8.13125 12.0418 7.5734 11.4839 7.57031 10.7948V6.70797C7.57031 6.01762 8.13 5.45797 8.82035 5.45801C9.03977 5.45801 9.25531 5.51578 9.44531 5.62547L12.9822 7.66797C13.58 8.01316 13.7848 8.77766 13.4396 9.37551C13.33 9.56551 13.1722 9.72324 12.9822 9.83297L9.44531 11.8755C9.25559 11.9861 9.03996 12.0445 8.82031 12.0448ZM12.3578 8.75047L8.82031 6.70797V10.793L12.3578 8.75047Z" fill="#64748B" />
                </svg>
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
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm lg:text-[15px] font-bold transition-colors cursor-pointer relative whitespace-nowrap ${activeTab === "explore"
                  ? "text-[#1e3a5f] border-b-2 border-[#fe5e7e]"
                  : "text-[#64748b] hover:text-[#1e3a5f]"
                }`}
            >
              Explore
            </button>

            <button
              onClick={() => onTabChange("favorites")}
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm lg:text-[15px] font-bold transition-colors cursor-pointer relative whitespace-nowrap ${activeTab === "favorites"
                  ? "text-[#1e3a5f] border-b-2 border-[#fe5e7e]"
                  : "text-[#64748b] hover:text-[#1e3a5f]"
                }`}
            >
              Favorites
            </button>

            <button
              onClick={() => onTabChange("progress")}
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm lg:text-[15px] font-bold transition-colors cursor-pointer relative whitespace-nowrap ${activeTab === "progress"
                  ? "text-[#1e3a5f] border-b-2 border-[#fe5e7e]"
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
