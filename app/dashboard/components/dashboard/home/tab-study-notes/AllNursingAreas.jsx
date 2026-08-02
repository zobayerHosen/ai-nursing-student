// components/dashboard-tabs/AllNursingAreas.jsx
import { useState } from "react";
import NursingAreaCard from "./NursingAreaCard";
import { nursingAreas as staticAreas } from "./nursingAreas-data";

export default function AllNursingAreas({ topics = [] }) {
    const [filter, setFilter] = useState("all"); // 'all', 'complete', 'notStarted'

    const getStatusText = (status) => {
        if (status === "completed") return "complete";
        if (status === "in_progress") return "progress";
        return "notStarted";
    };

    const filteredTopics = topics.filter(topic => {
        const mappedStatus = getStatusText(topic.status);
        if (filter === "complete") return mappedStatus === "complete";
        if (filter === "notStarted") return mappedStatus === "notStarted";
        return true;
    });

    const completeCount = topics.filter(t => getStatusText(t.status) === "complete").length;
    const notStartedCount = topics.filter(t => getStatusText(t.status) === "notStarted").length;

    return (
        <div className="mt-8">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                {/* Left: Title */}
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-[#1E293B]">
                        All nursing areas
                    </h2>
                    <p className="text-[#64748B] text-[12px] font-medium">
                        Mark a topic complete when you&apos;ve absorbed it · Filter by status
                    </p>
                </div>

                {/* Right: filter */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`${filter === "all" ? "bg-[#0F4770] text-white" : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"} px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors flex items-center gap-1.5`}
                    >
                        All <span className={`${filter === "all" ? "bg-white/20" : "bg-[#E2E8F0]"} px-1.5 py-0.5 rounded-md`}>{topics.length}</span>
                    </button>

                    <button
                        onClick={() => setFilter("progress")}
                        className={`${filter === "progress" ? "bg-[#0F4770] text-white" : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"} px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors flex items-center gap-1.5`}
                    >
                        In Progress <span className={`${filter === "progress" ? "bg-white/20" : "bg-[#E2E8F0]"} px-1.5 py-0.5 rounded-md`}>{topics.filter(t => getStatusText(t.status) === "progress").length}</span>
                    </button>

                    <button
                        onClick={() => setFilter("complete")}
                        className={`${filter === "complete" ? "bg-[#0F4770] text-white" : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"} px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors flex items-center gap-1.5`}
                    >
                        Completed <span className={`${filter === "complete" ? "bg-white/20" : "bg-[#E2E8F0]"} px-1.5 py-0.5 rounded-md`}>{completeCount}</span>
                    </button>

                    <button
                        onClick={() => setFilter("notStarted")}
                        className={`${filter === "notStarted" ? "bg-[#0F4770] text-white" : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"} px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors flex items-center gap-1.5`}
                    >
                        Not Started <span className={`${filter === "notStarted" ? "bg-white/20" : "bg-[#E2E8F0]"} px-1.5 py-0.5 rounded-md`}>{notStartedCount}</span>
                    </button>
                </div>
            </div>

            {/* cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filteredTopics?.map((item) => {
                    // Match with static data to get icon and iconBg if available
                    const staticMatch = staticAreas.find(s => s.title.toLowerCase() === item.title.toLowerCase());
                    const [completedStr, totalStr] = (item.progress || "0/0").split("/");
                    const cardProps = {
                        title: item.title,
                        icon: staticMatch?.icon || "medical",
                        cover: item.cover,
                        status: getStatusText(item.status),
                        progress: parseInt((item.percentage || "0").replace('%', '')),
                        completed: parseInt(completedStr || "0"),
                        total: parseInt(totalStr || "0"),
                        date: item.status === "completed" ? "Completed" : (item.status === "in_progress" ? "In Progress" : "Not Started"),
                        iconBg: staticMatch?.iconBg || "#D5EFE6",
                    };

                    return (
                        <NursingAreaCard
                            key={item.category_id || item.title}
                            {...cardProps}
                        />
                    );
                })}
            </div>
        </div>
    );
};