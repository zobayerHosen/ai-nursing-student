"use client";

import { ArrowLeft } from "lucide-react";
import { useDrugCardHistoryDetails } from "@/hooks";
import { useRouter } from "next/navigation";
import DrugCardView, { normalizeDrugCardData } from "./drug-card-view";

function SkeletonDrugCard() {
    return (
        <div className="w-full flex flex-col gap-6 animate-pulse">
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col gap-3 w-full">
                    <div className="h-4 w-28 bg-gray-200 rounded-full" />
                    <div className="h-8 w-64 bg-gray-200 rounded-lg max-w-full" />
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 w-24 bg-gray-200 rounded-lg" />
                        <div className="h-6 w-32 bg-gray-200 rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#F2F4F7]">
                            <div className="w-4 h-4 bg-gray-200 rounded" />
                            <div className="h-4 w-36 bg-gray-200 rounded" />
                        </div>
                        <div className="space-y-2.5">
                            <div className="h-3 bg-gray-200 rounded w-full" />
                            <div className="h-3 bg-gray-200 rounded w-5/6" />
                            <div className="h-3 bg-gray-200 rounded w-4/6" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function DrugCardDetails({ id }) {
    const router = useRouter();
    const { detailsData, isDetailsLoading } = useDrugCardHistoryDetails(id);

    if (isDetailsLoading) {
        return (
            <div className="w-full mt-4">
                <SkeletonDrugCard />
            </div>
        );
    }

    const cardData = normalizeDrugCardData(detailsData);

    if (!cardData || (!cardData.drug_name && !cardData.generic_name && !cardData.genericName)) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center pt-20 text-[#64748B]">
                <p>Drug card details not found.</p>
                <button
                    onClick={() => router.push('/dashboard/drug-cards')}
                    className="mt-4 text-[#2C5F8D] hover:underline flex items-center gap-2 cursor-pointer"
                >
                    <ArrowLeft size={16} /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="w-full pt-2 xl:pt-0">
            <DrugCardView
                data={cardData}
                onBack={() => router.push('/dashboard/drug-cards')}
            />
        </div>
    );
}
