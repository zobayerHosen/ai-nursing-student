"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { categoriesData } from './stem-toons-dummy-data';

const StemToonsSidebar = () => {
  const [openCategory, setOpenCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleToggle = (id) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  // Filter categories and subcategories based on search query
  const filteredCategories = categoriesData?.map(category => {
    const matchingSub = category?.subcategories?.filter(sub =>
      sub?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );
    const categoryMatches = category?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    if (categoryMatches || matchingSub?.length > 0) {
      return {
        ...category,
        subcategories: matchingSub?.length > 0 ? matchingSub : category?.subcategories,
        isMatching: true
      };
    }
    return { ...category, isMatching: false };
  }).filter(c => c?.isMatching);

  return (
    <aside className="w-82.5 border-r border-black/10 bg-white overflow-hidden sticky top-0 left-0 hidden md:block">
      {/* Search Header */}
      <div className="border-b border-black/10 py-4 ">
        <div className="px-4 w-full flex flex-col items-start gap-4">
          <h4 className="text-[#424242] font-semibold text-lg">Stem Toons</h4>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D] w-5.5 h-5.5" />
            <input
              type="text"
              placeholder="Search Topics"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-[#DFE1E7] rounded-lg text-sm outline-0"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 space-y-3">
        {filteredCategories?.map((category) => {
          const isOpen = openCategory === category.id;

          return (
            <div
              key={category.id}
              className="bg-[#F8F8F8] rounded-xl overflow-hidden"
            >
              {/* Category Header Button */}
              <button
                onClick={() => handleToggle(category.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-[#F3F3F3] transition"
              >
                <div className="flex items-center gap-3">
                  <div>
                    {isOpen ? (
                      <ChevronDown className="w-5 h-5 text-[#4B5563]" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-[#4B5563]" />
                    )}
                  </div>
                  <div>
                    {category?.icon ?? ""}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#424242] leading-tight">
                      {category?.title ?? ""}
                    </h5>
                    <p className="text-[11px] text-[#7A7A7A]">
                      {category?.topics ?? ""} Topics
                    </p>
                  </div>
                </div>
              </button>

              {/* Subcategories (Topics) */}
              <div
                className={`grid transition-all duration-300 ease-in-out ml-8 pr-2 ${isOpen
                  ? "grid-rows-[1fr] opacity-100 py-3"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2">
                    {category?.subcategories?.map((subcategory) => {
                      const isActive = pathname.includes(`/stem-toons/${subcategory?.slug}`);
                      return (
                        <Link
                          href={`/dashboard/stem-toons/${subcategory?.slug}`}
                          key={subcategory?.slug}
                          className={`w-full border rounded-md px-3 py-2 flex items-center justify-between transition ${isActive
                            ? "bg-[#FF6B8A]/10 border-[#FF6B8A]/30 text-[#FF6B8A]"
                            : "bg-white border-[#EEEEEE] text-[#4A4A4A] hover:bg-[#FAFAFA]"
                            }`}
                        >
                          <span className="text-sm font-medium">
                            {subcategory?.title ?? ""}
                          </span>
                          <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#FF6B8A]' : 'text-[#6B7280]'}`} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default StemToonsSidebar;
