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
  const [selectedCardCount, setSelectedCardCount] = useState(10);
  const [selectedProgram, setSelectedProgram] = useState("LPN");
  const [useOnlyCourseMaterials, setUseOnlyCourseMaterials] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentSource, setContentSource] = useState("");
  const [sidebarTab, setSidebarTab] = useState("tool");

  // Holds the session id returned by the generate API
  const [activeSessionId, setActiveSessionId] = useState(null);
  // Holds the session id the user picked from the History tab
  const [viewingHistoryId, setViewingHistoryId] = useState(null);

  const { generateFlashcards, isPending } = useGenerateFlashCard();
  const { flashcardsList } = useGetFlashCardsHistoryList();

  // Fetch session data for the currently active/history session
  const resolvedId = activeSessionId ?? viewingHistoryId;
  const { sessionData, isLoading: isLoadingSession } =
    useGetAllGeneratedFlashCards(resolvedId);

  // Generate
  const handleGenerate = async () => {
    const hasFile = !!selectedFile;
    const hasContent = contentSource.trim().length > 0;

    if (!hasFile && !hasContent) {
      toast.error("Please upload a file or enter content source");
      return;
    }

    if (!selectedCardCount || selectedCardCount < 1 || selectedCardCount > 30) {
      toast.error("Card amount must be between 1 and 30");
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("file", selectedFile, selectedFile.name);
    if (hasContent) formData.append("content_source", contentSource);
    formData.append("card_count", String(selectedCardCount));
    if (selectedProgram) formData.append("program", selectedProgram);
    formData.append("use_only_course_materials", String(useOnlyCourseMaterials));

    try {
      const response = await generateFlashcards(formData);
      const newId = response?.data?.id ?? null;
      setActiveSessionId(newId);
      setViewingHistoryId(null);
      toast.success(response?.message ?? "Flashcards generated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to generate flashcards"
      );
    }
  };

  // Reset
  const handleReset = () => {
    setActiveSessionId(null);
    setViewingHistoryId(null);
  };

  // History select
  const handleSelectHistory = (id) => {
    setViewingHistoryId(id);
    setActiveSessionId(null);
  };

  const isPlayerVisible = Boolean(resolvedId);
  const showSkeleton = isPlayerVisible && (isPending || isLoadingSession);

  return (
    <section className="flex min-h-[calc(100vh-82px)] flex-col bg-[#F8F9FA] text-[#333E49] lg:flex-row">
      <FlashcardsSidebar
        selectedCardCount={selectedCardCount}
        setSelectedCardCount={setSelectedCardCount}
        selectedProgram={selectedProgram}
        setSelectedProgram={setSelectedProgram}
        useOnlyCourseMaterials={useOnlyCourseMaterials}
        setUseOnlyCourseMaterials={setUseOnlyCourseMaterials}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        contentSource={contentSource}
        setContentSource={setContentSource}
        onGenerate={handleGenerate}
        isGenerating={isPending}
        activeTab={sidebarTab}
        onTabChange={setSidebarTab}
        flashcardsList={flashcardsList}
        onSelectHistory={handleSelectHistory}
        selectedHistoryId={viewingHistoryId}
      />

      {/* ── Right panel ─────────────────────────────────────────────────── */}
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
              isHistory={Boolean(viewingHistoryId)}
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
