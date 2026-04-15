import Image from "next/image";
import { BsHeartPulse, BsLungs, BsActivity, BsPerson } from "react-icons/bs";

const data = [
    {
        title: "Cardiovascular",
        desc: "I know you are busy- let me demo MyCase",
        img: "/assets/dashboard/cardiovascular.png",
        icon: BsHeartPulse,
    },
    {
        title: "Respiratory",
        desc: "Upper and lower airways, lung lobes, gas exchange...",
        img: "/assets/dashboard/respiratory.png",
        icon: BsLungs,
    },
    {
        title: "Gastrointestinal",
        desc: "GI tract anatomy, motility, absorption...",
        img: "/assets/dashboard/gastrointetinal.png",
        icon: BsActivity,
    },
    {
        title: "Female Reproduction",
        desc: "Reproductive anatomy, menstrual cycle...",
        img: "/assets/dashboard/reproduction.png",
        icon: BsPerson,
    },
];

const BodySystem = () => {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Body Systems
                </h2>

                <button className="text-blue-600 text-sm font-medium hover:underline">
                    view all
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {data.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-4 hover:shadow-md transition"
                        >
                            {/* Image */}
                            <div className="bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <div className="h-26.5 py-3">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={120}
                                        height={120}
                                        className="w-30.5 h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="font-semibold text-gray-800 mb-1">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                {item.desc}
                            </p>

                            {/* Bottom */}
                            <div className="flex items-center justify-between">
                                {/* Tag */}
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <span className="w-6 h-6 flex items-center justify-center rounded-full border">
                                        <Icon size={14} />
                                    </span>
                                    Anatomy & Physiology
                                </div>

                                {/* Button */}
                                <button className="cursor-pointer bg-primary text-white text-sm px-4 py-1.5 rounded-full hover:bg-blue-700">
                                    Read
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BodySystem;