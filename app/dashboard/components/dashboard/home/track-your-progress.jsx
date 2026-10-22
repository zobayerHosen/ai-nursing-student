"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import {
  Calendar,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useGetDashboardHomeData } from "@/hooks";
import { useCalendarCourses, useCalendarEvents } from "@/hooks/calendars-planner";

// Reusable SVG Donut Component with responsive viewBox
const ProgressDonut = ({
  percentage = 0,
  segments = [],
  size = "w-20 h-20 sm:w-22 sm:h-22",
  strokeWidth = 8,
  sublabel = "Completed",
}) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  let accumulatedAngle = 0;

  return (
    <div className={`relative ${size} shrink-0 flex items-center justify-center`}>
      <svg viewBox="0 0 96 96" className="w-full h-full -rotate-90">
        {/* Base circle background */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Dynamic colored segments */}
        {segments.map((seg, i) => {
          const dashLength = (seg.percentage / 100) * circumference;
          const strokeDasharray = `${dashLength} ${circumference - dashLength}`;
          const currentRotation = accumulatedAngle;
          accumulatedAngle += (seg.percentage / 100) * 360;

          return (
            <circle
              key={i}
              cx="48"
              cy="48"
              r={radius}
              stroke={seg.color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              style={{
                transformOrigin: "center",
                transform: `rotate(${currentRotation}deg)`,
                transition: "stroke-dasharray 0.5s ease",
              }}
            />
          );
        })}
      </svg>
      {/* Centered label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-base sm:text-lg font-bold text-[#1E3A8A] leading-none tracking-tight">
          {percentage}%
        </span>
        <span className="text-[9px] font-medium text-slate-400 leading-tight mt-0.5">
          {sublabel}
        </span>
      </div>
    </div>
  );
};

// Card Content: Q-Bank Progress
const QBankCardContent = ({ card }) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mt-3 flex-1 justify-center min-w-0">
    <ProgressDonut percentage={card.percentage} segments={card.segments} />
    <div className="flex flex-col gap-2 sm:gap-2.5 flex-1 w-full min-w-0">
      {card.stats.map((stat, idx) => (
        <div key={idx} className="flex items-start gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full mt-1.5 shrink-0"
            style={{ backgroundColor: stat.color }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline gap-1">
              <span className="text-xs font-bold text-slate-800 truncate">
                {stat.label}
              </span>
              <span className="text-xs font-bold text-slate-800 shrink-0">
                {stat.count}
                <span className="text-[10px] text-slate-400 font-normal">
                  /{stat.total}
                </span>
              </span>
            </div>
            <p className="text-[9.5px] text-slate-400 leading-tight truncate">
              {stat.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Card Content: NCLEX NGN Prep
const NclexCardContent = ({ card }) => (
  <div className="flex items-center gap-2.5 sm:gap-3.5 mt-3 flex-1 justify-between min-w-0">
    <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0">
      {card.exams.map((exam, idx) => (
        <div key={idx} className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1.5 min-w-0">
            {exam.status === "completed" && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3A8A] shrink-0" />
            )}
            {exam.status === "start" && (
              <PlayCircle className="w-3.5 h-3.5 text-[#F43F5E] fill-[#F43F5E]/10 shrink-0" />
            )}
            {exam.status === "locked" && (
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            )}
            <span
              className={`text-[10px] sm:text-[11px] font-bold truncate ${exam.status === "locked" ? "text-slate-400" : "text-slate-700"
                }`}
            >
              {exam.name}
            </span>
          </div>

          <div className="text-right shrink-0">
            {exam.status === "completed" && (
              <div className="flex flex-col leading-none">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-800">
                  {exam.score}
                </span>
                <span className="text-[7.5px] sm:text-[8px] text-slate-400 uppercase font-semibold mt-0.5">
                  {exam.date}
                </span>
              </div>
            )}
            {exam.status === "start" && (
              <Link
                href={exam.actionLink || "#"}
                className="text-[10px] sm:text-[11px] font-bold text-[#F43F5E] hover:underline"
              >
                {exam.actionText}
              </Link>
            )}
            {exam.status === "locked" && (
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">
                {exam.actionText}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="flex flex-col items-center pl-2.5 sm:pl-3 border-l border-slate-200/80 shrink-0">
      <ProgressDonut
        percentage={card.percentage}
        segments={card.segments}
        size="w-18 h-18 sm:w-20 sm:h-20"
      />
      <p className="text-[8px] sm:text-[8.5px] text-slate-500 font-medium text-center mt-2 max-w-20 sm:max-w-22.5 leading-tight">
        {card.motivation}
      </p>
    </div>
  </div>
);

// Card Content: Flashcards
const FlashcardCardContent = ({ card }) => (
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 mt-3 flex-1 justify-center min-w-0">
    <ProgressDonut percentage={card.percentage} segments={card.segments} />
    <div className="flex flex-col gap-2 sm:gap-2.5 flex-1 w-full min-w-0">
      {card.stats?.map((stat, idx) => (
        <div key={idx} className="flex items-start gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full mt-1.5 shrink-0"
            style={{ backgroundColor: stat.color }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline gap-1">
              <span className="text-xs font-bold text-slate-800 truncate">
                {stat.label}
              </span>
              <span className="text-xs font-bold text-slate-800 shrink-0">
                {stat.count}
                <span className="text-[10px] text-slate-400 font-normal">
                  /{stat.total}
                </span>
              </span>
            </div>
            <p className="text-[9.5px] text-slate-400 leading-tight truncate">
              {stat.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Helper function to transform API track_your_progress cards
const transformProgressCards = (apiCards) => {
  if (!apiCards || !Array.isArray(apiCards) || apiCards.length === 0) {
    return [];
  }

  return apiCards.map((card, index) => {
    const cardType = card.card_type || card.type;

    if (cardType === "qbank") {
      const totalQuestions = card.total_questions ?? 0;
      const totalTopics = card.total_topics ?? 0;
      const total = totalQuestions > 0 ? totalQuestions : 1;

      const correctCount = card.breakdown?.correct?.count ?? 0;
      const incorrectCount = card.breakdown?.incorrect?.count ?? 0;
      const untouchedCount =
        card.breakdown?.untouched?.count ??
        (totalQuestions > 0 ? Math.max(0, totalQuestions - correctCount - incorrectCount) : 0);

      const segments = [
        {
          color: card.breakdown?.correct?.color || "#0284C7",
          percentage: (correctCount / total) * 100,
        },
        {
          color: card.breakdown?.incorrect?.color || "#F43F5E",
          percentage: (incorrectCount / total) * 100,
        },
        {
          color: card.breakdown?.untouched?.color || "#CBD5E1",
          percentage: (untouchedCount / total) * 100,
        },
      ];

      const stats = [
        {
          label: card.breakdown?.correct?.label || "Correct",
          count: correctCount,
          total: card.breakdown?.correct?.total ?? totalQuestions,
          desc: card.breakdown?.correct?.subtext || "Got it right first try",
          color: card.breakdown?.correct?.color || "#0284C7",
        },
        {
          label: card.breakdown?.incorrect?.label || "Incorrect",
          count: incorrectCount,
          total: card.breakdown?.incorrect?.total ?? totalQuestions,
          desc: card.breakdown?.incorrect?.subtext || "Worth a re-attempt",
          color: card.breakdown?.incorrect?.color || "#F43F5E",
        },
        {
          label: card.breakdown?.untouched?.label || "Untouched",
          count: untouchedCount,
          total: card.breakdown?.untouched?.total ?? totalQuestions,
          desc: card.breakdown?.untouched?.subtext || "Still to attempt",
          color: card.breakdown?.untouched?.color || "#CBD5E1",
        },
      ];

      return {
        id: card.id || `qbank-${index}`,
        type: "qbank",
        title: card.title || "Q-Bank Progress",
        subtitle:
          card.subtitle || `${totalQuestions} questions across ${totalTopics} topics`,
        actionText: card.action_text
          ? card.action_text.replace(/->|>/g, "").trim()
          : "Build a custom test",
        actionLink: "/dashboard/qbank",
        percentage: card.completed_percentage ?? 0,
        segments,
        stats,
      };
    }

    if (cardType === "nclex_prep" || cardType === "nclex") {
      const completedCount = card.completed_count ?? 0;
      const totalExams = card.total_exams ?? 5;
      const percentage =
        card.completed_percentage ??
        (totalExams > 0 ? Math.round((completedCount / totalExams) * 100) : 0);

      const segments = [
        { color: "#1E3A8A", percentage: percentage },
        { color: "#DBEAFE", percentage: 100 - percentage },
      ];

      const motivation = card.encouragement
        ? `${card.encouragement.title || "Keep going!"} ${card.encouragement.subtitle || "You're making excellent progress"}`
        : card.motivation || "Keep going! You're making excellent progress";

      const exams = (card.exams || []).map((exam, i) => {
        const isCompleted = exam.status === "completed";
        const isStart = exam.status === "available" || exam.status === "start";

        return {
          name: exam.title || exam.name || `Exam ${exam.order || i + 1}`,
          status: isCompleted ? "completed" : isStart ? "start" : "locked",
          score:
            exam.score_formatted ||
            (exam.score !== null && exam.score !== undefined ? `${exam.score}%` : null),
          date: exam.completed_date || exam.date || "",
          actionText: exam.action_label || (isStart ? "Start" : "Locked"),
          actionLink: "/dashboard/nclex-exam",
        };
      });

      return {
        id: card.id || `nclex-${index}`,
        type: "nclex",
        title: card.title || "NCLEX NGN Prep",
        badge: card.subtitle || `${completedCount}/${totalExams} Completed`,
        percentage,
        segments,
        motivation,
        exams,
      };
    }

    if (cardType === "flashcards" || cardType === "flashcard") {
      const totalCards = card.total_cards ?? 0;
      const total = totalCards > 0 ? totalCards : 1;
      const masteredCount =
        card.breakdown?.mastered?.count ?? card.mastered_count ?? 0;
      const learningCount =
        card.breakdown?.learning?.count ?? card.learning_count ?? 0;
      const untouchedCount =
        card.breakdown?.untouched?.count ??
        card.untouched_count ??
        (totalCards > 0 ? Math.max(0, totalCards - masteredCount - learningCount) : 0);

      const segments = [
        {
          color: card.breakdown?.mastered?.color || "#10B981",
          percentage: (masteredCount / total) * 100,
        },
        {
          color: card.breakdown?.learning?.color || "#F59E0B",
          percentage: (learningCount / total) * 100,
        },
        {
          color: card.breakdown?.untouched?.color || "#CBD5E1",
          percentage: (untouchedCount / total) * 100,
        },
      ];

      const stats = [
        {
          label: card.breakdown?.mastered?.label || "Mastered",
          count: masteredCount,
          total: card.breakdown?.mastered?.total ?? totalCards,
          desc: card.breakdown?.mastered?.subtext || "Got it right easily",
          color: card.breakdown?.mastered?.color || "#10B981",
        },
        {
          label: card.breakdown?.learning?.label || "Learning",
          count: learningCount,
          total: card.breakdown?.learning?.total ?? totalCards,
          desc: card.breakdown?.learning?.subtext || "Needs review",
          color: card.breakdown?.learning?.color || "#F59E0B",
        },
        {
          label: card.breakdown?.untouched?.label || "Untouched",
          count: untouchedCount,
          total: card.breakdown?.untouched?.total ?? totalCards,
          desc: card.breakdown?.untouched?.subtext || "Still to study",
          color: card.breakdown?.untouched?.color || "#CBD5E1",
        },
      ];

      return {
        id: card.id || `flashcard-${index}`,
        type: "flashcard",
        title: card.title || "Flashcards",
        subtitle: card.subtitle || "SRS health across your decks",
        actionText: card.action_text
          ? card.action_text.replace(/->|>/g, "").trim()
          : "Review cards",
        actionLink: "/dashboard/flashcards",
        percentage: card.completed_percentage ?? 0,
        segments,
        stats,
        subtext:
          card.footer_text ||
          card.subtext ||
          "SRS Card Mastery across your active decks",
      };
    }

    return card;
  });
};

function formatDateYMD(d) {
  if (!d) return "";
  const dateObj = d instanceof Date ? d : new Date(d);
  if (isNaN(dateObj.getTime())) return "";
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const COURSE_COLORS = [
  "#8B5CF6",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#0EA5E9",
  "#EC4899",
  "#14B8A6",
];

function getCourseColor(courseCode, coursesList) {
  const cleanCode = (courseCode || "").trim().toUpperCase();
  if (cleanCode.includes("612")) return "#8B5CF6";
  if (cleanCode.includes("MEDSURG") || cleanCode.includes("2015")) return "#3B82F6";

  if (!coursesList || coursesList.length === 0) return "#3B82F6";
  const idx = coursesList.findIndex(
    (c) =>
      c.code &&
      c.code.trim().toUpperCase() === cleanCode
  );
  return COURSE_COLORS[idx >= 0 ? idx % COURSE_COLORS.length : 0];
}

function getTaskBadge(task) {
  const dl = (task.days_left || "").toLowerCase().trim();
  const todayStr = formatDateYMD(new Date());
  const isPast =
    dl === "past" ||
    dl === "overdue" ||
    dl.includes("past") ||
    (task.date && task.date < todayStr);

  if (isPast) {
    return {
      label: "Past Due",
      className: "border border-[#FECACA] text-[#DC2626] bg-[#FEE2E2]/60",
    };
  }
  if (dl === "today") {
    return {
      label: "Today",
      className: "border border-[#FDE68A] text-[#D97706] bg-[#FEF3C7]/40",
    };
  }
  return {
    label: task.days_left || "Due Soon",
    className: "border border-[#BFDBFE] text-[#2563EB] bg-[#EFF6FF]/60",
  };
}

export default function TracYourProgress() {
  const { dashboardData, isLoading } = useGetDashboardHomeData();
  const { coursesData } = useCalendarCourses();
  const { eventsData } = useCalendarEvents();

  const trackYourProgressData = dashboardData?.track_your_progress;
  const cards = React.useMemo(() => {
    return transformProgressCards(trackYourProgressData);
  }, [trackYourProgressData]);

  const upcomingTaskList = dashboardData?.upcoming_tasks?.tasks || [];

  // Unified courses list (from calendars-tool or dashboardData fallback)
  const coursesList = React.useMemo(() => {
    if (coursesData && coursesData.length > 0) {
      return coursesData;
    }
    const summaryCards = dashboardData?.summary_cards;
    const classesInfo = summaryCards?.classes;
    const uniqueCodes = [
      ...new Set(upcomingTaskList.map((t) => t.course_code).filter(Boolean)),
    ];
    if (uniqueCodes.length > 0) {
      return uniqueCodes.map((code) => ({
        code: code.startsWith("NUR") ? code : `NUR ${code}`,
        name: "Active Nursing Course",
        term: "Current Semester",
        status: "In Progress",
      }));
    }
    if (classesInfo?.count) {
      return [
        {
          code: "NUR 201",
          name: "Adult Health Nursing I",
          term: "Current Semester",
          status: "In Progress",
        },
      ];
    }
    return [];
  }, [coursesData, dashboardData, upcomingTaskList]);

  // Filter and prioritize active tasks (coming data first, past due last)
  const activeTaskList = React.useMemo(() => {
    let list = [];
    if (eventsData && eventsData.length > 0) {
      list = eventsData.filter((e) => !e.completed);
    } else {
      list = upcomingTaskList.map((t) => ({
        ...t,
        course: t.course_code || t.course,
        type: t.category || t.type || "assignment",
      }));
    }

    const todayStr = formatDateYMD(new Date());

    // Filter for tasks that are Due This Week or Past Due
    const dueThisWeekOrPast = list.filter((task) => {
      const dl = (task.days_left || "").toLowerCase().trim();
      const isPast =
        dl === "past" ||
        dl === "overdue" ||
        dl.includes("past") ||
        (task.date && task.date < todayStr);

      if (isPast) return true;

      if (
        dl === "today" ||
        dl === "1d" ||
        dl === "2d" ||
        dl === "3d" ||
        dl === "4d" ||
        dl === "5d" ||
        dl === "6d" ||
        dl === "7d" ||
        dl.includes("day")
      ) {
        return true;
      }

      if (task.date) {
        const diffDays = Math.ceil(
          (new Date(task.date) - new Date()) / (1000 * 60 * 60 * 24)
        );
        return diffDays >= 0 && diffDays <= 7;
      }

      return false;
    });

    const result = dueThisWeekOrPast.length > 0 ? dueThisWeekOrPast : list;

    // Helper to extract days count for upcoming tasks
    const getDaysLeftNumber = (task) => {
      const dl = (task.days_left || "").toLowerCase().trim();
      if (dl === "today") return 0;
      const match = dl.match(/(\d+)/);
      if (match) return parseInt(match[1], 10);
      if (task.date) {
        const diff = Math.ceil(
          (new Date(task.date) - new Date()) / (1000 * 60 * 60 * 24)
        );
        return diff >= 0 ? diff : 999;
      }
      return 999;
    };

    // Sort order: Coming data shows first, past due shows last
    return result.sort((a, b) => {
      const aDl = (a.days_left || "").toLowerCase().trim();
      const bDl = (b.days_left || "").toLowerCase().trim();

      const aPast =
        aDl === "past" ||
        aDl === "overdue" ||
        aDl.includes("past") ||
        (a.date && a.date < todayStr);
      const bPast =
        bDl === "past" ||
        bDl === "overdue" ||
        bDl.includes("past") ||
        (b.date && b.date < todayStr);

      // Coming data shows first, past due shows last
      if (!aPast && bPast) return -1;
      if (aPast && !bPast) return 1;

      // Both are upcoming: sort by days left soonest to latest (Today -> 1d -> 2d -> 3d -> ...)
      if (!aPast && !bPast) {
        const aNum = getDaysLeftNumber(a);
        const bNum = getDaysLeftNumber(b);
        if (aNum !== bNum) return aNum - bNum;
        if (a.date && b.date) return a.date.localeCompare(b.date);
      }

      // Both are past due: sort by date (most recently past due first)
      if (aPast && bPast) {
        if (a.date && b.date) return b.date.localeCompare(a.date);
      }

      return 0;
    });
  }, [eventsData, upcomingTaskList]);

  return (
    <section className="w-full max-w-full min-w-0 flex flex-col xl:flex-row items-stretch gap-4 sm:gap-5 overflow-hidden">
      {/* Left Card: Track Your Progress with Slider */}
      <div className="flex-1 min-w-0 max-w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-4 xs:p-5 sm:p-6 flex flex-col justify-start relative overflow-hidden">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
            Track Your Progress
          </h2>
        </div>

        {/* Swiper Slider Wrapper with Side Tab Navigation */}
        <div className="relative w-full max-w-full min-w-0 overflow-hidden">
          {/* Left Arrow Button (styled like a side tab) */}
          <button
            className="swiper-prev-progress absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 sm:w-8 h-12 sm:h-16 bg-white/95 hover:bg-white active:bg-slate-50 shadow-[2px_0_10px_rgba(0,0,0,0.08)] rounded-r-xl border border-slate-200/80 border-l-0 flex items-center justify-center text-[#1E3A8A] cursor-pointer transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          {/* Right Arrow Button (styled like a side tab) */}
          <button
            className="swiper-next-progress absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 sm:w-8 h-12 sm:h-16 bg-white/95 hover:bg-white active:bg-slate-50 shadow-[-2px_0_10px_rgba(0,0,0,0.08)] rounded-l-xl border border-slate-200/80 border-r-0 flex items-center justify-center text-[#1E3A8A] cursor-pointer transition-all disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".swiper-prev-progress",
              nextEl: ".swiper-next-progress",
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 12 },
              640: { slidesPerView: 1.15, spaceBetween: 14 },
              768: { slidesPerView: 2, spaceBetween: 16 },
              1280: { slidesPerView: 2, spaceBetween: 16 },
            }}
            className="w-full max-w-full overflow-hidden py-1!"
          >
            {cards?.map((card) => (
              <SwiperSlide key={card.id} className="h-auto">
                <div className="bg-[#FAFBFD] border border-slate-200/80 rounded-2xl p-4 sm:p-5 h-full flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xs transition-shadow w-full min-h-62.5 sm:min-h-66.25">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="min-w-0 flex-1">
                      <h4
                        className="text-base sm:text-lg font-bold text-[#1E3A8A] hover:underline cursor-pointer truncate"
                      >
                        {card.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                        {card.subtitle ?? "N/F"}
                      </p>
                    </div>

                    {card.actionText && (
                      <Link
                        href={card.actionLink || "#"}
                        className="text-[10px] sm:text-[11px] font-semibold text-[#1E3A8A] hover:underline flex items-center gap-0.5 shrink-0 mt-0.5"
                      >
                        <span>{card.actionText}</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}

                    {card.badge && (
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 shrink-0 mt-0.5">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  {card.type === "qbank" && <QBankCardContent card={card} />}
                  {card.type === "nclex" && <NclexCardContent card={card} />}
                  {card.type === "flashcard" && <FlashcardCardContent card={card} />}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Right Card: Active Tasks */}
      <div className="w-full xl:w-[32%] xl:min-w-70 2xl:min-w-[320px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-4 xs:p-5 sm:p-6 flex flex-col shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-[#1E3A8A]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1E3A8A] tracking-tight">
              Active Tasks
            </h3>
          </div>
          <Link
            href="/dashboard/calendars-tool"
            className="text-[11px] font-bold text-[#1E3A8A] hover:underline flex items-center gap-0.5"
          >
            <span>View Calendar</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Marked Area: Active Tasks List (Only show the data without opening modal) */}
        <div className="flex flex-col gap-2 flex-1 overflow-y-auto max-h-[380px] sm:max-h-[420px] pr-1">
          {activeTaskList.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-600">All caught up!</p>
              <p className="text-[11px] text-slate-400 mt-0.5">No tasks due this week or past due</p>
            </div>
          ) : (
            activeTaskList.map((task) => {
              const courseCode = task.course_code || task.course || "General";
              const courseColor = getCourseColor(courseCode, coursesList);
              const badge = getTaskBadge(task);

              return (
                <div
                  key={task.id}
                  className="group flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#E2E8F0]/70 hover:border-slate-300 transition-all shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: courseColor }}
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#0F172A] leading-tight truncate">
                        {task.title ?? "Untitled Task"}
                      </h4>
                      <p className="text-[11px] font-medium text-[#64748B] mt-0.5 truncate">
                        {courseCode}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}