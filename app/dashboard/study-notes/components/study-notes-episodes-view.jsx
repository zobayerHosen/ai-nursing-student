"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  Stethoscope,
  Users,
  Pill,
  Calculator,
  BedDouble,
  Activity,
  Droplets,
  HeartHandshake,
  Baby,
  Brain,
  Siren,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { useCoreLearning } from "@/hooks";

const ICON_PALETTE = [
  { icon: Stethoscope, bg: "bg-[#EBF5FF]", iconColor: "text-[#0284C7]" },
  { icon: Users, bg: "bg-[#E8F8F0]", iconColor: "text-[#059669]" },
  { icon: Pill, bg: "bg-[#F3E8FF]", iconColor: "text-[#7C3AED]" },
  { icon: Calculator, bg: "bg-[#FEF3C7]", iconColor: "text-[#D97706]" },
  { icon: BedDouble, bg: "bg-[#FCE7F3]", iconColor: "text-[#DB2777]" },
  { icon: Activity, bg: "bg-[#E0F2FE]", iconColor: "text-[#0284C7]" },
  { icon: Droplets, bg: "bg-[#E6FFFA]", iconColor: "text-[#0D9488]" },
  { icon: HeartHandshake, bg: "bg-[#FFE4E6]", iconColor: "text-[#E11D48]" },
  { icon: Baby, bg: "bg-[#FEF3C7]", iconColor: "text-[#B45309]" },
  { icon: Brain, bg: "bg-[#EDE9FE]", iconColor: "text-[#6366F1]" },
  { icon: Siren, bg: "bg-[#FEE2E2]", iconColor: "text-[#DC2626]" },
  { icon: Sparkles, bg: "bg-[#D1FAE5]", iconColor: "text-[#059669]" },
];

export default function StudyNotesEpisodesView({ onSelectCategory }) {
  const [limit, setLimit] = useState(20);
  const { coreLearningData, isLoading, coreLearningPagination, isFetching } =
    useCoreLearning("study_notes", { limit });

  const categories = useMemo(() => coreLearningData || [], [coreLearningData]);
  const hasMore = coreLearningPagination?.count > (coreLearningData?.length || 0);


  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const filteredEpisodes = useMemo(() => {
    let list = categories.filter((ep) =>
      (ep.title || "").toLowerCase().includes(searchQuery.toLowerCase().trim())
    );

    if (sortBy === "az") {
      list = [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "topics") {
      list = [...list].sort(
        (a, b) =>
          (b.progress?.total_contents ?? b.contents?.length ?? 0) -
          (a.progress?.total_contents ?? a.contents?.length ?? 0)
      );
    }
    return list;
  }, [categories, searchQuery, sortBy]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] w-full">
      {/* Top Header & Search / Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1B4B66] tracking-tight">
          Browse All Episodes
        </h2>

        <div className="flex items-center gap-2.5">
          {/* Filter button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 transition flex items-center gap-2 text-xs font-semibold cursor-pointer"
              title="Filter and Sort"
            >
              <SlidersHorizontal size={16} className="text-[#1B4B66]" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            {isFilterMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-150 p-2 z-20 animate-in fade-in zoom-in-95">
                <span className="block px-3 py-1 text-[10px] font-bold uppercase text-gray-400">
                  Sort By
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSortBy("default");
                    setIsFilterMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition cursor-pointer ${
                    sortBy === "default"
                      ? "bg-blue-50 text-[#1B4B66] font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Standard Order
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSortBy("az");
                    setIsFilterMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition cursor-pointer ${
                    sortBy === "az"
                      ? "bg-blue-50 text-[#1B4B66] font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Alphabetical (A - Z)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSortBy("topics");
                    setIsFilterMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition cursor-pointer ${
                    sortBy === "topics"
                      ? "bg-blue-50 text-[#1B4B66] font-bold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Most Topics
                </button>
              </div>
            )}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none text-gray-800 focus:border-[#1B4B66] focus:ring-1 focus:ring-[#1B4B66]/20 transition bg-white"
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-gray-500 font-medium">Loading episodes...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && categories.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B4B66] flex items-center justify-center mb-3">
            <BookOpen size={28} />
          </div>
          <h3 className="text-base font-bold text-[#1B4B66]">No Study Notes Available</h3>
          <p className="text-xs text-gray-500 max-w-sm mt-1">
            There are currently no study notes published in this section. Please check back later or explore other study tools.
          </p>
        </div>
      )}

      {/* Grid of Real Episode Cards */}
      {!isLoading && categories.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filteredEpisodes.map((episode, idx) => {
            const palette = ICON_PALETTE[idx % ICON_PALETTE.length];
            const IconComponent = palette.icon;
            const totalTopics =
              episode.progress?.total_contents ?? episode.contents?.length ?? 0;
            const completedTopics = episode.progress?.completed_contents ?? 0;

            return (
              <div
                key={episode.id}
                onClick={() => onSelectCategory(episode)}
                className="group bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 hover:border-[#1B4B66]/40 hover:shadow-md transition-all duration-200 flex items-start gap-4 cursor-pointer"
              >
                {/* Left colored square icon container / cover image */}
                <div
                  className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl ${palette.bg} shrink-0 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105`}
                >
                  {episode.cover ? (
                    <Image
                      src={
                        episode.cover.startsWith("http")
                          ? episode.cover
                          : `${process.env.NEXT_PUBLIC_BASE_URL || ""}${episode.cover}`
                      }
                      alt={episode.title}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <IconComponent
                      className={`w-7 h-7 ${palette.iconColor}`}
                      strokeWidth={1.75}
                    />
                  )}
                </div>

                {/* Right content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-[#1B4B66] group-hover:text-[#0D3043] transition-colors leading-snug truncate">
                    {episode.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    {totalTopics} Topics <span className="mx-1">•</span> {completedTopics} Completed
                  </p>

                  {/* View Notes Link */}
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#1B4B66] group-hover:text-blue-700 transition-colors">
                    <span>View Notes</span>
                    <ArrowRight
                      size={14}
                      className="transform transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {filteredEpisodes.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 text-sm">
              No nursing episodes match your search &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </div>
      )}

      {/* Pagination Load More */}
      {!isLoading && hasMore && (
        <div className="flex justify-center pt-6">
          <button
            type="button"
            onClick={() => setLimit((prev) => prev + 10)}
            disabled={isFetching}
            className="px-5 py-2.5 bg-[#1B4B66] hover:bg-[#14394E] text-white rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer disabled:opacity-50 shadow-xs"
          >
            {isFetching ? "Loading..." : "See More Episodes"}
          </button>
        </div>
      )}
    </div>
  );
}

