"use client";
import Image from "next/image";
import img01 from "@/public/assets/succeedImg01.png";

import { Check, CheckCircle2 } from "lucide-react";

/* Each card shares the same 5 rows (header, sub-heading, description, checklist, mockup)
   so every block lines up across the three cards on large screens. */
const CARD_CLASS =
    "grid grid-cols-1 grid-rows-[auto_auto_auto_auto_1fr] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-shadow hover:shadow-md sm:p-6 lg:row-span-5 lg:grid-rows-subgrid";

const MOCKUP_CLASS =
    "mt-4 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5";

const CHECKLIST_CLASS = "mt-4 space-y-2.5";

const EVENT_TONES = {
    emerald: "border-emerald-200/70 bg-emerald-50 text-emerald-800",
    amber: "border-amber-200/70 bg-amber-50 text-amber-800",
    sky: "border-sky-200/70 bg-sky-50 text-sky-800",
};

const WEEK_EVENTS = [
    { code: "BIO 101", room: "Summer Hall 102", tone: "emerald" },
    { code: "ECO 201", room: "Business 201", tone: "amber" },
    { code: "PSY 150", room: "Fourth Flr 235", tone: "sky" },
];

const WEEK_HOURS = [
    { hour: "8 AM", slot: null },
    { hour: "9 AM", slot: "9:00 - 9:50" },
    { hour: "10 AM", slot: null },
    { hour: "11 AM", slot: null },
    { hour: "12 AM", slot: "12:00 - 12:50" },
    { hour: "01 PM", slot: null },
    { hour: "02 PM", slot: null },
];

const QBANK_OPTIONS = [
    { label: "A. Heart rate of 110 bpm", correct: false },
    { label: "B. MAP of 58 mmHg", correct: true },
    { label: "C. Cardiac output of 3.8 L/min", correct: false },
    { label: "D. Urine output of 18 mL/hr", correct: false },
];

const HEMODYNAMIC_BARS = [
    { label: "MAP", height: "100%", tone: "bg-rose-400" },
    { label: "HR", height: "74%", tone: "bg-amber-400" },
    { label: "CO", height: "52%", tone: "bg-emerald-400" },
    { label: "UO", height: "66%", tone: "bg-sky-400" },
];

const CardHeading = ({ step, title }) => (
    <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2C6594] text-sm font-bold text-white">
            {step}
        </span>
        <h3 className="text-lg font-bold text-slate-900 sm:text-xl">{title}</h3>
    </div>
);

const FeatureItem = ({ children }) => (
    <li className="flex items-start gap-2 text-xs font-medium text-slate-600">
        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
        <span>{children}</span>
    </li>
);

