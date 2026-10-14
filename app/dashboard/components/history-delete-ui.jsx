"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

/**
 * Reusable Clear All Confirmation Banner/Box
 */
export function ClearAllConfirmBox({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
  itemType = "items",
  title = "Clear all history items?",
  message,
}) {
  const displayMessage =
    message ||
    `This action will permanently delete all saved ${itemType} from history.`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0,  height: 0, scale: 0.96 }}
          animate={{ opacity: 1, height: "auto", scale: 1 }}
          exit={{ opacity: 0, height: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden mb-3"
        >
          <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FEE2E2] flex flex-col gap-2.5 my-1">
            <div className="flex items-center gap-2 text-[#D92D20]">
              <AlertTriangle size={16} className="shrink-0" />
              <p className="text-xs font-bold">{title}</p>
            </div>
            <p className="text-[11px] text-[#7A271A] leading-relaxed">
              {displayMessage}
            </p>
            <div className="flex items-center justify-end gap-2 mt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeleting}
                className="px-2.5 py-1 rounded-md text-xs font-semibold text-[#344054] bg-white border border-[#D0D5DD] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="px-2.5 py-1 rounded-md text-xs font-semibold text-white bg-[#D92D20] hover:bg-red-700 transition-colors cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Clearing...
                  </>
                ) : (
                  "Yes, Clear All"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Reusable Single Item Inline Delete Confirmation Box
 */
export function SingleDeleteConfirmBox({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
  title = "Delete this item?",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.15 }}
          className="overflow-hidden mt-2 pt-2 border-t border-red-100"
        >
          <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2] flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[#D92D20]">
              <AlertTriangle size={14} className="shrink-0" />
              <p className="text-[11px] font-bold">{title}</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose?.();
                }}
                disabled={isDeleting}
                className="px-2 py-0.5 rounded text-[10px] font-semibold text-[#344054] bg-white border border-[#D0D5DD] hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm?.();
                }}
                disabled={isDeleting}
                className="px-2 py-0.5 rounded text-[10px] font-semibold text-white bg-[#D92D20] hover:bg-red-700 cursor-pointer inline-flex items-center gap-1 disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader2 size={10} className="animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Reusable Delete Trigger Icon Button
 */
export function DeleteIconButton({
  onClick,
  disabled = false,
  title = "Delete item",
  className = "absolute bottom-2.5 right-2.5 p-1.5 rounded-md text-[#98A2B3] hover:bg-red-50 hover:text-[#D92D20] transition-colors cursor-pointer",
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      disabled={disabled}
      className={className}
      title={title}
    >
      <Trash2 size={14} />
    </button>
  );
}
