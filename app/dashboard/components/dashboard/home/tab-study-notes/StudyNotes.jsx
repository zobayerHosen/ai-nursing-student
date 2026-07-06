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

const data = [
    {
        name: "Complete",
        value: 100,
        percentage: "42%",
        color: "#4CC9A0",
    },
    {
        name: "Not Started",
        value: 100,
        percentage: "49%",
        color: "#D6D0C5",
    },
];

const total = data.reduce((acc, item) => acc + item.value, 0);
const completedPercentage = 73;

const CenterLabel = () => {
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
                <div className="w-[240px] h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={75}
                                outerRadius={95}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry) => (
                                    <Cell
                                        key={entry.name}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>

                            <CenterLabel />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Labels */}
                <div className="flex-1 space-y-10">
                    {data.map((item) => (
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
                                        : "Marked when fully studied"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="space-y-12 min-w-[140px]">
                    {data.map((item) => (
                        <div key={item.name}>
                            <h3 className="text-2xl text-[#233043] leading-none">
                                {item?.value ?? ""}
                            </h3>

                            <p className="text-[#8B97A7] text-lg mt-2">
                                {item?.percentage ?? ""}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <AllNursingAreas />
            <RecentlyCompleted />
        </div>
    );
};

export default StudyNotesTab;