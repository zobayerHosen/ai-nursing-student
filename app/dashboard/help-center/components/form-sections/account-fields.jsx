"use client";

import React from "react";
import { CreditCard } from "lucide-react";
import CustomSelect from "../custom-select";

const ACCOUNT_TOPIC_OPTIONS = [
    { value: "Password Reset / Access Loss", label: "Password Reset / Access Loss" },
    { value: "Subscription Upgrade / Cancellation", label: "Subscription Upgrade / Cancel" },
    { value: "Billing Invoice & Receipt Request", label: "Billing Invoice & Tax Receipt" },
    { value: "Email / Profile Information Update", label: "Email / Profile Info Update" },
    { value: "Payment Charge Inquiry", label: "Payment Charge Inquiry" }
];

const SUBSCRIPTION_TIER_OPTIONS = [
    { value: "Monthly Plan", label: "Monthly Access Plan" },
    { value: "Quarterly Access", label: "Quarterly Access Plan" },
    { value: "Annual NCLEX Pass Bundle", label: "Annual NCLEX Pass Bundle" }
];

export default function AccountFields({ watch, setValue, register }) {
    const accountTopic = watch("accountTopic") || "Subscription Upgrade / Cancellation";
    const subscriptionTier = watch("subscriptionTier") || "Annual NCLEX Pass Bundle";

    return (
        <div className="bg-purple-50/40 p-4 rounded-xl border border-purple-100 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900 mb-1">
                <CreditCard className="w-4 h-4 text-purple-600" />
                <span>Account & Subscription Specifications</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CustomSelect
                    label="Account Topic"
                    value={accountTopic}
                    onChange={(val) => setValue("accountTopic", val)}
                    options={ACCOUNT_TOPIC_OPTIONS}
                />

                <CustomSelect
                    label="Subscription Plan Tier"
                    value={subscriptionTier}
                    onChange={(val) => setValue("subscriptionTier", val)}
                    options={SUBSCRIPTION_TIER_OPTIONS}
                />

                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Secondary / Billing Email (Optional)
                    </label>
                    <input
                        type="email"
                        {...register("altEmail")}
                        placeholder="e.g. billing@school.edu"
                        className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border border-slate-200 bg-white focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-slate-800 font-medium"
                    />
                </div>
            </div>
        </div>
    );
}
