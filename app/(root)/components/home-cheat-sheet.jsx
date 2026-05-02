"use client";

import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import image1 from "@/public/assets/home_cheat_sheet_img1.png";
import image2 from "@/public/assets/home_cheat_sheet_img2.png";
import image3 from "@/public/assets/home_cheat_sheet_img3.png";

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

const getPositionClass = (index, activeIndex, total) => {
    const diff = (index - activeIndex + total) % total;

    if (diff === 0) return "z-50 scale-100 opacity-100 translate-x-0";
    if (diff === 1)
        return "z-40 scale-[0.85] opacity-80 translate-x-[190px] rotate-y-[-10deg]";
    if (diff === total - 1)
        return "z-40 scale-[0.85] opacity-80 -translate-x-[190px] rotate-y-[10deg]";
    if (diff === 2)
        return "z-30 scale-[0.72] opacity-35 translate-x-[340px] rotate-y-[-14deg]";
    if (diff === total - 2)
        return "z-30 scale-[0.72] opacity-35 -translate-x-[340px] rotate-y-[14deg]";

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
        <section className="overflow-hidden bg-primary px-6 py-20">
            <div className="mx-auto container">
                <div className="flex items-center gap-16">
                    {/* Left Content */}
                    <div className="">
                        <div className="mb-5 inline-flex items-center gap-[7px] rounded-full border border-[#0b244714] bg-[#FFF2F1] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-[#0F2540]">
                            <span className="h-[5px] w-[5px] rounded-full bg-[#ff6b6b]" />
                            Visual Cheat Sheets
                        </div>

                        <h2 className="mb-5 text-[38px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white/95 md:text-5xl">
                            Complex concepts, made{" "}
                            <span>visually simple.</span>
                        </h2>

                        <p className="mb-8 max-w-[520px] text-[16.5px] leading-[1.65] text-white/95">
                            For visual learners who think in pictures, not paragraphs. Every
                            cheat sheet is illustrated, color-coded, and designed by nurses —
                            so you absorb critical NCLEX content at a glance instead of
                            re-reading textbooks.
                        </p>

                        <ul className="mb-8 flex flex-col gap-4">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3.5 text-lg leading-normal text-white/95"
                                >
                                    <span className="mt-[2.5px] flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[#FFF2F1] text-primary">
                                        <Check size={13} strokeWidth={3} />
                                    </span>

                                    <span>{feature.text}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Stats */}
                        <div className="grid grid-cols-3 max-w-[440px] gap-7 border-t border-[#0b244714] pt-6">
                            <div>
                                <h3 className="mb-2 text-4xl font-bold leading-none tracking-[-0.02em] text-white/95">
                                    200+
                                </h3>
                                <p className="text-sm font-semibold text-white/95">
                                    Cheat sheets
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 text-4xl font-bold leading-none tracking-[-0.02em] text-white/95">
                                    17
                                </h3>
                                <p className="text-sm font-semibold text-white/95">
                                    Specialties
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-2 text-4xl font-bold leading-none tracking-[-0.02em] text-white/95">
                                    100%
                                </h3>
                                <p className="text-sm font-semibold text-white/95">
                                    Nurse-designed
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Carousel */}
                    <div className="relative flex w-full flex-col justify-center overflow-hidden py-5">
                        <div className="relative flex h-[580px] items-center justify-center perspective-[2000px]">
                            <div className="relative h-full  preserve-3d flex items-center justify-center">
                                {cheatSheets.map((sheet, index) => (
                                    <div
                                        key={sheet.id}
                                        className={`absolute left-1/2 top-1/2 h-[540px] w-[320px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[18px] shadow-[0_4px_20px_rgba(11,36,71,0.06)] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${getPositionClass(
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
                                            <div className="absolute left-3.5 top-3.5 z-20 rounded-md border border-[#0b244714] bg-white/95 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-widset text-[#0b2447] backdrop-blur-md">
                                                {sheet.tag}
                                            </div>

                                            {/* Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-[#0b2447] via-[#0b2447cc] to-transparent px-[18px] pb-[18px] pt-12 text-white">
                                                <h3 className="mb-1 text-[16px] font-bold leading-[1.2] tracking-[-0.015em]">
                                                    {sheet.title}
                                                </h3>

                                                <p className="text-[11px] font-medium opacity-80">
                                                    {sheet.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-6 flex items-center justify-center gap-5">
                            <button
                                onClick={prevSlide}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0b244714] bg-white text-[#0b2447] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white"
                            >
                                <ChevronLeft size={16} />
                            </button>

                            <div className="flex items-center gap-1.5">
                                {cheatSheets.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`h-[7px] rounded-full transition-all duration-300 ${activeIndex === index
                                            ? "w-[22px] bg-white/95"
                                            : "w-[7px] bg-white/50 hover:bg-[#0b244755]"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0b244714] bg-white text-[#0b2447] shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeCheatSheets;