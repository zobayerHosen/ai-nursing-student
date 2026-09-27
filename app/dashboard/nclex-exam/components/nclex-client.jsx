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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_425_74616)">
                  <path d="M2.69383 11.4756C1.20848 11.4756 0 12.6841 0 14.1694V17.3061C0 18.7915 1.20848 20 2.69387 20C4.17926 20 5.3877 18.7915 5.3877 17.3061V14.1694C5.3877 12.6841 4.17922 11.4756 2.69383 11.4756ZM3.82516 17.3061C3.82516 17.9299 3.31766 18.4375 2.69383 18.4375C2.07004 18.4375 1.5625 17.9299 1.5625 17.3061V14.1694C1.5625 13.5456 2.07004 13.0381 2.69387 13.0381C3.3177 13.0381 3.8252 13.5456 3.82516 14.1694V17.3061Z" fill="#64748B" />
                  <path d="M10.0005 0C8.51512 0 7.30664 1.20848 7.30664 2.69387V17.3061C7.30664 18.7915 8.51512 20 10.0005 20C11.4859 20 12.6944 18.7915 12.6944 17.3061V2.69387C12.6944 1.20848 11.4859 0 10.0005 0ZM11.1319 17.3061C11.1319 17.93 10.6243 18.4375 10.0005 18.4375C9.37668 18.4375 8.86914 17.93 8.86914 17.3061V2.69387C8.86914 2.07 9.37668 1.5625 10.0005 1.5625C10.6243 1.5625 11.1319 2.07 11.1319 2.69387V17.3061Z" fill="#64748B" />
                  <path d="M17.3071 5.73828C15.8218 5.73828 14.6133 6.94676 14.6133 8.43215V17.3066C14.6133 18.792 15.8218 20.0005 17.3071 20.0005C18.7925 20.0005 20.001 18.792 20.001 17.3066V8.43215C20.001 6.94676 18.7925 5.73828 17.3071 5.73828ZM18.4385 17.3066C18.4385 17.9305 17.9309 18.438 17.3071 18.438C16.6833 18.438 16.1758 17.9305 16.1758 17.3066V8.43215C16.1758 7.80828 16.6833 7.30078 17.3071 7.30078C17.9309 7.30078 18.4385 7.80828 18.4385 8.43215V17.3066Z" fill="#64748B" />
                </g>
                <defs>
                  <clipPath id="clip0_425_74616">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
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
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer relative whitespace-nowrap ${activeTab === "simulation"
                  ? "text-[#1E3A5F] border-b-2 border-[#fe5e7e]"
                  : "text-[#64748b] hover:text-[#1E3A5F]"
                }`}
            >
              Simulation Exams
            </button>

            <button
              onClick={() => setActiveTab("performance")}
              className={`pb-3 sm:pb-3.5 text-xs sm:text-sm font-bold transition-colors cursor-pointer relative whitespace-nowrap ${activeTab === "performance"
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
