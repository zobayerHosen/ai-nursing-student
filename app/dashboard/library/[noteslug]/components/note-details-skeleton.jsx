import React from "react";

export default function NoteDetailsSkeleton() {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-xs p-5 sm:p-6 lg:p-7 flex flex-col h-full animate-pulse space-y-6">
      {/* Top Breadcrumb Skeleton */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-24 h-4 rounded bg-slate-200" />
          <div className="w-3 h-3 rounded-full bg-slate-200" />
          <div className="w-36 h-4 rounded bg-slate-200" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-200" />
          <div className="w-8 h-8 rounded-lg bg-slate-200" />
        </div>
      </div>

      {/* Note Header Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-20 h-4 rounded-full bg-slate-200" />
          <div className="w-28 h-3.5 rounded bg-slate-100" />
        </div>
        <div className="w-2/3 h-7 rounded-lg bg-slate-200" />
      </div>

      {/* Note Iframe / Document Box Skeleton */}
      <div className="w-full h-[calc(100vh-280px)] min-h-125 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-slate-200/80" />
      </div>
    </div>
  );
}
