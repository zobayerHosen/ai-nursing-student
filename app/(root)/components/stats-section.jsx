const statsData = [
    {
        value: "98%",
        label: "First-Attempt Pass Rate",
    },
    {
        value: "12K+",
        label: "Active Students",
    },
    {
        value: "5K+",
        label: "NGN Questions",
    },
    {
        value: "24/7",
        label: "CARA AI Tutor",
    },
];

const StatsSection = () => {
    return (
        <section className="bg-white py-8 sm:py-10 md:py-14 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">

                    {statsData?.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center px-4 py-2 text-center
                                ${index !== 0 ? "border-l border-gray-300" : ""}
                                ${index === 2 ? "md:border-l" : ""}`
                            }
                        >
                            {/* Value */}
                            <h2 className="text-2xl font-bold text-blue-900 sm:text-3xl md:text-4xl xl:text-5xl">
                                {item.value}
                            </h2>

                            {/* Label */}
                            <p className="mt-2 max-w-40 text-xs text-gray-60 sm:text-sm md:text-base">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default StatsSection;