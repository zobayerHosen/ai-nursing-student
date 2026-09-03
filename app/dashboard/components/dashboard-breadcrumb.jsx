"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Loader2, CheckCircle2, Check } from "lucide-react";
import { useSaveNote, useMarkComplete } from "@/hooks";
import SaveNoteModal from "@/components/save-note-modal";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function DashboardBreadcrumb({
  backHref = "/dashboard/study-notes",
  backLabel = "Study Notes",
  currentNote = null,
  saveLabel = "Save Notes",
  showComplete = true,
  onSaveSuccess,
  onCompleteSuccess,
}) {
  const queryClient = useQueryClient();
  const { saveNote, isPending: isSavePending } = useSaveNote();
  const { markComplete, isPending: isCompletePending } = useMarkComplete();

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  
  // Extract details from currentNote prop
  const noteId = currentNote?.id || currentNote?.slug || currentNote?.content_id;
  const noteTitle =
    typeof currentNote === "string"
      ? currentNote
      : currentNote?.content_name || currentNote?.title || currentNote?.name || "Note Detail";
  
  const [isSaved, setIsSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (currentNote && typeof currentNote === "object") {
      setIsSaved(Boolean(currentNote?.is_saved || currentNote?.saved));
      setIsCompleted(Boolean(currentNote?.is_completed || currentNote?.completed));
    }
  }, [currentNote]);

  // Handle Save / Unsave Note action
  const handleSaveClick = () => {
    if (!isSaved) {
      setIsSaveModalOpen(true);
    } else {
      // Unsave note
      saveNote(
        { content_id: noteId, folder_id: currentNote?.folder_id || currentNote?.folderId },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "Note removed from saved list");
            setIsSaved(false);
            queryClient.invalidateQueries({ queryKey: ["library-get"] });
            queryClient.invalidateQueries({ queryKey: ["core-learning-content-details", noteId] });
            queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
            if (onSaveSuccess) onSaveSuccess(false);
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to update saved status");
          },
        }
      );
    }
  };

  // Handle Mark Complete action
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
      if (onCompleteSuccess) onCompleteSuccess(true);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to mark as completed");
    }
  };

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4 mb-5 transition-all">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm min-w-0 flex-1">
        <Link
          href={backHref}
          className="text-[#326798] hover:text-[#25527a] font-semibold transition-colors shrink-0"
        >
          {backLabel || "Back"}
        </Link>

        <span className="text-gray-400 font-normal shrink-0">/</span>

        <span className="text-[#6B7280] font-medium truncate max-w-60 sm:max-w-100">
          {noteTitle ?? "Untitled Note"}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 shrink-0 ml-auto">
        {/* Save Note Button */}
        <button
          onClick={handleSaveClick}
          disabled={isSavePending}
          className={`cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all shadow-xs border ${
            isSaved
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          {isSavePending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-emerald-600 text-emerald-600" : "text-gray-500"}`} />
          )}
          <span>{isSaved ? "Saved" : saveLabel}</span>
        </button>

        {/* Mark Complete Button */}
        {showComplete && (
          <button
            onClick={handleCompleteClick}
            disabled={isCompletePending || isCompleted}
            className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              isCompleted
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
        )}
      </div>

      {/* Save Note Modal Integration */}
      <SaveNoteModal
        isModalOpen={isSaveModalOpen}
        setIsModalOpen={setIsSaveModalOpen}
        noteId={noteId}
        onSaveSuccess={() => {
          setIsSaved(true);
          queryClient.invalidateQueries({ queryKey: ["core-learning-content-details", noteId] });
          queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
          queryClient.invalidateQueries({ queryKey: ["library-get"] });
          if (onSaveSuccess) onSaveSuccess(true);
        }}
      />
    </div>
  );
};
