import { BookOpen } from "lucide-react";

export default function StudyNotesIndexPage() {
  return (
    <div className="w-full min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#EEEEEE] shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-center max-w-lg w-full flex flex-col items-center">
        {/* Pink Icon Circle */}
        <div className="w-16 h-16 rounded-full bg-[#FFEBF0] flex items-center justify-center mb-6 shrink-0">
          <BookOpen className="w-8 h-8 text-[#FF6B8A]" strokeWidth={1.75} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-[28px] font-bold text-[#111827] mb-3 tracking-tight">
          Clinical Study Notes
        </h1>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-md mb-8">
          Enhance your learning with our comprehensive NCLEX clinical notes. Select a nursing category and topic from the sidebar on the left to start studying.
        </p>

        {/* Info Banner */}
        <div className="w-full bg-[#F0F7FF] border border-[#E0F2FE]/60 rounded-xl py-3.5 px-5">
          <p className="text-xs sm:text-[13px] font-semibold text-[#0284C7] leading-snug">
            Select a category to view assessment, diagnoses, and implementation guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}