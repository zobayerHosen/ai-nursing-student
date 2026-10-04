import React from "react";
import { Plus, Search, Inbox } from "lucide-react";

export default function LibraryEmptyState({
  searchQuery,
  currentFolderObj,
  onCreateFolder,
}) {
  return (
    <div className="py-16 text-center max-w-sm mx-auto flex flex-col items-center">
      <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#1B4B66] flex items-center justify-center mb-4">
        {searchQuery ? <Search size={28} /> : <Inbox size={28} />}
      </div>
      <h3 className="text-lg font-bold text-[#1B4B66] mb-1">
        {searchQuery
          ? "No matching notes found"
          : currentFolderObj
            ? `No notes in "${currentFolderObj.name}"`
            : "No saved notes yet"}
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-5 leading-relaxed">
        {searchQuery
          ? "Try searching with a different keyword or system."
          : "Bookmark notes while studying to access them quickly here."}
      </p>
      <button
        type="button"
        onClick={onCreateFolder}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition shadow-xs cursor-pointer"
      >
        <Plus size={14} />
        Create New Folder
      </button>
    </div>
  );
}
