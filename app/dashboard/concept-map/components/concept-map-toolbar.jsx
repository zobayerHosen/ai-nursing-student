"use client";

import {
    PenTool,
    Link2,
    Hand,
    Undo2,
    Redo2,
    ZoomIn,
    Search,
    Maximize2,
    Printer,
} from "lucide-react";

const TOOLS = [
    { icon: PenTool,  label: "Draw" },
    { icon: Link2,    label: "Link" },
    { icon: Hand,     label: "Pan" },
    null, // separator
    { icon: Undo2,    label: "Undo" },
    { icon: Redo2,    label: "Redo" },
    null,
    { icon: ZoomIn,   label: "Zoom" },
    { icon: Search,   label: "Search" },
    { icon: Maximize2,label: "Fullscreen" },
    { icon: Printer,  label: "Print" },
];

export default function ConceptMapToolbar() {
    return (
        <div className="flex items-center gap-1 px-4 py-2 border-b border-[#E5E7EB] bg-white shrink-0">
            {TOOLS.map((tool, i) =>
                tool === null ? (
                    <div
                        key={`sep-${i}`}
                        className="w-px h-5 bg-[#E5E7EB] mx-1"
                    />
                ) : (
                    <button
                        key={tool.label}
                        type="button"
                        title={tool.label}
                        className="p-2 rounded-lg text-[#667085] hover:text-[#2C5F8D] hover:bg-[#F0F7FC] transition-colors cursor-pointer"
                    >
                        <tool.icon size={16} strokeWidth={1.8} />
                    </button>
                )
            )}
        </div>
    );
}
