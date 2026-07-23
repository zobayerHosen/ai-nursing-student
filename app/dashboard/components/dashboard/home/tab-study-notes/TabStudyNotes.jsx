"use client";

import Link from "next/link";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import AllNursingAreas from "./AllNursingAreas";
import RecentlyCompleted from "./RecentlyCompleted";
import { useStudyNotesProgress } from "@/hooks/core-learning/study-notes-progress.hook";



const CenterLabel = ({ completedPercentage = 0 }) => {
    return (
        <>
            <text
                x="50%"
                y="45%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-black"
                style={{
                    fontSize: "34px",
                    fontWeight: "700",
                }}
            >
                {completedPercentage}%
            </text>

            <text
                x="50%"
                y="57%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                    fontSize: "10px",
                    fill: "#94A3B8",
                    fontWeight: "500",
                }}
            >
                READINESS
            </text>

            <text
                x="50%"
                y="66%"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                    fontSize: "9px",
                    fill: "#4CC9A0",
                    fontWeight: "700",
                }}
            >
                HIGH PROBABILITY
            </text>
        </>
    );
};

const StudyNotesTab = () => {
    const { content_summary, recentActivity, topics, isLoading, isError, error } = useStudyNotesProgress();

    if (isLoading) return <div>Loading...</div>;

    const chartData = [
        {
            name: "Complete",
            value: content_summary?.marked_completed?.count || 0,
            percentage: content_summary?.marked_completed?.percentage || "0%",
            color: "#4CC9A0",
        },
        {
            name: "In Progress",
            value: content_summary?.in_progress?.count || 0,
            percentage: content_summary?.in_progress?.percentage || "0%",
            color: "#FBBF24",
        },
        {
            name: "Not Started",
            value: content_summary?.not_started?.count || 0,
            percentage: content_summary?.not_started?.percentage || "0%",
            color: "#D6D0C5",
        },
    ];

    const completedPercentage = content_summary?.total_completed?.percentage?.replace('%', '') || 0;

    return (
        <div className="w-full bg-white rounded-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-14">
                <div>
                    <h2 className="text-3xl text-[#233043]">
                        Coverage at a glance
                    </h2> 

                    <p className="text-[#8B97A7] mt-2">
                        Self-marked progress across all study notes
                    </p>
                </div>

                <Link
                    href="/dashboard/study-notes"
                    className="text-[#233043] font-medium hover:underline"
                >
                    Browse library →
                </Link>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                {/* Chart */}
                <div className="w-60 h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                                <Pie
                                    data={chartData}
                                    innerRadius={75}
                                    outerRadius={95}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {chartData.map((entry) => (
                                        <Cell
                                            key={entry.name}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>

                                <CenterLabel completedPercentage={completedPercentage} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Labels */}
                <div className="flex-1 space-y-10">
                    {chartData.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center gap-4"
                        >
                            <div
                                className="w-3 h-3 rounded-full mt-1"
                                style={{
                                    backgroundColor: item.color,
                                }}
                            />

                            <div>
                                <h3 className="text-md font-medium text-[#233043]">
                                    {item.name}
                                </h3>

                                <p className="text-[#8B97A7] text-sm">
                                    {item.name === "Not Started"
                                        ? "Still to read"
                                        : item.name === "In Progress"
                                        ? "Currently reading"
                                        : "Marked when fully studied"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="space-y-12 min-w-35">
                    {chartData.map((item) => (
                        <div key={item.name}>
                            <h3 className="text-2xl text-[#233043] leading-none">
                                {item?.value ?? 0}
                            </h3>

                            <p className="text-[#8B97A7] text-lg mt-2">
                                {item?.percentage ?? "0%"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <AllNursingAreas topics={topics} />
            <RecentlyCompleted recentActivity={recentActivity} />
        </div>
    );
};

export default StudyNotesTab;