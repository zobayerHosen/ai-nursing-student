"use client";

import FlashcardPlayer from "./flashcard-player";
import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetDeckDetails } from "@/hooks/flashcards";

const FlaschCardPlayerDetails = ({ topicList: id }) => {
    const router = useRouter();
    const { deckData, isLoading, isError } = useGetDeckDetails(id);
    const deck = deckData?.data ?? deckData;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-gray-100 shadow-sm min-h-75">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1B4B66] mb-4"></div>
                <p className="text-gray-500 font-medium">Loading flashcards...</p>
            </div>
        );
    }

    if (isError || !deck) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="h-16 w-16 bg-[#EDF5F9] text-[#1B4B66] rounded-full flex items-center justify-center mb-4">
                    <GraduationCap size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Deck Not Found</h2>
                <p className="text-sm text-gray-500 mb-6">Unable to load the requested flashcard deck.</p>
                <Link
                    href="/dashboard/flashcards"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1B4B66] text-white text-sm font-semibold rounded-xl hover:bg-[#13384e] transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Flashcards
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full px-8 pt-8">
            <FlashcardPlayer
                topic={deck}
                deckId={deck?.id || id}
                onBack={() => router.push("/dashboard/flashcards")}
            />
        </div>
    );
};
export default FlaschCardPlayerDetails;