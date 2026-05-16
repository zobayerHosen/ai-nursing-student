
"use client";

import { useEffect, useState } from "react";
import {
    MessageSquareMore,
    CreditCard,
    FileQuestion,
    FileText,
    ClipboardCheck,
    ClipboardPlus,
    Pill,
    PencilLine,
    FlaskConical,
    Network,
} from "lucide-react";
import { tools } from "@/data";

const toolIcons = {
    "my-tutor": MessageSquareMore,
    flashcard: CreditCard,
    quiz: FileQuestion,
    research: FileText,
    checker: ClipboardCheck,
    careplan: ClipboardPlus,
    drugs: Pill,
    charting: PencilLine,
    labs: FlaskConical,
    concept: Network,
};

export default function AIToolsSection() {
    const [activeTool, setActiveTool] = useState("my-tutor");

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTool((prev) => prev);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="features" className="w-full overflow-hidden bg-white px-6 pb-14 md:px-10 lg:px-0">
            <div className="mx-auto max-w-310">
                {/* Header */}
                <div className="mx-auto mb-6 lg:mb-10 max-w-170 text-center">
                    <h2 className="mb-2.5 text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em] text-[#234C7B] lg:text-[48px]">
                        AI tools that actually <span className="text-[#ff6b6b]">think like a nurse.</span>
                    </h2>

                    <p className="mx-auto mt-5 sm:mt-6 md:mt-7 lg:mt-8 max-w-135 text-[13.5px] leading-[1.55] text-[#4a5568]">
                        Every tool inside STEM RN is built by clinicians, for clinicians — designed to save you hours of studying and help you think critically on test day.
                    </p>
                </div>

                <div className="mx-auto grid container grid-cols-1 gap-6 pb-0 xl:pb-16 lg:grid-cols-[1fr_1.1fr] lg:gap-9">
                    {/* LEFT SIDE */}
                    <div className="flex flex-col gap-4">
                        {tools?.map((tool) => {
                            const isActive = activeTool === tool.key;
                            // const Icon = toolIcons[tool.key];

                            return (
                                <div
                                    key={tool.key}
                                    onClick={() => setActiveTool(tool.key)}
                                    className={`cursor-pointer overflow-hidden rounded-[9px] border transition-all duration-300 ${isActive
                                        ? "border-[#3b82f6] bg-[#eff6ff] shadow-[0_2px_10px_rgba(59,130,246,0.08)]"
                                        : "border-[rgba(11,36,71,0.12)] bg-white hover:border-[rgba(11,36,71,0.22)] hover:bg-[#fafbfc]"
                                        }`}
                                >
                                    <div className="flex items-center gap-2.5 p-4">
                                        <div
                                            className={`shrink-0 transition-all duration-300 ${isActive ? "text-[#3b82f6]" : "text-[#707070]"
                                                }`}
                                        >
                                            {tool?.icon}
                                        </div>

                                        <div
                                            className={`flex-1 text-[13.5px] font-semibold tracking-[-0.005em] transition-all duration-300 ${isActive ? "text-[#3b82f6]" : "text-[#0b2447]"
                                                }`}
                                        >
                                            {tool?.name ?? ""}
                                            {tool?.featured && (
                                                <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-white">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className={`grid overflow-hidden transition-all duration-500 ${isActive
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-3.5 pb-3 pl-10 text-[12px] leading-[1.55] text-[#4a5568]">
                                                {tool?.description ?? ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative flex min-h-85 flex-col items-center justify-center overflow-hidden rounded-[14px] bg-linear-to-br from-[#f8fafce8] to-[#eef2f7f2] shadow-[0_1px_3px_rgba(11,36,71,0.04),0_1px_2px_rgba(11,36,71,0.03)]">

                        <div className="relative z-10 w-full text-center">
                            <div className="mx-auto mb-4.5 flex aspect-[4/3.4] w-full items-center justify-center overflow-hidden">
                                <div className="flex h-[88%] w-[92%] flex-col overflow-hidden rounded-[7px] bg-white text-left shadow-[0_8px_20px_rgba(11,36,71,0.08)]">

                                    {/* Browser header */}
                                    <div className="flex items-center gap-1 bg-[#E6E8EA] px-2.5 py-3">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#ff6058]" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#febc2f]" />
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#28c93f]" />
                                    </div>

                                    {/* tab content */}
                                    <div className="flex flex-1 flex-col gap-1.75 overflow-hidden p-3">
                                        {activeTool === "my-tutor" && (
                                            <>
                                                <div className="mb-1 text-[10.5px] font-bold text-[#0b2447]">
                                                    CARA — Clinical AI Tutor
                                                </div>

                                                <div className="ml-auto max-w-[80%] rounded-[7px] bg-[rgba(11,36,71,0.06)] px-2.25 py-1.25 text-[9px] leading-[1.3] text-[#0b2447]">
                                                    Why is lisinopril contraindicated in pregnancy?
                                                </div>

                                                <div className="max-w-[80%] rounded-[7px] border border-[rgba(59,130,246,0.2)] bg-[#eff6ff] px-2.25 py-1.25 text-[9px] leading-[1.3] text-[#0b2447]">
                                                    ACE inhibitors like lisinopril can cause fetal renal damage, oligohydramnios, and pulmonary hypoplasia...
                                                </div>

                                                <div className="ml-auto max-w-[80%] rounded-[7px] bg-[rgba(11,36,71,0.06)] px-2.25 py-1.25 text-[9px] leading-[1.3] text-[#0b2447]">
                                                    What&apos;s the safer alternative?
                                                </div>
                                            </>
                                        )}

                                        {activeTool === "flashcard" && (
                                            <>
                                                <div className="mb-1 text-[10.5px] font-bold text-[#0b2447]">
                                                    Pharmacology · 42 cards
                                                </div>

                                                <div className="flex flex-col items-center gap-1.25 rounded-md border-[1.5px] border-[#3b82f6] bg-white p-2.5 text-center">
                                                    <div className="text-[7.5px] font-bold uppercase tracking-widset text-[#3b82f6]">
                                                        Front
                                                    </div>

                                                    <div className="text-[12px] font-bold text-[#0b2447]">
                                                        Furosemide
                                                    </div>

                                                    <div className="rounded bg-[#dbeafe] px-1.5 py-0.75 text-[8px] font-semibold text-[#3b82f6]">
                                                        Loop Diuretic
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        {activeTool === "quiz" && (
                                            <>
                                                <div className="mb-1 text-[10.5px] font-bold text-[#0b2447]">
                                                    Cardiac Drugs Quiz · Question 3 / 15
                                                </div>

                                                <div className="h-1.5 w-[85%] rounded-xs bg-[#eef2f7]" />
                                                <div className="h-1.5 w-[60%] rounded-xs bg-[#eef2f7]" />

                                                <div className="mt-1 flex flex-col gap-1.5">
                                                    {["A", "B", "C", "D"].map((item, index) => (
                                                        <div
                                                            key={item}
                                                            className={`rounded-[5px] border p-[7px_10px] ${index === 1
                                                                ? "border-[#16a34a] bg-[#dcfce7]"
                                                                : "border-[rgba(11,36,71,0.08)] bg-[#f8fafc]"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2 text-[9px]">
                                                                <strong>{item}.</strong>
                                                                <div className="h-1.5 w-[60%] rounded-xs bg-[#eef2f7]" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}

                                        {activeTool !== "my-tutor" &&
                                            activeTool !== "flashcard" &&
                                            activeTool !== "quiz" && (
                                                <>
                                                    <div className="mb-2 text-[10.5px] font-bold text-[#0b2447]">
                                                        STEM RN Tool Preview
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="rounded-[5px] border border-[rgba(11,36,71,0.08)] bg-[#f8fafc] p-3">
                                                            <div className="mb-2 h-1.5 w-[90%] rounded bg-[#eef2f7]" />
                                                            <div className="mb-2 h-1.5 w-[75%] rounded bg-[#eef2f7]" />
                                                            <div className="h-1.5 w-[60%] rounded bg-[rgba(59,130,246,0.22)]" />
                                                        </div>

                                                        <div className="flex flex-wrap gap-2">
                                                            <span className="rounded bg-[#dbeafe] px-1.5 py-0.75 text-[8px] font-semibold text-[#3b82f6]">
                                                                AI Powered
                                                            </span>

                                                            <span className="rounded bg-[#dcfce7] px-1.5 py-0.75 text-[8px] font-semibold text-[#16a34a]">
                                                                Clinical Ready
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-1 text-lg font-medium tracking-[-0.01em] text-[#285680]">
                                {tools?.find((tool) => tool.key === activeTool)?.name}
                            </div>

                            <div className="mx-auto max-w-120 text-sm font-medium leading-[1.45] text-[#787878] pb-6 px-4 md:px-0">
                                {tools?.find((tool) => tool.key === activeTool)?.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}