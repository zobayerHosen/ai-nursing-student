"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  BookOpen,
  Target,
  CheckCircle2,
  ListTodo,
  GraduationCap,
  Sparkles,
  Upload,
  FileText,
  Loader2,
  Trash2,
  CheckCircle,
  FileSpreadsheet,
  CalendarDays,
  ListChecks,
  BarChart3,
  Dumbbell,
  BrainCircuit,
  Timer,
  ExternalLink,
  Sun,
  RefreshCw,
  Eye,
  EyeOff,
  GripVertical,
  Plus,
  Minus,
} from "lucide-react";

// ─── Constants 
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const FILE_ACCEPT = ".pdf,.doc,.docx,.ppt,.pptx,.txt,.csv,.xlsx,.xls";

// ─── Sample Events (default for demo)
const DEFAULT_EVENTS = [
  { date: 5, title: "NCLEX Pharmacology Review", type: "study", time: "10:00 AM" },
  { date: 8, title: "Cardiac Assessment Quiz", type: "exam", time: "2:00 PM" },
  { date: 12, title: "Study Group: Fluid & Electrolytes", type: "study", time: "4:00 PM" },
  { date: 15, title: "Practice Test - Fundamentals", type: "exam", time: "9:00 AM" },
  { date: 18, title: "Maternity Nursing Review", type: "study", time: "1:00 PM" },
  { date: 22, title: "Pediatric Nursing Module", type: "study", time: "11:00 AM" },
  { date: 25, title: "Comprehensive NCLEX Simulator", type: "exam", time: "8:00 AM" },
  { date: 28, title: "Review Lab Values & Diagnostics", type: "study", time: "3:00 PM" },
];

// ─── Syllabus parsing simulation
const SYLLABUS_TEMPLATES = [
  {
    name: "NCLEX-RN Comprehensive",
    weeks: [
      { week: 1, topic: "Fundamentals of Nursing", focus: "Safety & Infection Control", hours: 8 },
      { week: 2, topic: "Pharmacology I", focus: "Drug Classifications & Calculations", hours: 10 },
      { week: 3, topic: "Adult Health I", focus: "Cardiovascular & Respiratory", hours: 12 },
      { week: 4, topic: "Adult Health II", focus: "GI, Renal & Endocrine", hours: 12 },
      { week: 5, topic: "Maternal & Newborn", focus: "Antepartum, Intrapartum & Postpartum", hours: 10 },
      { week: 6, topic: "Pediatric Nursing", focus: "Growth, Development & Common Conditions", hours: 10 },
      { week: 7, topic: "Mental Health", focus: "Therapeutic Communication & Disorders", hours: 8 },
      { week: 8, topic: "Leadership & Management", focus: "Delegation, Prioritization & Ethics", hours: 8 },
    ],
  },
  {
    name: "Advanced Pathophysiology",
    weeks: [
      { week: 1, topic: "Cell Injury & Adaptation", focus: "Mechanisms of Cell Damage", hours: 6 },
      { week: 2, topic: "Inflammation & Healing", focus: "Acute & Chronic Inflammation", hours: 6 },
      { week: 3, topic: "Cardiovascular Patho", focus: "Heart Failure, CAD & Hypertension", hours: 8 },
      { week: 4, topic: "Respiratory Patho", focus: "COPD, Asthma & ARDS", hours: 8 },
      { week: 5, topic: "Renal Patho", focus: "AKI, CKD & Electrolyte Imbalances", hours: 6 },
      { week: 6, topic: "Neurological Patho", focus: "Stroke, Seizures & Degenerative Diseases", hours: 8 },
      { week: 7, topic: "Endocrine Patho", focus: "Diabetes, Thyroid & Adrenal Disorders", hours: 6 },
      { week: 8, topic: "Oncology & Genetics", focus: "Cancer Biology & Inherited Disorders", hours: 6 },
    ],
  },
];

// ─── Mock syllabus parsing (simulates AI extraction) 
function parseSyllabusContent(fileName) {
  const idx = Math.floor(Math.random() * SYLLABUS_TEMPLATES.length);
  const template = SYLLABUS_TEMPLATES[idx];
  const now = new Date();
  const currentDay = now.getDate();
  const events = [];

  template.weeks.forEach((week, i) => {
    const studyDate = currentDay + i * 3 + 1;
    if (studyDate <= 31) {
      events.push({
        date: studyDate,
        title: `Study: ${week.topic}`,
        type: "study",
        time: "9:00 AM",
        details: week.focus,
        hours: week.hours,
        week: week.week,
      });
    }
    const examDate = currentDay + i * 3 + 2;
    if (examDate <= 31) {
      events.push({
        date: examDate,
        title: `Quiz: ${week.topic}`,
        type: "exam",
        time: "2:00 PM",
        details: week.focus,
        hours: 1.5,
        week: week.week,
      });
    }
  });

  return { syllabusName: template.name, weeks: template.weeks, events };
}

