"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Play,
  FileText,
  Layers,
  HelpCircle,
  Bot,
  X,
  MessageSquare,
  Check,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetCoreLearningContentDetails,
  useCoreLearning,
  useSaveNote,
  useMarkComplete,
} from "@/hooks";
import SaveNoteModal from "@/components/save-note-modal";

export default function StudyNoteClient() {
  const { studyslug } = useParams();
  const contentId = Number(studyslug);
  const queryClient = useQueryClient();

  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [showLumiBanner, setShowLumiBanner] = useState(true);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Fetch real note details from API
  const { topicDetailsData: currentNote, isLoading } =
    useGetCoreLearningContentDetails(!isNaN(contentId) ? contentId : null);

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

  // Handle Mark Complete
  const handleCompleteClick = async () => {
    if (!contentId) {
      toast.error("Unable to mark note as completed");
      return;
    }

    try {
      const res = await markComplete({ id: contentId });
      toast.success(res?.message || "Marked as completed!");
      setCompletedOverride(true);
      queryClient.invalidateQueries({
        queryKey: ["core-learning-content-details", contentId],
      });
      queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
      queryClient.invalidateQueries({ queryKey: ["core-learning"] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to mark as completed");
    }
  };


  const router = useRouter();

  // Fetch real categories to extract related topics
  const { coreLearningData } = useCoreLearning("study_notes", { limit: 20 });
  const [selectedNoteForSave, setSelectedNoteForSave] = useState(null);
  const [savedRelatedIds, setSavedRelatedIds] = useState(new Set());

  // Extract related topics from live API categories
  const relatedTopics = useMemo(() => {
    const list = [];
    if (coreLearningData && Array.isArray(coreLearningData)) {
      coreLearningData.forEach((category) => {
        if (category.contents && Array.isArray(category.contents)) {
          category.contents.forEach((topic) => {
            if (topic.id !== contentId && list.length < 4) {
              list.push({
                id: topic.id,
                title: topic.content_name || topic.title || "Clinical Topic",
                category: category.title || "Medical Surgical",
                is_saved: Boolean(topic.is_saved),
              });
            }
          });
        }
      });
    }
    return list;
  }, [coreLearningData, contentId]);

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
          <Link
            href="/dashboard/study-notes"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] text-white text-xs font-semibold transition cursor-pointer shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>Back to Study Notes</span>
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = currentNote?.category_name || "Medical Surgical";
  const noteTitle = currentNote?.content_name || "Study Note";

  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Header Breadcrumb & Top Actions Bar (Image 3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-4">
        {/* Breadcrumb back link */}
        <Link
          href="/dashboard/study-notes"
          className="inline-flex items-center gap-2 text-base sm:text-lg lg:text-xl font-bold text-[#1B4B66] hover:text-[#0D3043] transition group truncate max-w-full sm:max-w-xl"
        >
          <ArrowLeft
            size={20}
            className="text-[#1B4B66] group-hover:-translate-x-1 transition-transform shrink-0"
          />
          <span className="truncate">
            {categoryName}/{noteTitle}
          </span>
        </Link>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Saved Button */}
          <button
            type="button"
            onClick={handleSaveClick}
            disabled={isSavePending}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition flex items-center gap-2 cursor-pointer shadow-2xs ${
              isSaved
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
            disabled={isCompletePending || isCompleted}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 ${
              isCompleted
                ? "bg-emerald-600 text-white cursor-default"
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
        <div className="xl:col-span-8 2xl:col-span-9 bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-7 lg:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col">
          {/* Note Title */}
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight text-[#1B4B66] mb-5">
            {noteTitle}
          </h1>

          {/* HTML Note File Iframe / Content View matching previous code functionality */}
          <div className="w-full h-[calc(100vh-250px)] min-h-150 relative rounded-xl overflow-hidden border border-gray-200 bg-white">
            {currentNote?.content_file_url ? (
              <>
                {isIframeLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-lg">
                    <div className="w-8 h-8 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <iframe
                  src={
                    currentNote.content_file_url.startsWith("http")
                      ? currentNote.content_file_url
                      : `https://${currentNote.content_file_url}`
                  }
                  className={`w-full h-full border-0 rounded-lg transition-opacity duration-300 ${
                    isIframeLoading ? "opacity-0" : "opacity-100"
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
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <h3 className="font-bold text-[#1B4B66] text-base mb-3">Watch Lesson</h3>

            {/* Video preview thumbnail */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center group cursor-pointer shadow-xs border border-gray-200">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/20" />

              {/* Lesson Illustration Mock */}
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">
                    {categoryName}
                  </span>
                  <p className="text-white font-black text-sm sm:text-base tracking-wide leading-tight truncate px-2">
                    {noteTitle}
                  </p>
                  <p className="text-gray-300 text-[9px]">High-Yield Clinical Lesson</p>
                </div>
              </div>

              {/* Play Button Overlay */}
              <div className="w-11 h-11 rounded-full bg-white/90 text-[#1B4B66] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                <Play size={18} className="fill-[#1B4B66] ml-0.5" />
              </div>
            </div>

            {/* Lesson Info */}
            <div className="mt-3.5 space-y-1">
              <span className="text-[10px] font-bold text-[#1B4B66] tracking-wider uppercase">
                {categoryName}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B4B66] leading-tight truncate">
                {noteTitle}
              </h4>
              <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                Comprehensive NCLEX review, clinical indications, and essential patient care guidelines.
              </p>

              {/* Lesson Progress Bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-3">
                <div className="h-full bg-[#FF6B8A] rounded-full w-[65%]" />
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 pt-1">
                <span>4:20</span>
                <span>8:00</span>
              </div>

              {/* Action Buttons: Resume & Bookmark */}
              <div className="pt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toast.success("Resuming lesson video")}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Play size={13} className="fill-white" />
                  <span>Resume</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveClick}
                  className="p-2 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-[#1B4B66] transition cursor-pointer"
                  title="Bookmark lesson"
                >
                  <Bookmark size={15} className={isSaved ? "fill-[#1B4B66] text-[#1B4B66]" : ""} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Related Topics Card */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <h3 className="font-bold text-[#1B4B66] text-base mb-3">Related Topics</h3>

            <div className="space-y-3">
              {relatedTopics.length === 0 && (
                <p className="text-xs text-gray-400 py-3 text-center">
                  No related topics found.
                </p>
              )}

              {relatedTopics?.map((topic) => {
                const isTopicSaved =
                  savedRelatedIds.has(topic.id) || Boolean(topic.is_saved);

                return (
                  <div
                    key={topic.id}
                    onClick={() => router.push(`/dashboard/study-notes/${topic.id}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 hover:border-gray-200 hover:bg-gray-50/70 transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#1B4B66] flex items-center justify-center shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-[13px] font-bold text-[#1B4B66] group-hover:text-blue-700 transition-colors truncate">
                          {topic.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium truncate">
                          {topic.category}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleRelatedBookmarkClick(topic, e)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#1B4B66] hover:bg-gray-100 transition cursor-pointer shrink-0 ml-2"
                      title={isTopicSaved ? "Remove bookmark" : "Bookmark topic"}
                    >
                      <Bookmark
                        size={16}
                        className={
                          isTopicSaved
                            ? "fill-[#1B4B66] text-[#1B4B66]"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Study Tools Card */}
          <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
            <h3 className="font-bold text-[#1B4B66] text-base mb-3">Study Tools</h3>

            <div className="grid grid-cols-3 gap-2">
              <Link
                href="/dashboard/flashcards"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#EBF5FB] hover:bg-[#DDF0FA] transition text-center cursor-pointer border border-[#D0E6F5]/50"
              >
                <div className="w-7 h-7 rounded-lg bg-[#326798]/10 text-[#1B4B66] flex items-center justify-center mb-1">
                  <Layers size={16} />
                </div>
                <span className="text-[10px] font-bold text-[#1B4B66] leading-tight">
                  Create Flashcards
                </span>
              </Link>

              <Link
                href="/dashboard/nclex-practice"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#EDF2FE] hover:bg-[#E2EAFF] transition text-center cursor-pointer border border-[#D5E1FC]/50"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center mb-1">
                  <HelpCircle size={16} />
                </div>
                <span className="text-[10px] font-bold text-[#1B4B66] leading-tight">
                  Practice Questions
                </span>
              </Link>

              <Link
                href="/dashboard/my-tutor"
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-[#F4EEFD] hover:bg-[#EADBFA] transition text-center cursor-pointer border border-[#E4D4FA]/50"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-600/10 text-purple-700 flex items-center justify-center mb-1">
                  <Bot size={16} />
                </div>
                <span className="text-[10px] font-bold text-purple-900 leading-tight">
                  Ask CARA
                </span>
              </Link>
            </div>
          </div>

          {/* 4. Need a Simpler Explanation? Card */}
          {showLumiBanner && (
            <div className="bg-white rounded-2xl border border-gray-200/90 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] relative flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowLumiBanner(false)}
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
          )}
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