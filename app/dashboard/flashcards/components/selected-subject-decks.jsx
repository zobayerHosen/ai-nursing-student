"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  ChevronDown,
  Menu,
  GraduationCap,
  Bookmark,
  Layers,
} from "lucide-react";

export default function SelectedSubjectDecks({
  activeCategory,
  categoriesCount = 0,
  onOpenMobileSidebar,
  onToggleBookmark,
}) {
  const [expandedDeckIds, setExpandedDeckIds] = useState({});

  const toggleDeckDropdown = (e, deckId) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedDeckIds((prev) => ({
      ...prev,
      [deckId]: !prev[deckId],
    }));
  };

  return (
    <div className="lg:col-span-8 xl:col-span-8.5 space-y-5 sm:space-y-6">
      {/* Mobile Menu Bar (visible on mobile only) */}
      <div className="lg:hidden flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-gray-200/80 shadow-2xs">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="inline-flex items-center gap-2 px-3 py-2 bg-[#EDF5F9] hover:bg-[#D5EBF5] text-[#1B4B66] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
        >
          <Menu size={18} strokeWidth={2.2} />
          <span>Topics Menu</span>
          <span className="text-[11px] font-semibold text-[#1B4B66] bg-white px-1.5 py-0.5 rounded-md">
            {categoriesCount}
          </span>
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-xs text-gray-400 hidden sm:inline">Active:</span>
          <span className="text-xs sm:text-sm font-bold text-[#1B4B66] truncate max-w-45">
            {activeCategory?.name}
          </span>
        </div>
      </div>

      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div className="flex items-center gap-3.5 min-w-0">
          {activeCategory && (
            <div
              style={{ backgroundColor: activeCategory.iconBg || "#82BBE4" }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] shrink-0 overflow-hidden p-2.5"
            >
              {activeCategory.icon ? (
                <Image
                  src={activeCategory.icon}
                  alt={activeCategory.name}
                  width={28}
                  height={28}
                  unoptimized
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <BookOpen size={22} strokeWidth={2.2} className="text-white" />
              )}
            </div>
          )}
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4B66] tracking-tight truncate">
              {activeCategory?.name || "Nursing Fundamentals"}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Select a deck to start practicing with flashcards
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white border border-gray-100 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto shrink-0">
          <span>{activeCategory?.decks?.length ?? 0} Decks Ready</span>
        </div>
      </div>

      {/* Decks Grid or Empty State */}
      {activeCategory?.decks && activeCategory.decks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 items-start">
          {activeCategory?.decks?.map((deck) => {
            const cardCount = deck.card_count ?? 0;
            const hasSubcategories = Boolean(
              deck?.deck_sub_category ||
                (Array.isArray(deck?.subcategories) && deck.subcategories.length > 0)
            );
            const isExpanded = !!expandedDeckIds[deck.id];
            const subcategories = Array.isArray(deck?.subcategories)
              ? deck.subcategories
              : [];

            if (hasSubcategories) {
              return (
                <div
                  key={deck.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5  border-gray-100 hover:border-[#1B4B66]/30 p-5 shadow-xs hover:shadow-md`}
                >
                  <div className="space-y-3">
                    <div className="w-full flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <p className="w-9 h-9 rounded-xl bg-[#EDF5F9] text-[#1B4B66] flex items-center justify-center">
                          <Layers size={18} strokeWidth={2.2} />
                        </p>
                        <span className="text-[11px] font-bold text-[#1B4B66] bg-[#EDF5F9] px-2 py-0.5 rounded-md">
                          {subcategories.length} Subtopics
                        </span>
                      </div>

                      <button
                        type="button"
                        className="cursor-pointer p-1 rounded-lg hover:bg-gray-100 text-[#1B4B66] transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark?.(e, deck);
                        }}
                        title={
                          deck.is_favorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <Bookmark
                          size={20}
                          className={
                            deck.is_favorite
                              ? "fill-[#1B4B66] text-[#1B4B66]"
                              : "text-gray-300 hover:text-[#1B4B66]"
                          }
                        />
                      </button>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#1E293B] line-clamp-2">
                        {deck.name ?? "N/F"}
                      </h3>
                      {deck.description ? (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {deck.description ?? "N/F"}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Dropdown / Subcategories Accordion Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 animate-[fadeIn_0.2s_ease]">
                      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        Select Subtopic
                      </p>
                      {subcategories?.length > 0 ? (
                        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                          {subcategories?.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/dashboard/flashcards/${deck.id}`}
                              className="group/sub flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-[#EDF5F9] border border-slate-100 hover:border-[#1B4B66]/30 transition-all cursor-pointer text-left"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-5 h-5 rounded-md bg-white text-[#1B4B66] flex items-center justify-center shrink-0 border border-gray-100 shadow-2xs">
                                  <BookOpen size={12} strokeWidth={2.2} />
                                </div>
                                <span className="text-xs font-semibold text-gray-800 group-hover/sub:text-[#1B4B66] truncate">
                                  {sub.name}
                                </span>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                <span className="text-[10px] font-bold text-[#1B4B66] bg-white px-1.5 py-0.5 rounded border border-gray-100">
                                  {sub.cards_total ?? sub.card_count ?? 0} Cards
                                </span>
                                <ChevronRight
                                  size={13}
                                  className="text-[#1B4B66] group-hover/sub:translate-x-0.5 transition-transform"
                                />
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="py-3 text-center text-xs text-gray-400">
                          No subtopics available
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-50">
                    <span className="text-xs font-bold text-[#1B4B66] bg-[#EDF5F9] px-2.5 py-1 rounded-md">
                      {cardCount ?? "0"} Cards
                    </span>

                    <button
                      type="button"
                      onClick={(e) => toggleDeckDropdown(e, deck.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4B66] hover:text-[#13384e] bg-[#EDF5F9] hover:bg-[#D5EBF5] px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Subtopics" : "Sub Topic List"}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            }

            // Direct deck (no subcategories)
            return (
              <Link
                key={deck.id}
                href={`/dashboard/flashcards/${deck.id}`}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-[#1B4B66]/30 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
              >
                <div className="space-y-3">
                  <div className="w-full flex justify-between items-center">
                    <p className="w-9 h-9 rounded-xl bg-[#EDF5F9] text-[#1B4B66] flex items-center justify-center group-hover:bg-[#1B4B66] group-hover:text-white transition-colors duration-200">
                      <BookOpen size={18} strokeWidth={2.2} />
                    </p>

                    <button
                      type="button"
                      className="cursor-pointer p-1 rounded-lg hover:bg-gray-100 text-[#1B4B66] transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onToggleBookmark?.(e, deck);
                      }}
                      title={
                        deck.is_favorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <Bookmark
                        size={20}
                        className={
                          deck.is_favorite
                            ? "fill-[#1B4B66] text-[#1B4B66]"
                            : "text-gray-300 hover:text-[#1B4B66]"
                        }
                      />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#1E293B] group-hover:text-[#1B4B66] transition-colors line-clamp-2">
                      {deck.name ?? "N/F"}
                    </h3>
                    {deck.description ? (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {deck.description ?? "N/F"}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-xs font-bold text-[#1B4B66] bg-[#EDF5F9] px-2.5 py-1 rounded-md">
                    {cardCount ?? "0"} Cards
                  </span>

                  <div className="flex items-center gap-1 text-xs font-bold text-[#1B4B66] group-hover:translate-x-1 transition-transform">
                    <span>Start</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-16 text-center shadow-xs">
          <div
            style={{ backgroundColor: activeCategory?.pillBg || "#EDF5F9" }}
            className="h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xs"
          >
            <GraduationCap
              size={38}
              strokeWidth={1.8}
              style={{ color: activeCategory?.iconBg || "#1B4B66" }}
            />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1E293B] mb-2">
            No Decks in {activeCategory?.name || "this category"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            There are currently no flashcard decks available for this category. New study modules and practice questions will be added here soon.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-50 border border-gray-200 text-gray-600">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Content in development
          </div>
        </div>
      )}
    </div>
  );
}
