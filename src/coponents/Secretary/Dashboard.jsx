import React, { useContext, useState } from 'react';
import { AuthContext } from '../Authentication/AuthContext';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const { role, logout } = useContext(AuthContext);

  // -----------------------
  // News & Events Section (Hooks must come first!)
  // -----------------------
  const [newsList, setNewsList] = useState([
    { title: 'Midterm Exams Schedule Released', date: '2025-10-25', type: 'Event' },
    { title: 'Parent-Teacher Meeting this Friday', date: '2025-10-27', type: 'News' },
  ]);
  const [newItem, setNewItem] = useState({ title: '', date: '', type: 'News' });
  const [error, setError] = useState('');

  // Restrict to secretary role (AFTER hooks are declared)
  if (role !== 'secretary') {
    return (
      <div className="dashboard-unauthorized">
        <h2 className="unauthorized-title">Access Denied</h2>
        <p className="unauthorized-message">This dashboard is only available to secretarial staff.</p>
        <Link to="/" className="unauthorized-link">Go back to Home</Link>
      </div>
    );
  }

  // -----------------------
  // Secretary Dashboard Data
  // -----------------------
  const statsData = [
    { title: 'Pending Enrollments', value: '8', color: 'warning', link: '/pending_users' },
    { title: 'Approved Students', value: '120', color: 'success', link: '/students' },
    { title: 'Teacher Requests', value: '5', color: 'info', link: '/teacher_requests' },
    { title: 'Total Classes', value: '32', color: 'primary', link: '/classes' },
  ];

  const quickActions = [
    { title: 'Manage Students', description: 'Add, approve, or edit student profiles', icon: '🎓', link: '/students', color: 'primary' },
    { title: 'Manage Teachers', description: 'Update teacher information and assignments', icon: '🧑‍🏫', link: '/teachers', color: 'secondary' },
    { title: 'Class Scheduling', description: 'Create and edit class timetables', icon: '📅', link: '/schedule', color: 'info' },
    { title: 'Communication Center', description: 'Send announcements to students or teachers', icon: '📢', link: '/announcements', color: 'warning' },
    { title: 'Generate Reports', description: 'Attendance, grades, and registration reports', icon: '📊', link: '/reports', color: 'success' },
  ];

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.date) {
      setError('Please fill out all fields.');
      return;
    }
    setNewsList([{ ...newItem }, ...newsList]);
    setNewItem({ title: '', date: '', type: 'News' });
    setError('');
  };

  // -----------------------
  // Render
  // -----------------------
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1 className="dashboard-title">Academic Administration Dashboard</h1>
          <p className="dashboard-subtitle">Manage school operations, announcements, and events</p>
        </div>
        <div className="dashboard-user-controls">
          <div className="user-role-indicator">
            <span className="role-badge role-secretary">Secretary</span>
          </div>
          <button onClick={logout} className="dashboard-logout-btn">
            <span className="logout-btn-icon">↩</span> Logout
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-stats-grid">
        {statsData.map((stat, index) => (
          <Link key={index} to={stat.link} className="stat-card-link">
            <div className={`stat-card stat-card--${stat.color}`}>
              <div className="stat-card-content">
                <h3 className="stat-card-value">{stat.value}</h3>
                <p className="stat-card-title">{stat.title}</p>
              </div>
              <div className="stat-card-icon">
                {stat.color === 'warning' && '⏳'}
                {stat.color === 'success' && '✅'}
                {stat.color === 'info' && '📈'}
                {stat.color === 'primary' && '🏫'}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="action-card-link">
              <div className={`action-card action-card--${action.color}`}>
                <div className="action-card-icon">{action.icon}</div>
                <div className="action-card-content">
                  <h3 className="action-card-title">{action.title}</h3>
                  <p className="action-card-description">{action.description}</p>
                </div>
                <div className="action-card-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Administrative Tools */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Administrative Tools</h2>
        <div className="admin-tools-grid">
          <Link to="/pending_users" className="admin-tool-card admin-tool-card--warning">
            <span className="admin-tool-icon">📝</span>
            <div className="admin-tool-content">
              <h3 className="admin-tool-title">Review Pending Enrollments</h3>
              <p className="admin-tool-description">Approve or reject new student applications</p>
            </div>
          </Link>
          <Link to="/teacher_requests" className="admin-tool-card admin-tool-card--info">
            <span className="admin-tool-icon">🧾</span>
            <div className="admin-tool-content">
              <h3 className="admin-tool-title">Review Teacher Requests</h3>
              <p className="admin-tool-description">Manage teacher schedules and resource requests</p>
            </div>
          </Link>
          <Link to="/reports" className="admin-tool-card admin-tool-card--secondary">
            <span className="admin-tool-icon">📄</span>
            <div className="admin-tool-content">
              <h3 className="admin-tool-title">Generate Reports</h3>
              <p className="admin-tool-description">Create attendance and performance summaries</p>
            </div>
          </Link>
        </div>
      </div>

      {/* News & Events Management */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Latest News & Events</h2>

        <form className="news-management-form" onSubmit={handleAddNews}>
          <input
            type="text"
            className="news-form-input"
            placeholder="Enter announcement title..."
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <input
            type="date"
            className="news-form-date"
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
          />
          <select
            className="news-form-select"
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
          >
            <option value="News">News</option>
            <option value="Event">Event</option>
          </select>
          <button type="submit" className="news-form-submit">Add Announcement</button>
        </form>

        {error && <p className="form-error-message">{error}</p>}

        <div className="announcements-list">
          {newsList.map((item, index) => (
            <div key={index} className="announcement-item">
              <div className="announcement-type-indicator">
                {item.type === 'News' ? '📰' : '🎉'}
              </div>
              <div className="announcement-content">
                <h3 className="announcement-title">{item.title}</h3>
                <p className="announcement-date">{new Date(item.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section">
        <h2 className="dashboard-section-title">Recent Activity</h2>
        <div className="activity-feed">
          <div className="activity-feed-item">
            <div className="activity-icon-container">
              <span className="activity-icon">🔔</span>
            </div>
            <div className="activity-content">
              <p className="activity-text">3 new student enrollment requests received.</p>
              <span className="activity-timestamp">Just now</span>
            </div>
          </div>
          <div className="activity-feed-item">
            <div className="activity-icon-container">
              <span className="activity-icon">💬</span>
            </div>
            <div className="activity-content">
              <p className="activity-text">New message from the Principal's Office.</p>
              <span className="activity-timestamp">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
