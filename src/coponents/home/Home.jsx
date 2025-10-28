import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentLife from "../Studentlife/Studentlife";
import Academics from "../Academics/Academics";
import Contact from "../Contact/Contact";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
 import "./Home.css"

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setNews([
      {
        title: "New Science Block Opening",
        date: "October 20, 2025",
        content:
          "Malindi High School inaugurates a new modern science complex equipped with digital labs.",
      },
      {
        title: "National Mathematics Contest",
        date: "November 2, 2025",
        content:
          "Our students will represent the region in the National Math Challenge.",
      },
      {
        title: "Form One Admission 2026",
        date: "December 1, 2025",
        content:
          "Applications for the 2026 Form One intake are now open. Apply early!",
      },
    ]);
  }, []);

  return (
    <div className="mhs-homepage">
      {/* ===== HERO SECTION ===== */}
      <HeroSection />

      {/* ===== MAIN CONTENT SECTIONS ===== */}
      <main className="mhs-main-content">
        {/* ===== WELCOME SECTION ===== */}
        {/* <section id="home" className="mhs-welcome-section">
          <div className="mhs-container">
            <div className="mhs-welcome-content">
              <div className="mhs-welcome-text">
                <h2 className="mhs-section-title">Welcome to Malindi High School</h2>
                <p className="mhs-section-subtitle">
                  Empowering students through knowledge, integrity, and excellence since 1985.
                </p>
                <p className="mhs-welcome-description">
                  At Malindi High School, we nurture young minds to become future leaders through 
                  comprehensive education, state-of-the-art facilities, and a commitment to 
                  holistic development.
                </p>
                <div className="mhs-welcome-stats">
                  <div className="mhs-stat-item">
                    <span className="mhs-stat-number">2,000+</span>
                    <span className="mhs-stat-label">Students</span>
                  </div>
                  <div className="mhs-stat-item">
                    <span className="mhs-stat-number">150+</span>
                    <span className="mhs-stat-label">Faculty</span>
                  </div>
                  <div className="mhs-stat-item">
                    <span className="mhs-stat-number">98%</span>
                    <span className="mhs-stat-label">Success Rate</span>
                  </div>
                </div>
                <button
                  className="mhs-primary-button mhs-large-button"
                  onClick={() => navigate("/classroom")}
                >
                  <span className="mhs-button-icon">🎓</span>
                  Join Virtual Classroom
                </button>
              </div>
              <div className="mhs-welcome-visual">
                <div className="mhs-visual-card">
                  <div className="mhs-card-image"></div>
                  <div className="mhs-card-content">
                    <h4>Excellence in Education</h4>
                    <p>Consistently ranked among top schools in the region</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* ===== LATEST NEWS ===== */}
        <section id="latestnews" className="mhs-news-section">
          <div className="mhs-container">
            <div className="mhs-section-header">
              <h2 className="mhs-section-title">Latest News & Events</h2>
              <p className="mhs-section-subtitle">Stay updated with our latest announcements and activities</p>
            </div>
            <div className="mhs-news-grid">
              {news.map((item, index) => (
                <article className="mhs-news-card" key={index}>
                  <div className="mhs-news-badge">New</div>
                  <div className="mhs-news-content">
                    <h3 className="mhs-news-title">{item.title}</h3>
                    <div className="mhs-news-meta">
                      <span className="mhs-news-date">📅 {item.date}</span>
                    </div>
                    <p className="mhs-news-excerpt">{item.content}</p>
                    <button className="mhs-text-button">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="mhs-section-footer">
              <button className="mhs-secondary-button">
                View All News & Events
              </button>
            </div>
          </div>
        </section>

        {/* ===== STUDENT LIFE ===== */}
        <StudentLife />

        {/* ===== ACADEMICS ===== */}
        <Academics />

        {/* ===== CLASSROOM SECTION ===== */}
        <section id="classroom" className="mhs-classroom-section">
          <div className="mhs-container">
            <div className="mhs-classroom-content">
              <div className="mhs-classroom-text">
                <h2 className="mhs-section-title">Virtual Classroom Platform</h2>
                <p className="mhs-section-subtitle">
                  Experience next-generation learning with our digital platform
                </p>
                <ul className="mhs-feature-list">
                  <li className="mhs-feature-item">
                    <span className="mhs-feature-icon">📚</span>
                    Interactive Lessons & Resources
                  </li>
                  <li className="mhs-feature-item">
                    <span className="mhs-feature-icon">📝</span>
                    Online Assignments & Assessments
                  </li>
                  <li className="mhs-feature-item">
                    <span className="mhs-feature-icon">👨‍🏫</span>
                    Live Sessions with Teachers
                  </li>
                  <li className="mhs-feature-item">
                    <span className="mhs-feature-icon">📊</span>
                    Progress Tracking & Analytics
                  </li>
                </ul>
                <button
                  className="mhs-primary-button mhs-large-button"
                  onClick={() => navigate("/classroom")}
                >
                  <span className="mhs-button-icon">🚀</span>
                  Access Classroom Now
                </button>
              </div>
              <div className="mhs-classroom-visual">
                <div className="mhs-platform-preview">
                  <div className="mhs-preview-header">
                    <div className="mhs-preview-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="mhs-preview-content">
                    <div className="mhs-preview-item"></div>
                    <div className="mhs-preview-item"></div>
                    <div className="mhs-preview-item"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <About />
        
        {/* ===== CONTACT ===== */}
        <Contact />
      </main>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
};

export default Home;