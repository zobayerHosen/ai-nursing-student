"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  BookOpen,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building,
} from "lucide-react";
import {
  useToggleEventComplete,
  useSaveEventGrade,
  useDeleteEvent,
} from "@/hooks/calendars-planner";

const TYPE_COLORS = {
  lab: { bg: "#DBEAFE", text: "#1D4ED8" },
  clinical: { bg: "#DBEAFE", text: "#1D4ED8" },
  "check-off": { bg: "#DBEAFE", text: "#1D4ED8" },
  "skills-lab": { bg: "#DBEAFE", text: "#1D4ED8" },
  simulation: { bg: "#DBEAFE", text: "#1D4ED8" },
  quiz: { bg: "#FEE2E2", text: "#B91C1C" },
  exam: { bg: "#FEF3C7", text: "#92400E" },
  midterm: { bg: "#FEF3C7", text: "#92400E" },
  final: { bg: "#FEF3C7", text: "#92400E" },
  assignment: { bg: "#D1FAE5", text: "#065F46" },
  project: { bg: "#D1FAE5", text: "#065F46" },
  reading: { bg: "#EDE9FE", text: "#5B21B6" },
  lecture: { bg: "#E0E7FF", text: "#3730A3" },
  class: { bg: "#E0E7FF", text: "#3730A3" },
  "study-session": { bg: "#F3E8FF", text: "#7E22CE" },
  "nclex-practice": { bg: "#FEE2E2", text: "#B91C1C" },
};

function cleanValue(val) {
  if (!val) return "";
  const upper = String(val).trim().toUpperCase();
  if (upper === "UNKNOWN" || upper === "N/A" || upper === "UNKNOWN COURSE") return "";
  return String(val).trim();
}

function formatFullDateTime(dateStr, timeStr, defaultTime) {
  if (!dateStr) return "Date not specified";
  const parts = String(dateStr).split("-");
  if (parts.length !== 3) return String(dateStr);
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  const dt = new Date(y, m, d);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayName = dayNames[dt.getDay()];
  const monthName = monthNames[dt.getMonth()];
  const t = (timeStr || defaultTime || "").trim();
  if (t) {
    return `${dayName}, ${monthName} ${d}, ${y} · ${t} CDT`;
  }
  return `${dayName}, ${monthName} ${d}, ${y}`;
}

function formatShiftDateTime(dateStr, startTime, endTime) {
  if (!dateStr) return "Shift date not specified";
  const parts = String(dateStr).split("-");
  if (parts.length !== 3) return String(dateStr);
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  const dt = new Date(y, m, d);
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const dayName = dayNames[dt.getDay()];
  const monthName = monthNames[dt.getMonth()];
  const start = (startTime || "7:00 AM").trim();
  const end = (endTime || "3:00 PM").trim();
  return `${dayName}, ${monthName} ${d}, ${y}\n${start}–${end} CDT · America/Chicago`;
}

// Compute date status (Past Due, Due Today, Upcoming, Completed)
function getDateStatus(event) {
  if (event?.completed) {
    return {
      status: "completed",
      label: "Completed",
      badgeClass: "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]",
      cardBg: "bg-[#F0FDF4]/70",
      dateColor: "text-[#065F46]",
      icon: "✔",
    };
  }

  const dl = (event?.days_left || "").toLowerCase().trim();
  let isPast = dl === "past";

  if (!isPast && event?.date) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const parts = String(event.date).split("-");
      if (parts.length === 3) {
        const evDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        evDate.setHours(0, 0, 0, 0);
        if (evDate < today) {
          isPast = true;
        }
      }
    } catch (_) {}
  }

  if (isPast) {
    return {
      status: "past",
      label: "Past Due",
      badgeClass: "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]",
      cardBg: "bg-[#FEF2F2]/70",
      dateColor: "text-[#DC2626]",
      icon: "⚠️",
    };
  }

  if (dl === "today" || dl === "0d") {
    return {
      status: "today",
      label: "Due Today",
      badgeClass: "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]",
      cardBg: "bg-[#FFFBEB]/80",
      dateColor: "text-[#B45309]",
      icon: "⚡",
    };
  }

  if (dl === "1d" || dl === "2d" || dl === "3d") {
    return {
      status: "soon",
      label: `Due in ${dl}`,
      badgeClass: "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]/60",
      cardBg: "bg-[#FFFBEB]/50",
      dateColor: "text-[#92400E]",
      icon: "⏱",
    };
  }

  return {
    status: "upcoming",
    label: dl ? `${dl} left` : "Upcoming",
    badgeClass: "bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]",
    cardBg: "bg-[#F8FAFC]",
    dateColor: "text-[#1E293B]",
    icon: "📅",
  };
}

