"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, CheckCircle2 } from "lucide-react";
import {
  useToggleEventComplete,
  useSaveEventGrade,
  useDeleteEvent,
} from "@/hooks/calendars-planner";

const TYPE_COLORS = {
  lab: { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  clinical: { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  "check-off": { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  quiz: { bg: "#FEE2E2", text: "#B91C1C", border: "#FECACA" },
  exam: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  assignment: { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
  project: { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
  reading: { bg: "#EDE9FE", text: "#5B21B6", border: "#DDD6FE" },
};

const COURSE_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#0EA5E9", "#EC4899", "#14B8A6"];

function getCourseColor(courseCode, coursesData) {
  const idx = (coursesData || []).findIndex(
    (c) => c.code && c.code.trim().toUpperCase() === (courseCode || "").trim().toUpperCase()
  );
  return COURSE_COLORS[idx >= 0 ? idx % COURSE_COLORS.length : 0];
}

function getTypeColors(category) {
  return TYPE_COLORS[(category || "").toLowerCase()] ?? { bg: "#F1F5F9", text: "#475569", border: "#E2E8F0" };
}

function cleanValue(val) {
  if (!val) return "";
  const upper = val.trim().toUpperCase();
  if (upper === "UNKNOWN" || upper === "N/A") return "";
  return val.trim();
}

export default function EventModal({ event, onClose, coursesData = [] }) {
  const { toggleComplete, isToggling } = useToggleEventComplete();
  const { saveGrade, isSavingGrade } = useSaveEventGrade();
  const { deleteEvent, isDeleting } = useDeleteEvent();

  const [gradeInput, setGradeInput] = useState("");

  useEffect(() => {
    if (event) {
      const isGraded = event.grade_earned !== null && event.grade_earned !== undefined;
      setGradeInput(isGraded ? String(event.grade_earned) : "");
    }
  }, [event]);

  const isGraded = event?.grade_earned !== null && event?.grade_earned !== undefined;
  const colors = getTypeColors(event?.category || event?.type);
  const courseColor = getCourseColor(event?.course_code || event?.course, coursesData);

  // Find matching course for instructor/office/email
  const course = (coursesData || []).find(
    (c) =>
      (event?.course_id && c.id === event.course_id) ||
      (event?.course_code && c.code && c.code.trim().toUpperCase() === event.course_code.trim().toUpperCase())
  );

  // Resolve instructor, office, email from event or course
  let instructor = cleanValue(event?.instructor || course?.instructor);
  let officeRoom = cleanValue(event?.office_room || event?.location || event?.room || course?.room);
  let email = cleanValue(event?.email || course?.email);

  // Course label
  let cCode = cleanValue(event?.course_code || event?.course);
  let cName = cleanValue(event?.course_name);
  const courseLabel = cCode ? (cName ? `${cCode} • ${cName}` : cCode) : cName || "Academic Course";

  // Points + Grade display
  const pts = event?.points || event?.pts || 0;
  const weightVal = isGraded && pts > 0 ? `${Math.round((event.grade_earned / pts) * 100)}%` : "--";

  // Days left
  const daysLeftDisplay = event?.days_left || "";
  const daysLeftColor =
    daysLeftDisplay === "Today" || daysLeftDisplay === "1d"
      ? "#EF4444"
      : daysLeftDisplay === "2d" || daysLeftDisplay === "3d"
        ? "#F59E0B"
        : "#10B981";

  // Due date display
  let dueDateDisplay = event?.date || "";
  if (event?.start && event.start instanceof Date) {
    dueDateDisplay = event.start.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  }

  const handleSaveGrade = async () => {
    if (!event) return;
    const gradeNum = gradeInput.trim() === "" ? null : parseFloat(gradeInput);
    if (gradeNum !== null && (isNaN(gradeNum) || gradeNum < 0)) {
      alert("Score cannot be negative.");
      return;
    }
    try {
      await saveGrade({ eventId: event.id, grade_earned: gradeNum, mark_completed: gradeNum !== null });
      onClose();
    } catch (err) {
      alert("Failed to save grade.");
    }
  };

  const handleToggleComplete = async () => {
    if (!event) return;
    try {
      await toggleComplete({ eventId: event.id });
      onClose();
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };

  const handleDelete = async () => {
    if (!event) return;
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteEvent(event.id);
      onClose();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          key="event-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key="event-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto border border-[#E2E8F0]"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#F1F5F9] flex items-start justify-between gap-3">
          <div>
            {/* Category tag */}
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border inline-block mb-1.5 capitalize tracking-wide"
              style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}
            >
              {event.category || event.type || "assignment"}
            </span>
            <h3 className="text-lg font-bold text-[#1E293B] leading-snug">{event.title ?? "N/A"}</h3>
            <p className="text-xs text-[#0284C7] font-semibold mt-1">{courseLabel ?? "N/A"}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] transition-all shrink-0 mt-0.5"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Due date + Points row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl p-3.5 flex flex-col gap-1">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Due Date</p>
              <p className="text-sm font-bold text-[#1E293B]">{dueDateDisplay}</p>
              {daysLeftDisplay && (
                <p className="text-xs font-semibold" style={{ color: daysLeftColor }}>
                  {daysLeftDisplay === "Past"
                    ? "Past due"
                    : daysLeftDisplay === "Today"
                      ? "Due today"
                      : `${daysLeftDisplay} left`}
                </p>
              )}
            </div>
            <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl p-3.5 flex flex-col gap-1">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">Points</p>
              <p className="text-sm font-bold text-[#1E293B]">{pts} pts</p>
              <p className="text-xs text-[#64748B]">
                {isGraded ? event.grade_earned : 0} earned = {weightVal}
              </p>
            </div>
          </div>

          {/* Instructor Card */}
          {event.source !== "manual" && (instructor || officeRoom || email) && (
            <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl p-3.5 flex flex-col gap-1 transition-all">
              <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
                Instructor
              </p>
              <p className="text-sm font-bold text-[#1E293B]">
                {instructor || "Instructor not specified"}
              </p>
              {email ? (
                <a href={`mailto:${email}`} className="text-xs text-[#2563EB] font-semibold hover:underline">
                  {email}
                </a>
              ) : (
                <p className="text-xs text-[#94A3B8]">Email not specified</p>
              )}
              {officeRoom ? (
                <p className="text-xs text-[#64748B] mt-0.5">
                  {officeRoom}
                </p>
              ) : (
                <p className="text-xs text-[#94A3B8] mt-0.5">Office room not specified</p>
              )}
            </div>
          )}

          {/* Grade input */}
          <div>
            <label className="text-xs font-semibold text-[#475569] block mb-1.5">Enter Grade</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                step="0.5"
                min="0"
                value={gradeInput}
                onChange={(e) => setGradeInput(e.target.value)}
                placeholder="0"
                className="flex-1 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3 py-2 text-sm text-[#1E293B] font-bold text-center focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-all"
              />
              <span className="text-sm text-[#64748B] font-semibold">/ {pts}</span>
              <button
                onClick={handleSaveGrade}
                disabled={isSavingGrade}
                className="cursor-pointer px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-all disabled:opacity-50 shadow-sm"
              >
                {isSavingGrade ? "..." : "Save"}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleToggleComplete}
              className={`w-full text-sm font-semibold rounded-lg py-2.5 transition-all flex items-center justify-center gap-2 cursor-pointer border ${event.completed
                ? "bg-[#F8FAFC] text-success border-[#A7F3D0] hover:bg-[#D1FAE5]"
                : "bg-[#ECFDF5] text-success border-[#A7F3D0] hover:bg-[#D1FAE5]"
                }`}
            >
              {event.completed ? (
                <>
                  <CheckCircle2 size={17} className="text-[#10B981]" />
                  <p className="text-xs text-[#10B981]">{isToggling ? "Marking..." : "Mark Incomplete"}</p>
                </>
              ) : (
                <>
                  <CheckCircle2 size={17} className="text-[#10B981]" />
                  <p className="text-xs text-[#10B981]">{isToggling ? "Marking..." : "Mark Complete"}</p>
                </>
              )}
            </button>

            {event.source === "manual" && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="w-full bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]/40 hover:bg-[#FEE2E2] text-sm font-semibold rounded-lg py-2.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Trash2 size={16} />
                <p>{isDeleting ? "Deleting..." : "Delete Task"}</p>
              </button>
            )}
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
