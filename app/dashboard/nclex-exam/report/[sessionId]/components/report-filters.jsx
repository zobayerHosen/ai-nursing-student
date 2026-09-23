"use client";

export default function ReportFilters({
  stats = { total: 0, correct: 0, incorrect: 0, flagged: 0, skipped: 0 },
  activeFilter = "all",
  onFilterChange,
}) {
  const filterCards = [
    { key: "all", label: "All", val: stats.total, color: "#1E3A5F" },
    { key: "correct", label: "Correct", val: stats.correct, color: "#16a34a" },
    { key: "incorrect", label: "Incorrect", val: stats.incorrect, color: "#dc2626" },
    { key: "flagged", label: "Flagged", val: stats.flagged, color: "#d97706" },
    { key: "skipped", label: "Skipped", val: stats.skipped, color: "#94a3b8" },
  ];

  const pillButtons = [
    { key: "all", label: "ALL" },
    { key: "correct", label: "CORRECT" },
    { key: "incorrect", label: "INCORRECT" },
    { key: "flagged", label: "FLAGGED" },
    { key: "skipped", label: "OMITTED" },
  ];

  return (
    <div className="w-full flex flex-col gap-3 mb-5">
      {/* 5 Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
        {filterCards.map((card) => {
          const isActive = activeFilter === card.key;
          return (
            <button
              key={card.key}
              onClick={() => onFilterChange && onFilterChange(card.key)}
              className={`bg-white rounded-xl p-3.5 sm:p-4 border text-center cursor-pointer transition-all duration-150 ${
                isActive
                  ? "shadow-sm ring-2"
                  : "hover:border-[#cbd5e1] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              }`}
              style={{
                borderColor: isActive ? card.color : "#e2e8f0",
                boxShadow: isActive ? `0 0 0 3px ${card.color}20, 0 1px 3px rgba(0,0,0,0.04)` : undefined,
              }}
            >
              <div
                className="text-2xl sm:text-3xl font-black leading-none"
                style={{ color: card.color }}
              >
                {card.val}
              </div>
              <div className="text-[11px] sm:text-xs text-[#64748b] mt-1 font-semibold uppercase tracking-wider">
                {card.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pill Filter Row */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto py-1">
        <div className="inline-flex bg-white border border-[#e2e8f0] rounded-full p-1 shadow-xs">
          {pillButtons.map((pill) => {
            const isActive = activeFilter === pill.key;
            return (
              <button
                key={pill.key}
                onClick={() => onFilterChange && onFilterChange(pill.key)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#1E3A5F] text-white shadow-xs"
                    : "text-[#64748b] hover:text-[#1E3A5F] bg-transparent"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
