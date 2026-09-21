"use client";
import { useState } from "react";
import { Pencil, CheckCircle2, Circle, Trash2, Search, Plus } from "lucide-react";
import EventModal from "./EventModal";
import {
  useToggleEventComplete,
  useSaveEventGrade,
  useDeleteEvent,
} from "@/hooks/calendars-planner";

const TYPE_COLORS = {
  lab: { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  clinical: { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  "check-off": { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  quiz: { bg: "#FEE2E2", text: "#B91C1C", border: "#FECACA" },
  exam: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  assignment: { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
  project: { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
  reading: { bg: "#EDE9FE", text: "#5B21B6", border: "#DDD6FE" },
};

const COURSE_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#0EA5E9", "#EC4899", "#14B8A6"];

function getCourseColor(courseCode, coursesData) {
  const idx = coursesData.findIndex(
    (c) => c.code && c.code.trim().toUpperCase() === (courseCode || "").trim().toUpperCase()
  );
  return COURSE_COLORS[idx >= 0 ? idx % COURSE_COLORS.length : 0];
}

function getTypeColors(category) {
  return TYPE_COLORS[(category || "").toLowerCase()] ?? { bg: "#F1F5F9", text: "#475569", border: "#E2E8F0" };
}

export default function TasksView({ eventsData = [], coursesData = [], onAddTask }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { toggleComplete } = useToggleEventComplete();
  const { saveGrade } = useSaveEventGrade();
  const { deleteEvent } = useDeleteEvent();

  const handleToggle = async (eventId, completed) => {
    try {
      await toggleComplete({ eventId, completed });
    } catch (err) {
      console.error("Error toggling completion:", err);
    }
  };

  const handleDelete = async (eventId) => {
    if (!confirm("Delete this manual task?")) return;
    try {
      await deleteEvent(eventId);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (eventsData.length === 0) {
    return (
      <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-sm">
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <p className="text-3xl">📋</p>
          <p className="text-sm font-bold text-[#1D2939]">No tasks available</p>
          <p className="text-xs text-[#667085] text-center max-w-sm">
            Upload a syllabus or click &quot;+ Add Task&quot; to create your academic schedule.
          </p>
          {onAddTask && (
            <button
              onClick={onAddTask}
              className="mt-3 px-5 py-2 bg-[#2563EB] text-white text-sm font-semibold rounded-xl hover:bg-[#1D4ED8] transition-all flex items-center gap-1"
            >
              <Plus size={14} /> Add Your First Task
            </button>
          )}
        </div>
      </div>
    );
  }

  const sorted = [...eventsData].sort((a, b) => {
    if (b.created_at && a.created_at && b.created_at !== a.created_at) {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    if (b.id && a.id) {
      const numA = Number(a.id);
      const numB = Number(b.id);
      if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
        return numB - numA;
      }
    }
    return (b.date || "").localeCompare(a.date || "");
  });

  return (
    <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F2F4F7]">
        <h3 className="text-sm font-bold text-[#1D2939]">All Course Tasks & Deadlines</h3>
        {onAddTask && (
          <button
            onClick={onAddTask}
            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary/90 transition-all"
          >
            <Plus size={13} /> Add Task
          </button>
        )}
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.7fr_1fr_auto] gap-2 px-5 py-3 border-b border-[#F2F4F7] bg-[#F9FAFB]">
        {["ASSIGNMENT", "COURSE", "DUE", "POINTS", "GRADE", ""].map((h, i) => (
          <p key={i} className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider">
            {h}
          </p>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#F2F4F7]">
        {sorted.map((evt) => {
          const isDone = !!evt.completed;
          const colors = getTypeColors(evt.category);
          const courseColor = getCourseColor(evt.course_code, coursesData);
          const isGraded = evt.grade_earned !== null && evt.grade_earned !== undefined;
          const scoreDisplay = isGraded ? `${evt.grade_earned}/${evt.points || 0}` : `–/${evt.points || 0}`;
          const scorePct =
            isGraded && evt.points > 0
              ? Math.round((evt.grade_earned / evt.points) * 100)
              : null;
          const pctColor =
            scorePct === null
              ? "#9CA3AF"
              : scorePct >= 80
                ? "#10B981"
                : scorePct >= 70
                  ? "#F59E0B"
                  : "#EF4444";

          return (
            <div
              key={evt.id}
              className={`grid grid-cols-[1.8fr_0.8fr_0.7fr_0.7fr_1fr_auto] gap-2 items-center px-5 py-3 hover:bg-[#F9FAFB] transition-all ${isDone ? "opacity-60" : ""
                }`}
            >
              {/* Assignment */}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(evt.id, !isDone)}
                    className="shrink-0 text-[#D0D5DD] hover:text-[#10B981] transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 size={16} className="text-[#10B981]" />
                    ) : (
                      <Circle size={16} />
                    )}
                  </button>
                  <p
                    className={`text-xs font-semibold text-[#1D2939] truncate ${isDone ? "line-through text-[#9CA3AF]" : ""
                      }`}
                  >
                    {evt.title}
                  </p>
                </div>
                <div className="pl-6">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      borderColor: colors.border,
                    }}
                  >
                    {evt.category}
                  </span>
                </div>
              </div>

              {/* Course */}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: courseColor }}
                />
                <span className="text-xs font-semibold text-[#374151]">
                  {evt.course_code || "Personal"}
                </span>
              </div>

              {/* Due */}
              <div>
                <p className="text-xs font-semibold text-[#374151]">{evt.date}</p>
                {evt.days_left && (
                  <p
                    className="text-[10px] font-semibold"
                    style={{
                      color:
                        evt.days_left === "Past" || evt.days_left === "Today"
                          ? "#EF4444"
                          : evt.days_left === "1d" || evt.days_left === "2d" || evt.days_left === "3d"
                            ? "#F59E0B"
                            : "#10B981",
                    }}
                  >
                    {evt.days_left === "Past" ? "Past" : evt.days_left === "Today" ? "Today" : `${evt.days_left} left`}
                  </p>
                )}
              </div>

              {/* Points */}
              <p className="text-xs font-semibold text-[#374151]">{evt.points || 0} pts</p>

              {/* Grade */}
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs font-bold"
                  style={{ color: scorePct !== null ? pctColor : "#D0D5DD" }}
                >
                  {scoreDisplay}
                  {scorePct !== null && ` = ${scorePct}%`}
                </span>

              </div>

              {/* edit grade button  */}
              <div className="flex items-center gap-1">
                {/* edit grade button  */}
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="cursor-pointer text-[#D0D5DD] hover:text-[#3B82F6] transition-colors p-1"
                  title="Edit Grade"
                >
                  <Pencil size={13} />
                </button>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  {evt.source === "manual" && (
                    <button
                      onClick={() => handleDelete(evt.id)}
                      className="cursor-pointer text-[#D0D5DD] hover:text-[#EF4444] transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        coursesData={coursesData}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
