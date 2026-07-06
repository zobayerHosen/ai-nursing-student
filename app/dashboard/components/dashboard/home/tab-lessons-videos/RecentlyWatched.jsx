import Link from "next/link";
import RecentlyWatchedCard from "./RecentlyWatchedCard";

import {
  Heart,
  Pill,
  Brain,
  Stethoscope,
  Baby,
} from "lucide-react";

const watched = [
  {
    title: "Hypertension Management",
    category: "Cardiovascular",
    watched: "2 hours ago",
    duration: "18:20",
    status: "Completed",
    icon: Heart,
    color: "#FF5E96",
    iconBg: "#FFE5EF",
  },
  {
    title: "Anticoagulants & Reversal",
    category: "Pharmacology",
    watched: "Yesterday",
    duration: "18:40",
    status: "18% watched",
    icon: Pill,
    color: "#F59E0B",
    iconBg: "#FEF3C7",
  },
  {
    title: "Heart Anatomy & The Flow",
    category: "Cardiovascular",
    watched: "Yesterday",
    duration: "12:30",
    status: "Completed",
    icon: Heart,
    color: "#FF5E96",
    iconBg: "#FFE5EF",
  },
  {
    title: "Stroke Assessment",
    category: "Neurological",
    watched: "2 days ago",
    duration: "15:20",
    status: "12% watched",
    icon: Brain,
    color: "#8B5CF6",
    iconBg: "#F3E8FF",
  },
  {
    title: "COPD Acute Exacerbation",
    category: "Respiratory",
    watched: "3 days ago",
    duration: "16:10",
    status: "Completed",
    icon: Stethoscope,
    color: "#12BCE3",
    iconBg: "#DDF7FB",
  },
  {
    title: "Postpartum Hemorrhage",
    category: "Maternal-Newborn",
    watched: "4 days ago",
    duration: "14:50",
    status: "Completed",
    icon: Baby,
    color: "#FF5E96",
    iconBg: "#FFE5EF",
  },
];

export default function RecentlyWatched() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-medium">
          Recently watched
        </h2>

        <Link href="#" className="text-[#233043] hover:text-[#111827] font-medium">
          View history →
        </Link>
      </div>

      {/* header */}
      <div className="grid grid-cols-[1fr_90px_60px_100px] text-xs uppercase text-[#9CA3AF] mb-4 px-14">
        <div>Lesson</div>
        <div>Watched</div>
        <div>Duration</div>
        <div>Status</div>
      </div>

      <div>
        {watched.map((item) => (
          <RecentlyWatchedCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}