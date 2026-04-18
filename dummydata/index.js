import {
  BsGrid,
  BsBook,
  BsClipboard,
  BsHeartPulse,
  BsCalculator,
  BsClipboardData,
  BsActivity,
  BsTools,
  BsFileEarmarkText,
  BsPerson,
  BsMic,
  BsCardChecklist,
  BsJournalText,
  BsPatchCheck,
  BsCapsule,
  BsPencil,
  BsBarChart,
  BsDiagram3,
  BsCreditCard,
  BsQuestionCircle,
  BsFileText,
  BsShieldCheck,
  BsLungs,
  BsPlayCircle,
  BsClipboardCheck,
} from "react-icons/bs";

// Note: sidebar data
export const sidebarData = [
  {
    title: "Main Menu",
    items: [
      { name: "Dashboard", icon: BsGrid, href: "/dashboard" },
      { name: "My Library", icon: BsBook, href: "/dashboard/library" },
    ],
  },
  {
    title: "MASTER NCLEX",
    items: [
      { name: "NCLEX Exam", icon: BsClipboard, href: "/dashboard/nclex-exam" },
      {
        name: "Flashcards",
        icon: BsCardChecklist,
        href: "/dashboard/flashcards",
      },
    ],
  },
  {
    title: "CORE LEARNING",
    items: [
      {
        name: "Study Notes",
        icon: BsFileEarmarkText,
        href: "/dashboard/study-notes",
      },
      { name: "Body Systems", icon: BsPerson, href: "/dashboard/body-systems" },
      { name: "Dosage Calculation", icon: BsCalculator, href: "/dashboard/dosage-calculation" },
      { name: "Diagnostic Tests & Labs", icon: BsClipboardData, href: "/dashboard/diagnostic-test-labs" },
      { name: "ECG Mastery", icon: BsActivity, href: "/dashboard/ecg-mastery" },
      { name: "Practical Skills", icon: BsTools, href: "/dashboard/practical-skills" },
      { name: "Nursing Assessments", icon: BsHeartPulse, href: "/dashboard/nursing-assessments" },
      { name: "Cheat Sheets", icon: BsJournalText, href: "/dashboard/cheat-sheets" },
    ],
  },
  {
    title: "INTERACTIVE TOOLS",
    items: [
      { name: "My Tutor", icon: BsPerson, href: "/dashboard/my-tutor" },
      { name: "Lecture Notes", icon: BsMic, href: "/dashboard/lecture-notes" },
      { name: "Notes to Flashcard", icon: BsCardChecklist, href: "#" },
      { name: "Notes to Quiz", icon: BsClipboard, href: "#" },
      { name: "Research Paper", icon: BsJournalText, href: "#" },
      { name: "Assignment Checker", icon: BsPatchCheck, href: "#" },
      { name: "Care Plan Builder", icon: BsClipboardData, href: "#" },
      { name: "Drug Cards", icon: BsCapsule, href: "#" },
      { name: "Charting Coach", icon: BsPencil, href: "#" },
      { name: "Labs Interpretation", icon: BsBarChart, href: "#" },
      { name: "Dosage Calc", icon: BsCalculator, href: "#" },
      { name: "Concept Map", icon: BsDiagram3, href: "#" },
    ],
  },
  {
    title: "SUPPORT & LEGALS",
    items: [
      { name: "Subscription Billing", icon: BsCreditCard, href: "#" },
      { name: "FAQ.s", icon: BsQuestionCircle, href: "#" },
      { name: "Terms & Conditions", icon: BsFileText, href: "#" },
      { name: "Privacy policy", icon: BsShieldCheck, href: "#" },
    ],
  },
];

// Note: quick actions data
export const quickActions = [
  {
    title: "Start Tutor Session",
    desc: "Tutor session with CARA",
    icon: BsPlayCircle,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Notes to Quiz",
    desc: "Convert notes into practice questions",
    icon: BsClipboardCheck,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Practice Exams",
    desc: "Practice over 5000 NCLEX questions",
    icon: BsFileEarmarkText,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Record a Lecture",
    desc: "Transform lectures to notes",
    icon: BsMic,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    title: "Notes to Flashcards",
    desc: "Paste notes, get flashcards instantly",
    icon: BsCardChecklist,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Study Flashcards",
    desc: "Study over 4000 flashcards",
    icon: BsBook,
    bg: "bg-red-100",
    color: "text-red-500",
  },
];

// Note: core learning data
export const coreLearning = [
  {
    title: "Study Notes",
    count: "316 Topics",
    icon: BsFileEarmarkText,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Body Systems",
    count: "12 Systems",
    icon: BsPerson,
    bg: "bg-pink-100",
    color: "text-pink-600",
  },
  {
    title: "Dosage Calculation",
    count: "16 Topics",
    icon: BsCalculator,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "Diagnostic Tests",
    count: "26 Topics",
    icon: BsClipboardData,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "ECG Mastery",
    count: "16 Topics",
    icon: BsActivity,
    bg: "bg-red-100",
    color: "text-red-500",
  },
  {
    title: "Practical Skills",
    count: "16 Topics",
    icon: BsTools,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Nursing Assessments",
    count: "24 Topics",
    icon: BsHeartPulse,
    bg: "bg-cyan-100",
    color: "text-cyan-600",
  },
  {
    title: "Cheat Sheets",
    count: "22 Topics",
    icon: BsJournalText,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
];

// Note: body system data
export const bodySystem = [
  {
    title: "Cardiovascular",
    desc: "I know you are busy- let me demo MyCase",
    img: "/assets/dashboard/cardiovascular.png",
    icon: BsHeartPulse,
  },
  {
    title: "Respiratory",
    desc: "Upper and lower airways, lung lobes, gas exchange...",
    img: "/assets/dashboard/respiratory.png",
    icon: BsLungs,
  },
  {
    title: "Gastrointestinal",
    desc: "GI tract anatomy, motility, absorption...",
    img: "/assets/dashboard/gastrointetinal.png",
    icon: BsActivity,
  },
  {
    title: "Female Reproduction",
    desc: "Reproductive anatomy, menstrual cycle...",
    img: "/assets/dashboard/reproduction.png",
    icon: BsPerson,
  },
];

// Note: cheat sheet data
export const cheatSheetData = [
  {
    title: "Heart Anatomy & Physiology",
    category: "Cardiovascular System",
    img: "/assets/dashboard/cheat_pic01.png",
    popular: true,
  },
  {
    title: "Heart Anatomy & Physiology",
    category: "Cardiovascular System",
    img: "/assets/dashboard/cheat_pic02.png",
    popular: true,
  },
  {
    title: "Heart Anatomy & Physiology",
    category: "Cardiovascular System",
    img: "/assets/dashboard/cheat_pic03.png",
    popular: true,
  },
  {
    title: "Lung Anatomy & Gas Exchange",
    category: "Cardiovascular System",
    img: "/assets/dashboard/cheat_pic04.png",
    popular: true,
  },
];
