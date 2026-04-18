const statsData = [
    {
        value: "94%",
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
        <section className="bg-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-300">
                    {statsData.map((item, index) => (
                        <div key={index} className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
                                {item.value}
                            </h2>
                            <p className="text-sm text-gray-600 mt-2">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;