"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

import {
  useGenerateFlashCard,
  useGetFlashCards,
  useGetFlashCardById,
} from "@/hooks/interactive-tools";
import FlashcardsSidebar from "./flashcards-sidebar";
import EmptyFlashcards from "./empty-flashcards";
import GeneratedFlashcards from "./generated-flashcards";

export default function NotesToFlashcardsClient() {
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedCardCount, setSelectedCardCount] = useState(10);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentSource, setContentSource] = useState("");
  const [generatedResult, setGeneratedResult] = useState(null);
  const [sidebarTab, setSidebarTab] = useState("tool");
  const [viewingHistoryId, setViewingHistoryId] = useState(null);
  const { generateFlashcards, isPending } = useGenerateFlashCard();
  const { flashcardsList } = useGetFlashCards();
  const { flashcard: historyFlashcard, isLoading: isLoadingHistory } =
    useGetFlashCardById(viewingHistoryId);

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
    if (selectedFile) {
      formData.append("file", selectedFile, selectedFile.name);
    }
    if (hasContent) {
      formData.append("content_source", contentSource);
    }
    formData.append("card_count", String(selectedCardCount));
    // formData.append("focus_area", selectedFocus);

    try {
      const response = await generateFlashcards(formData);
      setGeneratedResult(response?.data ?? null);
      setHasGenerated(true);
      setViewingHistoryId(null);
      toast.success(response?.message ?? "Flashcards generated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to generate flashcards"
      );
    }
  };

  const handleReset = () => {
    setHasGenerated(false);
    setGeneratedResult(null);
    setViewingHistoryId(null);
  };

  const handleSelectHistory = (id) => {
    setViewingHistoryId(id);
    setHasGenerated(false);
    setGeneratedResult(null);
  };

  const displayResult = viewingHistoryId ? historyFlashcard : generatedResult;
  const isLoadingDisplay = viewingHistoryId ? isLoadingHistory : false;

  return (
    <section className="flex min-h-[calc(100vh-82px)] flex-col bg-[#F8F9FA] text-[#333E49] lg:flex-row">
      <FlashcardsSidebar
        selectedCardCount={selectedCardCount}
        setSelectedCardCount={setSelectedCardCount}
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

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-h-14 items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-3 sm:px-6">
          <h2 className="text-lg font-semibold text-[#222427]">
            {hasGenerated || viewingHistoryId ? "Generated Result" : ""}
          </h2>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#E8F2FC] px-3 py-1 text-[10px] font-semibold uppercase text-[#2C5F8D]">
              NCLEX study
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-7 items-center gap-1 rounded-full border border-[#DCE5EF] bg-white px-3 text-[10px] font-semibold text-[#2C5F8D] transition hover:bg-[#F1F6FB]"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6">
          {hasGenerated || viewingHistoryId ? (
            isLoadingDisplay ? (
              <div className="flex min-h-[52vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#2C5F8D]" />
              </div>
            ) : displayResult ? (
              <GeneratedFlashcards result={displayResult} onClear={handleReset} />
            ) : (
              <EmptyFlashcards recentCount={flashcardsList.length} />
            )
          ) : (
            <EmptyFlashcards recentCount={flashcardsList.length} />
          )}
        </main>
      </div>
    </section>
  );
}
