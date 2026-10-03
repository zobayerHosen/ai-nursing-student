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
      {/* TOP HEADER SECTION */}
      <div className="w-full bg-white border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 xl:px-10 pt-5 sm:pt-6">
        <div className="w-full">
          {/* Title Row & AI Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5">
            {/* Title & Icon */}
            <div className="flex items-start gap-3.5">
              <div className="mt-1.5 bg-[#EFF6FF] rounded-xl flex items-center justify-center w-9 h-9 shrink-0 shadow-sm border border-primary-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_425_74635)">
                    <path d="M14.5004 16.8121H13.3754V15.5371H14.5004C15.0629 15.5371 15.5629 15.1746 15.7254 14.6246L18.5754 5.11213C18.6754 4.78713 18.6379 4.43713 18.4754 4.12463C18.3129 3.81213 18.0379 3.59963 17.7004 3.51213L9.86289 1.36213C9.21289 1.17463 8.52539 1.53713 8.31289 2.18713L7.61289 4.28713L6.40039 3.88713L7.10039 1.78713C7.52539 0.487129 8.88789 -0.225371 10.2004 0.137129L18.0379 2.31213C18.7004 2.49963 19.2504 2.93713 19.5879 3.53713C19.9254 4.13713 20.0004 4.83713 19.8004 5.49963L16.9504 14.9996C16.6254 16.0871 15.6504 16.8121 14.5129 16.8121H14.5004Z" fill="#64748B" />
                    <path d="M11.4625 20H2.55C1.15 20 0 18.8625 0 17.45V5.9875C0 4.5875 1.1375 3.4375 2.55 3.4375H11.4625C12.8625 3.4375 14.0125 4.575 14.0125 5.9875V17.45C14.0125 18.85 12.875 20 11.4625 20ZM2.55 4.7125C1.85 4.7125 1.275 5.2875 1.275 5.9875V17.45C1.275 18.15 1.85 18.725 2.55 18.725H11.4625C12.1625 18.725 12.7375 18.15 12.7375 17.45V5.9875C12.7375 5.2875 12.1625 4.7125 11.4625 4.7125H2.55Z" fill="#64748B" />
                  </g>
                  <defs>
                    <clipPath id="clip0_425_74635">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

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

          {/* TAB NAVIGATION BAR  */}
          <div className="flex items-center gap-6 sm:gap-8 -mb-px overflow-x-auto text-sm">
            <button
              onClick={() => handleTabChange("browse")}
              className={`pb-3 font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === "browse"
                ? "text-[#1B4B66] border-b-2 border-[#fe5e7e]"
                : "text-gray-500 hover:text-[#1B4B66]"
                }`}
            >
              Browse All Decks
            </button>

            <button
              onClick={() => handleTabChange("favorites")}
              className={`pb-3 font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === "favorites"
                ? "text-[#1B4B66] border-b-2 border-[#fe5e7e]"
                : "text-gray-500 hover:text-[#1B4B66]"
                }`}
            >
              Favorites
            </button>

            <button
              onClick={() => handleTabChange("performance")}
              className={`pb-3 font-bold transition-all cursor-pointer whitespace-nowrap ${activeTab === "performance"
                ? "text-[#1B4B66] border-b-2 border-[#fe5e7e]"
                : "text-gray-500 hover:text-[#1B4B66]"
                }`}
            >
              Performance
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE TAB CONTENT AREA */}
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
