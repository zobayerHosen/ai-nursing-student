"use client"
import Link from "next/link";
// NavList.jsx
import { useState } from "react";

const NavList = () => {
    const navItems = [
        { name: "Features", href: "#features" },
        { name: "NCLEX Prep", href: "#nclex-prep" },
        { name: "Pricing", href: "#pricing" },
        { name: "Terms", href: "#terms" },
        { name: "Contact", href: "#contact" }
    ];

    const [activeItem, setActiveItem] = useState("");

    return (
        <nav className="flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`
                        px-3 py-2 text-sm lg:text-base font-medium rounded-lg
                        transition-all duration-200 ease-in-out
                        ${activeItem === item.name
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }
                    `}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveItem(item.name);
                        // Add smooth scroll logic here if needed
                        const element = document.querySelector(item.href);
                        if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default NavList;