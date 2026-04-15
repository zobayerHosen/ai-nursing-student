"use client";

import Image from "next/image";
import Link from "next/link";
import {
    BsGrid,
    BsBook,
    BsClipboard,
    BsHeartPulse,
    BsCalculator,
    BsClipboardData,
    BsActivity,
    BsTools,
    BsFileEarmarkText,
    BsPerson,
    BsMic,
    BsCardChecklist,
    BsJournalText,
    BsPatchCheck,
    BsCapsule,
    BsPencil,
    BsBarChart,
    BsDiagram3,
    BsCreditCard,
    BsQuestionCircle,
    BsFileText,
    BsShieldCheck,
    BsGear,
    BsHeadset,
    BsDownload,
} from "react-icons/bs";


import logo from "@/public/assets/dash_logo.png"
import min_logo from "@/public/assets/mini_logo.png"

const sidebarData = [
    {
        title: "Main Menu",
        items: [
            { name: "Dashboard", icon: BsGrid, href: "/dashboard" },
            { name: "My Library", icon: BsBook, href: "/dashboard/library" },
        ],
    },
    {
        title: "MASTER NCLEX",
        items: [
            { name: "NCLEX Exam", icon: BsClipboard, href: "#" },
            { name: "Flashcards", icon: BsCardChecklist, href: "#" },
        ],
    },
    {
        title: "CORE LEARNING",
        items: [
            { name: "Study Notes", icon: BsFileEarmarkText, href: "#" },
            { name: "Body Systems", icon: BsPerson, href: "#" },
            { name: "Dosage Calculation", icon: BsCalculator, href: "#" },
            { name: "Diagnostic Tests & Labs", icon: BsClipboardData, href: "#" },
            { name: "ECG Mastery", icon: BsActivity, href: "#" },
            { name: "Practical Skills", icon: BsTools, href: "#" },
            { name: "Nursing Assessments", icon: BsHeartPulse, href: "#" },
            { name: "Cheat Sheets", icon: BsJournalText, href: "#" },
        ],
    },
    {
        title: "INTERACTIVE TOOLS",
        items: [
            { name: "My Tutor", icon: BsPerson, href: "#" },
            { name: "Lecture Notes", icon: BsMic, href: "#" },
            { name: "Notes to Flashcard", icon: BsCardChecklist, href: "#" },
            { name: "Notes to Quiz", icon: BsClipboard, href: "#" },
            { name: "Research Paper", icon: BsJournalText, href: "#" },
            { name: "Assignment Checker", icon: BsPatchCheck, href: "#" },
            { name: "Care Plan Builder", icon: BsClipboardData, href: "#" },
            { name: "Drug Cards", icon: BsCapsule, href: "#" },
            { name: "Charting Coach", icon: BsPencil, href: "#" },
            { name: "Labs Interpretation", icon: BsBarChart, href: "#" },
            { name: "Dosage Calc", icon: BsCalculator, href: "#" },
            { name: "Concept Map", icon: BsDiagram3, href: "#" },
        ],
    },
    {
        title: "SUPPORT & LEGALS",
        items: [
            { name: "Subscription Billing", icon: BsCreditCard, href: "#" },
            { name: "FAQ.s", icon: BsQuestionCircle, href: "#" },
            { name: "Terms & Conditions", icon: BsFileText, href: "#" },
            { name: "Privacy policy", icon: BsShieldCheck, href: "#" },
        ],
    },
];

export default function Sidebar({ collapsed }) {
    return (
        <div
            className={`fixed top-0 left-0 h-full bg-[#F6F8FA] border-r border-[#DFE1E7] transition-all duration-300 flex flex-col
      ${collapsed ? "w-20" : "w-64"}`}
        >
            {/* Logo */}
            <div className={`py-6.5 px-4.5 ${collapsed ? "p-0" : ""}`}>
                <Link href="/">
                    {collapsed ?
                        <div className="">
                            <Image
                                src={min_logo}
                                alt="logo"
                                className="object-contain"
                            />
                        </div> :
                        <div className="w-35 h-7.5">
                            <Image
                                src={logo}
                                alt="logo"
                                className="w-fit h-full object-contain"
                            />
                        </div>
                    }
                </Link>
            </div>

            {/* Scrollable Menu */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {sidebarData.map((section, i) => (
                    <div key={i}>
                        {!collapsed && (
                            <p className="text-xs text-[#555555] font-semibold px-3 mb-2 uppercase">
                                {section.title}
                            </p>
                        )}

                        <div className="space-y-1">
                            {section.items.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <Icon size={20} className="text-[#2C5F8D]" />

                                        {!collapsed && (
                                            <span className="text-sm font-medium text-[#424242]">
                                                {item.name}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="p-3 border-t border-[#DFE1E7] space-y-3">
                {/* Settings & Help */}
                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <BsGear size={20} />
                    {!collapsed && <span className="text-sm">Settings</span>}
                </Link>

                <Link href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <BsHeadset size={20} />
                    {!collapsed && <span className="text-sm">Help & Center</span>}
                </Link>

                {/* Download App Card */}
                {!collapsed && (
                    <div className="bg-gray-50 rounded-xl p-4 text-center mt-4">
                        <p className="text-xs text-gray-500 mb-3">
                            Download our mobile app and be up to date
                        </p>

                        <button className="cursor-pointer flex items-center justify-center gap-2 w-full bg-primary text-white py-3 px-5 rounded-full text-sm font-medium">
                            <BsDownload />
                            Download App
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}