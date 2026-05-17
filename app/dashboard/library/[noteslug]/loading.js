export default function LibraryNoteLoading() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Top Breadcrumb Header Skeleton */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="h-4 bg-slate-200 rounded w-16"></div>
          <span className="text-slate-200">/</span>
          <div className="h-4 bg-slate-200 rounded w-24"></div>
          <span className="text-slate-200">/</span>
          <div className="h-4 bg-slate-200 rounded w-36"></div>
        </div>
        {/* Share Button Skeleton */}
        <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
      </div>

      {/* Content Area Skeleton */}
      <div className="pt-6">
        {/* Topic Folder / Date */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-4 bg-slate-200 rounded w-20"></div>
          <span className="text-slate-300">•</span>
          <div className="h-4 bg-slate-100 rounded w-24"></div>
        </div>

        {/* Note Title */}
        <div className="h-9 bg-slate-200 rounded-lg w-2/3 mb-4"></div>

        {/* Note Tags Skeleton */}
        <div className="flex gap-2 mb-8">
          <div className="h-6 bg-slate-100 rounded-full w-20"></div>
          <div className="h-6 bg-slate-100 rounded-full w-24"></div>
          <div className="h-6 bg-slate-100 rounded-full w-16"></div>
        </div>

        {/* Library Items Stack Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
              {/* Item Title */}
              <div className="h-5 bg-slate-200 rounded w-1/3"></div>
              {/* Item Description */}
              <div className="space-y-2">
                <div className="h-3.5 bg-slate-100 rounded w-full"></div>
                <div className="h-3.5 bg-slate-100 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
