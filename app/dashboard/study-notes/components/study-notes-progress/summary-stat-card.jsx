"use client";

/**
 * One metric card in the 2x2 summary grid.
 * Config-driven via SUMMARY_STAT_CARDS to avoid duplicated markup.
 */
export default function SummaryStatCard({
  label,
  value,
  caption,
  captionIcon: CaptionIcon,
  captionText,
  captionClassName,
  icon: Icon,
  iconClassName,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col items-center text-center justify-center">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${iconClassName}`}
      >
        <Icon size={20} />
      </div>

      <span className="text-xs font-semibold text-gray-400">{label}</span>
      <span className="text-2xl sm:text-3xl font-black text-[#1B4B66] my-1">
        {value}
      </span>

      {caption && (
        <span className="text-[11px] text-gray-400 font-medium">{caption}</span>
      )}

      {CaptionIcon && (
        <div className={`flex items-center gap-1 text-[11px] font-bold ${captionClassName}`}>
          <CaptionIcon size={12} />
          <span>{captionText}</span>
        </div>
      )}
    </div>
  );
}
