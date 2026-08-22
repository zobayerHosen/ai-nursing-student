import React from "react";
import { Check, FileText, CheckCircle2 } from "lucide-react";

const NewSucceedSection = () => {
    return (
        <section className="w-full bg-[#F8FAFC] py-14 sm:py-18 md:py-24 text-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Main Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-slate-900 tracking-tight mb-12 sm:mb-16">
                    Everything You Need to <span className="text-[#2C6594]">Succeed</span> in Nursing School
                </h2>

                {/* 3 Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

                    {/* Card 1: Academic Planner */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Card Header */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#2C6594] text-white font-bold text-sm flex items-center justify-center shrink-0">
                                    1
                                </div>
                                <h3 className="text-slate-900 font-bold text-lg sm:text-xl">
                                    Academic Planner
                                </h3>
                            </div>

                            {/* Subhead & Description */}
                            <h4 className="text-slate-900 font-bold text-xs sm:text-sm mt-4 mb-2 leading-snug">
                                Upload your syllabus, AI builds your entire semester plan.
                            </h4>
                            <p className="text-slate-500 text-xs leading-relaxed mb-5">
                                Upload your course syllabi and let AI automatically create a personalized study schedule, set reminders, track deadlines, and keep you on top of every assignment.
                            </p>

                            {/* Checklist */}
                            <ul className="space-y-2 mb-6 text-xs text-slate-600 font-medium">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Upload syllabus or course outline</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>AI generates full semester plan</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Smart reminders &amp; task tracking</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Syncs across all your devices</span>
                                </li>
                            </ul>
                        </div>

                        {/* Mockup Illustration */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mt-auto">
                            {/* File Upload Row */}
                            <div className="flex items-center justify-between bg-white border border-slate-200/70 rounded-xl p-2.5 mb-3 shadow-2xs">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                                        PDF
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-slate-800 leading-tight">
                                            Syllabus.pdf
                                        </div>
                                        <div className="text-[9px] text-slate-400">
                                            Upload Complete
                                        </div>
                                    </div>
                                </div>
                                <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-semibold flex items-center gap-1 shadow-2xs">
                                    ✓ AI Plan Generated
                                </span>
                            </div>

                            {/* Calendar Schedule Mock */}
                            <div className="bg-white border border-slate-200/70 rounded-xl p-3 text-[10px]">
                                <div className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1 flex justify-between items-center">
                                    <span>May 12 - May 18</span>
                                    <span className="text-[9px] text-slate-400 font-normal">All - Day</span>
                                </div>
                                <div className="grid grid-cols-3 gap-1.5 pt-1">
                                    {/* Slot 1 */}
                                    <div className="bg-emerald-50 border border-emerald-200/60 rounded-lg p-1.5 text-emerald-800">
                                        <div className="font-semibold text-[9px]">8:00 - 9:50</div>
                                        <div className="font-bold">BIO 101</div>
                                        <div className="text-[8px] text-emerald-600">Lecture</div>
                                    </div>
                                    {/* Slot 2 */}
                                    <div className="bg-amber-50 border border-amber-200/60 rounded-lg p-1.5 text-amber-800">
                                        <div className="font-semibold text-[9px]">9:00 - 9:50</div>
                                        <div className="font-bold">ECO 201</div>
                                        <div className="text-[8px] text-amber-600">Lecture</div>
                                    </div>
                                    {/* Slot 3 */}
                                    <div className="bg-sky-50 border border-sky-200/60 rounded-lg p-1.5 text-sky-800">
                                        <div className="font-semibold text-[9px]">9:00 - 9:50</div>
                                        <div className="font-bold">PSY 150</div>
                                        <div className="text-[8px] text-sky-600">Lecture</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Lecture Notes */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Card Header */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#2C6594] text-white font-bold text-sm flex items-center justify-center shrink-0">
                                    2
                                </div>
                                <h3 className="text-slate-900 font-bold text-lg sm:text-xl">
                                    Lecture Notes
                                </h3>
                            </div>

                            {/* Subhead & Description */}
                            <h4 className="text-slate-900 font-bold text-xs sm:text-sm mt-4 mb-2 leading-snug">
                                Turn your notes into beautiful, visual study notes.
                            </h4>
                            <p className="text-slate-500 text-xs leading-relaxed mb-5">
                                Convert your class notes into organized, illustrated study notes with diagrams, key points, and summaries — all powered by AI.
                            </p>

                            {/* Checklist */}
                            <ul className="space-y-2 mb-6 text-xs text-slate-600 font-medium">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Upload lecture notes or slides</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>AI creates visual summaries</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Diagrams, charts &amp; illustrations</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Download or share anywhere</span>
                                </li>
                            </ul>
                        </div>

                        {/* Mockup Illustration */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mt-auto">
                            {/* File Upload Row */}
                            <div className="flex items-center justify-between bg-white border border-slate-200/70 rounded-xl p-2.5 mb-3 shadow-2xs">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-7 h-7 rounded-lg bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                                        PDF
                                    </div>
                                    <div className="text-[11px] font-bold text-slate-800 leading-tight">
                                        Cardiovascular System Notes.pdf
                                    </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[9px] font-semibold">
                                    ✓ Converted
                                </span>
                            </div>

                            {/* Note Viewer Mock */}
                            <div className="bg-white border border-slate-200/70 rounded-xl p-3 text-[10px]">
                                {/* Tabs */}
                                <div className="flex items-center gap-3 border-b border-slate-100 pb-1.5 mb-2 font-medium text-slate-500 text-[9px]">
                                    <span className="text-sky-600 font-bold border-b-2 border-sky-600 pb-1">Visual Notes</span>
                                    <span>Original notes</span>
                                    <span>Quiz</span>
                                    <span>Flashcards</span>
                                </div>

                                {/* Content Title */}
                                <div className="font-bold text-sky-700 text-xs mb-2">
                                    2. Anatomy of the Heart
                                </div>

                                {/* Heart Vector Diagram Illustration */}
                                <div className="flex items-center justify-center py-2 relative">
                                    <svg className="w-32 h-32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Blue Vena Cava / Atrium Left side */}
                                        <path d="M70 40 C60 60, 40 80, 50 130 C55 150, 80 170, 95 180 L95 100 C80 90, 70 70, 70 40 Z" fill="#0284C7" opacity="0.9" />
                                        {/* Red Aorta / Ventricle Right side */}
                                        <path d="M130 40 C140 60, 160 80, 150 130 C145 150, 120 170, 105 180 L105 100 C120 90, 130 70, 130 40 Z" fill="#EF4444" opacity="0.9" />
                                        {/* Aorta Arch Top */}
                                        <path d="M85 35 C85 20, 115 20, 115 35 L115 60 L85 60 Z" fill="#DC2626" />
                                        {/* Pulmonary Artery Blue Arch */}
                                        <path d="M65 50 C65 35, 95 35, 95 50 L95 70 L65 70 Z" fill="#0369A1" />
                                    </svg>

                                    {/* Callout Lines & Labels */}
                                    <div className="absolute top-2 left-0 text-[8px] font-medium text-slate-600 leading-tight">
                                        <span className="font-bold text-sky-700 block">Superior Vena Cava</span>
                                        <span>Receives deoxygenated blood</span>
                                    </div>
                                    <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[8px] font-medium text-slate-600 leading-tight">
                                        <span className="font-bold text-sky-700 block">Right Atrium</span>
                                    </div>
                                    <div className="absolute bottom-2 left-0 text-[8px] font-medium text-slate-600 leading-tight">
                                        <span className="font-bold text-sky-700 block">Right Ventricle</span>
                                        <span>Pumps blood to lungs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: NCLEX Next Gen QBank */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Card Header */}
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#2C6594] text-white font-bold text-sm flex items-center justify-center shrink-0">
                                    3
                                </div>
                                <h3 className="text-slate-900 font-bold text-lg sm:text-xl">
                                    NCLEX Next Gen QBank
                                </h3>
                            </div>

                            {/* Subhead & Description */}
                            <h4 className="text-slate-900 font-bold text-xs sm:text-sm mt-4 mb-2 leading-snug">
                                Practice smarter with Next Gen questions &amp; detailed rationales.
                            </h4>
                            <p className="text-slate-500 text-xs leading-relaxed mb-5">
                                Thousands of NCLEX-style and Next Gen questions with in-depth rationales, images, and references — even for the wrong answers!
                            </p>

                            {/* Checklist */}
                            <ul className="space-y-2 mb-6 text-xs text-slate-600 font-medium">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>NGN-style questions (SATA, drop-down, matrix, highlight)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Detailed rationales for all answer choices</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Images, tables &amp; clinical tips</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-sky-500 shrink-0" />
                                    <span>Track progress &amp; improve performance</span>
                                </li>
                            </ul>
                        </div>

                        {/* Mockup Illustration */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mt-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-[10px]">
                                
                                {/* Question Panel */}
                                <div className="sm:col-span-7 bg-white border border-slate-200/70 rounded-xl p-2.5">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="font-bold text-slate-800 text-[10px]">Q1 • Heart Failure</span>
                                        <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[8px] font-semibold">
                                            Intermediate
                                        </span>
                                    </div>
                                    <p className="text-[9px] text-slate-600 leading-tight mb-2">
                                        A nurse is caring for a patient 2 hours post-CABG... Which assessment finding requires immediate intervention?
                                    </p>
                                    <div className="space-y-1 text-[9px]">
                                        <div className="p-1 rounded-md border border-slate-200 text-slate-600">
                                            A. Heart rate of 110 bpm
                                        </div>
                                        <div className="p-1 rounded-md border border-emerald-500 bg-emerald-50/70 text-emerald-800 font-bold flex items-center justify-between">
                                            <span>B. MAP of 58 mmHg</span>
                                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        </div>
                                        <div className="p-1 rounded-md border border-slate-200 text-slate-600">
                                            C. Cardiac output of 3.8 L/min
                                        </div>
                                        <div className="p-1 rounded-md border border-slate-200 text-slate-600">
                                            D. Urine output of 18 mL/hr
                                        </div>
                                    </div>
                                </div>

                                {/* Rationale & Stats Box */}
                                <div className="sm:col-span-5 bg-white border border-slate-200/70 rounded-xl p-2 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-end mb-1">
                                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-600 text-white font-bold text-[8px]">
                                                ✓ Correct!
                                            </span>
                                        </div>
                                        <div className="text-[#DB2777] font-bold text-[9px] mb-1">
                                            &gt;&gt; Rationale &amp; Explanation
                                        </div>
                                        <p className="text-[8px] text-slate-500 leading-tight">
                                            A MAP of 58 mmHg is critically below the 65 mmHg threshold required for vital organ perfusion.
                                        </p>
                                    </div>

                                    {/* Mini Hemodynamic Bar Chart */}
                                    <div className="pt-2 border-t border-slate-100 mt-2">
                                        <div className="text-[7px] font-bold text-slate-700 mb-1">
                                            Post-CABG Hemodynamic Parameters
                                        </div>
                                        <div className="flex items-end justify-between h-8 px-1 pt-1 gap-1">
                                            <div className="w-2 bg-rose-400 rounded-t h-full" />
                                            <div className="w-2 bg-amber-400 rounded-t h-3/4" />
                                            <div className="w-2 bg-emerald-400 rounded-t h-1/2" />
                                            <div className="w-2 bg-sky-400 rounded-t h-2/3" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default NewSucceedSection;
