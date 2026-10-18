"use client";

import React from "react";
import Link from "next/link";
import { Play, CheckCircle2, BookmarkCheck, Bookmark, Loader2 } from "lucide-react";
import ImageErrorHandle from "@/app/dashboard/components/image-error-handle";

export default function CategoryVideoCard({
  video,
  onToggleFavorite,
  isFavoritePending = false,
}) {
  const videoId = video?.video_id || video?.id;
  const isFav = Boolean(video?.is_favorite);
  const isCompleted = Boolean(video?.is_completed || video?.user_progress?.is_completed);

  return (
    <Link
      href={`/dashboard/video-lessons/${videoId}`}
      className="bg-white rounded-2xl border border-[#e5e9f0] hover:border-[#cbd5e1] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
    >
      {/* Thumbnail with Center Play Overlay */}
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
        <ImageErrorHandle
          src={video?.thumbnail}
          alt={video?.title || "Video thumbnail"}
          containerClassName="w-full h-full"
          imageClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          width={400}
          height={225}
        />

        {/* Play icon overlay */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/95 text-[#1e3a5f] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Favorite Button on Top-Right Corner */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (videoId && onToggleFavorite) {
              onToggleFavorite(videoId);
            }
          }}
          disabled={isFavoritePending}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center transition-all duration-200 cursor-pointer z-20 group/fav shadow-md hover:scale-105 active:scale-95 ${
            isFavoritePending ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isFavoritePending ? (
            <Loader2 className="w-4 h-4 text-[#1e3a5f] animate-spin" />
          ) : isFav ? (
            <BookmarkCheck className="w-4 h-4 text-[#e14564] fill-current transition-all duration-200 group-hover/fav:scale-110" />
          ) : (
            <Bookmark className="w-4 h-4 text-[#1e3a5f] transition-all duration-200 group-hover/fav:scale-110" />
          )}
        </button>

        {/* Completed Badge */}
        {isCompleted && (
          <div className="absolute top-2.5 left-2.5 bg-emerald-500/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
            <span>Completed</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Tag / Category / Lesson Number */}
          <span className="text-[10px] font-bold text-info uppercase tracking-wider block mb-1 truncate">
            {video?.serial_number
              ? `Lesson ${video.serial_number}`
              : video?.category_name || video?.module_name || "Nursing Lesson"}
          </span>

          {/* Title */}
          <h4 className="font-bold text-xs sm:text-sm text-[#0f172a] line-clamp-2 leading-snug group-hover:text-[#1e3a5f] transition-colors">
            {video?.title}
          </h4>

          {/* Description */}
          {video?.description && (
            <p className="text-[11px] sm:text-xs text-[#64748b] mt-1.5 line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>

        {/* Footer with Views */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#f1f5f9]">
          <span className="text-[11px] text-[#64748b] flex items-center gap-1 font-medium">
            <Play className="w-3 h-3 fill-current text-[#94a3b8]" />
            <span>
              {video?.views_formatted || `${video?.views_count ?? 0} Views`}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export { CategoryVideoCard };
