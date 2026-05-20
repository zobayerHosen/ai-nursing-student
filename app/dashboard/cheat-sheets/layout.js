import React from 'react';
import CheatSheetsSidebar from "./components/cheat-sheets-sidebar";

const CheatSheetsLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Cheat Sheets Sidebar */}
      <CheatSheetsSidebar />

      {/* Main Content Area */}
      <main className="flex-1 transition-all duration-300 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default CheatSheetsLayout;
