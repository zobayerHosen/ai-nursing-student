import React from "react";

export default function VideoCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-[#e5e9f0] overflow-hidden shadow-2xs flex flex-col animate-pulse">
      <div className="aspect-video w-full bg-slate-200" />
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="w-16 h-3 bg-slate-200 rounded mb-2" />
          <div className="w-full h-4 bg-slate-200 rounded mb-1.5" />
          <div className="w-3/4 h-4 bg-slate-200 rounded mb-2.5" />
          <div className="w-full h-3 bg-slate-100 rounded mb-1" />
          <div className="w-2/3 h-3 bg-slate-100 rounded" />
        </div>
        <div className="mt-4 pt-2.5 border-t border-[#f1f5f9] flex justify-between">
          <div className="w-16 h-3 bg-slate-200 rounded" />
          <div className="w-4 h-4 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export { VideoCardSkeleton };
