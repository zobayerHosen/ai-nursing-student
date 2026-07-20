// components/dashboard-tabs/RecentlyCompletedCard.jsx

import { Check } from "lucide-react";

const RecentlyCompletedCard = ({
    title,
    category,
    department,
    completedAt,
}) => {
    return (
        <div className="flex items-start justify-between py-4">
            {/* Left */}
            <div className="flex gap-4">
                {/* Icon */}
                <div className="w-7 h-7 rounded-md bg-[#D8EFE7] flex items-center justify-center shrink-0 mt-2">
                    <Check className="w-4 h-4 text-[#169873]" />
                </div>

                {/* Content */}
                <div>
                    <h3 className="text-md leading-[28px] font-medium text-[#233043]">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm text-[#7D8794]">
                        {category} {department && `· ${department}`}
                    </p>
                </div>
            </div>

            {/* Right */}
            <p className="text-[16px] text-[#B2BAC5] whitespace-nowrap ml-6">
                {completedAt}
            </p>
        </div>
    );
};

export default RecentlyCompletedCard;