// ─── Custom Colored Component Blocks ───

// 1. Instructions Callout
function InstructionsCallout({ label = "Instructions & Deliverable", children }) {
  if (!children) return null;
  return (
    <div className="bg-linear-to-r from-[#EFF6FF] to-[#F0FDF4]/30 rounded-xl p-3.5 border-l-4 border-[#3B82F6]">
      <div className="flex items-center gap-1.5 mb-1.5 text-[#1D4ED8]">
        <FileText size={14} className="shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-xs font-medium text-[#1E3A5F] leading-relaxed whitespace-pre-line wrap-break-word">
        {children}
      </p>
    </div>
  );
}

// 2. Instructor & Faculty Card
function InstructorCard({ instructor, email, office, role = "Instructor / Faculty" }) {
  const displayName = instructor || "Course Faculty";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "CF";

  return (
    <div className="bg-linear-to-r from-[#EFF6FF]/70 to-[#F8FAFC] rounded-xl p-3.5 border border-[#DBEAFE]">
      <div className="flex items-center gap-1.5 mb-2 text-[#2563EB]">
        <User size={13} className="shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {role}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#DBEAFE] text-[#1D4ED8] font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[#0F172A] truncate">{displayName}</p>
          <div className="flex items-center gap-3 flex-wrap mt-0.5">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="text-[11px] font-semibold text-[#2563EB] hover:underline flex items-center gap-1 shrink-0"
              >
                <Mail size={12} />
                <span className="truncate max-w-50">{email}</span>
              </a>
            ) : (
              <span className="text-[11px] text-[#64748B]">Syllabus Faculty Contact</span>
            )}
            {office && (
              <span className="text-[11px] text-[#64748B] font-medium flex items-center gap-1 shrink-0">
                <MapPin size={12} className="text-[#94A3B8]" />
                <span>{office}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Location / Room Card
function LocationCard({ label = "Location / Room", location, subtext }) {
  if (!location) return null;
  return (
    <div className="bg-linear-to-r from-[#F0FDF4]/70 to-[#F8FAFC] rounded-xl p-3.5 border border-[#DCFCE7]">
      <div className="flex items-center gap-1.5 mb-1.5 text-success">
        <MapPin size={13} className="shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-xs font-semibold text-[#0F172A] leading-relaxed whitespace-pre-line wrap-break-word">
        {location}
      </p>
      {subtext && (
        <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">{subtext}</p>
      )}
    </div>
  );
}

// 4. Source & Excerpt Card
function SourceCard({ label = "Syllabus Source & Excerpt", text }) {
  if (!text) return null;
  return (
    <div className="bg-linear-to-r from-[#FAF5FF] to-[#F8FAFC] rounded-xl p-3.5 border border-[#F3E8FF]">
      <div className="flex items-center gap-1.5 mb-1 text-[#7C3AED]">
        <BookOpen size={13} className="shrink-0" />
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-xs font-medium text-[#4C1D95] leading-relaxed whitespace-pre-line wrap-break-word">
        {text}
      </p>
    </div>
  );
}

// 5. Info Tile (for latest start, arrival point, etc.)
function InfoTile({ icon: Icon = Clock, label, text }) {
  if (!text) return null;
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8FAFC]">
      <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <Icon size={13} className="text-[#64748B]" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-0.5">
          {label}
        </span>
        <p className="text-xs font-semibold text-[#1E293B] leading-snug whitespace-pre-line wrap-break-word">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function EventModal({ event, onClose, coursesData = [] }) {
  const { toggleComplete, isToggling } = useToggleEventComplete();
  const { saveGrade, isSavingGrade } = useSaveEventGrade();
  const { deleteEvent, isDeleting } = useDeleteEvent();

  const [gradeInput, setGradeInput] = useState("");
  const [showGradeInput, setShowGradeInput] = useState(false);

  useEffect(() => {
    if (event) {
      const isGraded = event.grade_earned !== null && event.grade_earned !== undefined;
      setGradeInput(isGraded ? String(event.grade_earned) : "");
      setShowGradeInput(false);
    }
  }, [event]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && event) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event, onClose]);

  if (!event) return null;

  // Find course matching this event
  const course = (coursesData || []).find(
    (c) =>
      (event.course_id && c.id === event.course_id) ||
      (event.course_code && c.code && c.code.trim().toUpperCase() === event.course_code.trim().toUpperCase()) ||
      (event.course && c.code && c.code.trim().toUpperCase() === event.course.trim().toUpperCase())
  );

  const cCode = cleanValue(event.course_code || event.course || course?.code) || "NU 612";
  const cName = cleanValue(event.course_name || course?.name) || "";
  const instructor = cleanValue(event.instructor || course?.instructor) || "";
  const officeRoom = cleanValue(event.office_room || event.location || event.room || course?.room) || "";
  const email = cleanValue(event.email || course?.email) || "";
  const cat = (event.category || event.type || "").toLowerCase().trim();
  const isCompleted = !!event.completed;
  const pts = Number(event.points || event.pts || 0);
  const isGraded = event.grade_earned !== null && event.grade_earned !== undefined;
  const colors = TYPE_COLORS[cat] ?? { bg: "#F1F5F9", text: "#475569" };

  const dateStatus = getDateStatus(event);

  const isAttendanceType =
    cat === "clinical" ||
    cat === "lab" ||
    cat === "skills-lab" ||
    cat === "skills lab" ||
    cat === "simulation" ||
    cat === "check-off" ||
    cat === "skills check-off" ||
    cat === "work-shift" ||
    cat === "work shift" ||
    cat === "class" ||
    cat === "lecture";

  const completeBtnText = isAttendanceType
    ? isCompleted ? "↩️ Mark Unattended" : "Mark attended"
    : isCompleted ? "↩️ Mark Incomplete" : "Mark complete";

  const handleToggle = async () => {
    try {
      await toggleComplete({ eventId: event.id });
      onClose();
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(event.id);
      onClose();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const handleSaveGrade = async () => {
    const gradeNum = parseFloat(gradeInput);
    if (isNaN(gradeNum)) return;
    try {
      await saveGrade({ eventId: event.id, grade_earned: gradeNum, mark_completed: true });
      setShowGradeInput(false);
      onClose();
    } catch (err) {
      console.error("Error saving grade:", err);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="event-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-200 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="event-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto text-[#1E293B]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-[#F1F5F9]">
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span
                  className="text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {event.category || event.type || "assignment"}
                </span>
                <span className="text-xs font-semibold text-[#64748B]">
                  {cCode}{cName ? ` · ${cName}` : ""}
                </span>
              </div>
              <h2 className="text-base font-bold text-[#0F172A] leading-snug wrap-break-word">
                {event.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] transition-all cursor-pointer shrink-0"
              title="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Details Body */}
          <div className="flex flex-col gap-3">

            {/* QUIZ / NCLEX PRACTICE */}
            {(cat === "quiz" || cat === "nclex-practice" || cat === "nclex practice") && (
              <>
                <div className={`grid grid-cols-2 gap-3 rounded-xl p-3.5 transition-colors ${dateStatus.cardBg}`}>
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-0.5">
                      Opens
                    </span>
                    <p className="text-xs font-semibold text-[#1E293B]">
                      {formatFullDateTime(event.date, event.start_time, "8:00 AM")}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                        Closes
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${dateStatus.badgeClass}`}>
                        <span>{dateStatus.icon}</span>
                        <span>{dateStatus.label}</span>
                      </span>
                    </div>
                    <p className={`text-xs font-bold ${dateStatus.dateColor}`}>
                      {formatFullDateTime(event.date, event.end_time, "9:00 PM")}
                    </p>
                  </div>
                </div>

                {/* Attempt rules callout */}
                <div className="bg-[#FFFBEB] rounded-xl p-3.5 border-l-4 border-[#F59E0B]">
                  <div className="flex items-center gap-1.5 mb-1 text-[#B45309]">
                    <Clock size={14} className="shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Attempt Rules
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#92400E] leading-relaxed">
                    One attempt · 20 minutes
                  </p>
                </div>

                {/* Instructions if available */}
                {event.description && (
                  <InstructionsCallout label="Instructions & Notes">
                    {event.description}
                  </InstructionsCallout>
                )}

                <InfoTile
                  icon={Clock}
                  label="Latest start for full attempt"
                  text={formatFullDateTime(event.date, event.start_time, "8:40 PM")}
                />

                <InstructorCard
                  role="Source & Instructor"
                  instructor={instructor || "Attempt rules p. 5"}
                  email={email}
                  office={officeRoom}
                />
              </>
            )}

            {/* DISCUSSION / READING / STUDY SESSION */}
            {(cat === "discussion" ||
              cat === "reading" ||
              cat === "study-session" ||
              cat === "study session" ||
              cat === "study-group" ||
              cat === "study group") && (
              <>
                {/* Linked deadlines */}
                <div className={`rounded-xl p-3.5 flex flex-col gap-2.5 transition-colors ${dateStatus.cardBg}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      Linked Deadlines
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${dateStatus.badgeClass}`}>
                      <span>{dateStatus.icon}</span>
                      <span>{dateStatus.label}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={handleToggle}
                      className="mt-0.5 w-4 h-4 accent-[#1E3A5F] cursor-pointer rounded"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#1E293B]">Initial post</p>
                      <p className={`text-[11px] font-medium ${dateStatus.dateColor}`}>
                        {formatFullDateTime(event.date, event.start_time, "Exact date & time needs confirmation from syllabus")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={handleToggle}
                      className="mt-0.5 w-4 h-4 accent-[#1E3A5F] cursor-pointer rounded"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#1E293B]">Peer replies</p>
                      <p className="text-[11px] text-[#64748B]">
                        Separate date & time needs confirmation from syllabus
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instructions Callout */}
                <InstructionsCallout label="Instructions">
                  {event.description || "Initial-post and reply instructions stay separate."}
                </InstructionsCallout>

                <LocationCard
                  label="Submission Location"
                  location={officeRoom || "Course discussion board"}
                />

                <InstructorCard
                  role="Instructor / Faculty"
                  instructor={instructor}
                  email={email}
                  office={officeRoom}
                />

                <SourceCard
                  label="Source Excerpt"
                  text="Review the original syllabus before confirming dates."
                />
              </>
            )}

            {/* CLINICAL / LAB / SIMULATION / CHECK-OFF / WORK SHIFT */}
            {(cat === "clinical" ||
              cat === "lab" ||
              cat === "skills-lab" ||
              cat === "skills lab" ||
              cat === "simulation" ||
              cat === "check-off" ||
              cat === "skills check-off" ||
              cat === "work-shift" ||
              cat === "work shift") && (
              <>
                <div className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold w-fit">
                  {cName || "Adult Health Nursing"} · Required
                </div>

                {/* Shift Schedule with Status Badge */}
                <div className={`rounded-xl p-3.5 transition-colors ${dateStatus.cardBg}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      SHIFT SCHEDULE
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${dateStatus.badgeClass}`}>
                      <span>{dateStatus.icon}</span>
                      <span>{dateStatus.label}</span>
                    </span>
                  </div>
                  <p className={`text-xs font-bold whitespace-pre-line leading-relaxed ${dateStatus.dateColor}`}>
                    {formatShiftDateTime(event.date, event.start_time, event.end_time)}
                  </p>
                </div>

                {/* Preparation & Requirements Callout */}
                <div className="bg-linear-to-r from-[#F0FDFA] to-[#EFF6FF]/40 rounded-xl p-3.5 border-l-4 border-[#0D9488]">
                  <div className="flex items-center gap-1.5 mb-1 text-[#0F766E]">
                    <FileText size={14} className="shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Preparation & Requirements
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#134E4A] leading-relaxed whitespace-pre-line wrap-break-word">
                    {"Review assigned patient-care preparation.\nBring student ID, required uniform, and clinical equipment.\nFollow the site's clearance and onboarding requirements."}
                  </p>
                </div>

                <InfoTile
                  icon={Clock}
                  label="Arrival & Meeting Point"
                  text="Arrive by 6:45 AM · Main lobby, first floor"
                />

                <LocationCard
                  label="Clinical Site & Unit"
                  location={officeRoom || "Example Medical Center · Medical-Surgical Unit, 3rd floor"}
                  subtext="Address and parking directions from the clinical schedule"
                />

                <InstructorCard
                  role="Instructor / Preceptor"
                  instructor={instructor || "View assigned clinical instructor"}
                  email={email}
                  office={officeRoom}
                />

                <SourceCard
                  label="Source & Schedule Changes"
                  text="Clinical schedule · Source page and excerpt. Confirm location or shift details if missing."
                />
              </>
            )}

            {/* EXAM / MIDTERM / FINAL */}
            {(cat === "exam" || cat === "midterm" || cat === "final") && (
              <>
                <div className={`grid grid-cols-2 gap-3 rounded-xl p-3.5 transition-colors ${dateStatus.cardBg}`}>
                  <div>
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-0.5">
                      Opens
                    </span>
                    <p className="text-xs font-semibold text-[#1E293B]">
                      {formatFullDateTime(event.date, event.start_time, "09:00 AM")}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                        Closes
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${dateStatus.badgeClass}`}>
                        <span>{dateStatus.icon}</span>
                        <span>{dateStatus.label}</span>
                      </span>
                    </div>
                    <p className={`text-xs font-bold ${dateStatus.dateColor}`}>
                      {formatFullDateTime(event.date, event.end_time, "11:00 AM")}
                    </p>
                  </div>
                </div>

                {/* Attempt rules callout */}
                <div className="bg-[#FFFBEB] rounded-xl p-3.5 border-l-4 border-[#F59E0B]">
                  <div className="flex items-center gap-1.5 mb-1 text-[#B45309]">
                    <Clock size={14} className="shrink-0" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Attempt Rules
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#92400E] leading-relaxed">
                    In-person proctored exam · Time limit: 120 minutes · One attempt
                  </p>
                </div>

                {/* Instructions & Coverage Callout */}
                <InstructionsCallout label="Instructions & Coverage">
                  {event.description ||
                    "Bring photo ID, approved calculator, and No. 2 pencils. No electronic devices permitted."}
                </InstructionsCallout>

                <InfoTile
                  icon={Clock}
                  label="Latest start for full attempt"
                  text={formatFullDateTime(event.date, event.start_time, "09:00 AM")}
                />

                <LocationCard
                  label="Examination Site & Room"
                  location={officeRoom || "Main Campus Testing Center / Room 204"}
                />

                <InstructorCard
                  role="Exam Proctor / Faculty"
                  instructor={instructor ? `Exam Proctor: ${instructor}` : "View assigned proctor details"}
                  email={email}
                  office={officeRoom}
                />
              </>
            )}

            {/* CLASS / LECTURE */}
            {(cat === "class" || cat === "lecture") && (
              <>
                <div className={`rounded-xl p-3.5 transition-colors ${dateStatus.cardBg}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      Class Meeting Schedule
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${dateStatus.badgeClass}`}>
                      <span>{dateStatus.icon}</span>
                      <span>{dateStatus.label}</span>
                    </span>
                  </div>
                  <p className={`text-xs font-bold whitespace-pre-line leading-relaxed ${dateStatus.dateColor}`}>
                    {formatShiftDateTime(event.date, event.start_time, event.end_time)}
                  </p>
                </div>

                {/* Topic & Notes Callout */}
                <InstructionsCallout label="Topic & Notes">
                  {event.description ||
                    "Review assigned reading materials and lecture slides prior to meeting."}
                </InstructionsCallout>

                <LocationCard
                  label="Classroom & Location"
                  location={officeRoom || "Main Campus Classroom / Online"}
                />

                <InstructorCard
                  role="Course Faculty"
                  instructor={instructor || "Course Faculty"}
                  email={email}
                  office={officeRoom}
                />

                <SourceCard
                  label="Source & Schedule Changes"
                  text="Class schedule · Source syllabus"
                />
              </>
            )}

            {/* DEFAULT / ASSIGNMENT / PROJECT / OTHER */}
            {!["quiz", "nclex-practice", "nclex practice", "discussion", "reading", "study-session", "study session", "study-group", "study group", "clinical", "lab", "skills-lab", "skills lab", "simulation", "check-off", "skills check-off", "work-shift", "work shift", "exam", "midterm", "final", "class", "lecture"].includes(cat) && (
              <>
                {/* Due Date Card with Dynamic Coloring & Status Badge */}
                <div className={`rounded-xl p-3.5 transition-colors ${dateStatus.cardBg}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      Due Date & Time
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${dateStatus.badgeClass}`}>
                      <span>{dateStatus.icon}</span>
                      <span>{dateStatus.label}</span>
                    </span>
                  </div>
                  <p className={`text-xs font-bold leading-relaxed ${dateStatus.dateColor}`}>
                    {formatFullDateTime(event.date, event.end_time || event.start_time, "12:00 PM")}
                  </p>
                </div>

                {/* Instructions & Deliverable Callout */}
                <InstructionsCallout label="Instructions & Deliverable">
                  {event.description ||
                    "Keep the assignment instructions, file format, and word count from the source syllabus."}
                </InstructionsCallout>

                {/* Location / Submission Path */}
                <LocationCard
                  label="Submission Location"
                  location={officeRoom || "Confirm the assignment submission path in HarborLearn."}
                />

                {/* Instructor & Faculty Card */}
                <InstructorCard
                  role="Course Faculty"
                  instructor={instructor || "Course Faculty"}
                  email={email}
                  office={officeRoom}
                />

                {/* Source & Reference */}
                <SourceCard
                  label="Syllabus Reference"
                  text={`View original syllabus and source excerpt · ${instructor || "Course Faculty"}${email ? ` (${email})` : ""}`}
                />
              </>
            )}

            {/* Points & Grade section (if points exist or already graded) */}
            {pts > 0 && (
              <div className="bg-[#F8FAFC] rounded-xl p-3.5 mt-1 border border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider block">
                      Points & Score
                    </span>
                    <p className="text-xs font-semibold text-[#1E293B] mt-0.5">
                      {isGraded
                        ? `${event.grade_earned} / ${pts} pts (${Math.round((event.grade_earned / pts) * 100)}%)`
                        : `${pts} pts`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGradeInput(!showGradeInput)}
                    className="text-xs text-[#2563EB] hover:underline font-semibold cursor-pointer"
                  >
                    {showGradeInput ? "Cancel" : isGraded ? "Edit Grade" : "Enter Grade"}
                  </button>
                </div>

                {showGradeInput && (
                  <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-[#E2E8F0]">
                    <input
                      type="number"
                      min="0"
                      max={pts}
                      step="0.5"
                      value={gradeInput}
                      onChange={(e) => setGradeInput(e.target.value)}
                      placeholder={`Score out of ${pts}`}
                      className="flex-1 bg-white border border-[#CBD5E1] rounded-lg px-2.5 py-1.5 text-xs text-[#1E293B] focus:outline-none focus:border-[#2563EB]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveGrade}
                      disabled={isSavingGrade || !gradeInput}
                      className="px-3 py-1.5 bg-[#2563EB] text-white text-xs font-bold rounded-lg hover:bg-[#1D4ED8] transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSavingGrade ? "Saving..." : "Save"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Progress note */}
            <p className="text-[11px] text-[#94A3B8] leading-relaxed mt-1">
              Completion tracks your progress; it does not submit work to your school. You can undo it.
            </p>
          </div>

          {/* Action buttons — Clean & Modern */}
          <div className="w-full flex items-center gap-3 mt-5 pt-3 border-t border-[#F1F5F9]">
            <button
              onClick={handleToggle}
              disabled={isToggling}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs text-white ${
                isCompleted
                  ? "bg-[#10B981] hover:bg-success"
                  : "bg-[#1E3A5F] hover:bg-[#152840]"
              } disabled:opacity-50`}
            >
              {isToggling ? "Updating..." : completeBtnText}
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="py-2.5 px-4 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] text-xs font-bold rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0"
            >
              <Trash2 size={14} />
              <span>{isDeleting ? "Deleting..." : "Delete task"}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};