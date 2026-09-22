"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  BookOpen,
  ChevronRight,
  Menu,
  X,
  GraduationCap,
  Bookmark,
} from "lucide-react";
import { useGetFlashcardCategory, useToggleFavoriteDeck } from "@/hooks/flashcards";
import FlashcardPlayer from "../[topic]/components/flashcard-player";
import { getCategoryColor } from "./dummy-data";
import toast from "react-hot-toast";

export default function BrowseDecksTab() {
  const { flashcardData, isLoading } = useGetFlashcardCategory();
  const { toggleFavorite } = useToggleFavoriteDeck();

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleBookmark = (e, deck) => {
    e.stopPropagation();
    if (!deck?.id) return;

    toggleFavorite(deck.id)
      .then(() => {
        toast.success(deck.is_favorite ? "Removed from favorites" : "Added to favorites");
      })
      .catch(() => {
        toast.error("Failed to update favorite status");
      });
  };

  // Map API categories with background colors from dummy data
  const categoriesList = useMemo(() => {
    if (!Array.isArray(flashcardData)) return [];
    return flashcardData.map((cat, idx) => {
      const color = getCategoryColor(cat.name, idx);
      const decks = Array.isArray(cat.decks)
        ? cat.decks
        : Array.isArray(cat.subcategories)
        ? cat.subcategories
        : [];

      return {
        ...cat,
        pillBg: color.pillBg,
        iconBg: color.iconBg,
        accentColor: color.accentColor,
        decks,
      };
    });
  }, [flashcardData]);

  // Active category
  const activeCategory =
    categoriesList.find((c) => c.id?.toString() === selectedCategoryId?.toString()) ||
    categoriesList[0] ||
    null;

  // If a deck is actively selected to practice, render FlashcardPlayer
  if (selectedTopic) {
    return (
      <div className="w-full">
        <FlashcardPlayer
          topic={selectedTopic}
          deckId={selectedTopic.id}
          onBack={() => setSelectedTopic(null)}
          categoryId={selectedTopic.categoryId || activeCategory?.id}
        />
      </div>
    );
  }

  // Helper to render topic category list with custom background colors
  const renderTopicSelectorList = (onItemClick) => (
    <div className="space-y-2.5 sm:space-y-4 mx-3 my-4">
      {isLoading ? (
        <div className="py-8 text-center text-xs text-gray-400">
          Loading topics...
        </div>
      ) : categoriesList.length === 0 ? (
        <div className="py-8 text-center text-xs text-gray-400">
          No categories found
        </div>
      ) : (
        categoriesList?.map((cat) => {
          const isSelected = activeCategory?.id?.toString() === cat.id?.toString();

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategoryId(cat.id);
                if (onItemClick) onItemClick();
              }}
              style={{
                backgroundColor: cat?.pillBg || "#F1F5F9",
                boxShadow: isSelected
                  ? `0 0 0 2px #ffffff, 0 0 0 4px ${cat?.iconBg || "#3B82F6"}, 0 6px 16px -2px rgba(0,0,0,0.08)`
                  : undefined,
              }}
              className={`w-full text-left p-1.5 sm:p-2 pr-3.5 sm:pr-4 rounded-full transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                isSelected
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
                    className={`text-[13px] truncate font-semibold ${
                      isSelected ? "text-gray-950 font-bold" : "text-gray-800"
                    }`}
                  >
                    {cat.name}
                  </h3>
                </div>
              </div>

              <span className="text-xs sm:text-[12.5px] font-semibold text-gray-500 shrink-0 ml-2">
                {cat.decks?.length ?? 0} Decks
              </span>
            </button>
          );
        })
      )}
    </div>
  );

  return (
    <div className="w-full animate-[fadeIn_0.3s_ease] relative">
      {/* ─── MOBILE DRAWER SIDEBAR (SMOOTH SLIDE FROM LEFT) ───────── */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileSidebarOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
            isMobileSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileSidebarOpen(false)}
        />

        {/* Drawer Sliding Panel */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[85%] sm:w-80 max-w-sm bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1B4B66]">
                Practice by Nursing Topic
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Choose a subject or build custom decks
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-4 overflow-y-auto flex-1">
            {renderTopicSelectorList(() => setIsMobileSidebarOpen(false))}
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ─── DESKTOP LEFT COLUMN: Practice by Nursing Topic ─────────── */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-2.5 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 sticky top-24">
            <div className="mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#1B4B66]">
                Practice by Nursing Topic
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1 leading-relaxed">
                Choose a subject or build custom decks from multiple topics.
              </p>
            </div>

            {/* Topic Selector List */}
            <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
              {renderTopicSelectorList()}
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Selected Subject Decks ──────────────────── */}
        <div className="lg:col-span-8 xl:col-span-8.5 space-y-5 sm:space-y-6">
          {/* Mobile Menu Bar (visible on mobile only) */}
          <div className="lg:hidden flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-gray-200/80 shadow-2xs">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-[#EDF5F9] hover:bg-[#D5EBF5] text-[#1B4B66] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <Menu size={18} strokeWidth={2.2} />
              <span>Topics Menu</span>
              <span className="text-[11px] font-semibold text-[#1B4B66] bg-white px-1.5 py-0.5 rounded-md">
                {categoriesList.length}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {activeCategory.decks.map((deck) => {
                const cardCount = deck.card_count ?? deck.cards?.length ?? 0;

                return (
                  <div
                    key={deck.id}
                    onClick={() => setSelectedTopic({ ...deck, categoryId: activeCategory.id })}
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
                          onClick={(e) => handleToggleBookmark(e, deck)}
                          title={deck.is_favorite ? "Remove from favorites" : "Add to favorites"}
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
                          {deck.name}
                        </h3>
                        {deck.description ? (
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {deck.description}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-xs font-bold text-[#1B4B66] bg-[#EDF5F9] px-2.5 py-1 rounded-md">
                        {cardCount} Cards
                      </span>

                      <div className="flex items-center gap-1 text-xs font-bold text-[#1B4B66] group-hover:translate-x-1 transition-transform">
                        <span>Start</span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
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
      </div>
    </div>
  );
}
