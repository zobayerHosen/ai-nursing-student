"use client";

import { BookOpen } from "lucide-react";

/** Centered loading state for the areas section. */
export function AreasLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xs">
      <div className="w-8 h-8 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-xs text-gray-500 font-medium">Loading areas progress...</p>
    </div>
  );
}

/** Empty state shown when no nursing areas exist. */
export function AreasEmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center shadow-xs flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B4B66] flex items-center justify-center mb-3">
        <BookOpen size={28} />
      </div>
      <h3 className="text-base font-bold text-[#1B4B66]">No Areas Available</h3>
      <p className="text-xs text-gray-500 max-w-sm mt-1">
        Progress will be tracked here as you explore notes and complete topics.
      </p>
    </div>
  );
}
