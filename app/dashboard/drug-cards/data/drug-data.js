// ============================================================
//  STEMRN Drug Cards Data Store
//  Medically accurate, high-yield nursing drug cards
// ============================================================

export const DRUG_DATA = {
  metformin: {
    genericName: "Metformin",
    brandNames: "Glucophage, Fortamet, Glumetza",
    therapeuticClass: "Antidiabetic",
    pharmacologicClass: "Biguanide",
    isHighAlert: false,
    mechanismOfAction: "Decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity by increasing peripheral glucose uptake and utilization.",
    indications: [
      "Management of Type 2 Diabetes Mellitus.",
      "Off-label: Management of Polycystic Ovary Syndrome (PCOS)."
    ],
    contraindications: [
      "Severe renal impairment (eGFR < 30 mL/min/1.73 m²).",
      "Acute or chronic metabolic acidosis, including diabetic ketoacidosis (DKA).",
      "Hypersensitivity to metformin."
    ],
    sideEffects: {
      common: [
        "Abdominal bloating, diarrhea, nausea, vomiting, metallic taste, flatulence.",
        "Vitamin B12 deficiency (with long-term use)."
      ],
      lifeThreatening: [
        "Lactic Acidosis (rare but highly fatal; characterized by hyperventilation, myalgia, somnolence, and abdominal pain)."
      ]
    },
    nursingConsiderations: [
      "Monitor renal function (eGFR, Serum Creatinine) closely before initiating therapy and at least annually.",
      "Hold metformin for 48 hours before and after any imaging procedure using IV iodinated contrast media due to risk of contrast-induced acute renal failure and subsequent lactic acidosis.",
      "Assess blood glucose levels and HbA1c periodically to monitor treatment efficacy."
    ],
    patientTeaching: [
      "Take metformin with meals to reduce gastrointestinal side effects.",
      "Avoid excessive alcohol consumption (both acute and chronic), as it increases the risk of lactic acidosis.",
      "Report signs of lactic acidosis immediately: unusual tiredness, muscle pain, difficulty breathing, or unexplained stomach discomfort."
    ],
    antidote: "None (Hemodialysis can be used to remove the drug and correct the metabolic acidosis).",
    keyLabs: "eGFR, Serum Creatinine, HbA1c, Vitamin B12 levels."
  },
  furosemide: {
    genericName: "Furosemide",
    brandNames: "Lasix",
    therapeuticClass: "Diuretic",
    pharmacologicClass: "Loop Diuretic",
    isHighAlert: false,
    mechanismOfAction: "Inhibits the reabsorption of sodium and chloride from the loop of Henle and distal renal tubule, leading to increased excretion of water, sodium, chloride, magnesium, hydrogen, and calcium.",
    indications: [
      "Edema associated with heart failure, hepatic impairment, or renal disease.",
      "Hypertension (either alone or in combination with other antihypertensives)."
    ],
    contraindications: [
      "Anuria (inability to produce urine).",
      "Hepatic coma or precoma.",
      "Severe electrolyte depletion."
    ],
    sideEffects: {
      common: [
        "Dehydration, hypotension, orthostatic hypotension, muscle cramps.",
        "Electrolyte imbalances: Hypokalemia, Hyponatremia, Hypomagnesemia, Hypocalcemia.",
        "Hyperuricemia (may trigger gout attacks), photosensitivity."
      ],
      lifeThreatening: [
        "Ototoxicity (transient or permanent hearing loss, tinnitus; high risk with rapid IV push).",
        "Stevens-Johnson Syndrome (SJS), Toxic Epidermal Necrolysis (TEN)."
      ]
    },
    nursingConsiderations: [
      "Assess fluid status: monitor daily weights, intake and output ratios, and presence of edema.",
      "Monitor blood pressure and pulse rate prior to and during administration. Assess for orthostatic hypotension.",
      "Monitor serum potassium levels closely. Assess for signs of hypokalemia (muscle weakness, cardiac dysrhythmias).",
      "Administer IV doses slowly (not exceeding 20 mg/min) to prevent transient or permanent ototoxicity."
    ],
    patientTeaching: [
      "Change positions slowly to minimize orthostatic hypotension (dizziness).",
      "Eat foods high in potassium (bananas, potatoes, spinach, citrus fruits) as instructed by your provider.",
      "Report ringing in the ears (tinnitus), hearing loss, or severe muscle weakness immediately."
    ],
    antidote: "None (Treatment is supportive, focusing on fluid and electrolyte replacement).",
    keyLabs: "Serum Potassium, Sodium, BUN, Creatinine, Magnesium, Uric Acid."
  },
  heparin: {
    genericName: "Heparin",
    brandNames: "Hep-Lock, Heparin Sodium",
    therapeuticClass: "Anticoagulant",
    pharmacologicClass: "Indirect Thrombin Inhibitor",
    isHighAlert: true,
    mechanismOfAction: "Potentiates the inhibitory effect of antithrombin III on coagulation factors IIa (thrombin) and Xa, preventing the conversion of fibrinogen to fibrin and stopping the extension of existing clots.",
    indications: [
      "Prophylaxis and treatment of venous thromboembolism (DVT, PE).",
      "Prevention of clotting in arterial and heart surgery, and during hemodialysis.",
      "Adjuvant treatment of acute myocardial infarction."
    ],
    contraindications: [
      "Severe, uncontrolled bleeding.",
      "Severe thrombocytopenia or history of Heparin-Induced Thrombocytopenia (HIT).",
      "Hypersensitivity to heparin."
    ],
    sideEffects: {
      common: [
        "Bleeding, easy bruising (ecchymosis), injection site irritation or pain.",
        "Osteoporosis (with long-term, high-dose therapy)."
      ],
      lifeThreatening: [
        "Heparin-Induced Thrombocytopenia (HIT) - an immune-mediated drop in platelet count (typically >50% drop) paradoxically causing severe arterial or venous thrombosis.",
        "Severe Hemorrhage."
      ]
    },
    nursingConsiderations: [
      "This is a High-Alert Medication. Always double-check infusion rates and doses with a second licensed nurse.",
      "Monitor activated partial thromboplastin time (aPTT) closely (therapeutic range is typically 1.5 to 2.5 times the laboratory control value).",
      "Assess for signs of bleeding: hematuria, coffee-ground emesis, black tarry stools, epistaxis, bleeding gums, or large bruises.",
      "Implement bleeding precautions: use a soft-bristled toothbrush, electric razor, and avoid intramuscular injections."
    ],
    patientTeaching: [
      "Report any unusual bleeding, bruising, red or dark urine, or black stools immediately.",
      "Use a soft toothbrush and electric razor to prevent cuts and bleeding.",
      "Avoid taking aspirin, NSAIDs, or other over-the-counter blood thinners without consulting your physician."
    ],
    antidote: "Protamine Sulfate (1 mg neutralizes approximately 100 units of Heparin).",
    keyLabs: "aPTT, Platelet count (CBC) - monitor every 2-3 days during therapy, Hemoglobin, Hematocrit."
  },
  insulin: {
    genericName: "Insulin",
    brandNames: "Humulin R, Novolin R (Regular); Humalog (Lispro); Lantus (Glargine)",
    therapeuticClass: "Antidiabetic",
    pharmacologicClass: "Pancreatic Hormone",
    isHighAlert: true,
    mechanismOfAction: "Lowers blood glucose by stimulating glucose uptake in skeletal muscle and fat, and by inhibiting hepatic glucose production.",
    indications: [
      "Treatment of Type 1 Diabetes Mellitus.",
      "Treatment of Type 2 Diabetes Mellitus uncontrolled by diet and oral agents.",
      "Treatment of Diabetic Ketoacidosis (DKA) and Hyperosmolar Hyperglycemic State (HHS) (Regular Insulin IV)."
    ],
    contraindications: [
      "Hypoglycemia (blood glucose < 70 mg/dL).",
      "Hypersensitivity to the specific insulin formulation."
    ],
    sideEffects: {
      common: [
        "Injection site reactions, lipodystrophy (thickening or pitting of subcutaneous fat), weight gain.",
        "Hypokalemia (insulin drives potassium into cells)."
      ],
      lifeThreatening: [
        "Severe Hypoglycemia (can lead to confusion, seizures, coma, and death).",
        "Anaphylaxis."
      ]
    },
    nursingConsiderations: [
      "High-Alert Medication. Verify insulin type, dose, and syringe with another registered nurse prior to administration.",
      "Know the onset, peak, and duration of the specific insulin being administered:",
      " - Rapid-acting (Lispro): Onset 15m, Peak 1-2h, Duration 3-4h.",
      " - Short-acting (Regular): Onset 30m, Peak 2-4h, Duration 5-8h.",
      " - Intermediate (NPH): Onset 2h, Peak 4-12h, Duration 18-24h.",
      " - Long-acting (Glargine): Onset 1-2h, No Peak, Duration 24h.",
      "Ensure the patient has a meal tray available at the onset/peak times of the insulin."
    ],
    patientTeaching: [
      "Instruct on proper subcutaneous injection technique and the importance of rotating injection sites to prevent lipodystrophy.",
      "Teach signs of hypoglycemia (sweating, shaking, tachycardia, confusion) and the Rule of 15 (15g of fast-acting sugar, retest in 15 mins).",
      "Always wear a medical alert identification bracelet or carry card stating you take insulin."
    ],
    antidote: "Glucagon (SC/IM) or Dextrose 50% (D50W) IV for severe hypoglycemia.",
    keyLabs: "Blood glucose, HbA1c, Serum Potassium (when treating DKA)."
  },
  warfarin: {
    genericName: "Warfarin",
    brandNames: "Coumadin, Jantoven",
    therapeuticClass: "Anticoagulant",
    pharmacologicClass: "Vitamin K Antagonist",
    isHighAlert: true,
    mechanismOfAction: "Interferes with the hepatic synthesis of Vitamin K-dependent clotting factors (II, VII, IX, and X), preventing further thrombus formation and embolization.",
    indications: [
      "Prophylaxis and treatment of venous thromboembolism (DVT, PE).",
      "Prevention of thromboembolic complications associated with atrial fibrillation or cardiac valve replacements.",
      "Reduction of the risk of recurrent MI."
    ],
    contraindications: [
      "Uncontrolled active bleeding or bleeding tendencies.",
      "Pregnancy (category X; teratogenic/causes fetal hemorrhage).",
      "Severe, uncontrolled hypertension.",
      "Recent or contemplated surgery of the CNS, eye, or major trauma."
    ],
    sideEffects: {
      common: [
        "Bruising, bleeding, abdominal cramps, nausea, dermal necrosis.",
        "Alopecia (rare)."
      ],
      lifeThreatening: [
        "Fatal or severe bleeding/hemorrhage.",
        "Warfarin-induced skin necrosis or calciphylaxis."
      ]
    },
    nursingConsiderations: [
      "High-Alert Medication. Monitor Prothrombin Time (PT) and International Normalized Ratio (INR) closely. Therapeutic INR range is typically 2.0 to 3.0 (2.5 to 3.5 for mechanical valves).",
      "Assess for bleeding (hematuria, tarry stools, bruising, epistaxis).",
      "Highly interactive: review all medications, herbals, and diet. Salicylates, NSAIDs, and many antibiotics increase bleeding risk."
    ],
    patientTeaching: [
      "Maintain a consistent intake of Vitamin K-rich foods (green leafy vegetables like spinach, kale). Do not suddenly increase or decrease intake.",
      "Avoid alcohol and over-the-counter NSAIDs or aspirin unless specifically approved by your provider.",
      "Use soft toothbrushes and electric razors. Avoid contact sports."
    ],
    antidote: "Vitamin K (Phytonadione). For acute bleeding, administer Fresh Frozen Plasma (FFP) or Prothrombin Complex Concentrate (PCC).",
    keyLabs: "PT/INR, Hematocrit, Hemoglobin, Platelet count."
  },
  morphine: {
    genericName: "Morphine",
    brandNames: "MS Contin, Duramorph, Roxanol",
    therapeuticClass: "Opioid Analgesic",
    pharmacologicClass: "Opioid Agonist (Schedule II)",
    isHighAlert: true,
    mechanismOfAction: "Binds to opioid receptors (mu, kappa) in the central nervous system, altering the perception of and emotional response to painful stimuli, while producing generalized CNS depression.",
    indications: [
      "Management of severe acute or chronic pain.",
      "Adjuvant therapy in pulmonary edema (vasodilatory effect decreases preload).",
      "Pain relief during myocardial infarction (reduces myocardial oxygen demand)."
    ],
    contraindications: [
      "Severe respiratory depression.",
      "Acute or severe bronchial asthma or COPD exacerbation.",
      "Paralytic ileus or GI obstruction."
    ],
    sideEffects: {
      common: [
        "Constipation, sedation, drowsiness, dizziness, nausea, vomiting, pruritus (itching).",
        "Hypotension, orthostatic hypotension, urinary retention."
      ],
      lifeThreatening: [
        "Severe Respiratory Depression (dose-dependent; can lead to respiratory arrest).",
        "Severe Hypotension, bradycardia, or circulatory collapse."
      ]
    },
    nursingConsiderations: [
      "High-Alert Medication. Assess respiratory rate and depth, heart rate, and blood pressure before administration. Hold dose if RR < 12 breaths/min.",
      "Assess pain level before and 30-60 minutes after administration.",
      "Administer IV push slowly over 4-5 minutes to prevent rapid drops in blood pressure and respiratory drive.",
      "Implement fall precautions (high risk of sedation and orthostatic hypotension)."
    ],
    patientTeaching: [
      "Request assistance when getting out of bed or ambulating due to dizziness.",
      "Prevent constipation by increasing fluid and dietary fiber intake, and using stool softeners regularly.",
      "Avoid alcohol and other CNS depressants (sleeping pills, anti-anxiety meds) as they can cause fatal sedation."
    ],
    antidote: "Naloxone (Narcan) - opioid antagonist.",
    keyLabs: "Hepatic and renal function (with chronic or high-dose therapy)."
  },
  lisinopril: {
    genericName: "Lisinopril",
    brandNames: "Prinivil, Zestril",
    therapeuticClass: "Antihypertensive",
    pharmacologicClass: "ACE (Angiotensin-Converting Enzyme) Inhibitor",
    isHighAlert: false,
    mechanismOfAction: "Blocks the conversion of Angiotensin I to Angiotensin II, a potent vasoconstrictor, resulting in systemic vasodilation and decreased aldosterone secretion, which leads to sodium excretion and potassium retention.",
    indications: [
      "Hypertension.",
      "Heart failure (adjuvant therapy).",
      "Post-Myocardial Infarction management to improve survival."
    ],
    contraindications: [
      "History of angioedema related to previous ACE inhibitor treatment.",
      "Pregnancy (causes fetal toxicity/injury or death).",
      "Concomitant use of aliskiren in patients with diabetes."
    ],
    sideEffects: {
      common: [
        "Dry Cough (nonproductive, persistent, caused by bradykinin accumulation).",
        "Dizziness, headache, hypotension, hyperkalemia, renal impairment."
      ],
      lifeThreatening: [
        "Angioedema (sudden swelling of the face, neck, tongue, or airway; can lead to airway obstruction).",
        "Agranulocytosis/neutropenia (rare)."
      ]
    },
    nursingConsiderations: [
      "Monitor blood pressure and heart rate closely. Assess for first-dose hypotension (especially in patients taking diuretics).",
      "Monitor serum potassium levels closely. Assess for signs of hyperkalemia.",
      "Monitor renal function (BUN, Creatinine) before and during treatment.",
      "Assess for any signs of angioedema (lip/tongue swelling, difficulty breathing) and discontinue immediately if present."
    ],
    patientTeaching: [
      "Avoid salt substitutes containing potassium, as they increase the risk of hyperkalemia.",
      "Change positions slowly to minimize orthostatic hypotension (dizziness).",
      "Report a persistent, dry cough or any swelling of the face, lips, tongue, or throat immediately."
    ],
    antidote: "None (Supportive care, IV fluids for hypotension. Can be removed by hemodialysis).",
    keyLabs: "Serum Potassium, BUN, Serum Creatinine, CBC (neutrophils)."
  },
  digoxin: {
    genericName: "Digoxin",
    brandNames: "Lanoxin",
    therapeuticClass: "Antiarrhythmic, Inotropic",
    pharmacologicClass: "Cardiac Glycoside",
    isHighAlert: true,
    mechanismOfAction: "Inhibits the sodium-potassium ATPase pump, increasing intracellular calcium. This increases myocardial contractility (positive inotropic effect) and decreases heart rate and conduction velocity (negative chronotropic/dromotropic effect).",
    indications: [
      "Heart failure (mild-to-moderate, with other agents).",
      "Atrial Fibrillation and Atrial Flutter (rate control)."
    ],
    contraindications: [
      "Ventricular fibrillation.",
      "Hypersensitivity to cardiac glycosides."
    ],
    sideEffects: {
      common: [
        "Fatigue, headache, muscle weakness, bradycardia.",
        "Anorexia, nausea, vomiting, diarrhea."
      ],
      lifeThreatening: [
        "Digoxin Toxicity - characterized by life-threatening cardiac dysrhythmias (including AV block and PVCs). Early signs include anorexia, nausea, vomiting, and visual changes (blurred vision, yellow-green halos)."
      ]
    },
    nursingConsiderations: [
      "High-Alert Medication. Assess apical pulse for 1 full minute prior to administration. Hold if HR < 60 bpm in adults (or < 90 bpm in infants).",
      "Monitor serum digoxin levels (therapeutic range is 0.5 to 2.0 ng/mL; toxicity occurs > 2.0 ng/mL).",
      "Monitor potassium levels closely. Hypokalemia increases the risk of digoxin toxicity because digoxin binds to the same ATPase site as potassium."
    ],
    patientTeaching: [
      "Learn how to take your pulse before each dose and notify your provider if it is below 60 bpm.",
      "Do not take double doses if a dose is missed.",
      "Report signs of toxicity immediately: loss of appetite, nausea, vomiting, or changes in vision (seeing yellow/green spots or halos)."
    ],
    antidote: "Digoxin Immune Fab (Digibind, DigiFab) - binds to digoxin molecules, rendering them inactive.",
    keyLabs: "Therapeutic Digoxin Level, Serum Potassium, Magnesium, Calcium, Serum Creatinine (digoxin is renally excreted)."
  },
  metoprolol: {
    genericName: "Metoprolol",
    brandNames: "Lopressor (Tartrate), Toprol-XL (Succinate)",
    therapeuticClass: "Antihypertensive, Antianginal",
    pharmacologicClass: "Beta-Blocker (Beta-1 Selective)",
    isHighAlert: false,
    mechanismOfAction: "Selectively blocks beta-1 (cardiac) adrenergic receptors, reducing heart rate, myocardial contractility, cardiac output, and systemic blood pressure.",
    indications: [
      "Hypertension.",
      "Angina pectoris.",
      "Heart Failure (stable, compensated class II/III).",
      "Early treatment and secondary prevention of Myocardial Infarction."
    ],
    contraindications: [
      "Severe bradycardia (HR < 45-50 bpm).",
      "Second- or third-degree heart block (without a pacemaker).",
      "Cardiogenic shock or sick sinus syndrome.",
      "Decompensated heart failure."
    ],
    sideEffects: {
      common: [
        "Bradycardia, hypotension, fatigue, dizziness, depression.",
        "Erectile dysfunction, cold extremities, sleep disturbances."
      ],
      lifeThreatening: [
        "Bronchospasm or bronchoconstriction (use caution in patients with asthma or COPD).",
        "Heart block, acute heart failure exacerbation, cardiac arrest."
      ]
    },
    nursingConsiderations: [
      "Assess blood pressure and apical pulse before giving. Hold dose and notify provider if HR < 50-60 bpm or systolic BP < 90-100 mmHg.",
      "Monitor for signs of heart failure: dyspnea, crackles in lungs, peripheral edema, sudden weight gain.",
      "Caution in diabetic patients: Beta-blockers can mask the autonomic symptoms of hypoglycemia (tachycardia, palpitations), though sweating may still occur.",
      "Do not stop drug abruptly; taper off over 1-2 weeks to avoid rebound hypertension, severe angina, or MI."
    ],
    patientTeaching: [
      "Do not stop taking metoprolol suddenly. Abrupt withdrawal can cause life-threatening heart issues.",
      "Change positions slowly to prevent orthostatic hypotension.",
      "Monitor blood pressure and pulse rate at home. Report pulse below 50 bpm or severe dizziness."
    ],
    antidote: "Glucagon IV (stimulates myocardial contractility bypass-ing beta receptors), Atropine for bradycardia, IV fluids for hypotension.",
    keyLabs: "None specific. Monitor blood glucose in diabetics."
  },
  aspirin: {
    genericName: "Aspirin (Acetylsalicylic Acid / ASA)",
    brandNames: "Bayer Aspirin, Ecotrin, Bufferin",
    therapeuticClass: "Antiplatelet, Antipyretic, Nonopioid Analgesic, Anti-inflammatory",
    pharmacologicClass: "Salicylate / Platelet Aggregation Inhibitor",
    isHighAlert: false,
    mechanismOfAction: "Irreversibly inhibits cyclooxygenase-1 and 2 (COX-1 & COX-2) enzymes, decreasing prostaglandin synthesis (analgesic/anti-inflammatory) and preventing production of thromboxane A2, thereby inhibiting platelet aggregation.",
    indications: [
      "Prophylaxis of transient ischemic attacks (TIAs) and myocardial infarction (MI).",
      "Management of acute myocardial infarction (chewed at onset).",
      "Mild-to-moderate pain or fever.",
      "Inflammatory disorders (rheumatoid arthritis, osteoarthritis)."
    ],
    contraindications: [
      "Bleeding disorders (hemophilia, active bleeding).",
      "Active peptic ulcer disease.",
      "History of NSAID-induced asthma or urticaria.",
      "Children and teenagers with viral infections (risk of Reye's syndrome)."
    ],
    sideEffects: {
      common: [
        "Dyspepsia, heartburn, nausea, epigastric pain, bruising.",
        "Increased bleeding time."
      ],
      lifeThreatening: [
        "Gastrointestinal bleeding, hemorrhage.",
        "Salicylate Toxicity (Salicylism) - characterized by tinnitus, hearing loss, hyperventilation, metabolic acidosis.",
        "Reye's Syndrome in children (fatal encephalopathy and liver damage).",
        "Anaphylaxis / Laryngeal edema."
      ]
    },
    nursingConsiderations: [
      "Assess for signs of bleeding: dark/tarry stools, hematemesis, easy bruising, petechiae.",
      "Assess for symptoms of salicylism (tinnitus, ringing in ears, hyperventilation) if taking high doses.",
      "Administer with food or milk to minimize gastrointestinal irritation.",
      "Hold aspirin therapy 5-7 days before scheduled elective surgeries."
    ],
    patientTeaching: [
      "Take with food or a full glass of water. Do not crush or chew enteric-coated tablets.",
      "Report ringing in the ears, hearing changes, black/tarry stools, or coffee-ground vomit immediately.",
      "Do not give aspirin to children or teenagers recovering from chickenpox, flu, or viral infections."
    ],
    antidote: "None (Activated charcoal to limit absorption; Sodium Bicarbonate IV to alkalinize urine and promote excretion; Hemodialysis for severe poisoning).",
    keyLabs: "Platelet count, Hemoglobin, Hematocrit, Liver functions, Renal functions."
  },
  amoxiciilin: {
    genericName: "Amoxicillin",
    brandNames: "Amoxil, Moxatag",
    therapeuticClass: "Anti-infective / Antibiotic",
    pharmacologicClass: "Aminopenicillin / Beta-lactam Antibiotic",
    isHighAlert: false,
    mechanismOfAction: "Binds to bacterial cell wall, inhibiting cell wall synthesis, leading to cell lysis and death of susceptible bacteria.",
    indications: [
      "Treatment of infections of the ear, nose, throat, skin, respiratory tract, and urinary tract.",
      "Part of combination therapy for H. pylori eradication."
    ],
    contraindications: [
      "Hypersensitivity to penicillins, cephalosporins, or other beta-lactam antibiotics."
    ],
    sideEffects: {
      common: [
        "Diarrhea, nausea, vomiting, rash, vaginitis (yeast infection), oral candidiasis (thrush)."
      ],
      lifeThreatening: [
        "Anaphylaxis (bronchospasm, laryngeal edema, cardiovascular collapse).",
        "Clostridioides difficile-Associated Diarrhea (CDAD) / Pseudomembranous Colitis.",
        "Stevens-Johnson Syndrome (SJS)."
      ]
    },
    nursingConsiderations: [
      "Always check for penicillin or cephalosporin allergy history before the first dose.",
      "Monitor closely for anaphylaxis during the first dose (especially with IV formulations, though amoxicillin is oral).",
      "Assess bowel patterns. Report severe, watery diarrhea containing blood or mucus immediately, as it may indicate CDAD.",
      "Monitor renal function in elderly patients or those with renal impairment."
    ],
    patientTeaching: [
      "Complete the entire course of antibiotics, even if you feel better. Stopping early can lead to antibiotic resistance.",
      "Take with or without food. Shake liquid suspension well before measuring doses.",
      "Report severe, watery diarrhea immediately. Do not take antidiarrheal medicines without consulting a doctor.",
      "Female patients: Penicillins may decrease the effectiveness of oral contraceptives. Use an alternative/barrier method of birth control."
    ],
    antidote: "None (Supportive care; Epinephrine/antihistamines for anaphylaxis; Hemodialysis can remove drug from circulation).",
    keyLabs: "CBC, Renal function, Liver enzymes (with prolonged high-dose therapy)."
  },
  amoxicillin: {
    // Alias to support standard spelling too
    genericName: "Amoxicillin",
    brandNames: "Amoxil, Moxatag",
    therapeuticClass: "Anti-infective / Antibiotic",
    pharmacologicClass: "Aminopenicillin / Beta-lactam Antibiotic",
    isHighAlert: false,
    mechanismOfAction: "Binds to bacterial cell wall, inhibiting cell wall synthesis, leading to cell lysis and death of susceptible bacteria.",
    indications: [
      "Treatment of infections of the ear, nose, throat, skin, respiratory tract, and urinary tract.",
      "Part of combination therapy for H. pylori eradication."
    ],
    contraindications: [
      "Hypersensitivity to penicillins, cephalosporins, or other beta-lactam antibiotics."
    ],
    sideEffects: {
      common: [
        "Diarrhea, nausea, vomiting, rash, vaginitis (yeast infection), oral candidiasis (thrush)."
      ],
      lifeThreatening: [
        "Anaphylaxis (bronchospasm, laryngeal edema, cardiovascular collapse).",
        "Clostridioides difficile-Associated Diarrhea (CDAD) / Pseudomembranous Colitis.",
        "Stevens-Johnson Syndrome (SJS)."
      ]
    },
    nursingConsiderations: [
      "Always check for penicillin or cephalosporin allergy history before the first dose.",
      "Monitor closely for anaphylaxis during the first dose.",
      "Assess bowel patterns. Report severe, watery diarrhea containing blood or mucus immediately, as it may indicate CDAD.",
      "Monitor renal function in elderly patients or those with renal impairment."
    ],
    patientTeaching: [
      "Complete the entire course of antibiotics, even if you feel better.",
      "Take with or without food. Shake liquid suspension well before measuring doses.",
      "Report severe, watery diarrhea immediately.",
      "Female patients: Penicillins may decrease the effectiveness of oral contraceptives. Use an alternative/barrier method of birth control."
    ],
    antidote: "None (Supportive care; Epinephrine/antihistamines for anaphylaxis).",
    keyLabs: "CBC, Renal function, Liver enzymes."
  },
  atorvastatin: {
    genericName: "Atorvastatin",
    brandNames: "Lipitor",
    therapeuticClass: "Lipid-lowering Agent",
    pharmacologicClass: "HMG-CoA Reductase Inhibitor (Statin)",
    isHighAlert: false,
    mechanismOfAction: "Inhibits HMG-CoA reductase, the enzyme responsible for the rate-limiting step in cholesterol synthesis. Decreases total cholesterol, LDL, and triglycerides, while moderately increasing HDL.",
    indications: [
      "Hypercholesterolemia (primary and mixed dyslipidemia).",
      "Primary and secondary prevention of cardiovascular events (myocardial infarction, stroke) in patients at risk."
    ],
    contraindications: [
      "Active liver disease or unexplained persistent elevations in serum transaminases.",
      "Pregnancy and lactation (category X; teratogenic/inhibits fetal cholesterol pathway)."
    ],
    sideEffects: {
      common: [
        "Headache, dyspepsia, flatulence, abdominal pain, mild muscle aches (myalgia), insomnia."
      ],
      lifeThreatening: [
        "Rhabdomyolysis - acute breakdown of skeletal muscle tissue leading to release of myoglobin, causing acute kidney injury (AKI) and dark/tea-colored urine.",
        "Hepatotoxicity (elevations in AST/ALT)."
      ]
    },
    nursingConsiderations: [
      "Monitor liver function tests (LFTs) prior to initiation, and periodically thereafter as clinically indicated.",
      "Assess for signs of muscle pain, tenderness, or weakness (myopathy), particularly if accompanied by fever or malaise.",
      "Instruct to take at any time of day, but consistently. (Statins with shorter half-lives must be taken at night, but Atorvastatin has a long half-life)."
    ],
    patientTeaching: [
      "Avoid drinking large quantities of grapefruit juice (>1 quart/day), as it inhibits CYP3A4 metabolism and increases toxicity risk.",
      "Report unexplained muscle pain, tenderness, or weakness immediately, especially if you have a fever or tea-colored urine.",
      "Maintain a cholesterol-lowering diet and regular exercise regimen as prescribed."
    ],
    antidote: "None (Treatment is supportive).",
    keyLabs: "Lipid Panel (total cholesterol, LDL, HDL, triglycerides), AST, ALT, Creatine Kinase (CK/CPK if muscle symptoms occur)."
  },
  // Extra popular medications
  amlodipine: {
    genericName: "Amlodipine",
    brandNames: "Norvasc",
    therapeuticClass: "Antihypertensive, Antianginal",
    pharmacologicClass: "Calcium Channel Blocker (Dihydropyridine)",
    isHighAlert: false,
    mechanismOfAction: "Inhibits calcium influx across cardiac and vascular smooth-muscle cell membranes, leading to selective coronary and systemic vasodilation, reducing systemic vascular resistance and blood pressure.",
    indications: [
      "Hypertension.",
      "Angina pectoris (chronic stable angina or vasospastic/Prinzmetal's angina)."
    ],
    contraindications: [
      "Hypersensitivity to calcium channel blockers.",
      "Severe hypotension."
    ],
    sideEffects: {
      common: [
        "Peripheral edema (swelling of ankles/feet), headache, dizziness, flushing, palpitations.",
        "Fatigue, nausea."
      ],
      lifeThreatening: [
        "Severe hypotension, worsening angina or myocardial infarction (rare, at start of therapy or dosage increase)."
      ]
    },
    nursingConsiderations: [
      "Monitor blood pressure and pulse rate before and during treatment.",
      "Assess for peripheral edema (fluid accumulation in ankles/feet) - a common vasodilatory side effect not related to heart failure.",
      "Monitor intake/output and daily weight."
    ],
    patientTeaching: [
      "Change positions slowly to avoid dizziness.",
      "Report persistent swelling of ankles or feet, breathing difficulties, or chest pain.",
      "Maintain good oral hygiene; CCBs can rarely cause gingival hyperplasia."
    ],
    antidote: "Calcium Chloride or Calcium Gluconate IV, vasopressors for severe overdose.",
    keyLabs: "None specific."
  },
  albuterol: {
    genericName: "Albuterol",
    brandNames: "ProAir, Ventolin, Proventil",
    therapeuticClass: "Bronchodilator",
    pharmacologicClass: "Beta-2 Adrenergic Agonist (Short-acting / SABA)",
    isHighAlert: false,
    mechanismOfAction: "Binds to beta-2 adrenergic receptors in bronchial smooth muscle, stimulating adenyl cyclase, which increases cAMP and causes relaxation of bronchiole airways.",
    indications: [
      "Treatment or prevention of bronchospasm in asthma, COPD, or reactive airway disease.",
      "Prevention of exercise-induced bronchospasm."
    ],
    contraindications: [
      "Hypersensitivity to albuterol or milk proteins (in dry powder inhalers)."
    ],
    sideEffects: {
      common: [
        "Tremor, tachycardia, palpitations, nervousness, restlessness, headache.",
        "Hypokalemia (drives potassium into cells at high doses)."
      ],
      lifeThreatening: [
        "Paradoxical Bronchospasm (wheezing worsens after administration; discontinue immediately).",
        "Cardiac Arrhythmias."
      ]
    },
    nursingConsiderations: [
      "Assess lung sounds, respiratory rate, and heart rate before and after administration.",
      "If administering multiple inhalers, administer albuterol (bronchodilator) FIRST to open the airways, wait 5 minutes, then administer corticosteroid/other inhalers.",
      "Monitor for signs of paradoxical bronchospasm."
    ],
    patientTeaching: [
      "Keep albuterol with you at all times as it is your 'rescue' inhaler. Do not use as a daily controller unless directed.",
      "Learn proper inhaler technique: shake well, use spacer if prescribed, rinse mouth with water after use (especially if combined with steroid).",
      "Report palpitations, chest pain, or worsening shortness of breath."
    ],
    antidote: "Beta-blocker (with caution, as it can trigger severe bronchospasm in asthmatics).",
    keyLabs: "Serum Potassium (at high, continuous doses)."
  },
  prednisone: {
    genericName: "Prednisone",
    brandNames: "Deltasone, Rayos",
    therapeuticClass: "Anti-inflammatory, Immunosuppressant",
    pharmacologicClass: "Corticosteroid (Glucocorticoid)",
    isHighAlert: false,
    mechanismOfAction: "Suppresses inflammation and normal immune responses by inhibiting inflammatory cytokines, lysosomal enzymes, and prostaglandin synthesis.",
    indications: [
      "Inflammatory, allergic, hematologic, neoplastic, or autoimmune disorders.",
      "Prevention of organ transplant rejection."
    ],
    contraindications: [
      "Active untreated systemic infections (suppresses immune system).",
      "Hypersensitivity."
    ],
    sideEffects: {
      common: [
        "Hyperglycemia, fluid retention, weight gain, increased appetite, mood changes (irritability, euphoria), insomnia.",
        "Osteoporosis, muscle wasting, thin skin, delayed wound healing (long-term use).",
        "Cushingoid appearance ('moon face', 'buffalo hump')."
      ],
      lifeThreatening: [
        "Adrenal Suppression / Insufficiency (if stopped abruptly).",
        "Peptic Ulceration, GI bleeding.",
        "Increased susceptibility to severe infection."
      ]
    },
    nursingConsiderations: [
      "Monitor blood glucose levels frequently (corticosteroids cause hyperglycemia, requiring insulin dose adjustments).",
      "Monitor weight, blood pressure, and signs of fluid retention (edema, crackles).",
      "Assess for symptoms of GI bleeding (tarry stools).",
      "**Do not discontinue abruptly**; taper the dose gradually to prevent adrenal crisis (hypotension, cardiovascular collapse)."
    ],
    patientTeaching: [
      "Take exactly as directed; **do not skip or stop taking prednisone suddenly**.",
      "Take with food or milk to minimize GI irritation.",
      "Avoid crowds or individuals with active infections (you are immunosuppressed).",
      "Diabetics: Monitor blood sugar closely as prednisone will raise glucose levels."
    ],
    antidote: "None (Tapering dose, supportive therapy).",
    keyLabs: "Blood glucose, Potassium (can cause hypokalemia), WBC count."
  }
};

