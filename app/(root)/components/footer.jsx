"use client";
import { footerSections, socialLinks } from "@/data";
import Link from "next/link";
import logo from "@/public/assets/logo.png";
import Image from "next/image";

const Footer = () => {
    return (
        <footer id="contact" className="w-full bg-[#2F5D8A] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                {/* Top Section */}
                <div className="flex flex-col xl:flex-row gap-10 xl:gap-12 2xl:gap-16 py-10 sm:py-12 lg:py-16">
                    
                    {/* Logo & Description */}
                    <div className="w-full lg:max-w-[320px] xl:max-w-[350px]">
                        {/* Logo */}
                        <div className="w-[220px] sm:w-[250px] lg:w-[260px] mb-6">
                            <Image
                                src={logo}
                                alt="STEMRN"
                                width={300}
                                height={150}
                                className="object-contain w-full h-auto"
                                priority
                            />
                        </div>

                        <p className="text-white/90 leading-relaxed text-[17px] sm:text-lg">
                            Root Knowledge. Real Results. The AI-powered NCLEX prep platform 
                            built for nursing students who mean business.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-col sm:flex-row lg:flex-row gap-8 sm:gap-12 lg:gap-5 xl:gap-4 2xl:gap-20 flex-1">
                        {footerSections.map((section) => (
                            <div key={section.heading} className="min-w-[140px]">
                                <h3 className="uppercase text-sm sm:text-base font-semibold mb-6 tracking-wider">
                                    {section.heading}
                                </h3>

                                <ul className="space-y-4 sm:space-y-5 text-[15px] sm:text-[17px] text-white/95">
                                    {section.links.map((link) => (
                                        <li key={link.title}>
                                            <Link 
                                                href={link.href} 
                                                className="hover:underline hover:text-white transition-all duration-200"
                                            >
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter */}
                    <div className="w-full lg:w-auto lg:min-w-[320px] xl:min-w-[360px]">
                        <h3 className="text-xl sm:text-2xl font-semibold mb-6">
                            Newsletter
                        </h3>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full bg-transparent border-b border-white/60 focus:border-white py-2 text-base sm:text-lg placeholder:text-white/70 outline-none transition-all"
                            />

                            <button className="cursor-pointer bg-[#3A6A99] hover:bg-[#4678aa] active:bg-[#2F5D8A] transition-all duration-300 text-base px-4 rounded-lg whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/50 py-8 lg:py-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
                        
                        {/* Copyright */}
                        <p className="text-sm sm:text-base text-white/90">
                            © 2026 STEMRN Inc. All rights reserved.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/80 flex items-center justify-center text-xl hover:bg-white hover:text-[#2F5D8A] transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        {/* Disclaimer */}
                        <p className="text-sm sm:text-base text-white/90 max-w-[280px] lg:max-w-none">
                            Educational use only · Not a substitute for clinical training
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;