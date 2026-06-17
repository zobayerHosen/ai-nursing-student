import { Search, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useGetModules } from "@/hooks";
import Image from "next/image";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL

const SidebarContent = ({ onClose }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { modulesData, isLoading } = useGetModules();

    const modules = modulesData?.data || [];
    const currentModuleId = searchParams.get("moduleId");

    const handleCategoryClick = (moduleId) => {
        router.push(`/dashboard/video-lessons?moduleId=${moduleId}`);
        if (onClose) onClose();
    };

    return (
        <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col">
            {/* header */}
            <div className="border-b border-black/10 py-4 shrink-0">
                <div className="px-4 w-full flex flex-col items-start gap-4">
                    <h4 className="text-[#424242] font-semibold text-lg">Video Lessons</h4>
                    {/* search videos */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D] w-5.5 h-5.5" />
                        <input
                            type="text"
                            placeholder="Search Videos"
                            className="w-full pl-11 pr-4 py-2.5 border border-[#DFE1E7] rounded-lg text-sm outline-0"
                        />
                    </div>
                </div>

                {/* progressed */}
                <div className='px-4 mt-4'>
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
                </div>
            </div>

            {/* Module Categories */}
            <div className="p-4 space-y-3">
                {isLoading && (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {!isLoading && modules?.length === 0 && (
                    <p className="text-sm text-[#6D6D6D] text-center py-8">
                        No modules available.
                    </p>
                )}

                {modules?.map((module) => {
                    const isActive = String(currentModuleId) === String(module?.id);
                    const videoCount = module?.videos?.length || 0;

                    return (
                        <div
                            key={module?.id}
                            className={`rounded-xl overflow-hidden border transition-all ${isActive ? "bg-white border-[#E5E5E5] shadow-sm" : "bg-[#F8F8F8] border-transparent"}`}
                        >
                            <button
                                onClick={() => handleCategoryClick(module?.id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition-all ${isActive ? "" : "hover:bg-[#F3F3F3]"}`}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex items-center justify-center w-4 h-4 shrink-0 text-[#6D6D6D]">
                                        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90 text-[#FF6B8A]" : ""}`} />
                                    </div>

                                    <div className="flex-1 flex items-center gap-2">
                                        {
                                            module?.logo && (
                                                <div className="shrink-0 w-10">
                                                    <Image
                                                        src={`${BASEURL}${module?.logo}`}
                                                        alt="Logo"
                                                        width={150}
                                                        height={150}
                                                        className="W-full h-full object-contain"
                                                    />
                                                </div>
                                            )
                                        }

                                        <div>
                                            <h5 className="text-sm font-semibold text-[#424242]">
                                                {module?.title ?? ""}
                                            </h5>

                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-xs text-[#7A7A7A]">
                                                    {module?.total_topic || `${videoCount} video${videoCount !== 1 ? "s" : ""}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    )
                })}
            </div>
        </aside>
    );
};

const VideoLessonsSidebar = ({ onClose }) => {
    return (
        <Suspense fallback={<div className="w-full h-full bg-white border-r border-black/10"></div>}>
            <SidebarContent onClose={onClose} />
        </Suspense>
    );
};

export default VideoLessonsSidebar;