"use client";

import { useState } from "react";
import {
    User,
    Building2,
    Stethoscope,
    ListChecks,
    Pill,
    FlaskConical,
    GraduationCap,
    CheckCircle2
} from "lucide-react";

export default function CarePlanContent({ carePlan, title }) {
    const tabs = [
        "Overview",
        "Assessment",
        "Diagnoses",
        "Medications",
        "Lab Findings",
        "Patient Education",
        "Expected Outcomes"
    ];

    const [activeTab, setActiveTab] = useState("Overview");

    const formatDate = (isoString) => {
        if (!isoString) return "N/A";
        return new Date(isoString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    if (!carePlan) return null;

    return (
        <>
            {/* Header Banner */}
            <div className="bg-[#2C5F8D] rounded-2xl p-6 text-white mb-6 relative shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                        {carePlan?.metadata?.title || "STEM RN CARE PLAN"}
                    </span>
                </div>
                <h1 className="text-[22px] font-bold mb-4">{title || carePlan?.metadata?.subtitle}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="bg-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/10">
                        {carePlan?.metadata?.nursing_diagnoses_count || carePlan?.diagnoses?.length || 0} Nursing Diagnoses
                    </span>
                    <span className="bg-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/10">
                        Generated {formatDate(carePlan?.metadata?.generated_at)}
                    </span>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-t-xl border-x border-t border-[#E5E7EB] flex overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-4 text-[13px] font-semibold whitespace-nowrap border-b-2 transition-colors flex-1 text-center min-w-30 ${activeTab === tab
                            ? "border-[#2C5F8D] text-[#2C5F8D]"
                            : "border-transparent text-[#64748B] hover:text-[#344054] hover:bg-gray-50"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-b-xl border border-[#E5E7EB] border-t-0 p-5 md:p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-10">
                {activeTab === "Overview" && (
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1D2939] mb-3">
                                <User size={18} className="text-[#2C5F8D]" /> Patient Overview
                            </h3>
                            <p className="text-sm text-[#344054] leading-[1.6]">{carePlan?.overview?.patient_overview}</p>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1D2939] mb-3">
                                <Building2 size={18} className="text-[#2C5F8D]" /> Disease Overview
                            </h3>
                            <p className="text-sm text-[#344054] leading-[1.6]">{carePlan?.overview?.disease_overview}</p>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1D2939] mb-4">
                                <Stethoscope size={18} className="text-[#2C5F8D]" /> Priority Nursing Diagnoses Summary
                            </h3>
                            <div className="flex flex-col gap-3">
                                {carePlan?.overview?.priority_nursing_diagnoses_summary?.map((diag, idx) => (
                                    <div key={idx} className="border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:border-[#2C5F8D]/40 transition-colors bg-white">
                                        <div className="w-9.5 h-9.5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                            <span className="font-bold text-[13px]">#{diag.rank || idx + 1}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#1D2939] text-[15px] mb-0.5">{diag.title}</h4>
                                            <p className="text-[13px] text-[#64748B]">{diag.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Assessment" && (
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1D2939] mb-4">
                                <User size={18} className="text-[#2C5F8D]" /> Subjective Data
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-[#344054]">
                                {carePlan?.assessment?.subjective_data?.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1D2939] mb-4">
                                <ListChecks size={18} className="text-[#2C5F8D]" /> Objective Data
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-[#344054]">
                                {carePlan?.assessment?.objective_data?.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === "Diagnoses" && (
                    <div className="flex flex-col gap-8">
                        {carePlan?.diagnoses?.map((diag, idx) => (
                            <div key={idx} className="border border-[#E5E7EB] rounded-xl p-4 md:p-6 bg-gray-50/50">
                                <h3 className="text-[16px] font-bold text-[#1D2939] mb-2">{diag.diagnosis}</h3>
                                <p className="text-sm text-[#64748B] mb-4"><strong>Related to:</strong> {diag.related_to}</p>
                                <h4 className="text-[13px] font-semibold text-[#1D2939] mt-4 mb-2">As evidenced by:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-[#344054] mb-4">
                                    {diag.as_evidenced_by?.map((ev, i) => <li key={i}>{ev}</li>)}
                                </ul>
                                <h4 className="text-[13px] font-semibold text-[#1D2939] mt-4 mb-2">SMART Goals:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-[#344054] mb-4">
                                    {diag.smart_goals?.map((g, i) => <li key={i}>{g.goal} ({g.timeframe})</li>)}
                                </ul>
                                <h4 className="text-[13px] font-semibold text-[#1D2939] mt-4 mb-2">Nursing Interventions:</h4>
                                <div className="flex flex-col gap-3 mb-4">
                                    {diag.nursing_interventions?.map((intv, i) => (
                                        <div key={i} className="bg-white border border-[#E5E7EB] p-3 rounded-lg text-sm">
                                            <p className="font-semibold text-[#1D2939] mb-1">{intv.intervention}</p>
                                            <p className="text-[#64748B] italic">Rationale: {intv.scientific_rationale}</p>
                                        </div>
                                    ))}
                                </div>
                                <h4 className="text-[13px] font-semibold text-[#1D2939] mt-4 mb-2">Evaluation Criteria:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-[#344054] mb-4">
                                    {diag.evaluation_criteria?.map((ev, i) => <li key={i}>{ev}</li>)}
                                </ul>
                                <h4 className="text-[13px] font-semibold text-[#1D2939] mt-4 mb-2">NCLEX Pearls:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-[#2C5F8D]">
                                    {diag.nclex_pearls?.map((p, i) => <li key={i}>{p}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Medications" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {carePlan?.medications?.map((med, idx) => (
                            <div key={idx} className="border border-[#E5E7EB] rounded-xl p-5 bg-white shadow-sm flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[#2C5F8D] font-bold text-lg mb-1">
                                    <Pill size={18} /> {med.medication}
                                </div>
                                <p className="text-sm text-[#344054]"><strong>Dose:</strong> {med.dose}</p>
                                <p className="text-sm text-[#344054]"><strong>Route:</strong> {med.route}</p>
                                <p className="text-sm text-[#64748B] mt-2 bg-gray-50 p-2 rounded-lg italic">{med.nursing_purpose}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Lab Findings" && (
                    <div className="flex flex-col gap-4">
                        {carePlan?.lab_findings?.map((lab, idx) => (
                            <div key={idx} className="border border-[#E5E7EB] rounded-xl p-5 bg-white shadow-sm flex flex-col md:flex-row gap-4 justify-between md:items-center">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-[#2C5F8D] font-bold text-md">
                                        <FlaskConical size={18} /> {lab.lab_value}
                                    </div>
                                    <p className="text-sm text-[#344054] mt-1"><strong>Patient Value:</strong> <span className="text-rose-600 font-semibold">{lab.patient_value}</span> (Normal: {lab.normal_range})</p>
                                </div>
                                <div className="md:w-1/2 bg-gray-50 p-3 rounded-lg text-sm text-[#64748B] italic">{lab.clinical_significance}</div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Patient Education" && (
                    <div className="flex flex-col gap-4">
                        {carePlan?.patient_education?.map((edu, idx) => (
                            <div key={idx} className="flex items-start gap-4 border border-[#E5E7EB] rounded-xl p-4 bg-white hover:border-[#2C5F8D]/40 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 mt-0.5">
                                    <GraduationCap size={16} />
                                </div>
                                <p className="text-sm text-[#1D2939] leading-relaxed">{edu.topic}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "Expected Outcomes" && (
                    <div className="flex flex-col gap-4">
                        {carePlan?.expected_outcomes?.map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-3 border border-[#E5E7EB] rounded-xl p-4 bg-[#F0FDF4] hover:border-[#22C55E]/40 transition-colors">
                                <CheckCircle2 size={20} className="text-[#22C55E] shrink-0 mt-0.5" />
                                <p className="text-sm text-[#166534] font-medium leading-relaxed">{outcome}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
