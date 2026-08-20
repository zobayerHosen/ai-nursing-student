"use client";

import React, { useState } from "react";
import { 
    Search, 
    Filter, 
    Clock, 
    CheckCircle2, 
    AlertCircle, 
    HelpCircle, 
    Wrench, 
    UserCheck, 
    MessageSquare, 
    ChevronDown,
    Plus,
    Inbox,
    Paperclip,
    User
} from "lucide-react";
import { HELP_CATEGORIES } from "../data/initial-tickets";

export default function UserTicketsList({ tickets, onCreateNew }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [expandedTicketId, setExpandedTicketId] = useState(null);

    // Filter tickets
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = 
            ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat = selectedCategory === "all" || ticket.category === selectedCategory;
        const matchesStatus = selectedStatus === "all" || ticket.status.toLowerCase() === selectedStatus.toLowerCase();

        return matchesSearch && matchesCat && matchesStatus;
    });

    const toggleExpand = (ticketId) => {
        setExpandedTicketId(prev => prev === ticketId ? null : ticketId);
    };

    const getCategoryIcon = (catId) => {
        switch(catId) {
            case "question": return <HelpCircle className="w-4 h-4 text-blue-600" />;
            case "technical": return <Wrench className="w-4 h-4 text-amber-600" />;
            case "account": return <UserCheck className="w-4 h-4 text-purple-600" />;
            case "feedback": return <MessageSquare className="w-4 h-4 text-emerald-600" />;
            default: return <HelpCircle className="w-4 h-4 text-slate-600" />;
        }
    };

    const getStatusBadge = (status) => {
        switch(status.toLowerCase()) {
            case "open":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Open
                    </span>
                );
            case "in progress":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                        In Progress
                    </span>
                );
            case "resolved":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Resolved
                    </span>
                );
            case "closed":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        Closed
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                        {status}
                    </span>
                );
        }
    };

    const getPriorityBadge = (priority) => {
        switch(priority?.toLowerCase()) {
            case "urgent":
                return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-100 text-rose-700 uppercase tracking-wider">Urgent</span>;
            case "high":
                return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700 uppercase tracking-wider">High</span>;
            case "medium":
                return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase tracking-wider">Medium</span>;
            default:
                return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">Low</span>;
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 animate-fadeIn">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Inbox className="w-5 h-5 text-sky-600" />
                        My Submitted Requests ({tickets.length})
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                        Track the status of your questions, technical issues, account support, and feedback.
                    </p>
                </div>
                <button
                    onClick={onCreateNew}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer self-start md:self-center"
                >
                    <Plus className="w-4 h-4" />
                    <span>New Request</span>
                </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search requests by ID, title, or message..."
                        className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-white rounded-lg border border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-800"
                    />
                </div>

                {/* Category & Status Selectors */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold shrink-0">
                        <Filter className="w-3.5 h-3.5" />
                        <span>Filter:</span>
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                        <option value="all">All Categories</option>
                        {HELP_CATEGORIES.map(c => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-sky-500 cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="in progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            {/* Tickets Table / Cards List */}
            {filteredTickets.length === 0 ? (
                <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/40">
                    <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-slate-700 mb-1">No requests found</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                        We couldn't find any requests matching your filters. Submit a new request or adjust your search criteria.
                    </p>
                    <button
                        onClick={onCreateNew}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                        Submit a Help Request
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredTickets.map((ticket) => {
                        const isExpanded = expandedTicketId === ticket.id;
                        return (
                            <div
                                key={ticket.id}
                                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-2xs overflow-hidden"
                            >
                                <div
                                    onClick={() => toggleExpand(ticket.id)}
                                    className="p-4 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                                >
                                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                                        <div className="p-2.5 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                                            {getCategoryIcon(ticket.category)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="text-xs font-mono font-bold text-slate-400">
                                                    {ticket.id}
                                                </span>
                                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                                    {ticket.categoryLabel}
                                                </span>
                                                {getPriorityBadge(ticket.priority)}
                                                {getStatusBadge(ticket.status)}
                                            </div>
                                            <h3 className="text-sm font-bold text-slate-800 truncate">
                                                {ticket.subject}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                                        <div className="text-left md:text-right">
                                            <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric"
                                                })}
                                            </div>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full bg-slate-100 text-slate-500 transition-transform flex items-center justify-center shrink-0 ${isExpanded ? "rotate-180 bg-sky-100 text-sky-700" : ""}`}>
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content Details */}
                                {isExpanded && (
                                    <div className="p-4 bg-slate-50/70 border-t border-slate-100 text-xs text-slate-700 space-y-3">
                                        <div>
                                            <span className="font-bold text-slate-800 block mb-1">Request Details:</span>
                                            <p className="bg-white p-3 rounded-lg border border-slate-200/80 leading-relaxed text-slate-800 whitespace-pre-wrap">
                                                {ticket.description}
                                            </p>
                                        </div>

                                        {ticket.attachment && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-xs font-semibold border border-sky-200">
                                                <Paperclip className="w-3.5 h-3.5" />
                                                <span>Attached: {ticket.attachment}</span>
                                            </div>
                                        )}

                                        <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-200/60">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3 text-slate-400" />
                                                Submitted by: <strong>{ticket.userName}</strong> ({ticket.userEmail})
                                            </span>
                                            <span>Assigned: <strong>{ticket.assignedAgent || "Support Team"}</strong></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
