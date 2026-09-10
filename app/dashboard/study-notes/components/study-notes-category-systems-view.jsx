"use client";

import { useState } from "react";
import {
  ArrowLeft,
  FileText,
  Bookmark,
  ChevronDown,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLearningCategoryDetails, useSaveNote } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import SaveNoteModal from "@/components/save-note-modal";

export default function StudyNotesCategorySystemsView({
  category = null,
  categoryTitle = "Medical Surgical",
  onBack,
  onOpenNote,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // If category has an ID, fetch fresh category details
  const { learningCategoryDetailsData, isLoading } = useLearningCategoryDetails(
    category?.id || null
  );

  const activeCategory = learningCategoryDetailsData || category;
  const topics = activeCategory?.contents || [];

  const { saveNote } = useSaveNote();
  const [selectedNoteForSave, setSelectedNoteForSave] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [savedNoteIds, setSavedNoteIds] = useState(() => {
    const set = new Set();
    topics.forEach((t) => {
      if (t.is_saved || t.saved) set.add(t.id);
    });
    return set;
  });

  const handleBookmarkClick = (topic, e) => {
    e.stopPropagation();
    e.preventDefault();

    if (savedNoteIds.has(topic.id)) {
      // Unsave
      saveNote(
        { content_id: topic.id, folder_id: topic.folder_id },
        {
          onSuccess: (data) => {
            toast.success(data?.message || "Note removed from saved list");
            setSavedNoteIds((prev) => {
              const next = new Set(prev);
              next.delete(topic.id);
              return next;
            });
            queryClient.invalidateQueries({ queryKey: ["core-learning"] });
            queryClient.invalidateQueries({ queryKey: ["library-get"] });
          },
          onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to update saved status");
          },
        }
      );
    } else {
      setSelectedNoteForSave(topic.id);
      setIsSaveModalOpen(true);
    }
  };

  const handleNoteClick = (topic) => {
    if (onOpenNote) {
      onOpenNote(topic);
    } else {
      router.push(`/dashboard/study-notes/${topic.id}`);
    }
  };

  // Split topics into two columns for Image 2 layout
  const midPoint = Math.ceil(topics.length / 2);
  const col1Topics = topics.slice(0, midPoint);
  const col2Topics = topics.slice(midPoint);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Back button and Category Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl text-[#1B4B66] hover:bg-white hover:shadow-xs transition flex items-center gap-2 cursor-pointer font-bold group"
        >
          <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B4B66]">
            {activeCategory?.title || categoryTitle}
          </h2>
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xs">
          <div className="w-8 h-8 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-gray-500 font-medium">Loading category topics...</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && topics.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center shadow-xs flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1B4B66] flex items-center justify-center mb-3">
            <BookOpen size={28} />
          </div>
          <h3 className="text-base font-bold text-[#1B4B66]">No Topics Found</h3>
          <p className="text-xs text-gray-500 max-w-sm mt-1 mb-6">
            There are no clinical study topics available in this category yet.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] text-white text-xs font-semibold transition cursor-pointer"
          >
            Back to All Episodes
          </button>
        </div>
      )}

      {/* 2-Column Responsive Grid matching Image 2 */}
      {!isLoading && topics.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* Column 1 */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B4B66] flex items-center justify-center">
                <FileText size={16} />
              </div>
              <h3 className="font-bold text-[#1B4B66] text-sm sm:text-base">
                {activeCategory?.title || "Clinical Topics"}
              </h3>
            </div>

            <div className="space-y-2.5 pt-1">
              {col1Topics?.map((topic) => {
                const isSaved = savedNoteIds.has(topic.id) || Boolean(topic.is_saved);

                return (
                  <div
                    key={topic.id}
                    onClick={() => handleNoteClick(topic)}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-[#1B4B66]/30 hover:bg-gray-50/80 transition cursor-pointer group shadow-2xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200/60 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <FileText size={16} className="text-gray-400 group-hover:text-[#1B4B66]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[#1B4B66] group-hover:text-blue-700 transition-colors truncate">
                          {topic.content_name || topic.title || "Untitled Topic"}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium truncate">
                          {activeCategory?.title || "Pharmacology"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleBookmarkClick(topic, e)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-[#1B4B66] hover:bg-gray-100 transition cursor-pointer shrink-0 ml-2"
                      title={isSaved ? "Remove bookmark" : "Bookmark note"}
                    >
                      <Bookmark
                        size={17}
                        className={
                          isSaved ? "fill-[#1B4B66] text-[#1B4B66]" : "text-gray-400"
                        }
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2 */}
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B4B66] flex items-center justify-center">
                <FileText size={16} />
              </div>
              <h3 className="font-bold text-[#1B4B66] text-sm sm:text-base">
                Additional Modules & Systems
              </h3>
            </div>

            <div className="space-y-2.5 pt-1">
              {col2Topics.length > 0 ? (
                col2Topics.map((topic) => {
                  const isSaved = savedNoteIds.has(topic.id) || Boolean(topic.is_saved);

                  return (
                    <div
                      key={topic.id}
                      onClick={() => handleNoteClick(topic)}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-200  hover:border-[#1B4B66]/30 hover:bg-gray-50/80 transition cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 border border-gray-200/60 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FileText
                            size={16}
                            className="text-gray-400 group-hover:text-[#1B4B66]"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1B4B66] group-hover:text-blue-700 transition-colors truncate">
                            {topic.content_name || topic.title || "Untitled Topic"}
                          </h4>
                          <p className="text-[11px] text-gray-400 font-medium truncate">
                            {activeCategory?.title || "Pharmacology"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleBookmarkClick(topic, e)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#1B4B66] hover:bg-gray-100 transition cursor-pointer shrink-0 ml-2"
                        title={isSaved ? "Remove bookmark" : "Bookmark note"}
                      >
                        <Bookmark
                          size={17}
                          className={
                            isSaved ? "fill-[#1B4B66] text-[#1B4B66]" : "text-gray-400"
                          }
                        />
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-gray-400 py-4 text-center">
                  All topics are listed on the left column.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Save Note Modal Integration */}
      <SaveNoteModal
        isModalOpen={isSaveModalOpen}
        setIsModalOpen={setIsSaveModalOpen}
        noteId={selectedNoteForSave}
        onSaveSuccess={() => {
          if (selectedNoteForSave) {
            setSavedNoteIds((prev) => new Set(prev).add(selectedNoteForSave));
          }
          queryClient.invalidateQueries({ queryKey: ["core-learning"] });
          queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
        }}
      />
    </div>
  );
}

