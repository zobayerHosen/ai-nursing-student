"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useGetPrivacyPolicy } from "@/hooks";
import logo from "@/public/assets/logo.png";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  const { privacyPolicyData, isLoading, isError } = useGetPrivacyPolicy();
  const router = useRouter();

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#4f7393] text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <Link href="/">
            <Image
              src={logo}
              width={350}
              height={150}
              alt="logo"
              className="object-contain w-32 md:w-36"
            />
          </Link>

          <div className="w-20" />
        </div>
      </header>

      {isLoading ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : isError || !privacyPolicyData ? (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-gray-500">Failed to load privacy policy.</p>
        </div>
      ) : (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {privacyPolicyData.title && (
                <div className="px-6 py-12 sm:px-12 text-center bg-white">
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                    {privacyPolicyData.title}
                  </h1>
                </div>
              )}

              <div
                className="px-6 py-8 sm:px-12 sm:py-10 prose prose-gray max-w-none leading-relaxed text-sm sm:text-base [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:mb-4 [&_h2]:border-l-4 [&_h2]:border-primary [&_h2]:pl-4 [&_h2]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mb-3 [&_h3]:mt-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-gray-600 [&_p]:text-gray-600 [&_p]:mb-4 [&_p]:leading-relaxed [&_a]:text-primary [&_a]:hover:underline [&_strong]:font-semibold [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-[#e8f0f7] [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-4 [&_blockquote]:text-gray-700 [&_blockquote]:text-sm"
                dangerouslySetInnerHTML={{ __html: privacyPolicyData.content || privacyPolicyData.body || "" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
