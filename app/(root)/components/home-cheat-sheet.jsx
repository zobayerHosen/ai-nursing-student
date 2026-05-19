"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

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

const HomeCheatSheets = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [swiperRef, setSwiperRef] = useState(null);

    const nextSlide = () => {
        if (swiperRef) swiperRef.slideNext();
    };

    const prevSlide = () => {
        if (swiperRef) swiperRef.slidePrev();
    };

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    const goToSlide = (index) => {
        if (swiperRef) swiperRef.slideToLoop(index);
    };

    return (
        <section className="overflow-hidden bg-primary px-4 py-12 md:py-16 lg:py-24 sm:px-6 lg:px-8">
            <div className="mx-auto container">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
                    {/* Left Content */}
                    <div className="w-full lg:w-1/2">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#FF5B7F] sm:text-xs">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5B7F]" />
                            Visual Cheat Sheets
                        </div>

                        <h2 className="mb-4 text-[30px] font-bold leading-[1.15] tracking-[-0.03em] text-white/95 sm:text-[38px] md:text-[44px] lg:text-[48px]">
                            Complex concepts, made{" "}
                            <span className="block sm:inline">visually simple.</span>
                        </h2>

                        <p className="mb-6 max-w-130 text-[15px] leading-[1.65] text-white/85 sm:text-[16px] md:mb-8 md:text-[17px]">
                            For visual learners who think in pictures, not paragraphs. Every
                            cheat sheet is illustrated, color-coded, and designed by nurses —
                            so you absorb critical NCLEX content at a glance instead of
                            re-reading textbooks.
                        </p>

                        <ul className="mb-8 flex flex-col gap-3.5 sm:mb-10 sm:gap-4.5">
                            {features?.map((feature, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3.5 text-base leading-normal text-white/90 sm:text-lg"
                                >
                                    <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] bg-white text-primary sm:h-6 sm:w-6 shadow-md">
                                        <Check size={12} strokeWidth={3.5} className="text-[#1e4360] sm:h-3.5 sm:w-3.5" />
                                    </span>

                                    <span>{feature?.text ?? ""}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Stats */}
                        <div className="grid max-w-110 grid-cols-3 gap-5 border-t border-white/10 pt-6 sm:gap-7 sm:pt-8">
                            <div>
                                <h3 className="mb-1 text-2xl font-bold leading-none tracking-[-0.02em] text-white sm:mb-2 sm:text-3xl md:text-4xl">
                                    200+
                                </h3>
                                <p className="text-xs font-semibold text-white/70 sm:text-sm">
                                    Cheat sheets
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-1 text-2xl font-bold leading-none tracking-[-0.02em] text-white sm:mb-2 sm:text-3xl md:text-4xl">
                                    17
                                </h3>
                                <p className="text-xs font-semibold text-white/70 sm:text-sm">
                                    Specialties
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-1 text-2xl font-bold leading-none tracking-[-0.02em] text-white sm:mb-2 sm:text-3xl md:text-4xl">
                                    100%
                                </h3>
                                <p className="text-xs font-semibold text-white/70 sm:text-sm">
                                    Nurse-designed
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Triple Slider */}
                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden lg:w-1/2 lg:py-5">
                        <div className="relative h-[520px] w-full flex items-center justify-center">

                            {/* ACTIVE CENTER CARD */}
                            <Swiper
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={"auto"}
                                modules={[Autoplay]}
                                onSwiper={setSwiperRef}
                                onSlideChange={handleSlideChange}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                className="relative w-[300px] sm:w-[360px] overflow-hidden! rounded-[24px]!"
                            >
                                {cheatSheets.map((sheet) => (
                                    <SwiperSlide
                                        key={sheet.id}
                                        className="w-[300px]! sm:w-[360px]! overflow-hidden!"
                                    >
                                        <div className="relative h-[450px] sm:h-[540px] overflow-hidden">

                                            <Image
                                                src={sheet.image}
                                                alt={sheet.title}
                                                fill
                                                priority
                                                className="object-cover object-top rounded-[24px]"
                                            />

                                            {/* Tag */}
                                            <div className="absolute left-3 top-3 z-20 rounded-md border border-[#0b244714] bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#0b2447] backdrop-blur-md">
                                                {sheet.tag}
                                            </div>

                                            {/* Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-[#0b2447]/95 via-[#0b2447]/70 to-transparent px-5 pb-5 pt-16 text-white">
                                                <h3 className="mb-1 text-[18px] font-bold leading-[1.2] tracking-[-0.015em]">
                                                    {sheet.title}
                                                </h3>

                                                <p className="text-[12px] font-medium opacity-80">
                                                    {sheet.subtitle}
                                                </p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* LEFT BACK CARD */}
                            <div className="absolute left-0 top-1/2 hidden -translate-y-1/2 opacity-50  scale-[0.9] transition-all duration-500 lg:block">
                                <div className="relative h-[420px] w-[260px] overflow-hidden rounded-[22px] bg-white shadow-2xl">
                                    <Image
                                        src={
                                            cheatSheets[
                                                (activeIndex - 1 + cheatSheets.length) %
                                                cheatSheets.length
                                            ].image
                                        }
                                        alt="Previous"
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                            </div>

                            {/* RIGHT BACK CARD */}
                            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 opacity-50 scale-[0.9] transition-all duration-500 lg:block">
                                <div className="relative h-[420px] w-[260px] overflow-hidden rounded-[22px] bg-white shadow-2xl">
                                    <Image
                                        src={
                                            cheatSheets[
                                                (activeIndex + 1) % cheatSheets.length
                                            ].image
                                        }
                                        alt="Next"
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                            </div>


                        </div>

                        {/* Controls */}
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <button
                                onClick={prevSlide}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0b2447] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6b6b] hover:text-white"
                            >
                                <ChevronLeft size={18} />
                            </button>

                            <div className="flex items-center gap-2">
                                {cheatSheets.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`rounded-full transition-all duration-300 ${activeIndex === index
                                            ? "h-2 w-7 bg-white"
                                            : "h-2 w-2 bg-white/40 hover:bg-white/70"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={nextSlide}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0b2447] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ff6b6b] hover:text-white"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HomeCheatSheets;