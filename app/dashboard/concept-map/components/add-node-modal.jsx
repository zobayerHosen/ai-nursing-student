"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, X } from "lucide-react";
import { fieldCls, labelCls, NODE_TYPE_CHIPS, CAT_STYLES } from "./concept-map-constants";

export function AddNodeModal({ open, nodes = [], onClose, onAdd }) {
    const [label, setLabel] = useState("");
    const [details, setDetails] = useState("");
    const [category, setCategory] = useState("Intervention");
    const [parentId, setParentId] = useState("");

    useEffect(() => {
        if (open) {
            setLabel("");
            setDetails("");
            setCategory("Intervention");
            setParentId("");
        }
    }, [open]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!label.trim() || !details.trim()) return;
        onAdd({ label: label.trim(), details: details.trim(), category, parentId });
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-200 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-100 space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <Workflow />
                                Add New Node
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
                            <div className="flex flex-row gap-4">
                                <div className="flex-1 min-w-0">
                                    <label className={labelCls}>Category (Color Theme)</label>
                                    <div className="max-h-56 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                                        {NODE_TYPE_CHIPS.map((chip) => {
                                            const isActive = category === chip.value;
                                            const chipStyle = CAT_STYLES[chip.value] || CAT_STYLES["Intervention"];
                                            return (
                                                <button
                                                    key={chip.value}
                                                    type="button"
                                                    onClick={() => setCategory(chip.value)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border transition text-left cursor-pointer ${
                                                        isActive
                                                            ? "border-sky-400 bg-sky-50 text-sky-700 ring-1 ring-sky-400/30 font-semibold"
                                                            : "bg-white border-slate-200 hover:border-slate-300 text-[#2C5F8D] font-medium"
                                                    }`}
                                                >
                                                    <span
                                                        className="w-3.5 h-3.5 rounded shrink-0 border"
                                                        style={{ backgroundColor: chipStyle.dot, borderColor: chipStyle.border }}
                                                    />
                                                    <span className="text-[13px] truncate">{chip.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <label className={labelCls}>Connect To (Parent Node)</label>
                                    <div className="max-h-56 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
                                        <button
                                            type="button"
                                            onClick={() => setParentId("")}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border transition text-left cursor-pointer ${
                                                parentId === ""
                                                    ? "border-sky-400 bg-sky-50 text-sky-700 ring-1 ring-sky-400/30 font-semibold"
                                                    : "bg-white border-slate-200 hover:border-slate-300 text-slate-500 font-medium"
                                            }`}
                                        >
                                            <span className="w-3.5 h-3.5 rounded shrink-0 bg-slate-100 border border-slate-200" />
                                            <span className="text-[13px] truncate">None (Standalone)</span>
                                        </button>
                                        {nodes.map((n) => {
                                            const isActive = parentId === n.id;
                                            const nodeStyle = CAT_STYLES[n.category] || CAT_STYLES["Intervention"];
                                            return (
                                                <button
                                                    key={n.id}
                                                    type="button"
                                                    onClick={() => setParentId(n.id)}
                                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border transition text-left cursor-pointer ${
                                                        isActive
                                                            ? "border-sky-400 bg-sky-50 text-sky-700 ring-1 ring-sky-400/30 font-semibold"
                                                            : "bg-white border-slate-200 hover:border-slate-300 text-[#2C5F8D] font-medium"
                                                    }`}
                                                >
                                                    <span
                                                        className="w-3.5 h-3.5 rounded shrink-0 border"
                                                        style={{ backgroundColor: nodeStyle.dot, borderColor: nodeStyle.border }}
                                                    />
                                                    <span className="text-[13px] truncate">[{n.category}] {n.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-xs font-semibold bg-primary text-white hover:bg-sky-700 rounded-lg shadow-sm cursor-pointer"
                                >
                                    Add Node
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
