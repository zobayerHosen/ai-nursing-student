"use client";

import StudyNotesProgressView from "./study-notes-progress";
import { STUDY_NOTES_TABS } from "../constants";
import StudyNotesCategoriesView from "./study-notes-categories-view";


export default function StudyNotesContent({
  activeTab,
}) {
  if (activeTab === STUDY_NOTES_TABS.MY_PROGRESS) {
    return (
      <StudyNotesProgressView />
    );
  }

  return (
    <div className="w-full">
      <StudyNotesCategoriesView />
    </div>
  );
}
