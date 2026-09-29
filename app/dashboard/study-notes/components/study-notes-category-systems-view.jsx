"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  FileText,
  Bookmark,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLearningCategoryDetails, useSaveNote } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import SaveNoteModal from "@/components/save-note-modal";

// ─── Reusable TopicItem
function TopicItem({ topic, subtitle, isSaved, onBookmark, onClick }) {
  const isCompleted = Boolean(topic?.is_completed || topic?.completed);

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200/90 bg-white hover:border-[#1B4B66]/40 hover:bg-blue-50/20 transition-all cursor-pointer group shadow-2xs"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-lg bg-blue-50/80 border border-blue-100/60 shrink-0 flex items-center justify-center group-hover:bg-[#1B4B66]/10 group-hover:scale-105 transition-all">
          <FileText size={17} className="text-[#1B4B66] group-hover:text-[#0D3043]" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-bold text-[#1B4B66] group-hover:text-blue-700 transition-colors truncate">
              {topic?.content_name || topic?.title || topic?.name || "Untitled Topic"}
            </h4>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 size={11} />
                Completed
              </span>
            )}
          </div>
          <p className="text-[11px] text-gray-400 font-medium truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0 ml-2">
        <button
          type="button"
          onClick={onBookmark}
          className="p-1.5 rounded-lg text-gray-400 hover:text-[#1B4B66] hover:bg-gray-100 transition cursor-pointer"
          title={isSaved ? "Remove bookmark" : "Bookmark note"}
        >
          <Bookmark
            size={17}
            className={
              isSaved ? "fill-[#1B4B66] text-[#1B4B66]" : "text-gray-400"
            }
          />
        </button>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-[#1B4B66] group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );
}

// ─── Reusable TopicColumn (DRY for the two-column direct topics layout) ─────
function TopicColumn({ title, topics, emptyText, savedNoteIds, onBookmark, onNoteClick, subtitle }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B4B66] flex items-center justify-center">
          <FileText size={16} />
        </div>
        <h3 className="font-bold text-[#1B4B66] text-sm sm:text-base">{title}</h3>
      </div>

      <div className="space-y-2.5 pt-1">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              subtitle={subtitle}
              isSaved={savedNoteIds.has(topic.id) || Boolean(topic.is_saved)}
              onBookmark={(e) => onBookmark(topic, e)}
              onClick={() => onNoteClick(topic)}
            />
          ))
        ) : (
          <p className="text-xs text-gray-400 py-4 text-center">{emptyText}</p>
        )}
      </div>
    </div>
  );
}

