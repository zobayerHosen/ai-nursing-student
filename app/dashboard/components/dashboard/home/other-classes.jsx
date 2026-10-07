"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, BookOpen, ClipboardList, PieChart, Library, Folder } from 'lucide-react';
import { useGetDashboardHomeData } from '@/hooks';

const OtherClasses = () => {
    const { dashboardData } = useGetDashboardHomeData();
    const summaryCards = dashboardData?.summary_cards;
    const classesData = summaryCards?.classes;
    const assignmentsData = summaryCards?.assignments;
    const gpaData = summaryCards?.gpa;
    const myLibraryData = summaryCards?.my_library;

    return (
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Classes */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col min-h-40">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-[14px] flex items-center justify-center bg-[#EEF2FF] text-[#6366F1]">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-800">Classes</h3>
                </div>
                
                <div className="mb-5 flex-1">
                    <span className="text-[32px] font-bold text-gray-900 leading-none block">
                        {classesData?.count ?? 0}
                    </span>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">
                        {classesData?.label ?? "Active Courses"}
                    </p>
                </div>
                
                <div className="mt-auto">
                    <Link href="/dashboard/classes" className="text-[12px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                        <span>{classesData?.action_text ? classesData.action_text.replace(/->|>/g, "").trim() : "View All"}</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                </div>
            </div>

            {/* Card 2: Assignments */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col min-h-40">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-[14px] flex items-center justify-center bg-[#FFF7ED] text-[#F97316]">
                        <ClipboardList className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-800">Assignments</h3>
                </div>
                
                <div className="mb-5 flex-1">
                    <span className="text-[32px] font-bold text-gray-900 leading-none block">
                        {assignmentsData?.count ?? 0}
                    </span>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">
                        {assignmentsData?.label ?? "Due Soon"}
                    </p>
                </div>
                
                <div className="mt-auto">
                    <Link href="/dashboard/assignments" className="text-[12px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                        <span>{assignmentsData?.action_text ? assignmentsData.action_text.replace(/->|>/g, "").trim() : "View All"}</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                </div>
            </div>

            {/* Card 3: GPA */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col min-h-40">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-[14px] flex items-center justify-center bg-[#ECFDF5] text-[#10B981]">
                        <PieChart className="w-5 h-5" />
                    </div>
                    <h3 className="text-[15px] font-bold text-gray-800">GPA</h3>
                </div>
                
                <div className="mb-5 flex-1">
                    <span className="text-[32px] font-bold text-gray-900 leading-none block">
                        {gpaData?.value ?? "--"}
                    </span>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">
                        {gpaData?.label ?? "Cumulative"}
                    </p>
                </div>
                
                <div className="mt-auto">
                    <Link href="/dashboard/gpa" className="text-[12px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                        <span>{gpaData?.action_text ? gpaData.action_text.replace(/->|>/g, "").trim() : "View Details"}</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                </div>
            </div>

            {/* Card 4: My Library */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] flex flex-col min-h-40">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[14px] flex items-center justify-center bg-[#FFF1F2] text-[#F43F5E]">
                            <Library className="w-5 h-5" />
                        </div>
                        <h3 className="text-[15px] font-bold text-gray-800">My Library</h3>
                    </div>
                    <Link href="/dashboard/library" className="text-[11px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                        <span>{myLibraryData?.action_text ? myLibraryData.action_text.replace(/->|>/g, "").trim() : "View All"}</span>
                        <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                </div>
                
                <div className="flex flex-col gap-3.5 flex-1 justify-center mt-1">
                    {myLibraryData?.folders && myLibraryData.folders.length > 0 ? (
                        myLibraryData.folders.map((folder) => (
                            <Link
                                href="/dashboard/library"
                                key={folder.id}
                                className="flex items-center justify-between group cursor-pointer"
                            >
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <Folder
                                        className="w-4 h-4 shrink-0"
                                        style={{ color: folder.color || "#10B981", fill: folder.color || "#10B981" }}
                                    />
                                    <span className="text-[12.5px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors truncate">
                                        {folder.name}
                                    </span>
                                </div>
                                <span className="text-[11px] font-medium text-gray-400 shrink-0 ml-2">
                                    {folder.formatted_notes || `${folder.notes_count ?? 0} Notes`}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <p className="text-[11px] text-gray-400 font-medium text-center py-2">No folders</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OtherClasses;