"use client";
import { useState } from "react";
import { EVENTS, TYPE_COLORS, COURSES } from "./demo-data";

// Pre-filled grades for demo
const INITIAL_GRADES = {
  e1:  { earned: "4"  },  // Patient Assessment Lab   50 pts
  e3:  { earned: "22" },  // Drug Classification Quiz  25 pts  → 88%
  e6:  { earned: "18" },  // Nursing Process Quiz       20 pts  → 90%
  e12: { earned: "2"  },  // Midterm Exam             100 pts
  e17: { earned: "7"  },  // Care Plan Reflection       40 pts
  e13: { earned: ""   },  // Pharmacology Midterm
  e5:  { earned: "0"  },  // Clinical Skills Check-off
};

const GRADE_LETTER = (pct) => {
  if (pct === null) return null;
  if (pct >= 93) return "A";
  if (pct >= 90) return "A-";
  if (pct >= 87) return "B+";
  if (pct >= 83) return "B";
  if (pct >= 80) return "B-";
  if (pct >= 77) return "C+";
  if (pct >= 73) return "C";
  if (pct >= 70) return "C-";
  if (pct >= 67) return "D+";
  if (pct >= 60) return "D";
  return "F";
};

const GRADE_COLOR = (letter) => {
  if (!letter) return "#9CA3AF";
  if (letter.startsWith("A")) return "#10B981";
  if (letter.startsWith("B")) return "#3B82F6";
  if (letter.startsWith("C")) return "#F59E0B";
  return "#EF4444";
};

const INSTRUCTORS = {
  "NUR 201": { instructor: "Dr. Sandra Mills", credits: "3 credits" },
  "NUR 310": { instructor: "Prof. James Chen",  credits: "3 credits" },
  "NUR 315": { instructor: "Dr. Maria Torres",  credits: "4 credits" },
  "BIO 220": { instructor: "Dr. Karen White",   credits: "3 credits" },
  "NUR 320": { instructor: "Dr. Lena Foster",   credits: "3 credits" },
};

function CourseBlock({ course, events }) {
  const [grades, setGrades] = useState(() => {
    const init = {};
    events.forEach(ev => {
      init[ev.id] = INITIAL_GRADES[ev.id]?.earned ?? "";
    });
    return init;
  });
  const [saved, setSaved] = useState({});

  const handleSave = (id) => setSaved(prev => ({ ...prev, [id]: true }));
  const handleChange = (id, val) => {
    setGrades(prev => ({ ...prev, [id]: val }));
    setSaved(prev => ({ ...prev, [id]: false }));
  };

  // Calculate course totals
  const gradedEvents = events.filter(ev => grades[ev.id] !== "" && !isNaN(Number(grades[ev.id])));
  const earnedTotal = gradedEvents.reduce((s, ev) => s + Number(grades[ev.id]), 0);
  const possibleTotal = gradedEvents.reduce((s, ev) => s + ev.pts, 0);
  const pct = possibleTotal > 0 ? Math.round((earnedTotal / possibleTotal) * 100) : null;
  const letter = GRADE_LETTER(pct);
  const letterColor = GRADE_COLOR(letter);
  const hasAnyGrade = gradedEvents.length > 0;

  const meta = INSTRUCTORS[course.name] ?? { instructor: "TBD", credits: "3 credits" };

  return (
    <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-sm"
      style={{ borderLeft: `4px solid ${course.color}` }}>

      {/* Course header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#F2F4F7]">
        <div>
          <p className="text-sm font-bold text-[#1D2939]">{course.name} — {course.label}</p>
          <p className="text-xs text-[#667085] mt-0.5">{meta.instructor} · {meta.credits}</p>
        </div>
        <div className="flex items-center gap-3">
          {hasAnyGrade ? (
            <>
              <div className="text-right">
                <p className="text-lg font-extrabold text-[#1D2939]">{pct}%</p>
                <p className="text-[10px] text-[#9CA3AF]">{earnedTotal}/{possibleTotal} pts</p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-extrabold"
                style={{ borderColor: letterColor, color: letterColor }}>
                {letter}
              </div>
            </>
          ) : (
            <span className="text-xs text-[#9CA3AF] font-medium">No grades yet</span>
          )}
        </div>
      </div>

      {/* Assignment rows */}
      <div className="divide-y divide-[#F9FAFB]">
        {events.map(ev => {
          const colors = TYPE_COLORS[ev.type] ?? TYPE_COLORS.assignment;
          const val = grades[ev.id];
          const earned = val !== "" && !isNaN(Number(val)) ? Number(val) : null;
          const rowPct = earned !== null ? Math.round((earned / ev.pts) * 100) : null;
          const rowPctColor = rowPct === null ? "#9CA3AF" : rowPct >= 80 ? "#10B981" : rowPct >= 70 ? "#F59E0B" : "#EF4444";
          const isSaved = saved[ev.id];

          return (
            <div key={ev.id} className="grid grid-cols-[2fr_1fr_auto_auto_auto] items-center gap-3 px-5 py-3 hover:bg-[#F9FAFB] transition-all">
              {/* Name + badge */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border shrink-0"
                  style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}>
                  {ev.type}
                </span>
                <p className="text-xs font-semibold text-[#1D2939] truncate">{ev.title}</p>
              </div>

              {/* Pts possible */}
              <p className="text-xs text-[#9CA3AF] text-right">{ev.pts} pts possible</p>

              {/* Grade input */}
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={val}
                  onChange={e => handleChange(ev.id, e.target.value)}
                  placeholder="–"
                  min={0} max={ev.pts}
                  className="w-14 border border-[#D0D5DD] rounded-lg px-2 py-1.5 text-xs text-center font-semibold text-[#1D2939] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
                <span className="text-xs text-[#9CA3AF]">/ {ev.pts}</span>
              </div>

              {/* Row percentage */}
              <p className="text-xs font-bold w-10 text-right" style={{ color: rowPctColor }}>
                {rowPct !== null ? `${rowPct}%` : ""}
              </p>

              {/* Save button (show when has value but not saved) */}
              {val !== "" && !isSaved ? (
                <button
                  onClick={() => handleSave(ev.id)}
                  className="px-3 py-1.5 bg-[#1D2939] text-white text-[10px] font-bold rounded-lg hover:bg-[#2D3A4A] transition-all"
                >
                  Save
                </button>
              ) : (
                <div className="w-[46px]"/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GradesView() {
  // Build course→events map from static import
  const courseMap = {};
  COURSES.forEach(c => { courseMap[c.name] = []; });
  EVENTS.forEach(ev => {
    if (courseMap[ev.course]) courseMap[ev.course].push(ev);
  });

  return (
    <div className="flex flex-col gap-4">
      {COURSES.map(course => (
        <CourseBlock
          key={course.id}
          course={course}
          events={courseMap[course.name] ?? []}
        />
      ))}
    </div>
  );
}
