"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCreateEvent } from "@/hooks/calendars-planner";

const TASK_TYPES = [
  { value: "assignment", label: "Assignment" },
  { value: "quiz", label: "Quiz" },
  { value: "exam", label: "Midterm Exam / Final" },
  { value: "lab", label: "Lab / Clinical" },
  { value: "reading", label: "Reading" },
  { value: "project", label: "Project" },
  { value: "presentation", label: "Presentation" },
  { value: "class", label: "Class / Lecture" },
  { value: "check-off", label: "Check-off" },
  { value: "deadline", label: "Deadline" },
  { value: "holiday", label: "Holiday" },
  { value: "other", label: "Other" },
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
  const [date, setDate] = useState(selectedDate || formatDateYMD(new Date()));
  const [points, setPoints] = useState("10");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen && selectedDate) {
      setDate(selectedDate);
    }
  }, [isOpen, selectedDate]);

  const handleTypeChange = (val) => {
    setCategory(val);
    setPoints(val === "exam" ? "100" : "10");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

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
      start_time: startTime.trim(),
      end_time: endTime.trim(),
      location: location.trim(),
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
      setPoints("10");
      setStartTime("");
      setEndTime("");
      setLocation("");
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
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            key="add-task-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#1D2939]">+ Add Academic Task</h3>
            <p className="text-xs text-[#667085] mt-1">
              Create a custom assignment, quiz, exam, study session, or personal academic event.
            </p>
          </div>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#374151] transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 pb-5 flex flex-col gap-3">
          {/* Title */}
          <div>
            <label className="text-xs font-bold text-[#334155] block mb-1">Task Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. SBAR Case Study Draft"
              required
              className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>

          {/* Course + Type row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#334155] block mb-1">Course</label>
              <select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="">No Course / Personal</option>
                {courses.map((c) => (
                  <option key={c.code || c.id} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-[#334155] block mb-1">Type *</label>
              <select
                value={category}
                onChange={(e) => handleTypeChange(e.target.value)}
                required
                className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                {TASK_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date + Points row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#334155] block mb-1">Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#334155] block mb-1">Points Possible</label>
              <input
                type="number"
                step="1"
                min="0"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="e.g. 50"
                className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>

          {/* Start/End Time row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#334155] block mb-1">Start Time (optional)</label>
              <input
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="e.g. 09:00 AM"
                className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#334155] block mb-1">End Time (optional)</label>
              <input
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="e.g. 10:15 AM"
                className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-xs font-bold text-[#334155] block mb-1">Location / Room (optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. SCI 204 or Online"
              className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-[#334155] block mb-1">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Notes or submission instructions..."
              className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2 bg-[#F8FAFC] text-xs leading-5 text-[#53606D] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isCreating}
            className="cursor-pointer w-full bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl py-2.5 transition-all disabled:opacity-50"
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
