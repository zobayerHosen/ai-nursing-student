"use client";

export default function PerformanceAnalytics({ result = {} }) {
  const readinessLevel = result.readiness_level || "Developing";
  const readinessTier = result.readiness_tier || "low";
  const readinessDesc =
    result.readiness_description ||
    "Review foundational nursing concepts, clinical judgment models, and pharmacology.";

  const strengths = result.strengths || [];
  const areasToImprove = result.areas_to_improve || [];
  const bodySystems = result.body_system_performance || [];
  const clientNeeds = result.client_needs_performance || [];
  const clinicalJudgment = result.clinical_judgment_performance || [];

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      {/* ─── READINESS SUMMARY BANNER ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f1f5f9]">
          <div>
            <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">
              NCLEX Readiness Assessment
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] mt-0.5">
              Readiness Level: <span className="text-[#1E3A5F]">{readinessLevel}</span>
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe] text-xs font-bold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
            Tier: {readinessTier.toUpperCase()}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pt-3.5">
          {readinessDesc}
        </p>
      </div>

      {/* ─── STRENGTHS & AREAS TO IMPROVE GRID ─────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths Card */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#f1f5f9]">
            <div className="w-8 h-8 rounded-lg bg-[#dcfce7] text-[#16a34a] flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-[#0f172a] text-sm sm:text-base">
                Key Strengths
              </h4>
              <p className="text-[11px] text-[#64748b]">
                Categories where you performed highest
              </p>
            </div>
          </div>

          {strengths.length === 0 ? (
            <div className="text-xs text-[#94a3b8] italic py-4 text-center">
              No specific strengths recorded yet.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {strengths.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-xs sm:text-[13px] text-[#166534] block truncate">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-[#15803d]">
                      {item.total_questions} question{item.total_questions > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-black text-[#15803d]">
                      {Math.round(item.score_percentage)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Areas to Improve Card */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs flex flex-col">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#f1f5f9]">
            <div className="w-8 h-8 rounded-lg bg-[#fff1f2] text-[#e11d48] flex items-center justify-center text-sm font-bold">
              ▲
            </div>
            <div>
              <h4 className="font-bold text-[#0f172a] text-sm sm:text-base">
                Areas to Improve
              </h4>
              <p className="text-[11px] text-[#64748b]">
                Priority focus areas for practice
              </p>
            </div>
          </div>

          {areasToImprove.length === 0 ? (
            <div className="text-xs text-[#94a3b8] italic py-4 text-center">
              No critical weak areas identified!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {areasToImprove.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#fff5f5] border border-[#fecdd3] flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-xs sm:text-[13px] text-[#9f1239] truncate">
                      {item.category}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#e11d48] shrink-0">
                      {Math.round(item.score_percentage)}%
                    </span>
                  </div>

                  {item.recommendation && (
                    <p className="text-[11px] text-[#881337] leading-relaxed">
                      💡 {item.recommendation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── DETAILED PERFORMANCE BREAKDOWN ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Body Systems */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs">
          <h4 className="font-bold text-sm text-[#0f172a] mb-3 pb-2 border-b border-[#f1f5f9]">
            Body System Performance
          </h4>
          <div className="flex flex-col gap-3">
            {bodySystems.map((item, i) => (
              <div key={i} className="text-xs">
                <div className="flex justify-between font-semibold text-[#1e293b] mb-1">
                  <span className="truncate max-w-[170px]">{item.name}</span>
                  <span className="shrink-0">{Math.round(item.score_percentage)}%</span>
                </div>
                <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1E3A5F] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, item.score_percentage))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Needs */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs">
          <h4 className="font-bold text-sm text-[#0f172a] mb-3 pb-2 border-b border-[#f1f5f9]">
            Client Needs Performance
          </h4>
          <div className="flex flex-col gap-3">
            {clientNeeds.map((item, i) => (
              <div key={i} className="text-xs">
                <div className="flex justify-between font-semibold text-[#1e293b] mb-1">
                  <span className="truncate max-w-[170px]">{item.name}</span>
                  <span className="shrink-0">{Math.round(item.score_percentage)}%</span>
                </div>
                <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#fe5e7e] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, item.score_percentage))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Judgment / CJMM */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 shadow-xs">
          <h4 className="font-bold text-sm text-[#0f172a] mb-3 pb-2 border-b border-[#f1f5f9]">
            Clinical Judgment (CJMM)
          </h4>
          <div className="flex flex-col gap-3">
            {clinicalJudgment.map((item, i) => (
              <div key={i} className="text-xs">
                <div className="flex justify-between font-semibold text-[#1e293b] mb-1">
                  <span className="truncate max-w-[170px]">{item.name}</span>
                  <span className="shrink-0">{Math.round(item.score_percentage)}%</span>
                </div>
                <div className="w-full h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#16a34a] rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, item.score_percentage))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
