"use client";
import React from "react";
import { Mic, Clock, Search, User } from "lucide-react";
import { motion } from "framer-motion";

const languages = [
    { name: "English", flagUrl: "https://flagcdn.com/w40/us.png" },
    { name: "Spanish", flagUrl: "https://flagcdn.com/w40/es.png" },
    { name: "German", flagUrl: "https://flagcdn.com/w40/de.png" },
    { name: "French", flagUrl: "https://flagcdn.com/w40/fr.png" },
    { name: "Chinese", flagUrl: "https://flagcdn.com/w40/cn.png" },
    { name: "Hindi", flagUrl: "https://flagcdn.com/w40/in.png" },
];

const features = [
    {
        icon: Clock,
        title: "24/7 Available",
        description: "Get help anytime, day or night",
    },
    {
        icon: Search,
        title: "Evidence-Based",
        description: "Answers backed by nursing resources",
    },
    {
        icon: User,
        title: "Personalized",
        description: "Adapts to your learning style",
    },
];

const NewAiTutorSection = () => {
    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 text-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Column: Lumi Voice AI Visualizer Card */}
                    <div className="lg:col-span-5 w-full">
                        <div className="w-full bg-[#2A5C8A] rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center min-h-95 sm:min-h-110 relative overflow-hidden shadow-xl border border-sky-900/20">

                            {/* Ambient Glow background */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none"
                            />

                            {/* Soundwave Orb Graphic */}
                            <div className="relative flex items-center justify-center mb-8">

                                {/* Outer Wave Pulse Ring 3 */}
                                <motion.div
                                    animate={{ scale: [1, 1.45, 1], opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-cyan-400/20 pointer-events-none"
                                />

                                {/* Outer Wave Pulse Ring 2 */}
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-cyan-400/30 pointer-events-none"
                                />

                                {/* Outer Cyan Main Ring */}
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-cyan-400/60 shadow-[0_0_40px_rgba(34,211,238,0.35)] flex items-center justify-center relative z-10"
                                >
                                    {/* Inner Dark Core */}
                                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#162E48] border border-cyan-400/40 flex items-center justify-center shadow-inner overflow-hidden relative">

                                        {/* Animated Wave Equalizer Bars */}
                                        <div className="flex items-center gap-1.5 h-20 px-4 relative z-10">
                                            {[35, 75, 50, 95, 65, 85, 45, 80, 40].map((height, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{
                                                        height: [
                                                            `${height * 0.3}%`,
                                                            `${height}%`,
                                                            `${height * 0.4}%`,
                                                            `${height * 0.9}%`,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration: 1.1 + (i % 4) * 0.25,
                                                        repeat: Infinity,
                                                        repeatType: "reverse",
                                                        ease: "easeInOut",
                                                        delay: i * 0.08,
                                                    }}
                                                    className="w-1.5 sm:w-2 rounded-full bg-linear-to-t from-cyan-400 via-pink-400 to-purple-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                                                />
                                            ))}
                                        </div>

                                        {/* Overlay Wave SVG */}
                                        <svg
                                            className="w-full h-full p-4 absolute inset-0 opacity-40 pointer-events-none"
                                            viewBox="0 0 200 100"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <motion.path
                                                animate={{
                                                    d: [
                                                        "M10 50 Q 30 20, 50 50 T 90 50 T 130 50 T 170 50 T 190 50",
                                                        "M10 50 Q 30 80, 50 50 T 90 50 T 130 50 T 170 50 T 190 50",
                                                        "M10 50 Q 30 20, 50 50 T 90 50 T 130 50 T 170 50 T 190 50",
                                                    ],
                                                }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                stroke="url(#cyan-pink-grad-anim)"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                            <defs>
                                                <linearGradient id="cyan-pink-grad-anim" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#38bdf8" />
                                                    <stop offset="50%" stopColor="#e879f9" />
                                                    <stop offset="100%" stopColor="#818cf8" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                    </div>
                                </motion.div>
                            </div>

                            {/* Voice Text prompt */}
                            <span className="text-cyan-300 text-xs sm:text-sm font-medium tracking-wide mb-1 opacity-90">
                                Ask me anything medical
                            </span>
                            <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                                Talk to CARA...
                            </h3>

                            {/* Animated Mic Button */}
                            <motion.div
                                animate={{ scale: [1, 1.15, 1], boxShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 15px rgba(34,211,238,0.5)", "0 0 0px rgba(34,211,238,0)"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-9 h-9 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mt-1"
                            >
                                <Mic className="w-4 h-4 text-cyan-300" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column: AI Tutor Text & Features */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        {/* Eyebrow */}
                        <span className="text-[#2C6594] font-semibold text-xs sm:text-sm tracking-wider uppercase mb-2 block">
                            MEET YOUR AI STUDY PARTNER
                        </span>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-4">
                            AI Tutor That Understands You. In Any Language.
                        </h2>

                        {/* Description */}
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                            Get instant, accurate explanations on any nursing concept. Our AI Tutor speaks your language—literally.
                        </p>

                        {/* Languages Row */}
                        <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 mb-8">
                            {languages.map((lang, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                                    <img
                                        src={lang.flagUrl}
                                        alt={`${lang.name} flag`}
                                        className="w-5 sm:w-6 h-3.5 sm:h-4 object-cover rounded-xs border border-slate-200/80 shadow-2xs"
                                    />
                                    <span>{lang.name}</span>
                                </div>
                            ))}
                        </div>

                        {/* 3 Feature Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                            {features.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-300 transition-colors"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-[#2A5C8A]/10 text-[#2A5C8A] flex items-center justify-center mb-3">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                                {item.title}
                                            </h4>
                                            <p className="text-[11px] sm:text-xs text-slate-500 mt-1 leading-snug">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default NewAiTutorSection;
