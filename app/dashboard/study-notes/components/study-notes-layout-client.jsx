"use client";

export default function StudyNotesLayoutClient({ children }) {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
      <div className="w-full p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </div>
  );
}

