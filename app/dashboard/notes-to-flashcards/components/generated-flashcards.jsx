"use client";

import toast from "react-hot-toast";

export default function GeneratedFlashcards({ result, onClear }) {
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
