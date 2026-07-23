"use client";

import { useState } from "react";
import { 
    RotateCcw,
    User,
    Building2,
    Stethoscope
} from "lucide-react";

export default function CarePlanBuilderDetails({ id }) {
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

    return (
        <div className="w-full h-full flex flex-col pt-2 xl:pt-0">
            {/* Header Banner */}
            <div className="bg-[#2C5F8D] rounded-2xl p-6 text-white mb-6 relative shadow-sm">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                        STEM RN CARE PLAN
                    </span>
                    <button className="flex items-center gap-1.5 text-sm text-blue-200 hover:text-white transition-colors cursor-pointer">
                        <RotateCcw size={14} />
                        Reset
                    </button>
                </div>
                
                <h1 className="text-[22px] font-bold mb-4">Male — Chief Complaint / Reason for Admission</h1>
                
                <div className="flex items-center gap-3">
                    <span className="bg-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/10">
                        2 Nursing Diagnoses
                    </span>
                    <span className="bg-white/20 text-white text-[11px] font-medium px-3 py-1 rounded-full border border-white/10">
                        Generated Jul 14, 9:52 AM
                    </span> 
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-t-xl border-x border-t border-[#E5E7EB] flex overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-4 text-[13px] font-semibold whitespace-nowrap border-b-2 transition-colors flex-1 text-center min-w-30 ${
                            activeTab === tab 
                            ? "border-[#2C5F8D] text-[#2C5F8D]" 
                            : "border-transparent text-[#64748B] hover:text-[#344054] hover:bg-gray-50"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-b-xl border border-[#E5E7EB] border-t-0 p-8 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-10">
                {activeTab === "Overview" && (
                    <div className="flex flex-col gap-8">
                        {/* Patient Overview */}
                        <div>
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1D2939] mb-3">
                                <User size={18} className="text-[#2C5F8D]" />
                                Patient Overview
                            </h3>
                            <p className="text-sm text-[#344054] leading-[1.6]">
                                patient admitted with sdfsdf. PMH: not provided. Current medications: per reconciliation. Allergies: sdfsdf. Vital signs presentation: sdfsdf. Relevant diagnostics: sdfsdf. Additional clinical context: asdfsd.
                            </p>
                        </div>

                        {/* Disease Overview */}
                        <div>
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1D2939] mb-3">
                                <Building2 size={18} className="text-[#2C5F8D]" />
                                Disease Overview
                            </h3>
                            <p className="text-sm text-[#344054] leading-[1.6]">
                                This patient presentation involves acute illness requiring inpatient nursing management. Care priorities are established using Maslow's Hierarchy and ABC framework. Physiological stability is addressed before psychosocial needs. All interventions are evidence-based and aligned with current clinical practice guidelines and NANDA-I taxonomy.
                            </p>
                        </div>

                        {/* Priority Nursing Diagnoses Summary */}
                        <div>
                            <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#1D2939] mb-4">
                                <Stethoscope size={18} className="text-[#2C5F8D]" />
                                Priority Nursing Diagnoses Summary
                            </h3>
                            
                            <div className="border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:border-[#2C5F8D]/40 transition-colors cursor-pointer bg-white">
                                <div className="w-9.5 h-9.5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                    <span className="font-bold text-[13px]">#1</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1D2939] text-[15px] mb-0.5">Deficient Knowledge</h4>
                                    <p className="text-[13px] text-[#64748B]">
                                        r/t new or complex diagnosis, unfamiliarity with treatment regimen, health literacy ...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab !== "Overview" && (
                    <div className="py-12 flex items-center justify-center text-[#64748B] text-sm italic">
                        Content for {activeTab} will be dynamically generated.
                    </div>
                )}
            </div>
        </div>
    );
}
