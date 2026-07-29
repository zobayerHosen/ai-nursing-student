"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

const HelpCenterShell = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = (data) => {
        setIsSubmitting(true);
        console.log("Help Request Submitted:", data);
        // Simulate API call
        setTimeout(() => {
            alert("Your request has been submitted successfully! The admin will be notified.");
            reset();
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="w-full p-6 md:p-8 bg-[#f4f6f9] min-h-screen">
            <div className="mb-8 animate-[fadeUp_0.3s_ease] max-w-4xl mx-auto">
                <h1 className="text-[26px] font-extrabold text-[#0f172a] mb-2">
                    Help Center
                </h1>
                <p className="text-[14px] text-[#64748b]">
                    Need assistance? Notify the admin about your issue by filling out the form below.
                </p>
            </div>

            <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-[#e2e8f0] p-6 md:p-8 animate-[fadeUp_0.4s_ease]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Name Field */}
                        <div>
                            <label className="block text-[11px] font-bold text-[#64748b] mb-2 uppercase tracking-wide">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                placeholder="John Doe"
                                className={`w-full px-4 py-2.5 text-[14px] rounded-lg border ${errors.name ? 'border-red-500' : 'border-[#e2e8f0]'} focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] transition-all bg-[#f8fafc] focus:bg-white`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name.message}</p>}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-[11px] font-bold text-[#64748b] mb-2 uppercase tracking-wide">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { 
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder="john@example.com"
                                className={`w-full px-4 py-2.5 text-[14px] rounded-lg border ${errors.email ? 'border-red-500' : 'border-[#e2e8f0]'} focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] transition-all bg-[#f8fafc] focus:bg-white`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>}
                        </div>
                    </div>

                    {/* Help Type Field */}
                    <div>
                        <label className="block text-[11px] font-bold text-[#64748b] mb-2 uppercase tracking-wide">
                            Type of Help Needed <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("helpType", { required: "Please select a help type" })}
                            className={`w-full px-4 py-2.5 text-[14px] rounded-lg border ${errors.helpType ? 'border-red-500' : 'border-[#e2e8f0]'} focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] transition-all bg-[#f8fafc] focus:bg-white text-[#1e293b] cursor-pointer`}
                        >
                            <option value="">Select a category...</option>
                            <option value="technical">Technical Support</option>
                            <option value="billing">Billing & Subscription</option>
                            <option value="content">Question/Content Issue</option>
                            <option value="account">Account Management</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.helpType && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.helpType.message}</p>}
                    </div>

                    {/* Subject Field */}
                    <div>
                        <label className="block text-[11px] font-bold text-[#64748b] mb-2 uppercase tracking-wide">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("subject", { required: "Subject is required" })}
                            placeholder="Briefly describe your issue"
                            className={`w-full px-4 py-2.5 text-[14px] rounded-lg border ${errors.subject ? 'border-red-500' : 'border-[#e2e8f0]'} focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] transition-all bg-[#f8fafc] focus:bg-white`}
                        />
                        {errors.subject && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.subject.message}</p>}
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block text-[11px] font-bold text-[#64748b] mb-2 uppercase tracking-wide">
                            Description / Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register("description", { required: "Please provide details about your issue" })}
                            rows="5"
                            placeholder="Please provide as much detail as possible so we can best assist you..."
                            className={`w-full px-4 py-2.5 text-[14px] rounded-lg border ${errors.description ? 'border-red-500' : 'border-[#e2e8f0]'} focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] transition-all bg-[#f8fafc] focus:bg-white resize-y`}
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.description.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full sm:w-auto px-7 py-3 bg-[#1E3A5F] text-white text-[14px] font-bold rounded-lg transition-colors flex items-center justify-center gap-2 border-none cursor-pointer hover:bg-[#162d4a] ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
                            {!isSubmitting && <span className="text-lg leading-none">→</span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HelpCenterShell;