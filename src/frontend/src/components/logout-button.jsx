"use client";

import { useAuthToken } from "@/hooks/use-auth-token";
import { apiPost } from "@/lib/api";

export default function LogoutButton() {
  const { token, setToken, isAuthenticated } = useAuthToken();

  async function handle() {
    try {
      if (token) await apiPost("/api/logout", {}, token);
    } catch {
      // ignore network issues on logout
    } finally {
      setToken(null);
    }
  }

  if (!isAuthenticated) return null;

  return (
    <button onClick={handle} className="rounded border px-3 py-1 text-sm">
      Logout
    </button>
  );
}
