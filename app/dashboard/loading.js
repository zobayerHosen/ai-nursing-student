export default function DashboardLoading() {
  return (
    <div className="w-full flex flex-col gap-8 p-4 xl:p-6 bg-[#F7F7F7] animate-pulse">
      {/* Quick Actions Skeleton */}
      <div className="flex flex-col gap-4">
        {/* Section Title */}
        <div className="h-6 bg-slate-200 rounded w-48 mb-2"></div>
        
        {/* Grid of 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-5">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 xl:gap-4 xl:p-5 bg-white rounded-xl border border-[#DFE1E7]">
              {/* Icon Placeholder */}
              <div className="w-9 h-9 xl:w-12 xl:h-12 bg-slate-200 rounded-lg shrink-0"></div>
              {/* Text Placeholder */}
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                <div className="h-3 bg-slate-100 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Learning Skeleton */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-slate-200 rounded w-40"></div>
          <div className="h-4 bg-slate-200 rounded w-16"></div>
        </div>

        {/* Grid of 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-lg p-5 border border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                {/* Icon Circle */}
                <div className="w-10 h-10 bg-slate-200 rounded-lg shrink-0"></div>
                {/* Title */}
                <div className="h-5 bg-slate-200 rounded w-24"></div>
              </div>
              {/* Bottom Pill Placeholder */}
              <div className="h-9 bg-slate-100 rounded-full w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Body System Skeleton */}
      <div>
        <div className="h-6 bg-slate-200 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 flex flex-col items-center gap-3 border border-slate-100">
              <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cheat Sheet Skeleton */}
      <div>
        <div className="h-6 bg-slate-200 rounded w-56 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl p-5 border border-slate-100 flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                <div className="h-3 bg-slate-100 rounded w-3/4"></div>
              </div>
              <div className="w-16 h-8 bg-slate-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
