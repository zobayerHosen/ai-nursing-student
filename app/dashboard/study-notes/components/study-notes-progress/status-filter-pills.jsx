"use client";

import { AREA_FILTER_ITEMS } from "./constants";

/**
 * Row of status filter pills with per-status counts.
 * Renders buttons from AREA_FILTER_ITEMS to avoid duplicated markup.
 */
export default function StatusFilterPills({ activeFilter, onChange, counts }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
      {AREA_FILTER_ITEMS.map((filterItem) => {
        const isActive = activeFilter === filterItem.id;

        return (
          <button
            key={filterItem.id}
            type="button"
            onClick={() => onChange(filterItem.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
              isActive
                ? "bg-[#1B4B66] text-white shadow-xs"
                : "bg-blue-50 text-[#0284C7] hover:bg-blue-100"
            }`}
          >
            {filterItem.label} {counts?.[filterItem.id] ?? 0}
          </button>
        );
      })}
    </div>
  );
}
