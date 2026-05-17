import StudyNoteSidebar from "./components/study-notes-sidebar";

const StudyNotesLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <StudyNoteSidebar />

      {/* Content */}
      <main className="flex-1 transition-all duration-300 overflow-y-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default StudyNotesLayout;
