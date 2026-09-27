"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  BookOpen,
  CalendarDays,
  Upload,
  RotateCcw,
  AlertTriangle,
  X
} from "lucide-react";
import UploadView from "./views/UploadView";
import CalendarView from "./views/CalendarView";
import RightSidebar from "./views/RightSidebar";
import {
  useCalendarCourses,
  useCalendarEvents,
  useGradesSummary,
  useClearAllData,
} from "@/hooks/calendars-planner";

const STAT_ICONS = [
  <GraduationCap size={22} key="g" />,
  <CheckCircle2 size={22} key="c" />,
  <Clock size={22} key="cl" />,
  <BookOpen size={22} key="b" />,
];

const STAT_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

function StatsBar({ coursesData, eventsData, gradesSummary }) {
  // GPA
  const gpaDisplay =
    gradesSummary?.cgpa_formatted && gradesSummary.cgpa_formatted !== "--"
      ? gradesSummary.cgpa_formatted
      : "--";
  const gpaSub =
    gradesSummary?.note && gpaDisplay !== "--" ? gradesSummary.note : "No grades yet";

  // Completed
  const completedCount = eventsData.filter((e) => e.completed).length;

  // Upcoming (due in next 7 days)
  const upcomingCount = eventsData.filter((e) => {
    const dl = e.days_left;
    if (dl === "Past") return false;
    if (
      dl === "Today" || dl === "1d" || dl === "2d" || dl === "3d" ||
      dl === "4d" || dl === "5d" || dl === "6d" || dl === "7d"
    ) return true;
    return false;
  }).length;

  const stats = [
    { value: gpaDisplay, label: "Overall GPA", sub: gpaSub },
    { value: `${completedCount}/${eventsData.length}`, label: "Completed", sub: "assignments" },
    { value: String(upcomingCount), label: "Upcoming", sub: "due this week" },
    { value: String(coursesData.length), label: "Courses", sub: "this semester" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white border border-[#E4E7EC] rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: STAT_COLORS[i] + "1A", color: STAT_COLORS[i] }}
          >
            {STAT_ICONS[i]}
          </div>
          <div>
            <p className="text-xl font-extrabold leading-none" style={{ color: STAT_COLORS[i] }}>
              {s.value}
            </p>
            <p className="text-xs text-[#667085] mt-0.5 font-medium">{s.label}</p>
            {s.sub && <p className="text-[10px] text-[#9CA3AF]">{s.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

const CalendarsToolsShell = () => {
  const [phase, setPhase] = useState("upload");
  const [courseFilter, setCourseFilter] = useState("all");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const { coursesData, isCoursesLoading } = useCalendarCourses();
  console.log("Course data", coursesData);

  const { eventsData, isEventsLoading } = useCalendarEvents(courseFilter);
  console.log("Event data", eventsData);

  const { gradesSummary, isGradesLoading } = useGradesSummary();
  const { clearAllData, isClearing } = useClearAllData();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isResetModalOpen && !isClearing) {
        setIsResetModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResetModalOpen, isClearing]);

  const handleConfirmReset = async () => {
    try {
      await clearAllData();
      setIsResetModalOpen(false);
    } catch (err) {
      console.error("Error resetting calendar data:", err);
    }
  };

  const renderResetModal = () => (
    <AnimatePresence>
      {isResetModalOpen && (
        <motion.div
          key="reset-confirm-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => !isClearing && setIsResetModalOpen(false)}
        >
          <motion.div
            key="reset-confirm-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 14 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0 mt-0.5">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Reset All Calendar Data?
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    This action will wipe all your calendar content and return the planner to a clean empty state.
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isClearing}
                onClick={() => setIsResetModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Warning Details Box */}
            <div className="px-6 py-2">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
                <p className="font-semibold text-slate-700">The following data will be cleared:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-500 text-[11px] pl-1">
                  <li>All uploaded course syllabi & schedules</li>
                  <li>All assignments, quizzes, exams, and personal tasks</li>
                  <li>All grade summaries and GPA progress</li>
                </ul>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-6 pt-4 flex items-center justify-end gap-2.5 bg-slate-50/50 border-t border-slate-100 mt-2">
              <button
                type="button"
                disabled={isClearing}
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isClearing}
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RotateCcw size={14} className={`shrink-0 ${isClearing ? "animate-spin" : ""}`} />
                <span>{isClearing ? "Resetting Data..." : "Confirm Reset"}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (phase === "upload") {
    return (
      <div className="w-full flex flex-col gap-5 px-5 py-6">
        <div className="flex items-center justify-between w-full bg-white border border-gray-200 rounded px-5 py-4">
          <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.66602 4.79199C6.32435 4.79199 6.04102 4.50866 6.04102 4.16699V1.66699C6.04102 1.32533 6.32435 1.04199 6.66602 1.04199C7.00768 1.04199 7.29102 1.32533 7.29102 1.66699V4.16699C7.29102 4.50866 7.00768 4.79199 6.66602 4.79199Z" fill="#64748B" />
            <path d="M13.334 4.79199C12.9923 4.79199 12.709 4.50866 12.709 4.16699V1.66699C12.709 1.32533 12.9923 1.04199 13.334 1.04199C13.6757 1.04199 13.959 1.32533 13.959 1.66699V4.16699C13.959 4.50866 13.6757 4.79199 13.334 4.79199Z" fill="#64748B" />
            <path d="M7.08333 12.0839C6.975 12.0839 6.86667 12.0589 6.76667 12.0172C6.65833 11.9756 6.575 11.9172 6.49167 11.8422C6.34167 11.6839 6.25 11.4756 6.25 11.2506C6.25 11.1422 6.275 11.0339 6.31667 10.9339C6.35833 10.8339 6.41667 10.7422 6.49167 10.6589C6.575 10.5839 6.65833 10.5256 6.76667 10.4839C7.06667 10.3589 7.44167 10.4256 7.675 10.6589C7.825 10.8172 7.91667 11.0339 7.91667 11.2506C7.91667 11.3006 7.90833 11.3589 7.9 11.4172C7.89167 11.4672 7.875 11.5172 7.85 11.5672C7.83333 11.6172 7.80833 11.6672 7.775 11.7172C7.75 11.7589 7.70833 11.8006 7.675 11.8422C7.51667 11.9922 7.3 12.0839 7.08333 12.0839Z" fill="#64748B" />
            <path d="M9.99935 12.0837C9.89102 12.0837 9.78268 12.0587 9.68268 12.017C9.57435 11.9754 9.49102 11.917 9.40768 11.842C9.25768 11.6837 9.16602 11.4754 9.16602 11.2504C9.16602 11.142 9.19102 11.0337 9.23268 10.9337C9.27435 10.8337 9.33268 10.742 9.40768 10.6587C9.49102 10.5837 9.57435 10.5254 9.68268 10.4837C9.98268 10.3504 10.3577 10.4254 10.591 10.6587C10.741 10.817 10.8327 11.0337 10.8327 11.2504C10.8327 11.3004 10.8243 11.3587 10.816 11.417C10.8077 11.467 10.791 11.517 10.766 11.567C10.7493 11.617 10.7243 11.667 10.691 11.717C10.666 11.7587 10.6243 11.8004 10.591 11.842C10.4327 11.992 10.216 12.0837 9.99935 12.0837Z" fill="#64748B" />
            <path d="M12.9173 12.0837C12.809 12.0837 12.7007 12.0587 12.6007 12.017C12.4923 11.9754 12.409 11.917 12.3257 11.842C12.2923 11.8004 12.259 11.7587 12.2257 11.717C12.1923 11.667 12.1673 11.617 12.1507 11.567C12.1257 11.517 12.109 11.467 12.1007 11.417C12.0923 11.3587 12.084 11.3004 12.084 11.2504C12.084 11.0337 12.1757 10.817 12.3257 10.6587C12.409 10.5837 12.4923 10.5254 12.6007 10.4837C12.909 10.3504 13.2757 10.4254 13.509 10.6587C13.659 10.817 13.7507 11.0337 13.7507 11.2504C13.7507 11.3004 13.7423 11.3587 13.734 11.417C13.7257 11.467 13.709 11.517 13.684 11.567C13.6673 11.617 13.6423 11.667 13.609 11.717C13.584 11.7587 13.5423 11.8004 13.509 11.842C13.3507 11.992 13.134 12.0837 12.9173 12.0837Z" fill="#64748B" />
            <path d="M7.08333 14.9999C6.975 14.9999 6.86667 14.975 6.76667 14.9333C6.66667 14.8917 6.575 14.8332 6.49167 14.7582C6.34167 14.5999 6.25 14.3832 6.25 14.1666C6.25 14.0582 6.275 13.9499 6.31667 13.8499C6.35833 13.7416 6.41667 13.65 6.49167 13.575C6.8 13.2667 7.36667 13.2667 7.675 13.575C7.825 13.7333 7.91667 13.9499 7.91667 14.1666C7.91667 14.3832 7.825 14.5999 7.675 14.7582C7.51667 14.9082 7.3 14.9999 7.08333 14.9999Z" fill="#64748B" />
            <path d="M9.99935 14.9999C9.78268 14.9999 9.56602 14.9082 9.40768 14.7582C9.25768 14.5999 9.16602 14.3832 9.16602 14.1666C9.16602 14.0582 9.19102 13.9499 9.23268 13.8499C9.27435 13.7416 9.33268 13.65 9.40768 13.575C9.71602 13.2667 10.2827 13.2667 10.591 13.575C10.666 13.65 10.7243 13.7416 10.766 13.8499C10.8077 13.9499 10.8327 14.0582 10.8327 14.1666C10.8327 14.3832 10.741 14.5999 10.591 14.7582C10.4327 14.9082 10.216 14.9999 9.99935 14.9999Z" fill="#64748B" />
            <path d="M12.9173 15.0004C12.7007 15.0004 12.484 14.9087 12.3257 14.7587C12.2507 14.6837 12.1923 14.5921 12.1507 14.4837C12.109 14.3837 12.084 14.2754 12.084 14.1671C12.084 14.0587 12.109 13.9504 12.1507 13.8504C12.1923 13.7421 12.2507 13.6504 12.3257 13.5754C12.5173 13.3837 12.809 13.2921 13.0757 13.3504C13.134 13.3587 13.184 13.3754 13.234 13.4004C13.284 13.4171 13.334 13.4421 13.384 13.4754C13.4257 13.5004 13.4673 13.5421 13.509 13.5754C13.659 13.7337 13.7507 13.9504 13.7507 14.1671C13.7507 14.3837 13.659 14.6004 13.509 14.7587C13.3507 14.9087 13.134 15.0004 12.9173 15.0004Z" fill="#64748B" />
            <path d="M17.0827 8.2002H2.91602C2.57435 8.2002 2.29102 7.91686 2.29102 7.5752C2.29102 7.23353 2.57435 6.9502 2.91602 6.9502H17.0827C17.4243 6.9502 17.7077 7.23353 17.7077 7.5752C17.7077 7.91686 17.4243 8.2002 17.0827 8.2002Z" fill="#64748B" />
            <path d="M13.3333 18.9587H6.66667C3.625 18.9587 1.875 17.2087 1.875 14.167V7.08366C1.875 4.04199 3.625 2.29199 6.66667 2.29199H13.3333C16.375 2.29199 18.125 4.04199 18.125 7.08366V14.167C18.125 17.2087 16.375 18.9587 13.3333 18.9587ZM6.66667 3.54199C4.28333 3.54199 3.125 4.70033 3.125 7.08366V14.167C3.125 16.5503 4.28333 17.7087 6.66667 17.7087H13.3333C15.7167 17.7087 16.875 16.5503 16.875 14.167V7.08366C16.875 4.70033 15.7167 3.54199 13.3333 3.54199H6.66667Z" fill="#64748B" />
          </svg>
          <h1 className="text-xl font-bold text-[#1D2939]">Calendars Tool</h1>
        </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPhase("planner")}
              className="cursor-pointer flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] border border-[#DBEAFE] px-3 py-1.5 rounded-lg hover:bg-[#DBEAFE] transition-all"
            >
              <CalendarDays size={14} className="shrink-0" />
              <span>View Calendar</span>
            </button>
          </div>
        </div>
        <UploadView onComplete={() => setPhase("planner")} />
        {renderResetModal()}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 px-5 py-6">
      <div className="flex items-center justify-between w-full bg-white border border-gray-200 rounded px-5 py-4">
        <div className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6.66602 4.79199C6.32435 4.79199 6.04102 4.50866 6.04102 4.16699V1.66699C6.04102 1.32533 6.32435 1.04199 6.66602 1.04199C7.00768 1.04199 7.29102 1.32533 7.29102 1.66699V4.16699C7.29102 4.50866 7.00768 4.79199 6.66602 4.79199Z" fill="#64748B" />
            <path d="M13.334 4.79199C12.9923 4.79199 12.709 4.50866 12.709 4.16699V1.66699C12.709 1.32533 12.9923 1.04199 13.334 1.04199C13.6757 1.04199 13.959 1.32533 13.959 1.66699V4.16699C13.959 4.50866 13.6757 4.79199 13.334 4.79199Z" fill="#64748B" />
            <path d="M7.08333 12.0839C6.975 12.0839 6.86667 12.0589 6.76667 12.0172C6.65833 11.9756 6.575 11.9172 6.49167 11.8422C6.34167 11.6839 6.25 11.4756 6.25 11.2506C6.25 11.1422 6.275 11.0339 6.31667 10.9339C6.35833 10.8339 6.41667 10.7422 6.49167 10.6589C6.575 10.5839 6.65833 10.5256 6.76667 10.4839C7.06667 10.3589 7.44167 10.4256 7.675 10.6589C7.825 10.8172 7.91667 11.0339 7.91667 11.2506C7.91667 11.3006 7.90833 11.3589 7.9 11.4172C7.89167 11.4672 7.875 11.5172 7.85 11.5672C7.83333 11.6172 7.80833 11.6672 7.775 11.7172C7.75 11.7589 7.70833 11.8006 7.675 11.8422C7.51667 11.9922 7.3 12.0839 7.08333 12.0839Z" fill="#64748B" />
            <path d="M9.99935 12.0837C9.89102 12.0837 9.78268 12.0587 9.68268 12.017C9.57435 11.9754 9.49102 11.917 9.40768 11.842C9.25768 11.6837 9.16602 11.4754 9.16602 11.2504C9.16602 11.142 9.19102 11.0337 9.23268 10.9337C9.27435 10.8337 9.33268 10.742 9.40768 10.6587C9.49102 10.5837 9.57435 10.5254 9.68268 10.4837C9.98268 10.3504 10.3577 10.4254 10.591 10.6587C10.741 10.817 10.8327 11.0337 10.8327 11.2504C10.8327 11.3004 10.8243 11.3587 10.816 11.417C10.8077 11.467 10.791 11.517 10.766 11.567C10.7493 11.617 10.7243 11.667 10.691 11.717C10.666 11.7587 10.6243 11.8004 10.591 11.842C10.4327 11.992 10.216 12.0837 9.99935 12.0837Z" fill="#64748B" />
            <path d="M12.9173 12.0837C12.809 12.0837 12.7007 12.0587 12.6007 12.017C12.4923 11.9754 12.409 11.917 12.3257 11.842C12.2923 11.8004 12.259 11.7587 12.2257 11.717C12.1923 11.667 12.1673 11.617 12.1507 11.567C12.1257 11.517 12.109 11.467 12.1007 11.417C12.0923 11.3587 12.084 11.3004 12.084 11.2504C12.084 11.0337 12.1757 10.817 12.3257 10.6587C12.409 10.5837 12.4923 10.5254 12.6007 10.4837C12.909 10.3504 13.2757 10.4254 13.509 10.6587C13.659 10.817 13.7507 11.0337 13.7507 11.2504C13.7507 11.3004 13.7423 11.3587 13.734 11.417C13.7257 11.467 13.709 11.517 13.684 11.567C13.6673 11.617 13.6423 11.667 13.609 11.717C13.584 11.7587 13.5423 11.8004 13.509 11.842C13.3507 11.992 13.134 12.0837 12.9173 12.0837Z" fill="#64748B" />
            <path d="M7.08333 14.9999C6.975 14.9999 6.86667 14.975 6.76667 14.9333C6.66667 14.8917 6.575 14.8332 6.49167 14.7582C6.34167 14.5999 6.25 14.3832 6.25 14.1666C6.25 14.0582 6.275 13.9499 6.31667 13.8499C6.35833 13.7416 6.41667 13.65 6.49167 13.575C6.8 13.2667 7.36667 13.2667 7.675 13.575C7.825 13.7333 7.91667 13.9499 7.91667 14.1666C7.91667 14.3832 7.825 14.5999 7.675 14.7582C7.51667 14.9082 7.3 14.9999 7.08333 14.9999Z" fill="#64748B" />
            <path d="M9.99935 14.9999C9.78268 14.9999 9.56602 14.9082 9.40768 14.7582C9.25768 14.5999 9.16602 14.3832 9.16602 14.1666C9.16602 14.0582 9.19102 13.9499 9.23268 13.8499C9.27435 13.7416 9.33268 13.65 9.40768 13.575C9.71602 13.2667 10.2827 13.2667 10.591 13.575C10.666 13.65 10.7243 13.7416 10.766 13.8499C10.8077 13.9499 10.8327 14.0582 10.8327 14.1666C10.8327 14.3832 10.741 14.5999 10.591 14.7582C10.4327 14.9082 10.216 14.9999 9.99935 14.9999Z" fill="#64748B" />
            <path d="M12.9173 15.0004C12.7007 15.0004 12.484 14.9087 12.3257 14.7587C12.2507 14.6837 12.1923 14.5921 12.1507 14.4837C12.109 14.3837 12.084 14.2754 12.084 14.1671C12.084 14.0587 12.109 13.9504 12.1507 13.8504C12.1923 13.7421 12.2507 13.6504 12.3257 13.5754C12.5173 13.3837 12.809 13.2921 13.0757 13.3504C13.134 13.3587 13.184 13.3754 13.234 13.4004C13.284 13.4171 13.334 13.4421 13.384 13.4754C13.4257 13.5004 13.4673 13.5421 13.509 13.5754C13.659 13.7337 13.7507 13.9504 13.7507 14.1671C13.7507 14.3837 13.659 14.6004 13.509 14.7587C13.3507 14.9087 13.134 15.0004 12.9173 15.0004Z" fill="#64748B" />
            <path d="M17.0827 8.2002H2.91602C2.57435 8.2002 2.29102 7.91686 2.29102 7.5752C2.29102 7.23353 2.57435 6.9502 2.91602 6.9502H17.0827C17.4243 6.9502 17.7077 7.23353 17.7077 7.5752C17.7077 7.91686 17.4243 8.2002 17.0827 8.2002Z" fill="#64748B" />
            <path d="M13.3333 18.9587H6.66667C3.625 18.9587 1.875 17.2087 1.875 14.167V7.08366C1.875 4.04199 3.625 2.29199 6.66667 2.29199H13.3333C16.375 2.29199 18.125 4.04199 18.125 7.08366V14.167C18.125 17.2087 16.375 18.9587 13.3333 18.9587ZM6.66667 3.54199C4.28333 3.54199 3.125 4.70033 3.125 7.08366V14.167C3.125 16.5503 4.28333 17.7087 6.66667 17.7087H13.3333C15.7167 17.7087 16.875 16.5503 16.875 14.167V7.08366C16.875 4.70033 15.7167 3.54199 13.3333 3.54199H6.66667Z" fill="#64748B" />
          </svg>
          <h1 className="text-xl font-bold text-[#1D2939]">Calendars Tool</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPhase("upload")}
            className="cursor-pointer shadow flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] px-3 py-1.5 rounded-lg hover:bg-[#DBEAFE] transition-all"
          >
            <Upload size={14} className="shrink-0" />
            <span>Upload Syllabus</span>
          </button>
          <button
            onClick={() => setIsResetModalOpen(true)}
            disabled={isClearing}
            className="cursor-pointer shadow flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] bg-[#FEF2F2] px-3 py-1.5 rounded-lg hover:bg-[#FEE2E2] transition-all disabled:opacity-50"
            title="Wipe all data to clean empty state"
          >
            <RotateCcw size={14} className={`shrink-0 ${isClearing ? "animate-spin" : ""}`} />
            <span>{isClearing ? "Resetting..." : "Reset Data"}</span>
          </button>
        </div>
      </div>

      <StatsBar
        coursesData={coursesData}
        eventsData={eventsData}
        gradesSummary={gradesSummary}
      />
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Main calendar */}
        <div className="w-full flex-1 min-w-0 flex flex-col gap-3">
          <CalendarView
            onUploadMore={() => setPhase("upload")}
            coursesData={coursesData}
            eventsData={eventsData}
            gradesSummary={gradesSummary}
            courseFilter={courseFilter}
            onCourseFilterChange={setCourseFilter}
          />
        </div>
        {/* Right sidebar */}
        <RightSidebar
          onUploadMore={() => setPhase("upload")}
          coursesData={coursesData}
          eventsData={eventsData}
        />
      </div>
      {renderResetModal()}
    </div>
  );
};
export default CalendarsToolsShell;