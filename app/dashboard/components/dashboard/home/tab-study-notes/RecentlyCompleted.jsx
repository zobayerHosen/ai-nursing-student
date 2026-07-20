// components/dashboard-tabs/RecentlyCompleted.jsx

import Link from "next/link";
import RecentlyCompletedCard from "./RecentlyCompletedCard";

const RecentlyCompleted = ({ recentActivity = [] }) => {
    if (!recentActivity || recentActivity.length === 0) return null;

    return (
        <section className="mt-20">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-2xl text-[#233043]">
                        Recently completed
                    </h2>

                    <p className="mt-2 text-[#7D8794]">
                        Your last {recentActivity.length} self-marked topics
                    </p>
                </div>

                <Link
                    href="/dashboard/study-notes"
                    className="text-[#233043] text-md font-medium hover:underline"
                >
                    View full history →
                </Link>
            </div>

            {/* List */}
            <div className="">
                {recentActivity.map((item, index) => (
                    <RecentlyCompletedCard
                        key={item.category_id || index}
                        title={item.title}
                        category={item.subtitle || "Study Note"}
                        department={""}
                        completedAt={item.completed_at || "Recently"}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecentlyCompleted;