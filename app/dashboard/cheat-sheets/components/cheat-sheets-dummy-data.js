import React from 'react';
import {
  Stethoscope,
  ClipboardCheck,
  Baby,
  Pill,
  Brain,
  Users,
  Briefcase,
  Scale,
  HeartPulse,
  FileSearch,
  Globe
} from 'lucide-react';

export const categoriesData = [
  {
    id: 1,
    slug: "medical-surgical-nursing",
    title: "Medical-Surgical Nursing",
    topics: 316,
    icon: <Stethoscope className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 101, slug: "copd", title: "COPD" },
      { id: 102, slug: "heart-failure", title: "Heart Failure" },
      { id: 103, slug: "pulmonary-embolism", title: "Pulmonary Embolism" },
      { id: 104, slug: "seizure-disorders", title: "Seizure Disorders" },
      { id: 105, slug: "inflammatory-bowel-disease", title: "Inflammatory Bowel Disease" },
      { id: 106, slug: "renal-failure-ckd", title: "Renal Failure (CKD)" },
      { id: 107, slug: "acute-pain-management", title: "Acute Pain Management" },
    ],
  },
  {
    id: 2,
    slug: "fundamentals-of-nursing",
    title: "Fundamentals Of Nursing",
    topics: 49,
    icon: <ClipboardCheck className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 201, slug: "vital-signs", title: "Vital Signs" },
      { id: 202, slug: "patient-safety", title: "Patient Safety" },
      { id: 203, slug: "infection-control", title: "Infection Control" },
    ],
  },
  {
    id: 3,
    slug: "maternal-newborn-nursing",
    title: "Maternal-Newborn Nursing",
    topics: 49,
    icon: <Baby className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 301, slug: "placenta-previa", title: "Placenta Previa" },
      { id: 302, slug: "abruptio-placentae", title: "Abruptio Placentae" },
    ],
  },
  {
    id: 4,
    slug: "pharmacology",
    title: "Pharmacology",
    topics: 49,
    icon: <Pill className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 401, slug: "serotonin-syndrome", title: "Serotonin Syndrome" },
      { id: 402, slug: "nms", title: "Neuroleptic Malignant Syndrome (NMS)" },
    ],
  },
  {
    id: 5,
    slug: "mental-health-nursing",
    title: "Mental Health Nursing",
    topics: 49,
    icon: <Brain className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 501, slug: "depression-anxiety", title: "Depression & Anxiety" },
    ],
  },
  {
    id: 6,
    slug: "community-public-health-nursing",
    title: "Community & Public Health Nursing",
    topics: 49,
    icon: <Users className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 601, slug: "immunization-schedules", title: "Immunization Schedules" },
    ],
  },
  {
    id: 7,
    slug: "leadership-management",
    title: "Leadership & Management",
    topics: 49,
    icon: <Briefcase className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 701, slug: "delegation-principles", title: "Delegation Principles" },
    ],
  },
  {
    id: 8,
    slug: "legal-ethical-nursing",
    title: "Legal & Ethical Nursing",
    topics: 49,
    icon: <Scale className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 801, slug: "informed-consent", title: "Informed Consent" },
    ],
  },
  {
    id: 9,
    slug: "health-assessment",
    title: "Health Assessment",
    topics: 49,
    icon: <HeartPulse className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 901, slug: "lung-sounds", title: "Lung Sounds" },
    ],
  },
  {
    id: 10,
    slug: "nursing-research-ebp",
    title: "Nursing Research & EBP",
    topics: 49,
    icon: <FileSearch className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 1001, slug: "evidence-hierarchy", title: "Evidence Hierarchy" },
    ],
  },
  {
    id: 11,
    slug: "cultural-competence",
    title: "Cultural Competence",
    topics: 49,
    icon: <Globe className="w-5.5 h-5.5 text-[#2C5F8D]" />,
    subcategories: [
      { id: 1101, slug: "transcultural-care", title: "Transcultural Care" },
    ],
  },
];

