"use client";

import { ChevronRight, Heart, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import img01 from "@/public/images/dash_body_img_01.png";
import img02 from "@/public/images/dash_body_img_02.png";

const bodySystemData = [
    {
        id: 1,
        eyebrow: "SYSTEM 01",
        title: "Cardiovascular System",
        desc: "Circulates blood, oxygen, and nutrients throughout the body.",
        eyebrowColor: "#F43F5E",
        icon: Heart,
        iconColor: "#FBA1B7",
        image: img01,
    },
    {
        id: 2,
        eyebrow: "SYSTEM 02",
        title: "Respiratory System",
        desc: "Exchanges oxygen and carbon dioxide through breathing.",
        eyebrowColor: "#F43F5E",
        icon: Activity,
        iconColor: "#FBA1B7",
        image: img02,
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
                            key={system.id || index} 
                            className="bg-[#FBFBFB] border border-[#E2E8F0] rounded-3xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:border-gray-300 transition-all cursor-pointer min-h-40"
                        >
                            {/* Human Image Box */}
                            <div className="w-25 h-30 bg-white rounded-[20px] shrink-0 flex items-center justify-center overflow-hidden shadow-sm p-2">
                                {system.image ? (
                                    <Image
                                        src={system.image}
                                        alt={system.title}
                                        width={100}
                                        height={120}
                                        className="w-full h-full object-contain"
                                    />
                                ) : null}
                            </div>
                            
                            <div className="flex-1 mt-2 sm:mt-0 pb-8 sm:pb-0 z-10 text-center sm:text-left">
                                {/* Index Number Badge */}
                                {/* <p className="w-6 h-6 rounded-full bg-[#F3E8FF] text-[#7C3AED] font-semibold text-xs flex items-center justify-center mb-2 mx-auto sm:mx-0">
                                    {index + 1}
                                </p> */}

                                <h3 className="text-[14px] font-bold text-gray-800 mt-1 mb-1">{system.title}</h3>
                                <p className="text-[11px] text-gray-500 leading-relaxed max-w-70 mx-auto sm:mx-0">
                                    {system.desc}
                                </p>
                            </div>
                            
                            {/* Bottom right decorative icon */}
                            {Icon && (
                                <div className="absolute bottom-4 right-5 opacity-90">
                                    <Icon className="w-8 h-8" style={{ color: system.iconColor, strokeWidth: 1.5 }} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default BodySystemReview;
