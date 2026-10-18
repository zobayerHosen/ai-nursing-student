"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Video,
} from "lucide-react";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "";
const PLAYBACK_SPEEDS = ["1.0x", "1.25x", "1.5x", "2.0x"];

// Helper: Format seconds into MM:SS or HH:MM:SS
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "00:00";
  const total = Math.floor(seconds);
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

// Helper: Resolve relative or absolute video URL safely
const resolveVideoUrl = (rawUrl) => {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
    return rawUrl;
  }
  const cleanBase = BASEURL.replace(/\/+$/, "");
  const cleanPath = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
  return cleanBase ? `${cleanBase}${cleanPath}` : rawUrl;
};

export default function VideoLessonPlayer({
  videoUrl,
  videoSrc: propVideoSrc,
  title = "Video Lesson",
  initialProgress = 0,
  initialDuration = "00:00",
  onEnded,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0x");
  const [progressPercent, setProgressPercent] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("00:00");
  const [totalDurationStr, setTotalDurationStr] = useState("00:00");

  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);

  const videoSrc = useMemo(() => {
    return resolveVideoUrl(propVideoSrc || videoUrl);
  }, [propVideoSrc, videoUrl]);

  // Sync initial duration and progress when props change
  useEffect(() => {
    if (initialDuration) {
      setTotalDurationStr(
        typeof initialDuration === "number"
          ? formatTime(initialDuration)
          : initialDuration
      );
    }
    if (initialProgress) {
      setCurrentTimeStr(formatTime(initialProgress));
    }
  }, [initialDuration, initialProgress]);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };

  // Seek +/- seconds
  const handleSeek = (offsetSeconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += offsetSeconds;
    }
  };

  // Mute / Unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted((prev) => !prev);
  };

  // Cycle playback speeds
  const handleSpeedChange = () => {
    const nextIdx = (PLAYBACK_SPEEDS.indexOf(playbackSpeed) + 1) % PLAYBACK_SPEEDS.length;
    const nextSpeed = PLAYBACK_SPEEDS[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(nextSpeed);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerContainerRef.current.requestFullscreen();
    }
  };

  // Video event handlers
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (initialProgress && !videoRef.current.currentTime) {
      videoRef.current.currentTime = initialProgress;
    }
    if (videoRef.current.duration) {
      setTotalDurationStr(formatTime(videoRef.current.duration));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setProgressPercent((cur / dur) * 100);
      setCurrentTimeStr(formatTime(cur));
      setTotalDurationStr(formatTime(dur));
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (onEnded && videoRef.current) {
      onEnded({
        duration: Math.round(videoRef.current.duration || 0),
        currentTime: Math.round(videoRef.current.currentTime || 0),
      });
    }
  };

  const handleProgressSeek = (e) => {
    if (!videoRef.current?.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgressPercent(newPercent);
    videoRef.current.currentTime = (newPercent / 100) * videoRef.current.duration;
  };

  return (
    <div
      ref={playerContainerRef}
      className="w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-950 relative group select-none shadow-sm border border-[#e2e8f0]"
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-400 p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
            <Video className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-sm font-semibold text-slate-300">Video Lesson</p>
          <p className="text-xs text-slate-500 mt-1 max-w-xs truncate">{title}</p>
        </div>
      )}

      {/* Big Center Play / Pause Button Overlay */}
      <div
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 group-hover:bg-black/30 transition-colors"
      >
        <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-white/95 text-[#1e3a5f] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
          {isPlaying ? (
            <Pause className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          ) : (
            <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current" />
          )}
        </div>
      </div>

      {/* Bottom Custom Controls Bar */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-4.5 flex flex-col gap-2 opacity-95 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Scrubber Progress Bar */}
        <div
          onClick={handleProgressSeek}
          className="w-full h-1.5 hover:h-2 bg-white/30 hover:bg-white/40 rounded-full cursor-pointer relative transition-all"
        >
          <div
            className="h-full bg-[#e14564] rounded-full relative"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white text-xs sm:text-sm">
          {/* Left Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={togglePlay}
              className="hover:text-blue-300 transition-colors cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSeek(-10)}
              className="hover:text-blue-300 transition-colors cursor-pointer"
              title="Back 10s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleSeek(10)}
              className="hover:text-blue-300 transition-colors cursor-pointer"
              title="Forward 10s"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="hover:text-blue-300 transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            <span className="text-[11px] sm:text-xs font-medium text-gray-200">
              {currentTimeStr} / {totalDurationStr}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleSpeedChange}
              className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[11px] font-bold cursor-pointer transition-colors"
              title="Playback Speed"
            >
              {playbackSpeed}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="hover:text-blue-300 transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export { VideoLessonPlayer };