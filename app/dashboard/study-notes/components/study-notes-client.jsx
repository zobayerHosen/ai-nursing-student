"use client";

import { useState } from "react";
import StudyNotesTabs from "./study-notes-tabs";
import StudyNotesContent from "./study-notes-content";
import { STUDY_NOTES_TABS } from "../constants";

/**
 * Client boundary for the Study Notes index page.
 * Holds the interactive navigation state and composes the
 * tabs + tab-content sections (header stays server-rendered).
 */
export default function StudyNotesClient() {
  const [activeTab, setActiveTab] = useState(STUDY_NOTES_TABS.ALL_NOTES);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = browse all, or category object

  return (
    <>
      {/* 2. Navigation Tabs ("All Notes" / "My Progress") */}
      <StudyNotesTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* 3. Tab Content */}
      <StudyNotesContent
        activeTab={activeTab}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onBackToAllNotes={() => setSelectedCategory(null)}
        onSelectProgressArea={(area) => {
          setActiveTab(STUDY_NOTES_TABS.ALL_NOTES);
          setSelectedCategory(area);
        }}
      />
    </>
  );
}
