"use client";

import Image from "next/image";

const data = [
    {
        title: "Heart Anatomy & Physiology",
        category: "Cardiovascular System",
        img: "/assets/dashboard/cheat_pic01.png",
        popular: true,
    },
    {
        title: "Heart Anatomy & Physiology",
        category: "Cardiovascular System",
        img: "/assets/dashboard/cheat_pic02.png",
        popular: true,
    },
    {
        title: "Heart Anatomy & Physiology",
        category: "Cardiovascular System",
        img: "/assets/dashboard/cheat_pic03.png",
        popular: true,
    },
    {
        title: "Lung Anatomy & Gas Exchange",
        category: "Cardiovascular System",
        img: "/assets/dashboard/cheat_pic04.png",
        popular: true,
    },
];

const PopularCheatSheet = () => {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Most Popular Cheat Sheets
                </h2>

                <button className="text-blue-600 text-sm font-medium hover:underline">
                    view all
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {data?.map((item, index) => (
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