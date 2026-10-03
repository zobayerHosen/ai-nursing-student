/**
 * Shared constants for the Study Notes Progress view.
 */

import {
  Award,
  Activity,
  Baby,
  Brain,
  HeartPulse,
  Pill,
  ShieldCheck, 
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
  COMPLETE: "completed",
  IN_PROGRESS: "in_progress",
  NOT_STARTED: "not_started",
};

/** Area-status filter ids used by the filter pills. */
export const AREA_FILTERS = {
  ALL: "all",
  IN_PROGRESS: "in_progress",
  COMPLETE: "completed",
  NOT_STARTED: "not_started",
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
    label: "Completed",
    className: "bg-[#1B4B66] text-white",
  },
  [AREA_STATUS.NOT_STARTED]: {
    label: "Not Started",
    className: "text-gray-400 font-medium",
  },
  "In Progress": {
    label: "In Progress",
    className: "bg-[#E0F2FE] text-[#0284C7]",
  },
  Complete: {
    label: "Completed",
    className: "bg-[#1B4B66] text-white",
  },
  "Not Started": {
    label: "Not Started",
    className: "text-gray-400 font-medium",
  },
};

/** The 2x2 summary stat cards under the donut chart. */

/** Donut chart geometry (viewBox 160x160). */
export const DONUT_RADIUS = 64;
export const DONUT_STROKE_WIDTH = 14;
