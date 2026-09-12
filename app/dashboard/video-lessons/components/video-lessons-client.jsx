"use client";

import React, { useState } from "react";
import VideoLessonsHeader from "./video-lessons-header";
import ExploreSection from "./explore-section";
import CategoriesView from "./categories-view";
import FavoritesView from "./favorites-view";
import CategoryDetailView from "./category-detail-view";
import ProgressSection from "./progress-section";

export default function VideoLessonsClient() {
  // Tab: "explore" | "favorites" | "progress"
  const [activeTab, setActiveTab] = useState("explore");

  // Subview inside "explore": "main" | "all-categories" | "category-detail"
  const [subView, setSubView] = useState("main");
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
    setSelectedCategory(cat);
    setSubView("category-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToExplore = () => {
    setSubView("main");
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setSubView("main");
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. TOP HEADER COMPONENT                                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <VideoLessonsHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        subView={subView}
        selectedCategory={selectedCategory}
        onBack={handleBackToExplore}
      />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. BODY SECTION ACCORDING TO ACTIVE TAB & SUBVIEW           */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 w-full px-3.5 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
        {/* EXPLORE TAB */}
        {activeTab === "explore" && subView === "main" && (
          <ExploreSection
            onViewAllCategories={() => setSubView("all-categories")}
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

        {/* CATEGORY DETAIL SUBVIEW */}
        {activeTab === "explore" && subView === "category-detail" && selectedCategory && (
          <CategoryDetailView selectedCategory={selectedCategory} />
        )}

        {/* FAVORITES / MY LIST TAB */}
        {activeTab === "favorites" && <FavoritesView />}

        {/* MY PROGRESS TAB (MATCHING NEW MOCKUP) */}
        {activeTab === "progress" && <ProgressSection />}
      </div>
    </div>
  );
}
