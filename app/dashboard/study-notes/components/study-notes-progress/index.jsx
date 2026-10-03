"use client";

import { useState, useMemo } from "react";
import CoverageDonutCard from "./coverage-donut-card";
import SummaryStatCard from "./summary-stat-card";
import StatusFilterPills from "./status-filter-pills";
import ProgressAreaCard from "./progress-area-card";
import {
  Award,
  Sparkles,
  TrendingUp,
  FileText,
  Bookmark,
} from "lucide-react";
import { useStudyNotesProgress } from "@/hooks";

function StudyNotesProgressSkeleton() {
  return (
    <div className="w-full flex flex-col gap-8 animate-pulse">
      {/* Top Metrics Section (Donut Chart + 4 Stat Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card: Donut Chart Skeleton */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/90 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-55">
          <div>
            <div className="w-32 h-6 bg-gray-200 rounded-lg mb-2" />
            <div className="w-24 h-3.5 bg-gray-100 rounded-md" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-6 my-auto">
            <div className="w-36 h-36 rounded-full bg-gray-100 border-12 border-gray-200 shrink-0" />
            <div className="space-y-4 w-full sm:w-auto">
              <div>
                <div className="w-28 h-4 bg-gray-200 rounded mb-1.5" />
                <div className="w-36 h-3 bg-gray-100 rounded" />
              </div>
              <div>
                <div className="w-28 h-4 bg-gray-200 rounded mb-1.5" />
                <div className="w-36 h-3 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Metric Stat Cards (2x2 Grid) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col items-center text-center justify-center min-h-35"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 mb-3" />
              <div className="w-20 h-3 bg-gray-200 rounded mb-2" />
              <div className="w-16 h-7 bg-gray-200 rounded mb-2" />
              <div className="w-28 h-2.5 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: "All nursing areas" */}
      <div className="space-y-4">
        {/* Header & Filter Controls Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="w-48 h-7 bg-gray-200 rounded-lg mb-2" />
            <div className="w-72 h-3.5 bg-gray-100 rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-20 h-7 rounded-full bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Responsive Grid of Nursing Areas Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between min-h-30"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gray-100 shrink-0" />
                    <div className="w-32 h-4 bg-gray-200 rounded" />
                  </div>
                  <div className="w-16 h-5 rounded-full bg-gray-100" />
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full mt-4" />
              </div>
              <div className="mt-3">
                <div className="w-32 h-3 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function StudyNotesProgressView({ onSelectArea }) {
  const { content_summary, isLoading } = useStudyNotesProgress();

  const {
    stat_cards,
    overview_card,
    filter_tabs = [],
    nursing_areas = [],
  } = content_summary || {};

  const {
    total_notes,
    completed,
    in_progress,
    bookmarked,
  } = stat_cards || {};

  const [activeFilter, setActiveFilter] = useState("all");

  // Filtered areas based on selected status pill
  const filteredAreas = useMemo(() => {
    if (!nursing_areas || !Array.isArray(nursing_areas)) return [];
    if (!activeFilter || activeFilter === "all") return nursing_areas;
    return nursing_areas.filter((area) => area.status === activeFilter);
  }, [nursing_areas, activeFilter]);

  if (isLoading) {
    return <StudyNotesProgressSkeleton />;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Top Metrics Section (Donut Chart + 4 Stat Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Card: Donut Chart */}
        <CoverageDonutCard overview_card={overview_card} />

        {/* Right 4 Metric Stat Cards (2x2 Grid) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SummaryStatCard
            label={total_notes?.title || "Total Notes"}
            value={total_notes?.formatted_count ?? total_notes?.count ?? 0}
            caption={total_notes?.subtext || "Across all nursing areas"}
            icon={FileText}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <SummaryStatCard
            label={completed?.title || "Completed"}
            value={completed?.formatted_count ?? completed?.count ?? 0}
            caption={
              completed?.subtext ||
              `${completed?.percentage_text || "0%"} of all notes`
            }
            icon={Award}
            iconClassName="bg-purple-50 text-purple-600"
          />

          <SummaryStatCard
            label={in_progress?.title || "InProgress"}
            value={in_progress?.formatted_count ?? in_progress?.count ?? 0}
            captionIcon={TrendingUp}
            captionText={`${in_progress?.percentage_text || "0%"} of all notes`}
            captionClassName="text-emerald-600"
            icon={Sparkles}
            iconClassName="bg-pink-50 text-pink-600"
          />

          <SummaryStatCard
            label={
              bookmarked?.title
                ? bookmarked.title.charAt(0).toUpperCase() +
                bookmarked.title.slice(1)
                : "Bookmarked"
            }
            value={bookmarked?.formatted_count ?? bookmarked?.count ?? 0}
            caption={bookmarked?.subtext || "You saved notes"}
            icon={Bookmark}
            iconClassName="bg-amber-50 text-amber-600"
          />
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
            filter_tabs={filter_tabs}
          />
        </div>

        {/* Responsive Grid of Nursing Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAreas.map((area) => (
            <ProgressAreaCard
              key={area.id}
              area={area}
              onSelect={onSelectArea}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
