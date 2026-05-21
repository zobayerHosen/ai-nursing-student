"use client";
import { Plus, Folder, ClipboardList, Search } from "lucide-react";
import { useState } from "react";
import FolderCreateModal from "./folder-create-modal";
import FolderList from "./folder-list";

const initialFolders = [
    {
        id: 1,
        name: "Pharmacology",
        icon: "💊",
        isOpen: true,
        notes: [
            { id: 1, slug: "insulin-types", title: "Insulin Types", desc: "Rapid-Acting (Lispro/Aspart): 15min onset..." },
            { id: 2, slug: "anticoagulants", title: "Anticoagulants — Heparin vs Warfarin", desc: "Mechanism and uses..." },
        ]
    },
    {
        id: 2,
        name: "Anatomy",
        icon: "🫀",
        isOpen: false,
        notes: [
            { id: 3, slug: "heart-structure", title: "Heart Structure", desc: "Basic anatomy..." }
        ]
    },
    {
        id: 3,
        name: "Clinical Skills",
        icon: "🏥",
        isOpen: false,
        notes: [
            { id: 4, slug: "vitals", title: "Vital Signs", desc: "Normal ranges..." }
        ]
    },
    {
        id: 4,
        name: "Pathophysiology",
        icon: "🔬",
        isOpen: false,
        notes: [
            // { id: 5, slug: "cell-injury", title: "Cell Injury", desc: "Causes and mechanisms..." }
        ]
    }
];

const LibrarySidebar = ({ onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [folders, setFolders] = useState(initialFolders);

    // Note: create folder open modal function
    const openModal = () => {
        setIsModalOpen(true);
        setLoading(true);

        // Simple loading mock.
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        console.log("Clicked")
    };

    // Note: toggle folder
    const toggleFolder = (id) => {
        setFolders((prevFolders) => {
            return prevFolders.map((folder) => {
                if (folder.id === id) {
                    return {
                        ...folder,
                        isOpen: !folder.isOpen,
                    };
                }

                return folder;
            });
        });
    };
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
                                {folders?.length || 0} folders
                            </p>
                            <p className="text-[#555555] text-sm font-medium flex items-center gap-1">
                                <ClipboardList size={19} />
                                {folders?.reduce((acc, folder) => acc + folder?.notes?.length, 0)} notes
                            </p>
                        </div>
                    </div>
                </div>

                {/* folder content */}
                <div className="p-4 space-y-2">
                    {folders?.length > 0 ? folders?.map((folder) => (
                        <FolderList
                            key={folder?.id}
                            folder={folder}
                            toggleFolder={toggleFolder}
                            onClose={onClose}
                        />
                    )) : (
                        <div className="text-center text-gray-500 mt-2">
                            {loading ? (
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