"use client";

import React, { useState, useEffect } from "react";
import { 
    Inbox, 
    PlusCircle,
    Headphones,
    LifeBuoy
} from "lucide-react";
import TicketSubmitForm from "./ticket-submit-form";
import UserTicketsList from "./user-tickets-list";
import { INITIAL_TICKETS, HELP_CATEGORIES } from "../data/initial-tickets";
import { useGetUser } from "@/hooks/user/getuser.hook";

const LOCAL_STORAGE_KEY = "stemrn_help_desk_tickets_v1";

const HelpCenterShell = () => {
    const { user } = useGetUser();
    const [tickets, setTickets] = useState([]);
    const [activeTab, setActiveTab] = useState("submit"); // "submit" | "my-tickets"
    const [prefilledCategory, setPrefilledCategory] = useState("question");

    // Load tickets from localStorage or initial seed
    useEffect(() => {
        try {
            const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (stored) {
                setTickets(JSON.parse(stored));
            } else {
                setTickets(INITIAL_TICKETS);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
            }
        } catch (e) {
            console.error("Failed to load help center tickets from localStorage", e);
            setTickets(INITIAL_TICKETS);
        }
    }, []);

    // Helper to persist tickets
    const saveTickets = (updatedTickets) => {
        setTickets(updatedTickets);
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTickets));
        } catch (e) {
            console.error("Failed to save tickets to localStorage", e);
        }
    };

    // Form Submit Handler
    const handleNewTicketSubmit = (newTicket) => {
        const updated = [newTicket, ...tickets];
        saveTickets(updated);
        setActiveTab("my-tickets");
    };

    const openCategoryInForm = (catId) => {
        setPrefilledCategory(catId);
        setActiveTab("submit");
    };

    const openCount = tickets.filter(t => t.status === "Open" || t.status === "In Progress").length;

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                
                {/* Main Hero Header */}
                <div className="bg-linear-to-r from-[#0F172A] via-[#1E3A5F] to-[#2C5F8D] rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold backdrop-blur-md">
                                <LifeBuoy className="w-3.5 h-3.5" />
                                <span>STEMRN Help Desk & Support Desk</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                                How can we assist your nursing journey today?
                            </h1>
                            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                                Submit technical issues, academic questions, account support requests, or general feedback directly to our team.
                            </p>
                        </div>

                        {/* Quick Category Badges Summary */}
                        <div className="grid grid-cols-2 gap-2 shrink-0">
                            {HELP_CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => openCategoryInForm(cat.id)}
                                    className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md text-left transition-all border border-white/10 cursor-pointer group"
                                >
                                    <div className="text-[10px] font-bold text-sky-200 uppercase tracking-wider group-hover:text-white transition-colors">
                                        {cat.shortLabel}
                                    </div>
                                    <div className="text-xs font-bold text-white mt-0.5 flex items-center justify-between gap-1">
                                        <span>Submit</span>
                                        <span className="text-sky-300 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Navigation Tabs */}
                <div className="bg-white p-1.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                        <button
                            onClick={() => setActiveTab("submit")}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                                activeTab === "submit"
                                    ? "bg-[#1E3A5F] text-white shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Submit Request</span>
                        </button>

                        <button
                            onClick={() => setActiveTab("my-tickets")}
                            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                                activeTab === "my-tickets"
                                    ? "bg-[#1E3A5F] text-white shadow-sm"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                            <Inbox className="w-4 h-4" />
                            <span>My Requests</span>
                            {openCount > 0 && (
                                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                                    activeTab === "my-tickets" ? "bg-sky-400 text-slate-900" : "bg-amber-100 text-amber-800"
                                }`}>
                                    {openCount} active
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hidden lg:flex items-center gap-2">
                        <Headphones className="w-3.5 h-3.5 text-sky-600" />
                        <span>Logged in as: <strong className="text-slate-800">{user?.name || user?.email || "Student Account"}</strong></span>
                    </div>
                </div>

                {/* Active Tab View */}
                {activeTab === "submit" && (
                    <TicketSubmitForm 
                        initialCategory={prefilledCategory}
                        onSubmitTicket={handleNewTicketSubmit} 
                        onCategorySelect={(catId) => setPrefilledCategory(catId)}
                    />
                )}

                {activeTab === "my-tickets" && (
                    <UserTicketsList
                        tickets={tickets}
                        onCreateNew={() => setActiveTab("submit")}
                    />
                )}

            </div>
        </div>
    );
};

export default HelpCenterShell;