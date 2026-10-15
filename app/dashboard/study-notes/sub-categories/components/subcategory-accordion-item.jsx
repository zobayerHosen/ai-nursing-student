"use client";

import { useMemo } from "react";
import { ChevronDown } from "lucide-react";
import TopicGrid from "./topic-grid";
import ImageErrorHandle from "@/app/dashboard/components/image-error-handle";
import { useStudyNotesSubCategoryListWithId } from "@/hooks";

function SubcategoryTopicsSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 gap-3 pt-2">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200/90 bg-white shadow-2xs animate-pulse"
        >
          <div className="flex items-center gap-3 min-w-0">
            {/* Thumbnail skeleton */}
            <div className="w-10 h-10 rounded-lg bg-gray-200 shrink-0" />
            <div className="min-w-0 flex flex-col gap-1.5">
              {/* Title skeleton */}
              <div
                className="h-3.5 bg-gray-200 rounded-md"
                style={{ width: `${140 + (idx % 3) * 40}px` }}
              />
              {/* Subtitle skeleton */}
              <div className="h-2.5 w-24 bg-gray-100 rounded-md" />
            </div>
          </div>

          {/* Action icon skeleton */}
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <div className="w-5 h-5 rounded-md bg-gray-100" />
            <div className="w-4 h-4 rounded-md bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SubcategoryAccordionItem({
  subcategory,
  isExpanded,
  onToggle,
  savedNoteIds,
  onBookmark,
  onNoteClick,
  categoryTitle,
}) {
  const {
    studyNotesSubCategoryListData,
    isLoading,
  } = useStudyNotesSubCategoryListWithId(subcategory?.id, {
    enabled: Boolean(isExpanded && subcategory?.id),
  });

  const subContents = studyNotesSubCategoryListData?.contents;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden transition-all">
      {/* Subcategory Header */}
      <button
        type="button"
        onClick={() => onToggle(subcategory.id)}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-gray-50/70 transition-colors text-left cursor-pointer select-none"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <ImageErrorHandle
            src={subcategory?.cover}
            alt={subcategory?.name}
            containerClassName="w-10 h-10 rounded-xl text-[#1B4B66] flex items-center justify-center shrink-0 overflow-hidden"
            imageClassName="w-8 h-8 object-contain"
            width={40}
            height={40}
          />
          <div className="min-w-0">
            <h3 className="font-bold text-[#1B4B66] text-sm sm:text-base truncate">
              {subcategory?.name || "Subcategory"}
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {subcategory?.total_content_count ?? 0} {subcategory?.total_content_count === 1 ? "Topic" : "Topics"}
              {/* <span className="text-emerald-600 font-semibold ml-2">
                • {0} Completed
              </span> */}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className="hidden sm:inline-block text-xs font-semibold text-[#1B4B66] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            {isExpanded ? "Collapse" : "Expand"}
          </span>
          <div
            className={`p-1 rounded-lg text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#1B4B66]" : ""
              }`}
          >
            <ChevronDown size={18} />
          </div>
        </div>
      </button>

      {/* Subcategory Topics */}
      {isExpanded && (
        <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-gray-100 bg-gray-50/30">
          {isLoading ? (
            <SubcategoryTopicsSkeleton />
          ) : (
            <TopicGrid
              topics={subContents || []}
              subtitle={subcategory?.name || categoryTitle}
              savedNoteIds={savedNoteIds}
              onBookmark={onBookmark}
              onNoteClick={onNoteClick}
            />
          )}
        </div>
      )}
    </div>
  );
}