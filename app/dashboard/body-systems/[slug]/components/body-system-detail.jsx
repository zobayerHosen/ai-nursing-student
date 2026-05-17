// app/dashboard/body-systems/[slug]/components/body-system-detail.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, Plus, Minus } from 'lucide-react';
import body_system_detail_data from './body-system-details-data';

const BodySystemDetail = ({ systemData }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [thumbnailStartIdx, setThumbnailStartIdx] = useState(0);
  const [zoomScale, setZoomScale] = useState(1); // Added state for zoom controls
  
  const data = systemData || body_system_detail_data[0];
  const currentImage = data?.gallery?.[activeImageIdx];

  const MAX_VISIBLE_THUMBNAILS = 4;
  const totalThumbnails = data?.gallery?.length || 0;
  const visibleThumbnails = data?.gallery?.slice(thumbnailStartIdx, thumbnailStartIdx + MAX_VISIBLE_THUMBNAILS) || [];
  
  const canScrollLeft = thumbnailStartIdx > 0;
  const canScrollRight = thumbnailStartIdx + MAX_VISIBLE_THUMBNAILS < totalThumbnails;

  const scrollThumbnailsLeft = () => {
    if (canScrollLeft) {
      setThumbnailStartIdx(prev => Math.max(0, prev - MAX_VISIBLE_THUMBNAILS));
    }
  };

  const scrollThumbnailsRight = () => {
    if (canScrollRight) {
      setThumbnailStartIdx(prev => Math.min(totalThumbnails - MAX_VISIBLE_THUMBNAILS, prev + MAX_VISIBLE_THUMBNAILS));
    }
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 2.5)); // Max zoom limit 2.5x
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.5)); // Min zoom limit 0.5x
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  const handleThumbnailClick = (index) => {
    setActiveImageIdx(index);
    setZoomScale(1); // Reset zoom on canvas image change
  };

  if (!data || !currentImage) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <p className="text-slate-600 font-medium animate-pulse">Loading medical illustrations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden max-lg:flex-col max-lg:h-auto max-lg:overflow-y-auto">
      
      {/* LEFT COLUMN: Diagram Canvas Viewer (Locked on Desktop) */}
      <div className="flex-1 h-full relative flex flex-col p-8 max-sm:p-4 w-full overflow-hidden max-lg:h-auto max-lg:overflow-visible">
        {/* Title Block */}
        <div className="mb-6 shrink-0">
          <h1 className="text-2xl font-bold text-slate-800 max-sm:text-xl">{data.title}</h1>
          <p className="text-slate-500 text-sm">{data.category || 'System'}</p>
        </div>

        {/* Dynamic Gallery Row */}
        <div className="flex items-center justify-start gap-2 mb-4 shrink-0 w-full">
          <button
            onClick={scrollThumbnailsLeft}
            disabled={!canScrollLeft}
            className="p-1 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-slate-500" />
          </button>
          
          <div className="flex items-center justify-start gap-2">
            {visibleThumbnails.map((img, idx) => {
              const actualIndex = thumbnailStartIdx + idx;
              return (
                <button
                  key={img.id}
                  onClick={() => handleThumbnailClick(actualIndex)}
                  className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all bg-white p-1
                    ${activeImageIdx === actualIndex ? 'border-primary shadow-md scale-105' : 'border-slate-200 opacity-60 hover:opacity-90'}`}
                >
                  <Image 
                    src={img.thumbnail} 
                    alt={`Thumbnail visual chart ${actualIndex + 1}`} 
                    className="object-contain w-full h-full"
                    width={48}
                    height={48}
                  />
                </button>
              );
            })}
          </div>
          
          <button
            onClick={scrollThumbnailsRight}
            disabled={!canScrollRight}
            className="p-1 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 relative shadow-sm overflow-hidden flex items-center justify-center max-lg:min-h-[450px] max-lg:flex-initial">
          {/* Image counter badge */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
            {activeImageIdx + 1} / {data.gallery.length}
          </div>

          {/* Main Image Wrapper with Dynamic Zoom Constraints */}
          <div 
            className="absolute inset-12 transition-transform duration-200 ease-out max-sm:inset-6"
            style={{ transform: `scale(${zoomScale})` }}
          >
            {currentImage.largeImage && (
              <Image 
                src={currentImage.largeImage} 
                alt={`${data.title} Active Diagram View`} 
                fill 
                className="object-contain select-none"
                priority
              />
            )}
          </div>

          {/* Canvas Floating Utility Actions */}
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
        </div>
      </div>

      {/* RIGHT COLUMN: Scrolling Content Area */}
      <div className="w-[450px] h-full bg-white border-l border-slate-200 flex flex-col max-lg:w-full max-lg:h-auto max-lg:border-t max-lg:border-l-0 shrink-0 overflow-hidden">
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 max-lg:overflow-visible">
          {/* Render target without prose styling block constraints */}
          <div 
            dangerouslySetInnerHTML={{ 
              __html: currentImage.content?.overview || '<p style="color: #94a3b8; font-style: italic;">No content available for this diagram.</p>'
            }}
          />
        </div>
      </div>

    </div>
  );
};

export default BodySystemDetail;