"use client";
import { usePathname } from "next/navigation";
import { nursingSidebarCategory } from "./nursing-assessments-sidebar-data";
import Link from "next/link";

const NursingAssessmentsSidebar = ({ onClose }) => {
    const pathname = usePathname()
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
                {
                    nursingSidebarCategory?.map(category => {
                        const isActive = pathname === `/dashboard/nursing-assessments/${category?.slug}`
                        return (
                            <Link
                                key={category?.id}
                                href={`/dashboard/nursing-assessments/${category?.slug}`}
                                onClick={() => { if(onClose) onClose(); }}
                                className={`flex items-center gap-2 py-2.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 ${isActive
                                    ? "bg-primary text-white [&_svg_path]:fill-current"
                                    : "bg-gray-100 hover:bg-gray-200 text-[#424242]"
                                    }`}
                            >
                                <span className="shrink-0">{category?.icon}</span>
                                {category?.category}
                            </Link>
                        )
                    })
                }
            </div>
        </aside>
    );
};
export default NursingAssessmentsSidebar;