import { Suspense } from "react";
import StudyNotesHeader from "./components/study-notes-header";
import StudyNotesClient from "./components/study-notes-client";

export default function StudyNotesIndexPage() {
  return (
    <div className="w-full flex flex-col gap-6">
      <StudyNotesHeader />

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