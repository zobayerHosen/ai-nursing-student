"use client";

import React, { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ShieldAlert, Award, FileText, ClipboardList, Bookmark, Share2, Check } from "lucide-react";
import { sidebarCategory } from "../components/diagnostic-sidebar-data";
import { labDetailsData } from "./diagnostic-slug-details-data";

export default function DiagnosticTestDetails({ params }) {
  const { slug } = use(params);

  const [isSaved, setIsSaved] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  const currentCategory = sidebarCategory.find(cat => cat.slug === slug);
  const detailedData = labDetailsData[slug];

  if (!currentCategory) {
    notFound();
  }

  // Note: Fallback fallback details
  const data = detailedData || {
    title: currentCategory.category,
    subtitle: "Medical reference documentation and nursing pathways.",
    sections: [
      {
        heading: "General Reference Guide",
        content: `This section details the clinical laboratory interpretation guidelines, patient preparations, and nursing considerations for ${currentCategory.category}.`,
        bullets: [
          "Always verify patient identity using two bedside identifiers before collecting diagnostic samples.",
          "Consult with laboratory-specific policy for precise reference ranges and collection methods.",
          "Monitor patient baseline trends rather than looking at isolated single test results."
        ]
      }
    ]
  };

  // Note: UI
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Breadcrumb & Actions Row */}
      <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <ChevronRight size={12} />
          <Link href="/dashboard/diagnostic-test-labs" className="hover:text-primary transition-colors">Diagnostic Tests & Labs</Link>
          <ChevronRight size={12} />
          <span className="text-slate-800 font-semibold">{data.title}</span>
        </nav>

        {/* Action Buttons: Save & Share */}
        <div className="flex items-center gap-2.5 max-sm:w-full">
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg  flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm active:scale-95 ${isSaved
                ? "bg-[#2C5F8D]/10 border text-primary border-primary/30 text-sm"
                : "bg-white border border-[#E5E7EB] hover:text-primary hover:border-primary/30"
              }`}
          >
            <Bookmark size={14} className={isSaved ? "fill-primary" : ""} />
            {isSaved ? "Saved" : "Save Guide"}
          </button>

          <button
            onClick={handleShare}
            className={`px-4 py-2 rounded-lg  flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm active:scale-95 ${isShared
                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                : "bg-white border border-[#E5E7EB] hover:text-primary hover:border-primary/30"
              }`}
          >
            {isShared ? <Check size={14} /> : <Share2 size={14} />}
            {isShared ? "Copied!" : "Share Link"}
          </button>
        </div>
      </div>

      {/* Main Header Presentation Block */}
      <header className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#2C5F8D]" />
        <div className="p-8 max-sm:p-6 flex items-start justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-[#2C5F8D]/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
              <Award size={14} className="shrink-0" />
              Clinical Lab Guides
            </span>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight max-sm:text-2xl">{data.title}</h1>
            <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">{data.subtitle}</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-primary max-md:hidden">
            {currentCategory.icon}
          </div>
        </div>
      </header>

      {/* Structured Lab Content Section */}
      <div className="space-y-8">
        {data.sections.map((section, idx) => (
          <section key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-sm:p-6 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2.5 pb-3 border-b border-slate-100">
              {idx === 0 ? <FileText className="text-primary" size={20} /> : <ClipboardList className="text-primary" size={20} />}
              {section.heading}
            </h2>

            {section.content && (
              <p className="text-slate-600 text-sm leading-relaxed">{section.content}</p>
            )}

            {/* Render Laboratory Reference Range Table if available */}
            {section.table && (
              <div className="overflow-hidden border border-slate-150 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 text-xs font-bold border-b border-slate-200">
                      <th className="py-4.5 px-6">Diagnostic Lab Test</th>
                      <th className="py-4.5 px-6">Normal Reference Range</th>
                      <th className="py-4.5 px-6">Clinical Significance & Timeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {section.table.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4.5 px-6 font-semibold text-slate-800">{row.test}</td>
                        <td className="py-4.5 px-6 font-medium text-primary">
                          <span className="inline-block bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">
                            {row.range}
                          </span>
                        </td>
                        <td className="py-4.5 px-6 text-slate-500 max-w-md leading-relaxed">{row.significance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Render Checklist Bullet Points if available */}
            {section.bullets && (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.bullets.map((bullet, bIdx) => {
                  const parts = bullet.split(" - ");
                  const label = parts[0];
                  const description = parts[1];

                  return (
                    <li key={bIdx} className="flex gap-3 items-start bg-slate-50 p-4.5 rounded-2xl border border-slate-100/80 hover:shadow-sm transition-all">
                      <div className="mt-1 shrink-0 p-0.5 rounded-full bg-emerald-100 text-emerald-600">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="space-y-1 text-sm">
                        {description ? (
                          <>
                            <strong className="text-slate-800 font-bold block">{label}</strong>
                            <span className="text-slate-500 leading-relaxed text-xs block">{description}</span>
                          </>
                        ) : (
                          <span className="text-slate-700 leading-relaxed font-semibold">{bullet}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Safety Banner */}
      <footer className="bg-amber-50 rounded-2xl border border-amber-200/80 p-5 flex gap-4 items-start shadow-sm">
        <ShieldAlert className="text-amber-600 shrink-0 mt-0.5" size={24} />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-800">Bedside Verification & Safety Alert</h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            Reference values listed in this system serve as generalized clinical guidelines for NCLEX study purposes. Always consult your specific healthcare institution's laboratory manuals and medical policy guidelines for exact calibration reference limits when verifying patient bedside diagnostic results.
          </p>
        </div>
      </footer>
    </div>
  );
};