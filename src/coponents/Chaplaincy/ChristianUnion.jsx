import React from "react";
import { Link } from "react-router-dom";
import { Cross, Calendar, Users, BookOpen, Music } from "lucide-react";
// import Navigation from "../Navigation";
// import Footer from "../Footer";
import "./ChristianUnion.css";

const ChristianUnion = () => {
  const activities = [
    { icon: BookOpen, title: "Bible Study", description: "Weekly interactive sessions exploring Scripture" },
    { icon: Music, title: "Praise & Worship", description: "Uplifting worship sessions every Friday" },
    { icon: Users, title: "Fellowship", description: "Building community through shared faith" },
    { icon: Calendar, title: "Outreach Programs", description: "Serving the community with love" },
  ];

  return (
    <div className="cu-page">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="cu-hero">
        <div className="cu-hero-content">
          <Link to="/chaplaincy" className="cu-back-btn">← Back to Chaplaincy</Link>
          <div className="cu-hero-icon">
            <Cross size={50} color="#2563eb" />
          </div>
          <h1>Christian Union (CU)</h1>
          <p>
            A dynamic fellowship of students united in Christ, committed to spiritual growth,
            evangelism, and making a positive impact on our school and community.
          </p>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="cu-schedule">
        <div className="cu-schedule-card">
          <h2><Calendar size={24} /> Weekly Schedule</h2>

          <div className="cu-schedule-item">
            <div>
              <h3>Main Fellowship</h3>
              <p>Worship, prayer, and teaching</p>
            </div>
            <span>Friday 4:00 PM - 6:00 PM</span>
          </div>

          <div className="cu-schedule-item">
            <div>
              <h3>Bible Study Groups</h3>
              <p>Small group discussions</p>
            </div>
            <span>Tuesday 5:00 PM - 6:00 PM</span>
          </div>

          <div className="cu-schedule-item">
            <div>
              <h3>Prayer Meeting</h3>
              <p>Corporate prayer and intercession</p>
            </div>
            <span>Wednesday 6:00 AM - 7:00 AM</span>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="cu-activities">
        <h2>Our Activities</h2>
        <div className="cu-activities-grid">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div className="cu-activity-card" key={index}>
                <div className="cu-activity-icon">
                  <Icon size={28} color="#2563eb" />
                </div>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="cu-about">
        <h2>About Christian Union</h2>
        <p>
          The Christian Union at Malindi High School is a student-led organization that provides
          a safe space for spiritual growth and fellowship. We believe in the power of prayer,
          the authority of Scripture, and the transformative love of Jesus Christ.
        </p>
        <p>
          Our mission is to evangelize, disciple, and equip students to live out their faith
          boldly in school and beyond. Through worship, teaching, and community service, we
          strive to be salt and light in our generation.
        </p>

        <h3>Contact the CU Leadership</h3>
        <p>
          For more information or to get involved, speak with any CU member or visit the Chaplain's office.
        </p>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default ChristianUnion;
