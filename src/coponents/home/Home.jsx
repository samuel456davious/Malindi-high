import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // ✅ import navigation hook
// import "./Home.css";
import StudentLife from "../Studentlife/Studentlife";
import Academics from "../Academics/Academics";
import Contact from "../Contact/Contact";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [news, setNews] = useState([]);
  const navigate = useNavigate(); // ✅ initialize navigation

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
    <div className="homepage">
      {/* ===== NAVBAR ===== */}
      {/* <nav className="navbar">
        <div className="logo">Malindi High School</div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home">Home</a>
          <a href="#studentlife">Student Life</a>
          <a href="#academics">Academics</a>
          <a href="#classroom">Classroom</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#latestnews">Latest News</a>
        </div>

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav> */}
      {/* <Navigation/> */}

      {/* ===== HERO SECTION ===== */}
      <HeroSection/>
      
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to Malindi High School</h1>
          <p>Empowering students through knowledge, integrity, and excellence.</p>
          <button
            className="learn-more-btn"
            onClick={() => navigate("/classroom")} // ✅ navigate to Classroom page
          >
            Join Now
          </button>
        </div>
      </section>

      {/* ===== LATEST NEWS ===== */}
      <section id="latestnews" className="news">
        <h2>Latest News & Events</h2>
        <div className="news-container">
          {news.map((item, index) => (
            <div className="news-item" key={index}>
              <h3>{item.title}</h3>
              <p className="date">{item.date}</p>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STUDENT LIFE ===== */}
      <StudentLife />

      {/* ===== ACADEMICS ===== */}
      <Academics />

      {/* ===== CLASSROOM SECTION ===== */}
      <section id="classroom" className="classroom">
        <h2>Virtual Classroom</h2>
        <p>
          Access our virtual learning platform for interactive lessons, online
          assignments, and digital resources.
        </p>
        <button
          className="join-class-btn"
          onClick={() => navigate("/classroom")} // ✅ navigate here too
        >
          Join Now
        </button>
      </section>

      {/* ===== ABOUT ===== */}
      <About/>
      
      {/* ===== CONTACT ===== */}
      <Contact/>

      {/* ===== FOOTER ===== */}
      {/* <Footer/> */}
    </div>
  );
};

export default Home;
