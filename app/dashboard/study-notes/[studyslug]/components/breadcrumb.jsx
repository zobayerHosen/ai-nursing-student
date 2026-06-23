import { Bookmark, CheckCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Breadcrumb = ({ currentCategory, currentNote }) => {
    return (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
            {/* breadcrumb */}
            <nav className="overflow-x-auto whitespace-nowrap pb-2 xl:pb-0 hide-scrollbar">
                <ol className="flex items-center text-sm xl:text-base">
                    <li>
                        <Link
                            href="/dashboard/study-notes"
                            className="text-[#2C5F8D] hover:text-[#111827] font-medium"
                        >
                            {currentCategory?.title || "Study Notes"}
                        </Link>
                    </li>
                    <li className="text-[#696868] pl-2">
                        {" "}
                        ({currentCategory?.contents?.length || 0} topics)
                    </li>
                    <li>
                        <span className="mx-2 text-[#7A7A7A]">/</span>
                    </li>
                    <li>
                        <span className="text-[#7A7A7A]">
                            {currentNote?.content_name}
                        </span>
                    </li>
                </ol>
            </nav>
            {/* action buttons */}
            <div className="flex flex-wrap items-center gap-2 xl:gap-3">
                <button
                    className={`px-3 xl:px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium transition cursor-pointer shadow-sm bg-white border-[#E5E7EB] text-[#4A4A4A] hover:bg-slate-50 `}
                >
                    <Bookmark
                        className={`w-4 h-4 text-[#7A7A7A]`}
                    />

                    <span className="hidden sm:inline">
                        Save Notes
                    </span>
                    <span className="sm:hidden">Save</span>
                </button>

                <button className="px-3 xl:px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm">
                    <Share2 className="w-4 h-4 text-[#7A7A7A]" />
                    <span className="hidden sm:inline">Share Notes</span>
                    <span className="sm:hidden">Share</span>
                </button>

                <button
                    className={`px-3 xl:px-4 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-semibold transition cursor-pointer shadow-sm bg-[#FF6B8A] hover:bg-[#E05270] `}
                >
                    <CheckCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">
                        Mark Completed
                    </span>
                    <span className="sm:hidden">
                       Complete
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Breadcrumb;