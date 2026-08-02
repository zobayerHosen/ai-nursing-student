"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import ConceptMapSidebar from "./concept-map-sidebar";
import ConceptMapHeader from "./concept-map-header";
import ConceptMapToolbar from "./concept-map-toolbar";
import ConceptMapCanvas from "./concept-map-canvas";

/* sample map data */
const SAMPLE_MAP = {
  title: "Heart Failure Clinical Concept Map",
  nodes: [
    { id: "central-1", label: "Heart Failure", details: "Adult patient \u2022 Cardiac pump dysfunction with systemic manifestations", category: "Central" },
    { id: "risk-1", label: "Risk Factors", details: ". Advanced age\n. History of hypertension\n. Coronary artery disease\n. Diabetes mellitus\n. Previous MI", category: "Risk Factor" },
    { id: "subjective-1", label: "Subjective Data", details: ". Shortness of breath\n. Fatigue and weakness\n. Orthopnea\n. Paroxysmal nocturnal dyspnea\n. Decreased exercise tolerance", category: "Subjective Data" },
    { id: "objective-1", label: "Objective Data", details: ". Elevated BP\n. Tachycardia\n. Crackles in lung bases\n. Peripheral edema\n. Jugular venous distention\n. S3 heart sound\n. Elevated BNP\n. Decreased ejection fraction on echo", category: "Objective Data" },
    { id: "nanda-1", label: "Decreased Cardiac Output", details: ". r/t altered contractility and preload/afterload imbalance\n. AEB tachycardia, fatigue, dyspnea, decreased EF, elevated BNP", category: "Nursing Diagnosis" },
    { id: "nanda-2", label: "Excess Fluid Volume", details: ". r/t compromised regulatory mechanisms and decreased cardiac output\n. AEB peripheral edema, crackles, JVD, weight gain, dyspnea", category: "Nursing Diagnosis" },
    { id: "nanda-3", label: "Impaired Gas Exchange", details: ". r/t alveolar-capillary membrane changes and fluid in alveoli\n. AEB dyspnea, crackles, decreased SpO2, orthopnea", category: "Nursing Diagnosis" },
    { id: "nanda-4", label: "Activity Intolerance", details: ". r/t imbalance between oxygen supply and demand\n. AEB fatigue, dyspnea on exertion, decreased exercise tolerance", category: "Nursing Diagnosis" },
    { id: "intervention-1", label: "Cardiac Output Interventions", details: ". Monitor vital signs q4h\n. Continuous cardiac monitoring\n. Assess heart sounds for S3/S4\n. Monitor I&O strictly\n. Daily weights same time/scale\n. Assess for signs of decreased perfusion", category: "Intervention" },
    { id: "intervention-2", label: "Fluid Management", details: ". Administer diuretics as ordered\n. Strict I&O monitoring\n. Daily weights\n. Fluid restriction as ordered\n. Monitor electrolytes\n. Assess edema and JVD\n. Elevate legs when sitting", category: "Intervention" },
    { id: "intervention-3", label: "Respiratory Support", details: ". Administer oxygen as ordered\n. Monitor SpO2 continuously\n. Assess lung sounds q4h\n. Position in high Fowler's\n. Encourage deep breathing\n. Monitor respiratory rate and effort", category: "Intervention" },
    { id: "intervention-4", label: "Activity Management", details: ". Balance rest and activity\n. Assist with ADLs as needed\n. Monitor response to activity\n. Gradual increase in activity as tolerated\n. Energy conservation techniques\n. Fall precautions", category: "Intervention" },
    { id: "med-1", label: "Loop Diuretics (Furosemide)", details: ". For fluid overload and pulmonary congestion\n. Nursing: monitor K+, Mg, daily weight, BP, UOP, I&O\n. Assess for dehydration and electrolyte imbalance", category: "Medication" },
    { id: "med-2", label: "ACE Inhibitors", details: ". For afterload reduction and cardiac remodeling prevention\n. Nursing: monitor BP, K+, renal function, assess for dry cough\n. Hold if SBP <100 mmHg", category: "Medication" },
    { id: "med-3", label: "Beta Blockers", details: ". For heart rate control and improved cardiac function\n. Nursing: monitor HR and BP, hold if HR <60 or SBP <100\n. Assess for bronchospasm", category: "Medication" },
    { id: "med-4", label: "Digoxin", details: ". For improved contractility and rate control in AFib\n. Nursing: monitor HR, K+, digoxin level, assess for toxicity\n. Hold if HR <60 bpm", category: "Medication" },
    { id: "complication-1", label: "Acute Decompensation", details: ". Acute pulmonary edema\n. Cardiogenic shock\n. Respiratory failure requiring intubation\n. Sudden cardiac death", category: "Complication" },
    { id: "complication-2", label: "Chronic Complications", details: ". Progressive renal insufficiency\n. Hepatic congestion and dysfunction\n. Cardiac cachexia\n. Thromboembolic events\n. Arrhythmias (AFib, VT)", category: "Complication" },
  ],
  edges: [
    { id: "e_risk-1_central-1", source: "risk-1", target: "central-1", label: "contributes to" },
    { id: "e_subjective-1_central-1", source: "subjective-1", target: "central-1", label: "evidenced by" },
    { id: "e_objective-1_central-1", source: "objective-1", target: "central-1", label: "evidenced by" },
    { id: "e_central-1_nanda-1", source: "central-1", target: "nanda-1", label: "priority" },
    { id: "e_central-1_nanda-2", source: "central-1", target: "nanda-2", label: "leads to" },
    { id: "e_central-1_nanda-3", source: "central-1", target: "nanda-3", label: "leads to" },
    { id: "e_central-1_nanda-4", source: "central-1", target: "nanda-4", label: "leads to" },
    { id: "e_nanda-1_intervention-1", source: "nanda-1", target: "intervention-1", label: "managed by" },
    { id: "e_nanda-2_intervention-2", source: "nanda-2", target: "intervention-2", label: "managed by" },
    { id: "e_nanda-3_intervention-3", source: "nanda-3", target: "intervention-3", label: "managed by" },
    { id: "e_nanda-4_intervention-4", source: "nanda-4", target: "intervention-4", label: "managed by" },
    { id: "e_central-1_med-1", source: "central-1", target: "med-1", label: "treated with" },
    { id: "e_central-1_med-2", source: "central-1", target: "med-2", label: "treated with" },
    { id: "e_central-1_med-3", source: "central-1", target: "med-3", label: "treated with" },
    { id: "e_central-1_med-4", source: "central-1", target: "med-4", label: "treated with" },
    { id: "e_central-1_complication-1", source: "central-1", target: "complication-1", label: "progresses to" },
    { id: "e_central-1_complication-2", source: "central-1", target: "complication-2", label: "long-term risk" },
  ],
};

const ConceptMapShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapData] = useState(SAMPLE_MAP);

  return (
    <div className="flex flex-col xl:flex-row h-full xl:min-h-[calc(100vh-80px)] relative w-full bg-[#F8F9FA]">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 xl:relative xl:translate-x-0
          ${isSidebarOpen ? "translate-x-0 z-[999]" : "-translate-x-full"} w-[80%] sm:w-80 xl:w-82.5 shrink-0 bg-white border-r border-[#E5E7EB] flex flex-col`}
      >
        <ConceptMapSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile toggle */}
        <div className="xl:hidden p-4 border-b border-black/10 flex items-center gap-3 bg-white sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={20} className="text-[#2C5F8D]" />
          </button>
          <h2 className="font-semibold text-lg text-[#2C5F8D]">Concept Map </h2>
        </div>

        <ConceptMapHeader title={mapData.title} />
        <ConceptMapToolbar />
        <ConceptMapCanvas mapData={mapData} />
      </main>
    </div>
  );
};

export default ConceptMapShell;