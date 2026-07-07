"use client";

import React, { useState } from 'react';
import { IoClose, IoDocumentText } from 'react-icons/io5';

export default function SaveNameModal({
  isOpen,
  onClose,
  onSave,
  isPending,
  defaultTitle = 'Untitled Note',
  isEditing = false,
}) {
  const [title, setTitle] = useState(defaultTitle);

  const handleSave = () => {
    const finalTitle = title.trim() || 'Untitled Note';
    onSave(finalTitle);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isPending) {
      handleSave();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1999] p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2B5C8F]/10 rounded-xl flex items-center justify-center">
              <IoDocumentText className="w-5 h-5 text-[#2B5C8F]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#333E49]">
                {isEditing ? 'Update Note' : 'Save Note'}
              </h3>
              <p className="text-xs text-gray-400">
                {isEditing
                  ? 'Rename and save your changes'
                  : 'Give your note a name'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-gray-400 mb-2 block">
            Note Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Untitled Note"
            className="w-full bg-[#F5F6F7] border border-gray-200 focus:border-[#2B5C8F] focus:bg-white outline-none rounded-xl p-3.5 text-sm text-[#333E49] transition placeholder-gray-300"
            autoFocus
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end border-t border-gray-100 pt-4">
          <button
            onClick={onClose}
            disabled={isPending}
            className="cursor-pointer px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isPending}
            className="cursor-pointer px-5 py-2.5 text-sm font-medium text-white bg-[#2B5C8F] hover:bg-[#224A73] rounded-lg transition shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {isEditing ? 'Updating...' : 'Saving...'}
              </>
            ) : (
              <>{isEditing ? 'Update Note' : 'Save Note'}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
