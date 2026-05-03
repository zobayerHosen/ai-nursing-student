import { rootsData } from "@/data";
import Image from "next/image";

const RootsSection = () => {
    return (
        <section className="bg-blue-50 py-20">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
                    <div>
                        <span className="text-xs bg-transparent px-3 py-1.5 rounded-full border border-[#7294B3] text-[#677489] font-medium">
                            THE STEMRN METHOD
                        </span>

                        <h2 className="text-3xl md:text-4xl font-bold text-[#285680] mt-4">
                            4 Roots of Success
                        </h2>

                        <p className="text-[#6D6D6D] mt-3 max-w-xl text-lg font-normal">
                            Our framework isn't about memorization — it's about building the
                            clinical reasoning NCLEX demands from day one of your career.
                        </p>
                    </div>

                    {/* Badge */}
                    <div className="bg-primary text-white px-2 py-1 rounded-full flex items-center gap-3 w-fit">
                        <div className="bg-white w-12.5 h-12.5 p-2 rounded-full shrink-0">
                            <Image
                                src="/assets/mini_logo.png"
                                alt="Roots Badge"
                                width={250}
                                height={150}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <p className="font-semibold text-lg">
                                Root Knowledge. Real Results.
                            </p>
                            <p className="text-sm">The STEMRN promise</p>
                        </div>
                    </div>

                </div>

                {/* Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rootsData?.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full mb-4">
                                {item?.icon ?? "N/A"}
                            </div>

                            <h3 className="font-semibold text-lg text-blue-900">
                                {item?.title ?? "N/A"}
                            </h3>

                            <p className="text-sm text-gray-600 mt-2">
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