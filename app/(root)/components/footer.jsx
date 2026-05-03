"use client";
import { footerSections, socialLinks } from "@/data";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full bg-[#2F5D8A] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-between py-8 sm:py-12 lg:py-16">
                    {/* Logo & Description */}
                    <div className="w-full max-w-[300px]">
                        <div className="flex items-center gap-3 mb-6">
                            {/* Logo */}
                            <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-1">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                </div>
                            </div>

                            <h2 className="text-4xl font-bold tracking-wide">
                                STEMRN
                            </h2>
                        </div>

                        <p className="text-white/90 leading-9 text-lg">
                            Root Knowledge. Real Results. The AI-powered NCLEX prep platform built for nursing students who mean business.
                        </p>
                    </div>

                    {/* footer links */}
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
                        {/* Dynamic Footer Sections */}
                        {footerSections.map((section) => (
                            <div key={section.heading}>
                                <h3 className="uppercase text-base font-medium mb-8">
                                    {section.heading}
                                </h3>

                                <ul className="space-y-6 text-lg text-white/95">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <Link href={link.href} className="hover:underline">
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-2xl font-medium mb-8">
                            Newsletter
                        </h3>

                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-full sm:flex-1 border-b border-white">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="w-full bg-transparent outline-none placeholder:text-white/80 py-3 text-lg"
                                />
                            </div>

                            <button className="cursor-pointer bg-[#3A6A99] hover:bg-[#4678aa] transition-all duration-300 px-8 py-4 rounded-xl text-lg font-medium whitespace-nowrap">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/50 py-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Copyright */}
                        <p className="text-lg text-white/95 text-center lg:text-left">
                            © 2026 STEMRN Inc. All rights reserved.
                        </p>

                        {/* Social Icons */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-lg font-medium hover:bg-white hover:text-[#2F5D8A] transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Disclaimer */}
                        <p className="text-lg text-white/95 text-center lg:text-right">
                            Educational use only · Not a substitute for
                            clinical training
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;