import Link from "next/link";
import React from "react";

// Inline SVG for a security/lock icon
const SecurityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-full h-full text-indigo-400"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    <circle cx="12" cy="16" r="2"></circle>
  </svg>
);

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[90vh] flex items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Text Content */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-4 sm:mb-6 leading-tight">
              Ditch the Password.{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Hello Passkeys.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              The future of authentication is here. This portal demonstrates{" "}
              <span className="text-indigo-400 font-semibold">FIDO WebAuthn</span>, 
              offering a login experience that is{" "}
              <span className="text-emerald-400 font-semibold">phishing-resistant</span>,{" "}
              <span className="text-cyan-400 font-semibold">fast</span>, and built on 
              powerful{" "}
              <span className="text-purple-400 font-semibold">public-key cryptography</span>.
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start mb-6 sm:mb-8">
              <span className="bg-indigo-500/20 text-indigo-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-indigo-500/30">
                🔒 Secure
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-emerald-500/30">
                ⚡ Lightning Fast
              </span>
              <span className="bg-purple-500/20 text-purple-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30">
                🛡️ Phishing-Proof
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-indigo-500/50"
              >
                <span className="mr-2"></span>
                Register Passkey
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-gray-500"
              >
                <span className="mr-2"></span>
                Sign In (Passwordless)
              </Link>
            </div>
          </div>

          {/* Graphic Section */}
          <div className="lg:w-5/12 w-full max-w-md lg:max-w-none mt-8 lg:mt-0 flex justify-center">
            <div className="relative w-full">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
              
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 sm:p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-indigo-500/40 hover:border-indigo-500/60 transition-all duration-300 aspect-square flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 relative">
                    {/* Animated rings */}
                    <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-ping"></div>
                    <div className="absolute inset-4 border-4 border-purple-500/20 rounded-full"></div>
                    
                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50">
                        <SecurityIcon />
                      </div>
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/20 rounded-full blur-sm animate-bounce"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-cyan-500/20 rounded-full blur-sm" style={{ animation: 'bounce 2s infinite 0.5s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats/Info */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-400 mb-2">100%</div>
            <div className="text-xs sm:text-sm text-gray-400">Passwordless Security</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-400 mb-2">&lt;2s</div>
            <div className="text-xs sm:text-sm text-gray-400">Average Login Time</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-2">0</div>
            <div className="text-xs sm:text-sm text-gray-400">Phishing Attacks Possible</div>
          </div>
        </div>
      </div>
    </div>
  );
}