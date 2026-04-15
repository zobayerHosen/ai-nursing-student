import CommonDashboardTitle from "@/components/common-dashboar-title";
import {
    BsPlayCircle,
    BsFileEarmarkText,
    BsClipboardCheck,
    BsMic,
    BsCardChecklist,
    BsBook,
} from "react-icons/bs";

const actions = [
    {
        title: "Start Tutor Session",
        desc: "Tutor session with CARA",
        icon: BsPlayCircle,
        bg: "bg-blue-100",
        color: "text-blue-600",
    },
    {
        title: "Notes to Quiz",
        desc: "Convert notes into practice questions",
        icon: BsClipboardCheck,
        bg: "bg-purple-100",
        color: "text-purple-600",
    },
    {
        title: "Practice Exams",
        desc: "Practice over 5000 NCLEX questions",
        icon: BsFileEarmarkText,
        bg: "bg-green-100",
        color: "text-green-600",
    },
    {
        title: "Record a Lecture",
        desc: "Transform lectures to notes",
        icon: BsMic,
        bg: "bg-orange-100",
        color: "text-orange-600",
    },
    {
        title: "Notes to Flashcards",
        desc: "Paste notes, get flashcards instantly",
        icon: BsCardChecklist,
        bg: "bg-blue-100",
        color: "text-blue-600",
    },
    {
        title: "Study Flashcards",
        desc: "Study over 4000 flashcards",
        icon: BsBook,
        bg: "bg-red-100",
        color: "text-red-500",
    },
];

const QuickActions = () => {
    return (
        <div className="w-full flex flex-col gap-4">
            {/* Title */}
            <CommonDashboardTitle title="Quick Actions" />

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {actions.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-5 bg-white rounded-xl border border-[#DFE1E7] hover:shadow-md transition cursor-pointer"
                        >
                            {/* Icon */}
                            <div
                                className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.bg}`}
                            >
                                <Icon className={`text-xl ${item.color}`} />
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