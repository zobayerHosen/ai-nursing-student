"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FullNCLEXSection from "./full-nclex-section";
import ProgressSection from "./progress-section";
import { useStartExam } from "@/hooks";

export default function NclexClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("simulation"); // "simulation" | "performance"

  const [activeStartingExamId, setActiveStartingExamId] = useState(null);
  const { startExam, isPending: isStarting } = useStartExam();

  const handleStartOrResumeExam = async (exam) => {
    const examId = exam?.id ?? exam?.exam_id ?? exam;
    setActiveStartingExamId(examId);
    try {
      const res = await startExam(examId);
      
      const sessionData =
        res?.data && typeof res.data === "object" && (res.data.session_id || res.data.id)
          ? res.data
          : res?.session_id || res?.id
          ? res
          : res?.data || res;

      const sessionId = sessionData?.session_id || sessionData?.id || exam?.session_id;

      if (sessionId) {
        router.push(`/dashboard/nclex-exam/session/${sessionId}`);
      }
    } catch (err) {
      console.error("Failed to start or resume NCLEX simulation exam:", err);
    } finally {
      setActiveStartingExamId(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col overflow-x-hidden">
      {/* Top Header Section */}
      <div className="w-full bg-white border-b border-[#e2e8f0] px-4 sm:px-6 lg:px-8 xl:px-10 pt-4 sm:pt-5 lg:pt-6">
        <div className="w-full">
          {/* Title & Branding */}
          <div className="flex items-start gap-2.5 sm:gap-3.5 mb-4 sm:mb-5 lg:mb-6">
            {/* Logo / Icon */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#eef4fb] text-[#1E3A5F] flex items-center justify-center shrink-0 shadow-sm border border-primary-100">
              <svg
                className="w-5 h-5 sm:w-5.5 sm:h-5.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M9 10a2.5 2.5 0 1 1 5 0c0 1.5-2 2-2 3" />
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-[#044E79] tracking-tight">
                NCLEX RN Simulator
              </h1>
              <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
                Build Clinical Judgement. Practice real under exam conditions.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-5 sm:gap-6 lg:gap-8 -mb-px overflow-x-auto">
            <button
              onClick={() => setActiveTab("simulation")}
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer relative whitespace-nowrap ${
                activeTab === "simulation"
                  ? "text-[#1E3A5F] border-b-2 border-[#fe5e7e]"
                  : "text-[#64748b] hover:text-[#1E3A5F]"
              }`}
            >
              Simulation Exams
            </button>

            <button
              onClick={() => setActiveTab("performance")}
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer relative whitespace-nowrap ${
                activeTab === "performance"
                  ? "text-[#1E3A5F] border-b-2 border-[#fe5e7e]"
                  : "text-[#64748b] hover:text-[#1E3A5F]"
              }`}
            >
              Performance
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 px-4 sm:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
        <div className="w-full">
          {activeTab === "simulation" ? (
            <FullNCLEXSection
              onStartExam={handleStartOrResumeExam}
              onResumeExam={handleStartOrResumeExam}
              isStarting={isStarting}
              activeStartingExamId={activeStartingExamId}
            />
          ) : (
            <ProgressSection />
          )}
        </div>
      </div>
    </div>
  );
}
