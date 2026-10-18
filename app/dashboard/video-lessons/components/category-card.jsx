"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown, Video } from "lucide-react";
import ImageErrorHandle from "@/app/dashboard/components/image-error-handle";
import { useGetVideoSubCategoryList } from "@/hooks";

export default function CategoryCard({ category }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubcategory = Boolean(category?.has_subcategory);


  const {
    videoSubCategoryListData,
    isLoading,
    isError
  } = useGetVideoSubCategoryList(category?.id)
  const categoryName = category?.name ?? category?.title ?? "N/A";

  if (hasSubcategory) {
    return (
      <div
        className={`bg-white rounded-2xl border transition-all duration-200 p-4 flex flex-col justify-between relative overflow-hidden ${isExpanded
            ? "border-[#1e3a5f]/40 shadow-md ring-1 ring-[#1e3a5f]/10"
            : "border-[#eef2f6] hover:border-[#cbd5e1] shadow-2xs hover:shadow-md"
          }`}
      >
        <div className="flex items-start gap-3.5">
          <ImageErrorHandle
            src={category?.logo}
            alt={categoryName}
            containerClassName="w-11 h-11 rounded-xl border border-gray-300 flex items-center justify-center shrink-0 overflow-hidden"
            imageClassName="w-6 h-6 object-contain"
            width={44}
            height={44}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="font-bold text-sm text-[#0f172a] hover:text-[#1e3a5f] transition-colors truncate text-left cursor-pointer"
              >
                {categoryName ?? "N/F"}
              </button>

              <span className="text-[10px] font-bold text-[#1e3a5f] bg-[#eff6ff] px-2 py-0.5 rounded-md shrink-0">
                {videoSubCategoryListData?.total_subcategories > 0
                  ? `${videoSubCategoryListData?.total_subcategories} Subcategories`
                  : "Subcategory"}
              </span>
            </div>

            <p className="text-xs text-[#64748b] mt-0.5">
              {category?.total_lessons ?? 0} Lessons • {category?.completed ?? 0} Completed
            </p>

            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-info mt-2 hover:text-[#1e3a5f] transition-colors cursor-pointer"
            >
              <span>{isExpanded ? "Hide Subcategory" : "See Subcategory"}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>
        </div>

        {/* Expandable Subcategory List */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 animate-[fadeIn_0.2s_ease]">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Select Subcategory
            </p>

            {videoSubCategoryListData?.total_subcategories > 0 ? (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {videoSubCategoryListData?.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/dashboard/video-lessons/category/${sub.id}?from=categories&type=subcategory&hasSubcategory=true`}
                    className="group/sub flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-[#eff6ff] border border-slate-100 hover:border-[#1e3a5f]/30 transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-white text-[#1e3a5f] flex items-center justify-center shrink-0 border border-gray-100 shadow-2xs">
                        <Video className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-gray-800 group-hover/sub:text-[#1e3a5f] truncate">
                        {sub.name || "Subcategory"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-[10px] font-bold text-[#1e3a5f] bg-white px-1.5 py-0.5 rounded border border-gray-100">
                        {sub?.total_video ?? 0} Lessons
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#1e3a5f] group-hover/sub:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-3 text-center text-xs text-gray-400 bg-slate-50/70 rounded-xl border border-dashed border-gray-200">
                No subcategories available
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Standard category card (without subcategories)
  return (
    <Link
      href={`/dashboard/video-lessons/category/${category.id}?from=categories`}
      className="bg-white rounded-2xl border border-[#eef2f6] hover:border-[#cbd5e1] p-4 flex items-start gap-3.5 transition-all shadow-2xs hover:shadow-md cursor-pointer group"
    >
      <ImageErrorHandle
        src={category?.logo}
        alt={categoryName}
        containerClassName="w-11 h-11 rounded-xl border border-gray-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden"
        imageClassName="w-6 h-6 object-contain"
        width={44}
        height={44}
      />

      <div className="min-w-0 flex-1">
        <h4 className="font-bold text-sm text-[#0f172a] group-hover:text-[#1e3a5f] transition-colors truncate">
          {categoryName}
        </h4>
        <p className="text-xs text-[#64748b] mt-0.5">
          {category?.total_lessons ?? 0} Lessons • {category?.completed ?? 0} Completed
        </p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-info mt-2 group-hover:translate-x-0.5 transition-transform">
          <span>View Lessons</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

export { CategoryCard };
