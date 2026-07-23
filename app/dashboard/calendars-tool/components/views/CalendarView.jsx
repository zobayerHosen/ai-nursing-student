"use client";
import { useState, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-overrides.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EVENTS, TYPE_COLORS, COURSE_COLOR } from "./demo-data";
import EventModal from "./EventModal";
import TasksView from "./TasksView";
import GradesView from "./GradesView";

const localizer = momentLocalizer(moment);

const TYPE_LABEL = { lab: "lab", quiz: "quiz", exam: "exam", assignment: "assignment", reading: "reading" };

// Custom event tile
function EventTile({ event }) {
  const courseColor = COURSE_COLOR(event.course);
  const colors = TYPE_COLORS[event.type] ?? TYPE_COLORS.assignment;
  return (
    <div className="text-[10px] font-semibold truncate px-1 py-0.5 rounded leading-tight"
      style={{ color: courseColor, background: colors.bg }}>
      {event.title}
    </div>
  );
}

// Agenda list view (custom, not using RBC agenda)
function AgendaView({ events, onSelectEvent }) {
  const now = new Date();
  const sorted = [...events].filter(e => e.start >= now).sort((a, b) => a.start - b.start);
  const daysLeft = (ev) => Math.ceil((ev.start - now) / 86400000);

  return (
    <div className="flex flex-col gap-2 mt-2">
      {sorted.map(ev => {
        const dl = daysLeft(ev);
        const colors = TYPE_COLORS[ev.type] ?? TYPE_COLORS.assignment;
        const courseColor = COURSE_COLOR(ev.course);
        const dlColor = dl <= 1 ? "#EF4444" : dl <= 3 ? "#F59E0B" : dl <= 7 ? "#10B981" : "#6B7280";
        return (
          <div key={ev.id}
            onClick={() => onSelectEvent(ev)}
            className="flex items-center gap-4 bg-white border border-[#E4E7EC] rounded-xl px-4 py-3 hover:shadow-md cursor-pointer transition-all hover:border-[#BFDBFE]">
            {/* Date column */}
            <div className="w-12 shrink-0 text-center">
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">
                {ev.start.toLocaleDateString("en-US", { month: "short" })}
              </p>
              <p className="text-xl font-extrabold text-[#1D2939] leading-none">
                {ev.start.getDate()}
              </p>
            </div>

            {/* Color bar */}
            <div className="w-1 h-10 rounded-full shrink-0" style={{ backgroundColor: courseColor }} />

            {/* Title + meta */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#1D2939] truncate">{ev.title}</p>
              <p className="text-[11px] text-[#667085]">{ev.course} · {ev.pts} pts</p>
            </div>

            {/* Type badge */}
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg border shrink-0"
              style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}>
              {TYPE_LABEL[ev.type] ?? ev.type}
            </span>

            {/* Days left */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-xs font-bold" style={{ color: dlColor }}>
                {dl <= 0 ? "Today" : `${dl}d`}
              </span>
              {dl <= 3 && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dlColor }} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function CalendarView({ onUploadMore }) {
  const [tab, setTab] = useState("calendar"); // "calendar" | "tasks" | "grades"
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date(2026, 6, 9));
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = useCallback((event) => setSelectedEvent(event), []);

  const eventStyleGetter = (event) => {
    const colors = TYPE_COLORS[event.type] ?? TYPE_COLORS.assignment;
    const courseColor = COURSE_COLOR(event.course);
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
      }
    };
  };

  const navigate = (dir) => {
    const d = new Date(date);
    if (view === Views.MONTH) d.setMonth(d.getMonth() + dir);
    else if (view === Views.WEEK) d.setDate(d.getDate() + dir * 7);
    else d.setDate(d.getDate() + dir * 7);
    setDate(d);
  };

  const monthLabel = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

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
          ].map(t => (
            <button key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${tab === t.key ? "bg-primary text-white shadow-sm" : "text-[#667085] hover:bg-[#F9FAFB]"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Calendar nav — only shown on calendar tab */}
        {tab === "calendar" && (
          <>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => navigate(-1)} className="w-7 h-7 flex items-center justify-center border border-[#E4E7EC] rounded-lg hover:bg-[#F9FAFB] transition-all">
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm font-bold text-[#1D2939] min-w-27.5 text-center">{monthLabel}</span>
              <button onClick={() => navigate(1)} className="w-7 h-7 flex items-center justify-center border border-[#E4E7EC] rounded-lg hover:bg-[#F9FAFB] transition-all">
                <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex items-center border border-[#E4E7EC] rounded-xl overflow-hidden">
              {["Month", "Week", "Agenda"].map(v => {
                const key = v === "Month" ? Views.MONTH : v === "Week" ? Views.WEEK : "agenda";
                const active = view === key;
                return (
                  <button key={v}
                    onClick={() => setView(key)}
                    className={`px-3 py-1.5 text-xs font-semibold border-r border-[#E4E7EC] last:border-r-0 transition-all ${active ? "bg-primary text-white" : "text-[#667085] hover:bg-[#F9FAFB]"
                      }`}>
                    {v}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Tab content */}
      {tab === "tasks" && <TasksView />}
      {tab === "grades" && <GradesView />}

      {tab === "calendar" && (
        <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden shadow-sm">
          {view === "agenda" ? (
            <div className="p-4">
              <AgendaView events={EVENTS} onSelectEvent={handleSelectEvent} />
            </div>
          ) : (
            <div className="rbc-wrapper" style={{ height: view === Views.WEEK ? 540 : 480 }}>
              <Calendar
                localizer={localizer}
                events={EVENTS}
                view={view}
                date={date}
                onView={setView}
                onNavigate={setDate}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                components={{ event: EventTile }}
                toolbar={false}
                style={{ height: "100%" }}
              />
            </div>
          )}
        </div>
      )}

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </>
  );
}
