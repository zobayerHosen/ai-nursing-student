"use client";

import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import image1 from "@/public/assets/home_cheat_sheet_img1.png";
import image2 from "@/public/assets/home_cheat_sheet_img2.png";
import image3 from "@/public/assets/home_cheat_sheet_img3.png";

// Note: slider images
const cheatSheets = [
    {
        id: 1,
        tag: "Electrolytes",
        title: "Electrolyte Imbalances",
        subtitle: "NCLEX Visual Guide",
        image: image1,
    },
    {
        id: 2,
        tag: "Cardiac",
        title: "Cardiac Rhythms",
        subtitle: "ECG Interpretation",
        image: image2,
    },
    {
        id: 3,
        tag: "Pediatrics",
        title: "Pediatric Milestones",
        subtitle: "Quick Recall Sheet",
        image: image3,
    }
];

// Note: slider features list data
const features = [
    {
        text: (
            <>
                <strong>17 specialties covered</strong> — cardiac, pharmacology,
                pediatric, maternal, neuro, and more
            </>
        ),
    },
    {
        text: (
            <>
                <strong>Illustrated and labeled</strong> — every concept paired with
                anatomy, diagrams, or flowcharts
            </>
        ),
    },
    {
        text: (
            <>
                <strong>Memory hooks included</strong> — mnemonics and NCLEX golden
                points on every sheet
            </>
        ),
    },
];

// Note: Position class
const getPositionClass = (index, activeIndex, total) => {
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) return "z-50 scale-100 opacity-100 translate-x-0";
    if (diff === 1)
        return "z-40 scale-[0.85] opacity-80 translate-x-[160px] sm:translate-x-[190px] rotate-y-[-10deg]";
    if (diff === total - 1)
        return "z-40 scale-[0.85] opacity-80 -translate-x-[160px] sm:-translate-x-[190px] rotate-y-[10deg]";
    if (diff === 2)
        return "z-30 scale-[0.70] opacity-30 translate-x-[280px] sm:translate-x-[340px] rotate-y-[-14deg]";
    if (diff === total - 2)
        return "z-30 scale-[0.70] opacity-30 -translate-x-[280px] sm:-translate-x-[340px] rotate-y-[14deg]";

    return "z-0 scale-50 opacity-0";
};

