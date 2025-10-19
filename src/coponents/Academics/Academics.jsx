import React from "react";
import { Book, FlaskConical, Calculator, Globe } from "lucide-react";
import "./Academics.css";

const Academics = () => {
  const departments = [
    {
      icon: Book,
      title: "Languages & Humanities",
      subjects: ["English", "Kiswahili", "History", "Geography"],
      link: "/departments/languages",
    },
    {
      icon: FlaskConical,
      title: "Sciences",
      subjects: ["Biology", "Chemistry", "Physics"],
      link: "/departments/sciences",
    },
    {
      icon: Calculator,
      title: "Mathematics",
      subjects: ["Pure Mathematics", "Applied Mathematics"],
      link: "/departments/mathematics",
    },
    {
      icon: Globe,
      title: "Social Sciences",
      subjects: ["Business Studies", "Economics", "CRE/IRE"],
      link: "/departments/social-sciences",
    },
  ];

  return (
    <section id="academics" className="academics-section">
      <div className="academics-container">
        <div className="academics-header">
          <h2>Academic Programs</h2>
          <p>
            Our comprehensive curriculum is designed to prepare students for
            university and beyond, with qualified teachers in every department.
          </p>
        </div>

        <div className="academics-grid">
          {departments.map((dept, index) => (
            <div key={index} className="department-card">
              <div className="department-icon">
                <dept.icon size={28} color="#1565c0" />
              </div>
              <h3>{dept.title}</h3>
              <ul>
                {dept.subjects.map((subject, idx) => (
                  <li key={idx}>• {subject}</li>
                ))}
              </ul>
              <a href={dept.link} className="learn-more-btn">
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Academics;
