import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CloudUpload,
  History,
  Settings2,
  Trash2,
  AlertTriangle,
  Loader2,
  FileText,
  RefreshCw,
} from "lucide-react";
import {
  useDeleteSingleHistoryList,
  useDeleteAllHistoryList,
} from "@/hooks/interactive-tools";

const formatFileSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

export default function FlashcardsSidebar({
  selectedCardCount,
  setSelectedCardCount,
  selectedProgram = "LPN",
  setSelectedProgram,
  useOnlyCourseMaterials = false,
  setUseOnlyCourseMaterials,
  selectedFile,
  setSelectedFile,
  contentSource,
  setContentSource,
  onGenerate,
  isGenerating,
  activeTab,
  onTabChange,
  flashcardsList = [],
  onSelectHistory,
  selectedHistoryId,
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const { deleteSingleHistory, isPending: isSingleDeleting } =
    useDeleteSingleHistoryList();
  const { deleteAllHistory, isPending: isDeletingAll } =
    useDeleteAllHistoryList();

  const programOptions = [
    { label: "LPN/LVN", value: "LPN" },
    { label: "RN", value: "RN" },
  ];

  const handleCardCountChange = (event) => {
    const value = Number(event.target.value);

    if (!event.target.value) {
      setSelectedCardCount("");
      return;
    }

    setSelectedCardCount(Math.min(Math.max(value, 1), 30));
  };

  const handleConfirmDeleteAll = async () => {
    try {
      await deleteAllHistory();
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
      await deleteSingleHistory(id);
      setItemToDeleteId(null);
      if (selectedHistoryId === id) {
        onSelectHistory?.(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="w-full shrink-0 border-r border-[#E5E7EB] bg-white lg:min-h-[calc(100vh-82px)] lg:w-82.5 xl:w-90">
      {/* Tab headers with animated underline */}
      <div className="relative flex border-b border-[#E5E7EB]">
        <button
          type="button"
          onClick={() => onTabChange("tool")}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition ${
            activeTab === "tool"
              ? "text-[#2C5F8D]"
              : "text-[#697586] hover:text-[#2C5F8D]"
          }`}
        >
          <Settings2 size={14} />
          Tool
          {activeTab === "tool" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => onTabChange("history")}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition ${
            activeTab === "history"
              ? "text-[#2C5F8D]"
              : "text-[#697586] hover:text-[#2C5F8D]"
          }`}
        >
          <History size={14} />
          <span>History</span>
          {flashcardsList.length > 0 && (
            <span
              className={`ml-0.5 inline-flex items-center justify-center min-w-4.5 h-4.5 rounded-full px-1.5 text-[10px] font-bold leading-none ${
                activeTab === "history"
                  ? "bg-[#2C5F8D] text-white"
                  : "bg-[#E2E8F0] text-[#475569]"
              }`}
            >
              {flashcardsList.length > 99 ? "99+" : flashcardsList.length}
            </span>
          )}
          {activeTab === "history" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "tool" ? (
            <motion.div
              key="tool"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="mx-auto flex max-w-md flex-col gap-4 lg:max-w-none">
                  <div>
                    <h1 className="text-lg font-semibold text-[#222427]">
                      Flashcards
                    </h1>
                  </div>

                  {/* Content Source */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#222427]">
                      Content Source
                    </p>
                    <textarea
                      value={contentSource}
                      onChange={(e) => setContentSource(e.target.value)}
                      placeholder="Paste notes, a topic, or textbook content,e-g, Cardiacmedications, fluid & electrolytes, NCLEX priority"
                      className="min-h-28 w-full resize-none rounded-lg border border-[#E6ECF2] bg-[#F8FAFC] p-3 text-xs leading-5 text-[#53606D] outline-none transition focus:border-[#2C5F8D] focus:bg-white"
                    />
                  </div>

                  {/* Upload Box */}
                  {selectedFile ? (
                    <div className="relative flex flex-col rounded-lg border border-[#2C5F8D]/30 bg-[#E8F2FC] p-3.5 transition">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2C5F8D] text-white">
                          <FileText size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className="truncate text-xs font-semibold text-[#222427]"
                            title={selectedFile.name}
                          >
                            {selectedFile.name}
                          </p>
                          {selectedFile.size ? (
                            <p className="text-[10px] text-[#53606D]">
                              {formatFileSize(selectedFile.size)}
                            </p>
                          ) : null}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setUseOnlyCourseMaterials?.(false);
                          }}
                          title="Remove file"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-[#53606D] hover:bg-[#DCE5EF] hover:text-[#DC2626] transition"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Replace / Remove action buttons */}
                      <div className="mt-3 flex items-center gap-2 border-t border-[#D0E1F2] pt-2.5">
                        <label className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-[#2C5F8D]/30 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#2C5F8D] shadow-xs hover:bg-[#F0F6FC] transition">
                          <RefreshCw size={13} />
                          <span>Replace</span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) {
                                setSelectedFile(file);
                              }
                              event.target.value = "";
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedFile(null);
                            setUseOnlyCourseMaterials?.(false);
                          }}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#DC2626] shadow-xs hover:bg-[#FEF2F2] hover:border-[#FCA5A5] transition"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-[#DCE5EF] bg-[#E8EEF5] px-4 py-4 text-center transition hover:border-[#2C5F8D] hover:bg-[#E3ECF5]">
                      <span className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#2C5F8D] text-white">
                        <CloudUpload size={18} />
                      </span>
                      <span className="text-xs font-semibold text-[#222427]">
                        Drop files or click to browse
                      </span>
                      <span className="mt-1 text-[10px] font-medium uppercase text-[#697586]">
                        PDF • DOCX • PPTX • Images
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                          }
                          event.target.value = "";
                        }}
                      />
                    </label>
                  )}

                  {/* Program */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#222427]">
                      Program
                    </p>
                    <div className="flex gap-2">
                      {programOptions.map((option) => {
                        const isSelected = selectedProgram === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setSelectedProgram?.(option.value)}
                            className={`rounded-full px-5 py-2 text-xs font-semibold transition border ${isSelected
                                ? "border-[#2C5F8D] bg-[#E8F2FC] text-[#2C5F8D]"
                                : "border-[#DCE5EF] bg-white text-[#53606D] hover:bg-[#F8FAFC]"
                              }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Learning Mode (Only visible when a file is uploaded) */}
                  {selectedFile ? (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-[#222427]">
                        Learning Mode
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setUseOnlyCourseMaterials?.(!useOnlyCourseMaterials)
                        }
                        className={`flex w-full items-center justify-center gap-2.5 rounded-lg border p-3 text-xs font-medium transition cursor-pointer text-center ${useOnlyCourseMaterials
                            ? "border-[#2C5F8D] bg-[#E8F2FC] text-[#2C5F8D] font-semibold"
                            : "border-[#DCE5EF] bg-[#F8FAFC] text-[#3F4852] hover:bg-[#EAEFF5]"
                          }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${useOnlyCourseMaterials
                              ? "border-[#2C5F8D] bg-[#2C5F8D]"
                              : "border-[#94A3B8] bg-white"
                            }`}
                        >
                          {useOnlyCourseMaterials && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        <span>Use only my course materials provided</span>
                      </button>
                    </div>
                  ) : null}

                  {/* Card Amount Input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="flashcard-count"
                      className="text-xs font-semibold text-[#222427]"
                    >
                      Card Amount
                    </label>
                    <input
                      id="flashcard-count"
                      type="number"
                      min="1"
                      max="30"
                      value={selectedCardCount}
                      onChange={handleCardCountChange}
                      className="h-10 w-full rounded-lg border border-[#E6ECF2] bg-[#F8FAFC] px-3 text-xs font-semibold text-[#3F4852] outline-none transition focus:border-[#2C5F8D] focus:bg-white"
                    />
                    <p className="text-[10px] font-medium text-[#697586]">
                      Maximum 30 cards
                    </p>
                  </div>

                  {/* Generate Button */}
                  <button
                    type="button"
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className="mt-1 h-11 w-full rounded-md bg-[#2C5F8D] text-xs font-semibold text-white transition hover:bg-[#244F77] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isGenerating ? "Generating..." : "Generate Flashcards"}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
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
                    Flashcard History
                  </h2>
                  {flashcardsList.length > 0 && (
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

                {/* Inline Clear All Confirmation Box */}
                <AnimatePresence>
                  {showClearConfirm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, scale: 0.96 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden mb-3"
                    >
                      <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] flex flex-col gap-2.5 my-1">
                        <div className="flex items-center gap-2 text-[#D92D20]">
                          <AlertTriangle size={16} className="shrink-0" />
                          <p className="text-xs font-bold">
                            Clear all history items?
                          </p>
                        </div>
                        <p className="text-[11px] text-[#7A271A] leading-relaxed">
                          This action will permanently delete all saved flashcards
                          from history.
                        </p>
                        <div className="flex items-center justify-end gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => setShowClearConfirm(false)}
                            disabled={isDeletingAll}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold text-[#344054] bg-white border border-[#D0D5DD] hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleConfirmDeleteAll}
                            disabled={isDeletingAll}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold text-white bg-[#D92D20] hover:bg-red-700 transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                          >
                            {isDeletingAll ? (
                              <>
                                <Loader2 size={12} className="animate-spin" />
                                Clearing...
                              </>
                            ) : (
                              "Yes, Clear All"
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* History List */}
                {flashcardsList.length === 0 ? (
                  <p className="text-[11px] text-[#697586]">
                    No flashcard history yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {flashcardsList.map((item, index) => {
                      const isSelected = selectedHistoryId === item?.id;
                      const isDeletingThis = itemToDeleteId === item?.id;

                      return (
                        <div
                          key={item?.id ?? index}
                          className={`group relative w-full rounded-lg border p-3 text-left text-xs transition ${isSelected
                              ? "border-[#2C5F8D] bg-[#E8F2FC] text-[#2C5F8D]"
                              : "border-[#E5E7EB] text-[#3F4852] hover:bg-[#F8FAFC] bg-white"
                            }`}
                        >
                          <div
                            className="cursor-pointer pr-7"
                            onClick={() => onSelectHistory(item?.id)}
                          >
                            <p className="font-semibold truncate">
                              {item?.file_name || item?.program || `Set ${index + 1}`}
                            </p>
                            <div className="mt-1 flex items-center justify-between text-[10px] text-[#697586]">
                              <span>{item?.total_cards ?? 0} cards</span>
                              {item?.created_at ? (
                                <span>
                                  {new Date(item.created_at).toLocaleDateString()}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          {/* Delete button at bottom right side (hidden when confirmation modal is open) */}
                          {!isDeletingThis && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setItemToDeleteId(item?.id);
                              }}
                              disabled={isSingleDeleting}
                              className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md text-[#98A2B3] hover:bg-red-50 hover:text-[#D92D20] transition-colors cursor-pointer"
                              title="Delete item"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}

                          {/* Single Item Delete Confirmation Box */}
                          <AnimatePresence>
                            {isDeletingThis && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.15 }}
                                className="overflow-hidden mt-2 pt-2 border-t border-red-100"
                              >
                                <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2] flex flex-col gap-2">
                                  <div className="flex items-center gap-1.5 text-[#D92D20]">
                                    <AlertTriangle size={14} className="shrink-0" />
                                    <p className="text-[11px] font-bold">
                                      Delete this item?
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setItemToDeleteId(null);
                                      }}
                                      disabled={isSingleDeleting}
                                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-[#344054] bg-white border border-[#D0D5DD] hover:bg-gray-50 cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleConfirmDeleteSingle(item?.id);
                                      }}
                                      disabled={isSingleDeleting}
                                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-white bg-[#D92D20] hover:bg-red-700 cursor-pointer inline-flex items-center gap-1"
                                    >
                                      {isSingleDeleting ? (
                                        <Loader2
                                          size={10}
                                          className="animate-spin"
                                        />
                                      ) : (
                                        "Delete"
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
