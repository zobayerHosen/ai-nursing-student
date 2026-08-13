"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  CheckSquare,
  AlertTriangle,
  HeartOff,
  ClipboardCheck,
  GraduationCap,
  Shield,
  FlaskConical,
  XCircle,
  Sparkles,
  RefreshCw,
  AlertCircle,
  FileText
} from "lucide-react";
import { useIsMutating, useMutationState } from "@tanstack/react-query";

const LOADING_STEPS = [
  "Retrieving clinical monograph...",
  "Analyzing mechanism of action...",
  "Formatting FDA-approved indications...",
  "Mapping critical nursing considerations...",
  "Compiling patient safety alerts..."
];

function SkeletonDrugCard() {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse">
      {/* Top banner skeleton */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-3 w-full">
            <div className="h-4 w-28 bg-gray-200 rounded-full" />
            <div className="h-8 w-64 bg-gray-200 rounded-lg max-w-full" />
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-24 bg-gray-200 rounded-lg" />
              <div className="h-6 w-32 bg-gray-200 rounded-lg" />
            </div>
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded-xl shrink-0" />
        </div>
      </div>

      {/* Grid skeleton */}
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
        {/* Side effects skeleton — full width */}
        <div className="md:col-span-2 bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#F2F4F7]">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-4 w-44 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-28 bg-gray-200 rounded-xl" />
            <div className="h-28 bg-gray-200 rounded-xl" />
          </div>
        </div>
        {/* Nursing considerations + Patient teaching skeletons */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#F2F4F7]">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-4 w-48 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2.5">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#F2F4F7]">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-4 w-44 bg-gray-200 rounded" />
          </div>
          <div className="space-y-2.5">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

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

  // 3. Map properties from API response and display the drug card
  const title = drug.card?.drug_name || drug.drug_name || drug.genericName;
  const brands = drug.card?.brand_names || drug.brand_names || drug.brandNames;
  const drugClass = drug.card?.drug_class || drug.drug_class || drug.therapeuticClass;
  const pharmClass = drug.pharmacologicClass || null;
  const route = drug.card?.route_of_administration || drug.route_of_administration || null;
  const pregnancy = drug.card?.pregnancy_category || drug.pregnancy_category || null;

  const bbw = drug.card?.black_box_warning || drug.black_box_warning || null;
  const isHighAlert = drug.isHighAlert || !!bbw;

  const moa = drug.card?.mechanism_of_action || drug.mechanism_of_action || drug.mechanismOfAction;
  const indications = drug.card?.indications || drug.indications || [];
  const contraindications = drug.card?.contraindications || drug.contraindications || [];

  let commonSideEffects = [];
  let severeSideEffects = drug.card?.serious_adverse_effects || drug.serious_adverse_effects || [];
  const apiSideEffects = drug.card?.side_effects || drug.side_effects;

  if (apiSideEffects && Array.isArray(apiSideEffects)) {
    commonSideEffects = apiSideEffects.map(se => `${se.system || 'System'}: ${se.effects}`);
  } else if (drug.sideEffects) {
    commonSideEffects = drug.sideEffects.common || [];
    if (severeSideEffects.length === 0) severeSideEffects = drug.sideEffects.lifeThreatening || [];
  }

  const nursingCons = drug.card?.nursing_considerations || drug.nursing_considerations || drug.nursingConsiderations || [];
  const patientEd = drug.card?.patient_education || drug.patient_education || drug.patientTeaching || [];
  const assessment = drug.card?.assessment_before_administration || drug.assessment_before_administration || [];
  const monitoring = drug.card?.monitoring_during_therapy || drug.monitoring_during_therapy || [];
  const pearls = drug.card?.nclex_pearls || drug.nclex_pearls || [];
  const trick = drug.card?.memory_trick || drug.memory_trick || null;
  const clinicalTips = drug.card?.clinical_tips || drug.clinical_tips || [];
  const antidote = drug.antidote || null;
  const keyLabs = drug.keyLabs || null;

  // 3. Final display state
  return (
    <div className="w-full flex flex-col gap-6" id="printable-drug-card">
      {/* Top Banner Card */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print-card relative overflow-hidden">
        {/* Decorator */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#F0F7FC] to-transparent rounded-bl-full opacity-50 pointer-events-none" />
        
        <div className="flex flex-col gap-3 z-10 w-full">
          {/* Warning / Alerts Row */}
          <div className="flex flex-wrap items-center gap-2">
            {isHighAlert && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-[#FEE4E2] text-[#D92D20] rounded-full w-fit border border-[#FECDCA]">
                <AlertCircle size={14} />
                HIGH-ALERT MEDICATION
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
            {brands && (
              <span className="text-base font-semibold text-[#667085]">
                ({brands})
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {drugClass && (
              <span className="px-3 py-1.5 bg-[#F0F7FC] text-[#2C5F8D] text-xs font-bold rounded-lg border border-[#D0E0EE]">
                {drugClass}
              </span>
            )}
            {pharmClass && (
              <span className="px-3 py-1.5 bg-[#F2F4F7] text-[#475569] text-xs font-bold rounded-lg border border-[#E2E8F0]">
                {pharmClass}
              </span>
            )}
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

        {/* Action Button */}
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 active:bg-red-100 text-[#D92D20] border border-[#FECDCA] hover:border-[#FCA5A5] rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer shrink-0 z-10"
        >
          <XCircle size={16} />
          Clear Card
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
        
        {/* Mechanism of Action */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card md:col-span-2">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <Activity size={18} className="shrink-0" />
            Mechanism of Action
          </h3>
          <p className="text-sm font-medium leading-relaxed text-[#475569]">
            {moa}
          </p>
        </div>

        {/* Indications */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <CheckSquare size={18} className="shrink-0" />
            Indications
          </h3>
          <ul className="flex flex-col gap-2 pl-1">
            {indications.map((ind, i) => (
              <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-2">
                <span className="text-[#2C5F8D] mt-0.5">•</span>
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contraindications */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <AlertTriangle size={18} className="text-[#D97706] shrink-0" />
            Contraindications & Precautions
          </h3>
          <ul className="flex flex-col gap-2 pl-1">
            {contraindications.map((con, i) => (
              <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-2">
                <span className="text-[#D97706] mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Side Effects / Adverse Reactions */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-4 print-card md:col-span-2 print-full">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <HeartOff size={18} className="text-[#D92D20] shrink-0" />
            Side Effects & Adverse Reactions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-xs font-bold text-[#475569] uppercase tracking-wider">Common Side Effects</h4>
              <ul className="flex flex-col gap-1.5">
                {commonSideEffects.map((se, i) => (
                  <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-1.5">
                    <span className="text-[#94A3B8]">•</span>
                    <span>{se}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FFF1F0] border border-[#FCA5A5] p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-xs font-bold text-[#D92D20] uppercase tracking-wider">Life-Threatening / Severe</h4>
              <ul className="flex flex-col gap-1.5">
                {severeSideEffects.map((lt, i) => (
                  <li key={i} className="text-xs font-bold text-[#B91C1C] flex items-start gap-1.5">
                    <span className="text-[#EF4444]">•</span>
                    <span>{lt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Assessments & Monitoring */}
        {(assessment.length > 0 || monitoring.length > 0) && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-4 print-card md:col-span-2">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <Activity size={18} className="shrink-0" />
              Assessment & Monitoring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessment.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-[#344054] uppercase tracking-wider bg-[#F9FAFB] p-2 rounded-lg inline-block w-fit">Before Administration</h4>
                  <ul className="flex flex-col gap-2 pl-1 mt-1">
                    {assessment.map((item, i) => (
                      <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-2">
                        <span className="text-[#2C5F8D] mt-0.5">•</span>
                        <span>{item}</span>
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
                        <span className="text-[#2C5F8D] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key Labs (Fallback for old data) */}
        {keyLabs && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <FlaskConical size={18} className="shrink-0" />
              Key Labs to Monitor
            </h3>
            <p className="text-xs font-bold leading-relaxed text-[#1D2939] bg-[#F0F7FC] p-3 rounded-xl border border-[#D0E0EE]">
              {keyLabs}
            </p>
          </div>
        )}

        {/* Nursing Considerations */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <ClipboardCheck size={18} className="shrink-0" />
            Nursing Considerations
          </h3>
          <ul className="flex flex-col gap-2.5 pl-1">
            {nursingCons.map((consideration, i) => (
              <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                <span className="text-[#2C5F8D] font-bold mt-0.5">✓</span>
                <span>{consideration}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Patient Teaching */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <GraduationCap size={18} className="shrink-0" />
            Patient & Family Teaching
          </h3>
          <ul className="flex flex-col gap-2.5 pl-1">
            {patientEd.map((teach, i) => (
              <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                <span className="text-[#2C5F8D] font-bold mt-0.5">▪</span>
                <span>{teach}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Clinical Tips & NCLEX Pearls */}
        {(clinicalTips.length > 0 || pearls.length > 0) && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-4 print-card md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clinicalTips.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#166534]">
                    <Shield size={18} className="shrink-0" />
                    Clinical Tips
                  </h3>
                  <ul className="flex flex-col gap-2.5 pl-1">
                    {clinicalTips.map((tip, i) => (
                      <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                        <span className="text-[#166534] font-bold mt-0.5">★</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pearls.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#6D28D9]">
                    <Sparkles size={18} className="shrink-0" />
                    NCLEX Pearls
                  </h3>
                  <ul className="flex flex-col gap-2.5 pl-1">
                    {pearls.map((pearl, i) => (
                      <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                        <span className="text-[#6D28D9] font-bold mt-0.5">►</span>
                        <span>{pearl}</span>
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
          <div className="bg-linear-to-r from-[#F0F7FC] to-white border border-[#D0E0EE] rounded-2xl p-5 shadow-sm flex flex-col gap-2 print-card md:col-span-2">
            <h3 className="text-xs font-bold flex items-center gap-2 text-[#2C5F8D] uppercase tracking-wider">
              <Sparkles size={14} className="shrink-0" />
              Memory Trick
            </h3>
            <p className="text-sm font-medium leading-relaxed text-[#1D2939] italic">
              "{trick}"
            </p>
          </div>
        )}

        {/* Antidote */}
        {antidote && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card md:col-span-2 print-full">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <Shield size={18} className="text-[#10B981] shrink-0" />
              Antidote & Reversal Agents
            </h3>
            <p className="text-xs font-bold text-[#065F46] bg-[#ECFDF5] p-3.5 rounded-xl border border-[#A7F3D0] inline-block">
              {antidote}
            </p>
          </div>
        )}
      </div>
    </div>
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