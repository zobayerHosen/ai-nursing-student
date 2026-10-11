import { Suspense } from "react";
import FlashcardsHeaderTabs from "./components/flashcards-header-tabs";

export default function FlashcardsLayout({ children }) {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F8F9FA]">
      <Suspense fallback={null}>
        <FlashcardsHeaderTabs />
      </Suspense>
      {children}
    </div>
  );
}