import { Suspense } from "react";
import StudyNotesHeader from "./components/study-notes-header";
import StudyNotesClient from "./components/study-notes-client";

/**
 * Study Notes index page — a Server Component.
 *
 * The static header renders on the server (SEO-friendly, zero client JS),
 * while all interactive parts (tabs, tab content, state) live behind the
 * "use client" boundary in `study-notes-client.jsx`.
 */
export default function StudyNotesIndexPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Header Banner & Top Controls (Server Component) */}
      <StudyNotesHeader />

      {/* 2 & 3. Navigation Tabs + Tab Content (Client boundary) */}
      <Suspense
        fallback={
          <div className="w-full py-16 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs text-gray-500 font-medium">Loading study notes...</p>
          </div>
        }
      >
        <StudyNotesClient />
      </Suspense>
    </div>
  );
}