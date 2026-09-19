"use client";

import Link from "next/link";
import { CheckCircle2, Lightbulb, MessageSquare, Radio, Bot } from "lucide-react";

export default function AskAtlas() {
  const suggestedQuestions = [
    "Understand difficult concepts",
    "Practice Clinical Judgment",
    "Prepare for exams",
    "Explain oxidative phosphorylation",
  ];

  const features = [
    "Get answers & explain concepts",
    "Create study notes, flashcards & care plans",
    "Quiz you, help you learn, and more",
  ];

  return (
    <div className="w-full max-w-full min-w-0 flex flex-col lg:flex-row items-stretch gap-4 sm:gap-5 overflow-hidden">
      {/* Left Card: CARA AI Assistant */}
      <div className="flex-1 bg-linear-to-r from-[#123659] via-[#75345d] to-[#ef476f] rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 xl:p-7 text-white flex flex-col justify-between relative overflow-hidden min-h-55">
        {/* Top Info Section */}
        <div className="flex flex-row items-start gap-3 sm:gap-4.5 mb-5 sm:mb-6">
          {/* Avatar Box */}
          <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 lg:w-20 xl:w-22 xl:h-22 bg-[#395e7e]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shrink-0 border border-white/15 shadow-inner flex items-center justify-center">
            <Bot className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-white/90" />
          </div>

          {/* Text Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-lg xs:text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                CARA
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/80 font-medium mb-2.5 sm:mb-3">
              Your AI nursing assistant
            </p>

            {/* Bulleted Feature List */}
            <ul className="space-y-1 sm:space-y-1.5">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start sm:items-center gap-1.5 sm:gap-2 text-[11px] xs:text-xs sm:text-[13px] text-white/95 leading-tight"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/80 shrink-0 mt-0.5 sm:mt-0" />
                  <span className="wrap-break-word">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
          {/* Chat with CARA Button */}
          <Link
            href="/dashboard/my-tutor"
            className="w-full sm:flex-1 lg:w-full xl:flex-1 py-2.5 sm:py-3 px-3.5 sm:px-4 xl:px-5 rounded-xl sm:rounded-2xl bg-white/20 hover:bg-white/30 active:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm group text-center"
          >
            <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <span className="whitespace-nowrap">Chat with CARA</span>
          </Link>

          {/* Go Live with CARA Button */}
          <Link
            href="/dashboard/my-tutor"
            className="w-full sm:flex-1 lg:w-full xl:flex-1 py-2.5 sm:py-3 px-3.5 sm:px-4 xl:px-5 rounded-xl sm:rounded-2xl bg-white/20 hover:bg-white/30 active:bg-white/35 backdrop-blur-md border border-white/25 transition-all text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm group text-center"
          >
            <Radio className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <span className="whitespace-nowrap">Go Live with CARA</span>
            <span className="px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold tracking-wider text-white bg-white/30 rounded uppercase leading-none shrink-0">
              LIVE
            </span>
          </Link>
        </div>
      </div>

      {/* Right Card: Learn with LUMI */}
      <div className="w-full lg:w-[42%] xl:w-[38%] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/70 p-4 xs:p-5 sm:p-6 flex flex-col justify-between gap-3 sm:gap-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm sm:text-base font-semibold text-[#1c5375] leading-tight">
            Learn with LUMI in multiple languages
          </h3>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-sky-50 flex items-center justify-center text-[#1c5375] shrink-0">
            <Lightbulb className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#1c5375]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-2 sm:gap-2.5 flex-1 justify-center">
          {suggestedQuestions.map((q, idx) => (
            <Link
              key={idx}
              href={`/dashboard/my-tutor?prompt=${encodeURIComponent(q)}`}
              className="w-full text-left px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#f8fafc] hover:bg-[#f1f5f9] active:bg-[#e2e8f0] border border-slate-200/80 rounded-xl sm:rounded-2xl text-[12px] xs:text-[13px] sm:text-[13.5px] font-medium text-[#2b5278] transition-colors cursor-pointer block leading-snug"
            >
              {q}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

