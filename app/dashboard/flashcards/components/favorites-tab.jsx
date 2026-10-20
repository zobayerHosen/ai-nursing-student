"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  ArrowRight,
  GraduationCap,
  Search,
  Grid,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import FlashcardPlayer from "../[topic]/components/flashcard-player";
import {
  useGetFavoriteDecks,
  useToggleFavoriteDeck,
  useGetFlashcardCategory,
} from "@/hooks/flashcards";
import toast from "react-hot-toast";

// Static categories fallback for flashcards
const STATIC_CATEGORIES = [
  { id: "1", name: "Nursing Fundamentals" },
  { id: "2", name: "Health Assessment" },
  { id: "3", name: "Pharmacology" },
  { id: "4", name: "Dosage Calculations" },
  { id: "5", name: "Medical Surgical Nursing" },
  { id: "6", name: "ECG Interpretation" },
  { id: "7", name: "Fluids, Electrolytes" },
  { id: "8", name: "Maternal & Newborn" },
  { id: "9", name: "Pediatric Nursing" },
  { id: "10", name: "Mental Health Nursing" },
  { id: "11", name: "Critical Care" },
  { id: "12", name: "Clinical Skills" },
  { id: "13", name: "Laboratory Values" },
  { id: "14", name: "Geriatric Nursing" },
  { id: "15", name: "Community Health" },
  { id: "16", name: "Nutrition" },
];

