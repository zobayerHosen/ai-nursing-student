"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StudyNotesTabs from "./study-notes-tabs";
import StudyNotesContent from "./study-notes-content";
import { STUDY_NOTES_TABS } from "../constants";
import { useCoreLearning } from "@/hooks";

/**
 * Client boundary for the Study Notes index page.
 * Holds the interactive navigation state and syncs selected category with URL query params
 * so page reload persists the user's current view.
 */
export default function StudyNotesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabParam === "progress" ? STUDY_NOTES_TABS.MY_PROGRESS : STUDY_NOTES_TABS.ALL_NOTES
  );

  const { coreLearningData } = useCoreLearning("study_notes", { limit: 100 });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    if (categoryParam) {
      return { id: Number(categoryParam) };
    }
    return null;
  });

  // Sync category state when URL searchParams change or data loads
  useEffect(() => {
    if (categoryParam) {
      const found = coreLearningData?.find(
        (cat) => String(cat.id) === String(categoryParam)
      );
      setSelectedCategory(found || { id: Number(categoryParam) });
    } else {
      setSelectedCategory(null);
    }
  }, [categoryParam, coreLearningData]);

  // Sync tab with URL if needed
  useEffect(() => {
    if (tabParam === "progress") {
      setActiveTab(STUDY_NOTES_TABS.MY_PROGRESS);
    } else if (tabParam === "all_notes") {
      setActiveTab(STUDY_NOTES_TABS.ALL_NOTES);
    }
  }, [tabParam]);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    if (category?.id) {
      router.push(`/dashboard/study-notes?category=${category.id}`, { scroll: false });
    }
  };

  const handleBackToAllNotes = () => {
    setSelectedCategory(null);
    router.push(`/dashboard/study-notes`, { scroll: false });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === STUDY_NOTES_TABS.MY_PROGRESS) {
      router.push(`/dashboard/study-notes?tab=progress`, { scroll: false });
    } else {
      if (selectedCategory?.id) {
        router.push(`/dashboard/study-notes?category=${selectedCategory.id}`, {
          scroll: false,
        });
      } else {
        router.push(`/dashboard/study-notes`, { scroll: false });
      }
    }
  };

  return (
    <>
      {/* 2. Navigation Tabs ("All Notes" / "My Progress") */}
      <StudyNotesTabs activeTab={activeTab} onChange={handleTabChange} />

      {/* 3. Tab Content */}
      <StudyNotesContent
        activeTab={activeTab}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        onBackToAllNotes={handleBackToAllNotes}
        onSelectProgressArea={(area) => {
          setActiveTab(STUDY_NOTES_TABS.ALL_NOTES);
          handleSelectCategory(area);
        }}
      />
    </>
  );
}
