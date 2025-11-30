import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../Authentication/ThemeContext';
import './DashboardStats.css';

export default function DashboardStats() {
  const { isDark } = useContext(ThemeContext);

  const statsData = [
    { title: 'Pending Enrollments', value: '8', color: 'warning', link: '/pending_users', icon: '⏳' },
    { title: 'Approved Students', value: '120', color: 'success', link: '/students', icon: '✅' },
    { title: 'Teacher Requests', value: '5', color: 'info', link: '/teacher_requests', icon: '📈' },
    { title: 'Total Classes', value: '32', color: 'primary', link: '/classes', icon: '🏫' },
  ];

  return (
    <div className="dashboard-stats">
      <h2 className="dashboard-stats__title">Overview</h2>
      <div className="dashboard-stats__grid">
        {statsData.map((stat, index) => (
          <Link key={index} to={stat.link} className="dashboard-stats__card-link">
            <div className={`dashboard-stats__card dashboard-stats__card--${stat.color} ${isDark ? 'dashboard-stats__card--dark' : 'dashboard-stats__card--light'}`}>
              <div className="dashboard-stats__card-content">
                <h3 className="dashboard-stats__card-value">{stat.value}</h3>
                <p className="dashboard-stats__card-title">{stat.title}</p>
              </div>
              <div className="dashboard-stats__card-icon">
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}