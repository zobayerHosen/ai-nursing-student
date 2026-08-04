"use client";

import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { fieldCls, CAT_STYLES, NODE_TYPE_CHIPS, BG_PALETTE, FONT_PALETTE, CARA_TIPS, isLightColor } from "./concept-map-constants";

export function EditNodeModal({ node, onClose, onSave, onDelete }) {
    const [label, setLabel] = useState(node?.label || "");
    const [details, setDetails] = useState(node?.details || "");
    const [category, setCategory] = useState(node?.category || "Intervention");
    const [bgColor, setBgColor] = useState("");
    const [fontColor, setFontColor] = useState("");

    if (!node) return null;

    const catStyle = CAT_STYLES[category] || CAT_STYLES["Intervention"];
    const activeBg = bgColor || catStyle.bg;
    const activeFont = fontColor || catStyle.ink;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!label.trim() || !details.trim()) return;
        onSave({
            id: node.id,
            label: label.trim(),
            details: details.trim(),
            category,
            ...(bgColor && { bgColor }),
            ...(fontColor && { fontColor }),
        });
    };

    const resetColors = () => {
        setBgColor("");
        setFontColor("");
    };

    const tip = CARA_TIPS[category] || CARA_TIPS["Nursing Diagnosis"];

    return (
        <div className="fixed inset-0 z-200 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl border border-slate-100 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-3 shrink-0">
                    <div>
                        <h3 className="font-bold text-base text-slate-900">Edit Node</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">Update title, details, and category</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 pb-2 space-y-5 min-h-0">
                    {/* NODE TYPE chips */}
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Node Type</p>
                        <div className="flex flex-wrap gap-1.5">
                            {NODE_TYPE_CHIPS.map((chip) => {
                                const isActive = category === chip.value;
                                const chipStyle = CAT_STYLES[chip.value] || catStyle;
                                return (
                                    <button
                                        key={chip.value}
                                        type="button"
                                        onClick={() => { setCategory(chip.value); setBgColor(""); setFontColor(""); }}
                                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition cursor-pointer ${isActive
                                                ? "bg-sky-50 border-sky-400 text-sky-700 ring-1 ring-sky-400/30"
                                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                            }`}
                                    >
                                        <span
                                            className="w-2.5 h-2.5 rounded-sm shrink-0 border"
                                            style={{ backgroundColor: chipStyle.dot, borderColor: chipStyle.border }}
                                        />
                                        {chip.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* TITLE */}
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Title</p>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                            className={fieldCls}
                            placeholder="Node title..."
                        />
                    </div>

                    {/* DETAILS */}
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Details (Body)</p>
                        <textarea
                            rows={3}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                            className={fieldCls}
                            placeholder="• vital / lab / exam"
                        />
                        <p className="text-[10px] text-slate-400 mt-1 italic">
                            Use new lines for bullets. Enter to save, Shift+Enter for new line.
                        </p>
                    </div>

                    {/* COLORS */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Colors</p>
                            <button
                                type="button"
                                onClick={resetColors}
                                className="text-[10px] text-sky-600 hover:text-sky-700 font-medium cursor-pointer"
                            >
                                Reset to type default
                            </button>
                        </div>

                        {/* Background (Fill) */}
                        <p className="text-[11px] font-semibold text-slate-700 mb-1.5">Background (Fill)</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                            {BG_PALETTE.map((color) => (
                                <button
                                    key={`bg-${color}`}
                                    type="button"
                                    onClick={() => setBgColor(color)}
                                    className={`w-6 h-6 rounded-md border transition cursor-pointer flex items-center justify-center ${activeBg === color ? "ring-2 ring-sky-500 ring-offset-1 border-sky-400" : "border-slate-200 hover:border-slate-400"
                                        }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                >
                                    {activeBg === color && (
                                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6l3 3 5-5" stroke={isLightColor(color) ? "#334155" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Font Color */}
                        <p className="text-[11px] font-semibold text-slate-700 mb-1.5">Font Color</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                            {FONT_PALETTE.map((color) => (
                                <button
                                    key={`font-${color}`}
                                    type="button"
                                    onClick={() => setFontColor(color)}
                                    className={`w-6 h-6 rounded-md border transition cursor-pointer flex items-center justify-center ${activeFont === color ? "ring-2 ring-sky-500 ring-offset-1 border-sky-400" : "border-slate-200 hover:border-slate-400"
                                        }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                >
                                    {activeFont === color && (
                                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6l3 3 5-5" stroke={isLightColor(color) ? "#334155" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* PREVIEW */}
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Preview</p>
                        <div
                            className="rounded-xl border p-3 w-full max-w-50"
                            style={{
                                backgroundColor: activeBg,
                                borderColor: catStyle.border,
                                color: activeFont,
                            }}
                        >
                            <div className="text-[9px] font-bold uppercase tracking-wider opacity-80 mb-0.5" style={{ color: catStyle.eyebrow }}>
                                {category}
                            </div>
                            <div className="text-[12px] font-bold mb-1" style={{ color: catStyle.head }}>
                                {label || "(no label)"}
                            </div>
                            <div className="text-[11px] leading-snug whitespace-pre-line opacity-90">
                                {details || ""}
                            </div>
                        </div>
                    </div>

                    {/* CARA Tip */}
                    <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-3">
                        <p className="text-[11px] text-sky-800 leading-relaxed">
                            <span className="font-bold">✨ CARA Tip:</span>{" "}
                            <span className="italic">{tip}</span>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 shrink-0">
                    <button
                        type="button"
                        onClick={() => onDelete(node.id)}
                        className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    >
                        <Trash2 size={13} />
                        Delete
                    </button>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer border border-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-4 py-2 text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 rounded-lg shadow-sm cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
