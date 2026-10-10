"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetFlashcardCategory } from "@/hooks/flashcards";

export default function BrowseDecksTab() {
  const router = useRouter();
  const { flashcardData, isLoading } = useGetFlashcardCategory();

  useEffect(() => {
    if (!isLoading) {
      const defaultCategoryId =
        Array.isArray(flashcardData) && flashcardData.length > 0
          ? flashcardData[0]?.id
          : 0;

      if (defaultCategoryId) {
        router.replace(`/dashboard/flashcards/all-dec-list/${defaultCategoryId}`);
      }
    }
  }, [flashcardData, isLoading, router]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B4B66] mb-3" />
      <p className="text-xs sm:text-sm font-medium text-gray-500">
        Loading flashcards...
      </p>
    </div>
  );
}