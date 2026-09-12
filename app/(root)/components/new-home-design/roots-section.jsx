"use client";
import { rootsData } from "@/data";
import Image from "next/image";

const RootsSection = () => {
    return (
        <section className="bg-[rgba(158,181,203,0.33)] py-12 sm:py-16 md:py-20 xl:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 lg:gap-0 xl:gap-6 lg:mb-14 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left Content */}
                    <div className="max-w-3xl">

                        <span className="inline-flex items-center rounded-full border border-[#7294B3] px-3 py-1.5 text-[10px] font-medium tracking-wide text-[#677489] sm:text-xs">
                            THE STEMRN METHOD
                        </span>

                        <h2 className="mt-4 text-3xl font-semibold text-[#285680] lg:text-4xl">
                            4 Roots of Success
                        </h2>

                        <p className="mt-4 max-w-2xl text-sm md:leading-6 lg:leading-7 text-[#64748B] sm:text-base">
                            Our framework isn&apos;t about memorization — it&apos;s about
                            building the clinical reasoning NCLEX demands from
                            day one of your career.
                        </p>
                    </div>

                    {/* Badge */}
                    <div className=" flex w-full max-w-md items-center gap-2 xl:gap-3 rounded-full bg-primary px-1.5 py-2 text-white sm:w-fit xl:py-3">

                        <div className="flex w-10 h-10 md:h-11 md:w-11 lg:h-10 lg:w-10 xl:h-12 xl:w-12 shrink-0 items-center justify-center rounded-full bg-white p-2 sm:h-14 sm:w-14">
                            <Image
                                src="/assets/mini_logo.png"
                                alt="Roots Badge"
                                width={250}
                                height={150}
                                className="h-full w-full object-contain shrink-0"
                            />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-semibold sm:text-base lg:text-sm xl:text-lg">
                                Root Knowledge. Real Results.
                            </p>

                            <p className=" text-xs text-white/90  lg:text-sm ">
                                The STEMRN promise
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-5 lg:gap-3 xl:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {rootsData?.map((item, index) => (
                        <div
                            key={index}
                            className="rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 lg:p-4.5 xl:p-7"
                        >

                            {/* Icon */}
                            <div className="mb-3 lg:mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white sm:h-11 sm:w-11 lg:h-10 lg:w-10 xl:h-12 xl:w-12">
                                {item.icon}
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