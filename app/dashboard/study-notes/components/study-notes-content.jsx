"use client";

import StudyNotesEpisodesView from "./study-notes-episodes-view";
import StudyNotesProgressView from "./study-notes-progress";
import StudyNotesSidebarWidgets from "./study-notes-sidebar-widgets";
import { STUDY_NOTES_TABS } from "../constants";


export default function StudyNotesContent({
  activeTab,
}) {
  if (activeTab === STUDY_NOTES_TABS.MY_PROGRESS) {
    return (
      <StudyNotesProgressView />
    );
  }

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Main Column: browse all episodes */}
      <div className="xl:col-span-8 2xl:col-span-9 w-full">
        <StudyNotesEpisodesView />
      </div>

      {/* Right Sidebar Column */}
      <div className="xl:col-span-4 2xl:col-span-3 w-full">
        <StudyNotesSidebarWidgets />
      </div>
    </div>
  );
}
