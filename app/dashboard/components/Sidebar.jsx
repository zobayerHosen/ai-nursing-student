"use client";

import Image from "next/image";
import Link from "next/link";
import {
    BsGear,
    BsHeadset,
    BsDownload,
} from "react-icons/bs";

import logo from "@/public/assets/dash_logo.png";
import min_logo from "@/public/assets/mini_logo.png";

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
                    {collapsed ? (
                        <div>
                            <Image
                                src={min_logo}
                                alt="logo"
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <div className="w-35 h-7.5">
                            <Image
                                src={logo}
                                alt="logo"
                                className="w-fit h-full object-contain"
                            />
                        </div>
                    )}
                </Link>
            </div>

            {/* Scrollable Menu */}
            <div className="flex-1 overflow-y-auto p-3 space-y-6">

                {sidebarData.map((section, i) => {

                    return (
                        <div key={i}>

                            {/* Section Title */}
                            {!collapsed && (
                                <p className="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-3 px-1">
                                    {section.title}
                                </p>
                            )}

                            {/* INTERACTIVE AI TOOLS DESIGN */}
                            <div
                                className={
                                    section.title === "INTERACTIVE TOOLS"
                                        ? "grid grid-cols-2 gap-3"
                                        : "space-y-1"
                                }
                            >
                                {section.items.map((item, index) => {
                                    const isActive =
                                        pathname === item.href ||
                                        (item.href !== "/dashboard" &&
                                            pathname.startsWith(item.href + "/"));

                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={
                                                section.title === "INTERACTIVE TOOLS"
                                                    ? `flex flex-col items-center justify-center text-center h-23 rounded-2xl border border-[#E5E7EB] hover:border-[#2C5F8D] hover:shadow-sm transition-all duration-200 px-2 ${isActive ? "border-gray-500 text-primary bg-[#f8f4f9]" : ""}`
                                                    : `flex items-center gap-3 p-3 transition-all duration-200 ${isActive
                                                        ? "bg-[rgba(44,95,141,0.05)] text-primary border-r-2 border-primary"
                                                        : "hover:bg-gray-100 text-[#424242]"
                                                    }`
                                            }
                                        >
                                            {/* Icon */}
                                            <div
                                                className={
                                                    section.title === "INTERACTIVE TOOLS"
                                                        ? " [&_svg]:text-[#7B7B7B] mb-2 font-semibold"
                                                        : isActive
                                                            ? "text-primary [&_svg]:text-primary"
                                                            : "text-[#2C5F8D] [&_svg]:text-[#2C5F8D]"
                                                }
                                            >
                                                {item.icon}
                                            </div>

                                            {/* Text */}
                                            {!collapsed && (
                                                <span
                                                    className={
                                                        section.title === "INTERACTIVE TOOLS"
                                                            ? "text-[11px] leading-4 font-medium text-[#555555]"
                                                            : "text-sm font-medium"
                                                    }
                                                >
                                                    {item.name}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Section */}
            <div className="p-3 border-t border-[#DFE1E7] space-y-3">
                {/* Settings */}
                <Link
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                    <BsGear size={20} />

                    {!collapsed && (
                        <span className="text-sm font-medium">
                            Settings
                        </span>
                    )}
                </Link>

                {/* Help */}
                <Link
                    href="#"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                >
                    <BsHeadset size={20} />

                    {!collapsed && (
                        <span className="text-sm font-medium">
                            Help & Center
                        </span>
                    )}
                </Link>

                {/* Download Card */}
                {!collapsed && (
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 text-center mt-4 shadow-sm">
                        <p className="text-xs text-gray-500 mb-4 leading-5">
                            Download our mobile app and stay updated anytime
                        </p>

                        <button className="cursor-pointer flex items-center justify-center gap-2 w-full bg-[#2C5F8D] text-white py-3 px-5 rounded-full text-sm font-medium hover:opacity-90 transition">
                            <BsDownload />
                            Download App
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}