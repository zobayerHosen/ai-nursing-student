"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./dashboard-header";
import { useGetUser } from "@/hooks";
import { useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/constants/route-naming";

const DashboardShell = ({ children }) => {
    const { user } = useGetUser()
    const router = useRouter();
    console.log("🚀 User Data ------->", user);
    const [collapsed, setCollapsed] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (user?.subscription === null) {
            router.push(ROUTE_PATH.CHOOSE_SUBSCRIPTION);
        }
    }, [user, router])

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

    // Note: Main part
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
                className={`flex-1 transition-all duration-300 ml-0 ${collapsed ? "lg:ml-16" : "lg:ml-64"}`}
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