// ─── Helper: format file size ───────────────────────────────────────────────
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// ─── Helper: get file icon & color ──────────────────────────────────────────
function getFileMeta(type) {
  if (!type) return { icon: FileText, color: "text-gray-500", bg: "bg-gray-100" };
  if (type.includes("pdf")) return { icon: FileText, color: "text-red-600", bg: "bg-red-100" };
  if (type.includes("sheet") || type.includes("excel") || type.includes("csv") || type.includes("xls"))
    return { icon: FileSpreadsheet, color: "text-emerald-600", bg: "bg-emerald-100" };
  if (type.includes("presentation") || type.includes("powerpoint") || type.includes("ppt"))
    return { icon: FileSpreadsheet, color: "text-orange-600", bg: "bg-orange-100" };
  if (type.includes("text") || type.includes("txt") || type.includes("doc"))
    return { icon: FileText, color: "text-blue-600", bg: "bg-blue-100" };
  return { icon: FileText, color: "text-gray-500", bg: "bg-gray-100" };
}

// ─── Helper: event type badge & colors ──────────────────────────────────────
const EVENT_STYLES = {
  study: {
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    icon: BookOpen,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    label: "Study",
  },
  exam: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    icon: Target,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    label: "Exam",
  },
};

// ─── Study tips ─────────────────────────────────────────────────────────────
const STUDY_TIPS = [
  { icon: BookOpen, text: "Review 20 NCLEX questions daily", color: "text-blue-600", bg: "bg-blue-100" },
  { icon: Target, text: "Focus on weak areas this week", color: "text-emerald-600", bg: "bg-emerald-100" },
  { icon: Clock, text: "Study in 45-min focused sessions", color: "text-amber-600", bg: "bg-amber-100" },
  { icon: CheckCircle2, text: "Complete 1 full practice test/week", color: "text-violet-600", bg: "bg-violet-100" },
];

// ─── Progress stats ─────────────────────────────────────────────────────────
const QUICK_STATS = [
  { label: "Study Hours", value: "24", unit: "hrs", color: "from-blue-500 to-blue-600", icon: Timer },
  { label: "Practice Tests", value: "8", unit: "done", color: "from-emerald-500 to-emerald-600", icon: Dumbbell },
  { label: "Questions Solved", value: "450", unit: "qns", color: "from-violet-500 to-violet-600", icon: BrainCircuit },
  { label: "Avg. Score", value: "76%", unit: "", color: "from-amber-500 to-amber-600", icon: BarChart3 },
];

