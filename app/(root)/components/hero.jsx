"use client";
import Image from "next/image";
import heroImage from "@/public/assets/heroImg.webp";
import Link from "next/link";
import { 
    Play, 
    X, 
    ArrowRight, 
    Bot, 
    Stethoscope, 
    GraduationCap, 
    Users
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGetUser } from "@/hooks";

const Hero = () => {
    const { user } = useGetUser();
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
    };

    return (
        <section className="relative w-full overflow-hidden bg-[#1C2534] py-8 sm:py-10 lg:py-12 text-white min-h-160 flex items-center">
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-385">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-12">

                    {/* Left Column Content - Adjusted font size for 1024px (lg breakpoint) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-5/12 xl:w-5/12 flex flex-col justify-center text-left shrink-0"
                    >
                        {/* Main Title - Smaller font size on 1024px laptop (lg:text-3xl) */}
                        <h1 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold leading-[1.18] tracking-tight text-white">
                            NCLEX-RN & NCLEX-PN Prep Platform.{" "}
                            <span className="block mt-1 text-transparent bg-clip-text bg-linear-to-r from-[#E879F9] via-[#F472B6] to-[#C084FC]">
                                Pass With Confidence The First Time
                            </span>
                        </h1>

                        {/* Description - Smaller text size on 1024px laptop (lg:text-xs) */}
                        <p className="mt-4 text-xs sm:text-sm lg:text-xs xl:text-base text-slate-300 leading-relaxed max-w-xl">
                            Prepare smarter with comprehensive question banks, Next Gen clinical cases, high-yield nursing notes, personalized study plans, and an AI nursing tutor available whenever you need help.
                        </p>

                        {/* 4 Feature Badges - Compact spacing for 1024px laptops */}
                        <div className="mt-6 lg:mt-6 xl:mt-8 grid grid-cols-4 gap-2 lg:gap-2 xl:gap-4 max-w-lg">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-8 h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-xl bg-sky-500/15 border border-sky-400/20 text-sky-400 flex items-center justify-center mb-1.5">
                                    <Bot className="w-4 h-4 xl:w-5 xl:h-5" />
                                </div>
                                <span className="text-[10px] lg:text-[10px] xl:text-[11px] font-medium text-slate-300 leading-tight">
                                    AI-Powered Study Tools
                                </span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-8 h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-xl bg-teal-500/15 border border-teal-400/20 text-teal-400 flex items-center justify-center mb-1.5">
                                    <Stethoscope className="w-4 h-4 xl:w-5 xl:h-5" />
                                </div>
                                <span className="text-[10px] lg:text-[10px] xl:text-[11px] font-medium text-slate-300 leading-tight">
                                    Built for Nursing Students
                                </span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-8 h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-xl bg-purple-500/15 border border-purple-400/20 text-purple-400 flex items-center justify-center mb-1.5">
                                    <GraduationCap className="w-4 h-4 xl:w-5 xl:h-5" />
                                </div>
                                <span className="text-[10px] lg:text-[10px] xl:text-[11px] font-medium text-slate-300 leading-tight">
                                    NCLEX Next Gen Ready
                                </span>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-8 h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-xl bg-orange-500/15 border border-orange-400/20 text-orange-400 flex items-center justify-center mb-1.5">
                                    <Users className="w-4 h-4 xl:w-5 xl:h-5" />
                                </div>
                                <span className="text-[10px] lg:text-[10px] xl:text-[11px] font-medium text-slate-300 leading-tight">
                                    Trusted by 10,000+ Students
                                </span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-6 lg:mt-6 xl:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <Link
                                href={user ? (user?.is_profile_completed ? "/dashboard" : "/auth/profile-setup") : "/auth"}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] px-5 py-3 lg:px-4 lg:py-2.5 xl:px-6 xl:py-3.5 text-xs xl:text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>{user ? (user?.is_profile_completed ? "Dashboard" : "Profile Setup") : "Start Free Today"}</span>
                                <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                            </Link>

                            <button
                                onClick={handleClick}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 hover:bg-white/10 px-5 py-3 lg:px-4 lg:py-2.5 xl:px-6 xl:py-3.5 text-xs xl:text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                                <span className="w-4 h-4 xl:w-5 xl:h-5 rounded-full border border-white/60 flex items-center justify-center">
                                    <Play className="w-2 h-2 xl:w-2.5 xl:h-2.5 fill-white ml-0.5" />
                                </span>
                                <span>See How It Works</span>
                            </button>
                        </div>

                        {/* Footer Subtext */}
                        <p className="mt-2.5 text-[11px] xl:text-xs text-slate-400">
                            No credit card required • Cancel anytime
                        </p>
                    </motion.div>

                    {/* Right Column Content - Extra Large Monitor Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-7/12 xl:w-7/12 relative flex items-center justify-center min-h-95 sm:min-h-120 lg:min-h-140 xl:min-h-160"
                    >
                        {/* Central Monitor Image Container */}
                        <div className="relative w-full max-w-175 lg:max-w-185 xl:max-w-250 aspect-16/10 drop-shadow-2xl">
                            <Image
                                src={heroImage}
                                alt="STEMRN Dashboard Interface"
                                fill
                                priority
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 65vw"
                            />

                            {/* Center Screen Interactive Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <button
                                    onClick={handleClick}
                                    className="w-14 h-14 sm:w-16 sm:h-16 lg:w-16 lg:h-16 rounded-full bg-primary hover:bg-primary/80 text-white flex items-center justify-center shadow-2xl shadow-primary/60 hover:scale-110 transition-all cursor-pointer group"
                                >
                                    <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1 group-hover:scale-105 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence mode="wait">
                {clicked && (
                    <motion.div
                        onClick={() => setClicked(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3 sm:px-4 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl sm:max-w-6xl overflow-hidden rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl mx-3 sm:mx-0"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setClicked(false)}
                                className="absolute top-3 right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Video iFrame */}
                            <div className="aspect-video w-full">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/hLrlwbtham0?si=1XXDifT6Ds4KJwBc&autoplay=1"
                                    title="STEMRN Platform Overview"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;