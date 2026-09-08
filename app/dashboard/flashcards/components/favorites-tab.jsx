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
import { INITIAL_FAVORITES, LEARNING_READINESS_STATS } from "./dummy-data";

export default function FavoritesTab({ onStudyTopic }) {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [bookmarkedIds, setBookmarkedIds] = useState(
    () => new Set(INITIAL_FAVORITES.map((f) => f.id))
  );
  const [showCaraCard, setShowCaraCard] = useState(true);
  const [activeStudyTopic, setActiveStudyTopic] = useState(null);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleStudy = (card) => {
    if (onStudyTopic) {
      onStudyTopic(card);
    } else {
      setActiveStudyTopic(card);
    }
  };

  if (activeStudyTopic) {
    return (
      <div className="w-full">
        <FlashcardPlayer
          topic={activeStudyTopic}
          onBack={() => setActiveStudyTopic(null)}
          categoryId={1}
          subcategoryId={1}
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

            {/* 2-column Grid of Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((card) => {
                const isBookmarked = bookmarkedIds.has(card.id);

                return (
                  <div
                    key={card.id}
                    onClick={() => handleStudy(card)}
                    className="bg-white rounded-xl border border-[#1B4B66]/30 hover:border-[#1B4B66]/30 p-3.5 sm:p-4 shadow-2xs hover:shadow-sm transition-all duration-200 flex gap-3.5 relative group cursor-pointer"
                  >
                    {/* Left Thumbnail Placeholder with subtle checkered grid */}
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
                            {card.category}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(card.id, e)}
                            className="text-[#1B4B66] hover:opacity-80 transition-opacity p-0.5"
                            aria-label="Bookmark"
                          >
                            <Bookmark
                              size={17}
                              className={
                                isBookmarked
                                  ? "fill-[#1B4B66] text-[#1B4B66]"
                                  : "text-gray-300"
                              }
                            />
                          </button>
                        </div>

                        {/* Title */}
                        <h3 className="text-xs sm:text-[13px] font-bold text-gray-800 leading-snug line-clamp-1 mt-1">
                          {card.title}
                        </h3>

                        {/* Decks Count */}
                        <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                          {card.decksCount}
                        </p>
                      </div>

                      {/* Progress Bar & Study Action */}
                      <div className="mt-2.5">
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${card.progress}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-end mt-2">
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

            {/* Showing 8 of 12 text */}
            <div className="mt-5 text-xs text-gray-400 font-medium">
              Showing <span className="font-bold text-gray-700">8</span> of 12
            </div>
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
              onClick={() => handleStudy(favorites[0])}
              className="w-full py-2.5 px-4 bg-[#1B4B66] hover:bg-[#14394e] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-150 shadow-xs cursor-pointer text-center"
            >
              Review Due Cards
            </button>
          </div>

          {/* 2. How you're Learning Widget */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
            <h3 className="text-base font-bold text-[#1B4B66] mb-4">
              How you're Learning
            </h3>

            <div className="flex items-center justify-between gap-4">
              {/* Donut Chart */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#F1F5F9"
                    strokeWidth="10"
                  />
                  {/* Segment arcs */}
                  {segments.map((seg, idx) => {
                    const strokeDasharray = `${(seg.pct / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -(accumulated / 100) * circumference;
                    accumulated += seg.pct;

                    return (
                      <circle
                        key={idx}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="10"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-700"
                      />
                    );
                  })}
                </svg>

                {/* Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl sm:text-2xl font-black text-[#1B4B66] leading-none">
                    74%
                  </span>
                  <span className="text-[9px] font-semibold text-gray-400 mt-1">
                    Readiness
                  </span>
                </div>
              </div>

              {/* Legend & Stats */}
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1B4B66]" />
                    <span className="text-gray-600 font-medium">Easy</span>
                  </div>
                  <span className="font-bold text-gray-800">76%</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
                    <span className="text-gray-600 font-medium">Hard</span>
                  </div>
                  <span className="font-bold text-gray-800">81%</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FDA4AF]" />
                    <span className="text-gray-600 font-medium">New</span>
                  </div>
                  <span className="font-bold text-gray-800">86%</span>
                </div>

                {/* Trend badge */}
                <div className="pt-2 border-t border-gray-50 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                  <TrendingUp size={13} />
                  <span>6% this Week</span>
                </div>
              </div>
            </div>
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
                  <span>Ask Lumi</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
