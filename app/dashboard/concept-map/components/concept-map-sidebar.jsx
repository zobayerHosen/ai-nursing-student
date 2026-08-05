"use client";

import { useState } from "react";
import {
    User,
    Stethoscope,
    FileText,
    ClipboardList,
    Activity,
    Pill,
    Paperclip,
    Send,
    X,
    Loader2,
} from "lucide-react";

/* Category requirements checklist */
const CHECKLIST = [
    {
        icon: User,
        title: "Patient Profile",
        desc: "age, gender, reason for admission / chief complaint",
    },
    {
        icon: Stethoscope,
        title: "Medical History",
        desc: "primary dx, comorbidities (e.g., DM + HTN + CKD), surgical hx",
    },
    {
        icon: FileText,
        title: "Subjective Data",
        desc: "symptoms reported by patient (pain, dyspnea, fatigue)",
    },
    {
        icon: ClipboardList,
        title: "Objective Data",
        desc: "vitals, auscultation, lab values, diagnostic findings",
    },
    {
        icon: Pill,
        title: "Medications",
        desc: "current meds, dosages, and indications",
    },
    {
        icon: Activity,
        title: "Nursing Interventions",
        desc: "oxygen therapy, positioning, fluid monitoring",
    },
];

const QUICK_START_EXAMPLE =
    '"72F admitted for CHF exacerbation. Hx: HTN, T2DM, CKD stage 3. c/o SOB and fatigue. BP 158/92, HR 104, SpO2 89% RA, crackles bilaterally, 2+ pitting edema. BNP 980, Cr 2.1. On Lasix 40mg IV, metoprolol, lisinopril, metformin. Currently on 2L O2 NC, daily weights, fluid restriction."';

const STATUS_STYLES = {
    info: "bg-blue-50 text-blue-700",
    success: "bg-emerald-50 text-emerald-700",
    error: "bg-rose-50 text-rose-700",
};

export default function ConceptMapSidebar({ onClose, onSendPrompt, isGenerating = false }) {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(null);

    const handleSend = async () => {
        const text = message.trim();
        if (!text) return;
        setStatus({ type: "info", text: "CARA AI is building your concept map..." });
        try {
            await onSendPrompt?.(text);
            setMessage("");
            setStatus({ type: "success", text: "Concept map generated successfully!" });
        } catch {
            setStatus({ type: "error", text: "Failed to generate. Please try again." });
        }
    };

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Mobile close row */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2 xl:hidden shrink-0">
                <span className="text-sm font-bold text-[#2C5F8D]">CARA Assistant</span>
                <button
                    type="button"
                    onClick={onClose}
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Scrollable content guide */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
                {/* Welcome banner */}
                <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                    <p className="font-medium text-slate-800 text-sm">
                        Hi, I&apos;m <strong className="text-sky-600">CARA</strong>. Tell me about
                        your patient and I&apos;ll build a comprehensive concept map.
                    </p>
                    <p>
                        I work with single illnesses or patients with multiple comorbidities — the
                        more detail you give me, the richer the map. Include whatever you have:
                    </p>

                    {/* Category requirements checklist */}
                    <div className="space-y-2.5 pt-1">
                        {CHECKLIST.map((item) => (
                            <div key={item.title} className="flex items-start gap-2.5">
                                <item.icon size={14} className="text-slate-400 mt-0.5 shrink-0" />
                                <div>
                                    <strong className="text-slate-800">{item.title}</strong> —{" "}
                                    {item.desc}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick start example box */}
                    <div className="mt-4 p-3 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                            Quick start example:
                        </span>
                        <p
                            className="text-xs italic text-slate-600 cursor-pointer hover:text-sky-700 transition break-words"
                            onClick={() => setMessage(QUICK_START_EXAMPLE)}
                        >
                            {QUICK_START_EXAMPLE}
                        </p>
                    </div>
                </div>

                {/* Status log */}
                {status && (
                    <div className={`flex items-center gap-2 p-3 rounded-lg text-xs ${STATUS_STYLES[status.type] || ""}`}>
                        {isGenerating && status.type === "info" && (
                            <Loader2 size={14} className="animate-spin shrink-0" />
                        )}
                        <span>{status.text}</span>
                    </div>
                )}
            </div>

            {/* Chat prompt input bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="relative flex items-center bg-slate-100 rounded-xl border border-primary/40 focus-within:border-primary/90 px-3 py-1.5 sm:py-2 shadow-inner transition outline-0"
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type patient clinical case..."
                        className="w-full bg-transparent text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none pr-12 sm:pr-16 pl-1 sm:pl-2 py-1"
                    />
                    {/* Action icons */}
                    <div className="absolute right-2 flex items-center gap-1.5">
                        <button
                            type="submit"
                            className="w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center transition shadow-xs disabled:opacity-50 cursor-pointer shrink-0"
                            disabled={!message.trim() || isGenerating}
                            title="Send"
                        >
                            <Send size={14} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
