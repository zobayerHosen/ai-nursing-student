"use client";

import { ArrowLeft, Activity, CheckSquare, AlertTriangle, HeartOff, ClipboardCheck, GraduationCap, Shield, FlaskConical, XCircle, Sparkles, AlertCircle } from "lucide-react";
import { useDrugCardHistoryDetails } from "@/hooks";
import { useRouter } from "next/navigation";

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

    // Safely parse drug card data across potential API wrapper structures
    const drugItem = detailsData?.data?.data || detailsData?.data || detailsData;
    const cardData = drugItem?.card_data || drugItem?.card || drugItem;

    if (!cardData || (!cardData.drug_name && !cardData.genericName)) {
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

    const title = cardData.drug_name || cardData.genericName;
    const brands = cardData.brand_names || cardData.brandNames;
    const drugClass = cardData.drug_class || cardData.therapeuticClass;
    const pharmClass = cardData.pharmacologic_class || cardData.pharmacologicClass || null;
    const route = cardData.route_of_administration || null;
    const pregnancy = cardData.pregnancy_category || null;

    const bbw = cardData.black_box_warning || null;
    const isHighAlert = cardData.is_high_alert || cardData.isHighAlert || !!bbw;

    const moa = cardData.mechanism_of_action || cardData.mechanismOfAction;
    const indications = cardData.indications || [];
    const contraindications = cardData.contraindications || [];

    let commonSideEffects = [];
    let severeSideEffects = cardData.serious_adverse_effects || [];
    const apiSideEffects = cardData.side_effects;

    if (apiSideEffects && Array.isArray(apiSideEffects)) {
        commonSideEffects = apiSideEffects.map(se => typeof se === 'object' ? `${se.system || 'System'}: ${se.effects}` : se);
    } else if (cardData.sideEffects) {
        commonSideEffects = cardData.sideEffects.common || [];
        if (severeSideEffects.length === 0) severeSideEffects = cardData.sideEffects.lifeThreatening || [];
    }

    const nursingCons = cardData.nursing_considerations || cardData.nursingConsiderations || [];
    const patientEd = cardData.patient_education || cardData.patientTeaching || [];
    const assessment = cardData.assessment_before_administration || [];
    const monitoring = cardData.monitoring_during_therapy || [];
    const pearls = cardData.nclex_pearls || [];
    const trick = cardData.memory_trick || null;
    const clinicalTips = cardData.clinical_tips || [];
    const antidote = cardData.antidote || null;
    const keyLabs = cardData.keyLabs || null;

    return (
        <div className="w-full flex flex-col gap-6 pt-2 xl:pt-0">
            {/* Back Button */}
            <div className="flex items-center mb-2">
                <button
                    onClick={() => router.push('/dashboard/drug-cards')}
                    className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#2C5F8D] transition-colors cursor-pointer"
                >
                    <ArrowLeft size={14} />
                    Back to Drug Cards
                </button>
            </div>

            {/* Top Banner Card */}
            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#F0F7FC] to-transparent rounded-bl-full opacity-50 pointer-events-none" />
                <div className="flex flex-col gap-3 z-10 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                        {isHighAlert && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-[#FEE4E2] text-[#D92D20] rounded-full w-fit border border-[#FECDCA]">
                                <AlertCircle size={14} /> HIGH-ALERT MEDICATION
                            </span>
                        )}
                        {pregnancy && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-[#F5F3FF] text-[#6D28D9] rounded-full w-fit border border-[#EDE9FE]">
                                Pregnancy: {pregnancy.split("—")[0].trim()}
                            </span>
                        )}
                        {route && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-[#F0FDF4] text-[#166534] rounded-full w-fit border border-[#DCFCE7]">
                                Route: {route}
                            </span>
                        )}
                    </div>
                    <div className="flex items-baseline gap-3 flex-wrap">
                        <h1 className="text-3xl font-extrabold text-[#1D2939] tracking-tight">{title}</h1>
                        {brands && <span className="text-base font-semibold text-[#667085]">({brands})</span>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {drugClass && <span className="px-3 py-1.5 bg-[#F0F7FC] text-[#2C5F8D] text-xs font-bold rounded-lg border border-[#D0E0EE]">{drugClass}</span>}
                        {pharmClass && <span className="px-3 py-1.5 bg-[#F2F4F7] text-[#475569] text-xs font-bold rounded-lg border border-[#E2E8F0]">{pharmClass}</span>}
                    </div>
                    {bbw && (
                        <div className="mt-2 p-3 bg-[#FFF1F0] border border-[#FCA5A5] rounded-xl flex gap-3 items-start">
                            <AlertTriangle size={16} className="text-[#D92D20] shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-bold text-[#D92D20] uppercase tracking-wider">Black Box Warning</h4>
                                <p className="text-xs font-medium text-[#B91C1C] mt-1 leading-relaxed">{bbw}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mechanism of Action */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 md:col-span-2">
                    <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                        <Activity size={18} className="shrink-0" /> Mechanism of Action
                    </h3>
                    <p className="text-sm font-medium leading-relaxed text-[#475569]">{moa}</p>
                </div>

                {/* Indications */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                    <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                        <CheckSquare size={18} className="shrink-0" /> Indications
                    </h3>
                    <ul className="flex flex-col gap-2 pl-1">
                        {indications.map((ind, i) => (
                            <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-2">
                                <span className="text-[#2C5F8D] mt-0.5">•</span><span>{ind}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contraindications */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                    <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                        <AlertTriangle size={18} className="text-[#D97706] shrink-0" /> Contraindications &amp; Precautions
                    </h3>
                    <ul className="flex flex-col gap-2 pl-1">
                        {contraindications.map((con, i) => (
                            <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-2">
                                <span className="text-[#D97706] mt-0.5">•</span><span>{con}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Side Effects */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-4 md:col-span-2">
                    <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                        <HeartOff size={18} className="text-[#D92D20] shrink-0" /> Side Effects &amp; Adverse Reactions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex flex-col gap-2">
                            <h4 className="text-xs font-bold text-[#475569] uppercase tracking-wider">Common Side Effects</h4>
                            <ul className="flex flex-col gap-1.5">
                                {commonSideEffects.map((se, i) => (
                                    <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-1.5">
                                        <span className="text-[#94A3B8]">•</span><span>{se}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-[#FFF1F0] border border-[#FCA5A5] p-4 rounded-xl flex flex-col gap-2">
                            <h4 className="text-xs font-bold text-[#D92D20] uppercase tracking-wider">Life-Threatening / Severe</h4>
                            <ul className="flex flex-col gap-1.5">
                                {severeSideEffects.map((lt, i) => (
                                    <li key={i} className="text-xs font-bold text-[#B91C1C] flex items-start gap-1.5">
                                        <span className="text-[#EF4444]">•</span><span>{lt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Assessment & Monitoring */}
                {(assessment.length > 0 || monitoring.length > 0) && (
                    <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-4 md:col-span-2">
                        <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                            <Activity size={18} className="shrink-0" /> Assessment &amp; Monitoring
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {assessment.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-xs font-bold text-[#344054] uppercase tracking-wider bg-[#F9FAFB] p-2 rounded-lg inline-block w-fit">Before Administration</h4>
                                    <ul className="flex flex-col gap-2 pl-1 mt-1">
                                        {assessment.map((item, i) => (
                                            <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-2">
                                                <span className="text-[#2C5F8D] mt-0.5">•</span><span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {monitoring.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-xs font-bold text-[#344054] uppercase tracking-wider bg-[#F9FAFB] p-2 rounded-lg inline-block w-fit">During Therapy</h4>
                                    <ul className="flex flex-col gap-2 pl-1 mt-1">
                                        {monitoring.map((item, i) => (
                                            <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-2">
                                                <span className="text-[#2C5F8D] mt-0.5">•</span><span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Key Labs (fallback) */}
                {keyLabs && (
                    <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                        <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                            <FlaskConical size={18} className="shrink-0" /> Key Labs to Monitor
                        </h3>
                        <p className="text-xs font-bold leading-relaxed text-[#1D2939] bg-[#F0F7FC] p-3 rounded-xl border border-[#D0E0EE]">{keyLabs}</p>
                    </div>
                )}

                {/* Nursing Considerations */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                    <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                        <ClipboardCheck size={18} className="shrink-0" /> Nursing Considerations
                    </h3>
                    <ul className="flex flex-col gap-2.5 pl-1">
                        {nursingCons.map((c, i) => (
                            <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                                <span className="text-[#2C5F8D] font-bold mt-0.5">✓</span><span>{c}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Patient Teaching */}
                <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
                    <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                        <GraduationCap size={18} className="shrink-0" /> Patient &amp; Family Teaching
                    </h3>
                    <ul className="flex flex-col gap-2.5 pl-1">
                        {patientEd.map((t, i) => (
                            <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                                <span className="text-[#2C5F8D] font-bold mt-0.5">▪</span><span>{t}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Clinical Tips & NCLEX Pearls */}
                {(clinicalTips.length > 0 || pearls.length > 0) && (
                    <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-4 md:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {clinicalTips.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#166534]">
                                        <Shield size={18} className="shrink-0" /> Clinical Tips
                                    </h3>
                                    <ul className="flex flex-col gap-2.5 pl-1">
                                        {clinicalTips.map((tip, i) => (
                                            <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                                                <span className="text-[#166534] font-bold mt-0.5">★</span><span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {pearls.length > 0 && (
                                <div className="flex flex-col gap-3">
                                    <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#6D28D9]">
                                        <Sparkles size={18} className="shrink-0" /> NCLEX Pearls
                                    </h3>
                                    <ul className="flex flex-col gap-2.5 pl-1">
                                        {pearls.map((pearl, i) => (
                                            <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                                                <span className="text-[#6D28D9] font-bold mt-0.5">►</span><span>{pearl}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Memory Trick */}
                {trick && (
                    <div className="bg-linear-to-r from-[#F0F7FC] to-white border border-[#D0E0EE] rounded-2xl p-5 shadow-sm flex flex-col gap-2 md:col-span-2">
                        <h3 className="text-xs font-bold flex items-center gap-2 text-[#2C5F8D] uppercase tracking-wider">
                            <Sparkles size={14} className="shrink-0" /> Memory Trick
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-[#1D2939] italic">"{trick}"</p>
                    </div>
                )}

                {/* Antidote */}
                {antidote && (
                    <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 md:col-span-2">
                        <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
                            <Shield size={18} className="text-[#10B981] shrink-0" /> Antidote &amp; Reversal Agents
                        </h3>
                        <p className="text-xs font-bold text-[#065F46] bg-[#ECFDF5] p-3.5 rounded-xl border border-[#A7F3D0] inline-block">{antidote}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
