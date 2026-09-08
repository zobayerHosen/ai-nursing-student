"use client";

import { useState } from "react";
import {
  Stethoscope,
  BookOpen,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useGetFlashcardCategory } from "@/hooks/flashcards";
import FlashcardPlayer from "../[topic]/components/flashcard-player";
import { DEFAULT_CATEGORIES, getCategoryIcon } from "./dummy-data";

export default function BrowseDecksTab() {

  const { flashcardData, isLoading } = useGetFlashcardCategory();
  const [selectedCategoryId, setSelectedCategoryId] = useState("fundamentals-of-nursing");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Combine API categories with defaults so UI is always comprehensive
  let categoriesList = [];

  if (flashcardData && flashcardData.length > 0) {
    categoriesList = flashcardData.map((cat, idx) => {
      let totalCatDecks = 0;
      const subtopics = [];

      cat.subcategories?.forEach((sub) => {
        totalCatDecks += sub.cards?.length || 0;
        sub.cards?.forEach((card) => {
          subtopics.push({
            id: card.id,
            name: card.name || sub.name,
            questions: card.questions || [],
            categoryId: cat.id,
            subcategoryId: sub.id,
          });
        });
      });
      return {
        id: cat.id?.toString() || `cat-${idx}`,
        name: cat.name,
        deckCount: totalCatDecks || 120 + idx * 15,
        icon: getCategoryIcon(cat.name),
        topics: subtopics.length > 0 ? subtopics : DEFAULT_CATEGORIES[idx % DEFAULT_CATEGORIES.length]?.topics || [],
      };
    });
  } else {
    categoriesList = DEFAULT_CATEGORIES;
  }

  // Active category
  const activeCategory =
    categoriesList.find((c) => c.id.toString() === selectedCategoryId.toString()) ||
    categoriesList[0] ||
    DEFAULT_CATEGORIES[0];

  // If a topic is actively selected to practice, render FlashcardPlayer
  if (selectedTopic) {
    return (
      <div className="w-full">
        <FlashcardPlayer
          topic={selectedTopic}
          onBack={() => setSelectedTopic(null)}
          categoryId={selectedTopic.categoryId || activeCategory?.id}
          subcategoryId={selectedTopic.subcategoryId || 1}
        />
      </div>
    );
  }

  // Helper to render topic category list
  const renderTopicSelectorList = (onItemClick) => (
    <div className="space-y-2">
      {isLoading && categoriesList.length === 0 ? (
        <div className="py-8 text-center text-xs text-gray-400">
          Loading topics...
        </div>
      ) : (
        categoriesList.map((cat) => {
          const Icon = cat.icon || Stethoscope;
          const isSelected = activeCategory?.id?.toString() === cat.id?.toString();

          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategoryId(cat.id);
                if (onItemClick) onItemClick();
              }}
              className={`w-full text-left p-3 sm:p-3.5 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                isSelected
                  ? "bg-[#EDF5F9] border border-[#B3D6E8] text-[#1B4B66] shadow-xs"
                  : "bg-white hover:bg-gray-50/80 border border-transparent text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-[#D5EBF5] text-[#1B4B66]"
                      : "bg-gray-100 text-gray-500 group-hover:bg-[#EDF5F9] group-hover:text-[#1B4B66]"
                  }`}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </div>

                <div className="min-w-0">
                  <h3
                    className={`text-sm font-semibold truncate ${
                      isSelected ? "text-[#1B4B66]" : "text-gray-800"
                    }`}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">
                    {cat.deckCount || cat.topics?.length || 15} Decks
                  </p>
                </div>
              </div>

              <ChevronRight
                size={16}
                className={`transition-transform duration-200 shrink-0 ${
                  isSelected
                    ? "text-[#1B4B66] translate-x-0.5"
                    : "text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5"
                }`}
              />
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
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3.5 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 sticky top-24">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1B4B66]">
                Practice by Nursing Topic
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1 leading-relaxed">
                Choose a subject or build a custom decks from multiple topics.
              </p>
            </div>

            {/* Topic Selector List */}
            <div className="mt-5">
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4B66] tracking-tight">
                {activeCategory?.name || "Fundamentals Of Nursing"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Select a topic to start practicing with flashcards
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-white border border-gray-100 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto">
              <span>{activeCategory?.topics?.length || 0} Modules Ready</span>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {activeCategory?.topics?.map((topic, index) => {
              const cardCount = topic.questions?.length || 15;

              return (
                <div
                  key={topic.id || index}
                  onClick={() => setSelectedTopic(topic)}
                  className="group bg-white rounded-2xl border border-gray-100 hover:border-[#1B4B66]/30 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-0.5"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EDF5F9] text-[#1B4B66] flex items-center justify-center group-hover:bg-[#1B4B66] group-hover:text-white transition-colors duration-200">
                      <BookOpen size={18} strokeWidth={2.2} />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#1E293B] group-hover:text-[#1B4B66] transition-colors line-clamp-2">
                        {topic.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        Master key NCLEX principles, diagnostics, and clinical interventions.
                      </p>
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
        </div>
      </div>
    </div>
  );
}
