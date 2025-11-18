import React from "react";

export default function loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
      <div className="p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex gap-2 mb-3">
          {/* Bouncing loader balls */}
          <div className="w-4 sm:h-8 sm:w-8 h-4 bg-blue-800 rounded-full animate-bounce"></div>
          <div className="w-4 sm:h-8 sm:w-8 h-4 bg-green-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 sm:h-8 sm:w-8 h-4 bg-red-500 rounded-full animate-bounce [animation-delay:-0.5s]"></div>
        </div>
      </div>
    </div>
  );
}
