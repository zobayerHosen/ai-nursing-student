// components/dashboard-tabs/AllNursingAreas.jsx
import NursingAreaCard from "./NursingAreaCard";
import { nursingAreas } from "./nursingAreas-data";

export default function AllNursingAreas() {
    return (
        <div className="mt-20">
            {/* header */}
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-2xl text-[#223247]">
                    All nursing areas
                </h2>

                {/* · Filter by status */}
                <p className="text-[#7D8794]">
                    Mark a topic complete when you've absorbed it.
                </p>
            </div>

            {/* filter */}
            <div className="flex flex-wrap gap-3 mb-8">
                <button className="bg-[#1E2F44] text-white px-6 py-3 rounded-full">
                    All 11
                </button>

                <button className="bg-[#F1F1F1] px-6 py-3 rounded-full">
                    Complete 2
                </button>

                <button className="bg-[#F1F1F1] px-6 py-3 rounded-full">
                    Not started 5
                </button>
            </div>

            {/* cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {nursingAreas?.map((item) => (
                    <NursingAreaCard
                        key={item.title}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}