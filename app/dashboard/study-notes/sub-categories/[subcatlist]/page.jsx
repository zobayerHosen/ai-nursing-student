import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export default async function StudyNotesSubCategoriesPage({ params }) {
  const { subcatlist } = await params;

  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-6 h-6" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 mb-3">
          Coming Soon
        </span>

        <h2 className="text-xl font-bold text-[#1B4B66] mb-2">
          Currently Under development please stay tuned with us!
        </h2>

        <p className="text-xs text-gray-500 mb-6 leading-relaxed">
          The study notes and sub-categories for this section (ID: {subcatlist}) are currently under development.
        </p>

        <Link
          href="/dashboard/study-notes"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Study Notes</span>
        </Link>
      </div>
    </div>
  );
}
