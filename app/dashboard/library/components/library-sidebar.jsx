"use client";

import { Plus, Search, BookOpen } from "lucide-react";
import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FolderCreateModal from "./folder-create-modal";
import FolderList from "./folder-list";
import { useGetLibrary } from "@/hooks";

const SidebarContent = ({ onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFolder = searchParams.get("folder") || "all";
  const currentSearch = searchParams.get("search") || "";
  const { libraryData, isLoading } = useGetLibrary();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Total notes calculation
  const totalNotes = useMemo(() => {
    if (!Array.isArray(libraryData)) return 0;
    return libraryData.reduce((acc, folder) => {
      const count =
        folder?.total_notes ??
        (Array.isArray(folder?.notes) ? folder.notes.length : 0);
      return acc + count;
    }, 0);
  }, [libraryData]);

  // Search filter
  const filteredFolders = useMemo(() => {
    if (!Array.isArray(libraryData)) return [];
    if (!searchInput.trim()) return libraryData;
    const query = searchInput.toLowerCase();
    return libraryData.filter((folder) => {
      const matchName = folder?.name?.toLowerCase().includes(query);
      const matchNotes = Array.isArray(folder?.notes)
        ? folder.notes.some(
            (note) =>
              note?.content_name?.toLowerCase().includes(query) ||
              note?.title?.toLowerCase().includes(query)
          )
        : false;
      return matchName || matchNotes;
    });
  }, [libraryData, searchInput]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);

    const params = new URLSearchParams(searchParams);
    if (val.trim()) {
      params.set("search", val);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSelectFolder = (folderId) => {
    const params = new URLSearchParams(searchParams);
    if (folderId === "all") {
      params.delete("folder");
    } else {
      params.set("folder", folderId);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    if (onClose) onClose();
  };

  return (
    <>
      <aside className="w-full bg-white rounded-2xl border border-gray-100/90 shadow-xs p-3.5 sm:p-4 flex flex-col h-auto min-h-full">
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Quick search systems..."
            className="w-full pl-9 pr-3 py-2 bg-[#F1F5F9] rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none border border-transparent focus:border-primary/40 focus:bg-white transition-all"
          />
        </div>

        {/* All Saved Notes Item */}
        <div
          onClick={() => handleSelectFolder("all")}
          className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 mb-2 ${
            currentFolder === "all"
              ? "bg-[#E8F1F5] text-[#1B4B66] font-semibold shadow-xs"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-6 h-6 rounded-lg bg-[#245D78] text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span
              className={`text-xs sm:text-sm truncate ${
                currentFolder === "all"
                  ? "font-semibold text-[#1B4B66]"
                  : "font-medium text-gray-700"
              }`}
            >
              All Saved Notes
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
                currentFolder === "all"
                  ? "text-[#1B4B66] font-bold"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              {totalNotes}
            </span>
          </div>
        </div>

        {/* Folders Section Heading */}
        <div className="flex items-center justify-between px-1 mt-3 mb-1.5">
          <h4 className="text-xs font-bold text-[#1B4B66] tracking-wide uppercase">
            Folders
          </h4>
        </div>

        {/* Folders List */}
        <div className="space-y-0.5 max-h-[calc(100vh-340px)] overflow-y-auto custom-scrollbar pr-0.5">
          {isLoading ? (
            <div className="py-6 flex flex-col items-center justify-center gap-2 text-gray-400">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-xs">Loading folders...</p>
            </div>
          ) : filteredFolders.length > 0 ? (
            filteredFolders.map((folder, idx) => (
              <FolderList
                key={folder?.id || idx}
                folder={folder}
                isSelected={String(currentFolder) === String(folder?.id)}
                onSelect={handleSelectFolder}
                onClose={onClose}
              />
            ))
          ) : (
            <div className="py-4 text-center text-xs text-gray-400">
              {searchInput ? "No matching folders" : "No folders created yet"}
            </div>
          )}
        </div>

        {/* Create Folder Button */}
        <div className="mt-auto pt-3 border-t border-gray-100 px-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors py-1 cursor-pointer"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create Folder</span>
          </button>
        </div>
      </aside>

      {/* Centered Modal */}
      <FolderCreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

const LibrarySidebar = ({ onClose }) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-72 bg-white rounded-2xl border border-gray-100 p-4 animate-pulse" />
      }
    >
      <SidebarContent onClose={onClose} />
    </Suspense>
  );
};

export default LibrarySidebar;