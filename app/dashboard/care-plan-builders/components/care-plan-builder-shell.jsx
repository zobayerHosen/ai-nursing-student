"use client";

import { 
    FileText, 
    Stethoscope, 
    TrendingUp, 
    ClipboardList, 
    Sparkles,
    RotateCcw
} from "lucide-react";

export default function CarePlanBuilderShell() {
    return (
        <div className="w-full h-full flex flex-col pt-2 xl:pt-0">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h1 className="text-2xl font-bold text-[#344054] hidden xl:block">Care Plan Builder</h1>
                
                <div className="flex items-center gap-3 ml-auto w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-sm font-semibold rounded-full transition-colors">
                        History (3)
                    </button>
                    <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] text-sm font-semibold rounded-full transition-colors">
                        <RotateCcw size={16} />
                        Reset
                    </button>
                </div>
            </div>

            {/* Empty State Card */}
            <div className="flex-1 flex items-center justify-center">
                <div className="bg-white rounded-3xl shadow-sm border border-[#E4E7EC] p-8 md:p-12 w-full max-w-3xl flex flex-col items-center text-center">
                    
                    <div className="w-16 h-16 bg-[#2C5F8D] rounded-full flex items-center justify-center text-white mb-6 shadow-md">
                        <FileText size={32} />
                    </div>

                    <h2 className="text-3xl font-extrabold text-[#344054] tracking-tight mb-4">
                        Care Plan Builder
                    </h2>
                    
                    <p className="text-[#475569] text-sm font-medium max-w-lg leading-relaxed mb-8">
                        Fill in patient info on the left. The AI will generate NANDA-I diagnoses, SMART outcomes, interventions, and NCLEX pearls.
                    </p>

                    <div className="flex flex-col gap-4 w-full max-w-md text-left">
                        <div className="flex items-start gap-3">
                            <Stethoscope size={20} className="text-[#64748B] shrink-0 mt-0.5" />
                            <span className="text-sm font-semibold text-[#475569]">NANDA-I diagnoses prioritized by ABC/Maslow</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <TrendingUp size={20} className="text-[#64748B] shrink-0 mt-0.5" />
                            <span className="text-sm font-semibold text-[#475569]">SMART outcomes with timeframes</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <ClipboardList size={20} className="text-[#64748B] shrink-0 mt-0.5" />
                            <span className="text-sm font-semibold text-[#475569]">Evidence-based interventions + rationales</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Sparkles size={20} className="text-[#64748B] shrink-0 mt-0.5" />
                            <span className="text-sm font-semibold text-[#475569]">NCLEX pearls per diagnosis</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}