"use client";

import { Search } from "lucide-react";

export default function DrugSearchForm({ inputValue, onInputChange, onSubmit, loading }) {
  const isEmpty = !inputValue.trim() || loading;

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-start gap-3 w-full">
      <h4 className="text-[#344054] text-sm font-semibold">Drug Name</h4>

      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3] w-4.5 h-4.5" />
        <input
          type="text"
          name="drug_name"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Drug name. e.g. Metformin"
          className="w-full pl-10 pr-4 py-2.5 border border-[#DFE1E7] focus:border-[#2C5F8D] focus:ring-1 focus:ring-[#2C5F8D]/20 rounded-lg text-sm outline-none transition-all text-[#1D2939]"
        />
      </div>

      <button
        type="submit"
        disabled={isEmpty}
        className={`w-full px-4 py-2.5 rounded-lg text-sm font-semibold outline-0 shadow-sm text-center transition-all duration-300 ${
          isEmpty
            ? "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
            : "bg-[#2C5F8D] hover:bg-[#1E4266] active:bg-[#15304C] text-white cursor-pointer"
        }`}
      >
        {loading ? "Checking..." : "Check Drug Card"}
      </button>
    </form>
  );
}
