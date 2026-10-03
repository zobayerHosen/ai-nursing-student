"use client";

import Link from "next/link";
import ImageErrorHandle from "@/app/dashboard/components/image-error-handle";
import { AREA_STATUS_BADGES } from "./constants";

/**
 * One nursing-area card in the responsive grid.
 */
export default function ProgressAreaCard({ area, onSelect }) {
  const badge = AREA_STATUS_BADGES[area?.status] || {
    label: area?.status_display || "Not Started",
    className: "text-gray-400 font-medium",
  };
  const isNotStarted =
    area?.status === "not_started" || area?.status === "Not Started";
  const percentage = area?.percentage ?? 0;
  const barColor =
    area?.is_completed || area?.status === "completed"
      ? "bg-[#1B4B66]"
      : isNotStarted
      ? "bg-gray-200"
      : "bg-[#1B4B66]";

  const categoryId = area?.category_id || area?.id;

  return (
    <Link
      href={`/dashboard/study-notes/sub-categories/${categoryId}`}
      onClick={() => onSelect?.(area)}
      className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#1B4B66]/30 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      {/* Top Row: Cover/Icon + Title + Status badge */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <ImageErrorHandle
              src={area?.cover}
              alt={area?.title}
              containerClassName="w-9 h-9 rounded-xl bg-blue-50 shrink-0 flex items-center justify-center overflow-hidden"
              imageClassName="w-6 h-6 object-contain"
              width={36}
              height={36}
            />
            <h4 className="font-bold text-[#1B4B66] text-sm truncate">
              {area?.title}
            </h4>
          </div>

          {/* Badge */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
              badge.className
            }`}
          >
            {area?.status_display || badge.label}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-4">
          <div
            className={`h-full rounded-full transition-all duration-700 ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Bottom Meta */}
      <div className="mt-3">
        <span className="text-[11px] font-medium text-gray-400">
          {area?.completed_topics ?? 0} of {area?.total_topics ?? 0} topics{" "}
          <strong className="text-gray-700">
            {area?.percentage_text || `${percentage}%`}
          </strong>
        </span>
      </div>
    </Link>
  );
}