export default function FavoritesTab({ onStudyTopic }) {
  const { favoriteDecks = [], isLoading } = useGetFavoriteDecks();
  const { toggleFavorite } = useToggleFavoriteDeck();
  const { flashcardData } = useGetFlashcardCategory();

  const [activeStudyTopic, setActiveStudyTopic] = useState(null);
  const [removedDeckIds, setRemovedDeckIds] = useState(new Set());

  // Filter & Search states (matching favorites-view.jsx)
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recently_added");

  // Debounce search query input by 350ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Categories list
  const categories = useMemo(() => {
    if (Array.isArray(flashcardData) && flashcardData.length > 0) {
      return flashcardData.map((cat) => ({
        id: String(cat.id),
        name: cat.name || cat.title || "Category",
      }));
    }
    return STATIC_CATEGORIES;
  }, [flashcardData]);

  // Sort Options
  const sortOptions = useMemo(
    () => [
      { key: "recently_added", label: "Recently Added" },
      { key: "most_popular", label: "Most Popular" },
      { key: "alphabetical", label: "Alphabetical" },
    ],
    []
  );

  // Normalize decks from API (handling flat objects and nested { deck: {...} } objects)
  const normalizedDecks = useMemo(() => {
    if (!Array.isArray(favoriteDecks)) return [];
    return favoriteDecks
      .map((item) => {
        if (item?.deck && typeof item.deck === "object") {
          return {
            ...item.deck,
            favorite_id: item.id,
          };
        }
        return item;
      })
      .filter((deck) => deck && deck.id != null);
  }, [favoriteDecks]);

  const activeDecks = useMemo(() => {
    return normalizedDecks.filter((deck) => !removedDeckIds.has(deck.id));
  }, [normalizedDecks, removedDeckIds]);

  // Filtered & Sorted decks
  const filteredDecks = useMemo(() => {
    let result = [...activeDecks];

    // Filter by Category
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((deck) => {
        const catId = String(deck.category_id || deck.categoryId || deck.category || "");
        const catName = (deck.category_name || "").toLowerCase().trim();
        const selectedCatObj = categories.find(
          (c) => String(c.id) === String(selectedCategory)
        );
        const targetName = selectedCatObj ? selectedCatObj.name.toLowerCase().trim() : "";

        return (
          catId === String(selectedCategory) ||
          (targetName && catName.includes(targetName)) ||
          catName === targetName
        );
      });
    }

    // Filter by Debounced Search
    if (debouncedSearch && debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      result = result.filter((deck) => {
        const name = (deck.name || "").toLowerCase();
        const desc = (deck.description || "").toLowerCase();
        const cat = (deck.category_name || "").toLowerCase();
        return name.includes(q) || desc.includes(q) || cat.includes(q);
      });
    }

    // Sort
    if (selectedSort === "alphabetical") {
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (selectedSort === "most_popular") {
      result.sort((a, b) => (b.card_count ?? 0) - (a.card_count ?? 0));
    }

    return result;
  }, [activeDecks, selectedCategory, debouncedSearch, selectedSort, categories]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedSort !== "recently_added";

  const handleClearFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedCategory("all");
    setSelectedSort("recently_added");
  };

  const handleToggleBookmark = (deck, e) => {
    e.stopPropagation();
    if (!deck?.id) return;

    setRemovedDeckIds((prev) => {
      const next = new Set(prev);
      next.add(deck.id);
      return next;
    });

    toggleFavorite(deck.id)
      .then((res) => {
        toast.success(res?.message || "Removed from favorites");
      })
      .catch((err) => {
        setRemovedDeckIds((prev) => {
          const next = new Set(prev);
          next.delete(deck.id);
          return next;
        });
        toast.error(err?.response?.data?.message || "Failed to update favorite status");
      });
  };

  const handleStudy = (deck) => {
    if (onStudyTopic) {
      onStudyTopic(deck);
    } else {
      setActiveStudyTopic(deck);
    }
  };

  if (activeStudyTopic) {
    return (
      <div className="w-full">
        <FlashcardPlayer
          topic={activeStudyTopic}
          deckId={activeStudyTopic.id}
          onBack={() => setActiveStudyTopic(null)}
          categoryId={activeStudyTopic.categoryId || 1}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 animate-[fadeIn_0.3s_ease]">
      {/* Filter & Search Bar (same design as video-lessons favorites-view) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your saved flashcards..."
            className="w-full pl-10 pr-4 py-2.5 bg-white text-xs sm:text-sm border border-[#e2e8f0] rounded-xl outline-none focus:border-info transition-colors shadow-2xs"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-[#e2e8f0] rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-[#0f172a] outline-none cursor-pointer shadow-2xs"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Grid className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="appearance-none bg-white border border-[#e2e8f0] rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-[#0f172a] outline-none cursor-pointer shadow-2xs"
            >
              {sortOptions.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-3.5 sm:p-4 shadow-2xs flex gap-3.5 animate-pulse"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-200 shrink-0" />
              <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5 space-y-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-20 bg-gray-200 rounded-md" />
                    <div className="h-4 w-4 bg-gray-200 rounded" />
                  </div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded-md" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded-md" />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="h-4 w-16 bg-gray-100 rounded-md" />
                  <div className="h-4 w-12 bg-gray-200 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredDecks && filteredDecks.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDecks.map((deck) => {
              return (
                <div
                  key={deck.id}
                  onClick={() => handleStudy(deck)}
                  className="bg-white rounded-xl border border-[#1B4B66]/30 hover:border-[#1B4B66]/50 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm transition-all duration-200 flex gap-3.5 relative group cursor-pointer hover:-translate-y-0.5"
                >
                  {/* Left Thumbnail */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-gray-50 border border-gray-100 shrink-0 overflow-hidden relative flex items-center justify-center">
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage: `linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)`,
                        backgroundSize: `12px 12px`,
                        backgroundPosition: `0 0, 0 6px, 6px -6px, -6px 0px`,
                      }}
                    />
                    <GraduationCap
                      size={24}
                      className="text-[#1B4B66]/30 relative z-10"
                    />
                  </div>

                  {/* Right Card Information */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      {/* Top: Category Tag & Bookmark */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">
                          {deck.category_name || "Nursing"}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleToggleBookmark(deck, e)}
                          className="text-[#1B4B66] hover:opacity-80 transition-opacity p-0.5 cursor-pointer z-10"
                          aria-label="Remove from favorites"
                          title="Remove from favorites"
                        >
                          <Bookmark
                            size={18}
                            className="fill-[#1B4B66] text-[#1B4B66]"
                          />
                        </button>
                      </div>

                      {/* Title */}
                      <h3 className="text-xs sm:text-[13px] font-bold text-gray-800 leading-snug line-clamp-1 mt-1">
                        {deck.name}
                      </h3>

                      {/* Decks Count / Description */}
                      <p className="text-[11px] text-gray-400 font-medium mt-0.5 line-clamp-1">
                        {deck.description || `${deck.card_count ?? 0} Cards`}
                      </p>
                    </div>

                    {/* Progress Bar & Study Action */}
                    <div className="mt-2.5">
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[11px] font-bold text-[#1B4B66] bg-[#EDF5F9] px-2 py-0.5 rounded-md">
                          {deck.card_count ?? 0} Cards
                        </span>
                        <span className="text-xs font-bold text-[#1B4B66] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          Study <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Showing count text */}
          <div className="text-xs text-gray-400 font-medium pt-2">
            Showing <span className="font-bold text-gray-700">{filteredDecks.length}</span> favorite deck{filteredDecks.length !== 1 ? "s" : ""}
          </div>
        </div>
      ) : hasActiveFilters ? (
        <div className="bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 p-10 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#EDF5F9] border border-[#1B4B66]/20 flex items-center justify-center text-[#1B4B66] mb-3 shadow-xs">
            <GraduationCap className="w-6 h-6 text-[#1B4B66]" />
          </div>
          <h3 className="text-base font-bold text-[#0f172a] mb-1">
            No saved flashcards found
          </h3>
          <p className="text-xs sm:text-sm text-[#64748b] max-w-sm">
            No favorite flashcards match your search or filter criteria.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-4 px-4 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-[#1B4B66] transition-colors cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 sm:p-16 text-center shadow-xs">
          <div className="h-16 w-16 bg-[#EDF5F9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1B4B66]">
            <GraduationCap size={32} strokeWidth={2} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#1E293B] mb-1.5">
            No favorite decks yet
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            Bookmark decks while browsing to save them here for quick access and daily practice!
          </p>
        </div>
      )}
    </div>
  );
}
