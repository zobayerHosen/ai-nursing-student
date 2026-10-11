"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BrowseDecksTab from "./browse-decks-tab";
import FavoritesTab from "./favorites-tab";
import PerformanceTab from "./performance-tab";

function FlashCardsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const activeTab =
    tabParam === "favorites"
      ? "favorites"
      : tabParam === "performance" || tabParam === "progress"
      ? "performance"
      : "browse";

  return (
    <div className="w-full">
      {activeTab === "browse" && <BrowseDecksTab />}
      {activeTab === "favorites" && (
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8">
          <FavoritesTab />
        </div>
      )}
      {activeTab === "performance" && (
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8">
          <PerformanceTab />
        </div>
      )}
    </div>
  );
};

export default function FlashcardsClient() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">Loading flashcards...</div>}>
      <FlashCardsContent />
    </Suspense>
  );
};
