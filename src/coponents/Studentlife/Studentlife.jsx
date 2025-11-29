import React, { useContext } from "react";
import { ThemeContext } from "../Authentication/ThemeContext";
import { Trophy, Music, Palette, HeartHandshake, Users, BookOpen, Microscope, Globe } from "lucide-react";
import "./StudentLife.css";

const StudentLife = () => {
  const { theme, isDark } = useContext(ThemeContext);

  const activities = [
    {
      icon: Trophy,
      title: "Sports & Athletics",
      description: "Develop teamwork and leadership through football, rugby, basketball, hockey, handball, and more competitive sports.",
      stats: "12 Teams | 5 Championships",
      links: [
        { name: "Football", href: "/activities/football" },
        { name: "Rugby", href: "/activities/rugby" },
        { name: "Basketball", href: "/activities/basketball" },
        { name: "View All", href: "/activities/sports" },
      ],
      gradient: "from-blue-500 to-purple-600",
      color: "#3B82F6"
    },
    {
      icon: Music,
      title: "Music & Drama",
      description: "Express creativity through choir, drama club, school band, and cultural performances that showcase talent.",
      stats: "8 Performances | 3 Awards",
      links: [{ name: "Explore Programs", href: "/activities/music" }],
      gradient: "from-green-500 to-teal-600",
      color: "#10B981"
    },
    {
      icon: Palette,
      title: "Arts & Crafts",
      description: "Unleash artistic potential in visual arts, creative writing, photography, and digital media workshops.",
      stats: "4 Studios | Annual Exhibition",
      links: [{ name: "View Gallery", href: "/activities/arts" }],
      gradient: "from-orange-500 to-pink-600",
      color: "#F59E0B"
    },
    {
      icon: HeartHandshake,
      title: "Clubs & Societies",
      description: "Join diverse clubs including Debate, Science, Environmental, and Red Cross for holistic development.",
      stats: "15+ Clubs | Weekly Meetings",
      links: [{ name: "Browse Clubs", href: "/activities/clubs" }],
      gradient: "from-red-500 to-rose-600",
      color: "#EF4444"
    },
    {
      icon: Users,
      title: "Leadership Programs",
      description: "Develop essential leadership skills through student council, mentorship programs, and community initiatives.",
      stats: "50+ Leaders | Yearly Elections",
      links: [{ name: "Learn More", href: "/activities/leadership" }],
      gradient: "from-indigo-500 to-blue-600",
      color: "#6366F1"
    },
    {
      icon: Microscope,
      title: "STEM Clubs",
      description: "Explore science, technology, engineering, and mathematics through hands-on projects and competitions.",
      stats: "6 Labs | National Competitions",
      links: [{ name: "Join STEM", href: "/activities/stem" }],
      gradient: "from-cyan-500 to-blue-600",
      color: "#06B6D4"
    },
    {
      icon: BookOpen,
      title: "Literary Society",
      description: "Foster love for literature through book clubs, writing workshops, and poetry slam events.",
      stats: "Monthly Events | Writing Contests",
      links: [{ name: "Read More", href: "/activities/literary" }],
      gradient: "from-violet-500 to-purple-600",
      color: "#8B5CF6"
    },
    {
      icon: Globe,
      title: "Cultural Exchange",
      description: "Celebrate diversity through cultural festivals, international programs, and language clubs.",
      stats: "5 Languages | Global Partners",
      links: [{ name: "Discover Cultures", href: "/activities/cultural" }],
      gradient: "from-amber-500 to-orange-600",
      color: "#F59E0B"
    }
  ];

  return (
    <section 
      id="student-life" 
      className={`student-life-section ${isDark ? 'student-life-dark' : 'student-life-light'}`}
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
        '--accent-red': '#EF4444',
        '--accent-purple': '#8B5CF6',
        '--accent-cyan': '#06B6D4',
        '--accent-indigo': '#6366F1',
        '--accent-amber': '#F59E0B'
      }}
    >
      <div className="student-life-container">
        {/* Header Section */}
        <div className="student-life-header">
          <div className="header-badge">
            Campus Life
          </div>
          <h2>Student Life & Activities</h2>
          <p>
            Beyond academics, we offer a vibrant campus life with numerous
            opportunities for personal growth, leadership development, and creative expression.
          </p>
          <div className="stats-overview">
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Activities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15</span>
              <span className="stat-label">Clubs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">12</span>
              <span className="stat-label">Sports Teams</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Participation</span>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="student-life-grid">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="activity-card"
              style={{
                '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
                '--card-hover': isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                '--accent-color': activity.color
              }}
            >
              {/* Card Header with Icon */}
              <div className="activity-card-header">
                <div 
                  className="activity-icon-wrapper"
                  style={{
                    background: `linear-gradient(135deg, ${activity.color}20, ${activity.color}10)`,
                    border: `1px solid ${activity.color}30`
                  }}
                >
                  <activity.icon 
                    size={28} 
                    color={activity.color}
                    className="activity-icon-svg"
                  />
                </div>
                <div className="activity-badge">
                  {activity.stats}
                </div>
              </div>

              {/* Card Content */}
              <div className="activity-content">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                
                {/* Progress/Engagement Bar */}
                <div className="engagement-bar">
                  <div 
                    className="engagement-fill"
                    style={{
                      width: `${70 + (index * 5)}%`,
                      background: `linear-gradient(90deg, ${activity.color}, ${activity.color}DD)`
                    }}
                  ></div>
                </div>

                {/* Action Buttons */}
                <div className="activity-actions">
                  {activity.links.map((link, linkIndex) => (
                    <a 
                      key={linkIndex} 
                      href={link.href} 
                      className="activity-btn"
                      style={{
                        '--btn-bg': activity.color,
                        '--btn-hover': `${activity.color}DD`
                      }}
                    >
                      {link.name}
                      <span className="btn-arrow">→</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div 
                className="card-hover-overlay"
                style={{
                  background: `linear-gradient(135deg, ${activity.color}15, transparent)`
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="student-life-cta">
          <div className="cta-content">
            <h3>Ready to Get Involved?</h3>
            <p>Join our vibrant community and discover your passions beyond the classroom.</p>
            <div className="cta-buttons">
              <a href="/activities" className="cta-btn primary">
                Explore All Activities
              </a>
              <a href="/contact" className="cta-btn secondary">
                Contact Coordinator
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentLife;