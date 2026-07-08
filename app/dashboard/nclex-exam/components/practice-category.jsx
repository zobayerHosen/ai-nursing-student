"use client";

import { useState } from "react";
import { CURRICULUM, SAMPLE_QUESTIONS } from "./data";
import ConfigureModal from "./configure-modal";
import { IoMdArrowDropdown } from "react-icons/io";

const CATEGORY_ICONS = {
  "fund-basics": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="1" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  ),
  "medsurg-cardio": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  "pharm-foundations": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6l-1 5h-4l-1-5z" /><path d="M9 8c-2 4-3 6-3 9a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4c0-3-1-5-3-9" />
    </svg>
  ),
  default: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
    </svg>
  ),
};

const getIcon = (catId) => CATEGORY_ICONS[catId] || CATEGORY_ICONS.default;

export default function PracticeByCategorySection({ onStartExam, computeStats, applyFilter }) {
  const [expanded, setExpanded] = useState({});
  const [expandedSec, setExpandedSec] = useState(Object.fromEntries(CURRICULUM.map((s) => [s.id, true])));
  const [configuring, setConfiguring] = useState(null);

  const toggle = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));
  const toggleSec = (id) => setExpandedSec((e) => ({ ...e, [id]: !e[id] }));
  const launch = (cat, sub) => setConfiguring({ category: cat, subtopic: sub || null });

  return (
    <div className="w-full flex-1 overflow-auto p-6 xl:p-7 bg-[#f4f6f9]">
      <div className="w-full">
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[21px] font-extrabold text-[#0f172a] mb-1">
            Practice by Category
          </h2>
          <p className="text-[13px] text-[#64748b]">
            Click any subtopic to start practice, or use <strong>Practice All</strong> for the full category.
          </p>
        </div>

        {CURRICULUM?.map((sec, si) => (
          <div key={sec.id} className="mb-4" style={{ animation: `fadeUp 0.3s ease ${si * 0.05}s both` }}>
            {/* Section header */}
            <button
              onClick={() => toggleSec(sec.id)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md cursor-pointer mb-2.5 transition-all font-sans"
            >
              <div className="w-2 h-2 rounded-full bg-[#475569] shrink-0" />
              <span className="text-[13px] font-extrabold text-[#475569] flex-1 text-left">{sec.section}</span>
              <span className="text-xs text-[#94a3b8] font-medium">
                {sec.categories.reduce((a, c) => a + c.subtopics.length, 0)} topics ·{" "}
                {sec.categories.reduce((a, c) => a + c.subtopics.reduce((x, s) => x + s.count, 0), 0)} questions
              </span>
              <span
                className={`text-[11px] text-[#475569] font-bold inline-block transition-transform duration-200 ${expandedSec[sec.id] ? "rotate-180" : ""
                  }`}
              >
                <IoMdArrowDropdown className="text-2xl" />
              </span>
            </button>

            {expandedSec[sec.id] && (
              <div className="flex flex-col gap-2">
                {sec?.categories?.map((cat) => {
                  const isOpen = expanded[cat.id];
                  const catTotal = cat?.subtopics?.reduce((a, s) => a + s.count, 0);
                  const secColor = "#2C5F8D";
                  const secBg = "#eef4fb";

                  return (
                    <div
                      key={cat.id}
                      className="bg-white border border-[#e2e8f0] rounded-md overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                      {/* Category header */}
                      <div className="flex items-center gap-3 px-4.5 py-3.5">
                        <div
                          className="w-9.5 h-9.5 rounded-md flex items-center justify-center shrink-0 border"
                          style={{ background: secBg, borderColor: `${secColor}22`, color: secColor }}
                        >
                          {getIcon(cat.id)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[#0f172a]">{cat.label}</div>
                          <div className="text-xs text-[#94a3b8] mt-0.5">
                            {cat?.subtopics?.length} subtopics ·{" "}
                            <span className="font-semibold" style={{ color: secColor }}>
                              {catTotal} questions
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Practice all and practice by subtopic action buttons */}
                      <div
                        className="grid grid-cols-2 gap-px border-t"
                        style={{ borderColor: `${secColor}18` }}
                      >
                        <button
                          onClick={() => launch(cat, null)}
                          className="flex items-center justify-center gap-2 py-2.5 px-3.5 border-none cursor-pointer font-sans transition-all duration-150"
                          style={{ background: secBg, borderRight: `1px solid ${secColor}18` }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = `${secColor}22`)}
                          onMouseLeave={(e) => (e.currentTarget.style.background = secBg)}
                        >
                          <span className="text-[15px]">▶</span>
                          <div className="text-left">
                            <div className="text-xs font-bold" style={{ color: secColor }}>
                              Practice All
                            </div>
                            <div className="text-[10px] text-[#94a3b8] mt-0.5">
                              {catTotal} questions · full category
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => toggle(cat.id)}
                          className="flex items-center justify-center gap-2 py-2.5 px-3.5 border-none cursor-pointer font-sans transition-all duration-150"
                          style={{ background: isOpen ? `${secColor}15` : "white" }}
                          onMouseEnter={(e) => {
                            if (!isOpen) e.currentTarget.style.background = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            if (!isOpen) e.currentTarget.style.background = "white";
                          }}
                        >
                          <span
                            className={`text-[15px] inline-block transition-transform duration-200 ${isOpen ? "rotate-90" : ""
                              }`}
                            style={{ color: isOpen ? secColor : "#94a3b8" }}
                          >
                            ☰
                          </span>
                          <div className="text-left">
                            <h5
                              className="text-xs font-bold"
                              style={{ color: isOpen ? secColor : "#475569" }}
                            >
                              Practice by Subtopic
                            </h5>
                            <p className="text-[10px] text-[#94a3b8] mt-0.5">
                              {cat.subtopics.length} topics to choose from
                            </p>
                          </div>
                          <div
                            className={`ml-auto text-[10px] font-bold inline-block transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                              }`}
                            style={{ color: isOpen ? secColor : "#94a3b8" }}
                          >
                            <IoMdArrowDropdown className="text-2xl" />
                          </div>
                        </button>
                      </div>

                      {/* Subtopics list */}
                      {isOpen && (
                        <div
                          className="animate-[fadeIn_0.2s_ease]"
                          style={{ borderTop: `1px solid ${secColor}18` }}
                        >
                          <div
                            className="grid grid-cols-[1fr_64px_110px] px-4 py-1.5 bg-[#f8fafc] border-b border-[#f1f5f9] text-[10px] font-bold text-[#94a3b8] tracking-wide uppercase gap-2"
                          >
                            <span>Subtopic</span>
                            <span className="text-right">Questions</span>
                          </div>
                          {cat?.subtopics?.map((sub, si) => (
                            <div
                              key={sub?.name}
                              className="grid grid-cols-[1fr_64px_110px] px-4 py-2.5 items-center gap-2 transition-colors cursor-pointer hover:bg-[#f8fbff] "
                              style={{
                                borderBottom:
                                  si < cat?.subtopics?.length - 1 ? "1px solid #f8fafc" : "none",
                              }}
                              onClick={() => launch(cat, sub)}
                            >
                              <div>
                                <h6 className="text-[13px] font-semibold text-[#1e293b] mb-0.5">
                                  {sub?.name ?? ""}
                                </h6>
                                <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                                  {sub?.desc ?? ""}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-[13px] font-bold" style={{ color: secColor }}>
                                  {sub?.count ?? ""}
                                </span>
                                <span className="text-[10px] text-[#94a3b8] ml-0.5">Qs</span>
                              </div>
                              <div className="text-right">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    launch(cat, sub);
                                  }}
                                  className="px-3 py-1 rounded-md border text-[11px] font-bold cursor-pointer font-sans transition-all whitespace-nowrap"
                                  style={{
                                    borderColor: `${secColor}44`,
                                    background: secBg,
                                    color: secColor,
                                  }}
                                >
                                  Practice →
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Configure Modal */}
      {configuring && (
        <ConfigureModal
          category={configuring.category}
          subtopic={configuring.subtopic ? configuring.subtopic.name : null}
          questionStats={(() => {
            const traditionalPool = SAMPLE_QUESTIONS;
            return computeStats ? computeStats(traditionalPool) : null;
          })()}
          onClose={() => setConfiguring(null)}
          onStart={(cfg) => {
            const subName = configuring.subtopic?.name;
            const label = subName
              ? `${configuring.category.label} — ${subName}`
              : configuring.category.label;
            const pool = applyFilter ? applyFilter(SAMPLE_QUESTIONS, cfg.filter) : SAMPLE_QUESTIONS;
            const finalPool = pool.length > 0 ? pool : SAMPLE_QUESTIONS;
            setConfiguring(null);
            onStartExam(finalPool, cfg.mode, label);
          }}
        />
      )}
    </div>
  );
};