"use client";
import { homeNclexQuestions } from '@/data';
import Image from 'next/image'
import img1 from '@/public/assets/home_nclex_img1.png';
import { CheckCircle2, Clock3, CalendarDays } from "lucide-react";

const HomeNCLEXExamCard = ({ item }) => {
    return (
        <div className="min-w-full">
            <div className="grid overflow-hidden rounded-[14px] border border-[rgba(11,36,71,0.08)] bg-white shadow-[0_4px_20px_rgba(11,36,71,0.06)] sm:rounded-2xl md:rounded-[18px] lg:grid-cols-2">
                {/* Left */}
                <div className="flex flex-col border-b border-[rgba(11,36,71,0.08)] p-5 md:p-6 lg:border-b-0 lg:border-r lg:p-7">
                    {/* Meta */}
                    <div className="mb-4 flex flex-wrap gap-1.5 sm:mb-5 sm:gap-2">
                        <span className="rounded bg-[rgba(11,36,71,0.08)] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#0b2447] sm:px-2 sm:py-1 sm:text-[9px]">
                            {item?.type}
                        </span>

                        <span className="rounded bg-[#fef3c7] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#d97706] sm:px-2 sm:py-1 sm:text-[10px]">
                            {item?.difficulty}
                        </span>

                        <span className="rounded bg-[#ffe3e3] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#ff6b6b] sm:px-2 sm:py-1 sm:text-[9px]">
                            {item?.category}
                        </span>
                    </div>

                    <p className="mb-1.5 text-[9px] font-bold uppercase tracking-widest text-[#64748B] sm:mb-2 sm:text-[10px]">
                        Question {item?.id} of {homeNclexQuestions?.length}
                    </p>

                    <p className="mb-2 text-[14px] leading-normal text-[#1E293B] sm:mb-2.5 sm:text-[15px] sm:leading-[1.55] md:text-[16px]">
                        {item?.question || "N/A"}
                    </p>

                    {/* Options */}
                    <div className="my-5 flex flex-col gap-1.5 sm:my-6 sm:gap-1.5">
                        {item?.options?.map((option, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-2 rounded-md border px-3 py-2.5 text-[11px] leading-[1.4] sm:rounded-[7px] sm:px-4 sm:py-3 sm:text-[11.5px] ${item.correct === idx
                                    ? "border-[#16a34aad] bg-[#dcfce7]"
                                    : "border-[rgba(11,36,71,0.08)] bg-white"
                                    }`}
                            >
                                <div
                                    className={`shrink-0 flex h-5 w-5 items-center justify-center rounded text-xs font-bold sm:h-5.5 sm:w-5.5 sm:text-sm ${item.correct === idx
                                        ? "bg-[#16a34a] text-white"
                                        : "bg-[rgba(11,36,71,0.06)] text-[#0b2447]"
                                        }`}
                                >
                                    {String.fromCharCode(65 + idx)}
                                </div>

                                <span className={`text-xs text-[#1E293B] sm:text-sm ${item.correct === idx
                                    ? "text-[#166534]"
                                    : ""
                                    }`}>{option || "N/A"}</span>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-[rgba(11,36,71,0.08)] pt-4 text-[9px] text-[#4a5568] sm:gap-4 sm:text-[10px] md:gap-5">
                        {/* Correct Rate */}
                        <div className="flex items-center gap-1 sm:gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-[#16a34a] sm:h-3.5 sm:w-3.5" />

                            <span className="text-xs sm:text-sm">
                                Correct:{" "}
                                <strong className="text-[#0b2447]">
                                    {item?.correctRate}
                                </strong>
                            </span>
                        </div>

                        {/* Average Time */}
                        <div className="flex items-center gap-1 sm:gap-1.5">
                            <Clock3 className="h-3 w-3 text-[#f59e0b] sm:h-3.5 sm:w-3.5" />

                            <span className="text-xs sm:text-sm">
                                Avg:{" "}
                                <strong className="text-[#0b2447]">
                                    {item?.avgTime}
                                </strong>
                            </span>
                        </div>

                        {/* Date / Time */}
                        <div className="flex items-center gap-1 sm:gap-1.5">
                            <CalendarDays className="h-3 w-3 text-[#3b82f6] sm:h-3.5 sm:w-3.5" />

                            <span className="text-xs font-medium text-gray-500 sm:text-sm">
                                {item?.time}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col bg-[#fafbfc]">
                    <div className="flex items-center gap-2 border-b border-[rgba(11,36,71,0.08)] bg-white px-4 py-3 sm:px-5 sm:py-4">
                        <div className="flex h-5 w-5 items-center justify-center rounded bg-[#ff6b6b] text-[11px] text-white sm:h-5.5 sm:w-5.5 sm:text-xs">
                            ✓
                        </div>

                        <h3 className="text-[10px] font-bold sm:text-[11.5px]">
                            Rationale & Explanation
                        </h3>

                        <div className="ml-auto flex items-center gap-1 text-[8px] font-semibold uppercase tracking-widest text-[#4a5568] sm:text-[9px]">
                            <span className="h-1 w-1 animate-pulse rounded-full bg-[#16a34a] sm:h-1.25 sm:w-1.25" />
                            Auto
                        </div>
                    </div>

                    <div className="flex-1 p-4 sm:p-5">
                        <div className="mb-4 rounded-lg border border-[rgba(11,36,71,0.08)] bg-white p-2 shadow-sm sm:p-3">
                            <div className="flex aspect-video items-center justify-center rounded bg-[#f7f4ef] text-xs text-[#4a5568] sm:text-sm">
                                <Image
                                    src={img1}
                                    alt="NCLEX"
                                    width={350}
                                    height={350}
                                    className="size-full object-cover"
                                />
                            </div>

                            <p className="mt-1.5 text-center text-[8px] font-semibold text-[#4a5568] sm:mt-2 sm:text-[9px]">
                                Clinical concept visualization
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.06em] text-[#0b2447] sm:mb-3 sm:text-[10.5px]">
                                <span className="h-2 w-0.5 rounded bg-[#ff6b6b] sm:h-2.5 sm:w-[2.5px]" />
                                Explanation
                            </h4>

                            <p className="text-[10px] leading-[1.55] text-[#4a5568] sm:text-[11px] sm:leading-[1.6]">
                                {item?.explanation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeNCLEXExamCard;