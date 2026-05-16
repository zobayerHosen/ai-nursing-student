import FlashCardSidebar from "./components/flashcard-sidebar";

export default function FlashcardsLayout({ children }) {
  return (
    <div className="flex min-h-screen]">
      {/* Sidebar */}
      <FlashCardSidebar />

      {/* Content */}
      <main className={`flex-1 transition-all duration-300 overflow-y-auto`}>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}