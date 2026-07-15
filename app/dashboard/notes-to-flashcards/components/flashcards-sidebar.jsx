import { motion, AnimatePresence } from "framer-motion";
import { CloudUpload, History, Settings2 } from "lucide-react";

const focusAreas = [
  "Anatomy",
  "Key Terms",
  "Definitions",
  "Clinical",
  "Drugs",
  "Labs",
  "NCLEX Tips",
];

export default function FlashcardsSidebar({
  selectedCardCount,
  setSelectedCardCount,
  selectedFocus,
  setSelectedFocus,
  selectedFile,
  setSelectedFile,
  contentSource,
  setContentSource,
  onGenerate,
  isGenerating,
  activeTab,
  onTabChange,
  flashcardsList,
  onSelectHistory,
  selectedHistoryId,
}) {
  const handleCardCountChange = (event) => {
    const value = Number(event.target.value);

    if (!event.target.value) {
      setSelectedCardCount("");
      return;
    }

    setSelectedCardCount(Math.min(Math.max(value, 1), 30));
  };

  return (
    <aside className="w-full shrink-0 border-r border-[#E5E7EB] bg-white lg:min-h-[calc(100vh-82px)] lg:w-[330px] xl:w-[360px]">
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
              className={`ml-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] rounded-full px-1.5 text-[10px] font-bold leading-none ${
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

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#222427]">
                      Content Source
                    </p>
                    <textarea
                      value={contentSource}
                      onChange={(e) => setContentSource(e.target.value)}
                      placeholder="Paste notes, a topic, or textbook content... e.g. Cardiomedications, fluid & electrolytes, NCLEX priority"
                      className="min-h-32 w-full resize-none rounded-lg border border-[#E6ECF2] bg-[#F8FAFC] p-3 text-xs leading-5 text-[#53606D] outline-none transition focus:border-[#2C5F8D] focus:bg-white"
                    />
                  </div>

                  <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-[#DCE5EF] bg-[#E8EEF5] px-4 py-5 text-center transition hover:border-[#2C5F8D] hover:bg-[#E3ECF5]">
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2C5F8D] text-white">
                      <CloudUpload size={18} />
                    </span>
                    <span className="text-xs font-semibold text-[#222427]">
                      Drop files or click to browse
                    </span>
                    <span className="mt-1 text-[10px] font-medium uppercase text-[#697586]">
                      PDF - DOCX - PPTX - Images
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                      onChange={(event) =>
                        setSelectedFile(event.target.files?.[0] ?? null)
                      }
                    />
                    {selectedFile ? (
                      <span className="mt-2 max-w-full truncate text-[11px] font-semibold text-[#2C5F8D]">
                        {selectedFile.name}
                      </span>
                    ) : null}
                  </label>

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

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-[#222427]">Focus Area</p>
                    <div className="flex flex-wrap gap-2">
                      {focusAreas.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setSelectedFocus(area)}
                          className={`rounded-md px-3 py-2 text-[11px] font-semibold transition ${
                            selectedFocus === area
                              ? "bg-[#D9ECFF] text-[#2C5F8D]"
                              : "bg-[#F2F4F7] text-[#3F4852] hover:bg-[#E8EEF5]"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

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
                <h2 className="text-sm font-semibold text-[#222427] mb-4">
                  Flashcard History
                </h2>
                {flashcardsList.length === 0 ? (
                  <p className="text-[11px] text-[#697586]">
                    No flashcard history yet.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {flashcardsList.map((item, index) => (
                      <button
                        key={item?.id ?? index}
                        type="button"
                        onClick={() => onSelectHistory(item?.id)}
                        className={`w-full rounded-lg border px-3 py-2.5 text-left text-xs transition ${
                          selectedHistoryId === item?.id
                            ? "border-[#2C5F8D] bg-[#E8F2FC] text-[#2C5F8D]"
                            : "border-[#E5E7EB] text-[#3F4852] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <p className="font-semibold truncate">
                          {item?.focus_area ?? item?.title ?? `Set ${index + 1}`}
                        </p>
                        {item?.created_at ? (
                          <p className="mt-0.5 text-[10px] text-[#697586]">
                            {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        ) : null}
                      </button>
                    ))}
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
