"use client";

import { useState } from "react";
import { ArrowRight, Link2, X } from "lucide-react";
import { fieldCls, labelCls, LABEL_SUGGESTIONS } from "./concept-map-constants";

export function EdgeLabelModal({ edge, defaultLabel = "leads to", onClose, onConfirm }) {
    const [label, setLabel] = useState(defaultLabel);

    if (!edge) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(label.trim() || "leads to");
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                        <Link2 size={18} className="text-sky-600" />
                        New Connection
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Source → target preview */}
                <div className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5">
                    <span className="font-semibold text-slate-800 truncate">{edge.sourceLabel}</span>
                    <ArrowRight size={14} className="text-sky-500 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{edge.targetLabel}</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className={labelCls}>Relationship Label</label>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            autoFocus
                            className={fieldCls}
                            placeholder="e.g. leads to, managed by"
                        />
                    </div>

                    {/* Quick suggestions */}
                    <div className="flex flex-wrap gap-1.5">
                        {LABEL_SUGGESTIONS.map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setLabel(s)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition cursor-pointer ${label === s
                                        ? "bg-sky-50 border-sky-300 text-sky-700"
                                        : "bg-white border-slate-200 text-slate-500 hover:border-sky-200 hover:text-sky-600"
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 rounded-lg shadow-sm cursor-pointer"
                        >
                            Add Connection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
