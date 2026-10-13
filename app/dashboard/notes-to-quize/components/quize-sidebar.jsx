"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, History } from "lucide-react";
import QuizeToolTab from "./quize-tool-tab";
import QuizeHistoryTab from "./quize-history-tab";

export default function QuizeSidebar({
  onGenerate,
  isGenerating = false,
  quizzes = [],
  onSelectHistory,
  selectedHistoryId = null,
  activeTab: controlledTab,
  onTabChange,
}) {
  const [internalTab, setInternalTab] = useState("tool");

  const activeTab = controlledTab !== undefined ? controlledTab : internalTab;
  const setActiveTab = onTabChange || setInternalTab;

  return (
    <aside className="w-full shrink-0 border-r border-[#E5E7EB] bg-white lg:min-h-[calc(100vh-82px)] lg:w-82.5 xl:w-90">
      {/* Tab headers with animated underline */}
      <div className="relative flex border-b border-[#E5E7EB]">
        <button
          type="button"
          onClick={() => setActiveTab("tool")}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition cursor-pointer ${
            activeTab === "tool"
              ? "text-[#2C5F8D]"
              : "text-[#697586] hover:text-[#2C5F8D]"
          }`}
        >
          <Settings2 size={14} />
          <span>Tool</span>
          {activeTab === "tool" && (
            <motion.div
              layoutId="quiz-tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition cursor-pointer ${
            activeTab === "history"
              ? "text-[#2C5F8D]"
              : "text-[#697586] hover:text-[#2C5F8D]"
          }`}
        >
          <History size={14} />
          <span>History</span>
          {quizzes.length > 0 && (
            <span
              className={`ml-0.5 inline-flex items-center justify-center min-w-4.5 h-4.5 rounded-full px-1.5 text-[10px] font-bold leading-none ${
                activeTab === "history"
                  ? "bg-[#2C5F8D] text-white"
                  : "bg-[#E2E8F0] text-[#475569]"
              }`}
            >
              {quizzes.length > 99 ? "99+" : quizzes.length}
            </span>
          )}
          {activeTab === "history" && (
            <motion.div
              layoutId="quiz-tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "tool" ? (
            <QuizeToolTab
              onGenerate={onGenerate}
              isGenerating={isGenerating}
            />
          ) : (
            <QuizeHistoryTab
              quizzes={quizzes}
              onSelectHistory={onSelectHistory}
              selectedHistoryId={selectedHistoryId}
            />
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
