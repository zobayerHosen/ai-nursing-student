"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { User, CreditCard, Lock, Bell, DollarSign } from "lucide-react";

// Sub-components
import GeneralSettings from "./GeneralSettings";
import PaymentBillingSettings from "./PaymentBillingSettings";
import PasswordSettings from "./user-profile/PasswordSettings";
import NotificationSettings from "./NotificationSettings";
import PricingPage from "@/app/(root)/components/pricing/pricing";

export default function SettingsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Active tab state driven directly by the Next.js query parameter
  const activeTab = searchParams.get("tab") || "general";
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleTabChange = (tabId) => {
    router.push(`${pathname}?tab=${tabId}`);
  };

  const tabs = [
    { id: "general", label: "General", icon: <User size={16} /> },
    { id: "subscription-billing", label: "Subscription Billing", icon: <DollarSign size={16} /> },
    { id: "payment-billing", label: "Payment & Billing", icon: <CreditCard size={16} /> },
    { id: "password", label: "Password", icon: <Lock size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings />;
      case "subscription-billing":
        return <PricingPage />;
      case "payment-billing":
        return <PaymentBillingSettings />;  
      case "password":
        return <PasswordSettings />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  // Note: UI
  return (
    <>
      {/* overlay */}
      <div onClick={() => setOpenSidebar(false)} className={`${openSidebar ? "w-full h-screen fixed top-0 left-0 z-40 bg-black/30 backdrop-blur-sm" : "hidden"}`} />

      {/* Settings Mobile Side Panel Trigger */}
      <div className="xl:hidden flex items-center px-5 mb-4 mt-5">
        <button
          onClick={() => setOpenSidebar(true)}
          className="cursor-pointer w-fit xl:hidden py-3 px-5 bg-white border border-slate-200 rounded-xl shadow-sm text-left flex items-center gap-2.5 hover:bg-gray-50 transition"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3.33333 6.66667H16.6667M3.33333 10H16.6667M3.33333 13.3333H16.6667" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-semibold text-[#424242]">
            {tabs.find(t => t.id === activeTab)?.label || "Settings"}
          </span>
        </button>
      </div>

      <div className="flex flex-col xl:flex-row w-full h-screen overflow-hidden relative">
        {/* Settings Side Panel */}
        <aside
          className={`fixed top-0 left-0 z-100 w-72 h-screen bg-white border-r border-black/10 transform transition-transform duration-300 ease-in-out xl:relative xl:translate-x-0 xl:block ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Header content */}
          <div className="border-b border-black/10 py-4">
            <div className="px-4 flex flex-col gap-4">
              <h4 className="text-[#424242] font-semibold text-lg">
                Settings
              </h4>
            </div>
          </div>

          {/* Category list */}
          <div className="w-full p-4 flex flex-col gap-3">
            {tabs?.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    handleTabChange(tab.id);
                    setOpenSidebar(false);
                  }}
                  className={`flex items-center gap-2.5 py-2.5 px-3 rounded-md text-[13px] font-semibold transition-all duration-200 text-left w-full cursor-pointer active:scale-98 ${isActive
                    ? "bg-[#2C5F8D] text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-[#424242]"
                    }`}
                >
                  <span className="shrink-0 text-current">
                    {tab?.icon}
                  </span>

                  {tab?.label}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Settings Main Content Area */}
        <main className="flex-1 p-4 max-sm:p-6 overflow-y-auto">
          {renderTabContent()}
        </main>
      </div>
    </>
  );
};