"use client";

import { ChevronDown } from "lucide-react";
import TopicGrid from "./topic-grid";
import ImageErrorHandle from "@/app/dashboard/components/image-error-handle";

export default function SubcategoryAccordionItem({
  subcategory,
  isExpanded,
  onToggle,
  savedNoteIds,
  onBookmark,
  onNoteClick,
  categoryTitle,
}) {
  const subContents = subcategory?.contents || [];
  const completedCount = subContents.filter(
    (c) => c?.is_completed || c?.completed
  ).length;

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
              {subContents.length} {subContents.length === 1 ? "Topic" : "Topics"}
              {completedCount > 0 && (
                <span className="text-emerald-600 font-semibold ml-2">
                  • {completedCount} Completed
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className="hidden sm:inline-block text-xs font-semibold text-[#1B4B66] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            {isExpanded ? "Collapse" : "Expand"}
          </span>
          <div
            className={`p-1 rounded-lg text-gray-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180 text-[#1B4B66]" : ""
            }`}
          >
            <ChevronDown size={18} />
          </div>
        </div>
      </button>

      {/* Subcategory Topics */}
      {isExpanded && (
        <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-gray-100 bg-gray-50/30">
          <TopicGrid
            topics={subContents}
            subtitle={subcategory?.name || categoryTitle}
            savedNoteIds={savedNoteIds}
            onBookmark={onBookmark}
            onNoteClick={onNoteClick}
          />
        </div>
      )}
    </div>
  );
}
