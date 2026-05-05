/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./dashboard-header";


export default function DashboardShell({ children }) {
    const [collapsed, setCollapsed] = useState(null);

    // Note: Load state
    useEffect(() => {
        const saved = localStorage.getItem("sidebar-collapsed");
        setCollapsed(saved ? JSON.parse(saved) : false);
    }, []);

    // Note: Save state
    useEffect(() => {
        if (collapsed !== null) {
            localStorage.setItem(
                "sidebar-collapsed",
                JSON.stringify(collapsed)
            );
        }
    }, [collapsed]);

    // Note: Prevent flicker
    if (collapsed === null) return null;

    return (
        <div className="flex min-h-screen bg-[#F7F7F7]">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} />

            {/* Content */}
            <div
                className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"
                    }`}
            >
                <DashboardHeader collapsed={collapsed} setCollapsed={setCollapsed} />

                <div className="pb-6">
                    {children}
                </div>
            </div>
        </div>
    );
};