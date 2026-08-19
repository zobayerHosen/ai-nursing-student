"use client";

import { useState, useEffect } from "react";
import {
  Check,
  XCircle,
  RotateCcw,
  CircleHelp,
  ChevronLeft,
  ChevronRight,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  useDeleteAllQuizzes,
  useDeleteSingleQuiz,
  useGenerateQuiz,
  useGetAllQuizzes,
  useGetQuizById,
  useGetQuizScore,
  useRestartQuiz,
  useSubmitQuestionAnswer,
} from "@/hooks/interactive-tools";
import QuizeSidebar from "./quize-sidebar";

// Helper to extract quiz ID safely from various API response shapes
function extractQuizId(quiz, fallbackId) {
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

export default function NotesToQuizeClient() {
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(10);
  const [selectedProgram, setSelectedProgram] = useState("RN");
  const [selectedQuizType, setSelectedQuizType] = useState("MCQ");
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentSource, setContentSource] = useState("");

  const [sidebarTab, setSidebarTab] = useState("tool");
  const [viewingHistoryId, setViewingHistoryId] = useState(null);
  const [activeQuiz, setActiveQuiz] = useState(null);

  // Exam Player State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewMode, setViewMode] = useState("one-at-a-time"); // 'one-at-a-time' | 'all-questions'
  const [userAnswers, setUserAnswers] = useState({}); // { [question_index]: "B" | ["A", "C"] }
  const [submittedFeedback, setSubmittedFeedback] = useState({}); // { [question_index]: responseData }
  const [showScoreSummary, setShowScoreSummary] = useState(false);

  // Extracted Quiz ID for API requests
  const currentQuizId = extractQuizId(activeQuiz, viewingHistoryId);

  // Hooks
  const { generateNclexQuiz, isPending: isGenerating } = useGenerateQuiz();
  const { quizzes, refetch: refetchQuizzes } = useGetAllQuizzes();
  const { quiz: historyQuiz, isLoading: isLoadingHistory } = useGetQuizById(viewingHistoryId);
  const { submitAnswer, isPending: isSubmittingAnswer } = useSubmitQuestionAnswer();
  const { scoreData, isLoading: isLoadingScore, refetch: refetchScore } = useGetQuizScore(
    showScoreSummary && currentQuizId ? currentQuizId : null
  );
  const { restartNclexQuiz, isPending: isRestarting } = useRestartQuiz();
  const { deleteSingleQuizItem, isPending: isDeletingSingle } = useDeleteSingleQuiz();
  const { deleteAllQuizItems, isPending: isDeletingAll } = useDeleteAllQuizzes();

  // Load history quiz when selected
  useEffect(() => {
    if (historyQuiz && viewingHistoryId) {
      setActiveQuiz(historyQuiz);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setSubmittedFeedback({});
      setShowScoreSummary(false);
    }
  }, [historyQuiz, viewingHistoryId]);

  const handleGenerate = async () => {
    const hasFile = !!selectedFile;
    const hasContent = contentSource.trim().length > 0;

    if (!hasFile && !hasContent) {
      toast.error("Please upload a file or enter content source");
      return;
    }

    if (!selectedQuestionCount || selectedQuestionCount < 1 || selectedQuestionCount > 30) {
      toast.error("Question amount must be between 1 and 30");
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile, selectedFile.name);
    }
    if (hasContent) {
      formData.append("content_source", contentSource);
    }
    formData.append("question_requested", String(selectedQuestionCount));
    if (selectedProgram) formData.append("program", selectedProgram);
    if (selectedQuizType) formData.append("question_format", selectedQuizType);

    try {
      const response = await generateNclexQuiz(formData);
      const quizPayload = response?.data ?? response;
      const generatedId = extractQuizId(quizPayload) || extractQuizId(response);

      setActiveQuiz(quizPayload);
      if (generatedId) {
        setViewingHistoryId(generatedId);
      }
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setSubmittedFeedback({});
      setShowScoreSummary(false);
      refetchQuizzes();
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Failed to generate quiz");
    }
  };

  const handleReset = () => {
    setActiveQuiz(null);
    setViewingHistoryId(null);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setSubmittedFeedback({});
    setShowScoreSummary(false);
  };

  const handleSelectHistory = (id) => {
    setViewingHistoryId(id);
    setShowScoreSummary(false);
  };

  const handleDeleteHistoryItem = async (id) => {
    try {
      await deleteSingleQuizItem(id);
      if (viewingHistoryId === id || currentQuizId === id) {
        handleReset();
      }
    } catch {
      // Error handled by hook toast
    }
  };

  const handleDeleteAllHistory = async () => {
    try {
      await deleteAllQuizItems();
      handleReset();
    } catch {
      // Error handled by hook toast
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

  // Helper to extract questions array safely from activeQuiz
  const questions = getQuestionsList(activeQuiz);
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] || null;

  return (
    <section className="flex min-h-[calc(100vh-82px)] flex-col bg-[#F8F9FA] text-[#333E49] lg:flex-row">
      <QuizeSidebar
        selectedQuestionCount={selectedQuestionCount}
        setSelectedQuestionCount={setSelectedQuestionCount}
        selectedProgram={selectedProgram}
        setSelectedProgram={setSelectedProgram}
        selectedQuizType={selectedQuizType}
        setSelectedQuizType={setSelectedQuizType}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        contentSource={contentSource}
        setContentSource={setContentSource}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        activeTab={sidebarTab}
        onTabChange={setSidebarTab}
        quizzes={quizzes}
        onSelectHistory={handleSelectHistory}
        selectedHistoryId={viewingHistoryId}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onDeleteAllHistory={handleDeleteAllHistory}
        isDeletingSingle={isDeletingSingle}
        isDeletingAll={isDeletingAll}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {activeQuiz && questions.length > 0 ? (
          showScoreSummary ? (
            <ScoreOverviewScreen
              quiz={activeQuiz}
              questions={questions}
              userAnswers={userAnswers}
              scoreData={scoreData}
              isLoadingScore={isLoadingScore}
              onRestart={handleRestartExam}
              isRestarting={isRestarting}
              onNewQuiz={handleReset}
            />
          ) : (
            <QuizPlayerInterface
              questions={questions}
              quizId={currentQuizId}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              viewMode={viewMode}
              setViewMode={setViewMode}
              userAnswers={userAnswers}
              onSelectAnswer={handleSelectAnswer}
              submittedFeedback={submittedFeedback}
              onEndQuiz={handleEndQuiz}
              isSubmitting={isSubmittingAnswer}
            />
          )
        ) : (
          <div className="flex-1 p-4 sm:p-6">
            {isLoadingHistory ? (
              <div className="flex min-h-[52vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#2C5F8D]" />
              </div>
            ) : (
              <EmptyQuiz recentCount={quizzes.length} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// Extract questions array safely across backend payload variants
function getQuestionsList(quiz) {
  if (!quiz) return [];
  if (Array.isArray(quiz)) return quiz;
  if (Array.isArray(quiz?.quiz)) return quiz.quiz;
  if (Array.isArray(quiz?.questions)) return quiz.questions;
  if (Array.isArray(quiz?.data?.quiz)) return quiz.data.quiz;
  if (Array.isArray(quiz?.data)) return quiz.data;
  if (quiz?.question) return [quiz];
  return [];
}

// Convert options object or array to [letter, text] tuples
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

function EmptyQuiz({ recentCount }) {
  return (
    <div className="flex min-h-[52vh] items-start justify-center pt-4 sm:pt-8">
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-2xl bg-white px-6 py-12 text-center shadow-xs border border-[#E5E7EB]">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2C5F8D] text-white shadow-sm">
          <CircleHelp size={32} />
        </div>
        <h3 className="text-2xl font-semibold text-[#1E293B]">No quiz generated yet</h3>
        <p className="mt-2 max-w-xs text-xs leading-5 text-[#64748B]">
          Upload notes or paste study content in the sidebar and click &quot;Generate Quiz&quot; to begin.
        </p>
        {recentCount > 0 ? (
          <p className="mt-4 rounded-full bg-[#E8F2FC] px-4 py-1 text-xs font-semibold text-[#2C5F8D]">
            {recentCount} saved quiz history session{recentCount === 1 ? "" : "s"} available
          </p>
        ) : null}
      </div>
    </div>
  );
}

// Main Interactive Quiz Player UI matching demo design
function QuizPlayerInterface({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  currentQuestion,
  totalQuestions,
  viewMode,
  setViewMode,
  userAnswers,
  onSelectAnswer,
  onEndQuiz,
}) {
  // Count validly answered questions
  const answeredCount = questions.reduce((acc, _, idx) => {
    const val = userAnswers[idx];
    if (Array.isArray(val)) return val.length > 0 ? acc + 1 : acc;
    if (val !== undefined && val !== null && String(val).trim() !== "") return acc + 1;
    return acc;
  }, 0);

  const isAllAnswered = totalQuestions > 0 && answeredCount === totalQuestions;

  return (
    <div className="flex flex-1 flex-col">
      {/* Top Header Bar */}
      <header className="flex flex-wrap items-center justify-between gap-3 bg-[#1E4E79] px-4 py-3 text-white sm:px-6 shadow-sm">
        {/* Left header controls - End Quiz */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={onEndQuiz}
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
            onSelectAnswer={(val) => onSelectAnswer(currentQuestionIndex, val)}
          />
        ) : (
          <div className="space-y-8">
            {questions.map((q, idx) => (
              <QuestionCardItem
                key={q.id ?? idx}
                question={q}
                questionIndex={idx}
                userAnswer={userAnswers[idx]}
                onSelectAnswer={(val) => onSelectAnswer(idx, val)}
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
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
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
                  onClick={onEndQuiz}
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
              onClick={onEndQuiz}
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
              toast("Need help? Read the scenario and select the most appropriate option.", {
                icon: "💡",
              })
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
          <p className="font-semibold text-[#1E4E79] mb-1">Clinical Case Scenario:</p>
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
                    const currentArr = Array.isArray(userAnswer) ? userAnswer : [];
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
                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-[#2C5F8D]" />}
                  </div>
                )}

                <span className="font-bold text-[#1E293B] shrink-0">{letter}.</span>
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

// Full Score & Performance Summary Component
function ScoreOverviewScreen({
  questions,
  userAnswers,
  scoreData,
  isLoadingScore,
  onRestart,
  isRestarting,
  onNewQuiz,
}) {
  const total = scoreData?.total_questions ?? questions.length;
  const correct = scoreData?.correct_count ?? calculateCorrectLocal(questions, userAnswers);
  const incorrect = scoreData?.incorrect_count ?? Math.max(total - correct, 0);
  const answered = scoreData?.answered_count ?? Object.keys(userAnswers).length;
  const scorePercent =
    scoreData?.score_percentage !== undefined
      ? Math.round(scoreData.score_percentage)
      : total > 0
      ? Math.round((correct / total) * 100)
      : 0;
  const isPassed = scoreData?.passed ?? scorePercent >= 70;

  // Render score breakdown list from backend API response when available
  const reviewList =
    Array.isArray(scoreData?.breakdown) && scoreData.breakdown.length > 0
      ? scoreData.breakdown
      : questions.map((q, idx) => ({
          question_index: idx,
          question: q.question,
          user_answer: userAnswers[idx],
          correct_answer: q.answer || q.answers,
          is_correct: isAnswerCorrect(userAnswers[idx], q.answer || q.answers),
          explanation: q.explanation,
        }));

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
      {/* Score Header Banner */}
      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xs border border-[#E5E7EB] text-center space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F2FC] text-[#2C5F8D]">
          <Award size={40} />
        </div>
        <h2 className="text-2xl font-bold text-[#1E293B]">Exam Results</h2>
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl font-extrabold text-[#1E4E79]">{scorePercent}%</span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              isPassed ? "bg-[#D1FAE5] text-[#065F46]" : "bg-[#FEE2E2] text-[#991B1B]"
            }`}
          >
            {isPassed ? "PASSED" : "NEEDS IMPROVEMENT"}
          </span>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#F1F5F9]">
          <div className="rounded-xl bg-[#F8FAFC] p-3 text-center">
            <p className="text-[11px] font-semibold text-[#64748B]">Total Questions</p>
            <p className="text-lg font-bold text-[#1E293B] mt-1">{total}</p>
          </div>
          <div className="rounded-xl bg-[#ECFDF5] p-3 text-center">
            <p className="text-[11px] font-semibold text-[#047857]">Correct</p>
            <p className="text-lg font-bold text-[#065F46] mt-1">{correct}</p>
          </div>
          <div className="rounded-xl bg-[#FEF2F2] p-3 text-center">
            <p className="text-[11px] font-semibold text-[#B91C1C]">Incorrect</p>
            <p className="text-lg font-bold text-[#991B1B] mt-1">{incorrect}</p>
          </div>
          <div className="rounded-xl bg-[#F8FAFC] p-3 text-center">
            <p className="text-[11px] font-semibold text-[#64748B]">Answered</p>
            <p className="text-lg font-bold text-[#1E293B] mt-1">{answered}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            disabled={isRestarting}
            onClick={onRestart}
            className="flex h-10 items-center gap-2 rounded-xl bg-[#1E4E79] px-5 text-xs font-semibold text-white hover:bg-[#143756] transition cursor-pointer disabled:opacity-50"
          >
            <RotateCcw size={15} />
            {isRestarting ? "Restarting..." : "Retake Quiz"}
          </button>
          <button
            type="button"
            onClick={onNewQuiz}
            className="flex h-10 items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-5 text-xs font-semibold text-[#334155] hover:bg-[#F8FAFC] transition cursor-pointer"
          >
            Generate New Quiz
          </button>
        </div>
      </div>

      {/* Detailed Question Review */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[#1E293B]">Question Review</h3>
        {reviewList.map((item, idx) => {
          const isCorrect = item.is_correct ?? isAnswerCorrect(item.user_answer, item.correct_answer);
          const qText = item.question;
          const uAns = item.user_answer;
          const cAns = item.correct_answer;
          const exp = item.explanation;
          const qNum = (item.question_index !== undefined ? item.question_index : idx) + 1;

          return (
            <div
              key={idx}
              className={`rounded-xl bg-white p-5 border shadow-xs space-y-3 ${
                isCorrect ? "border-[#A7F3D0]" : "border-[#FECACA]"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1E293B]">Question {qNum}</span>
                <span
                  className={`flex items-center gap-1 font-semibold ${
                    isCorrect ? "text-success" : "text-[#DC2626]"
                  }`}
                >
                  {isCorrect ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  {isCorrect ? "Correct" : "Incorrect"}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-[#1E293B]">{qText}</p>

              <div className="text-xs space-y-1 text-[#475569] bg-[#F8FAFC] p-3 rounded-lg">
                <p>
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {formatAnsDisplay(uAns) || "None"}
                </p>
                <p>
                  <span className="font-semibold text-success">Correct Answer:</span>{" "}
                  {formatAnsDisplay(cAns)}
                </p>
                {exp && (
                  <p className="pt-1 text-[#64748B]">
                    <span className="font-semibold">Rationale:</span> {exp}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function calculateCorrectLocal(questions, userAnswers) {
  let count = 0;
  questions.forEach((q, idx) => {
    const uAns = userAnswers[idx];
    const cAns = q.answer || q.answers;
    if (isAnswerCorrect(uAns, cAns)) count++;
  });
  return count;
}

function isAnswerCorrect(userAns, correctAns) {
  if (!userAns) return false;
  if (Array.isArray(userAns) && Array.isArray(correctAns)) {
    return (
      userAns.length === correctAns.length &&
      userAns.every((val) => correctAns.includes(val))
    );
  }
  return String(userAns).trim().toLowerCase() === String(correctAns).trim().toLowerCase();
}

function formatAnsDisplay(ans) {
  if (Array.isArray(ans)) return ans.join(", ");
  if (ans === undefined || ans === null) return "";
  return String(ans);
}
