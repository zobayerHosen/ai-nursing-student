export default function CardSkeleton({
  count = 10,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6",
  cardClassName = "bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 flex items-start gap-4 animate-pulse shadow-2xs",
}) {
  return (
    <div className={gridClassName}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={cardClassName}>
          {/* Left Thumbnail placeholder */}
          <div className="w-12 h-12 rounded-lg bg-gray-200 shrink-0" />

          {/* Right Content lines placeholder */}
          <div className="flex-1 min-w-0 space-y-2 py-0.5">
            <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
            <div className="h-3 w-1/2 bg-gray-100 rounded-md" />
            <div className="h-3.5 w-24 bg-gray-200 rounded-md mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}
