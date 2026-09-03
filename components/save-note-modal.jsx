"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import { useGetLibrary, useSaveNote } from "@/hooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import FolderCreateModal from "@/app/dashboard/library/components/folder-create-modal";
import { Plus, Bookmark, Loader2 } from "lucide-react";
import Image from "next/image";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const SaveNoteModal = ({ isModalOpen, setIsModalOpen, noteId, onSaveSuccess }) => {
    const { libraryData, isLoading } = useGetLibrary();
    const { saveNote, isPending } = useSaveNote();
    const [selectedFolderId, setSelectedFolderId] = useState(null);
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
    const queryClient = useQueryClient();

    const handleSave = () => {
        if (!selectedFolderId) {
            toast.error("Please select a folder");
            return;
        }

        saveNote(
            { content_id: noteId, folder_id: selectedFolderId },
            {
                onSuccess: (data) => {
                    toast.success(data?.message || "Note saved successfully");
                    queryClient.invalidateQueries({ queryKey: ["library-get"] });
                    setIsModalOpen(false);
                    setSelectedFolderId(null);
                    if (onSaveSuccess) onSaveSuccess();
                },
                onError: (error) => {
                    toast.error(
                        error?.response?.data?.message || "Failed to save note"
                    );
                },
            }
        );
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedFolderId(null);
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            centered
            className="save-note-modal"
            width={580}
            closeIcon={null}
        >
            <div className="flex flex-col pt-4 pb-2 px-2">
                {/* Header section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner ring-4 ring-blue-50/50">
                        <Bookmark className="w-8 h-8 text-blue-600 fill-blue-600/20" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">Save to Library</h3>
                    <p className="text-center text-sm text-gray-500 max-w-75">
                        Choose a folder to organize this study material.
                    </p>
                </div>

                {/* Folder Selection Area */}
                <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-3 px-1">
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Your Folders</p>
                        <button
                            onClick={() => setIsCreateFolderModalOpen(true)}
                            className="text-xs flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-primary hover:bg-primary hover:text-white hover:border-primary transition-all font-semibold cursor-pointer shadow-sm"
                        >
                            <Plus size={14} strokeWidth={3} />
                            New
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-10">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : libraryData && libraryData.length > 0 ? (
                        <div className="space-y-2.5 max-h-65 overflow-y-auto pr-2 custom-scrollbar">
                            {libraryData?.map((folder) => (
                                <div
                                    key={folder.id}
                                    onClick={() => setSelectedFolderId(folder.id)}
                                    className={`flex items-center gap-4 p-3.5 rounded-xl cursor-pointer transition-all duration-200 group ${selectedFolderId === folder.id
                                            ? "bg-primary shadow-md shadow-primary/20"
                                            : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    <div className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${selectedFolderId === folder.id ? "bg-white/20" : "bg-gray-100 group-hover:bg-white"
                                        }`}>
                                        {folder?.icon?.icon ? (
                                            <Image
                                                src={folder.icon.icon.startsWith("http") ? folder.icon.icon : `${BASEURL}/${folder.icon.icon.replace(/^\//, '')}`}
                                                alt="folder icon"
                                                width={20}
                                                height={20}
                                                className="shrink-0"
                                            />
                                        ) : (
                                            <span className="text-lg">📁</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-bold text-base truncate transition-colors ${selectedFolderId === folder.id ? "text-white" : "text-gray-800"
                                            }`}>
                                            {folder?.name}
                                        </h4>
                                        <p className={`text-xs font-medium mt-0.5 transition-colors ${selectedFolderId === folder.id ? "text-white/80" : "text-gray-500"
                                            }`}>
                                            {folder?.total_notes || 0} {(folder?.total_notes === 1) ? 'note' : 'notes'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-gray-500 text-sm font-medium mb-3">
                                You don't have any folders yet.
                            </p>
                            <button
                                onClick={() => setIsCreateFolderModalOpen(true)}
                                className="text-sm bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                Create your first folder
                            </button>
                        </div>
                    )}
                </div>

                {/* Custom Footer */}
                <div className="flex gap-3 mt-2">
                    <button
                        onClick={handleCancel}
                        disabled={isPending}
                        className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!selectedFolderId || isPending}
                        className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-primary/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
                        Save Note
                    </button>
                </div>
            </div>

            <FolderCreateModal
                isModalOpen={isCreateFolderModalOpen}
                setIsModalOpen={setIsCreateFolderModalOpen}
            />
        </Modal>
    );
};

export default SaveNoteModal;
