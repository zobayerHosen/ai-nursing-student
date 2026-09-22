"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bookmark,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  MessageSquare,
  X,
  ChevronRight,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import FlashcardPlayer from "../[topic]/components/flashcard-player";
import { useGetFavoriteDecks, useToggleFavoriteDeck } from "@/hooks/flashcards";
import { LEARNING_READINESS_STATS } from "./dummy-data";
import toast from "react-hot-toast";

export default function FavoritesTab({ onStudyTopic }) {
  const { favoriteDecks, isLoading } = useGetFavoriteDecks();
  const { toggleFavorite } = useToggleFavoriteDeck();
  const [showCaraCard, setShowCaraCard] = useState(true);
  const [activeStudyTopic, setActiveStudyTopic] = useState(null);

  const handleToggleBookmark = (deck, e) => {
    e.stopPropagation();
    if (!deck?.id) return;

    toggleFavorite(deck.id)
      .then(() => {
        toast.success("Removed from favorites");
      })
      .catch(() => {
        toast.error("Failed to update favorite status");
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

  // Multi-segment Donut Chart Calculations for "How you're Learning"
  const radius = 42;
  const circumference = 2 * Math.PI * radius; // ~263.89
  const segments = LEARNING_READINESS_STATS.segments;
  let accumulated = 0;

  return (
    <div className="w-full animate-[fadeIn_0.3s_ease]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ─── LEFT COLUMN: Favorites List (approx 7-8 cols) ─────────── */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B4B66] tracking-tight mb-5">
              Favorites
            </h2>

            {isLoading ? (
              <div className="py-12 text-center text-sm text-gray-400">
                Loading favorite decks...
              </div>
            ) : favoriteDecks && favoriteDecks.length > 0 ? (
              <>
                {/* 2-column Grid of Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {favoriteDecks.map((deck) => {
                    return (
                      <div
                        key={deck.id}
                        onClick={() => handleStudy(deck)}
                        className="bg-white rounded-xl border border-[#1B4B66]/30 hover:border-[#1B4B66]/50 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm transition-all duration-200 flex gap-3.5 relative group cursor-pointer"
                      >
                        {/* Left Thumbnail Placeholder */}
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
                                className="text-[#1B4B66] hover:opacity-80 transition-opacity p-0.5 cursor-pointer"
                                aria-label="Bookmark"
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
                <div className="mt-5 text-xs text-gray-400 font-medium">
                  Showing <span className="font-bold text-gray-700">{favoriteDecks.length}</span> favorite deck{favoriteDecks.length !== 1 ? 's' : ''}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-14 text-center shadow-xs">
                <div className="h-18 w-18 bg-[#EDF5F9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1B4B66]">
                  <GraduationCap size={36} strokeWidth={2} />
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
        </div>

        {/* ─── RIGHT COLUMN: Cards to Review, Learning, CARA AI (4 cols) ── */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. Cards to Review Widget */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 space-y-4">
            <h3 className="text-base font-bold text-[#1B4B66]">Cards to Review</h3>

            <div className="space-y-2.5">
              {/* Hard Cards */}
              <div className="border border-gray-100 hover:border-amber-200 rounded-xl p-3 flex items-center justify-between transition-colors cursor-pointer bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 border border-amber-100 flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} strokeWidth={2.2} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    Hard Cards
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-rose-500">
                  <span>18</span>
                  <ChevronRight size={14} />
                </div>
              </div>

              {/* New Cards */}
              <div className="border border-gray-100 hover:border-purple-200 rounded-xl p-3 flex items-center justify-between transition-colors cursor-pointer bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 border border-purple-100 flex items-center justify-center shrink-0">
                    <Sparkles size={16} strokeWidth={2.2} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    New Cards
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs sm:text-sm font-bold text-purple-600">
                  <span>36</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>

            {/* Review Due Cards Button */}
            <button
              onClick={() => favoriteDecks?.[0] && handleStudy(favoriteDecks[0])}
              disabled={!favoriteDecks || favoriteDecks.length === 0}
              className={`w-full py-2.5 px-4 bg-[#1B4B66] hover:bg-[#14394e] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 shadow-xs text-center ${
                !favoriteDecks || favoriteDecks.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              Review Due Cards
            </button>
          </div>

          {/* 3. Need a Simpler Explanation? CARA / Lumi Card */}
          {showCaraCard && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 relative flex items-center gap-3.5">
              <button
                type="button"
                onClick={() => setShowCaraCard(false)}
                className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 p-1 cursor-pointer transition-colors"
                aria-label="Dismiss"
              >
                <X size={15} />
              </button>

              {/* Robot Avatar Image */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 shrink-0 relative flex items-center justify-center">
                <Image
                  src="/images/ai-tutor-avatar.png"
                  alt="CARA / Lumi AI Tutor"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>

              {/* Text & Button */}
              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-xs sm:text-[13px] font-bold text-[#1B4B66] leading-tight">
                  Need a Simpler Explanation?
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                  Ask CARA about any flashcard
                </p>

                <Link
                  href="/dashboard/my-tutor"
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B4B66] hover:bg-[#14394e] text-white text-[11px] font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  <MessageSquare size={12} />
                  <span>Ask CARA</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
