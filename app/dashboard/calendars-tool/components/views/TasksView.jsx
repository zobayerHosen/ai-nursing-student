"use client";
import { useState } from "react";
import { Pencil, CheckCircle2, Circle } from "lucide-react";
import { EVENTS, TYPE_COLORS, COURSE_COLOR, COURSES } from "./demo-data";

const now = new Date();
const daysLeft = (ev) => Math.ceil((ev.start - now) / 86400000);

const MOCK_GRADES = {
  e2:  { earned: 10, total: 10 },
  e3:  { earned: 22, total: 25 },
  e6:  { earned: 18, total: 20 },
};

function pct(earned, total) {
  return Math.round((earned / total) * 100);
}

export default function   TasksView() {
  const [done, setDone] = useState({ e1: true, e3: true, e6: true });

  const sorted = [...EVENTS].sort((a, b) => a.start - b.start);

  const toggle = (id) => setDone(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-sm">
      {/* Table header */}
      <div className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.7fr_1fr_auto] gap-2 px-5 py-3 border-b border-[#F2F4F7] bg-[#F9FAFB]">
        {["ASSIGNMENT","COURSE","DUE","POINTS","GRADE",""].map((h,i) => (
          <p key={i} className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">{h}</p>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#F2F4F7]">
        {sorted.map(ev => {
          const dl = daysLeft(ev);
          const isDone = !!done[ev.id];
          const colors = TYPE_COLORS[ev.type] ?? TYPE_COLORS.assignment;
          const courseColor = COURSE_COLOR(ev.course);
          const grade = MOCK_GRADES[ev.id];
          const dlColor = dl <= 1 ? "#EF4444" : dl <= 3 ? "#F59E0B" : dl <= 7 ? "#10B981" : "#6B7280";

          return (
            <div
              key={ev.id}
              className={`grid grid-cols-[1.8fr_0.8fr_0.7fr_0.7fr_1fr_auto] gap-2 items-center px-5 py-3 hover:bg-[#F9FAFB] transition-all ${isDone ? "opacity-60" : ""}`}
            >
              {/* Assignment */}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <button onClick={() => toggle(ev.id)} className="shrink-0 text-[#D0D5DD] hover:text-[#10B981] transition-colors">
                    {isDone
                      ? <CheckCircle2 size={16} className="text-[#10B981]"/>
                      : <Circle size={16}/>
                    }
                  </button>
                  <p className={`text-xs font-semibold text-[#1D2939] truncate ${isDone ? "line-through text-[#9CA3AF]" : ""}`}>
                    {ev.title}
                  </p>
                </div>
                <div className="pl-6">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
                    style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}>
                    {ev.type}
                  </span>
                </div>
              </div>

              {/* Course */}
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: courseColor }}/>
                <span className="text-xs font-semibold text-[#374151]">{ev.course}</span>
              </div>

              {/* Due */}
              <div>
                <p className="text-xs font-semibold text-[#374151]">
                  {ev.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
                <p className="text-[10px] font-semibold" style={{ color: dlColor }}>
                  {dl <= 0 ? "Today" : `${dl}d left`}
                </p>
              </div>

              {/* Points */}
              <p className="text-xs font-semibold text-[#374151]">{ev.pts} pts</p>

              {/* Grade */}
              <div>
                {grade ? (
                  <span className="text-xs font-bold" style={{ color: pct(grade.earned, grade.total) >= 80 ? "#10B981" : "#F59E0B" }}>
                    {grade.earned}/{grade.total} = {pct(grade.earned, grade.total)}%
                  </span>
                ) : (
                  <span className="text-xs text-[#D0D5DD]">–</span>
                )}
              </div>

              {/* Edit */}
              <button className="text-[#D0D5DD] hover:text-[#3B82F6] transition-colors">
                <Pencil size={13}/>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
