"use client";

import React from "react";
import { 
    HelpCircle, 
    Wrench, 
    UserCheck, 
    MessageSquare, 
    CheckCircle2 
} from "lucide-react";
import { HELP_CATEGORIES } from "../../data/initial-tickets";

export default function CategorySelector({ selectedCategory, onSelectCategory }) {
    return (
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
    );
}
