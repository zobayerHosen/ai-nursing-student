"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/public/assets/dash_logo.png";
import min_logo from "@/public/assets/mini_logo.png";

import { usePathname } from "next/navigation";
import { sidebarData } from "@/dummydata";
import { IoClose } from "react-icons/io5";
import { ArrowBigDownDash, LogOut } from "lucide-react";
import { useState } from "react";
import { Modal } from "antd";

export default function Sidebar({ collapsed, isSidebarOpen, setIsSidebarOpen, }) {
    const pathname = usePathname();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <>
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-60 lg:hidden"
                />
            )}

            <div
                className={`fixed top-0 left-0 h-full bg-[#F6F8FA] border-r border-[#DFE1E7] transition-all duration-300 flex flex-col z-70 ${isSidebarOpen
                    ? "w-70 translate-x-0"
                    : "-translate-x-full lg:translate-x-0 " + (collapsed ? "lg:w-16" : "lg:w-64")
                    }`}
            >
                {/* Logo & Close Button */}
                <div className={`py-6.5 px-4.5 flex items-center justify-between ${collapsed && !isSidebarOpen ? "lg:p-0 lg:justify-center" : ""}`}>
                    <Link href="/dashboard">
                        {collapsed && !isSidebarOpen ? (
                            <Image
                                src={min_logo}
                                alt="logo"
                                className="object-contain hidden lg:block lg:p-3"
                            />
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

                    {/* Mobile Close Button */}
                    {isSidebarOpen && (
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="sm:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <IoClose size={24} className="text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Scrollable Menu */}
                <div className={`flex-1 overflow-y-auto custom-scrollbar ${collapsed ? "p-1" : "p-3 pb-0"}`}>

                    {sidebarData?.map((section, i) => {

                        return (
                            <div key={i} className={`pb-4 mb-4 ${i !== sidebarData.length - 1 ? "border-b border-[#DFE1E7]" : ""}`}>

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
                                            ? `grid ${collapsed ? "grid-cols-1 gap-1" : "grid-cols-2 gap-3"}`
                                            : "space-y-1"
                                    }
                                >
                                    {section.items.map((item, index) => {
                                        const isActive =
                                            pathname === item.href ||
                                            (item.href !== "/dashboard" &&
                                                pathname.startsWith(item.href + "/"));

                                        return (
                                            <div key={index}>
                                                {item.button ? (
                                                    <button
                                                        onClick={() => setShowLogoutModal(true)}
                                                        className={
                                                            section.title === "INTERACTIVE TOOLS"
                                                                ? `w-full flex flex-col items-center justify-center text-center border border-[#E5E7EB] hover:border-[#2C5F8D] hover:shadow-sm transition-all duration-200 ${collapsed ? "gap-0 h-10 border-0" : "h-22 px-2 rounded-2xl"}`
                                                                : `cursor-pointer w-full flex items-center p-3 transition-all duration-200 ${collapsed ? "gap-0 h-10 justify-center" : "gap-3"} hover:bg-gray-100 text-[#424242]`
                                                        }
                                                    >
                                                        {/* Icon */}
                                                        <div
                                                            className={`flex items-center justify-center shrink-0 text-[#F43636] [&_svg_path]:fill-current [&_svg]:w-5 [&_svg]:h-5`}
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
                                                    </button>
                                                ) : (
                                                    <Link
                                                        key={index}
                                                        href={item.href}
                                                        onClick={() => setIsSidebarOpen(false)}
                                                        className={
                                                            section.title === "INTERACTIVE TOOLS"
                                                                ? `flex flex-col items-center justify-center text-center border border-[#E5E7EB] hover:border-[#2C5F8D] hover:shadow-sm transition-all duration-200 ${collapsed ? "gap-0 h-10 border-0" : "h-22 px-2 rounded-2xl"} ${isActive ? "bg-[rgba(44,95,141,0.05)] text-primary border-r-2 border-primary" : ""}`
                                                                : `flex items-center p-3 transition-all duration-200 ${collapsed ? "gap-0 h-10 justify-center" : "gap-3"} ${isActive
                                                                    ? "bg-[rgba(44,95,141,0.05)] text-primary border-r-2 border-primary"
                                                                    : "hover:bg-gray-100 text-[#424242]"
                                                                }`
                                                        }
                                                    >
                                                        {/* Icon */}
                                                        <div
                                                            className={`flex items-center justify-center shrink-0 ${section.title === "INTERACTIVE TOOLS"
                                                                ? `${isActive ? "text-primary" : "text-[#7B7B7B]"} [&_svg_path]:fill-current ${collapsed ? "mb-0" : "mb-1"} font-semibold`
                                                                : isActive
                                                                    ? "text-primary [&_svg_path]:fill-current"
                                                                    : "text-[#7B7B7B] [&_svg_path]:fill-current"
                                                                } [&_svg]:w-5 [&_svg]:h-5`}
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
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* download app */}
                {
                    collapsed ? (
                        <Link href="#" className="cursor-pointer w-full text-sm font-medium py-2.5 flex items-center justify-center px-1">
                            <ArrowBigDownDash />
                        </Link>
                    ) :
                        (
                            <div className="bg-white border-t border-[#E5E7EB] rounded-t-2xl p-4 text-center shadow-sm">
                                <p className="text-xs text-gray-500 mb-4 leading-5">
                                    Download our mobile app and stay updated anytime
                                </p>

                                <Link href="#" className="cursor-pointer flex items-center justify-center gap-2 w-full bg-[#2C5F8D] text-white py-3 px-5 rounded-full text-sm font-medium hover:opacity-90 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58473 0 0 3.58473 0 8C0 12.4153 3.58473 16 8 16C12.4153 16 16 12.4153 16 8C16 3.58473 12.4153 0 8 0ZM11.7593 10.5047C11.0095 11.6255 9.60145 12.3636 8 12.3636C6.39855 12.3636 4.99054 11.6255 4.24072 10.5047C4.01818 10.1709 3.56582 10.0815 3.232 10.3047C2.89818 10.5273 2.80873 10.9796 3.032 11.3135C4.02619 12.8 5.87491 13.8182 8 13.8182C10.1251 13.8182 11.9738 12.8 12.968 11.3135C13.1913 10.9796 13.1018 10.5273 12.768 10.3047C12.4342 10.0815 11.9818 10.1709 11.7593 10.5047ZM7.27273 9.45455L5.52728 8.14545C5.20582 7.90473 4.74982 7.96946 4.50909 8.29091C4.26836 8.61236 4.33309 9.06837 4.65454 9.30909L7.56363 11.4909C7.82254 11.6851 8.17746 11.6851 8.43637 11.4909L11.3455 9.30909C11.6669 9.06837 11.7316 8.61236 11.4909 8.29091C11.2502 7.96946 10.7942 7.90473 10.4727 8.14545L8.72727 9.45455V2.90909C8.72727 2.50764 8.40145 2.18182 8 2.18182C7.59855 2.18182 7.27273 2.50764 7.27273 2.90909V9.45455Z" fill="white" />
                                    </svg>
                                    Download App
                                </Link>
                            </div>
                        )
                }
            </div>

            {/* logout modal */}
            <Modal
                open={showLogoutModal}
                onCancel={() => setShowLogoutModal(false)}
                footer={null}
                closeIcon={null}
                centered
                width={420}
            >
                <div className="py-3 flex flex-col items-center text-center">

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-2">
                        <LogOut size={20} className="text-red-500" />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-[#111827] mb-2">
                        Logout
                    </h2>

                    {/* Description */}
                    <p className="text-[13px] text-[#6B7280] leading-5 max-w-75 mb-7">
                        Are you sure you want to logout from your account?
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-3 w-full">
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            className="flex-1 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => {
                                setShowLogoutModal(false);

                                // logout logic
                                console.log("Logout");
                            }}
                            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition text-sm font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};