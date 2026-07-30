"use client";

import { useGetUser, useUserGetNotifications } from "@/hooks";
import Image from "next/image";
import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import { BsInstagram, BsLayoutSidebarReverse, BsThreeDotsVertical } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { TbBrandTiktok } from "react-icons/tb";
import NotificationPanel from "./NotificationPanel";
import { settingsIcon } from "@/dummydata";

// Social Icons Data
const socialIcons = [
    // {
    //     id: 1,
    //     icon: BsInstagram,
    //     color: "text-pink-500",
    // },
    // {
    //     id: 2,
    //     icon: TbBrandTiktok,
    //     color: "text-black",
    // },
    // {
    //     id: 3,
    //     icon: FaFacebookF,
    //     color: "text-blue-600",
    // },
    {
        id: 4,
        icon: GoBellFill,
        color: "text-gray-600",
        notification: true,
    },
];

export default function DashboardHeader({
    collapsed,
    setCollapsed,
    setIsSidebarOpen
}) {
    const { user } = useGetUser();
    const { unreadCount } = useUserGetNotifications();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const dropdownRef = useRef(null);

    const userImage = user?.profile_photo ?? "/dummyProfile.jpg";

    // Sidebar Toggle
    const handleSidebarToggle = () => {
        // Mobile
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(true);
        }

        // Desktop
        else {
            setCollapsed(!collapsed);
        }
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Note: UI
    return (
        <div className="sticky top-0 z-200 flex items-center justify-between px-3 lg:px-4.5 py-3 md:py-5 bg-white border-b-2 border-[#e6e8ec]">

            {/* Left */}
            <div className="flex items-center lg:gap-2">

                {/* Sidebar Toggle Button */}
                <button
                    onClick={handleSidebarToggle}
                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
                >
                    <BsLayoutSidebarReverse className="md:text-xl text-lg" />
                </button>

                <h1 className="md:text-xl lg:text-2xl font-semibold text-[#222427] capitalize">
                    Welcome, {user?.full_name?.split(" ")[0]}
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2.5 lg:gap-4">

                {/* Social Icons (Desktop) */}
                <div className="hidden md:flex items-center gap-2 lg:gap-3">
                    {socialIcons.map((item) => {
                        const Icon = item.icon;

                        if (item.notification) {
                            return (
                                <div key={item.id} className="relative">
                                    <button
                                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                        className="relative w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 shrink-0 cursor-pointer transition-colors"
                                        aria-label="Notifications"
                                    >
                                        <Icon className={`text-base md:text-lg shrink-0 ${item.color}`} />

                                        {/* Notification Badge */}
                                        {unreadCount > 0 && (
                                            <span className="hidden lg:flex absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold items-center justify-center rounded-full leading-none">
                                                {unreadCount > 9 ? "9+" : unreadCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={item.id}
                                className="relative w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100 shrink-0"
                            >
                                <Icon className={`text-base md:text-lg shrink-0 ${item.color}`} />
                            </div>
                        );
                    })}
                </div>

                {/* Social Icons (Mobile Dropdown) */}
                <div className="md:hidden relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                        <BsThreeDotsVertical className="text-base text-gray-600" />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 p-2 bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col gap-2 min-w-30 animate-in fade-in zoom-in duration-200">
                            {socialIcons.map((item) => {
                                const Icon = item.icon;

                                if (item.notification) {
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setIsNotificationOpen(true);
                                            }}
                                        >
                                            <div className="relative w-8 h-8 flex items-center justify-center rounded-full border border-gray-200">
                                                <Icon className={`text-base ${item.color}`} />
                                                {unreadCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full leading-none">
                                                        {unreadCount > 9 ? "9+" : unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 capitalize">
                                                Notifications
                                            </span>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200">
                                            <Icon className={`text-base ${item.color}`} />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 capitalize">
                                            {item.icon.name.replace(/^(Bs|Fa|Go|Tb)/, '').replace(/Fill|F$/, '')}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <Link
                    href={"/dashboard/settings"}
                     className="relative w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 shrink-0 cursor-pointer transition-colors"
                    aria-label="Settings"
                >
                    {settingsIcon}
                </Link>

                {/* Profile */}
                <Link href={"/dashboard/settings"} className="shrink-0 ring-1 rounded-full ring-gray-300">
                    <Image
                        src={userImage}
                        alt="user"
                        width={150}
                        height={150}
                        className="cursor-pointer w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
                    />
                </Link>

                {/* Notification Panel - rendered at header level for all screen sizes */}
                <div className="relative">
                    <NotificationPanel
                        isOpen={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                    />
                </div>
            </div>
        </div>
    );
}