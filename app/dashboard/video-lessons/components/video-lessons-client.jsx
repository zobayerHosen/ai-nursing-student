"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VideoLessonsHeader from "./video-lessons-header";
import ExploreSection from "./explore-section";
import CategoriesView from "./categories-view";
import FavoritesView from "./favorites-view";
import CategoryDetailView from "./category-detail-view";
import ProgressSection from "./progress-section";

export default function VideoLessonsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read tab and view from URL query parameters so reload preserves current view
  const tabParam = searchParams.get("tab");
  const viewParam = searchParams.get("view");

  const activeTab =
    tabParam === "favorites"
      ? "favorites"
      : tabParam === "progress"
      ? "progress"
      : "explore";

  const subView = viewParam === "all-categories" ? "all-categories" : "main";
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Bookmarked / Saved states
  const [savedVideos, setSavedVideos] = useState({});

  const toggleBookmark = (id, e) => {
    if (e) e.preventDefault();
    setSavedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenCategory = (cat) => {
    if (cat?.id) {
      router.push(`/dashboard/video-lessons/category/${cat.id}?from=all-categories`);
    } else {
      setSelectedCategory(cat);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToExplore = () => {
    router.push("/dashboard/video-lessons", { scroll: false });
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (newTab) => {
    if (newTab === "explore") {
      router.push("/dashboard/video-lessons", { scroll: false });
    } else {
      router.push(`/dashboard/video-lessons?tab=${newTab}`, { scroll: false });
    }
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewAllCategories = () => {
    router.push("/dashboard/video-lessons?view=all-categories", { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden">
      {/* TOP HEADER COMPONENT */}
      <VideoLessonsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        subView={subView}
        selectedCategory={selectedCategory}
        onBack={handleBackToExplore}
      />

      {/* BODY SECTION ACCORDING TO ACTIVE TAB & SUBVIEW */}
      <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
        {/* EXPLORE TAB */}
        {activeTab === "explore" && subView === "main" && (
          <ExploreSection
            onViewAllCategories={handleViewAllCategories}
            onOpenCategory={handleOpenCategory}
            savedVideos={savedVideos}
            toggleBookmark={toggleBookmark}
          />
        )}

        {/* ALL CATEGORIES SUBVIEW */}
        {activeTab === "explore" && subView === "all-categories" && (
          <CategoriesView
            onOpenCategory={handleOpenCategory}
            savedVideos={savedVideos}
            toggleBookmark={toggleBookmark}
          />
        )}

        {/* CATEGORY DETAIL SUBVIEW (Fallback if rendered as inline subview) */}
        {activeTab === "explore" && subView === "category-detail" && selectedCategory && (
          <CategoryDetailView selectedCategory={selectedCategory} />
        )}

        {/* FAVORITES / MY LIST TAB */}
        {activeTab === "favorites" && <FavoritesView />}

        {/* MY PROGRESS TAB */}
        {activeTab === "progress" && <ProgressSection />}
      </div>
    </div>
  );
}

