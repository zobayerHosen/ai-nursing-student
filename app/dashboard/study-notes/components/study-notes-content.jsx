"use client";

import StudyNotesEpisodesView from "./study-notes-episodes-view";
import StudyNotesCategorySystemsView from "./study-notes-category-systems-view";
import StudyNotesProgressView from "./study-notes-progress";
import StudyNotesSidebarWidgets from "./study-notes-sidebar-widgets";
import { STUDY_NOTES_TABS } from "../constants";

/**
 * Body of the page: switches between the "All Notes" two-column layout
 * (episodes/category view + sidebar) and the "My Progress" view.
 */
export default function StudyNotesContent({
  activeTab,
  selectedCategory,
  onSelectCategory,
  onBackToAllNotes,
  onSelectProgressArea,
}) {
  if (activeTab === STUDY_NOTES_TABS.MY_PROGRESS) {
    return (
      <StudyNotesProgressView onSelectArea={onSelectProgressArea} />
    );
  }

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Main Column: browse all episodes, or a single category's systems */}
      <div className="xl:col-span-8 2xl:col-span-9 w-full">
        {selectedCategory ? (
          <StudyNotesCategorySystemsView
            category={selectedCategory}
            categoryTitle={selectedCategory.title || "Medical Surgical"}
            onBack={onBackToAllNotes}
          />
        ) : (
          <StudyNotesEpisodesView onSelectCategory={onSelectCategory} />
        )}
      </div>

      {/* Right Sidebar Column */}
      <div className="xl:col-span-4 2xl:col-span-3 w-full">
        <StudyNotesSidebarWidgets />
      </div>
    </div>
  );
}
