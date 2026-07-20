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
        <div className="mt-20">
            {/* header */}
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-2xl text-[#223247]">
                    All nursing areas
                </h2>

                {/* · Filter by status */}
                <p className="text-[#7D8794]">
                    Mark a topic complete when you've absorbed it.
                </p>
            </div>

            {/* filter */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button 
                    onClick={() => setFilter("all")}
                    className={`${filter === "all" ? "bg-[#1E2F44] text-white" : "bg-[#F1F1F1] text-black"} px-6 py-3 rounded-full`}
                >
                    All {topics.length}
                </button>

                <button 
                    onClick={() => setFilter("complete")}
                    className={`${filter === "complete" ? "bg-[#1E2F44] text-white" : "bg-[#F1F1F1] text-black"} px-6 py-3 rounded-full`}
                >
                    Complete {completeCount}
                </button>

                <button 
                    onClick={() => setFilter("notStarted")}
                    className={`${filter === "notStarted" ? "bg-[#1E2F44] text-white" : "bg-[#F1F1F1] text-black"} px-6 py-3 rounded-full`}
                >
                    Not started {notStartedCount}
                </button>
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
}