import React from "react";
import { Link } from "react-router-dom";
import { Heart, Calendar, Users, BookOpen, Cross } from "lucide-react";
// import Navigation from "../Navigation";
// import Footer from "../Footer";
import "./Catholic.css";

const Catholic = () => {
  const ministries = [
    { icon: Cross, title: "Holy Mass", description: "Celebration of the Eucharist and sacraments" },
    { icon: BookOpen, title: "Catechesis", description: "Formation in Catholic faith and doctrine" },
    { icon: Users, title: "Prayer Groups", description: "Rosary, adoration, and communal prayer" },
    { icon: Heart, title: "Service & Charity", description: "Living out corporal and spiritual works of mercy" },
  ];

  return (
    <div className="catholic-page">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="catholic-hero">
        <div className="hero-content">
          <Link to="/chaplaincy" className="back-btn">← Back to Chaplaincy</Link>
          <div className="hero-icon">
            <Heart size={50} color="#dc2626" />
          </div>
          <h1>Catholic Community</h1>
          <p>
            A faith community rooted in apostolic tradition, centered on the Eucharist, and
            committed to forming disciples who serve God and neighbor with love and compassion.
          </p>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="schedule-section">
        <div className="schedule-card">
          <h2><Calendar size={24} /> Weekly Schedule</h2>

          <div className="schedule-item">
            <div>
              <h3>Sunday Mass</h3>
              <p>Holy Eucharist celebration</p>
            </div>
            <span>Sunday 8:00 AM - 9:30 AM</span>
          </div>

          <div className="schedule-item">
            <div>
              <h3>Weekday Mass</h3>
              <p>Daily Eucharistic celebration</p>
            </div>
            <span>Wednesday 6:00 AM - 6:45 AM</span>
          </div>

          <div className="schedule-item">
            <div>
              <h3>Catechism Class</h3>
              <p>Faith formation and teachings</p>
            </div>
            <span>Thursday 4:00 PM - 5:00 PM</span>
          </div>

          <div className="schedule-item">
            <div>
              <h3>Holy Rosary</h3>
              <p>Marian devotion and prayer</p>
            </div>
            <span>Friday 5:00 PM - 5:30 PM</span>
          </div>

          <div className="schedule-item">
            <div>
              <h3>Reconciliation</h3>
              <p>Sacrament of Confession</p>
            </div>
            <span>Saturday 3:00 PM - 4:00 PM</span>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="ministries-section">
        <h2>Our Ministries</h2>
        <div className="ministries-grid">
          {ministries.map((ministry, index) => {
            const Icon = ministry.icon;
            return (
              <div className="ministry-card" key={index}>
                <div className="ministry-icon">
                  <Icon size={28} color="#dc2626" />
                </div>
                <h3>{ministry.title}</h3>
                <p>{ministry.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Catholic Community</h2>
        <p>
          The Catholic community at Malindi High School offers students a rich spiritual life
          rooted in two millennia of Christian tradition. We gather to celebrate the sacraments,
          especially the Holy Eucharist, which is the source and summit of our faith.
        </p>
        <p>
          Through prayer, catechesis, and service, we help students grow in their understanding
          of Catholic doctrine and their personal relationship with Jesus Christ. Our community
          emphasizes the importance of the sacraments, devotion to Mary and the saints, and
          living the Gospel through acts of charity and justice.
        </p>

        <h3>The Seven Sacraments</h3>
        <ul>
          <li>Baptism — Initiation into the Church</li>
          <li>Confirmation — Strengthening of the Holy Spirit</li>
          <li>Holy Eucharist — Body and Blood of Christ</li>
          <li>Reconciliation — Forgiveness of sins</li>
          <li>Anointing of the Sick — Healing and comfort</li>
          <li>Holy Orders — Ordained ministry</li>
          <li>Matrimony — Sacrament of marriage</li>
        </ul>

        <h3>Join Us</h3>
        <p>
          All students are welcome to participate in Mass and other Catholic activities.
          For spiritual guidance, sacramental preparation, or more information, please
          contact the Catholic chaplain.
        </p>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Catholic;
