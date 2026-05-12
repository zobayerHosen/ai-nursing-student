"use client";

import Image from "next/image";
import Link from "next/link";

import { BsInstagram, BsLayoutSidebarReverse } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { TbBrandTiktok } from "react-icons/tb";

// Social Icons Data
const socialIcons = [
    {
        id: 1,
        icon: BsInstagram,
        color: "text-pink-500",
    },
    {
        id: 2,
        icon: TbBrandTiktok,
        color: "text-black",
    },
    {
        id: 3,
        icon: FaFacebookF,
        color: "text-blue-600",
    },
    {
        id: 4,
        icon: GoBellFill,
        color: "text-gray-600",
        notification: true,
    },
];

const userImage = "https://i.pravatar.cc/300";

export default function DashboardHeader({
    collapsed,
    setCollapsed,
    setIsSidebarOpen
}) {

    // Sidebar Toggle
    const handleSidebarToggle = () => {
        // Mobile
        if (window.innerWidth < 640) {
            setIsSidebarOpen(true);
        }

        // Desktop
        else {
            setCollapsed(!collapsed);
        }
    };

    // Note: UI
    return (
        <div className="sticky top-0 z-50 flex items-center justify-between px-3 lg:px-4.5 py-3 md:py-5 bg-white border-b-2 border-[#e6e8ec]">

            {/* Left */}
            <div className="flex items-center lg:gap-2">

                {/* Sidebar Toggle Button */}
                <button
                    onClick={handleSidebarToggle}
                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
                >
                    <BsLayoutSidebarReverse className="md:text-xl text-lg" />
                </button>

                <h1 className="md:text-xl lg:text-2xl font-semibold text-[#222427]">
                    Welcome, Zubu!
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2.5 lg:gap-4">

                {/* Social Icons */}
                <div className="hidden sm:flex items-center gap-2 lg:gap-3">
                    {socialIcons.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="relative w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100 shrink-0"
                            >
                                <Icon className={`text-base md:text-lg shrink-0 ${item.color}`} />

                                {/* Notification Dot */}
                                {item.notification && (
                                    <span className="hidden lg:block absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Profile */}
                <Link href={"/dashboard/settings"} className="shrink-0">
                    <Image
                        src={userImage}
                        alt="user"
                        width={150}
                        height={150}
                        className="cursor-pointer w-8 h-8 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
                    />
                </Link>
            </div>
        </div>
    );
}