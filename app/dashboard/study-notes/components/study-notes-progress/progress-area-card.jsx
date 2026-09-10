"use client";

import { AREA_STATUS_BADGES } from "./constants";

/**
 * One nursing-area card in the responsive grid.
 */
export default function ProgressAreaCard({ area, onSelect }) {
  const IconComp = area.icon;
  const badge = AREA_STATUS_BADGES[area.status];
  const isNotStarted = area.status === "Not Started";

  return (
    <div
      onClick={() => onSelect?.(area)}
      className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#1B4B66]/30 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      {/* Top Row: Icon + Title + Status badge */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl ${area.iconBg} ${area.iconColor} shrink-0 flex items-center justify-center`}
            >
              <IconComp size={18} />
            </div>
            <h4 className="font-bold text-[#1B4B66] text-sm truncate">
              {area.title}
            </h4>
          </div>

          {/* Badge (All / Not Started) */}
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
              badge.className
            } ${isNotStarted ? "font-medium" : ""}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-4">
          <div
            className={`h-full rounded-full transition-all duration-700 ${area.barColor}`}
            style={{ width: `${area.progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Meta */}
      <div className="mt-3">
        <span className="text-[11px] font-medium text-gray-400">
          {area.completedTopics} of {area.totalTopics} topics{" "}
          <strong className="text-gray-700">{area.progress}%</strong>
        </span>
      </div>
    </div>
  );
}
