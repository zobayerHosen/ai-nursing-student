import { notesData } from "@/data";
import Image from "next/image";

const VisualNotes = () => {
    return (
        <section className="w-full bg-white py-10 sm:py-14 md:py-16 lg:py-20 xl:py-28">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                {/* Top Badge */}
                <div className="flex justify-center">
                    <span className="rounded-full bg-[#FFE8EA] px-4 py-1.75 text-xs font-bold uppercase tracking-[1.2px] text-[#FF5B77]">
                        Visual Notes
                    </span>
                </div>

                {/* Heading */}
                <div className="mx-auto mt-5 sm:mt-6 md:mt-7 lg:mt-8 max-w-215 text-center px-4 sm:px-6">
                    <h2 className="text-[26px] sm:text-3xl lg:text-[48px] font-bold leading-[1.2] tracking-[-1.5px] text-[#234C7B]">
                        For visual learners —{" "}
                        <span className="text-[#FF5B77]">cartoon notes</span>{" "}
                        that actually stick.
                    </h2>

                    <p className="mx-auto mt-5 sm:mt-6 md:mt-7 lg:mt-8 text-sm md:text-lg leading-[1.6] sm:leading-[1.7] md:leading-[1.8] text-[#707070] max-w-230">
                        Memorable visuals that stick better than text-heavy
                        notes — high-yield NCLEX scenarios, red flags, and
                        side-by-side comparisons in one image.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-9 md:mt-12 xl:mt-21.25 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
                    {notesData.map((item) => (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-[18px] border border-[#D9D9D9] bg-white transition duration-300 hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative h-50 sm:h-55 md:h-60 lg:h-65 w-full">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* bottom Content */}
                            <div className="relative z-10 -mt-0.5 border-t border-[#EAEAEA] bg-white px-4 sm:px-5 pb-4 sm:pb-5 pt-3 sm:pt-4">

                                {/* Top White Gradient Shadow */}
                                <div className="pointer-events-none absolute -top-14 left-0 h-14 w-full bg-linear-to-b from-transparent via-white/80 to-white z-10" />

                                <p className="relative z-20 text-[10px] sm:text-[12px] font-semibold leading-none text-[#FF5F7E]">
                                    {item.category}
                                </p>

                                <h3 className="relative z-20 mt-1.25 sm:1.75 text-base sm:text-[17px] md:text-[18px] font-semibold leading-[1.3] text-[#2D5A8E]">
                                    {item.title}
                                </h3>

                                <p className="relative z-20 mt-1 sm:mt-1.5 text-[12px] sm:text-[13px] leading-normal text-[#7C7C7C]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VisualNotes;