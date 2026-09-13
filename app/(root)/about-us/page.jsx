"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Zap,
  Activity,
  GraduationCap,
} from "lucide-react";
import HomeHeader from "../components/home-header";
import miniLogo from "@/public/assets/mini_logo.png";
import succeedImg from "@/public/assets/succeedImg01.png";

const stats = [
  { value: "40K+", label: "Active Nursing Students", icon: Users },
  { value: "95%", label: "NCLEX Pass Rate", icon: Award },
  { value: "500K+", label: "Questions Practiced", icon: CheckCircle2 },
  { value: "24/7", label: "CARA AI Guidance", icon: Sparkles },
];

const coreValues = [
  {
    icon: Brain,
    title: "Deep Reasoning Over Rote",
    description:
      "We replace blind memorization with fundamental physiological logic, empowering nurses to think critically under pressure.",
    color: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-600",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Precision",
    description:
      "CARA AI adapts to your individual learning pace, pinpointing knowledge gaps and explaining the exact rationale behind every NGN question.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "NGN Standard Excellence",
    description:
      "Every case study, matrix, cloze, and bowtie question is crafted to strict Next Generation NCLEX standards by clinical educators.",
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-600",
  },
  {
    icon: HeartHandshake,
    title: "Student-First Empathy",
    description:
      "Nursing school is demanding. We design stress-reducing, intuitive tools that build confidence rather than anxiety.",
    color: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-600",
  },
];

const pillars = [
  {
    number: "01",
    title: "Root-Level Understanding",
    subtitle: "Understanding Pathophysiology",
    description:
      "Instead of memorizing thousands of disconnected facts, STEMRN connects diseases to core anatomy and pharmacological mechanisms so answers become intuitive.",
  },
  {
    number: "02",
    title: "CARA AI Tutor 24/7",
    subtitle: "Real-Time Adaptive Guidance",
    description:
      "Ask CARA any clinical question at 2 AM. Get clear, step-by-step explanations tailored to your learning style and NGN scoring metrics.",
  },
  {
    number: "03",
    title: "Next Gen Exam Mastery",
    subtitle: "Realistic Case Simulations",
    description:
      "Train on exact Next Generation NCLEX clinical judgment measurement model (NCJMM) items—Extended Drag & Drop, Matrix, Cloze, and Bowtie.",
  },
  {
    number: "04",
    title: "Continuous Progress Intelligence",
    subtitle: "Predictive Pass Readiness",
    description:
      "Real-time readiness analytics measure your readiness score across all 8 NCLEX client needs categories so you sit for the exam with 100% confidence.",
  },
];

const teamMembers = [
  {
    name: "Dr. Sarah Jenkins, DNP, RN",
    role: "Chief Nursing Officer & Co-Founder",
    bio: "15+ years in critical care education & NGN curriculum design. Passionate about empowering the next generation of bedside nurses.",
    badge: "Clinical Lead",
  },
  {
    name: "Marcus Vance",
    role: "Chief AI Architect",
    bio: "Former AI researcher specializing in personalized learning models. Architect behind CARA's medical reasoning engine.",
    badge: "AI & Tech Lead",
  },
  {
    name: "Elena Rostova, MSN, RN, CNE",
    role: "Director of Item Writing",
    bio: "Nurse educator who has authored over 3,000 NGN-style questions used by top nursing programs nationwide.",
    badge: "Curriculum Lead",
  },
];

