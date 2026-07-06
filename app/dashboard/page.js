"use client";

import { useState } from "react";
import { TAB_COMPONENTS, TABS } from "./components/dashboard/home/tabComponents";

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("NGN NCLEX");
    const ActiveComponent = TAB_COMPONENTS[activeTab]

    return (
        <div className='w-full flex flex-col gap-6 p-4 xl:p-6 bg-[#F7F7F7]'>
            {/* Tabs Navigation */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-[#EEEEEE] shadow-sm mb-2">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab
                            ? "bg-[#2C5F8D] text-white shadow-md"
                            : "bg-white text-[#4A4A4A] border border-[#DFE1E7] hover:bg-[#F3F4F6]"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {/* Tab Content */}
            <div className="flex-1 bg-white rounded-2xl border border-[#EEEEEE] shadow-sm px-10 py-6">
                <ActiveComponent />
            </div>
        </div>
    );
};

export default DashboardPage;