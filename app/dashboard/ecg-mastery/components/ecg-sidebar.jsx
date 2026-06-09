"use client";
import Link from "next/link";
import { sidebarCategory } from "./ecg-sidebar-data";
import { usePathname } from "next/navigation";

const EcgSidebar = ({ onClose }) => {
    const pathname = usePathname();

    return (
        <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col">
            {/* header content */}
            <div className="border-b border-black/10 py-4 shrink-0">
                <div className="px-4 flex flex-col gap-4">
                    <h4 className="text-[#424242] font-semibold text-lg">ECG Mastery</h4>
                </div>
            </div>

            {/* category */}
            <div className="w-full p-4 flex flex-col gap-3">
                {
                    sidebarCategory?.map(data => {
                        const isActive = pathname === `/dashboard/ecg-mastery/${data?.slug}`;
                        return (
                            <Link
                                key={data.slug}
                                href={`/dashboard/ecg-mastery/${data?.slug}`}
                                onClick={() => { if(onClose) onClose(); }}
                                className={`flex items-center gap-2 py-2.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 ${
                                    isActive 
                                    ? "bg-primary text-white [&_svg_path]:fill-current [&_svg_circle]:stroke-current" 
                                    : "bg-gray-100 hover:bg-gray-200 text-[#424242]"
                                }`}
                            >
                                <span className="shrink-0">{data?.icon}</span>
                                {data?.category ?? ""}
                            </Link>
                        )
                    })
                }
            </div>
        </aside>
    );
};

export default EcgSidebar;