export default function AboutUsPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#2C5F8D] selection:text-white">
      {/* Navigation Header */}
      <HomeHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1C2534] text-white py-16 sm:py-20 lg:py-28">
        {/* Decorative background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#2C5F8D]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#0d9488]/20 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2C5F8D]/40 border border-[#4d92c0]/30 text-xs sm:text-sm font-semibold tracking-wide text-sky-200 mb-6"
            >
              <Image
                src={miniLogo}
                alt="STEMRN Mini Logo"
                width={20}
                height={20}
                className="w-4 h-4 object-contain"
              />
              OUR STORY & MISSION
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white"
            >
              Transforming NCLEX Prep Through{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400">
                Deep Reasoning & AI
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal"
            >
              STEMRN was created to eliminate low-yield memorization and stress. We combine 
              clinical rigor with CARA AI tutoring to build true clinical judgment for NCLEX success and lifelong nursing careers.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2C5F8D] to-[#234d73] hover:from-[#3571a8] hover:to-[#2c5f8d] text-white font-semibold text-base shadow-lg shadow-blue-900/30 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Explore Prep Plans
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base transition-all duration-200"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>

          {/* Stats Bar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8"
          >
            {stats.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="text-center p-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/20 text-sky-300 mb-3">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Story & Philosophy Section */}
      <section className="py-16 sm:py-24 bg-white text-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-50 text-[#2C5F8D] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                Why We Built STEMRN
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Built for Nursing Students Who Mean Business.
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Traditional NCLEX prep platforms inundate students with tens of thousands of flashcards 
                and static rationale PDFs. But when the Next Generation NCLEX introduces complex clinical case 
                studies, rote memory falls short.
              </p>

              <p className="text-slate-600 text-base leading-relaxed">
                We engineered STEMRN around the <strong>4 Roots of Success</strong>—a framework built on pathophysiological understanding, real-time AI tutor intervention, realistic NGN item types, and data-driven readiness scoring.
              </p>

              <div className="pt-2 space-y-3">
                {[
                  "2,000+ NGN-style items (Bowtie, Matrix, Cloze, Extended Multiple Response)",
                  "24/7 CARA AI tutor explaining step-by-step clinical rationale",
                  "Comprehensive body systems, ECG mastery, and lecture note AI conversion",
                  "95% pass rate verified across thousands of NCLEX test takers",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-700 text-sm sm:text-base font-medium">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-gradient-to-b from-slate-100 to-slate-200 p-3 sm:p-4">
                <Image
                  src={succeedImg}
                  alt="STEMRN Platform Illustration"
                  width={600}
                  height={450}
                  className="w-full h-auto rounded-2xl object-cover"
                  priority
                />
                
                {/* Floating Badge overlay */}
                <div className="absolute bottom-8 left-8 bg-[#1C2534]/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-xl max-w-xs hidden sm:block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Root Knowledge</div>
                      <div className="text-xs text-slate-300">Real NCLEX Results</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 4 Pillars / Method */}
      <section className="py-16 sm:py-24 bg-slate-100/70 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 text-xs font-bold tracking-wider uppercase mb-3">
              THE STEMRN METHOD
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              4 Pillars of NCLEX Excellence
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Our structured framework guides nursing students from clinical fundamentals to exam mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#2C5F8D]/30 group-hover:text-[#2C5F8D] transition-colors">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-[#2C5F8D] flex items-center justify-center group-hover:bg-[#2C5F8D] group-hover:text-white transition-colors">
                      <Activity className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#2C5F8D] mb-4">
                    {pillar.subtitle}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              What Drives Our Team
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              The principles that shape our clinical question bank, AI algorithms, and student support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, idx) => {
              const IconC = value.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 sm:p-8 bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}
                  >
                    <IconC className={`w-6 h-6 ${value.iconColor}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Leadership / Advisory Board */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-[#2C5F8D] text-xs font-bold tracking-wider uppercase mb-3">
              EXPERT LEADERSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Built by Nurse Educators & AI Pioneers
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Our team brings decades of clinical bedside practice, nursing education, and machine learning expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-[#2C5F8D] text-xs font-semibold">
                      {member.badge}
                    </span>
                    <GraduationCap className="w-6 h-6 text-slate-400" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-sky-700 mb-4">
                    {member.role}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 sm:py-20 bg-[#1C2534] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2534] via-[#2C5F8D]/40 to-[#1C2534]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to Pass the NCLEX on Your First Try?
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join 40,000+ nursing students who study smarter with CARA AI tutor and exam-standard Next Gen case studies.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#2C5F8D] hover:bg-[#3571a8] text-white font-bold text-base shadow-xl transition-all duration-200"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-base transition-all duration-200"
            >
              Start 7-Day Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
