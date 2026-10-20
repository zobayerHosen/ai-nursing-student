"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export default function FlashcardControls({
    isFlipped,
    currentIndex,
    progressPercent,
    onRating,
    onPrev,
    onNext,
    onFlip,
}) {
    return (
        <div className="flex flex-col items-center mt-12 gap-8">
            <AnimatePresence mode="wait">
                {isFlipped ? (
                    <motion.div
                        key="rating-controls"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center gap-4 w-full justify-center"
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRating?.("easy");
                            }}
                            className="cursor-pointer flex-1 max-w-37.5 flex items-center justify-center bg-[#EBF7F1] text-[#5BBA8B] px-5 py-3 rounded-md font-bold hover:bg-[#b8f3d6] transition-all shadow-md shadow-emerald-500/20"
                        >
                            <span>Easy</span>
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onRating?.("hard");
                            }}
                            className="cursor-pointer flex-1 max-w-37.5 flex items-center justify-center bg-[#FEF6E6] text-[#F7B32B] px-5 py-3 rounded-md font-bold hover:bg-[#fce9c3] transition-all shadow-md shadow-amber-500/20"
                        >
                            <span>Hard</span>
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="navigation-controls"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-center justify-center gap-4"
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPrev?.();
                            }}
                            disabled={currentIndex === 0}
                            className={`cursor-pointer p-2 rounded-full bg-white border border-gray-100 text-gray-600 transition-all shadow-sm ${
                                currentIndex === 0
                                    ? "opacity-30 cursor-not-allowed"
                                    : "hover:bg-gray-50 hover:text-primary hover:border-primary/20 hover:scale-105"
                            }`}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onFlip?.();
                            }}
                            className="cursor-pointer text-sm flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2C5F8D] text-white font-medium hover:bg-[#1e4466] hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95"
                        >
                            <RotateCcw size={18} />
                            <span>Flip Card</span>
                        </button>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNext?.();
                            }}
                            className="cursor-pointer p-2 rounded-full bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 hover:text-primary hover:border-primary/20 hover:scale-105 transition-all shadow-sm"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress Bar */}
            <div className="w-full px-2">
                <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden border border-gray-200 p-0.5">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    />
                </div>

                <div className="text-center text-gray-500 mt-2 font-medium text-sm">
                    {progressPercent}%
                </div>
            </div>
        </div>
    );
}

export { FlashcardControls };
