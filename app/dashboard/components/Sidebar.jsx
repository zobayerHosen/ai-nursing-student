"use client";

import Image from "next/image";
import Link from "next/link";
import {
    BsGear,
    BsHeadset,
    BsDownload,
} from "react-icons/bs";

import logo from "@/public/assets/dash_logo.png"
import min_logo from "@/public/assets/mini_logo.png"
import { usePathname } from "next/navigation";
import { sidebarData } from "@/dummydata";

export default function Sidebar({ collapsed }) {
    const pathname = usePathname();
    return (
        <div
            className={`fixed top-0 left-0 h-full bg-[#F6F8FA] border-r border-[#DFE1E7] transition-all duration-300 flex flex-col
      ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Logo */}
            <div className={`py-6.5 px-4.5 ${collapsed ? "p-0" : ""}`}>
                <Link href="/">
                    {collapsed ?
                        <div className="">
                            <Image
                                src={min_logo}
                                alt="logo"
                                className="object-contain"
                            />
                        </div> :
                        <div className="w-35 h-7.5">
                            <Image
                                src={logo}
                                alt="logo"
                                className="w-fit h-full object-contain"
                            />
                        </div>
                    }
                </Link>
            </div>

            {/* Scrollable Menu */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {sidebarData.map((section, i) => {
                    return (

                        <div key={i}>
                            {!collapsed && (
                                <p className="text-xs text-[#555555] font-semibold px-3 mb-2 uppercase">
                                    {section.title}
                                </p>
                            )}

                            <div className="space-y-1">
                                {section.items.map((item, index) => {
                                    const Icon = item.icon;

                                    const isActive =
                                        pathname === item.href ||
                                        (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"));

                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200
                                                ${isActive
                                                    ? "bg-primary text-white"
                                                    : "hover:bg-gray-100 text-[#424242]"
                                                }`}
                                        >
                                            {/* Icon */}
                                            <Icon
                                                size={20}
                                                className={isActive ? "text-white" : "text-[#2C5F8D]"}
                                            />

                                            {/* Text */}
                                            {!collapsed && (
                                                <span className="text-sm font-medium">
                                                    {item.name}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Bottom Section */}
            <div className="p-3 border-t border-[#DFE1E7] space-y-3">
                {/* Settings & Help */}
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <BsGear size={20} />
                    {!collapsed && <span className="text-sm">Settings</span>}
                </Link>

                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <BsHeadset size={20} />
                    {!collapsed && <span className="text-sm">Help & Center</span>}
                </Link>

                {/* Download App Card */}
                {!collapsed && (
                    <div className="bg-gray-50 rounded-xl p-4 text-center mt-4">
                        <p className="text-xs text-gray-500 mb-3">
                            Download our mobile app and be up to date
                        </p>

                        <button className="cursor-pointer flex items-center justify-center gap-2 w-full bg-primary text-white py-3 px-5 rounded-full text-sm font-medium">
                            <BsDownload />
                            Download App
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}