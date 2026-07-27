"use client";

import { Map, FileText, Download } from "lucide-react";

export default function ConceptMapHeader({ title = "Heart Failure Clinical Concept Map", onMyMaps, onExport }) {
    return (
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] bg-white shrink-0">
            {/* Left — title */}
            <div className="flex items-center gap-2.5 min-w-0">
                <Map size={18} className="text-[#667085] shrink-0" />
                <h1 className="text-sm font-bold text-[#1D2939] truncate">
                    {title}
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 shrink-0">
                <button
                    type="button"
                    onClick={onMyMaps}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5E7EB] text-xs font-semibold text-[#344054] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                >
                    <FileText size={14} />
                    My Maps
                </button>
                <button
                    type="button"
                    onClick={onExport}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#E85D75] hover:bg-[#D14D65] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                    <Download size={14} />
                    Export PDF
                </button>
            </div>
        </div>
    );
}
