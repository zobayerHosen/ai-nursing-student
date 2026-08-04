"use client";

import { useState } from "react";
import { Plus, CloudUpload, FolderOpen, Download, PenLine } from "lucide-react";

export default function ConceptMapHeader({
    title,
    onRenameMap,
    onAddNode,
    onDownloadPDF,
    // onResetLayout,
    onSaveCanvas,
    onOpenHistory,
    isSaving = false,
}) {
    const [editingTitle, setEditingTitle] = useState(false);
    const [titleValue, setTitleValue] = useState(title || "Clinical Concept Map");

    // Sync incoming title prop when not editing
    const displayTitle = editingTitle ? titleValue : title || "Clinical Concept Map";

    const handleTitleFocus = () => {
        setEditingTitle(true);
        setTitleValue(title || "Clinical Concept Map");
    };

    const handleTitleBlur = () => {
        setEditingTitle(false);
        if (onRenameMap && titleValue.trim() && titleValue.trim() !== title) {
            onRenameMap(titleValue.trim());
        }
    };

    const handleTitleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        }
        if (e.key === "Escape") {
            setTitleValue(title || "Clinical Concept Map");
            setEditingTitle(false);
        }
    };

    return (
        <header className="sticky top-0 w-full h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between z-40 shrink-0 shadow-sm">
            {/* Left — Editable title input */}
            <div className="flex items-center gap-2 min-w-0 flex-1 mr-4">
                <PenLine size={16} color="#2C5F8D" />
                <input
                    type="text"
                    value={displayTitle}
                    onChange={(e) => setTitleValue(e.target.value)}
                    onFocus={handleTitleFocus}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="text-sm font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-sky-500 focus:outline-none transition-colors py-1 px-1 truncate max-w-xs"
                    title="Click to rename this concept map"
                />
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
                {/* My Maps button */}
                <button
                    type="button"
                    onClick={onOpenHistory}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#555555] hover:bg-violet-100 transition border border-gray-200 cursor-pointer"
                >
                    <FolderOpen size={14} className="text-[#555555]" />
                    <span className="hidden lg:inline">My Maps</span>
                </button>

                <button
                    type="button"
                    onClick={onAddNode}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 transition border border-sky-200 cursor-pointer"
                >
                    <Plus size={14} className="text-sky-600" />
                    <span className="hidden lg:inline">Add Node</span>
                </button>

                {/* <button
                    type="button"
                    onClick={onResetLayout}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                    <RotateCcw size={14} />
                    <span className="hidden lg:inline">Reset Layout</span>
                </button> */}

                <button
                    type="button"
                    onClick={onSaveCanvas}
                    disabled={isSaving}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                    <CloudUpload size={14} />
                    <span className="hidden lg:inline">{isSaving ? "Saving..." : "Save Canvas"}</span>
                </button>

                <button
                    type="button"
                    onClick={onDownloadPDF}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary/95 transition border border-gray-200 cursor-pointer"
                >
                    <Download size={16} className="text-white" />
                    <span className="hidden lg:inline">Export PDF</span>
                </button>

            </div>
        </header>
    );
}
