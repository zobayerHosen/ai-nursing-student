"use client";
import Image from "next/image";
import anigneaImge from "@/public/assets/diagram_angina.jpeg"
import Definition from "./definition";
import ComparisonTableData from "./comparison-table-data";
import { tabsButtons } from "@/data";
import { X } from "lucide-react";
import { useState } from "react";

const StemrnTabs = ({ open, setOpen }) => {
    const [activeTab, setActiveTab] = useState("image");
    return (
        <>
            <div
                className={`absolute inset-0 z-20 bg-[rgba(26,35,50,0.55)] backdrop-blur-[3px] transition-all duration-300 ${open
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                    }`}
            />
            <div
                className={`absolute left-1/2 top-1/2 z-30 flex max-h-[calc(100%-40px)] w-[calc(100%-28px)] max-w-[440px] -translate-x-1/2 overflow-hidden rounded-[14px] bg-white shadow-[0_32px_80px_-16px_rgba(16,24,40,0.4)] transition-all duration-300 ${open
                    ? "-translate-y-1/2 scale-100 opacity-100"
                    : "-translate-y-[48%] scale-[0.94] opacity-0 pointer-events-none"
                    }`}
            >
                <div className="flex w-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-linear-to-br from-[#2C5F8D] to-[#1e4360] px-[14px] py-[10px] text-white">
                        <div className="flex items-center gap-2">
                            <span className="rounded bg-white/20 px-[7px] py-[2px] font-mono text-[8.5px] font-bold uppercase tracking-widest">
                                Figure 1
                            </span>

                            <span className="text-xs font-semibold">
                                Three Types of Angina
                            </span>
                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="cursor-pointer flex h-6 w-6 items-center justify-center rounded-md bg-white/15 transition hover:bg-white/30"
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-[#EEF1F5] bg-[#F7FAFC] px-[6px]">
                        {tabsButtons.map((tab) => {
                            const Icon = tab.icon;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`cursor-pointer flex flex-1 items-center justify-center gap-[5px] border-b-2 px-2 py-[9px] text-[11px] font-semibold transition ${activeTab === tab.id
                                        ? "border-[#FE5E7E] text-[#FE5E7E]"
                                        : "border-transparent text-[#8a94a3]"
                                        }`}
                                >
                                    <Icon size={11} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {activeTab === "image" && (
                            <div className="flex h-[300px] overflow-y-auto items-center justify-center rounded-lg border border-[#EEF1F5]">
                                <Image
                                    src={anigneaImge}
                                    alt="Angina Logo"
                                    width={420}
                                    height={220}
                                />
                            </div>
                        )}

                        {activeTab === "definition" && (
                            <Definition />
                        )}

                        {activeTab === "table" && (
                            <ComparisonTableData />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default StemrnTabs;