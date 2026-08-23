"use client";

import Link from "next/link";
import { ArrowRight, Lightbulb, Mic } from "lucide-react";

export default function AskAtlas() {
  const suggestedQuestions = [
    "Explain oxidative phosphorylation",
    "How does mitochondria make ATP?",
    "Difference between mitochondria and chloroplast?",
    "Give me a quiz on this topic"
  ];

  const wavePattern = [6, 10, 8, 14, 12, 18, 24, 20, 28, 22, 16, 12, 8, 6];
  const fullWave = [...wavePattern, 32, ...[...wavePattern].reverse()];

  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch gap-6">
      {/* Left Box: Talk with Lumi */}
      <Link
        href="/dashboard/my-tutor"
        className="flex-1 min-h-55 bg-[#326798] rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-[#2C5F8D] transition-colors relative overflow-hidden group shadow-sm"
      >
        <style>{`
                    @keyframes blink-fade {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 1; }
                    }
                `}</style>

        {/* Waveform */}
        <div className="flex items-center gap-0.75 justify-center h-16 mb-3">
          {fullWave.map((h, i) => (
            <div
              key={i}
              className="w-0.5 bg-white rounded-full"
              style={{
                height: `${h}px`,
                animation: `blink-fade 1.2s infinite ease-in-out ${(i % 5) * 0.15}s`
              }}
            />
          ))}
        </div>

        {/* Microphone Icon */}
        <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
          <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M38.5228 15.6777C37.2378 15.6777 36.195 16.5345 36.195 17.5944C36.195 24.7529 29.1208 30.5775 20.4265 30.5775C11.7298 30.5775 4.6556 24.7529 4.6556 17.5944C4.6556 16.5345 3.61275 15.6777 2.3278 15.6777C1.04285 15.6777 0 16.5345 0 17.5944C0 26.2192 7.92849 33.3394 18.0987 34.2958V38.152C18.0987 39.21 19.1392 40.0687 20.4265 40.0687C21.7114 40.0687 22.7543 39.21 22.7543 38.152V34.2958C32.9221 33.3394 40.8506 26.2192 40.8506 17.5944C40.8506 16.5345 39.8077 15.6777 38.5228 15.6777Z" fill="#ffff" />
            <path d="M20.0034 26.48H20.846C26.619 26.48 31.3025 22.6257 31.3025 17.8725V8.60946C31.3025 3.85241 26.619 0 20.846 0H20.0034C14.2304 0 9.54688 3.85241 9.54688 8.60946V17.8725C9.54688 22.6257 14.2304 26.48 20.0034 26.48Z" fill="#fff" />
          </svg>
        </div>

        {/* Text */}
        <p className="text-base text-white tracking-wide">
          Talk with Cara
        </p>
      </Link>

      {/* Right Box: Suggested things to ask */}
      <div className="w-full lg:w-[45%] xl:w-[40%] bg-white rounded-3xl border border-[#E2E8F0] p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[15px] font-bold text-[#1e293b]">Suggested things to ask</h2>
          <Lightbulb className="w-4.5 h-4.5 text-[#9333EA] fill-[#9333EA]/10" />
        </div>

        <div className="flex flex-col gap-3 flex-1 justify-center">
          {suggestedQuestions.map((q, idx) => (
            <Link
              key={idx}
              href="/dashboard/my-tutor"
              className="w-full flex items-center justify-between bg-[#FAFAF9] border border-[#F3E8FF] hover:bg-[#F3E8FF] hover:border-[#E9D5FF] transition-all rounded-xl px-4 py-3 cursor-pointer group shadow-sm"
            >
              <span className="text-[12.5px] font-semibold text-[#8B5CF6] pr-4 leading-tight">{q}</span>
              <ArrowRight className="w-4.5 h-4.5 text-[#8B5CF6] shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}