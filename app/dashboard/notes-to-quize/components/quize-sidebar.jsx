import { CloudUpload } from "lucide-react";

const difficultyLevels = ["beginner", "Intermediate", "Advanced"];

const nclexCategories = [
  "Anatomy",
  "Key Terms",
  "Definitions",
  "Clinical",
  "Drugs",
  "Labs",
  "NCLEX Tips",
];

export default function QuizeSidebar({
  selectedQuestionCount,
  setSelectedQuestionCount,
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedFile,
  setSelectedFile,
  onGenerate,
  isGenerating,
}) {
  const handleQuestionCountChange = (event) => {
    const value = Number(event.target.value);

    if (!event.target.value) {
      setSelectedQuestionCount("");
      return;
    }

    setSelectedQuestionCount(Math.min(Math.max(value, 1), 30));
  };

  return (
    <aside className="w-full shrink-0 border-r border-[#E5E7EB] bg-white px-4 py-5 sm:px-6 lg:min-h-[calc(100vh-82px)] lg:w-[330px] xl:w-[360px]">
      <div className="mx-auto flex max-w-md flex-col gap-4 lg:max-w-none">
        <div>
          <h1 className="text-lg font-semibold text-[#222427]">
            Notes to Quiz
          </h1>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#222427]">Content Source</p>
          <textarea
            defaultValue="Paste notes, a topic, or textbook content... e.g. Cardiomedications, fluid & electrolytes, NCLEX priority"
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
            onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
          />
          {selectedFile ? (
            <span className="mt-2 max-w-full truncate text-[11px] font-semibold text-[#2C5F8D]">
              {selectedFile.name}
            </span>
          ) : null}
        </label>

        <div className="space-y-2">
          <label
            htmlFor="quiz-question-count"
            className="text-xs font-semibold text-[#222427]"
          >
            Question Amount
          </label>
          <input
            id="quiz-question-count"
            type="number"
            min="1"
            max="30"
            value={selectedQuestionCount}
            onChange={handleQuestionCountChange}
            className="h-10 w-full rounded-lg border border-[#E6ECF2] bg-[#F8FAFC] px-3 text-xs font-semibold text-[#3F4852] outline-none transition focus:border-[#2C5F8D] focus:bg-white"
          />
          <p className="text-[10px] font-medium text-[#697586]">
            Maximum 30 questions
          </p>
        </div>

        <OptionGroup
          label="Nclex Category"
          options={nclexCategories}
          selectedOption={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <OptionGroup
          label="Difficulty"
          options={difficultyLevels}
          selectedOption={selectedDifficulty}
          onSelect={setSelectedDifficulty}
        />

        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="mt-1 h-11 w-full rounded-md bg-[#2C5F8D] text-xs font-semibold text-white transition hover:bg-[#244F77] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isGenerating ? "Generating..." : "Generate Quiz"}
        </button>
      </div>
    </aside>
  );
}

function OptionGroup({ label, options, selectedOption, onSelect }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[#222427]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`rounded-md px-3 py-2 text-[11px] font-semibold transition ${
              selectedOption === option
                ? "bg-[#D9ECFF] text-[#2C5F8D]"
                : "bg-[#F2F4F7] text-[#3F4852] hover:bg-[#E8EEF5]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
