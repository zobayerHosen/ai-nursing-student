"use client";

import { useGetUser, useUserGetNotifications } from "@/hooks";
import Image from "next/image";
import Link from "next/link";

import { useState, useRef, useEffect } from "react";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { GoBellFill } from "react-icons/go";
import NotificationPanel from "./NotificationPanel";
import { settingsIcon } from "@/dummydata";

export default function DashboardHeader({
    collapsed,
    setCollapsed,
    setIsSidebarOpen
}) {
    const { user } = useGetUser();
    const { unreadCount = 0 } = useUserGetNotifications();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const notificationRef = useRef(null);

    // Sidebar Toggle
    const handleSidebarToggle = () => {
        // Mobile
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setIsSidebarOpen(true);
        }
        // Desktop
        else {
            setCollapsed(!collapsed);
        }
    };

    const [imageSrc, setImageSrc] = useState(user?.profile_photo || "/dummyProfile.jpg");
    useEffect(() => {
        if (user?.profile_photo) {
            setImageSrc(user.profile_photo);
        } else {
            setImageSrc("/dummyProfile.jpg");
        }
    }, [user?.profile_photo]);

    // Note: UI
    return (
        <div className={`fixed top-0 right-0 z-40 left-0 ${collapsed ? "lg:left-16 dashboard-header-collapsed" : "lg:left-64 dashboard-header-expanded"} flex items-center justify-between px-3 lg:px-4.5 py-3 md:py-4 bg-white border-b-2 border-[#e6e8ec] transition-all duration-300`}>

            {/* Left */}
            <div className="flex items-center gap-2">
                {/* Sidebar Toggle Button */}
                <button
                    onClick={handleSidebarToggle}
                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Toggle Sidebar"
                >
                    <BsLayoutSidebarReverse className="md:text-xl text-lg text-gray-700" />
                </button>

                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#222427] capitalize truncate max-w-37.5 sm:max-w-xs md:max-w-none">
                    Welcome, {user?.full_name ? user.full_name.split(" ")[0] : "User"}
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 shrink-0">

                {/* Notification Bell Icon */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setIsNotificationOpen((prev) => !prev)}
                        className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 shrink-0 cursor-pointer transition-colors"
                        aria-label="Notifications"
                    >
                        <GoBellFill className="text-base sm:text-lg text-gray-600 shrink-0" />

                        {/* Notification Badge */}
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center rounded-full leading-none">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Panel */}
                    <NotificationPanel
                        isOpen={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                    />
                </div>

                {/* Settings Icon */}
                <Link
                    href={"/dashboard/settings"}
                    className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 shrink-0 cursor-pointer transition-colors"
                    aria-label="Settings"
                >
                    {settingsIcon}
                </Link>

                {/* Profile Avatar */}
                <Link href={"/dashboard/settings"} className="shrink-0 ring-1 rounded-full ring-gray-300 overflow-hidden flex items-center justify-center">
                    <Image
                        src={imageSrc || "/dummyProfile.jpg"}
                        alt="User Profile"
                        width={40}
                        height={40}
                        onError={() => setImageSrc("/dummyProfile.jpg")}
                        className="cursor-pointer w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full object-cover"
                    />
                </Link>
            </div>
        </div>
    );
}
