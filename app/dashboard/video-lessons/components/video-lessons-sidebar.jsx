import { Search, ChevronRight } from "lucide-react";
import videoLessonsSidebarData from "./video-lesssons-sidebar-data";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SidebarContent = ({ onClose }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get("category") || videoLessonsSidebarData[0]?.slug;

    const handleCategoryClick = (slug) => {
        router.push(`/dashboard/video-lessons?category=${slug}`);
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


            {/* video lessons content category*/}
            {/* Categories */}
            <div className="p-4 space-y-3">
                {videoLessonsSidebarData?.map((category) => {
                    const isActive = currentCategory === category?.slug;

                    return (
                        <div
                            key={category?.id}
                            className={`rounded-xl overflow-hidden border transition-all ${isActive ? "bg-white border-[#E5E5E5] shadow-sm" : "bg-[#F8F8F8] border-transparent"}`}
                        >
                            {/* Category Header */}
                            <button
                                onClick={() => handleCategoryClick(category?.slug)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-left transition-all ${isActive ? "" : "hover:bg-[#F3F3F3]"}`}
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex items-center justify-center w-4 h-4 shrink-0 text-[#6D6D6D]">
                                        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90 text-[#FF6B8A]" : ""}`} />
                                    </div>

                                    {/* Icon */}
                                    <div className="shrink-0 w-6.5 h-6.5 overflow-hidden rounded-lg">
                                        <Image
                                            src={category?.iconImage}
                                            alt={category?.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1">
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