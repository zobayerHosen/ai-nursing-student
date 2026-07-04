"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCoreLearning } from "@/hooks";

const DiagnosticSidebar = ({ onClose }) => {
    const pathname = usePathname();
    const { coreLearningData, coreLearningPagination, isLoading } = useCoreLearning("diagonstic_test");
    console.log("coreLearningData", coreLearningData);

    const hasMore = coreLearningPagination?.count > (coreLearningData?.length || 0);

    // Note: Main UI
    return (
        <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col">
            {/* header content */}
            <div className="border-b border-black/10 py-4 shrink-0">
                <div className="px-4 flex flex-col gap-4">
                    <h4 className="text-[#424242] font-semibold text-lg">Diagnostic Tests & Labs</h4>
                </div>
            </div>

            {/* category */}
            <div className="w-full p-4 flex flex-col gap-3">
                {isLoading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                {!isLoading && coreLearningData?.length === 0 && (
                    <p className="text-sm text-[#6D6D6D] text-center py-8">
                        No diagnostic test labs available.
                    </p>
                )}
                {
                    coreLearningData?.map(data => {
                        const isActive = pathname === `/dashboard/diagnostic-test-labs/${data?.id}`;
                        return (
                            <Link
                                key={data.id}
                                href={`/dashboard/diagnostic-test-labs/${data?.id}`}
                                onClick={() => { if (onClose) onClose(); }}
                                className={`flex items-center gap-2 py-2.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 ${isActive
                                    ? "bg-primary text-white [&_svg_path]:fill-current"
                                    : "bg-gray-100 hover:bg-gray-200 text-[#424242]"
                                    }`}
                            >
                                {data?.cover ? (
                                    <span className="shrink-0 flex items-center justify-center w-6 h-6">{data.cover}</span>
                                ) : (
                                    <span className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold uppercase ${
                                        isActive ? "bg-white/20" : "bg-white text-primary border border-primary/10 shadow-sm"
                                    }`}>
                                        {data?.title?.charAt(0)}
                                    </span>
                                )}
                                {data?.title ?? ""}
                            </Link>
                        )
                    })
                }
            </div>
        </aside>
    );
};

export default DiagnosticSidebar;