import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Menu, X, GraduationCap, User, LogOut, Settings, LogIn, UserPlus,
  Home, Info, BookOpen, Target, Church, School, Phone, ChevronDown,
  Shield, Users, Bookmark, Award, Calendar, ChevronRight, ChevronUp
} from "lucide-react";
import { AuthContext } from "../Authentication/AuthContext";
import { ThemeContext } from "../Authentication/ThemeContext";
import "./Navigation.css";
import API from "../Authentication/api";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const profileDropdownRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const mobileNavRef = useRef(null);
  const navRef = useRef(null);

  const { isAuthenticated, profile, logout, role } = useContext(AuthContext);
  const { theme, isDark } = useContext(ThemeContext);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsMobileProfileOpen(false);
    }
  }, [isMenuOpen]);

  // ---- Profile Photo URL ----
  const getProfilePhotoUrl = (filename) => {
    const defaultUrl = `${API.defaults.baseURL}static/uploads/profile_photos/default-avatar.png`;
    if (!filename) return defaultUrl;
    if (filename.startsWith("http://") || filename.startsWith("https://")) return filename;
    return `${API.defaults.baseURL}static/uploads/profile_photos/${filename}`;
  };

  // ---- Dashboard URL based on role ----
  const getDashboardUrl = () => {
    if (!isAuthenticated) return "/login";
    switch (role) {
      case "admin": return "/admin-dashboard";
      case "teacher": return "/teacher-dashboard";
      case "student": return "/student-dashboard";
      default: return "/dashboard";
    }
  };

  const navigationLinks = [
    { name: "Home", href: "/", icon: Home, badge: null },
    { name: "About", href: "/about", icon: Info, badge: null },
    { name: "Academics", href: "/academics", icon: BookOpen, dropdown: [
        { name: "Curriculum", href: "/academics/curriculum", icon: Bookmark },
        { name: "Departments", href: "/academics/departments", icon: Users },
        { name: "Examinations", href: "/academics/exams", icon: Award }
      ] 
    },
    { name: "Student Life", href: "/student-life", icon: Target, dropdown: [
        { name: "Clubs & Societies", href: "/student-life/clubs", icon: Users },
        { name: "Sports", href: "/student-life/sports", icon: Target },
        { name: "Events", href: "/student-life/events", icon: Calendar }
      ] 
    },
    { name: "Chaplaincy", href: "/chaplaincy", icon: Church },
    { name: "Classroom", href: "/classroom", icon: School, badge: null },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const profileMenuItems = [
    { name: "My Profile", href: "/profile", icon: User, description: "View and edit your profile" },
    { name: "Account Settings", href: "/settings", icon: Settings, description: "Manage your preferences" },
    { name: "Privacy & Security", href: "/privacy", icon: Shield, description: "Control your privacy" },
  ];

  const authMenuItems = [
    { name: "Sign In", href: "/login", icon: LogIn, description: "Access your account" },
    { name: "Create Account", href: "/register", icon: UserPlus, description: "Join our community" },
  ];

  const handleLinkClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setIsMobileProfileOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setActiveDropdown(null);
  };

  const handleMobileProfileClick = () => {
    setIsMobileProfileOpen(!isMobileProfileOpen);
  };

  const handleDropdownToggle = (linkName) => {
    setActiveDropdown(activeDropdown === linkName ? null : linkName);
  };

  const handleAuthAction = (action) => {
    if (action === "logout") logout();
    setIsProfileDropdownOpen(false);
    setIsMobileProfileOpen(false);
    setActiveDropdown(null);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (isMobileProfileOpen && mobileProfileRef.current && !mobileProfileRef.current.contains(event.target)) {
        const isProfileTrigger = event.target.closest('.mhs-mobile-profile-trigger');
        if (!isProfileTrigger) setIsMobileProfileOpen(false);
      }
      if (!event.target.closest('.mhs-nav-item')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileProfileOpen]);

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#ef4444';
      case 'teacher': return '#3b82f6';
      case 'student': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="mhs-scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <header className="mhs-header" ref={navRef}>
        <nav className="mhs-navigation">
          <div className="mhs-nav-container">

            {/* Brand */}
            <div className="mhs-brand-section">
              <div className="mhs-brand">
                <div className="mhs-brand-icon-wrapper">
                  <GraduationCap className="mhs-brand-icon" />
                  <div className="mhs-brand-glow"></div>
                </div>
                <div className="mhs-brand-text">
                  <span className="mhs-brand-title">Malindi High School</span>
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="mhs-desktop-nav">
              <ul className="mhs-nav-list">
                {navigationLinks.map((link) => (
                  <li 
                    key={link.name} 
                    className={`mhs-nav-item ${activeDropdown === link.name ? 'mhs-nav-item--active' : ''}`}
                    onMouseEnter={() => link.dropdown && handleDropdownToggle(link.name)}
                    onMouseLeave={() => link.dropdown && setTimeout(() => setActiveDropdown(null), 200)}
                  >
                    <a 
                      href={link.href} 
                      className="mhs-nav-link"
                      onClick={handleLinkClick}
                    >
                      <link.icon className="mhs-nav-link-icon" size={18} />
                      <span>{link.name}</span>
                      {link.badge && <span className="mhs-nav-badge">{link.badge}</span>}
                      {link.dropdown && <ChevronDown className="mhs-nav-chevron" size={16} />}
                    </a>

                    {link.dropdown && activeDropdown === link.name && (
                      <div className="mhs-nav-dropdown">
                        <div className="mhs-dropdown-content">
                          {link.dropdown.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                className="mhs-dropdown-item"
                                onClick={handleLinkClick}
                              >
                                <div className="mhs-dropdown-icon-wrapper">
                                  <IconComponent className="mhs-dropdown-icon" size={18} />
                                </div>
                                <div className="mhs-dropdown-text">
                                  <span className="mhs-dropdown-title">{item.name}</span>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>

              {/* Profile + Dashboard */}
              <div className="mhs-action-buttons">
                {/* Desktop Profile Dropdown */}
                <div className="mhs-profile-dropdown" ref={profileDropdownRef}>
                  <button className="mhs-profile-trigger" onClick={handleProfileClick}>
                    <div className="mhs-profile-avatar">
                      <img
                        src={isAuthenticated ? getProfilePhotoUrl(profile?.profile_photo) : "/api/placeholder/40/40?text=GUEST"}
                        alt="Profile"
                        className="mhs-profile-image"
                      />
                      <div className="mhs-profile-status"></div>
                    </div>
                  </button>
                  {isProfileDropdownOpen && (
                    <div className="mhs-profile-menu">
                      {isAuthenticated ? (
                        <>
                          <div className="mhs-profile-header">
                            <div className="mhs-profile-avatar-large">
                              <img
                                src={getProfilePhotoUrl(profile?.profile_photo)}
                                alt="Profile"
                                className="mhs-profile-image-large"
                              />
                              <div 
                                className="mhs-profile-status-large"
                                style={{ backgroundColor: getRoleColor(role) }}
                              ></div>
                            </div>
                            <div className="mhs-profile-info">
                              <h3 className="mhs-profile-name">{profile?.username}</h3>
                              <p className="mhs-profile-email">{profile?.email}</p>
                              <div className="mhs-profile-meta">
                                <span 
                                  className="mhs-profile-role"
                                  style={{ backgroundColor: getRoleColor(role), color: 'white' }}
                                >
                                  {role?.toUpperCase()}
                                </span>
                                <span className="mhs-profile-status-text">Online</span>
                              </div>
                            </div>
                          </div>
                          <div className="mhs-menu-divider"></div>
                          <div className="mhs-menu-items">
                            {profileMenuItems.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="mhs-menu-item"
                                  onClick={handleLinkClick}
                                >
                                  <div className="mhs-menu-icon-wrapper">
                                    <IconComponent className="mhs-menu-icon" size={18} />
                                  </div>
                                  <div className="mhs-menu-text">
                                    <span className="mhs-menu-title">{item.name}</span>
                                    <span className="mhs-menu-description">{item.description}</span>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                          <div className="mhs-menu-divider"></div>
                          <button
                            className="mhs-menu-item mhs-menu-item--logout"
                            onClick={() => handleAuthAction("logout")}
                          >
                            <div className="mhs-menu-icon-wrapper">
                              <LogOut className="mhs-menu-icon" size={18} />
                            </div>
                            <div className="mhs-menu-text">
                              <span className="mhs-menu-title">Sign Out</span>
                              <span className="mhs-menu-description">Secure logout</span>
                            </div>
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="mhs-profile-header">
                            <div className="mhs-profile-avatar-large">
                              <User className="mhs-guest-icon" size={32} />
                            </div>
                            <div className="mhs-profile-info">
                              <h3 className="mhs-profile-name">Welcome Guest</h3>
                              <p className="mhs-profile-email">Sign in to access your account</p>
                            </div>
                          </div>
                          <div className="mhs-menu-divider"></div>
                          <div className="mhs-menu-items">
                            {authMenuItems.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="mhs-menu-item"
                                  onClick={handleLinkClick}
                                >
                                  <div className="mhs-menu-icon-wrapper">
                                    <IconComponent className="mhs-menu-icon" size={18} />
                                  </div>
                                  <div className="mhs-menu-text">
                                    <span className="mhs-menu-title">{item.name}</span>
                                    <span className="mhs-menu-description">{item.description}</span>
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <a
                  className="mhs-dashboard-btn"
                  href={getDashboardUrl()}
                  onClick={handleLinkClick}
                >
                  <span className="mhs-btn-text">{isAuthenticated ? "Dashboard" : "Get Started"}</span>
                  <div className="mhs-btn-glow"></div>
                </a>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className={`mhs-menu-toggle ${isMenuOpen ? 'mhs-menu-toggle--active' : ''}`}
              onClick={handleMenuToggle}
            >
              <div className="mhs-menu-toggle-inner">
                <div className="mhs-menu-toggle-line"></div>
                <div className="mhs-menu-toggle-line"></div>
                <div className="mhs-menu-toggle-line"></div>
              </div>
            </button>
          </div>

          {/* MOBILE NAV */}
          <div
            className={`mhs-mobile-sidebar ${isMenuOpen ? "mhs-mobile-sidebar--open" : ""}`}
            onClick={(e) => e.target === e.currentTarget && setIsMenuOpen(false)}
          >
            <div className="mhs-sidebar-content">

              {/* Mobile Profile Card */}
              <div className="mhs-mobile-profile-card" ref={mobileProfileRef}>
                <button 
                  className="mhs-mobile-profile-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMobileProfileClick();
                  }}
                >
                  <div className="mhs-mobile-profile-header">
                    <div className="mhs-mobile-avatar">
                      <img
                        src={isAuthenticated ? getProfilePhotoUrl(profile?.profile_photo) : "/api/placeholder/60/60?text=GUEST"}
                        className="mhs-mobile-profile-image"
                        alt="Profile"
                      />
                      <div style={{ backgroundColor: getRoleColor(role) }} className="mhs-mobile-status"></div>
                    </div>
                    <div className="mhs-mobile-profile-info">
                      <h3 className="mhs-mobile-profile-name">
                        {isAuthenticated ? profile?.username : "Welcome Guest"}
                      </h3>
                      <p className="mhs-mobile-profile-email">
                        {isAuthenticated ? profile?.email : "Tap to sign in"}
                      </p>
                      {isAuthenticated && <span className="mhs-mobile-role-badge" style={{ backgroundColor: getRoleColor(role) }}>{role}</span>}
                    </div>
                    <div className="mhs-mobile-profile-arrow">
                      {isMobileProfileOpen ? <ChevronUp className="mhs-profile-arrow-icon" size={20}/> : <ChevronDown className="mhs-profile-arrow-icon" size={20}/>}
                    </div>
                  </div>
                </button>

                {/* Mobile Profile Dropdown - FIXED: Now displays inline */}
                {isMobileProfileOpen && (
                  <div className="mhs-mobile-profile-dropdown">
                    <div className="mhs-mobile-profile-menu">
                      {isAuthenticated ? (
                        <>
                          <div className="mhs-mobile-menu-section">
                            <h4 className="mhs-mobile-menu-title">Account</h4>
                            <div className="mhs-mobile-menu-items">
                              {profileMenuItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="mhs-mobile-menu-item"
                                    onClick={handleLinkClick}
                                  >
                                    <div className="mhs-mobile-menu-icon">
                                      <IconComponent size={20} />
                                    </div>
                                    <span className="mhs-mobile-menu-text">{item.name}</span>
                                    <ChevronRight className="mhs-mobile-menu-arrow" size={16} />
                                  </a>
                                );
                              })}
                            </div>
                          </div>

                          <div className="mhs-mobile-menu-divider"></div>

                          <div className="mhs-mobile-menu-section">
                            <div className="mhs-mobile-menu-items">
                              <button
                                className="mhs-mobile-menu-item mhs-mobile-menu-item--logout"
                                onClick={() => handleAuthAction("logout")}
                              >
                                <div className="mhs-mobile-menu-icon">
                                  <LogOut size={20} />
                                </div>
                                <span className="mhs-mobile-menu-text">Sign Out</span>
                                <ChevronRight className="mhs-mobile-menu-arrow" size={16} />
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="mhs-mobile-menu-section">
                          <h4 className="mhs-mobile-menu-title">Get Started</h4>
                          <div className="mhs-mobile-menu-items">
                            {authMenuItems.map((item) => {
                              const IconComponent = item.icon;
                              return (
                                <a
                                  key={item.name}
                                  href={item.href}
                                  className="mhs-mobile-menu-item"
                                  onClick={handleLinkClick}
                                >
                                  <div className="mhs-mobile-menu-icon">
                                    <IconComponent size={20} />
                                  </div>
                                  <span className="mhs-mobile-menu-text">{item.name}</span>
                                  <ChevronRight className="mhs-mobile-menu-arrow" size={16} />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Navigation */}
              <div className="mhs-mobile-nav-scrollable" ref={mobileNavRef}>
                <nav className="mhs-mobile-nav">
                  <ul className="mhs-mobile-nav-list">
                    {navigationLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <li key={link.name} className="mhs-mobile-nav-item">
                          <a
                            href={link.href}
                            className="mhs-mobile-nav-link"
                            onClick={handleLinkClick}
                          >
                            <div className="mhs-mobile-nav-icon-wrapper">
                              <IconComponent className="mhs-mobile-nav-icon" size={20} />
                              {link.badge && <span className="mhs-mobile-nav-badge">{link.badge}</span>}
                            </div>
                            <span className="mhs-mobile-nav-text">{link.name}</span>
                            <ChevronRight className="mhs-mobile-nav-chevron" size={16} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mhs-mobile-dashboard-section">
                    <a
                      className="mhs-mobile-dashboard-btn"
                      href={getDashboardUrl()}
                      onClick={handleLinkClick}
                    >
                      <span className="mhs-mobile-dashboard-text">{isAuthenticated ? "Go to Dashboard" : "Get Started Free"}</span>
                      <div className="mhs-mobile-btn-glow"></div>
                    </a>
                  </div>
                </nav>
              </div>

            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navigation;