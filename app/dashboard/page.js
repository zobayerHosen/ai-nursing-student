"use client";

import { useState } from "react";


const TABS = [
  "NGN NCLEX",
  "Flashcards",
  "Study Notes",
  "Lesson Videos"
];

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState("Study Notes");

    return (
        <div className='w-full flex flex-col gap-6 p-4 xl:p-6 bg-[#F7F7F7] min-h-screen'>
            {/* Tabs Navigation */}
            <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-[#EEEEEE] shadow-sm mb-2">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                            activeTab === tab
                                ? "bg-[#2C5F8D] text-white shadow-md"
                                : "bg-white text-[#4A4A4A] border border-[#DFE1E7] hover:bg-[#F3F4F6]"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {/* Tab Content */}
            <div className="flex-1 flex items-center justify-center bg-white rounded-2xl border border-[#EEEEEE] shadow-sm p-10 min-h-[50vh]">
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#2C5F8D]/10 text-[#2C5F8D] rounded-full flex items-center justify-center mx-auto mb-4">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                       </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#111827] mb-2">{activeTab} Dashboard</h2>
                    <p className="text-[#7A7A7A]">Content for the {activeTab} section will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;