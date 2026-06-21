"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetNotificationSettings, useUpdateNotificationSettings } from "@/hooks";
import LoadingIcon from "@/components/loading-icon";

export default function NotificationSettings() {
  const { notificationSettings, isLoading, isError } = useGetNotificationSettings();
  const { updateNotificationSettings, isPending } = useUpdateNotificationSettings();

  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    if (notificationSettings) {
      reset(notificationSettings);
    }
  }, [notificationSettings, reset]);

  const onSubmit = (data) => {
    updateNotificationSettings(data, {
      onSuccess: (response) => {
        toast.success(response?.message ?? "Notification settings updated!");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <LoadingIcon />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 text-sm">
        Failed to load notification settings.{" "}
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="underline cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  const notifications = [
    {
      id: "transaction_confirmation",
      title: "Transaction Confirmation",
      description:
        "Sent automatically to the customer after they place their order.",
    },
    {
      id: "transaction_edited",
      title: "Transaction Edited",
      description:
        "Sent to the customer after their order is edited (if you select this option).",
    },
    {
      id: "transaction_invoice",
      title: "Transaction Invoice",
      description:
        "Sent to the customer when the order has an outstanding balance.",
    },
    {
      id: "transaction_cancelled",
      title: "Transaction Cancelled",
      description:
        "Sent automatically to the customer if their order is cancelled (if you select this option).",
    },
    {
      id: "transaction_refund",
      title: "Transaction Refund",
      description:
        "Sent automatically to the customer if their order is refunded (if you select this option).",
    },
    {
      id: "payment_error",
      title: "Payment Error",
      description:
        "Sent automatically to the customer if their payment can't be processed during checkout.",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white animate-fadeIn w-full max-w-5xl"
    >
      <div className="w-full flex justify-between">
        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Notifications
        </h2>

        {/* Notification List */}
        <div className="space-y-10">
          {notifications?.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-8"
            >
              <div className="max-w-xl">
                <h3 className="text-base font-medium text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500 leading-6">
                  {item.description}
                </p>
              </div>

              {/* Toggle */}
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  {...register(item.id)}
                  className="peer sr-only"
                />

                <div className="h-7 w-12 rounded-full bg-gray-200 transition-all peer-checked:bg-[#2C5F8D] after:absolute after:left-0.5 after:top-0.5 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
              </label>
            </div>
          ))}
        </div>

      </div>
      {/* Divider */}
      <div className="border-t border-gray-200 mt-12 pt-6">
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className={`cursor-pointer px-6 py-2.5 bg-[#2C5F8D] hover:bg-[#234d74] text-white text-sm font-medium rounded-md transition-colors ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isPending ? <LoadingIcon /> : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
}