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

// Mock Data for Progress Slider Cards
const progressCards = [
  {
    id: "qbank",
    type: "qbank",
    title: "Q-Bank Progress",
    subtitle: "2,017 questions across 12 topics",
    actionText: "Build a custom test",
    actionLink: "/dashboard/qbank",
    percentage: 35,
    segments: [
      { color: "#1E3A8A", percentage: 35 },
      { color: "#F43F5E", percentage: 15 },
      { color: "#93C5FD", percentage: 50 },
    ],
    stats: [
      { label: "Correct", count: "485", total: "1,517", desc: "Got it right first try", color: "#1E3A8A" },
      { label: "Incorrect", count: "215", total: "1,517", desc: "Worth a re-attempt", color: "#F43F5E" },
      { label: "Untouched", count: "485", total: "1,517", desc: "Still to attempt", color: "#93C5FD" },
    ],
  },
  {
    id: "nclex",
    type: "nclex",
    title: "NCLEX NGN Prep",
    badge: "2/5 Completed",
    percentage: 35,
    segments: [
      { color: "#F43F5E", percentage: 35 },
      { color: "#DBEAFE", percentage: 65 },
    ],
    motivation: "Keep going! You're making excellent progress",
    exams: [
      { name: "Exam 1", status: "completed", score: "78%", date: "JAN 4, 2026" },
      { name: "Exam 2", status: "completed", score: "78%", date: "JAN 4, 2026" },
      { name: "Exam 3", status: "start", actionText: "Start", actionLink: "/dashboard/nclex-rn" },
      { name: "Exam 4", status: "locked", actionText: "Locked" },
      { name: "Exam 5", status: "locked", actionText: "Locked" },
    ],
  },
  {
    id: "flashcard",
    type: "flashcard",
    title: "Flashcards",
    subtitle: "SRS health across your decks",
    actionText: "Review cards",
    actionLink: "/dashboard/flashcards",
    percentage: 35,
    segments: [
      { color: "#1E3A8A", percentage: 35 },
      { color: "#DBEAFE", percentage: 65 },
    ],
    subtext: "SRS Card Mastery across your active decks",
  },
];

// Mock Data for Upcoming Tasks
const upcomingTasks = [
  { id: 1, title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#1E3A8A", tagBg: "#FFE4E6", tagColor: "#F43F5E" },
  { id: 2, title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#F43F5E", tagBg: "#FFE4E6", tagColor: "#F43F5E" },
  { id: 3, title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#22C55E", tagBg: "#FEF9C3", tagColor: "#CA8A04" },
  { id: 4, title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#22C55E", tagBg: "#FEF9C3", tagColor: "#CA8A04" },
  { id: 5, title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#A855F7", tagBg: "#F3F4F6", tagColor: "#6B7280" },
  { id: 6, title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#A855F7", tagBg: "#F3F4F6", tagColor: "#6B7280" },
];

// Reusable SVG Donut Component with responsive viewBox
const ProgressDonut = ({
  percentage = 35,
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
  <div className="flex flex-col items-center justify-center flex-1 py-4 mt-2 min-w-0">
    <ProgressDonut
      percentage={card.percentage}
      segments={card.segments}
      size="w-22 h-22 sm:w-24 sm:h-24"
    />
    <p className="text-xs text-slate-500 font-medium text-center mt-3 max-w-47.5">
      {card.subtext}
    </p>
  </div>
);

export default function TracYourProgress() {
  return (
    <section className="w-full max-w-full min-w-0 flex flex-col xl:flex-row items-stretch gap-4 sm:gap-5 overflow-hidden">
      {/* Left Card: Track Your Progress with Slider */}
      <div className="flex-1 min-w-0 max-w-full bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-4 xs:p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
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
            {progressCards.map((card) => (
              <SwiperSlide key={card.id} className="h-auto">
                <div className="bg-[#FAFBFD] border border-slate-200/80 rounded-2xl p-4 sm:p-5 h-full flex flex-col justify-between shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xs transition-shadow w-full min-h-62.5 sm:min-h-66.25">
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-[#1E3A8A] hover:underline cursor-pointer truncate">
                        {card.title}
                      </h3>
                      {card.subtitle && (
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                          {card.subtitle}
                        </p>
                      )}
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

      {/* Right Card: Upcoming Tasks */}
      <div className="w-full xl:w-[32%] xl:min-w-70 2xl:min-w-[320px] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs p-4 xs:p-5 sm:p-6 flex flex-col justify-between shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4.5 h-4.5 text-[#1E3A8A]" />
            <h3 className="text-sm sm:text-base font-bold text-[#1E3A8A] tracking-tight">
              Upcoming Tasks
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

        {/* Tasks List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:flex xl:flex-col flex-1 justify-center">
          {upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50/70 transition-colors"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: task.dotColor }}
                />
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight truncate">
                    {task.title}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5 truncate">
                    {task.subtitle}
                  </p>
                </div>
              </div>

              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                style={{ backgroundColor: task.tagBg, color: task.tagColor }}
              >
                {task.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}