"use client";

export const QUICK_SEARCH_DRUGS = [
  "Metformin",
  "Furosemide",
  "Heparin",
  "Insulin",
  "Warfarin",
  "Morphine",
  "Lisinopril",
  "Digoxin",
  "Metoprolol",
  "Aspirin",
  "Amoxicillin",
  "Atorvastatin",
];

export default function QuickSearchGrid({ currentDrug, onDrugSelect }) {
  return (
    <div className="flex flex-col items-start gap-3 w-full">
      <h4 className="text-[#344054] text-sm font-semibold">Quick Search</h4>
      <div className="flex flex-wrap gap-2 w-full">
        {QUICK_SEARCH_DRUGS.map((drug) => {
          const isSelected = currentDrug.toLowerCase() === drug.toLowerCase();
          return (
            <button
              key={drug}
              type="button"
              onClick={() => onDrugSelect(drug)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-[#D9ECFF] text-[#2C5F8D] border-[#2C5F8D] shadow-sm scale-[1.02]"
                  : "bg-white text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]"
              }`}
            >
              {drug}
            </button>
          );
        })}
      </div>
    </div>
  );
}
