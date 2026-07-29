// app/dashboard/body-systems/[slug]/components/body-system-detail.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, Plus, Minus, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const BodySystemDetail = ({ systemData }) => {
  console.log("Body system: ", systemData)
  const [zoomScale, setZoomScale] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  
  // Get the first content item if it exists
  const defaultContent = systemData?.contents && systemData?.contents?.length > 0 ? systemData?.contents[0] : null;
  const [activeContent, setActiveContent] = useState(defaultContent);
  
  const router = useRouter();

  React.useEffect(() => {
    if (systemData?.contents && systemData.contents.length > 0) {
      setActiveContent(systemData.contents[0]);
      setThumbnailStartIndex(0);
    } else {
      setActiveContent(null);
      setThumbnailStartIndex(0);
    }
  }, [systemData]);
  
  const handlePrevThumbnails = () => {
    setThumbnailStartIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextThumbnails = () => {
    if (systemData?.contents) {
      setThumbnailStartIndex(prev => Math.min(systemData.contents.length - 4, prev + 1));
    }
  };

  const hasMoreLeft = thumbnailStartIndex > 0;
  const hasMoreRight = systemData?.contents && thumbnailStartIndex < systemData.contents.length - 4;
  
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

  if (!systemData) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <p className="text-slate-600 font-medium animate-pulse">Loading content...</p>
        </div>
      </div>
    );
  }

  const currentContent = activeContent || systemData;
  const contentFileUrl = currentContent?.html_file || currentContent?.content_file_url || defaultContent?.content_file_url;
  const coverUrl = currentContent?.cover || currentContent?.content_cover_url || systemData?.cover;

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
          <h1 className="text-2xl font-bold text-slate-800 max-sm:text-xl">{systemData?.subtitle || systemData?.content_name || systemData?.title}</h1>
          <p className="text-slate-500 text-sm mb-4">Body System</p>
          
          {/* Thumbnails Row */}
          {systemData?.contents && systemData?.contents?.length > 0 && (
            <div className="flex items-center gap-2 pb-2">
              <button 
                onClick={handlePrevThumbnails}
                disabled={!hasMoreLeft}
                className={`cursor-pointer p-1 rounded-full shrink-0 transition-colors ${!hasMoreLeft ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="overflow-hidden w-[292px] py-2 px-1 -mx-1">
                <motion.div 
                  className="flex items-center gap-3"
                  initial={false}
                  animate={{ x: -(thumbnailStartIndex * 76) }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {systemData?.contents?.map((content) => (
                    <button
                      key={content?.id}
                      onClick={() => {
                        if (activeContent?.id !== content?.id) {
                          setIsIframeLoading(true);
                          setActiveContent(content);
                          setZoomScale(1);
                          setResetKey(prev => prev + 1);
                        }
                      }}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all bg-white ${
                        activeContent?.id === content?.id ? 'border-primary shadow-md' : 'border-slate-200 hover:border-slate-300'
                      }`}
                      title={content?.content_name}
                    >
                      {content?.content_cover_url || content?.cover ? (
                        <Image
                          src={content?.content_cover_url || content?.cover}
                          alt={content?.content_name || 'Thumbnail'}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 text-center p-1 leading-tight">
                          {content?.content_name}
                        </div>
                      )}
                    </button>
                  ))}
                </motion.div>
              </div>

              <button 
                onClick={handleNextThumbnails}
                disabled={!hasMoreRight}
                className={`cursor-pointer p-1 rounded-full shrink-0 transition-colors ${!hasMoreRight ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Main Canvas Area */}
        <div 
          className="flex-1 bg-white rounded-3xl border border-slate-200 relative shadow-sm overflow-hidden flex items-center justify-center max-lg:min-h-[450px] max-lg:flex-initial"
          onWheel={handleWheel}
        >
          {/* Main Image Wrapper with Dynamic Zoom Constraints */}
          <motion.div 
            key={`canvas-${currentContent?.id || 'default'}-${resetKey}`}
            className="absolute inset-12 max-sm:inset-6 cursor-grab active:cursor-grabbing"
            animate={{ scale: zoomScale }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag
            dragConstraints={{ left: -600, right: 600, top: -300, bottom: 300 }}
            dragElastic={0.2}
          >
            {coverUrl ? (
              <Image 
                src={coverUrl} 
                alt={`${currentContent?.subtitle || currentContent?.content_name || currentContent?.title} Active Diagram View`} 
                fill 
                className="object-contain select-none pointer-events-none"
                priority
                draggable={false}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                No cover image available.
              </div>
            )}
          </motion.div>

          {/* Canvas Floating Utility Actions */}
          {coverUrl && (
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
              <button 
                onClick={handleResetZoom}
                title="Reset View"
                className="p-2 bg-white rounded-full shadow-md border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <Maximize2 size={18}/>
              </button>
              <button 
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-2 bg-white rounded-full shadow-md border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <Plus size={18}/>
              </button>
              <button 
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-2 bg-white rounded-full shadow-md border border-slate-100 hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <Minus size={18}/>
              </button>
            </div>
          )}
        </div>
      </div>  

      {/* RIGHT COLUMN: iframe content area */}
      <div className="w-[450px] h-full bg-white border-l border-slate-200 flex flex-col max-lg:w-full max-lg:h-[600px] max-lg:border-t max-lg:border-l-0 shrink-0 relative overflow-hidden">
        <div className="w-full h-full relative">
          {contentFileUrl ? (
            <>
              {isIframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <iframe 
                key={contentFileUrl}
                src={contentFileUrl?.startsWith("http") ? contentFileUrl : `https://${contentFileUrl}`}
                className={`w-full h-full border-0 transition-opacity duration-300 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
                title={currentContent?.subtitle || currentContent?.content_name || currentContent?.title || "Note Content"}
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