import Link from "next/link";
import TopicProgressCard from "./TopicProgressCard";

import {
  Heart,
  Stethoscope,
  Baby,
  Shield,
  Pill,
  Brain,
  Smile,
  FlaskConical,
} from "lucide-react";

const topics = [
  {
    title: "Cardiovascular",
    icon: Heart,
    completed: 8,
    total: 12,
    color: "#FF5E96",
    iconBg: "#FFE5EF",
  },
  {
    title: "Respiratory",
    icon: Stethoscope,
    completed: 5,
    total: 10,
    color: "#12BCE3",
    iconBg: "#DDF7FB",
  },
  {
    title: "Maternal-Newborn",
    icon: Baby,
    completed: 3,
    total: 7,
    color: "#FF5E96",
    iconBg: "#FFE5EF",
  },
  {
    title: "Fundamentals",
    icon: Shield,
    completed: 3,
    total: 8,
    color: "#3B82F6",
    iconBg: "#E6F0FF",
  },
  {
    title: "Pharmacology",
    icon: Pill,
    completed: 3,
    total: 10,
    color: "#F59E0B",
    iconBg: "#FEF3C7",
  },
  {
    title: "Neurological",
    icon: Brain,
    completed: 2,
    total: 8,
    color: "#8B5CF6",
    iconBg: "#F3E8FF",
  },
  {
    title: "Mental Health",
    icon: Smile,
    completed: 1,
    total: 5,
    color: "#8B5CF6",
    iconBg: "#F3E8FF",
  },
  {
    title: "Medical-Surgical",
    icon: FlaskConical,
    completed: 3,
    total: 12,
    color: "#10B981",
    iconBg: "#DCFCE7",
  },
];

export default function TopicProgress() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-medium">
          By topic
        </h2>

        <Link href="#" className="text-[#233043] hover:text-[#111827] font-medium">
          All topics →
        </Link>
      </div>

      <div className="space-y-8">
        {topics.map((item) => (
          <TopicProgressCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}