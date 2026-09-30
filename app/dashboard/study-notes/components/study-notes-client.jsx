"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StudyNotesTabs from "./study-notes-tabs";
import StudyNotesContent from "./study-notes-content";
import { STUDY_NOTES_TABS } from "../constants";


export default function StudyNotesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabParam === "progress" ? STUDY_NOTES_TABS.MY_PROGRESS : STUDY_NOTES_TABS.ALL_NOTES
  );

  useEffect(() => {
    if (tabParam === "progress") {
      setActiveTab(STUDY_NOTES_TABS.MY_PROGRESS);
    } else if (tabParam === "all_notes") {
      setActiveTab(STUDY_NOTES_TABS.ALL_NOTES);
    }
  }, [tabParam]);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === STUDY_NOTES_TABS.MY_PROGRESS) {
      router.push(`/dashboard/study-notes?tab=progress`, { scroll: false });
    } else {
      router.push(`/dashboard/study-notes`, { scroll: false });
    }
  };

  return (
    <>
      {/* 2. Navigation Tabs ("All Notes" / "My Progress") */}
      <StudyNotesTabs activeTab={activeTab} onChange={handleTabChange} />

      {/* 3. Tab Content */}
      <StudyNotesContent
        activeTab={activeTab}
      />
    </>
  );
}
