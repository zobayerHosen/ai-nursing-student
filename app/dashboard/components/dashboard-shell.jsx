"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./dashboard-header";
import { useRouter } from "next/navigation";
import { ROUTE_PATH } from "@/constants/route-naming";
import { useGetUser } from "@/hooks";

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
        <div className="flex min-h-screen w-full max-w-full overflow-x-hidden">
            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* Content */}
            <div
                className={`flex-1 min-w-0 max-w-full transition-all duration-300 ml-0 ${collapsed ? "lg:ml-16 lg:max-w-[calc(100%-4rem)]" : "lg:ml-64 lg:max-w-[calc(100%-16rem)]"}`}
            >
                <DashboardHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <main className="flex-1 w-full max-w-full min-w-0 overflow-x-hidden pt-20">{children}</main>
            </div>
        </div>
    );
};
export default DashboardShell; 