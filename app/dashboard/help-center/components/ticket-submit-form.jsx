"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
    Paperclip,
    X,
    Send,
    AlertCircle
} from "lucide-react";
import { HELP_CATEGORIES } from "../data/initial-tickets";
import { useGetUser } from "@/hooks/user/getuser.hook";

// Section Components
import CategorySelector from "./form-sections/category-selector";
import QuestionFields from "./form-sections/question-fields";
import TechnicalFields from "./form-sections/technical-fields";
import AccountFields from "./form-sections/account-fields";
import FeedbackFields from "./form-sections/feedback-fields";
import CustomSelect from "./custom-select";

const PRIORITY_OPTIONS = [
    { value: "Low", label: "Low - General Inquiry" },
    { value: "Medium", label: "Medium - Normal Issue" },
    { value: "High", label: "High - Important / Blocking" },
    { value: "Urgent", label: "Urgent - Critical Outage" }
];

export default function TicketSubmitForm({ initialCategory = "question", onSubmitTicket, onCategorySelect }) {
    const { user } = useGetUser();
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedPriority, setSelectedPriority] = useState("Medium");
    const [attachedFile, setAttachedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Feedback rating state
    const [feedbackRating, setFeedbackRating] = useState(5);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            full_name: "",
            email: "",
            subject: "",
            description: "",
            // Question fields
            nursingSubject: "Pharmacology & Therapeutics",
            questionFocus: "Concept Explanation",
            // Technical fields
            deviceType: "Windows PC",
            browserType: "Google Chrome",
            issueComponent: "Video & Lesson Streaming",
            errorCode: "",
            // Account fields
            accountTopic: "Subscription Upgrade / Cancellation",
            subscriptionTier: "Annual NCLEX Pass Bundle",
            altEmail: "",
            // Feedback fields
            feedbackType: "Feature Request / New Tool Idea"
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
            if (fullName) setValue("full_name", fullName);
            if (user.email) setValue("email", user.email);
        }
    }, [user, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size must be under 5MB");
                return;
            }
            setAttachedFile(file);
            toast.success(`Attached ${file.name}`);
        }
    };

    const removeFile = () => {
        setAttachedFile(null);
    };

    const handleCategoryClick = (catId) => {
        setSelectedCategory(catId);
        if (onCategorySelect) onCategorySelect(catId);
    };

    const onFormSubmit = (data) => {
        setIsSubmitting(true);
        const activeCatObj = HELP_CATEGORIES.find(c => c.id === selectedCategory);

        // Build composite details based on category
        let categoryMetaData = "";
        if (selectedCategory === "question") {
            categoryMetaData = `[Module: ${data.nursingSubject} | Focus: ${data.questionFocus}]`;
        } else if (selectedCategory === "technical") {
            categoryMetaData = `[Device: ${data.deviceType} | Browser: ${data.browserType} | Issue: ${data.issueComponent}${data.errorCode ? ` | Code: ${data.errorCode}` : ""}]`;
        } else if (selectedCategory === "account") {
            categoryMetaData = `[Topic: ${data.accountTopic} | Plan: ${data.subscriptionTier}${data.altEmail ? ` | Alt Email: ${data.altEmail}` : ""}]`;
        } else if (selectedCategory === "feedback") {
            categoryMetaData = `[Feedback Type: ${data.feedbackType} | Rating: ${feedbackRating}/5 Stars]`;
        }

        const fullDescription = `${categoryMetaData}\n\n${data.description}`;

        setTimeout(() => {
            const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
            const newTicket = {
                id: ticketId,
                subject: data.subject,
                category: selectedCategory,
                categoryLabel: activeCatObj?.label || "General Support",
                priority: selectedPriority,
                status: "Open",
                userName: data.full_name,
                userEmail: data.email,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                assignedAgent: "Unassigned (Support Queue)",
                description: fullDescription,
                attachment: attachedFile ? attachedFile.name : null,
                messages: [
                    {
                        id: `msg-${Date.now()}`,
                        sender: "user",
                        senderName: data.full_name,
                        text: fullDescription,
                        timestamp: new Date().toISOString()
                    }
                ]
            };

            onSubmitTicket(newTicket);
            toast.success(`Request #${ticketId} submitted successfully! Support team notified.`);
            reset();
            setAttachedFile(null);
            setIsSubmitting(false);
        }, 600);
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 animate-fadeIn">
            {/* Header */}
            <div className="mb-6 pb-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        Submit a Support Request
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                        Please choose a category below. The request details form will adapt automatically to your selection.
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
                        2. Request Details Form ({HELP_CATEGORIES.find(c => c.id === selectedCategory)?.label})
                    </label>
                </div>

                {/* Common Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("full_name", { required: "Please enter your name" })}
                            placeholder="e.g. Jane Doe"
                            className={`w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border ${
                                errors.full_name ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 focus:border-sky-600"
                            } bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-800 font-medium`}
                        />
                        {errors.full_name && (
                            <p className="text-rose-500 text-xs mt-1 font-medium">{errors.full_name.message}</p>
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

                {/* Section 2 Dynamic Fields */}
                {selectedCategory === "question" && (
                    <QuestionFields watch={watch} setValue={setValue} />
                )}

                {selectedCategory === "technical" && (
                    <TechnicalFields watch={watch} setValue={setValue} register={register} />
                )}

                {selectedCategory === "account" && (
                    <AccountFields watch={watch} setValue={setValue} register={register} />
                )}

                {selectedCategory === "feedback" && (
                    <FeedbackFields 
                        watch={watch} 
                        setValue={setValue} 
                        feedbackRating={feedbackRating} 
                        setFeedbackRating={setFeedbackRating} 
                    />
                )}

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
                                selectedCategory === "technical" ? "e.g. Video buffering error on Safari..." :
                                selectedCategory === "account" ? "e.g. Need annual invoice copy..." :
                                "e.g. Suggestion for dark mode in Concept Map..."
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

                {/* Detailed Description */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Detailed Description / Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                        {...register("description", { required: "Please provide a detailed description" })}
                        rows={5}
                        placeholder={
                            selectedCategory === "question" ? "Provide context on the nursing concept, topic, or question ID you need help with..." :
                            selectedCategory === "technical" ? "Describe what happened when the issue occurred, error codes shown, or steps to reproduce..." :
                            selectedCategory === "account" ? "Include relevant order IDs, account details, or specific billing questions..." :
                            "Share your detailed ideas, suggestions, or thoughts on how we can improve STEMRN..."
                        }
                        className={`w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border ${
                            errors.description ? "border-rose-500 focus:ring-rose-500" : "border-slate-200 focus:border-sky-600"
                        } bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-800 font-medium resize-y`}
                    ></textarea>
                    {errors.description && (
                        <p className="text-rose-500 text-xs mt-1 font-medium">{errors.description.message}</p>
                    )}
                </div>

                {/* Attachment Dropzone */}
                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Attachment (Optional screenshot or log file)
                    </label>
                    {!attachedFile ? (
                        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-xl p-4 cursor-pointer bg-slate-50/30 hover:bg-sky-50/20 transition-all group">
                            <Paperclip className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                            <span className="text-xs font-medium text-slate-600 group-hover:text-sky-700">
                                Click to attach image or document (Max 5MB)
                            </span>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*,.pdf,.doc,.docx"
                                className="hidden"
                            />
                        </label>
                    ) : (
                        <div className="flex items-center justify-between p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs font-medium text-sky-800">
                            <div className="flex items-center gap-2 truncate">
                                <Paperclip className="w-4 h-4 shrink-0 text-sky-600" />
                                <span className="truncate">{attachedFile.name}</span>
                                <span className="text-slate-400 text-[10px]">
                                    ({(attachedFile.size / 1024).toFixed(1)} KB)
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="p-1 hover:bg-sky-100 rounded-lg text-sky-700 transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
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
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-6 py-3 bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-slate-900/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                        {isSubmitting ? (
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
