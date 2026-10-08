"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useGetLibrary } from "@/hooks";
import FolderCreateModal from "./folder-create-modal";
import LibrarySkeleton from "./library-skeleton";
import LibraryHeader from "./library-header";
import LibraryStats from "./library-stats";
import LibraryNoteCard from "./library-note-card";
import LibraryEmptyState from "./library-empty-state";

export default function LibraryMainContent() {
  const searchParams = useSearchParams();
  const currentFolderId = searchParams.get("folder");
  const searchQuery = searchParams.get("search")?.toLowerCase().trim() || "";
  const { libraryData, isLoading } = useGetLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Single-pass memoized data extraction, filtering & heading computation
  const { allNotes, totalFolders, currentFolderObj, displayedNotes, sectionTitle } = useMemo(() => {
    if (!Array.isArray(libraryData)) {
      return {
        allNotes: [],
        totalFolders: 0,
        currentFolderObj: null,
        displayedNotes: [],
        sectionTitle: "All Saved Notes",
      };
    }

    const allNotes = [];
    let currentFolderObj = null;

    for (const folder of libraryData) {
      if (currentFolderId && String(folder?.id) === String(currentFolderId)) {
        currentFolderObj = folder;
      }
      if (Array.isArray(folder?.notes)) {
        for (const note of folder.notes) {
          allNotes.push({
            ...note,
            folderId: folder.id,
            folderName: folder.name,
            folderColor:
              folder?.color?.color ||
              (typeof folder?.color === "string" ? folder.color : null),
          });
        }
      }
    }

    const displayedNotes = allNotes.filter((note) => {
      if (currentFolderId && currentFolderId !== "all" && String(note.folderId) !== String(currentFolderId)) {
        return false;
      }
      if (searchQuery) {
        const target = `${note?.content_name || ""} ${note?.folderName || ""} ${note?.description || ""}`.toLowerCase();
        return target.includes(searchQuery);
      }
      return true;
    });

    const sectionTitle =
      currentFolderObj?.name ||
      (searchQuery ? `Search results for "${searchQuery}"` : "All Saved Notes");

    return {
      allNotes,
      totalFolders: libraryData.length,
      currentFolderObj,
      displayedNotes,
      sectionTitle,
    };
  }, [libraryData, currentFolderId, searchQuery]);

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <LibraryHeader onCreateFolder={() => setIsModalOpen(true)} />

      {/* Top Stats Cards */}
      <LibraryStats
        savedNotesCount={allNotes.length}
        foldersCount={totalFolders}
      />

      {/* Main Content Section Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-xs p-5 sm:p-6 lg:p-7">
        {/* Section Heading */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            {currentFolderObj && (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                style={{
                  color:
                    currentFolderObj?.color?.color ||
                    (typeof currentFolderObj?.color === "string"
                      ? currentFolderObj.color
                      : "#1B4B66"),
                }}
              >
                <path
                  d="M2 4C2 3.44772 2.44772 3 3 3H7.58579C7.851 3 8.10536 3.10536 8.29289 3.29289L10 5H17C17.5523 5 18 5.44772 18 6V16C18 16.5523 17.5523 17 17 17H3C2.44772 17 2 16.5523 2 16V4Z"
                  fill="currentColor"
                />
              </svg>
            )}
            <h2 className="text-lg sm:text-xl font-bold text-[#1B4B66] truncate">
              {sectionTitle}
            </h2>
          </div>

          <span className="text-xs font-medium text-gray-400 shrink-0">
            {displayedNotes.length} notes
          </span>
        </div>

        {/* Notes Content */}
        {isLoading ? (
          <LibrarySkeleton />
        ) : (
          displayedNotes?.length > 0 ? (
            <>
              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-4">
                {displayedNotes?.map((note, index) => (
                  <LibraryNoteCard
                    key={note?.content_id ? `${note.content_id}-${index}` : index}
                    note={note}
                  />
                ))}
              </div>

              {/* Bottom Pagination / Counter */}
              <div className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p>
                  Showing <span className="font-semibold text-gray-700">{displayedNotes?.length}</span> of{" "}
                  <span className="font-semibold text-gray-700">{allNotes?.length}</span>
                </p>
              </div>
            </>
          ) : (
            <LibraryEmptyState
              searchQuery={searchQuery}
              currentFolderObj={currentFolderObj}
              onCreateFolder={() => setIsModalOpen(true)}
            />
          )
        )}
      </div>

      {/* Centered Modal */}
      <FolderCreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}