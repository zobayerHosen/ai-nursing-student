"use client";

import { useState } from "react";
import { CURRICULUM, SAMPLE_QUESTIONS } from "../../nclex-exam/components/data";
import ConfigureModal from "../../nclex-exam/components/configure-modal";
import { IoMdArrowDropdown } from "react-icons/io";

const CATEGORY_EXAM_ICONS = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.42969 7.83398C5.2805 7.83398 5.13743 7.89325 5.03194 7.99874C4.92645 8.10423 4.86719 8.2473 4.86719 8.39648C4.86719 8.54567 4.92645 8.68874 5.03194 8.79423C5.13743 8.89972 5.2805 8.95898 5.42969 8.95898H11.4609C11.6101 8.95898 11.7532 8.89972 11.8587 8.79423C11.9642 8.68874 12.0234 8.54567 12.0234 8.39648C12.0234 8.2473 11.9642 8.10423 11.8587 7.99874C11.7532 7.89325 11.6101 7.83398 11.4609 7.83398H5.42969ZM8.14156 11.0271H5.42969C5.2805 11.0271 5.13743 11.0864 5.03194 11.1919C4.92645 11.2974 4.86719 11.4404 4.86719 11.5896C4.86719 11.7388 4.92645 11.8819 5.03194 11.9874C5.13743 12.0928 5.2805 12.1521 5.42969 12.1521H8.14156C8.29075 12.1521 8.43382 12.0928 8.53931 11.9874C8.6448 11.8819 8.70406 11.7388 8.70406 11.5896C8.70406 11.4404 8.6448 11.2974 8.53931 11.1919C8.43382 11.0864 8.29075 11.0271 8.14156 11.0271Z" fill="#2C5F8D" />
    <path d="M8.06 18.1875H3.77875C3.33544 18.1863 2.91072 18.0093 2.59784 17.6952C2.28496 17.3812 2.1095 16.9558 2.11 16.5125V5.11875C2.1095 4.67544 2.28496 4.25006 2.59784 3.936C2.91072 3.62195 3.33544 3.44491 3.77875 3.44375H4.94062V3.585C4.94112 3.97947 5.09809 4.35762 5.37707 4.63649C5.65606 4.91536 6.03428 5.07217 6.42875 5.0725H11.8038C12.1982 5.07217 12.5764 4.91536 12.8554 4.63649C13.1344 4.35762 13.2914 3.97947 13.2919 3.585V3.44375H14.4481C15.3837 3.44375 16.1163 4.17937 16.1163 5.11875V8.325C16.1163 8.47418 16.1755 8.61726 16.281 8.72275C16.3865 8.82824 16.5296 8.8875 16.6788 8.8875C16.8279 8.8875 16.971 8.82824 17.0765 8.72275C17.182 8.61726 17.2412 8.47418 17.2412 8.325V5.11875C17.2413 4.37723 16.9471 3.66598 16.4234 3.14106C15.8996 2.61614 15.189 2.32041 14.4475 2.31875H13.2913V2.175C13.2908 1.78053 13.1338 1.40238 12.8548 1.12351C12.5758 0.844635 12.1976 0.687831 11.8031 0.6875H6.42812C6.03366 0.687831 5.65544 0.844635 5.37645 1.12351C5.09746 1.40238 4.9405 1.78053 4.94 2.175V2.31875H3.77875C3.03717 2.32041 2.32652 2.61611 1.80267 3.14102C1.27882 3.66592 0.984539 4.37717 0.984375 5.11875V16.5125C0.984375 18.0562 2.23813 19.3125 3.77875 19.3125H8.06C8.20918 19.3125 8.35226 19.2532 8.45775 19.1477C8.56324 19.0423 8.6225 18.8992 8.6225 18.75C8.6225 18.6008 8.56324 18.4577 8.45775 18.3523C8.35226 18.2468 8.20918 18.1875 8.06 18.1875ZM6.06625 2.175C6.06625 1.975 6.22875 1.8125 6.42875 1.8125H11.8038C12.0038 1.8125 12.1663 1.975 12.1663 2.175V3.58438C12.1663 3.78438 12.0038 3.94688 11.8038 3.94688H6.42875C6.33261 3.94688 6.24041 3.90868 6.17242 3.8407C6.10444 3.77272 6.06625 3.68052 6.06625 3.58438V2.175Z" fill="#2C5F8D" />
    <path d="M18.4176 10.8497C17.6476 10.0791 16.3032 10.0784 15.5326 10.8497L10.5457 15.8366C10.3856 15.9963 10.2794 16.2022 10.242 16.4253L9.96825 18.0434C9.9394 18.2147 9.95194 18.3904 10.0048 18.5558C10.0577 18.7212 10.1494 18.8716 10.2722 18.9943C10.395 19.1171 10.5454 19.2087 10.7109 19.2615C10.8763 19.3143 11.052 19.3267 11.2232 19.2978L12.8407 19.0247C13.0651 18.9866 13.2689 18.8816 13.4295 18.7209L18.4164 13.7341C18.7983 13.3514 19.0129 12.8328 19.0132 12.2921C19.0134 11.7514 18.7992 11.2327 18.4176 10.8497ZM12.6539 17.9159L11.0782 18.2303L11.342 16.6322L14.9164 13.0578L16.2107 14.3522L12.6539 17.9159ZM17.6214 12.9384L17.0051 13.5559L15.7114 12.2622L16.3282 11.6453C16.4129 11.5602 16.5136 11.4926 16.6246 11.4466C16.7355 11.4006 16.8544 11.377 16.9745 11.3772C17.1553 11.3774 17.332 11.4311 17.4823 11.5316C17.6326 11.6321 17.7497 11.7749 17.8189 11.9419C17.8881 12.109 17.9063 12.2928 17.8712 12.4701C17.836 12.6475 17.7491 12.8104 17.6214 12.9384Z" fill="#2C5F8D" />
  </svg>
)

