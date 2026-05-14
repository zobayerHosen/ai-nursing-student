import LibrarySidebar from "./components/library-sidebar";

export default function LibraryLayout({ children }) {
  return (
    <div className="flex min-h-screen]">
      {/* Sidebar */}
      <LibrarySidebar />

      {/* Content */}
      <main className={`flex-1 transition-all duration-300 overflow-y-auto`}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};
