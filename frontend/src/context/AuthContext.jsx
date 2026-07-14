import React, { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/authApi.js";

const AuthContext = createContext();

/**
 * Holds the logged-in admin's session. Token lives in localStorage;
 * on mount we verify it's still valid via GET /auth/me.
 */
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cafe_admin_token");
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .getMe()
      .then((res) => setAdmin(res.data.admin))
      .catch(() => localStorage.removeItem("cafe_admin_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await authApi.login(email, password);
    localStorage.setItem("cafe_admin_token", res.data.token);
    setAdmin(res.data.admin);
    return res.data.admin;
  };

  const logout = () => {
    localStorage.removeItem("cafe_admin_token");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
