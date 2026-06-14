"use client";

import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useGetTermsAndConditions } from "@/hooks";

export default function TermsAndConditionsPage() {
  const { termsData, isLoading, isError } = useGetTermsAndConditions();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !termsData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-500">Failed to load terms and conditions.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 shadow-sm rounded-lg">
        {termsData.title && (
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            {termsData.title}
          </h1>
        )}

        <div
          className="prose prose-gray max-w-none leading-relaxed text-sm sm:text-base [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:pb-2 [&_h2]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mb-3 [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-gray-600 [&_p]:text-gray-600 [&_p]:mb-4 [&_a]:text-primary [&_a]:hover:underline [&_strong]:font-semibold [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-gray-50 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-4"
          dangerouslySetInnerHTML={{ __html: termsData.content || termsData.body || "" }}
        />
      </div>
    </div>
  );
}
