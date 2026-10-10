"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Menu,
  X,
  GraduationCap,
  ChevronRight,
} from "lucide-react";
import { useGetFlashcardCategory, useGetAllDecks } from "@/hooks/flashcards";
import { getCategoryColor } from "@/app/dashboard/flashcards/components/dummy-data";
import TopicCategoryList from "@/app/dashboard/flashcards/components/topic-category-list";

export default function DectListClient({ id }) {
  const router = useRouter();
  const { flashcardData, isLoading: isCategoriesLoading } = useGetFlashcardCategory();

  const [selectedCategoryId, setSelectedCategoryId] = useState(id || null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Map API categories with background colors from dummy data
  const categoriesList = useMemo(() => {
    if (!Array.isArray(flashcardData)) return [];
    return flashcardData.map((cat, idx) => {
      const color = getCategoryColor(cat.name, idx);

      return {
        ...cat,
        pillBg: color.pillBg,
        iconBg: color.iconBg,
        accentColor: color.accentColor,
      };
    });
  }, [flashcardData]);

  // Keep route param in sync with state
  useEffect(() => {
    if (id) {
      setSelectedCategoryId(id);
    } else if (!selectedCategoryId && categoriesList.length > 0) {
      setSelectedCategoryId(categoriesList[0]?.id);
    }
  }, [id, categoriesList, selectedCategoryId]);

  // Current active category
  const activeCategory = useMemo(() => {
    if (!selectedCategoryId || categoriesList.length === 0)
      return categoriesList[0] || null;
    return (
      categoriesList.find(
        (cat) => String(cat.id) === String(selectedCategoryId)
      ) ||
      categoriesList[0] ||
      null
    );
  }, [categoriesList, selectedCategoryId]);

  // Fetch decks for active category
  const {
    allDecks = [],
    isLoading: isDecksLoading,
    isError: isDecksError,
  } = useGetAllDecks(activeCategory?.id);

  const handleSelectCategory = (catId) => {
    setSelectedCategoryId(catId);
    router.push(`/dashboard/flashcards/all-dec-list/${catId}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-6 sm:py-8 space-y-6 animate-[fadeIn_0.3s_ease] relative">
      {/* MOBILE DRAWER SIDEBAR */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileSidebarOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
            isMobileSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileSidebarOpen(false)}
        />

        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[85%] sm:w-80 max-w-sm bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
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

          <div className="p-4 overflow-y-auto flex-1">
            <TopicCategoryList
              isLoading={isCategoriesLoading}
              categoriesList={categoriesList}
              activeCategoryId={activeCategory?.id}
              onSelectCategory={(catId) => {
                handleSelectCategory(catId);
                setIsMobileSidebarOpen(false);
              }}
            />
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* DESKTOP LEFT COLUMN: Practice by Nursing Topic */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <div className="mb-4 px-4 pt-4">
              <h2 className="text-lg sm:text-xl font-bold text-[#1B4B66]">
                Practice by Nursing Topic
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1 leading-relaxed">
                Choose a subject or build custom decks from multiple topics.
              </p>
            </div>

            {/* Topic Selector List */}
            <div className="max-h-[calc(100vh-220px)] overflow-y-auto px-4 py-4">
              <TopicCategoryList
                isLoading={isCategoriesLoading}
                categoriesList={categoriesList}
                activeCategoryId={activeCategory?.id}
                onSelectCategory={handleSelectCategory}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Selected Subject Decks */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-5">
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-gray-200/80 shadow-2xs">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-[#EDF5F9] hover:bg-[#D5EBF5] text-[#1B4B66] rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Menu size={18} strokeWidth={2.2} />
              <span>Topics Menu</span>
              <span className="text-[11px] font-semibold text-[#1B4B66] bg-white px-1.5 py-0.5 rounded-md">
                {categoriesList.length}
              </span>
            </button>

            <span className="text-xs sm:text-sm font-bold text-[#1B4B66] truncate max-w-48">
              {activeCategory?.name}
            </span>
          </div>

          {/* Category Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight">
              {activeCategory?.name || "Fundamentals Of Nursing"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Select a topic to start practicing with flashcards
            </p>
          </div>

          {/* Decks Grid */}
          {isDecksLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 animate-pulse shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-200" />
                    <div className="h-4 bg-gray-200 rounded-md w-36" />
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="h-3 bg-gray-100 rounded-md w-16" />
                    <div className="h-3 bg-gray-100 rounded-md w-12" />
                  </div>
                </div>
              ))}
            </div>
          ) : isDecksError ? (
            <div className="bg-white rounded-2xl border border-red-100 p-10 text-center shadow-xs">
              <p className="text-sm text-red-600 font-semibold mb-2">
                Failed to load decks for this category.
              </p>
            </div>
          ) : allDecks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-[#EDF5F9] text-[#1B4B66] flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={32} />
              </div>
              <h2 className="text-lg font-bold text-[#1E293B] mb-1">
                No Decks in {activeCategory?.name || "this category"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
                There are currently no flashcard decks available for this category. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {allDecks?.map((deck) => {
                return (
                  <Link
                    key={deck.id}
                    href={`/dashboard/flashcards/${deck.id}`}
                    className="bg-white rounded-2xl border border-gray-100/90 hover:border-gray-200 shadow-2xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-0.5 cursor-pointer"
                  >
                    {/* Top right subtle decorative accent */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#F8FAFC] rounded-bl-3xl border-b border-l border-gray-100/60 pointer-events-none" />

                    <div className="space-y-4">
                      {/* Top row: Icon + Title */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-700">
                          {deck.icon ? (
                            <Image
                              src={deck.icon}
                              alt={deck.name}
                              width={18}
                              height={18}
                              unoptimized
                              className="w-4 h-4 object-contain"
                            />
                          ) : (
                            <BookOpen size={16} strokeWidth={2} />
                          )}
                        </div>

                        <h3 className="text-base font-bold text-[#1E293B] group-hover:text-[#1B4B66] transition-colors line-clamp-1 pr-6">
                          {deck.name}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-50">
                      <span className="text-xs font-bold text-gray-500 tracking-wider uppercase">
                        {deck?.card_count ?? "0"} Cards
                      </span>

                      <div className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#1B4B66] group-hover:translate-x-0.5 transition-transform">
                        <span>Start</span>
                        <ChevronRight size={15} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
