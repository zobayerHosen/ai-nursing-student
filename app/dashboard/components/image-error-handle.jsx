"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import dummyImage from "@/public/med_dumm.png";

export default function ImageErrorHandle({
  src,
  alt = "Thumbnail",
  fallbackSrc = dummyImage,
  containerClassName = "w-10 h-10 rounded-lg bg-linear-to-br from-gray-100 to-gray-200/80 shrink-0 flex items-center justify-center border border-gray-200/50 group-hover:scale-105 transition-transform overflow-hidden",
  imageClassName = "w-7 h-7 object-contain shrink-0 rounded-lg",
  width = 40,
  height = 40,
  unoptimized,
  ...props
}) {
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const resolvedUrl = useMemo(() => {
    if (!src || typeof src !== "string") return null;
    if (src.startsWith("http://") || src.startsWith("https://")) {
      return src;
    }
    const cleanBase = BASEURL.replace(/\/+$/, "");
    const cleanPath = src.startsWith("/") ? src : `/${src}`;
    return cleanBase ? `${cleanBase}${cleanPath}` : src;
  }, [src, BASEURL]);

  const [hasError, setHasError] = useState(false);
  const imgSrc = hasError || !resolvedUrl ? fallbackSrc : resolvedUrl;
  const isExternal = typeof imgSrc === "string" && imgSrc.startsWith("http");

  return (
    <div className={containerClassName}>
      <Image
        src={imgSrc}
        alt={alt || "Thumbnail"}
        width={width}
        height={height}
        unoptimized={unoptimized ?? isExternal}
        className={imageClassName}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
}
