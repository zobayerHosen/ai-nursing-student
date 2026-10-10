"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function TopicCategoryList({
  isLoading,
  categoriesList = [],
  activeCategoryId,
  onItemClick,
  layout = "stack",
}) {
  if (isLoading) {
    return (
      <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-3 py-2" : "space-y-3 py-2"}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-gray-100/80 p-2 pr-4 rounded-full flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
              <div className="h-4 bg-gray-200 rounded-md w-28" />
            </div>
            <div className="h-3 bg-gray-200 rounded-md w-14 ml-2" />
          </div>
        ))}
      </div>
    );
  }

  if (categoriesList.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-gray-400">
        No categories found
      </div>
    );
  }

  return (
    <div className={layout === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3" : "space-y-2.5 sm:space-y-3"}>
      {categoriesList.map((cat) => {
        const isSelected = activeCategoryId != null && String(activeCategoryId) === String(cat.id);
        const deckCount = cat.deck_count ?? cat.decks?.length ?? 0;

        return (
          <Link
            key={cat.id}
            href={`/dashboard/flashcards/all-dec-list/${cat.id}`}
            onClick={onItemClick}
            style={{
              backgroundColor: cat?.pillBg || "#F1F5F9",
              boxShadow: isSelected
                ? `0 0 0 2px #ffffff, 0 0 0 4px ${cat?.iconBg || "#3B82F6"}, 0 6px 16px -2px rgba(0,0,0,0.08)`
                : undefined,
            }}
            className={`w-full text-left p-1.5 sm:p-2 pr-3.5 sm:pr-4 rounded-full transition-all duration-200 flex items-center justify-between group cursor-pointer ${isSelected
                ? "scale-[1.01]"
                : "hover:brightness-96 hover:shadow-xs hover:scale-[1.005]"
              }`}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div
                style={{ backgroundColor: cat?.iconBg || "#82BBE4" }}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-[0_2px_6px_rgba(0,0,0,0.12)] text-white transition-transform duration-200 group-hover:scale-105 overflow-hidden p-2"
              >
                {cat?.icon ? (
                  <Image
                    src={cat?.icon}
                    alt={cat.name}
                    width={24}
                    height={24}
                    unoptimized
                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                  />
                ) : (
                  <BookOpen size={20} strokeWidth={2.2} className="text-white" />
                )}
              </div>

              <div className="min-w-0">
                <h3
                  className={`text-[13px] truncate font-semibold ${isSelected ? "text-gray-950 font-bold" : "text-gray-800"
                    }`}
                >
                  {cat.name}
                </h3>
              </div>
            </div>

            <span className="text-xs sm:text-[12.5px] font-semibold text-gray-500 shrink-0 ml-2">
              {deckCount ?? "0"} Decks
            </span>
          </Link>
        );
      })}
    </div>
  );
}
