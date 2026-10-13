"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2, Pencil, Check, X } from "lucide-react";
import {
  useDeleteAllQuizzes,
  useDeleteSingleQuiz,
  useRenameQuizListName,
} from "@/hooks/interactive-tools";
import {
  ClearAllConfirmBox,
  SingleDeleteConfirmBox,
  DeleteIconButton,
} from "@/app/dashboard/components/history-delete-ui";

export default function QuizeHistoryTab({
  quizzes = [],
  onSelectHistory,
  selectedHistoryId = null,
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  // Inline rename states
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const { deleteSingleQuizItem, isPending: isSingleDeleting } =
    useDeleteSingleQuiz();
  const { deleteAllQuizItems, isPending: isDeletingAll } =
    useDeleteAllQuizzes();

  const { renameQuizList, isPending: isRenaming } =
    useRenameQuizListName();

  const handleStartEdit = (e, quiz, index) => {
    e.stopPropagation();
    setEditingId(quiz?.id);
    setEditingName(
      quiz?.file_name || quiz?.program || `Quiz #${quiz?.id ?? index + 1}`
    );
  };

  const handleCancelEdit = (e) => {
    if (e) e.stopPropagation();
    setEditingId(null);
    setEditingName("");
  };

  const handleSaveRename = async (e, id) => {
    if (e) e.stopPropagation();
    const trimmed = editingName.trim();
    if (!trimmed) {
      toast.error("Please enter a valid name");
      return;
    }

    try {
      await renameQuizList({
        id,
        payload: { file_name: trimmed },
      });
      toast.success("Renamed successfully");
      setEditingId(null);
      setEditingName("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to rename");
    }
  };

  const handleConfirmDeleteAll = async () => {
    try {
      await deleteAllQuizItems();
      setShowClearConfirm(false);
      if (selectedHistoryId) {
        onSelectHistory?.(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDeleteSingle = async (id) => {
    try {
      await deleteSingleQuizItem(id);
      setItemToDeleteId(null);
      if (selectedHistoryId === id) {
        onSelectHistory?.(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="px-4 py-5 sm:px-6">
        {/* Header with Clear All button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#222427]">
            Quiz History
          </h2>
          {quizzes.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm((prev) => !prev)}
              disabled={isDeletingAll}
              className="text-[10px] font-semibold text-[#D92D20] hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors cursor-pointer disabled:opacity-50"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Reusable Clear All Confirmation Box */}
        <ClearAllConfirmBox
          isOpen={showClearConfirm}
          onClose={() => setShowClearConfirm(false)}
          onConfirm={handleConfirmDeleteAll}
          isDeleting={isDeletingAll}
          itemType="quizzes"
        />

        {/* History List */}
        {quizzes.length === 0 ? (
          <p className="text-[11px] text-[#697586]">No quiz history yet.</p>
        ) : (
          <div className="space-y-2">
            {quizzes.map((quiz, index) => {
              const isSelected = selectedHistoryId === quiz?.id;
              const isDeletingThis = itemToDeleteId === quiz?.id;

              return (
                <div
                  key={quiz?.id ?? index}
                  className={`group relative w-full rounded-lg border p-3 text-left text-xs transition ${isSelected
                      ? "border-[#2C5F8D] bg-[#E8F2FC] text-[#2C5F8D]"
                      : "border-[#E5E7EB] text-[#3F4852] hover:bg-[#F8FAFC] bg-white"
                    }`}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (editingId !== quiz?.id) {
                        onSelectHistory?.(quiz?.id);
                      }
                    }}
                  >
                    {editingId === quiz?.id ? (
                      <div
                        className="flex items-center gap-1.5 mb-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSaveRename(e, quiz?.id);
                            } else if (e.key === "Escape") {
                              e.preventDefault();
                              handleCancelEdit(e);
                            }
                          }}
                          disabled={isRenaming}
                          className="flex-1 min-w-0 px-2 py-0.5 text-xs font-semibold bg-white border border-[#2C5F8D] rounded outline-none text-[#222427] focus:ring-1 focus:ring-[#2C5F8D]"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={(e) => handleSaveRename(e, quiz?.id)}
                          disabled={isRenaming || !editingName.trim()}
                          className="p-1 rounded text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer disabled:opacity-40 shrink-0"
                          title="Save"
                        >
                          {isRenaming ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Check size={13} />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          disabled={isRenaming}
                          className="p-1 rounded text-[#98A2B3] hover:text-[#D92D20] hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          title="Cancel"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 min-w-0">
                        <p
                          className="font-semibold truncate"
                          title={quiz?.file_name ?? "N/A"}
                        >
                          {quiz?.file_name ?? "N/A"}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => handleStartEdit(e, quiz, index)}
                          className="p-1 rounded text-[#98A2B3] hover:text-[#2C5F8D] hover:bg-black/5 transition-colors cursor-pointer shrink-0"
                          title="Rename"
                        >
                          <Pencil size={12} />
                        </button>
                      </div>
                    )}

                    <div className="mt-1 flex items-center justify-between text-[10px] text-[#697586] pr-7">
                      <span className="rounded bg-[#E2E8F0] px-1.5 py-0.5 font-semibold text-[#334155]">
                        {quiz?.question_format || "MCQ"}
                      </span>
                      <span>
                        {quiz?.total_questions ??
                          quiz?.question_requested ??
                          0}{" "}
                        Qs
                      </span>
                      {quiz?.created_at && (
                        <span>
                          {new Date(quiz.created_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delete button at bottom right side (hidden when confirmation modal is open or when editing) */}
                  {!isDeletingThis && editingId !== quiz?.id && (
                    <DeleteIconButton
                      onClick={() => setItemToDeleteId(quiz?.id)}
                      disabled={isSingleDeleting}
                    />
                  )}

                  {/* Single Item Delete Confirmation Box */}
                  <SingleDeleteConfirmBox
                    isOpen={isDeletingThis}
                    onClose={() => setItemToDeleteId(null)}
                    onConfirm={() => handleConfirmDeleteSingle(quiz?.id)}
                    isDeleting={isSingleDeleting}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
