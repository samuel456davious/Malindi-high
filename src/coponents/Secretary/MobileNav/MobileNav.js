import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../Authentication/ThemeContext';
import './MobileNav.css';

export default function MobileNav() {
  const { isDark } = useContext(ThemeContext);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', link: '/dashboard' },
    { id: 'students', label: 'Students', icon: '🎓', link: '/students' },
    { id: 'teachers', label: 'Teachers', icon: '👨‍🏫', link: '/teachers' },
    { id: 'schedule', label: 'Schedule', icon: '📅', link: '/schedule' },
    { id: 'reports', label: 'Reports', icon: '📈', link: '/reports' },
  ];

  return (
    <nav className={`mobile-nav ${isDark ? 'mobile-nav--dark' : 'mobile-nav--light'}`}>
      {navItems.map(item => (
        <Link
          key={item.id}
          to={item.link}
          className={`mobile-nav__item ${activeTab === item.link ? 'mobile-nav__item--active' : ''}`}
          onClick={() => setActiveTab(item.link)}
        >
          <span className="mobile-nav__icon">{item.icon}</span>
          <span className="mobile-nav__label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}