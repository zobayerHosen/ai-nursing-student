"use client";

import { useState } from "react";
import { Play, RotateCcw, RotateCw, Volume2, Maximize } from "lucide-react";
import Link from "next/link";
import { useGetVideoDetails, usePostVideoProgress } from "@/hooks";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const VideoLessonDetails = ({ videoId }) => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("Overview");
    const { videoData, isLoading, isError } = useGetVideoDetails(videoId);
    const { videoProgress } = usePostVideoProgress();

    const handleVideoEnded = async (e) => {
        try {
            const video = e.target;
            await videoProgress({
                id: videoId,
                total_duration: Math.round(video.duration),
                current_duration: Math.round(video.currentTime),
                is_completed: true,
            });
            queryClient.invalidateQueries({ queryKey: "video-module", videoId })
            toast.success("Lesson completed!");
        } catch (error) {
            toast.error("Failed to save progress");
        }
    };

    console.log("Video", videoData)

    if (isLoading) {
        return (
            <div className="w-full min-h-125 flex items-center justify-center bg-white rounded-xl">
                <div className="w-8 h-8 border-2 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isError || !videoData) {
        return (
            <div className="w-full min-h-125 flex items-center justify-center bg-white rounded-xl">
                <p className="text-gray-500">Video not found.</p>
            </div>
        );
    }

    const videoSrc = videoData?.video_url ? `${BASEURL}${videoData?.video_url}` : null;

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Video Player */}
            {videoSrc ? (
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-sm border border-[#E5E5E5]">
                    <video
                        controls
                        className="w-full h-full object-contain bg-black"
                        src={videoSrc}
                        onEnded={handleVideoEnded}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
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
                                    <span className="text-sm font-medium">0:00 / 0:00</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <button className="px-3 py-1 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition">1.0x</button>
                                <Maximize className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Title & Info */}
            <div className="bg-white rounded-xl shadow-sm border border-[#F2F2F2] p-6">
                <h1 className="text-2xl font-bold text-[#2A2A2A] mb-2">{videoData?.title ?? "N/A"}</h1>
                <p className="text-sm text-[#6D6D6D]">
                    {videoData?.serial_number && `Lesson ${videoData?.serial_number}`}
                </p>
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
                                    {videoData?.overview || videoData?.description || "No overview available for this lesson."}
                                </p>

                                {videoData?.resources?.length > 0 && (
                                    <>
                                        <h3 className="font-semibold text-[#2A2A2A] text-lg mb-3">Resources</h3>
                                        <ul className="space-y-2">
                                            {videoData?.resources.map((resource) => (
                                                <li key={resource.id} className="flex items-start gap-2">
                                                    <span className="text-[#2A2A2A] mt-1">•</span>
                                                    <span className="text-[#424242]">
                                                        {resource.object_name} ({resource.object_type})
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "Resources" && (
                        <div>
                            {videoData?.resources?.length > 0 ? (
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-[#2A2A2A] text-lg mb-3">Lesson Resources</h3>
                                    <div className="grid gap-3">
                                        {videoData?.resources?.map((resource) => (
                                            <div
                                                key={resource.id}
                                                className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-[#F2F2F2]"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#FF6B8A]/10 flex items-center justify-center shrink-0">
                                                    <span className="text-[#FF6B8A] font-semibold text-sm uppercase">
                                                        {resource.object_type?.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[#2A2A2A] text-sm">
                                                        {resource.object_name}
                                                    </p>
                                                    <p className="text-xs text-[#6D6D6D] capitalize">
                                                        {resource.object_type}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-[#6D6D6D]">
                                    No additional resources available for this lesson.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Up Next Section */}
            <div className="bg-white rounded-xl shadow-sm border border-[#F2F2F2] p-6">
                <h3 className="text-xl font-bold text-[#2A2A2A] mb-6">Up next</h3>
                <Link
                    href={`/dashboard/video-lessons`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#FF6B8A] hover:underline"
                >
                    ← Back to all lessons
                </Link>
            </div>
        </div>
    );
};

export default VideoLessonDetails;
