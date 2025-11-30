import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../Authentication/ThemeContext';
import './OnlineUsers.css';

export default function OnlineUsers({ users, totalOnline }) {
  const { isDark } = useContext(ThemeContext);
  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.role === filter;
  });

  const roleCounts = {
    all: users.length,
    teacher: users.filter(u => u.role === 'teacher').length,
    student: users.filter(u => u.role === 'student').length,
    admin: users.filter(u => u.role === 'admin').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'var(--dashboard-accent-success)';
      case 'away': return 'var(--dashboard-accent-warning)';
      case 'offline': return 'var(--dashboard-accent-error)';
      default: return 'var(--dashboard-text-tertiary)';
    }
  };

  return (
    <div className={`online-users ${isDark ? 'online-users--dark' : 'online-users--light'}`}>
      <div className="online-users__header">
        <h3 className="online-users__title">Online Users</h3>
        <div className="online-users__indicator">
          <span 
            className="online-users__dot" 
            style={{ backgroundColor: getStatusColor('online') }}
          ></span>
          <span className="online-users__count">{totalOnline} Online</span>
        </div>
      </div>

      <div className="online-users__filters">
        {['all', 'teacher', 'student', 'admin'].map(role => (
          <button
            key={role}
            className={`online-users__filter-btn ${filter === role ? 'online-users__filter-btn--active' : ''}`}
            onClick={() => setFilter(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
            <span className="online-users__filter-count">({roleCounts[role]})</span>
          </button>
        ))}
      </div>

      <div className="online-users__list">
        {filteredUsers.map(user => (
          <div key={user.id} className="online-users__item">
            <div className="online-users__avatar">
              {user.avatar}
              <div 
                className="online-users__status" 
                style={{ backgroundColor: getStatusColor(user.status) }}
              ></div>
            </div>
            <div className="online-users__info">
              <span className="online-users__name">{user.name}</span>
              <span className="online-users__role">{user.role}</span>
            </div>
            <div className="online-users__last-active">
              {user.lastActive}
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="online-users__empty">
          No users found
        </div>
      )}
    </div>
  );
}