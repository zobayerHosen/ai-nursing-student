"use client";

import Image from "next/image";
import Link from "next/link";
import { BsInstagram, BsLayoutSidebarReverse } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GoBellFill } from "react-icons/go";
import { TbBrandTiktok } from "react-icons/tb";
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

                {/* <input
                    type="text"
                    placeholder="What do you want to work on today..."
                    className="hidden md:block w-[288px] px-4 py-2.5 border rounded-full text-sm border-[#6D6D6D] outline-0"
                /> */}

                {/* Social Icons */}
                <div className="flex items-center gap-3">

                    {/* Instagram */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100">
                        <BsInstagram size={18} className="text-pink-500" />
                    </div>

                    {/* TikTok (alternative) */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100">
                        <TbBrandTiktok size={18} className="text-black" />
                    </div>

                    {/* Facebook */}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100">
                        <FaFacebookF size={18} className="text-blue-600" />
                    </div>

                    {/* Notification */}
                    <div className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100">
                        <GoBellFill size={18} className="text-gray-600" />

                        {/* Red dot */}
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    </div>

                </div>

                {/* Profile */}
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