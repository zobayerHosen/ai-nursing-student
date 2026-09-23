"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PracticeByCategorySection from "./practice-category";
import PerformanceSection from "./performance-section";
import {
  useCategoryList,
  useStartExam,
} from "@/hooks/qbank";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function QbankClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("qbank"); // "qbank" | "performance"

  const { category, isLoading } = useCategoryList();
  const { startExam } = useStartExam();

  const handleStartExam = async (topic, subtopic, config, label) => {
    const payload = {
      mode: config.mode,
      total_question: config.count || config.questionCount || 25,
      topic_id: subtopic ? null : topic?.id || null,
      subtopic_id: subtopic ? subtopic.id : null,
    };
    try {
      const res = await startExam(payload);
      const id = res?.data?.session_id || res?.data?.id || res?.session_id || res?.id;
      if (id) {
        const modeParam = config.mode || "tutorial";
        const titleParam = encodeURIComponent(label || "");
        router.push(`/dashboard/qbank/session/${id}?mode=${modeParam}&title=${titleParam}`);
      }
    } catch (err) {
      console.error("Failed to start practice session:", err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden">
      {/* ─── TOP HEADER SECTION (MATCHING DESIGN) ──────────────── */}
      <div className="w-full bg-white border-b border-[#e2e8f0] px-3 sm:px-5 lg:px-6 xl:px-8 pt-3.5 sm:pt-4 lg:pt-5 xl:pt-6">
        <div className="w-full">
          {/* Header Row: Title & AI Action Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3.5 sm:pb-4">
            {/* Title & Badge */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              {/* Question Bank Badge Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-xl bg-[#1e3a5f] text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg
                  className="w-5 h-5 xl:w-6 xl:h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <circle cx="9" cy="10" r="1" />
                  <circle cx="15" cy="10" r="1" />
                  <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
                </svg>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#044E79] tracking-tight">
                  Nursing Question Bank
                </h1>
                <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
                  Master every nursing topic with targeted, NCLEX-style practice.
                </p>
              </div>
            </div>

            {/* AI Custom Quiz Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <Link
                href="/dashboard/notes-to-quize"
                className="w-full sm:w-auto px-4 py-2 lg:px-5 bg-[#1e3a5f] hover:bg-[#162d4a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 whitespace-nowrap shadow-sm transition-all duration-150 cursor-pointer active:scale-98"
              >
                <Plus className="w-4 h-4" />
                <span>Create Custom Quiz With AI</span>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs (QBank | Performance) */}
          <div className="flex items-center gap-5 sm:gap-7 lg:gap-9 -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab("qbank")}
              className={`pb-2.5 sm:pb-3 xl:pb-3.5 text-xs sm:text-sm xl:text-[15px] font-bold transition-all cursor-pointer relative whitespace-nowrap ${
                activeTab === "qbank"
                  ? "text-[#1e3a5f] border-b-2 border-[#fe5e7e]"
                  : "text-[#64748b] hover:text-[#1e3a5f]"
              }`}
            >
              QBank
            </button>

            <button
              onClick={() => setActiveTab("performance")}
              className={`pb-2.5 sm:pb-3 xl:pb-3.5 text-xs sm:text-sm xl:text-[15px] font-bold transition-all cursor-pointer relative whitespace-nowrap ${
                activeTab === "performance"
                  ? "text-[#1e3a5f] border-b-2 border-[#fe5e7e]"
                  : "text-[#64748b] hover:text-[#1e3a5f]"
              }`}
            >
              Performance
            </button>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT AREA ─────────────────────────────────── */}
      <div className="flex-1 w-full px-3 sm:px-5 lg:px-6 xl:px-8 py-4 sm:py-5 lg:py-6 xl:py-7">
        {activeTab === "qbank" ? (
          <PracticeByCategorySection
            onStartExam={handleStartExam}
            category={category}
            isLoading={isLoading}
          />
        ) : (
          <PerformanceSection />
        )}
      </div>
    </div>
  );
}
