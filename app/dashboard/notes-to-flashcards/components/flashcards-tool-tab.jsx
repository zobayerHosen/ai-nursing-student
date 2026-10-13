"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  CloudUpload,
  Trash2,
  FileText,
  RefreshCw,
} from "lucide-react";

const formatFileSize = (bytes) => {
  if (!bytes) return "";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const programOptions = [
  { label: "LPN/LVN", value: "LPN" },
  { label: "RN", value: "RN" },
];

const cardTypeOptions = [
  {
    label: "Q & A",
    value: "qa",
    description: "Question on front answer on back.",
  },
  {
    label: "Defination",
    value: "definition",
    description: "Term on front, defination on back.",
  },
  {
    label: "Concept",
    value: "concept",
    description: "Key Idea with explanation.",
  },
];

export default function FlashcardsToolTab({ onGenerate, isGenerating = false }) {
  const [selectedCardCount, setSelectedCardCount] = useState(10);
  const [selectedProgram, setSelectedProgram] = useState("LPN");
  const [selectedCardType, setSelectedCardType] = useState("qa");
  const [useOnlyCourseMaterials, setUseOnlyCourseMaterials] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentSource, setContentSource] = useState("");

  const handleCardCountChange = (event) => {
    const value = Number(event.target.value);

    if (!event.target.value) {
      setSelectedCardCount("");
      return;
    }

    setSelectedCardCount(Math.min(Math.max(value, 1), 30));
  };

  const handleGenerateSubmit = () => {
    const hasFile = Boolean(selectedFile);
    const hasContent = contentSource.trim().length > 0;

    if (!hasFile && !hasContent) {
      toast.error("Please upload a file or enter content source");
      return;
    }

    const cardCountNum = Number(selectedCardCount);
    if (!cardCountNum || cardCountNum < 1 || cardCountNum > 30) {
      toast.error("Card amount must be between 1 and 30");
      return;
    }

    const formData = new FormData();
    if (selectedFile) formData.append("file", selectedFile, selectedFile.name);
    if (hasContent) formData.append("content_source", contentSource.trim());
    formData.append("card_count", String(cardCountNum));
    if (selectedProgram) formData.append("program", selectedProgram);
    if (selectedCardType) formData.append("card_type", selectedCardType);
    formData.append("use_only_course_materials", String(useOnlyCourseMaterials));

    onGenerate?.(formData);
  };

  return (
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
                    setUseOnlyCourseMaterials(false);
                  }}
                  title="Remove file"
                  className="flex h-7 w-7 items-center justify-center rounded-md text-[#53606D] hover:bg-[#DCE5EF] hover:text-[#DC2626] transition cursor-pointer"
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
                    setUseOnlyCourseMaterials(false);
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#DC2626] shadow-xs hover:bg-[#FEF2F2] hover:border-[#FCA5A5] transition cursor-pointer"
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
                    onClick={() => setSelectedProgram(option.value)}
                    className={`rounded-full px-5 py-2 text-xs font-semibold transition border cursor-pointer ${
                      isSelected
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

          {/* Card Type */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#222427]">
              Card Type
            </p>
            <div className="grid grid-cols-3 gap-2">
              {cardTypeOptions.map((option) => {
                const isSelected = selectedCardType === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedCardType(option.value)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition cursor-pointer min-h-21.25 ${
                      isSelected
                        ? "border-[#2C5F8D] bg-[#E8F2FC] text-[#2C5F8D]"
                        : "border-[#E5E7EB] bg-white text-[#53606D] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold leading-tight ${
                        isSelected ? "text-[#2C5F8D]" : "text-[#222427]"
                      }`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-1.5 text-[9.5px] leading-tight text-[#697586] font-normal">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Learning Mode */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#222427]">
              Learning Mode
            </p>
            <button
              type="button"
              onClick={() =>
                setUseOnlyCourseMaterials(!useOnlyCourseMaterials)
              }
              className={`flex w-full items-center justify-center gap-2.5 rounded-full border p-3 text-xs font-semibold transition cursor-pointer text-center ${
                useOnlyCourseMaterials
                  ? "border-[#2C5F8D] bg-[#E8F2FC] text-[#2C5F8D]"
                  : "border-[#DCE5EF] bg-[#F8FAFC] text-[#3F4852] hover:bg-[#EAEFF5]"
              }`}
            >
              <span>Use only my course materials provided</span>
            </button>
          </div>

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
            onClick={handleGenerateSubmit}
            disabled={isGenerating}
            className="mt-1 h-11 w-full rounded-md bg-[#2C5F8D] text-xs font-semibold text-white transition hover:bg-[#244F77] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
          >
            {isGenerating ? "Generating..." : "Generate Flashcards"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
