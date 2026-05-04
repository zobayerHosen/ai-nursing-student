"use client";
import { Plus, Folder, ClipboardList, Search, ChevronDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import FolderCreateModal from "./folder-create-modal";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialFolders = [
    {
        id: 1,
        name: "Pharmacology",
        icon: "💊",
        slug: "insulin-types",
        isOpen: false,
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
    }
];

const LibrarySidebar = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [folders, setFolders] = useState(initialFolders);

    const openModal = () => {
        setIsModalOpen(true);
        setLoading(true);

        // Simple loading mock.
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        console.log("Clicked")
    };


    const toggleFolder = (id) => {
        setFolders((prev) =>
            prev.map((folder) =>
                folder.id === id
                    ? { ...folder, isOpen: !folder.isOpen }
                    : folder
            )
        );
    };


    // Note: UI
    return (
        <>
            <aside className="w-82.5 border-r border-black/10  bg-white min-h-screen overflow-hidden">
                {/* header content */}
                <div className="border-b border-black/10 py-4 ">
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
                            <p className="text-[#555555] text-sm font-medium flex items-center gap-1"><Folder size={19} />0 Folders</p>
                            <p className="text-[#555555] text-sm font-medium flex items-center gap-1"><ClipboardList size={19} />0 Notes</p>
                        </div>
                    </div>
                </div>

                {/* folder content */}
                <div className="py-4 px-6 space-y-2">
                    {folders.map((folder) => (
                        <div key={folder.id}>

                            {/* Folder Header */}
                            <div
                                onClick={() => toggleFolder(folder.id)}
                                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                            >
                                {/* LEFT SIDE */}
                                <div className="flex items-center gap-3">

                                    {/* Arrow (Lucide) */}
                                    <ChevronDown
                                        className={`w-4 h-4 text-gray-500 transition-transform ${folder.isOpen ? "rotate-180" : ""
                                            }`}
                                    />

                                    {/* Icon */}
                                    <span className="text-lg">{folder.icon}</span>

                                    {/* Text */}
                                    <div>
                                        <p className="text-sm font-semibold text-[#424242]">
                                            {folder.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {folder.notes.length} notes
                                        </p>
                                    </div>
                                </div>

                                {/* RIGHT SIDE */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("Open menu");
                                    }}
                                    className="p-1 rounded-md hover:bg-gray-200"
                                >
                                    <MoreHorizontal className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            {/* Notes List */}
                            {folder.isOpen && (
                                <div className="ml-10 mt-2 space-y-2">
                                    {folder.notes.map((note) => (
                                        <Link
                                            href={`/dashboard/library/${note.slug}`}
                                            key={note.id}
                                            className="flex gap-1 items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                                        >
                                            <ClipboardList className="w-4 h-4 text-gray-500 shrink-0" />
                                            <div className="min-w-0">
                                                <p className="flex items-center gap-1 text-sm font-medium text-[#333]">
                                                    {note.title ?? ""}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate" title="See All Notes">
                                                    {note.desc ?? ""}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
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