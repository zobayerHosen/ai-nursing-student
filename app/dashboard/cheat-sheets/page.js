"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCheatSheetsGrid } from './components/cheat-sheets-dummy-data';

export default function CheatSheetsPage() {
  const sheets = getCheatSheetsGrid();

  return (
    <div className="w-full">
      {/* Top Header / Breadcrumbs */}
      <div className="flex items-center justify-between mb-8">
        <nav>
          <ol className="flex items-center space-x-2 text-sm text-[#7A7A7A]">
            <li>
              <span className="text-[#2C5F8D] font-medium">Dashboard</span>
            </li>
            <li><span>/</span></li>
            <li className="text-[#424242] font-semibold">Cheat Sheets</li>
          </ol>
        </nav>
      </div>

      {/* Main Title Banner */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#111827] tracking-tight">
          Fundamentals / Basic Skills
        </h1>
        <p className="text-[#7A7A7A] mt-1 font-medium">
          {sheets.length} topics available
        </p>
      </div>

      {/* Grid of Cheat Sheets Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sheets?.map((sheet) => {
          return (
            <Link
              key={sheet.id}
              href={`/dashboard/cheat-sheets/${sheet.slug}`}
              className="group bg-white rounded-2xl border border-[#EEEEEE] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col cursor-pointer"
            >
              {/* Sheet Image Header */}
              <div className="relative w-full h-48 bg-slate-50 overflow-hidden border-b border-[#F5F5F5]">
                <Image
                  src={sheet?.image ?? ""}
                  alt={sheet?.title ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category Tag */}
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 uppercase tracking-wider ${sheet.color}`}>
                    {sheet?.category ?? ""}
                  </span>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#111827] leading-snug group-hover:text-[#2C5F8D] transition-colors line-clamp-2">
                    {sheet?.title ?? ""}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-[#7A7A7A] mt-3 line-clamp-2 leading-relaxed">
                  {sheet?.description ?? ""}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}