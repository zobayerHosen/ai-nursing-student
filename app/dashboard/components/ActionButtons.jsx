"use client";

import React, { useState } from "react";
import { Bookmark, Share2, Check } from "lucide-react";

export default function ActionButtons() {
  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2.5 max-sm:w-full">
      <button
        onClick={handleSave}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm active:scale-95 ${
          isSaved
            ? "bg-[#2C5F8D]/10 border text-[#2C5F8D] border-[#2C5F8D]/30 text-sm"
            : "bg-white border border-[#E5E7EB] hover:text-[#2C5F8D] hover:border-[#2C5F8D]/30"
        }`}
      >
        <Bookmark size={14} className={isSaved ? "fill-[#2C5F8D]" : ""} />
        {isSaved ? "Saved" : "Save Guide"}
      </button>

      <button
        onClick={handleShare}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm active:scale-95 ${
          isShared
            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
            : "bg-white border border-[#E5E7EB] hover:text-[#2C5F8D] hover:border-[#2C5F8D]/30"
        }`}
      >
        {isShared ? <Check size={14} /> : <Share2 size={14} />}
        {isShared ? "Copied!" : "Share Link"}
      </button>
    </div>
  );
}
