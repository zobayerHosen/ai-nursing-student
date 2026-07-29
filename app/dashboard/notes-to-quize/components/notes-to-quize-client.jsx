"use client";

import { useState } from "react";
import { Check, CircleHelp, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

import {
  useGenerateQuiz,
  useGetAllQuizzes,
  useGetQuizById,
} from "@/hooks/interactive-tools";
import QuizeSidebar from "./quize-sidebar";

export default function NotesToQuizeClient() {
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(10);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentSource, setContentSource] = useState("");
  const [generatedResult, setGeneratedResult] = useState(null);
  const [sidebarTab, setSidebarTab] = useState("tool");
  const [viewingHistoryId, setViewingHistoryId] = useState(null);
  const { generateNclexQuiz, isPending } = useGenerateQuiz();
  const { quizzes } = useGetAllQuizzes();
  const { quiz: historyQuiz, isLoading: isLoadingHistory } =
    useGetQuizById(viewingHistoryId);

  const handleGenerate = async () => {
    const hasFile = !!selectedFile;
    const hasContent = contentSource.trim().length > 0;

    if (!hasFile && !hasContent) {
      toast.error("Please upload a file or enter content source");
      return;
    }

    if (
      !selectedQuestionCount ||
      selectedQuestionCount < 1 ||
      selectedQuestionCount > 30
    ) {
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
    // formData.append("nclex_category", selectedCategory);
    // formData.append("question_type", selectedDifficulty);

    try {
      const response = await generateNclexQuiz(formData);
      setGeneratedResult(response?.data ?? null);
      setHasGenerated(true);
      setViewingHistoryId(null);
      toast.success(response?.message ?? "Quiz generated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Failed to generate quiz");
    }
  };

  const handleReset = () => {
    setHasGenerated(false);
    setGeneratedResult(null);
    setViewingHistoryId(null);
  };

  const handleSelectHistory = (id) => {
    setViewingHistoryId(id);
    setHasGenerated(false);
    setGeneratedResult(null);
  };

  const displayResult = viewingHistoryId ? historyQuiz : generatedResult;
  const isLoadingDisplay = viewingHistoryId ? isLoadingHistory : false;

  return (
    <section className="flex min-h-[calc(100vh-82px)] flex-col bg-[#F8F9FA] text-[#333E49] lg:flex-row">
      <QuizeSidebar
        selectedQuestionCount={selectedQuestionCount}
        setSelectedQuestionCount={setSelectedQuestionCount}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        contentSource={contentSource}
        setContentSource={setContentSource}
        onGenerate={handleGenerate}
        isGenerating={isPending}
        activeTab={sidebarTab}
        onTabChange={setSidebarTab}
        quizzes={quizzes}
        onSelectHistory={handleSelectHistory}
        selectedHistoryId={viewingHistoryId}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-h-14 items-center justify-between border-b border-[#E5E7EB] bg-white px-4 py-3 sm:px-6">
          <div />

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#E8F2FC] px-3 py-1 text-[10px] font-semibold uppercase text-[#2C5F8D]">
              NCLEX study
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-7 items-center gap-1 rounded-full border border-[#DCE5EF] bg-white px-3 text-[10px] font-semibold text-[#2C5F8D] transition hover:bg-[#F1F6FB]"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
        </div>

        <main className="flex-1 p-4 sm:p-6">
          {hasGenerated || viewingHistoryId ? (
            isLoadingDisplay ? (
              <div className="flex min-h-[52vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#2C5F8D]" />
              </div>
            ) : displayResult ? (
              <GeneratedQuiz result={displayResult} onClear={handleReset} />
            ) : (
              <EmptyQuiz recentCount={quizzes.length} />
            )
          ) : (
            <EmptyQuiz recentCount={quizzes.length} />
          )}
        </main>
      </div>
    </section>
  );
}

function EmptyQuiz({ recentCount }) {
  return (
    <div className="flex min-h-[52vh] items-start justify-center pt-4 sm:pt-8">
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-xl bg-white px-6 py-12 text-center shadow-sm">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2C5F8D] text-white shadow-sm">
          <CircleHelp size={32} />
        </div>
        <h3 className="text-2xl font-semibold text-[#424242]">No quiz yet</h3>
        <p className="mt-2 max-w-xs text-xs leading-5 text-[#6B7280]">
          Choose your settings and generate NCLEX-style questions.
        </p>
        {recentCount > 0 ? (
          <p className="mt-3 text-[11px] font-semibold text-[#2C5F8D]">
            {recentCount} saved quiz question{recentCount === 1 ? "" : "s"} found
          </p>
        ) : null}
      </div>
    </div>
  );
}

function getQuestions(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.questions)) return result.questions;
  if (result?.question) return [result];
  return [];
}

function getOptions(options) {
  if (Array.isArray(options)) {
    return options.map((option, index) => [
      String.fromCharCode(65 + index),
      option,
    ]);
  }

  if (options && typeof options === "object") {
    return Object.entries(options);
  }

  return [];
}

function GeneratedQuiz({ result, onClear }) {
  const questions = getQuestions(result);

  const handleCopy = async () => {
    const text = questions
      .map((question, index) => {
        const options = getOptions(question.options)
          .map(([letter, option]) => `${letter}. ${option}`)
          .join("\n");

        return `${index + 1}. ${question.question}\n${options}\nAnswer: ${
          question.answer
        }\nExplanation: ${question.explanation ?? ""}`;
      })
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Quiz copied");
    } catch {
      toast.error("Failed to copy quiz");
    }
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 pb-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-[#222427]">
          NCLEX-Style Questions Generated ({questions.length})
        </h3>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!questions.length}
            className="h-8 rounded-md border border-[#D8DEE6] bg-white px-4 text-xs font-semibold text-[#3F4852] transition hover:bg-[#F6F8FA]"
          >
            Copy
          </button>
          <button
            type="button"
            onClick={onClear}
            className="h-8 rounded-md border border-[#D8DEE6] bg-white px-4 text-xs font-semibold text-[#3F4852] transition hover:bg-[#F6F8FA]"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="space-y-7">
        {questions.map((question, questionIndex) => (
          <article
            key={`${question.question}-${questionIndex}`}
            className="space-y-3"
          >
            <p className="text-sm leading-6 text-[#343D48]">
              <span className="font-semibold">{questionIndex + 1}. </span>
              {question.question}
            </p>

            <div className="space-y-3">
              {getOptions(question.options).map(([letter, option]) => (
                <div
                  key={`${letter}-${option}`}
                  className={`flex min-h-12 items-center gap-3 rounded-lg border px-4 py-3 ${
                    question.answer === letter
                      ? "border-[#A6E7C8] bg-[#F0FDF6]"
                      : "border-[#E1E7EF] bg-white"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold ${
                      question.answer === letter
                        ? "bg-[#D3F8DF] text-[#079455]"
                        : "bg-[#F5F8FB] text-[#7A8795]"
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-xs leading-5 text-[#4B5563]">
                    {option}
                  </span>
                </div>
              ))}
            </div>

            <p className="flex items-center gap-1 text-xs font-medium leading-5 text-[#079455]">
              <Check size={13} />
              Correct: {question.answer} - {question.explanation}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
