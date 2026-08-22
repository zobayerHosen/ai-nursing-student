import React from "react";
import { Users, Sparkles, ThumbsUp, Clock } from "lucide-react";

const statsData = [
    {
        icon: Users,
        value: "40K+",
        label: "Active Students",
    },
    {
        icon: Sparkles,
        value: "500k+",
        label: "Questions Answered",
    },
    {
        icon: ThumbsUp,
        value: "95%",
        label: "Satisfaction Rate",
    },
    {
        icon: Clock,
        value: "24/7",
        label: "AI Tutor Support",
    },
];

const NewStatsSection = () => {
    return (
        <section className="w-full bg-[#2A5C8A] py-8 sm:py-10 md:py-12 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Header Title & Subtitle */}
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                        Everything You Need to Pass the NCLEX
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-200/90 font-medium">
                        NCLEX-RN &amp; PN Prep &nbsp;•&nbsp; Next Gen Questions &nbsp;•&nbsp; AI Tutor 24/7 &nbsp;•&nbsp; Personalized Study Plans
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0">
                    {statsData.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className={`flex items-center justify-center gap-3 px-3 sm:px-4 py-2 text-left
                                    ${index === 1 ? "border-l border-white/20" : ""}
                                    ${index === 2 ? "border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-2" : ""}
                                    ${index === 3 ? "border-l border-t md:border-t-0 border-white/20 pt-4 md:pt-2" : ""}`
                                }
                            >
                                {/* Icon */}
                                <div className="shrink-0 text-white">
                                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col">
                                    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight">
                                        {item.value}
                                    </span>
                                    <span className="text-[11px] sm:text-xs md:text-sm text-slate-200/80 font-medium leading-tight mt-0.5">
                                        {item.label}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default NewStatsSection;