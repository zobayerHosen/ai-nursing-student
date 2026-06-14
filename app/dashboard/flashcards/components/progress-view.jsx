"use client";
import { useGetFlashcardProgress } from "@/hooks/flashcards";
import { BookOpen, TrendingUp, Target, CheckCircle, AlertCircle, BarChart3, Loader2 } from "lucide-react";

const ProgressView = () => {
  const { categories, overall, isLoading, isError } = useGetFlashcardProgress();

  const accuracy = overall?.reviewed_cards > 0
    ? Math.round((overall.easy / overall.reviewed_cards) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-gray-500 font-medium">Loading progress data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-3">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <p className="text-gray-600 font-medium">Failed to load progress data</p>
          <p className="text-sm text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  // Note: UI
  return (
    <div className="w-full">
      {/* header */}
      <div className="flex flex-col mb-10">
        <h2 className="text-2xl font-bold text-[#1E293B]">Progress</h2>
        <p className="text-gray-500 mt-1">Track your flashcard study progress across all nursing subjects</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-xl border border-gray-100 p-4 2xl:p-6 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium">Cards Reviewed</span>
            <BookOpen className="text-gray-300 w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-[#1E293B]">
              {overall?.reviewed_cards ?? 0} / {overall?.total_cards ?? 0}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                style={{
                  width: `${overall?.total_cards > 0 ? (overall.reviewed_cards / overall.total_cards) * 100 : 0}%`
                }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              {overall?.progress ?? "0/0"}
            </span>
          </div>
        </div>

        {/* Accuracy */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 2xl:p-6 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium">Accuracy</span>
            <TrendingUp className="text-gray-300 w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-[#1E293B]">{overall?.percentage ?? "0"}</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${parseFloat(overall?.percentage ?? "0")}%`,
                  backgroundColor: parseFloat(overall?.percentage ?? "0") >= 70
                    ? "#22C55E"
                    : parseFloat(overall?.percentage ?? "0") >= 40
                      ? "#F59E0B"
                      : "#EF4444"
                }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              {accuracy >= 70 ? "Good" : accuracy >= 40 ? "Fair" : "Needs work"}
            </span>
          </div>
        </div>

        {/* Easy */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 2xl:p-6 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium">Easy</span>
            <CheckCircle className="text-gray-300 w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-[#22C55E]">{overall?.easy ?? 0}</h3>
            <span className="text-sm text-gray-400">cards</span>
          </div>
          <span className="text-xs text-gray-500">Answered correctly on first try</span>
        </div>

        {/* hard */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 2xl:p-6 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-gray-500 font-medium">Hard</span>
            <AlertCircle className="text-gray-300 w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <h3 className="text-3xl font-bold text-[#F59E0B]">{overall?.hard ?? 0}</h3>
            <span className="text-sm text-gray-400">cards</span>
          </div>
          <span className="text-xs text-gray-500">Needs more practice</span>
        </div>
      </div>

      {/* Progress by Category */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1E293B]">Progress by Category</h2>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            Easy
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            Hard
          </span>
        </div>
      </div>

      {categories?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories?.map((category, index) => {
            const categoryAccuracy = category.total_cards > 0
              ? Math.round((category.easy / category.total_cards) * 100)
              : 0;

            return (
              <div key={category.category_id ?? index} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-[#424242] font-semibold text-sm leading-tight pr-2">
                    {category?.category_name ?? ""}
                  </h3>
                  <span className="text-lg font-bold text-[#1E293B] leading-none shrink-0">
                    {categoryAccuracy}%
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reviewed</span>
                    <span className="text-sm font-semibold text-[#424242]">
                      {category?.reviewed_cards ?? 0}/{category?.total_cards ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    <span className="text-xs text-gray-500">{category?.easy ?? 0}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span className="text-xs text-gray-500">{category?.hard ?? 0}</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden flex">
                  <div
                    className="h-full rounded-l-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${category?.total_cards > 0 ? (category.easy / category.total_cards) * 100 : 0}%`,
                      backgroundColor: "#22C55E"
                    }}
                  />
                  <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${category?.total_cards > 0 ? (category.hard / category.total_cards) * 100 : 0}%`,
                      backgroundColor: "#F59E0B"
                    }}
                  />
                </div>

                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {category?.progress ?? ""}
                  </span>
                  {categoryAccuracy >= 80 ? (
                    <span className="text-[10px] font-semibold text-[#22C55E] uppercase tracking-wider">Proficient</span>
                  ) : categoryAccuracy >= 50 ? (
                    <span className="text-[10px] font-semibold text-[#F59E0B] uppercase tracking-wider">Learning</span>
                  ) : category?.total_cards > 0 ? (
                    <span className="text-[10px] font-semibold text-[#EF4444] uppercase tracking-wider">Needs Review</span>
                  ) : (
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Not Started</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <BarChart3 className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-[#424242] mb-1">No progress data yet</h3>
          <p className="text-sm text-gray-400">Start studying flashcards to see your progress here</p>
        </div>
      )}
    </div>
  );
};

export default ProgressView;
