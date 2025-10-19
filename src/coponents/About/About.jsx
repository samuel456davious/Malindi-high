import React from "react";
import { Award, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  const values = [
    {
      icon: <Award className="about-icon" />,
      title: "Academic Excellence",
      description:
        "Committed to providing world-class education with a focus on critical thinking and innovation.",
    },
    {
      icon: <Users className="about-icon" />,
      title: "Character Development",
      description:
        "Building integrity, discipline, and leadership skills in every student.",
    },
    {
      icon: <Target className="about-icon" />,
      title: "Holistic Growth",
      description:
        "Nurturing talents through sports, arts, and co-curricular activities.",
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* === HEADER === */}
        <div className="about-header">
          <h2>About Our School</h2>
          <p>
            Established in 1965, Malindi High School has been a beacon of
            learning excellence for decades, growing from 120 students to over
            1,200 students today.
          </p>
        </div>

        {/* === MISSION, VISION & MOTTO === */}
        <div className="about-values-wrapper">
          <div className="about-value-box mission">
            <h3>Our Mission</h3>
            <p>
              To enhance quality education through hard work and discipline to
              achieve set targets.
            </p>
          </div>

          <div className="about-value-box vision">
            <h3>Our Vision</h3>
            <p>
              To be a leading school in academic excellence and integrity.
            </p>
          </div>

          <div className="about-value-box motto">
            <h3>Our Motto</h3>
            <p>“Strive to Excel”</p>
          </div>
        </div>

        {/* === CORE VALUES === */}
        <div className="about-grid">
          {values.map((value, index) => (
            <div key={index} className="about-card">
              <div className="about-icon-wrapper">{value.icon}</div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>

        {/* === BUTTON === */}
        <div className="about-button">
          <Link to="/about">
            <button className="about-learn-btn">
              Learn More About Our History & Leadership
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
