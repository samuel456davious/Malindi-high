import React from "react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
import { Trophy, Calendar, Users, Award } from "lucide-react";
import "./Hockey.css";

const Hockey = () => {
  return (
    <div className="hockey-page">
      {/* <Navigation /> */}

      <main className="hockey-main">
        <div className="hockey-container">
          {/* Header Section */}
          <div className="hockey-header">
            <div className="hockey-icon">
              <Trophy className="hockey-icon-svg" />
            </div>
            <h1 className="hockey-title">Hockey Team</h1>
            <p className="hockey-subtitle">
              Speed, skill, and strategy — excellence on the hockey field
            </p>
          </div>

          {/* Info Cards */}
          <div className="hockey-grid">
            <div className="hockey-card">
              <Users className="hockey-card-icon" />
              <h3 className="hockey-card-title">Team Size</h3>
              <p className="hockey-card-text">30+ Active Players</p>
            </div>

            <div className="hockey-card">
              <Calendar className="hockey-card-icon" />
              <h3 className="hockey-card-title">Practice Days</h3>
              <p className="hockey-card-text">Tuesday, Thursday, Saturday</p>
            </div>

            <div className="hockey-card">
              <Award className="hockey-card-icon" />
              <h3 className="hockey-card-title">Achievements</h3>
              <p className="hockey-card-text">Regional Tournament Finalists</p>
            </div>
          </div>

          {/* About Section */}
          <div className="hockey-section">
            <h2 className="hockey-section-title">About Our Hockey Program</h2>
            <p>
              The Malindi High School Hockey Team combines speed, skill, and strategic thinking to
              compete at the highest levels. Our program has been developing talented hockey players
              since 2005, with many alumni going on to play at regional and national competitions.
            </p>
            <p>
              We train on a dedicated hockey field with quality equipment and professional coaching.
              Our training focuses on stick skills, ball control, tactical positioning, and physical
              conditioning. We emphasize both offensive creativity and defensive discipline.
            </p>
            <p>
              Hockey teaches invaluable lessons in teamwork, quick decision-making, and perseverance.
              Whether you're a complete beginner or have experience with the sport, our program offers
              a supportive environment to develop your skills and passion for the game.
            </p>
          </div>

          {/* Training Schedule */}
          <div className="hockey-section">
            <h2 className="hockey-section-title">Training Schedule</h2>
            <div className="hockey-schedule">
              <div className="hockey-schedule-item">
                <div className="hockey-schedule-day">Tuesday</div>
                <div>
                  <p className="hockey-schedule-title">Skills Development</p>
                  <p className="hockey-schedule-time">
                    3:30 PM - 5:30 PM | Hockey Field
                  </p>
                </div>
              </div>

              <div className="hockey-schedule-item">
                <div className="hockey-schedule-day">Thursday</div>
                <div>
                  <p className="hockey-schedule-title">Tactical Training & Drills</p>
                  <p className="hockey-schedule-time">
                    3:30 PM - 5:30 PM | Hockey Field
                  </p>
                </div>
              </div>

              <div className="hockey-schedule-item">
                <div className="hockey-schedule-day">Saturday</div>
                <div>
                  <p className="hockey-schedule-title">Match Practice & Conditioning</p>
                  <p className="hockey-schedule-time">
                    9:00 AM - 11:00 AM | Hockey Field
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Section */}
          <div className="hockey-join">
            <h2 className="hockey-section-title">Join the Team</h2>
            <p className="hockey-join-text">
              Interested in hockey? We provide all the necessary equipment for beginners.
              Come try out and discover the excitement of this fast-paced sport!
            </p>
            <div className="hockey-contact">
              <p><strong>Coach:</strong> Mrs. Elizabeth Chebet</p>
              <p><strong>Email:</strong> hockey@malindihigh.ac.ke</p>
              <p><strong>Office:</strong> Sports Complex, Room 14</p>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Hockey;
