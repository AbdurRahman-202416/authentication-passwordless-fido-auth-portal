"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CheckCircleIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const KeyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loginTime, setLoginTime] = useState("");

  useEffect(() => {
    if (localStorage.getItem("LoginSuccess") !== "true") {
      router.push("/login");
      return;
    }
    // In a real app, you'd get this from session/JWT
    const storedUsername = localStorage.getItem("registeredUser") || "User";
    setUsername(storedUsername);
    setLoginTime(new Date().toLocaleTimeString());

    // return()=>{
    //   localStorage.removeItem("LoginSuccess");
    //   localStorage.removeItem("registeredUser");
    // }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 pt-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-900 text-white px-4 py-2 rounded-lg italic transition-colors text-sm font-medium"
          >
            Logout
          </button>
        </div>

        {/* Success Card */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8 mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-full">
                <CheckCircleIcon />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome, {username}!
            </h2>
            <p className="text-gray-400 mb-4">
              You've successfully logged in with password + passkey
              authentication
            </p>
            <p className="text-sm text-gray-500">Login time: {loginTime}</p>
          </div>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Password Protection */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <LockIcon />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Password Protected
                </h3>
                <p className="text-sm text-gray-400">
                  Your account is secured with a traditional password
                </p>
              </div>
            </div>
          </div>

          {/* Passkey Security */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-emerald-500/20 p-3 rounded-xl">
                <KeyIcon />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Passkey Enabled
                </h3>
                <p className="text-sm text-gray-400">
                  Biometric authentication adds an extra layer of security
                </p>
              </div>
            </div>
          </div>

          {/* Two-Factor Auth */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <ShieldIcon />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">2-Factor Auth</h3>
                <p className="text-sm text-gray-400">
                  Both password and passkey required for login
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
          <h3 className="text-white font-semibold mb-4 text-lg">
            Authentication Flow
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                1
              </div>
              <p className="text-gray-300">User enters username and password</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                2
              </div>
              <p className="text-gray-300">
                System verifies password credentials
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                3
              </div>
              <p className="text-gray-300">
                User authenticates with biometric passkey
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                4
              </div>
              <p className="text-gray-300">Access granted to dashboard ✅</p>
            </div>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <span className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/20">
            🔐 Two-Factor Authentication
          </span>
          <span className="bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/20">
            🛡️ WebAuthn Secured
          </span>
          <span className="bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/20">
            ⚡ Fast & Secure
          </span>
        </div>
      </div>
    </div>
  );
}
