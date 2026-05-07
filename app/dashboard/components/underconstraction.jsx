"use client";

import {
    Construction,
    Hammer,
    Wrench,
    Clock3,
    ArrowLeft,
    Cog,
} from "lucide-react";
import Link from "next/link";

const UnderConstraction = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#eef5fb] via-white to-[#d7e7f4] flex items-center justify-center px-4">

            {/* Animated Background Blur */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-[#2c5f8d]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#2c5f8d]/10 rounded-full blur-3xl animate-pulse delay-300" />

            {/* Floating Shapes */}
            <div className="absolute top-20 right-[15%] animate-bounce">
                <Cog
                    size={50}
                    className="text-[#2c5f8d]/20 animate-spin"
                    style={{ animationDuration: "8s" }}
                />
            </div>

            <div className="absolute bottom-20 left-[10%] animate-bounce delay-200">
                <Construction
                    size={50}
                    className="text-[#2c5f8d]/20"
                />
            </div>

            <div className="absolute top-[40%] left-[5%] animate-pulse">
                <Hammer
                    size={50}
                    className="text-[#2c5f8d]/20 rotate-12"
                />
            </div>

            {/* Main Card */}
            <div className="relative z-10 max-w-3xl w-full text-center">

                {/* Main Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative animate-bounce">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-[#2c5f8d]/20 blur-2xl rounded-full scale-125" />

                        <div className="relative w-32 h-32 rounded-full bg-[#2c5f8d]/10 flex items-center justify-center border border-[#2c5f8d]/20 shadow-xl">
                            <Construction
                                size={60}
                                className="text-[#2c5f8d]"
                            />
                        </div>

                        {/* Small Floating Badge */}
                        <div className="absolute -bottom-2 -right-2 w-14 h-14 rounded-full bg-[#2c5f8d] flex items-center justify-center shadow-lg animate-pulse">
                            <Hammer size={24} className="text-white" />
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-extrabold text-[#2c5f8d] mb-5 tracking-tight">
                    Under Construction
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                    We’re building something modern and amazing for you.
                    This page is currently being upgraded with powerful
                    features and a better experience.
                </p>

                {/* Divider */}
                <div className="w-28 h-1 bg-[#2c5f8d] mx-auto rounded-full mt-8 mb-10 animate-pulse" />

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Card 1 */}
                    <div className="group bg-white rounded-3xl p-6 border border-[#2c5f8d]/10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2c5f8d]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                            <Wrench
                                className="text-[#2c5f8d]"
                                size={30}
                            />
                        </div>

                        <h3 className="text-lg font-bold text-[#2c5f8d] mb-2">
                            Improvements
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            Enhancing performance, UI design, and user
                            experience.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="group bg-white rounded-3xl p-6 border border-[#2c5f8d]/10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2c5f8d]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                            <Clock3
                                className="text-[#2c5f8d]"
                                size={30}
                            />
                        </div>

                        <h3 className="text-lg font-bold text-[#2c5f8d] mb-2">
                            Launching Soon
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            The updated version will be available very soon.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="group bg-white rounded-3xl p-6 border border-[#2c5f8d]/10 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2c5f8d]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                            <Cog
                                className="text-[#2c5f8d] animate-spin"
                                style={{ animationDuration: "5s" }}
                                size={30}
                            />
                        </div>

                        <h3 className="text-lg font-bold text-[#2c5f8d] mb-2">
                            Development
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            Carefully crafting a faster and smarter platform.
                        </p>
                    </div>
                </div>

                {/* Button */}
                <div className="mt-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-[#2c5f8d] hover:bg-[#244d72] text-white px-7 py-3.5 rounded-2xl font-semibold shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UnderConstraction;