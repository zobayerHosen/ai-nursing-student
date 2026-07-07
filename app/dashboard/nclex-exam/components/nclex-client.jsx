"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { NGN_TYPES } from "./data";
import NclexSidebar from "./nclex-sidebar";
import PracticeByCategorySection from "./practice-category";
import FullNCLEXSection from "./full-nclex-section";
import QuestionInterface from "./question-interface";

export default function NclexClient() {
  const [section, setSection] = useState("practice-category");
  const [examState, setExamState] = useState(null);
  const [qHistory, setQHistory] = useState({});
  const [qMarked, setQMarked] = useState({});
  const [consumedExams, setConsumedExams] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const applyFilter = (questions, filter) => {
    switch (filter) {
      case "incorrect":
        return questions.filter((q) => qHistory[q.id] === "incorrect");
      case "marked":
        return questions.filter((q) => qMarked[q.id]);
      case "unused":
        return questions.filter((q) => !qHistory[q.id]);
      case "all":
      default:
        return questions;
    }
  };

  const handleStartExam = (questions, mode, title, opts = {}) => {
    setExamState({ questions, mode, title, ...opts });
  };

  const handleExamFinish = ({ answers, flagged, isAnswerScored, examId, isFullExam }) => {
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
    <div className="w-full flex flex-col xl:flex-row h-full xl:min-h-[calc(100vh-80px)] relative bg-[#f4f6f9]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 xl:relative xl:translate-x-0
        ${isSidebarOpen ? "translate-x-0 z-999" : "-translate-x-full"} w-[80%] sm:w-80 xl:w-82.5 shrink-0 bg-white`}
      >
        <NclexSidebar
          section={section}
          onSectionChange={(s) => {
            setSection(s);
            setIsSidebarOpen(false);
          }}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Mobile Header Toggle */}
        <div className="xl:hidden p-4 border-b border-black/10 flex items-center gap-3 bg-white sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Menu size={20} className="text-[#1B4B66]" />
          </button>
          <h2 className="font-semibold text-lg text-[#1B4B66]">NCLEX Exams</h2>
        </div>

        {/* Top bar - larger screens */}
        <div className="hidden xl:flex bg-white border-b border-[#e2e8f0] px-7 h-13.5 items-center justify-between shrink-0">
          <div className="text-[15px] font-bold text-[#0f172a]">
            {section === "practice-category"
              ? "Tutorial QBank"
              : "Next-Gen NCLEX RN"}
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
          {section === "practice-category" && (
            <PracticeByCategorySection
              onStartExam={handleStartExam}
              computeStats={computeStats}
              applyFilter={applyFilter}
            />
          )}
          {section === "full-nclex" && (
            <FullNCLEXSection onStartExam={handleStartExam} consumedExams={consumedExams} />
          )}
        </div>
      </div>
    </div>
  );
}
