"use client";

import { ChevronRight, Heart, Accessibility, Activity } from "lucide-react";
import Link from "next/link";

const bodySystemData = [
    {
        eyebrow: "SYSTEM 01",
        title: "Cardiovascular System",
        desc: "Heart physiology, Hemodynamics, and Clinical Assessment pathways for critical care.",
        eyebrowColor: "#F43F5E",
        icon: Heart,
        iconColor: "#FBA1B7"
    },
    {
        eyebrow: "SYSTEM 10",
        title: "Female Reproductive System",
        desc: "Anatomy & Physiology | Menstrual Cycle | Pregnancy & Lactation | Gynecologic Disorders",
        eyebrowColor: "#F43F5E",
        icon: Activity, // Placeholder icon
        iconColor: "#FBA1B7"
    }
];

const BodySystemReview = () => {
    return (
        <section className="w-full bg-white rounded-3xl border border-[#E2E8F0] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-bold text-gray-800">Body System Review</h2>
                <Link href="/dashboard/body-systems" className="text-[11px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                    View All Systems <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {bodySystemData.map((system, index) => {
                    const Icon = system.icon;
                    return (
                        <div 
                            key={index} 
                            className="bg-[#FBFBFB] border border-[#E2E8F0] rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-gray-300 transition-all cursor-pointer min-h-[160px]"
                        >
                            {/* Human Image Box Placeholder */}
                            {/* Replace the content of this div with your exact SVG/Image */}
                            <div className="w-[100px] h-[120px] bg-white rounded-[20px] shrink-0 flex items-center justify-center overflow-hidden shadow-sm">
                                <Accessibility className="w-12 h-12 text-gray-200" />
                            </div>
                            
                            <div className="flex-1 mt-2 sm:mt-0 pb-8 sm:pb-0 z-10 text-center sm:text-left">
                                <span 
                                    className="text-[9px] font-bold uppercase tracking-wider"
                                    style={{ color: system.eyebrowColor }}
                                >
                                    {system.eyebrow}
                                </span>
                                <h3 className="text-[14px] font-bold text-gray-800 mt-1 mb-2">{system.title}</h3>
                                <p className="text-[11px] text-gray-500 leading-relaxed max-w-[280px] mx-auto sm:mx-0">
                                    {system.desc}
                                </p>
                            </div>
                            
                            {/* Bottom right decorative icon */}
                            <div className="absolute bottom-4 right-5 opacity-90">
                                <Icon className="w-8 h-8" style={{ color: system.iconColor, strokeWidth: 1.5 }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default BodySystemReview;