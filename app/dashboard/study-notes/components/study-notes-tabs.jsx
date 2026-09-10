"use client";

import { STUDY_NOTES_TAB_ITEMS, STUDY_NOTES_TABS } from "../constants";

/**
 * Navigation tabs ("All Notes" / "My Progress").
 * Renders buttons from a shared config to avoid duplicated markup.
 */
export default function StudyNotesTabs({ activeTab, onChange }) {
  return (
    <div className="flex items-center gap-6 border-b border-gray-200">
      {STUDY_NOTES_TAB_ITEMS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`pb-3 text-sm font-bold transition-all relative cursor-pointer ${
              isActive ? "text-[#1B4B66]" : "text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B4B66] rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export { STUDY_NOTES_TABS };
