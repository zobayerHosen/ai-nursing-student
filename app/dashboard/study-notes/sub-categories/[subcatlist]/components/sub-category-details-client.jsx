"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLearningCategoryDetails, useSaveNote } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import SaveNoteModal from "@/components/save-note-modal";
import SubcategoryAccordionItem from "./subcategory-accordion-item";
import StudyNotesSidebarWidgets from "../../../components/study-notes-sidebar-widgets";
import CardSkeleton from "@/app/dashboard/components/card-skeleton";

export default function StudyNotesSubCategoriesClient({ subcatlist }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch fresh category details
  const { learningCategoryDetailsData, isLoading } = useLearningCategoryDetails(subcatlist);
  console.log(learningCategoryDetailsData);

  const subcategories = learningCategoryDetailsData?.subcategories || [];
  const directContents = learningCategoryDetailsData?.contents || [];
  const hasSubcategories = subcategories.length > 0;

  const popular_this_week = learningCategoryDetailsData?.popular_this_week || [];

  const allTopics = useMemo(() => {
    return hasSubcategories
      ? subcategories.flatMap((sub) => sub.contents || [])
      : directContents;
  }, [hasSubcategories, subcategories, directContents]);

  console.log("All topics", allTopics)

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

  // Bookmark state & handlers
  const { saveNote } = useSaveNote();
  const [selectedNoteForSave, setSelectedNoteForSave] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [savedNoteIds, setSavedNoteIds] = useState(new Set());

  const handleBookmarkClick = useCallback(
    (topic, e) => {
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
    },
    [savedNoteIds, saveNote, queryClient]
  );

  const handleNoteClick = useCallback(
    (topic) => {
      router.push(`/dashboard/study-notes/${topic.id}`);
    },
    [router]
  );

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
      {/* Main Subcategory list view */}
      <div className="xl:col-span-8 2xl:col-span-9 w-full space-y-5">
        {/* Back button and Category Header */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-xl text-[#1B4B66] hover:bg-white hover:shadow-xs transition flex items-center gap-2 cursor-pointer font-bold group"
          >
            <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform shrink-0" />
            <div className="flex flex-col items-start">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1B4B66]">
                {learningCategoryDetailsData?.title || "Category Name"}
              </h2>
              <p className="text-xs text-gray-500 font-normal mt-0.5 text-left">
                {learningCategoryDetailsData?.subtitle || "Category Description"}
              </p>
            </div>
          </button>

          <span className="text-xs font-semibold text-[#1B4B66] bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-100 shrink-0">
            {allTopics?.length ?? "0"} Topics
          </span>
        </div>
        {/* Content: Subcategories view */}
        {isLoading ? (
          <CardSkeleton count={8} />
        ) : allTopics.length === 0 ? (
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
              onClick={() => router.back()}
              className="px-4 py-2 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] text-white text-xs font-semibold transition cursor-pointer"
            >
              Back to All Episodes
            </button>
          </div>
        ) : (
          hasSubcategories && (
            <div className="space-y-4">
              {subcategories?.map((sub) => (
                <SubcategoryAccordionItem
                  key={sub.id}
                  subcategory={sub}
                  isExpanded={expandedSubcategoryIds.has(sub.id)}
                  onToggle={toggleSubcategory}
                  savedNoteIds={savedNoteIds}
                  onBookmark={handleBookmarkClick}
                  onNoteClick={handleNoteClick}
                  categoryTitle={learningCategoryDetailsData?.title}
                />
              ))}
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

      {/* Related category list / Sidebar */}
      <div className="xl:col-span-4 2xl:col-span-3 w-full">
        <StudyNotesSidebarWidgets popular_this_week={popular_this_week} />
      </div>
    </div >
  );
};