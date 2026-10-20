"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Zoomable and Draggable image component with mouse wheel zoom and mouse drag/pan.
 */
export default function ZoomableImage({ src, alt, className = "" }) {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const isDraggingRef = useRef(false);
    const startRef = useRef({ startX: 0, startY: 0, posX: 0, posY: 0 });
    const containerRef = useRef(null);

    // Reset zoom and position when image src changes
    useEffect(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    }, [src]);

    // Handle mouse wheel zoom
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();

            setScale((prevScale) => {
                // Scroll up (deltaY < 0) -> zoom in, Scroll down (deltaY > 0) -> zoom out
                const step = 0.15;
                const newScale = e.deltaY < 0 ? prevScale + step : prevScale - step;
                return Math.min(Math.max(Number(newScale.toFixed(2)), 0.8), 3.5);
            });
        };

        el.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            el.removeEventListener("wheel", handleWheel);
        };
    }, [src]);

    // Drag / Pan handlers
    const handlePointerDown = (e) => {
        e.stopPropagation();
        isDraggingRef.current = true;
        setIsDragging(true);
        startRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            posX: position.x,
            posY: position.y,
        };
        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
    };

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current) return;
        e.stopPropagation();
        const dx = e.clientX - startRef.current.startX;
        const dy = e.clientY - startRef.current.startY;
        setPosition({
            x: startRef.current.posX + dx,
            y: startRef.current.posY + dy,
        });
    };

    const handlePointerUp = (e) => {
        if (isDraggingRef.current) {
            e.stopPropagation();
            isDraggingRef.current = false;
            setIsDragging(false);
            try {
                e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {}
        }
    };

    const handleReset = (e) => {
        e?.stopPropagation();
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const isModified = scale !== 1 || position.x !== 0 || position.y !== 0;

    return (
        <div
            ref={containerRef}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleReset}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
                cursor: isDragging ? "grabbing" : "grab",
                touchAction: "none",
            }}
            className="relative w-full h-full flex items-center justify-center overflow-hidden select-none group/zoom"
            title="Scroll wheel to zoom, click and drag to move, double click to reset"
        >
            <div
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
                    transition: isDragging ? "none" : "transform 0.1s ease-out",
                }}
                className="w-full h-full flex items-center justify-center pointer-events-none"
            >
                <Image
                    src={src}
                    alt={alt}
                    width={800}
                    height={800}
                    className={`max-w-full max-h-full w-auto h-auto object-contain ${className}`}
                    unoptimized
                    draggable={false}
                />
            </div>
            {isModified && (
                <button
                    type="button"
                    onClick={handleReset}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white text-[10px] px-2.5 py-1 rounded-full transition cursor-pointer z-10 font-medium"
                >
                    Reset {scale !== 1 ? `(${Math.round(scale * 100)}%)` : ""}
                </button>
            )}
        </div>
    );
}

export { ZoomableImage };
