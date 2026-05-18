import EcgSidebar from "./components/ecg-sidebar";

export default function EcgMasteryLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <EcgSidebar />

      {/* Content */}
      <main className="flex-1 transition-all duration-300 overflow-y-auto bg-[#F8F9FA]">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
