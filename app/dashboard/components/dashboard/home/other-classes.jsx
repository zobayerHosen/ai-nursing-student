"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, BookOpen, ClipboardList, PieChart, Library, Folder } from 'lucide-react';

const OtherClasses = () => {
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
                    <span className="text-[32px] font-bold text-gray-900 leading-none block">5</span>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Active Courses</p>
                </div>
                
                <div className="mt-auto">
                    <Link href="/dashboard/classes" className="text-[12px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                        View All <ChevronRight className="w-3 h-3 ml-0.5" />
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
                    <span className="text-[32px] font-bold text-gray-900 leading-none block">7</span>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Due Soon</p>
                </div>
                
                <div className="mt-auto">
                    <Link href="/dashboard/assignments" className="text-[12px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                        View All <ChevronRight className="w-3 h-3 ml-0.5" />
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
                    <span className="text-[32px] font-bold text-gray-900 leading-none block">5</span>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1.5">Cumulative</p>
                </div>
                
                <div className="mt-auto">
                    <Link href="/dashboard/gpa" className="text-[12px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                        View Details <ChevronRight className="w-3 h-3 ml-0.5" />
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
                        View All <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                </div>
                
                <div className="flex flex-col gap-3.5 flex-1 justify-center mt-1">
                    <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <Folder className="w-4 h-4 text-[#10B981] fill-[#10B981]" />
                            <span className="text-[12.5px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Medical Surgical</span>
                        </div>
                        <span className="text-[11px] font-medium text-gray-400">34 Notes</span>
                    </div>
                    <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <Folder className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                            <span className="text-[12.5px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Pharmacy</span>
                        </div>
                        <span className="text-[11px] font-medium text-gray-400">15 Notes</span>
                    </div>
                    <div className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-2.5">
                            <Folder className="w-4 h-4 text-[#F43F5E] fill-[#F43F5E]" />
                            <span className="text-[12.5px] font-bold text-gray-700 group-hover:text-gray-900 transition-colors">Fundamentals</span>
                        </div>
                        <span className="text-[11px] font-medium text-gray-400">17 Notes</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OtherClasses;