"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { useAuthToken } from "@/hooks/use-auth-token";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginForm() {
  const router = useRouter();
  const { setToken } = useAuthToken();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  function validateForm() {
    const errs = {};
    if (!email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      errs.password = "Password is required";
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setError(null);
    setLoading(true);
    try {
      const res = await apiPost("/api/login", { email, password });
      setToken(res.token);
      router.push("/admin");
    } catch (err) {
      let msg = "Login failed. Please try again.";
      if (err.message?.includes("401")) {
        msg = "Invalid credentials. Please check your email or password.";
      } else if (err.message?.includes("403")) {
        msg = "Access denied. You are not authorized to log in.";
      } else if (err.message?.includes("422")) {
        msg = "Invalid input. Please check your email and password.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
        Admin Login
      </h1>

      {error && (
        <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((f) => ({ ...f, email: "" })); // clear error on change
            }}
            className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 text-sm ${
              fieldErrors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-black"
            }`}
          />
          {fieldErrors.email && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          )}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Need access? Contact your system administrator.
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          Back to Home
        </Link>
        </div>
    </div>
  );
}
