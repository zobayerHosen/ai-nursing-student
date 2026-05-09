import { Link, useLocation } from "react-router-dom";
import { MdNotifications, MdClose } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useLogout } from "@/hooks/api/auth/useLogout";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
    containerVariants,
    iconVariants,
    menuItemVariants,
    sidebarVariants,
    textVariants,
} from "./variants";
import { dashboard } from "./menueItems";
import SidebarMenu from "./SidebarMenu";
import Logo from "@/components/svgs/Logo";
import { FaUserCircle } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";

const DashboardSidebar = ({ open, countData, onClose }) => {
    const location = useLocation();
    const logout = useLogout();
    const [animationKey, setAnimationKey] = useState(0);
    const user = useSelector((state) => state.user.user);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const languageButtonRef = useRef(null);
    const languageDropdownRef = useRef(null);

    useEffect(() => {
        if (open) {
            setAnimationKey((prev) => prev + 1);
        }
    }, [open]);

    // Handle click outside to close language dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showLanguageDropdown &&
                languageButtonRef.current &&
                !languageButtonRef.current.contains(event.target) &&
                languageDropdownRef.current &&
                !languageDropdownRef.current.contains(event.target)
            ) {
                setShowLanguageDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showLanguageDropdown]);

    // Load Google Translate script
    useEffect(() => {
        // Add CSS to hide Google Translate bar
        const style = document.createElement("style");
        style.innerHTML = `
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
      body {
        top: 0px !important;
      }
      .goog-te-gadget {
        color: transparent !important;
        font-size: 0 !important;
        height: 0 !important;
      }
      .goog-te-gadget-simple {
        display: none !important;
      }
      .goog-te-menu-frame {
        display: none !important;
      }
      .goog-tooltip {
        display: none !important;
      }
      .goog-tooltip:hover {
        display: none !important;
      }
      .goog-text-highlight {
        background-color: transparent !important;
        box-shadow: none !important;
      }
      #google_translate_element {
        display: none !important;
      }
      iframe.goog-te-banner-frame {
        display: none !important;
      }
      .skiptranslate {
        display: none !important;
      }
    `;
        document.head.appendChild(style);

        // Remove any existing Google Translate elements
        const removeExistingGoogleTranslate = () => {
            const existingScript = document.querySelector("#google-translate-script");
            if (existingScript) existingScript.remove();

            const existingBanner = document.querySelector(".goog-te-banner-frame");
            if (existingBanner) existingBanner.remove();
        };

        const addGoogleTranslate = () => {
            removeExistingGoogleTranslate();

            // Create script
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src =
                "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);

            // Initialize Google Translate
            window.googleTranslateElementInit = () => {
                if (window.google && window.google.translate) {
                    new window.google.translate.TranslateElement(
                        {
                            pageLanguage: "en",
                            includedLanguages:
                                "en,bn,es,fr,de,it,pt,zh-CN,ja,ko,ru,ar,hi,tr,nl,pl,sv,th,vi,id,ms,he,uk,ur,fa,ro",
                            layout:
                                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                            autoDisplay: false,
                        },
                        "google_translate_element",
                    );
                }
            };
        };

        addGoogleTranslate();

        // Cleanup
        return () => {
            const script = document.querySelector("#google-translate-script");
            if (script) script.remove();
            if (style) style.remove();
        };
    }, []);

    // Language options - English first, then Bangla, then other popular languages
    const languages = [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "bn", name: "বাংলা (Bangla)", flag: "🇧🇩" },
        { code: "es", name: "Español", flag: "🇪🇸" },
        { code: "fr", name: "Français", flag: "🇫🇷" },
        { code: "de", name: "Deutsch", flag: "🇩🇪" },
        { code: "it", name: "Italiano", flag: "🇮🇹" },
        { code: "pt", name: "Português", flag: "🇵🇹" },
        { code: "zh-CN", name: "中文", flag: "🇨🇳" },
        { code: "ja", name: "日本語", flag: "🇯🇵" },
        { code: "ko", name: "한국어", flag: "🇰🇷" },
        { code: "ru", name: "Русский", flag: "🇷🇺" },
        { code: "ar", name: "العربية", flag: "🇸🇦" },
        { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
        { code: "tr", name: "Türkçe", flag: "🇹🇷" },
        { code: "nl", name: "Nederlands", flag: "🇳🇱" },
        { code: "pl", name: "Polski", flag: "🇵🇱" },
        { code: "sv", name: "Svenska", flag: "🇸🇪" },
        { code: "th", name: "ไทย", flag: "🇹🇭" },
        { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
        { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
        { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
        { code: "he", name: "עברית", flag: "🇮🇱" },
        { code: "uk", name: "Українська", flag: "🇺🇦" },
        { code: "ur", name: "اردو", flag: "🇵🇰" },
        { code: "fa", name: "فارسی", flag: "🇮🇷" },
        { code: "ro", name: "Română", flag: "🇷🇴" },
    ];

    const changeLanguage = (langCode) => {
        // Set cookie for Google Translate
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
        document.cookie = `googtrans=/en/${langCode}; path=/`;

        // Reload the page to apply translation
        window.location.reload();
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <AnimatePresence>
                <motion.aside
                    initial={false}
                    animate={open ? "open" : "closed"}
                    variants={sidebarVariants}
                    className="fixed top-0 z-[1000] h-screen transition-colors duration-300 bg-darkerBlack border-r border-r-lightLime/50 shadow-lg"
                >
                    <div className="flex h-full flex-col">
                        {/* DESKTOP HEADER */}
                        <div className="relative py-5 w-full xl:flex hidden justify-center items-center">
                            {open && <Logo />}
                        </div>

                        {/* FIXED MOBILE HEADER (Now outside the scrollable area) */}
                        <div className="xl:hidden flex flex-shrink-0 items-center justify-between p-4 border-b border-darkBlack bg-darkerBlack">
                            {open && <Logo />}
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1 rounded-md bg-lightLime/20 border border-lightLime/50 text-white hover:bg-rose-600 transition-colors duration-200"
                                aria-label="Close sidebar"
                            >
                                <MdClose size={20} />
                            </motion.button>
                        </div>

                        {/* SCROLLABLE CONTENT START */}
                        <div className="flex-1 flex flex-col overflow-hidden">
                            {/* Profile Section */}
                            <div
                                className={`m-2.5 rounded-lg p-2.5 border border-darkLime/50 transition-colors duration-200 bg-lightLime/20 flex-shrink-0`}
                            >
                                {open ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{
                                                    type: "tween",
                                                    ease: [0.25, 0.1, 0.25, 1],
                                                    duration: 0.2,
                                                }}
                                                className="w-10 h-10 border border-lightBlack rounded-full flex items-center justify-center overflow-hidden"
                                            >
                                                {user?.avatar ? (
                                                    <img
                                                        src={user.avatar}
                                                        alt="User profile"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <FaUserCircle className="w-8 h-8 text-darkLime" />
                                                )}
                                            </motion.div>

                                            <div>
                                                <h2 className="text-sm font-semibold text-white">
                                                    {(user?.name?.length > 10
                                                        ? user.name.substring(0, 10) + "..."
                                                        : user?.name) || "Full name"}
                                                </h2>
                                                <p className="text-xs text-gray-400">
                                                    {user?.email || "username"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* <div className="flex items-center space-x-1">
                      <Link to={"/dashboard/notifications"}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "tween",
                            ease: [0.25, 0.1, 0.25, 1],
                            duration: 0.2,
                          }}
                          className="p-1 cursor-pointer rounded-md transition-colors duration-200 relative bg-transparent text-white hover:bg-darkerBlack"
                        >
                          <MdNotifications size={19} />
                          <span className="absolute -top-2 -right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center bg-darkLime text-darkerBlack">
                            {countData?.data?.count || "0"}
                          </span>
                        </motion.button>
                      </Link>
                    </div> */}
                                    </motion.div>
                                ) : (
                                    <div className="flex flex-col items-center space-y-2">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{
                                                type: "tween",
                                                ease: [0.25, 0.1, 0.25, 1],
                                                duration: 0.2,
                                            }}
                                            className="w-8 h-8 border border-lightBlack rounded-full flex items-center justify-center overflow-hidden"
                                        >
                                            <img
                                                src={user?.profile_img_url}
                                                alt="User profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        <Link to={"/dashboard/notifications"}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{
                                                    type: "tween",
                                                    ease: [0.25, 0.1, 0.25, 1],
                                                    duration: 0.2,
                                                }}
                                                className="p-1.5 cursor-pointer rounded-full transition-colors duration-200 relative bg-lightBlack text-white hover:bg-darkGrey"
                                            >
                                                <MdNotifications size={16} />
                                                <span className="absolute -top-2 -right-1 w-5 h-5 text-xs rounded-full flex items-center justify-center bg-rose-600 text-white">
                                                    {countData?.data?.count || "0"}
                                                </span>
                                            </motion.button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Hidden Google Translate Element */}
                            <div
                                id="google_translate_element"
                                style={{ display: "none" }}
                            ></div>

                            {/* Scrollable Navigation */}
                            <div className="flex-1 overflow-y-auto px-3 2xl:py-3 py-1 thin-scrollbar">
                                <SidebarMenu
                                    items={dashboard}
                                    isActive={isActive}
                                    theme="dark"
                                    open={open}
                                    onClose={onClose}
                                    containerVariants={containerVariants}
                                    menuItemVariants={menuItemVariants}
                                    iconVariants={iconVariants}
                                    textVariants={textVariants}
                                    animationKey={animationKey}
                                    sectionName="bettingTools"
                                    title="Betting Tools"
                                />
                            </div>
                        </div>
                        {/* SCROLLABLE CONTENT END */}

                        {/* LANGUAGE SWITCHER - Below Sidebar Menu, Above Logout Button */}
                        <div className="transition-colors duration-200 border-t border-gray-700/50 flex-shrink-0">
                            <div className="">
                                {open ? (
                                    // Expanded mode
                                    <div className="relative" ref={languageButtonRef}>
                                        <motion.button
                                            onClick={() =>
                                                setShowLanguageDropdown(!showLanguageDropdown)
                                            }
                                            className="group relative flex items-center w-full rounded-lg py-2.5 px-3 text-sm font-medium transition-all duration-200 cursor-pointer text-gray-400 hover:text-darkLime"
                                        >
                                            <div className="flex items-center justify-center w-7 h-7 rounded-md">
                                                <IoLanguage size={18} />
                                            </div>
                                            <motion.span
                                                variants={textVariants}
                                                initial="closed"
                                                animate="open"
                                                className="ml-3 whitespace-nowrap font-medium"
                                            >
                                                Language
                                            </motion.span>
                                        </motion.button>

                                        {/* Language Dropdown for Expanded mode */}
                                        {showLanguageDropdown && (
                                            <div
                                                ref={languageDropdownRef}
                                                className="absolute bottom-full left-3 mb-2 w-56 bg-darkerBlack border border-darkLime/50 rounded-lg shadow-lg overflow-hidden z-50"
                                            >
                                                <div className="max-h-64 overflow-y-auto thin-scrollbar">
                                                    <div className="sticky top-0 bg-darkerBlack border-b border-darkLime/50 px-3 py-2">
                                                        <span className="text-xs text-darkLime font-semibold">
                                                            Select Language
                                                        </span>
                                                    </div>
                                                    {languages.map((lang) => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => changeLanguage(lang.code)}
                                                            className="w-full px-3 py-2 text-left hover:bg-lightLime/20 transition-colors flex items-center gap-2 text-gray-300 hover:text-white text-sm cursor-pointer"
                                                        >
                                                            <span className="text-base">{lang.flag}</span>
                                                            <span>{lang.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Collapsed mode
                                    <div
                                        className="relative flex justify-center"
                                        ref={languageButtonRef}
                                    >
                                        <motion.button
                                            onClick={() =>
                                                setShowLanguageDropdown(!showLanguageDropdown)
                                            }
                                            className="group relative flex items-center justify-center w-full rounded-lg py-2.5 px-3 text-sm font-medium transition-all duration-200 cursor-pointer text-gray-400 hover:text-darkLime"
                                        >
                                            <div className="flex items-center justify-center w-7 h-7 rounded-md">
                                                <IoLanguage size={18} />
                                            </div>
                                        </motion.button>

                                        {/* Language Dropdown for Collapsed mode */}
                                        {showLanguageDropdown && (
                                            <div
                                                ref={languageDropdownRef}
                                                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-56 bg-darkerBlack border border-darkLime/50 rounded-lg shadow-lg overflow-hidden z-50"
                                            >
                                                <div className="max-h-64 overflow-y-auto thin-scrollbar">
                                                    <div className="sticky top-0 bg-darkerBlack border-b border-darkLime/50 px-3 py-2">
                                                        <span className="text-xs text-darkLime font-semibold">
                                                            Select Language
                                                        </span>
                                                    </div>
                                                    {languages.map((lang) => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => changeLanguage(lang.code)}
                                                            className="w-full px-3 py-2 text-left hover:bg-lightLime/20 transition-colors flex items-center gap-2 text-gray-300 hover:text-white text-sm cursor-pointer"
                                                        >
                                                            <span className="text-base">{lang.flag}</span>
                                                            <span>{lang.name}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Logout Button (Fixed at bottom) */}
                        <div className="transition-colors duration-200 border-gray-700 mb-5 flex-shrink-0">
                            <motion.button
                                onClick={logout}
                                transition={{
                                    type: "tween",
                                    ease: [0.25, 0.1, 0.25, 1],
                                    duration: 0.2,
                                }}
                                className={`group relative flex ${open ? "" : "justify-center"
                                    } items-center w-full rounded-lg py-2.5 px-3 text-sm font-medium transition-all duration-200 cursor-pointer text-gray-400 hover:text-darkLime`}
                            >
                                <div className="flex items-center justify-center w-7 h-7 rounded-md transition-transform duration-300 group-hover:rotate-90">
                                    <FaPowerOff size={16} />
                                </div>
                                {open && (
                                    <motion.span
                                        variants={textVariants}
                                        initial="closed"
                                        animate="open"
                                        className="ml-3 whitespace-nowrap font-medium"
                                    >
                                        Logout
                                    </motion.span>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </motion.aside>
            </AnimatePresence>
        </>
    );
};

export default DashboardSidebar;