"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  FileText,
  X,
  MessageSquare,
  Check,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCoreLearningContentDetails,
  useSaveNote,
  useMarkComplete,
} from "@/hooks";
import SaveNoteModal from "@/components/save-note-modal";
import { getSecureUrl } from "@/utils";
import RelatedTopicsCard from "./components/related-topics-card";
import StudyToolsCard from "./components/study-tools-card";
import LessonVideoCard from "./components/lesson-video-card";


export default function TopicContentDetails() {
  const { studyslug } = useParams();
  const contentId = Number(studyslug);
  const queryClient = useQueryClient();

  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Fetch real note details from API
  const { topicDetailsData: currentNote, isLoading } =
    useGetCoreLearningContentDetails(!isNaN(contentId) ? contentId : null);

  console.log("TOpic details", currentNote)

  const { saveNote, isPending: isSavePending } = useSaveNote();
  const { markComplete, isPending: isCompletePending } = useMarkComplete();

  const [savedOverride, setSavedOverride] = useState(null);
  const [completedOverride, setCompletedOverride] = useState(null);

  const isSaved =
    savedOverride !== null
      ? savedOverride
      : Boolean(currentNote?.is_saved || currentNote?.saved);
  const isCompleted =
    completedOverride !== null
      ? completedOverride
      : Boolean(currentNote?.is_completed || currentNote?.completed);

  // Handle Save / Unsave
  const handleSaveClick = () => {
    if (!contentId) return;

    if (!isSaved) {
      setIsSaveModalOpen(true);
    } else {
      saveNote(
        {
          content_id: contentId,
          folder_id: currentNote?.folder_id || currentNote?.folderId,
        },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "Note removed from saved list");
            setSavedOverride(false);
            queryClient.invalidateQueries({ queryKey: ["library-get"] });
            queryClient.invalidateQueries({
              queryKey: ["core-learning-content-details", contentId],
            });
            queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
          },
          onError: (error) => {
            toast.error(
              error?.response?.data?.message || "Failed to update saved status"
            );
          },
        }
      );
    }
  };

  // Handle Mark Complete (toggle)
  const handleCompleteClick = async () => {
    if (!contentId) {
      toast.error("Unable to update completion status");
      return;
    }

    try {
      const res = await markComplete({ id: contentId });
      const newState = !isCompleted;
      toast.success(res?.message || (newState ? "Marked as completed!" : "Marked as incomplete"));
      setCompletedOverride(newState);
      queryClient.invalidateQueries({
        queryKey: ["core-learning-content-details", contentId],
      });
      queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
      queryClient.invalidateQueries({ queryKey: ["core-learning"] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update completion status");
    }
  };

  const router = useRouter();

  // Fetch real categories to extract related topics
  const [selectedNoteForSave, setSelectedNoteForSave] = useState(null);
  const [savedRelatedIds, setSavedRelatedIds] = useState(new Set());

  const handleRelatedBookmarkClick = (topic, e) => {
    e.stopPropagation();
    const isTopicSaved = savedRelatedIds.has(topic.id) || topic.is_saved;

    if (isTopicSaved) {
      saveNote(
        { content_id: topic.id },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Removed from saved notes");
            setSavedRelatedIds((prev) => {
              const next = new Set(prev);
              next.delete(topic.id);
              return next;
            });
            queryClient.invalidateQueries({ queryKey: ["core-learning"] });
            queryClient.invalidateQueries({ queryKey: ["library-get"] });
          },
          onError: (err) => {
            toast.error(
              err?.response?.data?.message || "Failed to update saved status"
            );
          },
        }
      );
    } else {
      setSelectedNoteForSave(topic.id);
      setIsSaveModalOpen(true);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full min-h-100 flex flex-col items-center justify-center">
        <div className="w-9 h-9 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-gray-500 font-medium">Loading study note...</p>
      </div>
    );
  }

  // Not found state
  if (!isLoading && !currentNote) {
    return (
      <div className="w-full flex items-center justify-center py-16">
        <div className="bg-white rounded-2xl p-10 border border-gray-200/80 shadow-xs text-center max-w-md w-full">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B4B66] flex items-center justify-center mx-auto mb-4">
            <FileText size={28} />
          </div>
          <h2 className="text-xl font-bold text-[#1B4B66] mb-2">Note Not Found</h2>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            The study note you are looking for does not exist or has been moved.
          </p>
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/dashboard/study-notes");
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Study Notes</span>
          </button>
        </div>
      </div>
    );
  }

  const categoryName = currentNote?.category_name || "Not Found";
  const noteTitle = currentNote?.content_name || "Not Found.";
  const relatedTopics = currentNote?.related_topics || [];
  const video = currentNote?.video || {};
  console.log("Video", video)

  const handleBackNavigation = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard/study-notes");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Header Breadcrumb & Top Actions Bar (Image 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
        {/* Breadcrumb back link */}
        <button
          type="button"
          onClick={handleBackNavigation}
          className="inline-flex items-center gap-2 text-base font-bold text-[#1B4B66] hover:text-[#0D3043] transition group truncate max-w-full sm:max-w-xl text-left cursor-pointer"
        >
          <ArrowLeft
            size={20}
            className="text-[#1B4B66] group-hover:-translate-x-1 transition-transform shrink-0"
          />
          <span className="truncate">
            {categoryName} / {noteTitle}
          </span>
        </button>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Saved Button */}
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={isSavePending}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition flex items-center gap-2 cursor-pointer shadow-2xs ${isSaved
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
          >
            {isSavePending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Bookmark
                size={16}
                className={
                  isSaved ? "fill-emerald-600 text-emerald-600" : "text-gray-500"
                }
              />
            )}
            <span>{isSaved ? "Saved" : "Save Note"}</span>
          </button>

          {/* Mark Completed Button */}
          <button
            type="button"
            onClick={handleCompleteClick}
            disabled={isCompletePending}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 ${isCompleted
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-[#1B4B66] hover:bg-[#14394E] text-white"
              }`}
          >
            {isCompletePending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : isCompleted ? (
              <Check size={16} strokeWidth={2.5} />
            ) : (
              <CheckCircle2 size={16} />
            )}
            <span>{isCompleted ? "Completed" : "Mark Completed"}</span>
          </button>
        </div>
      </div>

      {/* 2. Main 2-Column Grid (Left: Note Article, Right: Sidebar) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Note Document Card rendering the HTML Note File */}
        <div className="xl:col-span-8 2xl:col-span-9 bg-white rounded-2xl border border-gray-200/90 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col">

          {/* HTML Note File Iframe / Content View matching previous code functionality */}
          <div className="w-full h-[calc(100vh-250px)] min-h-150 relative overflow-hidden bg-white">
            {currentNote?.content_file_url ? (
              <>
                {isIframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-lg">
                    <div className="w-8 h-8 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  src={getSecureUrl(currentNote.content_file_url)}
                  className={`w-full h-full transition-opacity duration-300 ${isIframeLoading ? "opacity-0" : "opacity-100"
                    }`}
                  title={currentNote.content_name || "Note Content"}
                  sandbox="allow-same-origin allow-scripts"
                  onLoad={() => setIsIframeLoading(false)}
                />
              </>
            ) : currentNote?.content ? (
              <div
                className="p-6 overflow-y-auto h-full prose max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: currentNote.content }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-xs sm:text-sm">
                No content file available for this note.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar (Watch Lesson, Related Topics, Study Tools, Lumi) */}
        <div className="xl:col-span-4 2xl:col-span-3 w-full space-y-5">
          {/* 1. Watch Lesson Card */}
          <LessonVideoCard
            video={video}
            categoryName={categoryName}
            noteTitle={noteTitle}
            onBookmarkNote={handleSaveClick}
            isNoteSaved={isSaved}
          />

          {/* 2. Related Topics Card */}
          <RelatedTopicsCard
            relatedTopics={relatedTopics}
            savedRelatedIds={savedRelatedIds}
            onBookmarkClick={handleRelatedBookmarkClick}
          />

          {/* 3. Study Tools Card */}
          <StudyToolsCard />

          {/* 4. Need a Simpler Explanation? Card */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] relative flex items-center gap-3">
            <button
              type="button"
              className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 p-1 rounded-md transition cursor-pointer"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>

            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 relative flex items-center justify-center">
              <Image
                src="/images/ai-tutor-avatar.png"
                alt="CARA AI Tutor"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <h4 className="text-xs sm:text-[13px] font-bold text-[#1B4B66] leading-tight">
                Need a Simpler Explanation?
              </h4>
              <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5 leading-tight">
                Ask CARA about any flashcard
              </p>

              <Link
                href="/dashboard/my-tutor"
                className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 bg-[#1B4B66] hover:bg-[#14394E] text-white text-[11px] font-semibold rounded-full shadow-2xs transition cursor-pointer"
              >
                <MessageSquare size={11} />
                <span>Ask CARA</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Save Note Modal Integration */}
      <SaveNoteModal
        isModalOpen={isSaveModalOpen}
        setIsModalOpen={(open) => {
          setIsSaveModalOpen(open);
          if (!open) setSelectedNoteForSave(null);
        }}
        noteId={selectedNoteForSave || contentId}
        onSaveSuccess={() => {
          if (selectedNoteForSave) {
            setSavedRelatedIds((prev) => new Set(prev).add(selectedNoteForSave));
          } else {
            setSavedOverride(true);
          }
          queryClient.invalidateQueries({
            queryKey: ["core-learning-content-details", contentId],
          });
          queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
          queryClient.invalidateQueries({ queryKey: ["library-get"] });
          queryClient.invalidateQueries({ queryKey: ["core-learning"] });
        }}
      />
    </div>
  );
};