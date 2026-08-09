"use client";

import { ArrowLeft } from "lucide-react";
import { useCarePlanHistoryDetails } from "@/hooks";
import { useRouter } from "next/navigation";
import CarePlanContent from "./care-plan-content";

export default function CarePlanBuilderDetails({ id }) {
    const router = useRouter();
    const { detailsData, isDetailsLoading } = useCarePlanHistoryDetails(id);
    const plan = detailsData?.data || detailsData;
    const carePlan = plan?.care_plan;

    if (isDetailsLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center pt-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C5F8D]"></div>
            </div>
        );
    }

    if (!carePlan) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center pt-20 text-[#64748B]">
                <p>Care plan details not found.</p>
                <button onClick={() => router.back()} className="mt-4 text-[#2C5F8D] hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col pt-2 xl:pt-0">
            <div className="flex items-center mb-4">
                <button onClick={() => router.push('/dashboard/care-plan-builders')} className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#2C5F8D] transition-colors cursor-pointer">
                    <ArrowLeft size={14} />
                    Back to Builder
                </button>
            </div>
            <CarePlanContent carePlan={carePlan} title={plan?.title} />
        </div>
    );
}
