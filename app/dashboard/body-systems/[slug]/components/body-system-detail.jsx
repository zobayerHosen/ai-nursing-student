// app/dashboard/body-systems/[slug]/components/body-system-detail.jsx
import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BodySystemDetail = ({ systemData }) => {
  const [zoomScale, setZoomScale] = useState(1);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const router = useRouter();
  
  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
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

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden max-lg:flex-col max-lg:h-auto max-lg:overflow-y-auto">
      
      {/* LEFT COLUMN: Diagram Canvas Viewer (Locked on Desktop) */}
      <div className="flex-1 h-full relative flex flex-col p-8 max-sm:p-4 w-full overflow-hidden max-lg:h-auto max-lg:overflow-visible">
        {/* Title Block */}
        <div className="mb-6 shrink-0">
          <button 
            onClick={() => router.back()} 
            className="cursor-pointer inline-flex items-center text-sm text-slate-500 hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back To Topic
          </button>
          <h1 className="text-2xl font-bold text-slate-800 max-sm:text-xl">{systemData?.subtitle || systemData?.content_name}</h1>
          <p className="text-slate-500 text-sm">Body System</p>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 relative shadow-sm overflow-hidden flex items-center justify-center max-lg:min-h-[450px] max-lg:flex-initial">
          {/* Main Image Wrapper with Dynamic Zoom Constraints */}
          <div 
            className="absolute inset-12 transition-transform duration-200 ease-out max-sm:inset-6"
            style={{ transform: `scale(${zoomScale})` }}
          >
            {systemData?.cover || systemData?.content_cover_url ? (
              <Image 
                src={systemData?.cover || systemData?.content_cover_url} 
                alt={`${systemData?.subtitle || systemData?.content_name} Active Diagram View`} 
                fill 
                className="object-contain select-none"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                No cover image available.
              </div>
            )}
          </div>

          {/* Canvas Floating Utility Actions */}
          {(systemData?.cover || systemData?.content_cover_url) && (
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
          {systemData?.html_file || systemData?.content_file_url ? (
            <>
              {isIframeLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <iframe 
                src={(systemData?.html_file || systemData?.content_file_url)?.startsWith("http") ? (systemData?.html_file || systemData?.content_file_url) : `https://${(systemData?.html_file || systemData?.content_file_url)}`}
                className={`w-full h-full border-0 transition-opacity duration-300 ${isIframeLoading ? 'opacity-0' : 'opacity-100'}`}
                title={systemData?.subtitle || systemData?.content_name || "Note Content"}
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