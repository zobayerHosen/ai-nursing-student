"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCoreLearning } from '@/hooks';


const BodySystemList = () => {
  const { coreLearningData, isLoading } = useCoreLearning("body_system");
  console.log("Body system", coreLearningData)

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header section */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Body Systems</h1>
        <p className="text-sm text-gray-500">{coreLearningData?.[0]?.contents?.length ?? 0} Systems</p>
      </div>

      {/* Responsive grid section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {coreLearningData?.[0]?.contents?.map((system) => (
          <Link
            key={system.id}
            href={`/dashboard/body-systems/${system.id}`}
            className="group bg-white rounded-2xl shadow-sm border border-transparent hover:border-primary hover:shadow-md transition-all duration-300 flex flex-col items-center p-4 text-center"
          >
            {/* Optimized image container */}
            <div className="relative w-full aspect-square bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center p-2">
              {system.content_cover_url ? (
                <Image
                  src={system.content_cover_url}
                  alt={system.content_name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-xl" />
              )}
            </div>

            {/* Title section */}
            <h3 className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors leading-tight">
              {system.content_name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BodySystemList;