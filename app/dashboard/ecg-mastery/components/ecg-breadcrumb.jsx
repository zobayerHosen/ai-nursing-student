"use client";
import { Bookmark, Share2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SaveNoteModal from '@/components/save-note-modal';
import ShareNoteModal from '@/components/share-note-modal';

const EcgBreadcrumb = ({ currentCategory, currentNote }) => {
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);


    useEffect(() => {
        setIsSaved(currentNote?.is_saved || currentNote?.saved || false);
    }, [currentNote]);


    return (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
            {/* breadcrumb */}
            <nav className="overflow-x-auto whitespace-nowrap pb-2 xl:pb-0 hide-scrollbar">
                <ol className="flex items-center text-sm xl:text-base">
                    <li>
                        <Link
                            href="/dashboard/ecg-mastery"
                            className="text-[#2C5F8D] hover:text-[#111827] font-medium"
                        >
                            ECG Mastery
                        </Link>
                    </li>
                    <li>
                        <span className="mx-2 text-[#7A7A7A]">/</span>
                    </li>
                    <li>
                        <span className="text-[#7A7A7A]">
                            {currentCategory?.title || currentNote?.content_name}
                        </span>
                    </li>
                </ol>
            </nav>
            {/* action buttons */}
            <div className="flex flex-wrap items-center gap-2 xl:gap-3">
                <button
                    onClick={() => !isSaved && setIsSaveModalOpen(true)}
                    disabled={isSaved}
                    className={`px-3 xl:px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium transition shadow-sm ${isSaved
                            ? "bg-green-50 border-green-200 text-green-600 cursor-default"
                            : "cursor-pointer bg-white border-[#E5E7EB] text-[#4A4A4A] hover:bg-slate-50"
                        }`}
                >
                    <Bookmark
                        className={`w-4 h-4 ${isSaved ? "text-green-600 fill-green-600" : "text-[#7A7A7A]"}`}
                    />

                    <span className="hidden sm:inline">
                        {isSaved ? "Saved" : "Save Guide"}
                    </span>
                    <span className="sm:hidden">{isSaved ? "Saved" : "Save"}</span>
                </button>
            </div>

            <SaveNoteModal
                isModalOpen={isSaveModalOpen}
                setIsModalOpen={setIsSaveModalOpen}
                noteId={currentNote?.id}
                onSaveSuccess={() => setIsSaved(true)}
            />
        </div>
    );
};
export default EcgBreadcrumb;
