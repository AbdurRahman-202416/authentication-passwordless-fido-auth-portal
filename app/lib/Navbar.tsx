"use client";
import React, { useState } from "react";
import Link from "next/link";
const KeyIcon = ({ className }) => (
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
    {" "}
    <path d="M10 20A10 10 0 1 0 10 0a10 10 0 0 0 0 20z"></path>{" "}
    <path d="M12 12L20 20"></path> <circle cx="10" cy="10" r="3"></circle>{" "}
  </svg>
);
export default function Navbar() {
  const [activePath, setActivePath] = useState("");

  const getLinkClasses = (href, isButton = false) => {
    const isActive = activePath === href;

    if (isButton) {
      return isActive
        ? " text-white text-nowrap px-4 py-2 rounded-lg font-semibold shadow-md border-2 border-indigo-400"
        : " text-white px-4 py-2 rounded-lg font-semibold text-nowrap transition duration-200 shadow-md";
    }

    return isActive
      ? "text-white transition duration-200 font-bold border-b-2 border-indigo-400"
      : "text-gray-300 hover:text-white transition duration-200 font-medium";
  };

  const handleLinkClick = (href) => {
    setActivePath(href);
  };

  return (
    <nav className="bg-gray-900 shadow-xl border-b border-indigo-500/30 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between gap-10 items-center h-16">
          <Link
            href="/"
            className="flex items-center space-x-3 text-white hover:text-indigo-400"
            onClick={() => handleLinkClick("/")}
          >
            <KeyIcon className="w-6 h-6 text-indigo-500" />
            <span className="font-extrabold text-xl tracking-wider">
              FIDO Passkey
            </span>
          </Link>

          <div className="flex items-center space-x-6 text-sm sm:text-base">
            <Link
              href="/"
              className={getLinkClasses("/") + " hidden sm:inline"}
              onClick={() => handleLinkClick("/")}
            >
              Home
            </Link>

            <Link
              href="/register"
              className={getLinkClasses("/register")}
              onClick={() => handleLinkClick("/register")}
            >
              Register
            </Link>

            <Link
              href="/login"
              className={getLinkClasses("/login")}
              onClick={() => handleLinkClick("/login")}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
