import LibrarySidebar from "./components/library-sidebar";

export default function LibraryLayout({ children }) {
  return (
    <div className="flex min-h-screen]">
      {/* Sidebar */}
      <LibrarySidebar />

      {/* Content */}
      <div className={`flex-1 transition-all duration-300`}>
        <div className="px-4 sm:px-6 md:px-8 py-6">{children}</div>
      </div>
    </div>
  );
};
