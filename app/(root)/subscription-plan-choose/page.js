"use client";
import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";
import { useState } from "react";
import { Modal } from "antd";
import { useLogout } from "@/hooks";
import LoadingIcon from "@/components/loading-icon";
import PricingPage from "../components/pricing/pricing";

export default function SubscriptionPlanChoose() {
  const { logout, isPending } = useLogout();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setIsLogoutModalOpen(false);
      },
    });
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-280 mx-auto px-6 md:px-8 flex items-center justify-between h-14 md:h-16">
          {/* Back Button */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-[#0b2447] hover:text-[#ff6b6b] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-[#0b2447] hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <PricingPage />

      {/* Logout Confirmation Modal */}
      <Modal
        open={isLogoutModalOpen}
        onCancel={() => setIsLogoutModalOpen(false)}
        footer={null}
        closeIcon={null}
        centered
        width={420}
      >
        <div className="py-3 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-2">
            <LogOut size={20} className="text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">Logout</h2>
          <p className="text-[13px] text-[#6B7280] leading-5 max-w-75 mb-7">
            Are you sure you want to logout from your account?
          </p>
          <div className="flex items-center justify-center gap-3 w-full">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="cursor-pointer flex-1 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              disabled={isPending}
              className={`cursor-pointer flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition text-sm font-medium ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isPending ? <LoadingIcon /> : "Logout"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
