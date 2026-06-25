"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import { Copy, Check, Share2 } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

const ShareNoteModal = ({ isModalOpen, setIsModalOpen, shareUrl }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy link");
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const socialLinks = [
        {
            name: "Facebook",
            icon: FaFacebook,
            bg: "bg-[#1877F2]/10",
            text: "text-[#1877F2]",
            hover: "hover:bg-[#1877F2] hover:text-white hover:shadow-blue-500/30",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "Twitter",
            icon: FaTwitter,
            bg: "bg-[#1DA1F2]/10",
            text: "text-[#1DA1F2]",
            hover: "hover:bg-[#1DA1F2] hover:text-white hover:shadow-sky-500/30",
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "LinkedIn",
            icon: FaLinkedin,
            bg: "bg-[#0A66C2]/10",
            text: "text-[#0A66C2]",
            hover: "hover:bg-[#0A66C2] hover:text-white hover:shadow-blue-600/30",
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        },
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            bg: "bg-[#25D366]/10",
            text: "text-[#25D366]",
            hover: "hover:bg-[#25D366] hover:text-white hover:shadow-green-500/30",
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`,
        },
    ];

    return (
        <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            centered
            className="share-modal"
            width={450}
        >
            <div className="flex flex-col items-center pt-6 pb-2 px-2">
                {/* Header Icon */}
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 shadow-inner ring-4 ring-blue-50/50">
                    <Share2 className="w-8 h-8 text-blue-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Share this note</h3>
                <p className="text-center text-sm text-gray-500 mb-8 max-w-[280px]">
                    Share this study material with your friends and colleagues.
                </p>

                {/* Social Buttons */}
                <div className="flex items-center justify-center gap-6 mb-8 w-full">
                    {socialLinks.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-2"
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-lg ${social.bg} ${social.text} ${social.hover}`}>
                                <social.icon size={24} className="transition-colors duration-300" />
                            </div>
                            <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                                {social.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Copy Link Section */}
                <div className="w-full">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 ml-1">Or copy link</p>
                    <div className="flex items-center p-1.5 bg-gray-50 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all">
                        <div className="flex-1 px-3 text-sm text-gray-600 truncate bg-transparent outline-none">
                            {shareUrl}
                        </div>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                copied 
                                ? 'bg-green-500 text-white shadow-md shadow-green-500/20' 
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm hover:shadow'
                            }`}
                        >
                            {copied ? (
                                <>
                                    <Check size={16} className="mr-1.5" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy size={16} className="mr-1.5" />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ShareNoteModal;
