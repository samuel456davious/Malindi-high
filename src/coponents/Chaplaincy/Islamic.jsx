import React from "react";
import { Link } from "react-router-dom";
import { Moon, Calendar, BookOpen, Users, Heart } from "lucide-react";
// import Navigation from "../Navigation";
// import Footer from "../Footer";
import "./Islamic.css";

const Islamic = () => {
  const pillars = [
    { icon: BookOpen, title: "Quran Study", description: "Learning and reflecting on the Holy Quran" },
    { icon: Moon, title: "Daily Prayers", description: "Observing the five daily Salah" },
    { icon: Users, title: "Community", description: "Building brotherhood and sisterhood in faith" },
    { icon: Heart, title: "Service", description: "Serving humanity with compassion" },
  ];

  return (
    <div className="islamic-page">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="islamic-hero">
        <div className="islamic-hero-content">
          <Link to="/chaplaincy" className="islamic-back-btn">← Back to Chaplaincy</Link>
          <div className="islamic-hero-icon">
            <Moon size={50} color="#059669" />
          </div>
          <h1>Islamic Community</h1>
          <p>
            A community dedicated to spiritual growth through submission to Allah,
            following the teachings of the Holy Quran and the Prophet Muhammad (Peace Be Upon Him).
          </p>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="islamic-schedule">
        <div className="islamic-schedule-card">
          <h2><Calendar size={24} /> Weekly Schedule</h2>

          <div className="islamic-schedule-item">
            <div>
              <h3>Jumu'ah (Friday Prayer)</h3>
              <p>Congregational Friday prayer and sermon</p>
            </div>
            <span>Friday 1:00 PM - 2:00 PM</span>
          </div>

          <div className="islamic-schedule-item">
            <div>
              <h3>Quran Study Circle</h3>
              <p>Recitation and understanding of the Quran</p>
            </div>
            <span>Tuesday 4:00 PM - 5:30 PM</span>
          </div>

          <div className="islamic-schedule-item">
            <div>
              <h3>Islamic Studies</h3>
              <p>Learning Hadith, Seerah, and Fiqh</p>
            </div>
            <span>Thursday 4:00 PM - 5:30 PM</span>
          </div>

          <div className="islamic-schedule-item">
            <div>
              <h3>Daily Prayer Times</h3>
              <p>Five daily Salah available in prayer room</p>
            </div>
            <span>Check prayer times</span>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="islamic-activities">
        <h2>Our Focus Areas</h2>
        <div className="islamic-activities-grid">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div className="islamic-activity-card" key={index}>
                <div className="islamic-activity-icon">
                  <Icon size={28} color="#059669" />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="islamic-about">
        <h2>About Islamic Community</h2>
        <p>
          The Islamic community at Malindi High School provides a supportive environment for
          Muslim students to practice their faith, deepen their understanding of Islam,
          and develop strong moral character grounded in Islamic values.
        </p>
        <p>
          We offer regular prayers, Quranic studies, Islamic education, and opportunities for
          fellowship. Our community emphasizes the importance of knowledge, compassion,
          and service to humanity as taught by the Prophet Muhammad (PBUH).
        </p>

        <h3>The Five Pillars of Islam:</h3>
        <ul className="islamic-pillars-list">
          <li>Shahada – Declaration of faith in One God (Allah) and His Messenger</li>
          <li>Salah – Five daily prayers facing Makkah</li>
          <li>Zakat – Charitable giving to those in need</li>
          <li>Sawm – Fasting during the month of Ramadan</li>
          <li>Hajj – Pilgrimage to Makkah once in a lifetime if able</li>
        </ul>
      </section>

      {/* Prayer Room */}
      <section className="islamic-prayerroom">
        <h2>Prayer Room Facilities</h2>
        <p>
          A dedicated prayer room is available for students to perform their daily prayers.
          The room is equipped with prayer mats, Qibla direction markers, and ablution facilities.
        </p>
        <h3>Contact:</h3>
        <p>
          For more information about Islamic programs, prayer times, or to speak with the Islamic chaplain,
          please visit the Chaplaincy office.
        </p>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Islamic;
