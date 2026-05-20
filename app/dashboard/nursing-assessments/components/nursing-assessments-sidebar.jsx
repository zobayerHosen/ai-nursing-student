"use client";
import { usePathname } from "next/navigation";
import { nursingSidebarCategory } from "./nursing-assessments-sidebar-data";

const NursingAssessmentsSidebar = () => {
    const pathname = usePathname()
    return (
        <aside className="w-82.5 border-r border-black/10 bg-white overflow-hidden sticky top-0 left-0 hidden md:block">
            {/* header */}
            <div className="border-b border-black/10 py-4 ">
                <div className="px-4 w-full flex flex-col items-start gap-4">
                    <h4 className="text-[#424242] font-semibold text-lg">Nursing Assessments</h4>
                </div>
            </div>

            {/* categories content */}
            <div className="p-4 space-y-3 flex flex-col text-start">
                {
                    nursingSidebarCategory?.map(category => {
                        const isActive = pathname === `/dashboard/`
                        return (
                            <button
                                key={category?.id}
                                className="bg-gray-100 flex items-center gap-2 py-2.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200"
                            >
                                <span>{category?.icon}</span>
                                {category?.category}
                            </button>
                        )
                    })
                }
            </div >
        </aside >
    );
};
export default NursingAssessmentsSidebar;