"use client";
import Image from 'next/image';
import { useBodySystem } from '@/hooks';
import {  Image as ImageIcon } from 'lucide-react';
import bodySystemsIcon from "@/public/assets/body_system_header.png";
import BodySystemCard from './body-system-card';



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

  const {
    bodySystemData,
    isLoading
  } = useBodySystem();
  const categories = bodySystemData?.categories ?? [];

  if (isLoading) {
    return <BodySystemSkeleton />;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header section */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <div className="flex items-start gap-3 mb-2">
          <div className="w-10 h-10">
            <Image
              width={40}
              height={40}
              alt='Icon'
              src={bodySystemsIcon}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Body Systems</h1>
            <p className="text-sm text-gray-600">Explore the anatomy and physiology of the {categories?.length ?? "0"} human body systems.</p>
          </div>
        </div>


      </div>

      {/* Responsive grid section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {categories?.map((system) => (
          <BodySystemCard key={system.id} system={system} />
        ))}
      </div>

    </div>
  );
};

export default BodySystemList;