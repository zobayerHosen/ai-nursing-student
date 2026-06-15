import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import videoLessonsSidebarData from "./components/video-lesssons-sidebar-data";
import { FaVideoSlash } from "react-icons/fa";

export default async function VideoLessonsPage({ searchParams }) {
  const params = await searchParams;
  const categorySlug = params?.category || videoLessonsSidebarData[0]?.slug;
  const currentCategory =
    videoLessonsSidebarData.find((c) => c.slug === categorySlug) ||
    videoLessonsSidebarData[0];

  return (
    <div className="w-full">
      {/* Header section */}
      <div className="mb-6 bg-white rounded-xl p-6 shadow-sm border border-[#F2F2F2]">
        <h1 className="text-3xl font-bold text-[#2A2A2A] mb-2">
          {currentCategory.title}
        </h1>
        <p className="text-[#6D6D6D] text-sm mb-6">
          {currentCategory.videosList?.length || 0} video lessons • Animated
          explainers by Nurse Cara
        </p>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <button className="px-4 py-1.5 bg-[#2A2A2A] text-white rounded-full text-sm font-medium whitespace-nowrap">
            All {currentCategory.videosList?.length || 0}
          </button>
          <button className="px-4 py-1.5 bg-[#F2F2F2] text-[#6D6D6D] rounded-full text-sm font-medium whitespace-nowrap">
            In progress 2
          </button>
          <button className="px-4 py-1.5 bg-[#F2F2F2] text-[#6D6D6D] rounded-full text-sm font-medium whitespace-nowrap">
            Watched 3
          </button>
          <button className="px-4 py-1.5 bg-[#F2F2F2] text-[#6D6D6D] rounded-full text-sm font-medium whitespace-nowrap">
            Not started 7
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCategory.videosList?.map((video) => (
          <Link
            href={`/dashboard/video-lessons/${video.id}`}
            key={video.id}
            className="bg-white rounded-xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow border border-[#F2F2F2]"
          >
            {/* Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={video.videoThumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Tags */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {video.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-[10px] font-bold text-[#FF6B8A] uppercase tracking-wider flex items-center gap-1"
                  >
                    {index > 0 && <span>•</span>}
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <h3 className="font-semibold text-[#2A2A2A] mb-2 line-clamp-2 min-h-12">
                {video.title}
              </h3>
              <p className="text-sm text-[#6D6D6D] line-clamp-3">
                {video.description}
              </p>
            </div>
          </Link>
        ))}

        {(!currentCategory.videosList ||
          currentCategory.videosList.length === 0) && (
          <div className="col-span-full flex justify-center py-12">
            <div className="max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                <FaVideoSlash className="text-3xl text-red-500" />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-[#1F2937]">
                No Video Lessons Yet
              </h3>

              <p className="mb-4 text-sm leading-relaxed text-[#6D6D6D]">
                It looks like there are currently no video lessons available in
                this category. New educational content is added regularly, so
                please check back later.
              </p>

              <div className="rounded-xl bg-gray-50 p-4 text-sm text-[#4B5563]">
                📚 Explore other categories or return later for newly published
                video lessons and learning resources.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
