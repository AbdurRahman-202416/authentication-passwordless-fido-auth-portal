"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    if (!username) return alert("Please enter username");
    setLoading(true);

    try {
      const res = await fetch("/api/login/options", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const options = await res.json();
      console.log("Server Login Options:", options);
      console.log("allowCredentials:", options.allowCredentials);

      // ✅ Check if PublicKeyCredential is available
      if (!window.PublicKeyCredential) {
        alert("❌ WebAuthn not supported on this browser");
        return;
      }

      // ✅ Check if conditional mediation is available
      const available =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      console.log("Platform authenticator available:", available);

      const credential = await startAuthentication(options);
      console.log("Credential received:", credential);

      // ... rest of your code
    } catch (err: any) {
      console.error("Login error:", err);
      alert(`Login failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Login with Passkey
        </h1>

        <input
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white py-2 rounded"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? "Authenticating..." : "Sign in with Passkey"}
        </button>
      </div>
    </div>
  );
}
