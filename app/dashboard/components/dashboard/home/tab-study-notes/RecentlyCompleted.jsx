// components/dashboard-tabs/RecentlyCompleted.jsx

import Link from "next/link";
import RecentlyCompletedCard from "./RecentlyCompletedCard";

const completedTopic = [
    {
        title: "Raynaud's Disease — Cold-Triggered Digital Ischemia",
        category: "Cardiovascular",
        department: "Medical-Surgical Nursing",
        completedAt: "2 hours ago",
    },
    {
        title: "Heart Failure — Left vs Right Sided Manifestations",
        category: "Cardiovascular",
        department: "Medical-Surgical Nursing",
        completedAt: "Yesterday",
    },
    {
        title: "Beta Blockers — Mechanism & Nursing Considerations",
        category: "Cardiac Medications",
        department: "Pharmacology",
        completedAt: "Yesterday",
    },
    {
        title: "Postpartum Hemorrhage — Recognition & Priority Actions",
        category: "Postpartum Care",
        department: "Maternal-Newborn Nursing",
        completedAt: "2 days ago",
    },
    {
        title: "Therapeutic Communication Techniques",
        category: "Anxiety Disorders",
        department: "Mental Health Nursing",
        completedAt: "3 days ago",
    },
];

const RecentlyCompleted = () => {
    return (
        <section className="mt-20">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-2xl text-[#233043]">
                        Recently completed
                    </h2>

                    <p className="mt-2 text-[#7D8794]">
                        Your last 5 self-marked topics
                    </p>
                </div>

                <Link
                    href="#"
                    className="text-[#233043] text-md font-medium hover:underline"
                >
                    View full history →
                </Link>
            </div>

            {/* List */}
            <div className="">
                {completedTopic.map((item) => (
                    <RecentlyCompletedCard
                        key={item.title}
                        {...item}
                    />
                ))}
            </div>
        </section>
    );
};

export default RecentlyCompleted;