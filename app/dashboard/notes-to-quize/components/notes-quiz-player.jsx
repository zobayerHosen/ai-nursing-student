"use client";

import { useState } from "react";
import {
  Check,
  XCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  useGetQuizScore,
  useRestartQuiz,
  useSubmitQuestionAnswer,
} from "@/hooks/interactive-tools";
import ScoreOverviewScreen from "./score-overview-screen";

export function extractQuizId(quiz, fallbackId) {
  if (!quiz && !fallbackId) return null;
  if (typeof quiz === "number") return quiz;
  if (typeof quiz === "string" && quiz !== "null" && quiz !== "undefined") {
    return quiz;
  }
  const candidate =
    quiz?.id ??
    quiz?.quiz_id ??
    quiz?.data?.id ??
    quiz?.data?.quiz_id ??
    quiz?.data?.data?.id ??
    quiz?.quiz?.id ??
    fallbackId ??
    null;

  if (candidate === "null" || candidate === "undefined") return null;
  return candidate;
}

export function getQuestionsList(quiz) {
  if (!quiz) return [];
  if (Array.isArray(quiz)) return quiz;
  if (Array.isArray(quiz?.quiz)) return quiz.quiz;
  if (Array.isArray(quiz?.questions)) return quiz.questions;
  if (Array.isArray(quiz?.data?.quiz)) return quiz.data.quiz;
  if (Array.isArray(quiz?.data)) return quiz.data;
  if (quiz?.question) return [quiz];
  return [];
}

function parseOptions(options) {
  if (!options) return [];
  if (Array.isArray(options)) {
    return options.map((opt, idx) => [String.fromCharCode(65 + idx), opt]);
  }
  if (typeof options === "object") {
    return Object.entries(options);
  }
  return [];
}

