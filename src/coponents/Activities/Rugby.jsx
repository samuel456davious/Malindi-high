import React from "react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
import { Trophy, Calendar, Users, Award } from "lucide-react";
import "./Rugby.css";

const Rugby = () => {
  return (
    <div className="rugby-page">
      {/* <Navigation /> */}

      <main className="rugby-main">
        <div className="rugby-container">
          {/* Hero Section */}
          <div className="rugby-header">
            <div className="rugby-icon">
              <Trophy className="rugby-icon-svg" />
            </div>
            <h1 className="rugby-title">Rugby Team</h1>
            <p className="rugby-subtitle">
              Building champions on and off the field through teamwork, discipline, and excellence
            </p>
          </div>

          {/* Overview Cards */}
          <div className="rugby-grid">
            <div className="rugby-card">
              <Users className="rugby-card-icon" />
              <h3 className="rugby-card-title">Team Size</h3>
              <p className="rugby-card-text">45+ Active Members</p>
            </div>

            <div className="rugby-card">
              <Calendar className="rugby-card-icon" />
              <h3 className="rugby-card-title">Practice Days</h3>
              <p className="rugby-card-text">Monday, Wednesday, Friday</p>
            </div>

            <div className="rugby-card">
              <Award className="rugby-card-icon" />
              <h3 className="rugby-card-title">Achievements</h3>
              <p className="rugby-card-text">Regional Champions 2024</p>
            </div>
          </div>

          {/* About Section */}
          <div className="rugby-section">
            <h2 className="rugby-section-title">About Our Rugby Program</h2>
            <p>
              The Malindi High School Rugby Team has been a cornerstone of our athletic program since 1995.
              We pride ourselves on developing not just skilled players, but well-rounded individuals who
              embody the values of respect, discipline, and teamwork.
            </p>
            <p>
              Our program welcomes students of all skill levels, from beginners to experienced players.
              Under the guidance of our experienced coaches, students learn fundamental rugby skills,
              game strategies, and the importance of physical fitness and mental toughness.
            </p>
            <p>
              We compete in the regional school rugby league and have won multiple championships.
              Beyond competition, we emphasize character development, leadership skills, and creating
              lifelong friendships.
            </p>
          </div>

          {/* Training Schedule */}
          <div className="rugby-section">
            <h2 className="rugby-section-title">Training Schedule</h2>
            <div className="rugby-schedule">
              <div className="rugby-schedule-item">
                <div className="rugby-schedule-day">Monday</div>
                <div>
                  <p className="rugby-schedule-title">Skills Training</p>
                  <p className="rugby-schedule-time">3:30 PM - 5:30 PM | Main Field</p>
                </div>
              </div>

              <div className="rugby-schedule-item">
                <div className="rugby-schedule-day">Wednesday</div>
                <div>
                  <p className="rugby-schedule-title">Tactical Training & Scrimmage</p>
                  <p className="rugby-schedule-time">3:30 PM - 5:30 PM | Main Field</p>
                </div>
              </div>

              <div className="rugby-schedule-item">
                <div className="rugby-schedule-day">Friday</div>
                <div>
                  <p className="rugby-schedule-title">Conditioning & Team Building</p>
                  <p className="rugby-schedule-time">3:30 PM - 5:30 PM | Main Field</p>
                </div>
              </div>

              <div className="rugby-schedule-item">
                <div className="rugby-schedule-day">Saturday</div>
                <div>
                  <p className="rugby-schedule-title">Match Days / Extra Training</p>
                  <p className="rugby-schedule-time">Time varies based on schedule</p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Section */}
          <div className="rugby-join">
            <h2 className="rugby-section-title">Join the Team</h2>
            <p className="rugby-join-text">
              Interested in joining the rugby team? We welcome new members throughout the year.
              Contact our coach or visit the sports office for more information.
            </p>
            <div className="rugby-contact">
              <p><strong>Coach:</strong> Mr. James Kimani</p>
              <p><strong>Email:</strong> rugby@malindihigh.ac.ke</p>
              <p><strong>Office:</strong> Sports Complex, Room 12</p>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Rugby;
