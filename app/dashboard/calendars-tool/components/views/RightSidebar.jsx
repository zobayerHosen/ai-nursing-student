"use client";
import { Clock, BookOpen } from "lucide-react";

const COURSE_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#0EA5E9", "#EC4899", "#14B8A6"];

function cleanValue(val) {
  if (!val) return "";
  const upper = val.trim().toUpperCase();
  if (upper === "UNKNOWN" || upper === "N/A") return "";
  return val.trim();
}

export default function RightSidebar({ onUploadMore, coursesData = [], eventsData = [] }) {
  // Upcoming deadlines (not past, not class type)
  const upcoming = eventsData
    .filter((e) => e.days_left !== "Past" && e.category !== "class")
    .slice(0, 6);

  const getUrgencyColor = (daysLeft) => {
    if (daysLeft === "Today") return "#EF4444";
    if (daysLeft === "1d" || daysLeft === "2d") return "#EF4444";
    if (daysLeft === "3d" || daysLeft === "4d" || daysLeft === "5d" || daysLeft === "6d") return "#F59E0B";
    return "#6B7280";
  };

  return (
    <div className="w-full lg:w-70 shrink-0 flex flex-col gap-4">
      {/* My Courses */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-[#1D2939]">My Courses</p>
          <span className="text-xs text-[#667085]">
            {coursesData.length} course{coursesData.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {coursesData.length === 0 ? (
            <div className="text-xs text-[#667085] py-3">
              No courses added yet.<br />
              Upload a syllabus to add your first course.
            </div>
          ) : (
            coursesData.map((c, i) => {
              let code = cleanValue(c.code) || "Course";
              let instructor = cleanValue(c.instructor);
              const profInfo = instructor ? `${instructor} • ` : "";
              const color = COURSE_COLORS[i % COURSE_COLORS.length];

              return (
                <div
                  key={c.id || c.code}
                  className="flex items-center justify-between py-1.5"
                  title={`${c.name || ""}${instructor ? `\nInstructor: ${instructor}` : ""}${c.room ? `\nOffice: ${c.room}` : ""}${c.email ? `\nEmail: ${c.email}` : ""}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <p className="text-xs font-bold text-[#1D2939]">{code}</p>
                      <p className="text-[10px] text-[#9CA3AF]">
                        {profInfo}{c.progress || "0/0 done"}
                      </p>
                    </div>
                  </div>
                  {(c.current_letter_grade || c.grade) && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-[#F0F9FF] text-[#0369A1] border border-[#BAE6FD]">
                      {c.current_letter_grade || c.grade}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={13} className="text-[#EF4444]" />
          <p className="text-sm font-bold text-[#1D2939]">Upcoming Deadlines</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {upcoming.length === 0 ? (
            <div className="text-xs text-[#667085] py-3">No upcoming deadlines.</div>
          ) : (
            upcoming.map((d) => {
              const urgencyColor = getUrgencyColor(d.days_left);
              return (
                <div key={d.id} className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1D2939] truncate">{d.title}</p>
                    <p className="text-[10px] text-[#667085] mt-0.5">
                      • {d.course_code || "Personal"} - {d.points || 0} pts
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-lg"
                    style={{
                      color: urgencyColor,
                      backgroundColor: urgencyColor + "18",
                    }}
                  >
                    {d.days_left || "1d"}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add Course */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={13} className="text-[#3B82F6]" />
          <p className="text-sm font-bold text-[#1D2939]">Add Course</p>
        </div>
        <p className="text-[11px] text-[#667085] mb-3">
          Upload another syllabus to add a new course.
        </p>
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
