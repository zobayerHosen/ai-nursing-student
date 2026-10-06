"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExitLockModal({ isOpen, onClose, onConfirm }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-100 bg-[#0f172a]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 max-w-125 w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-[#e2e8f0]/80 relative flex flex-col gap-4"
          >
            {/* Header with Alert Icon & Title */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-error-50 border border-error-100 text-error flex items-center justify-center shrink-0 shadow-2xs">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-[18px] font-bold text-[#0f172a] leading-tight">
                  Lock and exit this exam?
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#475569] leading-relaxed mt-1.5">
                  This is a <strong className="text-[#1e293b] font-semibold">Next-Gen NCLEX RN Simulator</strong> exam. Once you
                  exit, this exam will be{" "}
                  <strong className="text-error font-bold">permanently locked</strong> — you won&apos;t be
                  able to retake it or review your answers again.
                </p>
              </div>
            </div>

            {/* Amber Tip Notice */}
            <div className="bg-warning-50 border border-[#fef08a] rounded-xl px-4 py-3 text-xs sm:text-[13px] text-[#854d0e] leading-relaxed flex items-start gap-2.5 shadow-2xs">
              <span className="text-base leading-none select-none">💡</span>
              <p>
                If you&apos;d like to spend more time reviewing your rationales, click
                Cancel — there&apos;s no time limit on the review screen.
              </p>
            </div>

            {/* Red Integrity Warning Box */}
            <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-xl px-4 py-3 text-xs sm:text-[13px] text-[#9f1239] leading-relaxed flex items-start gap-2.5 shadow-2xs">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 mt-0.5 text-error"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <p>
                <strong className="font-bold text-[#881337]">Account Integrity Notice:</strong> Sharing exam content, taking
                screenshots, downloading, copying, or pasting any part of this
                exam will result in{" "}
                <strong className="font-bold text-[#881337]">
                  permanent termination of your account
                </strong>{" "}
                with no refund.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4.5 py-2.5 bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] text-[#334155] text-xs sm:text-[13.5px] font-semibold rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
              >
                Cancel — keep reviewing
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="px-5 py-2.5 bg-error hover:bg-[#b91c1c] text-white text-xs sm:text-[13.5px] font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98]"
              >
                Lock exam &amp; exit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
