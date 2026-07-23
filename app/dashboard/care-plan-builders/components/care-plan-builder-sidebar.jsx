"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Clock,
    Zap,
    ChevronDown
} from "lucide-react";

const CarePlanBuilderSidebar = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("builder");
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        careSetting: "",
        chiefComplaint: "",
        pastMedicalHistory: "",
        currentMedications: "",
        allergies: "",
        keyVitals: "",
        labs: "",
        notes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isFormValid = formData.chiefComplaint.trim() !== "";

    return (
        <>
            {/* Tab headers with animated underline */}
            <div className="relative flex border-b border-[#E5E7EB] shrink-0">
                <button
                    type="button"
                    onClick={() => setActiveTab("builder")}
                    className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-4 text-xs font-semibold transition ${activeTab === "builder"
                            ? "text-[#2C5F8D]"
                            : "text-[#697586] hover:text-[#2C5F8D]"
                        }`}
                >
                    <FileText size={14} />
                    Builder
                    {activeTab === "builder" && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab("history")}
                    className={`relative flex flex-1 items-center justify-center gap-2 px-4 py-4 text-xs font-semibold transition ${activeTab === "history"
                            ? "text-[#2C5F8D]"
                            : "text-[#697586] hover:text-[#2C5F8D]"
                        }`}
                >
                    <Clock size={14} />
                    <span>History</span>
                    <span
                        className={`ml-0.5 inline-flex items-center justify-center min-w-4.5 h-4.5 rounded-full px-1.5 text-[10px] font-bold leading-none ${activeTab === "history"
                                ? "bg-[#2C5F8D] text-white"
                                : "bg-[#E2E8F0] text-[#475569]"
                            }`}
                    >
                        3
                    </span>
                    {activeTab === "history" && (
                        <motion.div
                            layoutId="tab-indicator"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C5F8D]"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                    )}
                </button>
            </div>

            <div className="relative flex-1 overflow-x-hidden overflow-y-auto w-full">
                <AnimatePresence mode="wait">
                    {activeTab === "builder" ? (
                        <motion.div
                            key="builder"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="p-5 flex flex-col gap-5 w-full"
                        >
                            {/* Age and Gender row */}
                            <div className="flex gap-4">
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#344054]">Age</label>
                                    <input
                                        type="text"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="e.g. 68"
                                        className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD]"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#344054]">Gender</label>
                                    <div className="relative">
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm appearance-none bg-[#FCFDFD] focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D]"
                                        >
                                            <option value="">Select...</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#667085] pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Care Setting */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-[#344054]">Care Setting</label>
                                <input
                                    type="text"
                                    name="careSetting"
                                    value={formData.careSetting}
                                    onChange={handleChange}
                                    placeholder="e.g. Structured (Background/Methods/Result..."
                                    className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD]"
                                />
                            </div>

                            {/* Chief Complaint */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-[#344054]">
                                    Chief Complaint / Reason for Admission <span className="text-[#D92D20]">*</span>
                                </label>
                                <textarea
                                    name="chiefComplaint"
                                    value={formData.chiefComplaint}
                                    onChange={handleChange}
                                    placeholder="e.g. 68yo male admitted with chest pain, SOB, and diaphoresis. HR 112, BP 88/54, SpO2 91% on RA..."
                                    rows={4}
                                    className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD] resize-none"
                                />
                            </div>

                            {/* PMH and Meds */}
                            <div className="flex gap-4">
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#344054]">Past Medical History</label>
                                    <input
                                        type="text"
                                        name="pastMedicalHistory"
                                        value={formData.pastMedicalHistory}
                                        onChange={handleChange}
                                        placeholder="HTN, DM2, CKD..."
                                        className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD]"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#344054]">Current Medications</label>
                                    <input
                                        type="text"
                                        name="currentMedications"
                                        value={formData.currentMedications}
                                        onChange={handleChange}
                                        placeholder="Metformin, Lisinop..."
                                        className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD]"
                                    />
                                </div>
                            </div>

                            {/* Allergies and Vitals */}
                            <div className="flex gap-4">
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#344054]">Allergies</label>
                                    <input
                                        type="text"
                                        name="allergies"
                                        value={formData.allergies}
                                        onChange={handleChange}
                                        placeholder="NKDA or list..."
                                        className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD]"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col gap-1.5">
                                    <label className="text-xs font-bold text-[#344054]">Key Vitals</label>
                                    <input
                                        type="text"
                                        name="keyVitals"
                                        value={formData.keyVitals}
                                        onChange={handleChange}
                                        placeholder="BP, HR, SpO2, Te..."
                                        className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD]"
                                    />
                                </div>
                            </div>

                            {/* Labs */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-[#344054]">Relevant Labs / Diagnostics</label>
                                <input
                                    type="text"
                                    name="labs"
                                    value={formData.labs}
                                    onChange={handleChange}
                                    placeholder="Na 128, K 5.8, Glucose 485, WBC 18..."
                                    className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD]"
                                />
                            </div>

                            {/* Notes */}
                            <div className="flex flex-col gap-1.5 mb-2">
                                <label className="text-xs font-bold text-[#344054]">Additional Clinical Notes</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="IV access, fall risk, isolation precautions,..."
                                    rows={3}
                                    className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] bg-[#FCFDFD] resize-none"
                                />
                            </div>

                            <button
                                disabled={!isFormValid}
                                className={`w-full font-semibold rounded-lg py-3 flex justify-center items-center gap-2 transition-colors ${isFormValid
                                        ? "bg-[#2C5F8D] hover:bg-[#1E4366] text-white cursor-pointer"
                                        : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                                    }`}
                            >
                                <Zap size={18} />
                                Generate
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="history"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="p-5 flex flex-col gap-4 w-full"
                        >
                            {/* Placeholder history list */}
                            {[1, 2, 3].map((item) => (
                                <Link
                                    href={`/dashboard/care-plan-builders/${item}`}
                                    key={item}
                                    className="p-4 rounded-lg border border-[#E5E7EB] hover:border-[#2C5F8D] hover:bg-[#F0F7FC] cursor-pointer transition-colors bg-white group w-full block"
                                >
                                    <div className="flex justify-between items-start gap-2 mb-1">
                                        <h4 className="text-sm font-semibold text-[#1D2939] group-hover:text-[#2C5F8D]">68yo M w/ Chest Pain</h4>
                                        <span className="text-[10px] text-[#64748B] whitespace-nowrap">2h ago</span>
                                    </div>
                                    <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                                        HTN, DM2, CKD. Metformin, Lisinopril. NKDA. BP 88/54, HR 112.
                                    </p>
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
export default CarePlanBuilderSidebar;