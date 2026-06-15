import VideoLessonDetails from "./video-lesson-details";

export default async function VideoLessonDetailsPage({ params }) {
  const { id } = await params;
  return <VideoLessonDetails videoId={id} />;
}
