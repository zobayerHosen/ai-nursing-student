export const CATEGORIES = [
    { value: "Central", label: "Central (Navy)" },
    { value: "Risk Factor", label: "Risk Factor (Purple)" },
    { value: "Subjective Data", label: "Subjective Data (White/Gray)" },
    { value: "Objective Data", label: "Objective Data (White/Gray)" },
    { value: "Nursing Diagnosis", label: "Nursing Diagnosis (Pink)" },
    { value: "Intervention", label: "Intervention (Yellow/Orange)" },
    { value: "Medication", label: "Medication (Blue)" },
    { value: "Complication", label: "Complication (Red)" },
];

export const LABEL_SUGGESTIONS = [
    "leads to",
    "managed by",
    "treated with",
    "evidenced by",
    "contributes to",
    "progresses to",
    "long-term risk",
];

export const fieldCls = "w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white text-slate-800";
export const labelCls = "block text-xs font-semibold text-slate-700 mb-1";

export const CAT_STYLES = {
    Central: { bg: "#1f3a5f", border: "#1f3a5f", ink: "#ffffff", eyebrow: "#b9c9de", head: "#ffffff", dot: "#1f3a5f" },
    "Subjective Data": { bg: "#ffffff", border: "#d0d5dd", ink: "#1f2937", eyebrow: "#4b5563", head: "#1f2937", dot: "#d0d5dd" },
    "Objective Data": { bg: "#ffffff", border: "#d0d5dd", ink: "#1f2937", eyebrow: "#4b5563", head: "#1f2937", dot: "#f9a8d4" },
    "Nursing Diagnosis": { bg: "#fde5ef", border: "#ec6ba0", ink: "#7a1450", eyebrow: "#db2777", head: "#db2777", dot: "#fde5ef" },
    Intervention: { bg: "#fff2e0", border: "#f0a94e", ink: "#6b4200", eyebrow: "#c2760a", head: "#c2760a", dot: "#fff2e0" },
    "Expected Outcome": { bg: "#e8faf0", border: "#6bc9a0", ink: "#14532d", eyebrow: "#15803d", head: "#15803d", dot: "#e8faf0" },
    "Risk Factor": { bg: "#ede4fb", border: "#9b6fd6", ink: "#3d2466", eyebrow: "#7c3aed", head: "#7c3aed", dot: "#ede4fb" },
    Complication: { bg: "#fde3e3", border: "#ea8888", ink: "#7a1414", eyebrow: "#c62828", head: "#c62828", dot: "#fde3e3" },
    Medication: { bg: "#e3f2fb", border: "#6fb6de", ink: "#073d5c", eyebrow: "#0f6fa3", head: "#0f6fa3", dot: "#e3f2fb" },
};

export const NODE_TYPE_CHIPS = [
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

// Only node-type related background fills are kept; all other colors are commented out.
export const BG_PALETTE = [
    "#ffffff",
    // "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a",
    // "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
    "#fde5ef", "#fff2e0", "#e3f2fb", "#ede4fb", "#fde3e3", "#e8faf0",
    // "#fef3c7", "#dbeafe", "#f0fdf4", "#fdf2f8", "#f5f3ff",
];

// Only node-type related font colors are kept; all other colors are commented out.
export const FONT_PALETTE = [
    // "#0f172a", "#1e293b", "#334155", "#475569", "#64748b", "#94a3b8",
    "#ffffff",
    // "#f8fafc", "#f1f5f9", "#e2e8f0", "#fde5ef", "#fde3e3",
    "#7a1450",
    // "#db2777", "#c62828",
    "#7a1414",
    // "#c2760a",
    "#6b4200",
    // "#0f6fa3",
    "#073d5c",
    // "#7c3aed",
    "#3d2466",
    // "#15803d",
    "#14532d",
];

export const CARA_TIPS = {
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

export function isLightColor(hex) {
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