// Helper to dynamically generate a realistic drug card for any other search term
export function generateMockDrugCard(name) {
  const normalized = name.toLowerCase().trim();
  if (DRUG_DATA[normalized]) {
    return DRUG_DATA[normalized];
  }

  // Handle common aliases or slight typos
  if (normalized.includes("metformin")) return DRUG_DATA.metformin;
  if (normalized.includes("lasix") || normalized.includes("furosemide")) return DRUG_DATA.furosemide;
  if (normalized.includes("heparin")) return DRUG_DATA.heparin;
  if (normalized.includes("insulin")) return DRUG_DATA.insulin;
  if (normalized.includes("warfarin") || normalized.includes("coumadin")) return DRUG_DATA.warfarin;
  if (normalized.includes("morphine")) return DRUG_DATA.morphine;
  if (normalized.includes("lisinopril") || normalized.includes("zestril")) return DRUG_DATA.lisinopril;
  if (normalized.includes("digoxin") || normalized.includes("lanoxin")) return DRUG_DATA.digoxin;
  if (normalized.includes("metoprolol") || normalized.includes("lopressor")) return DRUG_DATA.metoprolol;
  if (normalized.includes("aspirin") || normalized.includes("bayer")) return DRUG_DATA.aspirin;
  if (normalized.includes("amoxicillin") || normalized.includes("amoxil") || normalized.includes("amoxiciilin")) return DRUG_DATA.amoxicillin;
  if (normalized.includes("atorvastatin") || normalized.includes("lipitor")) return DRUG_DATA.atorvastatin;
  if (normalized.includes("amlodipine") || normalized.includes("norvasc")) return DRUG_DATA.amlodipine;
  if (normalized.includes("albuterol") || normalized.includes("ventolin")) return DRUG_DATA.albuterol;
  if (normalized.includes("prednisone")) return DRUG_DATA.prednisone;

  // Title-cased name
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);

  // Generate a plausible clinical structure dynamically
  return {
    genericName: displayName,
    brandNames: `${displayName}-Brand, Generic-Equiv`,
    therapeuticClass: "Clinical Pharmacological Agent",
    pharmacologicClass: "Diagnostic / Therapeutic Class",
    isHighAlert: false,
    isGenerative: true,
    mechanismOfAction: `Acts selectively on targeted cellular receptors to modulate physiological response, regulating systemic pathways associated with ${displayName}.`,
    indications: [
      `Management of conditions indicating therapeutic use of ${displayName}.`,
      `Supportive clinical therapy under medical supervision.`
    ],
    contraindications: [
      `Hypersensitivity to ${displayName} or its active components.`,
      `Severe hepatic or renal insufficiency unless closely monitored.`,
      `Co-administration with contraindicated synergists.`
    ],
    sideEffects: {
      common: [
        "Headache, mild dizziness, nausea, dyspepsia, fatigue.",
        "Temporary physiological adjustments."
      ],
      lifeThreatening: [
        "Severe anaphylaxis or hypersensitivity reaction.",
        "Organ dysfunction under prolonged high dosage without monitoring."
      ]
    },
    nursingConsiderations: [
      "Perform baseline clinical assessment including vitals and patient history.",
      "Monitor patient closely during initial administration for signs of hypersensitivity.",
      "Validate dosage and review potential drug interactions."
    ],
    patientTeaching: [
      "Take medication exactly as prescribed by your healthcare provider.",
      "Report any severe side effects, rash, or breathing difficulties immediately.",
      "Store in a cool, dry place away from direct sunlight."
    ],
    antidote: "Symptomatic and supportive treatment.",
    keyLabs: "Comprehensive metabolic panel (CMP), CBC, renal function markers."
  };
}
