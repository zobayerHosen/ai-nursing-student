"use client";

import { useRouter } from "next/navigation";
import { Bookmark, FileText } from "lucide-react";

export default function RelatedTopicsCard({
  relatedTopics = [],
  savedRelatedIds,
  onBookmarkClick,
  handleRelatedBookmarkClick,
}) {
  const router = useRouter();
  const onBookmark = onBookmarkClick || handleRelatedBookmarkClick;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <h3 className="font-bold text-[#1B4B66] text-base mb-3">Related Topics</h3>

      <div className="space-y-3">
        {(!relatedTopics || relatedTopics.length === 0) && (
          <p className="text-xs text-gray-400 py-3 text-center">
            No related topics found.
          </p>
        )}

        {relatedTopics?.map((topic) => {
          const isTopicSaved =
            savedRelatedIds?.has?.(topic.id) || Boolean(topic.is_saved);

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
                    {topic.category_name}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => onBookmark?.(topic, e)}
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
  );
}
