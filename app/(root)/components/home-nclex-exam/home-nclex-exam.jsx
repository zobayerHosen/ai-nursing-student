"use client";

import { useState } from "react";
import { homeNclexQuestions } from "@/data";
import HomeNCLEXExamCard from "./home-nclex-exam-card";
import { ChevronLeft, ChevronRight } from "lucide-react";


const HomeNCLEXQuestions = () => {
    const [active, setActive] = useState(0);

    const nextSlide = () => {
        if (active < homeNclexQuestions.length - 1) {
            setActive(active + 1);
        }
    };

    const prevSlide = () => {
        if (active > 0) {
            setActive(active - 1);
        }
    };

    return (
        <section className="w-full overflow-hidden bg-[#f7f4ef] py-16 text-[#0b2447]">
            <div className="mx-auto max-w-[1180px] px-6">
                {/* Header */}
                <div className="mx-auto max-w-[820px] pb-8 text-center">
                    <div className="mb-4 inline-flex items-center gap-[7px] rounded-full border border-[rgba(11,36,71,0.08)] bg-[rgba(11,36,71,0.06)] px-3 py-[6px] text-[10.5px] font-semibold uppercase tracking-[0.08em]">
                        <span className="h-[5px] w-[5px] rounded-full bg-[#ff6b6b]" />
                        NCLEX Questions
                    </div>

                    <h2 className="mb-3 text-[38px] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#0b2447]">
                        Every Question Comes With
                        <br />
                        <span className="text-[#ff6b6b]">Full Rationales</span>
                    </h2>

                    <p className="mx-auto max-w-[580px] text-[14.5px] leading-[1.55] text-[#4a5568]">
                        Not just “A is correct.” We explain WHY each option is right or
                        wrong — building the clinical reasoning that passes NCLEX.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Desktop arrows */}
                    <button
                        onClick={prevSlide}
                        disabled={active === 0}
                        className="absolute -left-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(11,36,71,0.08)] bg-white shadow-lg transition hover:scale-105 hover:bg-[#ff6b6b] hover:text-white lg:flex disabled:pointer-events-none disabled:opacity-40"
                    >
                        ←
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={active === homeNclexQuestions.length - 1}
                        className="absolute -right-5 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(11,36,71,0.08)] bg-white shadow-lg transition hover:scale-105 hover:bg-[#ff6b6b] hover:text-white lg:flex disabled:pointer-events-none disabled:opacity-40"
                    >
                        →
                    </button>

                    {/* Slides */}
                    <div className="overflow-hidden rounded-[18px]">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${active * 100}%)`,
                            }}
                        >
                            {homeNclexQuestions?.map((item) => (
                                <HomeNCLEXExamCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="mt-6 flex items-center justify-between">
                        {/* Left Side */}
                        <div className="flex items-center gap-3">
                            {/* Previous Button */}
                            <button
                                onClick={prevSlide}
                                disabled={active === 0}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D9E0EA] bg-white text-[#0b2447] transition-all duration-200 hover:border-[#ff6b6b] hover:text-[#ff6b6b] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {/* Counter */}
                            <div className="text-[11px] font-semibold text-[#4a5568]">
                                <strong className="text-[12.5px] text-[#ff6b6b]">
                                    Q {active + 1}
                                </strong>{" "}
                                / {homeNclexQuestions?.length}
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex items-center gap-[6px]">
                            {homeNclexQuestions?.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActive(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${active === idx
                                            ? "w-[22px] bg-[#ff6b6b]"
                                            : "w-2 bg-[rgba(11,36,71,0.18)]"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Right Side */}
                        <button
                            onClick={nextSlide}
                            disabled={active === homeNclexQuestions?.length - 1}
                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F5D8C] text-white transition-all duration-200 hover:scale-105 hover:bg-[#24496d] disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HomeNCLEXQuestions;