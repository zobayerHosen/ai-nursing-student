"use client";

import React, { useMemo, useState } from "react";
import { Calendar, Check, ArrowUpDown, Download } from "lucide-react";
import { BillingPlanSkeleton } from "./BillingPlanSkeleton";
import Link from "next/link";
import { useGetUser } from "@/hooks";
import LoadingIcon from "@/components/loading-icon";
import PaymentBillingHistory from "./PaymentBillingHistory";
import { useSubscriptionPlanCancel } from "@/hooks/subscription-plan";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function PaymentBillingSettings() {
  const { user, isLoading: billingPlanLoading } = useGetUser();
  const { subscripitonPlanCancel, isPending } = useSubscriptionPlanCancel();
  const queryClient = useQueryClient();

  const handlePlanCancel = () => {
    subscripitonPlanCancel(undefined, {
      onSuccess: (data) => {
        toast.success(data?.message ?? "Plan cancel successfully!");
        queryClient.invalidateQueries({ queryKey: ["user"] })
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong")
      }
    });
  };

  // Note: UI
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Row 1: Billing Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">
            Billing plan
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Manage your active subscription plan, cancel, or switch tiers.
          </p>
        </div>

        <div className="lg:col-span-2">
          {
            billingPlanLoading ? (
              <BillingPlanSkeleton />
            ) : (
              <div className="border border-slate-200 rounded-3xl bg-white shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50/50 px-6 py-4.5 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 shadow-sm shrink-0">
                      <Calendar size={18} />
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-850 text-base">
                        {user?.subscription?.access_days}-Day Access
                      </h4>

                      <p className="text-xs text-slate-500">
                        {user?.subscription?.plan_name ?? "N/F"}
                      </p>
                    </div>
                  </div>
                  {/* Plan cancel and switch buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePlanCancel}
                      disabled={isPending || !user?.subscription?.auto_renew}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all active:scale-98 ${!user?.subscription?.auto_renew
                        ? "border border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "border border-slate-200 bg-red-300 hover:bg-slate-50 text-slate-650 cursor-pointer"
                        }`}
                    >
                      {isPending
                        ? <LoadingIcon />
                        : !user?.subscription?.auto_renew
                          ? "Plan canceled"
                          : "Cancel plan"}
                    </button>

                    <Link
                      href={"/dashboard/subscription-plan"}
                      className="bg-[#2C5F8D] hover:bg-[#224b70] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      Switch Plan
                    </Link>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                        ${user?.subscription?.package_price ?? "00"}
                      </span>

                      <span className="text-sm text-slate-400 font-medium">
                        per {user?.subscription?.billing_interval ?? "N/F"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user?.subscription?.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {user?.subscription?.is_active ? "Active" : "Inactive"}
                      </span>

                      {user?.subscription?.is_trialing && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          Trial Active
                        </span>
                      )}

                      {user?.subscription?.auto_renew && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                          Auto Renew
                        </span>
                      )}
                      {user?.subscription?.cancel_at_period_end && (
                        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
                          <p className="text-sm font-medium text-amber-800">
                            Subscription Cancelled
                          </p>
                          <p className="mt-1 text-xs text-amber-700">
                            Your subscription has been cancelled and will expire on{" "}
                            <span className="font-semibold">
                              {new Date(
                                user?.subscription?.current_period_end
                              ).toLocaleDateString()}
                            </span>
                            . Please subscribe again to continue accessing premium features after
                            this date.
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-slate-500 mt-3">
                      Next billing date:{" "}
                      <span className="font-medium">
                        {user?.subscription?.current_period_end
                          ? new Date(
                            user?.subscription?.current_period_end
                          ).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      What&apos;s Included
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {user?.subscription?.features
                        ?.filter(Boolean)
                        ?.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex gap-2.5 items-start text-sm text-slate-650 font-medium"
                          >
                            <span className="bg-pink-50 text-pink-500 rounded-full w-5 h-5 flex items-center justify-center shrink-0 shadow-sm mt-0.5 border border-pink-100/60">
                              <Check size={11} strokeWidth={3} />
                            </span>

                            <span>{feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>

      <hr className="border-slate-200/80" />

      {/* Billing History Table */}
      <PaymentBillingHistory />
    </div>
  );
};