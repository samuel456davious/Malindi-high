import React, { useContext } from "react";
import { ThemeContext } from "../Authentication/ThemeContext";
import { Book, FlaskConical, Calculator, Globe, Users, Microscope, Code, Palette } from "lucide-react";
import "./Academics.css";

const Academics = () => {
  const { theme, isDark } = useContext(ThemeContext);

  const departments = [
    {
      icon: Book,
      title: "Languages & Humanities",
      subjects: ["English", "Kiswahili", "History", "Geography", "Literature"],
      link: "/departments/languages",
      stats: "5 Programs",
      color: "#3B82F6"
    },
    {
      icon: FlaskConical,
      title: "Sciences",
      subjects: ["Biology", "Chemistry", "Physics", "Agriculture"],
      link: "/departments/sciences",
      stats: "4 Labs",
      color: "#10B981"
    },
    {
      icon: Calculator,
      title: "Mathematics",
      subjects: ["Pure Mathematics", "Applied Mathematics", "Statistics"],
      link: "/departments/mathematics",
      stats: "Advanced Courses",
      color: "#F59E0B"
    },
    {
      icon: Globe,
      title: "Social Sciences",
      subjects: ["Business Studies", "Economics", "CRE/IRE", "Life Skills"],
      link: "/departments/social-sciences",
      stats: "4 Disciplines",
      color: "#EF4444"
    },
    {
      icon: Users,
      title: "Humanities",
      subjects: ["History", "Geography", "Social Studies", "Citizenship"],
      link: "/departments/humanities",
      stats: "Cultural Studies",
      color: "#8B5CF6"
    },
    {
      icon: Microscope,
      title: "Technical Sciences",
      subjects: ["Computer Studies", "Home Science", "Art & Design"],
      link: "/departments/technical",
      stats: "Practical Skills",
      color: "#06B6D4"
    },
    {
      icon: Code,
      title: "Technology",
      subjects: ["Computer Science", "ICT", "Programming", "Digital Literacy"],
      link: "/departments/technology",
      stats: "Digital Learning",
      color: "#6366F1"
    },
    {
      icon: Palette,
      title: "Creative Arts",
      subjects: ["Music", "Drama", "Art & Design", "Media Studies"],
      link: "/departments/creative-arts",
      stats: "Talent Development",
      color: "#EC4899"
    }
  ];

  return (
    <section 
      id="academics" 
      className={`academics-section ${isDark ? 'academics-dark' : 'academics-light'}`}
      style={{
        '--bg-primary': isDark ? '#0F172A' : '#FFFFFF',
        '--bg-secondary': isDark ? '#1E293B' : '#F9FAFB',
        '--text-primary': isDark ? '#F1F5F9' : '#1E293B',
        '--text-secondary': isDark ? '#CBD5E1' : '#475569',
        '--text-tertiary': isDark ? '#94A3B8' : '#64748B',
        '--border-primary': isDark ? '#334155' : '#E2E8F0',
        '--accent-blue': '#3B82F6',
        '--accent-green': '#10B981',
        '--accent-orange': '#F59E0B',
        '--accent-red': '#EF4444',
        '--accent-purple': '#8B5CF6',
        '--accent-cyan': '#06B6D4',
        '--accent-indigo': '#6366F1',
        '--accent-pink': '#EC4899'
      }}
    >
      <div className="academics-container">
        {/* Header Section */}
        <div className="academics-header">
          <div className="academics-badge">
            Curriculum
          </div>
          <h2>Academic Excellence</h2>
          <p>
            Our comprehensive curriculum is designed to prepare students for
            university and beyond, with qualified teachers and modern facilities in every department.
          </p>
          <div className="academics-stats">
            <div className="academic-stat-item">
              <span className="academic-stat-number">8</span>
              <span className="academic-stat-label">Departments</span>
            </div>
            <div className="academic-stat-item">
              <span className="academic-stat-number">25+</span>
              <span className="academic-stat-label">Subjects</span>
            </div>
            <div className="academic-stat-item">
              <span className="academic-stat-number">50+</span>
              <span className="academic-stat-label">Teachers</span>
            </div>
            <div className="academic-stat-item">
              <span className="academic-stat-number">100%</span>
              <span className="academic-stat-label">KCSE Ready</span>
            </div>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="academics-grid">
          {departments.map((dept, index) => (
            <div 
              key={index} 
              className="department-card"
              style={{
                '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
                '--card-hover': isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                '--accent-color': dept.color
              }}
            >
              {/* Card Header */}
              <div className="department-card-header">
                <div 
                  className="department-icon-wrapper"
                  style={{
                    background: `linear-gradient(135deg, ${dept.color}20, ${dept.color}10)`,
                    border: `1px solid ${dept.color}30`
                  }}
                >
                  <dept.icon 
                    size={28} 
                    color={dept.color}
                    className="department-icon-svg"
                  />
                </div>
                <div 
                  className="department-badge"
                  style={{ color: dept.color }}
                >
                  {dept.stats}
                </div>
              </div>

              {/* Card Content */}
              <div className="department-content">
                <h3>{dept.title}</h3>
                <ul className="subjects-list">
                  {dept.subjects.map((subject, idx) => (
                    <li key={idx}>
                      <span className="subject-bullet" style={{ color: dept.color }}>•</span>
                      {subject}
                    </li>
                  ))}
                </ul>
                
                {/* Progress Indicator */}
                <div className="department-progress">
                  <div 
                    className="progress-fill"
                    style={{
                      width: `${75 + (index * 3)}%`,
                      background: `linear-gradient(90deg, ${dept.color}, ${dept.color}DD)`
                    }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <div className="department-actions">
                <a 
                  href={dept.link} 
                  className="learn-more-btn"
                  style={{
                    '--btn-bg': dept.color,
                    '--btn-hover': `${dept.color}DD`
                  }}
                >
                  Explore Department
                  <span className="btn-arrow">→</span>
                </a>
              </div>

              {/* Hover Effect Overlay */}
              <div 
                className="card-hover-overlay"
                style={{
                  background: `linear-gradient(135deg, ${dept.color}15, transparent)`
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="academics-cta">
          <div className="academics-cta-content">
            <h3>Ready to Excel Academically?</h3>
            <p>Discover our comprehensive academic programs and join our community of learners.</p>
            <div className="academics-cta-buttons">
              <a href="/curriculum" className="academics-cta-btn primary">
                View Full Curriculum
              </a>
              <a href="/admissions" className="academics-cta-btn secondary">
                Admissions Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academics;