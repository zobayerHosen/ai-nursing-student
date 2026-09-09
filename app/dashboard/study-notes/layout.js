import StudyNotesLayoutClient from "./components/study-notes-layout-client";

export const metadata = {
  title: "Study Notes | Stemrn",
  description: "AI-Powered Clinical Study Notes for nursing students.",
};

export default function StudyNotesLayout({ children }) {
  return <StudyNotesLayoutClient>{children}</StudyNotesLayoutClient>;
}