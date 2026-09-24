import { Suspense } from "react";
import VideoLessonsClient from "./components/video-lessons-client";

export default function VideoLessonsPage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[#f8fafc]" />}>
      <VideoLessonsClient />
    </Suspense>
  );
}