export const cheatSheetsData = [
  {
    id: 1,
    slug: "stroke-alert",
    topicSlug: "copd",
    category: "Neuro - Stroke",
    title: "Stroke Alert: CT First, No Contrast",
    description: "Why CT-without-contrast comes before tPA — and the FAST checklist.",
    image: "/assets/visual-notes-img01.png",
    color: "text-rose-600 bg-rose-50 border-rose-100",
    badgeColor: "text-rose-600",
    details: {
      indications: [
        "Acute neurological deficits (e.g. facial droop, arm weakness)",
        "Sudden difficulty speaking or understanding speech (aphasia)",
        "Sudden confusion, loss of balance, or severe headache",
        "Assessment checklist FAST protocol triggers",
      ],
      definition: {
        title: "WHAT IS A CT FIRST POLICY?",
        content: "A rapid, non-contrast head CT scan is the absolute first diagnostic step for any patient presenting with acute stroke symptoms. Its primary clinical purpose is to rule out a hemorrhagic stroke (bleeding in the brain) before administering tPA (tissue plasminogen activator), which is a powerful thrombolytic (clot-buster). Giving tPA to a patient with an active brain bleed would be catastrophic."
      },
      parts: {
        title: "STROKE EMERGENCY WORKFLOW",
        items: [
          "CT Scan WITHOUT Contrast: Rules out hemorrhage/bleeding immediately.",
          "Assess tPA Eligibility: Confirm that patient matches criteria and doesn't have active bleeding.",
          "Symptom Window: tPA is typically administered within 3 to 4.5 hours of last known normal.",
          "Blood Pressure Limits: Maintain BP below 185/110 mmHg to prevent hemorrhagic conversion.",
        ]
      },
      assessment: "Triad: Facial droop + Arm drift + Speech changes. Document exact 'Last Known Normal' time. Obtain immediate blood glucose (hypoglycemia can mimic stroke). Secure two large-bore IVs, keep NPO, and prepare for stat non-contrast head CT."
    }
  },
  {
    id: 2,
    slug: "placenta-previa",
    topicSlug: "placenta-previa",
    category: "OB - High-Risk",
    title: "Placenta Previa: Look, Don't Touch",
    description: "No digital exams. Bedside priorities + previa vs. abruptio at a glance.",
    image: "/assets/visual-notes-img02.png",
    color: "text-amber-600 bg-amber-50 border-amber-100",
    badgeColor: "text-amber-600",
    details: {
      indications: [
        "Painless, bright-red vaginal bleeding during 2nd or 3rd trimester",
        "Soft, relaxed, and non-tender uterus upon palpation",
        "Reassuring fetal heart rate tones (FHR) initially",
        "Fundal height matching or greater than gestational age",
      ],
      definition: {
        title: "WHAT IS PLACENTA PREVIA?",
        content: "Placenta previa occurs when the placenta attaches in the lower uterine segment, partially or completely covering the internal cervical os. As the cervix begins to dilate or thin in late pregnancy, the placental attachments tear, causing painless bleeding."
      },
      parts: {
        title: "SAFE CLINICAL GUIDELINES",
        items: [
          "NO VAGINAL EXAMS: Avoid digital cervical checks. Touching the placenta can cause severe hemorrhage.",
          "Ultrasound Diagnosis: Always perform transabdominal ultrasound first to locate placenta.",
          "Bedside Priorities: Establish IV access, check maternal vitals, and initiate continuous fetal monitoring.",
          "Type & Screen: Have blood products typed, crossmatched, and ready for transfusion.",
        ]
      },
      assessment: "Nursing Alert: Never perform digital vaginal examinations on a pregnant patient presenting with bright-red vaginal bleeding of unknown origin. Monitor blood loss (weigh pads), maternal vitals for signs of shock, and fetal heart rate. Keep patient on strict bed rest."
    }
  },
  {
    id: 3,
    slug: "serotonin-syndrome",
    topicSlug: "serotonin-syndrome",
    category: "Pharm - Emergency",
    title: "Serotonin Syndrome vs NMS",
    description: "Sertraline + tramadol = trouble. Spot SS vs. NMS in seconds.",
    image: "/assets/visual-notes-img03.png",
    color: "text-purple-600 bg-purple-50 border-purple-100",
    badgeColor: "text-purple-600",
    details: {
      indications: [
        "Agitation, confusion, restlessness, and altered mental status",
        "Tachycardia, labile blood pressure, and diaphoresis",
        "Hyperthermia and autonomic instability",
        "Co-administration of SSRIs, MAOIs, or Tramadol",
      ],
      definition: {
        title: "WHAT IS SEROTONIN SYNDROME?",
        content: "Serotonin syndrome is a potentially life-threatening drug reaction caused by excessive accumulation of serotonin in the body, typically resulting from therapeutic drug use, intentional overdose, or drug-drug interactions involving serotonergic agents (e.g. SSRIs combined with MAOIs, Tramadol, or St. John's wort)."
      },
      parts: {
        title: "SEROTONIN SYNDROME VS. NMS",
        items: [
          "Neuromuscular Signs: Serotonin Syndrome features hyperreflexia, ocular clonus, and tremors; NMS has rigid 'lead-pipe' rigidity.",
          "Speed of Onset: Serotonin Syndrome has rapid onset (< 24 hours); NMS develops slowly over days.",
          "Causative Agents: SSRIs/Tramadol/MAOIs for Serotonin Syndrome vs. Dopamine Antagonists/Antipsychotics for NMS.",
          "Therapy Antidote: Cyproheptadine (Serotonin antagonist) vs. Dantrolene/Bromocriptine (muscle relaxant/dopamine agonist).",
        ]
      },
      assessment: "Nursing Action: Discontinue all serotonergic agents immediately. Administer supportive treatments (IV fluids, cooling blankets for hyperthermia, benzodiazepines for muscle relaxation). Monitor closely for hyperthermia, seizures, and rhabdomyolysis."
    }
  },
];

