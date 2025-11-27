import React, { createContext, useState, useEffect } from 'react';
import API from '../Authentication/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile')) || null
  );

  const isAuthenticated = !!token;

  // --- FIX: Convert profilePhoto filename → Full URL ---
  const fixProfilePhotoUrl = (profileData) => {
    if (!profileData) return profileData;

    const backendBase = API.defaults.baseURL || ""; 
    let photo = profileData.profilePhoto;

    // No photo → fallback
    if (!photo) {
      profileData.profilePhoto = "/default-avatar.png";
      return profileData;
    }

    // If backend already returns a full URL → leave it
    if (photo.startsWith("http://") || photo.startsWith("https://")) {
      return profileData;
    }

    // Convert filename → backend URL
    profileData.profilePhoto = `'https://malindihigh.pythonanywhere.com/uploads/profile_photos/${photo}`;
    return profileData;
  };

  // Save JWT + role
  const login = (jwt, userRole) => {
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', userRole);
    setToken(jwt);
    setRole(userRole);
  };

  // Logout clears everything
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('profile');
    setToken(null);
    setRole(null);
    setProfile(null);
  };

  // Fetch profile after login
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;

      try {
        const res = await API.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fixedProfile = fixProfilePhotoUrl(res.data);

        setProfile(fixedProfile);
        localStorage.setItem('profile', JSON.stringify(fixedProfile));

      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    loadProfile();
  }, [token]);

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
