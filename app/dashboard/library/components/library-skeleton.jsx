import React from "react";

export default function LibrarySkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <div className="w-36 h-7 rounded-lg bg-slate-200" />
            <div className="w-64 sm:w-80 h-4 rounded bg-slate-100" />
          </div>
        </div>
        <div className="w-32 h-10 rounded-xl bg-slate-200 shrink-0" />
      </div>

      {/* Top Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stat 1 */}
        <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
          <div className="space-y-2">
            <div className="w-20 h-3.5 rounded bg-slate-100" />
            <div className="w-12 h-7 rounded bg-slate-200" />
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
          <div className="space-y-2">
            <div className="w-16 h-3.5 rounded bg-slate-100" />
            <div className="w-10 h-7 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Main Content Section Card Skeleton */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-xs p-5 sm:p-6 lg:p-7 space-y-5">
        {/* Section Heading */}
        <div className="flex items-center justify-between pb-2">
          <div className="w-44 h-6 rounded-lg bg-slate-200" />
          <div className="w-16 h-4 rounded bg-slate-100" />
        </div>

        {/* Notes Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200/75 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg bg-slate-200 shrink-0" />

                  {/* Note Details */}
                  <div className="min-w-0 flex-1 space-y-2.5">
                    {/* Badge & Bookmark */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-24 h-4 rounded-full bg-slate-200" />
                      <div className="w-4 h-4 rounded bg-slate-200 shrink-0" />
                    </div>

                    {/* Title */}
                    <div className="w-4/5 h-4.5 rounded bg-slate-200 mt-1" />
                  </div>
                </div>
              </div>

              {/* Bottom Date */}
              <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <div className="w-24 h-3 rounded bg-slate-100" />
                <div className="w-12 h-3 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
