import { Suspense } from "react";
import LibraryMainContent from "./components/library-main-content";
import LibrarySkeleton from "./components/library-skeleton";

export default function MyLibraryPage() {
  return (
    <Suspense fallback={<LibrarySkeleton />}>
      <LibraryMainContent />
    </Suspense>
  );
}
