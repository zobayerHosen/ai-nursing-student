"use client";

import { useCoreLearning } from "@/hooks";
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { useState, Suspense } from 'react';

const SidebarContent = ({ onClose }) => {
    const [openCategory, setOpenCategory] = useState(null);
    const [limit, setLimit] = useState(20);
    const { coreLearningData, isLoading, coreLearningPagination, isFetching } = useCoreLearning("study_notes", { limit });
    const categories = coreLearningData || [];

    const hasMore = coreLearningPagination?.count > (coreLearningData?.length || 0);

    const handleToggle = (id) => {
        setOpenCategory((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <aside className="w-full h-full border-r border-[#E2E8F0] bg-[#FAFAFA] overflow-y-auto overflow-x-hidden flex flex-col">
                {/* header content */}
                <div className="p-4 border-b border-[#E2E8F0] shrink-0 bg-white">
                    <h2 className="text-base font-bold text-[#111827] mb-3">
                        Study Notes
                    </h2>

                    {/* search study notes */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Notes"
                            className="w-full pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-[10px] text-[12px] outline-none text-gray-700 bg-white focus:border-[#326798] transition-colors"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="p-4 space-y-3 bg-[#FAFAFA] flex-1">
                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-6 h-6 border-2 border-[#326798] border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {!isLoading && categories?.length === 0 && (
                        <p className="text-sm text-[#6D6D6D] text-center py-8">
                            No study notes available.
                        </p>
                    )}

                    {categories?.map((category) => {
                        const isOpen = openCategory === category.id;

                        return (
                            <div
                                key={category?.id}
                                className="bg-white border border-[#E2E8F0] rounded-[12px] overflow-hidden shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
                            >
                                {/* Category Header */}
                                <button
                                    onClick={() => handleToggle(category?.id)}
                                    className="w-full flex items-center px-3 py-2.5 text-left hover:bg-[#F8FAFC] transition"
                                >
                                    <div className="flex items-center gap-2.5 w-full">
                                        {/* Arrow */}
                                        <div className="shrink-0">
                                            {isOpen ? (
                                                <ChevronDown className="w-4 h-4 text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>

                                        {/* Icon */}
                                        <div className="w-7 h-7 shrink-0 rounded-[8px] bg-[#F1F5F9] flex items-center justify-center overflow-hidden border border-[#E2E8F0]">
                                            {category?.cover ? (
                                                <Image
                                                    src={category.cover.startsWith('http') ? category.cover : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${category.cover}`}
                                                    alt={category.title}
                                                    width={350}
                                                    height={150}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-[10px] font-bold text-gray-400">
                                                    {category?.title?.charAt(0) || "C"}
                                                </span>
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-[11px] font-bold text-[#326798] truncate leading-tight">
                                                {category?.title ?? ""}
                                            </h5>

                                            {/* Progress Section */}
                                            <div className="flex items-center gap-2 mt-1 w-full">
                                                {/* Progress Bar */}
                                                <div className="flex-1 h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#F43F5E] rounded-full"
                                                        style={{ width: `${category?.progress?.progress_percentage || '0%'}` }}
                                                    />
                                                </div>

                                                {/* Topics */}
                                                <p className="text-[9px] font-bold text-[#326798] shrink-0">
                                                    {category?.progress?.completed_contents || 0}/{category?.progress?.total_contents || 0} Topics
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                {/* Subcategories */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ml-8 pr-2 ${isOpen
                                        ? "grid-rows-[1fr] opacity-100 pb-2"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="space-y-1.5 mt-1">
                                            {category?.contents?.map(
                                                (subcategory, index) => (
                                                    <Link
                                                        href={`/dashboard/study-notes/${subcategory?.id}`}
                                                        key={index}
                                                        onClick={() => {
                                                            if (onClose) onClose();
                                                        }}
                                                        className="w-full bg-white border border-[#E2E8F0] rounded-[8px] px-2.5 py-1.5 flex items-center justify-between hover:bg-[#F8FAFC] transition shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
                                                    >
                                                        <span className="text-[11px] text-[#4A4A4A] font-semibold truncate pr-2">
                                                            {subcategory?.content_name ?? ""}
                                                        </span>
                                                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Load More Button */}
                    {!isLoading && hasMore && (
                        <div className="flex justify-center pt-4 pb-2">
                            <button
                                onClick={() => setLimit(prev => prev + 2)}
                                disabled={isFetching}
                                className="px-4 py-2 bg-[#326798] text-white rounded-[10px] text-[12px] font-semibold hover:bg-[#2C5F8D] transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                            >
                                {isFetching ? "Loading..." : "See More"}
                            </button>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

const StudyNoteSidebar = ({ onClose }) => {
    return (
        <Suspense fallback={<div className="w-full h-full bg-[#FAFAFA] border-r border-[#E2E8F0]"></div>}>
            <SidebarContent onClose={onClose} />
        </Suspense>
    );
};

export default StudyNoteSidebar;