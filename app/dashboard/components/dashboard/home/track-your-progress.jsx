"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Calendar, CheckCircle2, PlayCircle, Lock, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const trackProgressData = [
    {
        type: 'qbank',
        title: 'Q-Bank Progress',
        link: '/dashboard/qbank',
        subtitle: '2,017 questions across 12 topics',
        action: 'Build a custom test',
        chart: {
            percentage: 35,
            segments: [
                { color: '#1E3A8A', percentage: 35 },
                { color: '#F43F5E', percentage: 15 },
                { color: '#DBEAFE', percentage: 50 },
            ]
        },
        stats: [
            { label: 'Correct', desc: 'Got it right first try', value: '485', total: '1,517', color: '#1E3A8A' },
            { label: 'Incorrect', desc: 'Worth a re-attempt', value: '215', total: '1,517', color: '#F43F5E' },
            { label: 'Untouched', desc: 'Still to attempt', value: '485', total: '1,517', color: '#DBEAFE' },
        ]
    },
    {
        type: 'nclex',
        title: 'NCLEX NGN Prep',
        link: '/dashboard/nclex-rn',
        subtitle: '2/5 Completed',
        chart: {
            percentage: 35,
            segments: [
                { color: '#F43F5E', percentage: 35 },
                { color: '#DBEAFE', percentage: 65 },
            ]
        },
        exams: [
            { name: 'Exam 1', status: 'completed', score: '78%', date: 'JAN 4, 2026' },
            { name: 'Exam 2', status: 'completed', score: '78%', date: 'JAN 4, 2026' },
            { name: 'Exam 3', status: 'start', actionText: 'Start' },
            { name: 'Exam 4', status: 'locked', actionText: 'Locked' },
            { name: 'Exam 5', status: 'locked', actionText: 'Locked' },
        ]
    },
    {
        type: 'flashcard',
        title: 'Flashcards',
        link: '/dashboard/flashcards',
        subtitle: 'SRS health across your decks',
        chart: {
            percentage: 35,
            segments: [
                { color: '#1E3A8A', percentage: 35 },
                { color: '#DBEAFE', percentage: 65 },
            ]
        },
    }
];

