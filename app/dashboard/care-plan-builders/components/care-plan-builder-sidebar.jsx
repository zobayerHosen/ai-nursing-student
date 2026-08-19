"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Clock,
    Zap,
    ChevronDown,
    Loader2,
    Trash2,
    AlertTriangle
} from "lucide-react";
import {
    useCarePlanHistory,
    useGenerateCarePlan,
    useDeleteCarePlanHistory,
    useDeleteAllCarePlanHistory
} from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CarePlanBuilderSidebar = ({ onClose }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState("builder");
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [itemToDeleteId, setItemToDeleteId] = useState(null);

    const { historyData, isHistoryLoading } = useCarePlanHistory();
    const { generateCarePlan, isGenerating } = useGenerateCarePlan();
    const { deleteHistory, isDeleting } = useDeleteCarePlanHistory();
    const { deleteAllHistory, isDeletingAll } = useDeleteAllCarePlanHistory();

    const totalHistory = historyData?.data?.length || 0;
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

    const isFormValid = formData.chiefComplaint.trim() !== "" && !isGenerating;

    const handleGenerate = () => {
        if (!isFormValid) return;
        const payload = {
            patient: {
                age: formData.age,
                gender: formData.gender,
                care_setting: formData.careSetting,
                chief_complaint: formData.chiefComplaint,
                past_medical_history: formData.pastMedicalHistory,
                current_medications: formData.currentMedications,
                allergies: formData.allergies,
                key_vitals: formData.keyVitals,
                relevant_labs: formData.labs,
                additional_clinical_notes: formData.notes
            }
        };
        generateCarePlan(payload, {
            onSuccess: (data) => {
                toast.success(data?.data?.message || "Care plan generated!");
                queryClient.invalidateQueries({ queryKey: ["care-plan-history"] });
                if (onClose) onClose();
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || "Failed to generate care plan");
            }
        });
    };

    const handleConfirmDeleteAll = async () => {
        try {
            const res = await deleteAllHistory();
            toast.success(res?.message || "All history cleared!");
            queryClient.invalidateQueries({ queryKey: ["care-plan-history"] });
            setShowClearConfirm(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to clear history");
            console.error(err);
        }
    };

    const handleConfirmDeleteSingle = async (id) => {
        try {
            const res = await deleteHistory(id);
            toast.success(res?.message || "History item deleted!");
            queryClient.invalidateQueries({ queryKey: ["care-plan-history"] });
            setItemToDeleteId(null);
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to delete history item");
            console.error(err);
        }
    };

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
                    {totalHistory > 0 && (
                        <span
                            className={`ml-0.5 inline-flex items-center justify-center min-w-4.5 h-4.5 rounded-full px-1.5 text-[10px] font-bold leading-none ${activeTab === "history"
                                    ? "bg-[#2C5F8D] text-white"
                                    : "bg-[#E2E8F0] text-[#475569]"
                                }`}
                        >
                            {totalHistory > 99 ? "99+" : totalHistory}
                        </span>
                    )}
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
                                onClick={handleGenerate}
                                disabled={!isFormValid}
                                className={`w-full font-semibold rounded-lg py-3 flex justify-center items-center gap-2 transition-colors ${isFormValid
                                        ? "bg-[#2C5F8D] hover:bg-[#1E4366] text-white cursor-pointer"
                                        : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                                    }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={18} />
                                        Generate
                                    </>
                                )}
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
                            {/* Header with Clear All button */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-[#222427]">
                                    Care Plan History
                                </h2>
                                {totalHistory > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setShowClearConfirm((prev) => !prev)}
                                        disabled={isDeletingAll}
                                        className="text-[10px] font-semibold text-[#D92D20] hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors cursor-pointer disabled:opacity-50"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {/* Inline Clear All Confirmation Box matching quiz sidebar design */}
                            <AnimatePresence>
                                {showClearConfirm && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                                        exit={{ opacity: 0, height: 0, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] flex flex-col gap-2.5 my-1">
                                            <div className="flex items-center gap-2 text-[#D92D20]">
                                                <AlertTriangle size={16} className="shrink-0" />
                                                <p className="text-xs font-bold">
                                                    Clear all history items?
                                                </p>
                                            </div>
                                            <p className="text-[11px] text-[#7A271A] leading-relaxed">
                                                This action will permanently delete all saved care plans from history.
                                            </p>
                                            <div className="flex items-center justify-end gap-2 mt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowClearConfirm(false)}
                                                    disabled={isDeletingAll}
                                                    className="px-2.5 py-1 rounded-md text-xs font-semibold text-[#344054] bg-white border border-[#D0D5DD] hover:bg-gray-50 transition-colors cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleConfirmDeleteAll}
                                                    disabled={isDeletingAll}
                                                    className="px-2.5 py-1 rounded-md text-xs font-semibold text-white bg-[#D92D20] hover:bg-red-700 transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
                                                >
                                                    {isDeletingAll ? (
                                                        <>
                                                            <Loader2 size={12} className="animate-spin" />
                                                            Clearing...
                                                        </>
                                                    ) : (
                                                        "Yes, Clear All"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {isHistoryLoading ? (
                                <p className="text-[11px] text-[#697586] text-center mt-5">Loading history...</p>
                            ) : totalHistory === 0 ? (
                                <p className="text-[11px] text-[#697586] text-center mt-5">No search history yet.</p>
                            ) : (
                                <div className="space-y-2">
                                    {historyData?.data?.map((item, index) => {
                                        const isDeletingThis = itemToDeleteId === item.id;

                                        return (
                                            <div
                                                key={item?.id ?? index}
                                                className="group relative w-full rounded-lg border border-[#E5E7EB] hover:border-[#2C5F8D] hover:bg-[#F0F7FC] transition-colors bg-white p-4"
                                            >
                                                <Link
                                                    href={`/dashboard/care-plan-builders/${item.id}`}
                                                    className="block pr-7"
                                                >
                                                    <div className="flex flex-col gap-1 mb-1">
                                                        <h4 className="text-sm font-semibold text-[#1D2939] group-hover:text-[#2C5F8D]">
                                                            {item.title}
                                                        </h4>
                                                    </div>
                                                    <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed mt-1">
                                                        {item.subtitle}
                                                    </p>
                                                </Link>

                                                {/* Delete button at bottom right side */}
                                                {!isDeletingThis && (
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            setItemToDeleteId(item.id);
                                                        }}
                                                        disabled={isDeleting}
                                                        className="absolute bottom-2.5 right-2.5 p-1.5 rounded-md text-[#98A2B3] hover:bg-red-50 hover:text-[#D92D20] transition-colors cursor-pointer"
                                                        title="Delete item"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                )}

                                                {/* Single Item Delete Confirmation Box */}
                                                <AnimatePresence>
                                                    {isDeletingThis && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            transition={{ duration: 0.15 }}
                                                            className="overflow-hidden mt-2 pt-2 border-t border-red-100"
                                                        >
                                                            <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2] flex flex-col gap-2">
                                                                <div className="flex items-center gap-1.5 text-[#D92D20]">
                                                                    <AlertTriangle
                                                                        size={14}
                                                                        className="shrink-0"
                                                                    />
                                                                    <p className="text-[11px] font-bold">
                                                                        Delete this item?
                                                                    </p>
                                                                </div>
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            setItemToDeleteId(null);
                                                                        }}
                                                                        disabled={isDeleting}
                                                                        className="px-2 py-0.5 rounded text-[10px] font-semibold text-[#344054] bg-white border border-[#D0D5DD] hover:bg-gray-50 cursor-pointer"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            handleConfirmDeleteSingle(item.id);
                                                                        }}
                                                                        disabled={isDeleting}
                                                                        className="px-2 py-0.5 rounded text-[10px] font-semibold text-white bg-[#D92D20] hover:bg-red-700 cursor-pointer inline-flex items-center gap-1"
                                                                    >
                                                                        {isDeleting ? (
                                                                            <Loader2
                                                                                size={10}
                                                                                className="animate-spin"
                                                                            />
                                                                        ) : (
                                                                            "Delete"
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
export default CarePlanBuilderSidebar;