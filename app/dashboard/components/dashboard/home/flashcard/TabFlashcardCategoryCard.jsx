export default function TabFlashcardCategoryCard({
  title,
  icon: Icon,
  due,
  totalCards,
  recall,
  easy,
  progress,
  color,
  iconBg,
}) {
  return (
    <div className="bg-white border border-[#ECECEC] rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: iconBg }}
          >
            <Icon
              size={18}
              className="text-[#475569]"
            />
          </div>

          <h3 className="font-semibold text-[#1E293B]">
            {title}
          </h3>
        </div>

        <div className="bg-[#FFE6F2] text-[#FF2D7A] px-3 py-1 rounded-full text-xs font-medium">
          {due} due
        </div>
      </div>

      {/* Progress */}
      <div className="w-full h-[6px] bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 text-sm">
        <div className="text-[#64748B]">
          {totalCards} cards ·{" "}
          <span className="font-semibold text-[#334155]">
            {recall}% recall
          </span>
        </div>

        <div className="text-[#64748B]">
          {easy} easy
        </div>
      </div>
    </div>
  );
}