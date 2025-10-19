import React from "react";
import { Link } from "react-router-dom";
import { Cross, Church, Heart, Moon } from "lucide-react";
// import Navigation from "../Navigation";
// import Footer from "../Footer";
import "./Chaplaincy.css";

const Chaplaincy = () => {
  const denominations = [
    {
      name: "Christian Union (CU)",
      description:
        "A vibrant community of students committed to growing in faith, fellowship, and service through prayer, Bible study, and outreach programs.",
      icon: Cross,
      link: "/chaplaincy/christian-union",
      color: "blue",
    },
    {
      name: "Seventh-day Adventist (SDA)",
      description:
        "Dedicated to spiritual growth through Sabbath worship, health ministry, and community service guided by biblical principles.",
      icon: Church,
      link: "/chaplaincy/sda",
      color: "green",
    },
    {
      name: "Catholic",
      description:
        "A faith community centered on the Eucharist, prayer, and Catholic traditions, fostering spiritual development and service to others.",
      icon: Heart,
      link: "/chaplaincy/catholic",
      color: "red",
    },
    {
      name: "Islamic Community",
      description:
        "A community dedicated to spiritual growth through submission to Allah, following the teachings of the Holy Quran and Prophet Muhammad (PBUH).",
      icon: Moon,
      link: "/chaplaincy/islamic",
      color: "emerald",
    },
  ];

  return (
    <div className="chaplaincy-page">
      {/* <Navigation /> */}

      {/* Hero Section */}
      <section className="chaplaincy-hero">
        <div className="hero-content">
          <h1>Chaplaincy & Spiritual Life</h1>
          <p>
            At Malindi High School, we nurture the spiritual growth of our students through diverse faith
            communities, fostering faith, values, and character development in a supportive and inclusive
            environment.
          </p>
        </div>
      </section>

      {/* Denominations Grid */}
      <section className="chaplaincy-grid">
        <div className="grid-container">
          {denominations.map((denom, index) => {
            const Icon = denom.icon;
            return (
              <div key={index} className="faith-card">
                <div className={`icon-circle ${denom.color}`}>
                  <Icon size={36} />
                </div>
                <h2>{denom.name}</h2>
                <p>{denom.description}</p>
                <Link to={denom.link} className="learn-btn">
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <div className="mission-card">
          <h3>Our Mission</h3>
          <p>
            The Chaplaincy at Malindi High School provides spiritual guidance, pastoral care, and opportunities
            for worship and fellowship. We welcome students from all faith backgrounds to explore their beliefs,
            develop moral values, and serve their community with compassion and integrity.
          </p>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Chaplaincy;
