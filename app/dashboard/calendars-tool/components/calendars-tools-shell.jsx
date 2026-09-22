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
          <h1 className="text-xl font-bold text-[#1D2939]">Calendars Tool</h1>
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
        <h1 className="text-xl font-bold text-[#1D2939]">Calendars Tool</h1>
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