import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize from localStorage for persistence after refresh
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Derived authentication status
  const isAuthenticated = !!token; // true if token exists, false otherwise

  // Save JWT + role after successful login
  const login = (jwt, userRole) => {
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', userRole);
    setToken(jwt);
    setRole(userRole);
  };

  // Clear authentication info when user logs out
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
