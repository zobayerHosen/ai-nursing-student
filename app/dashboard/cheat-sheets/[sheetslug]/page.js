"use client";

import React, { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, Share2, CheckCircle, ArrowLeft, ZoomIn } from 'lucide-react';
import { getCheatSheetBySlug } from '../components/cheat-sheets-dummy-data';

export default function CheatSheetDetailsPage({ params }) {
  const resolvedParams = use(params);
  const sheetslug = resolvedParams?.sheetslug;
  const baseSlug = sheetslug?.replace(/-\d+$/, '');
  const sheet = getCheatSheetBySlug(baseSlug);

  const [isSaved, setIsSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleComplete = () => {
    setIsCompleted(!isCompleted);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (!sheet) {
    return (
      <div className="p-10 text-rose-500 min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="bg-white p-8 rounded-2xl border border-rose-100 shadow-sm text-center">
          <h2 className="text-2xl font-semibold mb-2">Cheat Sheet Not Found</h2>
          <p className="text-[#7A7A7A]">The Cheat Sheet details you are looking for do not exist.</p>
          <Link href="/dashboard/cheat-sheets" className="mt-4 inline-flex items-center text-sm font-semibold text-[#2C5F8D] hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cheat Sheets
          </Link>
        </div>
      </div>
    );
  }

  // UI
  return (
    <div className="w-full relative">
      {/* Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <nav>
          <ol className="flex items-center space-x-2 text-sm text-[#7A7A7A]">
            <li>
              <Link href="/dashboard/cheat-sheets" className="text-[#2C5F8D] hover:text-[#111827] font-medium transition-colors">
                Cheat Sheets
              </Link>
            </li>
            <li><span>/</span></li>
            <li className="text-[#424242] font-semibold truncate max-w-50 md:max-w-100">
              {sheet?.title ?? ""}
            </li>
          </ol>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button 
            onClick={handleSave}
            className={`px-4 py-2.5 rounded-lg border flex items-center gap-2 text-sm font-medium transition-all duration-350 cursor-pointer shadow-sm ${
              isSaved 
                ? 'bg-amber-50 border-amber-300 text-amber-600' 
                : 'bg-white border-[#E5E7EB] text-[#4A4A4A] hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-[#7A7A7A]'}`} />
            {isSaved ? 'Saved to Library' : 'Save Sheet'}
          </button>

          <button 
            onClick={handleShare}
            className="px-4 py-2.5 rounded-lg bg-white border border-[#E5E7EB] flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm"
          >
            <Share2 className="w-4 h-4 text-[#7A7A7A]" />
            Share
          </button>
        </div>
      </div>

      {/* Main Split Screen Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Large Graphic Comic Infographic */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white rounded-2xl p-4 border border-[#EEEEEE] shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
            
            {/* Hover expand indicator */}
            <button 
              onClick={() => setIsZoomed(true)} 
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow border border-[#E5E7EB] z-10 hover:scale-105 transition-transform duration-250"
              title="Zoom Infographic"
            >
              <ZoomIn className="w-5 h-5 text-[#4A4A4A]" />
            </button>

            <div className="relative w-full h-137.5 bg-slate-50 rounded-xl overflow-hidden cursor-pointer" onClick={() => setIsZoomed(true)}>
              <Image
                src={sheet?.image ?? ""}
                alt={sheet?.title ?? ""}
                fill
                className="object-contain p-2"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Study Guide Panel */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Header Title Block */}
          <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm">
            <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider ${sheet.color}`}>
              {sheet?.category ?? ""}
            </span>
            <h2 className="text-2xl font-extrabold text-[#111827] leading-tight">
              {sheet?.title ?? ""}
            </h2>
            <p className="text-sm font-semibold text-[#FF6B8A] mt-3">
              Master this for your exams & clinical rotations!
            </p>
          </div>

          {/* Section 1: Common Indications Callout */}
          <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm">
            <h3 className="text-sm font-bold text-[#2C5F8D] uppercase tracking-wider mb-4 border-b pb-2 border-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#FF6B8A] rounded-full"></span>
              Common Indications
            </h3>
            <ul className="space-y-3">
              {sheet?.details?.indications?.map((ind, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A4A4A] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B8A] mt-2 shrink-0"></span>
                  {ind}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Definition Block */}
          <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm">
            <h3 className="text-sm font-bold text-[#2C5F8D] uppercase tracking-wider mb-4 border-b pb-2 border-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#FF6B8A] rounded-full"></span>
              {sheet?.details?.definition?.title ?? ""}
            </h3>
            <p className="text-sm text-[#4A4A4A] leading-relaxed">
              {sheet?.details?.definition?.content ?? ""}
            </p>
          </div>

          {/* Section 3: Anatomy / System Parts */}
          <div className="bg-white rounded-2xl p-6 border border-[#EEEEEE] shadow-sm">
            <h3 className="text-sm font-bold text-[#2C5F8D] uppercase tracking-wider mb-4 border-b pb-2 border-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#FF6B8A] rounded-full"></span>
              {sheet?.details?.parts?.title ?? ""}
            </h3>
            <ul className="space-y-3.5">
              {sheet?.details?.parts?.items?.map((item, i) => {
                const parts = item?.split(':');
                return (
                  <li key={i} className="text-sm text-[#4A4A4A] leading-relaxed">
                    {parts?.length > 1 ? (
                      <>
                        <strong className="text-[#111827] font-semibold">{parts?.[0]}:</strong>
                        {parts?.slice(1)?.join(':')}
                      </>
                    ) : (
                      item
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section 4: Nursing Assessment (Highlighted Callout Box) */}
          <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100 shadow-sm">
            <h3 className="text-sm font-bold text-rose-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#FF6B8A] rounded-full animate-pulse"></span>
              Nursing Assessment & Interventions
            </h3>
            <p className="text-sm text-rose-950 leading-relaxed font-medium">
              {sheet?.details?.assessment ?? ""}
            </p>
          </div>

        </div>
      </div>

      {/* Lightbox / Zoom Dialog Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-9999 flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <div className="relative w-full max-w-4xl h-[90vh] max-h-200">
            <Image
              src={sheet?.image}
              alt={sheet?.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};