const NewSucceedSection = () => {
    return (
        <section className="w-full bg-[#F8FAFC] py-14 text-slate-800 sm:py-18 md:py-24" id="HomeNCLEXExam">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Main Heading */}
                <h2 className="mb-12 text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:mb-16 sm:text-3xl md:text-4xl lg:text-5xl">
                    Everything You Need to <span className="text-[#2C6594]">Succeed</span> in Nursing School
                </h2>

                {/* 3 Cards Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-[auto_auto_auto_auto_1fr] lg:gap-x-6 lg:gap-y-0">

                    {/* Card 1: Academic Planner */}
                    <article className={CARD_CLASS}>
                        <CardHeading step={1} title="Academic Planner" />

                        <h4 className="mt-4 text-xs font-bold leading-snug text-slate-900 sm:text-sm">
                            Upload your syllabus, AI builds your entire semester plan.
                        </h4>

                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                            Upload your course syllabi and let AI automatically create a personalized study schedule, set reminders, track deadlines, and keep you on top of every assignment.
                        </p>

                        <ul className={CHECKLIST_CLASS}>
                            <FeatureItem>Upload syllabus or course outline</FeatureItem>
                            <FeatureItem>AI generates full semester plan</FeatureItem>
                            <FeatureItem>Smart reminders &amp; task tracking</FeatureItem>
                            <FeatureItem>Syncs across all your devices</FeatureItem>
                        </ul>

                        {/* Mockup: uploaded syllabus + generated week schedule */}
                        <div className={MOCKUP_CLASS}>
                            {/* File Upload Row */}
                            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/70 bg-white p-2.5 shadow-2xs">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-500 text-[9px] font-bold text-white">
                                        PDF
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-[11px] font-bold leading-tight text-slate-800">
                                            Syllabus.pdf
                                        </p>
                                        <p className="text-[9px] text-slate-400">Upload Complete</p>
                                    </div>
                                </div>
                                <span className="flex shrink-0 items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-[9px] font-semibold text-white shadow-2xs">
                                    <CheckCircle2 className="h-3 w-3" />
                                    AI Plan Generated
                                </span>
                            </div>

                            {/* Week Schedule */}
                            <div className="flex flex-1 flex-col rounded-xl border border-slate-200/70 bg-white p-3">
                                <div className="border-b border-slate-100 pb-2">
                                    <div className="text-[11px] font-bold text-slate-800">May 12 - May 18</div>
                                    <div className="text-[9px] font-medium text-slate-400">All - Day</div>
                                </div>

                                <div className="mt-2 flex flex-1 flex-col justify-between gap-y-1">
                                    {WEEK_HOURS.map(({ hour, slot }) => (
                                        <div
                                            key={hour}
                                            className="grid grid-cols-[2.25rem_1fr_1fr_1fr] items-start gap-x-1"
                                        >
                                            <span className="pt-0.5 text-[7px] font-medium text-slate-400">
                                                {hour}
                                            </span>

                                            {slot ? (
                                                WEEK_EVENTS.map((event) => (
                                                    <div
                                                        key={event.code}
                                                        className={`rounded-md border px-1.5 py-1 leading-tight ${EVENT_TONES[event.tone]}`}
                                                    >
                                                        <div className="text-[7px] font-semibold opacity-80">
                                                            {slot}
                                                        </div>
                                                        <div className="text-[8px] font-bold">{event.code}</div>
                                                        <div className="text-[7px] opacity-70">{event.room}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-3" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Card 2: Lecture Notes */}
                    <article className={CARD_CLASS}>
                        <CardHeading step={2} title="Lecture Notes" />

                        <h4 className="mt-4 text-xs font-bold leading-snug text-slate-900 sm:text-sm">
                            Turn your notes into beautiful, visual study notes.
                        </h4>

                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                            Convert your class notes into organized, illustrated study notes with diagrams, key points, and summaries — all powered by AI.
                        </p>

                        <ul className={CHECKLIST_CLASS}>
                            <FeatureItem>Upload lecture notes or slides</FeatureItem>
                            <FeatureItem>AI creates visual summaries</FeatureItem>
                            <FeatureItem>Diagrams, charts &amp; illustrations</FeatureItem>
                            <FeatureItem>Download or share anywhere</FeatureItem>
                        </ul>

                        {/* Mockup: converted notes viewer with anatomy diagram */}
                        <div className={MOCKUP_CLASS}>
                            {/* File Upload Row */}
                            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200/70 bg-white p-2.5 shadow-2xs">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-500 text-[8px] font-bold text-white">
                                        PDF
                                    </span>
                                    <p className="truncate text-[11px] font-bold leading-tight text-slate-800">
                                        Cardiovascular System Notes.pdf
                                    </p>
                                </div>
                                <span className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
                                    <CheckCircle2 className="h-2.5 w-2.5" />
                                    Converted
                                </span>
                            </div>

                            {/* Note Viewer */}
                            <div className="flex flex-1 flex-col rounded-xl border border-slate-200/70 bg-white p-3">
                                {/* Tabs */}
                                <div className="flex items-center gap-3 border-b border-slate-100 pb-1.5 text-[9px] font-medium text-slate-400">
                                    <span className="border-b-2 border-sky-600 pb-1 font-bold text-sky-600">
                                        Visual Notes
                                    </span>
                                    <span>Original notes</span>
                                    <span>Quiz</span>
                                    <span>Flashcards</span>
                                </div>

                                <div className="mt-2 text-[11px] font-bold text-sky-700">
                                    2. Anatomy of the Heart
                                </div>

                                {/* Heart Diagram */}
                                <div className="mt-1 flex flex-1 items-center justify-center">
                                    <Image
                                        src={img01}
                                        alt="Anatomy of the Heart diagram"
                                        className="mx-auto h-auto w-full max-w-60"
                                        sizes="(max-width: 1024px) 100vw, 320px"
                                    />
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Card 3: NCLEX Next Gen QBank */}
                    <article className={CARD_CLASS}>
                        <CardHeading step={3} title="NCLEX Next Gen QBank" />

                        <h4 className="mt-4 text-xs font-bold leading-snug text-slate-900 sm:text-sm">
                            Practice smarter with Next Gen questions &amp; detailed rationales.
                        </h4>

                        <p className="mt-2 text-xs leading-relaxed text-slate-500">
                            Thousands of NCLEX-style and Next Gen questions with in-depth rationales, images, and references — even for the wrong answers!
                        </p>

                        <ul className={CHECKLIST_CLASS}>
                            <FeatureItem>NGN-style questions (SATA, drop-down, matrix, highlight)</FeatureItem>
                            <FeatureItem>Detailed rationales for all answer choices</FeatureItem>
                            <FeatureItem>Images, tables &amp; clinical tips</FeatureItem>
                            <FeatureItem>Track progress &amp; improve performance</FeatureItem>
                        </ul>

                        {/* Mockup: question with correct answer + rationale */}
                        <div className="mt-4 flex flex-col rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5 sm:flex-row sm:items-stretch sm:p-0">
                            {/* Question */}
                            <div className="flex flex-1 flex-col sm:p-3.5">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-bold text-slate-800">Q1 • Heart Failure</span>
                                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[8px] font-semibold text-amber-700">
                                        Intermediate
                                    </span>
                                </div>

                                <p className="mt-2 text-[9px] leading-snug text-slate-600">
                                    A nurse is caring for a patient 2 hours post-CABG. Which assessment finding requires immediate intervention?
                                </p>

                                <div className="mt-2 space-y-1 text-[9px]">
                                    {QBANK_OPTIONS.map((option) =>
                                        option.correct ? (
                                            <div
                                                key={option.label}
                                                className="flex items-center justify-between gap-2 rounded-md border border-emerald-500 bg-emerald-50/70 px-1.5 py-1 font-bold text-emerald-800"
                                            >
                                                <span>{option.label}</span>
                                                <CheckCircle2 className="h-3 w-3 shrink-0 text-emerald-600" />
                                            </div>
                                        ) : (
                                            <div
                                                key={option.label}
                                                className="rounded-md border border-slate-200 px-1.5 py-1 text-slate-600"
                                            >
                                                {option.label}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Rationale & Hemodynamic Chart */}
                            <div className="mt-3 flex flex-col border-t border-slate-200/70 pt-3 sm:mt-0 sm:w-[42%] sm:shrink-0 sm:border-t-0 sm:border-l sm:bg-white/60 sm:px-2.5 sm:py-3.5">
                                <span className="self-end rounded-md bg-emerald-600 px-1.5 py-0.5 text-[8px] font-bold text-white">
                                    ✓ Correct!
                                </span>

                                <div className="mt-1.5 text-[9px] font-bold text-[#DB2777]">
                                    &gt;&gt; Rationale &amp; Explanation
                                </div>

                                <p className="mt-1 text-[8px] leading-tight text-slate-500">
                                    A MAP of 58 mmHg is critically below the 65 mmHg threshold required for vital organ perfusion.
                                </p>

                                {/* Mini Hemodynamic Bar Chart */}
                                <div className="mt-3 flex flex-1 flex-col justify-end">
                                    <div className="text-[7px] font-bold text-slate-700">
                                        Post-CABG Hemodynamic Parameters
                                    </div>

                                    <div className="mt-1.5 flex items-end justify-between gap-1.5">
                                        {HEMODYNAMIC_BARS.map((bar) => (
                                            <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
                                                <div className="flex h-10 w-full items-end justify-center">
                                                    <div
                                                        className={`w-2 rounded-t ${bar.tone}`}
                                                        style={{ height: bar.height }}
                                                    />
                                                </div>
                                                <span className="text-[7px] font-medium text-slate-400">
                                                    {bar.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                </div>

            </div>
        </section>
    );
};

export default NewSucceedSection;
