// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  if (!isAuthenticated) {
    // User not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // Logged in but role mismatch → redirect or show denied page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
