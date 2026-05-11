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
        <section id="HomeNCLEXExam" className="w-full overflow-hidden bg-[#f7f4ef] py-12 text-[#0b2447] sm:py-16">
            <div className="mx-auto max-w-295 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto max-w-205 pb-6 text-center sm:pb-8">
                    <div className="mb-3 inline-flex items-center gap-1.75 rounded-full border border-[rgba(11,36,71,0.08)] bg-[rgba(11,36,71,0.06)] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] sm:mb-4">
                        <span className="h-1.25 w-1.25 rounded-full bg-[#ff6b6b]" />
                        NCLEX Questions
                    </div>

                    <h2 className="mb-2 text-[28px] font-extrabold leading-[1.2] tracking-[-0.025em] text-[#0b2447] sm:text-[34px] sm:leading-[1.15] md:text-[38px] md:leading-[1.12] lg:text-[42px]">
                        Every Question Comes With
                        <br />
                        <span className="text-[#ff6b6b]">Full Rationales</span>
                    </h2>

                    <p className="mx-auto max-w-145 text-[13px] leading-normal text-[#4a5568] sm:text-[14px] sm:leading-[1.55] md:text-[14.5px]">
                        Not just &quot;A is correct.&quot; We explain WHY each option is right or
                        wrong — building the clinical reasoning that passes NCLEX.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Desktop arrows - hidden on tablet and below */}
                    <button
                        onClick={prevSlide}
                        disabled={active === 0}
                        className="absolute -left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(11,36,71,0.08)] bg-white shadow-lg transition hover:scale-105 hover:bg-[#ff6b6b] hover:text-white lg:-left-5 lg:flex lg:h-11 lg:w-11 xl:-left-6 disabled:pointer-events-none disabled:opacity-40"
                    >
                        ←
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={active === homeNclexQuestions.length - 1}
                        className="absolute -right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(11,36,71,0.08)] bg-white shadow-lg transition hover:scale-105 hover:bg-[#ff6b6b] hover:text-white lg:-right-5 lg:flex lg:h-11 lg:w-11 xl:-right-6 disabled:pointer-events-none disabled:opacity-40"
                    >
                        →
                    </button>

                    {/* Slides */}
                    <div className="overflow-hidden rounded-[14px] sm:rounded-2xl md:rounded-[18px]">
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
                    <div className="mt-4 flex items-center justify-between sm:mt-5 md:mt-6">
                        {/* Left Side */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Previous Button */}
                            <button
                                onClick={prevSlide}
                                disabled={active === 0}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D9E0EA] bg-white text-[#0b2447] transition-all duration-200 hover:border-[#ff6b6b] hover:text-[#ff6b6b] disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
                            >
                                <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>

                            {/* Counter */}
                            <div className="text-[10px] font-semibold text-[#4a5568] sm:text-[11px]">
                                <strong className="text-[11px] text-[#ff6b6b] sm:text-[12.5px]">
                                    Q {active + 1}
                                </strong>{" "}
                                / {homeNclexQuestions?.length}
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex items-center gap-1 sm:gap-1.5">
                            {homeNclexQuestions?.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActive(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${active === idx
                                            ? "w-4 bg-[#ff6b6b] sm:w-5.5"
                                            : "w-1.5 bg-[rgba(11,36,71,0.18)] sm:w-2"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Right Side */}
                        <button
                            onClick={nextSlide}
                            disabled={active === homeNclexQuestions?.length - 1}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F5D8C] text-white transition-all duration-200 hover:scale-105 hover:bg-[#24496d] disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:w-9"
                        >
                            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HomeNCLEXQuestions;