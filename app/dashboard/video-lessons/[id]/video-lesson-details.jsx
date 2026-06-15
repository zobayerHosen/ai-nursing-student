"use client";

import { useState } from "react";
import { PlayCircle, Play, RotateCcw, RotateCw, Volume2, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import videoLessonsSidebarData from "../components/video-lesssons-sidebar-data";

const VideoLessonDetails = ({ videoId }) => {
    const [activeTab, setActiveTab] = useState("Overview");

    // Find the current video across all categories
    let currentVideo = null;
    let currentCategory = null;

    for (const category of videoLessonsSidebarData) {
        const video = category.videosList?.find(v => v.id === parseInt(videoId));
        if (video) {
            currentVideo = video;
            currentCategory = category;
            break;
        }
    }

    if (!currentVideo) {
        return (
            <div className="w-full min-h-125 flex items-center justify-center bg-white rounded-xl">
                <p className="text-gray-500">Video not found.</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Video Player Mockup */}
            <div className="w-full aspect-video bg-[#1B1F3B] rounded-2xl overflow-hidden relative flex flex-col justify-end group shadow-sm border border-[#E5E5E5]">
                {/* Simulated Player Center */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-8 h-8 text-[#FF6B8A] ml-2" fill="currentColor" />
                        </div>
                    </div>
                </div>

                {/* Simulated Player Controls */}
                <div className="p-4 bg-linear-to-t from-black/80 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-white/30 rounded-full mb-4 cursor-pointer relative">
                        <div className="absolute left-0 top-0 bottom-0 bg-[#FF6B8A] w-1/3 rounded-full"></div>
                        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>

                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-6">
                            <button><Play className="w-6 h-6" fill="currentColor" /></button>
                            <button><RotateCcw className="w-6 h-6" /></button>
                            <button><RotateCw className="w-6 h-6" /></button>
                            <div className="flex items-center gap-3">
                                <button><Volume2 className="w-6 h-6" /></button>
                                <span className="text-sm font-medium">7:24 / {currentVideo.duration || "22:15"}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <button className="px-3 py-1 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition">1.0x</button>
                            <button><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 8V4H8M16 4H20V8M4 16V20H8M16 20H20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                            <button><Maximize className="w-6 h-6" /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-[#F2F2F2] overflow-hidden">
                <div className="flex items-center border-b border-[#F2F2F2] px-6">
                    <button
                        onClick={() => setActiveTab("Overview")}
                        className={`py-4 px-2 font-medium text-sm transition-all relative ${activeTab === "Overview" ? "text-[#2A2A2A]" : "text-[#6D6D6D] hover:text-[#2A2A2A]"}`}
                    >
                        Overview
                        {activeTab === "Overview" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B8A]"></div>}
                    </button>
                    <button
                        onClick={() => setActiveTab("Resources")}
                        className={`py-4 px-6 font-medium text-sm transition-all relative ${activeTab === "Resources" ? "text-[#2A2A2A]" : "text-[#6D6D6D] hover:text-[#2A2A2A]"}`}
                    >
                        Resources
                        {activeTab === "Resources" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B8A]"></div>}
                    </button>
                </div>

                <div className="p-8">
                    {activeTab === "Overview" && (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-[#2A2A2A] mb-4">About this lesson</h2>
                                <p className="text-[#424242] leading-relaxed mb-4">
                                    {currentVideo.description || `This lesson walks through the pathophysiology of heart failure, starting with the cardiac compensation cycle and progressing through both left- and right-sided manifestations. By the end, you'll be able to recognize the priority signs, distinguish the two patterns clinically, and apply the high-yield nursing interventions tested most often on the NCLEX.`}
                                </p>

                                <h3 className="font-semibold text-[#2A2A2A] text-lg mb-3">You will learn:</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#2A2A2A] mt-1">•</span>
                                        <span className="text-[#424242]">How preload, afterload, and contractility interact in compensation</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#2A2A2A] mt-1">•</span>
                                        <span className="text-[#424242]">Why pulmonary edema appears in left-sided but not right-sided failure</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#2A2A2A] mt-1">•</span>
                                        <span className="text-[#424242]">The &quot;FACES&quot; mnemonic for early detection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#2A2A2A] mt-1">•</span>
                                        <span className="text-[#424242]">Priority interventions: positioning, oxygen</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {activeTab === "Resources" && (
                        <div>
                            <p className="text-[#6D6D6D]">Additional resources and materials for this lesson will appear here.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Up Next Section */}
            {currentCategory && (
                <div className="bg-white rounded-xl shadow-sm border border-[#F2F2F2] p-6">
                    <h3 className="text-xl font-bold text-[#2A2A2A] mb-6">Up next in {currentCategory.title}</h3>

                    {/* Mock Up Next Card - typically would be the next video in the array */}
                    <Link href={`/dashboard/video-lessons/${parseInt(videoId) + 1}`} className="flex items-center gap-4 group">
                        <div className="w-40 aspect-video bg-[#FF6B8A] rounded-lg overflow-hidden relative shrink-0">
                            {currentCategory.videosList?.[0] && (
                                <Image
                                    src={currentCategory.videosList[0].videoThumbnail}
                                    alt="Up next"
                                    className="w-full h-full object-cover mix-blend-overlay opacity-50"
                                />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-[#FF6B8A] rounded-sm"></div>
                                </div>
                            </div>
                            <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                                19:10
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] font-bold text-[#FF6B8A] uppercase tracking-wider mb-1">
                                {currentCategory.title}
                            </div>
                            <h4 className="font-semibold text-[#2A2A2A] mb-1 group-hover:text-[#FF6B8A] transition-colors">
                                Myocardial Infarction — STEMI vs NSTEMI
                            </h4>
                            <p className="text-sm text-[#6D6D6D]">
                                Nurse Cara
                            </p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default VideoLessonDetails;