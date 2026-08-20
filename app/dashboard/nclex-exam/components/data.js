export const CURRICULUM = [
  {
    id: "medsurg",
    section: "Medical Surgical",
    color: "#2C5F8D",
    bg: "#eef4fb",
    categories: [
      {
        id: "medsurg-cardio",
        label: "Cardiovascular & Hematology",
        subtopics: [
          { name: "Heart Failure", count: 18, desc: "Acute & chronic, classifications, management" },
          { name: "Acute Coronary Syndrome", count: 16, desc: "MI, unstable angina, STEMI/NSTEMI" },
          { name: "Arrhythmias", count: 14, desc: "AFib, VT, bradycardia, blocks, ECG basics" },
          { name: "Hypertension", count: 12, desc: "Primary, secondary, hypertensive crisis" },
          { name: "Peripheral Vascular Disease", count: 10, desc: "PAD, PVD, DVT, varicose veins" },
          { name: "Anemias", count: 12, desc: "Iron-deficiency, B12, sickle cell, aplastic" },
          { name: "Coagulation Disorders", count: 10, desc: "DIC, hemophilia, thrombocytopenia" },
          { name: "Cardiac Surgery & Procedures", count: 10, desc: "CABG, valve replacement, cath lab" },
        ],
      },
      {
        id: "medsurg-resp",
        label: "Respiratory & Renal",
        subtopics: [
          { name: "COPD & Asthma", count: 16, desc: "Exacerbations, inhaler therapy, ABG interpretation" },
          { name: "Pneumonia", count: 12, desc: "CAP, HAP, aspiration, prevention" },
          { name: "Pulmonary Embolism", count: 10, desc: "Risk factors, diagnosis, anticoagulation" },
          { name: "Acute Respiratory Failure", count: 10, desc: "Type I/II, ARDS, ventilator management" },
          { name: "TB & Influenza", count: 8, desc: "Isolation, screening, antimicrobial therapy" },
          { name: "Acute Kidney Injury", count: 12, desc: "Pre/intra/post-renal causes, recovery" },
          { name: "Chronic Kidney Disease", count: 14, desc: "Stages, dialysis access, transplant" },
          { name: "Fluid & Electrolyte Imbalance", count: 18, desc: "Na, K, Ca, Mg, fluid volume disorders" },
        ],
      },
      {
        id: "medsurg-gi",
        label: "GI, Endocrine & Neuro",
        subtopics: [
          { name: "GI Bleeding", count: 10, desc: "Upper vs lower, peptic ulcer, varices" },
          { name: "Inflammatory Bowel Disease", count: 8, desc: "Crohn's, ulcerative colitis, ostomy care" },
          { name: "Liver Disease & Pancreatitis", count: 14, desc: "Cirrhosis, hepatitis, acute pancreatitis" },
          { name: "Diabetes Mellitus", count: 18, desc: "Type 1/2, DKA, HHS, insulin therapy" },
          { name: "Thyroid & Adrenal Disorders", count: 12, desc: "Hyper/hypothyroid, Cushing's, Addison's" },
          { name: "Stroke / CVA", count: 14, desc: "Ischemic, hemorrhagic, tPA, recovery" },
          { name: "Seizure Disorders", count: 10, desc: "Generalized, focal, status epilepticus" },
          { name: "Increased ICP & TBI", count: 12, desc: "Cushing's triad, ICP monitoring, neuro checks" },
          { name: "Spinal Cord Injury", count: 8, desc: "Levels, autonomic dysreflexia, rehab" },
        ],
      },
      {
        id: "medsurg-onc",
        label: "Oncology, Musculoskeletal & Integumentary",
        subtopics: [
          { name: "Cancer Care Fundamentals", count: 14, desc: "Staging, common cancers, screening" },
          { name: "Chemotherapy & Radiation", count: 12, desc: "Side effects, neutropenia, safety" },
          { name: "Pain Management in Oncology", count: 8, desc: "Opioids, adjuvants, end-of-life care" },
          { name: "Fractures & Casts", count: 10, desc: "Compartment syndrome, traction, healing" },
          { name: "Joint Replacement", count: 8, desc: "Hip, knee, post-op precautions" },
          { name: "Osteoporosis & Arthritis", count: 8, desc: "OA, RA, biologics, fall prevention" },
          { name: "Burns", count: 12, desc: "Rule of 9s, fluid resuscitation, infection" },
          { name: "Pressure Injuries & Wound Care", count: 10, desc: "Staging, prevention, dressing selection" },
        ],
      },
    ],
  },
  {
    id: "fund",
    section: "Fundamentals",
    color: "#0891b2",
    bg: "#ecfeff",
    categories: [
      {
        id: "fund-basics",
        label: "Foundational Skills & Process",
        subtopics: [
          { name: "The Nursing Process", count: 14, desc: "ADPIE — assessment to evaluation" },
          { name: "Critical Thinking & Clinical Judgment", count: 12, desc: "NCLEX prioritization frameworks" },
          { name: "Communication & Documentation", count: 14, desc: "SBAR, charting, electronic records" },
          { name: "Therapeutic Communication", count: 12, desc: "Active listening, blocks, open-ended" },
          { name: "Cultural Competence", count: 8, desc: "Cultural awareness, religious considerations" },
          { name: "Patient Education", count: 10, desc: "Teaching methods, health literacy" },
          { name: "Legal & Ethical Practice", count: 14, desc: "Consent, confidentiality, scope of practice" },
          { name: "Death, Dying & Grief", count: 8, desc: "Stages, palliative care, family support" },
        ],
      },
      {
        id: "fund-safety",
        label: "Safety, Hygiene & Infection Control",
        subtopics: [
          { name: "Hand Hygiene & Standard Precautions", count: 10, desc: "Foundation of infection control" },
          { name: "Transmission-Based Precautions", count: 12, desc: "Contact, droplet, airborne, PPE" },
          { name: "Fall Prevention", count: 10, desc: "Risk assessment, interventions, restraints" },
          { name: "Patient Safety & Risk Management", count: 12, desc: "Never events, error reporting, RCAs" },
          { name: "Sterile Technique", count: 8, desc: "Surgical asepsis, field setup, donning" },
          { name: "Body Mechanics & Transfer", count: 8, desc: "Lifting, ambulation, assistive devices" },
          { name: "Hygiene & Skin Care", count: 8, desc: "Bathing, oral care, perineal care" },
          { name: "Bowel & Bladder Elimination", count: 10, desc: "Catheters, ostomies, constipation" },
        ],
      },
      {
        id: "fund-assess",
        label: "Assessment & Vital Signs",
        subtopics: [
          { name: "Vital Signs", count: 12, desc: "Temp, pulse, RR, BP, SpO₂, pain" },
          { name: "Health History Interview", count: 8, desc: "Open-ended questioning, OPQRST" },
          { name: "Physical Assessment Techniques", count: 10, desc: "Inspection, palpation, percussion, auscultation" },
          { name: "Head-to-Toe Assessment", count: 14, desc: "Systematic exam by body system" },
          { name: "Pain Assessment", count: 10, desc: "Scales, types, special populations" },
          { name: "Mental Status & Cognition", count: 8, desc: "GCS, MMSE, orientation" },
          { name: "Functional Assessment", count: 8, desc: "ADLs, IADLs, mobility, falls risk" },
        ],
      },
      {
        id: "fund-meds",
        label: "Medication Administration & Wound Care",
        subtopics: [
          { name: "Rights of Medication Administration", count: 10, desc: "5 (and beyond) rights, error prevention" },
          { name: "Routes of Administration", count: 14, desc: "PO, IM, SQ, IV, topical, inhaled" },
          { name: "Dosage Calculations", count: 18, desc: "Weight-based, IV drip rates, conversions" },
          { name: "IV Therapy & Infusion", count: 14, desc: "Site care, complications, blood products" },
          { name: "Central Lines & PICCs", count: 10, desc: "Insertion, dressing, infection prevention" },
          { name: "Wound Assessment", count: 10, desc: "Healing stages, drainage types, measurement" },
          { name: "Wound Care & Dressings", count: 12, desc: "Wet-to-dry, hydrocolloids, NPWT" },
        ],
      },
    ],
  },
  {
    id: "peds",
    section: "Pediatrics",
    color: "#059669",
    bg: "#ecfdf5",
    categories: [
      {
        id: "peds-development",
        label: "Growth, Development & Health Promotion",
        subtopics: [
          { name: "Growth Milestones", count: 14, desc: "Infant, toddler, preschool, school-age, adolescent" },
          { name: "Erikson's Stages in Pediatrics", count: 8, desc: "Trust, autonomy, initiative, industry, identity" },
          { name: "Immunization Schedule", count: 12, desc: "CDC schedule, contraindications, parent teaching" },
          { name: "Pediatric Vital Signs", count: 10, desc: "Age-based norms, head circumference" },
          { name: "Nutrition by Age", count: 10, desc: "Breastfeeding, formula, solids, picky eaters" },
          { name: "Anticipatory Guidance", count: 8, desc: "Safety, sleep, behavior, screen time" },
        ],
      },
      {
        id: "peds-acute",
        label: "Acute & Chronic Pediatric Conditions",
        subtopics: [
          { name: "Respiratory Distress in Children", count: 14, desc: "RSV, croup, epiglottitis, asthma" },
          { name: "Cystic Fibrosis", count: 10, desc: "Pathophysiology, airway clearance, nutrition" },
          { name: "Congenital Heart Defects", count: 12, desc: "Cyanotic vs acyanotic, repair, post-op" },
          { name: "Pediatric Diabetes", count: 10, desc: "Type 1, glucose monitoring, sick days" },
          { name: "Sickle Cell Disease", count: 10, desc: "Crises, hydration, pain management" },
          { name: "Pediatric Cancers", count: 10, desc: "Leukemia, Wilms, neuroblastoma, retinoblastoma" },
          { name: "Failure to Thrive", count: 8, desc: "Causes, assessment, family education" },
          { name: "Common Childhood Infections", count: 12, desc: "Otitis media, strep, hand-foot-mouth" },
        ],
      },
      {
        id: "peds-special",
        label: "Specialized Pediatric Care",
        subtopics: [
          { name: "Pediatric Pain Management", count: 8, desc: "Age-appropriate scales, non-pharm, dosing" },
          { name: "Hospitalized Child & Family", count: 10, desc: "Separation, regression, family-centered care" },
          { name: "Child Abuse & Neglect", count: 10, desc: "Recognition, mandatory reporting" },
          { name: "Pediatric Emergencies", count: 12, desc: "PALS overview, trauma, accidental ingestion" },
          { name: "Pediatric Pharmacology", count: 14, desc: "Weight-based dosing, safety, common meds" },
          { name: "Adolescent Health", count: 10, desc: "Risk behaviors, mental health, confidentiality" },
        ],
      },
    ],
  },
  {
    id: "mental",
    section: "Mental Health",
    color: "#7c3aed",
    bg: "#f5f3ff",
    categories: [
      {
        id: "mental-foundations",
        label: "Foundations & Therapeutic Care",
        subtopics: [
          { name: "Mental Status Examination", count: 10, desc: "Appearance, mood, affect, thought, cognition" },
          { name: "Therapeutic Communication", count: 12, desc: "Techniques, blocks, silence, reflection" },
          { name: "Therapeutic Milieu", count: 8, desc: "Safe environment, group dynamics" },
          { name: "Crisis Intervention", count: 10, desc: "Phases, de-escalation, suicide assessment" },
          { name: "Defense Mechanisms", count: 8, desc: "Identification, adaptive vs maladaptive" },
          { name: "Legal & Ethical in Psych", count: 10, desc: "Voluntary/involuntary admission, restraint" },
        ],
      },
      {
        id: "mental-disorders",
        label: "Mood, Anxiety & Psychotic Disorders",
        subtopics: [
          { name: "Major Depression", count: 14, desc: "Symptoms, suicide risk, treatment" },
          { name: "Bipolar Disorder", count: 12, desc: "Mania, lithium, mood stabilizers" },
          { name: "Anxiety Disorders", count: 12, desc: "GAD, panic, phobias, OCD" },
          { name: "PTSD & Trauma", count: 10, desc: "Triggers, grounding, treatment" },
          { name: "Schizophrenia", count: 14, desc: "Positive/negative symptoms, antipsychotics" },
          { name: "Delusional & Psychotic Disorders", count: 8, desc: "Types of delusions, hallucinations" },
        ],
      },
      {
        id: "mental-other",
        label: "Substance Use, Eating, Personality & Cognitive",
        subtopics: [
          { name: "Alcohol Use Disorder", count: 10, desc: "Withdrawal, CIWA, Wernicke's" },
          { name: "Opioid & Stimulant Use", count: 10, desc: "Withdrawal, overdose, MAT" },
          { name: "Eating Disorders", count: 10, desc: "Anorexia, bulimia, refeeding syndrome" },
          { name: "Personality Disorders", count: 10, desc: "Cluster A/B/C, borderline, antisocial" },
          { name: "Dementia vs Delirium", count: 10, desc: "Differentiation, sundowning, safety" },
          { name: "Suicide Risk Assessment", count: 10, desc: "SAD PERSONS, lethality, means restriction" },
          { name: "Psychiatric Medications", count: 14, desc: "SSRIs, antipsychotics, mood stabilizers" },
        ],
      },
    ],
  },
  {
    id: "nutrition",
    section: "Nutrition",
    color: "#d97706",
    bg: "#fffbeb",
    categories: [
      {
        id: "nutr-basics",
        label: "Nutrition Fundamentals",
        subtopics: [
          { name: "Macronutrients & Micronutrients", count: 10, desc: "Carbs, protein, fat, vitamins, minerals" },
          { name: "Caloric Needs Across Lifespan", count: 8, desc: "Pediatric, pregnancy, geriatric" },
          { name: "BMI & Nutritional Assessment", count: 8, desc: "Anthropometric measures, screening tools" },
          { name: "Hydration & Fluid Balance", count: 8, desc: "Daily requirements, dehydration signs" },
          { name: "Cultural & Religious Diets", count: 8, desc: "Kosher, halal, vegetarian, considerations" },
        ],
      },
      {
        id: "nutr-therapeutic",
        label: "Therapeutic Diets",
        subtopics: [
          { name: "Cardiac Diet (Low Sodium/Fat)", count: 10, desc: "DASH, heart-healthy choices" },
          { name: "Diabetic Diet", count: 12, desc: "Carb counting, glycemic index, meal timing" },
          { name: "Renal Diet", count: 10, desc: "K, Na, P, protein restrictions" },
          { name: "Liver Disease Diet", count: 8, desc: "Protein, sodium, fluid management" },
          { name: "Gastric / Bariatric Diet Progression", count: 8, desc: "Clear → full → soft, post-op stages" },
          { name: "Low Residue / High Fiber", count: 8, desc: "IBD, diverticulitis, constipation" },
          { name: "Allergy & Intolerance Diets", count: 8, desc: "Celiac, lactose, food allergies" },
        ],
      },
      {
        id: "nutr-feeding",
        label: "Enteral, Parenteral & Special Feeding",
        subtopics: [
          { name: "Enteral Nutrition / Tube Feeding", count: 12, desc: "NG, PEG, residuals, aspiration" },
          { name: "Total Parenteral Nutrition", count: 12, desc: "Indications, central line, glucose monitoring" },
          { name: "Refeeding Syndrome", count: 8, desc: "Risk factors, electrolyte shifts, prevention" },
          { name: "Dysphagia Management", count: 10, desc: "Swallow eval, thickeners, positioning" },
          { name: "Pediatric Feeding & Breastfeeding", count: 10, desc: "Latch, supply, supplementation" },
          { name: "Pregnancy & Lactation Nutrition", count: 10, desc: "Folic acid, iron, weight gain" },
        ],
      },
    ],
  },
  {
    id: "pharm",
    section: "Pharmacology",
    color: "#7c3aed",
    bg: "#f5f3ff",
    categories: [
      {
        id: "pharm-foundations",
        label: "Pharmacology Foundations",
        subtopics: [
          { name: "Pharmacokinetics", count: 12, desc: "ADME, half-life, steady state" },
          { name: "Pharmacodynamics", count: 10, desc: "Receptor theory, agonists, antagonists" },
          { name: "Drug Interactions", count: 12, desc: "Drug-drug, drug-food, drug-disease" },
          { name: "Adverse Effects & Toxicity", count: 14, desc: "Idiosyncratic, allergic, dose-dependent" },
          { name: "High-Alert Medications", count: 14, desc: "Insulin, opioids, anticoagulants, KCl" },
          { name: "Medication Reconciliation", count: 8, desc: "Admission, transfer, discharge" },
          { name: "Lifespan Considerations", count: 10, desc: "Pediatric, pregnancy, geriatric dosing" },
        ],
      },
      {
        id: "pharm-cv",
        label: "Cardiovascular & Endocrine Drugs",
        subtopics: [
          { name: "Antihypertensives", count: 14, desc: "ACE-I, ARB, BB, CCB, diuretics" },
          { name: "Anticoagulants & Antiplatelets", count: 16, desc: "Heparin, warfarin, DOACs, ASA" },
          { name: "Lipid-Lowering Agents", count: 8, desc: "Statins, fibrates, PCSK9 inhibitors" },
          { name: "Antiarrhythmics", count: 10, desc: "Amiodarone, beta-blockers, digoxin" },
          { name: "Heart Failure Medications", count: 10, desc: "Diuretics, BB, ACE-I, ARNI" },
          { name: "Insulin & Antidiabetic Agents", count: 14, desc: "Insulin types, metformin, GLP-1" },
          { name: "Thyroid & Corticosteroids", count: 10, desc: "Levothyroxine, prednisone, replacement" },
        ],
      },
      {
        id: "pharm-cns",
        label: "CNS, Anti-Infective & Other Systems",
        subtopics: [
          { name: "Analgesics & Opioids", count: 14, desc: "PCA, NSAIDs, naloxone, addiction" },
          { name: "Antiepileptics", count: 10, desc: "Phenytoin, valproate, levels" },
          { name: "Psychotropic Medications", count: 14, desc: "SSRIs, SNRIs, antipsychotics, lithium" },
          { name: "Antibiotics", count: 14, desc: "Classes, allergies, resistance, monitoring" },
          { name: "Antivirals & Antifungals", count: 8, desc: "HIV regimens, herpes, candida" },
          { name: "Respiratory Medications", count: 10, desc: "Bronchodilators, ICS, leukotrienes" },
          { name: "GI Medications", count: 10, desc: "PPI, H2 blockers, antiemetics, laxatives" },
          { name: "Chemotherapy & Immunosuppressants", count: 10, desc: "Cytotoxic safety, neutropenic precautions" },
        ],
      },
    ],
  },
  {
    id: "leadership",
    section: "Leadership & Management",
    color: "#475569",
    bg: "#f8fafc",
    categories: [
      {
        id: "lead-care",
        label: "Care Management & Delegation",
        subtopics: [
          { name: "Prioritization Frameworks", count: 14, desc: "ABC, Maslow, acute vs chronic, stable vs unstable" },
          { name: "Delegation", count: 14, desc: "5 rights, RN vs LPN vs UAP scope" },
          { name: "Assignment Making", count: 10, desc: "Patient acuity, skill mix, workload" },
          { name: "Team Communication & Handoffs", count: 10, desc: "SBAR, bedside report, transitions" },
          { name: "Conflict Resolution", count: 8, desc: "Sources, styles, escalation" },
          { name: "Time Management", count: 8, desc: "Planning the shift, batching tasks" },
        ],
      },
      {
        id: "lead-safety",
        label: "Quality, Safety & Regulatory",
        subtopics: [
          { name: "Quality Improvement", count: 8, desc: "PDSA, root cause analysis, metrics" },
          { name: "Patient Safety Goals", count: 10, desc: "Joint Commission NPSGs, never events" },
          { name: "Risk Management", count: 8, desc: "Incident reports, sentinel events" },
          { name: "Legal Considerations", count: 12, desc: "Negligence, malpractice, scope, consent" },
          { name: "HIPAA & Privacy", count: 8, desc: "Protected information, breaches" },
          { name: "Mandatory Reporting", count: 8, desc: "Abuse, communicable disease, impaired colleagues" },
        ],
      },
      {
        id: "lead-systems",
        label: "Systems & Professional Issues",
        subtopics: [
          { name: "Healthcare Delivery Systems", count: 8, desc: "Insurance, ACO, value-based care" },
          { name: "Disaster & Triage Nursing", count: 10, desc: "START triage, mass casualty, bioterrorism" },
          { name: "Staffing & Resource Allocation", count: 8, desc: "Acuity-based, ratios, float pool" },
          { name: "Evidence-Based Practice", count: 10, desc: "PICO, levels of evidence, implementation" },
          { name: "Professional Boundaries", count: 8, desc: "Therapeutic vs personal, social media" },
          { name: "Lifelong Learning & Certification", count: 8, desc: "CEUs, specialty cert, scope evolution" },
        ],
      },
    ],
  },
  {
    id: "matnewborn",
    section: "Maternal & Newborn Health",
    color: "#FE5E7E",
    bg: "#fff1f3",
    categories: [
      {
        id: "mn-antepartum",
        label: "Antepartum & Pregnancy",
        subtopics: [
          { name: "Prenatal Assessment", count: 12, desc: "GTPAL, Naegele's rule, fundal height" },
          { name: "Common Discomforts of Pregnancy", count: 8, desc: "Nausea, back pain, varicosities" },
          { name: "Pregnancy Complications", count: 14, desc: "Preeclampsia, GDM, placenta previa, abruption" },
          { name: "Hyperemesis Gravidarum", count: 8, desc: "Diagnosis, fluids, antiemetics" },
          { name: "Multiple Gestation", count: 8, desc: "Twin types, risks, monitoring" },
          { name: "Antepartum Testing", count: 10, desc: "NST, BPP, ultrasound, amnio" },
          { name: "Maternal Substance Use", count: 8, desc: "Effects on fetus, NAS prevention" },
        ],
      },
      {
        id: "mn-intra",
        label: "Intrapartum & Labor",
        subtopics: [
          { name: "Stages of Labor", count: 12, desc: "Stages 1–4, transition, pushing" },
          { name: "Fetal Heart Rate Monitoring", count: 14, desc: "Decelerations, variability, interventions" },
          { name: "Pain Management in Labor", count: 10, desc: "Epidural, IV opioids, non-pharm" },
          { name: "Labor Induction & Augmentation", count: 10, desc: "Pitocin, cervical ripening, Bishop score" },
          { name: "Operative Delivery", count: 10, desc: "Cesarean, vacuum, forceps care" },
          { name: "Intrapartum Emergencies", count: 12, desc: "Cord prolapse, shoulder dystocia, abruption" },
        ],
      },
      {
        id: "mn-postpartum",
        label: "Postpartum & Newborn",
        subtopics: [
          { name: "Postpartum Assessment", count: 12, desc: "BUBBLE-LE, fundal massage, lochia" },
          { name: "Postpartum Hemorrhage", count: 12, desc: "4 T's, tone, trauma, tissue, thrombin" },
          { name: "Postpartum Infection & DVT", count: 8, desc: "Endometritis, mastitis, thromboprophylaxis" },
          { name: "Postpartum Mood Disorders", count: 10, desc: "Blues, depression, psychosis" },
          { name: "Breastfeeding Support", count: 10, desc: "Latch, milk supply, mastitis" },
          { name: "Newborn Assessment", count: 14, desc: "APGAR, Ballard, reflexes, vital signs" },
          { name: "Newborn Complications", count: 12, desc: "Hypoglycemia, jaundice, RDS, NAS" },
          { name: "Newborn Care & Teaching", count: 10, desc: "Bathing, cord, circumcision, safe sleep" },
        ],
      },
    ],
  },
  {
    id: "critical",
    section: "Critical Care",
    color: "#dc2626",
    bg: "#fff5f5",
    categories: [
      {
        id: "cc-monitoring",
        label: "Hemodynamic Monitoring & Ventilation",
        subtopics: [
          { name: "Arterial Lines & MAP", count: 10, desc: "Insertion, monitoring, troubleshooting" },
          { name: "CVP & Pulmonary Artery Catheters", count: 10, desc: "Wedge pressure, cardiac output" },
          { name: "Invasive Hemodynamic Monitoring", count: 10, desc: "Calibration, waveforms, normals" },
          { name: "Mechanical Ventilation", count: 16, desc: "Modes, settings, weaning, alarms" },
          { name: "Ventilator-Associated Events", count: 8, desc: "VAP prevention bundle, monitoring" },
          { name: "ABG Interpretation in ICU", count: 12, desc: "Acid-base, oxygenation, compensation" },
        ],
      },
      {
        id: "cc-shock",
        label: "Shock, Sepsis & Multi-Organ Failure",
        subtopics: [
          { name: "Shock Overview", count: 10, desc: "Hypovolemic, cardiogenic, distributive, obstructive" },
          { name: "Septic Shock", count: 14, desc: "Sepsis-3, hour-1 bundle, vasopressors" },
          { name: "Cardiogenic Shock", count: 10, desc: "Causes, IABP, inotropes" },
          { name: "Anaphylaxis", count: 8, desc: "Recognition, epinephrine, airway" },
          { name: "Multi-Organ Dysfunction Syndrome", count: 8, desc: "Pathophysiology, supportive care" },
          { name: "DIC", count: 8, desc: "Recognition, lab markers, management" },
        ],
      },
      {
        id: "cc-emergency",
        label: "Emergency, Trauma & Specialty Critical Care",
        subtopics: [
          { name: "Triage & Emergency Severity Index", count: 10, desc: "5-level ESI, immediate vs urgent" },
          { name: "ACLS Algorithms", count: 14, desc: "VF/VT, asystole, PEA, bradycardia, tachycardia" },
          { name: "Trauma Resuscitation", count: 14, desc: "ABCDE, primary/secondary survey, FAST" },
          { name: "Burn Resuscitation", count: 10, desc: "Parkland formula, airway, infection" },
          { name: "Toxicology & Overdose", count: 10, desc: "Acetaminophen, opioids, antidotes" },
          { name: "Neurocritical Care", count: 12, desc: "ICP, EVD, post-arrest care, brain death" },
          { name: "Acute Stroke Care", count: 10, desc: "NIHSS, tPA criteria, thrombectomy" },
          { name: "Post-Operative ICU Care", count: 10, desc: "CABG, transplant, free flap monitoring" },
        ],
      },
    ],
  },
];

