"use client";

import { useGetFlashcardCategory } from "@/hooks/flashcards";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CATEGORY_COLORS = [
    { color: "#2C5F8D", textColor: "#2C5F8D" },
    { color: "#8E33FF", textColor: "#8E33FF" },
    { color: "#287851", textColor: "#287851" },
    { color: "#B44359", textColor: "#B44359" },
];

const FlashCardSidebar = ({ onClose }) => {
    const { flashcardData, isLoading } = useGetFlashcardCategory();

    const [expandCategories, setExpandCategories] = useState(null);

    let totalDecks = 0;
    let totalQuestions = 0;

    if (flashcardData) {
        flashcardData.forEach(category => {
            category.subcategories?.forEach(sub => {
                totalDecks += sub.cards?.length || 0;
                sub.cards?.forEach(card => {
                    totalQuestions += card.questions?.length || 0;
                });
            });
        });
    }


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
                    <span>• {totalDecks} decks</span>
                    <span>• {totalQuestions} cards</span>
                </div>
            </div>


            {/* active content data */}
            <div className="mt-4 flex flex-col gap-3">
                {isLoading && <div className="text-center py-4 text-gray-500">Loading categories...</div>}
                        {!isLoading && flashcardData?.map((category, index) => {
                            const colors = CATEGORY_COLORS[index % CATEGORY_COLORS.length];

                            return (
                                <div key={category.id}>
                                    <button
                                        onClick={() => handleCategoryClick(category.id)}
                                        className="cursror-pointer w-full bg-white rounded-lg border border-black/5 shadow-sm px-3 py-2 flex items-center justify-between hover:shadow-md transition-all duration-300 group"
                                    >
                                        {/* Left Content */}
                                        <div className="flex items-center gap-3">
                                            <span className={`h-2.5 w-2.5 rounded-full`} style={{ backgroundColor: colors.color }} />

                                            <h2 className={`text-sm font-semibold`} style={{ color: colors.textColor }}>
                                                {category.name ?? ""}
                                            </h2>
                                        </div>

                                        {/* Right Arrow */}
                                        <ChevronDown className={`h-6 w-6 text-gray-400 transition-transform duration-300 group-hover:translate-x-1 
                                        ${expandCategories === category.id ? "rotate-180" : ""}`} />
                                    </button>

                                    {/* sub categories */}
                                    <div className={`overflow-hidden transition-all duration-300 ${expandCategories === category.id ? 'h-auto' : 'h-0'}`}>
                                        <div className="flex flex-col items-start p-3 gap-2 border border-black/5 shadow-sm border-t-0 rounded-md">
                                            {
                                                category?.subcategories?.map((subCategory) => {
                                                    return (
                                                        <Link
                                                            key={subCategory?.id}
                                                            href={`/dashboard/flashcards/${subCategory?.id}`}
                                                            onClick={onClose}
                                                            className={`flex items-center justify-between cursor-pointer rounded-lg text-start text-sm font-semibold hover:bg-gray-100 w-full hover:px-4 hover:py-2 transition-all duration-300`}
                                                            style={{ color: colors.textColor }}
                                                        >
                                                            {subCategory?.name}
                                                            <ChevronRight size={16} />
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
            </div>
        </aside>
    );
};
export default FlashCardSidebar;