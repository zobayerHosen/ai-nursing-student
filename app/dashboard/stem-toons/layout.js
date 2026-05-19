import React from 'react';
import StemToonsSidebar from "./components/stem-toons-sidebar";

const StemToonsLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Stem Toons Sidebar */}
      <StemToonsSidebar />

      {/* Main Content Area */}
      <main className="flex-1 transition-all duration-300 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default StemToonsLayout;
