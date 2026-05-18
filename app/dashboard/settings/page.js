import React, { Suspense } from "react";
import SettingsContent from "./components/SettingsContent";

export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px] text-slate-500 font-semibold animate-pulse">
        Loading Settings...
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
}