"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCoreLearning } from '@/hooks';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BodySystemList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const offset = (currentPage - 1) * itemsPerPage;

  const { coreLearningData, coreLearningPagination, isLoading } = useCoreLearning("body_system", { limit: itemsPerPage, offset });
  
  const totalPages = coreLearningPagination?.count ? Math.ceil(coreLearningPagination.count / itemsPerPage) : 0;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  console.log("body system", coreLearningData)

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header section */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Body Systems</h1>
        <p className="text-sm text-gray-500">{coreLearningPagination?.count ?? 0} Systems</p>
      </div>

      {/* Responsive grid section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {coreLearningData?.map((system) => (
          <Link
            key={system.id}
            href={`/dashboard/body-systems/${system.id}`}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-primary transition-all duration-300 flex flex-col items-center p-4 text-center"
          >
            {/* Optimized image container */}
            <div className="relative w-full aspect-square bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center p-2">
              {system?.cover ? (
                <Image
                  src={system?.cover}
                  alt={system?.title}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-xl group-hover:scale-105 transition-transform duration-300" />
              )}
            </div>

            {/* Title section */}
            <h3 className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors leading-tight">
              {system?.subtitle ?? ""}
            </h3>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              const isActive = currentPage === pageNumber;
              
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BodySystemList;