"use client";

import { useState } from "react";
import { CreditCard, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

import {
  useGenerateFlashCard,
  useGetFlashCards,
  useGetFlashCardById,
} from "@/hooks/interactive-tools";
import FlashcardsSidebar from "./flashcards-sidebar";

export default function NotesToFlashcardsClient() {
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedCardCount, setSelectedCardCount] = useState(10);
  const [selectedFocus, setSelectedFocus] = useState("Anatomy");
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
    formData.append("focus_area", selectedFocus);

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
        selectedFocus={selectedFocus}
        setSelectedFocus={setSelectedFocus}
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

function EmptyFlashcards({ recentCount }) {
  return (
    <div className="flex min-h-[52vh] items-start justify-center pt-4 sm:pt-8">
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-xl bg-white px-6 py-12 text-center shadow-sm">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2C5F8D] text-white shadow-sm">
          <CreditCard size={30} />
        </div>
        <h3 className="text-2xl font-semibold text-[#424242]">
          No flashcards yet
        </h3>
        <p className="mt-2 max-w-xs text-xs leading-5 text-[#6B7280]">
          Enter a topic or upload your notes, then hit Generate.
        </p>
        {recentCount > 0 ? (
          <p className="mt-3 text-[11px] font-semibold text-[#2C5F8D]">
            {recentCount} saved flashcard set{recentCount === 1 ? "" : "s"} found
          </p>
        ) : null}
      </div>
    </div>
  );
}

function GeneratedFlashcards({ result, onClear }) {
  const flashcards = Array.isArray(result?.flashcards) ? result.flashcards : [];

  const handleCopy = async () => {
    const text = flashcards
      .map(
        (item, index) =>
          `${index + 1}. Q: ${item.question}\nA: ${item.answer}`
      )
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Flashcards copied");
    } catch {
      toast.error("Failed to copy flashcards");
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 border-b border-[#E8EDF3] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#222427]">
            Flashcards Generated ({flashcards.length} cards)
          </h3>
          {result?.file_name ? (
            <p className="mt-1 text-[11px] font-medium text-[#697586]">
              Source: {result.file_name}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!flashcards.length}
            className="h-8 rounded-md border border-[#D8DEE6] bg-white px-4 text-xs font-semibold text-[#3F4852] transition hover:bg-[#F6F8FA]"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={onClear}
            className="h-8 rounded-md border border-[#D8DEE6] bg-white px-4 text-xs font-semibold text-[#3F4852] transition hover:bg-[#F6F8FA]"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {flashcards.map((item, index) => (
          <article
            key={`${item.question}-${index}`}
            className="rounded-lg border border-[#E1E7EF] bg-white px-4 py-3"
          >
            <p className="text-xs leading-5 text-[#4B5563]">
              <span className="font-bold text-[#2C5F8D]">Q:</span>{" "}
              {item.question}
            </p>
            <p className="mt-1 text-xs leading-5 text-[#4B5563]">
              <span className="font-bold text-[#2C5F8D]">A:</span>{" "}
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