// ─── Mock notification types for upload ──────────────────────────────────────
const UPLOAD_STEPS = [
  { id: "uploading", label: "Uploading file..." },
  { id: "parsing", label: "Extracting syllabus content..." },
  { id: "analyzing", label: "Analyzing topics & dates..." },
  { id: "scheduling", label: "Generating study schedule..." },
  { id: "done", label: "Schedule ready!" },
];

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function CalendarsToolShell() {
  // ─── Calendar state 
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("calendar");

  // ─── Drag & Drop state 
  const [draggedEvent, setDraggedEvent] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // ─── Add Event state
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", type: "study", time: "09:00", hours: 2 });

  // ─── Syllabus state 
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0);
  const [syllabusData, setSyllabusData] = useState(null);
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [dragOver, setDragOver] = useState(false);
  const [showUploadZone, setShowUploadZone] = useState(true);
  const [showSyllabusDetails, setShowSyllabusDetails] = useState(true);
  const [uploadHistory, setUploadHistory] = useState([]);

  const fileInputRef = useRef(null);
  const intervalRef = useRef(null);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // ─── Calendar helpers 
  const month = MONTHS[currentMonth];
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();

  const prevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth]);

  const nextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth]);

  const getEventsForDate = useCallback(
    (date) => events.filter((e) => e.date === date),
    [events]
  );

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  // ─── File handling 
  const processFile = useCallback((file) => {
    if (!file) return;
    setSyllabusFile(file);
    setIsUploading(true);
    setUploadStep(0);

    // Simulate upload & parsing with steps
    const stepInterval = setInterval(() => {
      setUploadStep((prev) => {
        const next = prev + 1;
        if (next >= UPLOAD_STEPS.length) {
          clearInterval(stepInterval);
          intervalRef.current = null;
          setIsUploading(false);
          setShowUploadZone(false);

          // Parse syllabus and generate schedule
          const parsed = parseSyllabusContent(file.name);
          setSyllabusData(parsed);
          setEvents(parsed.events);

          // Add to upload history
          setUploadHistory((prev) => [
            {
              id: Date.now(),
              name: file.name,
              size: file.size,
              type: file.type,
              uploadedAt: new Date().toLocaleString(),
              syllabusName: parsed.syllabusName,
            },
            ...prev.slice(0, 4),
          ]);

          return next;
        }
        return next;
      });
    }, 700);

    intervalRef.current = stepInterval;

    // Read file for preview metadata
    const reader = new FileReader();
    reader.onload = () => {};
    reader.readAsArrayBuffer(file);
  }, []);

  const handleFileChange = useCallback((e) => {
    processFile(e.target.files?.[0]);
    e.target.value = "";
  }, [processFile]);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      processFile(e.dataTransfer?.files?.[0]);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const resetSyllabus = useCallback(() => {
    setSyllabusFile(null);
    setSyllabusData(null);
    setEvents(DEFAULT_EVENTS);
    setShowUploadZone(true);
    setShowSyllabusDetails(true);
    setUploadStep(0);
    setIsUploading(false);
  }, []);

  // ─── Drag & Drop handlers 
  const handleEventDragStart = useCallback((e, event, source) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ eventId: event.title + event.date, source }));
    e.dataTransfer.effectAllowed = "move";
    setDraggedEvent(event);
    setDragSource(source);
    setIsDragging(true);

    // Custom drag ghost
    const ghost = e.target.cloneNode(true);
    ghost.style.position = "absolute";
    ghost.style.top = "-1000px";
    ghost.style.opacity = "0.8";
    ghost.style.borderRadius = "12px";
    ghost.style.padding = "8px 12px";
    ghost.style.background = event.type === "study" ? "#dbeafe" : "#ffe4e6";
    ghost.style.border = "2px solid " + (event.type === "study" ? "#3b82f6" : "#f43f5e");
    ghost.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
    ghost.style.fontSize = "12px";
    ghost.style.fontWeight = "600";
    ghost.style.color = event.type === "study" ? "#1d4ed8" : "#be123c";
    ghost.style.whiteSpace = "nowrap";
    ghost.textContent = event.title;
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 10, 10);
    setTimeout(() => document.body.removeChild(ghost), 0);
  }, []);

  const handleEventDragEnd = useCallback(() => {
    setDraggedEvent(null);
    setDragOverDate(null);
    setDragSource(null);
    setIsDragging(false);
  }, []);

  const handleCellDragOver = useCallback((e, date) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverDate(date);
  }, []);

  const handleCellDragLeave = useCallback(() => {
    // Always clear on leave — React batches state updates so the brief
    // null flash is imperceptible when moving between cells
    setDragOverDate(null);
  }, []);

  const handleCellDrop = useCallback(
    (e, targetDate) => {
      e.preventDefault();
      if (!draggedEvent) {
        setDragOverDate(null);
        setIsDragging(false);
        return;
      }

      setEvents((prev) =>
        prev.map((ev) => {
          // Match by title and original date to find the dragged event
          if (ev.title === draggedEvent.title && ev.date === draggedEvent.date) {
            return { ...ev, date: targetDate };
          }
          return ev;
        })
      );

      setDraggedEvent(null);
      setDragOverDate(null);
      setDragSource(null);
      setIsDragging(false);
      setSelectedDate(targetDate);
    },
    [draggedEvent]
  );

  // ─── Resize handlers 
  const handleIncreaseHours = useCallback((eventIdx) => {
    setEvents((prev) =>
      prev.map((ev, idx) => {
        if (idx === eventIdx) {
          return { ...ev, hours: (ev.hours || 2) + 0.5 };
        }
        return ev;
      })
    );
  }, []);

  const handleDecreaseHours = useCallback((eventIdx) => {
    setEvents((prev) =>
      prev.map((ev, idx) => {
        if (idx === eventIdx && (ev.hours || 2) > 0.5) {
          return { ...ev, hours: (ev.hours || 2) - 0.5 };
        }
        return ev;
      })
    );
  }, []);

  // ─── Add Event handler 
  const handleAddEvent = useCallback(() => {
    if (!newEvent.title.trim() || !selectedDate) return;

    const timeStr = newEvent.time
      ? (() => {
          const [h, m] = newEvent.time.split(":");
          const hour = parseInt(h);
          const ampm = hour >= 12 ? "PM" : "AM";
          const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
          return `${hour12}:${m} ${ampm}`;
        })()
      : "9:00 AM";

    const newEv = {
      date: selectedDate,
      title: newEvent.title.trim(),
      type: newEvent.type,
      time: timeStr,
      hours: newEvent.hours || 2,
    };

    setEvents((prev) => [...prev, newEv]);
    setNewEvent({ title: "", type: "study", time: "09:00", hours: 2 });
    setShowAddEventForm(false);
  }, [newEvent, selectedDate]);

  // ─── Compute study plan stats
  const studyEvents = events.filter((e) => e.type === "study");
  const examEvents = events.filter((e) => e.type === "exam");
  const totalHours = studyEvents.reduce((sum, e) => sum + (e.hours || 2), 0);

  // ════════════════════════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafd] via-white to-[#eef5fb]">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-[10%] w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* ─── HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
              <Calendar className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Study Calendar</h1>
              <p className="text-sm text-gray-500">
                {syllabusData
                  ? `Schedule based on "${syllabusData.syllabusName}"`
                  : "Upload your syllabus to auto-schedule study & exams"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
              <GraduationCap size={16} className="text-primary" />
              <span className="text-sm font-medium text-gray-700">NCLEX Prep</span>
            </div>
            <button
              onClick={() => {
                if (selectedDate) {
                  setShowAddEventForm(true);
                } else {
                  setSelectedDate(new Date().getDate());
                  setTimeout(() => setShowAddEventForm(true), 100);
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-[#244d72] transition-all duration-200 shadow-lg shadow-primary/20"
            >
              <Plus size={15} />
              <span className="hidden sm:inline">Add Event</span>
            </button>
            {syllabusData && (
              <button
                onClick={resetSyllabus}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl font-medium text-sm border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
              >
                <RefreshCw size={15} />
                <span className="hidden sm:inline">Re-upload</span>
              </button>
            )}
          </div>
        </div>

        {/* ─── SYLLABUS UPLOAD SECTION */}
        {(showUploadZone || isUploading) && (
          <div className="mb-6">
            {isUploading ? (
              /* Upload Progress */
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-blue-600 flex items-center justify-center animate-pulse shadow-lg shadow-primary/20">
                    <Upload size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {syllabusFile?.name || "Processing syllabus..."}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {formatFileSize(syllabusFile?.size || 0)} &middot; {UPLOAD_STEPS[uploadStep]?.label || "Processing"}
                    </p>
                  </div>
                  <Loader2 size={20} className="text-primary animate-spin shrink-0" />
                </div>
                {/* Step progress */}
                <div className="space-y-2.5">
                  {UPLOAD_STEPS.map((step, idx) => {
                    const isActive = idx === uploadStep;
                    const isDone = idx < uploadStep;
                    return (
                      <div key={step.id} className="flex items-center gap-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isDone
                              ? "bg-emerald-100 text-emerald-600"
                              : isActive
                              ? "bg-primary/10 text-primary ring-2 ring-primary/30"
                              : "bg-gray-100 text-gray-300"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle size={14} />
                          ) : isActive ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          )}
                        </div>
                        <span
                          className={`text-xs font-medium transition-colors ${
                            isDone
                              ? "text-gray-500"
                              : isActive
                              ? "text-primary font-semibold"
                              : "text-gray-300"
                          }`}
                        >
                          {step.label}
                        </span>
                        {isActive && (
                          <span className="ml-auto text-[10px] text-primary font-medium animate-pulse">
                            Processing...
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Progress bar */}
                <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-primary to-blue-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(uploadStep / (UPLOAD_STEPS.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              /* Drop zone */
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
                className={`relative bg-white rounded-3xl border-2 border-dashed p-8 cursor-pointer transition-all duration-300 group ${
                  dragOver
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-[1.01]"
                    : "border-gray-200 hover:border-primary/40 hover:bg-gray-50/50 hover:shadow-md"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={FILE_ACCEPT}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center text-center max-w-lg mx-auto">
                  {/* Upload icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      dragOver
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30"
                        : "bg-primary/10 text-primary group-hover:scale-105 group-hover:shadow-md"
                    }`}
                  >
                    <Upload size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {dragOver ? "Drop your syllabus here" : "Upload your syllabus"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 max-w-sm">
                    Drag & drop your course syllabus file here, or click to browse. We&apos;ll automatically parse it and create a personalized study schedule.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-medium border border-blue-100">
                      <FileText size={11} />
                      PDF
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-medium border border-emerald-100">
                      <FileSpreadsheet size={11} />
                      DOCX
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-[11px] font-medium border border-orange-100">
                      <FileSpreadsheet size={11} />
                      PPTX
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-[11px] font-medium border border-gray-200">
                      TXT
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-[#244d72] transition-all duration-200 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                  >
                    <Upload size={15} />
                    Choose File
                  </button>
                  {uploadHistory.length > 0 && (
                    <p className="text-xs text-gray-400 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowUploadZone(false);
                        }}
                        className="text-primary hover:text-[#244d72] underline underline-offset-2"
                      >
                        Continue with current schedule
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── SYLLABUS DETAILS BAR (when uploaded) ──────────────────── */}
        {syllabusData && !showUploadZone && !isUploading && (
          <div className="mb-6">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowSyllabusDetails(!showSyllabusDetails)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-blue-600 flex items-center justify-center shadow-sm">
                    <FileText size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {syllabusData.syllabusName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {syllabusFile?.name} &middot; {studyEvents.length} study sessions &middot; {examEvents.length} exams &middot; ~{totalHours} hours
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUploadZone(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                  >
                    <Upload size={13} />
                    Re-upload
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      resetSyllabus();
                      setShowUploadZone(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} />
                    Remove
                  </button>
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    showSyllabusDetails ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {showSyllabusDetails ? <EyeOff size={16} /> : <Eye size={16} />}
                  </div>
                </div>
              </button>

              {/* Expandable syllabus details */}
              {showSyllabusDetails && (
                <div className="border-t border-gray-100 px-4 py-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Total Weeks", value: syllabusData.weeks.length, icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-100" },
                      { label: "Study Sessions", value: studyEvents.length, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-100" },
                      { label: "Exams", value: examEvents.length, icon: Target, color: "text-rose-600", bg: "bg-rose-100" },
                      { label: "Est. Hours", value: totalHours, icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
                    ].map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50/70">
                        <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center shrink-0`}>
                          <stat.icon size={16} className={stat.color} />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 leading-none">{stat.value}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{stat.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Weekly breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Weekly Topic Breakdown</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {syllabusData.weeks.map((week) => (
                        <div
                          key={week.week}
                          className="flex items-start gap-2 p-3 rounded-xl bg-gray-50/50 border border-gray-100 hover:bg-primary/5 hover:border-primary/20 transition-all duration-200"
                        >
                          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                            {week.week}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">{week.topic}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5 truncate">{week.focus}</p>
                            <p className="text-[10px] text-primary font-medium mt-0.5">{week.hours}h</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Upload History (collapsed when no upload zone) ────────── */}
        {uploadHistory.length > 0 && showUploadZone && !isUploading && (
          <div className="mb-6">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={12} />
                  Upload History
                </h3>
              </div>
              <div className="space-y-2">
                {uploadHistory.map((item) => {
                  const meta = getFileMeta(item.type);
                  const Icon = meta.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-9 h-9 rounded-lg ${meta.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={16} className={meta.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.syllabusName} &middot; {item.uploadedAt}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resetSyllabus();
                          processFile(new File([""], item.name, { type: item.type }));
                        }}
                        className="text-xs text-primary hover:text-[#244d72] font-medium shrink-0"
                      >
                        Use again
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB NAVIGATION ─────────────────────────────────────────── */}
        <div className="flex gap-1 mb-6 p-1 bg-white rounded-2xl border border-gray-200 shadow-sm w-fit">
          {[
            { id: "calendar", label: "Calendar", icon: Calendar },
            { id: "schedule", label: "Study Plan", icon: ListTodo },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════ */}
        {/*  CALENDAR TAB                                                    */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === "calendar" && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
            {/* ─── MAIN CALENDAR ────────────────────────────────────── */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Month Navigation */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-600" />
                  </button>
                  <h2 className="text-lg font-bold text-gray-900">
                    {month} {currentYear}
                  </h2>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <ChevronRight size={20} className="text-gray-600" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    Study
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Exam
                  </div>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 px-4 pt-4 pb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 p-2">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square p-1" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const date = i + 1;
                  const isToday =
                    date === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear();
                  const isSelected = selectedDate === date;
                  const dayEvents = getEventsForDate(date);

                  const isDragOver = dragOverDate === date && isDragging;

                  return (
                    <button
                      key={date}
                      onClick={() => {
                        if (!isDragging) {
                          setSelectedDate(isSelected ? null : date);
                        }
                      }}
                      onDragOver={(e) => handleCellDragOver(e, date)}
                      onDragLeave={(e) => handleCellDragLeave(e, date)}
                      onDrop={(e) => handleCellDrop(e, date)}
                      className={`aspect-square p-1.5 rounded-xl transition-all duration-200 relative group ${
                        isDragOver
                          ? "bg-primary/15 text-primary ring-2 ring-primary/40 scale-105 shadow-lg"
                          : isSelected
                          ? "bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary/30"
                          : isToday
                          ? "bg-primary/10 text-primary font-bold"
                          : "hover:bg-gray-50 text-gray-700"
                      } ${isDragging ? "cursor-grabbing" : ""}`}
                    >
                      <span className="text-sm font-medium">{date}</span>
                      {/* Drag over indicator with dashed border overlay */}
                      {isDragOver && (
                        <div className="absolute inset-0 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 animate-pulse" />
                      )}
                      {/* Event indicator dots */}
                      {dayEvents.length > 0 && (
                        <div className="flex gap-0.5 mt-0.5 justify-center relative z-10">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <span
                              key={idx}
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSelected || isDragOver ? "bg-white/70" : EVENT_STYLES[event.type]?.dot || "bg-gray-400"
                              }`}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <span className={`text-[8px] font-bold ${isSelected || isDragOver ? "text-white/70" : "text-gray-400"}`}>
                              +{dayEvents.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                      {/* Drop badge when hovering over empty cell */}
                      {isDragOver && dayEvents.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[9px] font-bold text-primary bg-white/80 px-1.5 py-0.5 rounded-full shadow-sm">
                            Drop
                          </span>
                        </div>
                      )}
                      {/* Hover tooltip */}
                      {dayEvents.length > 0 && !isSelected && !isDragging && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-lg">
                          {dayEvents.length} event{dayEvents.length > 1 ? "s" : ""}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Events Summary */}
              {!selectedDate && (
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={14} className="text-primary" />
                    <span>
                      <strong className="text-gray-700">{events.length}</strong>{" "}
                      {syllabusData ? "scheduled events from syllabus" : "sample events this month"}
                    </span>
                    {syllabusData && (
                      <span className="text-xs text-gray-400 ml-1">
                        &middot; {studyEvents.length} study &middot; {examEvents.length} exams
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ─── RIGHT PANEL ─────────────────────────────────────────── */}
            <div className="space-y-5">
              {/* Selected Date Events */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    {selectedDate
                      ? `${month} ${selectedDate}, ${currentYear}`
                      : "Upcoming Events"}
                  </h3>
                  {selectedDate && (
                    <button
                      onClick={() => setShowAddEventForm(!showAddEventForm)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        showAddEventForm
                          ? "bg-rose-50 text-rose-600"
                          : "bg-primary/5 text-primary hover:bg-primary/10"
                      }`}
                    >
                      {showAddEventForm ? (
                        <>Cancel</>
                      ) : (
                        <><Plus size={12} /> Add</>
                      )}
                    </button>
                  )}
                </div>

                {/* ─── Add Event Form ─────────────────────── */}
                {showAddEventForm && selectedDate && (
                  <div className="mb-4 p-4 rounded-2xl bg-linear-to-br from-primary/4 to-blue-50/50 border border-primary/10">
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Event title..."
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && newEvent.title.trim()) {
                            handleAddEvent();
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="text-[10px] text-gray-500 font-medium mb-1 block">Type</label>
                          <div className="flex gap-1.5">
                            {["study", "exam"].map((t) => (
                              <button
                                key={t}
                                onClick={() => setNewEvent((prev) => ({ ...prev, type: t }))}
                                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                  newEvent.type === t
                                    ? t === "study"
                                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                                      : "bg-rose-100 text-rose-700 border border-rose-200"
                                    : "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100"
                                }`}
                              >
                                {t === "study" ? "Study" : "Exam"}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="w-24">
                          <label className="text-[10px] text-gray-500 font-medium mb-1 block">Hours</label>
                          <div className="flex items-center gap-0.5 bg-white border border-gray-200 rounded-lg px-2 py-1">
                            <button
                              onClick={() =>
                                setNewEvent((prev) => ({
                                  ...prev,
                                  hours: Math.max(0.5, (prev.hours || 2) - 0.5),
                                }))
                              }
                              className="p-0.5 text-gray-400 hover:text-rose-500 transition-colors"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="flex-1 text-center text-xs font-semibold text-gray-700 tabular-nums">
                              {newEvent.hours}h
                            </span>
                            <button
                              onClick={() =>
                                setNewEvent((prev) => ({
                                  ...prev,
                                  hours: (prev.hours || 2) + 0.5,
                                }))
                              }
                              className="p-0.5 text-gray-400 hover:text-emerald-500 transition-colors"
                            >
                              <Plus size={10} />
                            </button>
                          </div>
                        </div>
                        <div className="w-28">
                          <label className="text-[10px] text-gray-500 font-medium mb-1 block">Time</label>
                          <input
                            type="time"
                            value={newEvent.time}
                            onChange={(e) => setNewEvent((prev) => ({ ...prev, time: e.target.value }))}
                            className="w-full px-2 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={handleAddEvent}
                          disabled={!newEvent.title.trim()}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                            newEvent.title.trim()
                              ? "bg-primary text-white shadow-sm shadow-primary/20 hover:bg-[#244d72]"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Add to Calendar
                        </button>
                        <button
                          onClick={() => {
                            setShowAddEventForm(false);
                            setNewEvent({ title: "", type: "study", time: "09:00", hours: 2 });
                          }}
                          className="px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedDate && selectedEvents.length === 0 && !showAddEventForm && (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                      <Calendar size={24} className="text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500">No events scheduled</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {syllabusData
                        ? "Upload a new syllabus or click + to add an event"
                        : "Upload your syllabus or click + to add an event"}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  {(selectedDate ? selectedEvents : events.slice(0, 5)).map((event, idx) => {
                    const globalIdx = events.findIndex(
                      (e) => e.title === event.title && e.date === event.date && e.time === event.time
                    );
                    const style = EVENT_STYLES[event.type] || EVENT_STYLES.study;
                    const Icon = style.icon;
                    const isDraggingThis = draggedEvent?.title === event.title && draggedEvent?.date === event.date;

                    return (
                      <div
                        key={`${event.date}-${event.title}-${idx}`}
                        draggable
                        onDragStart={(e) => handleEventDragStart(e, event, "panel")}
                        onDragEnd={handleEventDragEnd}
                        className={`group flex items-start gap-2 p-2.5 rounded-2xl transition-all duration-200 border ${
                          isDraggingThis
                            ? "opacity-40 border-primary/30 bg-primary/5 shadow-sm"
                            : "hover:bg-gray-50 border-transparent hover:border-gray-200"
                        } ${isDragging ? "cursor-grabbing" : "cursor-grab active:cursor-grabbing"}`}
                      >
                        {/* Drag handle */}
                        <div className="flex flex-col items-center justify-center pt-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <GripVertical size={12} className="text-gray-300" />
                        </div>

                        {/* Icon */}
                        <div
                          className={`w-9 h-9 rounded-xl ${style.iconBg} flex items-center justify-center shrink-0`}
                        >
                          <Icon size={16} className={style.iconColor} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate leading-tight">{event.title}</p>
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <div
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${style.badge}`}
                            >
                              {style.label}
                            </div>
                            <span className="text-[11px] text-gray-400">{event.time}</span>
                            {event.week && (
                              <span className="text-[9px] text-primary bg-primary/5 px-1 py-0.5 rounded">
                                Wk {event.week}
                              </span>
                            )}
                          </div>
                          {/* Resize controls */}
                          {event.hours && (
                            <div className="flex items-center gap-1 mt-1.5">
                              <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5 border border-gray-200">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDecreaseHours(globalIdx >= 0 ? globalIdx : idx);
                                  }}
                                  disabled={(event.hours || 2) <= 0.5}
                                  className={`p-0.5 rounded transition-colors ${
                                    (event.hours || 2) <= 0.5
                                      ? "text-gray-200 cursor-not-allowed"
                                      : "text-gray-500 hover:text-rose-500 hover:bg-rose-50"
                                  }`}
                                  title="Decrease hours"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="text-[10px] font-semibold text-gray-700 min-w-7 text-center tabular-nums">
                                  {event.hours}h
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleIncreaseHours(globalIdx >= 0 ? globalIdx : idx);
                                  }}
                                  className="p-0.5 rounded text-gray-500 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
                                  title="Increase hours"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                              {event.details && (
                                <span className="text-[9px] text-gray-400 truncate ml-1">{event.details}</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                          <button
                            className="p-1 hover:bg-emerald-50 text-gray-300 hover:text-emerald-500 rounded-lg transition-colors"
                            title="Mark complete"
                          >
                            <CheckCircle2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!selectedDate && events.length > 5 && (
                  <button className="w-full mt-3 text-xs text-primary font-medium hover:text-[#244d72] transition-colors">
                    View all {events.length} events
                  </button>
                )}
              </div>

              {/* Study Tips */}
              <div className="bg-linear-to-br from-primary/5 to-blue-50 rounded-3xl border border-primary/10 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" />
                  Study Tips
                </h3>
                <div className="space-y-3">
                  {STUDY_TIPS.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl ${tip.bg} flex items-center justify-center shrink-0`}>
                        <tip.icon size={16} className={tip.color} />
                      </div>
                      <p className="text-sm text-gray-600 leading-5 pt-1">{tip.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                {QUICK_STATS.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg bg-linear-to-br ${stat.color} flex items-center justify-center mb-2 shadow-sm`}
                      >
                        <Icon size={14} className="text-white" />
                      </div>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════ */}
        {/*  STUDY PLAN TAB                                                  */}
        {/* ════════════════════════════════════════════════════════════════ */}
        {activeTab === "schedule" && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
            {/* ─── LEFT: Study Schedule ─────────────────────────────── */}
            <div className="space-y-5">
              {/* Overview Card */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <ListChecks size={18} className="text-primary" />
                    Study Schedule
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                      {events.length} events
                    </span>
                    {syllabusData && (
                      <span className="text-xs text-primary bg-primary/5 px-2.5 py-1 rounded-full font-medium">
                        {syllabusData.weeks.length} weeks
                      </span>
                    )}
                  </div>
                </div>

                {events.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                      <CalendarDays size={28} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">No study events scheduled yet</p>
                    <p className="text-xs text-gray-400 mt-1">Upload your syllabus to generate a study plan</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {events.map((event, idx) => {
                      const style = EVENT_STYLES[event.type] || EVENT_STYLES.study;
                      const Icon = style.icon;
                      const eventDate = new Date(currentYear, currentMonth, event.date);
                      const dayName = DAYS[eventDate.getDay()];

                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 group"
                        >
                          {/* Date badge */}
                          <div className="w-12 h-14 rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] text-gray-500 font-medium uppercase leading-none">{dayName}</span>
                            <span className="text-lg font-bold text-gray-900 leading-tight mt-0.5">{event.date}</span>
                          </div>

                          {/* Event content */}
                          <div className="flex-1 min-w-0 pt-0.5">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${style.badge}`}>
                                {style.label}
                              </span>
                              <span className="text-xs text-gray-400">{event.time}</span>
                              {event.hours && (
                                <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                                  {event.hours}h
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-semibold text-gray-900 truncate">{event.title}</p>
                            {event.details && (
                              <p className="text-xs text-gray-500 mt-0.5">{event.details}</p>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                            <button className="p-2 hover:bg-primary/5 text-gray-400 hover:text-primary rounded-lg transition-colors" title="Mark complete">
                              <CheckCircle2 size={15} />
                            </button>
                            <button className="p-2 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors" title="View details">
                              <ExternalLink size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* ─── RIGHT: Progress & Insights ───────────────────────── */}
            <div className="space-y-5">
              {/* Weekly Progress */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 size={16} className="text-primary" />
                  Weekly Progress
                </h3>
                {syllabusData ? (
                  <div className="space-y-3">
                    {syllabusData.weeks.map((week, idx) => {
                      const progress = Math.min(100, Math.round(((idx + 1) / syllabusData.weeks.length) * 100));
                      return (
                        <div key={week.week} className="group">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xs font-bold text-primary bg-primary/5 w-5 h-5 rounded flex items-center justify-center shrink-0">
                                {week.week}
                              </span>
                              <span className="text-xs font-medium text-gray-700 truncate">{week.topic}</span>
                            </div>
                            <span className="text-[10px] font-medium text-gray-500 shrink-0 ml-2">{week.hours}h</span>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-linear-to-r from-primary to-blue-500 rounded-full transition-all duration-700 ease-out group-hover:from-primary group-hover:to-blue-600"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <BarChart3 size={28} className="text-gray-300 mx-auto mb-2" />
                    <p className="text-xs text-gray-400">Upload a syllabus to see weekly progress</p>
                  </div>
                )}
              </div>

              {/* Study vs Exam Distribution */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <PieChartIcon size={16} className="text-primary" />
                  Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-100/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <BookOpen size={14} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Study Sessions</p>
                        <p className="text-[11px] text-gray-500">{studyEvents.length} sessions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{totalHours}h</p>
                      <p className="text-[10px] text-gray-400">total</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50/50 border border-rose-100/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
                        <Target size={14} className="text-rose-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Exams</p>
                        <p className="text-[11px] text-gray-500">{examEvents.length} exams</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-rose-600">
                        {examEvents.reduce((s, e) => s + (e.hours || 1.5), 0)}h
                      </p>
                      <p className="text-[10px] text-gray-400">total</p>
                    </div>
                  </div>

                  {/* Ratio bar */}
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${events.length > 0 ? (studyEvents.length / events.length) * 100 : 50}%` }}
                    />
                    <div
                      className="h-full bg-rose-500 transition-all duration-500"
                      style={{ width: `${events.length > 0 ? (examEvents.length / events.length) * 100 : 50}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>{Math.round((studyEvents.length / Math.max(events.length, 1)) * 100)}% Study</span>
                    <span>{Math.round((examEvents.length / Math.max(events.length, 1)) * 100)}% Exams</span>
                  </div>
                </div>
              </div>

              {/* Today's Focus */}
              <div className="bg-linear-to-br from-primary/5 to-blue-50 rounded-3xl border border-primary/10 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sun size={16} className="text-amber-500" />
                  Today&apos;s Focus
                </h3>
                {(() => {
                  const todayEvents = getEventsForDate(today.getDate());
                  if (todayEvents.length > 0) {
                    return (
                      <div className="space-y-2">
                        {todayEvents.map((ev, idx) => {
                          const style = EVENT_STYLES[ev.type] || EVENT_STYLES.study;
                          const Icon = style.icon;
                          return (
                            <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-gray-200/50">
                              <div className={`w-8 h-8 rounded-lg ${style.iconBg} flex items-center justify-center`}>
                                <Icon size={15} className={style.iconColor} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-800 truncate">{ev.title}</p>
                                <p className="text-[10px] text-gray-500">{ev.time} &middot; {ev.hours || 2}h</p>
                              </div>
                              <CheckCircle2 size={14} className="text-gray-300 hover:text-emerald-500 cursor-pointer transition-colors" />
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                  return (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500">No events scheduled for today</p>
                      <p className="text-xs text-gray-400 mt-1">Enjoy your free day!</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Inline pie chart icon (simple) ─────────────────────────────────────────
function PieChartIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}
