import React from "react";

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Breadcrumb & Actions Row Skeleton */}
      <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <div className="flex items-center gap-2">
          <div className="h-4 bg-slate-200 rounded w-16"></div>
          <div className="h-4 bg-slate-200 rounded w-4"></div>
          <div className="h-4 bg-slate-200 rounded w-32"></div>
          <div className="h-4 bg-slate-200 rounded w-4"></div>
          <div className="h-4 bg-slate-200 rounded w-24"></div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex items-center gap-2.5 max-sm:w-full">
          <div className="h-9 bg-slate-200 rounded-lg w-28 max-sm:w-1/2"></div>
          <div className="h-9 bg-slate-200 rounded-lg w-28 max-sm:w-1/2"></div>
        </div>
      </div>

      {/* Main Header Presentation Block Skeleton */}
      <header className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative p-8 max-sm:p-6">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-200" />
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="h-5 bg-slate-200 rounded-full w-36"></div>
            <div className="h-8 bg-slate-200 rounded w-1/2 max-sm:w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-100 rounded w-4/6"></div>
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 shrink-0 max-md:hidden"></div>
        </div>
      </header>

      {/* Structured Content Section Skeleton */}
      <div className="space-y-8">
        {/* Section 1 Skeleton - Table style */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-sm:p-6 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-5 h-5 bg-slate-200 rounded shrink-0"></div>
            <div className="h-6 bg-slate-200 rounded w-48"></div>
          </div>
          <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          
          {/* Table Skeleton */}
          <div className="overflow-hidden border border-slate-150 rounded-2xl bg-white shadow-sm">
            <div className="bg-slate-50 h-12 border-b border-slate-200 flex items-center px-6 gap-6">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            </div>
            <div className="divide-y divide-slate-100">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="h-16 flex items-center px-6 gap-6">
                  <div className="h-4 bg-slate-200 rounded w-1/5"></div>
                  <div className="h-8 bg-[#2C5F8D]/5 rounded-lg w-1/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2 Skeleton - Grid style */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-sm:p-6 space-y-6">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-5 h-5 bg-slate-200 rounded shrink-0"></div>
            <div className="h-6 bg-slate-200 rounded w-56"></div>
          </div>
          <div className="h-4 bg-slate-100 rounded w-2/3"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-slate-50 p-4.5 rounded-2xl border border-slate-100/80 h-20">
                <div className="w-5 h-5 bg-slate-200 rounded-full shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Safety Banner Skeleton */}
      <footer className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex gap-4 items-start shadow-sm">
        <div className="w-6 h-6 bg-slate-200 rounded-full shrink-0"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-3 bg-slate-100 rounded w-full"></div>
          <div className="h-3 bg-slate-100 rounded w-5/6"></div>
        </div>
      </footer>
    </div>
  );
}
