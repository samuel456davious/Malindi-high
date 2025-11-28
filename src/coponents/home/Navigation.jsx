import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Menu, X, GraduationCap, User, LogOut, Settings, LogIn, UserPlus
} from "lucide-react";
import { AuthContext } from "../Authentication/AuthContext";
import "./Navigation.css";
import API from "../Authentication/api";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  const {
    isAuthenticated,
    profile,
    logout,
    role
  } = useContext(AuthContext);

  // ---- Build Full Image URL ----
  const getProfilePhotoUrl = (filename) => {
    const defaultUrl = `${API.defaults.baseURL}static/uploads/profile_photos/default-avatar.png`;

    if (!filename) return defaultUrl;

    if (filename.startsWith("http://") || filename.startsWith("https://")) {
      return filename;
    }

    return `${API.defaults.baseURL}static/uploads/profile_photos/${filename}`;
  };

  // ---- Determine Dashboard URL Based on Role ----
  const getDashboardUrl = () => {
    if (!isAuthenticated) return "/login";

    switch (role) {
      case "admin":
        return "/admin-dashboard";
      case "teacher":
        return "/teacher-dashboard";
      case "student":
        return "/student-dashboard";
      default:
        return "/dashboard";
    }
  };

  const navigationLinks = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "About", href: "/about", icon: "ℹ️" },
    { name: "Academics", href: "/academics", icon: "📚" },
    { name: "Student Life", href: "/student-life", icon: "🎯" },
    { name: "Chaplaincy", href: "/chaplaincy", icon: "⛪" },
    { name: "Classroom", href: "/classroom", icon: "🏫" },
    { name: "Contact", href: "/contact", icon: "📞" },
  ];

  const profileMenuItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const authMenuItems = [
    { name: "Login", href: "/login", icon: LogIn },
    { name: "Register", href: "/register", icon: UserPlus },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleProfileClick = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleAuthAction = (action) => {
    if (action === "logout") logout();
    setIsProfileDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="mhs-header">
      <nav className="mhs-navigation">
        <div className="mhs-nav-container">

          {/* Brand */}
          <div className="mhs-brand-section">
            <div className="mhs-brand">
              <GraduationCap className="mhs-brand-icon" />
              <span className="mhs-brand-title">Malindi High School</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="mhs-desktop-nav">
            <ul className="mhs-nav-list">
              {navigationLinks.map((link) => (
                <li key={link.name} className="mhs-nav-item">
                  <a href={link.href} className="mhs-nav-link" onClick={handleLinkClick}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mhs-action-buttons">

              {/* Profile Dropdown */}
              <div className="mhs-profile-dropdown" ref={profileDropdownRef}>
                <button className="mhs-profile-trigger" onClick={handleProfileClick}>
                  <img
                    src={
                      isAuthenticated
                        ? getProfilePhotoUrl(profile?.profile_photo)
                        : `${API.defaults.baseURL}static/uploads/profile_photos/default-avatar.png`
                    }
                    alt="Profile"
                    className="mhs-profile-image"
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="mhs-dropdown-menu">
                    {isAuthenticated ? (
                      <>
                        <div className="mhs-dropdown-header">
                          <img
                            src={getProfilePhotoUrl(profile?.profile_photo)}
                            alt="Profile"
                            className="mhs-dropdown-profile-image"
                          />
                          <div className="mhs-dropdown-user-info">
                            <span className="mhs-dropdown-user-name">{profile?.username}</span>
                            <span className="mhs-dropdown-user-email">{profile?.email}</span>
                          </div>
                        </div>

                        <div className="mhs-dropdown-divider"></div>

                        <div className="mhs-dropdown-items">
                          {profileMenuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                className="mhs-dropdown-item"
                                onClick={handleLinkClick}
                              >
                                <IconComponent className="mhs-dropdown-icon" size={18} />
                                <span>{item.name}</span>
                              </a>
                            );
                          })}

                          <div className="mhs-dropdown-divider"></div>

                          <button
                            className="mhs-dropdown-item mhs-dropdown-item--logout"
                            onClick={() => handleAuthAction("logout")}
                          >
                            <LogOut className="mhs-dropdown-icon" size={18} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mhs-dropdown-header">
                          <div className="mhs-dropdown-guest">
                            <User className="mhs-dropdown-guest-icon" size={24} />
                            <span>Welcome Guest</span>
                          </div>
                        </div>

                        <div className="mhs-dropdown-divider"></div>

                        <div className="mhs-dropdown-items">
                          {authMenuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <a key={item.name} href={item.href} className="mhs-dropdown-item">
                                <IconComponent className="mhs-dropdown-icon" size={18} />
                                <span>{item.name}</span>
                              </a>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Dashboard Button with Role Routing */}
              <a className="mhs-login-btn mhs-btn-primary" href={getDashboardUrl()}>
                {isAuthenticated ? "Dashboard" : "Login"}
              </a>

            </div>
          </div>

          <button className="mhs-menu-toggle" onClick={handleMenuToggle}>
            {isMenuOpen ? <X className="mhs-menu-icon" /> : <Menu className="mhs-menu-icon" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
