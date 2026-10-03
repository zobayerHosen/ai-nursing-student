// app/dashboard/body-systems/[slug]/components/body-system-detail.jsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2, Plus, Minus, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getSecureUrl } from "@/utils";
import dummyImg from "@/public/med_dumm.png";

const BodySystemDetail = ({ systemData }) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(systemData?.extra_images?.[0] || null);
  const router = useRouter();

  const extraImages = systemData?.extra_images || [];

  useEffect(() => {
    if (systemData?.extra_images && systemData.extra_images.length > 0) {
      setSelectedImage(systemData.extra_images[0]);
    } else {
      setSelectedImage(null);
    }
    setThumbnailStartIndex(0);
    setZoomScale(1);
  }, [systemData]);

  const handlePrevThumbnails = () => {
    setThumbnailStartIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextThumbnails = () => {
    if (extraImages.length > 0) {
      setThumbnailStartIndex(prev => Math.min(Math.max(0, extraImages.length - 4), prev + 1));
    }
  };

  const hasMoreLeft = thumbnailStartIndex > 0;
  const hasMoreRight = extraImages.length > 4 && thumbnailStartIndex < extraImages.length - 4;

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setResetKey(prev => prev + 1);
  };

  const handleWheel = (e) => {
    const zoomSensitivity = 0.05;
    if (e.deltaY < 0) {
      setZoomScale(prev => Math.min(prev + zoomSensitivity, 2.5));
    } else if (e.deltaY > 0) {
      setZoomScale(prev => Math.max(prev - zoomSensitivity, 0.5));
    }
  };

  const rawCoverUrl =
    selectedImage?.image ||
    selectedImage?.content_file_url ||
    selectedImage?.cover ||
    systemData?.content_cover_url ||
    systemData?.cover ||
    dummyImg;

  const [canvasImgSrc, setCanvasImgSrc] = useState(rawCoverUrl || dummyImg);

  useEffect(() => {
    setCanvasImgSrc(rawCoverUrl || dummyImg);
  }, [rawCoverUrl]);

  if (!systemData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <p className="text-slate-600 font-medium animate-pulse">Loading content...</p>
        </div>
      </div>
    );
  }

  const iframeUrl = systemData?.content_file_url || systemData?.html_file;

  return (
    <div className="flex h-[calc(100vh-100px)] bg-[#F8F9FA] overflow-hidden max-lg:flex-col max-lg:h-auto max-lg:overflow-visible">
      {/* LEFT COLUMN: Diagram Canvas Viewer (Locked on Desktop) */}
      <div className="flex-1 h-full relative flex flex-col p-8 max-sm:p-4 w-full overflow-hidden max-lg:h-auto max-lg:overflow-visible">
        {/* Title Block */}
        <div className="shrink-0">
          <button
            onClick={() => router.back()}
            className="cursor-pointer inline-flex items-center text-sm text-slate-500 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back To Topic
          </button>
          <h1 className="text-lg font-bold text-slate-700 max-sm:text-xl">
            {systemData?.content_name || systemData?.title || systemData?.subtitle}
          </h1>
          <p className="text-slate-500 text-sm mb-4">Body System</p>

          {/* Thumbnails Row */}
          {extraImages.length > 0 && (
            <div className="flex items-center gap-2 pb-2">
              <button
                onClick={handlePrevThumbnails}
                disabled={!hasMoreLeft}
                className={`cursor-pointer p-1 rounded-full shrink-0 transition-colors ${
                  !hasMoreLeft ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="overflow-hidden w-73 py-2 px-1 -mx-1">
                <motion.div
                  className="flex items-center gap-3"
                  initial={false}
                  animate={{ x: -(thumbnailStartIndex * 76) }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {extraImages.map((imgItem) => {
                    const thumbUrl = imgItem?.image || imgItem?.content_file_url || imgItem?.cover;
                    const isSelected = selectedImage?.id === imgItem?.id;

                    return (
                      <button
                        key={imgItem?.id}
                        type="button"
                        onClick={() => {
                          if (selectedImage?.id !== imgItem?.id) {
                            setSelectedImage(imgItem);
                            setZoomScale(1);
                            setResetKey((prev) => prev + 1);
                          }
                        }}
                        className={`relative w-12 h-12 rounded-md overflow-hidden shrink-0 border transition-all bg-white cursor-pointer ${
                          isSelected ? 'border-primary shadow-md ring-2 ring-primary/20' : 'border-slate-200 hover:border-slate-300'
                        }`}
                        title={imgItem?.title || imgItem?.subtitle}
                      >
                        <Image
                          src={thumbUrl || dummyImg}
                          alt={imgItem?.title || imgItem?.subtitle || 'Thumbnail'}
                          fill
                          className="object-contain p-1"
                          onError={(e) => {
                            e.currentTarget.srcset = "";
                            e.currentTarget.src = typeof dummyImg === "object" ? dummyImg.src : dummyImg;
                          }}
                        />
                      </button>
                    );
                  })}
                </motion.div>
              </div>

              <button
                onClick={handleNextThumbnails}
                disabled={!hasMoreRight}
                className={`cursor-pointer p-1 rounded-full shrink-0 transition-colors ${
                  !hasMoreRight ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Main Canvas Area */}
        <div
          className="flex-1 bg-white rounded-3xl border border-slate-200 relative shadow-sm overflow-hidden flex items-center justify-center max-lg:min-h-112.5 max-lg:flex-initial"
          onWheel={handleWheel}
        >
          {/* Main Image Wrapper with Dynamic Zoom Constraints */}
          <motion.div
            key={`canvas-${selectedImage?.id || 'default'}-${resetKey}`}
            className="absolute inset-12 max-sm:inset-6 cursor-grab active:cursor-grabbing"
            animate={{ scale: zoomScale }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag
            dragConstraints={{ left: -600, right: 600, top: -300, bottom: 300 }}
            dragElastic={0.2}
          >
            <Image
              src={canvasImgSrc || dummyImg}
              alt={`${selectedImage?.title || systemData?.content_name || 'Body System'} Active Diagram View`}
              fill
              className="object-contain select-none pointer-events-none"
              priority
              draggable={false}
              onError={() => setCanvasImgSrc(dummyImg)}
            />
          </motion.div>

          {/* Canvas Floating Utility Actions */}
          <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
            <button
              onClick={handleResetZoom}
              title="Reset View"
              className="p-2 bg-white rounded-full shadow-md border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            >
              <Maximize2 size={18} />
            </button>
            <button
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-2 bg-white rounded-full shadow-md border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            >
              <Plus size={18} />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-2 bg-white rounded-full shadow-md border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
            >
              <Minus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: iframe content area */}
      <div className="w-125 h-full bg-white border-l border-slate-200 flex flex-col max-lg:w-full max-lg:h-150 max-lg:border-t max-lg:border-l-0 shrink-0 relative overflow-hidden">
        <div className="w-full h-full relative p-3">
          {iframeUrl ? (
            <>
              {isIframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <iframe
                key={iframeUrl}
                src={getSecureUrl(iframeUrl)}
                className={`w-full h-full border-0 transition-opacity duration-300 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
                title={systemData?.content_name || systemData?.subtitle || "Note Content"}
                sandbox="allow-same-origin allow-scripts"
                onLoad={() => setIsIframeLoading(false)}
              />
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-500 p-8 text-center">
              No HTML content available for this body system.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodySystemDetail;