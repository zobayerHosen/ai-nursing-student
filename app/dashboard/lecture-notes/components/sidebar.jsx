"use client";

import React, { useState, useEffect } from 'react';
import {
  IoClose,
  IoDocumentText,
  IoCloudUpload,
  IoCreate,
  IoTrashOutline,
} from 'react-icons/io5';
import { useGetNoteLists, useDeleteLectureNote } from '@/hooks/interactive-tools/lecture-notes.hook';
import toast from 'react-hot-toast';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';

function SwipeableNoteItem({
  note,
  currentNoteId,
  onSelectNote,
  handleDeleteNote,
  isDeleting,
  isSwipedOpen,
  onSwipeOpen,
  onSwipeClose,
  stripHtml,
  formatDate,
}) {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const deleteOpacity = useTransform(x, [0, 40], [0, 1]);

  useEffect(() => {
    if (isSwipedOpen) {
      controls.start({ x: 80 });
    } else {
      controls.start({ x: 0 });
    }
  }, [isSwipedOpen, controls]);

  const handleDragEnd = (event, info) => {
    // Swipe right threshold of 30px
    if (info.offset.x > 30) {
      onSwipeOpen(note.id);
    } else {
      onSwipeClose();
    }
  };

  return (
    <div className="relative overflow-hidden w-full rounded-xl bg-transparent">
      {/* Background Delete Button */}
      <motion.div 
        style={{ opacity: deleteOpacity }}
        className="absolute inset-y-0 left-0 w-[80px] flex items-center justify-center bg-red-600 rounded-xl z-0"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteNote(e, note.id);
          }}
          disabled={isDeleting}
          className="w-full h-full flex flex-col items-center justify-center text-white gap-1 cursor-pointer select-none"
        >
          <IoTrashOutline className="w-4 h-4" />
          <span className="text-[10px] font-bold">Delete</span>
        </button>
      </motion.div>

      {/* Draggable Note Card */}
      <motion.div
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 80 }}
        dragElastic={{ left: 0.02, right: 0.1 }}
        animate={controls}
        style={{ x, touchAction: 'pan-y' }}
        onDragEnd={handleDragEnd}
        onClick={() => {
          if (isSwipedOpen) {
            onSwipeClose();
          } else {
            onSelectNote(note);
          }
        }}
        className={`relative flex items-start gap-3 p-3 rounded-xl cursor-pointer border select-none transition-colors duration-200 z-10 ${
          currentNoteId === note.id
            ? 'bg-[#EAEFF4] border-[#BACCDD]'
            : 'bg-[#F8F9FA] hover:bg-[#E9F0F7] border-transparent'
        }`}
      >
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          currentNoteId === note.id
            ? 'bg-[#2B5C8F] text-white'
            : 'bg-[#E3ECF5]/60 text-[#2B5C8F]'
        }`}>
          <IoDocumentText className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold truncate ${
            currentNoteId === note.id ? 'text-[#2B5C8F]' : 'text-[#333E49]'
          }`}>
            {note.title || 'Untitled Note'}
          </h4>
          <p className="text-[11px] text-gray-400 mt-0.5 truncate">
            {stripHtml(note.user_html || '').substring(0, 60) || 'Empty note'}
          </p>
          <p className="text-[10px] text-gray-300 mt-0.5">
            {formatDate(note.updated_at || note.created_at)}
          </p>
        </div>

        {/* Drag Handle indicator */}
        <div className="opacity-0 group-hover:opacity-40 transition-opacity self-center flex-shrink-0 text-gray-400 px-1 cursor-grab active:cursor-grabbing">
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-4">
            <circle cx="2" cy="2" r="1.5" fill="currentColor"/>
            <circle cx="2" cy="8" r="1.5" fill="currentColor"/>
            <circle cx="2" cy="14" r="1.5" fill="currentColor"/>
            <circle cx="8" cy="2" r="1.5" fill="currentColor"/>
            <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
            <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  onConvert,
  isOpen = false,
  setIsOpen,
  currentNoteId,
  onSelectNote,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeSwipeId, setActiveSwipeId] = useState(null);

  const { notesList, isLoading } = useGetNoteLists();
  const { deleteLectureNote, isPending: isDeleting } = useDeleteLectureNote();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleConvertClick = () => {
    if (!selectedFile) {
      toast.error('Please upload a PDF file first!');
      return;
    }
    onConvert(selectedFile);
    if (window.innerWidth < 1024 && setIsOpen) {
      setIsOpen(false);
    }
  };

  const closeSidebar = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  const handleDeleteNote = async (e, noteId) => {
    e.stopPropagation();
    try {
      await deleteLectureNote(noteId);
      toast.success('Note deleted successfully');
      setActiveSwipeId(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete note');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <aside className="w-[320px] bg-white h-full flex flex-col p-6 shrink-0 border-r border-gray-200 shadow-lg lg:shadow-none overflow-y-auto">
      {/* Close button - Mobile/Tablet Only */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <h2 className="text-xl font-bold text-[#333E49]">Lecture Notes</h2>
        <button
          onClick={closeSidebar}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
        >
          <IoClose className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Desktop Title - Hidden on mobile/tablet */}
      <h2 className="text-xl font-bold text-[#333E49] mb-4 hidden lg:block">Lecture Notes</h2>

      {/* Upload vs Notes Toggle Tabs */}
      <div className="w-full flex border-b border-gray-200 mb-6">
        <button
          onClick={() => {
            setActiveTab('upload');
            if (window.innerWidth < 1024 && setIsOpen) setIsOpen(false);
          }}
          className={`cursor-pointer flex-1 py-2 text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'upload' ? 'bg-[#2B5C8F] text-white rounded-t-md' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <IoCloudUpload className="w-4 h-4" />
          <span>Upload</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('notes');
            if (window.innerWidth < 1024 && setIsOpen) setIsOpen(false);
          }}
          className={`cursor-pointer flex-1 py-2 text-sm font-semibold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'notes' ? 'bg-[#2B5C8F] text-white rounded-t-md' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <IoCreate className="w-4 h-4" />
          <span>Notes</span>
        </button>
      </div>

      {activeTab === 'upload' ? (
        <div className="flex flex-col gap-5 flex-1">
          <div>
            <h3 className="text-lg font-bold text-[#333E49] mb-2">Upload Study Materials</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              Upload any file. AI extracts and organises the content into clean study notes.
            </p>

            {/* Dash Border Upload Zone Box */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-[#E3ECF5]/30 hover:bg-[#E3ECF5]/50 rounded-2xl p-6 cursor-pointer transition text-center mb-6 min-h-[160px]">
              <div className="w-10 h-10 bg-[#2B5C8F] text-white rounded-full flex items-center justify-center mb-3 shadow-sm text-base">
                {selectedFile ? <IoDocumentText className="w-5 h-5" /> : <IoCloudUpload className="w-5 h-5" />}
              </div>
              <p className="text-xs font-bold text-[#333E49] truncate max-w-full px-2">
                {selectedFile ? selectedFile.name : 'Drop files or click to browse'}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">PDF • DOCX • PPTX • Images</p>
              <input
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </label>

            {/* Convert Button */}
            <button
              onClick={handleConvertClick}
              className="w-full cursor-pointer bg-[#2B5C8F] hover:bg-[#224A73] text-white py-3 rounded-xl text-xs font-bold tracking-wide transition shadow-sm"
            >
              Convert to Study Notes
            </button>
          </div>
        </div>
      ) : (
        /* Notes Tab */
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-sm font-bold text-[#333E49] mb-3">Saved Notes</h3>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-[#2B5C8F] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : notesList.length === 0 ? (
            <div className="flex-1 text-center text-xs text-gray-400 pt-10">
              <IoDocumentText className="w-8 h-8 mx-auto mb-3 text-gray-300" />
              <p>No saved notes yet.</p>
              <p className="mt-1">Upload a file and save to get started.</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {notesList.map((note) => (
                <SwipeableNoteItem
                  key={note.id}
                  note={note}
                  currentNoteId={currentNoteId}
                  onSelectNote={onSelectNote}
                  handleDeleteNote={handleDeleteNote}
                  isDeleting={isDeleting}
                  isSwipedOpen={activeSwipeId === note.id}
                  onSwipeOpen={setActiveSwipeId}
                  onSwipeClose={() => setActiveSwipeId(null)}
                  stripHtml={stripHtml}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
