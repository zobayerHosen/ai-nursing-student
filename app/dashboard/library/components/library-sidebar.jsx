"use client";
import { Plus, Folder, ClipboardList, Search } from "lucide-react";
import { useState } from "react";
import FolderCreateModal from "./folder-create-modal";
import FolderList from "./folder-list";
import { useGetLibrary } from "@/hooks";

const LibrarySidebar = ({ onClose }) => {
    const { libraryData, isLoading, isFetching, isError } = useGetLibrary();
    console.log("Library data:---->", libraryData);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    // Track which folder IDs are expanded (separate from API data)
    const [openFolderIds, setOpenFolderIds] = useState(new Set());

    // Note: create folder open modal function
    const openModal = () => {
        setIsModalOpen(true);
        setLoading(true);

        // Simple loading mock.
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    // Note: toggle folder
    const toggleFolder = (id) => {
        setOpenFolderIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Compute total notes count from libraryData
    const totalNotes = libraryData?.reduce((acc, folder) => {
        const notes = Array.isArray(folder?.notes) ? folder.notes : [];
        return acc + notes.length;
    }, 0) ?? 0;

    // Note: UI
    return (
        <>
            <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col">
                {/* header content */}
                <div className="border-b border-black/10 py-4 shrink-0">
                    <div className="px-8 flex flex-col gap-4">
                        {/* folder create button */}
                        <div className="w-full flex items-center justify-between">
                            <h4 className="text-[#424242] font-semibold text-lg">My Library</h4>
                            <button onClick={openModal} className="cursor-pointer bg-primary text-white rounded-xl py-2.5 px-4 flex items-center gap-1 text-sm font-medium hover:bg-primary/90 transition-colors"><Plus size={20} />New Folder</button>
                        </div>

                        {/* search folders */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D] w-5.5 h-5.5" />

                            <input
                                type="text"
                                placeholder="Search Notes"
                                className="w-full pl-11 pr-4 py-2.5 border border-[#DFE1E7] rounded-lg text-sm outline-0"
                            />
                        </div>

                        {/* folder and notes counts */}
                        <div className="w-full flex items-center gap-5">
                            <p className="text-[#555555] text-sm font-medium flex items-center gap-1">
                                <Folder size={19} />
                                {libraryData?.length || 0} folders
                            </p>
                            <p className="text-[#555555] text-sm font-medium flex items-center gap-1">
                                <ClipboardList size={19} />
                                {totalNotes} notes
                            </p>
                        </div>
                    </div>
                </div>

                {/* folder content */}
                <div className="p-4 space-y-2">
                    {libraryData?.length > 0 ? libraryData?.map((folder) => (
                        <FolderList
                            key={folder?.id}
                            folder={{ ...folder, isOpen: openFolderIds.has(folder?.id) }}
                            toggleFolder={toggleFolder}
                            onClose={onClose}
                        />
                    )) : (
                        <div className="text-center text-gray-500 mt-2">
                            {isLoading ? (
                                <p className="mt-4">Loading folders...</p>
                            ) : (
                                <p className="mt-4">No folders found</p>
                            )}
                        </div>
                    )}
                </div>
            </aside>

            {/* centered modal */}
            <FolderCreateModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                loading={loading}
            />
        </>
    );
};

export default LibrarySidebar;