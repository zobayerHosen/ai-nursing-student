"use client";

import React from "react";
import { ArrowLeft, Play } from "lucide-react";

export default function VideoLessonSkeleton({ onBack }) {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden animate-pulse">
      {/* Top Header Skeleton */}
      <div className="w-full bg-white border-b border-[#e2e8f0] px-3.5 sm:px-6 lg:px-8 xl:px-10 py-3.5 sm:py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1e3a5f] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0 flex-1">
            <div className="h-5 sm:h-6 w-56 sm:w-80 bg-slate-200 rounded-md mb-2" />
            <div className="h-3.5 w-36 sm:w-48 bg-slate-100 rounded" />
          </div>
        </div>
      </div>

      {/* Main Container Skeleton */}
      <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col gap-6">
            {/* Video Player Skeleton */}
            <div className="w-full aspect-video rounded-2xl sm:rounded-3xl bg-slate-900 border border-[#e2e8f0] flex items-center justify-center relative overflow-hidden shadow-sm">
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-slate-800/90 border border-slate-700/60 flex items-center justify-center">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-slate-500 fill-slate-500 ml-1" />
              </div>
            </div>

            {/* Action Bar Skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-8 w-36 bg-slate-200 rounded-xl" />
            </div>

            {/* Tabbed Card Skeleton */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-7 shadow-xs">
              {/* Tab Header */}
              <div className="flex items-center gap-8 border-b border-[#f1f5f9] -mt-1 pb-3 mb-5 sm:mb-6">
                <div className="h-5 w-20 bg-slate-200 rounded" />
                <div className="h-5 w-20 bg-slate-100 rounded" />
              </div>

              {/* About shimmer */}
              <div className="space-y-3">
                <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                <div className="h-3.5 w-full bg-slate-100 rounded" />
                <div className="h-3.5 w-11/12 bg-slate-100 rounded" />
                <div className="h-3.5 w-4/5 bg-slate-100 rounded" />
              </div>

              {/* 2 Metric Boxes Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                    <div className="h-3 w-12 bg-slate-100 rounded" />
                  </div>
                </div>
                <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-4 w-20 bg-slate-200 rounded" />
                    <div className="h-3 w-16 bg-slate-100 rounded" />
                  </div>
                </div>
              </div>

              {/* What You'll Learn Skeleton */}
              <div className="mt-6 space-y-3">
                <div className="h-4 w-36 bg-slate-200 rounded mb-3" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-slate-200 shrink-0" />
                    <div className="h-3.5 w-full max-w-md bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col gap-6">
            {/* Next Lessons Skeleton */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#f1f5f9]">
                <div className="h-4 w-28 bg-slate-200 rounded" />
                <div className="h-4 w-10 bg-slate-100 rounded" />
              </div>
              <div className="mt-3 space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-2.5 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 w-full bg-slate-200 rounded" />
                      <div className="h-2.5 w-16 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Lessons Skeleton */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-4.5 sm:p-5.5 shadow-xs">
              <div className="pb-3 border-b border-[#f1f5f9]">
                <div className="h-4 w-32 bg-slate-200 rounded" />
              </div>
              <div className="mt-3 space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-2.5 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-200 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 w-full bg-slate-200 rounded" />
                      <div className="h-2.5 w-24 bg-slate-100 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { VideoLessonSkeleton };
