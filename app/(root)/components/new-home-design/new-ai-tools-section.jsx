import React from "react";
import {
    FileSearch,
    Layers,
    FileQuestion,
    Pill,
    Brain,
    ClipboardList,
    Heart,
    CheckCircle2,
    ArrowDown,
} from "lucide-react";

const NewAiToolsSection = () => {
    return (
        <section className="w-full bg-white py-16 sm:py-20 md:py-24 text-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                        Powerful <span className="text-[#5D55FA]">AI Tools</span> for Nursing Students
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm md:text-base font-medium mt-3">
                        Everything you need to study, practice, and succeed — all in one place.
                    </p>
                </div>

                {/* 6 Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">

                    {/* Card 1: Case Studies */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#5D55FA] mb-4">
                                <FileSearch className="w-5 h-5" />
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-[#5D55FA] font-bold text-xl sm:text-2xl mb-1">
                                Case Studies
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                                Practice with real-world nursing scenarios. Make critical decisions and build critical thinking.
                            </p>
                        </div>

                        {/* Mockup */}
                        <div className="bg-indigo-50/50 border border-indigo-100/80 rounded-2xl p-4 mt-auto">
                            <div className="font-bold text-slate-800 text-xs mb-3">
                                Patient with Acute Chest Pain
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center gap-1.5 mb-3 text-[10px]">
                                <span className="px-2.5 py-1 rounded-full bg-[#5D55FA] text-white font-semibold">
                                    Vitals
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">
                                    Labs
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">
                                    ECG
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">
                                    Orders
                                </span>
                            </div>

                            {/* Prompt Box */}
                            <div className="bg-white border border-slate-200/70 rounded-xl p-3 shadow-2xs text-[11px] font-semibold text-slate-700">
                                What is your priority nursing intervention?
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Notes to Flashcard */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                                <Layers className="w-5 h-5" />
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-[#5D55FA] font-bold text-xl sm:text-2xl mb-1">
                                Notes to Flashcard
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                                Convert your notes into smart flashcards. Study more in less time.
                            </p>
                        </div>

                        {/* Mockup */}
                        <div className="bg-amber-50/40 border border-amber-100/80 rounded-2xl p-4 space-y-2.5 mt-auto">
                            {/* Front Card */}
                            <div className="bg-white border border-amber-200/60 rounded-xl p-3 shadow-2xs text-[10px]">
                                <div className="text-slate-400 font-bold tracking-wider uppercase text-[8px] mb-1">
                                    Front
                                </div>
                                <div className="font-semibold text-slate-800 text-[11px]">
                                    What are the signs of hypokalemia?
                                </div>
                            </div>

                            {/* Back Card */}
                            <div className="bg-white border border-amber-200/60 rounded-xl p-3 shadow-2xs text-[10px]">
                                <div className="text-slate-400 font-bold tracking-wider uppercase text-[8px] mb-1">
                                    Back
                                </div>
                                <ul className="space-y-0.5 text-slate-600 font-medium">
                                    <li>• Muscle Weakness</li>
                                    <li>• Cardiac a...</li>
                                    <li>• Fatigue</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Notes to Quiz */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#5D55FA] mb-4">
                                <FileQuestion className="w-5 h-5" />
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-[#5D55FA] font-bold text-xl sm:text-2xl mb-1">
                                Notes to Quiz
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                                Turn notes into custom quizzes. Test yourself and track your progress.
                            </p>
                        </div>

                        {/* Mockup */}
                        <div className="bg-indigo-50/40 border border-indigo-100/80 rounded-2xl p-4 mt-auto">
                            <div className="font-bold text-slate-800 text-[11px] mb-3 leading-snug">
                                <span className="text-[#5D55FA]">Q1.</span> A nurse is caring for a patient with COPD. Which assessment finding is priority?
                            </div>

                            {/* Options Card */}
                            <div className="bg-white border border-slate-200/70 rounded-xl p-2.5 space-y-1.5 text-[10px] shadow-2xs">
                                <div className="p-1.5 rounded-lg border border-slate-100 text-slate-600 flex items-center gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                                    <span>A. Anxiety</span>
                                </div>
                                <div className="p-1.5 rounded-lg border border-blue-500 bg-blue-50/60 text-blue-900 font-semibold flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3.5 h-3.5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[8px] shrink-0">
                                            ✓
                                        </div>
                                        <span>B. Use of accessory muscles</span>
                                    </div>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <div className="p-1.5 rounded-lg border border-slate-100 text-slate-600 flex items-center gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                                    <span>C. Productive cough</span>
                                </div>
                                <div className="p-1.5 rounded-lg border border-slate-100 text-slate-600 flex items-center gap-2">
                                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                                    <span>D. Bradycardia</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Drug Cards */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mb-4">
                                <Pill className="w-5 h-5" />
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-[#5D55FA] font-bold text-xl sm:text-2xl mb-1">
                                Drug Cards
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                                Get comprehensive drug info: class, indications, dosage, side effects, interactions &amp; more.
                            </p>
                        </div>

                        {/* Mockup */}
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs mt-auto relative">
                            {/* Heart favorite icon */}
                            <Heart className="w-4 h-4 text-slate-400 absolute top-4 right-4" />

                            <div className="font-bold text-slate-900 text-xs mb-3">
                                Furosemide (Lasix)
                            </div>

                            <div className="space-y-2 text-[9px]">
                                <div>
                                    <span className="font-bold text-emerald-700 block">Class</span>
                                    <span className="text-slate-600">Loop Diuretic</span>
                                </div>
                                <div>
                                    <span className="font-bold text-emerald-700 block">Indications</span>
                                    <span className="text-slate-600 block">• Edema (CHF, renal)</span>
                                    <span className="text-slate-600 block">• Hypertension</span>
                                </div>
                                <div>
                                    <span className="font-bold text-emerald-700 block">Side Effects</span>
                                    <span className="text-slate-600 block">• Hypokalemia</span>
                                    <span className="text-slate-600 block">• Dehydration</span>
                                </div>
                            </div>

                            {/* Red Heart Badge bottom right */}
                            <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-2xs">
                                <Heart className="w-3 h-3 fill-white" />
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Concept Map */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4">
                                <Brain className="w-5 h-5" />
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-[#5D55FA] font-bold text-xl sm:text-2xl mb-1">
                                Concept Map
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                                Visualize complex topics and convert ideas to better understanding.
                            </p>
                        </div>

                        {/* Mockup (Flowchart Diagram) */}
                        <div className="bg-slate-50/60 border border-slate-200/70 rounded-2xl p-4 mt-auto">
                            <div className="flex flex-col items-center text-[9px]">
                                {/* Central Top Node */}
                                <div className="px-3 py-1 rounded-full border border-sky-400 bg-white text-sky-800 font-bold shadow-2xs mb-1">
                                    Heart Failure
                                </div>

                                <ArrowDown className="w-3 h-3 text-sky-500 mb-1" />

                                {/* Middle Row Nodes */}
                                <div className="grid grid-cols-3 gap-1.5 w-full mb-1">
                                    <div className="px-1.5 py-0.5 rounded-lg border border-sky-300 bg-white text-sky-700 text-center font-medium">
                                        Causes
                                    </div>
                                    <div className="px-1.5 py-0.5 rounded-lg border border-sky-300 bg-white text-sky-700 text-center font-medium">
                                        Signs &amp; Symptoms
                                    </div>
                                    <div className="px-1.5 py-0.5 rounded-lg border border-sky-300 bg-white text-sky-700 text-center font-medium">
                                        Complications
                                    </div>
                                </div>

                                <div className="flex justify-between w-full px-4 mb-1">
                                    <ArrowDown className="w-3 h-3 text-sky-500" />
                                    <ArrowDown className="w-3 h-3 text-sky-500" />
                                    <ArrowDown className="w-3 h-3 text-sky-500" />
                                </div>

                                {/* Bottom Row Leaf Nodes */}
                                <div className="grid grid-cols-6 gap-1 w-full text-[7px] text-center">
                                    <span className="px-1 py-0.5 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-700 font-bold">CAD</span>
                                    <span className="px-1 py-0.5 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-700 font-bold">HTN</span>
                                    <span className="px-1 py-0.5 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-700 font-bold">Dyspnea</span>
                                    <span className="px-1 py-0.5 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-700 font-bold">Edema</span>
                                    <span className="px-1 py-0.5 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-700 font-bold">Pulmonary edema</span>
                                    <span className="px-1 py-0.5 rounded-full border border-emerald-400 bg-emerald-50 text-emerald-700 font-bold">Arrhythmias</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 6: Care Plan Builder */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
                        <div>
                            {/* Icon */}
                            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4">
                                <ClipboardList className="w-5 h-5" />
                            </div>

                            {/* Title & Subtitle */}
                            <h3 className="text-[#5D55FA] font-bold text-xl sm:text-2xl mb-1">
                                Care Plan Builder
                            </h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
                                Generate complete, personalized care plans with assessments, goals, interviews &amp; rationales.
                            </p>
                        </div>

                        {/* Mockup */}
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mt-auto">
                            <div className="font-bold text-slate-800 text-[11px] mb-3">
                                Care Plan: Ineffective Tissue Perfusion
                            </div>

                            <div className="space-y-1.5 text-[10px]">
                                <div className="bg-white border border-slate-200/70 rounded-xl p-2 font-medium text-emerald-700">
                                    Assessment
                                </div>
                                <div className="bg-white border border-slate-200/70 rounded-xl p-2 font-medium text-slate-600">
                                    Nursing Diagnosis
                                </div>
                                <div className="bg-white border border-slate-200/70 rounded-xl p-2 font-medium text-emerald-700">
                                    Goals
                                </div>
                                <div className="bg-white border border-slate-200/70 rounded-xl p-2 font-bold text-slate-800 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Interventions</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default NewAiToolsSection;
