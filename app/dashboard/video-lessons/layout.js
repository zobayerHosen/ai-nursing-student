export const metadata = {
  title: "Nursing Video Lessons | STEMRN",
  description: "Short, visual lessons that make complex nursing concepts easier to understand.",
};

export default function VideoLessonsLayout({ children }) {
  return <div className="w-full min-h-screen bg-[#f8fafc] flex flex-col">{children}</div>;
}
