import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import API from "../Authentication/api";
import "./Profile.css";

const Profile = () => {
  const { profile, setProfile, token, role } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  const [formData, setFormData] = useState({
    username: profile?.username || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    gender: profile?.gender || "",
    bio: profile?.bio || "",
    location: profile?.location || ""
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load user preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem("userTheme") || "light";
    const savedLanguage = localStorage.getItem("userLanguage") || "en";
    const savedNotifications = JSON.parse(localStorage.getItem("userNotifications")) || notifications;
    
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    setNotifications(savedNotifications);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const getProfilePhotoUrl = (filename) => {
    const defaultUrl = `${API.defaults.baseURL}static/uploads/profile_photos/default-avatar.png`;
    if (!filename) return defaultUrl;
    if (filename.startsWith("http://") || filename.startsWith("https://")) {
      return filename;
    }
    return `${API.defaults.baseURL}static/uploads/profile_photos/${filename}`;
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const form = new FormData();
    form.append("profile_photo", file);

    try {
      const res = await API.put("auth/update-profile-photo/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updated = { ...profile, profile_photo: res.data.profile_photo };
      localStorage.setItem("profile", JSON.stringify(updated));
      setProfile(updated);
      alert("Profile photo updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await API.put("auth/update-profile/", formData);
      const updated = { ...profile, ...formData };

      localStorage.setItem("profile", JSON.stringify(updated));
      setProfile(updated);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      alert("New passwords do not match.");
      return;
    }

    if (passwordData.new_password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      await API.put("auth/change-password/", passwordData);
      alert("Password changed successfully!");
      setPasswordData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      alert("Password change failed.");
    }
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("userTheme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("userLanguage", newLanguage);
  };

  const handleNotificationToggle = (type) => {
    const updatedNotifications = {
      ...notifications,
      [type]: !notifications[type]
    };
    setNotifications(updatedNotifications);
    localStorage.setItem("userNotifications", JSON.stringify(updatedNotifications));
  };

  const exportData = () => {
    const data = {
      profile: profile,
      preferences: {
        theme,
        language,
        notifications
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile-data-${profile?.username}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion requested.");
    }
  };

  const MobileMenuButton = () => (
    <button 
      className="profile-mobile-menu-btn"
      onClick={() => setShowMobileMenu(!showMobileMenu)}
    >
      ☰
    </button>
  );

  const TabNavigation = () => (
    <nav className="profile-sidebar-nav">
      <button 
        className={`profile-nav-item ${activeTab === "profile" ? "profile-nav-active" : ""}`}
        onClick={() => {
          setActiveTab("profile");
          setShowMobileMenu(false);
        }}
      >
        <span className="profile-nav-icon">📝</span>
        <span className="profile-nav-text">Personal Info</span>
      </button>
      <button 
        className={`profile-nav-item ${activeTab === "preferences" ? "profile-nav-active" : ""}`}
        onClick={() => {
          setActiveTab("preferences");
          setShowMobileMenu(false);
        }}
      >
        <span className="profile-nav-icon">⚙️</span>
        <span className="profile-nav-text">Preferences</span>
      </button>
      <button 
        className={`profile-nav-item ${activeTab === "security" ? "profile-nav-active" : ""}`}
        onClick={() => {
          setActiveTab("security");
          setShowMobileMenu(false);
        }}
      >
        <span className="profile-nav-icon">🔒</span>
        <span className="profile-nav-text">Security</span>
      </button>
      <button 
        className={`profile-nav-item ${activeTab === "danger" ? "profile-nav-active" : ""}`}
        onClick={() => {
          setActiveTab("danger");
          setShowMobileMenu(false);
        }}
      >
        <span className="profile-nav-icon">🚨</span>
        <span className="profile-nav-text">Danger Zone</span>
      </button>
    </nav>
  );

  return (
    <div className="profile-container">
      {/* MOBILE HEADER */}
      {isMobile && (
        <div className="profile-mobile-header">
          <div className="profile-mobile-header-content">
            <MobileMenuButton />
            <div className="profile-mobile-title">
              <h1>Profile</h1>
              <span className="profile-mobile-role">{role}</span>
            </div>
            <img
              src={getProfilePhotoUrl(profile?.profile_photo)}
              alt="Profile"
              className="profile-mobile-avatar"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>
        </div>
      )}

      {/* SIDEBAR - Fixed click handling */}
      <div 
        className={`profile-sidebar ${isMobile ? 'profile-sidebar-mobile' : ''} ${showMobileMenu ? 'profile-sidebar-mobile-open' : ''}`}
        onClick={(e) => {
          // Only close if clicking the backdrop (the sidebar itself in mobile mode)
          if (isMobile && e.target === e.currentTarget) {
            setShowMobileMenu(false);
          }
        }}
      >
        {/* Mobile Overlay */}
        {isMobile && showMobileMenu && (
          <div 
            className="profile-mobile-overlay"
            onClick={() => setShowMobileMenu(false)}
          />
        )}
        
        <div className="profile-sidebar-content" onClick={(e) => isMobile && e.stopPropagation()}>
          <div className="profile-sidebar-header">
            <img
              src={getProfilePhotoUrl(profile?.profile_photo)}
              alt="Profile"
              className="profile-sidebar-photo"
            />
            <div className="profile-sidebar-user-info">
              <h3>{profile?.username}</h3>
              <span className="profile-role-badge">{role}</span>
              <p>{profile?.email}</p>
            </div>
            {isMobile && (
              <button 
                className="profile-close-mobile-menu"
                onClick={() => setShowMobileMenu(false)}
              >
                ✕
              </button>
            )}
          </div>

          <TabNavigation />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="profile-content">
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <>
            {!isMobile && (
              <div className="profile-content-header">
                <div className="profile-header-left">
                  <h1>Profile Information</h1>
                  <p>Manage your personal information and how others see you</p>
                </div>
                <button 
                  className={`profile-btn-edit ${isEditing ? "profile-btn-editing" : ""}`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "✕ Cancel" : "✏️ Edit Profile"}
                </button>
              </div>
            )}

            {isMobile && (
              <div className="profile-mobile-content-header">
                <h2>Personal Info</h2>
                <button 
                  className={`profile-btn-edit profile-btn-edit-mobile ${isEditing ? "profile-btn-editing" : ""}`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>
            )}

            <div className="profile-section">
              <div className="profile-photo-section">
                <div className="profile-photo-container">
                  <img
                    src={getProfilePhotoUrl(profile?.profile_photo)}
                    alt="Profile"
                    className="profile-main-photo"
                  />
                  <label className="profile-photo-upload-btn">
                    <span className="profile-btn-icon">📷</span>
                    <span className="profile-btn-text">Change Photo</span>
                    <input type="file" hidden onChange={handlePhotoUpload} accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="profile-form-grid">
                <div className="profile-form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    title="Email cannot be changed"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Your phone number"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={!isEditing}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div className="profile-form-group profile-form-full-width">
                  <label>Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tell us a bit about yourself..."
                    rows="3"
                  />
                </div>

                <div className="profile-form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Your city or country"
                  />
                </div>
              </div>

              {isEditing && (
                <button className="profile-btn-save profile-btn-full-width-mobile" onClick={handleProfileUpdate}>
                  <span className="profile-btn-icon">💾</span>
                  Save Changes
                </button>
              )}
            </div>

            {/* ROLE-BASED INFORMATION */}
            <div className="profile-section">
              <h3>Role Information</h3>
              {role === "student" && (
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <label>Class</label>
                    <span>{profile?.class_name || "N/A"}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Admission Number</label>
                    <span>{profile?.admission_number || "N/A"}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Academic Year</label>
                    <span>{profile?.academic_year || "N/A"}</span>
                  </div>
                </div>
              )}

              {role === "teacher" && (
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <label>Department</label>
                    <span>{profile?.department || "N/A"}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Subjects</label>
                    <span>{profile?.subjects || "N/A"}</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Employee ID</label>
                    <span>{profile?.employee_id || "N/A"}</span>
                  </div>
                </div>
              )}

              {role === "admin" && (
                <div className="profile-info-grid">
                  <div className="profile-info-item">
                    <label>Access Level</label>
                    <span className="profile-badge-admin">Full System Access</span>
                  </div>
                  <div className="profile-info-item">
                    <label>Admin Since</label>
                    <span>{profile?.admin_since || "N/A"}</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === "preferences" && (
          <>
            <div className="profile-content-header">
              <div className="profile-header-left">
                <h1>Preferences</h1>
                <p>Customize your experience</p>
              </div>
            </div>

            <div className="profile-section">
              <h3>Theme Settings</h3>
              <div className="profile-theme-selector">
                <div 
                  className={`profile-theme-option ${theme === "light" ? "profile-theme-active" : ""}`}
                  onClick={() => handleThemeChange("light")}
                >
                  <div className="profile-theme-preview profile-theme-light"></div>
                  <span>Light</span>
                </div>
                <div 
                  className={`profile-theme-option ${theme === "dark" ? "profile-theme-active" : ""}`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <div className="profile-theme-preview profile-theme-dark"></div>
                  <span>Dark</span>
                </div>
                <div 
                  className={`profile-theme-option ${theme === "auto" ? "profile-theme-active" : ""}`}
                  onClick={() => handleThemeChange("auto")}
                >
                  <div className="profile-theme-preview profile-theme-auto"></div>
                  <span>Auto</span>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Language & Region</h3>
              <div className="profile-form-group">
                <label>Language</label>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>

            <div className="profile-section">
              <h3>Notification Preferences</h3>
              <div className="profile-notification-settings">
                <div className="profile-notification-item">
                  <div className="profile-notification-info">
                    <strong>Email Notifications</strong>
                    <p>Receive updates via email</p>
                  </div>
                  <label className="profile-toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.email}
                      onChange={() => handleNotificationToggle("email")}
                    />
                    <span className="profile-toggle-slider"></span>
                  </label>
                </div>

                <div className="profile-notification-item">
                  <div className="profile-notification-info">
                    <strong>Push Notifications</strong>
                    <p>Get browser notifications</p>
                  </div>
                  <label className="profile-toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.push}
                      onChange={() => handleNotificationToggle("push")}
                    />
                    <span className="profile-toggle-slider"></span>
                  </label>
                </div>

                <div className="profile-notification-item">
                  <div className="profile-notification-info">
                    <strong>SMS Notifications</strong>
                    <p>Text message updates</p>
                  </div>
                  <label className="profile-toggle-switch">
                    <input
                      type="checkbox"
                      checked={notifications.sms}
                      onChange={() => handleNotificationToggle("sms")}
                    />
                    <span className="profile-toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <>
            <div className="profile-content-header">
              <h1>Security Settings</h1>
              <p>Manage your password and security preferences</p>
            </div>

            <div className="profile-section">
              <h3>Change Password</h3>
              <div className="profile-form-grid">
                <div className="profile-form-group profile-form-full-width-mobile">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordData.current_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        current_password: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                  />
                </div>

                <div className="profile-form-group profile-form-full-width-mobile">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordData.new_password}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, new_password: e.target.value })
                    }
                    placeholder="Enter new password"
                  />
                </div>

                <div className="profile-form-group profile-form-full-width-mobile">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirm_password}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirm_password: e.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <button className="profile-btn-save profile-btn-full-width-mobile" onClick={handlePasswordChange}>
                <span className="profile-btn-icon">🔒</span>
                Change Password
              </button>
            </div>

            <div className="profile-section">
              <h3>Session Management</h3>
              <p>You're currently logged in on this device.</p>
              <button className="profile-btn-secondary profile-btn-full-width-mobile" onClick={() => alert("This would log out all other sessions")}>
                <span className="profile-btn-icon">🚪</span>
                Log Out Other Sessions
              </button>
            </div>
          </>
        )}

        {/* DANGER ZONE TAB */}
        {activeTab === "danger" && (
          <>
            <div className="profile-content-header">
              <h1>Danger Zone</h1>
              <p>Irreversible actions - proceed with caution</p>
            </div>

            <div className="profile-section profile-danger-zone">
              <div className="profile-danger-item">
                <div className="profile-danger-info">
                  <h4>Export Your Data</h4>
                  <p>Download all your personal data in JSON format</p>
                </div>
                <button className="profile-btn-warning profile-btn-full-width-mobile" onClick={exportData}>
                  <span className="profile-btn-icon">📥</span>
                  Export Data
                </button>
              </div>

              <div className="profile-danger-item">
                <div className="profile-danger-info">
                  <h4>Delete Account</h4>
                  <p>Permanently delete your account and all associated data</p>
                </div>
                <button className="profile-btn-danger profile-btn-full-width-mobile" onClick={deleteAccount}>
                  <span className="profile-btn-icon">🗑️</span>
                  Delete Account
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;