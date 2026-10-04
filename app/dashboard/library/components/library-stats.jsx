import React from "react";
import { FileText, Folder } from "lucide-react";

export default function LibraryStats({ savedNotesCount = 0, foldersCount = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card 1: Saved Notes */}
      <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs p-5 flex items-center gap-4 transition-all hover:shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#EBF3F6] flex items-center justify-center text-[#1B4B66] shrink-0">
          <FileText className="w-6 h-6 text-[#1B4B66]" />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Saved Notes</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1B4B66]">
            {savedNotesCount}
          </h3>
        </div>
      </div>

      {/* Card 2: Folders */}
      <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs p-5 flex items-center gap-4 transition-all hover:shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#FEF3EB] flex items-center justify-center text-[#D97706] shrink-0">
          <Folder className="w-6 h-6 text-[#D97706] fill-[#D97706]/20" />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">Folders</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#D97706]">
            {foldersCount}
          </h3>
        </div>
      </div>
    </div>
  );
}
