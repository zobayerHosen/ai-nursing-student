"use client";

import React from "react";
import { Monitor } from "lucide-react";
import CustomSelect from "../custom-select";

const DEVICE_OPTIONS = [
    { value: "Windows PC", label: "Windows PC" },
    { value: "Mac (macOS)", label: "Mac (macOS)" },
    { value: "iOS / iPhone", label: "iOS / iPhone" },
    { value: "Android Smartphone", label: "Android Smartphone" },
    { value: "iPad / Tablet", label: "iPad / Tablet" }
];

const BROWSER_OPTIONS = [
    { value: "Google Chrome", label: "Google Chrome" },
    { value: "Safari", label: "Safari" },
    { value: "Microsoft Edge", label: "Microsoft Edge" },
    { value: "Mozilla Firefox", label: "Mozilla Firefox" },
    { value: "STEMRN App", label: "STEMRN Mobile App" }
];

const ISSUE_COMPONENT_OPTIONS = [
    { value: "Video & Lesson Streaming", label: "Video / Lesson Stream" },
    { value: "Quiz / Q-Bank Generator", label: "Quiz / Q-Bank Generator" },
    { value: "Flashcard Flip / Audio", label: "Flashcard Flip / Audio" },
    { value: "Login & Session Expiry", label: "Login / Session Issue" },
    { value: "Page Load / 500 Error", label: "Page Load / Error 500" }
];

export default function TechnicalFields({ watch, setValue, register }) {
    const deviceType = watch("deviceType") || "Windows PC";
    const browserType = watch("browserType") || "Google Chrome";
    const issueComponent = watch("issueComponent") || "Video & Lesson Streaming";

    return (
        <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-200/70 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                <Monitor className="w-4 h-4 text-amber-600" />
                <span>Technical Environment & Error Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                <CustomSelect
                    label="Device & OS"
                    value={deviceType}
                    onChange={(val) => setValue("deviceType", val)}
                    options={DEVICE_OPTIONS}
                />

                <CustomSelect
                    label="Browser"
                    value={browserType}
                    onChange={(val) => setValue("browserType", val)}
                    options={BROWSER_OPTIONS}
                />

                <CustomSelect
                    label="Issue Area"
                    value={issueComponent}
                    onChange={(val) => setValue("issueComponent", val)}
                    options={ISSUE_COMPONENT_OPTIONS}
                />

                <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Error Code (Optional)
                    </label>
                    <input
                        type="text"
                        {...register("errorCode")}
                        placeholder="e.g. #4032 or ERR_500"
                        className="w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
