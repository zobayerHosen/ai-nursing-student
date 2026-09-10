/**
 * Shared constants for the Study Notes Progress view.
 */

import {
  Award,
  Activity,
  Baby,
  Bookmark,
  Brain,
  FileText,
  HeartPulse,
  Pill,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

/** Decorative icon/style palette cycled across area cards. */
export const ICON_CHOICES = [
  { icon: HeartPulse, bg: "bg-[#FEE2E2]", color: "text-[#EF4444]" },
  { icon: Award, bg: "bg-[#FEF3C7]", color: "text-[#D97706]" },
  { icon: Baby, bg: "bg-[#E0F2FE]", color: "text-[#0284C7]" },
  { icon: Pill, bg: "bg-[#FCE7F3]", color: "text-[#DB2777]" },
  { icon: Brain, bg: "bg-[#FEE2E2]", color: "text-[#DC2626]" },
  { icon: Activity, bg: "bg-[#FEF3C7]", color: "text-[#D97706]" },
  { icon: Users, bg: "bg-[#E6FFFA]", color: "text-[#0D9488]" },
  { icon: ShieldCheck, bg: "bg-[#EDE9FE]", color: "text-[#6366F1]" },
];

/** Canonical area statuses (single source of truth for status logic/UI). */
export const AREA_STATUS = {
  COMPLETE: "Complete",
  IN_PROGRESS: "In Progress",
  NOT_STARTED: "Not Started",
};

/** Area-status filter ids used by the filter pills. */
export const AREA_FILTERS = {
  ALL: "all",
  IN_PROGRESS: "in-progress",
  COMPLETE: "completed",
  NOT_STARTED: "not-started",
};

/** Filter pill definitions (label + which status they match). */
export const AREA_FILTER_ITEMS = [
  { id: AREA_FILTERS.ALL, label: "All", match: null },
  { id: AREA_FILTERS.IN_PROGRESS, label: "In Progress", match: AREA_STATUS.IN_PROGRESS },
  { id: AREA_FILTERS.COMPLETE, label: "Completed", match: AREA_STATUS.COMPLETE },
  { id: AREA_FILTERS.NOT_STARTED, label: "Not Started", match: AREA_STATUS.NOT_STARTED },
];

/** Status badge styling per area status. */
export const AREA_STATUS_BADGES = {
  [AREA_STATUS.IN_PROGRESS]: {
    label: "In Progress",
    className: "bg-[#E0F2FE] text-[#0284C7]",
  },
  [AREA_STATUS.COMPLETE]: {
    label: "Complete",
    className: "bg-[#1B4B66] text-white",
  },
  [AREA_STATUS.NOT_STARTED]: {
    label: "Not Started",
    className: "text-gray-400",
  },
};

/** The 2x2 summary stat cards under the donut chart. */
export const SUMMARY_STAT_CARDS = [
  {
    id: "total",
    label: "Total Notes",
    value: "totalNotes",
    caption: "Across all nursing areas",
    icon: FileText,
    iconClassName: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "completed",
    label: "Completed",
    value: "completedNotes",
    caption: "coveragePercent% of all notes",
    icon: Award,
    iconClassName: "bg-purple-50 text-purple-600",
  },
  {
    id: "in-progress",
    label: "InProgress",
    value: "inProgressCount",
    icon: Sparkles,
    iconClassName: "bg-pink-50 text-pink-600",
    captionIcon: TrendingUp,
    captionText: "Active in progress",
    captionClassName: "text-emerald-600",
  },
  {
    id: "bookmarked",
    label: "Bookmarked",
    value: "bookmarkedCount",
    caption: "You saved notes",
    icon: Bookmark,
    iconClassName: "bg-amber-50 text-amber-600",
  },
];

/** Donut chart geometry (viewBox 160x160). */
export const DONUT_RADIUS = 64;
export const DONUT_STROKE_WIDTH = 14;
