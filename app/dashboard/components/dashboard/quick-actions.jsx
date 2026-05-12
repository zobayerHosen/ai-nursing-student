import CommonDashboardTitle from "@/components/common-dashboar-title";
import { quickActions } from "@/dummydata";

const QuickActions = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            {/* Title */}
            <CommonDashboardTitle title="Quick Actions" />

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-5">
                {quickActions.map((item, index) => {

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 xl:gap-4 xl:p-5 bg-white rounded-xl border border-[#DFE1E7] hover:shadow-md transition cursor-pointer"
                        >
                            {/* Icon */}
                            <div
                                className={`w-9 h-9 xl:w-12 xl:h-12 flex items-center justify-center rounded-lg shrink-0 ${item.bg}`}
                            >
                                {item?.icon}
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