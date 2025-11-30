import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../Authentication/AuthContext';
import { ThemeContext } from '../../Authentication/ThemeContext';
import { Link } from 'react-router-dom';
import DashboardHeader from '../DashboardHeader/DashboardHeader';
import DashboardStats from '../DashboardStats/DashboardStats';
import QuickActions from '../QuickActions/QuickActions';
import NewsEvents from '../NewsEvents/NewsEventForm';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import MobileNav from '../MobileNav/MobileNav';
import './Dashboard.css';

export default function Dashboard() {
  const { role, logout } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Online users state
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [totalOnline, setTotalOnline] = useState(0);

  // Check mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [mobileNavOpen]);

  const handleOverlayClick = () => {
    setMobileNavOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileNavOpen) {
        setMobileNavOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileNavOpen]);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileNavOpen]);

  const fetchOnlineUsers = useCallback(async () => {
    try {
      const mockOnlineUsers = [
        { id: 1, name: 'John Doe', role: 'teacher', lastActive: '2 mins ago', avatar: '👨‍🏫', status: 'online' },
        { id: 2, name: 'Jane Smith', role: 'student', lastActive: '5 mins ago', avatar: '👩‍🎓', status: 'online' },
        { id: 3, name: 'Dr. Wilson', role: 'admin', lastActive: '1 min ago', avatar: '👨‍⚕️', status: 'online' },
        { id: 4, name: 'Sarah Johnson', role: 'student', lastActive: '3 mins ago', avatar: '👩‍💼', status: 'online' },
        { id: 5, name: 'Mike Brown', role: 'teacher', lastActive: '10 mins ago', avatar: '👨‍🔬', status: 'away' },
      ];
      
      setOnlineUsers(mockOnlineUsers);
      setTotalOnline(mockOnlineUsers.filter(user => user.status === 'online').length);
    } catch (error) {
      console.error('Error fetching online users:', error);
    }
  }, []);

  useEffect(() => {
    fetchOnlineUsers();
    const interval = setInterval(fetchOnlineUsers, 30000);
    return () => clearInterval(interval);
  }, [fetchOnlineUsers]);

  if (role !== 'secretary') {
    return (
      <div className={`dashboard-unauthorized ${isDark ? 'dashboard-unauthorized--dark' : 'dashboard-unauthorized--light'}`}>
        <h2 className="dashboard-unauthorized__title">Access Denied</h2>
        <p className="dashboard-unauthorized__message">This dashboard is only available to secretarial staff.</p>
        <Link to="/" className="dashboard-unauthorized__link">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div className={`dashboard-container ${isDark ? 'dashboard-container--dark' : 'dashboard-container--light'}`}>
      <DashboardHeader 
        onLogout={logout} 
        onMobileNavToggle={() => setMobileNavOpen(!mobileNavOpen)}
        isMobile={isMobile}
        mobileNavOpen={mobileNavOpen}
      />
      
      <div className="dashboard-content">
        <div className="dashboard-main">
          <DashboardStats />
          <QuickActions />
          <NewsEvents />
        </div>

        <div className={`dashboard-sidebar ${mobileNavOpen ? 'dashboard-sidebar--open' : ''}`}>
          <div className="dashboard-sidebar__header">
            <h3>Quick Access</h3>
            <button 
              className="dashboard-sidebar__close-btn"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>
          
          <OnlineUsers 
            users={onlineUsers} 
            totalOnline={totalOnline} 
          />
          
          <div className="dashboard-sidebar__widget">
            <h3>Quick Stats</h3>
            <div className="dashboard-sidebar__widget-stats">
              <div className="dashboard-sidebar__widget-stat">
                <span className="dashboard-sidebar__stat-value">85%</span>
                <span className="dashboard-sidebar__stat-label">Attendance</span>
              </div>
              <div className="dashboard-sidebar__widget-stat">
                <span className="dashboard-sidebar__stat-value">92%</span>
                <span className="dashboard-sidebar__stat-label">Performance</span>
              </div>
            </div>
          </div>
        </div>

        {isMobile && mobileNavOpen && (
          <div 
            className="dashboard-sidebar__overlay"
            onClick={handleOverlayClick}
          ></div>
        )}
      </div>

      {isMobile && <MobileNav />}
    </div>
  );
}