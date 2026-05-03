"use client";

import Image from "next/image";
import Link from "next/link";
import { BsLayoutSidebarReverse } from "react-icons/bs";
const userImage = "https://i.pravatar.cc/300";
export default function DashboardHeader({ collapsed, setCollapsed }) {

    return (
        <div className="sticky top-0 z-50 flex items-center justify-between px-4.5 py-5 bg-white border-b-2 border-[#e6e8ec]">
            {/* Left */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="cursor-pointer p-2 rounded-md hover:bg-gray-100"
                >
                    <BsLayoutSidebarReverse size={22} />
                </button>

                <h1 className="text-2xl font-semibold text-[#222427]">
                    Welcome, Zubu!
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="What do you want to work on today..."
                    className="hidden md:block w-[288px] px-4 py-2.5 border rounded-full text-sm border-[#6D6D6D] outline-0"
                />

                {/* Notifications button */}
                <div>
                    <div className="cursor-pointer w-10 h-10 bg-gray-300 rounded-full ring-2 ring-[#8B8F96] shrink-0" />
                </div>

                {/* It should be a profile picture */}
                <Link href={"/dashboard/settings"}>
                    <Image
                        src={userImage}
                        alt="user"
                        width={100}
                        height={100}
                        className="cursor-pointer w-10 h-10 rounded-full"
                    />
                </Link>
            </div>
        </div>
    );
}