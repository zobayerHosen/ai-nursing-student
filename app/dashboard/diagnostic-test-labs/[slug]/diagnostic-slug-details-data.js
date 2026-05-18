export const labDetailsData = {
    "foundations-of-laboratory": {
        title: "Foundations Of Laboratory",
        subtitle: "Essential principles of clinical laboratory testing, specimen collection, and pre-analytical accuracy.",
        sections: [
            {
                heading: "1. The Order of Draw (Phlebotomy)",
                content: "To prevent cross-contamination of additives between blood collection tubes, strict phlebotomy order must be followed:",
                bullets: [
                    "Blood Cultures (Yellow/sterile bottles) - Prevents microbial contamination.",
                    "Coagulation Tubes (Light Blue) - Sodium citrate additive.",
                    "Serum Tubes (Red/Gold/Tiger Top) - Clot activator or gel separator.",
                    "Heparin Tubes (Green) - Sodium/Lithium Heparin.",
                    "EDTA Tubes (Lavender/Pink) - For CBC and hematology studies.",
                    "Fluoride/Oxalate Tubes (Gray) - Glycolytic inhibitor for blood glucose."
                ]
            },
            {
                heading: "2. Key Pre-Analytical Variables",
                content: "Up to 70% of laboratory errors occur before the specimen is analyzed. Nursing priorities to minimize errors include:",
                bullets: [
                    "Patient Identification - Use two unique identifiers (Name, DOB) at the bedside.",
                    "Hemolysis Avoidance - Avoid using needles that are too small; let alcohol dry completely; do not shake tubes vigorously.",
                    "Fasting Status - Verify if the test requires NPO (e.g., fasting lipid profile, glucose).",
                    "Timing of Collection - Critical for therapeutic drug monitoring (e.g., peak/trough levels)."
                ]
            }
        ]
    },
    "cardiac-biomarkers": {
        title: "Cardiac Biomarkers",
        subtitle: "Biochemical markers used in the diagnosis, risk stratification, and monitoring of patients with suspected acute coronary syndrome (ACS) or heart failure.",
        sections: [
            {
                heading: "1. Diagnostic Reference Values",
                table: [
                    { test: "Troponin I", range: "< 0.03 ng/mL", significance: "Gold standard for Acute Myocardial Infarction. Elevates in 3-4 hours, remains high for 10-14 days." },
                    { test: "Troponin T", range: "< 0.1 ng/mL", significance: "Highly sensitive marker of myocardial necrosis." },
                    { test: "CK-MB", range: "0 - 3 ng/mL", significance: "Cardio-specific isoenzyme. Elevates in 4-6 hours, declines to normal in 48-72 hours." },
                    { test: "BNP (B-type Natriuretic Peptide)", range: "< 100 pg/mL", significance: "Key indicator of heart failure. > 400 pg/mL suggests acute heart failure." }
                ]
            },
            {
                heading: "2. Nursing Care Guidelines",
                bullets: [
                    "Draw serial troponins as ordered (typically every 3 to 6 hours) to track trends.",
                    "Keep the patient on continuous ECG monitoring and alert the provider immediately of acute changes.",
                    "Assess for chest pain, radiation, dyspnea, diaphoresis, and anxiety.",
                    "Correlate elevated BNP levels with physical signs of fluid overload (jugular venous distension, crackles in lungs, peripheral edema)."
                ]
            }
        ]
    },
    "coagulation-studies": {
        title: "Coagulation Studies",
        subtitle: "Laboratory tests evaluating the extrinsic, intrinsic, and common pathways of the coagulation cascade, crucial for anticoagulant monitoring and clotting disorder assessment.",
        sections: [
            {
                heading: "1. Reference Ranges & Therapeutic Targets",
                table: [
                    { test: "PT (Prothrombin Time)", range: "11 - 13.5 seconds", significance: "Measures extrinsic pathway." },
                    { test: "INR (International Normalized Ratio)", range: "0.8 - 1.1 (Standard)", significance: "Therapeutic target for Warfarin: 2.0 - 3.0 (or 2.5 - 3.5 for mechanical heart valves)." },
                    { test: "aPTT (Activated Partial Prothrombin Time)", range: "30 - 40 seconds", significance: "Measures intrinsic pathway. Therapeutic target for Heparin infusion is 1.5 - 2.5 times the control value (60 - 80 seconds)." },
                    { test: "D-Dimer", range: "< 500 ng/mL", significance: "Measures fibrin degradation products. Elevated in DVT, PE, and DIC." }
                ]
            },
            {
                heading: "2. Antidotes & Nursing Interventions",
                bullets: [
                    "Warfarin Antidote: Phytonadione (Vitamin K).",
                    "Unfractionated Heparin Antidote: Protamine Sulfate.",
                    "Initiate bleeding precautions for elevated INR/aPTT (use soft toothbrush, electric razor, avoid IM injections, apply prolonged pressure on venipuncture sites).",
                    "Monitor closely for clinical signs of hemorrhage: hematuria, melena, epistaxis, or unexplained bruising."
                ]
            }
        ]
    },
    "complete-blood-count-cbc": {
        title: "Complete Blood Count (CBC)",
        subtitle: "A comprehensive hematological panel measuring cells in the blood, including red blood cells, white blood cells, and platelets, to screen for anemia, infections, and clotting disorders.",
        sections: [
            {
                heading: "1. Hematology Reference Table",
                table: [
                    { test: "White Blood Cells (WBC)", range: "5,000 - 10,000 /mcL", significance: "Elevated (Leukocytosis) indicates infection/inflammation. Low (Leukopenia) indicates immunocompromise." },
                    { test: "Red Blood Cells (RBC)", range: "Male: 4.7 - 6.1 M/mcL | Female: 4.2 - 5.4 M/mcL", significance: "Transports oxygen." },
                    { test: "Hemoglobin (Hgb)", range: "Male: 14 - 18 g/dL | Female: 12 - 16 g/dL", significance: "Iron-rich protein. Low indicates anemia." },
                    { test: "Hematocrit (Hct)", range: "Male: 42% - 52% | Female: 37% - 47%", significance: "Percentage of RBC volume in blood. Correlates with hydration status." },
                    { test: "Platelets (PLT)", range: "150,000 - 450,000 /mcL", significance: "Essential for clotting. < 150,000 (Thrombocytopenia) poses bleeding risk." }
                ]
            },
            {
                heading: "2. Critical Nursing Considerations",
                bullets: [
                    "If WBC count drops below 1,000/mcL, initiate neutropenic precautions (restrict fresh flowers, raw fruits/vegetables, positive pressure room).",
                    "With low platelets (< 50,000/mcL), implement bleeding safety protocols to prevent injury.",
                    "Verify fluid status: Dehydration falsely elevates Hematocrit; fluid overload falsely dilutes Hematocrit.",
                    "Assess patients with low Hgb/Hct for fatigue, tachycardia, orthostatic hypotension, and pallor."
                ]
            }
        ]
    },
    "renal-function-tests-cmp": {
        title: "Renal Function Tests (CMP)",
        subtitle: "Assessment of kidney function, waste filtration, and electrolyte balances to identify kidney disease, dehydration, and metabolic status.",
        sections: [
            {
                heading: "1. Diagnostic Reference Values",
                table: [
                    { test: "Serum Creatinine", range: "0.6 - 1.2 mg/dL", significance: "Most reliable indicator of kidney function. Elevates solely in renal impairment." },
                    { test: "BUN (Blood Urea Nitrogen)", range: "10 - 20 mg/dL", significance: "Byproduct of protein metabolism. Can elevate due to dehydration, high protein diet, or gastrointestinal bleeding." },
                    { test: "eGFR (Glomerular Filtration Rate)", range: "> 90 mL/min/1.73m²", significance: "Rate of blood filtration. GFR < 60 indicates Kidney Disease; < 15 indicates Kidney Failure." },
                    { test: "Potassium (K+)", range: "3.5 - 5.0 mEq/L", significance: "Crucial cardiac electrolyte. Hyperkalemia/Hypokalemia can cause fatal arrhythmias." },
                    { test: "Sodium (Na+)", range: "135 - 145 mEq/L", significance: "Determines fluid volume. Imbalances cause neurological shifts (seizures, altered mental status)." }
                ]
            },
            {
                heading: "2. Clinical Nursing Priorities",
                bullets: [
                    "Assess urine output closely: oliguria (< 400 mL/day) is a hallmark sign of acute kidney injury (AKI).",
                    "For patients with high potassium, obtain a 12-lead ECG (look for peaked T-waves, widened QRS) and prepare to administer sodium polystyrene sulfonate or IV insulin/dextrose.",
                    "Monitor daily weights and fluid intake/output (I&O) precisely in patients with renal impairment.",
                    "Restrict dietary sodium, potassium, and phosphorus as prescribed."
                ]
            }
        ]
    },
    "arterial-blood-gas-abg": {
        title: "Arterial Blood Gas (ABG)",
        subtitle: "Arterial blood measurements to assess acid-base balance, pulmonary ventilation efficiency, and gas exchange.",
        sections: [
            {
                heading: "1. Key Reference Ranges",
                table: [
                    { test: "pH", range: "7.35 - 7.45", significance: "Overall blood acid-base status. < 7.35 = Acidosis | > 7.45 = Alkalosis." },
                    { test: "PaCO2", range: "35 - 45 mmHg", significance: "Respiratory component. Controlled by the lungs." },
                    { test: "HCO3- (Bicarbonate)", range: "22 - 26 mEq/L", significance: "Metabolic component. Controlled by the kidneys." },
                    { test: "PaO2", range: "80 - 100 mmHg", significance: "Partial pressure of oxygen in arterial blood." }
                ]
            },
            {
                heading: "2. Acid-Base Interpretation Guide",
                bullets: [
                    "Respiratory Acidosis: pH < 7.35 and PaCO2 > 45. Cause: Hypoventilation (COPD, drug overdose).",
                    "Respiratory Alkalosis: pH > 7.45 and PaCO2 < 35. Cause: Hyperventilation (panic attack, pulmonary embolism).",
                    "Metabolic Acidosis: pH < 7.35 and HCO3 < 22. Cause: DKA, renal failure, severe diarrhea.",
                    "Metabolic Alkalosis: pH > 7.45 and HCO3 > 26. Cause: Severe vomiting, gastric suctioning."
                ]
            }
        ]
    },
    "other-diagnostic-tests": {
        title: "Other Diagnostic Tests",
        subtitle: "Common imaging and specialized physiological tests utilized to evaluate tissue structures, organ perfusion, and internal systems.",
        sections: [
            {
                heading: "1. Common Imaging Diagnostic Modalities",
                table: [
                    { test: "Chest X-Ray (CXR)", range: "N/A", significance: "Standard view of heart size, lungs, ribs. Confirms tube/central line placements." },
                    { test: "CT Scan (with/without contrast)", range: "N/A", significance: "Cross-sectional imaging. Contraindicated in severe renal failure or iodine allergy if contrast is used." },
                    { test: "Magnetic Resonance Imaging (MRI)", range: "N/A", significance: "High-resolution soft tissue imaging. Absolutely contraindicated in patients with pacemakers, cochlear implants, or metallic shrapnel." },
                    { test: "12-Lead Electrocardiogram (ECG)", range: "N/A", significance: "Records electrical activity of the heart to rule out STEMI, ischemia, and heart block." }
                ]
            },
            {
                heading: "2. Critical Pre-Procedural Nursing Care",
                bullets: [
                    "MRI safety: Conduct a thorough magnetic checklist; remove all metallic jewelry, piercings, patches containing metal foil (e.g., nicotine, clonidine).",
                    "Contrast studies: Assess renal function (BUN/Creatinine). Push IV fluids post-procedure to flush out nephrotoxic contrast dye.",
                    "CT/MRI with contrast: Assess for allergy to shellfish, iodine, or dyes. Hold Metformin for 48 hours post-contrast to prevent lactic acidosis."
                ]
            }
        ]
    },
    "critical-values-and-nursing-cmp": {
        title: "Critical Values & Nursing Guidelines",
        subtitle: "Urgent lab results requiring immediate nursing action, clinical assessment, and direct provider notification to maintain patient safety.",
        sections: [
            {
                heading: "1. Critical Panic Value Table",
                table: [
                    { test: "Potassium (K+)", range: "< 2.5 or > 6.5 mEq/L", significance: "Risk of life-threatening ventricular fibrillation or cardiac arrest." },
                    { test: "Sodium (Na+)", range: "< 120 or > 160 mEq/L", significance: "Severe risk of cerebral edema, seizures, and coma." },
                    { test: "Glucose", range: "< 40 or > 400 mg/dL", significance: "Risk of diabetic ketoacidosis (DKA) or insulin shock." },
                    { test: "Platelets (PLT)", range: "< 20,000 /mcL", significance: "Extreme risk of spontaneous intracranial hemorrhage." }
                ]
            },
            {
                heading: "2. Standard Nursing Response Protocols",
                bullets: [
                    "Double check the critical result with the chart and patient's baseline history.",
                    "Directly call the primary provider or attending physician within 15 minutes of receiving the lab alert.",
                    "Document the time of call, the provider notified, the values reported, and the subsequent orders received.",
                    "Assess the patient immediately for correlated clinical symptoms (e.g., heart rate for potassium shifts, neuro status for sodium shifts)."
                ]
            }
        ]
    }
};