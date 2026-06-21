"use client";

import { useEffect, useRef } from "react";
import { GoBellFill } from "react-icons/go";
import { Check, X } from "lucide-react";
import { useReadAllNotification, useUserGetNotifications } from "@/hooks";
import LoadingIcon from "@/components/loading-icon";
import toast from "react-hot-toast";

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, unreadCount, isLoading, isError, refetch } = useUserGetNotifications();
  const { readAllNotification, isPending } = useReadAllNotification();
  const panelRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;


  const notificationRead = () => {
    readAllNotification(undefined, {
      onSuccess: (data) => {
        toast.success(data?.message)
        refetch();
      },
      onError: (error) => {
          toast.error(error?.response?.data?.message)
      },
    });
  }

  // Note: UI
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Notification Panel */}
      <div
        ref={panelRef}
        className="fixed md:absolute top-16 md:top-7 right-0 md:right-0 md:mt-3 z-1000 w-full sm:w-96 md:w-105 bg-white rounded-none md:rounded-2xl shadow-xl md:shadow-2xl border-0 md:border border-gray-200 md:max-h-150 flex flex-col animate-in slide-in-from-top-2 fade-in duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#2C5F8D]/10 flex items-center justify-center">
              <GoBellFill className="text-[#2C5F8D] text-lg" />
            </div>
            <div>
              <h3 className="font-bold text-[15px] text-gray-800">
                Notifications
              </h3>
              <p className="text-[11px] text-gray-400 font-medium">
                {isLoading ? "..." : `${unreadCount} unread`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-[#2C5F8D] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <GoBellFill className="text-red-300 text-2xl" />
              </div>
              <h4 className="text-sm font-semibold text-gray-600 mb-1">
                Failed to load
              </h4>
              <p className="text-xs text-gray-400 max-w-56">
                Could not load notifications. Try again later.
              </p>
            </div>
          ) : notifications?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <GoBellFill className="text-gray-300 text-2xl" />
              </div>
              <h4 className="text-sm font-semibold text-gray-600 mb-1">
                No notifications yet
              </h4>
              <p className="text-xs text-gray-400 max-w-56">
                We&apos;ll notify you when there&apos;s something new.
              </p>
            </div>
          ) : (
            notifications?.map((notification) => (
              <div
                key={notification.id}
                className={`px-5 py-4 border-l-2 transition-colors hover:bg-gray-50/80 cursor-pointer ${"bg-white border-l-transparent"
                  }`}
              >
                <div className="flex items-start gap-3">
                  {/* Read/Unread Indicator */}
                  {notification.is_read ? (
                    <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <Check size={12} className="text-gray-400" />
                    </span>
                  ) : (
                    <span className="mt-1.5 flex h-2 w-2 shrink-0 items-center justify-center bg-blue-400 rounded-full">
                      <span
                        className={`h-2.5 w-2.5 rounded-full animate-pulse`}
                      />
                    </span>
                )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[13px] font-semibold text-gray-800 leading-snug">
                        {notification?.event}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap shrink-0 mt-0.5">
                        {new Date(notification?.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed line-clamp-2">
                      {notification?.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-gray-100 px-5 py-3">
          <button
            onClick={notificationRead}
            disabled={isPending}
            className="w-full text-center text-[12px] font-semibold text-[#2C5F8D] hover:text-[#224b70] py-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <LoadingIcon /> : "Mark all as read"}
          </button>
        </div>
      </div>
    </>
  );
}
