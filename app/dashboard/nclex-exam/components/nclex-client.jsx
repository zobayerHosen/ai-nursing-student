"use client";

import { useState } from "react";
import FullNCLEXSection from "./full-nclex-section";
import QuestionInterface from "./question-interface";

export default function NclexClient() {
  const [examState, setExamState] = useState(null);
  const [consumedExams, setConsumedExams] = useState({});

  const handleStartExam = (questions, mode, title, opts = {}) => {
    setExamState({ questions, mode, title, ...opts });
  };

  const handleExamFinish = ({ examId, isFullExam }) => {
    if (isFullExam && examId != null) {
      setConsumedExams((prev) => ({ ...prev, [examId]: true }));
    }
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
        <div className="text-[15px] font-bold text-[#0f172a]">
          Next-Gen NCLEX RN
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-[#64748b] flex items-center gap-1.5">
            <span className="text-amber-500">⭐</span>
            <span className="font-semibold">69%</span> overall
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="w-full flex-1 overflow-hidden flex flex-col">
        <FullNCLEXSection onStartExam={handleStartExam} consumedExams={consumedExams} />
      </div>
    </div>
  );
}
