"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  AlertCircle
} from "lucide-react";
import { generateMockDrugCard } from "../data/drug-data";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const drugName = searchParams.get("drug");

  const [isGenerating, setIsGenerating] = useState(!!drugName);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Get current drug profile
  const drug = drugName ? generateMockDrugCard(drugName) : null;

  // Save to history when drug card finishes generating
  useEffect(() => {
    if (!isGenerating && !showSkeleton && drugName && drug) {
      try {
        const history = JSON.parse(localStorage.getItem("stemrn-drug-card-history") || "[]");
        // Avoid duplicates — if drug already exists in history, just update its timestamp
        const filtered = history.filter((item) => item.drugName.toLowerCase() !== drugName.toLowerCase());
        const updated = [
          { drugName: drugName, timestamp: Date.now(), displayName: drug.genericName },
          ...filtered,
        ];
        localStorage.setItem("stemrn-drug-card-history", JSON.stringify(updated));
        // Dispatch custom event so the sidebar can refresh
        window.dispatchEvent(new CustomEvent("drug-history-updated"));
      } catch {
        // localStorage unavailable — silently skip
      }
    }
  }, [isGenerating, showSkeleton, drugName, drug]);

  // Trigger generator animation only for first-time drug views
  useEffect(() => {
    if (!drugName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsGenerating(false);
      setShowSkeleton(false);
      return;
    }

    // Check if this drug has been viewed before (exists in history localStorage)
    const isPreviouslyViewed = (() => {
      try {
        const history = JSON.parse(localStorage.getItem("stemrn-drug-card-history") || "[]");
        return history.some((item) => item.drugName.toLowerCase() === drugName.toLowerCase());
      } catch {
        return false;
      }
    })();

    if (isPreviouslyViewed) {
      // Show skeleton briefly, then reveal the card
      setIsGenerating(false);
      setShowSkeleton(true);
      const timer = setTimeout(() => setShowSkeleton(false), 700);
      return () => clearTimeout(timer);
    }

    setIsGenerating(true);
    setShowSkeleton(false);
    setProgress(0);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(stepInterval);
          setTimeout(() => setIsGenerating(false), 200);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [drugName]);

  const handleClear = () => {
    router.push("/dashboard/drug-cards");
  };

  // 1. Landing state / Info card message when no drug is searched
  if (!drugName) {
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
            <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center shrink-0">
              <Activity size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1D2939]">Clinical Classification</h4>
              <p className="text-[11px] text-[#667085] mt-1 font-medium">Identifies therapeutic and pharmacologic drug classes along with detailed mechanisms of action.</p>
            </div>
          </div>

          <div className="border border-[#F2F4F7] bg-[#FCFDFD] p-4 rounded-xl flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FEE4E2] text-[#D92D20] flex items-center justify-center shrink-0">
              <HeartOff size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1D2939]">Safety & Side Effects</h4>
              <p className="text-[11px] text-[#667085] mt-1 font-medium">Highlights standard side effects and prioritizes life-threatening adverse reactions in bold red.</p>
            </div>
          </div>

          <div className="border border-[#F2F4F7] bg-[#FCFDFD] p-4 rounded-xl flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FEF0C7] text-[#D97706] flex items-center justify-center shrink-0">
              <ClipboardCheck size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1D2939]">Nursing Interventions</h4>
              <p className="text-[11px] text-[#667085] mt-1 font-medium">Outlines vital clinical checks, safety safeguards, contrast-medium holds, and antidotes.</p>
            </div>
          </div>

          <div className="border border-[#F2F4F7] bg-[#FCFDFD] p-4 rounded-xl flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#047857] flex items-center justify-center shrink-0">
              <FlaskConical size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1D2939]">Key Labs & Monitoring</h4>
              <p className="text-[11px] text-[#667085] mt-1 font-medium">Consolidates essential lab metrics, drug blood ranges, and serum values to monitor.</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#475569]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2C5F8D] animate-pulse" />
          To start, type a medication name in the sidebar or select a popular drug from the Quick Search list.
        </div>
      </div>
    );
  }

  // 2. Skeleton loading for previously viewed cards
  if (showSkeleton) {
    return (
      <div className="w-full mt-4">
        <SkeletonDrugCard />
      </div>
    );
  }

  // 3. Generating loading state for first-time cards
  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full p-6 text-center">
        {/* Shimmer layout preview */}
        <div className="w-full max-w-4xl bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm flex flex-col gap-6 animate-pulse mb-6 opacity-30 select-none pointer-events-none">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
          </div>
        </div>

        {/* Loader Panel */}
        <div className="absolute inset-0 bg-[#F8F9FA]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-10">
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-8 shadow-xl max-w-md w-full flex flex-col items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-linear-to-r from-[#2C5F8D] to-[#4A90E2] transition-all duration-300" style={{ width: `${progress}%` }} />
            
            <div className="w-16 h-16 bg-[#F0F7FC] rounded-2xl flex items-center justify-center text-[#2C5F8D] animate-spin duration-3000">
              <RefreshCw size={32} />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#1D2939] flex items-center justify-center gap-2">
                <Sparkles size={18} className="text-[#2C5F8D] animate-pulse" />
                Generating Drug Card
              </h3>
              <p className="text-xs font-semibold text-[#2C5F8D] tracking-wide uppercase h-4">
                {LOADING_STEPS[loadingStep]}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="w-full bg-[#F2F4F7] h-2 rounded-full overflow-hidden">
              <div className="bg-[#2C5F8D] h-full rounded-full transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-bold text-[#667085]">{progress}% Complete</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Final display state
  return (
    <div className="w-full flex flex-col gap-6" id="printable-drug-card">
      {/* Top Banner Card */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print-card">
        <div className="flex flex-col gap-2">
          {/* High Alert Warning */}
          {drug.isHighAlert && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-[#FEE4E2] text-[#D92D20] rounded-full w-fit border border-[#FECDCA]">
              <AlertCircle size={14} />
              HIGH-ALERT MEDICATION
            </span>
          )}
          
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-3xl font-extrabold text-[#1D2939] tracking-tight">{drug.genericName}</h1>
            {drug.brandNames && (
              <span className="text-base font-semibold text-[#667085]">
                ({drug.brandNames})
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            <span className="px-3 py-1 bg-[#F0F7FC] text-[#2C5F8D] text-xs font-bold rounded-lg border border-[#D0E0EE]">
              {drug.therapeuticClass}
            </span>
            <span className="px-3 py-1 bg-[#F2F4F7] text-[#475569] text-xs font-bold rounded-lg border border-[#E2E8F0]">
              {drug.pharmacologicClass}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 active:bg-red-100 text-[#D92D20] border border-[#FECDCA] hover:border-[#FCA5A5] rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer"
        >
          <XCircle size={16} />
          Clear Card
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
        {/* Mechanism of Action */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <Activity size={18} className="shrink-0" />
            Mechanism of Action
          </h3>
          <p className="text-xs font-medium leading-relaxed text-[#475569]">
            {drug.mechanismOfAction}
          </p>
        </div>

        {/* Key Labs to Monitor */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <FlaskConical size={18} className="shrink-0" />
            Key Labs to Monitor
          </h3>
          <p className="text-xs font-bold leading-relaxed text-[#1D2939] bg-[#F0F7FC] p-3 rounded-xl border border-[#D0E0EE]">
            {drug.keyLabs}
          </p>
        </div>

        {/* Indications */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <CheckSquare size={18} className="shrink-0" />
            Indications
          </h3>
          <ul className="flex flex-col gap-2 pl-1">
            {drug.indications.map((ind, i) => (
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
            {drug.contraindications.map((con, i) => (
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
            {/* Common Side Effects */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-xs font-bold text-[#475569] uppercase tracking-wider">Common Side Effects</h4>
              <ul className="flex flex-col gap-1.5">
                {drug.sideEffects.common.map((se, i) => (
                  <li key={i} className="text-xs font-medium text-[#475569] flex items-start gap-1.5">
                    <span className="text-[#94A3B8]">•</span>
                    <span>{se}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Life-Threatening Reactions */}
            <div className="bg-[#FFF1F0] border border-[#FCA5A5] p-4 rounded-xl flex flex-col gap-2">
              <h4 className="text-xs font-bold text-[#D92D20] uppercase tracking-wider">Life-Threatening / Severe</h4>
              <ul className="flex flex-col gap-1.5">
                {drug.sideEffects.lifeThreatening.map((lt, i) => (
                  <li key={i} className="text-xs font-bold text-[#B91C1C] flex items-start gap-1.5">
                    <span className="text-[#EF4444]">•</span>
                    <span>{lt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Nursing Considerations */}
        <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
          <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
            <ClipboardCheck size={18} className="shrink-0" />
            Nursing Considerations & Assessments
          </h3>
          <ul className="flex flex-col gap-2.5 pl-1">
            {drug.nursingConsiderations.map((consideration, i) => (
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
            {drug.patientTeaching.map((teach, i) => (
              <li key={i} className="text-xs font-medium text-[#344054] flex items-start gap-2">
                <span className="text-[#2C5F8D] font-bold mt-0.5">▪</span>
                <span>{teach}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Antidote */}
        {drug.antidote && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card md:col-span-2 print-full">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <Shield size={18} className="text-[#10B981] shrink-0" />
              Antidote & Reversal Agents
            </h3>
            <p className="text-xs font-bold text-[#065F46] bg-[#ECFDF5] p-3.5 rounded-xl border border-[#A7F3D0] inline-block">
              {drug.antidote}
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