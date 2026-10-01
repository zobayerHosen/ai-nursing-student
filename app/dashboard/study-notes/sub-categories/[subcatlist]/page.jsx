import { Suspense } from "react";
import StudyNotesSubCategoriesClient from "./components/sub-category-details-client";

export default async function StudyNotesCategorySystemsView({ params }) {
  const { subcatlist } = await params;

  return (
    <Suspense
      fallback={
        <div className="w-full py-16 flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-gray-500 font-medium">Loading category topics...</p>
        </div>
      }
    >
      <StudyNotesSubCategoriesClient subcatlist={subcatlist} />
    </Suspense>
  );
}
