"use client";

import {
  DONUT_RADIUS,
  DONUT_STROKE_WIDTH,
} from "./constants";

const TRACK_COLOR = "#E0F2FE";
const PROGRESS_COLOR = "#1B4B66";

/**
 * Left summary card: donut chart of overall coverage + completed/remaining legend.
 */
export default function CoverageDonutCard({
  coveragePercent,
  completedNotes,
  totalNotes,
  moduleCount,
}) {
  const circumference = 2 * Math.PI * DONUT_RADIUS;
  const strokeDashoffset = circumference - (coveragePercent / 100) * circumference;
  const remaining = Math.max(0, totalNotes - completedNotes);

  return (
    <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-[#1B4B66]">Study Notes</h3>
        <p className="text-xs text-gray-400 mt-0.5 font-medium">
          {moduleCount} modules total
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6 my-auto">
        {/* Donut graphic */}
        <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r={DONUT_RADIUS}
              fill="none"
              stroke={TRACK_COLOR}
              strokeWidth={DONUT_STROKE_WIDTH}
            />
            {/* Active Progress */}
            <circle
              cx="80"
              cy="80"
              r={DONUT_RADIUS}
              fill="none"
              stroke={PROGRESS_COLOR}
              strokeWidth={DONUT_STROKE_WIDTH}
              strokeDasharray={circumference}
              strokeDashoffset={isNaN(strokeDashoffset) ? circumference : strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Center Value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1B4B66] leading-none">
              {coveragePercent}%
            </span>
            <span className="text-[10px] font-semibold text-gray-500 mt-1">
              Overall Coverage
            </span>
          </div>
        </div>

        {/* Legend info */}
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1B4B66] shrink-0" />
              <span className="font-bold text-gray-800">
                Completed{" "}
                <span className="text-[#1B4B66] font-extrabold ml-1">
                  {completedNotes} ({coveragePercent}%)
                </span>
              </span>
            </div>
            <p className="text-[11px] text-gray-400 pl-5 mt-0.5">
              {completedNotes} topics completed
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#BAE6FD] shrink-0" />
              <span className="font-bold text-gray-800">
                Not Started{" "}
                <span className="text-gray-600 font-extrabold ml-1">
                  {remaining} ({100 - coveragePercent}%)
                </span>
              </span>
            </div>
            <p className="text-[11px] text-gray-400 pl-5 mt-0.5">
              {remaining} topics remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
