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
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#eef4fb] text-[#1E3A5F] flex items-center justify-center shrink-0 shadow-sm border border-primary-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <g clipPath="url(#clip0_425_74629)">
                    <path d="M9.28672 0C9.09775 0 8.91652 0.0750668 8.7829 0.208686C8.64929 0.342306 8.57422 0.523533 8.57422 0.7125V9.2875C8.57422 9.85606 8.80008 10.4013 9.20211 10.8034C9.60414 11.2054 10.1494 11.4313 10.718 11.4313H19.2867C19.3808 11.4313 19.474 11.4126 19.5608 11.3764C19.6477 11.3402 19.7265 11.2872 19.7928 11.2204C19.859 11.1535 19.9114 11.0742 19.9468 10.9871C19.9822 10.8999 20 10.8066 19.9992 10.7125C19.9959 7.87238 18.8662 5.14954 16.8579 3.14127C14.8497 1.13301 12.1268 0.00330823 9.28672 0ZM10.718 10C10.6239 10.0008 10.5306 9.98301 10.4434 9.94757C10.3562 9.91213 10.2769 9.85978 10.2101 9.79354C10.1433 9.72729 10.0902 9.64847 10.054 9.56161C10.0178 9.47476 9.99922 9.38159 9.99922 9.2875V1.45625C12.2075 1.62958 14.2813 2.58538 15.8476 4.15164C17.4138 5.7179 18.3696 7.79176 18.543 10H10.718Z" fill="#64748B" />
                    <path d="M17.6 12.8999C17.5114 12.8683 17.4174 12.8546 17.3234 12.8595C17.2295 12.8644 17.1374 12.8879 17.0526 12.9286C16.9678 12.9692 16.8918 13.0263 16.8292 13.0965C16.7665 13.1667 16.7183 13.2486 16.6875 13.3374C16.1298 14.9453 15.0612 16.3264 13.6449 17.2699C12.2286 18.2134 10.5423 18.6673 8.84375 18.5624C6.90237 18.442 5.07337 17.6106 3.70606 16.2272C2.33874 14.8437 1.52892 13.0051 1.43125 11.0624C1.35077 9.37924 1.81668 7.71514 2.75946 6.31843C3.70224 4.92172 5.07135 3.86728 6.6625 3.31244C6.75115 3.28125 6.83278 3.23291 6.90274 3.17017C6.9727 3.10743 7.02961 3.03153 7.07024 2.9468C7.11086 2.86206 7.1344 2.77016 7.13951 2.67633C7.14462 2.5825 7.13119 2.48858 7.1 2.39994C7.06881 2.3113 7.02047 2.22967 6.95774 2.15971C6.895 2.08975 6.8191 2.03283 6.73436 1.9922C6.64963 1.95158 6.55772 1.92804 6.46389 1.92293C6.37006 1.91783 6.27615 1.93125 6.1875 1.96244C4.30962 2.616 2.69294 3.85843 1.57807 5.50484C0.463196 7.15124 -0.0902815 9.11362 3.74392e-06 11.0999C0.111678 13.3988 1.06514 15.5763 2.67874 17.2176C4.29234 18.8589 6.45332 19.8492 8.75 19.9999H9.275C11.1968 20.0109 13.0739 19.4202 14.6431 18.3106C16.2123 17.201 17.3948 15.6281 18.025 13.8124C18.0895 13.6351 18.0809 13.4394 18.0012 13.2683C17.9215 13.0972 17.7772 12.9647 17.6 12.8999Z" fill="#64748B" />
                  </g>
                  <defs>
                    <clipPath id="clip0_425_74629">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
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
              className={`pb-2.5 sm:pb-3 xl:pb-3.5 text-xs sm:text-sm xl:text-[15px] font-bold transition-all cursor-pointer relative whitespace-nowrap ${activeTab === "qbank"
                  ? "text-[#1e3a5f] border-b-2 border-[#fe5e7e]"
                  : "text-[#64748b] hover:text-[#1e3a5f]"
                }`}
            >
              QBank
            </button>

            <button
              onClick={() => setActiveTab("performance")}
              className={`pb-2.5 sm:pb-3 xl:pb-3.5 text-xs sm:text-sm xl:text-[15px] font-bold transition-all cursor-pointer relative whitespace-nowrap ${activeTab === "performance"
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
