"use client";

import TopicItem from "./topic-item";

export default function TopicGrid({
  topics = [],
  subtitle,
  savedNoteIds,
  onBookmark,
  onNoteClick,
}) {
  if (topics.length === 0) {
    return (
      <p className="text-xs text-gray-400 py-3 text-center">
        No topics in this subcategory.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 pt-2">
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
