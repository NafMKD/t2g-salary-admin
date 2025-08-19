"use client";

import { useState } from "react";
import { useAuthToken } from "@/hooks/use-auth-token";
import { apiPost } from "@/lib/api";
import { LogOut, Loader2 } from "lucide-react";

export default function LogoutButton() {
  const { token, setToken, isAuthenticated } = useAuthToken();
  const [loading, setLoading] = useState(false);

  async function handle() {
    setLoading(true);
    try {
      if (token) await apiPost("/api/logout", {}, token);
    } catch {
      // ignore errors
    } finally {
      setToken(null);
      setLoading(false);
    }
  }

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-100 px-4 py-2 text-sm text-gray-700 hover:bg-red-300 transition cursor-pointer"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
