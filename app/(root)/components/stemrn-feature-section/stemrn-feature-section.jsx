"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import StemrnTabs from "./stemrn-tabs";

const StemrnFeatureSection = () => {
    const [open, setOpen] = useState(false);
    const [autoPress, setAutoPress] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setAutoPress(true);

            setTimeout(() => {
                setAutoPress(false);
            }, 700);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-[#F2F2F2] px-5 md:px-5 py-10 md:py-16 lg:py-20 xl:py-28">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4.5 items-stretch">
                {/* LEFT SIDE */}
                <div className="relative overflow-hidden rounded-[14px] border border-[#E5EAF0] bg-white shadow-[0_24px_60px_-28px_rgba(30,67,96,0.18)]">
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 border-b border-[#EEF1F5] bg-linear-to-b from-[#FAFBFC] to-[#F4F6F9] px-3.5 py-2">
                        <div className="flex gap-1.25">
                            <span className="h-2.25 w-2.25 rounded-full bg-[#FF8585]" />
                            <span className="h-2.25 w-2.25 rounded-full bg-[#FFD27A]" />
                            <span className="h-2.25 w-2.25 rounded-full bg-[#87E0A1]" />
                        </div>

                        <div className="mx-auto hidden max-w-95 flex-1 items-center gap-1.75 rounded-md border border-[#E5EAF0] bg-white px-3 py-1 font-mono text-sm text-[#6A7282] sm:flex">
                            <span className="opacity-60">🔒</span>
                            <span>stemrn.com / lesson /</span>
                            <span>angina</span>
                        </div>
                    </div>

                    {/* Content */}
                    <article className="relative pb-5.5 text-[13px] leading-normal text-[#1a2332] px-4 md:px-7 lg:px-11 pt-6 lg:pt-10 max-md:pb-4">
                        {/* Pills */}
                        <div className="mb-2 flex flex-wrap gap-1.25">
                            <span className="rounded-[3px] bg-[#EEF3F8] px-1.75 py-0.75 text-[12px] font-bold uppercase tracking-[0.06em] text-[#2C5F8D]">
                                Cardiac
                            </span>

                            <span className="rounded-[3px] bg-[#FFF1F4] px-1.75 py-0.75 text-[12px] font-bold uppercase tracking-[0.06em] text-[#B91C3C]">
                                Angina
                            </span>

                            <span className="rounded-[3px] bg-[#FEF3C7] px-1.75 py-0.75 text-[12px] font-bold uppercase tracking-[0.06em] text-[#92400E]">
                                NCLEX Core
                            </span>
                        </div>

                        <div className="py-6">
                            <h2 className="mb-3 text-[20px] font-bold leading-[1.15] tracking-[-0.02em] text-[#1A365D]">
                                <em className="not-italic text-[#FE5E7E]">Angina</em> — Chest
                                Pain from Ischemia
                            </h2>

                            <p className="max-w-full text-sm leading-normal text-[#4a5568]">
                                The heart&apos;s warning signal — temporary ischemia without
                                permanent damage. Three flavors: stable, unstable,
                                Prinzmetal&apos;s.
                            </p>
                        </div>

                        <div className="pb-6">
                            <h3 className="mb-3 text-xl font-bold tracking-[-0.01em] text-[#1A365D]">
                                Overview
                            </h3>

                            <p className="text-sm text-[#4a5568]">
                                <span className="border-b-[1.5px] border-dotted border-[#2C5F8D] font-semibold text-[#1A365D]">
                                    Anginaⓘ
                                </span>{" "}
                                = chest pain from{" "}
                                <span className="font-medium text-[#1A365D]">temporary myocardial ischemia.</span> Unlike MI, no
                                permanent damage. Troponin stays normal.
                            </p>
                        </div>

                        <h3 className="mb-1.25 text-xl font-bold tracking-[-0.01em] text-[#1A365D]">
                            Three types of angina
                        </h3>

                        {/* CTA ROW */}
                        <div
                            onClick={() => setOpen(true)}
                            className={`relative mt-3 flex cursor-pointer items-center gap-2 overflow-hidden rounded-[9px] border border-[#FFF1F4] border-l-4 border-l-[#F43F5E] bg-linear-to-br from-[#FFF8FA] to-white px-3 py-2.25 transition-all duration-300 ${autoPress
                                ? "scale-[0.985] border-[#F43F5E] bg-linear-to-br from-[#FFF1F4] to-[#FFF8FA]"
                                : "hover:-translate-y-px hover:border-[#F43F5E]"
                                }`}
                        >
                            <div
                                className={`flex h-8 w-8 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-xl bg-[#F43F5E] text-white transition-transform duration-300 ${autoPress ? "-rotate-6 scale-105" : ""
                                    }`}
                            >
                                <Search className="h-4 w-4 md:h-5 md:w-5" strokeWidth={2.5} />
                            </div>

                            <div className="flex-1">
                                <div className="mb-px text-[10px] font-bold uppercase tracking-widest text-[#F43F5E]">
                                    Figure 1
                                </div>

                                <div className="text-sm md:text-base font-semibold leading-[1.3] text-[#1E293B]">
                                    Three Types of Angina — Side-by-Side
                                </div>
                            </div>

                            <div
                                className={`shrink-0 text-base text-[#FE5E7E] transition-transform duration-300 ${autoPress ? "translate-x-1.25" : ""
                                    }`}
                            >
                                →
                            </div>
                        </div>
                    </article>
                    <StemrnTabs open={open} setOpen={setOpen} />
                </div>

                {/* RIGHT SIDE */}
                <div className="relative flex flex-col justify-center overflow-hidden rounded-[14px] bg-linear-to-br from-[#2C5F8D] to-[#1e4360] px-5.5 py-6 text-white">
                    <div className="relative z-10">
                        <div className="mb-2.5 text-sm font-medium uppercase tracking-[0.16em] text-[#F43F5E] sm:text-xs md:text-sm">
                            WHY STEMRN NOTES HIT DIFFERENT
                        </div>

                        <h2 className="my-8 font-serif font-bold text-[28px] leading-[1.2] tracking-[-1px] sm:my-10 sm:text-[36px] sm:leading-[1.18] sm:tracking-[-1.2px] md:my-11 md:text-[44px] md:tracking-[-1.5px] lg:text-[48px] xl:text-[52px]">
                            Built by a nurse, for the way <em className="text-[#F43F5E]">your brain actually learns.</em>
                        </h2>

                        <p className="text-sm leading-normal text-white/85 sm:text-base sm:leading-[1.55] md:text-base lg:text-lg">
                            NCLEX questions don&apos;t reward memorization —
                            they reward pattern recognition under pressure.
                            STEMRN notes layer everything you need (the
                            term, the picture, the comparison) into one spot,
                            so you stop tab-hopping and start connecting.
                            That&apos;s the muscle the test rewards. Open one
                            note and you&apos;ll feel it.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default StemrnFeatureSection;