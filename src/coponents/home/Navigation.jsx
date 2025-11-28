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

  // ---- BUILD FULL URL FROM FILENAME ----
  const getProfilePhotoUrl = (filename) => {
    // Correct full default image URL
    const defaultUrl = `${API.defaults.baseURL}static/uploads/profile_photos/default-avatar.png`;

    // If no filename, use default image
    if (!filename) return defaultUrl;

    // If already full URL, use it
    if (filename.startsWith("http://") || filename.startsWith("https://")) {
      return filename;
    }

    // Build full path for uploaded images
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
                <button
                  className="mhs-profile-trigger"
                  onClick={handleProfileClick}
                >
                  <img
                    src={
                      isAuthenticated
                        ? getProfilePhotoUrl(profile?.profile_photo)
                        : "/api/placeholder/40/40?text=GUEST"
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
                            {/* <span className="mhs-dropdown-user-role">{role}</span> */}
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
                              <a
                                key={item.name}
                                href={item.href}
                                className="mhs-dropdown-item"
                              >
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
              <a
                className="mhs-login-btn mhs-btn-primary"
                href={getDashboardUrl()}
              >
                {isAuthenticated ? "Dashboard" : "Login"}
              </a>
            </div>
          </div>

          <button className="mhs-menu-toggle" onClick={handleMenuToggle}>
            {isMenuOpen ? <X className="mhs-menu-icon" /> : <Menu className="mhs-menu-icon" />}
          </button>
        </div>

        {/* MOBILE NAV */}
        <div
          className={`mhs-mobile-sidebar ${isMenuOpen ? "mhs-mobile-sidebar--open" : ""}`}
          onClick={(e) => e.target === e.currentTarget && setIsMenuOpen(false)}
        >
          <div className="mhs-sidebar-content">

            {/* Profile */}
            <div className="mhs-sidebar-profile">
              <div className="mhs-profile-header">
                <img
                  src={
                    isAuthenticated
                      ? getProfilePhotoUrl(profile?.profile_photo)
                      : "/api/placeholder/60/60?text=GUEST"
                  }
                  className="mhs-profile-image-large"
                  alt="Profile"
                />
                <div className="mhs-profile-info">
                  <h3 className="mhs-profile-name">
                    {isAuthenticated ? profile?.username : "Welcome Guest"}
                  </h3>
                  <p className="mhs-profile-email">
                    {isAuthenticated ? profile?.email : "Please login to continue"}
                  </p>
                  {/* {isAuthenticated && (
                    <p className="mhs-profile-role">
                      Role: {role}
                    </p>
                  )} */}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <ul className="mhs-sidebar-nav-list">
              {navigationLinks.map((link) => (
                <li key={link.name} className="mhs-sidebar-nav-item">
                  <a
                    href={link.href}
                    className="mhs-sidebar-nav-link"
                    onClick={handleLinkClick}
                  >
                    <span className="mhs-nav-icon">{link.icon}</span>
                    <span className="mhs-nav-text">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mhs-sidebar-footer">
              <ul className="mhs-sidebar-nav-list">
                {isAuthenticated ? (
                  <>
                    {profileMenuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={item.name} className="mhs-sidebar-nav-item">
                          <a href={item.href} className="mhs-sidebar-nav-link">
                            <IconComponent className="mhs-nav-icon" size={20} />
                            <span className="mhs-nav-text">{item.name}</span>
                          </a>
                        </li>
                      );
                    })}

                    <li className="mhs-sidebar-nav-item">
                      <button
                        className="mhs-sidebar-nav-link mhs-sidebar-nav-button"
                        onClick={() => handleAuthAction("logout")}
                      >
                        <LogOut className="mhs-nav-icon" size={20} />
                        <span className="mhs-nav-text">Logout</span>
                      </button>
                    </li>
                  </>
                ) : (
                  authMenuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <li key={item.name} className="mhs-sidebar-nav-item">
                        <a href={item.href} className="mhs-sidebar-nav-link">
                          <IconComponent className="mhs-nav-icon" size={20} />
                          <span className="mhs-nav-text">{item.name}</span>
                        </a>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="mhs-sidebar-actions">
                <a
                  className="mhs-login-btn mhs-btn-primary dash"
                  href={getDashboardUrl()}
                >
                  {isAuthenticated ? "Dashboard" : "Login"}
                </a>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;