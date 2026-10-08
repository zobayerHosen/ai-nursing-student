"use client";

import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { useGetFlashcardCategory, useToggleFavoriteDeck } from "@/hooks/flashcards";
import { getCategoryColor } from "./dummy-data";
import toast from "react-hot-toast";
import SelectedSubjectDecks from "./selected-subject-decks";
import TopicCategoryList from "./topic-category-list";

export default function BrowseDecksTab() {
  const { flashcardData, isLoading } = useGetFlashcardCategory();
  const { toggleFavorite } = useToggleFavoriteDeck();

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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

  return (
    <div className="w-full animate-[fadeIn_0.3s_ease] relative">
      {/* MOBILE DRAWER SIDEBAR (SMOOTH SLIDE FROM LEFT) */}
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
            <TopicCategoryList
              isLoading={isLoading}
              categoriesList={categoriesList}
              activeCategoryId={activeCategory?.id}
              onSelectCategory={setSelectedCategoryId}
              onItemClick={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* DESKTOP LEFT COLUMN: Practice by Nursing Topic  */}
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
              <TopicCategoryList
                isLoading={isLoading}
                categoriesList={categoriesList}
                activeCategoryId={activeCategory?.id}
                onSelectCategory={setSelectedCategoryId}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Subject Decks */}
        <SelectedSubjectDecks
          activeCategory={activeCategory}
          categoriesCount={categoriesList.length}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onToggleBookmark={handleToggleBookmark}
        />
      </div>
    </div>
  );
}

