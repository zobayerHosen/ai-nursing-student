"use client";
import { Bookmark, CheckCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SaveNoteModal from '@/components/save-note-modal';
import ShareNoteModal from '@/components/share-note-modal';
import { useMarkComplete } from '@/hooks/core-learning/mark-complete.hook';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const StemBreadcrumb = ({ currentCategory, currentNote }) => {
    const queryClient = useQueryClient();
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareUrl, setShareUrl] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    
    const { markComplete, isPending } = useMarkComplete();

    useEffect(() => {
        setIsSaved(currentNote?.is_saved || currentNote?.saved || false);
        setIsCompleted(currentNote?.is_completed || currentNote?.completed || false);
    }, [currentNote]);

    const handleShareClick = () => {
        if (typeof window !== 'undefined') {
            setShareUrl(window.location.href);
        }
        setIsShareModalOpen(true);
    };

    const handleToggleComplete = async () => {
        if (!currentNote?.id) return;
        try {
            const data = await markComplete({ id: currentNote?.id });
            queryClient.invalidateQueries({ queryKey: ["core-learning-content-details", currentNote?.id] });
            queryClient.invalidateQueries({ queryKey: ["core-learning"] });
            setIsCompleted(!isCompleted);
            toast.success(data?.message || `Marked as ${!isCompleted ? 'completed' : 'incomplete'}`);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to update status");
        }
    };

    return (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
            {/* breadcrumb */}
            <nav className="overflow-x-auto whitespace-nowrap pb-2 xl:pb-0 hide-scrollbar">
                <ol className="flex items-center text-sm xl:text-base">
                    <li>
                        <Link
                            href="/dashboard/stem-toons"
                            className="text-[#2C5F8D] hover:text-[#111827] font-medium"
                        >
                            {currentCategory?.title || "Stem Toons"}
                        </Link>
                    </li>
                    <li className="text-[#696868] pl-2">
                        {" "}
                        ({currentCategory?.contents?.length || 0} topics)
                    </li>
                    <li>
                        <span className="mx-2 text-[#7A7A7A]">/</span>
                    </li>
                    <li>
                        <span className="text-[#7A7A7A]">
                            {currentNote?.content_name}
                        </span>
                    </li>
                </ol>
            </nav>
            {/* action buttons */}
            <div className="flex flex-wrap items-center gap-2 xl:gap-3">
                <button
                    onClick={() => !isSaved && setIsSaveModalOpen(true)}
                    disabled={isSaved}
                    className={`px-3 xl:px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium transition shadow-sm ${
                        isSaved
                            ? "bg-green-50 border-green-200 text-green-600 cursor-default"
                            : "cursor-pointer bg-white border-[#E5E7EB] text-[#4A4A4A] hover:bg-slate-50"
                    }`}
                >
                    <Bookmark
                        className={`w-4 h-4 ${isSaved ? "text-green-600 fill-green-600" : "text-[#7A7A7A]"}`}
                    />

                    <span className="hidden sm:inline">
                        {isSaved ? "Saved" : "Save Toon"}
                    </span>
                    <span className="sm:hidden">{isSaved ? "Saved" : "Save"}</span>
                </button>

                <button 
                    onClick={handleShareClick}
                    className="px-3 xl:px-4 py-2 rounded-lg bg-white border border-[#E5E7EB] flex items-center gap-2 text-sm text-[#4A4A4A] font-medium hover:bg-slate-50 transition cursor-pointer shadow-sm"
                >
                    <Share2 className="w-4 h-4 text-[#7A7A7A]" />
                    <span className="hidden sm:inline">Share Toon</span>
                    <span className="sm:hidden">Share</span>
                </button>

                <button
                    onClick={handleToggleComplete}
                    disabled={isPending}
                    className={`px-3 xl:px-4 py-2 rounded-lg text-white flex items-center gap-2 text-sm font-semibold transition cursor-pointer shadow-sm ${
                        isCompleted 
                            ? "bg-[#10B981] hover:bg-[#059669]" 
                            : "bg-[#FF6B8A] hover:bg-[#E05270]"
                    } ${isPending ? 'opacity-70 pointer-events-none' : ''}`}
                >
                    {isPending ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <CheckCircle className="w-4 h-4" />
                    )}
                    <span className="hidden sm:inline">
                        {isCompleted ? "Completed" : "Mark Completed"}
                    </span>
                    <span className="sm:hidden">
                       {isCompleted ? "Completed" : "Complete"}
                    </span>
                </button>
            </div>

            <SaveNoteModal 
                isModalOpen={isSaveModalOpen} 
                setIsModalOpen={setIsSaveModalOpen} 
                noteId={currentNote?.id} 
                onSaveSuccess={() => setIsSaved(true)}
            />
            <ShareNoteModal
                isModalOpen={isShareModalOpen}
                setIsModalOpen={setIsShareModalOpen}
                shareUrl={shareUrl}
            />
        </div>
    );
};

export default StemBreadcrumb;
