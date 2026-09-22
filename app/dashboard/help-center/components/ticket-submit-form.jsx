"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Send,
    AlertCircle,
    HelpCircle,
    Wrench,
    UserCheck,
    MessageSquare,
    CheckCircle2
} from "lucide-react";
import { HELP_CATEGORIES } from "../data/initial-tickets";
import { useGetUser, useHelpAndSupport } from "@/hooks";
import CustomSelect from "./custom-select";

// Map frontend category IDs to backend category choice values
const CATEGORY_API_MAPPING = {
    question: "question",
    technical: "technical_problem",
    technical_problem: "technical_problem",
    account: "account_support",
    account_support: "account_support",
    feedback: "general_feedback",
    general_feedback: "general_feedback"
};

const PRIORITY_OPTIONS = [
    { value: "low", label: "Low - General Inquiry" },
    { value: "medium", label: "Medium - Normal Issue" },
    { value: "high", label: "High - Important / Blocking" },
    { value: "urgent", label: "Urgent - Critical Outage" }
];

function CategorySelector({ selectedCategory, onSelectCategory }) {
    return (
        <div className="mb-6">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                1. Select Request Type <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {HELP_CATEGORIES.map((cat) => {
                    const isSelected =
                        selectedCategory === cat.id ||
                        (cat.id === "technical" && selectedCategory === "technical_problem") ||
                        (cat.id === "account" && selectedCategory === "account_support") ||
                        (cat.id === "feedback" && selectedCategory === "general_feedback");

                    return (
                        <button
                            key={cat.id}
                            type="button"
                            onClick={() => onSelectCategory(cat.id)}
                            className={`p-4 rounded-xl border text-left transition-all relative cursor-pointer flex flex-col justify-between ${
                                isSelected
                                    ? "border-sky-600 bg-sky-50/50 shadow-sm ring-2 ring-sky-500/20"
                                    : "border-slate-200 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300"
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div 
                                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm"
                                        style={{ backgroundColor: cat.accentColor }}
                                    >
                                        {cat.id === "question" && <HelpCircle className="w-5 h-5" />}
                                        {(cat.id === "technical" || cat.id === "technical_problem") && <Wrench className="w-5 h-5" />}
                                        {(cat.id === "account" || cat.id === "account_support") && <UserCheck className="w-5 h-5" />}
                                        {(cat.id === "feedback" || cat.id === "general_feedback") && <MessageSquare className="w-5 h-5" />}
                                    </div>
                                    {isSelected && (
                                        <CheckCircle2 className="w-5 h-5 text-sky-600" />
                                    )}
                                </div>
                                <h3 className="text-sm font-bold text-slate-800 mb-1">{cat.label}</h3>
                                <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">{cat.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function TicketSubmitForm({ initialCategory = "technical", onSubmitTicket, onCategorySelect }) {
    const { user } = useGetUser();
    const { createHelpAndSupport, isCreateHelpAndSupportPending } = useHelpAndSupport();
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedPriority, setSelectedPriority] = useState("medium");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: ""
        }
    });

    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory);
        }
    }, [initialCategory]);

    useEffect(() => {
        if (user) {
            const fullName = user.full_name || user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim();
            if (fullName) setValue("name", fullName);
            if (user.email) setValue("email", user.email);
        }
    }, [user, setValue]);

    const handleCategoryClick = (catId) => {
        setSelectedCategory(catId);
        if (onCategorySelect) onCategorySelect(catId);
    };

    const onFormSubmit = async (data) => {
        setIsSubmitting(true);
        const activeCatObj = HELP_CATEGORIES.find(
            c => c.id === selectedCategory ||
            (c.id === "technical" && selectedCategory === "technical_problem") ||
            (c.id === "account" && selectedCategory === "account_support") ||
            (c.id === "feedback" && selectedCategory === "general_feedback")
        );

        const categoryKey = CATEGORY_API_MAPPING[selectedCategory] || selectedCategory;

        // Exact payload required by backend
        const payload = {
            category: categoryKey,
            name: data.name,
            email: data.email,
            priority_level: selectedPriority.toLowerCase(),
            subject: data.subject,
            message: data.message
        };

        try {
            if (createHelpAndSupport) {
                await createHelpAndSupport(payload);
            }

            const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
            const newTicket = {
                id: ticketId,
                subject: data.subject,
                category: categoryKey,
                categoryLabel: activeCatObj?.label || "General Support",
                priority: selectedPriority.charAt(0).toUpperCase() + selectedPriority.slice(1),
                status: "Open",
                userName: data.name,
                userEmail: data.email,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                assignedAgent: "Unassigned (Support Queue)",
                description: data.message,
                messages: [
                    {
                        id: `msg-${Date.now()}`,
                        sender: "user",
                        senderName: data.name,
                        text: data.message,
                        timestamp: new Date().toISOString()
                    }
                ]
            };

            if (onSubmitTicket) {
                onSubmitTicket(newTicket);
            }

            reset({
                name: data.name,
                email: data.email,
                subject: "",
                message: ""
            });
        } catch (err) {
            console.error("API error submitting help ticket:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const loading = isSubmitting || isCreateHelpAndSupportPending;

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 animate-fadeIn">
            {/* Header */}
            <div className="mb-6 pb-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Submit a Support Request
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                        Please choose a category below and provide the details of your request.
                    </p>
                </div>
            </div>

            {/* Section 1: Category Selection Grid */}
            <CategorySelector
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryClick}
            />

            {/* Form */}
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                        2. Request Details Form ({HELP_CATEGORIES.find(c => c.id === selectedCategory)?.label || "Support Request"})
                    </label>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: "Please enter your name" })}
                            placeholder="e.g. Jane Doe"
                            className={`w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border ${
                                errors.name ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 focus:border-sky-600"
                            } bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-800 font-medium`}
                        />
                        {errors.name && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Please enter your email",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address format"
                                }
                            })}
                            placeholder="e.g. jane.doe@example.com"
                            className={`w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border ${
                                errors.email ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 focus:border-sky-600"
                            } bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-800 font-medium`}
                        />
                        {errors.email && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                {/* Priority & Subject */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <CustomSelect
                            label="Priority Level"
                            value={selectedPriority}
                            onChange={(val) => setSelectedPriority(val)}
                            options={PRIORITY_OPTIONS}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Subject / Summary <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("subject", { required: "Please enter a subject summary" })}
                            placeholder={
                                selectedCategory === "question" ? "e.g. Clarification on Propranolol Mechanism..." :
                                selectedCategory === "technical" || selectedCategory === "technical_problem" ? "e.g. Unable to upload course syllabus PDF" :
                                selectedCategory === "account" || selectedCategory === "account_support" ? "e.g. Subscription billing or invoice inquiry..." :
                                "e.g. Suggestion for new flashcard feature..."
                            }
                            className={`w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border ${
                                errors.subject ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 focus:border-sky-600"
                            } bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-800 font-medium`}
                        />
                        {errors.subject && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">{errors.subject.message}</p>
                        )}
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Detailed Description / Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                        {...register("message", { required: "Please provide a detailed description" })}
                        rows={5}
                        placeholder={
                            selectedCategory === "question" ? "Provide context on the nursing concept, topic, or question ID you need help with..." :
                            selectedCategory === "technical" || selectedCategory === "technical_problem" ? "When I try to upload my syllabus PDF, it shows a network timeout error." :
                            selectedCategory === "account" || selectedCategory === "account_support" ? "Include relevant account details, email, or specific billing questions..." :
                            "Share your detailed ideas, suggestions, or thoughts on how we can improve STEMRN..."
                        }
                        className={`w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border ${
                            errors.message ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 focus:border-sky-600"
                        } bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-800 font-medium resize-y`}
                    ></textarea>
                    {errors.message && (
                        <p className="text-rose-500 text-xs mt-1 font-medium">{errors.message.message}</p>
                    )}
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                        Submissions go directly into our Support Team.
                    </p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-3 bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                <span>Submitting Request...</span>
                            </>
                        ) : (
                            <>
                                <span>Submit Request</span>
                                <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