export const FULL_EXAMS = [
  { id: 1, title: "NCLEX Practice Exam 1", subtitle: "Diagnostic Assessment", questions: 85, minutes: 150, status: "completed", score: 78, completedDate: "Jan 4, 2026", difficulty: "Foundational", tag: "Start here" },
  { id: 2, title: "NCLEX Practice Exam 2", subtitle: "Targeted Review", questions: 85, minutes: 150, status: "completed", score: 82, completedDate: "Jan 6, 2026", difficulty: "Progressive", tag: "" },
  { id: 3, title: "NCLEX Practice Exam 3", subtitle: "Advanced Application", questions: 85, minutes: 150, status: "available", score: null, completedDate: null, difficulty: "Progressive", tag: "Up next" },
  { id: 4, title: "NCLEX Practice Exam 4", subtitle: "Comprehensive", questions: 85, minutes: 150, status: "locked", score: null, completedDate: null, difficulty: "Advanced", tag: "" },
  { id: 5, title: "NCLEX Practice Exam 5", subtitle: "Final Simulation", questions: 85, minutes: 150, status: "locked", score: null, completedDate: null, difficulty: "Expert", tag: "Pass Predictor" },
];

export const PERF_DATA = [
  { name: "Fundamentals", score: 85, peer: 78, questions: 180, delta: 7 },
  { name: "Medical-Surgical", score: 72, peer: 75, questions: 220, delta: -3 },
  { name: "Pharmacology", score: 68, peer: 71, questions: 150, delta: -3 },
  { name: "Maternal & Newborn", score: 81, peer: 76, questions: 140, delta: 5 },
  { name: "Pediatrics", score: 75, peer: 73, questions: 100, delta: 2 },
  { name: "Mental Health", score: 79, peer: 74, questions: 90, delta: 5 },
  { name: "Community Health", score: 65, peer: 70, questions: 60, delta: -5 },
  { name: "Leadership", score: 70, peer: 72, questions: 45, delta: -2 },
];

