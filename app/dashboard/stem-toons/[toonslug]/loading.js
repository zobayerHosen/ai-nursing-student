import React from 'react';

export default function Loading() {
  return (
    <div className="w-full animate-pulse">
      {/* Top Header Breadcrumbs & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
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

      {/* Main Split Screen Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Comic/Infographic Image Box */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white rounded-2xl p-4 border border-[#EEEEEE] shadow-sm flex flex-col items-center justify-center">
            <div className="w-full h-[550px] bg-slate-100 rounded-xl"></div>
          </div>
        </div>

        {/* Right Column: Detailed Study Guide Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Header Title Block Skeleton */}
          <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm space-y-3">
            <div className="h-5 bg-slate-200 rounded w-24"></div>
            <div className="h-8 bg-slate-200 rounded w-11/12"></div>
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          </div>

          {/* Section 1: Common Indications Skeleton */}
          <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm space-y-4">
            <div className="h-5 bg-slate-200 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-11/12"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>
          </div>

          {/* Section 2: Definition Block Skeleton */}
          <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm space-y-3">
            <div className="h-5 bg-slate-200 rounded w-1/4"></div>
            <div className="h-4 bg-slate-100 rounded w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-2/3"></div>
          </div>

          {/* Section 3: System Parts Skeleton */}
          <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm space-y-4">
            <div className="h-5 bg-slate-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-11/12"></div>
              <div className="h-4 bg-slate-100 rounded w-full"></div>
            </div>
          </div>

          {/* Section 4: Nursing Assessment Skeleton */}
          <div className="bg-rose-50 rounded-2xl p-6 border border-rose-100 shadow-sm space-y-3">
            <div className="h-5 bg-rose-200 rounded w-1/3"></div>
            <div className="h-4 bg-rose-100 rounded w-full"></div>
            <div className="h-4 bg-rose-100 rounded w-full"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
