import Link from "next/link";
import { Layers, HelpCircle, Bot } from "lucide-react";

export default function StudyToolsCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <h3 className="font-bold text-[#1B4B66] text-base mb-3">Study Tools</h3>

      <div className="grid grid-cols-3 gap-2">
        <Link
          href="/dashboard/notes-to-flashcards"
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#EBF5FB] hover:bg-[#DDF0FA] transition text-center cursor-pointer border border-[#D0E6F5]/50"
        >
          <div className="w-7 h-7 rounded-lg bg-[#326798]/10 text-[#1B4B66] flex items-center justify-center mb-1">
            <Layers size={16} />
          </div>
          <span className="text-[10px] font-bold text-[#1B4B66] leading-tight">
            Create Flashcards
          </span>
        </Link>

        <Link
          href="/dashboard/notes-to-quize"
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#EDF2FE] hover:bg-[#E2EAFF] transition text-center cursor-pointer border border-[#D5E1FC]/50"
        >
          <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center mb-1">
            <HelpCircle size={16} />
          </div>
          <span className="text-[10px] font-bold text-[#1B4B66] leading-tight">
            Practice Questions
          </span>
        </Link>

        <Link
          href="/dashboard/my-tutor"
          className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#F4EEFD] hover:bg-[#EADBFA] transition text-center cursor-pointer border border-[#E4D4FA]/50"
        >
          <div className="w-7 h-7 rounded-lg bg-purple-600/10 text-purple-700 flex items-center justify-center mb-1">
            <Bot size={16} />
          </div>
          <span className="text-[10px] font-bold text-purple-900 leading-tight">
            Ask CARA
          </span>
        </Link>
      </div>
    </div>
  );
}
