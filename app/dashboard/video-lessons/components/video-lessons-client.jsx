"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VideoLessonsHeader from "./video-lessons-header";
import CategoriesView from "./categories-view";
import FavoritesView from "./favorites-view";
import ProgressSection from "./progress-section";

export default function VideoLessonsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read tab from URL query parameters so reload preserves current view
  const tabParam = searchParams.get("tab");

  const activeTab =
    tabParam === "favorites"
      ? "favorites"
      : tabParam === "progress"
      ? "progress"
      : "explore";

  const handleTabChange = (newTab) => {
    if (newTab === "explore") {
      router.push("/dashboard/video-lessons", { scroll: false });
    } else {
      router.push(`/dashboard/video-lessons?tab=${newTab}`, { scroll: false });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden">
      {/* TOP HEADER COMPONENT */}
      <VideoLessonsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* BODY SECTION ACCORDING TO ACTIVE TAB */}
      <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
        {/* EXPLORE TAB (Categories View) */}
        {activeTab === "explore" && <CategoriesView />}

        {/* FAVORITES / MY LIST TAB */}
        {activeTab === "favorites" && <FavoritesView />}

        {/* MY PROGRESS TAB */}
        {activeTab === "progress" && <ProgressSection />}
      </div>
    </div>
  );
}