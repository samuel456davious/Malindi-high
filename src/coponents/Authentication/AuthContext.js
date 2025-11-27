import React, { createContext, useState } from 'react';
import API from '../Authentication/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile')) || null
  );

  const isAuthenticated = !!token;

  // --- Convert profilePhoto filename → Full URL ---
  const fixProfilePhotoUrl = (profileData) => {
    if (!profileData) return profileData;

    let photo = profileData.profile_photo;

    if (!photo) {
      profileData.profile_photo = "/default-avatar.png";
      return profileData;
    }

    // Already full URL
    if (photo.startsWith("http://") || photo.startsWith("https://")) {
      return profileData;
    }

    // Convert filename → correct full URL
    profileData.profile_photo =
      `https://malindihigh.pythonanywhere.com/static/uploads/profile_photos/${photo}`;

    return profileData;
  };

  // --- LOGIN HANDLER (called after successful login API call) ---
  const login = (jwt, userData) => {
    // Store token + role
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', userData.role);
    setToken(jwt);
    setRole(userData.role);

    // Fix profile photo URL
    const fixedProfile = fixProfilePhotoUrl({
      username: userData.username,
      email: userData.email,
      profile_photo: userData.profile_photo,
    });

    // Save profile
    localStorage.setItem('profile', JSON.stringify(fixedProfile));
    setProfile(fixedProfile);
  };

  // --- LOGOUT ---
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('profile');
    setToken(null);
    setRole(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        profile,
        isAuthenticated,
        login,
        logout,
        setProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
