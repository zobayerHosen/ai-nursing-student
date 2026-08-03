"use client";

import { useState } from "react";
import { ArrowRight, FolderPlus, Link2, PenSquare, Trash2, X } from "lucide-react";

const CATEGORIES = [
    { value: "Central", label: "Central (Navy)" },
    { value: "Risk Factor", label: "Risk Factor (Purple)" },
    { value: "Subjective Data", label: "Subjective Data (White/Gray)" },
    { value: "Objective Data", label: "Objective Data (White/Gray)" },
    { value: "Nursing Diagnosis", label: "Nursing Diagnosis (Pink)" },
    { value: "Intervention", label: "Intervention (Yellow/Orange)" },
    { value: "Medication", label: "Medication (Blue)" },
    { value: "Complication", label: "Complication (Red)" },
];

const LABEL_SUGGESTIONS = [
    "leads to",
    "managed by",
    "treated with",
    "evidenced by",
    "contributes to",
    "progresses to",
    "long-term risk",
];

const fieldCls =
    "w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-800";
const labelCls = "block text-xs font-semibold text-slate-700 mb-1";

/* ═══════════════════════════════════════════════════════
   ADD NODE MODAL
   ═══════════════════════════════════════════════════════ */
export function AddNodeModal({ open, nodes = [], onClose, onAdd }) {
    const [label, setLabel] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("Intervention");
    const [parentId, setParentId] = useState("");

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!label.trim() || !details.trim()) return;
        onAdd({ label: label.trim(), details: details.trim(), category, parentId });
    };

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                        <FolderPlus size={18} className="text-sky-600" />
                        Add New Node Manually
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className={labelCls}>Node Title / Label</label>
                        <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                            className={fieldCls}
                            placeholder="e.g. Check Blood Pressure q2h"
                        />
                    </div>
                    <div>
                        <label className={labelCls}>Details / Clinical Notes</label>
                        <textarea
                            rows={2}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            required
                            className={fieldCls}
                            placeholder="Monitor for hypotension and dizziness..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelCls}>Category (Color Theme)</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={`${fieldCls} cursor-pointer`}
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c.value} value={c.value}>
                                        {c.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={labelCls}>Connect To (Parent Node)</label>
                            <select
                                value={parentId}
                                onChange={(e) => setParentId(e.target.value)}
                                className={`${fieldCls} cursor-pointer`}
                            >
                                <option value="">None (Standalone)</option>
                                {nodes.map((n) => (
                                    <option key={n.id} value={n.id}>
                                        [{n.category}] {n.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3">
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
                            Add Node
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* ── Category style mapping (matches canvas) ── */
const CAT_STYLES = {
    Central:             { bg: "#1f3a5f", border: "#1f3a5f", ink: "#ffffff", eyebrow: "#b9c9de", head: "#ffffff", dot: "#1f3a5f" },
    "Subjective Data":   { bg: "#ffffff", border: "#d0d5dd", ink: "#1f2937", eyebrow: "#4b5563", head: "#1f2937", dot: "#d0d5dd" },
    "Objective Data":    { bg: "#ffffff", border: "#d0d5dd", ink: "#1f2937", eyebrow: "#4b5563", head: "#1f2937", dot: "#f9a8d4" },
    "Nursing Diagnosis": { bg: "#fde5ef", border: "#ec6ba0", ink: "#7a1450", eyebrow: "#db2777", head: "#db2777", dot: "#fde5ef" },
    Intervention:        { bg: "#fff2e0", border: "#f0a94e", ink: "#6b4200", eyebrow: "#c2760a", head: "#c2760a", dot: "#fff2e0" },
    "Expected Outcome":  { bg: "#e8faf0", border: "#6bc9a0", ink: "#14532d", eyebrow: "#15803d", head: "#15803d", dot: "#e8faf0" },
    "Risk Factor":       { bg: "#ede4fb", border: "#9b6fd6", ink: "#3d2466", eyebrow: "#7c3aed", head: "#7c3aed", dot: "#ede4fb" },
    Complication:        { bg: "#fde3e3", border: "#ea8888", ink: "#7a1414", eyebrow: "#c62828", head: "#c62828", dot: "#fde3e3" },
    Medication:          { bg: "#e3f2fb", border: "#6fb6de", ink: "#073d5c", eyebrow: "#0f6fa3", head: "#0f6fa3", dot: "#e3f2fb" },
};

const NODE_TYPE_CHIPS = [
    { value: "Central", label: "Central Concept" },
    { value: "Subjective Data", label: "Subjective Data" },
    { value: "Objective Data", label: "Objective Data" },
    { value: "Nursing Diagnosis", label: "Nursing Dx" },
    { value: "Intervention", label: "Intervention" },
    { value: "Expected Outcome", label: "Expected Outcome" },
    { value: "Risk Factor", label: "Risk Factor" },
    { value: "Complication", label: "Complication" },
    { value: "Medication", label: "Medication" },
];

const BG_PALETTE = [
    "#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a",
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
    "#fde5ef", "#fff2e0", "#e3f2fb", "#ede4fb", "#fde3e3", "#e8faf0", "#fef3c7", "#dbeafe", "#f0fdf4", "#fdf2f8", "#f5f3ff",
];

const FONT_PALETTE = [
    "#0f172a", "#1e293b", "#334155", "#475569", "#64748b", "#94a3b8",
    "#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0", "#fde5ef", "#fde3e3",
    "#7a1450", "#db2777", "#c62828", "#7a1414", "#c2760a", "#6b4200",
    "#0f6fa3", "#073d5c", "#7c3aed", "#3d2466", "#15803d", "#14532d",
];

const CARA_TIPS = {
    "Nursing Diagnosis": "For nursing diagnoses, use r/t (related to) for the etiology and AEB (as evidenced by) for the cues. Example: Impaired Gas Exchange r/t alveolar consolidation AEB SpO2 88%, dyspnea.",
    Central: "The central concept should capture the primary clinical picture — the main diagnosis or condition being mapped.",
    Intervention: "Interventions should be specific, measurable nursing actions. Include frequency when applicable (e.g., q4h, PRN).",
    Medication: "Include drug name, dose, route, and key nursing considerations such as hold parameters and monitoring.",
    Complication: "Complications should describe potential adverse outcomes. Link them back to the conditions that can cause them.",
    "Risk Factor": "Risk factors are patient vulnerabilities that contribute to the clinical picture. Include modifiable and non-modifiable factors.",
    "Subjective Data": "Subjective data comes from the patient's own words — symptoms, complaints, and self-reported history.",
    "Objective Data": "Objective data includes measurable findings: vital signs, lab values, physical assessment, and diagnostic results.",
    "Expected Outcome": "Write measurable, patient-centered outcomes. Example: Patient will maintain SpO2 ≥ 94% on room air within 48 hours.",
};

/* ═══════════════════════════════════════════════════════
   EDIT NODE MODAL (Premium UI)
   ═══════════════════════════════════════════════════════ */
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
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
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
                                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition cursor-pointer ${
                                            isActive
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
                                    className={`w-6 h-6 rounded-md border transition cursor-pointer flex items-center justify-center ${
                                        activeBg === color ? "ring-2 ring-sky-500 ring-offset-1 border-sky-400" : "border-slate-200 hover:border-slate-400"
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
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[11px] text-slate-500">Custom:</span>
                            <span
                                className="w-5 h-5 rounded border border-slate-300 shrink-0"
                                style={{ backgroundColor: activeBg }}
                            />
                            <input
                                type="text"
                                value={bgColor || activeBg}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="text-[11px] font-mono px-2 py-1 rounded border border-slate-200 w-24 focus:ring-1 focus:ring-sky-500 focus:outline-none"
                                placeholder="#ffffff"
                            />
                        </div>

                        {/* Font Color */}
                        <p className="text-[11px] font-semibold text-slate-700 mb-1.5">Font Color</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                            {FONT_PALETTE.map((color) => (
                                <button
                                    key={`font-${color}`}
                                    type="button"
                                    onClick={() => setFontColor(color)}
                                    className={`w-6 h-6 rounded-md border transition cursor-pointer flex items-center justify-center ${
                                        activeFont === color ? "ring-2 ring-sky-500 ring-offset-1 border-sky-400" : "border-slate-200 hover:border-slate-400"
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
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] text-slate-500">Custom:</span>
                            <span
                                className="w-5 h-5 rounded border border-slate-300 shrink-0"
                                style={{ backgroundColor: activeFont }}
                            />
                            <input
                                type="text"
                                value={fontColor || activeFont}
                                onChange={(e) => setFontColor(e.target.value)}
                                className="text-[11px] font-mono px-2 py-1 rounded border border-slate-200 w-24 focus:ring-1 focus:ring-sky-500 focus:outline-none"
                                placeholder="#000000"
                            />
                        </div>
                    </div>

                    {/* PREVIEW */}
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Preview</p>
                        <div
                            className="rounded-xl border p-3 w-full max-w-[200px]"
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

/* ── Light color detection for checkmark contrast ── */
function isLightColor(hex) {
    try {
        const c = hex.replace("#", "");
        const r = parseInt(c.substring(0, 2), 16);
        const g = parseInt(c.substring(2, 4), 16);
        const b = parseInt(c.substring(4, 6), 16);
        return (r * 299 + g * 587 + b * 114) / 1000 > 155;
    } catch {
        return true;
    }
}

/* ═══════════════════════════════════════════════════════
   EDGE LABEL MODAL
   ═══════════════════════════════════════════════════════ */
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
                                className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition cursor-pointer ${
                                    label === s
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
