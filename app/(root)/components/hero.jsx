"use client";
import Image from "next/image";
import heroImage from "@/public/assets/heroImg.png";
import Link from "next/link";
import { Play, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Hero = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        console.log("Play button clicked")
    };

    // Note: UI
    return (
        <section className="relative w-full bg-primary">
            <div className="flex min-h-screen flex-col overflow-hidden lg:flex-row">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, left: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="container mx-auto flex w-full flex-col justify-center px-6 py-8 md:py-12 lg:py-16 xl:px-10 2xl:px-25 lg:w-1/2"
                >
                    {/* Badge */}
                    <div className="mb-8 inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4.5 py-2.5 backdrop-blur-sm">
                        <span className="text-xs sm:text-sm lg:text-[15px] font-semibold uppercase tracking-[0.5px] text-white/95">
                            NEXT-GEN NCLEX PREP PLATFORM
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-155 text-3xl lg:text-5xl xl:text-6xl font-bold leading-[1.05] lg:tracking-[-2px] text-white/95">
                        Pass NCLEX on Your First Attempt. Guaranteed.
                    </h1>

                    {/* Description */}
                    <p className="mt-6 lg:mt-8 max-w-135 text-sm md:text-base lg:text-[19px] leading-[1.8] text-white/90">
                        STEMRN combines 5,000+ NGN-style questions, CARA
                        your AI tutor, adaptive flashcards, and real-time lab
                        interpretation — everything you need, in one intelligent
                        platform.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4 lg:mt-8 xl:mt-12">
                        <Link
                            href={"/auth"}
                            className="w-full sm:w-auto rounded-lg bg-[#FF5B7F] px-5 py-3 sm:px-7 xl:px-8 text-center text-base xl:text-[20px] font-medium xl:font-semibold text-white/95 transition hover:opacity-90"
                        >
                            Start Free Today
                        </Link>

                        <button
                            className="w-full sm:w-auto rounded-lg border border-white/60 bg-transparent px-5 py-3 sm:px-7 xl:px-8 text-base xl:text-[20px] font-medium xl:font-semibold text-white/95 transition hover:bg-white hover:text-[#366796]"
                        >
                            See How It Works
                        </button>
                    </div>
                </motion.div>

                {/* Right Image */}
                <div className="relative flex w-full items-end justify-end lg:w-1/2 lg:pt-14">
                    <div className="relative h-125 w-full sm:h-162.5 lg:h-screen">
                        <Image
                            src={heroImage}
                            alt="Hero Dashboard"
                            fill
                            priority
                            className="object-cover object-top-left"
                        />
                    </div>


                    <div className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                        <button onClick={handleClick} className="cursor-pointer bg-primary flex items-center justify-center size-16 rounded-full text-white"> <Play className="w-7 h-7" /></button>
                    </div>
                </div>
            </div>

            {/* open video modal */}
            <AnimatePresence mode="wait">
                {
                    clicked && (
                        <motion.div
                            onClick={() => setClicked(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
                        >
                            {/* Modal Content */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.9, ease: "easeInOut" }}
                                className="relative w-full max-w-7xl rounded-2xl overflow-hidden bg-black shadow-2xl"
                            >

                                {/* Close Button */}
                                <button
                                    onClick={() => setClicked(false)}
                                    className="cursor-pointer absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
                                >
                                    <X className="h-5 w-5" />
                                </button>

                                {/* Video */}
                                <div className="aspect-video w-full">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/hLrlwbtham0?si=1XXDifT6Ds4KJwBc"
                                        title="YouTube video player"
                                        frameBorder="0"

                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    >
                                    </iframe>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </section>
    );
};
export default Hero;