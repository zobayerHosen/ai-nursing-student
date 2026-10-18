"use client";

import React, { useMemo } from "react";
import {
  ArrowLeft,
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
  AlertCircle,
  Clock,
  Pill,
  Info,
} from "lucide-react";

/**
 * Normalizes drug card payload across diverse API responses
 * Handles:
 * - { data: { data: { card_data: { ... } } } }
 * - { data: { card_data: { ... } } }
 * - { card_data: { ... } }
 * - { card: { ... } }
 * - raw card object directly
 */
export function normalizeDrugCardData(raw) {
  if (!raw) return null;
  let current = raw;
  if (current?.data?.data) current = current.data.data;
  else if (current?.data) current = current.data;

  const card = current?.card_data || current?.card || current;
  if (!card) return null;

  return {
    ...current,
    ...card,
  };
}

export default function DrugCardView({
  data,
  onClear,
  onBack,
  actionButton,
  id = "printable-drug-card",
}) {
  const cardData = useMemo(() => normalizeDrugCardData(data), [data]);

  if (!cardData || (!cardData.drug_name && !cardData.generic_name && !cardData.genericName)) {
    return null;
  }

  // Basic Information
  const title =
    cardData.drug_name ||
    cardData.generic_name ||
    cardData.genericName ||
    cardData.medication?.generic_name ||
    cardData.medication?.name?.generic;

  const brands =
    cardData.brand_names ||
    cardData.trade_names ||
    cardData.brandNames ||
    cardData.medication?.trade_names ||
    cardData.medication?.name?.trade;

  const drugClass =
    cardData.drug_class ||
    cardData.drug_classification ||
    cardData.therapeuticClass ||
    cardData.medication?.drug_class;

  const pharmClass =
    cardData.pharmacologic_class ||
    cardData.pharmacologicClass ||
    null;

  const route =
    cardData.route_of_administration ||
    cardData.route ||
    null;

  const halfLife =
    cardData.half_life ||
    cardData.medication?.half_life ||
    null;

  const doseRouteTiming =
    cardData.dose_route_timing ||
    cardData.dose_route_times ||
    cardData.medication?.dose_route_timing ||
    null;

  const pregnancy =
    cardData.pregnancy_category ||
    cardData.pregnancyCategory ||
    null;

  const bbw =
    cardData.black_box_warning ||
    cardData.blackBoxWarning ||
    null;

  const isHighAlert =
    cardData.is_high_alert ||
    cardData.isHighAlert ||
    Boolean(bbw && bbw.trim().length > 0);

  // Mechanisms & Indications
  const moa =
    cardData.mechanism_of_action ||
    cardData.mechanismOfAction ||
    cardData.medication?.mechanism_of_action;

  const indications = Array.isArray(cardData.indications)
    ? cardData.indications
    : cardData.medication?.indications || [];

  const contraindications = Array.isArray(cardData.contraindications)
    ? cardData.contraindications
    : cardData.medication?.contraindications || [];

  const warnings = Array.isArray(cardData.warnings_and_precautions)
    ? cardData.warnings_and_precautions
    : Array.isArray(cardData.warnings)
    ? cardData.warnings
    : cardData.medication?.warnings || [];

  // Side Effects & Adverse Reactions
  let commonSideEffects = [];
  let severeSideEffects =
    cardData.serious_adverse_effects ||
    cardData.all_adverse_reactions ||
    cardData.adverse_reactions ||
    cardData.medication?.adverse_reactions ||
    [];

  const apiSideEffects = cardData.side_effects;
  if (apiSideEffects && Array.isArray(apiSideEffects)) {
    commonSideEffects = apiSideEffects.map((se) =>
      typeof se === "object"
        ? `${se.system ? `${se.system}: ` : ""}${se.effects || ""}`
        : se
    );
  } else if (Array.isArray(cardData.common_side_effects)) {
    commonSideEffects = cardData.common_side_effects;
  } else if (cardData.sideEffects?.common) {
    commonSideEffects = cardData.sideEffects.common;
    if (severeSideEffects.length === 0) {
      severeSideEffects = cardData.sideEffects.lifeThreatening || [];
    }
  }

  // Dosage Guide
  const dosageGuide = cardData.dosage_guide;
  const dosageAdult =
    dosageGuide?.adults ||
    cardData.dosage_adult ||
    (typeof dosageGuide === "string" ? dosageGuide : null);

  const dosagePediatric =
    dosageGuide?.pediatrics ||
    cardData.dosage_pediatric ||
    null;

  const dosageSubtitle =
    dosageGuide?.subtitle ||
    null;

  // Antidote & Reversal Agents
  const antidoteReversal = cardData.antidote_reversal;
  const antidoteTitle =
    antidoteReversal?.title || "Antidote & Reversal Agents";

  const antidoteAgent =
    antidoteReversal?.agent ||
    cardData.antidote ||
    (typeof antidoteReversal === "string" ? antidoteReversal : null);

  const antidoteFooterNote =
    antidoteReversal?.footer_note ||
    null;

  // Assessment & Monitoring
  const assessment =
    cardData.assessment_before_administration ||
    cardData.assessments_prior_to_administration ||
    cardData.assessments_needed_prior_to_administration ||
    [];

  const monitoring =
    cardData.monitoring_during_therapy ||
    [];

  // Nursing Considerations & Teaching
  const nursingCons =
    cardData.nursing_considerations ||
    cardData.nursingConsiderations ||
    [];

  const patientEd =
    cardData.patient_education ||
    cardData.patientTeaching ||
    [];

  // Expected Outcomes
  const expectedOutcomes = Array.isArray(cardData.expected_outcomes)
    ? cardData.expected_outcomes
    : [];

  // Nursing Diagnoses
  const nursingDiagnoses = Array.isArray(cardData.nursing_diagnoses)
    ? cardData.nursing_diagnoses
    : [];

  // NCLEX Pearls, Tips, Memory Tricks
  const clinicalTips = cardData.clinical_tips || [];
  const pearls = cardData.nclex_pearls || [];
  const trick = cardData.memory_trick || cardData.memoryTrick || null;
  const keyLabs = cardData.keyLabs || null;

  return (
    <div className="w-full flex flex-col gap-6" id={id}>
      {/* Optional Back Button */}
      {onBack && (
        <div className="flex items-center">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#2C5F8D] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to Drug Cards
          </button>
        </div>
      )}

      {/* Top Banner Card */}
      <div className="bg-white border border-[#E4E7EC] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print-card relative overflow-hidden">
        {/* Background Decorator */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-[#F0F7FC] to-transparent rounded-bl-full opacity-50 pointer-events-none" />

        <div className="flex flex-col gap-3 z-10 w-full">
          {/* Badges / Pill Tags */}
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
            {halfLife && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] rounded-full w-fit border border-[#DBEAFE]">
                <Clock size={13} /> Half-life: {halfLife}
              </span>
            )}
          </div>

          {/* Title & Brand Names */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-3xl font-extrabold text-[#1D2939] tracking-tight">
              {title}
            </h1>
            {brands && (
              <span className="text-base font-semibold text-[#667085]">
                ({brands})
              </span>
            )}
          </div>

          {/* Classifications */}
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

          {/* Black Box Warning */}
          {bbw && (
            <div className="mt-2 p-3 bg-[#FFF1F0] border border-[#FCA5A5] rounded-xl flex gap-3 items-start">
              <AlertTriangle size={16} className="text-[#D92D20] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#D92D20] uppercase tracking-wider">
                  Black Box Warning
                </h4>
                <p className="text-xs font-medium text-[#B91C1C] mt-1 leading-relaxed">
                  {bbw}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button: Clear or Custom */}
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 active:bg-red-100 text-[#D92D20] border border-[#FECDCA] hover:border-[#FCA5A5] rounded-xl text-sm font-semibold transition-all shadow-sm cursor-pointer shrink-0 z-10"
          >
            <XCircle size={16} />
            Clear Card
          </button>
        )}
        {actionButton}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
        {/* 1. Mechanism of Action */}
        {moa && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card md:col-span-2">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <Activity size={18} className="shrink-0" />
              Mechanism of Action
            </h3>
            <p className="text-sm font-medium leading-relaxed text-[#475569]">
              {moa}
            </p>
          </div>
        )}

        {/* 2. Dosage & Administration Guide */}
        {(dosageAdult || dosagePediatric || doseRouteTiming || dosageSubtitle) && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 md:col-span-2 print-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2F4F7] pb-2.5">
              <h3 className="text-sm font-bold flex items-center gap-2 text-[#2C5F8D]">
                <Pill size={18} className="shrink-0 text-[#2C5F8D]" />
                Dosage &amp; Administration Guide
              </h3>
              {doseRouteTiming && (
                <span className="text-xs font-semibold px-2.5 py-1 bg-[#F0F7FC] text-[#2C5F8D] rounded-lg border border-[#D0E0EE] w-fit">
                  Standard: {doseRouteTiming}
                </span>
              )}
            </div>

            {dosageSubtitle && (
              <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs text-[#64748B] flex items-center gap-2 font-medium">
                <Info size={14} className="text-[#2C5F8D] shrink-0" />
                <span>{dosageSubtitle}</span>
              </div>
            )}

            <div
              className={`grid grid-cols-1 ${
                dosageAdult && dosagePediatric ? "md:grid-cols-2" : ""
              } gap-4 mt-1`}
            >
              {dosageAdult && (
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-[#1D2939] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2C5F8D]" />
                    Adult Regimens
                  </h4>
                  <p className="text-xs font-medium text-[#344054] leading-relaxed whitespace-pre-line">
                    {dosageAdult}
                  </p>
                </div>
              )}

              {dosagePediatric && (
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-[#1D2939] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                    Pediatric Regimens
                  </h4>
                  <p className="text-xs font-medium text-[#344054] leading-relaxed whitespace-pre-line">
                    {dosagePediatric}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Indications */}
        {indications.length > 0 && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <CheckSquare size={18} className="shrink-0" />
              Indications
            </h3>
            <ul className="flex flex-col gap-2 pl-1">
              {indications.map((ind, i) => (
                <li
                  key={i}
                  className="text-xs font-medium text-[#475569] flex items-start gap-2"
                >
                  <span className="text-[#2C5F8D] mt-0.5">•</span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. Contraindications & Precautions */}
        {(contraindications.length > 0 || warnings.length > 0) && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <AlertTriangle size={18} className="text-[#D97706] shrink-0" />
              Contraindications &amp; Precautions
            </h3>
            {contraindications.length > 0 && (
              <ul className="flex flex-col gap-2 pl-1">
                {contraindications.map((con, i) => (
                  <li
                    key={i}
                    className="text-xs font-medium text-[#475569] flex items-start gap-2"
                  >
                    <span className="text-[#D97706] mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            )}

            {warnings.length > 0 && (
              <div className="mt-2 pt-2.5 border-t border-[#F2F4F7] space-y-2">
                <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                  Warnings &amp; Precautions
                </h4>
                <ul className="flex flex-col gap-1.5 pl-1">
                  {warnings.map((warn, i) => (
                    <li
                      key={`warn-${i}`}
                      className="text-xs font-medium text-[#78350F] flex items-start gap-2"
                    >
                      <span className="text-[#D97706] mt-0.5">⚠</span>
                      <span>{warn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* 5. Side Effects & Adverse Reactions */}
        {(commonSideEffects.length > 0 || severeSideEffects.length > 0) && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-4 print-card md:col-span-2 print-full">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <HeartOff size={18} className="text-[#D92D20] shrink-0" />
              Side Effects &amp; Adverse Reactions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl flex flex-col gap-2">
                <h4 className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Common Side Effects
                </h4>
                {commonSideEffects.length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {commonSideEffects.map((se, i) => (
                      <li
                        key={i}
                        className="text-xs font-medium text-[#475569] flex items-start gap-1.5"
                      >
                        <span className="text-[#94A3B8]">•</span>
                        <span>{se}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#94A3B8]">None reported</p>
                )}
              </div>

              <div className="bg-[#FFF1F0] border border-[#FCA5A5] p-4 rounded-xl flex flex-col gap-2">
                <h4 className="text-xs font-bold text-[#D92D20] uppercase tracking-wider">
                  Life-Threatening / Severe
                </h4>
                {severeSideEffects.length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {severeSideEffects.map((lt, i) => (
                      <li
                        key={i}
                        className="text-xs font-bold text-[#B91C1C] flex items-start gap-1.5"
                      >
                        <span className="text-[#EF4444]">•</span>
                        <span>{lt}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#94A3B8]">None reported</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 6. Assessment & Monitoring */}
        {(assessment.length > 0 || monitoring.length > 0) && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-4 print-card md:col-span-2">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <Activity size={18} className="shrink-0" />
              Assessment &amp; Monitoring
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessment.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-[#344054] uppercase tracking-wider bg-[#F9FAFB] p-2 rounded-lg inline-block w-fit">
                    Before Administration
                  </h4>
                  <ul className="flex flex-col gap-2 pl-1 mt-1">
                    {assessment.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs font-medium text-[#475569] flex items-start gap-2"
                      >
                        <span className="text-[#2C5F8D] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {monitoring.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-bold text-[#344054] uppercase tracking-wider bg-[#F9FAFB] p-2 rounded-lg inline-block w-fit">
                    During Therapy
                  </h4>
                  <ul className="flex flex-col gap-2 pl-1 mt-1">
                    {monitoring.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs font-medium text-[#475569] flex items-start gap-2"
                      >
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

        {/* 7. Key Labs */}
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

        {/* 8. Nursing Considerations */}
        {nursingCons.length > 0 && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <ClipboardCheck size={18} className="shrink-0" />
              Nursing Considerations
            </h3>
            <ul className="flex flex-col gap-2.5 pl-1">
              {nursingCons.map((consideration, i) => (
                <li
                  key={i}
                  className="text-xs font-medium text-[#344054] flex items-start gap-2"
                >
                  <span className="text-[#2C5F8D] font-bold mt-0.5">✓</span>
                  <span>{consideration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 9. Patient & Family Teaching */}
        {patientEd.length > 0 && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 print-card">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <GraduationCap size={18} className="shrink-0" />
              Patient &amp; Family Teaching
            </h3>
            <ul className="flex flex-col gap-2.5 pl-1">
              {patientEd.map((teach, i) => (
                <li
                  key={i}
                  className="text-xs font-medium text-[#344054] flex items-start gap-2"
                >
                  <span className="text-[#2C5F8D] font-bold mt-0.5">▪</span>
                  <span>{teach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 10. Expected Client Outcomes */}
        {expectedOutcomes.length > 0 && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 md:col-span-2 print-card">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <CheckSquare size={18} className="text-[#10B981] shrink-0" />
              Expected Therapeutic Outcomes
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pl-1">
              {expectedOutcomes.map((outcome, i) => (
                <li
                  key={i}
                  className="text-xs font-medium text-[#344054] flex items-start gap-2"
                >
                  <span className="text-[#10B981] font-bold mt-0.5">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 11. Priority Nursing Diagnoses */}
        {nursingDiagnoses.length > 0 && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3 md:col-span-2 print-card">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <ClipboardCheck size={18} className="text-[#7C3AED] shrink-0" />
              Nursing Diagnoses &amp; Interventions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nursingDiagnoses.map((nd, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF5FF] border border-[#E9D5FF] p-4 rounded-xl flex flex-col gap-2"
                >
                  <h4 className="text-xs font-bold text-[#6D28D9] leading-snug">
                    {nd.diagnosis}
                  </h4>
                  {Array.isArray(nd.interventions) && nd.interventions.length > 0 && (
                    <div className="mt-1 space-y-1">
                      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                        Interventions:
                      </span>
                      <ul className="space-y-1 pl-1">
                        {nd.interventions.slice(0, 4).map((inv, i) => (
                          <li
                            key={i}
                            className="text-xs text-[#334155] flex items-start gap-1.5"
                          >
                            <span className="text-[#7C3AED] mt-0.5">•</span>
                            <span>{inv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 12. Clinical Tips & NCLEX Pearls */}
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
                      <li
                        key={i}
                        className="text-xs font-medium text-[#344054] flex items-start gap-2"
                      >
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
                      <li
                        key={i}
                        className="text-xs font-medium text-[#344054] flex items-start gap-2"
                      >
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

        {/* 13. Memory Trick */}
        {trick && (
          <div className="bg-linear-to-r from-[#F0F7FC] to-white border border-[#D0E0EE] rounded-2xl p-5 shadow-sm flex flex-col gap-2 print-card md:col-span-2">
            <h3 className="text-xs font-bold flex items-center gap-2 text-[#2C5F8D] uppercase tracking-wider">
              <Sparkles size={14} className="shrink-0" />
              Memory Trick
            </h3>
            <p className="text-sm font-medium leading-relaxed text-[#1D2939] italic">
              &quot;{trick}&quot;
            </p>
          </div>
        )}

        {/* 14. Antidote & Reversal Agents */}
        {(antidoteAgent || antidoteFooterNote) && (
          <div className="bg-white border border-[#E4E7EC] rounded-2xl p-5 shadow-sm flex flex-col gap-3.5 print-card md:col-span-2 print-full">
            <h3 className="text-sm font-bold flex items-center gap-2 border-b border-[#F2F4F7] pb-2.5 text-[#2C5F8D]">
              <Shield size={18} className="text-[#10B981] shrink-0" />
              {antidoteTitle}
            </h3>

            {antidoteAgent && (
              <div className="p-3.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl flex items-start gap-2.5">
                <Shield size={16} className="text-success shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-[#065F46] leading-relaxed">
                  {antidoteAgent}
                </p>
              </div>
            )}

            {antidoteFooterNote && (
              <div className="flex items-start gap-2.5 p-3 bg-[#FFFBEB] border border-[#FDE68A] rounded-xl text-xs text-[#92400E]">
                <AlertTriangle size={15} className="text-[#D97706] shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">
                  {antidoteFooterNote}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export { DrugCardView };
