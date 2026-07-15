"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock } from "lucide-react";
import DrugSearchForm from "./drug-search-form";
import QuickSearchGrid, { QUICK_SEARCH_DRUGS } from "./quick-search-grid";
import HistoryList, { HISTORY_STORAGE_KEY } from "./history-list";

const SidebarContent = ({ onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDrug = searchParams.get("drug") || "";
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("search");

  // Load history from localStorage
  const loadHistory = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) || "[]");
      setHistory(stored);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    loadHistory();
    const handler = () => loadHistory();
    window.addEventListener("drug-history-updated", handler);
    return () => window.removeEventListener("drug-history-updated", handler);
  }, []);

  // Keep input in sync with current query param
  useEffect(() => {
    const isQuickSearch = QUICK_SEARCH_DRUGS.some(
      (d) => d.toLowerCase() === currentDrug.toLowerCase()
    );
    if (isQuickSearch) {
      setInputValue("");
    } else {
      setInputValue(currentDrug);
    }
  }, [currentDrug]);

  const navigateToDrug = (drugName) => {
    const params = new URLSearchParams(searchParams);
    params.set("drug", drugName);
    router.push(`/dashboard/drug-cards?${params.toString()}`);
    if (onClose) onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    navigateToDrug(inputValue.trim());
  };

  const handleDrugSelect = (drugName) => {
    navigateToDrug(drugName);
  };

  const handleRemoveHistoryItem = (e, drugName) => {
    e.stopPropagation();
    const updated = history.filter(
      (item) => item.drugName.toLowerCase() !== drugName.toLowerCase()
    );
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    setHistory(updated);
  };

  const handleClearAllHistory = () => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));
    setHistory([]);
  };

  return (
    <aside className="w-full h-full border-r border-[#E5E7EB] bg-white overflow-y-auto flex flex-col">
      {/* Tab headers with animated underline */}
      <div className="relative flex border-b border-[#E5E7EB]">
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
          {history.length > 0 && (
            <span
              className={`ml-0.5 inline-flex items-center justify-center min-w-4.5 h-4.5 rounded-full px-1.5 text-[10px] font-bold leading-none ${
                activeTab === "history"
                  ? "bg-[#2C5F8D] text-white"
                  : "bg-[#E2E8F0] text-[#475569]"
              }`}
            >
              {history.length > 99 ? "99+" : history.length}
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
              />

              <hr className="border-black/5 w-full" />

              <QuickSearchGrid currentDrug={currentDrug} onDrugSelect={handleDrugSelect} />
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-5"
            >
              <HistoryList
                history={history}
                currentDrug={currentDrug}
                onDrugSelect={handleDrugSelect}
                onRemoveItem={handleRemoveHistoryItem}
                onClearAll={handleClearAllHistory}
              />
              {history.length === 0 && (
                <p className="text-[11px] text-[#697586]">No search history yet.</p>
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
        <Suspense fallback={<div className="w-full h-full bg-white border-r border-[#E5E7EB] p-5"></div>}>
            <SidebarContent onClose={onClose} />
        </Suspense>
    );
};

export default DrugCardsSidebar;