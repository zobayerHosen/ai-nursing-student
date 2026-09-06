"use client";

import { useState } from "react";
import { Menu, X, BookMarked } from "lucide-react";
import LibrarySidebar from "./components/library-sidebar";

export default function LibraryLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F8FAFC] p-3 sm:p-5 md:p-6 lg:p-8">
      {/* Mobile Top Bar (toggle sidebar) */}
      <div className="lg:hidden mb-4 flex items-center justify-between bg-white rounded-xl border border-gray-200/80 p-3 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-[#1B4B66] transition-colors cursor-pointer"
            aria-label="Open library menu"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#1B4B66]">
            <BookMarked size={16} />
            <span>Library Folders</span>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-white shadow-2xl z-50 p-4 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
              <h3 className="font-bold text-sm text-[#1B4B66]">Library Navigation</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1">
              <LibrarySidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop & Mobile Main Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6 w-full max-w-400 mx-auto">
        {/* Desktop Sidebar (Left Panel) */}
        <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-4">
          <LibrarySidebar />
        </div>

        {/* Main Content Area (Right Panel) */}
        <main className="flex-1 min-w-0 w-full">{children}</main>
      </div>
    </div>
  );
}
