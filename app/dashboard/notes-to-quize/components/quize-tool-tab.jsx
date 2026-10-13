"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { CircleHelp } from "lucide-react";
import {
  programOptions,
  questionFormatOptions,
  difficultyOptions,
  DEFAULT_QUESTION_COUNT,
  MIN_QUESTION_COUNT,
  MAX_QUESTION_COUNT,
  clampQuestionCount,
} from "./quize-tool.constants";
import QuizeUploadBox from "./quize-upload-box";

export default function QuizeToolTab({ onGenerate, isGenerating = false }) {
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(
    DEFAULT_QUESTION_COUNT
  );
  const [selectedProgram, setSelectedProgram] = useState("RN");
  const [selectedQuizType, setSelectedQuizType] = useState("MCQ");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedFile, setSelectedFile] = useState(null);
  const [contentSource, setContentSource] = useState("");

  const handleQuestionCountChange = (event) => {
    setSelectedQuestionCount(clampQuestionCount(event.target.value));
  };

  const handleFormSubmit = () => {
    const hasFile = !!selectedFile;
    const hasContent = contentSource.trim().length > 0;

    if (!hasFile && !hasContent) {
      toast.error("Please upload a file or enter content source");
      return;
    }

    if (
      !selectedQuestionCount ||
      selectedQuestionCount < MIN_QUESTION_COUNT ||
      selectedQuestionCount > MAX_QUESTION_COUNT
    ) {
      toast.error(
        `Question amount must be between ${MIN_QUESTION_COUNT} and ${MAX_QUESTION_COUNT}`
      );
      return;
    }

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile, selectedFile.name);
    }
    if (hasContent) {
      formData.append("content_source", contentSource);
    }
    formData.append("question_requested", String(selectedQuestionCount));
    if (selectedProgram) formData.append("program", selectedProgram);
    if (selectedQuizType) formData.append("question_format", selectedQuizType);
    if (selectedDifficulty) formData.append("question_type", selectedDifficulty);

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
        <div className="mx-auto flex max-w-md flex-col gap-4.5 lg:max-w-none">
          <div>
            <h1 className="text-lg font-semibold text-[#222427]">
              Notes to Quiz
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
              placeholder="Paste notes, a topic, or textbook content... e.g. Cardiomedications, fluid & electrolytes, NCLEX priority"
              className="min-h-28 w-full resize-none rounded-lg border border-[#E6ECF2] bg-[#F8FAFC] p-3 text-xs leading-5 text-[#53606D] outline-none transition focus:border-[#2C5F8D] focus:bg-white"
            />
          </div>

          {/* File Upload Box */}
          <QuizeUploadBox
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />

          {/* Select your program */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#222427]">
              Select your program
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

          {/* Question Format with Radio Buttons */}
          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-[#1E293B]">
              Question Format
            </p>
            <div className="flex flex-col gap-2">
              {questionFormatOptions.map((option) => {
                const isSelected = selectedQuizType === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedQuizType(option.value)}
                    className={`group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-xs font-medium transition cursor-pointer ${
                      isSelected
                        ? "bg-[#E8F2FC] text-[#1E293B] font-semibold shadow-xs"
                        : "bg-[#F4F5F7] text-[#475569] hover:bg-[#EAEDF1]"
                    }`}
                  >
                    {/* Custom Radio Circle */}
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isSelected
                          ? "border-[#2C5F8D] bg-white"
                          : "border-[#94A3B8] bg-white group-hover:border-[#64748B]"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-[#2C5F8D]" />
                      )}
                    </div>

                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Amount */}
          <div className="space-y-2">
            <label
              htmlFor="quiz-question-count"
              className="text-xs font-semibold text-[#222427] block"
            >
              Question
            </label>
            <input
              id="quiz-question-count"
              type="number"
              min="1"
              max="30"
              value={selectedQuestionCount}
              onChange={handleQuestionCountChange}
              className="h-10 w-full rounded-lg border border-[#E6ECF2] bg-[#F8FAFC] px-3 text-xs font-semibold text-[#3F4852] outline-none transition focus:border-[#2C5F8D] focus:bg-white"
              placeholder="Or enter custom number (1-30)"
            />
            <p className="text-[10px] font-medium text-[#697586]">
              Maximum 30 questions
            </p>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-semibold text-[#222427]">
                Difficulty Level
              </p>
              <CircleHelp size={14} className="text-[#94A3B8]" />
            </div>
            <div className="flex items-center rounded-xl bg-[#F1F5F9] p-1 border border-[#E2E8F0]">
              {difficultyOptions.map((option) => {
                const isSelected = selectedDifficulty === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedDifficulty(option.value)}
                    className={`flex-1 rounded-lg py-1.5 text-center text-xs transition cursor-pointer ${
                      isSelected
                        ? "bg-white font-semibold text-[#2C5F8D] shadow-xs"
                        : "text-[#64748B] hover:text-[#1E293B] font-medium"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={isGenerating}
            className="mt-1 h-11 w-full rounded-md bg-[#2C5F8D] text-xs font-semibold text-white transition hover:bg-[#244F77] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
          >
            {isGenerating ? "Generating..." : "Generate Quiz"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}