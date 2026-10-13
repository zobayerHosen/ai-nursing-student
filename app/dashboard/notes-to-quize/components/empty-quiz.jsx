"use client";

import { CircleHelp } from "lucide-react";

export default function EmptyQuiz({ recentCount = 0 }) {
  return (
    <div className="flex min-h-[52vh] items-start justify-center pt-4 sm:pt-8">
      <div className="flex w-full max-w-xl flex-col items-center justify-center rounded-2xl bg-white px-6 py-12 text-center shadow-xs border border-[#E5E7EB]">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#2C5F8D] text-white shadow-sm">
          <CircleHelp size={32} />
        </div>
        <h3 className="text-2xl font-semibold text-[#1E293B]">
          No quiz generated yet
        </h3>
        <p className="mt-2 max-w-xs text-xs leading-5 text-[#64748B]">
          Upload notes or paste study content in the sidebar and click &quot;Generate Quiz&quot; to begin.
        </p>
        {recentCount > 0 ? (
          <p className="mt-4 rounded-full bg-[#E8F2FC] px-4 py-1 text-xs font-semibold text-[#2C5F8D]">
            {recentCount} saved quiz history session{recentCount === 1 ? "" : "s"} available
          </p>
        ) : null}
      </div>
    </div>
  );
}
