"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Stethoscope,
  Users,
  Heart,
  Wind,
  Pill,
  Calculator,
  Activity,
  Droplets,
  Baby,
  Brain,
  Play,
  Menu,
  ChevronDown,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import ConfigureModal from "../../nclex-exam/components/configure-modal";

// Dynamic theme assigner for categories and topics
const THEME_PRESETS = [
  { icon: Stethoscope, color: "text-[#0284c7]", bg: "bg-[#e0f2fe]/70", border: "border-[#bae6fd]" },
  { icon: Heart, color: "text-[#e11d48]", bg: "bg-[#ffe4e6]/70", border: "border-[#fecdd3]" },
  { icon: Baby, color: "text-[#db2777]", bg: "bg-[#fce7f3]/70", border: "border-[#fbcfe8]" },
  { icon: Wind, color: "text-[#0284c7]", bg: "bg-[#e0f2fe]/70", border: "border-[#bae6fd]" },
  { icon: Pill, color: "text-[#7c3aed]", bg: "bg-[#ede9fe]/70", border: "border-[#ddd6fe]" },
  { icon: Activity, color: "text-[#ea580c]", bg: "bg-[#ffedd5]/70", border: "border-[#fed7aa]" },
  { icon: Droplets, color: "text-[#0284c7]", bg: "bg-[#e0f2fe]/70", border: "border-[#bae6fd]" },
  { icon: Users, color: "text-[#059669]", bg: "bg-[#ecfdf5]/70", border: "border-[#a7f3d0]" },
  { icon: Calculator, color: "text-[#d97706]", bg: "bg-[#fef3c7]/70", border: "border-[#fde68a]" },
  { icon: Brain, color: "text-[#2563eb]", bg: "bg-[#eff6ff]", border: "border-[#bfdbfe]" },
];

function getTheme(name = "", index = 0) {
  const lower = (name || "").toLowerCase();
  if (lower.includes("adult") || lower.includes("vital") || lower.includes("assess")) {
    return { icon: Stethoscope, color: "text-[#0284c7]", bg: "bg-[#e0f2fe]/70", border: "border-[#bae6fd]" };
  }
  if (lower.includes("cardio") || lower.includes("heart")) {
    return { icon: Heart, color: "text-[#e11d48]", bg: "bg-[#ffe4e6]/70", border: "border-[#fecdd3]" };
  }
  if (lower.includes("matern") || lower.includes("child") || lower.includes("baby") || lower.includes("pediatric") || lower.includes("newborn") || lower.includes("ante")) {
    return { icon: Baby, color: "text-[#db2777]", bg: "bg-[#fce7f3]/70", border: "border-[#fbcfe8]" };
  }
  if (lower.includes("resp") || lower.includes("lung") || lower.includes("airway") || lower.includes("oxygen")) {
    return { icon: Wind, color: "text-[#0284c7]", bg: "bg-[#e0f2fe]/70", border: "border-[#bae6fd]" };
  }
  if (lower.includes("pharm") || lower.includes("med") || lower.includes("drug") || lower.includes("infect")) {
    return { icon: Pill, color: "text-[#7c3aed]", bg: "bg-[#ede9fe]/70", border: "border-[#ddd6fe]" };
  }
  if (lower.includes("safety") || lower.includes("client")) {
    return { icon: Users, color: "text-[#059669]", bg: "bg-[#ecfdf5]/70", border: "border-[#a7f3d0]" };
  }
  if (lower.includes("endocrine") || lower.includes("diabetes")) {
    return { icon: Activity, color: "text-[#ea580c]", bg: "bg-[#ffedd5]/70", border: "border-[#fed7aa]" };
  }
  return THEME_PRESETS[index % THEME_PRESETS.length];
}

