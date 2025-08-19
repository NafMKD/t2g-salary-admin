"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { useAuthToken } from "@/hooks/use-auth-token";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const { setToken } = useAuthToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiPost("/api/login", { email, password });
      setToken(res.token);
      router.push("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow"
    >
      <h1 className="text-xl font-semibold">Admin Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border px-3 py-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border px-3 py-2"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-4 py-2 text-white"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
