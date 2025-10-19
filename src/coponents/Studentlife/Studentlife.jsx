import React from "react";
import { Trophy, Music, Palette, HeartHandshake } from "lucide-react";
import "./StudentLife.css";

const StudentLife = () => {
  const activities = [
    {
      icon: Trophy,
      title: "Sports & Athletics",
      description: "Football, Rugby, Basketball, Hockey, Handball, and more",
      links: [
        { name: "Football", href: "/activities/football" },
        { name: "Rugby", href: "/activities/rugby" },
        { name: "Basketball", href: "/activities/basketball" },
        { name: "Hockey", href: "/activities/hockey" },
        { name: "Handball", href: "/activities/handball" },
      ],
    },
    {
      icon: Music,
      title: "Music & Drama",
      description: "Choir, Drama Club, School Band, and Cultural Performances",
      links: [{ name: "Explore Music & Drama", href: "/activities/music" }],
    },
    {
      icon: Palette,
      title: "Arts & Crafts",
      description: "Visual Arts, Creative Writing, Photography",
      links: [{ name: "Explore Arts & Crafts", href: "/activities/arts" }],
    },
    {
      icon: HeartHandshake,
      title: "Clubs & Societies",
      description: "Debate Club, Science Club, Environmental Club, Red Cross",
      links: [{ name: "View All Clubs", href: "/activities/clubs" }],
    },
  ];

  return (
    <section id="student-life" className="student-life-section">
      <div className="student-life-container">
        <div className="student-life-header">
          <h2>Student Life</h2>
          <p>
            Beyond academics, we offer a vibrant campus life with numerous
            opportunities for personal growth and discovery.
          </p>
        </div>

        <div className="student-life-grid">
          {activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <div className="activity-icon">
                <activity.icon size={32} color="#00695c" />
              </div>
              <div className="activity-content">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <div className="activity-buttons">
                  {activity.links.map((link, linkIndex) => (
                    <a key={linkIndex} href={link.href} className="activity-btn">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentLife;
