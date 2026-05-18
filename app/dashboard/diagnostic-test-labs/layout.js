import DiagnosticSidebar from "./components/diagnostic-sidebar";

export default function DiagnosticTestLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <DiagnosticSidebar />

      {/* Content */}
      <main className="flex-1 transition-all duration-300 overflow-y-auto bg-[#F8F9FA]">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
