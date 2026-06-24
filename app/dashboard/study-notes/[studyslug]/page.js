"use client";

import { useCoreLearning } from "@/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Breadcrumb from "./components/breadcrumb";

export default function StudyNoteDetails() {
  const { studyslug } = useParams();
  const contentId = Number(studyslug);
  const [htmlContent, setHtmlContent] = useState("");
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [contentError, setContentError] = useState(null);

  let currentCategory = null;
  let currentNote = null;

  const { coreLearningData, isLoading: isCategoriesLoading } =
    useCoreLearning("study_notes");
  const categories = coreLearningData || [];

  for (const category of categories) {
    const found = category?.contents?.find((c) => Number(c.id) === contentId);
    if (found) {
      currentCategory = category;
      currentNote = found;
      break;
    }
  }

  const fetchHtmlContent = useCallback(async (url) => {
    if (!url) return;
    setIsContentLoading(true);
    setContentError(null);
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Failed to load content (${response.status})`);
      const html = await response.text();
      setHtmlContent(html);
    } catch (err) {
      setContentError(err.message);
      setHtmlContent("");
    } finally {
      setIsContentLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentNote?.content_file_url) {
      fetchHtmlContent(currentNote.content_file_url);
    } else {
      setHtmlContent("");
      setContentError(null);
    }
  }, [currentNote?.id, currentNote?.content_file_url, fetchHtmlContent]);

  // Helper to parse simple markdown to premium react layout line-by-line
  const renderFormattedContent = (content) => {
    if (!content) return null;

    // Check if content contains HTML tags
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);
    const isFullDocument = /<html/i.test(content) || /<!DOCTYPE/i.test(content);

    // Note: this is the main logic to render the content
    if (isHtml) {
      if (isFullDocument) {
        return (
          <iframe
            srcDoc={content}
            title="Interactive Study Note"
            className="w-full border-none min-h-150 rounded-xl bg-white"
            sandbox="allow-scripts allow-same-origin"
          />
        );
      } else {
        return (
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="study-notes-html-content prose max-w-none"
          />
        );
      }
    }

    return renderedElements;
  };

  // Loading state for categories
  if (isCategoriesLoading) {
    return (
      <div className="w-full min-h-125 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not found state
  if (!currentNote) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-2xl p-10 border border-[#EEEEEE] shadow-sm text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-[#111827] mb-3">
              Note Not Found
            </h2>
            <p className="text-[#7A7A7A] mb-6">
              The study note you are looking for does not exist or has been
              moved.
            </p>
            <Link
              href="/dashboard/study-notes"
              className="inline-block px-6 py-2.5 rounded-lg bg-[#FF6B8A] hover:bg-[#E05270] text-white text-sm font-semibold transition cursor-pointer"
            >
              Back to Study Notes
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="w-full">
      {/* Top Buttons */}
      <Breadcrumb currentCategory={currentCategory} currentNote={currentNote} />

      {/* Content Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#EEEEEE] shadow-sm relative overflow-hidden">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-6">
          {currentNote?.content_name ?? "Not Found"}
        </h1>

        {isContentLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : contentError ? (
          <div className="py-10 text-center">
            <p className="text-red-500">
              Failed to load content: {contentError}
            </p>
          </div>
        ) : (
          <div className="w-full">
            {htmlContent ? (
              renderFormattedContent(htmlContent)
            ) : (
              <p className="text-gray-500 text-center py-10">
                No content available for this note.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
