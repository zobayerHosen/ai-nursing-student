"use client";
import { rootsData } from "@/data";
import Image from "next/image";

const RootsSection = () => {
    return (
        <section className="bg-white py-12 sm:py-16 md:py-20 xl:py-24" id="roots">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 lg:gap-0 xl:gap-6 lg:mb-14 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left Content */}
                    <div className="max-w-3xl">

                        <span className="text-[10px] font-semibold tracking-wide text-[#2C5F8D] sm:text-sm">
                            THE STEMRN METHOD
                        </span>

                        <h2 className="mt-2 text-3xl font-semibold text-[#285680] lg:text-4xl">
                            4 Roots <span className="text-[#0F172A]">of Success</span>
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm md:leading-6 lg:leading-7 text-[#64748B] sm:text-base">
                            Our framework isn&apos;t about memorization — it&apos;s about
                            building the clinical reasoning NCLEX demands from
                            day one of your career.
                        </p>
                    </div>

                    {/* Badge */}
                    <div className="flex w-full max-w-md items-center gap-3 xl:gap-4 rounded-xl px-4 py-3 text-white sm:w-fit sm:px-5 sm:py-4 xl:px-6 xl:py-5" style={{ background: "linear-gradient(to right, #c084fc, #e879a0, #ec4899)" }}>

                        <div className="w-8 h-8  shrink-0">
                            <Image
                                src="/assets/root_logo.png"
                                alt="Roots Badge"
                                width={250}
                                height={150}
                                className="h-full w-full object-contain shrink-0"
                            />
                        </div>

                        <p className="text-sm font-medium sm:text-base xl:text-lg leading-snug">
                            Root Knowledge. Real Results. The STEMRN promise.
                        </p>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-5 lg:gap-3 xl:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {rootsData?.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-[#FBFBFB] p-5 transition-all duration-300 hover:-translate-y-1 sm:p-6 lg:p-4.5 xl:p-7 border border-[#E2E8F0]"
                        >

                            {/* Icon */}
                            <div className={`mb-3 lg:mb-4 flex h-11 w-11 items-center justify-center rounded-xl p-2 sm:h-13 sm:w-13 lg:h-12 lg:w-12 xl:h-14 xl:w-14 ${item.bgColor || "bg-primary/10"}`}>
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={40}
                                    height={40}
                                    className="h-7 w-7 object-contain shrink-0"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-semibold text-blue-900 sm:text-xl ">
                                {item?.title ?? "N/A"}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                                {item?.desc ?? "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RootsSection;