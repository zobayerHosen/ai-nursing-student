"use client";

import React from 'react';
import { IoClose, IoWarningOutline } from 'react-icons/io5';

export default function ConfirmDiscardModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Unsaved Changes",
  message = "You have unsaved changes. Do you want to discard them and start a new note?"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1999] p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <IoWarningOutline className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#333E49]">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end border-t border-gray-100 pt-4">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition shadow-sm"
          >
            Discard Changes
          </button>
        </div>
      </div>
    </div>
  );
}
