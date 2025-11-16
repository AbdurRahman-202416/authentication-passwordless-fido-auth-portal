"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const KeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 20A10 10 0 1 0 10 0a10 10 0 0 0 0 20z"></path>
    <path d="M12 12L20 20"></path>
    <circle cx="10" cy="10" r="3"></circle>
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const getLinkClasses = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "text-white font-semibold border-b-2 border-indigo-400"
      : "text-gray-300 hover:text-white transition";
  };

  return (
    <nav className="bg-gray-900 shadow-xl border-b border-indigo-500/30 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 text-white hover:text-indigo-400"
        >
          <KeyIcon className="w-6 h-6 text-indigo-500" />
          <span className="font-extrabold text-xl tracking-wider">
            FIDO Passkey
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-base">
          <Link href="/" className={getLinkClasses("/")}>
            Home
          </Link>
          <Link href="/register" className={getLinkClasses("/register")}>
            Register
          </Link>
          <Link href="/login" className={getLinkClasses("/login")}>
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="text-3xl">{menuOpen ? "✖" : "☰"}</span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-gray-800 border-t border-gray-700 
          transition-all duration-300 overflow-hidden 
          ${menuOpen ? "max-h-40 py-3" : "max-h-0 py-0"}
        `}
      >
        <div className="flex flex-col space-y-3 px-6 text-lg">
          <Link href="/" className={getLinkClasses("/")} onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/register" className={getLinkClasses("/register")} onClick={() => setMenuOpen(false)}>
            Register
          </Link>
          <Link href="/login" className={getLinkClasses("/login")} onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
