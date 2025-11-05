"use client";

import { startRegistration } from "@simplewebauthn/browser";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!username) return alert("Please enter a username");
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
        router.push("/login"); // redirect to verified page
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
    <div className="min-h-screen bg-gray-50">
     
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Register Passkey</h1>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <button
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register Passkey"}
        </button>
      </div>
    </div>
  );
}
