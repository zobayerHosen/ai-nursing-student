"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

import {
  useGenerateFlashCard,
  useGetFlashCardsHistoryList,
  useGetAllGeneratedFlashCards,
} from "@/hooks/interactive-tools";
import FlashcardsSidebar from "./flashcards-sidebar";
import EmptyFlashcards from "./empty-flashcards";
import NotesFlashcardPlayer, { NotesFlashcardPlayerSkeleton } from "./notes-flashcard-player";

export default function NotesToFlashcardsClient() {
  const [session, setSession] = useState(null);

  const { generateFlashcards, isPending } = useGenerateFlashCard();
  const { flashcardsList = [] } = useGetFlashCardsHistoryList();

  const resolvedId = session?.id ?? null;
  const isHistory = Boolean(session?.isHistory);

  const { sessionData, isLoading: isLoadingSession } =
    useGetAllGeneratedFlashCards(resolvedId);

  const handleGenerate = async (formData) => {
    try {
      const response = await generateFlashcards(formData);
      const newId = response?.data?.id ?? null;
      setSession({ id: newId, isHistory: false });
      toast.success(response?.message ?? "Flashcards generated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to generate flashcards"
      );
    }
  };

  const handleReset = () => setSession(null);
  const handleSelectHistory = (id) => setSession(id ? { id, isHistory: true } : null);

  const isPlayerVisible = Boolean(resolvedId);
  const showSkeleton = isPlayerVisible && (isPending || isLoadingSession);

  return (
    <section className="flex min-h-[calc(100vh-82px)] flex-col bg-[#F8F9FA] text-[#333E49] lg:flex-row">
      <FlashcardsSidebar
        onGenerate={handleGenerate}
        isGenerating={isPending}
        flashcardsList={flashcardsList}
        onSelectHistory={handleSelectHistory}
        selectedHistoryId={isHistory ? resolvedId : null}
      />

      {/* ── Right panel */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* header bar */}
        <div className="flex min-h-14 items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-3 sm:px-6">
          <h2 className="text-lg font-semibold text-[#222427]">
            {isPlayerVisible ? "Flashcard Session" : ""}
          </h2>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#E8F2FC] px-3 py-1 text-[10px] font-semibold uppercase text-[#2C5F8D]">
              NCLEX study
            </span>
            {isPlayerVisible && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-7 items-center gap-1 rounded-full border border-[#DCE5EF] bg-white px-3 text-[10px] font-semibold text-[#2C5F8D] transition hover:bg-[#F1F6FB]"
              >
                <RotateCcw size={12} />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* main content */}
        <main className="flex-1 p-4 sm:p-8">
          {/* Skeleton while generating or loading */}
          {showSkeleton || isPending ? (
            <NotesFlashcardPlayerSkeleton />
          ) : isPlayerVisible && sessionData ? (
            <NotesFlashcardPlayer
              key={resolvedId}
              sessionData={sessionData}
              isHistory={isHistory}
              onReset={handleReset}
            />
          ) : (
            <EmptyFlashcards recentCount={flashcardsList.length} />
          )}
        </main>
      </div>
    </section>
  );
}
