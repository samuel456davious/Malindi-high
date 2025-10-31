import React, { useEffect, useState } from "react";
import API from "../Authentication/api";
import "./SchoolUpdates.css";

const SchoolUpdates = () => {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState({ events: true, news: true });

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

  if (loading.events && loading.news) {
    return (
      <div className="school-updates-loading">
        <div className="school-updates-spinner"></div>
        <p>Loading school updates...</p>
      </div>
    );
  }

  return (
    <div className="school-updates-container">
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
              >
                ‹
              </button>
              <button 
                className="school-updates-carousel-btn school-updates-carousel-next"
                onClick={() => scrollCarousel('next', 'news')}
                aria-label="Next news"
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="school-updates-carousel-container">
            <div className="school-updates-carousel school-updates-carousel-news">
              {news.map((item) => (
                <article key={item.id} className="school-updates-card school-updates-news-card">
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
              >
                ‹
              </button>
              <button 
                className="school-updates-carousel-btn school-updates-carousel-next"
                onClick={() => scrollCarousel('next', 'events')}
                aria-label="Next events"
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="school-updates-carousel-container">
            <div className="school-updates-carousel school-updates-carousel-events">
              {events.map((event) => (
                <article key={event.id} className="school-updates-card school-updates-event-card">
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
        <div className="school-updates-empty">
          <div className="school-updates-empty-icon">📢</div>
          <h3>No Updates Available</h3>
          <p>Check back later for the latest school news and events.</p>
        </div>
      )}
    </div>
  );
};

export default SchoolUpdates;