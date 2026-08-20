"use client";

import { useMemo, useState } from "react";
import { NGN_TYPES } from "../../nclex-exam/components/data";
import PracticeByCategorySection from "./practice-category";
import QuestionInterface from "../../nclex-exam/components/question-interface";
import { useCategoryList, useExamQuestion, useStartExam, useSubmitAnswer, useFinishExam } from "@/hooks/qbank";

export default function QbankClient() {
  const { category, isLoading } = useCategoryList();
  const { startExam, isPending: isStarting } = useStartExam();
  const { submitAnswer } = useSubmitAnswer();
  const { finishExam } = useFinishExam();

  const [sessionId, setSessionId] = useState(null);
  const { sessionData, examQuestion, isLoading: examQuestionLoading } = useExamQuestion(sessionId);

  console.log("examQuestion", examQuestion);

  const [examState, setExamState] = useState(null);
  const [qHistory, setQHistory] = useState({});
  const [qMarked, setQMarked] = useState({});

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
          const opts = rawOpts.map((o) => (typeof o === "string" ? o : o?.text || o?.option_text || o?.title || ""));
          return {
            ...blank,
            options: opts,
            originalOptions: rawOpts,
          };
        });
      }

      let matrixRows = q.matrixRows || q.matrix_rows || [];
      let matrixCols = q.matrixCols || q.matrix_cols || [];
      matrixRows = matrixRows.map((r) => (typeof r === "string" ? r : r?.text || r?.option_text || r?.title || ""));
      matrixCols = matrixCols.map((c) => (typeof c === "string" ? c : c?.text || c?.option_text || c?.title || ""));

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

  const isExamLoading = isStarting || (sessionId && examQuestionLoading);

  const computeStats = (questions) => {
    const buckets = {
      unused: { classic: 0, ngn: 0 },
      incorrect: { classic: 0, ngn: 0 },
      marked: { classic: 0, ngn: 0 },
      all: { classic: 0, ngn: 0 },
    };
    questions.forEach((q) => {
      const ngn = NGN_TYPES.has(q.type);
      const key = ngn ? "ngn" : "classic";
      buckets.all[key]++;
      if (qHistory[q.id] === "incorrect") buckets.incorrect[key]++;
      if (qMarked[q.id]) buckets.marked[key]++;
      if (!qHistory[q.id]) buckets.unused[key]++;
    });
    return buckets;
  };

  const handleStartExam = async (topic, subtopic, config, label) => {
    const payload = {
      mode: config.mode,
      total_question: config.count,
      topic_id: subtopic ? null : topic.id,
      subtopic_id: subtopic ? subtopic.id : null,
    };
    try {
      const res = await startExam(payload);
      const id = res?.data?.session_id || res?.data?.id || res?.session_id || res?.id;
      if (id) {
        setSessionId(id);
        setExamState({
          mode: config.mode,
          title: label,
          examId: id,
        });
      }
    } catch (err) {
      console.error("Failed to start practice session:", err);
    }
  };

  const handleSubmitAnswer = async (questionId, ansVal) => {
    if (!sessionId) return null;
    const qObj = formattedQuestions.find((q) => q.id === questionId) || examQuestion.find((q) => q.id === questionId);
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
  };

  const handleFinishExam = async () => {
    if (!sessionId) return null;
    try {
      const res = await finishExam(sessionId);
      return res?.data;
    } catch (err) {
      console.error("Error finishing exam:", err);
      throw err;
    }
  };

  const handleExamFinish = ({ answers, flagged, isAnswerScored }) => {
    const newHistory = { ...qHistory };
    Object.entries(answers).forEach(([idx, ans]) => {
      const q = formattedQuestions[+idx];
      if (!q) return;
      const ok = isAnswerScored(q, ans);
      if (ok) newHistory[q.id] = "correct";
      else if (newHistory[q.id] !== "correct") newHistory[q.id] = "incorrect";
    });
    setQHistory(newHistory);

    const newMarked = { ...qMarked };
    Object.entries(flagged).forEach(([idx, isFlagged]) => {
      const q = formattedQuestions[+idx];
      if (!q) return;
      if (isFlagged) newMarked[q.id] = true;
    });
    setQMarked(newMarked);
  };

  const handleExitExam = () => {
    setExamState(null);
    setSessionId(null);
  };

  if (examState) {
    if (isExamLoading) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f4f6f9] min-h-[calc(100vh-80px)]">
          <div className="text-center font-sans">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#2C5F8D] mb-4"></div>
            <div className="text-sm font-bold text-[#0f172a]">Loading questions...</div>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-full flex flex-col bg-[#f4f6f9] min-h-[calc(100vh-80px)]">
        <QuestionInterface
          questions={formattedQuestions}
          mode={examState.mode}
          title={examState.title}
          examMeta={{ examId: examState.examId, isFullExam: false }}
          onSessionEnd={handleExamFinish}
          onFinish={handleExitExam}
          isQBank={true}
          onSubmitAnswer={handleSubmitAnswer}
          onFinishExam={handleFinishExam}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-full xl:min-h-[calc(100vh-80px)] relative bg-[#f4f6f9]">
      {/* Top bar - larger screens */}
      <div className="hidden xl:flex bg-white border-b border-[#e2e8f0] px-7 h-13.5 items-center justify-between shrink-0">
        <span className="text-[15px] font-bold text-[#0f172a]">
          Tutorial QBank
        </span>
        <div className="flex items-center gap-3">
          <div className="text-xs text-[#64748b] flex items-center gap-1.5">
            <span className="text-amber-500">⭐</span>
            <span className="font-semibold">69%</span> overall
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="w-full flex-1 overflow-hidden flex flex-col">
        <PracticeByCategorySection
          onStartExam={handleStartExam}
          computeStats={computeStats}
          category={category}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
