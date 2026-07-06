"use client";

import { useCoreLearning } from "@/hooks";
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';

const SidebarContent = ({ onClose }) => {
  const [openCategory, setOpenCategory] = useState(null);
  const [limit, setLimit] = useState(2);
  const pathname = usePathname();
  // Note: You can adjust "cheat_sheets" to exactly match your backend pathName if needed
  const { coreLearningData, isLoading, coreLearningPagination, isFetching } = useCoreLearning("cheat_sheet", { limit });
  const categories = coreLearningData || [];

  const hasMore = coreLearningPagination?.count > (coreLearningData?.length || 0);

  const handleToggle = (id) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };


  return (
    <>
      <aside className="w-full h-full border-r border-black/10 bg-white overflow-y-auto overflow-x-hidden flex flex-col">
        {/* header content */}
        <div className="border-b border-black/10 py-4 shrink-0">
          <div className="px-4 w-full flex flex-col items-start gap-4">
            <h4 className="text-[#424242] font-semibold text-lg">Cheat Sheets</h4>
            {/* search cheat sheets */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6D6D6D] w-5.5 h-5.5" />
              <input
                type="text"
                placeholder="Search Sheets"
                className="w-full pl-11 pr-4 py-2.5 border border-[#DFE1E7] rounded-lg text-sm outline-0"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="p-4 space-y-3">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!isLoading && categories?.length === 0 && (
            <p className="text-sm text-[#6D6D6D] text-center py-8">
              No cheat sheets available.
            </p>
          )}

          {categories?.map((category) => {
            const isOpen = openCategory === category.id;

            return (
              <div
                key={category?.id}
                className="bg-[#F8F8F8] rounded-xl overflow-hidden"
              >
                {/* Category Header */}
                <button
                  onClick={() => handleToggle(category?.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[#F3F3F3] transition"
                >
                  <div className="flex items-center gap-3">
                    {/* Arrow */}
                    <div>
                      {isOpen ? (
                        <ChevronDown className="w-5 h-5 text-[#4B5563]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[#4B5563]" />
                      )}
                    </div>

                    {/* Icon */}
                    <div className="w-10 h-10 shrink-0 rounded-md bg-[#E5E7EB] flex items-center justify-center overflow-hidden border border-[#EEEEEE]">
                      {category?.cover ? (
                        <Image
                          src={category.cover.startsWith('http') ? category.cover : `${process.env.NEXT_PUBLIC_BASE_URL || ''}${category.cover}`}
                          alt={category.title}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-[#6D6D6D]">
                          {category?.title?.charAt(0) || "C"}
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <div>
                      <h5 className="text-sm font-semibold text-[#424242]">
                        {category?.title ?? ""}
                      </h5>

                      {/* Progress Section */}
                      <div className="flex items-center gap-2 mt-1">

                        {/* Progress Bar */}
                        <div className="w-16 h-1.5 bg-[#D9D9D9] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF6B8A] rounded-full"
                            style={{ width: `${category?.progress?.progress_percentage || '0%'}` }}
                          />
                        </div>

                        {/* Topics */}
                        <p className="text-xs text-[#7A7A7A]">
                          {category?.progress?.completed_contents || 0}/{category?.progress?.total_contents || 0} Topics
                        </p>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Subcategories */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ml-8 pr-2 ${isOpen
                    ? "grid-rows-[1fr] opacity-100 py-3"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-2">
                      {category?.contents?.map(
                        (subcategory, index) => {
                          const isActive = pathname.includes(`/cheat-sheets/${subcategory?.id}`);
                          return (
                            <Link
                              href={`/dashboard/cheat-sheets/${subcategory?.id}`}
                              key={index}
                              onClick={() => {
                                if (onClose) onClose();
                              }}
                              className={`w-full border rounded-md px-3 py-2 flex items-center justify-between transition ${isActive
                                ? "bg-[#FF6B8A]/10 border-[#FF6B8A]/30 text-[#FF6B8A]"
                                : "bg-white border-[#EEEEEE] text-[#4A4A4A] hover:bg-[#FAFAFA]"
                                }`}
                            >
                              <span className="text-sm font-medium">
                                {subcategory?.content_name ?? ""}
                              </span>
                              <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#FF6B8A]' : 'text-[#6B7280]'}`} />
                            </Link>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Load More Button */}
          {!isLoading && hasMore && (
              <div className="flex justify-center pt-4 pb-2">
                  <button
                      onClick={() => setLimit(prev => prev + 2)}
                      disabled={isFetching}
                      className="px-4 py-2 bg-primary/80 text-white rounded text-sm font-medium hover:bg-primary/60 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                      {isFetching ? "Loading..." : "See More"}
                  </button>
              </div>
          )}
        </div>
      </aside>
    </>
  );
};

const CheatSheetsSidebar = ({ onClose }) => {
  return (
    <Suspense fallback={<div className="w-full h-full bg-white border-r border-black/10"></div>}>
      <SidebarContent onClose={onClose} />
    </Suspense>
  );
};

export default CheatSheetsSidebar;
