"use client";

import Link from "next/link";
import { CheckCircle2, Lightbulb, MessageSquare, Radio, Sparkles } from "lucide-react";

export default function AskAtlas() {
  const suggestedQuestions = [
    "Understand difficult concepts",
    "Practice Clinical Judgment",
    "Prepare for exams",
    "Explain oxidate Phospohorylation",
  ];

  const features = [
    "Get answers & explain concepts",
    "Create study notes, flashcards & care plans",
    "Quiz you, help you learn, and more",
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch gap-5">
      {/* Left Card: CARA AI Assistant */}
      <div className="flex-1 bg-linear-to-r from-[#123659] via-[#75345d] to-[#ef476f] rounded-3xl p-6 sm:p-7 text-white flex flex-col justify-between  relative overflow-hidden min-h-55">
        {/* Top Info Section */}
        <div className="flex items-start gap-4 mb-6">
          {/* Avatar / Placeholder Box */}
          <div className="w-20 h-20 sm:w-22 sm:h-22 bg-[#395e7e]/60 backdrop-blur-sm rounded-2xl shrink-0 border border-white/10 shadow-inner flex items-center justify-center">
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">CARA</h2>
              <span className="text-amber-300 text-lg sm:text-xl">✨</span>
            </div>
            <p className="text-xs sm:text-sm text-white/80 font-medium mb-3">
              Your AI nursing assistant
            </p>

            {/* Bulleted Feature List */}
            <ul className="space-y-1.5">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-[13px] text-white/95 leading-tight">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          {/* Chat with CARA Button */}
          <Link
            href="/dashboard/my-tutor"
            className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 transition-all text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-sm group"
          >
            <MessageSquare className="w-4.5 h-4.5 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <span>Chat with CARA</span>
          </Link>

          {/* Go Live with CARA Button */}
          <Link
            href="/dashboard/my-tutor"
            className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 transition-all text-white font-medium text-sm flex items-center justify-center gap-2.5 shadow-sm group"
          >
            <Radio className="w-4.5 h-4.5 text-white shrink-0 group-hover:scale-105 transition-transform" />
            <span>Go Live with CARA</span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white bg-white/30 rounded uppercase leading-none ml-0.5">
              LIVE
            </span>
          </Link>
        </div>
      </div>

      {/* Right Card: Learn with LUMI */}
      <div className="w-full lg:w-[42%] xl:w-[38%] bg-white rounded-3xl border border-slate-200/70 p-6  flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[#1c5375]">
            Learn with LUMI in multiple languages
          </h3>
          <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-[#1c5375]">
            <Lightbulb className="w-4.5 h-4.5 text-[#1c5375]" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 flex-1 justify-center">
          {suggestedQuestions.map((q, idx) => (
            <Link
              key={idx}
              href={`/dashboard/my-tutor?prompt=${encodeURIComponent(q)}`}
              className="w-full text-left px-4 py-3 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/80 rounded-2xl text-[13px] sm:text-[13.5px] font-medium text-[#2b5278] transition-colors cursor-pointer block leading-snug"
            >
              {q}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
