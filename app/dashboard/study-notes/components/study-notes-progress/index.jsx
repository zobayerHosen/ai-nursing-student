"use client";

import { useMemo, useState } from "react";
import { useCoreLearning, useStudyNotesProgress } from "@/hooks";
import CoverageDonutCard from "./coverage-donut-card";
import SummaryStatCard from "./summary-stat-card";
import StatusFilterPills from "./status-filter-pills";
import ProgressAreaCard from "./progress-area-card";
import { AreasLoadingState, AreasEmptyState } from "./states";
import { SUMMARY_STAT_CARDS } from "./constants";
import {
  computeSummaryMetrics,
  mapAreasToProgressCards,
  filterAreasByStatus,
  countAreasPerFilter,
} from "./progress-helpers";
import { AREA_FILTERS } from "./constants";

/**
 * "My Progress" view.
 * Orchestrates data fetching + derived state, and composes the
 * summary (donut + stat cards) and nursing-areas sections.
 */
export default function StudyNotesProgressView({ onSelectArea }) {
  const { coreLearningData, isLoading: isCoreLoading } = useCoreLearning(
    "study_notes",
    { limit: 50 }
  );
  const { content_summary, isLoading: isProgressLoading } = useStudyNotesProgress();

  const isLoading = isCoreLoading || isProgressLoading;
  const categories = useMemo(() => coreLearningData || [], [coreLearningData]);

  const [activeFilter, setActiveFilter] = useState(AREA_FILTERS.ALL);

  /* ----------------------------- Derived state ----------------------------- */

  const summaryMetrics = useMemo(
    () => computeSummaryMetrics(categories, content_summary),
    [categories, content_summary]
  );

  const mappedAreas = useMemo(
    () => mapAreasToProgressCards(categories),
    [categories]
  );

  const filterCounts = useMemo(
    () => countAreasPerFilter(mappedAreas),
    [mappedAreas]
  );

  const filteredAreas = useMemo(
    () => filterAreasByStatus(mappedAreas, activeFilter),
    [mappedAreas, activeFilter]
  );

  /* ------------------------------- Handlers -------------------------------- */

  const handleSelectArea = (area) => {
    onSelectArea?.(area.rawCategory || area);
  };

  /* -------------------------------- Render --------------------------------- */

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Top Metrics Section (Donut Chart + 4 Stat Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card: Donut Chart */}
        <CoverageDonutCard
          coveragePercent={summaryMetrics.coveragePercent}
          completedNotes={summaryMetrics.completedNotes}
          totalNotes={summaryMetrics.totalNotes}
          moduleCount={summaryMetrics.moduleCount}
        />

        {/* Right 4 Metric Stat Cards (2x2 Grid) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUMMARY_STAT_CARDS.map((card) => (
            <SummaryStatCard
              key={card.id}
              label={card.label}
              value={
                typeof summaryMetrics[card.value] === "number"
                  ? summaryMetrics[card.value].toLocaleString()
                  : summaryMetrics[card.value]
              }
              caption={card.caption?.replace(
                "coveragePercent",
                summaryMetrics.coveragePercent
              )}
              captionIcon={card.captionIcon}
              captionText={card.captionText}
              captionClassName={card.captionClassName}
              icon={card.icon}
              iconClassName={card.iconClassName}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section: "All nursing areas" */}
      <div className="space-y-4">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B4B66]">
              All nursing areas
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Mark a topic complete when you&rsquo;ve absorbed it - Filter by status
            </p>
          </div>

          {/* Status Filter Pills */}
          <StatusFilterPills
            activeFilter={activeFilter}
            onChange={setActiveFilter}
            counts={filterCounts}
          />
        </div>

        {/* Loading */}
        {isLoading && <AreasLoadingState />}

        {/* Empty state */}
        {!isLoading && mappedAreas.length === 0 && <AreasEmptyState />}

        {/* Responsive Grid of Nursing Areas */}
        {!isLoading && filteredAreas.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAreas.map((area) => (
              <ProgressAreaCard
                key={area.id}
                area={area}
                onSelect={handleSelectArea}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
