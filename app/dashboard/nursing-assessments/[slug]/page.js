"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLearningCategoryDetails } from "@/hooks/core-learning/learning-category-details.hook";
import NursingBreadcrumb from "../components/nursing-breadcrumb";

export default function NursingAssessmentDetails() {
  const { slug } = useParams();
  const categoryId = Number(slug);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const { learningCategoryDetailsData, isLoading } = useLearningCategoryDetails(categoryId);
  const currentCategory = learningCategoryDetailsData;
  const currentNote = currentCategory?.contents?.[0];

  if (isLoading) {
    return (
      <div className="w-full min-h-[500px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-2xl p-10 border border-[#EEEEEE] shadow-sm text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-[#111827] mb-3">
              Nursing Assessment Not Found
            </h2>
            <p className="text-[#7A7A7A] mb-6">
              The nursing assessment guide you are looking for does not exist or has been moved.
            </p>
            <Link
              href="/dashboard/nursing-assessments"
              className="inline-block px-6 py-2.5 rounded-lg bg-[#FF6B8A] hover:bg-[#E05270] text-white text-sm font-semibold transition cursor-pointer"
            >
              Back to Nursing Assessments
            </Link>
          </div> 
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Top Buttons */}
      <NursingBreadcrumb currentCategory={currentCategory} currentNote={currentNote} />

      {/* Content Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#EEEEEE] shadow-sm relative overflow-hidden flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-6 shrink-0">
          {currentCategory?.title ?? "Not Found"}
        </h1>

        <div className="w-full h-[calc(100vh-250px)] min-h-[500px] relative">
          {currentNote?.content_file_url ? (
            <>
              {isIframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10 rounded-lg">
                  <div className="w-8 h-8 border-4 border-[#FF6B8A] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <iframe 
                src={currentNote.content_file_url.startsWith("http") ? currentNote.content_file_url : `https://${currentNote.content_file_url}`}
                className={`w-full h-full border-0 rounded-lg transition-opacity duration-300 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
                title={currentNote.content_name || "Nursing Assessment Content"}
                sandbox="allow-same-origin allow-scripts"
                onLoad={() => setIsIframeLoading(false)}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No content available for this guide.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
