// app/login/page.tsx
"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

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

export default function LoginPage() {
  const [step, setStep] = useState(1); // 1: credentials, 2: passkey
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(""); // ✅ Added userId state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Step 1: Verify username and password against Express server
  const handlePasswordLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call Next API route for credentials
      const res = await fetch("/api/login/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Invalid credentials");
        setLoading(false);
        return;
      }

      // ✅ Save userId for passkey step
      setUserId(data.userId);
      setStep(2);
    } catch (err: unknown) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify passkey
  const handlePasskeyLogin = async () => {
    setError("");
    setLoading(true);
    try {
      if (!userId) {
        setError("Missing userId — please verify username & password first");
        setLoading(false);
        return;
      }
      // Use Next API route for login challenge
      const optionsRes = await fetch("/api/login-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!optionsRes.ok) {
        const err = await optionsRes.json();
        throw new Error(err.error || "Failed to get login challenge");
      }

      const json = await optionsRes.json();
      // ...existing code...
      const { options } = json;

      // The @simplewebauthn/browser library expects the JSON form (base64url strings)
      // when using the `optionsJSON` parameter. Do NOT convert challenge/ids to
      // ArrayBuffers here — let the library handle that conversion internally.
      const publicKey = options?.publicKey ?? options;
      if (!publicKey) throw new Error("No publicKey options returned");

      // ...existing code...
      const credential = await startAuthentication({ optionsJSON: publicKey });

      const verifyRes = await fetch("/api/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cred: credential }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        localStorage.setItem("registeredUser", username);
        localStorage.setItem("LoginSuccess", "true");
        toast.success("Login successful");
        router.push("/dashboard");
      } else {
        localStorage.setItem("LoginSuccess", "false");
        toast.error(verifyData.error || "Passkey verification failed");
        setError(verifyData.error || "Passkey verification failed");
      }
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(msg || "Login error");
      setError(msg || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-linear-to-br from-indigo-500 to-purple-600 p-4 rounded-full shadow-lg shadow-indigo-500/50">
                <FingerprintIcon />
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  step >= 1 ? "bg-indigo-500" : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`w-8 h-1 ${
                  step >= 2 ? "bg-indigo-500" : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  step >= 2 ? "bg-indigo-500" : "bg-gray-600"
                }`}
              ></div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 text-white">
            {step === 1 ? "Welcome Back" : "Verify Passkey"}
          </h1>
          <p className="text-center text-gray-400 mb-8 text-sm">
            {step === 1
              ? "Enter your credentials to continue"
              : "Authenticate with your biometric passkey"}
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
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handlePasswordLogin()
                    }
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                className={`w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading ? "animate-pulse" : ""
                }`}
                disabled={loading}
                onClick={handlePasswordLogin}
              >
                {loading ? "Verifying..." : "Continue →"}
              </button>
            </div>
          ) : (
            /* Step 2: Passkey Verification */
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-300 mb-2">
                  ✅ Password verified for:{" "}
                  <span className="text-indigo-400 font-semibold">
                    {username}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  Now verify your identity with your registered passkey.
                </p>
              </div>

              <button
                className={`w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading ? "animate-pulse" : ""
                }`}
                disabled={loading}
                onClick={handlePasskeyLogin}
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
                  "Verify with Passkey "
                )}
              </button>

              <button
                className="w-full text-gray-400 hover:text-white text-sm py-2 transition-colors"
                onClick={() => setStep(1)}
                disabled={loading}
              >
                ← Back to password
              </button>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-500/20">
               Secure
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium border border-cyan-500/20">
               Fast
            </span>
            <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20">
               2-Factor (2FA)
            </span>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Do not have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Protected by{" "}
            <span className="text-indigo-400 font-semibold">FIDO WebAuthn</span>
          </p>
        </div>
      </div>
    </div>
  );
}
