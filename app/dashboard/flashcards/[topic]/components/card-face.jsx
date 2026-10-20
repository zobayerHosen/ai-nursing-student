"use client";

import ZoomableImage from "./zoomable-image";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.genclex.com";

export const formatImageUrl = (imgPath) => {
    if (!imgPath || typeof imgPath !== "string") return "";
    const trimmed = imgPath.trim().replace(/\\/g, "/");
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        if (trimmed.startsWith("http://api.genclex.com")) {
            return trimmed.replace("http://api.genclex.com", "https://api.genclex.com");
        }
        return trimmed;
    }
    const cleanBase = (BASE_URL || "https://api.genclex.com").trim().replace(/\/+$/, "");
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${cleanBase}${cleanPath}`;
};

/**
 * Reusable Card Face (used for both Front and Back sides of flashcard)
 */
export default function CardFace({
    title,
    image,
    text,
    textRef,
    onWheel,
    footer,
    style = {},
    isFront = false,
}) {
    return (
        <div
            className={`absolute inset-0 w-full h-full backface-hidden bg-white ${
                isFront
                    ? "border-2 border-primary/10 rounded-[10px] shadow-[0_20px_50px_-20px_rgba(44,95,141,0.15)]"
                    : "text-black rounded-[10px] shadow-[0_0_8px_0_rgba(0,0,0,0.10)]"
            } flex flex-col justify-between p-8 sm:p-10 text-center overflow-hidden`}
            style={style}
        >
            {isFront && <div className="absolute top-0 left-0 w-full h-3 bg-primary/30" />}
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] text-left shrink-0">
                {title}
            </span>

            <div className="w-full max-w-[92%] h-[calc(100%-80px)] my-auto flex items-center justify-center gap-6 overflow-hidden">
                {image ? (
                    <>
                        <div className="w-1/2 h-full max-h-85 flex items-center justify-center overflow-hidden shrink-0 rounded-lg">
                            <ZoomableImage
                                src={formatImageUrl(image)}
                                alt={`${title} image`}
                            />
                        </div>
                        <div
                            ref={textRef}
                            onWheel={onWheel}
                            className="w-1/2 h-full max-h-85 overflow-y-auto overscroll-contain custom-scrollbar pr-2 text-left text-base sm:text-lg font-semibold text-gray-800 leading-relaxed select-text"
                            onClick={(e) => e.stopPropagation()}
                            dangerouslySetInnerHTML={{ __html: text ?? "" }}
                        />
                    </>
                ) : (
                    <div
                        ref={textRef}
                        onWheel={onWheel}
                        className="w-full max-w-2xl max-h-85 overflow-y-auto overscroll-contain custom-scrollbar px-4 text-center text-base sm:text-lg font-semibold text-gray-800 leading-relaxed select-text"
                        onClick={(e) => e.stopPropagation()}
                        dangerouslySetInnerHTML={{ __html: text ?? "" }}
                    />
                )}
            </div>

            <div className="shrink-0">{footer}</div>
        </div>
    );
}

export { CardFace };
