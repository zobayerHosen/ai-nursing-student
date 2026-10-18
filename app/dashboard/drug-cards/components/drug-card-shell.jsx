"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  HeartOff,
  ClipboardCheck,
  FlaskConical,
  Sparkles,
  FileText
} from "lucide-react";
import { useIsMutating, useMutationState } from "@tanstack/react-query";
import DrugCardView from "./drug-card-view";

const DrugCardContent = () => {
  const router = useRouter();

  // Track in-flight generation
  const isGenerating = useIsMutating({ mutationKey: ['drug-card-generate'] }) > 0;

  // Surface the latest successful mutation result
  const mutationResults = useMutationState({
    filters: { mutationKey: ['drug-card-generate'], status: 'success' },
    select: (mutation) => mutation.state.data,
  });
  const lastResult = mutationResults?.[mutationResults.length - 1];
  const drug = lastResult?.data?.data || lastResult?.data;

  const handleClear = () => {
    router.push("/dashboard/drug-cards");
  };

  // 1. Generating state
  if (isGenerating) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-sm border border-[#E4E7EC] p-6 md:p-12 w-full max-w-3xl flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#2C5F8D] rounded-full flex items-center justify-center text-white mb-6 shadow-md animate-pulse">
            <FileText size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#344054] tracking-tight mb-3">
            Generating Drug Card...
          </h2>
          <p className="text-[#475569] text-sm font-medium max-w-md leading-relaxed mb-8">
            Our AI is retrieving clinical data and building a comprehensive nursing drug card. This may take a moment.
          </p>
          <div className="w-full max-w-lg flex flex-col gap-4 animate-pulse opacity-50 select-none pointer-events-none">
            <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
            <div className="h-3 bg-gray-200 rounded w-4/6" />
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Landing state — no generation yet
  if (!drug) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-white border border-[#E4E7EC] rounded-2xl p-8 shadow-sm flex flex-col items-center text-center gap-6 mt-4">
        <div className="w-16 h-16 bg-[#F0F7FC] rounded-2xl flex items-center justify-center text-[#2C5F8D] shadow-inner">
          <Sparkles size={32} className="animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 max-w-lg">
          <h2 className="text-2xl font-extrabold text-[#1D2939] tracking-tight">AI Drug Card Generator</h2>
          <p className="text-sm text-[#475569] leading-relaxed">
            Generate comprehensive, evidence-based nursing drug cards designed for NCLEX-RN success. Get structured safety insights, drug classifications, and critical assessments at a glance.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left mt-2">
          <div className="border border-[#F2F4F7] bg-[#FCFDFD] p-4 rounded-xl flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center shrink-0"><Activity size={16} /></div>
            <div><h4 className="text-xs font-bold text-[#1D2939]">Clinical Classification</h4><p className="text-[11px] text-[#667085] mt-1 font-medium">Identifies therapeutic and pharmacologic drug classes along with detailed mechanisms of action.</p></div>
          </div>
          <div className="border border-[#F2F4F7] bg-[#FCFDFD] p-4 rounded-xl flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center shrink-0"><HeartOff size={16} /></div>
            <div><h4 className="text-xs font-bold text-[#1D2939]">Safety &amp; Side Effects</h4><p className="text-[11px] text-[#667085] mt-1 font-medium">Highlights standard side effects and prioritizes life-threatening adverse reactions in bold red.</p></div>
          </div>
          <div className="border border-[#F2F4F7] bg-[#FCFDFD] p-4 rounded-xl flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FEF0C7] text-[#D97706] flex items-center justify-center shrink-0"><ClipboardCheck size={16} /></div>
            <div><h4 className="text-xs font-bold text-[#1D2939]">Nursing Interventions</h4><p className="text-[11px] text-[#667085] mt-1 font-medium">Outlines vital clinical checks, safety safeguards, contrast-medium holds, and antidotes.</p></div>
          </div>
          <div className="border border-[#F2F4F7] bg-[#FCFDFD] p-4 rounded-xl flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0"><FlaskConical size={16} /></div>
            <div><h4 className="text-xs font-bold text-[#1D2939]">Key Labs &amp; Monitoring</h4><p className="text-[11px] text-[#667085] mt-1 font-medium">Consolidates essential lab metrics, drug blood ranges, and serum values to monitor.</p></div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#475569]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2C5F8D] animate-pulse" />
          To start, type a medication name in the sidebar or select a popular drug from the Quick Search list.
        </div>
      </div>
    );
  }

  // 3. Final display state using reusable DrugCardView
  return (
    <DrugCardView
      data={drug}
      onClear={handleClear}
    />
  );
};

const DrugCardShell = () => {
  return (
    <Suspense fallback={
      <div className="w-full flex items-center justify-center py-16">
        <div className="w-8 h-8 border-3 border-[#2C5F8D] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DrugCardContent />
    </Suspense>
  );
};

export default DrugCardShell;