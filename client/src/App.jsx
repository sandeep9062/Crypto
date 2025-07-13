import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Dashboard from "./dashboard/Dashboard";
import AuthModal from "./components/AuthModal";

const App = () => {
  const [token, setToken] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out");
  };

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white p-1 sm:p-10">
      <header className="text-center mb-10 justify-around items-center flex flex-col md:flex-row gap-6">
        <img
          src="/crypto.png"
          height={50}
          width={92}
          alt="logo"
          className="object-contain rounded-xl hover:opacity-90 transition"
        />

        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-500 drop-shadow-sm">
            Crypto Tracker Dashboard
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Real-time prices, trends, and insights for the top 10
            cryptocurrencies.
          </p>
        </div>

        <div>
          {!token ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      <Toaster richColors position="top-right" />
      <Dashboard token={token} />

      {showLoginModal && (
        <AuthModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={(receivedToken) => {
            setToken(receivedToken);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
};

export default App;