export const SAMPLE_QUESTIONS = [
  {
    id: "q1", category: "Heart Failure", nclexCategory: "Physiological Adaptation", difficulty: "intermediate", peerCorrectPct: 52,
    question: "A nurse is caring for a patient 2 hours post-CABG. The patient's cardiac output is 3.8 L/min, MAP is 58 mmHg, HR is 110 bpm, and urine output is 18 mL/hr. Which assessment finding requires IMMEDIATE intervention?",
    options: ["A) Heart rate of 110 bpm", "B) MAP of 58 mmHg", "C) Cardiac output of 3.8 L/min", "D) Urine output of 18 mL/hr"],
    correct: 1,
    rationale: "A MAP of 58 mmHg is critically below the 65 mmHg threshold required for vital organ perfusion. While all findings are concerning, MAP is the primary driver of organ perfusion pressure. Tachycardia (HR 110) is a compensatory response. CO of 3.8 is borderline low. Low urine output is a consequence of low MAP, not the cause.",
    optionExplanations: [
      "Incorrect. HR of 110 is tachycardia and is concerning, but it is a compensatory mechanism to maintain cardiac output — not the primary emergency. The underlying cause (low MAP) must be addressed first.",
      "Correct. MAP < 65 mmHg indicates inadequate perfusion pressure to the brain, kidneys, and vital organs. This is the most critical finding requiring IMMEDIATE intervention such as vasopressors or fluid resuscitation.",
      "Incorrect. CO of 3.8 L/min is borderline low (normal 4–8 L/min), but it is not the most immediately life-threatening value. MAP directly reflects organ perfusion and takes priority.",
      "Incorrect. Urine output of 18 mL/hr (< 0.5 mL/kg/hr) reflects poor renal perfusion and is a consequence of the low MAP. Fixing MAP will address the urine output.",
    ],
    tip: "MAP < 65 = organ perfusion failure — always the priority finding.",
  },
  {
    id: "q2", category: "COPD & Asthma", nclexCategory: "Reduction of Risk Potential", difficulty: "beginner", peerCorrectPct: 78,
    question: "A nurse is assessing a patient with COPD who is receiving oxygen at 4 L/min via nasal cannula. The patient's SpO₂ is 98%. What is the nurse's priority action?",
    options: ["A) Continue current oxygen therapy as SpO₂ is therapeutic", "B) Increase oxygen to 6 L/min to maintain saturation", "C) Reduce oxygen flow rate — target SpO₂ is 88–92% for COPD", "D) Apply a non-rebreather mask for better oxygen delivery"],
    correct: 2,
    rationale: "COPD patients rely on hypoxic drive for respiratory stimulus. Normal SpO₂ targets (95–100%) do NOT apply — the target is 88–92%. An SpO₂ of 98% means oxygen delivery is too high, which can suppress the hypoxic drive and cause respiratory depression. The nurse must reduce the flow rate immediately.",
    optionExplanations: [
      "Incorrect. SpO₂ of 98% is NOT therapeutic for a COPD patient. The target range is 88–92%. Maintaining this flow rate risks suppressing the hypoxic drive.",
      "Incorrect. Increasing oxygen would worsen the problem. Higher O₂ further suppresses the hypoxic drive in a COPD patient, potentially causing respiratory failure.",
      "Correct. The target SpO₂ for COPD patients is 88–92% because they rely on hypoxic drive. An SpO₂ of 98% on 4 L/min indicates over-oxygenation — the flow rate must be reduced and SpO₂ reassessed.",
      "Incorrect. A non-rebreather mask delivers 90–100% FiO₂, which would dramatically worsen over-oxygenation in a COPD patient and is contraindicated.",
    ],
    tip: "COPD target SpO₂: 88–92%. Higher O₂ = suppressed hypoxic drive = respiratory depression.",
  },
  {
    id: "q3", category: "Antiarrhythmics", nclexCategory: "Pharmacological and Parenteral Therapies", difficulty: "intermediate", peerCorrectPct: 47,
    question: "A nurse is preparing to administer digoxin 0.25 mg PO to a patient with heart failure. Which assessment finding requires the nurse to HOLD the medication and notify the provider?",
    options: ["A) Apical pulse of 62 bpm", "B) Serum potassium of 3.1 mEq/L", "C) Serum sodium of 138 mEq/L", "D) Blood pressure of 118/72 mmHg"],
    correct: 1,
    rationale: "Hypokalemia (K+ < 3.5 mEq/L) dramatically increases digoxin toxicity risk by increasing myocardial sensitivity to the drug. A K+ of 3.1 mEq/L requires holding the digoxin and notifying the provider immediately. Digoxin is also held for apical HR < 60 bpm (not 62). Sodium and BP are within normal limits.",
    optionExplanations: [
      "Incorrect. Hold digoxin if apical HR < 60 bpm — not < 62 bpm. A pulse of 62 is acceptable for digoxin administration. Always take an apical pulse for 1 full minute before giving digoxin.",
      "Correct. Hypokalemia (K+ < 3.5 mEq/L) is the critical finding. Potassium and digoxin compete for binding sites on Na/K-ATPase. Low K+ increases digoxin binding → toxicity. HOLD the medication and notify the provider immediately.",
      "Incorrect. Serum sodium of 138 mEq/L is within normal range (135–145 mEq/L). Sodium level does not directly affect digoxin toxicity risk.",
      "Incorrect. BP of 118/72 mmHg is within normal range. Blood pressure is not a contraindication for digoxin administration. Digoxin is withheld for low HR or electrolyte imbalances.",
    ],
    tip: "DIGOXIN: Hold if HR < 60 OR K+ < 3.5 — both significantly increase toxicity risk.",
  },
  {
    id: "q4", category: "Transmission-Based Precautions", nclexCategory: "Safety and Infection Control", difficulty: "beginner", peerCorrectPct: 82,
    question: "A nurse is caring for a patient in contact isolation for MRSA wound infection. The nurse needs to perform a dressing change. What is the CORRECT order of PPE application?",
    options: ["A) Mask → Gown → Gloves", "B) Gown → Mask → Gloves", "C) Gloves → Gown → Mask", "D) Mask → Gloves → Gown"],
    correct: 1,
    rationale: "The correct donning order is: Gown first (protects clothing/skin), then Mask/Respirator (protects mucous membranes), then Gloves last (pulled over gown cuffs to complete the barrier). This order ensures that gloves — the most likely contaminated item — are put on last and removed first.",
    optionExplanations: [
      "Incorrect. Putting on the mask first is out of sequence. The gown must be donned first because it protects the largest surface area of clothing and skin. Mask is applied second, gloves last.",
      "Correct. The correct donning order is Gown → Mask → Gloves. Mnemonic: GMG. Gown protects clothing, mask protects face, gloves go on last (over gown cuffs) to complete the barrier. Doffing is the reverse: Gloves first (dirtiest), then Mask, then Gown.",
      "Incorrect. Gloves are always the LAST item donned. Putting on gloves first would contaminate the gloves while putting on the gown and mask — defeating the purpose of the PPE sequence.",
      "Incorrect. This order (Mask → Gloves → Gown) is wrong. The gown is donned first to protect clothing, and gloves must always be last because they are the primary barrier during patient contact.",
    ],
    tip: "Don PPE: Gown → Mask → Gloves. Doff: Gloves → Mask → Gown (dirtiest removed first).",
  },
  {
    id: "q5", category: "Schizophrenia", nclexCategory: "Psychosocial Integrity", difficulty: "advanced", peerCorrectPct: 38,
    question: "A patient with schizophrenia tells the nurse, 'The TV is sending me secret messages. They know I'm special.' Which response by the nurse is MOST therapeutic?",
    options: ["A) 'That's not possible — TVs can't send messages to individuals.'", "B) 'I understand you believe the TV is sending you messages. Tell me how that makes you feel.'", "C) 'You are special. We all receive messages in different ways.'", "D) 'Let's change the channel so the TV won't bother you.'"],
    correct: 1,
    rationale: "The therapeutic response acknowledges the patient's experience without arguing against or reinforcing the delusion. Directly contradicting delusions creates confrontation and destroys therapeutic trust. Agreeing reinforces false beliefs. The goal is to acknowledge feelings and redirect to emotional experience.",
    optionExplanations: [
      "Incorrect. Directly contradicting a delusion ('That's not possible') creates confrontation and damages the therapeutic relationship. Patients with schizophrenia cannot be argued out of delusions — this approach is ineffective and harmful to trust.",
      "Correct. This response uses therapeutic communication: acknowledging the patient's experience ('I understand you believe…') without validating or arguing against the delusion, then redirecting to feelings. This maintains trust and opens communication.",
      "Incorrect. Agreeing with the delusion ('You are special. We all receive messages…') reinforces and validates the false belief. This is non-therapeutic and worsens the delusion by giving it credibility.",
      "Incorrect. Changing the channel implies the delusion is real (that the TV is actually doing something). This reinforces the psychotic belief rather than acknowledging the patient's internal experience.",
    ],
    tip: "Delusions: Never argue, never agree. Acknowledge feelings — 'I understand you believe…'",
  },
  {
    id: "q6", category: "Postpartum Hemorrhage", nclexCategory: "Health Promotion and Maintenance", difficulty: "intermediate", peerCorrectPct: 61,
    question: "A nurse is caring for a patient 45 minutes postpartum who reports soaking 2 perineal pads in 15 minutes. Assessment reveals a boggy uterus displaced to the right. What is the nurse's FIRST action?",
    options: ["A) Notify the physician immediately", "B) Administer oxytocin per protocol", "C) Perform fundal massage and empty the bladder", "D) Increase the IV infusion rate"],
    correct: 2,
    rationale: "A boggy, displaced uterus indicates uterine atony — the most common cause of postpartum hemorrhage. A full bladder displaces the uterus laterally and prevents it from contracting. The FIRST action is fundal massage combined with bladder emptying. If unsuccessful, then administer oxytocin and notify the physician.",
    optionExplanations: [
      "Incorrect. Notifying the physician is important but is NOT the first action. The nurse should first attempt non-pharmacological intervention (fundal massage + bladder emptying) before escalating. Immediate intervention precedes notification.",
      "Incorrect. Oxytocin is the pharmacological first-line for uterine atony, but it is not the FIRST action. The nurse must first perform fundal massage and empty the bladder, which may resolve the boggy uterus without medication.",
      "Correct. A displaced uterus indicates a full bladder preventing uterine contraction. The FIRST action is fundal massage (stimulates contraction) combined with bladder emptying (have patient void or insert catheter). This addresses the root cause. Remember: 4 T's of PPH — Tone, Trauma, Tissue, Thrombin.",
      "Incorrect. Increasing IV rate is not the first priority. While IV access is important for fluid resuscitation, the immediate priority is uterine contraction, which is addressed by fundal massage and bladder emptying.",
    ],
    tip: "Boggy + displaced uterus = full bladder. First action: fundal massage + empty bladder.",
  },
  {
    id: "q7", category: "Increased ICP & TBI", nclexCategory: "Physiological Adaptation", difficulty: "advanced", peerCorrectPct: 33,
    question: "A nurse is caring for a patient following a right-sided ischemic stroke. Which assessment finding indicates INCREASED intracranial pressure requiring immediate intervention?",
    options: ["A) Left-sided weakness and facial droop", "B) Expressive aphasia with word-finding difficulty", "C) Widening pulse pressure, bradycardia, and irregular respirations", "D) Right visual field deficit (hemianopia)"],
    correct: 2,
    rationale: "Cushing's Triad — widening pulse pressure (rising SBP, falling DBP), bradycardia, and irregular respirations — is a late, ominous sign of severely elevated ICP and impending brainstem herniation. It requires IMMEDIATE intervention. The other options are expected neurological deficits from a right-sided stroke.",
    optionExplanations: [
      "Incorrect. Left-sided weakness and facial droop are EXPECTED neurological deficits from a right-sided stroke (contralateral motor deficit). These findings are part of the stroke presentation, not signs of rising ICP.",
      "Incorrect. Expressive aphasia occurs with left hemisphere lesions (Broca's area). In a right-sided stroke, it could indicate a larger lesion, but it is not an ICP emergency sign.",
      "Correct. Cushing's Triad = widening pulse pressure + bradycardia + irregular respirations. This indicates the brainstem is being compressed by increasing ICP — a neurological emergency requiring IMMEDIATE intervention (HOB elevation, hyperventilation, osmotic agents, neurosurgery notification).",
      "Incorrect. Right visual field deficit (homonymous hemianopia) is an EXPECTED finding from right-sided stroke affecting optic pathways. It does not indicate rising ICP.",
    ],
    tip: "Cushing's Triad = ICP emergency: ↑BP (widening pulse pressure) + ↓HR + irregular respirations.",
  },
  {
    id: "q8", category: "ABG Interpretation in ICU", nclexCategory: "Reduction of Risk Potential", difficulty: "intermediate", peerCorrectPct: 56,
    question: "A nurse reviews ABG results: pH 7.28, PaCO₂ 52 mmHg, HCO₃ 24 mEq/L, PaO₂ 88 mmHg. How does the nurse interpret these results?",
    options: ["A) Metabolic acidosis, uncompensated", "B) Respiratory acidosis, uncompensated", "C) Metabolic alkalosis, compensated", "D) Respiratory alkalosis, partially compensated"],
    correct: 1,
    rationale: "ABG interpretation: (1) pH 7.28 = acidosis. (2) PaCO₂ 52 = elevated = acidosis — matches pH direction = respiratory cause. (3) HCO₃ 24 = normal (22–26) = no metabolic compensation yet. Conclusion: Respiratory acidosis, uncompensated. The kidneys have not yet had time to retain bicarbonate.",
    optionExplanations: [
      "Incorrect. Metabolic acidosis would show low HCO₃ (< 22 mEq/L) as the primary problem. Here, HCO₃ is normal at 24. The elevated PaCO₂ (52 mmHg) is causing the acidosis, pointing to a respiratory cause.",
      "Correct. Step 1: pH 7.28 = acidosis. Step 2: PaCO₂ 52 = elevated (normal 35–45) = respiratory acidosis. Step 3: HCO₃ 24 = normal = no compensation. Conclusion: Respiratory acidosis, uncompensated. The lungs are retaining CO₂ (hypoventilation) and the kidneys have not yet compensated.",
      "Incorrect. Metabolic alkalosis requires elevated HCO₃ (> 26 mEq/L) and elevated pH (> 7.45). Both are wrong here — pH is low and HCO₃ is normal.",
      "Incorrect. Respiratory alkalosis would require low PaCO₂ (< 35 mmHg) and elevated pH (> 7.45). PaCO₂ here is elevated and pH is low — the opposite of alkalosis.",
    ],
    tip: "ABG steps: (1) pH acidic/alkaline? (2) CO₂ or HCO₃ matches direction? (3) Other compensating?",
  },
  {
    id: "q9", category: "Prioritization Frameworks", nclexCategory: "Management of Care", difficulty: "advanced", peerCorrectPct: 41,
    question: "A charge nurse has four patients. Using the ABCDE prioritization framework, which patient should be assessed FIRST?",
    options: [
      "A) Patient post-cholecystectomy reporting pain 7/10 requesting PO pain medication",
      "B) Patient with COPD, SpO₂ 86% on 2L NC, respiratory rate 28, accessory muscle use",
      "C) Patient with heart failure awaiting discharge who needs teaching completed",
      "D) Patient with DVT receiving heparin drip with aPTT result of 85 seconds pending review",
    ],
    correct: 1,
    rationale: "ABCDE framework: Airway and Breathing always take priority. SpO₂ of 86% with RR 28 and accessory muscle use indicates severe respiratory distress and impending respiratory failure — this is life-threatening and requires immediate assessment. The other patients are important but not in immediate danger.",
    optionExplanations: [
      "Incorrect. Pain 7/10 is uncomfortable but not immediately life-threatening. Pain management is a D (Disability) priority. This patient can wait while the nurse addresses the respiratory emergency first.",
      "Correct. SpO₂ 86% with RR 28 and accessory muscle use = B (Breathing) emergency. This patient is in severe respiratory distress with impending respiratory failure. ABCDE framework places Breathing second only to Airway — this is the first patient to assess.",
      "Incorrect. Discharge teaching is the lowest priority — there is no immediate physiological threat. This patient is stable and awaiting education. This can be delegated or completed after the urgent needs are met.",
      "Incorrect. aPTT of 85 seconds (therapeutic range 60–100 seconds) with heparin is within or near therapeutic range. While this needs review, the patient is not in immediate danger. The respiratory emergency takes absolute priority.",
    ],
    tip: "ABCDE: Airway → Breathing → Circulation → Disability → Exposure. Always in this order.",
  },
  {
    id: "q10", category: "Diabetes Mellitus", nclexCategory: "Physiological Adaptation", difficulty: "intermediate", peerCorrectPct: 49,
    question: "A nurse is caring for a patient with DKA. The patient's blood glucose is 285 mg/dL (down from 520 on admission). Insulin drip is running. Which laboratory value requires the nurse's IMMEDIATE attention?",
    options: ["A) Serum glucose 285 mg/dL", "B) Serum potassium 2.9 mEq/L", "C) Serum sodium 132 mEq/L", "D) Arterial pH 7.30"],
    correct: 1,
    rationale: "Hypokalemia (K+ 2.9 mEq/L) is the critical finding. Insulin drives potassium INTO cells, causing serum K+ to drop rapidly during DKA treatment. Hypokalemia can cause fatal cardiac arrhythmias. Rule: DO NOT administer insulin if K+ < 3.5 mEq/L until potassium is replaced. Glucose is improving; mild hyponatremia and pH 7.30 are expected in DKA.",
    optionExplanations: [
      "Incorrect. Serum glucose of 285 mg/dL represents improvement from 520 mg/dL — this is the treatment working. DKA glucose typically normalizes before acidosis resolves. Continue monitoring but no immediate change is needed.",
      "Correct. K+ of 2.9 mEq/L is critically low. Insulin shifts K+ into cells, dropping serum levels rapidly. Hypokalemia causes life-threatening cardiac arrhythmias. The insulin drip must be held and potassium replaced before restarting. This is the CRITICAL finding requiring immediate action.",
      "Incorrect. Serum sodium of 132 mEq/L is mildly low (pseudohyponatremia is expected in DKA due to hyperglycemia). As glucose normalizes, sodium will correct. This does not require immediate intervention.",
      "Incorrect. Arterial pH 7.30 indicates mild acidosis, which is expected and improving in DKA treatment. pH < 7.0 would be a critical emergency. A pH of 7.30 is being actively treated and does not require immediate separate intervention beyond current management.",
    ],
    tip: "DKA insulin rule: HOLD insulin if K+ < 3.5. Replace K+ first to prevent fatal arrhythmias.",
  },
  {
    id: "q11", category: "Pressure Injuries & Wound Care", nclexCategory: "Safety and Infection Control", difficulty: "intermediate", peerCorrectPct: 42,
    multiSelect: true,
    question: "The supervising nurse watches a newly hired nurse take care of a client who is at risk of developing a pressure ulcer. Which of the following interventions by the newly hired nurse requires follow-up? Select all that apply.",
    options: [
      "A) Applies zinc oxide to the client's perineal skin.",
      "B) Provides a donut pillow while the client is sitting in the chair.",
      "C) Maintains the head of the client's bed at 90 degrees.",
      "D) Encourages the client to consume foods rich in carbohydrates.",
      "E) Uses a pillow to float the client's heels.",
    ],
    correct: [1, 2, 3],
    rationale: "Three actions require follow-up: (B) donut pillows are contraindicated — they cause pressure on surrounding tissue and reduce blood flow; (C) HOB at 90° creates shear and friction over the sacrum, increasing breakdown risk (target ≤30°); (D) carbohydrates do not promote healing — protein, vitamin C, and zinc are the priorities. Zinc oxide barrier cream and heel-floating pillows are CORRECT interventions and do not require follow-up.",
    optionExplanations: [
      "Correct intervention. Zinc oxide is a moisture barrier that protects perineal skin from incontinence-related dermatitis. This is appropriate care and does not require follow-up.",
      "Requires follow-up. Donut pillows are contraindicated for pressure ulcer prevention. They concentrate pressure on the surrounding tissue and reduce blood flow to the central area, worsening the risk.",
      "Requires follow-up. HOB at 90° creates shear forces on the sacrum and coccyx. The HOB should be kept at 30° or lower whenever possible to reduce shear and friction.",
      "Requires follow-up. Carbohydrates do not promote tissue repair. Wound healing requires protein, vitamin C, vitamin A, and zinc. Patient education should focus on protein-rich foods.",
      "Correct intervention. Floating the heels with a pillow offloads pressure from the calcaneus, which is a common pressure ulcer site. This is appropriate prevention.",
    ],
    tip: "Pressure ulcer prevention: NO donuts, HOB ≤30°, protein for healing, float the heels.",
  },
  {
    id: "q12", category: "Heart Failure", nclexCategory: "Physiological Adaptation", difficulty: "advanced", peerCorrectPct: 36,
    type: "extended-multi",
    question: "A nurse is reviewing the chart of a client admitted with acute decompensated heart failure. Which findings indicate the client is experiencing fluid volume overload? Select all that apply. Partial credit applies — each correct selection earns a point, each incorrect selection deducts a point.",
    options: [
      "A) Bilateral lower extremity 3+ pitting edema",
      "B) Crackles auscultated in bilateral lung bases",
      "C) Jugular venous distension at 45° elevation",
      "D) Skin tenting on the forearm",
      "E) Weight gain of 4 lbs in 24 hours",
      "F) Urine specific gravity of 1.035",
      "G) S3 heart sound on auscultation",
      "H) Dry oral mucous membranes",
    ],
    correct: [0, 1, 2, 4, 6],
    rationale: "Fluid volume overload presents with: (A) dependent edema as fluid accumulates in lower extremities; (B) crackles from pulmonary edema; (C) JVD reflecting elevated central venous pressure; (E) rapid weight gain (1L = 1kg ≈ 2.2 lbs); (G) S3 gallop indicating ventricular overfilling. Skin tenting (D), high specific gravity (F), and dry mucous membranes (H) are all signs of fluid volume DEFICIT, not overload — these indicate dehydration. Distinguishing overload vs deficit is the core clinical judgment skill being assessed.",
    optionExplanations: [
      "Correct. Bilateral pitting edema in dependent areas (feet, ankles, sacrum) is a classic sign of fluid overload — gravity pulls excess interstitial fluid downward.",
      "Correct. Bibasilar crackles indicate pulmonary edema — fluid backed up into the alveoli from left-sided heart failure.",
      "Correct. JVD at 45° elevation reflects elevated right atrial pressure and central venous pressure, hallmarks of right-sided heart failure and fluid overload.",
      "Incorrect. Skin tenting (poor turgor) is a sign of fluid volume DEFICIT, not overload. The skin retains its pinched shape because of inadequate hydration.",
      "Correct. Rapid weight gain (>2-3 lbs/day) is the most sensitive indicator of fluid retention. 1 liter of fluid ≈ 2.2 lbs.",
      "Incorrect. High urine specific gravity (>1.030) indicates concentrated urine — a sign of fluid DEFICIT. Overloaded patients typically have dilute urine.",
      "Correct. S3 gallop occurs during rapid ventricular filling and is a classic finding in heart failure with fluid overload — sometimes called the 'ventricular gallop.'",
      "Incorrect. Dry mucous membranes signal fluid DEFICIT/dehydration, not overload. Overloaded patients typically have moist mucous membranes.",
    ],
    tip: "Fluid OVERLOAD: edema, crackles, JVD, weight gain, S3. Fluid DEFICIT: tenting, dry membranes, concentrated urine.",
  },
  // {
  //   id: "q13", category: "Heart Failure Medications", nclexCategory: "Pharmacological and Parenteral Therapies", difficulty: "advanced", peerCorrectPct: 42,
  //   type: "matrix",
  //   question: "A nurse is caring for a 78-year-old client admitted with acute decompensated heart failure. The client is dyspneic at rest, has crackles in bilateral lower lobes, BP 92/58, HR 112, SpO₂ 88% on room air. For each nursing intervention, click to specify whether it is Indicated, Contraindicated, or Non-essential at this time.",
  //   matrixRows: [
  //     "Administer furosemide 40 mg IV",
  //     "Place client in high-Fowler's position",
  //     "Administer 1000 mL normal saline bolus",
  //     "Apply oxygen at 4 L/min via nasal cannula",
  //     "Administer metoprolol 25 mg PO",
  //     "Obtain ECG and serum BNP",
  //   ],
  //   matrixCols: ["Indicated", "Contraindicated", "Non-essential"],
  //   correct: [0, 0, 1, 0, 1, 0],
  //   rationale: "In acute decompensated heart failure with pulmonary edema and hypoxia, the priorities are reducing preload, improving oxygenation, and assessing cardiac status. Furosemide (loop diuretic), high-Fowler's position, and oxygen all DIRECTLY address the pulmonary congestion and hypoxia. ECG/BNP confirm the diagnosis and guide therapy. Fluid bolus is CONTRAINDICATED — it would worsen the volume overload. Metoprolol is CONTRAINDICATED in acute decompensation because beta-blockers reduce cardiac output and can precipitate cardiogenic shock when the heart is already failing; they're started only after the patient is stabilized.",
  //   matrixExplanations: [
  //     "Indicated. Furosemide is first-line for pulmonary edema — it reduces preload by removing excess fluid, decreasing pulmonary congestion within 30 minutes IV.",
  //     "Indicated. High-Fowler's reduces venous return (decreases preload) and allows for maximum lung expansion to improve oxygenation.",
  //     "Contraindicated. Adding 1000 mL of fluid to a patient already in fluid overload would worsen pulmonary edema and could precipitate cardiogenic shock.",
  //     "Indicated. SpO₂ of 88% requires supplemental oxygen. Nasal cannula at 2-6 L/min is appropriate first-line.",
  //     "Contraindicated. In ACUTE decompensation with hypotension (92/58), beta-blockers reduce cardiac output further. They're held until stable and then resumed/started carefully.",
  //     "Indicated. ECG identifies ischemia/arrhythmias as triggers; BNP confirms heart failure severity and guides response to therapy.",
  //   ],
  //   tip: "Acute HF: REMOVE fluid (furosemide), DON'T ADD fluid. Hold beta-blockers when unstable.",
  // },
  {
    id: "q14", category: "Insulin & Antidiabetic Agents", nclexCategory: "Pharmacological and Parenteral Therapies", difficulty: "intermediate", peerCorrectPct: 54,
    type: "cloze",
    question: "Complete the following clinical decision statement by selecting the correct option for each drop-down.",
    clozeText: "A client with type 1 diabetes presents with blood glucose 42 mg/dL, diaphoresis, and confusion. The nurse should first administer {{0}}. If the client is unable to swallow safely, the nurse should give {{1}} via the {{2}} route. Recheck blood glucose in {{3}}.",
    clozeBlanks: [
      { options: ["regular insulin IV", "15 g of fast-acting carbohydrate", "D50W IV push", "NPH insulin SQ"], correct: 1 },
      { options: ["glucagon 1 mg", "oral glucose gel", "insulin lispro", "sodium bicarbonate"], correct: 0 },
      { options: ["intramuscular", "intradermal", "sublingual", "topical"], correct: 0 },
      { options: ["5 minutes", "15 minutes", "30 minutes", "60 minutes"], correct: 1 },
    ],
    correct: [1, 0, 0, 1],
    rationale: "Hypoglycemia treatment follows the '15-15 rule.' For a CONSCIOUS client able to swallow, give 15 g of fast-acting carbohydrate (glucose tabs, juice, regular soda — NOT diet). Recheck glucose in 15 minutes; if still <70, repeat. For an UNCONSCIOUS or NPO client, give glucagon 1 mg IM (or IV dextrose if IV access available). IV D50W is reserved for severe cases with IV access established. Insulin would WORSEN hypoglycemia and is never given here.",
    clozeExplanations: [
      "Conscious + able to swallow → 15 g fast-acting carb (juice, glucose tabs). Insulin or D50W are wrong: insulin worsens hypoglycemia, D50W is for unconscious/IV-access patients.",
      "If the client cannot swallow safely, glucagon 1 mg is the answer — it triggers hepatic glycogen release. Oral glucose gel still requires swallowing. Insulin lispro would worsen hypoglycemia.",
      "Glucagon is given IM (or SQ) when no IV access — it's absorbed quickly and acts within 5-15 minutes. Sublingual/topical/intradermal aren't valid routes for glucagon.",
      "The '15-15 rule': give 15 g carb, recheck in 15 minutes. If still hypoglycemic, repeat. 5 min is too soon to see the effect; 30+ min wastes time.",
    ],
    tip: "Hypoglycemia 15-15 rule: 15 g carb → recheck in 15 min. Unconscious → glucagon 1 mg IM.",
  },
  {
    id: "q15", category: "Insulin & Antidiabetic Agents", nclexCategory: "Pharmacological and Parenteral Therapies", difficulty: "intermediate", peerCorrectPct: 58,
    type: "fill-blank",
    question: "A nurse is preparing to administer regular insulin via IV infusion. The provider's order reads: 'Regular insulin 5 units/hour IV.' The pharmacy supplies regular insulin 100 units in 100 mL of normal saline. At what rate (in mL/hour) should the nurse set the infusion pump?",
    blankInput: { kind: "numeric", correct: 5, tolerance: 0.1, unit: "mL/hour", placeholder: "Enter mL/hour" },
    correct: 5,
    rationale: "Calculation: Concentration = 100 units / 100 mL = 1 unit/mL. To deliver 5 units/hour, divide ordered dose by concentration: 5 units/hr ÷ 1 unit/mL = 5 mL/hour. Always double-check insulin calculations with a second nurse — insulin is a high-alert medication.",
    tip: "Insulin IV: ordered dose ÷ concentration = mL/hr. Always 2-nurse verify.",
  },
  {
    id: "q16", category: "ABG Interpretation in ICU", nclexCategory: "Reduction of Risk Potential", difficulty: "advanced", peerCorrectPct: 44,
    type: "fill-blank",
    question: "A nurse reviews ABG results: pH 7.50, PaCO₂ 30 mmHg, HCO₃ 24 mEq/L, PaO₂ 92 mmHg. Identify the acid-base imbalance in one or two words (do not include 'compensated' or 'uncompensated').",
    blankInput: { kind: "text", correct: ["respiratory alkalosis", "resp alkalosis"], caseSensitive: false, placeholder: "e.g. metabolic acidosis" },
    correct: "respiratory alkalosis",
    rationale: "pH 7.50 = alkalosis. PaCO₂ 30 = low (normal 35–45) = matches the alkalotic direction = respiratory cause. HCO₃ is normal (22–26), so there's no metabolic compensation yet. Conclusion: Respiratory alkalosis, uncompensated. Common causes include hyperventilation from anxiety, pain, hypoxia, or pulmonary embolism.",
    tip: "ROME: Respiratory Opposite (CO₂ low + pH high = resp alkalosis), Metabolic Equal.",
  },
];

