"use client";

import { use, useState } from "react";
import NoteTag from "./components/note-tag";
import TopBreadcrumb from "./components/top-breadcrumb";
import NoteNotFound from "./components/note-not-found";
import { useGetLibrary, useGetLibraryTopicDetails } from "@/hooks";
import LoadingIcon from "@/components/loading-icon";
import NoteHeader from "./components/note-header";

export default function NoteDetails({ params }) {
  const { noteslug } = use(params);
  const { topicDetailsData, isLoading, isError, isFetching } = useGetLibraryTopicDetails(noteslug);
  const { libraryData } = useGetLibrary()
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingIcon className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (isError || !topicDetailsData) return <NoteNotFound />;

  const targetFolder = Array.isArray(libraryData) 
    ? libraryData.find(folder => Array.isArray(folder?.notes) && folder.notes.some(n => Number(n.content_id) === Number(noteslug)))
    : null;

  const noteData = {
    title: topicDetailsData.content_name || "Note Details",
    slug: noteslug,
    id: topicDetailsData.id,
    is_saved: topicDetailsData.is_saved,
    folderName: targetFolder?.name || "Library Notes",
    folderId: targetFolder?.id || null,
  };
  console.log("noteData", noteData)

  return (
    <div className="flex flex-col h-full">
      {/* Top Breadcrumb Header */}
      <TopBreadcrumb note={noteData} />

      {/* Content Area */}
      <div className="pt-6 relative">
        {isFetching && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center rounded-lg">
            <LoadingIcon className="w-8 h-8 text-primary" />
          </div>
        )}
        <NoteHeader folder={noteData.folderName} date={new Date().toLocaleDateString()} title={noteData.title} isSaved={noteData.is_saved} />

        <div className="flex gap-2 mb-8">
          {noteData.tags?.map((tag, index) => (
            <NoteTag key={index} label={tag.label} color={tag.color} />
          ))}
        </div>

        <div className="space-y-6">
          <div className="w-full h-[calc(100vh-250px)] min-h-[500px] relative">
            {topicDetailsData.content_file_url && (
              <>
                {isIframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-lg">
                    <LoadingIcon className="w-8 h-8 text-primary" />
                  </div>
                )}
                <iframe
                  src={topicDetailsData.content_file_url.startsWith("http") ? topicDetailsData.content_file_url : `https://${topicDetailsData.content_file_url}`}
                  className={`w-full h-full border-0 rounded-lg shadow-sm transition-opacity duration-300 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
                  title={topicDetailsData.content_name || "Note Content"}
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
