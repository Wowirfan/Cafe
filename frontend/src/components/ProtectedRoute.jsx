import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "./Loader.jsx";

/**
 * Guards all /admin/* routes except /admin/login. Redirects to login
 * if there's no valid admin session.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
};

export default ProtectedRoute;
