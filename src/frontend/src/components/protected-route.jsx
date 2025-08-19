"use client";

import { useEffect } from "react";
import { useAuthToken } from "@/hooks/use-auth-token";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthToken();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Checking session...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
