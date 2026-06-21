"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/public/assets/logo.png"
import Image from "next/image";
import { useGetUser, useLogout } from "@/hooks";
import LoadingIcon from "@/components/loading-icon";
import { Modal } from "antd";
import { LogOut } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "NCLEX Prep", href: "#HomeNCLEXExam" },
  { label: "Pricing", href: "#pricing" },
  { label: "Terms", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const HomeHeader = () => {
  const { user } = useGetUser();
  const { logout, isPending } = useLogout();

  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setIsLogoutModalOpen(false);
        setIsOpen(false);
      },
    });
  };

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full bg-[#4f7393] text-white border-b border-[#dddddd5e] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 md:py-5 lg:py-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <Image
              src={logo}
              width={350}
              height={150}
              alt="logo"
              className="object-contain w-36 md:w-40 lg:w-50"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-pink-300 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          {
            user ? (
              <div className="lg:flex hidden items-center gap-3">
                <button onClick={() => setIsLogoutModalOpen(true)} className="cursor-pointer hover:text-red-300 transition-all duration-300 flex items-center gap-2">
                  <LogOut className="w-5 h-5 md:hidden" />
                  <span className="hidden md:inline">Logout</span>
                </button>
                <Link
                  href={user?.is_profile_completed ? "/dashboard" : "/auth/profile-setup"}
                  className="bg-[#FE5E7E] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-[#ff7b94] hover:scale-105 active:scale-95 transition-all"
                >
                  {user?.is_profile_completed ? "Dashboard" : "Profile Setup"}
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-6">
                <Link
                  href="/auth"
                  className="text-sm font-semibold hover:text-pink-300 transition-colors"
                >
                  Log In
                </Link>

                <Link
                  href="/auth/register"
                  className="bg-[#FE5E7E] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-[#ff7b94] hover:scale-105 active:scale-95 transition-all"
                >
                  Get Started Free
                </Link>
              </div>
            )
          }

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-2xl focus:outline-none z-50 p-1"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu (Drawer) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-full sm:w-95 bg-primary shadow-2xl z-50 lg:hidden flex flex-col pt-8 px-8 border-l border-white/10"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between mb-10">
                  <Link href="/" onClick={toggleMenu} className="flex items-center gap-2">
                    <Image
                      src={logo}
                      width={350}
                      height={150}
                      alt="logo"
                      className="object-contain w-36 md:w-40 lg:w-50"
                    />
                  </Link>
                  <button
                    onClick={toggleMenu}
                    className="text-2xl md:text-3xl focus:outline-none p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FiX />
                  </button>
                </div>

                <nav className="flex flex-col gap-4 md:gap-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="md:text-xl font-medium tracking-wide hover:text-pink-300 transition-colors block"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}

                  <hr className="border-white/10 my-2" />

                  {/* Mobile Buttons */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + navItems.length * 0.05 }}
                    className="flex flex-col gap-3"
                  >
                    {user ? (
                      <>
                        <Link
                          href={user?.is_profile_completed ? "/dashboard" : "/auth/profile-setup"}
                          onClick={toggleMenu}
                          className="w-full rounded-lg bg-[#FE5E7E] py-3 text-center text-sm sm:text-base font-semibold shadow-lg transition-all hover:bg-pink-400 active:scale-95"
                        >
                          {user?.is_profile_completed ? "Dashboard" : "Profile Setup"}
                        </Link>
                        <button 
                          onClick={() => setIsLogoutModalOpen(true)} 
                          className="w-full rounded-lg border border-white/20 py-2.5 flex items-center justify-center gap-2 text-sm sm:text-base font-medium transition-colors hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/50"
                        >
                          <LogOut className="w-5 h-5" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/auth"
                          onClick={toggleMenu}
                          className="w-full rounded-lg border border-white/20 py-2.5 text-center text-sm sm:text-base font-medium transition-colors hover:bg-white/10"
                        >
                          Log In
                        </Link>

                        <Link
                          href="/auth/register"
                          onClick={toggleMenu}
                          className="w-full rounded-lg bg-[#FE5E7E] py-3 text-center text-sm sm:text-base font-semibold shadow-lg transition-all hover:bg-pink-400 active:scale-95"
                        >
                          Get Started Free
                        </Link>
                      </>
                    )}
                  </motion.div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Logout Confirmation Modal */}
        <Modal
          open={isLogoutModalOpen}
          onCancel={() => setIsLogoutModalOpen(false)}
          footer={null}
          closeIcon={null}
          centered
          width={420}
        >
          <div className="py-3 flex flex-col items-center text-center">

            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-2">
              <LogOut size={20} className="text-red-500" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-[#111827] mb-2">
              Logout
            </h2>

            {/* Description */}
            <p className="text-[13px] text-[#6B7280] leading-5 max-w-75 mb-7">
              Are you sure you want to logout from your account?
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-3 w-full">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="cursor-pointer flex-1 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                disabled={isPending}
                className={`cursor-pointer flex-1 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition text-sm font-medium ${isPending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {isPending ? <LoadingIcon /> : "Logout"}
              </button>
            </div>
          </div>
        </Modal>
      </div >
    </header >
  );
};
export default HomeHeader;