export const RATIONALE_IMAGES = {
  q1: {
    type: "svg",
    caption: "Hemodynamic Parameters — Post-CABG Critical Thresholds",
    svg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">
      <rect width="480" height="200" fill="#f8fafc" rx="10"/>
      <text x="240" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1e293b">Post-CABG Hemodynamic Parameters</text>
      <text x="20" y="52" font-size="11" fill="#64748b" font-weight="600">MAP</text>
      <rect x="60" y="40" width="340" height="18" fill="#e2e8f0" rx="9"/>
      <rect x="60" y="40" width="204" height="18" fill="#dc2626" rx="9"/>
      <text x="62" y="53" font-size="10" fill="white" font-weight="700">58 mmHg ⚠ CRITICAL</text>
      <text x="20" y="85" font-size="11" fill="#64748b" font-weight="600">HR</text>
      <rect x="60" y="73" width="340" height="18" fill="#e2e8f0" rx="9"/>
      <rect x="60" y="73" width="250" height="18" fill="#f59e0b" rx="9"/>
      <text x="62" y="86" font-size="10" fill="white" font-weight="700">110 bpm (compensatory)</text>
      <text x="20" y="118" font-size="11" fill="#64748b" font-weight="600">CO</text>
      <rect x="60" y="106" width="340" height="18" fill="#e2e8f0" rx="9"/>
      <rect x="60" y="106" width="161" height="18" fill="#d97706" rx="9"/>
      <text x="62" y="119" font-size="10" fill="white" font-weight="700">3.8 L/min (borderline low)</text>
      <text x="20" y="151" font-size="11" fill="#64748b" font-weight="600">UO</text>
      <rect x="60" y="139" width="340" height="18" fill="#e2e8f0" rx="9"/>
      <rect x="60" y="139" width="72" height="18" fill="#ef4444" rx="9"/>
      <text x="62" y="152" font-size="10" fill="white" font-weight="700">18 mL/hr (consequence of low MAP)</text>
      <rect x="60" y="175" width="12" height="12" fill="#dc2626" rx="3"/>
      <text x="76" y="185" font-size="10" fill="#475569">Critical — intervene NOW</text>
      <rect x="200" y="175" width="12" height="12" fill="#f59e0b" rx="3"/>
      <text x="216" y="185" font-size="10" fill="#475569">Abnormal — compensatory</text>
    </svg>`,
  },
  q3: {
    type: "svg",
    caption: "Digoxin Toxicity Risk — Potassium Relationship",
    svg: `<svg viewBox="0 0 480 190" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">
      <rect width="480" height="190" fill="#f8fafc" rx="10"/>
      <text x="240" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#1e293b">Digoxin + Potassium: Toxicity Relationship</text>
      <text x="20" y="58" font-size="11" font-weight="700" fill="#64748b">K\u207a Level</text>
      <rect x="100" y="46" width="340" height="20" fill="#e2e8f0" rx="10"/>
      <rect x="100" y="46" width="68" height="20" fill="#dc2626" rx="10 0 0 10"/>
      <text x="101" y="60" font-size="9" fill="white" font-weight="700">K &lt; 3.5 → HOLD digoxin</text>
      <rect x="168" y="46" width="272" height="20" fill="#16a34a" rx="0 10 10 0"/>
      <text x="280" y="60" font-size="9" fill="white" font-weight="700">K ≥ 3.5 → Safe to administer</text>
      <line x1="154" y1="38" x2="154" y2="72" stroke="#7c3aed" strokeWidth="2.5" stroke-dasharray="4"/>
      <text x="156" y="36" font-size="10" font-weight="700" fill="#7c3aed">Patient: 3.1 ⚠</text>
      <text x="100" y="80" font-size="9" fill="#64748b">2.5</text>
      <text x="236" y="80" font-size="9" fill="#64748b">3.5 (threshold)</text>
      <text x="430" y="80" font-size="9" fill="#64748b">5.5</text>
      <rect x="20" y="94" width="200" height="72" fill="#fee2e2" rx="10" stroke="#fca5a5"/>
      <text x="120" y="112" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">⚠ Hypokalemia Effect</text>
      <text x="30" y="128" font-size="10" fill="#7f1d1d">K\u207a competes with digoxin at</text>
      <text x="30" y="142" font-size="10" fill="#7f1d1d">Na/K-ATPase pump. Low K\u207a =</text>
      <text x="30" y="156" font-size="10" fill="#7f1d1d">↑ digoxin binding = TOXICITY</text>
      <rect x="255" y="94" width="200" height="72" fill="#dcfce7" rx="10" stroke="#86efac"/>
      <text x="355" y="112" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">✓ Nursing Action</text>
      <text x="265" y="128" font-size="10" fill="#166534">1. HOLD digoxin</text>
      <text x="265" y="142" font-size="10" fill="#166534">2. Notify provider</text>
      <text x="265" y="156" font-size="10" fill="#166534">3. Replace K\u207a as ordered</text>
    </svg>`,
  },
  q7: {
    type: "svg",
    caption: "Cushing's Triad — Late Sign of Increased ICP",
    svg: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">
      <rect width="480" height="200" fill="#f8fafc" rx="10"/>
      <text x="240" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#dc2626">⚠ Cushing's Triad = ICP Emergency</text>
      <rect x="16" y="32" width="138" height="110" fill="#fee2e2" rx="10" stroke="#fca5a5"/>
      <text x="85" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">① Blood Pressure</text>
      <text x="85" y="72" text-anchor="middle" font-size="22" font-weight="800" fill="#dc2626">↑ SBP</text>
      <text x="85" y="92" text-anchor="middle" font-size="10" fill="#7f1d1d">Widening pulse pressure</text>
      <text x="85" y="108" text-anchor="middle" font-size="10" fill="#7f1d1d">SBP rises, DBP falls</text>
      <rect x="171" y="32" width="138" height="110" fill="#fee2e2" rx="10" stroke="#fca5a5"/>
      <text x="240" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">② Heart Rate</text>
      <text x="240" y="72" text-anchor="middle" font-size="22" font-weight="800" fill="#dc2626">↓ HR</text>
      <text x="240" y="92" text-anchor="middle" font-size="10" fill="#7f1d1d">Bradycardia</text>
      <text x="240" y="108" text-anchor="middle" font-size="10" fill="#7f1d1d">Vagal stimulation from</text>
      <text x="240" y="124" text-anchor="middle" font-size="10" fill="#7f1d1d">brainstem compression</text>
      <rect x="326" y="32" width="138" height="110" fill="#fee2e2" rx="10" stroke="#fca5a5"/>
      <text x="395" y="52" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">③ Respirations</text>
      <text x="395" y="72" text-anchor="middle" font-size="22" font-weight="800" fill="#dc2626">∿ RR</text>
      <text x="395" y="92" text-anchor="middle" font-size="10" fill="#7f1d1d">Irregular respirations</text>
      <text x="395" y="108" text-anchor="middle" font-size="10" fill="#7f1d1d">Cheyne-Stokes or</text>
      <text x="395" y="124" text-anchor="middle" font-size="10" fill="#7f1d1d">ataxic breathing</text>
      <rect x="16" y="155" width="448" height="34" fill="#2C5F8D" rx="8"/>
      <text x="240" y="167" text-anchor="middle" font-size="10" font-weight="700" fill="white">IMMEDIATE ACTIONS: HOB 30° · Hyperventilate · Osmotic diuresis (Mannitol) · Notify neurosurgery</text>
      <text x="240" y="181" text-anchor="middle" font-size="9" fill="#93c5fd">Cushing's Triad = LATE sign — brainstem herniation is imminent</text>
    </svg>`,
  },
  q8: {
    type: "svg",
    caption: "ABG Interpretation — Step-by-Step Method",
    svg: `<svg viewBox="0 0 480 195" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">
      <rect width="480" height="195" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1e293b">ABG Interpretation: ROME Method</text>
      <rect x="14" y="30" width="100" height="65" fill="#eef4fb" rx="9" stroke="rgba(44,95,141,0.3)"/>
      <text x="64" y="48" text-anchor="middle" font-size="10" font-weight="700" fill="#2C5F8D">STEP 1</text>
      <text x="64" y="62" text-anchor="middle" font-size="11" font-weight="800" fill="#2C5F8D">pH</text>
      <text x="64" y="76" text-anchor="middle" font-size="9" fill="#475569">&lt;7.35 = Acidosis</text>
      <text x="64" y="88" text-anchor="middle" font-size="9" fill="#475569">&gt;7.45 = Alkalosis</text>
      <text x="120" y="65" font-size="16" fill="#94a3b8">→</text>
      <rect x="130" y="30" width="100" height="65" fill="#f5f3ff" rx="9" stroke="#ddd6fe"/>
      <text x="180" y="48" text-anchor="middle" font-size="10" font-weight="700" fill="#7c3aed">STEP 2</text>
      <text x="180" y="62" text-anchor="middle" font-size="11" font-weight="800" fill="#2C5F8D">PaCO₂</text>
      <text x="180" y="76" text-anchor="middle" font-size="9" fill="#475569">&gt;45 = Acidosis</text>
      <text x="180" y="88" text-anchor="middle" font-size="9" fill="#475569">&lt;35 = Alkalosis</text>
      <text x="235" y="65" font-size="16" fill="#94a3b8">→</text>
      <rect x="246" y="30" width="100" height="65" fill="#ecfdf5" rx="9" stroke="#bbf7d0"/>
      <text x="296" y="48" text-anchor="middle" font-size="10" font-weight="700" fill="#059669">STEP 3</text>
      <text x="296" y="62" text-anchor="middle" font-size="11" font-weight="800" fill="#2C5F8D">HCO₃⁻</text>
      <text x="296" y="76" text-anchor="middle" font-size="9" fill="#475569">&lt;22 = Acidosis</text>
      <text x="296" y="88" text-anchor="middle" font-size="9" fill="#475569">&gt;26 = Alkalosis</text>
      <text x="351" y="65" font-size="16" fill="#94a3b8">→</text>
      <rect x="362" y="30" width="104" height="65" fill="#fff7ed" rx="9" stroke="#fed7aa"/>
      <text x="414" y="48" text-anchor="middle" font-size="10" font-weight="700" fill="#d97706">STEP 4</text>
      <text x="414" y="62" text-anchor="middle" font-size="11" font-weight="800" fill="#2C5F8D">Match</text>
      <text x="414" y="76" text-anchor="middle" font-size="9" fill="#475569">CO₂ matches pH?</text>
      <text x="414" y="88" text-anchor="middle" font-size="9" fill="#475569">→ Respiratory</text>
      <rect x="14" y="108" width="452" height="30" fill="#2C5F8D" rx="8"/>
      <text x="240" y="120" text-anchor="middle" font-size="10" font-weight="700" fill="white">This Question: pH 7.28 (acid) · PaCO₂ 52 (acid = matches) · HCO₃ 24 (normal = no compensation)</text>
      <text x="240" y="132" text-anchor="middle" font-size="10" fill="#93c5fd">→ Respiratory Acidosis, Uncompensated</text>
      <rect x="14" y="156" font-size="10" font-weight="700" fill="#64748b">ROME: Respiratory Opposite · Metabolic Equal</text>
    </svg>`,
  },
  q9: {
    type: "svg",
    caption: "ABCDE Prioritization Framework",
    svg: `<svg viewBox="0 0 480 198" xmlns="http://www.w3.org/2000/svg" font-family="DM Sans,sans-serif">
      <rect width="480" height="198" fill="#f8fafc" rx="10"/>
      <text x="240" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#1e293b">ABCDE Prioritization — Assess in This Order</text>
      <rect x="14" y="28" width="452" height="30" fill="#dc2626" rx="8"/>
      <text x="34" y="39" font-size="11" font-weight="800" fill="white">A — Airway</text>
      <text x="440" y="39" text-anchor="end" font-size="10" font-weight="700" fill="white">FIRST</text>
      <rect x="14" y="62" width="452" height="30" fill="#ef4444" rx="8"/>
      <text x="34" y="73" font-size="11" font-weight="800" fill="white">B — Breathing</text>
      <text x="185" y="73" font-size="10" fill="#fecaca">SpO₂, RR, accessory muscles → Patient B has SpO₂ 86% — PRIORITY</text>
      <rect x="14" y="96" width="452" height="30" fill="#f97316" rx="8"/>
      <text x="34" y="107" font-size="11" font-weight="800" fill="white">C — Circulation</text>
      <rect x="14" y="130" width="452" height="30" fill="#eab308" rx="8"/>
      <text x="34" y="141" font-size="11" font-weight="800" fill="white">D — Disability</text>
      <rect x="14" y="164" width="452" height="28" fill="#64748b" rx="8"/>
      <text x="34" y="175" font-size="11" font-weight="800" fill="white">E — Exposure / Environment</text>
    </svg>`,
  },
};

export const scoreColor = (s) => s >= 80 ? "#16a34a" : s >= 70 ? "#d97706" : "#dc2626";
export const scoreBg = (s) => s >= 80 ? "#dcfce7" : s >= 70 ? "#fef3c7" : "#fee2e2";

export const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const NGN_TYPES = new Set(["extended-multi", "matrix", "cloze", "bowtie", "trend", "highlight", "rank", "multiple", "order", "input", "fill-blank"]);
export const PARTIAL_CREDIT_TYPES = ["extended-multi", "matrix", "bowtie", "cloze"];
