"use client";
import { useState } from "react";
import { GraduationCap, CheckCircle2, Clock, BookOpen, CalendarDays, Upload, RotateCcw } from "lucide-react";
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
  const [phase, setPhase] = useState("upload"); // "upload" | "planner"
  const [courseFilter, setCourseFilter] = useState("all");

  const { coursesData, isCoursesLoading } = useCalendarCourses();
  console.log("Course data", coursesData);

  const { eventsData, isEventsLoading } = useCalendarEvents(courseFilter);
  console.log("Event data", eventsData);


  const { gradesSummary, isGradesLoading } = useGradesSummary();
  const { clearAllData, isClearing } = useClearAllData();

  const handleResetData = async () => {
    if (confirm("Are you sure you want to clear all courses, syllabi, and events? This will return the calendar to a clean empty state.")) {
      await clearAllData();
    }
  };

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
            onClick={handleResetData}
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
    </div>
  );
};
export default CalendarsToolsShell;