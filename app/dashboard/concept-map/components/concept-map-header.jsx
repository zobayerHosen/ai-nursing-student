"use client";

import { useState } from "react";
import { Plus, CloudUpload, FolderOpen, Download, PenLine, Menu } from "lucide-react";

export default function ConceptMapHeader({
    title,
    onToggleSidebar,
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
        <header className="sticky top-0 w-full h-14 sm:h-16 bg-white border-b border-slate-200 px-3 sm:px-4 lg:px-6 flex items-center justify-between z-40 shrink-0 shadow-xs gap-2">
            {/* Left — Mobile toggle & Editable title input */}
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                {onToggleSidebar && (
                    <button
                        type="button"
                        onClick={onToggleSidebar}
                        className="xl:hidden p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[#2C5F8D] transition-colors cursor-pointer shrink-0"
                        title="Open CARA Assistant"
                    >
                        <Menu size={18} />
                    </button>
                )}

                <PenLine size={16} className="text-[#2C5F8D] shrink-0 hidden md:block" />

                <input
                    type="text"
                    value={displayTitle}
                    onChange={(e) => setTitleValue(e.target.value)}
                    onFocus={handleTitleFocus}
                    onBlur={handleTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="text-xs sm:text-sm font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-sky-500 focus:outline-none transition-colors py-0.5 px-1 truncate max-w-30 min-[400px]:max-w-40 sm:max-w-xs md:max-w-sm lg:max-w-md"
                    title="Click to rename this concept map"
                />
            </div>

            {/* Right — actions */}
            <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 shrink-0">
                {/* My Maps button */}
                <button
                    type="button"
                    onClick={onOpenHistory}
                    className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#555555] hover:bg-violet-50 hover:text-violet-700 transition border border-gray-200 cursor-pointer"
                    title="My Maps"
                >
                    <FolderOpen size={14} className="text-[#555555] shrink-0" />
                    <span className="hidden sm:inline">My Maps</span>
                </button>

                <button
                    type="button"
                    onClick={onAddNode}
                    className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 transition border border-sky-200 cursor-pointer"
                    title="Add Node"
                >
                    <Plus size={14} className="text-sky-600 shrink-0" />
                    <span className="hidden sm:inline">Add Node</span>
                </button>

                <button
                    type="button"
                    onClick={onSaveCanvas}
                    disabled={isSaving}
                    className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-xs cursor-pointer disabled:opacity-50"
                    title={isSaving ? "Saving..." : "Save Canvas"}
                >
                    <CloudUpload size={14} className="shrink-0" />
                    <span className="hidden md:inline">{isSaving ? "Saving..." : "Save Canvas"}</span>
                </button>

                <button
                    type="button"
                    onClick={onDownloadPDF}
                    className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary/95 transition border border-gray-200 cursor-pointer"
                    title="Export PDF"
                >
                    <Download size={14} className="text-white shrink-0" />
                    <span className="hidden md:inline">Export PDF</span>
                </button>
            </div>
        </header>
    );
}
