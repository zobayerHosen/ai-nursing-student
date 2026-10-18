"use client";

import React, { useState } from "react";
import { Clock, BarChart3, CheckCircle2, FileText, Download } from "lucide-react";
import toast from "react-hot-toast";

export default function VideoLessonTabbedContent({
  details,
  aboutText: propAboutText,
  durationText: propDurationText,
  difficultyText: propDifficultyText,
  whatYouLearn: propWhatYouLearn,
  resources: propResources,
}) {
  const [activeTab, setActiveTab] = useState("Overview"); // "Overview" | "Resources"

  const aboutText =
    propAboutText ||
    details?.overview_data?.about ||
    details?.description ||
    "No overview available for this lesson.";

  const durationText =
    propDurationText ||
    details?.overview_data?.duration_formatted ||
    details?.overview_data?.duration ||
    details?.duration_formatted ||
    details?.duration ||
    "00:00";

  const difficultyText =
    propDifficultyText ||
    details?.overview_data?.difficulty_level ||
    "Beginner";

  const whatYouLearn =
    propWhatYouLearn ||
    (Array.isArray(details?.overview_data?.what_you_will_learn)
      ? details.overview_data.what_you_will_learn
      : []);

  const resources =
    propResources ??
    (Array.isArray(details?.resources) ? details.resources : []);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#e5e9f0] p-5 sm:p-7 shadow-xs">
      {/* Tab Navigation */}
      <div className="flex items-center gap-8 border-b border-[#f1f5f9] -mt-1 pb-3 mb-5 sm:mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("Overview")}
          className={`text-sm sm:text-[15px] font-bold pb-2 transition-all cursor-pointer relative ${
            activeTab === "Overview"
              ? "text-[#0f172a] border-b-2 border-[#1e3a5f]"
              : "text-[#64748b] hover:text-[#0f172a]"
          }`}
        >
          Overview
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("Resources")}
          className={`text-sm sm:text-[15px] font-bold pb-2 transition-all cursor-pointer relative ${
            activeTab === "Resources"
              ? "text-[#0f172a] border-b-2 border-[#1e3a5f]"
              : "text-[#64748b] hover:text-[#0f172a]"
          }`}
        >
          Resources {resources.length > 0 ? `(${resources.length})` : ""}
        </button>
      </div>

      {activeTab === "Overview" ? (
        <div className="flex flex-col gap-6">
          {/* About This Lesson */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-2">
              About this lesson
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed whitespace-pre-line">
              {aboutText}
            </p>
          </div>

          {/* 2 Metric Boxes: Duration & Difficulty Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Duration Box */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] shrink-0 shadow-2xs">
                <Clock className="w-5 h-5 text-[#64748b]" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#0f172a] block leading-tight">
                  {durationText}
                </span>
                <span className="text-xs text-[#64748b]">Duration</span>
              </div>
            </div>

            {/* Difficulty Box */}
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center text-[#64748b] shrink-0 shadow-2xs">
                <BarChart3 className="w-5 h-5 text-[#64748b]" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold text-[#0f172a] block leading-tight">
                  {difficultyText}
                </span>
                <span className="text-xs text-[#64748b]">Difficulty Level</span>
              </div>
            </div>
          </div>

          {/* What You'll Learn */}
          {whatYouLearn.length > 0 && (
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-3">
                What you&apos;ll learn
              </h3>
              <div className="space-y-2.5">
                {whatYouLearn.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#334155]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-info shrink-0 mt-0.5" />
                    <span className="leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Resources Tab */
        <div className="flex flex-col gap-4">
          <h3 className="text-sm sm:text-base font-bold text-[#0f172a] mb-1">
            Lesson Handouts & Guides
          </h3>
          {resources.length > 0 ? (
            <div className="space-y-3">
              {resources.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1e3a5f] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-info" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-[#0f172a] truncate">
                        {item.name || item.title || "Lesson Resource"}
                      </h4>
                      <span className="text-[11px] text-[#64748b]">
                        {item.type || "Document"} {item.size ? `• ${item.size}` : ""}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      toast.success(`Downloading ${item.name || "resource"}`)
                    }
                    className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-[#1e3a5f] transition-colors cursor-pointer"
                    title="Download resource"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-gray-50/70 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1e3a5f] flex items-center justify-center mb-2">
                <FileText className="w-5 h-5 text-info" />
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-[#0f172a]">
                No downloadable resources
              </h4>
              <p className="text-[11px] sm:text-xs text-[#64748b] mt-0.5 max-w-xs">
                There are currently no additional guides or handouts attached to this lesson.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { VideoLessonTabbedContent };
