import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentLife from "../Studentlife/Studentlife";
import Academics from "../Academics/Academics";
import Contact from "../Contact/Contact";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import "./Home.css";
import SchoolUpdates from "./SchoolUpdates";

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
        {/* ===== SCHOOL UPDATES ===== */}
        <SchoolUpdates/>

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