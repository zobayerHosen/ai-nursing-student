import React from "react";
import ActionButtons from "../../components/ActionButtons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { procedureSidebarCategory } from "../components/procedure-lookup-sidebar-data";

const dummyHtmlContent = `
  <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: #424242;">
    <h1 style="color: #2C5F8D; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px;">Procedure Overview</h1>
    <p style="margin-bottom: 16px;">This section provides a comprehensive guide to understanding the various components of the procedure. Proper technique is critical for ensuring patient safety and optimal outcomes.</p>
    
    <h2 style="color: #2C5F8D; margin-top: 28px; margin-bottom: 16px;">Key Objectives</h2>
    <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 20px; space-y: 8px;">
      <li style="margin-bottom: 8px;">Identify necessary equipment and prepare the environment.</li>
      <li style="margin-bottom: 8px;">Understand the anatomical landmarks relevant to the procedure.</li>
      <li style="margin-bottom: 8px;">Recognize and prevent potential complications.</li>
    </ul>

    <h2 style="color: #2C5F8D; margin-top: 28px; margin-bottom: 16px;">Core Steps</h2>
    <ol style="list-style-type: decimal; margin-left: 20px; margin-bottom: 24px;">
      <li style="margin-bottom: 10px;"><strong>Preparation:</strong> Gather all necessary supplies and verify patient identity and orders.</li>
      <li style="margin-bottom: 10px;"><strong>Positioning:</strong> Position the patient correctly and ensure their comfort and privacy.</li>
      <li style="margin-bottom: 10px;"><strong>Execution:</strong> Perform the procedure maintaining sterile or clean technique as indicated.</li>
      <li style="margin-bottom: 10px;"><strong>Post-procedure care:</strong> Monitor the patient, document findings, and provide education.</li>
    </ol>

    <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #2C5F8D; margin-top: 30px;">
      <strong style="color: #2C5F8D; display: block; margin-bottom: 8px;">Clinical Pearl:</strong> Always ensure patient privacy, explain the procedure clearly before beginning, and maintain a calm, reassuring demeanor throughout the process.
    </div>
  </div>
`;

export default async function ProcedureSlugPage({ params }) {
  const { slug } = params;
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Actions Row */}
      <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <ChevronRight size={12} />
          <Link href="/dashboard/procedure-lookup" className="hover:text-primary transition-colors">Procedure Lookup</Link>
          <ChevronRight size={12} />
          <span className="text-slate-800 font-semibold">{slug?.split("-")?.join(" ")}</span>
          <span className="text-slate-400 font-normal ml-1">({procedureSidebarCategory?.length || 0} Topics)</span>
        </nav>

        {/* Action Buttons: Save & Share */}
        <ActionButtons />
      </div>

      {/* Header Block */}
      <header className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden relative p-8 max-sm:p-6">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#2C5F8D]" />
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-[#2C5F8D] text-xs font-semibold uppercase tracking-wider">
              Procedure Lookup
            </div>
            <h1 className="text-3xl max-sm:text-2xl font-bold text-slate-800 capitalize">
              {slug?.split("-")?.join(" ")}
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl">
              Review the complete guide and clinical practices for the {slug?.split("-")?.join(" ")}.
            </p>
          </div>
        </div>
      </header>

      {/* Content Block */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-sm:p-6">
        <div 
          className="html-content-container"
          dangerouslySetInnerHTML={{ __html: dummyHtmlContent }} 
        />
      </section>
    </div>
  );
}
