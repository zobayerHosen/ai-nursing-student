"use client";

import dummayImg from "@/public/med_dumm.png";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const BodySystemCard = ({ system }) => {
    const [imgSrc, setImgSrc] = useState(system?.cover || dummayImg);
    const [isImgLoading, setIsImgLoading] = useState(true);

    useEffect(() => {
        setImgSrc(system?.cover || dummayImg);
        setIsImgLoading(true);
    }, [system?.cover]);

    return (
        <Link
            href={`/dashboard/body-systems/${system.content_id}`}
            className="group bg-white rounded-2xl border border-gray-200 hover:border-primary transition-all duration-300 flex flex-col items-center p-4 text-center"
        >
            {/* Optimized image container with skeleton placeholder */}
            <div className="relative w-37.5 h-37.5 bg-white rounded-xl mb-4 overflow-hidden flex items-center justify-center p-2">
                {isImgLoading && (
                    <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center z-10 border border-gray-100">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                    </div>
                )}
                <Image
                    src={imgSrc || dummayImg}
                    alt={system?.title || "Body System"}
                    width={200}
                    height={200}
                    unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
                    className={`w-full h-full group-hover:scale-105 transition-all duration-300 object-contain ${isImgLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                    onLoad={() => setIsImgLoading(false)}
                    onError={() => {
                        setImgSrc(dummayImg);
                        setIsImgLoading(false);
                    }}
                />
            </div>

            {/* Title section */}
            <h3 className="text-start w-full text-sm font-medium text-black group-hover:text-primary transition-colors leading-tight">
                {system?.title ?? "N/A"}
            </h3>
            <p className="text-start w-full text-xs text-[#64748B] mt-1">{system?.subtitle ?? "N/A"}</p>
        </Link>
    );
};

export default BodySystemCard;