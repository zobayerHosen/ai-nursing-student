"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCoreLearning } from "@/hooks/core-learning/core-learning.hook";
import { Calculator } from "lucide-react"; // Default icon
import { useState, Suspense } from 'react';

const DosageSidebarContent = ({ onClose }) => {
    const pathname = usePathname();
    const [limit, setLimit] = useState(2);
    const { coreLearningData, isLoading, coreLearningPagination, isFetching } = useCoreLearning("dosage_calcuation", { limit });
    const categories = coreLearningData || [];

    const hasMore = coreLearningPagination?.count > (coreLearningData?.length || 0);

    return (
        <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col">
            {/* header content */}
            <div className="border-b border-black/10 py-4 shrink-0">
                <div className="px-4 flex flex-col gap-4">
                    <h4 className="text-[#424242] font-semibold text-lg">Dosage Calculation</h4>
                </div>
            </div>

            {/* category */}
            <div className="w-full p-4 flex flex-col gap-3">
                {isLoading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                {!isLoading && categories.length === 0 && (
                    <p className="text-sm text-[#6D6D6D] text-center py-8">
                        No dosage calculations available.
                    </p>
                )}
                {categories?.map(data => {
                    const isActive = pathname.includes(`/dashboard/dosage-calculation/${data?.id}`);
                    return (
                        <Link
                            key={data.id}
                            href={`/dashboard/dosage-calculation/${data?.id}`}
                            onClick={onClose}
                            className={`flex items-center gap-2 py-2.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 ${
                                isActive 
                                ? "bg-primary text-white [&_svg_path]:fill-current [&_svg_circle]:stroke-current" 
                                : "bg-gray-100 hover:bg-gray-200 text-[#424242]"
                            }`}
                        >
                            <span className="shrink-0"><Calculator size={16} /></span>
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

const DosageSidebar = ({ onClose }) => {
    return (
        <Suspense fallback={<div className="w-full h-full bg-white border-r border-black/10"></div>}>
            <DosageSidebarContent onClose={onClose} />
        </Suspense>
    );
};

export default DosageSidebar;
