"use client";

import { startRegistration } from "@simplewebauthn/browser";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

const LockIcon = () => (
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
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default function RegisterPage() {
  const [step, setStep] = useState(1); // 1: credentials, 2: passkey
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Step 1: Register username and password
  const handleInitialRegister = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      setUserId(data.id); // <-- save userId
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasskeyRegister = async () => {
    setError("");
    setLoading(true);
    try {
      if (!userId) {
        setError('Missing userId. Please complete step 1 first.');
        setLoading(false);
        return;
      }
      const optionsRes = await fetch("/api/register-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const json = await optionsRes.json();
      console.debug('/api/register-challenge response:', json);
      if (!optionsRes.ok) {
        const errMsg = json?.error || 'Failed to get registration options';
        throw new Error(errMsg);
      }
      const { options } = json;

      if (!options || !options.publicKey) {
        throw new Error('Server returned no registration options: ' + JSON.stringify(json));
      }
      if (options.publicKey && (options.publicKey.challenge === undefined || options.publicKey.challenge === null)) {
        throw new Error('Server returned registration options without a challenge: ' + JSON.stringify(json));
      }

      // Note: do not convert challenge/ids to ArrayBuffer here. Pass the JSON (base64url strings)
      // to @simplewebauthn/browser as optionsJSON — the library handles conversion internally.

      // support servers that return either { options: { publicKey: {...} } } OR { options: publicKey }
      const publicKey = options?.publicKey ?? options;

      if (!publicKey) throw new Error('No publicKey options returned');

      // Pass the JSON options to @simplewebauthn/browser which expects the optionsJSON shape
      console.debug('Calling startRegistration with optionsJSON:', publicKey);
      const credential = await startRegistration({ optionsJSON: publicKey as any });

      const verifyRes = await fetch("/api/register-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cred: credential }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.verified) {
        alert("✅ Registration complete!");
        router.push("/login");
      } else {
        setError("Passkey registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Passkey registration error");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-cyan-600 p-4 rounded-full shadow-lg shadow-emerald-500/50">
                <ShieldCheckIcon />
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  step >= 1 ? "bg-emerald-500" : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`w-8 h-1 ${
                  step >= 2 ? "bg-emerald-500" : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  step >= 2 ? "bg-emerald-500" : "bg-gray-600"
                }`}
              ></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 text-white">
            {step === 1 ? "Create Account" : "Register Passkey"}
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            {step === 1
              ? "Choose your username and password"
              : "Secure your account with biometric authentication"}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {step === 1 ? (
            /* Step 1: Username and Password */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon />
                  </div>
                  <input
                    type="password"
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleInitialRegister()
                    }
                    disabled={loading}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Minimum 6 characters
                </p>
              </div>

              <button
                className={`w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading ? "animate-pulse" : ""
                }`}
                disabled={loading}
                onClick={handleInitialRegister}
              >
                {loading ? "Creating Account..." : "Continue →"}
              </button>
            </div>
          ) : (
            /* Step 2: Passkey Registration */
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-300 mb-2">
                  ✅ Account created for:{" "}
                  <span className="text-emerald-400 font-semibold">
                    {username}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  Now register your passkey to enable secure biometric login.
                </p>
              </div>

              <button
                className={`w-full bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading ? "animate-pulse" : ""
                }`}
                disabled={loading}
                onClick={handlePasskeyRegister}
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
                    Registering Passkey...
                  </span>
                ) : (
                  "Register Passkey 🔐"
                )}
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
              🔐 Biometric
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/20">
              🚀 Fast Setup
            </span>
            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">
              🛡️ Secure
            </span>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
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

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Secured by{" "}
            <span className="text-emerald-400 font-semibold">
              FIDO WebAuthn
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
