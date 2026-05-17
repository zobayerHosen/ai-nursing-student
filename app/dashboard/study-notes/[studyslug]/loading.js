import React from 'react';

export default function Loading() {
  return (
    <div className="w-full animate-pulse">
      <div>
        {/* Top Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <span className="text-slate-200">/</span>
            <div className="h-4 bg-slate-200 rounded w-48"></div>
          </div>
          
          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-10 bg-slate-200 rounded-lg w-28"></div>
            <div className="h-10 bg-slate-200 rounded-lg w-28"></div>
            <div className="h-10 bg-[#FF6B8A]/30 rounded-lg w-36"></div>
          </div>
        </div>

        {/* Main Content Card Skeleton */}
        <div className="bg-white rounded-2xl p-8 border border-[#EEEEEE] shadow-sm">
          {/* Title Skeleton */}
          <div className="h-10 bg-slate-200 rounded-lg w-3/4 mb-10"></div>

          {/* Simulated Content Sections */}
          <div className="space-y-10">
            {/* Section 1 */}
            <div>
              <div className="h-7 bg-slate-200 rounded-md w-1/4 mb-5"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-11/12"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                <div className="h-4 bg-slate-100 rounded w-4/6"></div>
              </div>
            </div>

            {/* Section 2 (Simulating a table or alert boxes) */}
            <div>
              <div className="h-7 bg-slate-200 rounded-md w-1/3 mb-5"></div>
              <div className="space-y-4">
                <div className="h-20 bg-slate-100 rounded-xl w-full"></div>
                <div className="h-20 bg-slate-100 rounded-xl w-full"></div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <div className="h-7 bg-slate-200 rounded-md w-1/5 mb-5"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
