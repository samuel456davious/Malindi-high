import React, { useContext } from 'react';
import { ThemeContext } from '../../Authentication/ThemeContext';

export default function DashboardHeader({ onLogout, onMobileNavToggle, isMobile, mobileNavOpen }) {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="dashboard-header">
      <div className="header-left">
        {isMobile && (
          <button 
            className={`mobile-nav-toggle ${mobileNavOpen ? 'open' : ''}`}
            onClick={onMobileNavToggle}
            aria-label="Toggle navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
        <div className="dashboard-welcome">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage school operations</p>
        </div>
      </div>
      
      <div className="dashboard-user-controls">
        <div className="user-role-indicator">
          <span className={`role-badge role-secretary ${isDark ? 'dark' : 'light'}`}>
            Secretary
          </span>
        </div>
        <button onClick={onLogout} className={`dashboard-logout-btn ${isDark ? 'dark' : 'light'}`}>
          <span className="logout-btn-icon">↩</span> Logout
        </button>
      </div>
    </div>
  );
}