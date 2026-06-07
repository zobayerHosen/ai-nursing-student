"use client";

import React, { useState } from "react";
import { Calendar, Check, ArrowUpDown } from "lucide-react";
import { useGetMySubscription } from "@/hooks/subscription-plan/get-my-subscription-data";
import { BillingPlanSkeleton } from "./BillingPlanSkeleton";
import Link from "next/link";

// Dummy billing invoices data
const initialInvoices = [
  { id: "inv-2023", name: "30-Day Access", date: "10 Nov 2023, 08:00 AM", amount: "$100.00", status: "Paid" },
  { id: "inv-2022", name: "30-Day Access", date: "10 Nov 2022, 08:00 AM", amount: "$100.00", status: "Paid" },
  { id: "inv-2021", name: "30-Day Access", date: "10 Nov 2021, 08:00 AM", amount: "$100.00", status: "Paid" },
  { id: "inv-2020", name: "30-Day Access", date: "10 Nov 2020, 08:00 AM", amount: "$100.00", status: "Paid" },
];

export default function PaymentBillingSettings({ showToast }) {
  const { mySubscriptionData, isLoading: billingPlanLoading } = useGetMySubscription();
  const [invoices, setInvoices] = useState(initialInvoices);
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  // Sorting Invoices by Date
  const handleSortInvoices = () => {
    const sorted = [...invoices].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
    setInvoices(sorted);
    setSortAsc(!sortAsc);
    showToast(`Sorted invoices ${sortAsc ? "oldest first" : "newest first"}`);
  };

  // Multiple selection for history
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedInvoices(invoices.map((inv) => inv.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleSelectRow = (checked, id) => {
    if (checked) {
      setSelectedInvoices((prev) => [...prev, id]);
    } else {
      setSelectedInvoices((prev) => prev.filter((item) => item !== id));
    }
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
                        {mySubscriptionData?.access_days}-Day Access
                      </h4>

                      <p className="text-xs text-slate-500">
                        {mySubscriptionData?.plan_name ?? "N/F"}
                      </p>
                    </div>
                  </div>
                  {/* Plan cancel and switch buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => showToast("Cancellation workflow started.")}
                      className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-98"
                    >
                      Cancel Plan
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
                        ${mySubscriptionData?.package_price ?? "00"}
                      </span>

                      <span className="text-sm text-slate-400 font-medium">
                        per {mySubscriptionData?.billing_interval ?? "N/F"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${mySubscriptionData?.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {mySubscriptionData?.is_active ? "Active" : "Inactive"}
                      </span>

                      {mySubscriptionData?.is_trialing && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          Trial Active
                        </span>
                      )}

                      {mySubscriptionData?.auto_renew && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                          Auto Renew
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-500 mt-3">
                      Next billing date:{" "}
                      <span className="font-medium">
                        {mySubscriptionData?.current_period_end
                          ? new Date(
                            mySubscriptionData?.current_period_end
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
                      {mySubscriptionData?.features
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

      {/* Row 2: Billing History Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 tracking-tight">Billing history</h3>
          <p className="text-slate-400 text-xs mt-1">Review previous payments, transaction receipts, and invoice status.</p>
        </div>

        <div className="lg:col-span-2">
          <div className="border border-slate-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-125">
                <thead>
                  <tr className="bg-slate-50/80 text-slate-700 text-xs font-bold border-b border-slate-200">
                    <th className="py-4 px-6 w-12">
                      <input
                        type="checkbox"
                        className="rounded border-slate-350 text-[#2C5F8D] focus:ring-[#2C5F8D] w-4 h-4 cursor-pointer"
                        checked={selectedInvoices.length === invoices.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th className="py-4 px-4 font-bold select-none cursor-pointer" onClick={handleSortInvoices}>
                      <span className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                        Invoice
                        <ArrowUpDown size={13} className="text-slate-400 shrink-0" />
                      </span>
                    </th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Amount</th>
                    <th className="py-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {invoices.map((inv) => {
                    const isSelected = selectedInvoices.includes(inv.id);
                    return (
                      <tr key={inv.id} className={`hover:bg-slate-50/50 transition-colors ${isSelected ? "bg-slate-50/30" : ""}`}>
                        <td className="py-4 px-6">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300 text-[#2C5F8D] focus:ring-[#2C5F8D] w-4 h-4 cursor-pointer"
                            checked={isSelected}
                            onChange={(e) => handleSelectRow(e.target.checked, inv.id)}
                          />
                        </td>
                        <td className="py-4 px-4 font-bold text-slate-800">{inv.name}</td>
                        <td className="py-4 px-4 text-slate-500">{inv.date}</td>
                        <td className="py-4 px-4 font-bold text-slate-750">{inv.amount}</td>
                        <td className="py-4 px-4">
                          <span className="inline-flex bg-emerald-50 text-emerald-600 border border-emerald-200/80 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};