// Single Question Renderer Card
function QuestionCardItem({
  question,
  questionIndex,
  userAnswer,
  onSelectAnswer,
}) {
  if (!question) return null;

  const qType = question.type || "MCQ";
  const options = parseOptions(question.options);
  const isSata = qType === "SATA";
  const isFitb = qType === "FITB";
  const hasScenario = Boolean(question.scenario);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-xs border border-[#E5E7EB] space-y-6">
      {/* Top Metadata Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#1E293B] text-sm">
            Q{questionIndex + 1}
          </span>
          <span className="text-[#94A3B8]">•</span>
          {/* Category Badge */}
          <span className="rounded-md bg-[#E8F2FC] px-2.5 py-1 font-semibold text-[#2C5F8D]">
            {question.nclex_category || question.category || "Pharmacology"}
          </span>
          {/* Question Format Badge */}
          <span className="rounded-md bg-[#FEF3C7] px-2.5 py-1 font-semibold text-[#D97706]">
            {qType === "MCQ"
              ? "Multiple Choice"
              : qType === "SATA"
              ? "Select All That Apply"
              : qType === "NGN"
              ? "Next-Gen Case Study"
              : qType === "FITB"
              ? "Fill-In-The-Blank"
              : qType}
          </span>
        </div>

        <span className="text-[11px] font-medium text-[#64748B]">
          {question.sub_category || "Physiological Adaptation"}
        </span>
      </div>

      {/* Clinical Scenario Box (for NGN case studies) */}
      {hasScenario && (
        <div className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-xs leading-6 text-[#334155]">
          <p className="font-semibold text-[#1E4E79] mb-1">
            Clinical Case Scenario:
          </p>
          <p>{question.scenario}</p>
        </div>
      )}

      {/* Question Statement */}
      <h2 className="text-sm sm:text-base font-semibold leading-7 text-[#1E293B]">
        {question.question}
      </h2>

      {/* Answer Options Section */}
      {!isFitb ? (
        <div className="space-y-3">
          {options.map(([letter, optionText]) => {
            const isSelected = isSata
              ? Array.isArray(userAnswer) && userAnswer.includes(letter)
              : userAnswer === letter;

            const cardBg = isSelected
              ? "bg-[#F0F7FF] border-[#2C5F8D] ring-1 ring-[#2C5F8D]/20"
              : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]";

            return (
              <button
                key={letter}
                type="button"
                onClick={() => {
                  if (isSata) {
                    const currentArr = Array.isArray(userAnswer)
                      ? userAnswer
                      : [];
                    const nextArr = currentArr.includes(letter)
                      ? currentArr.filter((item) => item !== letter)
                      : [...currentArr, letter];
                    onSelectAnswer(nextArr);
                  } else {
                    onSelectAnswer(letter);
                  }
                }}
                className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left text-xs sm:text-sm transition cursor-pointer ${cardBg}`}
              >
                {/* Radio Circle / Checkbox icon */}
                {isSata ? (
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition ${
                      isSelected
                        ? "border-[#2C5F8D] bg-[#2C5F8D] text-white"
                        : "border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]"
                    }`}
                  >
                    {isSelected && <Check size={14} />}
                  </div>
                ) : (
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                      isSelected
                        ? "border-[#2C5F8D] bg-white"
                        : "border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]"
                    }`}
                  >
                    {isSelected && (
                      <div className="h-2.5 w-2.5 rounded-full bg-[#2C5F8D]" />
                    )}
                  </div>
                )}

                <span className="font-bold text-[#1E293B] shrink-0">
                  {letter}.
                </span>
                <span className="leading-6 text-[#334155]">{optionText}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Fill in the blank input */
        <div className="space-y-3">
          <input
            type="text"
            value={userAnswer || ""}
            onChange={(e) => onSelectAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 text-xs sm:text-sm text-[#1E293B] outline-none focus:border-[#2C5F8D] focus:bg-white"
          />
        </div>
      )}
    </div>
  );
}

export default function NotesQuizPlayer({
  quiz,
  quizId: propQuizId,
  onReset,
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewMode, setViewMode] = useState("one-at-a-time");
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedFeedback, setSubmittedFeedback] = useState({});
  const [showScoreSummary, setShowScoreSummary] = useState(false);

  const currentQuizId = extractQuizId(quiz, propQuizId);

  const { submitAnswer, isPending: isSubmittingAnswer } =
    useSubmitQuestionAnswer();
  const { restartNclexQuiz, isPending: isRestarting } = useRestartQuiz();
  const {
    scoreData,
    isLoading: isLoadingScore,
    refetch: refetchScore,
  } = useGetQuizScore(showScoreSummary && currentQuizId ? currentQuizId : null);

  const questions = getQuestionsList(quiz);
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || null;

  const handleSelectAnswer = async (questionIdx, selectedVal) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIdx]: selectedVal,
    }));

    if (currentQuizId) {
      try {
        const res = await submitAnswer({
          id: currentQuizId,
          payload: {
            question_index: questionIdx,
            user_answer: selectedVal,
          },
        });
        if (res) {
          setSubmittedFeedback((prev) => ({
            ...prev,
            [questionIdx]: res?.data ?? res,
          }));
        }
      } catch {
        // Fallback local feedback if submit API fails
      }
    }
  };

  const handleEndQuiz = () => {
    setShowScoreSummary(true);
    if (currentQuizId) {
      refetchScore();
    }
  };

  const handleRestartExam = async () => {
    if (currentQuizId) {
      try {
        await restartNclexQuiz(currentQuizId);
        setUserAnswers({});
        setSubmittedFeedback({});
        setCurrentQuestionIndex(0);
        setShowScoreSummary(false);
      } catch {
        // Handled in hook
      }
    } else {
      setUserAnswers({});
      setSubmittedFeedback({});
      setCurrentQuestionIndex(0);
      setShowScoreSummary(false);
    }
  };

  // Count validly answered questions
  const answeredCount = questions.reduce((acc, _, idx) => {
    const val = userAnswers[idx];
    if (Array.isArray(val)) return val.length > 0 ? acc + 1 : acc;
    if (val !== undefined && val !== null && String(val).trim() !== "")
      return acc + 1;
    return acc;
  }, 0);

  const isAllAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  if (showScoreSummary) {
    return (
      <ScoreOverviewScreen
        questions={questions}
        userAnswers={userAnswers}
        scoreData={scoreData}
        isLoadingScore={isLoadingScore}
        onRestart={handleRestartExam}
        isRestarting={isRestarting}
        onNewQuiz={onReset}
      />
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* Top Header Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-[#1E4E79] px-4 py-3 text-white sm:px-6 shadow-sm">
        {/* Left header controls - End Quiz */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={handleEndQuiz}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 hover:bg-white/10 transition cursor-pointer"
          >
            <XCircle size={15} />
            <span>End Quiz</span>
          </button>
        </div>

        {/* Right header controls */}
        <div className="flex items-center gap-3">
          {/* Segmented View Mode Toggle */}
          <div className="flex items-center rounded-lg bg-[#143756] p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setViewMode("one-at-a-time")}
              className={`rounded-md px-3 py-1 text-xs transition cursor-pointer ${
                viewMode === "one-at-a-time"
                  ? "bg-white font-semibold text-[#1E4E79] shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              One at a Time
            </button>
            <button
              type="button"
              onClick={() => setViewMode("all-questions")}
              className={`rounded-md px-3 py-1 text-xs transition cursor-pointer ${
                viewMode === "all-questions"
                  ? "bg-white font-semibold text-[#1E4E79] shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              All Questions
            </button>
          </div>

          <span className="text-xs font-semibold text-white/90">
            {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>
      </header>

      {/* Question Content View */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto">
        {viewMode === "one-at-a-time" ? (
          <QuestionCardItem
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            userAnswer={userAnswers[currentQuestionIndex]}
            onSelectAnswer={(val) =>
              handleSelectAnswer(currentQuestionIndex, val)
            }
          />
        ) : (
          <div className="space-y-8">
            {questions.map((q, idx) => (
              <QuestionCardItem
                key={q.id ?? idx}
                question={q}
                questionIndex={idx}
                userAnswer={userAnswers[idx]}
                onSelectAnswer={(val) => handleSelectAnswer(idx, val)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Bottom Sticky Navigation & Submit Footer */}
      <footer className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E7EB] bg-white px-4 py-3 sm:px-6 shadow-md">
        {/* Progress dots / Count indicator */}
        <div className="flex items-center gap-3">
          {viewMode === "one-at-a-time" && (
            <div className="flex items-center gap-1.5">
              {questions.map((_, idx) => {
                const isAnswered = userAnswers[idx] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      isCurrent
                        ? "w-6 bg-[#1E4E79]"
                        : isAnswered
                        ? "w-2.5 bg-[#2C5F8D]"
                        : "w-2.5 bg-[#CBD5E1]"
                    }`}
                    title={`Go to Question ${idx + 1}`}
                  />
                );
              })}
            </div>
          )}
          <span className="text-xs font-semibold text-[#64748B]">
            {answeredCount} of {totalQuestions} answered
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {viewMode === "one-at-a-time" ? (
            <>
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() =>
                  setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
                }
                className="flex h-9 items-center gap-1 rounded-md border border-[#CBD5E1] bg-white px-4 text-xs font-semibold text-[#334155] transition hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="flex h-9 items-center gap-1 rounded-md bg-[#1E4E79] px-5 text-xs font-semibold text-white transition hover:bg-[#143756] cursor-pointer"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!isAllAnswered}
                  onClick={handleEndQuiz}
                  className="flex h-9 items-center gap-1.5 rounded-md bg-success px-5 text-xs font-semibold text-white transition hover:bg-[#047857] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-success cursor-pointer"
                  title={
                    !isAllAnswered
                      ? `Please answer all ${totalQuestions} questions to finish (${answeredCount}/${totalQuestions} answered)`
                      : "Finish quiz and view results"
                  }
                >
                  <CheckCircle2 size={16} />
                  Finish Quiz & View Results
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              disabled={!isAllAnswered}
              onClick={handleEndQuiz}
              className="flex h-9 items-center gap-1.5 rounded-md bg-success px-5 text-xs font-semibold text-white transition hover:bg-[#047857] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-success cursor-pointer"
              title={
                !isAllAnswered
                  ? `Please answer all ${totalQuestions} questions to submit (${answeredCount}/${totalQuestions} answered)`
                  : "Submit all answers"
              }
            >
              <CheckCircle2 size={16} />
              Submit All Answers & View Results
            </button>
          )}

          <button
            type="button"
            onClick={() =>
              toast(
                "Need help? Read the scenario and select the most appropriate option.",
                { icon: "💡" }
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#64748B] hover:bg-[#F8FAFC] transition cursor-pointer"
            title="Help"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}
