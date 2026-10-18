"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, CheckCircle2, Play, ChevronRight } from "lucide-react";

export default function NextAndSimilarLessons({
  nextLessons = [],
  similarLessons = [],
  watchedCount = 0,
  totalCount = 0,
  currentVideoId,
}) {
  return (
    <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6">
      {/* Next Lessons Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
        <div className="flex items-center justify-between pb-3.5 border-b border-[#f1f5f9]">
          <h3 className="font-bold text-sm sm:text-base text-[#0f172a]">
            Next Lessons
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#64748b]">
              {watchedCount}/{totalCount}
            </span>
            <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer hover:text-[#1e3a5f] transition-colors" />
          </div>
        </div>

        {/* Next Lesson Items List */}
        {nextLessons.length > 0 ? (
          <div className="divide-y divide-[#f8fafc] mt-2 space-y-1">
            {nextLessons.map((lesson, index) => {
              const isCurrent = Boolean(
                lesson.is_current ||
                  String(lesson.video_id || lesson.id) === String(currentVideoId)
              );
              const isCompleted = Boolean(
                lesson.status === "watched" ||
                  lesson.status === "completed" ||
                  lesson.is_completed ||
                  lesson.progress_percent === 100
              );

              return (
                <Link
                  key={lesson.video_id || lesson.id || index}
                  href={`/dashboard/video-lessons/${lesson.video_id || lesson.id}`}
                  className={`p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 sm:gap-3 transition-colors cursor-pointer group ${
                    isCurrent
                      ? "bg-[#eef4fb] text-[#1e3a5f] border border-[#1e3a5f]/20 shadow-2xs"
                      : "hover:bg-gray-50 text-[#334155] border border-transparent"
                  }`}
                >
                  {/* Status / Lesson Number Badge */}
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs transition-colors ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-600"
                        : isCurrent
                        ? "bg-[#1e3a5f] text-white"
                        : "bg-gray-100 group-hover:bg-gray-200 text-[#1e3a5f]"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                    ) : isCurrent ? (
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    ) : (
                      <span>{lesson.serial_number || index + 1}</span>
                    )}
                  </div>

                  {/* Title & Duration */}
                  <div className="min-w-0 flex-1">
                    <h4
                      className={`text-xs font-semibold truncate leading-tight ${
                        isCurrent
                          ? "text-[#1e3a5f]"
                          : "group-hover:text-[#1e3a5f]"
                      }`}
                    >
                      {lesson.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[#64748b]">
                        {lesson.duration || lesson.duration_formatted || "00:00"}
                      </span>
                      {lesson.progress_percent > 0 && !isCompleted && (
                        <span className="text-[9px] font-semibold text-info">
                          • {lesson.progress_percent}% watched
                        </span>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1e3a5f] shrink-0" />
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-[#64748b] mt-3">
            No further lessons in this module.
          </p>
        )}
      </div>

      {/* Similar Lessons Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
        <div className="pb-3 border-b border-[#f1f5f9]">
          <h3 className="font-bold text-sm sm:text-base text-[#0f172a]">
            Similar Lessons
          </h3>
        </div>

        {similarLessons.length > 0 ? (
          <div className="mt-2 space-y-1">
            {similarLessons.map((lesson, idx) => (
              <Link
                key={lesson.video_id || lesson.id || idx}
                href={`/dashboard/video-lessons/${lesson.video_id || lesson.id}`}
                className="p-2.5 sm:p-3 rounded-xl flex items-center gap-2.5 sm:gap-3 hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 text-[#1e3a5f] group-hover:bg-[#1e3a5f] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-semibold text-[#0f172a] truncate leading-tight group-hover:text-[#1e3a5f]">
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-info font-medium uppercase tracking-wider truncate max-w-30">
                      {lesson.module_name || "Nursing Lesson"}
                    </span>
                    <span className="text-[10px] text-[#64748b] shrink-0">
                      • {lesson.duration || lesson.duration_formatted || "00:00"}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#1e3a5f] shrink-0" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#64748b] mt-3">
            No similar lessons available.
          </p>
        )}
      </div>
    </div>
  );
}

export { VideoLessonSidebar };
