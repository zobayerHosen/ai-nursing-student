"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCoreLearning } from '@/hooks';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import dummayImg from "@/public/med_dumm.png";

const BodySystemCard = ({ system }) => {
  const [imgSrc, setImgSrc] = useState(system?.cover || dummayImg);
  const [isImgLoading, setIsImgLoading] = useState(true);

  useEffect(() => {
    setImgSrc(system?.cover || dummayImg);
    setIsImgLoading(true);
  }, [system?.cover]);

  return (
    <Link
      href={`/dashboard/body-systems/${system.id}`}
      className="group bg-white rounded-2xl border border-gray-200 hover:border-primary transition-all duration-300 flex flex-col items-center p-4 text-center"
    >
      {/* Optimized image container with skeleton placeholder */}
      <div className="relative w-37.5 h-37.5 bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center p-2">
        {isImgLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center z-10 border border-gray-100">
            <ImageIcon className="w-8 h-8 text-gray-300" />
          </div>
        )}
        <Image
          src={imgSrc || dummayImg}
          alt={system?.title || "Body System"}
          width={200}
          height={200}
          unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
          className={`w-full h-full group-hover:scale-105 transition-all duration-300 object-contain ${isImgLoading ? 'opacity-0' : 'opacity-100'
            }`}
          onLoad={() => setIsImgLoading(false)}
          onError={() => {
            setImgSrc(dummayImg);
            setIsImgLoading(false);
          }}
        />
      </div>

      {/* Title section */}
      <h3 className="text-start w-full text-sm font-medium text-black group-hover:text-primary transition-colors leading-tight">
        {system?.title ?? "N/A"}
      </h3>
      <p className="text-start w-full text-xs text-[#64748B] mt-1">{system?.subtitle ?? "N/A"}</p>
    </Link>
  );
};

const BodySystemSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 animate-pulse">
      {/* Header section skeleton */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center p-4"
          >
            <div className="w-37.5 h-37.5 bg-gray-100 rounded-xl mb-4 flex items-center justify-center border border-gray-100">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2" />
            <div className="w-3/4 self-start h-3 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

const BodySystemList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const offset = (currentPage - 1) * itemsPerPage;

  const { coreLearningData, coreLearningPagination, isLoading } = useCoreLearning("body_system", { limit: itemsPerPage, offset });

  const totalPages = coreLearningPagination?.count ? Math.ceil(coreLearningPagination.count / itemsPerPage) : 0;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <BodySystemSkeleton />;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header section */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.99941 4.375C9.4819 4.3529 8.99417 4.12683 8.64283 3.74621C8.29149 3.3656 8.10511 2.86138 8.12441 2.34375C8.10511 1.82612 8.29149 1.3219 8.64283 0.941286C8.99417 0.560668 9.4819 0.334604 9.99941 0.3125C10.5169 0.334604 11.0046 0.560668 11.356 0.941286C11.7073 1.3219 11.8937 1.82612 11.8744 2.34375C11.8937 2.86138 11.7073 3.3656 11.356 3.74621C11.0046 4.12683 10.5169 4.3529 9.99941 4.375ZM9.99941 0.9375C9.64776 0.959803 9.31914 1.12006 9.08505 1.38342C8.85096 1.64677 8.73033 1.99191 8.74941 2.34375C8.73033 2.69559 8.85096 3.04073 9.08505 3.30408C9.31914 3.56744 9.64776 3.7277 9.99941 3.75C10.3511 3.7277 10.6797 3.56744 10.9138 3.30408C11.1479 3.04073 11.2685 2.69559 11.2494 2.34375C11.2685 1.99191 11.1479 1.64677 10.9138 1.38342C10.6797 1.12006 10.3511 0.959803 9.99941 0.9375Z" fill="#64748B" />
            <path d="M11.7188 19.6875C11.4667 19.6871 11.2225 19.5999 11.0272 19.4405C10.8319 19.2811 10.6975 19.0594 10.6466 18.8125C10.6413 18.7853 10.2766 16.9916 10 15.6316C9.72344 16.9916 9.35875 18.785 9.35344 18.8119C9.2998 19.078 9.14913 19.3146 8.93071 19.4758C8.7123 19.637 8.44174 19.7112 8.17165 19.684C7.90156 19.6568 7.65124 19.5302 7.46935 19.3287C7.28746 19.1271 7.187 18.8652 7.1875 18.5938V10.9156C7.17406 10.9666 7.16062 11.0163 7.1475 11.0653C6.75219 12.5447 6.51344 13.4375 5.625 13.4375C5.00281 13.4375 4.6875 13.0169 4.6875 12.1875C4.6875 11.8337 5.78125 6.90125 6.65406 6.02906C6.98812 5.695 7.68313 5 10 5C12.3169 5 13.0119 5.695 13.3459 6.02906C14.2188 6.90125 15.3125 11.8337 15.3125 12.1875C15.3125 13.0169 14.9972 13.4375 14.375 13.4375C13.4866 13.4375 13.2478 12.5447 12.8525 11.0653C12.8394 11.0163 12.8259 10.9666 12.8125 10.9156V18.5938C12.8125 18.8838 12.6973 19.162 12.4921 19.3671C12.287 19.5723 12.0088 19.6875 11.7188 19.6875ZM11.2594 18.6875C11.2825 18.8014 11.3471 18.9027 11.4407 18.9716C11.5343 19.0406 11.6502 19.0723 11.7659 19.0606C11.8815 19.0489 11.9887 18.9947 12.0666 18.9084C12.1445 18.8221 12.1876 18.71 12.1875 18.5938V8.75C12.1874 8.67575 12.2138 8.60391 12.2619 8.54734C12.31 8.49078 12.3767 8.45318 12.45 8.4413C12.5233 8.42942 12.5984 8.44402 12.6619 8.48249C12.7254 8.52096 12.7732 8.58079 12.7966 8.65125C13.0884 9.52625 13.2925 10.2903 13.4566 10.9041C13.81 12.2275 13.9828 12.8125 14.375 12.8125C14.5909 12.8125 14.6875 12.7222 14.6875 12.1875C14.6597 11.7009 13.5834 7.15031 12.9041 6.47094C12.6294 6.19656 12.0581 5.625 10 5.625C7.94187 5.625 7.37063 6.19656 7.09594 6.47094C6.41656 7.15031 5.34031 11.7009 5.3125 12.1934C5.3125 12.7222 5.40906 12.8125 5.625 12.8125C6.01719 12.8125 6.19 12.2275 6.54344 10.9041C6.7075 10.2903 6.91156 9.52688 7.20344 8.65125C7.22685 8.58079 7.27458 8.52096 7.33809 8.48249C7.40159 8.44402 7.47672 8.42942 7.55001 8.4413C7.62331 8.45318 7.68997 8.49078 7.73807 8.54734C7.78617 8.60391 7.81255 8.67575 7.8125 8.75V18.5938C7.81238 18.71 7.85546 18.8221 7.93338 18.9084C8.01129 18.9947 8.11848 19.0489 8.23414 19.0606C8.3498 19.0723 8.46567 19.0406 8.55926 18.9716C8.65286 18.9027 8.71749 18.8014 8.74062 18.6875L8.7525 18.69C8.77094 18.5381 8.8175 18.3091 8.88969 17.9547L9.69375 14C9.70809 13.9294 9.74642 13.8658 9.80223 13.8202C9.85805 13.7746 9.92792 13.7497 10 13.7497C10.0721 13.7497 10.142 13.7746 10.1978 13.8202C10.2536 13.8658 10.2919 13.9294 10.3062 14L11.1103 17.955C11.1825 18.3094 11.2291 18.5384 11.2475 18.6903L11.2594 18.6875Z" fill="#64748B" />
            <path d="M9.86031 9.96875C9.6825 9.87812 8.125 9.06844 8.125 7.99094C8.125 7.29219 8.4825 6.875 9.08094 6.875C9.25523 6.88168 9.4264 6.92333 9.58429 6.99747C9.74217 7.0716 9.88354 7.17672 10 7.30656C10.1165 7.17672 10.2578 7.0716 10.4157 6.99747C10.5736 6.92333 10.7448 6.88168 10.9191 6.875C11.5175 6.875 11.875 7.29219 11.875 7.99094C11.875 9.06844 10.3175 9.87813 10.1397 9.96719C10.0964 9.98911 10.0487 10.0007 10.0002 10.0009C9.9517 10.0012 9.90381 9.99018 9.86031 9.96875ZM9.08094 7.5C8.965 7.5 8.75 7.5 8.75 7.99094C8.75 8.51406 9.56656 9.08469 10 9.33281C10.4334 9.08594 11.25 8.51406 11.25 7.99094C11.25 7.5 11.035 7.5 10.9191 7.5C10.5509 7.5 10.2741 7.9625 10.2716 7.96875C10.2443 8.01669 10.2048 8.05656 10.1571 8.08429C10.1094 8.11201 10.0552 8.12662 10 8.12662C9.94483 8.12662 9.89064 8.11201 9.84294 8.08429C9.79524 8.05656 9.75574 8.01669 9.72844 7.96875C9.72281 7.9575 9.44687 7.5 9.08094 7.5Z" fill="#64748B" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800">Body Systems</h1>
        </div>
        <p className="text-sm text-gray-500">{coreLearningPagination?.count ?? 0} Systems</p>
      </div>

      {/* Responsive grid section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {coreLearningData?.map((system) => (
          <BodySystemCard key={system.id} system={system} />
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
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${isActive
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