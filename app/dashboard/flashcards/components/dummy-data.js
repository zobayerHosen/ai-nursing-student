// ─── FLASHCARD BRAND ICON ───────────────────────────────────────────────
export const FLASHCARD_ICON = (
  <svg
    className="w-7 h-7 sm:w-8 sm:h-8 text-[#1B4B66] shrink-0"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background card angled */}
    <rect
      x="3.5"
      y="8"
      width="18"
      height="21"
      rx="3"
      transform="rotate(-10 3.5 8)"
      fill="#1B4B66"
      fillOpacity="0.35"
    />
    {/* Middle card angled */}
    <rect
      x="7"
      y="5"
      width="18"
      height="21"
      rx="3"
      transform="rotate(-5 7 5)"
      fill="#1B4B66"
      fillOpacity="0.7"
    />
    {/* Front card straight */}
    <rect
      x="10"
      y="4"
      width="18"
      height="21"
      rx="3"
      fill="#1B4B66"
    />
    {/* Front card decorative lines */}
    <line x1="14" y1="9" x2="24" y2="9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="14" y1="13" x2="22" y2="13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="14" y1="17" x2="19" y2="17" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// ─── 16 CATEGORY BACKGROUND COLORS FROM DESIGN ───────────────────────────
export const CATEGORY_COLORS = [
  {
    name: "Nursing Fundamentals",
    pillBg: "#E5F0FC",
    iconBg: "#82BBE4",
    accentColor: "#3B82F6",
  },
  {
    name: "Health Assessment",
    pillBg: "#EAF5EE",
    iconBg: "#79C198",
    accentColor: "#10B981",
  },
  {
    name: "Pharmacology",
    pillBg: "#F0EBFA",
    iconBg: "#A78CFA",
    accentColor: "#8B5CF6",
  },
  {
    name: "Dosage Calculations",
    pillBg: "#FEF6DA",
    iconBg: "#F6CE6A",
    accentColor: "#F59E0B",
  },
  {
    name: "Medical Surgical Nursing",
    pillBg: "#FCE8EA",
    iconBg: "#F17585",
    accentColor: "#F43F5E",
  },
  {
    name: "ECG Interpretation",
    pillBg: "#FEEDDE",
    iconBg: "#FCA065",
    accentColor: "#F97316",
  },
  {
    name: "Fluids, Electrolytes",
    pillBg: "#E2F7FB",
    iconBg: "#56CCE3",
    accentColor: "#06B6D4",
  },
  {
    name: "Maternal & Newborn",
    pillBg: "#FDE9F1",
    iconBg: "#F469A0",
    accentColor: "#EC4899",
  },
  {
    name: "Pediatric Nursing",
    pillBg: "#FEF8E3",
    iconBg: "#F9CE5F",
    accentColor: "#EAB308",
  },
  {
    name: "Mental Health Nursing",
    pillBg: "#ECEEFE",
    iconBg: "#7F8AF8",
    accentColor: "#6366F1",
  },
  {
    name: "Critical Care",
    pillBg: "#E2F8F1",
    iconBg: "#50D2AC",
    accentColor: "#14B8A6",
  },
  {
    name: "Clinical Skills",
    pillBg: "#FCE8EB",
    iconBg: "#F46F80",
    accentColor: "#F43F5E",
  },
  {
    name: "Laboratory Values",
    pillBg: "#FDECE6",
    iconBg: "#FA8865",
    accentColor: "#EA580C",
  },
  {
    name: "Geriatric Nursing",
    pillBg: "#F8EDE4",
    iconBg: "#DD9568",
    accentColor: "#D97706",
  },
  {
    name: "Community Health",
    pillBg: "#F1F7E4",
    iconBg: "#9EC760",
    accentColor: "#84CC16",
  },
  {
    name: "Nutrition",
    pillBg: "#FDEBEF",
    iconBg: "#F67488",
    accentColor: "#F43F5E",
  },
];

// Helper to retrieve the background color theme for a category by name or index
export const getCategoryColor = (categoryName = "", fallbackIndex = 0) => {
  const lower = (categoryName || "").toLowerCase().trim();

  // Exact match
  const exact = CATEGORY_COLORS.find(
    (c) => c.name.toLowerCase() === lower
  );
  if (exact) return exact;

  // Normalized alphanumeric match
  const cNorm = lower.replace(/[^a-z0-9]/g, "");
  const partial = CATEGORY_COLORS.find((c) => {
    const tNorm = c.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cNorm.includes(tNorm) || tNorm.includes(cNorm);
  });
  if (partial) return partial;

  // Keyword matches
  if (lower.includes("cardio") || lower.includes("heart")) return CATEGORY_COLORS[4];
  if (lower.includes("pharm") || lower.includes("drug")) return CATEGORY_COLORS[2];
  if (lower.includes("ecg") || lower.includes("ekg")) return CATEGORY_COLORS[5];
  if (lower.includes("fluid") || lower.includes("electrolyte")) return CATEGORY_COLORS[6];
  if (lower.includes("pediatr") || lower.includes("child")) return CATEGORY_COLORS[8];
  if (lower.includes("matern") || lower.includes("ob") || lower.includes("birth")) return CATEGORY_COLORS[7];
  if (lower.includes("mental") || lower.includes("psych")) return CATEGORY_COLORS[9];
  if (lower.includes("critical") || lower.includes("icu")) return CATEGORY_COLORS[10];
  if (lower.includes("skill")) return CATEGORY_COLORS[11];
  if (lower.includes("lab") || lower.includes("value")) return CATEGORY_COLORS[12];
  if (lower.includes("geri") || lower.includes("elder")) return CATEGORY_COLORS[13];
  if (lower.includes("commun")) return CATEGORY_COLORS[14];
  if (lower.includes("nutri") || lower.includes("diet")) return CATEGORY_COLORS[15];
  if (lower.includes("dose") || lower.includes("calc")) return CATEGORY_COLORS[3];
  if (lower.includes("assess") || lower.includes("exam")) return CATEGORY_COLORS[1];

  // Fallback by index cycle
  return CATEGORY_COLORS[fallbackIndex % CATEGORY_COLORS.length];
};

// ─── FAVORITES STATS ───────────────────────────────────────────────────
export const LEARNING_READINESS_STATS = {
  readinessPct: 74,
  trend: "6% this Week",
  segments: [
    { label: "Easy", pct: 45, color: "#1B4B66", rate: "76%" },
    { label: "Hard", pct: 30, color: "#F43F5E", rate: "81%" },
    { label: "New", pct: 25, color: "#FDA4AF", rate: "86%" },
  ],
};
