"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">✅ Welcome!</h1>
        <p className="text-gray-700">
          You have successfully logged in using your passkey.
        </p>
      </div>
    </div>
  );
}
