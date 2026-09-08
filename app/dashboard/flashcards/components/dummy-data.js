import {
  Stethoscope,
  Heart,
  Pill,
  Wind,
  Brain,
  Baby,
  Activity,
  ShieldAlert,
  Droplets,
  BookOpen,
  Layers,
  Target,
  Crown,
} from "lucide-react";
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
// ─── ICON HELPER ────────────────────────────────────────────────────────
export const getCategoryIcon = (categoryName = "") => {
  const lower = categoryName.toLowerCase();
  if (lower.includes("cardio") || lower.includes("heart")) return Heart;
  if (lower.includes("pharm") || lower.includes("drug") || lower.includes("med")) return Pill;
  if (lower.includes("resp") || lower.includes("lung") || lower.includes("pulmon")) return Wind;
  if (lower.includes("matern") || lower.includes("pediatr") || lower.includes("baby")) return Baby;
  if (lower.includes("mental") || lower.includes("neuro") || lower.includes("psych")) return Brain;
  if (lower.includes("safety") || lower.includes("infection")) return ShieldAlert;
  if (lower.includes("fluid") || lower.includes("electrolyte")) return Droplets;
  if (lower.includes("critical") || lower.includes("icu")) return Activity;
  return Stethoscope;
};

// ─── 1. BROWSE ALL DECKS DUMMY DATA (SCREENSHOT 1) ──────────────────────
export const DEFAULT_CATEGORIES = [
  {
    id: "fundamentals-of-nursing",
    name: "Nursing Fundamentals",
    deckCount: 178,
    icon: Stethoscope,
    topics: [
      {
        id: "vital-signs",
        name: "Vital Signs & Assessment",
        questions: [
          { id: 1, front: "What is the normal adult body temperature range in Celsius?", back: "36.5°C to 37.5°C" },
          { id: 2, front: "Where is the apical pulse located?", back: "At the 5th intercostal space, left midclavicular line." },
          { id: 3, front: "Define Bradypnea.", back: "A respiratory rate less than 12 breaths per minute." },
          { id: 4, front: "What is normal adult blood pressure?", back: "Systolic < 120 mmHg and Diastolic < 80 mmHg." },
        ],
      },
      {
        id: "infection-control",
        name: "Infection Control & PPE",
        questions: [
          { id: 1, front: "What is the most effective way to prevent the spread of infection?", back: "Hand hygiene." },
          { id: 2, front: "Name the sequence for donning PPE.", back: "Gown, Mask/Respirator, Goggles/Face Shield, Gloves." },
          { id: 3, front: "Name the sequence for doffing PPE.", back: "Gloves, Goggles/Face Shield, Gown, Mask/Respirator." },
        ],
      },
      {
        id: "patient-safety",
        name: "Patient Safety & Restraints",
        questions: [
          { id: 1, front: "What does the acronym RACE stand for in fire safety?", back: "Rescue, Alarm, Confine, Extinguish." },
          { id: 2, front: "What does PASS stand for for fire extinguishers?", back: "Pull, Aim, Squeeze, Sweep." },
        ],
      },
      {
        id: "nursing-process",
        name: "Nursing Process (ADPIE)",
        questions: [
          { id: 1, front: "What is the first step of the nursing process?", back: "Assessment (collecting subjective and objective data)." },
          { id: 2, front: "What are SMART goals in nursing planning?", back: "Specific, Measurable, Achievable, Relevant, Time-bound." },
        ],
      },
      {
        id: "fluid-electrolytes",
        name: "Fluid & Electrolyte Balance",
        questions: [
          { id: 1, front: "Normal serum potassium range?", back: "3.5 to 5.0 mEq/L." },
          { id: 2, front: "Normal serum sodium range?", back: "135 to 145 mEq/L." },
          { id: 3, front: "Key sign of hypocalcemia?", back: "Positive Chvostek's or Trousseau's sign." },
        ],
      },
      {
        id: "medication-administration",
        name: "Medication Administration & Rights",
        questions: [
          { id: 1, front: "What are the 6 rights of medication administration?", back: "Right Patient, Right Drug, Right Dose, Right Route, Right Time, Right Documentation." },
          { id: 2, front: "Angle of injection for subcutaneous needle?", back: "45 or 90 degrees depending on adipose tissue." },
        ],
      },
    ],
  },
  {
    id: "cardiovascular",
    name: "Cardiovascular",
    deckCount: 142,
    icon: Heart,
    topics: [
      {
        id: "heart-failure",
        name: "Heart Failure & Diagnostics",
        questions: [
          { id: 1, front: "What is the primary diagnostic lab for heart failure?", back: "BNP (B-type Natriuretic Peptide) > 100 pg/mL." },
          { id: 2, front: "Symptoms of Left-sided Heart Failure?", back: "Crackles, dyspnea, orthopnea, cough (pulmonary symptoms)." },
          { id: 3, front: "Symptoms of Right-sided Heart Failure?", back: "JVD, peripheral edema, ascites, hepatomegaly (systemic)." },
        ],
      },
      {
        id: "ecg-dysrhythmias",
        name: "ECG Interpretation & Dysrhythmias",
        questions: [
          { id: 1, front: "Priority nursing action for Ventricular Fibrillation (V-Fib)?", back: "Defibrillate immediately and initiate CPR." },
          { id: 2, front: "First-line drug for symptomatic sinus bradycardia?", back: "Atropine IV." },
        ],
      },
      {
        id: "hypertension-angina",
        name: "Hypertension & Acute Coronary Syndrome",
        questions: [
          { id: 1, front: "MONA acronym for suspected Myocardial Infarction?", back: "Morphine, Oxygen, Nitroglycerin, Aspirin." },
        ],
      },
    ],
  },
  {
    id: "pharmacology",
    name: "Pharmacology",
    deckCount: 165,
    icon: Pill,
    topics: [
      {
        id: "cardiac-meds",
        name: "Cardiovascular Medications",
        questions: [
          { id: 1, front: "Therapeutic range for Digoxin?", back: "0.5 to 2.0 ng/mL." },
          { id: 2, front: "Early sign of digoxin toxicity?", back: "Anorexia, nausea, vomiting, yellow-green halos." },
        ],
      },
      {
        id: "antibiotics",
        name: "Antibiotics & Antimicrobials",
        questions: [
          { id: 1, front: "What is the red man syndrome associated with?", back: "Rapid infusion of Vancomycin." },
        ],
      },
      {
        id: "endocrine-meds",
        name: "Insulin & Endocrine Agents",
        questions: [
          { id: 1, front: "Onset of rapid-acting insulin (Lispro/Aspart)?", back: "10 to 15 minutes." },
        ],
      },
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory",
    deckCount: 98,
    icon: Wind,
    topics: [
      {
        id: "copd-asthma",
        name: "COPD & Asthma Management",
        questions: [
          { id: 1, front: "Priority rescue inhaler for acute bronchospasm?", back: "Albuterol (Short-acting Beta-2 Agonist)." },
        ],
      },
      {
        id: "abg-interpretation",
        name: "Arterial Blood Gas (ABG) Mastery",
        questions: [
          { id: 1, front: "Normal arterial blood pH range?", back: "7.35 to 7.45." },
          { id: 2, front: "Normal PaCO2 range?", back: "35 to 45 mmHg." },
          { id: 3, front: "Normal HCO3 range?", back: "22 to 26 mEq/L." },
        ],
      },
    ],
  },
  {
    id: "maternal-newborn",
    name: "Maternal Newborn",
    deckCount: 112,
    icon: Baby,
    topics: [
      {
        id: "labor-delivery",
        name: "Stages of Labor & Delivery",
        questions: [
          { id: 1, front: "What characterizes the transition phase of labor?", back: "Cervix dilated 8 to 10 cm, intense frequent contractions." },
        ],
      },
      {
        id: "postpartum-apgar",
        name: "Postpartum Care & APGAR Scoring",
        questions: [
          { id: 1, front: "What are the 5 components of the APGAR score?", back: "Appearance, Pulse, Grimace, Activity, Respiration." },
        ],
      },
    ],
  },
  {
    id: "mental-health",
    name: "Mental Health",
    deckCount: 84,
    icon: Brain,
    topics: [
      {
        id: "therapeutic-comm",
        name: "Therapeutic Communication",
        questions: [
          { id: 1, front: "Effective nursing response to hallucinations?", back: "Acknowledge feelings, do not reinforce hallucination, state reality." },
        ],
      },
    ],
  },
  {
    id: "safety-infection",
    name: "Safety & Infection Control",
    deckCount: 75,
    icon: ShieldAlert,
    topics: [
      {
        id: "isolation-precautions",
        name: "Airborne, Droplet & Contact Precautions",
        questions: [
          { id: 1, front: "Precaution required for active Pulmonary TB?", back: "Airborne precautions (N95 respirator, negative pressure room)." },
        ],
      },
    ],
  },
];

// ─── 2. FAVORITES DUMMY DATA (SCREENSHOT 2) ─────────────────────────────
export const INITIAL_FAVORITES = [
  {
    id: "fav-1",
    category: "CARDIOVASCULAR",
    title: "1. Fundamentals of Nursing",
    decksCount: "219 Decks",
    progress: 75,
    questions: [
      { id: 1, front: "What is the primary diagnostic marker for acute myocardial infarction?", back: "Cardiac Troponin I and Troponin T." },
      { id: 2, front: "Priority intervention for suspected MI?", back: "Administer MONA (Morphine, Oxygen, Nitroglycerin, Aspirin) and obtain 12-lead ECG." },
      { id: 3, front: "What does an elevated BNP (> 100 pg/mL) indicate?", back: "Heart failure severity and ventricular wall stretch." },
    ],
  },
  {
    id: "fav-2",
    category: "CARDIOVASCULAR",
    title: "1. Fundamentals of Nursing",
    decksCount: "219 Decks",
    progress: 60,
    questions: [
      { id: 1, front: "What is the normal adult heart rate?", back: "60 to 100 beats per minute." },
      { id: 2, front: "Where is the apical pulse auscultated?", back: "Left 5th intercostal space at the midclavicular line." },
    ],
  },
  {
    id: "fav-3",
    category: "CARDIOVASCULAR",
    title: "1. Fundamentals of Nursing",
    decksCount: "219 Decks",
    progress: 85,
    questions: [
      { id: 1, front: "What is orthostatic hypotension?", back: "Drop of >= 20 mmHg systolic or >= 10 mmHg diastolic upon standing." },
      { id: 2, front: "Patient teaching for Holter monitor?", back: "Keep a daily activity diary and do not get the monitor wet." },
    ],
  },
  {
    id: "fav-4",
    category: "CARDIOVASCULAR",
    title: "1. Fundamentals of Nursing",
    decksCount: "219 Decks",
    progress: 70,
    questions: [
      { id: 1, front: "First nursing step for acute chest pain?", back: "Cease all activity, sit patient upright, and administer supplemental oxygen if SaO2 < 90%." },
    ],
  },
  {
    id: "fav-5",
    category: "CARDIOVASCULAR",
    title: "1. Fundamentals of Nursing",
    decksCount: "219 Decks",
    progress: 90,
    questions: [
      { id: 1, front: "What is the therapeutic INR range for warfarin in atrial fibrillation?", back: "2.0 to 3.0." },
      { id: 2, front: "Antidote for Warfarin toxicity?", back: "Vitamin K (Phytonadione)." },
    ],
  },
  {
    id: "fav-6",
    category: "CARDIOVASCULAR",
    title: "1. Fundamentals of Nursing",
    decksCount: "219 Decks",
    progress: 65,
    questions: [
      { id: 1, front: "Signs of digoxin toxicity?", back: "Nausea, vomiting, visual halos (yellow/green), bradycardia." },
      { id: 2, front: "Hold digoxin if adult pulse is below?", back: "60 beats per minute." },
    ],
  },
];

export const LEARNING_READINESS_STATS = {
  readinessPct: 74,
  trend: "6% this Week",
  segments: [
    { label: "Easy", pct: 45, color: "#1B4B66", rate: "76%" },
    { label: "Hard", pct: 30, color: "#F43F5E", rate: "81%" },
    { label: "New", pct: 25, color: "#FDA4AF", rate: "86%" },
  ],
};

// ─── 3. PERFORMANCE DUMMY DATA (SCREENSHOT 3) ───────────────────────────
export const DEFAULT_MASTERY_STATS = {
  percent: 35,
  cardsStudied: 665,
  cardsStudiedTrend: "18% vs last 7 days",
  totalCards: "1,402",
  avgRecall: "78%",
  avgRecallTrend: "6% vs last 7 days",
  masteredCards: 312,
  masteredPercent: "22% of total",
  breakdown: [
    {
      label: "Easy",
      sub: "Got it right",
      count: 485,
      pct: 52,
      color: "#1B4B66",
    },
    {
      label: "Hard",
      sub: "Worth a re-attempt",
      count: 403,
      pct: 25,
      color: "#F43F5E",
    },
    {
      label: "Not Attempted",
      sub: "Still to attempt",
      count: 355,
      pct: 22,
      color: "#BAE6FD",
    },
  ],
};

export const TOPIC_MASTERY_LIST = [
  {
    id: "cardio-1",
    name: "Cardiovascular",
    icon: Heart,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 border-rose-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 68,
    progressColor: "bg-cyan-500",
    easyColor: "text-cyan-600",
  },
  {
    id: "pharm-1",
    name: "Pharmacology",
    icon: Pill,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 border-amber-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 65,
    progressColor: "bg-pink-500",
    easyColor: "text-pink-600",
  },
  {
    id: "resp-1",
    name: "Respiratory",
    icon: Wind,
    iconColor: "text-teal-500",
    iconBg: "bg-teal-50 border-teal-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 74,
    progressColor: "bg-teal-400",
    easyColor: "text-teal-600",
  },
  {
    id: "matern-1",
    name: "Maternal Newborn",
    icon: Baby,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50 border-purple-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 82,
    progressColor: "bg-purple-500",
    easyColor: "text-purple-600",
  },
  {
    id: "cardio-2",
    name: "Cardiovascular",
    icon: Heart,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 border-rose-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 60,
    progressColor: "bg-cyan-500",
    easyColor: "text-cyan-600",
  },
  {
    id: "pharm-2",
    name: "Pharmacology",
    icon: Pill,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50 border-amber-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 58,
    progressColor: "bg-pink-500",
    easyColor: "text-pink-600",
  },
  {
    id: "resp-2",
    name: "Respiratory",
    icon: Wind,
    iconColor: "text-teal-500",
    iconBg: "bg-teal-50 border-teal-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 70,
    progressColor: "bg-teal-400",
    easyColor: "text-teal-600",
  },
  {
    id: "matern-2",
    name: "Maternal Newborn",
    icon: Baby,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50 border-purple-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 80,
    progressColor: "bg-purple-500",
    easyColor: "text-purple-600",
  },
  {
    id: "cardio-3",
    name: "Cardiovascular",
    icon: Heart,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 border-rose-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 62,
    progressColor: "bg-cyan-500",
    easyColor: "text-cyan-600",
  },
  {
    id: "cardio-4",
    name: "Cardiovascular",
    icon: Heart,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 border-rose-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 75,
    progressColor: "bg-pink-500",
    easyColor: "text-pink-600",
  },
  {
    id: "cardio-5",
    name: "Cardiovascular",
    icon: Heart,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 border-rose-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 66,
    progressColor: "bg-teal-500",
    easyColor: "text-teal-600",
  },
  {
    id: "cardio-6",
    name: "Cardiovascular",
    icon: Heart,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 border-rose-100",
    dueCount: 8,
    cardsCount: 94,
    recallRate: "62%",
    easyCount: "72 easy",
    progressPct: 78,
    progressColor: "bg-purple-500",
    easyColor: "text-purple-600",
  },
];
