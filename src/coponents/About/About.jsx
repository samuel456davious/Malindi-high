import React, { useContext } from "react";
import { ThemeContext } from "../Authentication/ThemeContext";
import { Award, Users, Target, BookOpen, Heart, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  const { theme, isDark } = useContext(ThemeContext);

  const values = [
    {
      icon: <Award className="about-icon" />,
      title: "Academic Excellence",
      description: "Committed to providing world-class education with a focus on critical thinking and innovation.",
      stats: "98% Success Rate",
      color: "#3B82F6"
    },
    {
      icon: <Users className="about-icon" />,
      title: "Character Development",
      description: "Building integrity, discipline, and leadership skills in every student.",
      stats: "50+ Leadership Programs",
      color: "#10B981"
    },
    {
      icon: <Target className="about-icon" />,
      title: "Holistic Growth",
      description: "Nurturing talents through sports, arts, and co-curricular activities.",
      stats: "30+ Activities",
      color: "#F59E0B"
    },
    {
      icon: <BookOpen className="about-icon" />,
      title: "Quality Education",
      description: "Innovative teaching methods and modern learning facilities.",
      stats: "Modern Facilities",
      color: "#8B5CF6"
    },
    {
      icon: <Heart className="about-icon" />,
      title: "Community Focus",
      description: "Fostering a supportive and inclusive learning environment.",
      stats: "Inclusive Community",
      color: "#EF4444"
    },
    {
      icon: <Globe className="about-icon" />,
      title: "Global Perspective",
      description: "Preparing students for success in a connected world.",
      stats: "Global Standards",
      color: "#06B6D4"
    }
  ];

  return (
    <section 
      id="about" 
      className={`about-section ${isDark ? 'about-dark' : 'about-light'}`}
      style={{
        '--bg-primary': isDark ? '#0F172A' : '#FFFFFF',
        '--bg-secondary': isDark ? '#1E293B' : '#F8FAFC',
        '--text-primary': isDark ? '#F1F5F9' : '#1E293B',
        '--text-secondary': isDark ? '#CBD5E1' : '#475569',
        '--text-tertiary': isDark ? '#94A3B8' : '#64748B',
        '--border-primary': isDark ? '#334155' : '#E2E8F0',
        '--accent-blue': '#3B82F6',
        '--accent-green': '#10B981',
        '--accent-orange': '#F59E0B',
        '--accent-purple': '#8B5CF6',
        '--accent-red': '#EF4444',
        '--accent-cyan': '#06B6D4'
      }}
    >
      <div className="about-container">
        {/* === HEADER === */}
        <div className="about-header">
          <div className="about-badge">
            Established 1965
          </div>
          <h2>About Malindi High School</h2>
          <p>
            For over five decades, Malindi High School has been a beacon of 
            educational excellence, growing from 120 pioneering students to a 
            vibrant community of over 1,200 learners today.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1,200+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Qualified Staff</span>
            </div>
          </div>
        </div>

        {/* === MISSION, VISION & MOTTO === */}
        <div className="about-values-wrapper">
          <div 
            className="about-value-box mission"
            style={{
              '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
              '--accent-color': '#3B82F6'
            }}
          >
            <div className="value-icon">
              <Target size={24} color="#3B82F6" />
            </div>
            <h3>Our Mission</h3>
            <p>
              To enhance quality education through hard work and discipline to 
              achieve set targets and nurture responsible global citizens.
            </p>
          </div>

          <div 
            className="about-value-box vision"
            style={{
              '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
              '--accent-color': '#10B981'
            }}
          >
            <div className="value-icon">
              <Globe size={24} color="#10B981" />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be a leading institution in academic excellence, character 
              development, and innovation in East Africa.
            </p>
          </div>

          <div 
            className="about-value-box motto"
            style={{
              '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
              '--accent-color': '#F59E0B'
            }}
          >
            <div className="value-icon">
              <Award size={24} color="#F59E0B" />
            </div>
            <h3>Our Motto</h3>
            <p>"Strive to Excel"</p>
            <div className="motto-subtitle">
              In Learning, Character, and Life
            </div>
          </div>
        </div>

        {/* === CORE VALUES === */}
        <div className="about-grid">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="about-card"
              style={{
                '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
                '--card-hover': isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                '--accent-color': value.color
              }}
            >
              <div 
                className="about-icon-wrapper"
                style={{
                  background: `linear-gradient(135deg, ${value.color}20, ${value.color}10)`,
                  border: `1px solid ${value.color}30`
                }}
              >
                {value.icon}
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
              <div 
                className="value-stats"
                style={{ color: value.color }}
              >
                {value.stats}
              </div>
              <div 
                className="card-hover-effect"
                style={{
                  background: `linear-gradient(135deg, ${value.color}15, transparent)`
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* === CALL TO ACTION === */}
        <div className="about-cta">
          <div className="cta-content">
            <h3>Discover Our Legacy</h3>
            <p>
              Explore our rich history, meet our dedicated leadership team, 
              and learn what makes Malindi High School a premier educational institution.
            </p>
            <div className="cta-buttons">
              <Link to="/about" className="cta-btn primary">
                Explore Our History
              </Link>
              <Link to="/leadership" className="cta-btn secondary">
                Meet Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;