"use client";

import { startRegistration } from "@simplewebauthn/browser";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Shield Check icon for registration
const ShieldCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// User Plus icon
const UserPlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-gray-400"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" x2="19" y1="8" y2="14" />
    <line x1="22" x2="16" y1="11" y2="11" />
  </svg>
);

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username.trim()) {
      alert("Please enter a username");
      return;
    }

    setLoading(true);

    try {
      // 1) Get options from server
      const options = await fetch("/api/register/options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      }).then((r) => r.json());

      if (options.error) {
        alert(options.error);
        setLoading(false);
        return;
      }

      // 2) Browser registration
      const credential = await startRegistration(options);

      // 3) Verify on server
      const res = await fetch("/api/register/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, credential }),
      }).then((r) => r.json());

      if (res.verified) {
        alert("✅ Passkey registered successfully!");
        router.push("/login");
      } else {
        alert("❌ Registration failed");
      }
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6 sm:p-8 md:p-10">
          {/* Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              
              {/* Icon container */}
              <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-full shadow-lg shadow-emerald-500/50">
                <ShieldCheckIcon />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-white">
            Create Your Account
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm sm:text-base">
            Register your{" "}
            <span className="text-emerald-400 font-semibold">passkey</span>{" "}
            and go passwordless
          </p>

          {/* Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Username Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Choose Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserPlusIcon />
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleRegister()}
                  disabled={loading}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                This will be your unique identifier
              </p>
            </div>

            {/* Register Button */}
            <button
              className={`w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                loading ? "animate-pulse" : ""
              }`}
              disabled={loading}
              onClick={handleRegister}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Your Passkey...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2"></span>
                  Register Passkey
                </span>
              )}
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-6 sm:mt-8 bg-gray-900/50 border border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center">
              <span className="mr-2">💡</span>
              What's a Passkey?
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              A passkey is a secure credential stored on your device. No passwords to remember, 
              impossible to phish, and protected by your device's biometrics.
            </p>
          </div>

          {/* Feature Tags */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 justify-center">
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
              🔐 Biometric
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/20">
              🚀 Instant Setup
            </span>
            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">
              🛡️ Phishing-Proof
            </span>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            Secured by{" "}
            <span className="text-emerald-400 font-semibold">FIDO WebAuthn</span>
          </p>
        </div>
      </div>
    </div>
  );
}