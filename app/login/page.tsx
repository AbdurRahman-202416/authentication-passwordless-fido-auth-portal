"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Fingerprint icon for passkey
const FingerprintIcon = () => (
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
    <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
    <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
    <path d="M8.65 22c.21-.66.45-1.32.57-2" />
    <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
    <path d="M2 16h.01" />
    <path d="M21.8 16c.2-2 .131-5.354 0-6" />
    <path d="M9 6.8a6 6 0 0 1 9 5.2c0 .47 0 1.17-.02 2" />
  </svg>
);

// User icon
const UserIcon = () => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Get authentication options from server
      const res = await fetch("/api/login/options", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: { "Content-Type": "application/json" },
      });

      const options = await res.json();

      if (options.error) {
        setError("Login failed: " + options.error);
        setLoading(false);
        return;
      }

      console.log("🔑 Authentication options received:", options);
      
      // Check if user has any credentials
      if (!options.allowCredentials || options.allowCredentials.length === 0) {
        setError("No passkeys found for this account. Please register first.");
        setLoading(false);
        return;
      }

      console.log("🔐 Starting authentication with browser...");

      // Start the authentication ceremony
      let credential;
      try {
        credential = await startAuthentication(options);
        console.log("✅ Browser authentication successful:", credential);
      } catch (authError) {
        console.error("❌ Browser authentication failed:", authError);
        
        // Handle specific errors
        if (authError.name === "NotAllowedError") {
          setError("Authentication cancelled or no matching passkey found. Make sure you're using the same device/browser where you registered.");
        } else if (authError.name === "InvalidStateError") {
          setError("Invalid authentication state. Please try again.");
        } else {
          setError("Authentication failed: " + authError.message);
        }
        setLoading(false);
        return;
      }

      // Verify with server
      console.log("📡 Verifying with server...");
      const verifyRes = await fetch("/api/login/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, credential }),
      });

      const verifyData = await verifyRes.json();
      
      if (verifyData.verified) {
        console.log("✅ Login successful!");
        alert("✅ Login Successful!");
        router.push("/dashboard");
      } else {
        console.error("❌ Server verification failed:", verifyData);
        setError("Login verification failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6 sm:p-8 md:p-10">
          {/* Icon Section */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              
              {/* Icon container */}
              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-full shadow-lg shadow-indigo-500/50">
                <FingerprintIcon />
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-white">
            Welcome Back
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm sm:text-base">
            Sign in with your{" "}
            <span className="text-indigo-400 font-semibold">passkey</span>
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4 sm:space-y-5">
            {/* Username Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                loading ? "animate-pulse" : ""
              }`}
              disabled={loading}
              onClick={handleLogin}
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
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🔐</span>
                  Sign in with Passkey
                </span>
              )}
            </button>
          </div>

          {/* Feature Tags */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 justify-center">
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
              🛡️ Secure
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/20">
              ⚡ Fast
            </span>
            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">
              🔒 Passwordless
            </span>
          </div>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Register here
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            Protected by{" "}
            <span className="text-indigo-400 font-semibold">FIDO WebAuthn</span>
          </p>
        </div>
      </div>
    </div>
  );
}