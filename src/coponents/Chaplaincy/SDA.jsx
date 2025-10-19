import React from "react";
import { Link } from "react-router-dom";
import { Church, Calendar, Heart, BookOpen, Sun, Users } from "lucide-react";
// import Navigation from "../Navigation";
// import Footer from "../Footer";
import "./SDA.css";

const SDA = () => {
  const pillars = [
    { icon: BookOpen, title: "Bible Study", description: "Deep exploration of Scripture and prophetic truth" },
    { icon: Heart, title: "Health Ministry", description: "Promoting physical and spiritual wellness" },
    { icon: Sun, title: "Sabbath Worship", description: "Honoring the seventh day as holy unto the Lord" },
    { icon: Users, title: "Community Service", description: "Serving others with compassion" },
  ];

  return (
    <div className="sda-page">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="sda-hero">
        <div className="sda-hero-content">
          <Link to="/chaplaincy" className="sda-back-btn">← Back to Chaplaincy</Link>
          <div className="sda-hero-icon">
            <Church size={50} color="#16a34a" />
          </div>
          <h1>Seventh-day Adventist (SDA)</h1>
          <p>
            A community dedicated to holistic growth—spiritual, physical, and mental—rooted in 
            biblical principles and the blessed hope of Christ's soon return.
          </p>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="sda-schedule">
        <div className="sda-schedule-card">
          <h2><Calendar size={24} /> Weekly Schedule</h2>

          <div className="sda-schedule-item">
            <div>
              <h3>Sabbath School</h3>
              <p>Interactive Bible study and discussion</p>
            </div>
            <span>Saturday 9:00 AM - 10:30 AM</span>
          </div>

          <div className="sda-schedule-item">
            <div>
              <h3>Divine Worship Service</h3>
              <p>Sabbath worship and sermon</p>
            </div>
            <span>Saturday 11:00 AM - 1:00 PM</span>
          </div>

          <div className="sda-schedule-item">
            <div>
              <h3>Adventist Youth (AY)</h3>
              <p>Youth programs and activities</p>
            </div>
            <span>Saturday 3:00 PM - 5:00 PM</span>
          </div>

          <div className="sda-schedule-item">
            <div>
              <h3>Prayer & Vespers</h3>
              <p>Evening reflection and prayer</p>
            </div>
            <span>Friday 5:30 PM - 6:30 PM</span>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="sda-pillars">
        <h2>Our Pillars</h2>
        <div className="sda-pillars-grid">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div className="sda-pillar-card" key={index}>
                <div className="sda-pillar-icon">
                  <Icon size={28} color="#16a34a" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="sda-about">
        <h2>About SDA at Malindi High</h2>
        <p>
          The Seventh-day Adventist community at Malindi High School is committed to nurturing 
          students in their relationship with God through comprehensive spiritual education, 
          healthful living, and service to others.
        </p>
        <p>
          We observe the seventh-day Sabbath (Saturday) as a day of rest, worship, and fellowship, 
          following the biblical example. Our programs emphasize the importance of Scripture study, 
          prayer, health reform, and preparing for Christ's second coming.
        </p>

        <h3>Core Beliefs:</h3>
        <ul className="sda-beliefs">
          <li>The authority of Scripture as God's revealed Word</li>
          <li>Salvation through faith in Jesus Christ alone</li>
          <li>The seventh-day Sabbath as a memorial of Creation</li>
          <li>Holistic health principles for body, mind, and spirit</li>
          <li>The imminent second coming of Christ</li>
        </ul>

        <h3>Get Involved:</h3>
        <p>
          Contact the SDA chaplain or any member to learn more about our programs and how you can participate.
        </p>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default SDA;
