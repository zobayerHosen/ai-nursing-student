"use client";
import { useState } from "react";
import { GraduationCap, CheckCircle2, Clock, BookOpen } from "lucide-react";
import UploadView from "./views/UploadView";
import CalendarView from "./views/CalendarView";
import RightSidebar from "./views/RightSidebar";
import { STATS } from "./views/demo-data";

const STAT_ICONS = [
  <GraduationCap size={22} key="g" />,
  <CheckCircle2 size={22} key="c" />,
  <Clock size={22} key="cl" />,
  <BookOpen size={22} key="b" />,
];

function StatsBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {STATS.map((s, i) => (
        <div key={i} className="bg-white border border-[#E4E7EC] rounded-2xl px-5 py-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: s.color + "1A", color: s.color }}>
            {STAT_ICONS[i]}
          </div>
          <div>
            <p className="text-xl font-extrabold leading-none" style={{ color: s.color }}>{s.value}</p>
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

  if (phase === "upload") {
    return (
      <div className="w-full flex flex-col gap-5 px-5 py-6">
        <h1 className="text-xl font-bold text-[#1D2939] w-full bg-white border border-gray-200 rounded px-5 py-4">Calendars Tool</h1>
        <UploadView onComplete={() => setPhase("planner")} />
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-5 px-5 py-6">
      <h1 className="text-xl font-bold text-[#1D2939] w-full bg-white border border-gray-200 rounded px-5 py-4">Calendars Tool</h1>
      <StatsBar />
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Main calendar */}
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          <CalendarView onUploadMore={() => setPhase("upload")} />
        </div>
        {/* Right sidebar */}
        <RightSidebar onUploadMore={() => setPhase("upload")} />
      </div>
    </div>
  );
};
export default CalendarsToolsShell;