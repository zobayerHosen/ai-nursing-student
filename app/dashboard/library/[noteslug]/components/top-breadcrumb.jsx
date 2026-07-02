"use client";
import { Bookmark, ChevronRight, Pill, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import SaveNoteModal from "@/components/save-note-modal";
import { useSaveNote } from "@/hooks/core-learning/save-note.hook";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const TopBreadcrumb = ({ note }) => {
    const queryClient = useQueryClient();
    const { saveNote, isPending } = useSaveNote();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setIsSaved(note?.is_saved || false);
    }, [note]);

    const handleSaveClick = () => {
        if (!isSaved) {
            setIsSaveModalOpen(true);
        } else {
            // Unsave the note with required payload
            saveNote(
                { content_id: note?.id || note?.slug, folder_id: note?.folderId },
                {
                    onSuccess: (data) => {
                        toast.success("Note removed from saved list");
                        setIsSaved(false);
                        queryClient.invalidateQueries({ queryKey: ["library-get"] });
                        queryClient.invalidateQueries({ queryKey: ["core-learning-content-details", note?.slug] });
                    },
                    onError: (error) => {
                        toast.error(error?.response?.data?.message || "Failed to unsave note");
                    }
                }
            );
        }
    };

    return (
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
            <div className="flex items-center gap-2 text-sm text-[#667085]">
                <Pill className="w-4 h-4 text-[#2C5F8D] shrink-0" />
                <span className="text-[#787878] hover:text-[#4d4d4d] cursor-pointer text-sm font-medium">{note?.folderName || ""}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#323232] font-medium text-base">{note?.title || ""}</span>
            </div>
            <div className="flex items-center gap-3">
                <button
                    onClick={handleSaveClick}
                    disabled={isPending}
                    className={`cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-70 ${isSaved
                            ? "bg-green-50 text-green-600 border border-green-200 hover:bg-green-100"
                            : "bg-primary text-white hover:bg-[#153a50]"
                        }`}
                >
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                    )}
                    {isSaved ? "Saved" : "Save Note"}
                </button>
            </div>

            <SaveNoteModal 
                isModalOpen={isSaveModalOpen} 
                setIsModalOpen={setIsSaveModalOpen} 
                noteId={note?.id || note?.slug} 
                onSaveSuccess={() => {
                    setIsSaved(true);
                    queryClient.invalidateQueries({ queryKey: ["core-learning-content-details", note?.slug] });
                }}
            />
        </div>
    );
};
export default TopBreadcrumb;