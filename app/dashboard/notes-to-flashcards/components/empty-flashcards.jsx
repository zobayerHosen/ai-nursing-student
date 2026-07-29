"use client";

import { CreditCard } from "lucide-react";

export default function EmptyFlashcards({ recentCount }) {
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
