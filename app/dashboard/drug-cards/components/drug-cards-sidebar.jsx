"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Trash2, Loader2, AlertTriangle } from "lucide-react";
import DrugSearchForm from "./drug-search-form";
import QuickSearchGrid from "./quick-search-grid";
import {
  useCardGenerator,
  useCardQuickList,
  useDrugCardHistory,
  useDeleteDrugCardHistory,
  useDeleteAllDrugCardHistory,
} from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SidebarContent = ({ onClose }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDrug = searchParams.get("drug") || "";
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const { quickActionsData } = useCardQuickList();
  const { cardGenerator, isGeneratorPending } = useCardGenerator();
  const { historyData, isHistoryLoading } = useDrugCardHistory();
  const { deleteHistory, isDeleting } = useDeleteDrugCardHistory();
  const { deleteAllHistory, isDeletingAll } = useDeleteAllDrugCardHistory();

  const totalHistory = historyData?.data?.length || 0;

  // Card Generated handler function.
  const handleGenerateCard = async (drugName) => {
    cardGenerator(
      { drug_name: drugName, force_refresh: false },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || "Card generated successfully");
          queryClient.invalidateQueries({ queryKey: ["drug-card-history"] });
          navigateToDrug(drugName);
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to generate card"
          );
        },
      }
    );
  };

  // Keep input in sync with current query param
  useEffect(() => {
    const isQuickSearch = quickActionsData?.some(
      (d) => d.toLowerCase() === currentDrug.toLowerCase()
    );
    if (isQuickSearch) {
      setInputValue("");
    } else {
      setInputValue(currentDrug);
    }
  }, [currentDrug, quickActionsData]);

  const navigateToDrug = (drugName) => {
    const params = new URLSearchParams(searchParams);
    params.set("drug", drugName);
    router.push(`/dashboard/drug-cards?${params.toString()}`);
    if (onClose) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleGenerateCard(inputValue.trim());
  };

  const handleDrugSelect = (drugName) => {
    setInputValue(drugName);
  };

  const handleConfirmDeleteAll = async () => {
    try {
      await deleteAllHistory();
      setShowClearConfirm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmDeleteSingle = async (id) => {
    try {
      await deleteHistory(id);
      setItemToDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className="w-full h-full border-r border-[#E5E7EB] bg-white overflow-y-auto flex flex-col">
      <div className="relative flex border-b border-[#E5E7EB] shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("search")}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition ${
            activeTab === "search"
              ? "text-[#2C5F8D]"
              : "text-[#697586] hover:text-[#2C5F8D]"
          }`}
        >
          <Search size={14} />
          Search Drug
          {activeTab === "search" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition ${
            activeTab === "history"
              ? "text-[#2C5F8D]"
              : "text-[#697586] hover:text-[#2C5F8D]"
          }`}
        >
          <Clock size={14} />
          <span>History</span>
          {totalHistory > 0 && (
            <span
              className={`ml-0.5 inline-flex items-center justify-center min-w-4.5 h-4.5 rounded-full px-1.5 text-[10px] font-bold leading-none ${
                activeTab === "history"
                  ? "bg-[#2C5F8D] text-white"
                  : "bg-[#E2E8F0] text-[#475569]"
              }`}
            >
              {totalHistory > 99 ? "99+" : totalHistory}
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

      <div className="relative flex-1 overflow-x-hidden overflow-y-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === "search" ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-6 p-5"
            >
              <DrugSearchForm
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSubmit={handleSubmit}
                loading={isGeneratorPending}
              />

              <hr className="border-black/5 w-full" />

              <QuickSearchGrid
                currentDrug={currentDrug}
                onDrugSelect={handleDrugSelect}
                quickActionsData={quickActionsData}
              />
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-5 flex flex-col gap-4 w-full"
            >
              {isHistoryLoading ? (
                <div className="flex items-center justify-center mt-10">
                  <Loader2 size={20} className="animate-spin text-[#2C5F8D]" />
                </div>
              ) : totalHistory === 0 ? (
                <p className="text-[11px] text-[#697586] text-center mt-10">
                  No drug card history yet.
                </p>
              ) : (
                <>
                  {/* Clear All Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#344054]">
                      Recent Drug Cards
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowClearConfirm((prev) => !prev)}
                      disabled={isDeletingAll}
                      className="text-[10px] font-semibold text-[#D92D20] hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                    >
                      Clear all
                    </button>
                  </div>

                  {/* Inline Animated Confirmation Box at Top */}
                  <AnimatePresence>
                    {showClearConfirm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, scale: 0.96 }}
                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] flex flex-col gap-2.5 my-1">
                          <div className="flex items-center gap-2 text-[#D92D20]">
                            <AlertTriangle size={16} className="shrink-0" />
                            <p className="text-xs font-bold">Clear all history items?</p>
                          </div>
                          <p className="text-[11px] text-[#7A271A] leading-relaxed">
                            This action will permanently delete all saved drug cards from history.
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

                  {/* History Items */}
                  <div className="space-y-2">
                    {historyData?.data?.map((item, index) => {
                      const isDeletingThis = itemToDeleteId === item.id;
                      const formattedTime = item.created_at
                        ? new Date(item.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "";

                      return (
                        <div
                          key={item?.id ?? index}
                          className="group relative w-full rounded-lg border border-[#E5E7EB] hover:border-[#2C5F8D] hover:bg-[#F0F7FC] transition-colors bg-white p-4"
                        >
                          <Link
                            href={`/dashboard/drug-cards/${item.id}`}
                            onClick={() => {
                              if (onClose) onClose();
                            }}
                            className="block pr-7"
                          >
                            <div className="flex flex-col gap-1 min-w-0 flex-1">
                              <h4 className="text-sm font-semibold text-[#1D2939] group-hover:text-[#2C5F8D] truncate">
                                {item.drug_name || item.title || "Drug Card"}
                              </h4>
                              {item.drug_class && (
                                <p className="text-xs text-[#64748B] truncate">
                                  {item.drug_class}
                                </p>
                              )}
                            </div>
                            {formattedTime && (
                              <div className="flex justify-start mt-2">
                                <span className="text-[10px] font-medium text-[#98A2B3]">
                                  {formattedTime}
                                </span>
                              </div>
                            )}
                          </Link>

                          {/* Delete button at bottom right side */}
                          {!isDeletingThis && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setItemToDeleteId(item.id);
                              }}
                              disabled={isDeleting}
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
                                    <AlertTriangle
                                      size={14}
                                      className="shrink-0"
                                    />
                                    <p className="text-[11px] font-bold">
                                      Delete this item?
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setItemToDeleteId(null);
                                      }}
                                      disabled={isDeleting}
                                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-[#344054] bg-white border border-[#D0D5DD] hover:bg-gray-50 cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleConfirmDeleteSingle(item.id);
                                      }}
                                      disabled={isDeleting}
                                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-white bg-[#D92D20] hover:bg-red-700 cursor-pointer inline-flex items-center gap-1"
                                    >
                                      {isDeleting ? (
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
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </aside>
  );
};

const DrugCardsSidebar = ({ onClose }) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full bg-white border-r border-[#E5E7EB] p-5" />
      }
    >
      <SidebarContent onClose={onClose} />
    </Suspense>
  );
};

export default DrugCardsSidebar;