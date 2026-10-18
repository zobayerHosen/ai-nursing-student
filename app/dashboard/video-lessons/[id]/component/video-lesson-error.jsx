"use client";

import React from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function VideoLessonError({
  onBack,
  title = "Failed to load video lesson",
  message = "Could not retrieve video details. Please try again or navigate back.",
}) {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col">
      <div className="w-full bg-white border-b border-[#e2e8f0] px-3.5 sm:px-6 lg:px-8 xl:px-10 py-3.5 sm:py-4">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
          title="Back"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center text-red-500 mb-3 shadow-xs">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0f172a] mb-1">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#64748b] max-w-sm mb-4">
          {message}
        </p>
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-[#1e3a5f] text-white text-xs font-semibold hover:bg-[#142d4a] transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}

export { VideoLessonError };
