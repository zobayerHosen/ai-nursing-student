// ============================================================
//  Sample demo data for the concept map
//  Loaded on first visit or when localStorage is empty
// ============================================================

/**
 * Returns a pair of demo maps: one complex (CHF+T2DM+CKD) and one simpler (Pneumonia).
 * Each map has nodes and edges ready for React Flow.
 */
export function getDemoMaps() {
  const CHF_MAP = {
    title: 'CHF + T2DM + CKD Stage 3 — Integrated Concept Map',
    patientSnapshot: `72F admitted for CHF exacerbation. PMH: HTN, T2DM, CKD stage 3.
C/o SOB, fatigue, 2-pillow orthopnea.
BP 158/92, HR 104, SpO2 89% RA, crackles bilaterally, 2+ pitting edema BLE.
Labs: BNP 980, Cr 2.1, BUN 45, K+ 5.2, HbA1c 8.4%, glucose 218.
Meds: Furosemide 40mg IV BID, metoprolol 25mg PO BID, lisinopril 10mg PO daily,
metformin 1000mg PO BID, atorvastatin 40mg PO QHS.
Currently on 2L O2 NC, daily weights, fluid restriction 1500mL, low Na/low K diet.`,
    centralConcept: {
      title: 'CHF + T2DM + CKD',
      body: '72F • Cardiorenal syndrome with metabolic dysregulation'
    },
    subjective: [
      { title: 'Respiratory complaints', body: '• SOB at rest\n• 2-pillow orthopnea\n• Persistent fatigue' },
      { title: 'Fluid status concerns', body: '• Reports leg heaviness\n• Reduced UOP today' },
      { title: 'Glycemic symptoms', body: '• Mild polydipsia\n• Blurred vision episodes' },
    ],
    objective: [
      { title: 'Vital signs', body: '• BP 158/92 mmHg\n• HR 104, irregular\n• RR 24, SpO2 89% RA → 94% on 2L\n• T 37.1°C' },
      { title: 'Cardiopulmonary exam', body: '• Bilateral basilar crackles\n• S3 gallop present\n• JVD 8 cm\n• 2+ pitting edema BLE' },
      { title: 'Labs', body: '• BNP 980 (↑↑)\n• Cr 2.1, BUN 45, GFR 32\n• K+ 5.2, Na 134\n• HbA1c 8.4%, BG 218\n• CXR: pulmonary congestion' },
    ],
    risk: [{ title: 'Risk Factors', body: '• Age 72\n• Long-standing HTN & T2DM\n• Chronic kidney disease\n• Postmenopausal female\n• Polypharmacy' }],
    diagnoses: [
      { title: 'Excess Fluid Volume', body: 'r/t compromised regulatory mechanisms (cardiac + renal failure)\nAEB crackles, edema, BNP 980, weight gain, JVD' },
      { title: 'Impaired Gas Exchange', body: 'r/t pulmonary congestion\nAEB SpO2 89% RA, dyspnea, tachypnea, orthopnea' },
      { title: 'Decreased Cardiac Output', body: 'r/t altered preload/afterload\nAEB BP 158/92, HR 104, S3 gallop, fatigue' },
      { title: 'Risk for Unstable Blood Glucose', body: 'r/t T2DM + altered renal clearance of oral hypoglycemics\nAEB BG 218, HbA1c 8.4%' },
      { title: 'Risk for Electrolyte Imbalance', body: 'r/t CKD + ACE-I + diuretic therapy\nAEB K+ 5.2, ↑BUN/Cr' },
    ],
    interventions: [
      { title: 'Diuresis & fluid balance', body: '• Furosemide 40mg IV BID\n• Strict I&O q shift\n• Daily weight same time/scale\n• Fluid restriction 1500 mL/day', diagnosisIndex: 0 },
      { title: 'Oxygen & positioning', body: '• O2 2L NC; titrate for SpO2 ≥ 92%\n• HOB ≥ 30° (semi-Fowler)\n• Encourage incentive spirometry', diagnosisIndex: 1 },
      { title: 'Hemodynamic monitoring', body: '• Telemetry continuous\n• BP q4h, MAP target ≥ 65\n• Assess for chest pain & palpitations', diagnosisIndex: 2 },
      { title: 'Glycemic management', body: '• AC and HS BG checks\n• Hold metformin if Cr rising\n• Sliding scale insulin per protocol\n• Educate on sick-day rules', diagnosisIndex: 3 },
      { title: 'Electrolyte & renal monitoring', body: '• Daily BMP\n• Hold lisinopril if K+ > 5.5\n• Low-K diet teaching\n• Monitor for s/sx hyperkalemia', diagnosisIndex: 4 },
    ],
    outcomes: [
      { title: 'Fluid balance restored', body: 'Net negative fluid balance; weight loss 2-3 lb; clear lung sounds within 48 hr', interventionIndex: 0 },
      { title: 'Adequate oxygenation', body: 'SpO2 ≥ 94% on ≤ 2L NC; no dyspnea at rest within 24 hr', interventionIndex: 1 },
      { title: 'Hemodynamic stability', body: 'BP < 140/90 mmHg; HR 60-100; no S3 by discharge', interventionIndex: 2 },
      { title: 'Glycemic control', body: 'BG 140-180 mg/dL throughout shift; no hypoglycemic episodes', interventionIndex: 3 },
    ],
    complications: [
      { title: 'Cardiorenal syndrome', body: 'Worsening CHF → ↓ renal perfusion → AKI on CKD → fluid overload → worsens CHF (vicious cycle)' },
      { title: 'Diabetic nephropathy', body: 'Hyperglycemia accelerates GFR decline; may progress to ESRD requiring RRT' },
      { title: 'Acute pulmonary edema', body: 'Risk if fluid status not controlled; can progress to respiratory failure' },
    ],
    medications: [
      { title: 'Furosemide (loop diuretic)', body: 'For CHF/fluid overload\nNursing: monitor K+, BP, UOP, weight, hearing changes' },
      { title: 'Metoprolol (beta-blocker)', body: 'For CHF + rate control\nNursing: hold if HR < 60 or SBP < 100; assess for fatigue' },
      { title: 'Lisinopril (ACE-I)', body: 'For CHF + HTN + renal protection\nNursing: monitor K+, Cr; hold if K+ > 5.5; risk of angioedema/cough' },
      { title: 'Metformin (biguanide)', body: 'For T2DM\nNursing: HOLD if Cr > 1.5 (♀) or GFR < 30; risk of lactic acidosis' },
      { title: 'Atorvastatin (statin)', body: 'For dyslipidemia (CV protection)\nNursing: LFTs at baseline; educate on muscle pain reporting' },
    ],
  };

  const PNEUMONIA_MAP = {
    title: 'Pneumonia — Concept Map',
    centralConcept: { title: 'Pneumonia', body: '65M • Community-acquired pneumonia' },
    subjective: [
      { title: 'Respiratory complaints', body: '• Productive cough\n• Dyspnea\n• Pleuritic chest pain' },
      { title: 'Constitutional', body: '• Fever, chills\n• Fatigue, malaise' },
    ],
    objective: [
      { title: 'Vitals', body: '• T 38.8°C\n• RR 26, SpO2 88% RA\n• HR 108' },
      { title: 'Exam / Labs', body: '• Crackles RLL\n• ↑ WBC 16k\n• CXR: RLL infiltrate' },
    ],
    risk: [{ title: 'Risk Factors', body: '• Age 65\n• Smoking history\n• Recent URI' }],
    diagnoses: [
      { title: 'Impaired Gas Exchange', body: 'r/t alveolar consolidation\nAEB SpO2 88%, dyspnea' },
      { title: 'Ineffective Airway Clearance', body: 'r/t excess secretions\nAEB productive cough, crackles' },
      { title: 'Hyperthermia', body: 'r/t infection\nAEB T 38.8°C, chills' },
    ],
    interventions: [
      { title: 'O2 therapy', body: '2-4L NC; titrate SpO2 ≥ 94%', diagnosisIndex: 0 },
      { title: 'Airway clearance', body: 'Incentive spirometry q1h while awake\nDeep breathing & coughing', diagnosisIndex: 1 },
      { title: 'Antipyretics + Abx', body: 'Acetaminophen 650mg q6h PRN\nCeftriaxone + azithromycin per protocol', diagnosisIndex: 2 },
    ],
    outcomes: [
      { title: 'SpO2 ≥ 94%', body: 'On ≤ 2L within 24 hr', interventionIndex: 0 },
      { title: 'Effective airway', body: 'Clear or improving lung sounds\nProductive cough effective', interventionIndex: 1 },
      { title: 'Afebrile', body: 'T < 38°C within 48 hr\nWBC trending down', interventionIndex: 2 },
    ],
    complications: [
      { title: 'Sepsis / septic shock', body: 'If infection progresses systemically' },
      { title: 'Respiratory failure', body: 'May require BiPAP or intubation' },
    ],
    medications: [],
  };

  return { CHF_MAP, PNEUMONIA_MAP };
}

/**
 * Returns initial empty state nodes/edges with a default root node
 */
export function getEmptyMap() {
  return {
    nodes: [],
    edges: [],
  };
}
