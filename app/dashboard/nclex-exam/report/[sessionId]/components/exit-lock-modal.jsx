"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCloseReport } from "@/hooks";

export default function ExitLockModal({
  sessionId,
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  onOpen: externalOnOpen,
  targetUrl = null,
  onExitStart,
  onExitSuccess,
  onExitError,
  showTriggerButton = true,
}) {
  const router = useRouter();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { closeReport, isPending } = useCloseReport();

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (externalOnOpen) {
      externalOnOpen();
    } else {
      setInternalIsOpen(true);
    }
  };

  const handleClose = () => {
    if (isPending) return;
    if (externalOnClose) {
      externalOnClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  // Close on Escape key press and prevent background scrolling while modal is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen && !isPending) {
        handleClose();
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
  }, [isOpen, isPending]);

  const handleExitConfirm = async () => {
    if (!sessionId) return;
    try {
      if (onExitStart) {
        onExitStart();
      }
      await closeReport({
        session_id: Number(sessionId) || sessionId,
      });
      if (onExitSuccess) {
        onExitSuccess();
      }
      if (targetUrl && targetUrl !== "/dashboard/nclex-exam") {
        if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) {
          window.location.href = targetUrl;
        } else {
          router.push(targetUrl);
        }
      }
      handleClose();
    } catch {
      if (onExitError) {
        onExitError();
      }
      // error toast handled in useCloseReport onError
    }
  };

  return (
    <>
      {showTriggerButton && (
        <div className="w-full flex items-center justify-center mt-7">
          <button
            type="button"
            onClick={handleOpen}
            className="cursor-pointer text-black bg-red-300 hover:bg-red-400 font-medium text-xs sm:text-sm py-2 px-8 rounded-lg transition-all active:scale-[0.98] flex items-center gap-2 mt-3"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Exit &amp; Lock</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 z-120 bg-[#0f172a]/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
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
                  onClick={handleClose}
                  disabled={isPending}
                  className="px-4.5 py-2.5 bg-white border border-[#e2e8f0] hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed text-[#334155] text-xs sm:text-[13.5px] font-semibold rounded-xl transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
                >
                  Cancel — keep reviewing
                </button>
                <button
                  type="button"
                  onClick={handleExitConfirm}
                  disabled={isPending}
                  className="px-5 py-2.5 bg-error hover:bg-[#b91c1c] disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs sm:text-[13.5px] font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-[0.98] flex items-center gap-2"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      <span>Locking &amp; Exiting...</span>
                    </>
                  ) : (
                    <span>Lock exam &amp; exit</span>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
