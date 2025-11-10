// Updated Football component with enhanced UI
import React from "react";
import { Trophy, Calendar, Users, Award } from "lucide-react";
import "./Football.css";

const Football = () => {
  return (
    <div className="football-page">
      <main className="football-main">
        <div className="football-container">
          {/* Header Section */}
          <div className="football-header">
            <div className="football-icon">
              <Trophy className="football-icon-svg" />
            </div>
            <h1 className="football-title">Football Team</h1>
            <p className="football-subtitle">
              Where passion meets teamwork - building champions through the beautiful game
            </p>
          </div>

          {/* Stats Cards */}
          <div className="football-grid">
            <div className="football-card">
              <Users className="football-card-icon" />
              <h3 className="football-card-title">Team Size</h3>
              <p className="football-card-text">50+ Active Players</p>
            </div>

            <div className="football-card">
              <Calendar className="football-card-icon" />
              <h3 className="football-card-title">Practice Days</h3>
              <p className="football-card-text">Monday, Wednesday, Friday</p>
            </div>

            <div className="football-card">
              <Award className="football-card-icon" />
              <h3 className="football-card-title">Achievements</h3>
              <p className="football-card-text">County Champions 2024</p>
            </div>
          </div>

          {/* About Section */}
          <div className="football-section">
            <h2 className="football-section-title">About Our Football Program</h2>
            <p>
              The Malindi High School Football Team is one of our most celebrated sporting programs.
              With a rich history spanning over three decades, we have produced talented players who
              have gone on to represent regional and national teams.
            </p>
            <p>
              Our program emphasizes technical skills, tactical awareness, physical fitness, and mental
              strength. We train on a well-maintained football pitch and have access to modern training
              equipment. Our experienced coaching staff works with players of all levels, from beginners
              to advanced athletes.
            </p>
            <p>
              We compete in the county and regional school leagues, regularly reaching championship
              finals. Beyond competition, we focus on developing character, leadership, and teamwork
              skills that serve our players throughout their lives.
            </p>
          </div>

          {/* Training Schedule */}
          <div className="football-section">
            <h2 className="football-section-title">Training Schedule</h2>

            <div className="football-schedule">
              <div className="football-schedule-item">
                <div className="football-schedule-day">Monday</div>
                <div>
                  <p className="football-schedule-title">Technical Training</p>
                  <p className="football-schedule-time">3:30 PM - 5:30 PM | Football Field</p>
                </div>
              </div>

              <div className="football-schedule-item">
                <div className="football-schedule-day">Wednesday</div>
                <div>
                  <p className="football-schedule-title">Tactical Training & Match Play</p>
                  <p className="football-schedule-time">3:30 PM - 5:30 PM | Football Field</p>
                </div>
              </div>

              <div className="football-schedule-item">
                <div className="football-schedule-day">Friday</div>
                <div>
                  <p className="football-schedule-title">Fitness & Team Bonding</p>
                  <p className="football-schedule-time">3:30 PM - 5:30 PM | Football Field</p>
                </div>
              </div>

              <div className="football-schedule-item">
                <div className="football-schedule-day">Saturday</div>
                <div>
                  <p className="football-schedule-title">League Matches</p>
                  <p className="football-schedule-time">Time varies based on fixtures</p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Section */}
          <div className="football-join">
            <h2 className="football-section-title">Join the Team</h2>
            <p className="football-join-text">
              Passionate about football? Join our team and be part of a winning tradition.
              We welcome players of all skill levels and positions.
            </p>
            <div className="football-contact">
              <p><strong>Coach:</strong> Mr. John Omondi</p>
              <p><strong>Email:</strong> football@malindihigh.ac.ke</p>
              <p><strong>Office:</strong> Sports Complex, Room 10</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Football;