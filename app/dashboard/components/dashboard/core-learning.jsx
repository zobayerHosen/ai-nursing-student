import CommonDashboardTitle from "@/components/common-dashboar-title";
import Link from "next/link";

import {
    BsFileEarmarkText,
    BsPerson,
    BsCalculator,
    BsClipboardData,
    BsActivity,
    BsTools,
    BsHeartPulse,
    BsJournalText,
} from "react-icons/bs";

const data = [
    {
        title: "Study Notes",
        count: "316 Topics",
        icon: BsFileEarmarkText,
        bg: "bg-purple-100",
        color: "text-purple-600",
    },
    {
        title: "Body Systems",
        count: "12 Systems",
        icon: BsPerson,
        bg: "bg-pink-100",
        color: "text-pink-600",
    },
    {
        title: "Dosage Calculation",
        count: "16 Topics",
        icon: BsCalculator,
        bg: "bg-yellow-100",
        color: "text-yellow-600",
    },
    {
        title: "Diagnostic Tests",
        count: "26 Topics",
        icon: BsClipboardData,
        bg: "bg-blue-100",
        color: "text-blue-600",
    },
    {
        title: "ECG Mastery",
        count: "16 Topics",
        icon: BsActivity,
        bg: "bg-red-100",
        color: "text-red-500",
    },
    {
        title: "Practical Skills",
        count: "16 Topics",
        icon: BsTools,
        bg: "bg-green-100",
        color: "text-green-600",
    },
    {
        title: "Nursing Assessments",
        count: "24 Topics",
        icon: BsHeartPulse,
        bg: "bg-cyan-100",
        color: "text-cyan-600",
    },
    {
        title: "Cheat Sheets",
        count: "22 Topics",
        icon: BsJournalText,
        bg: "bg-blue-100",
        color: "text-blue-600",
    },
];

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
                {data.map((item, index) => {
                    const Icon = item.icon;

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
                                    <Icon className={`text-lg ${item.color}`} />
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