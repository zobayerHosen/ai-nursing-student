"use client";
import CommonDashboardTitle from "@/components/common-dashboar-title";
import { quickActions } from "@/dummydata";
import Image from "next/image";

const QuickActions = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            {/* Title */}
            <CommonDashboardTitle title="Quick Actions" />

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {quickActions.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-5 bg-white rounded-xl border border-[#DFE1E7] hover:shadow-md transition cursor-pointer"
                        >
                            {/* Icon */}
                            <div
                                className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.bg}`}
                            >
                                <Image
                                    src={Icon || ""}
                                    alt={item.title || ""}
                                    width={250}
                                    height={150}
                                    className="size-7 object-contain shrink-0"
                                />
                                {/* <Icon className={`text-xl ${item.color}`} /> */}
                            </div>

                            {/* Text */}
                            <div>
                                <h3 className="font-semibold text-[#0F172A]">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-[#64748B]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickActions;