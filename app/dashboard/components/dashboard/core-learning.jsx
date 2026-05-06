"use client";
import CommonDashboardTitle from "@/components/common-dashboar-title";
import { coreLearning } from "@/dummydata";
import Link from "next/link";

const CoreLearning = () => {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <CommonDashboardTitle title="Core Learning" />

                <Link href="/dashboard" className="text-[#2C5F8D] text-base font-medium hover:underline cursor-pointer">
                    view all
                </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {coreLearning.map((item, index) => {
                    // const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-5 hover:shadow-md transition"
                        >
                            {/* Top */}
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.bg}`}
                                >
                                    <div className={`w-5 h-5 ${item.color}`}>
                                        {item?.icon}
                                    </div>
                                </div>

                                <h3 className="font-semibold text-lg text-[#424242]">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Bottom pill */}
                            <Link
                                href="/dashboard"
                                className={`inline-block w-full text-center text-[#12283B] py-2 rounded-full text-sm font-medium border border-gray-300 hover:bg-primary transition-all duration-300 hover:text-white`}
                            >
                                {item.count}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CoreLearning;