const HomeCheatSheets = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % cheatSheets.length);
    };

    const prevSlide = () => {
        setActiveIndex(
            (prev) => (prev - 1 + cheatSheets.length) % cheatSheets.length,
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="overflow-hidden bg-primary px-4 py-10 md:py-12 lg:py-20 sm:px-6 lg:px-8">
            <div className="mx-auto container">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-4 inline-flex items-center gap-1.75 rounded-full border border-[#0b244714] bg-[#FFF2F1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0F2540] sm:text-xs">
                            <span className="h-1.25 w-1.25 rounded-full bg-[#ff6b6b]" />
                            Visual Cheat Sheets
                        </div>

                        <h2 className="mb-4 text-[28px] font-extrabold leading-[1.2] tracking-[-0.03em] text-white/95 sm:text-[34px] sm:leading-[1.15] md:text-[38px] md:leading-[1.08] lg:text-[42px]">
                            Complex concepts, made{" "}
                            <span>visually simple.</span>
                        </h2>

                        <p className="mb-6 max-w-130 text-[15px] leading-[1.6] text-white/95 sm:text-[16px] sm:leading-[1.65] md:mb-8 md:text-[16.5px]">
                            For visual learners who think in pictures, not paragraphs. Every
                            cheat sheet is illustrated, color-coded, and designed by nurses —
                            so you absorb critical NCLEX content at a glance instead of
                            re-reading textbooks.
                        </p>

                        <ul className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-4">
                            {features?.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 text-base leading-normal text-white/95 sm:text-lg"
                                >
                                    <span className="mt-[2.5px] flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-[#FFF2F1] text-primary sm:h-6 sm:w-6">
                                        <Check size={12} strokeWidth={3} className="sm:h-3.25 sm:w-3.25" />
                                    </span>

                                    <span>{feature?.text ?? ""}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Stats */}
                        <div className="grid max-w-110 grid-cols-3 gap-5 border-t border-[#0b244714] pt-5 sm:gap-7 sm:pt-6">
                            <div>
                                <h3 className="mb-1 text-2xl font-bold leading-none tracking-[-0.02em] text-white/95 sm:mb-2 sm:text-3xl md:text-4xl">
                                    200+
                                </h3>
                                <p className="text-xs font-semibold text-white/95 sm:text-sm">
                                    Cheat sheets
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-1 text-2xl font-bold leading-none tracking-[-0.02em] text-white/95 sm:mb-2 sm:text-3xl md:text-4xl">
                                    17
                                </h3>
                                <p className="text-xs font-semibold text-white/95 sm:text-sm">
                                    Specialties
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-1 text-2xl font-bold leading-none tracking-[-0.02em] text-white/95 sm:mb-2 sm:text-3xl md:text-4xl">
                                    100%
                                </h3>
                                <p className="text-xs font-semibold text-white/95 sm:text-sm">
                                    Nurse-designed
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Carousel */}
                    <div className="relative flex w-full flex-col justify-center overflow-hidden lg:py-5 lg:w-1/2">
                        <div className="relative flex h-120 items-center justify-center perspective-[2000px] sm:h-135">
                            <div className="relative h-full preserve-3d flex items-center justify-center">
                                {cheatSheets.map((sheet, index) => (
                                    <div
                                        key={sheet.id}
                                        className={`absolute left-1/2 top-1/2 h-95 w-65 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] shadow-[0_4px_20px_rgba(11,36,71,0.06)] transition-all duration-700 ease-in-out sm:h-130 sm:w-75 sm:rounded-2xl md:h-135 md:w-[320px] md:rounded-[18px] ${getPositionClass(
                                            index,
                                            activeIndex,
                                            cheatSheets.length,
                                        )}`}
                                    >
                                        <div className="relative h-full w-full overflow-hidden">
                                            <Image
                                                src={sheet.image ?? ''}
                                                alt={sheet.title}
                                                fill
                                                className="object-cover object-top"
                                            />

                                            {/* Tag */}
                                            <div className="absolute left-2.5 top-2.5 z-20 rounded-md border border-[#0b244714] bg-white/95 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widset text-[#0b2447] backdrop-blur-md sm:left-3.5 sm:top-3.5 sm:px-2.5 sm:py-1 sm:text-[9.5px]">
                                                {sheet.tag}
                                            </div>

                                            {/* Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-[#0b2447] via-[#0b2447cc] to-transparent px-3 pb-3 pt-10 text-white sm:px-4.5 sm:pb-4.5 sm:pt-12">
                                                <h3 className="mb-0.5 text-[14px] font-bold leading-[1.2] tracking-[-0.015em] sm:mb-1 sm:text-[16px]">
                                                    {sheet.title}
                                                </h3>

                                                <p className="text-[10px] font-medium opacity-80 sm:text-[11px]">
                                                    {sheet.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="md:mt-5 flex items-center justify-center gap-3 sm:gap-5">
                            <button
                                onClick={prevSlide}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0b244714] bg-white text-[#0b2447] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white sm:h-11 sm:w-11"
                            >
                                <ChevronLeft size={14} className="sm:h-4 sm:w-4" />
                            </button>

                            <div className="flex items-center gap-1 sm:gap-1.5">
                                {cheatSheets.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 sm:h-1.75 ${activeIndex === index
                                            ? "w-4 bg-white/95 sm:w-5.5"
                                            : "w-1.5 bg-white/50 hover:bg-[#0b244755] sm:w-1.75"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0b244714] bg-white text-[#0b2447] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white sm:h-11 sm:w-11"
                            >
                                <ChevronRight size={14} className="sm:h-4 sm:w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HomeCheatSheets;