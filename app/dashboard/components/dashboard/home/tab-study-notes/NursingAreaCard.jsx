// components/dashboard-tabs/NursingAreaCard.jsx
import {
  Activity,
  Shield,
  Baby,
  Pill,
  Brain,
  ClipboardCheck,
  Users,
  Crown,
  Scale,
} from "lucide-react";

const icons = {
  medical: Activity,
  fundamentals: Shield,
  maternal: Baby,
  pharma: Pill,
  mental: Brain,
  assessment: ClipboardCheck,
  community: Users,
  leadership: Crown,
  legal: Scale,
};

const statusColors = {
  complete: {
    text: "#2F5D8A",
    bg: "#DDF2EA",
  },
  progress: {
    text: "#2F5D8A",
    bg: "#EAF0F8",
  },
  notStarted: {
    text: "#B0B7C3",
    bg: "#F4F4F4",
  },
};

export default function NursingAreaCard({
  title,
  icon,
  status,
  progress,
  completed,
  total,
  date,
  iconBg,
}) {
  const Icon = icons[icon];
  const statusStyle = statusColors[status];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-2xl p-4">
      {/* top */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: iconBg }}
          >
            <Icon size={20} className="text-[#2F5D8A]" />
          </div>

          <h3 className="text-[18px] font-medium text-[#223247]">
            {title}
          </h3>
        </div>

        <div
          className="flex items-center gap-2 text-sm uppercase tracking-wide"
          style={{ color: statusStyle.text }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: statusStyle.text }}
          />
          {status === "progress"
            ? "IN PROGRESS"
            : status === "complete"
            ? "COMPLETE"
            : "NOT STARTED"}
        </div>
      </div>

      {/* progress */}
      <div className="h-2 rounded-full bg-[#EFEFEF] overflow-hidden">
        <div
          className="h-full bg-[#2F5D8A] rounded-full"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* footer */}
      <div className="flex justify-between mt-3 text-sm">
        <p className="text-[#5A6778]">
          {completed} of {total} topics{" "}
          <span className="font-semibold">{progress}%</span>
        </p>

        <p className="text-[#B3BAC5]">{date}</p>
      </div>
    </div>
  );
}