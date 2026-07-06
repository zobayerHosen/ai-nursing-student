"use client";

import { useGetCoreLearningContentDetails } from "@/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import DashboardBreadcrumb from "@/app/dashboard/components/dashboard-breadcrumb";

export default function CheatSheetClient() {
  const { sheetslug } = useParams();
  const contentId = Number(sheetslug);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const { topicDetailsData: currentNote, isLoading } = useGetCoreLearningContentDetails(contentId);
  const currentCategory = null;

  // Loading state
  if (isLoading) {
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
              Cheat Sheet Not Found
            </h2>
            <p className="text-[#7A7A7A] mb-6">
              The Cheat Sheet you are looking for does not exist or has been
              moved.
            </p>
            <Link
              href="/dashboard/cheat-sheets"
              className="inline-block px-6 py-2.5 rounded-lg bg-[#FF6B8A] hover:bg-[#E05270] text-white text-sm font-semibold transition cursor-pointer"
            >
              Back to Cheat Sheets
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      {/* Top Buttons */}
      <DashboardBreadcrumb
        backHref="/dashboard/cheat-sheets"
        backLabel={currentCategory?.title || "Cheat Sheets"}
        currentNote={currentNote}
        saveLabel="Save Sheet"
        showComplete={true}
      />

      {/* Content Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#EEEEEE] shadow-sm relative overflow-hidden flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mb-6 shrink-0">
          {currentNote?.content_name ?? "Not Found"}
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
                title={currentNote.content_name || "Note Content"}
                sandbox="allow-same-origin allow-scripts"
                onLoad={() => setIsIframeLoading(false)}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No content available for this sheet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
