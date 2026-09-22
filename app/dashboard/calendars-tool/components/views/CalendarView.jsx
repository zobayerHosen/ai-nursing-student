"use client";
import { useState, useCallback, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-overrides.css";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import EventModal from "./EventModal";
import TasksView from "./TasksView";
import GradesView from "./GradesView";
import AddTaskModal from "./AddTaskModal";

const localizer = momentLocalizer(moment);

const TYPE_COLORS = {
  lab: { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  clinical: { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  "check-off": { bg: "#DBEAFE", text: "#1D4ED8", border: "#BFDBFE" },
  quiz: { bg: "#FEE2E2", text: "#B91C1C", border: "#FECACA" },
  exam: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  midterm: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  final: { bg: "#FEF3C7", text: "#92400E", border: "#FDE68A" },
  assignment: { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
  project: { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
  paper: { bg: "#D1FAE5", text: "#065F46", border: "#A7F3D0" },
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
  return TYPE_COLORS[(category || "").toLowerCase()] ?? TYPE_COLORS.assignment;
}

/** Convert API event to RBC event */
function toRBCEvent(evt) {
  let start, end;
  if (evt.date) {
    const parts = evt.date.split("-");
    const y = parseInt(parts[0]);
    const m = parseInt(parts[1]) - 1;
    const d = parseInt(parts[2]);

    let sh = 9, sm = 0;
    if (evt.start_time) {
      const tp = evt.start_time.match(/(\d+):(\d+)/);
      if (tp) { sh = parseInt(tp[1]); sm = parseInt(tp[2]); }
      if (evt.start_time.toLowerCase().includes("pm") && sh < 12) sh += 12;
      if (evt.start_time.toLowerCase().includes("am") && sh === 12) sh = 0;
    }

    let eh = sh + 1, em = 0;
    if (evt.end_time) {
      const tp = evt.end_time.match(/(\d+):(\d+)/);
      if (tp) { eh = parseInt(tp[1]); em = parseInt(tp[2]); }
      if (evt.end_time.toLowerCase().includes("pm") && eh < 12) eh += 12;
      if (evt.end_time.toLowerCase().includes("am") && eh === 12) eh = 0;
    }

    start = new Date(y, m, d, sh, sm);
    end = new Date(y, m, d, eh, em);
  } else {
    start = new Date();
    end = new Date();
  }

  return {
    ...evt,
    title: evt.title,
    start,
    end,
    type: evt.category,
    course: evt.course_code,
    pts: evt.points,
    instructor: evt.instructor,
    email: evt.email,
    room: evt.location || evt.office_room,
  };
}

// Custom event tile
function EventTile({ event, coursesData }) {
  const courseColor = getCourseColor(event.course, coursesData || []);
  const colors = getTypeColors(event.type);
  return (
    <div
      className={`text-[10px] font-semibold truncate px-1 py-0.5 rounded leading-tight ${event.completed ? "line-through opacity-70" : ""}`}
      style={{ color: courseColor, background: colors.bg }}
    >
      {event.title}
    </div>
  );
}

export default function CalendarView({
  onUploadMore,
  coursesData = [],
  eventsData = [],
  gradesSummary,
  courseFilter,
  onCourseFilterChange,
}) {
  const [tab, setTab] = useState("calendar"); // "calendar" | "tasks" | "grades"
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(() => new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Convert API events to RBC events
  const rbcEvents = useMemo(
    () => eventsData.map(toRBCEvent),
    [eventsData]
  );

  const handleSelectEvent = useCallback(
    (event) => setSelectedEvent(event),
    []
  );

  const handleSelectSlot = useCallback(
    (slotInfo) => {
      const d = slotInfo.start;
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      setSelectedDate(`${y}-${m}-${day}`);
      setAddTaskOpen(true);
    },
    []
  );

  const eventStyleGetter = useCallback(
    (event) => {
      const colors = getTypeColors(event.type);
      const courseColor = getCourseColor(event.course, coursesData);
      return {
        style: {
          backgroundColor: colors.bg,
          color: courseColor,
          border: `1px solid ${colors.border}`,
          borderRadius: "6px",
          fontSize: "10px",
          fontWeight: "600",
          padding: "1px 4px",
          boxShadow: "none",
          opacity: event.completed ? 0.6 : 1,
          textDecoration: event.completed ? "line-through" : "none",
        },
      };
    },
    [coursesData]
  );

  const navigate = (dir) => {
    const d = new Date(date);
    if (view === Views.MONTH) d.setMonth(d.getMonth() + dir);
    else if (view === Views.WEEK) d.setDate(d.getDate() + dir * 7);
    else if (view === Views.DAY) d.setDate(d.getDate() + dir);
    else d.setDate(d.getDate() + dir);
    setDate(d);
  };

  const monthLabel = useMemo(() => {
    if (view === Views.DAY) {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [date, view]);

  const CustomEventComponent = useCallback(
    (props) => <EventTile {...props} coursesData={coursesData} />,
    [coursesData]
  );

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Tab buttons */}
        <div className="flex items-center bg-white border border-[#E4E7EC] rounded-xl p-1 gap-1">
          {[
            { key: "calendar", label: "📅 Calendar" },
            { key: "tasks", label: "✅ Tasks" },
            { key: "grades", label: "📊 Grades" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t.key
                  ? "bg-primary text-white shadow-sm"
                  : "text-[#667085] hover:bg-[#F9FAFB]"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Calendar nav — only shown on calendar tab */}
        {tab === "calendar" && (
          <>
            {/* Course filter */}
            <select
              value={courseFilter}
              onChange={(e) => onCourseFilterChange(e.target.value)}
              className="border border-[#E4E7EC] rounded-lg px-2 py-1.5 text-xs font-semibold text-[#334155] bg-white focus:outline-none"
            >
              <option value="all">All Courses</option>
              {coursesData.map((c) => (
                <option key={c.code || c.id} value={c.code}>
                  {c.code} - {c.name}
                </option>
              ))}
            </select>

            {/* Add Task button */}
            <button
              onClick={() => setAddTaskOpen(true)}
              className="cursor-pointer flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary/90 transition-all"
            >
              <Plus size={13} /> Add Task
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => navigate(-1)}
                className="w-7 h-7 flex items-center justify-center border border-[#E4E7EC] rounded-lg hover:bg-[#F9FAFB] transition-all"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-bold text-[#1D2939] min-w-27.5 text-center">
                {monthLabel}
              </span>
              <button
                onClick={() => navigate(1)}
                className="w-7 h-7 flex items-center justify-center border border-[#E4E7EC] rounded-lg hover:bg-[#F9FAFB] transition-all"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => setDate(new Date())}
                className="px-2 py-1 border border-[#E4E7EC] rounded-md text-[11px] font-bold text-[#334155] hover:bg-[#F1F5F9] transition-all"
              >
                Today
              </button>
            </div>
            <div className="flex items-center border border-[#E4E7EC] rounded-xl overflow-hidden">
              {["Month", "Week", "Day"].map((v) => {
                const key = v === "Month" ? Views.MONTH : v === "Week" ? Views.WEEK : Views.DAY;
                const active = view === key;
                return (
                  <button
                    key={v}
                    onClick={() => setView(key)}
                    className={`px-3 py-1.5 text-xs font-semibold border-r border-[#E4E7EC] last:border-r-0 transition-all ${active
                        ? "bg-primary text-white"
                        : "text-[#667085] hover:bg-[#F9FAFB]"
                      }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Tab content */}
      {tab === "tasks" && (
        <TasksView
          eventsData={eventsData}
          coursesData={coursesData}
          onAddTask={() => setAddTaskOpen(true)}
        />
      )}
      {tab === "grades" && (
        <GradesView
          eventsData={eventsData}
          coursesData={coursesData}
          gradesSummary={gradesSummary}
          onUploadMore={onUploadMore}
        />
      )}

      {tab === "calendar" && (
        <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-sm">
          {eventsData.length === 0 && coursesData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <p className="text-3xl">📅</p>
              <p className="text-sm font-bold text-[#1D2939]">No course data available</p>
              <p className="text-xs text-[#667085] text-center max-w-sm">
                Upload a course syllabus or click &quot;+ Add Task&quot; to populate your calendar with schedules and deadlines.
              </p>
              <button
                onClick={onUploadMore}
                className="mt-3 px-5 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all cursor-pointer"
              >
                Upload Syllabus
              </button>
            </div>
          ) : (
            <div className="rbc-wrapper" style={{ height: view === Views.WEEK || view === Views.DAY ? 540 : 480 }}>
              <Calendar
                localizer={localizer}
                events={rbcEvents}
                view={view}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                date={date}
                onView={setView}
                onNavigate={setDate}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                eventPropGetter={eventStyleGetter}
                components={{ event: CustomEventComponent }}
                toolbar={false}
                style={{ height: "100%" }}
              />
            </div>
          )}
        </div>
      )}

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        coursesData={coursesData}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={addTaskOpen}
        onClose={() => setAddTaskOpen(false)}
        courses={coursesData}
        selectedDate={selectedDate}
      />
    </>
  );
}