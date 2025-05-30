import React, { useState } from "react";

export default function OAuthLoginButtons() {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const redirectToProvider = (provider) => {
    setLoadingProvider(provider);
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/oauth/${provider}/redirect`;
  };

  return (
    <div className="space-y-3 mt-6">
      <button
        onClick={() => redirectToProvider("google")}
        disabled={loadingProvider !== null}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loadingProvider === "google" ? (
          <>
            <span className="spinner-pro w-4 h-4 border-white border-t-transparent rounded-full border-2 animate-spin"></span>
            Đang chuyển hướng Google...
          </>
        ) : (
          "🔐 Đăng nhập bằng Google"
        )}
      </button>

      <button
        onClick={() => redirectToProvider("facebook")}
        disabled={loadingProvider !== null}
        className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loadingProvider === "facebook" ? (
          <>
            <span className="spinner-pro w-4 h-4 border-white border-t-transparent rounded-full border-2 animate-spin"></span>
            Đang chuyển hướng Facebook...
          </>
        ) : (
          "🔐 Đăng nhập bằng Facebook"
        )}
      </button>

      {/* Gợi ý thêm Apple sau này */}
      {/* <button
        onClick={() => redirectToProvider("apple")}
        disabled={loadingProvider !== null}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 disabled:opacity-60"
      >
        🔐 Đăng nhập bằng Apple
      </button> */}
    </div>
  );
}
