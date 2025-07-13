import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const AuthModal = ({ onClose, onSuccess }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    const endpoint = mode === "login" ? "login" : "signup";
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      toast.error("Email and password are required");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/${endpoint}`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (mode === "signup") {
        toast.success("🎉 Signup successful! Now login.");
        setMode("login");
        setEmail('');
        setPassword('');
        return;
      }

      localStorage.setItem("token", res.data.token);
      onSuccess(res.data.token);
      toast.success(" Logged in successfully!");
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong";
      toast.error(` ${msg}`);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg w-full max-w-md relative border border-slate-700">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-red-400 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-center text-sm mt-4 text-slate-400">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-blue-400 underline cursor-pointer hover:text-blue-300"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-blue-400 underline cursor-pointer hover:text-blue-300"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
