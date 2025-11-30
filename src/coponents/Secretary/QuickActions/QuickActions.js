import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Authentication/ThemeContext';
import './QuickActions.css';

export default function QuickActions() {
  const { isDark } = useContext(ThemeContext);

  const quickActions = [
    { title: 'Manage Students', description: 'Add, approve, or edit student profiles', icon: '🎓', link: '/students', color: 'primary' },
    { title: 'Manage Teachers', description: 'Update teacher information and assignments', icon: '🧑‍🏫', link: '/teachers', color: 'secondary' },
    { title: 'Class Scheduling', description: 'Create and edit class timetables', icon: '📅', link: '/schedule', color: 'info' },
    { title: 'Communication Center', description: 'Send announcements to students or teachers', icon: '📢', link: '/announcements', color: 'warning' },
    { title: 'Generate Reports', description: 'Attendance, grades, and registration reports', icon: '📊', link: '/reports', color: 'success' },
  ];

  return (
    <div className="quick-actions">
      <h2 className="quick-actions__title">Quick Actions</h2>
      <div className="quick-actions__grid">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.link} className="quick-actions__card-link">
            <div className={`quick-actions__card quick-actions__card--${action.color} ${isDark ? 'quick-actions__card--dark' : 'quick-actions__card--light'}`}>
              <div className="quick-actions__card-icon">{action.icon}</div>
              <div className="quick-actions__card-content">
                <h3 className="quick-actions__card-title">{action.title}</h3>
                <p className="quick-actions__card-description">{action.description}</p>
              </div>
              <div className="quick-actions__card-arrow">→</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}