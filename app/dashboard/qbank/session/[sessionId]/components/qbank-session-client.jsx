"use client";

import { useMemo, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  useExamQuestion,
  useSubmitAnswer,
  useFinishExam,
} from "@/hooks/qbank";
import QuestionInterface from "@/app/dashboard/nclex-exam/components/question-interface";

export default function QbankSessionClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = params?.sessionId;
  const mode = searchParams.get("mode") || "tutorial";
  const queryTitle = searchParams.get("title");

  const {
    sessionData,
    examQuestion,
    isLoading,
    isError,
    refetch,
  } = useExamQuestion(sessionId);

  const { submitAnswer } = useSubmitAnswer();
  const { finishExam } = useFinishExam();

  const title = queryTitle
    ? decodeURIComponent(queryTitle)
    : sessionData?.title || "NCLEX Practice Session";

  // Format questions array for QuestionInterface
  const formattedQuestions = useMemo(() => {
    if (!examQuestion) return [];
    return examQuestion.map((q) => {
      const originalOptions = q.options || [];
      const options = originalOptions.map((opt) => {
        if (typeof opt === "string") return opt;
        return opt?.text || opt?.option_text || opt?.title || "";
      });

      let clozeBlanks = q.clozeBlanks || q.cloze_blanks || [];
      if (Array.isArray(clozeBlanks)) {
        clozeBlanks = clozeBlanks.map((blank) => {
          const rawOpts = blank.options || [];
          const opts = rawOpts.map((o) =>
            typeof o === "string" ? o : o?.text || o?.option_text || o?.title || ""
          );
          return {
            ...blank,
            options: opts,
            originalOptions: rawOpts,
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

      // Build blankInput config for input/fill-blank types
      let blankInput = q.blankInput || q.blank_input || {};
      if ((q.type === "input" || q.type === "fill-blank") && !q.blankInput && !q.blank_input) {
        blankInput = {
          kind: q.input_type || (q.unit ? "numeric" : "text"),
          unit: q.unit || "",
          placeholder: q.placeholder || (q.unit ? `Enter ${q.unit}` : "Type your answer"),
        };
      }

      return {
        ...q,
        question: q.title || q.question || "",
        options,
        originalOptions,
        clozeBlanks,
        matrixRows,
        matrixCols,
        blankInput,
        difficulty: q.difficulty || "intermediate",
      };
    });
  }, [examQuestion]);

  const handleSubmitAnswer = useCallback(
    async (questionId, ansVal) => {
      if (!sessionId) return null;
      const qObj =
        formattedQuestions.find((q) => q.id === questionId) ||
        examQuestion?.find((q) => q.id === questionId);
      if (!qObj) return null;

      let answer = null;

      if (qObj.type === "fill-blank" || qObj.type === "input") {
        answer = String(ansVal !== null && ansVal !== undefined ? ansVal : "").trim();
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
        } else {
          answer = ansVal;
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
        } else {
          answer = ansVal;
        }
      } else {
        // For radio, multiple, order, highlight
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
        } else {
          const id = getOptId(ansVal);
          answer = [id];
        }
      }

      const payload = {
        session_id: sessionId,
        question_id: questionId,
        answer,
      };

      try {
        const res = await submitAnswer(payload);
        return res?.data;
      } catch (err) {
        console.error("Error submitting answer:", err);
        throw err;
      }
    },
    [sessionId, formattedQuestions, examQuestion, submitAnswer]
  );

  const handleFinishExam = useCallback(async () => {
    if (!sessionId) return null;
    try {
      const res = await finishExam(sessionId);
      return res?.data;
    } catch (err) {
      console.error("Error finishing exam:", err);
      throw err;
    }
  }, [sessionId, finishExam]);

  const handleExitExam = useCallback(() => {
    router.push("/dashboard/qbank");
  }, [router]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#f4f6f9] min-h-[calc(100vh-80px)] p-6">
        <div className="text-center font-sans">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2C5F8D] mb-4"></div>
          <div className="text-sm font-bold text-[#0f172a]">Loading questions...</div>
          <p className="text-xs text-[#64748b] mt-1">Preparing your practice session</p>
        </div>
      </div>
    );
  }

  if (isError || !examQuestion || formattedQuestions.length === 0) {
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-center mb-4 text-[#94a3b8] shadow-xs">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M10 4v4" />
            <path d="M2 8h20" />
            <line x1="9" y1="13" x2="15" y2="17" />
            <line x1="15" y1="13" x2="9" y2="17" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-[#0f172a] mb-1">Failed to Load Practice Session</h2>
        <p className="text-xs text-[#64748b] max-w-sm mb-6">
          We could not load the questions for this practice session. Please try refreshing or return to the QBank.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#162e4e] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/dashboard/qbank"
            className="px-4 py-2 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#334155] text-xs font-semibold rounded-lg transition-colors"
          >
            Back to QBank
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#f4f6f9] min-h-[calc(100vh-80px)] overflow-x-hidden">
      <QuestionInterface
        questions={formattedQuestions}
        mode={mode}
        title={title}
        examMeta={{ examId: sessionId, isFullExam: false }}
        onFinish={handleExitExam}
        isQBank={true}
        onSubmitAnswer={handleSubmitAnswer}
        onFinishExam={handleFinishExam}
      />
    </div>
  );
}
