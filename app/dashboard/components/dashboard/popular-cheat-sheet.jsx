"use client";

import { cheatSheetData } from "@/dummydata";
import Image from "next/image";
import Link from "next/link";

const PopularCheatSheet = () => {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Most Popular Cheat Sheets
                </h2>

                <Link href="/dashboard" className="text-[#2C5F8D] text-base font-medium hover:underline cursor-pointer">
                    view all
                </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {cheatSheetData?.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl overflow-hidden hover:shadow-md transition"
                    >
                        {/* Image */}
                        <div className="relative w-full h-40">
                            <Image
                                src={item?.img}
                                alt={item.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-800 mb-1">
                                {item?.title}
                            </h3>

                            <p className="text-sm text-gray-500 mb-3">
                                {item?.category}
                            </p>

                            {/* Badge */}
                            {item?.popular && (
                                <span className="inline-block text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                                    Popular
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCheatSheet;