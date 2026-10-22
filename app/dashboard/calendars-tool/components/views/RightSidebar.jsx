"use client";
import { useState } from "react";
import { Clock, BookOpen, X, User, Mail, MapPin, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EventModal from "./EventModal";

const COURSE_COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#0EA5E9", "#EC4899", "#14B8A6"];

function cleanValue(val) {
  if (!val) return "";
  const upper = val.trim().toUpperCase();
  if (upper === "UNKNOWN" || upper === "N/A") return "";
  return val.trim();
}

// Course Details Modal
function CourseDetailsModal({ course, color, onClose }) {
  if (!course) return null;

  const code = cleanValue(course.code) || "Course";
  const name = cleanValue(course.name) || "";
  const instructor = cleanValue(course.instructor) || "";
  const email = cleanValue(course.email) || "";
  const office = cleanValue(course.room) || "";
  const officeHours = cleanValue(course.office_hours) || "";
  const classMeetings = cleanValue(course.class_meetings) || "";
  const description = cleanValue(course.description) || "";
  const policies = cleanValue(course.policies) || "";
  const courseIncludes = Array.isArray(course.course_includes) && course.course_includes.length > 0
    ? course.course_includes
    : [];

  return (
    <AnimatePresence>
      <motion.div
        key="course-details-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-200 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          key="course-details-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col border border-[#E2E8F0]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#F1F5F9]">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A]">{code}</h2>
              {name && <p className="text-sm text-[#64748B] mt-0.5 font-medium">{name}</p>}
            </div>

            <button
              onClick={onClose}
              className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center text-[#94A3B8] hover:text-[#334155] hover:bg-[#F1F5F9] transition-all shrink-0"
            >
              <X size={18} />
            </button>
          </div>



          {/* Body */}
          <div className="overflow-y-auto flex-1 p-6 flex flex-col gap-5">
            {/* Info grid */}
            <div className="grid grid-cols-2 gap-4 bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
              {/* Col 1 */}
              <div className="flex flex-col gap-4">
                {instructor && (
                  <div className="flex items-start gap-2.5">
                    <User size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-[#0F172A] mb-0.5">Instructor</p>
                      <p className="text-xs text-[#64748B] leading-snug">{instructor}</p>
                    </div>
                  </div>
                )}
                {email && (
                  <div className="flex items-start gap-2.5">
                    <Mail size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-[#0F172A] mb-0.5">Email</p>
                      <a href={`mailto:${email}`} className="text-xs text-[#2563EB] font-semibold hover:underline break-all">
                        {email}
                      </a>
                    </div>
                  </div>
                )}
                {office && (
                  <div className="flex items-start gap-2.5">
                    <MapPin size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-[#0F172A] mb-0.5">Office</p>
                      <p className="text-xs text-[#64748B] leading-snug">{office}</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Col 2 */}
              <div className="flex flex-col gap-4">
                {officeHours && (
                  <div className="flex items-start gap-2.5">
                    <Clock size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-[#0F172A] mb-0.5">Office Hours</p>
                      <p className="text-xs text-[#64748B] leading-snug whitespace-pre-line">{officeHours}</p>
                    </div>
                  </div>
                )}
                {classMeetings && (
                  <div className="flex items-start gap-2.5">
                    <Calendar size={16} className="text-[#2563EB] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-bold text-[#0F172A] mb-0.5">Class Meetings</p>
                      <p className="text-xs text-[#64748B] leading-snug whitespace-pre-line">{classMeetings}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course includes */}
            {courseIncludes.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] mb-2">This course includes</h3>
                <div className="flex flex-col divide-y divide-[#F1F5F9]">
                  {courseIncludes.map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 py-2 text-sm text-[#334155] font-medium">
                      <BookOpen size={15} className="text-[#2563EB] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {description && (
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] mb-1.5">Course Description</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{description}</p>
              </div>
            )}

            {/* Policies */}
            {policies && (
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] mb-1.5">Course Policies</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{policies}</p>
              </div>
            )}

            {/* Fallback when none of the extra info is available */}
            {!instructor && !email && !office && !officeHours && !classMeetings && !description && !policies && courseIncludes.length === 0 && (
              <p className="text-xs text-[#94A3B8] text-center py-4">No additional course details available.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function RightSidebar({ onUploadMore, coursesData = [], eventsData = [] }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
  const [selectedDeadlineEvent, setSelectedDeadlineEvent] = useState(null);

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

  const handleMoreInfo = (course, idx) => {
    setSelectedCourse(course);
    setSelectedCourseIdx(idx);
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
        <div className="flex flex-col gap-0">
          {coursesData?.length === 0 ? (
            <div className="text-xs text-[#667085] py-3">
              No courses added yet.<br />
              Upload a syllabus to add your first course.
            </div>
          ) : (
            coursesData?.map((c, i) => {
              let code = cleanValue(c.code) || "Course";
              const color = COURSE_COLORS[i % COURSE_COLORS.length];
              const term = c.term || c.semester || "";
              const status = c.status || "In Progress";

              return (
                <div
                  key={c.id || c.code}
                  className="flex items-center gap-3 py-3 border-b border-[#F2F4F7] last:border-b-0 cursor-pointer hover:bg-[#F9FAFB] rounded-lg px-1 transition-colors"
                  onClick={() => handleMoreInfo(c, i)}
                >
                  {/* Content */}
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <p className="text-sm font-extrabold text-[#0F172A] leading-tight">{code}</p>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {term && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#7E22CE]">
                          {term}
                        </span>
                      )}
                      {c.credits && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#DBEAFE] text-[#1D4ED8]">
                          {c.credits} cr
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
                        {status}
                      </span>
                    </div>
                    <button
                      className="mt-2 cursor-pointer text-[11px] font-semibold text-[#64748B] hover:text-[#2563EB] hover:underline transition-colors w-fit"
                      onClick={(e) => { e.stopPropagation(); handleMoreInfo(c, i); }}
                    >
                      More Info
                    </button>
                  </div>
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
                <div
                  key={d.id}
                  className="flex items-center justify-between gap-2 cursor-pointer hover:bg-[#F9FAFB] rounded-lg px-1 py-1 -mx-1 transition-colors"
                  onClick={() => setSelectedDeadlineEvent(d)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1D2939] truncate">{d.title}</p>
                    <p className="text-[10px] text-[#667085] mt-0.5">
                      • {d.course_code || "Personal"}
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

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          color={COURSE_COLORS[selectedCourseIdx % COURSE_COLORS.length]}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {/* Deadline Event Modal */}
      <EventModal
        event={selectedDeadlineEvent}
        coursesData={coursesData}
        onClose={() => setSelectedDeadlineEvent(null)}
      />
    </div>
  );
}
