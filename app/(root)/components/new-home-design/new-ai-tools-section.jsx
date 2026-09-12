import {
    BookOpen,
    Layers,
    ClipboardCheck,
    Pill,
    Brain,
    ClipboardList,
    Heart,
    CheckCircle2,
    ArrowDown,
} from "lucide-react";

const CASE_TABS = [
    { label: "Vitals", active: true },
    { label: "Labs", active: false },
    { label: "ECG", active: false },
    { label: "Orders", active: false },
];

const FLASHCARD_BACK = ["Muscle Weakness", "Cardiac arrhythmias", "Fatigue"];

const QUIZ_OPTIONS = [
    { label: "A. Anxiety", correct: false },
    { label: "B. Use of accessory muscles", correct: true },
    { label: "C. Productive cough", correct: false },
    { label: "D. Bradycardia", correct: false },
];

const DRUG_SECTIONS = [
    { label: "Class", items: ["Loop Diuretic"] },
    { label: "Indications", items: ["Edema (CHF, renal)", "Hypertension"] },
    { label: "Side Effects", items: ["Hypokalemia", "Dehydration"] },
];

const CONCEPT_BRANCHES = ["Causes", "Signs & Symptoms", "Complications"];
const CONCEPT_LEAVES = ["CAD", "HTN", "Dyspnea", "Edema", "Pulmonary edema", "Arrhythmias"];

const CARE_PLAN_STEPS = [
    { label: "Assessment", tone: "text-emerald-700", checked: false },
    { label: "Nursing Diagnosis", tone: "text-slate-700", checked: false },
    { label: "Goals", tone: "text-emerald-700", checked: false },
    { label: "Interventions", tone: "text-slate-800", checked: true },
];

/* Cards share two rows (copy / mockup) so the mockup panels line up across a row
   on tablet (2 columns) and laptop + (3 columns). */
const CARD_CLASS =
    "grid grid-rows-[auto_1fr] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md sm:row-span-2 sm:grid-rows-subgrid sm:p-6";

