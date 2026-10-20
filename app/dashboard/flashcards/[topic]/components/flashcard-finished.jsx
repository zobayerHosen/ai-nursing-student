"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCcw, RotateCcw } from "lucide-react";

/**
 * Screen displayed when all flashcards in a deck are completed.
 */
export default function FlashcardFinished({
    ratings = {},
    onRepeatDifficult,
    onRestart,
    onBack,
}) {
    const { easyCount, hardCount } = useMemo(() => {
        const values = Object.values(ratings);
        return {
            easyCount: values.filter((r) => r === "easy").length,
            hardCount: values.filter((r) => r === "hard").length,
        };
    }, [ratings]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-[#E9F7F2] rounded-2xl p-10 text-center flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-[#10B981] mb-2">{easyCount}</span>
                        <span className="text-xl font-medium text-[#10B981]">Easy</span>
                    </div>
                    <div className="bg-[#FFF8F0] rounded-2xl p-10 text-center flex flex-col items-center justify-center">
                        <span className="text-5xl font-bold text-[#F59E0B] mb-2">{hardCount}</span>
                        <span className="text-xl font-medium text-[#F59E0B]">Hard</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onBack}
                        className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-[#CBD5E1] text-[#64748B] font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Back to Decks
                    </button>
                    {hardCount > 0 && (
                        <button
                            type="button"
                            onClick={onRepeatDifficult}
                            className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2C5F8D] text-white font-bold hover:bg-[#1e4466] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            <RefreshCcw size={18} />
                            Repeat Difficult
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onRestart}
                        className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gray-100 text-[#475569] font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={20} />
                        Restart All
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export { FlashcardFinished };
