import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ShieldAlert, Award, FileText, ClipboardList } from "lucide-react";
import { sidebarCategory } from "../components/dosage-sidebar-data";
import { dosageDetailsData } from "./dosage-slug-details-data";
import ActionButtons from "../../components/ActionButtons";

export default async function DosageCalculationDetails({ params }) {
  const { slug } = await params;

  // using delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const currentCategory = sidebarCategory.find(cat => cat.slug === slug);
  const detailedData = dosageDetailsData[slug];

  if (!currentCategory) {
    notFound();
  }

  // Note: Fallback fallback details
  const data = detailedData || {
    title: currentCategory.category,
    subtitle: "Math reference documentation and nursing dosage calculations.",
    sections: [
      {
        heading: "General Reference Guide",
        content: `This section details the formulas, conversions, and critical steps for ${currentCategory.category}.`,
        bullets: [
          "Always verify patient identity using two identifiers.",
          "Double-check all calculations with another licensed nurse, especially for high-alert medications.",
          "Ensure units of measurement match before applying any dosage formula."
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
          <Link href="/dashboard/dosage-calculation" className="hover:text-primary transition-colors">Dosage Calculation</Link>
          <ChevronRight size={12} />
          <span className="text-slate-800 font-semibold">{data.title}</span>
        </nav>

        {/* Action Buttons: Save & Share */}
        <ActionButtons />
      </div>

      {/* Main Header Presentation Block */}
      <header className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#2C5F8D]" />
        <div className="p-8 max-sm:p-6 flex items-start justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-[#2C5F8D]/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
              <Award size={14} className="shrink-0" />
              Dosage Guides
            </span>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight max-sm:text-2xl">{data.title}</h1>
            <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">{data.subtitle}</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-primary max-md:hidden">
            {currentCategory.icon}
          </div>
        </div>
      </header>

      {/* Structured Content Section */}
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

            {/* Render Table if available */}
            {section.table && (
              <div className="overflow-hidden border border-slate-150 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 text-xs font-bold border-b border-slate-200">
                      <th className="py-4.5 px-6">Measurement Category</th>
                      <th className="py-4.5 px-6">Equivalent / Formula</th>
                      <th className="py-4.5 px-6">Clinical Significance</th>
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
          <h4 className="text-sm font-bold text-amber-800">Medication Safety Alert</h4>
          <p className="text-xs text-amber-700 leading-relaxed">
            Formulas and calculations listed serve as generalized clinical guidelines for NCLEX study purposes. Always consult your specific healthcare institution's policies, utilize approved references, and verify complex calculations with a second licensed nurse.
          </p>
        </div>
      </footer>
    </div>
  );
}
