"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Folder,
  Plus,
  Bookmark,
  FileText,
  Search,
  Inbox,
} from "lucide-react";
import { useGetLibrary } from "@/hooks";
import FolderCreateModal from "./components/folder-create-modal";
import LoadingIcon from "@/components/loading-icon";

// Category tag color generator / mappings
const getCategoryBadgeClass = (category = "") => {
  const cat = category.toLowerCase();
  if (cat.includes("cardio")) return "bg-red-50 text-red-600";
  if (cat.includes("pharm")) return "bg-pink-50 text-pink-600";
  if (cat.includes("med") || cat.includes("surg")) return "bg-rose-50 text-rose-600";
  if (cat.includes("ecg")) return "bg-orange-50 text-orange-600";
  if (cat.includes("ob") || cat.includes("mat")) return "bg-amber-50 text-amber-700";
  if (cat.includes("psych")) return "bg-purple-50 text-purple-600";
  if (cat.includes("prep") || cat.includes("nclex")) return "bg-blue-50 text-blue-600";
  return "bg-rose-50 text-rose-600";
};

// Formatted date helper
const formatNoteDate = (note) => {
  const rawDate = note?.created_at || note?.saved_at || note?.updated_at || note?.date;
  if (!rawDate) return "Saved recently";
  try {
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return "Saved recently";
    return `Saved ${d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  } catch {
    return "Saved recently";
  }
};

const LibraryMainContent = () => {
  const searchParams = useSearchParams();
  const currentFolderId = searchParams.get("folder");
  const searchQuery = searchParams.get("search")?.toLowerCase().trim() || "";

  const { libraryData, isLoading } = useGetLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract all notes and folder details
  const { allNotes, totalFolders, currentFolderObj } = useMemo(() => {
    if (!Array.isArray(libraryData)) {
      return { allNotes: [], totalFolders: 0, currentFolderObj: null };
    }

    const notesList = [];
    let selectedFolder = null;

    libraryData.forEach((folder) => {
      if (currentFolderId && String(folder?.id) === String(currentFolderId)) {
        selectedFolder = folder;
      }
      if (Array.isArray(folder?.notes)) {
        folder.notes.forEach((n) => {
          notesList.push({
            ...n,
            folderId: folder.id,
            folderName: folder.name,
            folderColor: folder.color,
          });
        });
      }
    });

    return {
      allNotes: notesList,
      totalFolders: libraryData.length,
      currentFolderObj: selectedFolder,
    };
  }, [libraryData, currentFolderId]);

  // Filter notes based on selected folder & search query
  const displayedNotes = useMemo(() => {
    let list = allNotes;

    if (currentFolderId && currentFolderId !== "all") {
      list = list.filter((n) => String(n.folderId) === String(currentFolderId));
    }

    if (searchQuery) {
      list = list.filter((n) => {
        const title = (n?.content_name || n?.title || "").toLowerCase();
        const cat = (n?.category_name || n?.system_name || n?.folderName || "").toLowerCase();
        const desc = (n?.description || "").toLowerCase();
        return title.includes(searchQuery) || cat.includes(searchQuery) || desc.includes(searchQuery);
      });
    }

    return list;
  }, [allNotes, currentFolderId, searchQuery]);

  // Section title based on selection
  const sectionTitle = useMemo(() => {
    if (currentFolderObj) return currentFolderObj.name;
    if (searchQuery) return `Search results for "${searchQuery}"`;
    return "All Saved Notes";
  }, [currentFolderObj, searchQuery]);

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Icon, Title & Subtitle */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B4B66]/10 text-[#1B4B66] flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="w-5 h-5 text-[#1B4B66]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#044E79] tracking-tight">
              My Library
            </h1>
            <p className="text-[11px] sm:text-xs lg:text-sm text-[#64748b] mt-0.5">
              Save, organize and revisit the nursing notes you need most.
            </p>
          </div>
        </div>

        {/* Right: + New Folder Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#1B4B66] hover:bg-[#153a4f] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>New Folder</span>
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Card 1: Saved Notes */}
        <div className="bg-white rounded-2xl border border-gray-100/90 shadow-xs p-5 flex items-center gap-4 transition-all hover:shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#EBF3F6] flex items-center justify-center text-[#1B4B66] shrink-0">
            <FileText className="w-6 h-6 text-[#1B4B66]" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500">Saved Notes</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1B4B66]">
              {isLoading ? "-" : allNotes.length}
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
              {isLoading ? "-" : totalFolders}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Content Section Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-xs p-5 sm:p-6 lg:p-7">
        {/* Section Heading */}
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#1B4B66]">
            {sectionTitle}
          </h2>
          {displayedNotes.length > 0 && (
            <span className="text-xs font-medium text-gray-400">
              {displayedNotes.length} {displayedNotes.length === 1 ? "note" : "notes"}
            </span>
          )}
        </div>

        {/* Notes Content */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-gray-500 font-medium">Loading saved notes...</p>
          </div>
        ) : displayedNotes.length > 0 ? (
          <>
            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mt-4">
              {displayedNotes.map((note, index) => {
                const noteId = note?.content_id || note?.id || note?.slug;
                const noteTitle = note?.content_name || note?.title || "Nursing Study Note";
                const category = note?.category_name || note?.system_name || note?.folderName || "CARDIOVASCULAR";
                const description =
                  note?.description ||
                  "Essential clinical review points, diagnostic cues, and high-yield interventions.";

                return (
                  <Link
                    key={noteId ? `${noteId}-${index}` : index}
                    href={`/dashboard/library/${noteId}`}
                    className="group bg-white rounded-xl border border-gray-200/75 hover:border-primary/40 hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between cursor-pointer"
                  >
                    {/* Top Content */}
                    <div>
                      <div className="flex items-start gap-3">
                        {/* Thumbnail Placeholder with subtle checkerboard pattern */}
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg bg-[#F8FAFC] border border-gray-200/60 overflow-hidden shrink-0 flex items-center justify-center relative shadow-2xs group-hover:scale-102 transition-transform">
                          {/* Checkerboard subtle pattern */}
                          <div
                            className="absolute inset-0 opacity-40"
                            style={{
                              backgroundImage:
                                "linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)",
                              backgroundSize: "12px 12px",
                              backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
                            }}
                          />
                          <FileText className="w-6 h-6 text-gray-400 relative z-10 opacity-70 group-hover:text-[#1B4B66] transition-colors" />
                        </div>

                        {/* Note Details */}
                        <div className="min-w-0 flex-1">
                          {/* Category Badge & Bookmark Icon */}
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full truncate ${getCategoryBadgeClass(
                                category
                              )}`}
                            >
                              {category}
                            </span>
                            <Bookmark className="w-4 h-4 text-[#1B4B66] fill-[#1B4B66] shrink-0" />
                          </div>

                          {/* Title */}
                          <h3 className="text-sm sm:text-base font-bold text-[#1B4B66] group-hover:text-primary transition-colors line-clamp-1 mt-1.5">
                            {noteTitle}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Date */}
                    <div className="text-[11px] text-gray-400 mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                      <span>{formatNoteDate(note)}</span>
                      <span className="text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        View &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Pagination / Counter */}
            <div className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <p>
                Showing <span className="font-semibold text-gray-700">{displayedNotes.length}</span> of{" "}
                <span className="font-semibold text-gray-700">{allNotes.length}</span>
              </p>
            </div>
          </>
        ) : (
          /* Empty State */
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
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition shadow-xs cursor-pointer"
            >
              <Plus size={14} />
              Create New Folder
            </button>
          </div>
        )}
      </div>

      {/* Centered Modal */}
      <FolderCreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default function MyLibraryPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-96 flex items-center justify-center">
          <LoadingIcon className="w-8 h-8 text-primary" />
        </div>
      }
    >
      <LibraryMainContent />
    </Suspense>
  );
}
