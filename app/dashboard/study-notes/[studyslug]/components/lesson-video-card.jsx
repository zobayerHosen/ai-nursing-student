"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Bookmark, Video, Volume2, VolumeX, Maximize } from "lucide-react";
import { getSecureUrl } from "@/utils";
import { useAddVideoToFavorite, usePostVideoProgress } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === null || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function LessonVideoCard({
  video,
  categoryName,
  noteTitle,
  onBookmarkNote,
  isNoteSaved,
}) {
  const queryClient = useQueryClient();
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const { addVideoToFavorite } = useAddVideoToFavorite();
  const { videoProgress } = usePostVideoProgress();
  const [isFavorite, setIsFavorite] = useState(Boolean(video?.is_favorite));

  // Sync initial video data
  useEffect(() => {
    if (video) {
      const initialCurrent =
        video.current_duration ?? video.progress?.current_duration ?? 0;
      const initialTotal =
        video.duration_seconds ??
        video.total_duration ??
        video.progress?.total_duration ??
        0;
      const initialPercent =
        video.progress_percent ?? video.progress?.progress_percent ?? 0;

      setCurrentTime(initialCurrent);
      setDuration(initialTotal);
      setProgressPercent(initialPercent);
      setIsPlaying(false);
      setIsFavorite(Boolean(video.is_favorite));

      if (videoRef.current && initialCurrent > 0) {
        videoRef.current.currentTime = initialCurrent;
      }
    }
  }, [video?.id, video?.video_url, video?.is_favorite]);

  // Video playback toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => { });
    }
  };

  // Mute toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Fullscreen toggle
  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => { });
    } else {
      containerRef.current.requestFullscreen().catch(() => { });
    }
  };

  // Time update handler
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur =
      videoRef.current.duration ||
      duration ||
      video?.duration_seconds ||
      video?.total_duration ||
      0;

    setCurrentTime(cur);
    if (dur > 0) {
      setProgressPercent(Math.min(100, (cur / dur) * 100));
    }
  };

  // Loaded metadata handler
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    const dur = videoRef.current.duration;
    if (dur && !isNaN(dur)) {
      setDuration(dur);
    }
    const initialCurrent =
      video?.current_duration ?? video?.progress?.current_duration ?? 0;
    if (initialCurrent > 0 && videoRef.current.currentTime === 0) {
      videoRef.current.currentTime = initialCurrent;
    }
  };

  // Video ended handler
  const handleVideoEnded = async () => {
    setIsPlaying(false);
    setProgressPercent(100);
    if (video?.id && videoRef.current) {
      try {
        await videoProgress({
          id: video.id,
          total_duration: Math.round(videoRef.current.duration || duration),
          current_duration: Math.round(videoRef.current.duration || duration),
          is_completed: true,
        });
        queryClient.invalidateQueries({ queryKey: ["core-learning-content-details"] });
      } catch {
        // ignore
      }
    }
  };

  // Seek handler when clicking progress bar
  const handleSeek = (e) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const dur =
      videoRef.current.duration ||
      duration ||
      video?.duration_seconds ||
      video?.total_duration ||
      0;

    if (dur > 0) {
      const newTime = ratio * dur;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgressPercent(ratio * 100);
    }
  };

  // Favorite / Bookmark handler
  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (video?.id) {
      try {
        await addVideoToFavorite(video.id);
        setIsFavorite((prev) => !prev);
      } catch {
        // error toast handled in hook
      }
    } else if (onBookmarkNote) {
      onBookmarkNote();
    }
  };

  const videoUrl = video?.video_url ? getSecureUrl(video.video_url) : null;
  const title = video?.title || noteTitle || "Lesson Video";
  const moduleLabel = video?.module_name || categoryName || "Lesson";
  const description = video?.description || video?.overview || "Build your understanding with this lesson";

  const displayCurrentTime =
    currentTime > 0
      ? formatTime(currentTime)
      : video?.current_duration_formatted || "00:00";

  const displayTotalDuration =
    duration > 0
      ? formatTime(duration)
      : video?.duration_formatted || video?.total_duration_formatted || "02:00";

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <h3 className="font-bold text-[#1B4B66] text-base mb-3">Lesson Video</h3>

      {/* Video Container (No Thumbnail used as requested) */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center group shadow-xs border border-gray-200"
      >
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleVideoEnded}
              playsInline
            />

            {/* Quick controls overlay on hover (top right) */}
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <button
                type="button"
                onClick={toggleMute}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white transition cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white transition cursor-pointer"
                title="Fullscreen"
              >
                <Maximize size={15} />
              </button>
            </div>

            {/* Play / Pause Center Overlay */}
            <div
              onClick={togglePlay}
              className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-colors z-10 ${isPlaying
                ? "bg-transparent group-hover:bg-black/25 opacity-0 group-hover:opacity-100"
                : "bg-black/35 opacity-100"
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-white/95 text-[#1B4B66] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                {isPlaying ? (
                  <Pause size={20} className="fill-[#1B4B66]" />
                ) : (
                  <Play size={20} className="fill-[#1B4B66] ml-0.5" />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            <Video size={28} className="text-gray-500 mb-1.5" />
            <p className="text-xs font-semibold text-gray-300">No Video Available</p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              There is no video attached to this lesson.
            </p>
          </div>
        )}
      </div>

      {/* Lesson Info */}
      <div className="mt-3.5 space-y-1">
        <span className="text-[10px] font-bold text-[#1B4B66] tracking-wider uppercase">
          {moduleLabel}
        </span>
        <h4 className="text-xs sm:text-sm font-bold text-[#1B4B66] leading-tight truncate">
          {title}
        </h4>
        <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Lesson Progress Bar (Seekable) */}
        <div
          ref={progressBarRef}
          onClick={videoUrl ? handleSeek : undefined}
          className={`w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-3 ${videoUrl ? "cursor-pointer hover:h-2" : ""
            } transition-all`}
          title={videoUrl ? "Click to seek" : undefined}
        >
          <div
            className="h-full bg-[#FF6B8A] rounded-full transition-all duration-150"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Timestamps */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 pt-1">
          <span>{displayCurrentTime}</span>
          <span>{displayTotalDuration}</span>
        </div>

        {/* Action Buttons: Play/Pause/Resume & Bookmark */}
        <div className="pt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            disabled={!videoUrl}
            className="flex-1 py-2 px-3 rounded-xl bg-[#1B4B66] hover:bg-[#14394E] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-98"
          >
            {isPlaying ? (
              <>
                <Pause size={13} className="fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={13} className="fill-white" />
                <span>{currentTime > 0 ? "Resume" : "Play"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleFavoriteClick}
            className="p-2 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-500 hover:text-[#1B4B66] transition cursor-pointer"
            title={
              video?.id
                ? isFavorite
                  ? "Remove video from favorites"
                  : "Add video to favorites"
                : isNoteSaved
                  ? "Remove bookmark"
                  : "Bookmark lesson"
            }
          >
            <Bookmark
              size={15}
              className={
                (video?.id ? isFavorite : isNoteSaved)
                  ? "fill-[#1B4B66] text-[#1B4B66]"
                  : ""
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}