export default function PracticeByCategorySection({ onStartExam, computeStats, category, isLoading }) {
  const [expanded, setExpanded] = useState({});
  const [expandedSec, setExpandedSec] = useState({});
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

        {isLoading ? (
          <div className="flex flex-col gap-3 mt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <div key={i} className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-md px-4 py-3.5 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3 w-1/3">
                  <div className="w-5 h-5 bg-[#cbd5e1] rounded"></div>
                  <div className="flex-1 h-4 bg-[#cbd5e1] rounded w-full"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-3 bg-[#cbd5e1] rounded w-32"></div>
                  <div className="w-4 h-4 bg-[#cbd5e1] rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (!category || category.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-10 bg-white border border-[#e2e8f0] rounded-xl shadow-sm text-center mt-6">
            <div className="w-16 h-16 bg-[#f1f5f9] rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-[#94a3b8]">📁</span>
            </div>
            <h3 className="text-[15px] font-bold text-[#0f172a] mb-1.5">No Categories Available</h3>
            <p className="text-[13px] text-[#64748b]">Check back later for new practice materials.</p>
          </div>
        ) : (
          category?.map((sec, si) => (
          <div key={sec?.category?.id} className="mb-4" style={{ animation: `fadeUp 0.3s ease ${si * 0.05}s both` }}>
            {/* Section header */}
            <button
              onClick={() => toggleSec(sec?.category?.id)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md cursor-pointer mb-2.5 transition-all font-sans"
            >
              <p>{CATEGORY_EXAM_ICONS}</p>
              <span className="text-[13px] font-extrabold text-[#475569] flex-1 text-left">{sec?.category?.title}</span>
              <span className="text-xs text-[#94a3b8] font-medium">
                {sec?.total_topic} topics ·{" "}
                {sec?.total_category_question} questions
              </span>
              <span
                className={`text-[11px] text-[#475569] font-bold inline-block transition-transform duration-200 ${expandedSec[sec?.category?.id] ? "rotate-180" : ""
                  }`}
              >
                <IoMdArrowDropdown className="text-2xl" />
              </span>
            </button>

            {expandedSec[sec?.category?.id] && (
              <div className="flex flex-col gap-2">
                {(!sec?.category?.topic || sec?.category?.topic.length === 0) && (
                  <div className="flex flex-col items-center justify-center p-6 bg-white border border-[#e2e8f0] rounded-md shadow-sm text-center">
                    <span className="text-xl mb-2 opacity-80">🗂️</span>
                    <h4 className="text-[14px] font-bold text-[#1e293b] mb-1">No Topics Found</h4>
                    <p className="text-[12px] text-[#64748b] font-medium">Topics for this category are currently unavailable. Please check back later.</p>
                  </div>
                )}
                {sec?.category?.topic?.length > 0 && sec.category.topic.map((cat) => {
                  const isOpen = expanded[cat.id];
                  const catTotal = cat?.subtopics?.reduce((a, s) => a + (s.total_question || 0), 0) || 0;
                  const secColor = "#2C5F8D";
                  const secBg = "#eef4fb";

                  return (
                    <div
                      key={cat.id}
                      className="bg-white border border-[#e2e8f0] rounded-md overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                    >
                      {/* Category header */}
                      <div className="flex items-center gap-3 px-4.5 py-3.5">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[#0f172a]">{cat.title}</div>
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
                              {cat?.subtopics?.length || 0} topics to choose from
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
                          {(!cat?.subtopics || cat.subtopics.length === 0) ? (
                            <div className="flex flex-col items-center justify-center px-4 py-8 text-center bg-[#f8fafc]">
                              <span className="text-lg mb-2 opacity-80">📝</span>
                              <h5 className="text-[13px] font-bold text-[#1e293b] mb-1">No Subtopics Available</h5>
                              <p className="text-[11px] text-[#64748b] font-medium max-w-[250px]">There are currently no subtopics to practice within this topic.</p>
                            </div>
                          ) : (
                            <>
                              <div
                                className="grid grid-cols-[1fr_64px_110px] px-4 py-1.5 bg-[#f8fafc] border-b border-[#f1f5f9] text-[10px] font-bold text-[#94a3b8] tracking-wide uppercase gap-2"
                              >
                                <span>Subtopic</span>
                                <span className="text-right">Questions</span>
                              </div>
                              {cat.subtopics.map((sub, si) => (
                                <div
                                  key={sub?.id || sub?.title}
                                  className="grid grid-cols-[1fr_64px_110px] px-4 py-2.5 items-center gap-2 transition-colors cursor-pointer hover:bg-[#f8fbff] "
                                  style={{
                                    borderBottom:
                                      si < cat?.subtopics?.length - 1 ? "1px solid #f8fafc" : "none",
                                  }}
                                  onClick={() => launch(cat, sub)}
                                >
                                  <div>
                                    <h6 className="text-[13px] font-semibold text-[#1e293b] mb-0.5">
                                      {sub?.title ?? ""}
                                    </h6>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-[13px] font-bold" style={{ color: secColor }}>
                                      {sub?.total_question ?? 0}
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
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )))}
      </div>

      {/* Configure Modal */}
      {configuring && (
        <ConfigureModal
          category={configuring.category}
          subtopic={configuring.subtopic ? configuring.subtopic.title : null}
          questionStats={(() => {
            const traditionalPool = SAMPLE_QUESTIONS;
            return computeStats ? computeStats(traditionalPool) : null;
          })()}
          onClose={() => setConfiguring(null)}
          onStart={(cfg) => {
            const subName = configuring.subtopic?.title;
            const label = subName
              ? `${configuring.category.title} — ${subName}`
              : configuring.category.title;
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