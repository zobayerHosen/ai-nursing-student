export default function RecentlyWatchedCard({
  icon: Icon,
  title,
  category,
  watched,
  duration,
  status,
  color,
  iconBg,
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#F3F4F6]">
      {/* lesson */}
      <div className="flex items-center gap-4 flex-1">
        <div
          className="w-8 h-8 rounded-sm flex items-center justify-center"
          style={{ background: iconBg }}
        >
          <Icon
            size={17}
            style={{ color }}
          />
        </div>

        <div>
          <h3 className="font-medium text-[#233043]">
            {title}
          </h3>

          <p className="text-sm text-[#9CA3AF]">
            {category}
          </p>
        </div>
      </div>

      <div className="w-24 text-[#6B7280] text-sm">
        {watched}
      </div>

      <div className="w-16 text-[#6B7280] text-sm">
        {duration}
      </div>

      <div
        className={`w-28 text-sm ${
          status.includes("Completed")
            ? "text-[#10B981]"
            : "text-[#FF5E96]"
        }`}
      >
        ● {status}
      </div>
    </div>
  );
}