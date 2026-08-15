"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  RefreshCcw,
  Trophy,
  ThumbsUp,
  ThumbsDown,
  Shuffle,
  ArrowLeft,
  Play,
} from "lucide-react";

import { useMarkAsKnowItOrStillLearning } from "@/hooks/interactive-tools";

// ─── Skeleton
export function NotesFlashcardPlayerSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* top bar */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="h-5 w-24 rounded-full bg-[#E2E8F0]" />
        <div className="h-5 w-32 rounded-full bg-[#E2E8F0]" />
      </div>

      {/* card skeleton */}
      <div className="h-72 w-full rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0] flex flex-col items-center justify-center gap-4 shadow-sm">
        <div className="h-3 w-20 rounded-full bg-[#CBD5E1]" />
        <div className="h-6 w-64 rounded-full bg-[#CBD5E1]" />
        <div className="h-4 w-40 rounded-full bg-[#E2E8F0]" />
      </div>

      {/* stats row */}
      <div className="flex items-center justify-center gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-24 rounded-full bg-[#E2E8F0]" />
        ))}
      </div>

      {/* controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="h-10 w-10 rounded-full bg-[#E2E8F0]" />
        <div className="h-10 w-36 rounded-full bg-[#E2E8F0]" />
        <div className="h-10 w-10 rounded-full bg-[#E2E8F0]" />
      </div>
    </div>
  );
}

// ─── Player ───────────────────────────────────────────────────────────────────
export default function NotesFlashcardPlayer({
  sessionData,
  onReset,
  isHistory = false,
}) {
  const { cardLearnedOrNot } = useMarkAsKnowItOrStillLearning();

  const initialCards = Array.isArray(sessionData?.flashcards)
    ? sessionData.flashcards
    : [];

  const [activeCards, setActiveCards] = useState(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState(
    () =>
      new Set(
        initialCards
          .filter((c) => c.know_it === true)
          .map((c) => c.card_index)
      )
  );
  const [learningIds, setLearningIds] = useState(
    () =>
      new Set(
        initialCards
          .filter((c) => c.know_it === false)
          .map((c) => c.card_index)
      )
  );
  const [hasStartedPractice, setHasStartedPractice] = useState(false);
  const [isFinished, setIsFinished] = useState(Boolean(isHistory));

  const cards = activeCards;
  const currentCard = cards[currentIndex];

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((p) => p + 1), 150);
    } else {
      setIsFinished(true);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex((p) => p - 1), 150);
    }
  };

  const handleKnowIt = (e) => {
    e.stopPropagation();
    const cardIndex = currentCard?.card_index ?? (currentIndex + 1);
    setKnownIds((prev) => new Set([...prev, cardIndex]));
    setLearningIds((prev) => {
      const next = new Set(prev);
      next.delete(cardIndex);
      return next;
    });

    if (sessionData?.id) {
      cardLearnedOrNot({
        id: sessionData.id,
        payload: {
          card_index: cardIndex,
          know_it: true,
        },
      }).catch((err) => {
        console.error("Failed to mark card as know it:", err);
      });
    }

    goNext();
  };

  const handleStillLearning = (e) => {
    e.stopPropagation();
    const cardIndex = currentCard?.card_index ?? (currentIndex + 1);
    setLearningIds((prev) => new Set([...prev, cardIndex]));
    setKnownIds((prev) => {
      const next = new Set(prev);
      next.delete(cardIndex);
      return next;
    });

    if (sessionData?.id) {
      cardLearnedOrNot({
        id: sessionData.id,
        payload: {
          card_index: cardIndex,
          know_it: false,
        },
      }).catch((err) => {
        console.error("Failed to mark card as still learning:", err);
      });
    }

    goNext();
  };

  const handleStartPracticeAll = () => {
    setActiveCards(initialCards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownIds(new Set());
    setLearningIds(new Set());
    setHasStartedPractice(true);
    setIsFinished(false);
  };

  const handleShuffleRestart = () => {
    const shuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setActiveCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownIds(new Set());
    setLearningIds(new Set());
    setHasStartedPractice(true);
    setIsFinished(false);
  };

  const handlePracticeStillLearning = () => {
    // Filter cards marked as know_it === false from API response or in learningIds set
    const difficultCards = initialCards.filter(
      (card) => learningIds.has(card.card_index) || card.know_it === false
    );

    const cardsToPlay = difficultCards.length > 0 ? difficultCards : initialCards;

    setActiveCards(cardsToPlay);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownIds(new Set());
    setLearningIds(new Set());
    setHasStartedPractice(true);
    setIsFinished(false);
  };

  // ── Empty guard ───────────────────────────────────────────────────────────
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 text-sm">No flashcards available in this session.</p>
      </div>
    );
  }

  // ── Finished / Progress screen ───────────────────────────────────────────────
  if (isFinished) {
    const isHistoryInitial = isHistory && !hasStartedPractice;

    const knownCount = isHistoryInitial
      ? (sessionData?.know_it_count ?? 0)
      : knownIds.size;
    const learningCount = isHistoryInitial
      ? (sessionData?.still_learning_count ?? 0)
      : learningIds.size;
    const totalCount = isHistoryInitial
      ? (sessionData?.total_cards ?? initialCards.length)
      : initialCards.length;

    const rawPercentage =
      isHistoryInitial && sessionData?.mastered_percentage !== undefined
        ? sessionData.mastered_percentage
        : totalCount > 0
        ? (knownCount / totalCount) * 100
        : 0;

    const masteredPercentage = Math.round(rawPercentage);

    // Donut SVG calculations
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset =
      circumference - (masteredPercentage / 100) * circumference;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl mx-auto space-y-5"
      >
        {/* Main Card Container */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 md:p-8 shadow-sm text-center">
          {/* Trophy Icon */}
          <div className="flex justify-center mb-2">
            <Trophy className="h-9 w-9 text-[#F59E0B]" />
          </div>

          <h2 className="text-xl font-bold text-[#1E293B] mb-6">
            Session Complete!
          </h2>

          {/* Circular Progress Gauge */}
          <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-3">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-[#E6F0EC]"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-[#0D7A5F] transition-all duration-700 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <span className="absolute text-lg font-bold text-[#0D7A5F]">
              {masteredPercentage}%
            </span>
          </div>

          <p className="text-xs font-semibold text-[#64748B] mb-6">
            {knownCount} of {totalCount} cards mastered
          </p>

          {/* Stats Boxes */}
          <div className="grid grid-cols-2 gap-4">
            {/* Know It Box */}
            <div className="bg-[#EBF7EE] rounded-xl p-4 flex flex-col items-center justify-center gap-1">
              <ThumbsUp className="h-5 w-5 text-[#10B981]" />
              <span className="text-xl font-bold text-[#10B981]">{knownCount}</span>
              <span className="text-xs font-semibold text-[#10B981]">Know It</span>
            </div>

            {/* Still Learning Box */}
            <div className="bg-[#FDF2F2] rounded-xl p-4 flex flex-col items-center justify-center gap-1">
              <ThumbsDown className="h-5 w-5 text-[#F43F5E]" />
              <span className="text-xl font-bold text-[#F43F5E]">
                {learningCount}
              </span>
              <span className="text-xs font-semibold text-[#F43F5E]">
                Still Learning
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Stack */}
        <div className="space-y-3">
          {/* Practice / Start Button */}
          <button
            type="button"
            onClick={
              learningCount > 0
                ? handlePracticeStillLearning
                : handleStartPracticeAll
            }
            className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold bg-[#2C5F8D] hover:bg-[#20496E] text-white cursor-pointer flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            {learningCount > 0 ? (
              <>
                <RefreshCcw size={15} />
                <span>Practice Still Learning ({learningCount} cards)</span>
              </>
            ) : (
              <>
                <Play size={15} />
                <span>Practice All Cards ({totalCount} cards)</span>
              </>
            )}
          </button>

          {/* Shuffle & Restart All Button */}
          <button
            type="button"
            onClick={handleShuffleRestart}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold bg-white border border-[#DCE5EF] hover:bg-[#F8FAFC] text-[#334155] cursor-pointer flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Shuffle size={15} />
            <span>Shuffle &amp; Restart All</span>
          </button>

          {/* Back to Setup Button */}
          <button
            type="button"
            onClick={onReset}
            className="w-full py-3.5 px-4 rounded-xl text-xs font-semibold bg-white border border-[#DCE5EF] hover:bg-[#F8FAFC] text-[#64748B] cursor-pointer flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <ArrowLeft size={15} />
            <span>Back to Setup</span>
          </button>
        </div>
      </motion.div>
    );
  }

  // ── Main player ───────────────────────────────────────────────────────────
  const knownCount = knownIds.size;
  const learningCount = learningIds.size;
  const remaining = cards.length - knownCount - learningCount;

  return (
    <div className="w-full">
      {/* top bar */}
      <div className="flex items-center justify-between mb-6 px-2">
        <span className="text-xs font-semibold text-[#64748B]">
          {currentIndex + 1} / {cards.length}
        </span>
        <button
          type="button"
          onClick={() => setIsFinished(true)}
          className="text-xs font-semibold text-[#94A3B8] hover:text-[#2C5F8D] transition-colors cursor-pointer"
        >
          ✕ End
        </button>
      </div>

      {/* source badge */}
      {sessionData?.file_name && (
        <div className="flex justify-center mb-4">
          <span className="rounded-full bg-[#E8F2FC] px-4 py-1 text-[11px] font-semibold text-[#2C5F8D]">
            {sessionData.file_name}
          </span>
        </div>
      )}

      {/* ── Flip card ─────────────────────────────────────────────────────── */}
      <div
        className="relative h-64 w-full cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => setIsFlipped((f) => !f)}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.55,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl border border-[#E2E8F0] shadow-md flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-[10px] font-black text-[#2C5F8D] uppercase tracking-[0.2em] mb-4">
              TERM
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-[#1E293B] leading-snug max-w-[85%]">
              {currentCard?.question ?? ""}
            </h3>
            <div className="absolute bottom-6 flex items-center gap-1.5 text-[#94A3B8] text-xs font-medium">
              <RotateCcw size={13} />
              <span>Click to reveal answer</span>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 w-full h-full bg-[#F8FAFF] rounded-2xl border border-[#C7D8EF] shadow-md flex flex-col items-center justify-center p-8 text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-[10px] font-black text-[#2C5F8D] uppercase tracking-[0.2em] mb-4">
              DEFINITION
            </p>
            <p className="text-base md:text-lg font-medium text-[#334155] leading-relaxed max-w-[85%]">
              {currentCard?.answer ?? ""}
            </p>
            <p className="absolute bottom-6 text-[11px] text-[#94A3B8] font-medium">
              Click to flip back
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-6 mt-6 text-[11px] font-semibold">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#10B981]" />
          <span className="text-[#10B981]">{knownCount} Known</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
          <span className="text-[#F59E0B]">{learningCount} Still Learning</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#94A3B8]" />
          <span className="text-[#94A3B8]">{remaining} Remaining</span>
        </span>
      </div>

      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center mt-6 gap-4">
        <AnimatePresence mode="wait">
          {isFlipped ? (
            <motion.div
              key="rating"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-3 w-full justify-center"
            >
              <button
                type="button"
                onClick={handleKnowIt}
                className="cursor-pointer flex-1 max-w-36 flex items-center justify-center bg-[#EBF7F1] text-[#10B981] px-5 py-3 rounded-xl text-xs font-bold hover:bg-[#b8f3d6] transition-all shadow-md shadow-emerald-500/20"
              >
                Know It
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="cursor-pointer flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2C5F8D] text-white text-xs font-bold hover:bg-[#1e4466] transition-all shadow-xl shadow-primary/20"
              >
                <RotateCcw size={14} />
                Flip Card
              </button>
              <button
                type="button"
                onClick={handleStillLearning}
                className="cursor-pointer flex-1 max-w-36 flex items-center justify-center bg-[#FFF8F0] text-[#F59E0B] px-5 py-3 rounded-xl text-xs font-bold hover:bg-[#fce9c3] transition-all shadow-md shadow-amber-500/20"
              >
                Still Learning
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="nav"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center justify-center gap-4"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                disabled={currentIndex === 0}
                className={`cursor-pointer p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 transition-all shadow-sm ${
                  currentIndex === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-gray-50 hover:text-[#2C5F8D] hover:border-[#2C5F8D]/30 hover:scale-105"
                }`}
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped((f) => !f);
                }}
                className="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2C5F8D] text-white text-xs font-semibold hover:bg-[#1e4466] hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95"
              >
                <RotateCcw size={16} />
                Flip Card
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="cursor-pointer p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#2C5F8D] hover:border-[#2C5F8D]/30 hover:scale-105 transition-all shadow-sm"
              >
                <ChevronRight size={22} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-full px-2 mt-2">
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden border border-gray-200">
            <motion.div
              className="h-full bg-[#2C5F8D] rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIndex + 1) / cards.length) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            />
          </div>
          <div className="text-center text-[10px] text-gray-400 mt-1.5 font-medium">
            {Math.ceil(((currentIndex + 1) / cards.length) * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
}
