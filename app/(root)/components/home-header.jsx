"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

import logo from "@/public/assets/logo.png";

const navItems = [
  { label: "Features", href: "/" },
  { label: "NCLEX Prep", href: "/nclex" },
  { label: "Pricing", href: "/pricing" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-[#4f7393] text-white border-b border-[#dddddd5e] sticky top-0">
      <div className="container mx-auto px-4 py-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 lg:gap-2">
            <div className="w-8 h-8 lg:w-8 lg:h-8 bg-white rounded-full" />
            <span className="text-2xl font-semibold tracking-wide">
              STEMRN
            </span>

            {/* Logo */}
            {/* <Image
              src={logo}
              alt="logo"
              width={120}
              height={120}
            /> */}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-4 lg:gap-10 text-sm lg:text-base">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:opacity-80 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3 lg:gap-6">
            <Link
              href="/login"
              className="border-2 border-white px-6 py-3 rounded-lg text-base hover:bg-white hover:text-[#4f7393] transition font-medium"
            >
              Log In
            </Link>

            <Link
              href="/signup"
              className="bg-[#FE5E7E] border-2 border-[#FE5E7E] px-6 py-3 rounded-lg text-base font-medium hover:bg-pink-400 transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col gap-4 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/login"
                  className="border border-white px-4 py-2 rounded-lg text-center"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="bg-pink-500 px-4 py-2 rounded-lg text-center font-medium"
                >
                  Get Started Free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default HomeHeader;