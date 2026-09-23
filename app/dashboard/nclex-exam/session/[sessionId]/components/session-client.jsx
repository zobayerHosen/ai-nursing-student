"use client";

import { useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useGetSessionQuestions,
  useSubmitExamAnswer,
  useFinishExam,
} from "@/hooks";
import QuestionInterface from "@/app/dashboard/nclex-exam/components/question-interface";

export default function SessionClient() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params?.sessionId;

  const {
    sessionData,
    questions: rawQuestions,
    currentQuestionIndex,
    remainingSeconds,
    flaggedQuestionIds,
    isLoading,
    isError,
    refetch,
  } = useGetSessionQuestions(sessionId);

  const { submitAnswer } = useSubmitExamAnswer();
  const { finishExam } = useFinishExam();

  // Format questions array for QuestionInterface
  const formattedQuestions = useMemo(() => {
    if (!rawQuestions || rawQuestions.length === 0) return [];
    return rawQuestions.map((q) => {
      const rawOpts = q.options || [];
      const options = rawOpts.map((opt) =>
        typeof opt === "string" ? opt : opt?.text || opt?.option_text || opt?.title || ""
      );

      let clozeBlanks = q.clozeBlanks || q.cloze_blanks || [];
      if (Array.isArray(clozeBlanks)) {
        clozeBlanks = clozeBlanks.map((blank) => {
          const rawB = blank.options || [];
          const opts = rawB.map((o) =>
            typeof o === "string" ? o : o?.text || o?.option_text || o?.title || ""
          );
          return {
            ...blank,
            options: opts,
            originalOptions: rawB,
          };
        });
      }

      let matrixRows = q.matrixRows || q.matrix_rows || [];
      let matrixCols = q.matrixCols || q.matrix_cols || [];
      matrixRows = matrixRows.map((r) =>
        typeof r === "string" ? r : r?.text || r?.option_text || r?.title || ""
      );
      matrixCols = matrixCols.map((c) =>
        typeof c === "string" ? c : c?.text || c?.option_text || c?.title || ""
      );

      let blankInput = q.blankInput || q.blank_input || {};
      if ((q.type === "input" || q.type === "fill-blank") && !q.blankInput && !q.blank_input) {
        blankInput = {
          kind: q.unit ? "numeric" : "text",
          unit: q.unit || "",
          placeholder: q.unit ? `Enter ${q.unit}` : "Type your answer",
        };
      }

      return {
        ...q,
        question: q.title || q.question || "",
        options,
        originalOptions: rawOpts,
        clozeBlanks,
        matrixRows,
        matrixCols,
        blankInput,
        category: q.topic || q.category || "Clinical Safety",
        topic: q.topic,
        subtopic: q.subtopic,
        client_needs: q.client_needs,
        nclexCategory: q.client_needs || q.nclexCategory,
        rationale: q.note || q.rationale || "",
        passage: q.passage || null,
        difficulty: (q.level || "Intermediate").toLowerCase(),
      };
    });
  }, [rawQuestions]);

  // Initial flagged state
  const initialFlagged = useMemo(() => {
    const map = {};
    (flaggedQuestionIds || []).forEach((qId) => {
      const idx = formattedQuestions.findIndex((q) => q.id === qId);
      if (idx !== -1) map[idx] = true;
    });
    return map;
  }, [flaggedQuestionIds, formattedQuestions]);

  const handleSubmitAnswer = useCallback(
    async (questionId, ansVal, currentIndex) => {
      if (!sessionId) return null;

      const qObj = formattedQuestions.find((q) => q.id === questionId);
      let answer = [];

      if (qObj) {
        if (qObj.type === "fill-blank" || qObj.type === "input") {
          answer = [String(ansVal !== null && ansVal !== undefined ? ansVal : "").trim()];
        } else if (qObj.type === "cloze") {
          if (Array.isArray(ansVal)) {
            answer = ansVal.map((val, idx) => {
              const blank = qObj.clozeBlanks?.[idx];
              if (blank) {
                const rawOpts = blank.originalOptions || blank.options || [];
                const opt = rawOpts[val];
                if (opt && typeof opt === "object" && opt.id !== undefined) return opt.id;
                return opt !== undefined ? opt : val;
              }
              return val;
            });
          } else if (ansVal !== null && ansVal !== undefined) {
            answer = [ansVal];
          }
        } else if (qObj.type === "matrix") {
          if (Array.isArray(ansVal)) {
            answer = ansVal.map((val, idx) => {
              const row = qObj.matrixRows?.[idx];
              if (row && typeof row === "object" && row.id !== undefined) {
                const col = qObj.matrixCols?.[val];
                const colId = col && typeof col === "object" ? col.id : val;
                return { row_id: row.id, col_id: colId };
              }
              return val;
            });
          } else if (ansVal !== null && ansVal !== undefined) {
            answer = [ansVal];
          }
        } else {
          const rawOpts = qObj.originalOptions || qObj.options || [];
          const getOptId = (val) => {
            if (typeof val === "object" && val !== null && val.id !== undefined) return val.id;
            const opt = rawOpts[val];
            if (typeof opt === "object" && opt !== null && opt.id !== undefined) return opt.id;
            const foundById = rawOpts.find((o) => typeof o === "object" && o?.id === val);
            if (foundById) return foundById.id;
            return val;
          };

          if (Array.isArray(ansVal)) {
            answer = ansVal.map(getOptId);
          } else if (ansVal !== null && ansVal !== undefined) {
            answer = [getOptId(ansVal)];
          }
        }
      }

      const payload = {
        session_id: Number(sessionId),
        question_id: questionId,
        answer,
        current_index: (typeof currentIndex === "number" ? currentIndex : 0) + 1,
      };

      try {
        const res = await submitAnswer(payload);
        return res?.data;
      } catch (err) {
        console.error("Error submitting answer in session:", err);
        throw err;
      }
    },
    [sessionId, formattedQuestions, submitAnswer]
  );

  const handleFinishExam = useCallback(async () => {
    if (!sessionId) return null;
    try {
      const res = await finishExam(sessionId);
      router.push(`/dashboard/nclex-exam/report/${sessionId}`);
      return res?.data;
    } catch (err) {
      console.error("Error completing session exam:", err);
      throw err;
    }
  }, [sessionId, finishExam, router]);

  const handleExitExam = useCallback(() => {
    router.push("/dashboard/nclex-exam");
  }, [router]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
        <div className="text-center font-sans">
          <div className="inline-block animate-spin rounded-full h-11 w-11 border-t-3 border-b-3 border-[#1E3A5F] mb-4" />
          <h3 className="text-base font-bold text-[#0f172a] mb-1">Loading Simulation Questions...</h3>
          <p className="text-xs text-[#64748b]">Preparing your Next-Gen NCLEX exam session</p>
        </div>
      </div>
    );
  }

  if (isError || !sessionData || formattedQuestions.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-center mb-4 text-[#94a3b8] shadow-xs">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M10 4v4" />
            <path d="M2 8h20" />
            <line x1="9" y1="13" x2="15" y2="17" />
            <line x1="15" y1="13" x2="9" y2="17" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-[#0f172a] mb-1">Failed to Load Questions</h2>
        <p className="text-xs sm:text-sm text-[#64748b] max-w-sm mb-6">
          We could not load the questions for this exam session. Please try refreshing or return to the exam simulator.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#162e4e] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/dashboard/nclex-exam"
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#334155] text-xs font-semibold rounded-lg transition-colors"
          >
            Back to Simulator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#f4f6f9] min-h-[calc(100vh-80px)] overflow-x-hidden">
      <QuestionInterface
        questions={formattedQuestions}
        mode="test"
        title={sessionData.title || "NCLEX Simulation Exam"}
        examMeta={{
          examId: sessionData.exam_id,
          sessionId: sessionData.session_id || sessionId,
          isFullExam: true,
        }}
        initialQuestionIndex={currentQuestionIndex ?? 0}
        initialTimeLeft={
          remainingSeconds ?? (sessionData.time_limit_mins ? sessionData.time_limit_mins * 60 : 9000)
        }
        initialFlagged={initialFlagged}
        onSubmitAnswer={handleSubmitAnswer}
        onFinishExam={handleFinishExam}
        onFinish={handleExitExam}
      />
    </div>
  );
}
