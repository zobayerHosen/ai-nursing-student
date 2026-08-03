"use client";

import { Plus, FileDown, RotateCcw, CloudUpload, Link2 } from "lucide-react";

export default function ConceptMapHeader({
    onAddNode,
    onDownloadPDF,
    onResetLayout,
    onSaveCanvas,
    // onToggleConnect,
    // isConnectMode = false,
}) {
    return (
        <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between z-30 shrink-0 shadow-sm">
            {/* Left — brand + welcome */}
            <div></div>

            {/* Right — actions + avatar */}
            <div className="flex items-center gap-1.5 lg:gap-2 shrink-0">
                <button
                    type="button"
                    onClick={onAddNode}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 transition border border-sky-200 cursor-pointer"
                >
                    <Plus size={14} className="text-sky-600" />
                    <span className="hidden lg:inline">Add Node</span>
                </button>

                {/* Connect mode toggle */}
                {/* <button
                    type="button"
                    onClick={onToggleConnect}
                    className={`flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                        isConnectMode
                            ? "bg-sky-600 text-white border-sky-600 hover:bg-sky-700 shadow-sm"
                            : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200"
                    }`}
                    aria-pressed={isConnectMode}
                    title={isConnectMode ? "Exit connect mode" : "Connect two nodes"}
                >
                    <Link2 size={14} className={isConnectMode ? "" : "text-sky-600"} />
                    <span className="hidden lg:inline">
                        {isConnectMode ? "Connecting" : "Connect"}
                    </span>
                </button> */}

                <button
                    type="button"
                    onClick={onResetLayout}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                    <RotateCcw size={14} />
                    <span className="hidden lg:inline">Reset Layout</span>
                </button>

                <button
                    type="button"
                    onClick={onSaveCanvas}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm cursor-pointer"
                >
                    <CloudUpload size={14} />
                    <span className="hidden lg:inline">Save Canvas</span>
                </button>

                <button
                    type="button"
                    onClick={onDownloadPDF}
                    className="flex items-center gap-1.5 lg:gap-2 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition border border-indigo-200 cursor-pointer"
                >
                    <FileDown size={14} className="text-indigo-600" />
                    <span className="hidden lg:inline">Export PDF</span>
                </button>

            </div>
        </header>
    );
}
