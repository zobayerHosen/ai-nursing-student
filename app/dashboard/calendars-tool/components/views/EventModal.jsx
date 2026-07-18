"use client";
import { X, MapPin, Clock, User, Mail, BookOpen } from "lucide-react";
import { COURSES, TYPE_COLORS, COURSE_COLOR } from "./demo-data";

const TYPE_LABEL = { lab:"Lab", quiz:"Quiz", exam:"Exam", assignment:"Assignment", reading:"Reading" };

export default function EventModal({ event, onClose, onMarkIncomplete }) {
  if (!event) return null;
  const now = new Date();
  const daysLeft = Math.ceil((event.start - now) / 86400000);
  const colors = TYPE_COLORS[event.type] ?? TYPE_COLORS.assignment;
  const courseColor = COURSE_COLOR(event.course);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-[#F2F4F7] flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5"
              style={{backgroundColor: courseColor}}>
              {event.type === "lab" ? "🧪" : event.type === "exam" ? "📝" : event.type === "quiz" ? "❓" : "📋"}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1D2939] leading-tight">{event.title}</h3>
              <p className="text-xs text-[#667085] mt-0.5">{event.course} · {COURSES.find(c=>c.name===event.course)?.label}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#374151] transition-colors shrink-0">
            <X size={18}/>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Due date + Points row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FAFC] rounded-xl p-3.5 flex flex-col gap-1">
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Due Date</p>
              <p className="text-sm font-bold text-[#1D2939]">
                {event.start.toLocaleDateString("en-US",{month:"long",day:"numeric"})}
              </p>
              <p className={`text-xs font-semibold ${daysLeft <= 1 ? "text-[#EF4444]" : daysLeft <= 3 ? "text-[#F59E0B]" : "text-[#10B981]"}`}>
                {daysLeft <= 0 ? "Due today" : `${daysLeft} days left`}
              </p>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-3.5 flex flex-col gap-1">
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">Points</p>
              <p className="text-sm font-bold text-[#1D2939]">{event.pts} pts</p>
              <p className="text-xs text-[#667085]">
                {event.pts <= 25 ? "4 earned • 8%" : event.pts <= 50 ? "45 earned • 15%" : "68 earned • 22%"}
              </p>
            </div>
          </div>

          {/* Type badge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-3 py-1 rounded-lg border"
              style={{background:colors.bg, color:colors.text, borderColor:colors.border}}>
              {TYPE_LABEL[event.type] ?? event.type}
            </span>
            <span className="text-[11px] font-medium text-[#667085]">
              {event.start.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:true})} – {event.end.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:true})}
            </span>
          </div>

          {/* Instructor */}
          {event.instructor && (
            <div className="bg-[#F8FAFC] rounded-xl p-3.5 flex flex-col gap-2">
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1">
                <User size={10}/> Instructor
              </p>
              <p className="text-sm font-bold text-[#1D2939]">{event.instructor}</p>
              {event.email && <p className="text-xs text-[#3B82F6]">{event.email}</p>}
              {event.room && (
                <p className="text-xs text-[#667085] flex items-center gap-1"><MapPin size={10}/>{event.room}</p>
              )}
            </div>
          )}

          {/* Enter grade */}
          <div>
            <label className="text-xs font-semibold text-[#374151] block mb-1.5">Enter Grade</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="4"
                className="flex-1 border border-[#D0D5DD] rounded-xl px-3 py-2 text-sm text-[#1D2939] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
              <span className="text-xs text-[#667085] self-center">/ {event.pts}</span>
              <button className="px-4 py-2 bg-[#1D2939] text-white text-sm font-semibold rounded-xl hover:bg-[#2D3A4A] transition-all">
                Save
              </button>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={onClose}
            className="w-full border border-[#E4E7EC] text-[#667085] text-sm font-semibold rounded-xl py-2.5 hover:bg-[#F9FAFB] transition-all flex items-center justify-center gap-2"
          >
            ✓ Mark Incomplete
          </button>
        </div>
      </div>
    </div>
  );
}
