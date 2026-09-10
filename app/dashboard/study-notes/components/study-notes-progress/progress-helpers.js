"use client"

/**
 * Pure data-mapping helpers for the Study Notes Progress view.
 * No React here — easy to unit-test in isolation.
 */

import { AREA_STATUS, ICON_CHOICES, AREA_FILTER_ITEMS } from "./constants";

/** Sum helper that folds category progress fields into the summary metrics. */
function accumulateCategoryProgress(cat, totals) {
  const catTotal = cat.progress?.total_contents ?? cat.contents?.length ?? 0;
  const catCompleted = cat.progress?.completed_contents ?? 0;

  if (!totals.hasSummaryTotal) totals.total += catTotal;
  if (!totals.hasSummaryCompleted) totals.completed += catCompleted;
  if (catCompleted > 0 && catCompleted < catTotal) totals.inProgress += 1;
}

/**
 * Compute the top summary metrics from raw API data.
 */
export function computeSummaryMetrics(categories, contentSummary) {
  const totals = categories.reduce(
    (acc, cat) => {
      accumulateCategoryProgress(cat, acc);
      return acc;
    },
    {
      total: contentSummary?.total_notes || 0,
      completed: contentSummary?.completed_notes || 0,
      inProgress: 0,
      hasSummaryTotal: Boolean(contentSummary?.total_notes),
      hasSummaryCompleted: Boolean(contentSummary?.completed_notes),
    }
  );

  const coverage =
    totals.total > 0
      ? Math.min(100, Math.round((totals.completed / totals.total) * 100))
      : contentSummary?.coverage_percentage || 0;

  const bookmarked =
    contentSummary?.bookmarked ||
    contentSummary?.saved ||
    contentSummary?.total_saved ||
    0;

  return {
    totalNotes: totals.total,
    completedNotes: totals.completed,
    inProgressCount: totals.inProgress,
    bookmarkedCount: bookmarked,
    coveragePercent: coverage,
    moduleCount: categories.length,
  };
}

/** Resolve an area's completion percent from its progress fields. */
function resolveAreaProgress(cat) {
  if (cat.progress?.progress_percentage !== undefined) {
    return parseInt(cat.progress.progress_percentage) || 0;
  }

  const total = cat.progress?.total_contents ?? cat.contents?.length ?? 0;
  const completed = cat.progress?.completed_contents ?? 0;
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

/** Derive a display status from the area's completion percent. */
function resolveAreaStatus(pct, total, completed) {
  if (pct >= 100 || (total > 0 && completed >= total)) {
    return AREA_STATUS.COMPLETE;
  }
  if (pct > 0 || completed > 0) {
    return AREA_STATUS.IN_PROGRESS;
  }
  return AREA_STATUS.NOT_STARTED;
}

/**
 * Map raw API categories to view-model area cards for the UI.
 */
export function mapAreasToProgressCards(categories) {
  return categories.map((cat, idx) => {
    const total = cat.progress?.total_contents ?? cat.contents?.length ?? 0;
    const completed = cat.progress?.completed_contents ?? 0;
    const pct = resolveAreaProgress(cat);
    const status = resolveAreaStatus(pct, total, completed);
    const style = ICON_CHOICES[idx % ICON_CHOICES.length];

    return {
      id: cat.id,
      title: cat.title,
      status,
      progress: pct,
      completedTopics: completed,
      totalTopics: total,
      icon: style.icon,
      iconBg: style.bg,
      iconColor: style.color,
      barColor: status === AREA_STATUS.COMPLETE ? "bg-[#10B981]" : "bg-[#1B4B66]",
      rawCategory: cat,
    };
  });
}

/** Filter mapped areas by the active filter pill id. */
export function filterAreasByStatus(mappedAreas, activeFilter) {
  const filterItem = AREA_FILTER_ITEMS?.find((f) => f.id === activeFilter);
  if (!filterItem?.match) return mappedAreas;

  return mappedAreas.filter((area) => area.status === filterItem.match);
}

/** Count of areas matching each filter pill (for the pill counters). */
export function countAreasPerFilter(mappedAreas) {
  return AREA_FILTER_ITEMS?.reduce((counts, filterItem) => {
    counts[filterItem.id] = filterItem.match
      ? mappedAreas.filter((area) => area.status === filterItem.match).length
      : mappedAreas.length;
    return counts;
  }, {});
}
