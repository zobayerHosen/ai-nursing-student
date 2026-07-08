import Image from "next/image";

export default function TopicProgressCard({
  logo,
  icon: Icon,
  title,
  completed,
  total,
  color = "#3B82F6", // default color if none provided
  iconBg = "#E6F0FF",
}) {
  return (
    <div className="space-y-3 ">
      <div className="flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden relative"
            style={{ background: iconBg }}
          >
            {logo ? (
              <Image src={logo} alt={title} fill className="object-cover" />
            ) : Icon ? (
              <Icon
                size={17}
                style={{ color }}
              />
            ) : null}
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