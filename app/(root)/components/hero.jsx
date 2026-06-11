"use client";
import Image from "next/image";
import heroImage from "@/public/assets/heroImg.webp";
import Link from "next/link";
import { Play, X } from "lucide-react";
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
        <section className="relative w-full overflow-hidden bg-primary min-h-screen lg:min-h-0">
            <div className="container mx-auto flex flex-col items-center px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:flex-row lg:px-8 lg:py-0 lg:min-h-150 xl:min-h-175 2xl:min-h-200">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex w-full flex-col justify-center text-center lg:text-left lg:w-1/2 lg:pr-8 xl:pr-12 2xl:pr-16"
                >
                    {/* Badge */}
                    <div className="mb-4 inline-flex w-fit items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md sm:px-4 sm:py-2 md:mb-5 lg:mb-6 mx-auto lg:mx-0">
                        <span className="text-[10px] font-semibold uppercase tracking-[1px] text-white sm:text-xs md:text-sm">
                            NEXT-GEN NCLEX PREP PLATFORM
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-162.5 mx-auto lg:mx-0 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
                        Pass NCLEX on Your First Attempt.
                        <span className="block text-[#FF5B7F]">
                            Guaranteed.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-4 max-w-155 mx-auto lg:mx-0 text-sm leading-relaxed text-white/85 sm:text-base md:text-lg lg:mt-5 lg:text-base xl:text-lg">
                        STEMRN combines 5,000+ NGN-style questions,
                        CARA your AI tutor, adaptive flashcards,
                        and real-time lab interpretation — everything
                        you need, in one intelligent platform.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-8 xl:mt-10 justify-center lg:justify-start">
                        <Link
                            href={user ? (user?.is_profile_completed ? "/dashboard" : "/auth/profile-setup") : "/auth"}
                            className="flex items-center justify-center rounded-xl bg-[#FF5B7F] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:px-6 sm:py-3 sm:text-base lg:px-7 lg:py-3.5 lg:text-base xl:px-8 xl:py-4 xl:text-lg"
                        >
                            {user ? (user?.is_profile_completed ? "Dashboard" : "Profile Setup") : "Start Free Today"}
                        </Link>

                        <button
                            className="rounded-xl border border-white/50 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-primary sm:px-6 sm:py-3 sm:text-base lg:px-7 lg:py-3.5 lg:text-base xl:px-8 xl:py-4 xl:text-lg"
                        >
                            See How It Works
                        </button>
                    </div>
                </motion.div>

                {/* Right Image */}
                <div className="relative mt-8 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">

                    <div className="relative h-70 w-full sm:h-95 md:h-120 lg:h-125 xl:h-150 2xl:h-175">
                        <Image
                            src={heroImage}
                            alt="Hero Dashboard"
                            fill
                            priority
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                        />
                    </div>

                    {/* Play Button */}
                    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute inset-1 animate-ping rounded-full bg-primary/20"></div>
                        <div className="absolute inset-1 animate-pulse rounded-full bg-primary/30"></div>
                        <button
                            onClick={handleClick}
                            className="cursor-pointer relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white transition-all duration-300 sm:h-14 sm:w-14 md:h-16 md:w-16"
                        >
                            <Play className="ml-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 fill-current" />
                        </button>
                    </div>
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-3 sm:px-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl sm:max-w-6xl overflow-hidden rounded-xl sm:rounded-2xl bg-black shadow-2xl mx-3 sm:mx-0"
                        >

                            {/* Close Button */}
                            <button
                                onClick={() => setClicked(false)}
                                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-50 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                            >
                                <X className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>

                            {/* Video */}
                            <div className="aspect-video w-full">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/embed/hLrlwbtham0?si=1XXDifT6Ds4KJwBc"
                                    title="YouTube video player"
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