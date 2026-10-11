import { Suspense } from "react";
import FlaschCardPlayerDetails from "./components/flashcard-player-details";

export default async function CategoryPage({ params }) {
  const { topic: id } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center p-16 min-h-75">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1B4B66] mb-4"></div>
          <p className="text-gray-500 font-medium">Loading flashcards...</p>
        </div>
      }
    >
      <FlaschCardPlayerDetails topicList={id} />
    </Suspense>
  );
}
