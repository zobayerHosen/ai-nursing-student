"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  useGenerateQuiz,
  useGetAllQuizzes,
  useGetQuizById,
} from "@/hooks/interactive-tools";
import QuizeSidebar from "./quize-sidebar";
import EmptyQuiz from "./empty-quiz";
import NotesQuizPlayer, {
  extractQuizId,
  getQuestionsList,
} from "./notes-quiz-player";

export default function NotesToQuizeClient() {
  const [session, setSession] = useState(null);

  const { generateNclexQuiz, isPending: isGenerating } = useGenerateQuiz();
  const { quizzes = [], refetch: refetchQuizzes } = useGetAllQuizzes();

  const resolvedId = session?.id ?? null;
  const isHistory = Boolean(session?.isHistory);

  const { quiz: historyQuiz, isLoading: isLoadingHistory } = useGetQuizById(
    isHistory ? resolvedId : null
  );

  const activeQuiz = isHistory ? historyQuiz : session?.data ?? null;
  const questions = getQuestionsList(activeQuiz);
  const isQuizAvailable = Boolean(activeQuiz && questions.length > 0);

  const handleGenerate = async (formData) => {
    try {
      const response = await generateNclexQuiz(formData);
      const quizPayload = response?.data ?? response;
      const generatedId =
        extractQuizId(quizPayload) || extractQuizId(response) || null;

      setSession({
        id: generatedId,
        isHistory: false,
        data: quizPayload,
      });
      refetchQuizzes();
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Failed to generate quiz");
    }
  };

  const handleReset = () => setSession(null);
  const handleSelectHistory = (id) =>
    setSession(id ? { id, isHistory: true } : null);

  return (
    <section className="flex min-h-[calc(100vh-82px)] flex-col bg-[#F8F9FA] text-[#333E49] lg:flex-row">
      <QuizeSidebar
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
        quizzes={quizzes}
        onSelectHistory={handleSelectHistory}
        selectedHistoryId={isHistory ? resolvedId : null}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {isLoadingHistory ? (
          <div className="flex min-h-[52vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#2C5F8D]" />
          </div>
        ) : isQuizAvailable ? (
          <NotesQuizPlayer
            key={resolvedId ?? "generated-quiz"}
            quiz={activeQuiz}
            quizId={resolvedId}
            onReset={handleReset}
          />
        ) : (
          <div className="flex-1 p-4 sm:p-6">
            <EmptyQuiz recentCount={quizzes.length} />
          </div>
        )}
      </div>
    </section>
  );
}
