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
    User,
    RotateCw
} from "lucide-react";
import { HELP_CATEGORIES } from "../data/initial-tickets";
import { useGetHelpAndSupportList } from "@/hooks";

export default function UserTicketsList({ tickets: propTickets = [], onCreateNew }) {
    const { ticketsList, isLoading, isError, error, refetch, isFetching } = useGetHelpAndSupportList();

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [expandedTicketId, setExpandedTicketId] = useState(null);

    // Active tickets: prefer live API data; fallback to propTickets if not yet loaded or error
    const activeTickets = (ticketsList && ticketsList.length > 0)
        ? ticketsList
        : (!isLoading && !isError && ticketsList)
            ? ticketsList
            : (propTickets || []);

    // Filter tickets
    const filteredTickets = activeTickets.filter((ticket) => {
        const idStr = String(ticket.id || "").toLowerCase();
        const subjectStr = (ticket.subject || "").toLowerCase();
        const messageStr = (ticket.message || ticket.description || "").toLowerCase();
        const searchLower = searchTerm.trim().toLowerCase();

        const matchesSearch = 
            !searchLower ||
            idStr.includes(searchLower) ||
            subjectStr.includes(searchLower) ||
            messageStr.includes(searchLower);

        const ticketCat = ticket.category || "";
        const matchesCat = 
            selectedCategory === "all" || 
            ticketCat === selectedCategory ||
            (selectedCategory === "technical" && ticketCat === "technical_problem") ||
            (selectedCategory === "technical_problem" && ticketCat === "technical") ||
            (selectedCategory === "account" && ticketCat === "account_support") ||
            (selectedCategory === "account_support" && ticketCat === "account") ||
            (selectedCategory === "feedback" && ticketCat === "general_feedback") ||
            (selectedCategory === "general_feedback" && ticketCat === "feedback");

        const ticketStatus = (ticket.status || "").toLowerCase().replace("_", " ");
        const selectedStatusNorm = selectedStatus.toLowerCase().replace("_", " ");
        const matchesStatus = selectedStatus === "all" || ticketStatus === selectedStatusNorm;

        return matchesSearch && matchesCat && matchesStatus;
    });

    const toggleExpand = (ticketId) => {
        setExpandedTicketId(prev => prev === ticketId ? null : ticketId);
    };

    const getCategoryIcon = (catId) => {
        switch(catId) {
            case "question": 
                return <HelpCircle className="w-4 h-4 text-blue-600" />;
            case "technical": 
            case "technical_problem":
                return <Wrench className="w-4 h-4 text-amber-600" />;
            case "account": 
            case "account_support":
                return <UserCheck className="w-4 h-4 text-purple-600" />;
            case "feedback": 
            case "general_feedback":
                return <MessageSquare className="w-4 h-4 text-emerald-600" />;
            default: 
                return <HelpCircle className="w-4 h-4 text-slate-600" />;
        }
    };

    const getStatusBadge = (status, statusDisplay) => {
        const text = statusDisplay || status || "Open";
        const norm = (status || statusDisplay || "").toLowerCase().replace("_", " ");
        switch(norm) {
            case "open":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        {text}
                    </span>
                );
            case "in progress":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
                        {text}
                    </span>
                );
            case "resolved":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {text}
                    </span>
                );
            case "closed":
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        {text}
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 capitalize">
                        {text}
                    </span>
                );
        }
    };

    const getPriorityBadge = (priority, priorityDisplay) => {
        const text = priorityDisplay || priority || "Low";
        const norm = (priority || priorityDisplay || "").toLowerCase();
        switch(norm) {
            case "urgent":
                return <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-100 text-rose-700 uppercase tracking-wider">{text}</span>;
            case "high":
                return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700 uppercase tracking-wider">{text}</span>;
            case "medium":
                return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase tracking-wider">{text}</span>;
            default:
                return <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase tracking-wider">{text}</span>;
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 animate-fadeIn">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Inbox className="w-5 h-5 text-sky-600" />
                        My Submitted Requests ({activeTickets.length})
                        {isFetching && !isLoading && (
                            <RotateCw className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                        )}
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                        Track the status of your questions, technical issues, account support, and feedback.
                    </p>
                </div>
                <div className="flex items-center gap-2 self-start md:self-center">
                    <button
                        onClick={() => refetch()}
                        title="Refresh requests"
                        disabled={isFetching}
                        className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                    >
                        <RotateCw className={`w-4 h-4 ${isFetching ? "animate-spin text-sky-600" : ""}`} />
                    </button>
                    <button
                        onClick={onCreateNew}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E3A5F] hover:bg-[#162d4a] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Request</span>
                    </button>
                </div>
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

            {/* Loading State */}
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white animate-pulse space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-9 h-9 rounded-xl bg-slate-200 shrink-0"></div>
                                    <div className="space-y-2 flex-1 max-w-md">
                                        <div className="flex gap-2">
                                            <div className="w-12 h-4 bg-slate-200 rounded"></div>
                                            <div className="w-24 h-4 bg-slate-200 rounded"></div>
                                            <div className="w-16 h-4 bg-slate-200 rounded"></div>
                                        </div>
                                        <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                                <div className="w-20 h-4 bg-slate-200 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : isError ? (
                /* Error State */
                <div className="text-center py-10 px-4 border border-rose-200 rounded-xl bg-rose-50/50">
                    <AlertCircle className="w-9 h-9 text-rose-500 mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-rose-800 mb-1">Failed to load support requests</h3>
                    <p className="text-xs text-rose-600 mb-4 max-w-sm mx-auto">
                        {error?.response?.data?.message || error?.message || "There was an error communicating with the server."}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                    </button>
                </div>
            ) : filteredTickets.length === 0 ? (
                /* Empty State */
                <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/40">
                    <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-sm font-bold text-slate-700 mb-1">No requests found</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                        {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                            ? "We couldn't find any requests matching your filters. Try clearing or adjusting them."
                            : "You haven't submitted any support requests yet. Click below if you need any assistance!"}
                    </p>
                    <button
                        onClick={onCreateNew}
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                        Submit a Help Request
                    </button>
                </div>
            ) : (
                /* Tickets List */
                <div className="space-y-3">
                    {filteredTickets.map((ticket) => {
                        const isExpanded = expandedTicketId === ticket.id;
                        const displayId = typeof ticket.id === "number" ? `#${ticket.id}` : ticket.id;
                        const categoryName = ticket.category_display || ticket.categoryLabel || ticket.category;
                        const descriptionText = ticket.message || ticket.description || "";
                        const createdDate = ticket.created_at || ticket.createdAt;

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
                                                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                                    {displayId}
                                                </span>
                                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                                                    {categoryName}
                                                </span>
                                                {getPriorityBadge(ticket.priority_level, ticket.priority_level_display || ticket.priority)}
                                                {getStatusBadge(ticket.status, ticket.status_display)}
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
                                                {createdDate ? new Date(createdDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric"
                                                }) : "Recent"}
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
                                            <p className="bg-white p-3.5 rounded-lg border border-slate-200/80 leading-relaxed text-slate-800 whitespace-pre-wrap">
                                                {descriptionText}
                                            </p>
                                        </div>

                                        {/* Admin Response Card */}
                                        {ticket.admin_response ? (
                                            <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3.5 space-y-1.5">
                                                <div className="flex items-center gap-2 text-sky-900 font-bold text-xs">
                                                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                                                    <span>Support Team Response:</span>
                                                </div>
                                                <p className="text-xs text-sky-950 leading-relaxed whitespace-pre-wrap pl-6">
                                                    {ticket.admin_response}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="bg-slate-100/70 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-500 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                                                <span>Awaiting response from our support team.</span>
                                            </div>
                                        )}

                                        {ticket.attachment && (
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-xs font-semibold border border-sky-200">
                                                <Paperclip className="w-3.5 h-3.5" />
                                                <span>Attached: {ticket.attachment}</span>
                                            </div>
                                        )}

                                        <div className="pt-2 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-t border-slate-200/60">
                                            <span className="flex items-center gap-1">
                                                <User className="w-3 h-3 text-slate-400" />
                                                Submitted by: <strong>{ticket.name || ticket.userName || "User"}</strong> ({ticket.email || ticket.userEmail})
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
