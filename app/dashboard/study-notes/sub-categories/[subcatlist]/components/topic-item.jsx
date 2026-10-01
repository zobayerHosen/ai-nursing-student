"use client";

import { Bookmark, ChevronRight, CheckCircle2 } from "lucide-react";
import ImageErrorHandle from "@/app/dashboard/components/image-error-handle";

export default function TopicItem({ topic, subtitle, isSaved, onBookmark, onClick }) {
  const isCompleted = Boolean(topic?.is_completed || topic?.completed);
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200/90 bg-white hover:border-[#1B4B66]/40 hover:bg-blue-50/20 transition-all cursor-pointer group shadow-2xs"
    >
      <div className="flex items-center gap-3 min-w-0">
        <ImageErrorHandle
          src={topic?.content_cover}
          alt={topic?.content_name || topic?.title || topic?.name}
          containerClassName="w-10 h-10 shrink-0 flex items-center justify-center overflow-hidden"
          imageClassName="w-8 h-8 object-contain"
          width={40}
          height={40}
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-[#1B4B66] group-hover:text-blue-700 transition-colors truncate">
              {topic?.content_name || topic?.title || topic?.name || "Untitled Topic"}
            </h4>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 size={11} />
                Completed
              </span>
            )}
          </div>
          <p className="text-[11px] text-gray-400 font-medium truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0 ml-2">
        <button
          type="button"
          onClick={onBookmark}
          className="p-1.5 rounded-lg text-gray-400 hover:text-[#1B4B66] hover:bg-gray-100 transition cursor-pointer"
          title={isSaved ? "Remove bookmark" : "Bookmark note"}
        >
          <Bookmark
            size={17}
            className={
              isSaved ? "fill-[#1B4B66] text-[#1B4B66]" : "text-gray-400"
            }
          />
        </button>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1B4B66] group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}
