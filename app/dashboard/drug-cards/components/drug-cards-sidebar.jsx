"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock } from "lucide-react";
import DrugSearchForm from "./drug-search-form";
import QuickSearchGrid from "./quick-search-grid";
import { useCardGenerator, useCardQuickList } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SidebarContent = ({ onClose }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDrug = searchParams.get("drug") || "";
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const { quickActionsData } = useCardQuickList();
  const { cardGenerator, isGeneratorPending } = useCardGenerator();


  // Card Generated handler function.
  const handleGenerateCard = async (drugName) => {
    cardGenerator(
      { drug_name: drugName, force_refresh: false },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || "Card generated successfully");

          const drugData = data?.data?.data || data?.data;
          if (drugData) {
            localStorage.setItem("generatedDrugCard", JSON.stringify(drugData));
          }

          queryClient.invalidateQueries({ queryKey: ["generated-card-lists"] })
          navigateToDrug(drugName);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Failed to generate card");
        }
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

  return (
    <aside className="w-full h-full border-r border-[#E5E7EB] bg-white overflow-y-auto flex flex-col">
      <div className="relative flex border-b border-[#E5E7EB]">
        <button
          type="button"
          onClick={() => setActiveTab("search")}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition ${activeTab === "search"
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
        {/* 
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-semibold transition ${activeTab === "history"
            ? "text-[#2C5F8D]"
            : "text-[#697586] hover:text-[#2C5F8D]"
            }`}
        >
          <Clock size={14} />
          <span>History</span>
          {activeTab === "history" && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
       */}
      </div>

      <div className="relative overflow-hidden h-full flex flex-col">
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
              className="p-5 flex flex-col items-center justify-center text-center mt-10"
            >
              <p className="text-[12px] text-[#697586]">No search history yet.</p>
              <p className="text-[10px] text-[#98A2B3] mt-1">History functionality is coming soon.</p>
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