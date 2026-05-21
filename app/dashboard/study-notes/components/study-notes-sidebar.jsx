"use client";

import { ChevronDown, ChevronRight, ClipboardCheck, Plus, Search, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { categoriesData } from './study-notes-sidebar-data';

const StudyNoteSidebar = () => {
    const [openCategory, setOpenCategory] = useState(1);

    const handleToggle = (id) => {
        setOpenCategory((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <aside className="w-82.5 border-r border-black/10 bg-white min-h-screen overflow-hidden sticky top-0 left-0">
                {/* header content */}
                <div className="border-b border-black/10 py-4 ">
                    <div className="px-4 w-full flex flex-col items-start gap-4">
                        <h4 className="text-[#424242] font-semibold text-lg">Study Notes</h4>
                        {/* search study notes */}
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D] w-5.5 h-5.5" />
                            <input
                                type="text"
                                placeholder="Search Notes"
                                className="w-full pl-11 pr-4 py-2.5 border border-[#DFE1E7] rounded-lg text-sm outline-0"
                            />
                        </div>
                    </div>

                    {/* progressed */}
                    {/* <div className='px-4 mt-4'>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-[#424242]">
                                <span className="text-[#FF6B8A] font-semibold">34%</span>{" "}
                                watched .28/82 lessons
                            </p>

                            <button className="text-sm font-medium text-[#FF6B8A]">
                            Filter
                        </button>
                        </div>

                        <div className="w-full h-2 bg-[#E5E5E5] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#FF6B8A] rounded-full"
                                style={{ width: "34%" }}
                            />
                        </div>
                    </div> */}
                </div>

                {/* Categories */}
                <div className="p-4 space-y-3">
                    {categoriesData?.map((category) => {
                        const isOpen = openCategory === category.id;

                        return (
                            <div
                                key={category?.id}
                                className="bg-[#F8F8F8] rounded-xl overflow-hidden"
                            >
                                {/* Category Header */}
                                <button
                                    onClick={() => handleToggle(category?.id)}
                                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F3F3F3] transition"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Arrow */}
                                        <div>
                                            {isOpen ? (
                                                <ChevronDown className="w-5 h-5 text-[#4B5563]" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-[#4B5563]" />
                                            )}
                                        </div>

                                        {/* Icon */}
                                        <div>
                                            {category?.icon}
                                        </div>

                                        {/* Text */}
                                        <div>
                                            <h5 className="text-sm font-semibold text-[#424242]">
                                                {category?.title ?? ""}
                                            </h5>

                                            {/* Progress Section */}
                                            <div className="flex items-center gap-2 mt-1">

                                                {/* Progress Bar */}
                                                <div className="w-16 h-1.5 bg-[#D9D9D9] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-[#FF6B8A] rounded-full"
                                                        style={{ width: `${category?.progress}%` }}
                                                    />
                                                </div>

                                                {/* Topics */}
                                                <p className="text-xs text-[#7A7A7A]">
                                                    {category?.completedTopics}/{category?.topics} Topics
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </button>

                                {/* Subcategories */}
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ml-8 pr-2 ${isOpen
                                        ? "grid-rows-[1fr] opacity-100 py-3"
                                        : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="space-y-2">
                                            {category?.subcategories?.map(
                                                (subcategory, index) => (
                                                    <Link
                                                        href={`/dashboard/study-notes/${subcategory?.slug}`}
                                                        key={index}
                                                        className="w-full bg-white border border-[#EEEEEE] rounded-md px-3 py-2 flex items-center justify-between hover:bg-[#FAFAFA] transition"
                                                    >
                                                        <span className="text-sm text-[#4A4A4A] font-medium">
                                                            {subcategory?.title ?? ""}
                                                        </span>
                                                        <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </aside>
        </>
    );
};
export default StudyNoteSidebar;