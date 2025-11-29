import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';
import API from './api';
import './Settings.css';

const Settings = () => {
  const { profile, setProfile, token, role } = useContext(AuthContext);
  const { theme: globalTheme, updateTheme } = useContext(ThemeContext); // ADDED: read theme + updater
  const [activeTab, setActiveTab] = useState('account');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const [settings, setSettings] = useState(() => ({
    // Account Settings
    username: profile?.username || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    gender: profile?.gender || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    // Security
    current_password: '',
    new_password: '',
    confirm_password: '',
    twoFactorEnabled: false,
    // Privacy Settings
    profileVisibility: 'public',
    showOnlineStatus: true,
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    // Appearance
    // Use globalTheme if available, otherwise fall back to saved local setting or 'light'
    theme: localStorage.getItem('userTheme') || globalTheme || 'light',
    language: localStorage.getItem('userLanguage') || 'en'
  }));

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

  // NOTE: theme is now handled by ThemeContext (global). Removed local effect that manipulated documentElement.
  // If global theme changes from elsewhere, keep local settings.theme in sync:
  useEffect(() => {
    if (!globalTheme) return;
    setSettings(prev => ({ ...prev, theme: localStorage.getItem('userTheme') || globalTheme }));
  }, [globalTheme]);

  const getProfilePhotoUrl = (filename) => {
    const defaultUrl = `${API.defaults.baseURL}static/uploads/profile_photos/default-avatar.png`;
    if (!filename) return defaultUrl;
    if (filename.startsWith('http://') || filename.startsWith('https://')) {
      return filename;
    }
    return `${API.defaults.baseURL}static/uploads/profile_photos/${filename}`;
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const form = new FormData();
    form.append('profile_photo', file);

    try {
      const res = await API.put('auth/update-profile-photo/', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const updated = { ...profile, profile_photo: res.data.profile_photo };
      localStorage.setItem('profile', JSON.stringify(updated));
      setProfile(updated);
      alert('Profile photo updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const profileData = {
        username: settings.username,
        phone: settings.phone,
        gender: settings.gender,
        bio: settings.bio,
        location: settings.location
      };

      const res = await API.put('auth/update-profile/', profileData);
      const updated = { ...profile, ...profileData };

      localStorage.setItem('profile', JSON.stringify(updated));
      setProfile(updated);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };

  const handlePasswordChange = async () => {
    if (settings.new_password !== settings.confirm_password) {
      alert('New passwords do not match.');
      return;
    }

    if (settings.new_password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      await API.put('auth/change-password/', {
        current_password: settings.current_password,
        new_password: settings.new_password,
        confirm_password: settings.confirm_password
      });
      alert('Password changed successfully!');
      setSettings(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }));
    } catch (err) {
      alert('Password change failed.');
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));

    // Save preferences to localStorage and update global theme if needed
    if (key === 'theme') {
      // Use ThemeContext to apply and persist theme globally
      try {
        updateTheme(value);
      } catch (e) {
        // fallback: write to localStorage if updateTheme fails for some reason
        localStorage.setItem('userTheme', value);
        document.documentElement.setAttribute('data-theme', value);
      }
    }
    if (key === 'language') {
      localStorage.setItem('userLanguage', value);
    }
  };

  const handleNotificationToggle = (type) => {
    // compute the key name and toggle reliably using functional update
    const key = `${type}Notifications`;
    setSettings(prev => {
      const updatedValue = !prev[key];
      const updated = {
        ...prev,
        [key]: updatedValue
      };

      // Save notification preferences
      const notifications = {
        email: updated.emailNotifications,
        push: updated.pushNotifications,
        sms: updated.smsNotifications
      };
      // ensure the just-toggled value is included
      notifications[type] = updatedValue;

      localStorage.setItem('userNotifications', JSON.stringify(notifications));
      return updated;
    });
  };

  const exportData = () => {
    const data = {
      profile: profile,
      preferences: {
        theme: settings.theme,
        language: settings.language,
        notifications: {
          email: settings.emailNotifications,
          push: settings.pushNotifications,
          sms: settings.smsNotifications
        }
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
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion requested.');
      // Implement actual deletion logic here
    }
  };

  const logoutOtherSessions = async () => {
    try {
      await API.post('auth/logout-other-sessions/');
      alert('All other sessions have been logged out.');
    } catch (err) {
      alert('Failed to log out other sessions.');
    }
  };

  const MobileMenuButton = () => (
    <button 
      className="settings-mobile-menu-btn"
      onClick={() => setShowMobileMenu(!showMobileMenu)}
    >
      ☰
    </button>
  );

  const TabNavigation = () => {
    const tabs = [
      { id: 'account', label: 'Account', icon: '👤' },
      { id: 'privacy', label: 'Privacy', icon: '🔒' },
      { id: 'notifications', label: 'Notifications', icon: '🔔' },
      { id: 'appearance', label: 'Appearance', icon: '🎨' },
      { id: 'security', label: 'Security', icon: '🛡️' },
      { id: 'danger', label: 'Danger Zone', icon: '🚨' }
    ];

    return (
      <nav className="settings-sidebar-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`settings-nav-item ${activeTab === tab.id ? 'settings-nav-active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id);
              if (isMobile) {
                setShowMobileMenu(false);
              }
            }}
          >
            <span className="settings-nav-icon">{tab.icon}</span>
            <span className="settings-nav-text">{tab.label}</span>
          </button>
        ))}
      </nav>
    );
  };

  const renderAccountSettings = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <h3 className="settings-section__title">Profile Information</h3>
        <p className="settings-section__subtitle">Manage your personal information</p>
      </div>
      
      <div className="settings-section__content">
        {/* Profile Photo Upload */}
        <div className="settings-photo-section">
          <div className="settings-photo-container">
            <img
              src={getProfilePhotoUrl(profile?.profile_photo)}
              alt="Profile"
              className="settings-main-photo"
            />
            <label className="settings-photo-upload-btn">
              <span className="settings-btn-icon">📷</span>
              <span className="settings-btn-text">Change Photo</span>
              <input type="file" hidden onChange={handlePhotoUpload} accept="image/*" />
            </label>
          </div>
        </div>

        <div className="settings-form-grid">
          <div className="settings-field">
            <label className="settings-field__label">Username</label>
            <input
              type="text"
              value={settings.username}
              onChange={(e) => handleSettingChange('username', e.target.value)}
              className="settings-field__input"
              placeholder="Enter your username"
            />
          </div>

          <div className="settings-field">
            <label className="settings-field__label">Email</label>
            <input
              type="email"
              value={settings.email}
              disabled
              className="settings-field__input settings-field__input--disabled"
              title="Email cannot be changed"
            />
          </div>

          <div className="settings-field">
            <label className="settings-field__label">Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleSettingChange('phone', e.target.value)}
              className="settings-field__input"
              placeholder="Your phone number"
            />
          </div>

          <div className="settings-field">
            <label className="settings-field__label">Gender</label>
            <select
              value={settings.gender}
              onChange={(e) => handleSettingChange('gender', e.target.value)}
              className="settings-field__select"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className="settings-field settings-field--full-width">
            <label className="settings-field__label">Bio</label>
            <textarea
              value={settings.bio}
              onChange={(e) => handleSettingChange('bio', e.target.value)}
              className="settings-field__textarea"
              placeholder="Tell us a bit about yourself..."
              rows="3"
            />
          </div>

          <div className="settings-field">
            <label className="settings-field__label">Location</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => handleSettingChange('location', e.target.value)}
              className="settings-field__input"
              placeholder="Your city or country"
            />
          </div>
        </div>

        {/* Role-based Information */}
        <div className="settings-role-section">
          <h4 className="settings-role-title">Role Information</h4>
          <div className="settings-info-grid">
            {role === 'student' && (
              <>
                <div className="settings-info-item">
                  <label>Class</label>
                  <span>{profile?.class_name || 'N/A'}</span>
                </div>
                <div className="settings-info-item">
                  <label>Admission Number</label>
                  <span>{profile?.admission_number || 'N/A'}</span>
                </div>
                <div className="settings-info-item">
                  <label>Academic Year</label>
                  <span>{profile?.academic_year || 'N/A'}</span>
                </div>
              </>
            )}

            {role === 'teacher' && (
              <>
                <div className="settings-info-item">
                  <label>Department</label>
                  <span>{profile?.department || 'N/A'}</span>
                </div>
                <div className="settings-info-item">
                  <label>Subjects</label>
                  <span>{profile?.subjects || 'N/A'}</span>
                </div>
                <div className="settings-info-item">
                  <label>Employee ID</label>
                  <span>{profile?.employee_id || 'N/A'}</span>
                </div>
              </>
            )}

            {role === 'admin' && (
              <>
                <div className="settings-info-item">
                  <label>Access Level</label>
                  <span className="settings-badge-admin">Full System Access</span>
                </div>
                <div className="settings-info-item">
                  <label>Admin Since</label>
                  <span>{profile?.admin_since || 'N/A'}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="settings-actions">
          <button 
            className="settings-actions__btn settings-actions__btn--primary"
            onClick={handleProfileUpdate}
          >
            <span className="settings-btn-icon">💾</span>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <h3 className="settings-section__title">Privacy Settings</h3>
        <p className="settings-section__subtitle">Control your visibility and data sharing</p>
      </div>
      
      <div className="settings-section__content">
        <div className="settings-field">
          <label className="settings-field__label">Profile Visibility</label>
          <select
            value={settings.profileVisibility}
            onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
            className="settings-field__select"
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="settings-field">
          <div className="settings-toggle-field">
            <div className="settings-toggle-info">
              <label className="settings-field__label">Show Online Status</label>
              <p className="settings-field__description">Allow others to see when you're online</p>
            </div>
            <div className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.showOnlineStatus}
                onChange={(e) => handleSettingChange('showOnlineStatus', e.target.checked)}
                className="settings-toggle__input"
              />
              <span className="settings-toggle__slider"></span>
            </div>
          </div>
        </div>

        <div className="settings-field">
          <div className="settings-toggle-field">
            <div className="settings-toggle-info">
              <label className="settings-field__label">Two-Factor Authentication</label>
              <p className="settings-field__description">Add an extra layer of security to your account</p>
            </div>
            <div className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.twoFactorEnabled}
                onChange={(e) => handleSettingChange('twoFactorEnabled', e.target.checked)}
                className="settings-toggle__input"
              />
              <span className="settings-toggle__slider"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <h3 className="settings-section__title">Notification Preferences</h3>
        <p className="settings-section__subtitle">Choose how you want to be notified</p>
      </div>
      
      <div className="settings-section__content">
        <div className="settings-notification-list">
          <div className="settings-notification-item">
            <div className="settings-notification-info">
              <strong>Email Notifications</strong>
              <p>Receive updates via email</p>
            </div>
            <div className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() => handleNotificationToggle('email')}
                className="settings-toggle__input"
              />
              <span className="settings-toggle__slider"></span>
            </div>
          </div>

          <div className="settings-notification-item">
            <div className="settings-notification-info">
              <strong>Push Notifications</strong>
              <p>Get browser notifications</p>
            </div>
            <div className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={() => handleNotificationToggle('push')}
                className="settings-toggle__input"
              />
              <span className="settings-toggle__slider"></span>
            </div>
          </div>

          <div className="settings-notification-item">
            <div className="settings-notification-info">
              <strong>SMS Notifications</strong>
              <p>Text message updates</p>
            </div>
            <div className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={() => handleNotificationToggle('sms')}
                className="settings-toggle__input"
              />
              <span className="settings-toggle__slider"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <h3 className="settings-section__title">Appearance</h3>
        <p className="settings-section__subtitle">Customize your interface</p>
      </div>
      
      <div className="settings-section__content">
        <div className="settings-field">
          <label className="settings-field__label">Theme</label>
          <div className="settings-theme-selector">
            {['light', 'dark', 'auto'].map(themeOption => (
              <div 
                key={themeOption}
                className={`settings-theme-option ${settings.theme === themeOption ? 'settings-theme-active' : ''}`}
                onClick={() => handleSettingChange('theme', themeOption)}
              >
                <div className={`settings-theme-preview settings-theme-${themeOption}`}></div>
                <span>{themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-field">
          <label className="settings-field__label">Language</label>
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="settings-field__select"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="settings-section-header">
        <h3 className="settings-section__title">Security Settings</h3>
        <p className="settings-section__subtitle">Manage your password and security preferences</p>
      </div>
      
      <div className="settings-section__content">
        <div className="settings-field">
          <label className="settings-field__label">Current Password</label>
          <input
            type="password"
            value={settings.current_password}
            onChange={(e) => handleSettingChange('current_password', e.target.value)}
            className="settings-field__input"
            placeholder="Enter current password"
          />
        </div>

        <div className="settings-field">
          <label className="settings-field__label">New Password</label>
          <input
            type="password"
            value={settings.new_password}
            onChange={(e) => handleSettingChange('new_password', e.target.value)}
            className="settings-field__input"
            placeholder="Enter new password"
          />
        </div>

        <div className="settings-field">
          <label className="settings-field__label">Confirm New Password</label>
          <input
            type="password"
            value={settings.confirm_password}
            onChange={(e) => handleSettingChange('confirm_password', e.target.value)}
            className="settings-field__input"
            placeholder="Confirm new password"
          />
        </div>

        <div className="settings-actions">
          <button 
            className="settings-actions__btn settings-actions__btn--primary"
            onClick={handlePasswordChange}
          >
            <span className="settings-btn-icon">🔒</span>
            Change Password
          </button>
        </div>

        <div className="settings-security-section">
          <h4 className="settings-security-title">Session Management</h4>
          <p className="settings-security-description">You're currently logged in on this device.</p>
          <button 
            className="settings-actions__btn settings-actions__btn--secondary"
            onClick={logoutOtherSessions}
          >
            <span className="settings-btn-icon">🚪</span>
            Log Out Other Sessions
          </button>
        </div>
      </div>
    </div>
  );

  const renderDangerZone = () => (
    <div className="settings-section settings-danger-zone">
      <div className="settings-section-header">
        <h3 className="settings-section__title">Danger Zone</h3>
        <p className="settings-section__subtitle">Irreversible actions - proceed with caution</p>
      </div>
      
      <div className="settings-section__content">
        <div className="settings-danger-item">
          <div className="settings-danger-info">
            <h4>Export Your Data</h4>
            <p>Download all your personal data in JSON format</p>
          </div>
          <button 
            className="settings-actions__btn settings-actions__btn--warning"
            onClick={exportData}
          >
            <span className="settings-btn-icon">📥</span>
            Export Data
          </button>
        </div>

        <div className="settings-danger-item">
          <div className="settings-danger-info">
            <h4>Delete Account</h4>
            <p>Permanently delete your account and all associated data</p>
          </div>
          <button 
            className="settings-actions__btn settings-actions__btn--danger"
            onClick={deleteAccount}
          >
            <span className="settings-btn-icon">🗑️</span>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'account': return renderAccountSettings();
      case 'privacy': return renderPrivacySettings();
      case 'notifications': return renderNotificationSettings();
      case 'appearance': return renderAppearanceSettings();
      case 'security': return renderSecuritySettings();
      case 'danger': return renderDangerZone();
      default: return renderAccountSettings();
    }
  };

  return (
    <div className="settings-container">
      {/* MOBILE HEADER */}
      {isMobile && (
        <div className="settings-mobile-header">
          <div className="settings-mobile-header-content">
            <MobileMenuButton />
            <div className="settings-mobile-title">
              <h1>Settings</h1>
              <span className="settings-mobile-role">{role}</span>
            </div>
            <img
              src={getProfilePhotoUrl(profile?.profile_photo)}
              alt="Profile"
              className="settings-mobile-avatar"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>
        </div>
      )}

      <div className="settings-layout">
        {/* SIDEBAR - Fixed positioning */}
        {!isMobile ? (
          // Desktop Sidebar - Normal flow
          <aside className="settings-sidebar">
            <div className="settings-sidebar-content">
              <div className="settings-sidebar-header">
                <img
                  src={getProfilePhotoUrl(profile?.profile_photo)}
                  alt="Profile"
                  className="settings-sidebar-photo"
                />
                <div className="settings-sidebar-user-info">
                  <h3>{profile?.username}</h3>
                  <span className="settings-role-badge">{role}</span>
                  <p>{profile?.email}</p>
                </div>
              </div>
              <TabNavigation />
            </div>
          </aside>
        ) : (
          // Mobile Sidebar - Overlay
          <>
            {showMobileMenu && (
              <div 
                className="settings-mobile-overlay"
                onClick={() => setShowMobileMenu(false)}
              />
            )}
            <aside 
              className={`settings-sidebar settings-sidebar-mobile ${showMobileMenu ? 'settings-sidebar-mobile-open' : ''}`}
            >
              <div className="settings-sidebar-content">
                <div className="settings-sidebar-header">
                  <img
                    src={getProfilePhotoUrl(profile?.profile_photo)}
                    alt="Profile"
                    className="settings-sidebar-photo"
                  />
                  <div className="settings-sidebar-user-info">
                    <h3>{profile?.username}</h3>
                    <span className="settings-role-badge">{role}</span>
                    <p>{profile?.email}</p>
                  </div>
                  <button 
                    className="settings-close-mobile-menu"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    ✕
                  </button>
                </div>
                <TabNavigation />
              </div>
            </aside>
          </>
        )}

        {/* MAIN CONTENT */}
        <main className="settings-main">
          {!isMobile && (
            <header className="settings-header">
              <div className="settings-header-content">
                <h1 className="settings-header__title">Settings</h1>
                <p className="settings-header__subtitle">Manage your account preferences and privacy settings</p>
              </div>
            </header>
          )}

          {isMobile && (
            <div className="settings-mobile-content-header">
              <h2>
                {activeTab === 'account' && 'Account'}
                {activeTab === 'privacy' && 'Privacy'}
                {activeTab === 'notifications' && 'Notifications'}
                {activeTab === 'appearance' && 'Appearance'}
                {activeTab === 'security' && 'Security'}
                {activeTab === 'danger' && 'Danger Zone'}
              </h2>
            </div>
          )}

          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;
