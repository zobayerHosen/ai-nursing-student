"use client";
import { homeNclexQuestions } from '@/data';
import Image from 'next/image'
import img1 from '@/public/assets/home_nclex_img1.png';
import { CheckCircle2, Clock3, CalendarDays } from "lucide-react";

const HomeNCLEXExamCard = ({ item }) => {
    return (
        <div
            className="min-w-full"
        >
            <div className="grid overflow-hidden rounded-[18px] border border-[rgba(11,36,71,0.08)] bg-white shadow-[0_4px_20px_rgba(11,36,71,0.06)] lg:grid-cols-2">
                {/* Left */}
                <div className="flex flex-col border-b border-[rgba(11,36,71,0.08)] p-7 lg:border-b-0 lg:border-r">
                    {/* Meta */}
                    <div className="mb-5 flex flex-wrap gap-2">
                        <span className="rounded bg-[rgba(11,36,71,0.08)] px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#0b2447]">
                            {item?.type}
                        </span>

                        <span className="rounded bg-[#fef3c7] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#d97706]">
                            {item?.difficulty}
                        </span>

                        <span className="rounded bg-[#ffe3e3] px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-[#ff6b6b]">
                            {item?.category}
                        </span>
                    </div>

                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                        Question {item?.id} of {homeNclexQuestions?.length}
                    </p>

                    <p className="mb-2.5 text-[15px] leading-[1.55] text-[#1E293B]">
                        {item?.question || "N/A"}
                    </p>

                    {/* Options */}
                    <div className="my-6 flex flex-col gap-[6px]">
                        {item?.options?.map((option, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start gap-2 rounded-[7px] border px-4 py-3 text-[11.5px] leading-[1.4] ${item.correct === idx
                                    ? "border-[#16a34aad] bg-[#dcfce7]"
                                    : "border-[rgba(11,36,71,0.08)] bg-white"
                                    }`}
                            >
                                <div
                                    className={`flex h-[22px] w-[22px] items-center justify-center rounded text-sm font-bold ${item.correct === idx
                                        ? "bg-[#16a34a] text-white"
                                        : "bg-[rgba(11,36,71,0.06)] text-[#0b2447]"
                                        }`}
                                >
                                    {String.fromCharCode(65 + idx)}
                                </div>

                                <span className={`text-sm text-[#1E293B] ${item.correct === idx
                                    ? "text-[#166534]"
                                    : ""
                                    }`}>{option || "N/A"}</span>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-[rgba(11,36,71,0.08)] pt-4 text-[10px] text-[#4a5568]">
                        {/* Correct Rate */}
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#16a34a]" />

                            <span className="text-sm">
                                Correct:{" "}
                                <strong className="text-[#0b2447]">
                                    {item?.correctRate}
                                </strong>
                            </span>
                        </div>

                        {/* Average Time */}
                        <div className="flex items-center gap-1.5">
                            <Clock3 className="h-3.5 w-3.5 text-[#f59e0b]" />

                            <span className="text-sm">
                                Avg:{" "}
                                <strong className="text-[#0b2447]">
                                    {item?.avgTime}
                                </strong>
                            </span>
                        </div>

                        {/* Date / Time */}
                        <div className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 text-[#3b82f6]" />

                            <span className="text-sm font-medium text-gray-500">
                                {item?.time}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col bg-[#fafbfc]">
                    <div className="flex items-center gap-2 border-b border-[rgba(11,36,71,0.08)] bg-white px-5 py-4">
                        <div className="flex h-[22px] w-[22px] items-center justify-center rounded bg-[#ff6b6b] text-xs text-white">
                            ✓
                        </div>

                        <h3 className="text-[11.5px] font-bold">
                            Rationale & Explanation
                        </h3>

                        <div className="ml-auto flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-[#4a5568]">
                            <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-[#16a34a]" />
                            Auto
                        </div>
                    </div>

                    <div className="flex-1 p-5">
                        <div className="mb-4 rounded-lg border border-[rgba(11,36,71,0.08)] bg-white p-3 shadow-sm">
                            <div className="flex aspect-video items-center justify-center rounded bg-[#f7f4ef] text-sm text-[#4a5568]">
                                <Image
                                    src={img1}
                                    alt="NCLEX"
                                    width={350}
                                    height={350}
                                    className="size-full object-cover"
                                />
                            </div>

                            <p className="mt-2 text-center text-[9px] font-semibold text-[#4a5568]">
                                Clinical concept visualization
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-3 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.06em] text-[#0b2447]">
                                <span className="h-[10px] w-[2.5px] rounded bg-[#ff6b6b]" />
                                Explanation
                            </h4>

                            <p className="text-[11px] leading-[1.6] text-[#4a5568]">
                                {item?.explanation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeNCLEXExamCard