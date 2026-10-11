"use client";
import TopicItem from "./topic-item";

export default function TopicColumn({
  emptyText,
  savedNoteIds,
  onBookmark,
  onNoteClick,
  subtitle,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1B4B66] flex items-center justify-center">
          {/* <FileText size={16} /> */}
        </div>
        <h3 className="font-bold text-[#1B4B66] text-sm sm:text-base">{"test"}</h3>
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
