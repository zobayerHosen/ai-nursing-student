"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { 
    HelpCircle, 
    Wrench, 
    UserCheck, 
    MessageSquare, 
    Paperclip, 
    X, 
    Send, 
    Sparkles, 
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { HELP_CATEGORIES } from "../data/initial-tickets";
import { useGetUser } from "@/hooks/user/getuser.hook";

export default function TicketSubmitForm({ onSubmitTicket, onCategorySelect }) {
    const { user } = useGetUser();
    const [selectedCategory, setSelectedCategory] = useState("question");
    const [selectedPriority, setSelectedPriority] = useState("Medium");
    const [attachedFile, setAttachedFile] = useState(null);
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
            description: ""
        }
    });

    useEffect(() => {
        if (user) {
            const fullName = user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim();
            if (fullName) setValue("name", fullName);
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

        setTimeout(() => {
            const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
            const newTicket = {
                id: ticketId,
                subject: data.subject,
                category: selectedCategory,
                categoryLabel: activeCatObj?.label || "General Support",
                priority: selectedPriority,
                status: "Open",
                userName: data.name,
                userEmail: data.email,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                assignedAgent: "Unassigned (Support Queue)",
                description: data.description,
                attachment: attachedFile ? attachedFile.name : null,
                messages: [
                    {
                        id: `msg-${Date.now()}`,
                        sender: "user",
                        senderName: data.name,
                        text: data.description,
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
                        <Sparkles className="w-5 h-5 text-sky-600" />
                        Submit a Help Request
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                        Please choose a category below and describe your issue. Our support team will assist you shortly.
                    </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-full text-xs font-semibold self-start md:self-center">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                    24/7 Support Available
                </div>
            </div>

            {/* Category Selection Grid */}
            <div className="mb-6">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                    1. Select Request Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {HELP_CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                type="button"
                                onClick={() => handleCategoryClick(cat.id)}
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
                                            {cat.id === "technical" && <Wrench className="w-5 h-5" />}
                                            {cat.id === "account" && <UserCheck className="w-5 h-5" />}
                                            {cat.id === "feedback" && <MessageSquare className="w-5 h-5" />}
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

            {/* Form */}
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider -mb-2">
                    2. Request Details
                </label>

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
                            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
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
                            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
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
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Priority Level
                        </label>
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all text-slate-800 font-medium cursor-pointer"
                        >
                            <option value="Low">Low - General Inquiry</option>
                            <option value="Medium">Medium - Normal Issue</option>
                            <option value="High">High - Important / Blocking</option>
                            <option value="Urgent">Urgent - Critical Outage</option>
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Subject / Summary <span className="text-rose-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("subject", { required: "Please enter a subject summary" })}
                            placeholder="Briefly state your question or problem..."
                            className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
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
                        placeholder="Include relevant details, error messages, course names, or specific steps to help us assist you quickly..."
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
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
                        Submissions go directly into our Administrator / Support queue.
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