const upcomingTasks = [
    { title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#1E3A8A", tagColor: "#F43F5E", tagBg: "#FFE4E6" },
    { title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#F43F5E", tagColor: "#F43F5E", tagBg: "#FFE4E6" },
    { title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#22C55E", tagColor: "#EAB308", tagBg: "#FEF9C3" },
    { title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#22C55E", tagColor: "#EAB308", tagBg: "#FEF9C3" },
    { title: "Patient Assessment Lab", subtitle: "NUR 201 • 50 pts", time: "1d", dotColor: "#A855F7", tagColor: "#9CA3AF", tagBg: "#F3F4F6" },
];

const MultiDonut = ({ percentage, segments }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;
    
    return (
        <div className="relative w-24 h-24 flex shrink-0 items-center justify-center">
            <svg className="transform -rotate-90 w-24 h-24">
                {segments.map((seg, i) => {
                    const strokeDasharray = `${(seg.percentage / 100) * circumference} ${circumference}`;
                    const rotate = currentOffset;
                    currentOffset += (seg.percentage / 100) * 360;
                    return (
                        <circle
                            key={i}
                            cx="48" cy="48" r={radius}
                            stroke={seg.color}
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={strokeDasharray}
                            className="transition-all duration-500"
                            style={{ transformOrigin: 'center', transform: `rotate(${rotate}deg)` }}
                        />
                    );
                })}
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-[#2C5F8D]">{percentage}%</span>
                <span className="text-[10px] font-medium text-gray-500 leading-tight">Completed</span>
            </div>
        </div>
    );
};

const TracYourProgress = () => {
    return (
        <section className='w-full max-w-full flex flex-col xl:flex-row items-stretch gap-6 overflow-hidden'>
            {/* Left Part: Track Your Progress */}
            <div className="flex-1 min-w-0 max-w-full rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] p-6 relative">
                <h2 className="text-[15px] font-bold text-gray-800 mb-5">Track Your Progress</h2>
                
                <div className="relative -mx-2 px-2">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 16 },
                            768: { slidesPerView: 2, spaceBetween: 16 },
                            1200: { slidesPerView: 2, spaceBetween: 20 }
                        }}
                        className="w-full max-w-full"
                    >
                        {trackProgressData.map((data, index) => (
                            <SwiperSlide key={index} className="h-auto w-fit!">
                                <div className="bg-[#FBFBFB] border border-[#E2E8F0] rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] h-full flex flex-col min-h-[260px] w-[350px]">
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <Link href={data.link} className="text-lg font-bold text-[#2C5F8D] hover:underline">{data.title}</Link>
                                            {data.type !== 'nclex' && data.subtitle && <p className="text-xs text-gray-500 mt-1">{data.subtitle}</p>}
                                        </div>
                                        {data.action && <Link href={data.link} className="text-[11px] font-semibold text-[#2C5F8D] hover:underline flex items-center gap-0.5 mt-1">{data.action} <ChevronRight className="w-3 h-3"/></Link>}
                                        {data.type === 'nclex' && <span className="text-[11px] font-bold text-gray-700 mt-1">{data.subtitle}</span>}
                                    </div>
                                    
                                    {/* Card Content based on type */}
                                    {data.type === 'qbank' && (
                                        <div className="flex items-center gap-6 mt-2">
                                            <MultiDonut percentage={data.chart.percentage} segments={data.chart.segments} />
                                            <div className="flex flex-col gap-3 flex-1">
                                                {data.stats.map((stat, i) => (
                                                    <div key={i} className="flex items-start gap-2">
                                                        <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0" style={{ backgroundColor: stat.color }} />
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-baseline">
                                                                <span className="text-[13px] font-bold text-gray-800">{stat.label}</span>
                                                                <span className="text-[13px] font-bold text-gray-800">{stat.value}<span className="text-[10px] text-gray-400 font-normal">/{stat.total}</span></span>
                                                            </div>
                                                            <p className="text-[10px] text-gray-400 leading-tight">{stat.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {data.type === 'nclex' && (
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex flex-col gap-2.5 flex-1">
                                                {data.exams.map((exam, i) => (
                                                    <div key={i} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            {exam.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-[#2C5F8D]" />}
                                                            {exam.status === 'start' && <PlayCircle className="w-3.5 h-3.5 text-[#F43F5E] fill-[#F43F5E]/10" />}
                                                            {exam.status === 'locked' && <Lock className="w-3.5 h-3.5 text-gray-400" />}
                                                            <span className={`text-[11px] font-bold ${exam.status === 'locked' ? 'text-gray-400' : 'text-gray-700'}`}>{exam.name}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            {exam.status === 'completed' && (
                                                                <div className="flex flex-col leading-tight">
                                                                    <span className="text-[11px] font-bold text-gray-800">{exam.score}</span>
                                                                    <span className="text-[8px] text-gray-400 uppercase font-semibold">{exam.date}</span>
                                                                </div>
                                                            )}
                                                            {exam.status === 'start' && <span className="text-[11px] font-bold text-[#F43F5E] hover:underline cursor-pointer">{exam.actionText}</span>}
                                                            {exam.status === 'locked' && <span className="text-[11px] font-medium text-gray-400">{exam.actionText}</span>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex flex-col items-center pl-2 border-l border-gray-100">
                                                <MultiDonut percentage={data.chart.percentage} segments={data.chart.segments} />
                                                <p className="text-[9px] text-gray-500 font-medium text-center mt-3 max-w-[90px] leading-tight">Keep going! You're making excellent progress</p>
                                            </div>
                                        </div>
                                    )}

                                    {data.type === 'flashcard' && (
                                        <div className="flex items-center justify-center h-full pt-4">
                                           <MultiDonut percentage={data.chart.percentage} segments={data.chart.segments} />
                                        </div>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Custom Navigation */}
                    <button className="swiper-button-prev-custom absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-16 bg-[#FBFBFB] hover:bg-gray-50 shadow-[2px_0_10px_rgba(0,0,0,0.08)] flex items-center justify-center rounded-r-xl border border-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-5 h-5 text-[#2C5F8D]" />
                    </button>
                    <button className="swiper-button-next-custom absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-16 bg-[#FBFBFB]hover:bg-gray-50 shadow-[-2px_0_10px_rgba(0,0,0,0.08)] flex items-center justify-center rounded-l-xl border border-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronRight className="w-5 h-5 text-[#2C5F8D]" />
                    </button>
                </div>
            </div>

            {/* Right Part: Upcoming Tasks */}
            <div className="w-full xl:w-[32%] xl:min-w-[320px] rounded-3xl border border-[#E2E8F0] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-[18px] h-[18px] text-[#2C5F8D]" />
                        <h2 className="text-[15px] font-bold text-[#2C5F8D]">Upcoming Tasks</h2>
                    </div>
                    <Link href="/dashboard/calendars-tool" className="text-[11px] font-bold text-[#2C5F8D] hover:underline flex items-center">
                        View Calendar <ChevronRight className="w-3 h-3 ml-0.5"/>
                    </Link>
                </div>
                
                <div className="flex flex-col gap-5 flex-1 justify-center">
                    {upcomingTasks.map((task, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: task.dotColor }} />
                                <div>
                                    <h4 className="text-[13px] font-bold text-gray-800 leading-tight">{task.title}</h4>
                                    <p className="text-[10px] font-medium text-gray-500 mt-0.5">{task.subtitle}</p>
                                </div>
                            </div>
                            <span 
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: task.tagBg, color: task.tagColor }}
                            >
                                {task.time}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TracYourProgress;