"use client";
import { footerSections, socialLinks } from "@/data";
import Link from "next/link";
import logo from "@/public/assets/logo.png";
import Image from "next/image";

const Footer = () => {
    return (
        <footer id="contact" className="w-full bg-[#2F5D8A] text-white">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                {/* Top Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 xl:gap-12 py-10 sm:py-12 lg:py-16">
                    
                    {/* Logo & Description */}
                    <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 max-w-md">
                        {/* Logo */}
                        <div className="w-55 sm:w-62.5 lg:w-65 mb-6">
                            <Image
                                src={logo}
                                alt="STEMRN"
                                width={300}
                                height={150}
                                className="object-contain w-full h-auto"
                                priority
                            />
                        </div>

                        <p className="text-white/90 leading-relaxed text-base">
                            Root Knowledge. Real Results. The AI-powered NCLEX prep platform 
                            built for nursing students who mean business.
                        </p>
                    </div>

                    {/* Footer Links */}
                    {footerSections?.map((section) => (
                        <div key={section.heading} className="col-span-1">
                            <h3 className="uppercase text-sm sm:text-base font-semibold mb-6 tracking-wider">
                                {section?.heading}
                            </h3>

                            <ul className="space-y-4 sm:space-y-5 text-sm text-white/95">
                                {section?.links?.map((link) => (
                                    <li key={link?.title}>
                                        <Link 
                                            href={link?.href} 
                                            className="hover:underline hover:text-white transition-all duration-200"
                                        >
                                            {link?.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/50 py-8 lg:py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 items-center justify-between gap-6 text-center lg:text-left">
                        
                        {/* Copyright */}
                        <p className="text-sm text-white/90">
                            © 2026 STEMRN Inc. All rights reserved.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                            {socialLinks?.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-white/80 flex items-center justify-center text-xl hover:bg-white hover:text-[#2F5D8A] transition-all duration-300"
                                >
                                    {social?.icon}
                                </a>
                            ))}
                        </div>

                        {/* Disclaimer */}
                        <p className="text-sm text-white/90 whitespace-nowrap lg:text-right">
                            Educational use only · Not a substitute for clinical training
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;