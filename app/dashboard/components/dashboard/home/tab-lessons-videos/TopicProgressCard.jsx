// components/dashboard-tabs/lesson-videos/TopicProgressCard.jsx

export default function TopicProgressCard({
  icon: Icon,
  title,
  completed,
  total,
  progress,
  color,
  iconBg,
}) {
  return (
    <div className="space-y-3 ">
      <div className="flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center"
            style={{ background: iconBg }}
          >
            <Icon
              size={17}
              style={{ color }}
            />
          </div>

          <h3 className="font-semibold text-[#233043]">
            {title}
          </h3>
        </div>

        {/* Right */}
        <div className="text-[#233043] font-medium">
          {completed}
          <span className="text-[#9CA3AF]">
            {" "}
            / {total}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-[6px] rounded-full bg-[#ECECEC] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${(completed / total) * 100}%`,
            background: color,
          }}
        />
      </div>
    </div>
  );
}