"use client";
import { COURSES, TYPE_COLORS, COURSE_COLOR, EVENTS } from "./demo-data";
import { Clock, BookOpen } from "lucide-react";

const now = new Date();
const daysLeft = (ev) => Math.ceil((ev.start - now) / 86400000);

const TYPE_LABEL = { lab:"lab", quiz:"quiz", exam:"exam", assignment:"assignment", reading:"reading" };

export default function RightSidebar({ onUploadMore }) {
  const upcoming = [...EVENTS]
    .filter(e => e.start >= now)
    .sort((a,b) => a.start - b.start)
    .slice(0, 7);

  return (
    <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
      {/* My Courses */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-[#1D2939]">My Courses</p>
          <span className="text-xs text-[#667085]">5 courses</span>
        </div>
        <div className="flex flex-col gap-2">
          {COURSES.map(c => (
            <div key={c.id} className="flex items-center justify-between py-1.5">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{backgroundColor:c.color}}/>
                <div>
                  <p className="text-xs font-bold text-[#1D2939]">{c.name}</p>
                  <p className="text-[10px] text-[#9CA3AF]">{c.done} done</p>
                </div>
              </div>
              {c.grade && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]">
                  {c.grade}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={13} className="text-[#EF4444]"/>
          <p className="text-sm font-bold text-[#1D2939]">Upcoming Deadlines</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {upcoming.map(ev => {
            const dl = daysLeft(ev);
            const col = dl <= 1 ? "#EF4444" : dl <= 3 ? "#F59E0B" : dl <= 7 ? "#10B981" : "#6B7280";
            const courseColor = COURSE_COLOR(ev.course);
            return (
              <div key={ev.id} className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#1D2939] truncate">{ev.title}</p>
                  <p className="text-[10px] text-[#667085] flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0" style={{backgroundColor:courseColor}}/>
                    {ev.course} · {ev.pts} pts
                  </p>
                </div>
                <span className="text-[10px] font-bold shrink-0" style={{color:col}}>
                  {dl <= 0 ? "Today" : `${dl}d`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Course */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={13} className="text-[#3B82F6]"/>
          <p className="text-sm font-bold text-[#1D2939]">Add Course</p>
        </div>
        <p className="text-[11px] text-[#667085] mb-3">Upload another syllabus to add a new course.</p>
        <button
          onClick={onUploadMore}
          className="w-full border border-[#D0D5DD] text-[#344054] text-xs font-semibold rounded-xl py-2 hover:bg-[#F9FAFB] transition-all flex items-center justify-center gap-1.5"
        >
          ⬆ Upload Syllabus
        </button>
      </div>
    </div>
  );
}
