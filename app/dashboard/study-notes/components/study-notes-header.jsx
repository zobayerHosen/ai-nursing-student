import { BookOpen, Plus } from "lucide-react";

/**
 * Page header: title, subtitle and the "Create with AI" CTA.
 * Static content — rendered as a Server Component.
 */
export default function StudyNotesHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B4B66] flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-[#1B4B66]" strokeWidth={2} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B4B66] tracking-tight">
            Nursing Study Notes
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-2xl font-normal leading-relaxed">
          Concise, visual, high-yield notes built for nursing school and NCLEX review.
        </p>
      </div>

      {/* Top Right Action Button */}
      <button
        type="button"
        className="self-start inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
      >
        <Plus size={16} strokeWidth={2.5} />
        <span>Create Study Notes With AI</span>
      </button>
    </div>
  );
}
