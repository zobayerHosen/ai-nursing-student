"use client";
import { useState, useEffect } from "react";
import { useSaveEventGrade } from "@/hooks/calendars-planner";

const TYPE_COLORS = {
  lecture: { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  class: { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  lab: { bg: "#E6FBF2", text: "#059669", border: "#A7F3D0" },
  clinical: { bg: "#E6FBF2", text: "#059669", border: "#A7F3D0" },
  "check-off": { bg: "#E6FBF2", text: "#059669", border: "#A7F3D0" },
  quiz: { bg: "#F5F3FF", text: "#7C3AED", border: "#DDD6FE" },
  exam: { bg: "#FEF2F2", text: "#EF4444", border: "#FECACA" },
  assignment: { bg: "#FFFBEB", text: "#D97706", border: "#FDE68A" },
  project: { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  reading: { bg: "#F5F3FF", text: "#7C3AED", border: "#DDD6FE" },
};

const THEME_MAP = {
  blue: { main: "#1E40AF", bg: "#EFF6FF", text: "#1E40AF" },
  purple: { main: "#7C3AED", bg: "#F5F3FF", text: "#7C3AED" },
  green: { main: "#10B981", bg: "#ECFDF5", text: "#065F46" },
  amber: { main: "#D97706", bg: "#FFFBEB", text: "#B45309" },
  red: { main: "#EF4444", bg: "#FEF2F2", text: "#DC2626" },
  sky: { main: "#0284C7", bg: "#F0F9FF", text: "#0369A1" },
  pink: { main: "#DB2777", bg: "#FDF2F8", text: "#BE185D" },
  teal: { main: "#0D9488", bg: "#F0FDFA", text: "#0F766E" },
};

const THEMES_LIST = Object.values(THEME_MAP);

function getCourseTheme(colorTheme, index) {
  if (colorTheme && THEME_MAP[colorTheme.toLowerCase()]) {
    return THEME_MAP[colorTheme.toLowerCase()];
  }
  return THEMES_LIST[index % THEMES_LIST.length];
}

function AssignmentRow({ item, onSaveGrade }) {
  const isGraded = item.grade_earned !== null && item.grade_earned !== undefined;
  const [gradeVal, setGradeVal] = useState(isGraded ? String(item.grade_earned) : "");
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const graded = item.grade_earned !== null && item.grade_earned !== undefined;
    setGradeVal(graded ? String(item.grade_earned) : "");
    setIsDirty(false);
  }, [item.grade_earned]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveGrade(item.id, gradeVal);
      setIsDirty(false);
    } catch (err) {
      console.error("Error saving grade:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const colors = TYPE_COLORS[(item.category || "").toLowerCase()] ?? {
    bg: "#F1F5F9",
    text: "#475569",
    border: "#E2E8F0",
  };

  const rowPct =
    isGraded && item.points > 0
      ? Math.round((item.grade_earned / item.points) * 100)
      : null;

  return (
    <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#F2F4F7] last:border-b-0 hover:bg-[#F9FAFB]/50 transition-colors">
      {/* Left side: Badge + Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
        <span
          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md border shrink-0 lowercase tracking-wide"
          style={{
            backgroundColor: colors.bg,
            color: colors.text,
            borderColor: colors.border,
          }}
        >
          {item.category || "task"}
        </span>
        <p className="text-sm font-medium text-[#1D2939] truncate">
          {item.title || "Untitled"}
        </p>
      </div>

      {/* Right side: Points possible + input / total + Pct / Save */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-[#667085] text-right min-w-18.75 max-w-21.25 leading-tight">
          {item.points || 0} pts possible
        </span>

        <div className="flex items-center gap-2">
          <input
            type="number"
            step="any"
            min={0}
            value={gradeVal}
            placeholder="–"
            onChange={(e) => {
              const val = e.target.value;
              setGradeVal(val);
              const original = isGraded ? String(item.grade_earned) : "";
              setIsDirty(val !== original);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            className="w-16 h-8 border border-[#D0D5DD] rounded-full text-center text-xs font-semibold text-[#1D2939] placeholder-[#9CA3AF] bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <span className="text-xs text-[#667085] min-w-8">
            / {item.points || 0}
          </span>
        </div>

        <div className="w-16 flex justify-end">
          {isDirty ? (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="cursor-pointer px-3.5 py-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold rounded-lg shadow-sm transition-all disabled:opacity-50"
            >
              {isSaving ? "..." : "Save"}
            </button>
          ) : isGraded ? (
            <span className="text-xs font-bold text-[#10B981]">
              {rowPct}%
            </span>
          ) : (
            <div className="w-4" />
          )}
        </div>
      </div>
    </div>
  );
}

function CourseGradeCard({ course, courseInfo, index }) {
  const { saveGrade } = useSaveEventGrade();

  // Color theme from API response
  const theme = getCourseTheme(courseInfo?.color_theme, index);

  // Instructor and Credits from API response
  const instructor = courseInfo?.instructor?.trim();
  const credits = courseInfo?.credits ?? course.credits;
  const creditsStr = credits !== undefined && credits !== null ? `${Number(credits)} credits` : "";
  const subtitle = [instructor, creditsStr].filter(Boolean).join(" · ") || (creditsStr || "");

  // Graded points calculation from items
  const items = course.items || [];
  const gradedItems = items.filter(
    (it) => it.grade_earned !== null && it.grade_earned !== undefined
  );
  const earnedPts = gradedItems.reduce((acc, it) => acc + Number(it.grade_earned || 0), 0);
  const gradedTotalPts = gradedItems.reduce((acc, it) => acc + Number(it.points || 0), 0);
  const allTotalPts = items.reduce((acc, it) => acc + Number(it.points || 0), 0);
  const totalPts = gradedTotalPts > 0 ? gradedTotalPts : allTotalPts;

  // Grade percentage & letter grade directly from API response
  const pct = courseInfo?.current_percentage ?? course.percentage;
  const percentageDisplay = pct !== null && pct !== undefined ? `${Math.round(pct)}%` : "--%";
  const letterGradeDisplay = courseInfo?.current_letter_grade || course.letter_grade || "--";

  const handleGradeChange = async (itemId, valStr) => {
    const val = valStr.trim() === "" ? null : parseFloat(valStr);
    if (val !== null && isNaN(val)) {
      alert("Please enter a valid numeric score.");
      return;
    }
    await saveGrade({ eventId: itemId, grade_earned: val, mark_completed: val !== null });
  };

  return (
    <div className="relative bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-xs">
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-5 w-1 h-10 rounded-r-full"
        style={{ backgroundColor: theme.main }}
      />

      {/* Course header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#F2F4F7]">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[#1D2939] leading-snug">
            {courseInfo?.code || course.course_code} — {courseInfo?.name || course.course_name}
          </h3>
          {subtitle && (
            <p className="text-xs text-[#667085] mt-0.5 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* Header Right: Percentage + Pts + Letter Grade Circle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-right">
            <p
              className="text-xl sm:text-2xl font-extrabold leading-none tracking-tight"
              style={{ color: theme.main }}
            >
              {percentageDisplay}
            </p>
            <p className="text-[11px] text-[#667085] mt-1 font-medium">
              {earnedPts}/{totalPts} pts
            </p>
          </div>
          <div
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0"
            style={{
              backgroundColor: theme.bg,
              color: theme.text,
            }}
          >
            {letterGradeDisplay}
          </div>
        </div>
      </div>

      {/* Assignment rows */}
      <div>
        {items.length === 0 ? (
          <div className="px-6 py-4 text-xs text-[#667085]">
            No assignments in this course yet.
          </div>
        ) : (
          items.map((item) => (
            <AssignmentRow
              key={item.id}
              item={item}
              onSaveGrade={handleGradeChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function GradesView({ coursesData = [], gradesSummary, onUploadMore }) {
  if (!gradesSummary || coursesData.length === 0) {
    return (
      <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-sm">
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <p className="text-3xl">📊</p>
          <p className="text-sm font-bold text-[#1D2939]">No courses or grades recorded yet</p>
          <p className="text-xs text-[#667085] text-center max-w-sm">
            Upload course documents to begin tracking your assignments, calculating grades, and predicting your overall CGPA.
          </p>
          {onUploadMore && (
            <button
              onClick={onUploadMore}
              className="mt-3 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all"
            >
              Upload Syllabus
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {gradesSummary.courses.map((course, idx) => {
        const courseInfo = coursesData.find(
          (c) => c.id === course.course_id || c.code === course.course_code
        );
        return (
          <CourseGradeCard
            key={course.course_id || course.course_code}
            course={course}
            courseInfo={courseInfo}
            index={idx}
          />
        );
      })}
    </div>
  );
}
