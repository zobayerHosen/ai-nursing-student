"use client";

import { useGetFlashcardCategory } from "@/hooks/flashcards";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FLASHCARDICON = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 25 25"
        fill="none"
    >
        <path
            d="M10.5088 22.2684H17.8474C19.1596 22.2684 20.2272 21.2008 20.2272 19.8886V8.18652C20.2272 6.87314 19.1596 5.80469 17.8474 5.80469H17.1711C17.0622 5.80469 16.974 5.89297 16.974 6.00186C16.974 6.11074 17.0622 6.19902 17.1711 6.19902H17.8474C18.9422 6.19902 19.8329 7.09063 19.8329 8.18652V19.8886C19.8329 20.9834 18.9422 21.874 17.8474 21.874H10.5088C9.41396 21.874 8.52324 20.9834 8.52324 19.8886V19.2103C8.52324 19.1014 8.43506 19.0131 8.32607 19.0131C8.21709 19.0131 8.12891 19.1014 8.12891 19.2103V19.8886C8.12886 21.2008 9.19653 22.2684 10.5088 22.2684Z"
            fill="#7B7B7B"
        />
        <path
            d="M14.199 2.15625H6.8603C5.54912 2.15625 4.48047 3.22295 4.48047 4.53608V16.2381C4.48047 17.5513 5.54912 18.618 6.8603 18.618H14.199C15.5121 18.618 16.5788 17.5513 16.5788 16.2381V4.53608C16.5788 3.22295 15.5121 2.15625 14.199 2.15625ZM5.87837 4.06289H8.89902C9.00747 4.06289 9.09619 4.15161 9.09619 4.26006C9.09619 4.36851 9.00747 4.45723 8.89902 4.45723H5.87837C5.76992 4.45723 5.6812 4.36851 5.6812 4.26006C5.6812 4.15161 5.76997 4.06289 5.87837 4.06289ZM5.87837 5.31489H9.64629C9.75669 5.31489 9.84346 5.40361 9.84346 5.51206C9.84346 5.62051 9.75669 5.70923 9.64629 5.70923H5.87837C5.76992 5.70923 5.6812 5.62051 5.6812 5.51206C5.6812 5.40361 5.76997 5.31489 5.87837 5.31489ZM11.1448 6.96128H5.87837C5.76992 6.96128 5.6812 6.87256 5.6812 6.76411C5.6812 6.65566 5.76992 6.56694 5.87837 6.56694H11.1448C11.2532 6.56694 11.3419 6.65566 11.3419 6.76411C11.3419 6.87256 11.2532 6.96128 11.1448 6.96128Z"
            fill="#7B7B7B"
        />
    </svg>
);

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

                    return (
                        <div key={category.id}>
                            <button
                                onClick={() => handleCategoryClick(category.id)}
                                className="cursror-pointer w-full bg-white rounded-lg border border-black/5 shadow-sm px-3 py-2 flex items-center justify-between hover:shadow-md transition-all duration-300 group"
                            >
                                {/* Left Content */}
                                <div className="flex items-center gap-2">

                                    <p>{FLASHCARDICON}</p>

                                    <h2 className={`text-sm font-semibold`}>
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