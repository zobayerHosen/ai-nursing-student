"use client";

import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = [
    {
        id: 1,
        slug: "core-nursing",
        title: "Core Nursing",
        color: "#2C5F8D",
        textColor: "#2C5F8D",
    },
    {
        id: 2,
        slug: "specialty-nursing",
        title: "Specialty Nursing",
        color: "#8E33FF",
        textColor: "#8E33FF",
    },
    {
        id: 3,
        slug: "clinical-sciences",
        title: "Clinical Sciences",
        color: "#287851",
        textColor: "#287851",
    },
    {
        id: 4,
        slug: "nclex-mastery",
        title: "NCLEX Mastery",
        color: "#B44359",
        textColor: "#B44359",
    },
];

const FlashCardSidebar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || "study";

    const [activeTab, setActiveTab] = useState(currentTab);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        router.push(`?tab=${tab}`);
    };

    // Note: UI
    return (
        <aside className="w-full max-w-82.5 border-r border-black/10  bg-white min-h-screen overflow-hidden sticky top-0 left-0 px-6 py-4">
            {/* header */}
            <div className="pb-4 border-b border-black/10">
                <h2 className="text-xl leading-none font-semibold text-[#424242]">
                    Flashcards
                </h2>

                <div className="mt-1.5 flex items-center gap-2 text-[#787878] font-medium">
                    <span>•0 decks</span>
                    <span>•0 cards</span>
                </div>
            </div>

            {/* tab buttons */}
            <div className="pt-4 flex items-center border-b border-gray-300">
                <button
                    onClick={() => handleTabClick('study')}
                    className={`w-1/2 cursor-pointer text-center py-1.5 rounded font-medium ${activeTab === 'study' ? 'bg-primary text-white' : ''}`}
                >
                    Study
                </button>
                <button
                    onClick={() => handleTabClick('progress')}
                    className={`w-1/2 cursor-pointer text-center py-1.5  rounded text-black ${activeTab === 'progress' ? 'bg-primary text-white' : ''}`}
                >
                    Progress
                </button>
            </div>

            {/* active content data */}
            {
                activeTab === 'study' ? (
                    <div className="mt-4 flex flex-col gap-3">
                        {categories.map((category) => (
                            <button
                                // href={`/dashboard/flashcards/${category.slug}`}
                                key={category.id}
                                className="cursror-pointer w-full bg-white rounded-lg border border-black/5 shadow-sm px-3 py-2 flex items-center justify-between hover:shadow-md transition-all duration-300 group"
                            >
                                {/* Left Content */}
                                <div className="flex items-center gap-3">
                                    <span className={`h-2.5 w-2.5 rounded-full`} style={{ backgroundColor: category.color }} />

                                    <h2 className={`text-sm font-semibold`} style={{ color: category.textColor }}>
                                        {category.title}
                                    </h2>
                                </div>

                                {/* Right Arrow */}
                                <ChevronDown className="h-6 w-6 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold text-[#424242]">Progress</h2>
                        <p className="text-sm text-gray-500 mt-2">You have not reviewed any cards yet.</p>
                    </div>
                )
            }
        </aside>
    );
};
export default FlashCardSidebar;