// ─── Reusable TopicGrid (DRY topic list used inside subcategory panels) ─────
function TopicGrid({ topics, subtitle, savedNoteIds, onBookmark, onNoteClick }) {
  if (topics.length === 0) {
    return (
      <p className="text-xs text-gray-400 py-3 text-center">
        No topics in this subcategory.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1  gap-3 pt-2">
      {topics.map((topic) => (
        <TopicItem
          key={topic.id}
          topic={topic}
          subtitle={subtitle}
          isSaved={savedNoteIds.has(topic.id) || Boolean(topic.is_saved)}
          onBookmark={(e) => onBookmark(topic, e)}
          onClick={() => onNoteClick(topic)}
        />
      ))}
    </div>
  );
}

// ─── Main Component
export default function StudyNotesCategorySystemsView({
  category = null,
  categoryTitle = "Medical Surgical",
  onBack,
  onOpenNote,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch fresh category details if ID is available
  const { learningCategoryDetailsData, isLoading } = useLearningCategoryDetails(
    category?.id || null
  );

  const activeCategory = learningCategoryDetailsData || category;
  const subcategories = activeCategory?.subcategories || [];
  const directContents = activeCategory?.contents || [];
  const hasSubcategories = subcategories.length > 0;

  const allTopics = useMemo(() => {
    return hasSubcategories
      ? subcategories.flatMap((sub) => sub.contents || [])
      : directContents;
  }, [hasSubcategories, subcategories, directContents]);

  // Track expanded subcategories (default: expand all)
  const [expandedSubcategoryIds, setExpandedSubcategoryIds] = useState(new Set());

  useEffect(() => {
    if (subcategories.length > 0) {
      setExpandedSubcategoryIds(new Set(subcategories.map((s) => s.id)));
    }
  }, [subcategories]);

  const toggleSubcategory = useCallback((subId) => {
    setExpandedSubcategoryIds((prev) => {
      const next = new Set(prev);
      next.has(subId) ? next.delete(subId) : next.add(subId);
      return next;
    });
  }, []);

  // ─── Bookmark state & handlers ──────────────────────────────────────────
  const { saveNote } = useSaveNote();
  const [selectedNoteForSave, setSelectedNoteForSave] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [savedNoteIds, setSavedNoteIds] = useState(new Set());

  useEffect(() => {
    setSavedNoteIds((prev) => {
      const next = new Set(prev);
      allTopics.forEach((t) => {
        if (t.is_saved || t.saved) next.add(t.id);
      });
      return next;
    });
  }, [allTopics]);

  const handleBookmarkClick = useCallback((topic, e) => {
    e.stopPropagation();
    e.preventDefault();

    if (savedNoteIds.has(topic.id)) {
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
  }, [savedNoteIds, saveNote, queryClient]);

  const handleNoteClick = useCallback((topic) => {
    if (onOpenNote) {
      onOpenNote(topic);
    } else {
      router.push(`/dashboard/study-notes/${topic.id}`);
    }
  }, [onOpenNote, router]);

  // Split direct topics into two columns
  const midPoint = Math.ceil(directContents.length / 2);
  const col1Topics = directContents.slice(0, midPoint);
  const col2Topics = directContents.slice(midPoint);

  const defaultSubtitle = activeCategory?.title || "Pharmacology";

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Back button and Category Header */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl text-[#1B4B66] hover:bg-white hover:shadow-xs transition flex items-center gap-2 cursor-pointer font-bold group"
        >
          <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1B4B66]">
              {activeCategory?.title || categoryTitle}
            </h2>
            {activeCategory?.subtitle && (
              <p className="text-xs text-gray-500 font-normal mt-0.5 text-left">
                {activeCategory.subtitle}
              </p>
            )}
          </div>
        </button>

        {allTopics.length > 0 && (
          <span className="text-xs font-semibold text-[#1B4B66] bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-100 shrink-0">
            {allTopics.length} {allTopics.length === 1 ? "Topic" : "Topics"}
          </span>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-200/80 p-8 shadow-xs">
          <div className="w-8 h-8 border-3 border-[#1B4B66] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-gray-500 font-medium">Loading category topics...</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && allTopics.length === 0 && (
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

      {/* Content: Subcategories view OR Direct Topics (two-column) view */}
      {!isLoading && allTopics.length > 0 && (
        hasSubcategories ? (
          <div className="space-y-4">
            {subcategories.map((sub) => {
              const isExpanded = expandedSubcategoryIds.has(sub.id);
              const subContents = sub.contents || [];
              const completedCount = subContents.filter(
                (c) => c.is_completed || c.completed
              ).length;

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden transition-all"
                >
                  {/* Subcategory Header */}
                  <button
                    type="button"
                    onClick={() => toggleSubcategory(sub.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-gray-50/70 transition-colors text-left cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B4B66] flex items-center justify-center shrink-0 border border-blue-100/50">
                        <Layers size={18} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#1B4B66] text-sm sm:text-base truncate">
                          {sub.name || "Subcategory"}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium mt-0.5">
                          {subContents.length} {subContents.length === 1 ? "Topic" : "Topics"}
                          {completedCount > 0 && (
                            <span className="text-emerald-600 font-semibold ml-2">
                              • {completedCount} Completed
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="hidden sm:inline-block text-xs font-semibold text-[#1B4B66] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                        {isExpanded ? "Collapse" : "Expand"}
                      </span>
                      <div
                        className={`p-1 rounded-lg text-gray-400 transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#1B4B66]" : ""
                        }`}
                      >
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </button>

                  {/* Subcategory Topics — uses reusable TopicGrid */}
                  {isExpanded && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-6 pt-1 border-t border-gray-100 bg-gray-50/30">
                      <TopicGrid
                        topics={subContents}
                        subtitle={sub.name || activeCategory?.title}
                        savedNoteIds={savedNoteIds}
                        onBookmark={handleBookmarkClick}
                        onNoteClick={handleNoteClick}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Direct Topics View (2 Columns) — uses reusable TopicColumn */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <TopicColumn
              title={activeCategory?.title || "Clinical Topics"}
              topics={col1Topics}
              emptyText="No topics available."
              savedNoteIds={savedNoteIds}
              onBookmark={handleBookmarkClick}
              onNoteClick={handleNoteClick}
              subtitle={defaultSubtitle}
            />
            <TopicColumn
              title="Additional Modules & Systems"
              topics={col2Topics}
              emptyText="All topics are listed on the left column."
              savedNoteIds={savedNoteIds}
              onBookmark={handleBookmarkClick}
              onNoteClick={handleNoteClick}
              subtitle={defaultSubtitle}
            />
          </div>
        )
      )}

      {/* Save Note Modal */}
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
