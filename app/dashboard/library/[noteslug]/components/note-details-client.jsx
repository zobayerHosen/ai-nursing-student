"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import NoteTag from "./note-tag";
import TopBreadcrumb from "./top-breadcrumb";
import NoteNotFound from "./note-not-found";
import NoteHeader from "./note-header";
import NoteDetailsSkeleton from "./note-details-skeleton";
import LoadingIcon from "@/components/loading-icon";
import { useGetLibrary, useGetCoreLearningContentDetails } from "@/hooks";
import { getSecureUrl } from "@/utils";

export default function NoteDetailsClient({ noteslug: propNoteslug }) {
  const params = useParams();
  const noteslug = propNoteslug || params?.noteslug;
  const { topicDetailsData, isLoading, isError, isFetching } =
    useGetCoreLearningContentDetails(noteslug);
  const { libraryData } = useGetLibrary();
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  if (isLoading) {
    return <NoteDetailsSkeleton />;
  }

  if (isError || !topicDetailsData) {
    return <NoteNotFound />
  }

  const targetFolder = Array.isArray(libraryData)
    ? libraryData.find(
      (folder) =>
        Array.isArray(folder?.notes) &&
        folder.notes.some((n) => Number(n.content_id) === Number(noteslug))
    )
    : null;

  const noteData = {
    title: topicDetailsData?.content_name || "Note Details",
    slug: noteslug,
    id: topicDetailsData?.id,
    is_saved: topicDetailsData?.is_saved,
    is_completed: topicDetailsData?.is_completed || topicDetailsData?.completed,
    folderName: targetFolder?.name || topicDetailsData?.category_name || "Library Notes",
    folderId: targetFolder?.id || null,
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100/90 shadow-xs p-5 sm:p-6 lg:p-7 flex flex-col h-full">
      {/* Top Breadcrumb Header */}
      <TopBreadcrumb note={noteData} backHref="/dashboard/library" backLabel="My Library" />

      {/* Content Area */}
      <div className="pt-4 relative">
        {isFetching && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-xs z-20 flex items-center justify-center rounded-lg">
            <LoadingIcon className="w-8 h-8 text-primary" />
          </div>
        )}
        <NoteHeader
          folder={noteData.folderName}
          date={new Date().toLocaleDateString()}
          title={noteData.title}
          isSaved={noteData.is_saved}
        />

        {noteData.tags && noteData.tags.length > 0 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {noteData.tags?.map((tag, index) => (
              <NoteTag key={index} label={tag.label} color={tag.color} />
            ))}
          </div>
        )}

        <div className="space-y-6">
          <div className="w-full h-[calc(100vh-280px)] relative rounded-xl overflow-hidden border border-gray-100">
            {topicDetailsData?.content_file_url && (
              <>
                {isIframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <LoadingIcon className="w-8 h-8 text-primary" />
                  </div>
                )}
                <iframe
                  src={getSecureUrl(topicDetailsData?.content_file_url)}
                  className={`w-full h-full border-0 rounded-xl transition-opacity duration-300 ${isIframeLoading ? "opacity-0" : "opacity-100"
                    }`}
                  title={topicDetailsData?.content_name || "Note Content"}
                  sandbox="allow-same-origin allow-scripts"
                  onLoad={() => setIsIframeLoading(false)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