const ToolCard = ({ icon: Icon, iconClassName, title, description, panelClassName, children }) => (
    <article className={CARD_CLASS}>
        <div>
            <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${iconClassName}`} strokeWidth={1.75} />

            <h3 className="mt-3 text-xl font-bold text-[#5D55FA] sm:text-2xl">{title}</h3>

            <p className="mt-1.5 text-xs leading-relaxed text-slate-500 sm:text-sm">{description}</p>
        </div>

        <div className={`mt-4 flex flex-col rounded-xl border p-3 ${panelClassName}`}>
            {children}
        </div>
    </article>
);

const NewAiToolsSection = () => {
    return (
        <section className="w-full bg-[#F8FAFC] py-14 text-slate-800 sm:py-16 md:py-20 lg:py-24">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12 md:mb-14">
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                        Powerful <span className="text-[#5D55FA]">AI Tools</span> for Nursing Students
                    </h2>
                    <p className="mt-3 text-xs font-medium text-slate-500 sm:text-sm md:text-base">
                        Everything you need to study, practice, and succeed — all in one place.
                    </p>
                </div>

                {/* 6 Feature Cards Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-[auto_1fr_auto_1fr_auto_1fr] lg:grid-cols-3 lg:grid-rows-[auto_1fr_auto_1fr] lg:gap-6">

                    {/* Card 1: Case Studies */}
                    <ToolCard
                        icon={BookOpen}
                        iconClassName="text-[#5D55FA]"
                        title="Case Studies"
                        description="Practice with real-world nursing scenarios. Make critical decisions and build critical thinking."
                        panelClassName="border-indigo-100/80 bg-indigo-50/60"
                    >
                        <p className="text-[12px] font-bold text-slate-800 sm:text-[13px]">
                            Patient with Acute Chest Pain
                        </p>

                        <div className="mt-2.5 rounded-lg border border-slate-200/70 bg-white p-2.5 sm:p-3">
                            {/* Tabs */}
                            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                                {CASE_TABS.map((tab) => (
                                    <span
                                        key={tab.label}
                                        className={
                                            tab.active
                                                ? "rounded-lg bg-[#5D55FA] px-2.5 py-1 font-semibold text-white"
                                                : "rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-medium text-slate-600"
                                        }
                                    >
                                        {tab.label}
                                    </span>
                                ))}
                            </div>

                            {/* Prompt */}
                            <div className="mt-3 rounded-lg border border-slate-200/80 bg-white px-3 py-2.5 text-[11px] font-semibold text-slate-700">
                                What is your priority nursing intervention?
                            </div>
                        </div>
                    </ToolCard>

                    {/* Card 2: Notes to Flashcard */}
                    <ToolCard
                        icon={Layers}
                        iconClassName="text-amber-500"
                        title="Notes to Flashcard"
                        description="Convert your notes into smart flashcards. Study more in less time."
                        panelClassName="border-amber-100/80 bg-amber-50/60"
                    >
                        <div className="rounded-lg border border-slate-200/70 bg-white p-2.5 sm:p-3">
                            <p className="text-[11px] font-bold text-slate-800">Front</p>
                            <p className="mt-1 text-[11px] text-slate-700 sm:text-[12px]">
                                What are the signs of hypokalemia?
                            </p>
                        </div>

                        <div className="mt-2.5 rounded-lg border border-slate-200/70 bg-white p-2.5 sm:p-3">
                            <p className="text-[11px] font-bold text-slate-800">Back</p>
                            <ul className="mt-1 space-y-0.5 text-[11px] text-slate-700 sm:text-[12px]">
                                {FLASHCARD_BACK.map((item) => (
                                    <li key={item} className="truncate">
                                        • {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </ToolCard>

                    {/* Card 3: Notes to Quiz */}
                    <ToolCard
                        icon={ClipboardCheck}
                        iconClassName="text-blue-600"
                        title="Notes to Quiz"
                        description="Turn notes into custom quizzes. Test yourself and track your progress."
                        panelClassName="border-indigo-100/80 bg-indigo-50/60"
                    >
                        <p className="text-[11px] font-bold leading-snug text-slate-800 sm:text-[12px]">
                            <span className="text-[#5D55FA]">Q1.</span> A nurse is caring for a patient with
                            COPD. Which assessment finding is priority?
                        </p>

                        <div className="mt-2.5 space-y-1.5 rounded-lg border border-slate-200/70 bg-white p-2.5 sm:p-3">
                            {QUIZ_OPTIONS.map((option) => (
                                <div
                                    key={option.label}
                                    className="flex items-center gap-2 text-[10px] sm:text-[11px]"
                                >
                                    <span
                                        className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                                            option.correct ? "border-[#5D55FA]" : "border-slate-300"
                                        }`}
                                    >
                                        {option.correct && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#5D55FA]" />
                                        )}
                                    </span>

                                    <span
                                        className={
                                            option.correct
                                                ? "font-semibold text-slate-800"
                                                : "text-slate-600"
                                        }
                                    >
                                        {option.label}
                                    </span>

                                    {option.correct && (
                                        <CheckCircle2 className="ml-auto h-3.5 w-3.5 shrink-0 text-[#2563EB]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </ToolCard>

                    {/* Card 4: Drug Cards */}
                    <ToolCard
                        icon={Pill}
                        iconClassName="text-rose-500"
                        title="Drug Cards"
                        description="Get comprehensive drug info: class, indications, dosage, side effects, interactions & more."
                        panelClassName="border-slate-200/80 bg-white"
                    >
                        <div className="relative flex h-full flex-col">
                            <div className="flex items-start justify-between gap-2">
                                <p className="text-[12px] font-bold text-slate-900 sm:text-[13px]">
                                    Furosemide (Lasix)
                                </p>
                                <Heart className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                            </div>

                            <div className="mt-2.5 space-y-2 text-[10px] sm:text-[11px]">
                                {DRUG_SECTIONS.map((section) => (
                                    <div key={section.label}>
                                        <span className="block font-bold text-slate-800">
                                            {section.label}
                                        </span>
                                        {section.items.map((item) => (
                                            <span key={item} className="block text-slate-600">
                                                • {item}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <Heart className="absolute bottom-0 right-0 h-4 w-4 fill-rose-500 text-rose-500" />
                        </div>
                    </ToolCard>

                    {/* Card 5: Concept Map */}
                    <ToolCard
                        icon={Brain}
                        iconClassName="text-purple-500"
                        title="Concept Map"
                        description="Visualize complex topics and convert ideas to better understanding."
                        panelClassName="border-slate-200/80 bg-slate-50"
                    >
                        <div className="flex h-full flex-col items-center justify-center text-center">
                            <span className="rounded-full border border-sky-400 bg-white px-3 py-1 text-[10px] font-bold text-slate-800 sm:text-[11px]">
                                Heart Failure
                            </span>

                            <ArrowDown className="my-1 h-3.5 w-3.5 shrink-0 text-sky-500" />

                            {/* Branch Nodes */}
                            <div className="grid w-full grid-cols-3 gap-1.5">
                                {CONCEPT_BRANCHES.map((branch) => (
                                    <div key={branch} className="flex flex-col items-center gap-1">
                                        <span className="flex w-full flex-1 items-center justify-center rounded-full border border-sky-300 bg-white px-1 py-1 text-center text-[8px] font-medium leading-tight text-slate-700 sm:text-[9px]">
                                            {branch}
                                        </span>
                                        <ArrowDown className="h-3 w-3 shrink-0 text-sky-500" />
                                    </div>
                                ))}
                            </div>

                            {/* Leaf Nodes */}
                            <div className="mt-1.5 flex flex-wrap justify-center gap-1">
                                {CONCEPT_LEAVES.map((leaf) => (
                                    <span
                                        key={leaf}
                                        className="rounded-full border border-emerald-400 bg-white px-1 py-0.5 text-[8px] font-semibold text-emerald-700"
                                    >
                                        {leaf}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </ToolCard>

                    {/* Card 6: Care Plan Builder */}
                    <ToolCard
                        icon={ClipboardList}
                        iconClassName="text-teal-600"
                        title="Care Plan Builder"
                        description="Generate complete, personalized care plans with assessments, goals, interventions & rationales."
                        panelClassName="border-slate-200/80 bg-white"
                    >
                        <p className="text-[12px] font-bold text-slate-800 sm:text-[13px]">
                            Care Plan: Ineffective Tissue Perfusion
                        </p>

                        <div className="mt-2.5 space-y-1.5 text-[10px] sm:text-[11px]">
                            {CARE_PLAN_STEPS.map((step) => (
                                <div
                                    key={step.label}
                                    className={`flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 font-bold ${step.tone}`}
                                >
                                    {step.checked && (
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                    )}
                                    <span>{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </ToolCard>

                </div>

            </div>
        </section>
    );
};

export default NewAiToolsSection;