export const getCheatSheetBySlug = (slug) => {
  const direct = cheatSheetsData.find(t => t.slug === slug || t.topicSlug === slug);
  if (direct) return direct;

  if (["heart-failure", "pulmonary-embolism", "seizure-disorders", "vital-signs", "patient-safety", "infection-control", "delegation-principles", "informed-consent", "lung-sounds"].includes(slug)) {
    return {
      ...cheatSheetsData[0],
      slug: slug,
      topicSlug: slug,
    };
  }
  if (["abruptio-placentae", "transcultural-care"].includes(slug)) {
    return {
      ...cheatSheetsData[1],
      slug: slug,
      topicSlug: slug,
      title: slug === "abruptio-placentae" ? "Abruptio Placentae: High-Risk Alert" : cheatSheetsData[1].title,
      category: slug === "abruptio-placentae" ? "OB - High-Risk" : cheatSheetsData[1].category,
    };
  }
  if (["nms", "depression-anxiety", "immunization-schedules", "evidence-hierarchy"].includes(slug)) {
    return {
      ...cheatSheetsData[2],
      slug: slug,
      topicSlug: slug,
      title: slug === "nms" ? "Neuroleptic Malignant Syndrome (NMS)" : cheatSheetsData[2].title,
    };
  }

  return cheatSheetsData[0];
};

export const getCheatSheetsGrid = () => {
  const result = [];
  const titles = [
    "Stroke Alert: CT First, No Contrast",
    "Placenta Previa: Look, Don't Touch",
    "Serotonin Syndrome vs NMS",
    "Stroke Alert: CT First, No Contrast (Critical Step)",
    "Placenta Previa: Look, Don't Touch (Bedside Priorities)",
    "Serotonin Syndrome vs NMS (Wrong Combos)",
  ];

  for (let i = 0; i < 16; i++) {
    const baseSheet = cheatSheetsData[i % 3];
    result.push({
      ...baseSheet,
      id: i + 1,
      slug: `${baseSheet.slug}-${i + 1}`,
      title: titles[i % titles.length],
    });
  }
  return result;
};