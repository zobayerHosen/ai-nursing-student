"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Plus,
    Send,
    Paperclip,
    Mic,
    Lightbulb,
    User,
    Stethoscope,
    FileText,
    ClipboardList,
    Activity,
    Pill,
    AlertTriangle,
    CheckCircle,
    ChevronDown,
    X,
    GripVertical,
} from "lucide-react";

/* category config  */
const NODE_CATEGORIES = [
    { id: "Central",           label: "Central Concept",  color: "#1f3a5f", textColor: "#fff" },
    { id: "Subjective Data",   label: "Subjective Data",  color: "#D1D5DB", textColor: "#4b5563" },
    { id: "Objective Data",    label: "Objective Data",    color: "#FDE68A", textColor: "#92400E" },
    { id: "Nursing Diagnosis", label: "Nursing Dx",        color: "#FBCFE8", textColor: "#9D174D" },
    { id: "Intervention",      label: "Intervention",      color: "#FDE68A", textColor: "#92400E" },
    { id: "Expected Outcome",  label: "Expected Outcome",  color: "#A7F3D0", textColor: "#065F46" },
    { id: "Risk Factor",       label: "Risk Factor",       color: "#E9D5FF", textColor: "#6B21A8" },
    { id: "Complication",      label: "Complication",      color: "#FECACA", textColor: "#991B1B" },
    { id: "Medication",        label: "Medication",        color: "#BFDBFE", textColor: "#1E40AF" },
];

const MAP_STYLES = [
    "Hierarchical (Priorities)",
    "Radial (Central Focus)",
    "Free-form Canvas",
];

/*  quick-start examples */
const QUICK_START_EXAMPLE = `"72F admitted for CHF exacerbation. Hx: HTN, T2DM, CKD stage 3. C/o SOB and fatigue. BP 158/92, HR 104, SpO2 89% RA, crackles bilaterally, 2+ pitting edema. BNP 980, Cr 2.1. On Lasix 40mg IV, metoprolol, lisinopril, metformin. Currently on 2L O2 NC, daily weights, fluid restriction."`;

const SIDEBAR_TIPS = [
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
        desc: "what the patient tells you (pain 7/10, anxiety, SOB, nausea)",
    },
    {
        icon: ClipboardList,
        title: "Objective Data",
        desc: "vitals, lung sounds, skin integrity, bowel sounds, labs, diagnostics",
    },
    {
        icon: Pill,
        title: "Medications",
        desc: "current meds and indications (why they're on each)",
    },
    {
        icon: Activity,
        title: "Nursing Interventions",
        desc: "what's already being done (O2, wound care, fall precautions)",
    },
];

