"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCreateEvent } from "@/hooks/calendars-planner";

const TASK_TYPES = [
  { value: "assignment", label: "Assignment" },
  { value: "quiz", label: "Quiz" },
  { value: "exam", label: "Midterm Exam / Final" },
  { value: "lecture", label: "Lecture" },
  { value: "clinical", label: "Clinical" },
  { value: "skills-lab", label: "Skills Lab" },
  { value: "simulation", label: "Simulation" },
  { value: "study-session", label: "Study Session" },
  { value: "study-group", label: "Study Group" },
  { value: "nclex-practice", label: "NCLEX Practice" },
  { value: "reading", label: "Reading" },
  { value: "project", label: "Project" },
  { value: "presentation", label: "Presentation" },
  { value: "check-off", label: "Skills Check-off" },
  { value: "deadline", label: "Deadline" },
  { value: "work-shift", label: "Work Shift" },
  { value: "appointment", label: "Appointment" },
  { value: "vacation", label: "Vacation" },
  { value: "holiday", label: "Holiday" },
  { value: "other", label: "Personal / Other" },
];

function formatDateYMD(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function AddTaskModal({ isOpen, onClose, courses = [], selectedDate }) {
  const { createEvent, isCreating } = useCreateEvent();

  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [category, setCategory] = useState("assignment");
  const [instructor, setInstructor] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [officeRoom, setOfficeRoom] = useState("");
  const [date, setDate] = useState(selectedDate || formatDateYMD(new Date()));
  const [points, setPoints] = useState("10");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen && selectedDate) {
      setDate(selectedDate);
    }
  }, [isOpen, selectedDate]);

  const handleCourseChange = (selectedCode) => {
    setCourseCode(selectedCode);
    const matched = courses.find((c) => c.code === selectedCode);
    if (matched) {
      if (matched.instructor && !instructor) setInstructor(matched.instructor);
      if (matched.email && !email) setEmail(matched.email);
      if (matched.room && !officeRoom) setOfficeRoom(matched.room);
    }
  };

  const handleTypeChange = (val) => {
    setCategory(val);
    setPoints(val === "exam" ? "100" : "10");
  };

  const isFormValid = Boolean(title.trim() && date && category);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isCreating) return;

    let pointsNum = parseFloat(points);
    if (isNaN(pointsNum) || pointsNum <= 0) {
      pointsNum = category === "exam" ? 100 : 10;
    }

    const payload = {
      title: title.trim(),
      date,
      course_code: courseCode,
      category,
      points: pointsNum,
      instructor: instructor.trim(),
      email: email.trim(),
      location: location.trim(),
      office_room: officeRoom.trim(),
      start_time: startTime.trim(),
      end_time: endTime.trim(),
      description: description.trim(),
      source: "manual",
    };

    try {
      const result = await createEvent(payload);
      if (result?.is_duplicate_warning) {
        alert("Note: An event with this title, course, and date already exists. The task was recorded.");
      }
      // Reset form
      setTitle("");
      setCourseCode("");
      setCategory("assignment");
      setInstructor("");
      setEmail("");
      setLocation("");
      setOfficeRoom("");
      setPoints("10");
      setStartTime("");
      setEndTime("");
      setDescription("");
      onClose();
    } catch (err) {
      alert("Error creating task. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="add-task-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-500 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key="add-task-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-3 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">+ Add Academic Task</h3>
                <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                  Create a custom assignment, quiz, exam, study session, or personal academic event.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] transition-all cursor-pointer shrink-0"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              {/* Task Title * */}
              <div>
                <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. SBAR Case Study Draft"
                  required
                  className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] placeholder:text-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>

              {/* Course + Type * row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">Course</label>
                  <select
                    value={courseCode}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-xs text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="">No Course / Personal</option>
                    {courses.map((c) => (
                      <option key={c.code || c.id} value={c.code}>
                        {c.code} {c.name ? `- ${c.name}` : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">Type *</label>
                  <select
                    value={category}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    required
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2.5 text-xs text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                  >
                    {TASK_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Instructor Name (optional) + Instructor Email (optional) row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">
                    Instructor Name (optional)
                  </label>
                  <input
                    type="text"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    placeholder="e.g. Dr. Sarah Smith"
                    className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] placeholder:text-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">
                    Instructor Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sarah.smith@university.edu"
                    className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] placeholder:text-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Location / Class (optional) + Office Room (optional) row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">
                    Location / Class (optional)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. SCI 204 or Online"
                    className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] placeholder:text-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">
                    Office Room (optional)
                  </label>
                  <input
                    type="text"
                    value={officeRoom}
                    onChange={(e) => setOfficeRoom(e.target.value)}
                    placeholder="e.g. Room 409"
                    className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] placeholder:text-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Date * */}
              <div>
                <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                />
              </div>

              {/* Start Time (optional) + End Time (optional) row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">
                    Start Time (optional)
                  </label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="e.g. 09:00 AM"
                    className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] placeholder:text-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">
                    End Time (optional)
                  </label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="e.g. 10:15 AM"
                    className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] placeholder:text-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Description (optional) */}
              <div>
                <label className="text-xs font-semibold text-[#1E293B] block mb-1.5">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Notes or submission instructions..."
                  className="w-full border border-[#E2E8F0] rounded-lg px-3.5 py-2.5 text-xs text-[#1E293B] placeholder:text-[#94A3B8] bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isCreating || !isFormValid}
                className={`w-full bg-[#2563EB] text-white text-sm font-semibold rounded-xl py-3 shadow-sm transition-all ${
                  !isFormValid || isCreating
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#1D4ED8] cursor-pointer"
                }`}
              >
                {isCreating ? "Saving..." : "Save Task"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}