"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Flame,
  Bookmark,
  Layers,
  HelpCircle,
  Bot,
  X,
  MessageSquare,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCoreLearning, useSaveNote } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import SaveNoteModal from "@/components/save-note-modal";

export default function StudyNotesSidebarWidgets({ onSelectTopic }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { coreLearningData, isLoading } = useCoreLearning("study_notes", { limit: 10 });
  const { saveNote } = useSaveNote();

  const [showLumiBanner, setShowLumiBanner] = useState(true);
  const [selectedNoteForSave, setSelectedNoteForSave] = useState(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [savedIds, setSavedIds] = useState(new Set());

  // Extract popular topics from real categories
  const popularTopics = useMemo(() => {
    const list = [];
    if (coreLearningData && Array.isArray(coreLearningData)) {
      coreLearningData.forEach((category) => {
        if (category.contents && Array.isArray(category.contents)) {
          category.contents.forEach((topic) => {
            if (list.length < 5) {
              list.push({
                id: topic.id,
                title: topic.content_name || topic.title || "Clinical Note",
                category: category.title || "Medical Surgical",
                is_saved: Boolean(topic.is_saved),
              });
            }
          });
        }
      });
    }

    return list;
  }, [coreLearningData]);

  const handleBookmarkClick = (topic, e) => {
    e.stopPropagation();
    e.preventDefault();

    const isSaved = savedIds.has(topic.id) || topic.is_saved;

    if (isSaved) {
      saveNote(
        { content_id: topic.id },
        {
          onSuccess: () => {
            toast.success("Removed from bookmarks");
            setSavedIds((prev) => {
              const next = new Set(prev);
              next.delete(topic.id);
              return next;
            });
            queryClient.invalidateQueries({ queryKey: ["core-learning"] });
            queryClient.invalidateQueries({ queryKey: ["library-get"] });
          },
          onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to update bookmark");
          },
        }
      );
    } else {
      setSelectedNoteForSave(topic.id);
      setIsSaveModalOpen(true);
    }
  };

  const handleTopicClick = (topic) => {
    if (onSelectTopic) {
      onSelectTopic(topic);
    } else {
      router.push(`/dashboard/study-notes/${topic.id}`);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 1. Popular This Week Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h3 className="font-bold text-[#1B4B66] text-base">Popular This Week</h3>
        </div>

        <div className="space-y-3">
          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <div className="w-5 h-5 border-2 border-[#1B4B66] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!isLoading && popularTopics.length === 0 && (
            <p className="text-xs text-gray-400 py-3 text-center">
              No popular notes available.
            </p>
          )}

          {!isLoading &&
            popularTopics.map((item) => {
              const isSaved = savedIds.has(item.id) || item.is_saved;

              return (
                <div
                  key={item.id}
                  onClick={() => handleTopicClick(item)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/70 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-gray-100 to-gray-200/80 shrink-0 flex items-center justify-center border border-gray-200/50 group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4 text-gray-400 group-hover:text-[#1B4B66] transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#1B4B66] group-hover:text-[#0D3043] transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-medium truncate">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleBookmarkClick(item, e)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-[#1B4B66] hover:bg-gray-100 transition cursor-pointer shrink-0 ml-2"
                    title={isSaved ? "Bookmarked" : "Bookmark this topic"}
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

      {/* 2. Study Tools Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <h3 className="font-bold text-[#1B4B66] text-base mb-4">Study Tools</h3>

        <div className="grid grid-cols-3 gap-2.5">
          {/* Tool 1: Create Flashcards */}
          <Link
            href="/dashboard/flashcards"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#EBF5FB] hover:bg-[#DDF0FA] transition-all group text-center cursor-pointer border border-[#D0E6F5]/50 hover:shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#326798]/10 text-[#1B4B66] flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Layers size={18} />
            </div>
            <span className="text-[11px] font-bold text-[#1B4B66] leading-tight line-clamp-2">
              Create Flashcards
            </span>
          </Link>

          {/* Tool 2: Practice Questions */}
          <Link
            href="/dashboard/nclex-practice"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#EDF2FE] hover:bg-[#E2EAFF] transition-all group text-center cursor-pointer border border-[#D5E1FC]/50 hover:shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <HelpCircle size={18} />
            </div>
            <span className="text-[11px] font-bold text-[#1B4B66] leading-tight line-clamp-2">
              Practice Questions
            </span>
          </Link>

          {/* Tool 3: Ask Lumi */}
          <Link
            href="/dashboard/my-tutor"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#F4EEFD] hover:bg-[#EADBFA] transition-all group text-center cursor-pointer border border-[#E4D4FA]/50 hover:shadow-2xs"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-600/10 text-purple-700 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
              <Bot size={18} />
            </div>
            <span className="text-[11px] font-bold text-purple-900 leading-tight line-clamp-2">
              Ask CARA
            </span>
          </Link>
        </div>
      </div>

      {/* 3. Need a Simpler Explanation? Banner */}
      {showLumiBanner && (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] relative flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => setShowLumiBanner(false)}
            className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition cursor-pointer"
            aria-label="Dismiss"
          >
            <X size={15} />
          </button>

          {/* Robot Avatar */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 relative flex items-center justify-center">
            <Image
              src="/images/ai-tutor-avatar.png"
              alt="CARA AI Tutor"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Banner Copy & Button */}
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="text-xs sm:text-[13px] font-bold text-[#1B4B66] leading-tight">
              Need a Simpler Explanation?
            </h4>
            <p className="text-[11px] text-gray-500 mt-1 leading-tight">
              Ask CARA about any flashcard
            </p>

            <Link
              href="/dashboard/my-tutor"
              className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1B4B66] hover:bg-[#14394E] text-white text-[11px] font-semibold rounded-full shadow-xs transition cursor-pointer"
            >
              <MessageSquare size={12} />
              <span>Ask CARA</span>
            </Link>
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
            setSavedIds((prev) => new Set(prev).add(selectedNoteForSave));
          }
          queryClient.invalidateQueries({ queryKey: ["core-learning"] });
          queryClient.invalidateQueries({ queryKey: ["study-notes-progress"] });
        }}
      />
    </div>
  );
}

