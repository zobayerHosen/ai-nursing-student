"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Loader2, CheckCircle2, Check } from "lucide-react";
import SaveNoteModal from "@/components/save-note-modal";
import { useSaveNote, useMarkComplete } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const TopBreadcrumb = ({ note, backHref = "/dashboard/study-notes", backLabel = "Study Notes" }) => {
    const queryClient = useQueryClient();
    const { saveNote, isPending: isSavePending } = useSaveNote();
    const { markComplete, isPending: isCompletePending } = useMarkComplete();

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const noteId = note?.id || note?.slug;

    useEffect(() => {
        setIsSaved(Boolean(note?.is_saved || note?.saved));
        setIsCompleted(Boolean(note?.is_completed || note?.completed));
    }, [note]);

    const handleSaveClick = () => {
        if (!isSaved) {
            setIsSaveModalOpen(true);
        } else {
            // Unsave the note
            saveNote(
                { content_id: noteId, folder_id: note?.folderId || note?.folder_id },
                {
                    onSuccess: (data) => {
                        toast.success(data?.message || "Note removed from saved list");
                        setIsSaved(false);
                        queryClient.invalidateQueries({ queryKey: ["library-get"] });
                        queryClient.invalidateQueries({ queryKey: ["core-learning-content-details", noteId] });
                        queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message || "Failed to unsave note");
                    },
                }
            );
        }
    };

    const handleCompleteClick = async () => {
        if (!noteId) {
            toast.error("Unable to mark note as completed");
            return;
        }

        try {
            const res = await markComplete({ id: noteId });
            toast.success(res?.message || "Marked as completed!");
            setIsCompleted(true);
            queryClient.invalidateQueries({ queryKey: ["core-learning-content-details", noteId] });
            queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
            queryClient.invalidateQueries({ queryKey: ["core-learning"] });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to mark as completed");
        }
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-4">
            {/* Left side: Breadcrumb trail */}
            <div className="flex items-center gap-2 text-sm">
                <Link
                    href={backHref}
                    className="text-[#326798] hover:text-[#25527a] font-semibold transition-colors"
                >
                    {note?.folderName || backLabel}
                </Link>
                <span className="text-gray-400 font-normal">/</span>
                <span className="text-[#6B7280] font-medium truncate max-w-70 sm:max-w-100">
                    {note?.title || ""}
                </span>
            </div>

            {/* Right side: Save Notes & Mark Completed Buttons */}
            <div className="flex items-center gap-3">
                {/* Save Notes Button */}
                <button
                    onClick={handleSaveClick}
                    disabled={isSavePending}
                    className={`cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shadow-xs border ${isSaved
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                >
                    {isSavePending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Bookmark
                            className={`w-4 h-4 ${isSaved ? "fill-emerald-600 text-emerald-600" : "text-gray-500"
                                }`}
                        />
                    )}
                    <span>{isSaved ? "Saved" : "Save Notes"}</span>
                </button>

                {/* Mark Completed Button */}
                <button
                    onClick={handleCompleteClick}
                    disabled={isCompletePending || isCompleted}
                    className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${isCompleted
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-[#FF6B8A] hover:bg-[#E05270] text-white active:scale-95"
                        }`}
                >
                    {isCompletePending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isCompleted ? (
                        <Check className="w-4 h-4 stroke-3" />
                    ) : (
                        <CheckCircle2 className="w-4 h-4" />
                    )}
                    <span>{isCompleted ? "Completed" : "Mark Completed"}</span>
                </button>
            </div>

            {/* Save Note Modal Integration */}
            <SaveNoteModal
                isModalOpen={isSaveModalOpen}
                setIsModalOpen={setIsSaveModalOpen}
                noteId={noteId}
                onSaveSuccess={() => {
                    setIsSaved(true);
                    queryClient.invalidateQueries({
                        queryKey: ["core-learning-content-details", noteId],
                    });
                    queryClient.invalidateQueries({ queryKey: ["library-get"] });
                    queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
                }}
            />
        </div>
    );
};

export default TopBreadcrumb;