export default function ConceptMapSidebar({ onClose }) {
    const [activeTab, setActiveTab] = useState("ai");
    const [message, setMessage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [mapStyle, setMapStyle] = useState(MAP_STYLES[0]);

    const handleSend = () => {
        if (!message.trim()) return;
        // TODO: integrate AI
        setMessage("");
    };

    return (
        <>
            {/*  Tab bar */}
            <div className="relative flex border-b border-[#E5E7EB] shrink-0">
                {[
                    { key: "ai", label: "AI Guided", icon: Sparkles },
                    { key: "add", label: "Add Node", icon: Plus },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-4 text-xs font-semibold transition cursor-pointer ${
                            activeTab === tab.key
                                ? "text-[#2C5F8D]"
                                : "text-[#697586] hover:text-[#2C5F8D]"
                        }`}
                    >
                        <tab.icon size={14} />
                        {tab.label}
                        {activeTab === tab.key && (
                            <motion.div
                                layoutId="concept-tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 35,
                                }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="relative flex-1 overflow-x-hidden overflow-y-auto w-full flex flex-col">
                <AnimatePresence mode="wait">
                    {activeTab === "ai" ? (
                        <AIGuidedTab
                            key="ai"
                            message={message}
                            setMessage={setMessage}
                            onSend={handleSend}
                        />
                    ) : (
                        <AddNodeTab
                            key="add"
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            mapStyle={mapStyle}
                            setMapStyle={setMapStyle}
                        />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}

/* ═══════════════════════════════════════════════════════
   AI GUIDED TAB
   ═══════════════════════════════════════════════════════ */
function AIGuidedTab({ message, setMessage, onSend }) {
    return (
        <motion.div
            key="ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col h-full"
        >
            {/* Scrollable chat area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">
                {/* CARA greeting */}
                <div className="flex gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#E85D75] to-[#C44A60] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        C
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-[#1D2939] leading-relaxed mb-4">
                            Hi — I&apos;m CARA. Tell me about your patient and
                            I&apos;ll build a comprehensive concept map.
                        </p>
                        <p className="text-sm text-[#475569] leading-relaxed mb-4">
                            I work with single illnesses or patients with
                            multiple comorbidities — the more detail you give
                            me, the richer the map. Include whatever you have
                            from the following:
                        </p>

                        {/* Tip items */}
                        <div className="flex flex-col gap-3 mb-5">
                            {SIDEBAR_TIPS.map((tip) => (
                                <div
                                    key={tip.title}
                                    className="flex items-start gap-2.5"
                                >
                                    <tip.icon
                                        size={14}
                                        className="text-[#2C5F8D] mt-0.5 shrink-0"
                                    />
                                    <p className="text-xs text-[#475569] leading-relaxed">
                                        <span className="font-bold text-[#1D2939]">
                                            {tip.title}
                                        </span>{" "}
                                        — {tip.desc}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Quick start */}
                        <h4 className="text-sm font-bold text-[#1D2939] mb-2">
                            Quick start examples:
                        </h4>
                        <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg p-3 mb-4">
                            <p className="text-xs text-[#475569] leading-relaxed italic">
                                {QUICK_START_EXAMPLE}
                            </p>
                        </div>

                        {/* Tip box */}
                        <div className="flex items-start gap-2.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-3">
                            <Lightbulb
                                size={14}
                                className="text-[#D97706] mt-0.5 shrink-0"
                            />
                            <p className="text-xs text-[#92400E] leading-relaxed">
                                You can also attach an H&P, lab report, or care
                                plan with the button, or dictate using the CARA
                                reads PDFs and images too.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*  Input bar (sticky bottom)  */}
            <div className="shrink-0 border-t border-[#E5E7EB] p-3 bg-white">
                <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && !e.shiftKey && onSend()
                            }
                            placeholder="Type your answer..."
                            className="w-full border border-[#D0D5DD] rounded-xl px-4 py-3 pr-24 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD]"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <button
                                type="button"
                                className="p-1.5 text-[#94A3B8] hover:text-[#2C5F8D] transition-colors cursor-pointer"
                                title="Attach file"
                            >
                                <Paperclip size={16} />
                            </button>
                            <button
                                type="button"
                                className="p-1.5 text-[#94A3B8] hover:text-[#2C5F8D] transition-colors cursor-pointer"
                                title="Voice input"
                            >
                                <Mic size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={onSend}
                                disabled={!message.trim()}
                                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                    message.trim()
                                        ? "bg-[#2C5F8D] text-white hover:bg-[#1E4366]"
                                        : "bg-[#E2E8F0] text-[#94A3B8]"
                                }`}
                                title="Send"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════
   ADD NODE TAB
   ═══════════════════════════════════════════════════════ */
   
function AddNodeTab({
    selectedCategory,
    setSelectedCategory,
    mapStyle,
    setMapStyle,
}) {
    return (
        <motion.div
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex-1 overflow-y-auto p-5 flex flex-col gap-5"
        >
            {/* Section heading */}
            <p className="text-[10px] font-bold text-[#667085] uppercase tracking-widest">
                Drag or click to add
            </p>

            {/* Node category list */}
            <div className="flex flex-col gap-2">
                {NODE_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all cursor-pointer text-left ${
                            selectedCategory === cat.id
                                ? "border-[#2C5F8D] bg-[#F0F7FC] shadow-sm"
                                : "border-transparent hover:border-[#E5E7EB] hover:bg-[#F8F9FA]"
                        }`}
                    >
                        <span
                            className="w-4 h-4 rounded shrink-0"
                            style={{ backgroundColor: cat.color }}
                        />
                        <span
                            className={`text-sm font-medium flex-1 ${
                                selectedCategory === cat.id
                                    ? "text-[#2C5F8D]"
                                    : "text-[#1D2939]"
                            }`}
                        >
                            {cat.label}
                        </span>
                        <GripVertical
                            size={14}
                            className="text-[#D0D5DD] opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </button>
                ))}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E7EB]" />

            {/* Map style selector */}
            <div>
                <p className="text-[10px] font-bold text-[#667085] uppercase tracking-widest mb-3">
                    Map Style
                </p>
                <div className="relative">
                    <select
                        value={mapStyle}
                        onChange={(e) => setMapStyle(e.target.value)}
                        className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm appearance-none bg-[#FCFDFD] focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] cursor-pointer"
                    >
                        {MAP_STYLES.map((style) => (
                            <option key={style} value={style}>
                                {style}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none"
                    />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E5E7EB]" />

            {/* Legend */}
            <div>
                <p className="text-[10px] font-bold text-[#667085] uppercase tracking-widest mb-3">
                    Legend
                </p>
                <div className="grid grid-cols-2 gap-2">
                    {NODE_CATEGORIES.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="w-3 h-3 rounded-sm shrink-0"
                                style={{ backgroundColor: cat.color }}
                            />
                            <span className="text-xs text-[#475569]">
                                {cat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
