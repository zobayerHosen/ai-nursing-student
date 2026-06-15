"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, ArrowLeft, Check, X, RefreshCcw, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { useSubmitFlashcardAnswer } from "@/hooks/flashcards";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const FlashcardPlayer = ({ topic, onBack, categoryId, subcategoryId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const queryClient = useQueryClient();
    const { submitAnswer } = useSubmitFlashcardAnswer();
    const [ratings, setRatings] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [activeCards, setActiveCards] = useState(topic?.questions || topic?.flashcards || []);

    const cards = activeCards;
    const currentCard = cards[currentIndex];

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 150);
        } else {
            setIsFinished(true);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentIndex((prev) => prev - 1);
            }, 150);
        }
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleRating = useCallback((rating) => {
        // Build the answer submit payload
        const payload = {
            category_id: categoryId,
            subcategory_id: Number(subcategoryId),
            card_id: topic.id,
            answers: [
                {
                    question_id: currentCard.id,
                    is_easy: rating === 'easy',
                },
            ],
        };

        // Submit answer to API (fire-and-forget for UX – don't block navigation)
        submitAnswer(payload)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ["flashcard-progress"] });
                toast.success("Answer is Submitted")
            })
            .catch(() => {
                // Silently handle errors – ratings still saved locally
                toast.error("Something went wrong!");
            });

        setRatings(prev => ({ ...prev, [currentCard.id]: rating }));
        handleNext();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCard, categoryId, subcategoryId, submitAnswer]);

    const handleRepeatDifficult = () => {
        const difficultCards = cards.filter(card => ratings[card.id] === 'hard');
        if (difficultCards.length > 0) {
            setActiveCards(difficultCards);
            setCurrentIndex(0);
            setIsFlipped(false);
            setIsFinished(false);
            setRatings({});
        }
    };

    const handleRestart = () => {
        setActiveCards(topic?.questions || topic?.flashcards || []);
        setCurrentIndex(0);
        setIsFlipped(false);
        setIsFinished(false);
        setRatings({});
    };

    if (cards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">No flashcards available for this topic yet.</p>
                <button onClick={onBack} className="mt-4 text-primary font-medium flex items-center gap-2">
                    <ArrowLeft size={18} /> Back to Topics
                </button>
            </div>
        );
    }

    // Note: When Flashcards are finished show this UI
    if (isFinished) {
        const easyCount = Object.values(ratings).filter(r => r === 'easy').length;
        const hardCount = Object.values(ratings).filter(r => r === 'hard').length;

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

                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-6 mb-10">
                        <h4 className="font-bold text-[#1E293B] mb-2 text-lg">Study Feedback:</h4>
                        <p className="text-[#64748B] leading-relaxed">
                            Keep practicing daily. The SM-2 algorithm will show difficult cards more often — consistency builds retention.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-gray-100">
                        <button
                            onClick={onBack}
                            className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-[#CBD5E1] text-[#64748B] font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={20} />
                            Back to Topics
                        </button>
                        {hardCount > 0 && (
                            <button
                                onClick={handleRepeatDifficult}
                                className="cursor-pointer w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2C5F8D] text-white font-bold hover:bg-[#1e4466] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                <RefreshCcw />
                                Repeat Difficult
                            </button>
                        )}
                        <button
                            onClick={handleRestart}
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

    // Note: Main UI
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8 px-2">
                <button
                    onClick={onBack}
                    className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-primary transition-all rounded font-medium"
                >
                    <ArrowLeft size={20} />
                    <span className="hidden sm:inline">Back to {topic?.name ?? topic?.title ?? ""} Topics</span>
                    <span className="sm:hidden">Back</span>
                </button>
                <div className="text-sm font-semibold bg-primary/10 text-primary px-4 py-1.5 rounded-full shadow-sm">
                    Card {currentIndex + 1} of {cards.length}
                </div>
            </div>

            {/* Flashcard Container */}
            <div className="relative h-112.5 w-full perspective-[1000px] cursor-pointer group" onClick={handleFlip}>
                <motion.div
                    className="w-full h-full relative transform-3d transition-all duration-500"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                >
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-primary/10 rounded-[10px] shadow-[0_20px_50px_-20px_rgba(44,95,141,0.15)] flex flex-col items-center justify-center p-12 text-center overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-3 bg-primary/30"></div>
                        <span className="absolute top-8 left-8 text-[10px] font-black text-primary uppercase tracking-[0.2em]">Study Question</span>
                        <div className="w-full max-w-[80%] h-full flex items-center justify-center overflow-y-auto custom-scrollbar pt-10 pb-10">
                            {currentCard?.image && (
                                <div className="relative w-full aspect-video max-h-45 mb-6 overflow-hidden">
                                    <Image
                                        src={`${BASE_URL}${currentCard.image}`}
                                        alt="Study question image"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}

                            <h3 className={`${currentCard?.image ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'} font-bold text-[#1E293B] leading-tight text-center w-full`}>
                                {currentCard?.question_text ?? currentCard?.front ?? ""}
                            </h3>
                        </div>

                        <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                            <p className="text-sm text-gray-400 font-medium italic">Click to reveal answer</p>
                            <RotateCcw size={16} className="text-primary animate-pulse" />
                        </div>
                    </div>


                    {/* Back Side */}
                    <div
                        className="absolute inset-0 w-full h-full backface-hidden bg-white text-black rounded-[10px] shadow-[0_0_8px_0_rgba(0,0,0,0.10)] flex flex-col items-center justify-center p-8 text-center overflow-hidden"
                        style={{ transform: "rotateY(180deg)" }}
                    >
                        <span className="absolute top-8 left-8 text-[10px] font-black text-primary uppercase tracking-[0.2em]">The Answer</span>

                        <div className="w-full max-w-[80%] h-full flex items-center justify-center overflow-y-auto custom-scrollbar pt-10 pb-10">
                            {currentCard?.ans_image && (
                                <div className="relative w-full aspect-video max-h-45 mb-6 overflow-hidden">
                                    <Image
                                        src={`${BASE_URL}${currentCard.ans_image}`}
                                        alt="Study aid answer"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}

                            <div className="w-full">
                                <h3 className={`${currentCard?.ans_image ? 'text-xl md:text-2xl' : 'text-2xl md:text-4xl'} font-medium leading-relaxed`}>
                                    {currentCard?.answer_text ?? currentCard?.back ?? ""}
                                </h3>
                            </div>
                        </div>

                        <p className="absolute bottom-6 text-xs text-gray-500 font-medium tracking-wide">Click to flip back to question</p>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
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
                                onClick={(e) => { e.stopPropagation(); handleRating('easy'); }}
                                className="cursor-pointer flex-1 max-w-37.5 flex items-center justify-center bg-[#EBF7F1] text-[#5BBA8B] px-5 py-3 rounded-md font-bold hover:bg-[#b8f3d6] transition-all shadow-md shadow-emerald-500/20"
                            >
                                <span>Easy</span>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleRating('hard'); }}
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
                                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                disabled={currentIndex === 0}
                                className={`cursor-pointer p-2 rounded-full bg-white border border-gray-100 text-gray-600 transition-all shadow-sm ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 hover:text-primary hover:border-primary/20 hover:scale-105'}`}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleFlip(); }}
                                className="cursor-pointer text-sm flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2C5F8D] text-white font-medium hover:bg-[#1e4466] hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95"
                            >
                                <RotateCcw size={18} />
                                <span>Flip Card</span>
                            </button>

                            <button
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
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
                            animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />
                    </div>

                    {/* want to show the parcentage */}
                    <div className="text-center text-gray-500 mt-2"> {Math.ceil(((currentIndex + 1) / cards?.length) * 100)}% </div>
                </div>
            </div>
        </div>
    );
};
export default FlashcardPlayer;