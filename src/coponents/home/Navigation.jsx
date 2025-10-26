import React, { useState, useRef, useEffect } from "react";
import { Menu, X, GraduationCap, User, LogOut, Settings, LogIn, UserPlus } from "lucide-react";
import "./Navigation.css";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

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
    { name: "Logout", href: "/logout", icon: LogOut },
  ];

  const authMenuItems = [
    { name: "Login", href: "/login", icon: LogIn },
    { name: "Register", href: "/register", icon: UserPlus },
  ];

  // Mock authentication state - change this based on your auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleAuthAction = (action) => {
    if (action === "login") {
      // Handle login logic
      console.log("Login clicked");
      setIsAuthenticated(true);
    } else if (action === "register") {
      // Handle register logic
      console.log("Register clicked");
    } else if (action === "logout") {
      // Handle logout logic
      console.log("Logout clicked");
      setIsAuthenticated(false);
    }
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="mhs-header">
      <nav className="mhs-navigation">
        <div className="mhs-nav-container">
          {/* Brand Section */}
          <div className="mhs-brand-section">
            <div className="mhs-brand">
              <GraduationCap className="mhs-brand-icon" />
              <span className="mhs-brand-title">Malindi High School</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="mhs-desktop-nav">
            <ul className="mhs-nav-list">
              {navigationLinks.map((link) => (
                <li key={link.name} className="mhs-nav-item">
                  <a
                    href={link.href}
                    className="mhs-nav-link"
                    onClick={handleLinkClick}
                  >
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
                  aria-label="Profile menu"
                  aria-expanded={isProfileDropdownOpen}
                >
                  <img 
                    src={isAuthenticated ? "/api/placeholder/40/40" : "/api/placeholder/40/40?text=GUEST"} 
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
                            src="/api/placeholder/50/50" 
                            alt="Profile" 
                            className="mhs-dropdown-profile-image"
                          />
                          <div className="mhs-dropdown-user-info">
                            <span className="mhs-dropdown-user-name">John Student</span>
                            <span className="mhs-dropdown-user-email">john@malindihigh.sc.ke</span>
                          </div>
                        </div>
                        <div className="mhs-dropdown-divider"></div>
                        {profileMenuItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              className="mhs-dropdown-item"
                              onClick={() => handleLinkClick()}
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
                        {authMenuItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              className="mhs-dropdown-item"
                              onClick={() => handleAuthAction(item.name.toLowerCase())}
                            >
                              <IconComponent className="mhs-dropdown-icon" size={18} />
                              <span>{item.name}</span>
                            </a>
                          );
                        })}
                      </>
                    )}
                  </div>
                )}
              </div>

              <button 
                className="mhs-login-btn mhs-btn-primary"
                onClick={() => handleAuthAction("login")}
              >
                {isAuthenticated ? "Dashboard" : "Login"}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mhs-menu-toggle"
            onClick={handleMenuToggle}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="mhs-menu-icon" />
            ) : (
              <Menu className="mhs-menu-icon" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Sidebar */}
        <div 
          className={`mhs-mobile-sidebar ${isMenuOpen ? "mhs-mobile-sidebar--open" : ""}`}
          onClick={handleBackdropClick}
        >
          <div className="mhs-sidebar-content">
            {/* Profile Section */}
            <div className="mhs-sidebar-profile">
              <div className="mhs-profile-header">
                <img 
                  src={isAuthenticated ? "/api/placeholder/60/60" : "/api/placeholder/60/60?text=GUEST"} 
                  alt="Profile" 
                  className="mhs-profile-image-large"
                />
                <div className="mhs-profile-info">
                  <h3 className="mhs-profile-name">
                    {isAuthenticated ? "John Student" : "Welcome Guest"}
                  </h3>
                  <p className="mhs-profile-email">
                    {isAuthenticated ? "john@malindihigh.sc.ke" : "Please login to continue"}
                  </p>
                  {isAuthenticated && (
                    <span className="mhs-profile-badge">Grade 11</span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mhs-sidebar-nav">
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
            </div>

            {/* Profile Menu Items */}
            <div className="mhs-sidebar-footer">
              <ul className="mhs-sidebar-nav-list">
                {isAuthenticated ? (
                  <>
                    {profileMenuItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <li key={item.name} className="mhs-sidebar-nav-item">
                          <a
                            href={item.href}
                            className="mhs-sidebar-nav-link"
                            onClick={handleLinkClick}
                          >
                            <IconComponent className="mhs-nav-icon" size={20} />
                            <span className="mhs-nav-text">{item.name}</span>
                          </a>
                        </li>
                      );
                    })}
                    <li key="logout" className="mhs-sidebar-nav-item">
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
                        <a
                          href={item.href}
                          className="mhs-sidebar-nav-link"
                          onClick={() => handleAuthAction(item.name.toLowerCase())}
                        >
                          <IconComponent className="mhs-nav-icon" size={20} />
                          <span className="mhs-nav-text">{item.name}</span>
                        </a>
                      </li>
                    );
                  })
                )}
              </ul>

              {/* Login Button for Mobile */}
              <div className="mhs-sidebar-actions">
                <button 
                  className="mhs-login-btn mhs-btn-primary mhs-btn-full"
                  onClick={() => handleAuthAction(isAuthenticated ? "dashboard" : "login")}
                >
                  {isAuthenticated ? "Dashboard" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;