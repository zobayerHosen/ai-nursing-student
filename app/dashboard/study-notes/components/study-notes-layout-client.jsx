"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import StudyNoteSidebar from "./study-notes-sidebar";

export default function StudyNotesLayoutClient({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col xl:flex-row h-full xl:h-[calc(100vh-80px)] relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 xl:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 xl:sticky xl:top-0 xl:self-start xl:translate-x-0
        ${isSidebarOpen ? "translate-x-0 z-999" : "-translate-x-full"} w-[80%] sm:w-80 xl:w-82.5 shrink-0 bg-white xl:h-full`}
      >
        <StudyNoteSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Content */}
      <main className="flex-1 transition-all duration-300 overflow-y-auto w-full">
        {/* Mobile Header Toggle */}
        <div className="xl:hidden p-4 border-b border-black/10 flex items-center gap-3 bg-white sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={20} className="text-[#1B4B66]" />
          </button>
          <h2 className="font-semibold text-lg text-[#1B4B66]">Study Notes Menu</h2>
        </div>

        <div className="p-4 xl:p-6">{children}</div>
      </main>
    </div>
  );
}
