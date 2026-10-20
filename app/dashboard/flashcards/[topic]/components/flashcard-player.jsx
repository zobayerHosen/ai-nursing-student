"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { RotateCcw, ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useSubmitFlashcardAnswer } from "@/hooks/flashcards";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CardFace from "./card-face";
import FlashcardControls from "./flashcard-controls";
import FlashcardFinished from "./flashcard-finished";

const FlashcardPlayer = ({ topic }) => {
    const router = useRouter();
    const topicDetails = Array.isArray(topic?.cards) ? topic.cards : [];
    const [activeCards, setActiveCards] = useState(topicDetails);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const queryClient = useQueryClient();
    const { submitAnswer } = useSubmitFlashcardAnswer();
    const [ratings, setRatings] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (Array.isArray(topic?.cards)) {
            setActiveCards(topic.cards);
            setCurrentIndex(0);
            setIsFlipped(false);
            setIsFinished(false);
            setRatings({});
        }
    }, [topic]);

    const cards = activeCards;
    const currentCard = cards[currentIndex];

    const answerTextRef = useRef(null);
    const questionTextRef = useRef(null);

    // Reset scroll positions on card change or flip
    useEffect(() => {
        if (answerTextRef.current) answerTextRef.current.scrollTop = 0;
        if (questionTextRef.current) questionTextRef.current.scrollTop = 0;
    }, [currentIndex, isFlipped]);

    // Ensure mouse wheel events directly scroll text containers inside 3D cards
    useEffect(() => {
        const handleWheel = (e) => {
            const el = e.currentTarget;
            if (!el) return;

            if (el.scrollHeight > el.clientHeight) {
                e.preventDefault();
                e.stopPropagation();
                el.scrollTop += e.deltaY;
            }
        };

        const ansEl = answerTextRef.current;
        const qEl = questionTextRef.current;

        if (ansEl) ansEl.addEventListener("wheel", handleWheel, { passive: false });
        if (qEl) qEl.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            if (ansEl) ansEl.removeEventListener("wheel", handleWheel);
            if (qEl) qEl.removeEventListener("wheel", handleWheel);
        };
    }, [currentIndex, isFlipped, currentCard]);

    const handleManualScroll = useCallback((e) => {
        const el = e.currentTarget;
        if (el && el.scrollHeight > el.clientHeight) {
            e.stopPropagation();
            el.scrollTop += e.deltaY;
        }
    }, []);

    const handleNext = useCallback(() => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
            }, 150);
        } else {
            setIsFinished(true);
        }
    }, [currentIndex, cards.length]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentIndex((prev) => prev - 1);
            }, 150);
        }
    }, [currentIndex]);

    const handleFlip = useCallback(() => {
        setIsFlipped((prev) => !prev);
    }, []);

    const handleRating = useCallback(
        (rating) => {
            if (!currentCard) return;

            const resolvedDeckId = Number(topic?.id);
            const payload = {
                deck_id: resolvedDeckId,
                answers: [
                    {
                        card_id: Number(currentCard.id),
                        is_easy: rating === "easy",
                    },
                ],
            };

            submitAnswer(payload)
                .then(() => {
                    queryClient.invalidateQueries({ queryKey: ["flashcard-progress"] });
                    toast.success("Answer is Submitted");
                })
                .catch((err) => {
                    const errMsg = err?.response?.data?.message || "Something went wrong!";
                    toast.error(errMsg);
                });

            setRatings((prev) => ({ ...prev, [currentCard.id]: rating }));
            handleNext();
        },
        [currentCard, topic, submitAnswer, queryClient, handleNext]
    );

    const handleRepeatDifficult = useCallback(() => {
        const difficultCards = (topic?.cards || []).filter((card) => ratings[card.id] === "hard");
        if (difficultCards.length > 0) {
            setActiveCards(difficultCards);
            setCurrentIndex(0);
            setIsFlipped(false);
            setIsFinished(false);
            setRatings({});
        }
    }, [topic?.cards, ratings]);

    const handleRestart = useCallback(() => {
        setActiveCards(topic?.cards || []);
        setCurrentIndex(0);
        setIsFlipped(false);
        setIsFinished(false);
        setRatings({});
    }, [topic?.cards]);

    const progressPercent = useMemo(() => {
        if (!cards?.length) return 0;
        return Math.ceil(((currentIndex + 1) / cards.length) * 100);
    }, [currentIndex, cards?.length]);

    if (!cards || cards.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">No flashcards available for this topic yet.</p>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="mt-4 text-primary font-medium flex items-center gap-2 cursor-pointer"
                >
                    <ArrowLeft size={18} /> Back to Decks
                </button>
            </div>
        );
    }

    if (isFinished) {
        return (
            <FlashcardFinished
                ratings={ratings}
                onRepeatDifficult={handleRepeatDifficult}
                onRestart={handleRestart}
                onBack={() => router.back()}
            />
        );
    }

    return (
        <div className="w-full">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 px-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-primary transition-all rounded font-medium"
                >
                    <ArrowLeft size={20} />
                    <span className="hidden sm:inline">Back to {topic?.name || topic?.title || "Decks"}</span>
                    <span className="sm:hidden">Back</span>
                </button>
                <div className="text-sm font-semibold bg-primary/10 text-primary px-4 py-1.5 rounded-full shadow-sm">
                    Card {currentIndex + 1} of {cards.length}
                </div>
            </div>

            {/* Flashcard Container */}
            <div
                className="relative min-h-115 h-112.5 sm:h-120 w-full perspective-[1000px] cursor-pointer group"
                onClick={handleFlip}
            >
                <motion.div
                    className="w-full h-full relative transform-3d transition-all duration-500"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                >
                    {/* Front Side */}
                    <CardFace
                        title="Study Question"
                        image={currentCard?.image}
                        text={currentCard?.question_text}
                        textRef={questionTextRef}
                        onWheel={handleManualScroll}
                        isFront
                        footer={
                            <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                <p className="text-sm text-gray-400 font-medium italic">Click to reveal answer</p>
                                <RotateCcw size={16} className="text-primary animate-pulse" />
                            </div>
                        }
                    />

                    {/* Back Side */}
                    <CardFace
                        title="The Answer"
                        image={currentCard?.ans_image}
                        text={currentCard?.answer_text}
                        textRef={answerTextRef}
                        onWheel={handleManualScroll}
                        style={{ transform: "rotateY(180deg)" }}
                        footer={
                            <p className="text-xs text-gray-500 font-medium tracking-wide">
                                Click to flip back to question
                            </p>
                        }
                    />
                </motion.div>
            </div>

            {/* Controls */}
            <FlashcardControls
                isFlipped={isFlipped}
                currentIndex={currentIndex}
                progressPercent={progressPercent}
                onRating={handleRating}
                onPrev={handlePrev}
                onNext={handleNext}
                onFlip={handleFlip}
            />
        </div>
    );
};

export default FlashcardPlayer;