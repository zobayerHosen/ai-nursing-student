"use client";

import { Clock, X } from "lucide-react";

export const HISTORY_STORAGE_KEY = "stemrn-drug-card-history";

function formatTimestamp(ts) {
  const date = new Date(ts);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHrs < 24) return `${diffHrs}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function HistoryList({
  history,
  currentDrug,
  onDrugSelect,
  onRemoveItem,
  onClearAll,
}) {
  if (history.length === 0) return null;

  return (
    <>
      <hr className="border-black/5 w-full" />

      <div className="flex flex-col items-start gap-3 w-full">
        <div className="flex items-center justify-between w-full">
          <h4 className="text-[#344054] text-sm font-semibold flex items-center gap-2">
            <Clock size={14} className="text-[#667085]" />
            History
          </h4>
          <button
            type="button"
            onClick={onClearAll}
            className="text-[10px] font-semibold text-[#D92D20] hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors cursor-pointer"
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-col w-full gap-1">
          {history.map((item) => {
            const isActive = currentDrug.toLowerCase() === item.drugName.toLowerCase();
            return (
              <button
                key={item.drugName + item.timestamp}
                type="button"
                onClick={() => onDrugSelect(item.drugName)}
                className={`group flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#D9ECFF] border border-[#2C5F8D]/30 shadow-sm"
                    : "hover:bg-[#F8FAFC] border border-transparent hover:border-[#E2E8F0]"
                }`}
              >
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className={`text-xs font-semibold truncate ${
                      isActive ? "text-[#2C5F8D]" : "text-[#344054]"
                    }`}
                  >
                    {item.displayName || item.drugName}
                  </span>
                  <span className="text-[10px] text-[#98A2B3] font-medium mt-0.5">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>

                <span
                  onClick={(e) => onRemoveItem(e, item.drugName)}
                  className="shrink-0 p-1 rounded-md text-[#D0D5DD] opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-[#D92D20] transition-all duration-200 cursor-pointer inline-flex items-center justify-center"
                  title="Remove from history"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onRemoveItem(e, item.drugName);
                    }
                  }}
                >
                  <X size={12} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};