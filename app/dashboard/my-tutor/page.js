import { Suspense } from "react";
import TutorChat from "./components/tutor-chat";

export default function MyTutorPage() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div className="min-h-screen" />}>
        <TutorChat />
      </Suspense>
    </main>
  );
}
