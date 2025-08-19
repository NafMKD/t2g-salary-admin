"use client";

import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.localStorage.getItem("ADMIN_TOKEN");
    if (t) setToken(t);
    setLoading(false);
  }, []);

  function handleSetToken(t) {
    setToken(t);
    if (t) localStorage.setItem("ADMIN_TOKEN", t);
    else localStorage.removeItem("ADMIN_TOKEN");
  }

  const ctx = {
    token,
    setToken: handleSetToken,
    isAuthenticated: Boolean(token),
    loading,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

export function useAuthToken() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthToken must be used inside AuthProvider");
  return ctx;
}
