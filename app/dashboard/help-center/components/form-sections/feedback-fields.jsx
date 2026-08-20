"use client";

import React from "react";
import { Star } from "lucide-react";
import CustomSelect from "../custom-select";

const FEEDBACK_TYPE_OPTIONS = [
    { value: "Feature Request / New Tool Idea", label: "Feature Request / New Tool Idea" },
    { value: "UI & User Experience Suggestion", label: "UI & User Experience Suggestion" },
    { value: "Content Accuracy Feedback", label: "Content Accuracy / Question Review" },
    { value: "Platform Praise / Testimonial", label: "Platform Praise & Testimonial" },
    { value: "Billing & Subscription", label: "Billing & Subscription" }
];

export default function FeedbackFields({ watch, setValue, feedbackRating, setFeedbackRating }) {
    const feedbackType = watch("feedbackType") || "Feature Request / New Tool Idea";

    return (
        <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1">
                <Star className="w-4 h-4 text-emerald-600" />
                <span>Feedback Classification & Rating</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomSelect
                    label="Feedback Type"
                    value={feedbackType}
                    onChange={(val) => setValue("feedbackType", val)}
                    options={FEEDBACK_TYPE_OPTIONS}
                />

                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Overall STEMRN Platform Rating
                    </label>
                    <div className="flex items-center gap-2 py-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFeedbackRating(star)}
                                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${feedbackRating >= star
                                        ? "bg-amber-400 text-slate-900 border-amber-500 shadow-xs"
                                        : "bg-white text-slate-300 border-slate-200 hover:text-amber-300"
                                    }`}
                            >
                                <Star className="w-5 h-5 fill-current" />
                            </button>
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-2">
                            {feedbackRating === 5 ? "⭐️ 5/5 Excellent" : `${feedbackRating}/5 Rating`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
