"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./dashboard-header";

const DashboardShell = ({ children }) => {
    const [collapsed, setCollapsed] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Note: Load state
    useEffect(() => {
        const saved = localStorage.getItem("sidebar-collapsed");
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* Content */}
            <div
                className={`flex-1 transition-all duration-300 ml-0 ${collapsed ? "sm:ml-16" : "sm:ml-64"
                    }`}
            >
                <DashboardHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <div className="flex-1 w-full">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DashboardShell;