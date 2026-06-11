"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = [
    {
        id: 1,
        slug: "core-nursing",
        title: "Core Nursing",
        color: "#2C5F8D",
        textColor: "#2C5F8D",
        subcategories: [
            {
                id: 1,
                slug: "fundamentals-of-nursing",
                title: "Fundamentals of Nursing",
            },
            {
                id: 2,
                slug: "pharmacology",
                title: "Pharmacology",
            },
            {
                id: 3,
                slug: "medical-surgical-nursing",
                title: "Medical Surgical Nursing",
            },
        ],
    },
    {
        id: 2,
        slug: "specialty-nursing",
        title: "Specialty Nursing",
        color: "#8E33FF",
        textColor: "#8E33FF",

        subcategories: [
            {
                id: 1,
                slug: "pediatric-nursing",
                title: "Pediatric Nursing",
            },
            {
                id: 2,
                slug: "psychiatric-nursing",
                title: "Psychiatric Nursing",
            },
            {
                id: 3,
                slug: "critical-care-nursing",
                title: "Critical Care Nursing",
            },
        ],
    },
    {
        id: 3,
        slug: "clinical-sciences",
        title: "Clinical Sciences",
        color: "#287851",
        textColor: "#287851",

        subcategories: [
            {
                id: 1,
                slug: "anatomy",
                title: "Anatomy",
            },
            {
                id: 2,
                slug: "physiology",
                title: "Physiology",
            },
            {
                id: 3,
                slug: "pathophysiology",
                title: "Pathophysiology",
            },
        ],
    },
    {
        id: 4,
        slug: "nclex-mastery",
        title: "NCLEX Mastery",
        color: "#B44359",
        textColor: "#B44359",

        subcategories: [
            {
                id: 1,
                slug: "anatomy",
                title: "Anatomy",
            },
            {
                id: 2,
                slug: "physiology",
                title: "Physiology",
            },
            {
                id: 3,
                slug: "pathophysiology",
                title: "Pathophysiology",
            },
        ],
    },
];

const FlashCardSidebar = ({ onClose }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || "study";
    const [expandCategories, setExpandCategories] = useState(false);
    const [activeTab, setActiveTab] = useState(currentTab);

    // Note: tab handlers
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        router.push(`/dashboard/flashcards?tab=${tab}`);
    };

    // Note: categories handlers
    const handleCategoryClick = (categorySlug) => {
        if (expandCategories === categorySlug) {
            setExpandCategories(null)
        } else {
            setExpandCategories(categorySlug)
        }
    };

    // Note: UI
    return (
        <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col px-6 py-4">
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
                        {categories?.map((category) => (
                            <div key={category.id}>
                                <button
                                    onClick={() => handleCategoryClick(category.slug)}
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
                                    <ChevronDown className={`h-6 w-6 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 
                                    ${expandCategories === category.slug ? "rotate-180" : ""}`} />
                                </button>

                                {/* sub categories */}
                                <div className={`overflow-hidden transition-all duration-300 ${expandCategories === category.slug ? 'h-auto' : 'h-0'}`}>
                                    <div className="flex flex-col items-start p-3 gap-2 border border-black/5 shadow-sm border-t-0 rounded-md">
                                        {
                                            category?.subcategories?.map((subCategory) => {
                                                return (
                                                    <Link
                                                        key={subCategory?.slug}
                                                        href={`/dashboard/flashcards/${subCategory?.slug}`}
                                                        onClick={onClose}
                                                        className={`flex items-center justify-between cursor-pointer rounded-lg text-start text-sm font-semibold hover:bg-gray-100 w-full hover:px-4 hover:py-2 transition-all duration-300`}
                                                        style={{ color: category.textColor }}
                                                    >
                                                        {subCategory?.title}
                                                        <ChevronRight size={16} />
                                                    </Link>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <></>
                )
            }
        </aside>
    );
};
export default FlashCardSidebar;