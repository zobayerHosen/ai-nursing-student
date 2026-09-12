"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import BrowseDecksTab from "./browse-decks-tab";
import FavoritesTab from "./favorites-tab";
import PerformanceTab from "./performance-tab";
import { FLASHCARD_ICON } from "./dummy-data";

function FlashCardsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(() => {
    if (tabParam === "favorites") return "favorites";
    if (tabParam === "performance" || tabParam === "progress") return "performance";
    return "browse";
  });

  useEffect(() => {
    if (tabParam === "favorites") setActiveTab("favorites");
    else if (tabParam === "performance" || tabParam === "progress") setActiveTab("performance");
    else if (tabParam === "browse") setActiveTab("browse");
  }, [tabParam]);

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tabKey);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] pb-12">
      {/* ─── TOP HEADER SECTION ─────────────────────────────────── */}
      <div className="w-full bg-white border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 xl:px-10 pt-5 sm:pt-6">
        <div className="w-full">
          {/* Title Row & AI Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5">
            {/* Title & Icon */}
            <div className="flex items-start gap-3.5">
              <div className="p-1">{FLASHCARD_ICON}</div>

              <div>
                <h1 className="text-2xl font-bold text-[#044E79] tracking-tight">
                  Nursing Flashcards
                </h1>
                <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
                  Review high-yield concepts, master difficult cards, and retain more.
                </p>
              </div>
            </div>

            {/* CTA Button: + Create Custom Decks With AI */}
            <div className="flex items-center shrink-0">
              <Link
                href="/dashboard/notes-to-flashcards"
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-[#1B4B66] hover:bg-[#14394e] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Create Custom Decks With AI</span>
              </Link>
            </div>
          </div>

          {/* ─── TAB NAVIGATION BAR ──────────────────────────────── */}
          <div className="flex items-center gap-6 sm:gap-8 -mb-px overflow-x-auto text-sm">
            <button
              onClick={() => handleTabChange("browse")}
              className={`pb-3 font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "browse"
                  ? "text-[#1B4B66] border-b-2 border-[#1B4B66]"
                  : "text-gray-500 hover:text-[#1B4B66]"
              }`}
            >
              Browse All Decks
            </button>

            <button
              onClick={() => handleTabChange("favorites")}
              className={`pb-3 font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "favorites"
                  ? "text-[#1B4B66] border-b-2 border-[#1B4B66]"
                  : "text-gray-500 hover:text-[#1B4B66]"
              }`}
            >
              Favorites
            </button>

            <button
              onClick={() => handleTabChange("performance")}
              className={`pb-3 font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "performance"
                  ? "text-[#1B4B66] border-b-2 border-[#1B4B66]"
                  : "text-gray-500 hover:text-[#1B4B66]"
              }`}
            >
              Performance
            </button>
          </div>
        </div>
      </div>

      {/* ─── ACTIVE TAB CONTENT AREA ────────────────────────────── */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8">
        {activeTab === "browse" && <BrowseDecksTab />}
        {activeTab === "favorites" && <FavoritesTab />}
        {activeTab === "performance" && <PerformanceTab />}
      </div>
    </div>
  );
}

export default function FlashcardsClient() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading flashcards...</div>}>
      <FlashCardsContent />
    </Suspense>
  );
}
