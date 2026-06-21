"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { FaVideoSlash } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useGetModules, useGetModuleById } from "@/hooks";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

export default function VideoLessonsPage() {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("moduleId");

  const { modulesData, isLoading: isModulesLoading } = useGetModules();
  const {
    moduleData,
    isLoading: isModuleLoading,
    videoProgress,
  } = useGetModuleById(moduleId);

  const modules = modulesData?.data || [];
  const currentModule = moduleData?.data || null;

  // Fallback: if no module selected, use the first module from the list
  const activeModule =
    currentModule ||
    (moduleId ? null : modules?.length > 0 ? modules[0] : null);

  const videos = activeModule?.videos || [];
  const moduleTitle = activeModule?.title || "Video Lessons";
  const videoCount = videos?.length || 0;

  if (isModulesLoading) {
    return (
      <div className="w-full min-h-125 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="mb-6 bg-white rounded-xl p-6 shadow-sm border border-[#F2F2F2]">
        <h1 className="text-3xl font-bold text-[#2A2A2A] mb-2">
          {moduleTitle ?? ""}
        </h1>
        <p className="text-[#6D6D6D] text-sm mb-6">
          {videoCount} video{videoCount !== 1 ? "s" : ""} • Animated explainers
          by Nurse Cara
        </p>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <button className="px-4 py-1.5 bg-[#2A2A2A] text-white rounded-full text-sm font-medium whitespace-nowrap">
            All {videoCount ?? ""}
          </button>
          <button className="px-4 py-1.5 bg-[#F2F2F2] text-[#6D6D6D] rounded-full text-sm font-medium whitespace-nowrap">
            In progress {videoProgress?.in_progress_count ?? "0"}
          </button>
          <button className="px-4 py-1.5 bg-[#F2F2F2] text-[#6D6D6D] rounded-full text-sm font-medium whitespace-nowrap">
            Watched {videoProgress?.watched_count ?? "0"}
          </button>
          <button className="px-4 py-1.5 bg-[#F2F2F2] text-[#6D6D6D] rounded-full text-sm font-medium whitespace-nowrap">
            Not started {videoCount}
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isModuleLoading ? (
          <>
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-[#F2F2F2] animate-pulse"
              >
                <div className="aspect-video bg-gray-200" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </>
        ) : videos?.length > 0 ? (
          videos?.map((video) => (
            <Link
              href={`/dashboard/video-lessons/${video.id}`}
              key={video.id}
              className="bg-white rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow border border-[#F2F2F2]"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video overflow-hidden bg-[#F2F2F2]">
                {video?.thumbnail ? (
                  <Image
                    src={`${BASEURL}${video.thumbnail}`}
                    alt={video.title ?? "Not found image"}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#FF6B8A]/10 to-[#FF6B8A]/5">
                    <PlayCircle className="w-12 h-12 text-[#FF6B8A]/40" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[#2A2A2A] mb-2 line-clamp-2 min-h-12">
                  {video.title}
                </h3>
                <p className="text-sm text-[#6D6D6D] line-clamp-3">
                  {video.description}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex justify-center py-12">
            <div className="col-span-full flex justify-center py-12">
              <div className="max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                  <FaVideoSlash className="text-3xl text-red-500" />
                </div>

                <h3 className="mb-2 text-2xl font-bold text-[#1F2937]">
                  No Video Lessons Yet
                </h3>

                <p className="mb-4 text-sm leading-relaxed text-[#6D6D6D]">
                  It looks like there are currently no video lessons available
                  in this category. New educational content is added regularly,
                  so please check back later.
                </p>

                <div className="rounded-xl bg-gray-50 p-4 text-sm text-[#4B5563]">
                  📚 Explore other categories or return later for newly
                  published video lessons and learning resources.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading state for module by ID */}
      {isModuleLoading && moduleId && (
        <div className="w-full flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
