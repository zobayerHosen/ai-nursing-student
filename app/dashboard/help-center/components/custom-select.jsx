"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({
    value,
    onChange,
    options = [],
    placeholder = "Select an option...",
    className = "",
    label,
    error,
    disabled = false
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Normalize options if passed as string array vs array of objects { value, label }
    const normalizedOptions = options.map((opt) => {
        if (typeof opt === "string" || typeof opt === "number") {
            return { value: opt, label: opt };
        }
        return opt;
    });

    const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value));

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelect = (val) => {
        if (disabled) return;
        onChange(val);
        setIsOpen(false);
    };

    return (
        <div className={`relative w-full ${className}`} ref={containerRef}>
            {label && (
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {label}
                </label>
            )}

            {/* Select Trigger Box */}
            <button
                type="button"
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-3.5 py-2.5 text-xs md:text-sm rounded-lg border text-left flex items-center justify-between gap-2 transition-all cursor-pointer select-none ${
                    error
                        ? "border-rose-500 bg-rose-50/30 text-rose-900 focus:ring-2 focus:ring-rose-500/20"
                        : isOpen
                        ? "border-sky-600 bg-white ring-2 ring-sky-500/20 shadow-xs"
                        : "border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 text-slate-800"
                } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
            >
                <span className="truncate font-medium">
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                {/* Animated Chevron Arrow Icon */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="shrink-0 text-slate-400"
                >
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                </motion.div>
            </button>

            {/* Dropdown Options Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl border border-slate-200/90 shadow-xl overflow-hidden py-1 max-h-60 overflow-y-auto"
                    >
                        {normalizedOptions.length === 0 ? (
                            <div className="px-3.5 py-2.5 text-xs text-slate-400 italic">
                                No options available
                            </div>
                        ) : (
                            normalizedOptions.map((option) => {
                                const isSelected = String(option.value) === String(value);
                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleSelect(option.value)}
                                        className={`w-full px-3.5 py-2.5 text-xs md:text-sm text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                                            isSelected
                                                ? "bg-sky-50 text-sky-800 font-bold"
                                                : "text-slate-700 hover:bg-slate-50 font-medium"
                                        }`}
                                    >
                                        <span className="truncate">{option.label}</span>
                                        {isSelected && (
                                            <Check className="w-4 h-4 text-sky-600 shrink-0" />
                                        )}
                                    </button>
                                );
                            })
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <p className="text-rose-500 text-xs mt-1 font-medium">{error}</p>
            )}
        </div>
    );
}