export default function PracticeByCategorySection({ onStartExam, category, isLoading }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [openSubtopics, setOpenSubtopics] = useState({});
  const [configuring, setConfiguring] = useState(null);

  // Toggle category expansion: clicking expands only that category, clicking again closes it
  const toggleCategory = (catName) => {
    setExpandedCategory((prev) => (prev === catName ? null : catName));
  };

  // Toggle subtopic list inside a topic card
  const toggleTopicSubtopics = (topicId, e) => {
    e?.stopPropagation();
    setOpenSubtopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Launch configure modal for category, topic, or subtopic
  const launchExam = (topicItem, subtopicItem = null, categoryName = "") => {
    const totalQ = subtopicItem
      ? subtopicItem.total_question
      : topicItem?.total_question ||
      topicItem?.subtopic?.reduce((a, s) => a + (s.total_question || 0), 0) ||
      10;

    setConfiguring({
      categoryName,
      topic: topicItem,
      subtopic: subtopicItem,
      totalQuestions: totalQ,
    });
  };

  // Filter categories and topics based on search query
  const filteredCategories = useMemo(() => {
    if (!category || !Array.isArray(category)) return [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return category;

    return category
      .map((cat) => {
        const catNameMatches = (cat.category || "").toLowerCase().includes(q);
        const matchingTopics = (cat.topics || []).filter((top) => {
          const topNameMatches = (top.topic_name || "").toLowerCase().includes(q);
          const subMatches = (top.subtopic || []).some((sub) =>
            (sub.title || "").toLowerCase().includes(q)
          );
          return topNameMatches || subMatches;
        });

        if (catNameMatches || matchingTopics.length > 0) {
          return {
            ...cat,
            topics: catNameMatches ? cat.topics : matchingTopics,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [category, searchQuery]);

  return (
    <div className="w-full bg-white rounded-xl sm:rounded-2xl border border-[#e2e8f0] p-4 sm:p-5 lg:p-6 shadow-xs">
      {/* ─── HEADER ROW: TITLE & SEARCH ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f1f5f9]">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#0f172a] tracking-tight">
            Practice by Nursing Topic
          </h2>
          <p className="text-xs text-[#64748b] mt-0.5">
            Choose a subject or build a custom quiz from multiple topics.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64 md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#94a3b8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search category, topic, or subtopic..."
            className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm bg-white border border-[#e2e8f0] rounded-xl text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94a3b8] hover:text-[#0f172a]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ─── CATEGORY LIST ─────────────────────────────────────────── */}
      <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-4 items-start">
        {isLoading ? (
          <div className="space-y-3 col-span-full">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full rounded-xl border border-[#e2e8f0] bg-white p-4 animate-pulse flex items-center justify-between"
              >
                <div className="flex items-center gap-3 w-1/3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="w-24 h-8 bg-slate-200 rounded-lg" />
              </div>
            ))}
          </div>
        ) : !category || category.length === 0 ? (
          <div className="py-12 text-center col-span-full">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2.5 text-slate-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#0f172a]">
              No Categories Available
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              There are currently no practice categories available in the Question Bank.
            </p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="py-12 text-center col-span-full">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-2.5 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#0f172a]">
              No matching categories found
            </h3>
            <p className="text-xs text-[#64748b] mt-1">
              Try a different keyword or clear your search query.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-3 px-3.5 py-1.5 bg-[#f1f5f9] text-[#1e293b] text-xs font-semibold rounded-lg hover:bg-[#e2e8f0] transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          filteredCategories.map((cat, catIdx) => {
            const catName = cat.category || `Category ${catIdx + 1}`;
            // Only the selected category is expanded
            const isCatExpanded = expandedCategory === catName;
            const catTheme = getTheme(catName, catIdx);
            const CatIcon = catTheme.icon;
            const totalQuestions = cat.total_question || 0;
            const totalTopics = cat.total_topic || cat.topics?.length || 0;

            return (
              <div
                key={catName}
                className={`rounded-xl sm:rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${isCatExpanded
                    ? "border-[#2c5f8d]/40 shadow-xs ring-1 ring-[#2c5f8d]/10"
                    : "border-[#e2e8f0] hover:border-[#cbd5e1] hover:shadow-xs"
                  }`}
              >
                {/* ─── CATEGORY CARD HEADER ────────────────────────── */}
                <div
                  onClick={() => toggleCategory(catName)}
                  className="p-3.5 sm:p-4.5 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors hover:bg-[#fcfdff]"
                >
                  {/* Left: Category Icon & Meta */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border ${catTheme.bg} ${catTheme.border} ${catTheme.color}`}
                    >
                      <CatIcon className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-[#0f172a] truncate">
                        {catName}
                      </h3>
                      <p className="text-[11px] text-[#94a3b8] mt-0.5 font-medium">
                        {totalTopics} topics · {totalQuestions} questions
                      </p>
                    </div>
                  </div>

                  {/* Right: Expand Chevron button */}
                  <div className="flex items-center shrink-0">
                    <div
                      className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#64748b] transition-transform duration-200 ${isCatExpanded ? "rotate-180 bg-[#eef4fb] text-[#1e3a5f]" : ""
                        }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* ─── EXPANDED TOPICS & SUBTOPICS SECTION ──────────── */}
                {isCatExpanded && (
                  <div className="border-t border-[#eef4fb] bg-[#f8fafc]/70 p-3.5 sm:p-4.5 animate-[fadeIn_0.2s_ease]">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase">
                        Topics in {catName}
                      </span>
                      <span className="text-[11px] text-[#94a3b8]">
                        {cat.topics?.length || 0} topics available
                      </span>
                    </div>

                    {/* Grid of Topics inside the expanded Category */}
                    <div className="grid grid-cols-1 gap-3 sm:gap-3.5 items-start">
                      {cat.topics && cat.topics.length > 0 ? (
                        cat.topics.map((topic, topIdx) => {
                          const topicTheme = getTheme(topic.topic_name, topIdx);
                          const TopicIcon = topicTheme.icon;
                          const subtopics = topic.subtopic || [];
                          const isSubOpen = !!openSubtopics[topic.id];
                          const topicQuestions =
                            subtopics.reduce((acc, s) => acc + (s.total_question || 0), 0) ||
                            topic.total_question ||
                            10;

                          return (
                            <div
                              key={topic.id}
                              className="rounded-xl border border-[#e2e8f0] bg-white overflow-hidden flex flex-col shadow-2xs hover:border-[#cbd5e1] transition-all"
                            >
                              {/* Topic Card Top Section */}
                              <div className="p-3 sm:p-3.5">
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${topicTheme.bg} ${topicTheme.border} ${topicTheme.color}`}
                                  >
                                    <TopicIcon className="w-4.5 h-4.5" />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-[13px] font-bold text-[#0f172a] truncate">
                                      {topic.topic_name}
                                    </h4>
                                    <p className="text-[11px] text-[#94a3b8] mt-0.5 font-medium">
                                      {subtopics.length} subtopics · {topicQuestions} questions
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Split Buttons: Practice All & Practice by Subtopic */}
                              <div className="border-t border-[#f1f5f9] bg-[#fafcff]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0]">
                                  {/* Practice All Button */}
                                  <button
                                    type="button"
                                    onClick={() => launchExam(topic, null, catName)}
                                    className="flex items-center gap-2 p-2.5 bg-[#eef4fb]/70 hover:bg-[#e2e8f0]/80 transition-colors text-left cursor-pointer group"
                                  >
                                    <div className="w-6.5 h-6.5 rounded-md bg-white shadow-2xs flex items-center justify-center text-[#1e3a5f] shrink-0 group-hover:scale-105 transition-transform">
                                      <Play className="w-3 h-3 fill-[#1e3a5f]" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-[#1e3a5f]">
                                        Practice All
                                      </div>
                                      <div className="text-[10px] text-[#64748b] truncate">
                                        {topicQuestions} questions · full topic
                                      </div>
                                    </div>
                                  </button>

                                  {/* Practice by Subtopic Button */}
                                  <button
                                    type="button"
                                    onClick={(e) => toggleTopicSubtopics(topic.id, e)}
                                    className="flex items-center justify-between p-2.5 bg-white hover:bg-[#f8fafc] transition-colors text-left cursor-pointer group"
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <div className="w-6.5 h-6.5 rounded-md bg-[#f1f5f9] flex items-center justify-center text-[#475569] shrink-0">
                                        <Menu className="w-3 h-3" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="text-xs font-bold text-[#1e293b]">
                                          Practice by Subtopic
                                        </div>
                                        <div className="text-[10px] text-[#64748b] truncate">
                                          {subtopics.length} topics to choose from
                                        </div>
                                      </div>
                                    </div>
                                    <ChevronDown
                                      className={`w-3.5 h-3.5 text-[#94a3b8] transition-transform duration-200 shrink-0 ${isSubOpen ? "rotate-180 text-[#1e3a5f]" : ""
                                        }`}
                                    />
                                  </button>
                                </div>

                                {/* Subtopics List (when Practice by Subtopic is open) */}
                                {isSubOpen && (
                                  <div className="border-t border-[#e2e8f0] bg-white divide-y divide-[#f1f5f9] animate-[fadeIn_0.2s_ease]">
                                    {subtopics.length > 0 ? (
                                      subtopics.map((sub) => (
                                        <div
                                          key={sub.id}
                                          onClick={() => launchExam(topic, sub, catName)}
                                          className="px-3.5 py-2 flex items-center justify-between gap-2.5 hover:bg-[#f8fbff] transition-colors cursor-pointer group"
                                        >
                                          <div className="min-w-0 flex-1">
                                            <h5 className="text-xs font-semibold text-[#1e293b] group-hover:text-[#1e3a5f] transition-colors">
                                              {sub.title}
                                            </h5>
                                          </div>
                                          <div className="flex items-center gap-2.5 shrink-0">
                                            <span className="text-xs font-bold text-[#2c5f8d]">
                                              {sub.total_question}{" "}
                                              <span className="text-[10px] text-[#94a3b8] font-normal">
                                                Qs
                                              </span>
                                            </span>
                                            <button
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                launchExam(topic, sub, catName);
                                              }}
                                              className="px-2 py-0.5 rounded-md border border-[#2c5f8d]/30 bg-[#eef4fb] text-[#2c5f8d] text-[10px] font-bold hover:bg-[#2c5f8d] hover:text-white transition-all cursor-pointer"
                                            >
                                              Practice →
                                            </button>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="p-3 text-center text-xs text-[#94a3b8]">
                                        No subtopics available.
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-xs text-[#94a3b8] col-span-2">
                          No topics found in this category.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ─── CONFIGURE EXAM MODAL ──────────────────────────────────── */}
      {configuring && (
        <ConfigureModal
          category={configuring.topic}
          subtopic={configuring.subtopic ? configuring.subtopic.title : null}
          totalQuestions={configuring.totalQuestions}
          onClose={() => setConfiguring(null)}
          onStart={(cfg) => {
            const sub = configuring.subtopic;
            const top = configuring.topic;
            const label = sub
              ? `${configuring.categoryName} • ${top?.topic_name || ""} — ${sub.title}`
              : `${configuring.categoryName} • ${top?.topic_name || "Practice"}`;
            setConfiguring(null);
            onStartExam(top, sub, cfg, label);
          }}
        />
      )}
    </div>
  );
}