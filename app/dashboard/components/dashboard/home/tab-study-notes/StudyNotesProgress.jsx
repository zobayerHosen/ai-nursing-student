"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import AllNursingAreas from "./AllNursingAreas";
import { useStudyNotesProgress } from "@/hooks/core-learning/study-notes-progress.hook";
import { ClipboardList, CheckCircle, Clock, Bookmark, ArrowUp } from "lucide-react";

const CenterLabel = ({ completedPercentage = 0 }) => {
    return (
        <>
            <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-[#1E293B]"
                style={{
                    fontSize: "28px",
                    fontWeight: "800",
                }}
            >
                {completedPercentage}%
            </text>
            <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                    fontSize: "10px",
                    fill: "#64748B",
                    fontWeight: "600",
                }}
            >
                Overall Coverage
            </text>
        </>
    );
};

const StudyNotesProgress = () => {
    const { content_summary, topics, isLoading, isError, error } = useStudyNotesProgress();
    console.log("study notes progres" , content_summary)

    if (isLoading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#326798] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const completedCount = content_summary?.marked_completed?.count || 0;
    const completedPct = content_summary?.marked_completed?.percentage || "0%";
    const notStartedCount = content_summary?.not_started?.count || 0;
    const notStartedPct = content_summary?.not_started?.percentage || "0%";
    const inProgressCount = content_summary?.in_progress?.count || 0;
    const totalCount = completedCount + notStartedCount + inProgressCount;
    
    const bookmarkCount = content_summary?.bookmark?.count || 0; 

    const chartData = [
        { name: "Completed", value: completedCount, color: "#0F4770" },
        { name: "Not Started", value: notStartedCount, color: "#DBEAFE" },
    ];

    const overallPercentage = parseInt(completedPct.replace('%', '')) || 35;

    return (
        <div className="w-full flex flex-col gap-6 pb-10">
            {/* Top Row */}
            <div className="flex flex-col xl:flex-row gap-6">
                
                {/* Left Card: Study Notes Chart */}
                <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 lg:p-8 flex-1 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
                    <div>
                        <h2 className="text-[#1E293B] font-bold text-xl">Study Notes</h2>
                        <p className="text-[#64748B] text-[12px] font-medium mt-1.5">62 lessons total</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-10 lg:gap-14 mt-6">
                        {/* Chart */}
                        <div className="w-48 h-48 relative shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={4}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <CenterLabel completedPercentage={overallPercentage} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#0F4770] mt-1.5 shrink-0" />
                                <div>
                                    <h3 className="text-[13px] font-bold text-[#1E293B] flex items-center gap-2">
                                        Completed <span className="text-[#1E293B] font-bold">{completedCount}</span> <span className="text-gray-400 font-medium">({completedPct})</span>
                                    </h3>
                                    <p className="text-[#94A3B8] text-[11px] mt-1">21 lessons completed</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#DBEAFE] mt-1.5 shrink-0" />
                                <div>
                                    <h3 className="text-[13px] font-bold text-[#1E293B] flex items-center gap-2">
                                        Not Started <span className="text-[#1E293B] font-bold">{notStartedCount}</span> <span className="text-gray-400 font-medium">({notStartedPct})</span>
                                    </h3>
                                    <p className="text-[#94A3B8] text-[11px] mt-1">21 lessons completed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Cards: 4 Stats */}
                <div className="xl:w-[45%] grid grid-cols-2 gap-4">
                    {/* Total Notes */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-h-35">
                        <div className="w-9 h-9 rounded-full mb-3 flex items-center justify-center bg-[#ECFDF5] text-[#10B981]">
                            <ClipboardList className="w-4 h-4" />
                        </div>
                        <p className="text-[#64748B] text-[11px] font-medium mb-1">Total Notes</p>
                        <h3 className="text-[#1E293B] text-[22px] font-bold">{totalCount.toLocaleString()}</h3>
                        <p className="text-[#94A3B8] text-[9px] mt-1 font-medium">Across all nursing areas</p>
                    </div>

                    {/* Completed */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-h-35">
                        <div className="w-9 h-9 rounded-full mb-3 flex items-center justify-center bg-[#F3E8FF] text-[#A855F7]">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                        <p className="text-[#64748B] text-[11px] font-medium mb-1">Completed</p>
                        <h3 className="text-[#1E293B] text-[22px] font-bold">{completedCount.toLocaleString()}</h3>
                        <p className="text-[#94A3B8] text-[9px] mt-1 font-medium">{completedPct} of all notes</p>
                    </div>

                    {/* InProgress */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-h-35">
                        <div className="w-9 h-9 rounded-full mb-3 flex items-center justify-center bg-[#FFE4E6] text-[#F43F5E]">
                            <Clock className="w-4 h-4" />
                        </div>
                        <p className="text-[#64748B] text-[11px] font-medium mb-1">InProgress</p>
                        <h3 className="text-[#1E293B] text-[22px] font-bold">{inProgressCount.toLocaleString()}</h3>
                        <div className="flex items-center justify-center gap-1 mt-1">
                            <ArrowUp className="w-3 h-3 text-[#10B981]" />
                            <p className="text-[#10B981] text-[9px] font-bold">8% <span className="text-[#94A3B8] font-medium">of all notes</span></p>
                        </div>
                    </div>

                    {/* bookmarked */}
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-h-35">
                        <div className="w-9 h-9 rounded-full mb-3 flex items-center justify-center bg-[#FEF3C7] text-[#F59E0B]">
                            <Bookmark className="w-4 h-4" />
                        </div>
                        <p className="text-[#64748B] text-[11px] font-medium mb-1">bookmarked</p>
                        <h3 className="text-[#1E293B] text-[22px] font-bold">{bookmarkCount.toLocaleString()}</h3>
                        <p className="text-[#94A3B8] text-[9px] mt-1 font-medium">You saved notes</p>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-transparent mt-2">
                <AllNursingAreas topics={topics} />
            </div>
{/* 
            {recentActivity && recentActivity.length > 0 && (
                <div className="mt-4">
                    <RecentlyCompleted recentActivity={recentActivity} />
                </div>
            )} */}
        </div>
    );
};

export default StudyNotesProgress;