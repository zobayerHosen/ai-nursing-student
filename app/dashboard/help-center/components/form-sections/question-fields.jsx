"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import CustomSelect from "../custom-select";

const NURSING_SUBJECT_OPTIONS = [
    { value: "Pharmacology & Therapeutics", label: "Pharmacology & Therapeutics" },
    { value: "Medical-Surgical Nursing", label: "Medical-Surgical Nursing" },
    { value: "Dosage & Calculations", label: "Dosage & Calculations" },
    { value: "Pediatrics & Maternity", label: "Pediatrics & Maternity" },
    { value: "Fundamentals of Nursing", label: "Fundamentals of Nursing" },
    { value: "NextGen NCLEX Case Studies", label: "NextGen NCLEX Case Studies" },
    { value: "Other Academic Question", label: "Other Academic Question" }
];

const QUESTION_FOCUS_OPTIONS = [
    { value: "Concept Explanation", label: "Concept Explanation & Rationale" },
    { value: "Question Bank Rationale Issue", label: "Question Bank Rationale Clarification" },
    { value: "NCLEX Exam Strategy", label: "NCLEX Exam Strategy & Test Tips" },
    { value: "Clinical Practice Protocol", label: "Clinical Practice Protocol" }
];

export default function QuestionFields({ watch, setValue }) {
    const nursingSubject = watch("nursingSubject") || "Pharmacology & Therapeutics";
    const questionFocus = watch("questionFocus") || "Concept Explanation";

    return (
        <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-100 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Academic & Nursing Question Details</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomSelect
                    label="Nursing Module / Subject Area"
                    value={nursingSubject}
                    onChange={(val) => setValue("nursingSubject", val)}
                    options={NURSING_SUBJECT_OPTIONS}
                />

                <CustomSelect
                    label="Question Focus Type"
                    value={questionFocus}
                    onChange={(val) => setValue("questionFocus", val)}
                    options={QUESTION_FOCUS_OPTIONS}
                />
            </div>
        </div>
    );
}
