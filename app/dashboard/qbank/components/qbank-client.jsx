"use client";

import { useState } from "react";
import { NGN_TYPES } from "../../nclex-exam/components/data";
import PracticeByCategorySection from "./practice-category";
import QuestionInterface from "../../nclex-exam/components/question-interface";
import { useCategoryList, useExamQuestion } from "@/hooks/practice";

export default function QbankClient() {
  const { category, isLoading } = useCategoryList();
  const { examQuestion, isLoading: examQuestionLoading } = useExamQuestion();

  console.log("examQuestion", examQuestion)

  const [examState, setExamState] = useState(null);
  const [qHistory, setQHistory] = useState({});
  const [qMarked, setQMarked] = useState({});

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

  const handleStartExam = (questions, mode, title, opts = {}) => {
    setExamState({ questions, mode, title, ...opts });
  };

  const handleExamFinish = ({ answers, flagged, isAnswerScored }) => {
    const newHistory = { ...qHistory };
    Object.entries(answers).forEach(([idx, ans]) => {
      const q = examState.questions[+idx];
      if (!q) return;
      const ok = isAnswerScored(q, ans);
      if (ok) newHistory[q.id] = "correct";
      else if (newHistory[q.id] !== "correct") newHistory[q.id] = "incorrect";
    });
    setQHistory(newHistory);

    const newMarked = { ...qMarked };
    Object.entries(flagged).forEach(([idx, isFlagged]) => {
      const q = examState.questions[+idx];
      if (!q) return;
      if (isFlagged) newMarked[q.id] = true;
    });
    setQMarked(newMarked);
  };

  if (examState) {
    return (
      <div className="w-full h-full flex flex-col bg-[#f4f6f9] min-h-[calc(100vh-80px)]">
        <QuestionInterface
          questions={examState.questions}
          mode={examState.mode}
          title={examState.title}
          examMeta={{ examId: examState.examId, isFullExam: !!examState.isFullExam }}
          onSessionEnd={handleExamFinish}
          onFinish={() => setExamState(null)}
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
