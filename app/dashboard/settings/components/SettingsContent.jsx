"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { User, CreditCard, Lock, Bell } from "lucide-react";

// Sub-components
import GeneralSettings from "./GeneralSettings";
import PaymentBillingSettings from "./PaymentBillingSettings";
import PasswordSettings from "./PasswordSettings";
import NotificationSettings from "./NotificationSettings";

export default function SettingsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Active tab state driven directly by the Next.js query parameter
  const activeTab = searchParams.get("tab") || "general";

  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("success");

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleTabChange = (tabId) => {
    // Navigate dynamically to the selected tab. This updates the URL query string.
    router.push(`${pathname}?tab=${tabId}`);
  };

  const tabs = [
    { id: "general", label: "General", icon: <User size={16} /> },
    { id: "payment-billing", label: "Payment & Billing", icon: <CreditCard size={16} /> },
    { id: "password", label: "Password", icon: <Lock size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings showToast={showToast} />;
      case "payment-billing":
        return <PaymentBillingSettings showToast={showToast} />;
      case "password":
        return <PasswordSettings showToast={showToast} />;
      case "notifications":
        return <NotificationSettings showToast={showToast} />;
      default:
        return <GeneralSettings showToast={showToast} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-120px)] bg-slate-50/20 rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3.5 rounded-2xl shadow-xl border animate-slideIn ${toastType === "success"
          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
          : "bg-red-50 text-red-800 border-red-200"
          }`}>
          <div className={`w-2 h-2 rounded-full ${toastType === "success" ? "bg-emerald-500" : "bg-red-500"}`} />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Settings Side Panel */}
      <aside className="w-72 border-r border-black/10 bg-white shrink-0 max-md:w-full max-md:border-r-0 max-md:border-b">
        {/* Header content */}
        <div className="border-b border-black/10 py-4">
          <div className="px-4 flex flex-col gap-4">
            <h4 className="text-[#424242] font-semibold text-lg">Settings</h4>
          </div>
        </div>

        {/* Category list */}
        <div className="w-full p-4 flex flex-col gap-3">
          {tabs?.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2.5 py-2.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 text-left w-full cursor-pointer active:scale-98 ${isActive
                  ? "bg-[#2C5F8D] text-white shadow-sm"
                  : "bg-gray-100 hover:bg-gray-200 text-[#424242]"
                  }`}
              >
                <span className="shrink-0 text-current">{tab?.icon}</span>
                {tab?.label}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Settings Main Content Area */}
      <main className="flex-1 bg-[#FAFBFC] p-8 max-sm:p-6 overflow-y-auto">
        {renderTabContent()}
      </main>
    </div>
  );
};