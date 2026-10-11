"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Rocket,
  Clock,
  ArrowLeft,
  Bell,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const LectureNotesUnderDevelopment = () => {
  const [isNotified, setIsNotified] = useState(false);

  const handleNotifyMe = () => {
    setIsNotified(true);
    toast.success("Awesome! We'll notify you as soon as this feature launches.");
  };

  return (
    <div className="min-h-[calc(100vh-100px)] w-full py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-[#F1F6F9]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1B4B66]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FE5E7E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto text-center space-y-8 relative z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1B4B66]/15 text-[#1B4B66] shadow-sm text-xs sm:text-sm font-bold">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE5E7E] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FE5E7E]"></span>
          </span>
          <span>Under Development</span>
        </div>

        {/* Central Graphic / Icon Cluster */}
        <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-[#1B4B66] to-[#2D7A9C] rotate-6 opacity-10 blur-xs"></div>
          <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-[#EDF5F9] to-white border border-[#1B4B66]/20 shadow-xl flex items-center justify-center transform hover:rotate-3 transition-transform duration-300">
            <Rocket className="w-14 h-14 sm:w-16 sm:h-16 text-[#1B4B66] transform -rotate-12 animate-pulse" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-linear-to-r from-[#FE5E7E] to-[#F43F5E] text-white p-2.5 rounded-2xl shadow-md">
            <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
        </div>

        {/* Heading & Polished Text */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1B4B66] tracking-tight leading-tight">
            This Feature Is Coming Soon!
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            This feature is coming soon! We are launching very soon, so stay tuned for this super duper feature.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleNotifyMe}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
              isNotified
                ? "bg-emerald-600 text-white"
                : "bg-[#1B4B66] hover:bg-[#14394E] text-white hover:shadow-md hover:-translate-y-0.5"
            }`}
          >
            {isNotified ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>You&apos;re on the early list!</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                <span>Notify Me When Ready</span>
              </>
            )}
          </button>

          <Link
            href="/dashboard/study-notes"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 border border-slate-200 text-[#1B4B66] flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Study Notes</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LectureNotesUnderDevelopment;