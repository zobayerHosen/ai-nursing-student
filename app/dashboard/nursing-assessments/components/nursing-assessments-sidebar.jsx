"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCoreLearning } from "@/hooks/core-learning/core-learning.hook";
import { useState, Suspense } from 'react';

const NursingAssessmentsSidebarContent = ({ onClose }) => {
    const pathname = usePathname();
    const [limit, setLimit] = useState(2);
    const { coreLearningData, isLoading, coreLearningPagination, isFetching } = useCoreLearning("nursing_assessment", { limit });
    const categories = coreLearningData || [];

    const hasMore = coreLearningPagination?.count > (coreLearningData?.length || 0);

    return (
        <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col">
            {/* header */}
            <div className="border-b border-black/10 py-4 shrink-0">
                <div className="px-4 w-full flex flex-col items-start gap-4">
                    <h4 className="text-[#424242] font-semibold text-lg">Nursing Assessments</h4>
                </div>
            </div>

            {/* categories content */}
            <div className="p-4 space-y-3 flex flex-col text-start">
                {isLoading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                {!isLoading && categories.length === 0 && (
                    <p className="text-sm text-[#6D6D6D] text-center py-8">
                        No nursing assessments available.
                    </p>
                )}
                {categories?.map(data => {
                    const isActive = pathname.includes(`/dashboard/nursing-assessments/${data?.id}`);
                    return (
                        <Link
                            key={data.id}
                            href={`/dashboard/nursing-assessments/${data?.id}`}
                            onClick={onClose}
                            className={`flex items-center gap-2 py-2.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 ${isActive
                                    ? "bg-primary text-white [&_svg_path]:fill-current [&_svg_circle]:stroke-current"
                                    : "bg-gray-100 hover:bg-gray-200 text-[#424242]"
                                }`}
                        >
                            {data?.cover ? (
                                <span className="shrink-0 flex items-center justify-center w-6 h-6">{data.cover}</span>
                            ) : (
                                <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold uppercase ${isActive ? "bg-white/20" : "bg-white text-primary border border-primary/10 shadow-sm"
                                    }`}>
                                    {data?.title?.charAt(0)}
                                </span>
                            )}
                            {data?.title ?? ""}
                        </Link>
                    )
                })}

                {/* Load More Button */}
                {!isLoading && hasMore && (
                    <div className="flex justify-center pt-4 pb-2">
                        <button
                            onClick={() => setLimit(prev => prev + 2)}
                            disabled={isFetching}
                            className="px-4 py-2 bg-primary/80 text-white rounded text-sm font-medium hover:bg-primary/60 transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {isFetching ? "Loading..." : "See More"}
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
};

const NursingAssessmentsSidebar = ({ onClose }) => {
    return (
        <Suspense fallback={<div className="w-full h-full bg-white border-r border-black/10"></div>}>
            <NursingAssessmentsSidebarContent onClose={onClose} />
        </Suspense>
    );
};

export default NursingAssessmentsSidebar;