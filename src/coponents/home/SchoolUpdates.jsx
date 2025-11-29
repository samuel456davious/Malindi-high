import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../Authentication/ThemeContext";
import API from "../Authentication/api";
import "./SchoolUpdates.css";

const SchoolUpdates = () => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({ events: true, news: true });
  const { theme, isDark } = useContext(ThemeContext);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`https://malindihigh.pythonanywhere.com/get_events?limit=20`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(prev => ({ ...prev, events: false }));
      }
    };
    fetchEvents();
  }, []);

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`https://malindihigh.pythonanywhere.com/get_news?limit=20`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      } finally {
        setLoading(prev => ({ ...prev, news: false }));
      }
    };
    fetchNews();
  }, []);

  const scrollCarousel = (direction, section) => {
    const carousel = document.querySelector(`.school-updates-carousel-${section}`);
    if (carousel) {
      const scrollAmount = 400;
      carousel.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Dynamic theme styles
  const getThemeStyles = () => {
    if (isDark) {
      return {
        background: 'var(--bg-card, #1e293b)',
        textPrimary: 'var(--text-primary, #f8fafc)',
        textSecondary: 'var(--text-secondary, #cbd5e1)',
        textTertiary: 'var(--text-tertiary, #94a3b8)',
        border: 'var(--border-primary, #334155)',
        accentGradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        accentColor: '#60a5fa',
        cardBg: 'var(--bg-secondary, #0f172a)',
        cardHover: 'var(--hover-overlay, rgba(255, 255, 255, 0.05))',
        buttonBg: 'rgba(30, 41, 59, 0.8)',
        buttonHover: 'rgba(51, 65, 85, 0.8)',
        dividerBg: '#3b82f6',
        spinnerBorder: 'rgba(59, 130, 246, 0.3)',
        spinnerTop: '#3b82f6'
      };
    } else {
      return {
        background: 'var(--bg-primary, #ffffff)',
        textPrimary: 'var(--text-primary, #2c3e50)',
        textSecondary: 'var(--text-secondary, #34495e)',
        textTertiary: 'var(--text-tertiary, #5d6d7e)',
        border: 'var(--border-primary, #e1e8ed)',
        accentGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        accentColor: '#667eea',
        cardBg: 'var(--bg-card, #ffffff)',
        cardHover: 'var(--hover-overlay, rgba(0, 0, 0, 0.02))',
        buttonBg: 'rgba(255, 255, 255, 0.9)',
        buttonHover: 'rgba(255, 255, 255, 1)',
        dividerBg: '#667eea',
        spinnerBorder: 'rgba(102, 126, 234, 0.3)',
        spinnerTop: '#667eea'
      };
    }
  };

  const themeStyles = getThemeStyles();

  if (loading.events && loading.news) {
    return (
      <div 
        className="school-updates-loading"
        style={{
          '--spinner-border': themeStyles.spinnerBorder,
          '--spinner-top': themeStyles.spinnerTop
        }}
      >
        <div className="school-updates-spinner"></div>
        <p style={{ color: themeStyles.textSecondary }}>Loading school updates...</p>
      </div>
    );
  }

  return (
    <div 
      className={`school-updates-container ${isDark ? 'school-updates-dark' : 'school-updates-light'}`}
      style={{
        '--bg-primary': themeStyles.background,
        '--text-primary': themeStyles.textPrimary,
        '--text-secondary': themeStyles.textSecondary,
        '--text-tertiary': themeStyles.textTertiary,
        '--border-primary': themeStyles.border,
        '--accent-gradient': themeStyles.accentGradient,
        '--accent-color': themeStyles.accentColor,
        '--card-bg': themeStyles.cardBg,
        '--card-hover': themeStyles.cardHover,
        '--button-bg': themeStyles.buttonBg,
        '--button-hover': themeStyles.buttonHover,
        '--divider-bg': themeStyles.dividerBg
      }}
    >
      {/* ---- News Section ---- */}
      {news && news.length > 0 && (
        <section className="school-updates-section school-updates-news">
          <div className="school-updates-section-header">
            <div className="school-updates-header">
              <h2 className="school-updates-title">Latest School News</h2>
              <div className="school-updates-divider"></div>
            </div>
            <div className="school-updates-carousel-controls">
              <button 
                className="school-updates-carousel-btn school-updates-carousel-prev"
                onClick={() => scrollCarousel('prev', 'news')}
                aria-label="Previous news"
                style={{
                  '--button-bg': themeStyles.buttonBg,
                  '--button-hover': themeStyles.buttonHover,
                  '--button-text': themeStyles.textPrimary
                }}
              >
                ‹
              </button>
              <button 
                className="school-updates-carousel-btn school-updates-carousel-next"
                onClick={() => scrollCarousel('next', 'news')}
                aria-label="Next news"
                style={{
                  '--button-bg': themeStyles.buttonBg,
                  '--button-hover': themeStyles.buttonHover,
                  '--button-text': themeStyles.textPrimary
                }}
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="school-updates-carousel-container">
            <div className="school-updates-carousel school-updates-carousel-news">
              {news.map((item) => (
                <article 
                  key={item.id} 
                  className="school-updates-card school-updates-news-card"
                  style={{
                    '--card-bg': themeStyles.cardBg,
                    '--card-border': themeStyles.border,
                    '--card-hover': themeStyles.cardHover
                  }}
                >
                  <div className="school-updates-card-header">
                    <h3 className="school-updates-card-title">{item.title}</h3>
                    <span className="school-updates-date">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="school-updates-summary">{item.summary}</p>
                  <p className="school-updates-content">{item.content}</p>
                  <div className="school-updates-footer">
                    <span className="school-updates-author">By: {item.author}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Events Section ---- */}
      {events && events.length > 0 && (
        <section className="school-updates-section school-updates-events">
          <div className="school-updates-section-header">
            <div className="school-updates-header">
              <h2 className="school-updates-title">Upcoming School Events</h2>
              <div className="school-updates-divider"></div>
            </div>
            <div className="school-updates-carousel-controls">
              <button 
                className="school-updates-carousel-btn school-updates-carousel-prev"
                onClick={() => scrollCarousel('prev', 'events')}
                aria-label="Previous events"
                style={{
                  '--button-bg': themeStyles.buttonBg,
                  '--button-hover': themeStyles.buttonHover,
                  '--button-text': themeStyles.textPrimary
                }}
              >
                ‹
              </button>
              <button 
                className="school-updates-carousel-btn school-updates-carousel-next"
                onClick={() => scrollCarousel('next', 'events')}
                aria-label="Next events"
                style={{
                  '--button-bg': themeStyles.buttonBg,
                  '--button-hover': themeStyles.buttonHover,
                  '--button-text': themeStyles.textPrimary
                }}
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="school-updates-carousel-container">
            <div className="school-updates-carousel school-updates-carousel-events">
              {events.map((event) => (
                <article 
                  key={event.id} 
                  className="school-updates-card school-updates-event-card"
                  style={{
                    '--card-bg': themeStyles.cardBg,
                    '--card-border': themeStyles.border,
                    '--card-hover': themeStyles.cardHover
                  }}
                >
                  <div className="school-updates-card-header">
                    <h3 className="school-updates-card-title">{event.name}</h3>
                    <span className="school-updates-date">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="school-updates-summary">{event.summary}</p>
                  <div className="school-updates-event-details">
                    <div className="school-updates-detail-item">
                      <span className="school-updates-detail-label">Location:</span>
                      <span className="school-updates-detail-value">{event.location}</span>
                    </div>
                  </div>
                  <p className="school-updates-content">{event.description}</p>
                  <div className="school-updates-footer">
                    <span className="school-updates-author">By: {event.author}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {(!news || news.length === 0) && (!events || events.length === 0) && (
        <div 
          className="school-updates-empty"
          style={{
            '--text-secondary': themeStyles.textSecondary,
            '--text-tertiary': themeStyles.textTertiary
          }}
        >
          <div className="school-updates-empty-icon">📢</div>
          <h3>No Updates Available</h3>
          <p>Check back later for the latest school news and events.</p>
        </div>
      )}
    </div>
  );
};

export default SchoolUpdates;