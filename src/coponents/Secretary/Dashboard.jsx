import React, { useContext } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const { role, logout, user } = useContext(AuthContext);

  // Sample stats data - you can replace with actual data from your API
  const statsData = {
    secretary: [
      { title: 'Pending Users', value: '12', color: 'warning', link: '/pending_users' },
      { title: 'Approved Users', value: '45', color: 'success', link: '/users' },
      { title: 'Total Requests', value: '89', color: 'info', link: '/requests' },
    ],
    user: [
      { title: 'My Profile', value: 'Complete', color: 'success', link: '/profile' },
      { title: 'Active Tasks', value: '3', color: 'warning', link: '/tasks' },
      { title: 'Messages', value: '5', color: 'info', link: '/messages' },
    ]
  };

  const quickActions = {
    secretary: [
      { title: 'Approve Users', description: 'Review and approve user registrations', icon: '👥', link: '/approve', color: 'primary' },
      { title: 'Manage Users', description: 'View and manage all users', icon: '📊', link: '/users', color: 'secondary' },
      { title: 'System Settings', description: 'Configure system preferences', icon: '⚙️', link: '/settings', color: 'info' },
    ],
    user: [
      { title: 'Update Profile', description: 'Manage your personal information', icon: '👤', link: '/profile', color: 'primary' },
      { title: 'View Tasks', description: 'Check your assigned tasks', icon: '📋', link: '/tasks', color: 'warning' },
      { title: 'Help Center', description: 'Get support and documentation', icon: '❓', link: '/help', color: 'info' },
    ]
  };

  const currentStats = statsData[role] || statsData.user;
  const currentActions = quickActions[role] || quickActions.user;

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1 className="dashboard-title">Welcome back!</h1>
          <p className="dashboard-subtitle">Here's what's happening today</p>
        </div>
        <div className="dashboard-user-info">
          <div className="user-role-badge">
            <span className={`role-badge role-${role}`}>
              {role?.charAt(0).toUpperCase() + role?.slice(1)}
            </span>
          </div>
          <button onClick={logout} className="logout-button">
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {currentStats.map((stat, index) => (
          <Link key={index} to={stat.link} className="stat-card-link">
            <div className={`stat-card stat-${stat.color}`}>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
              <div className="stat-icon">
                {stat.color === 'warning' && '⏳'}
                {stat.color === 'success' && '✅'}
                {stat.color === 'info' && '📈'}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          {currentActions.map((action, index) => (
            <Link key={index} to={action.link} className="action-card-link">
              <div className={`action-card action-${action.color}`}>
                <div className="action-icon">{action.icon}</div>
                <div className="action-content">
                  <h3 className="action-title">{action.title}</h3>
                  <p className="action-description">{action.description}</p>
                </div>
                <div className="action-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Secretary Specific Actions */}
      {role === 'secretary' && (
        <div className="dashboard-section">
          <h2 className="section-title">Administrative Tools</h2>
          <div className="admin-tools">
            <Link to="/pending_users" className="admin-tool-button admin-tool-warning">
              <span className="tool-icon">👀</span>
              <div className="tool-content">
                <h3>Review Pending Users</h3>
                <p>Approve or reject user registration requests</p>
              </div>
            </Link>
            <Link to="/approve" className="admin-tool-button admin-tool-info">
              <span className="tool-icon">✓</span>
              <div className="tool-content">
                <h3>Approve Users</h3>
                <p>Manage user approvals and permissions</p>
              </div>
            </Link>
            <Link to="/reports" className="admin-tool-button admin-tool-secondary">
              <span className="tool-icon">📄</span>
              <div className="tool-content">
                <h3>Generate Reports</h3>
                <p>Create and export system reports</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Recent Activity Section */}
      <div className="dashboard-section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">🔔</div>
            <div className="activity-content">
              <p className="activity-text">Welcome to your dashboard! Get started by updating your profile.</p>
              <span className="activity-time">Just now</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📱</div>
            <div className="activity-content">
              <p className="activity-text">System updated to version 2.1.0</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}