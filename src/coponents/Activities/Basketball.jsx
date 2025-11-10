import React from "react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
import { Trophy, Calendar, Users, Award } from "lucide-react";
import "./Basketball.css";

const Basketball = () => {
  return (
    <div className="basketball-page">
      {/* <Navigation /> */}

      <main className="basketball-main">
        <div className="basketball-container">
          {/* Header Section */}
          <div className="basketball-header">
            <div className="basketball-icon">
              <Trophy className="basketball-icon-svg" />
            </div>
            <h1 className="basketball-title">Basketball Team</h1>
            <p className="basketball-subtitle">
              Shooting for excellence, playing with heart, winning with integrity
            </p>
          </div>

          {/* Info Cards */}
          <div className="basketball-grid">
            <div className="basketball-card">
              <Users className="basketball-card-icon" />
              <h3 className="basketball-card-title">Team Size</h3>
              <p className="basketball-card-text">35+ Active Players</p>
            </div>

            <div className="basketball-card">
              <Calendar className="basketball-card-icon" />
              <h3 className="basketball-card-title">Practice Days</h3>
              <p className="basketball-card-text">Tuesday, Thursday, Saturday</p>
            </div>

            <div className="basketball-card">
              <Award className="basketball-card-icon" />
              <h3 className="basketball-card-title">Achievements</h3>
              <p className="basketball-card-text">County League Runners-up 2024</p>
            </div>
          </div>

          {/* About Section */}
          <div className="basketball-section">
            <h2 className="basketball-section-title">About Our Basketball Program</h2>
            <p>
              The Malindi High School Basketball program has been developing talented athletes since 2000.
              Our state-of-the-art indoor court provides the perfect environment for year-round training
              and competition.
            </p>
            <p>
              We focus on developing fundamental skills including dribbling, shooting, passing, and defense,
              while also emphasizing teamwork, sportsmanship, and physical fitness. Our teams compete in
              regional tournaments and have consistently ranked among the top schools in the county.
            </p>
            <p>
              Whether you're a beginner learning the basics or an experienced player looking to refine
              your skills, our program offers the coaching and facilities to help you reach your potential.
            </p>
          </div>

          {/* Training Schedule */}
          <div className="basketball-section">
            <h2 className="basketball-section-title">Training Schedule</h2>
            <div className="basketball-schedule">
              <div className="basketball-schedule-item">
                <div className="basketball-schedule-day">Tuesday</div>
                <div>
                  <p className="basketball-schedule-title">Skills & Drills</p>
                  <p className="basketball-schedule-time">4:00 PM - 6:00 PM | Indoor Court</p>
                </div>
              </div>

              <div className="basketball-schedule-item">
                <div className="basketball-schedule-day">Thursday</div>
                <div>
                  <p className="basketball-schedule-title">Team Practice & Strategy</p>
                  <p className="basketball-schedule-time">4:00 PM - 6:00 PM | Indoor Court</p>
                </div>
              </div>

              <div className="basketball-schedule-item">
                <div className="basketball-schedule-day">Saturday</div>
                <div>
                  <p className="basketball-schedule-title">Scrimmages & Conditioning</p>
                  <p className="basketball-schedule-time">9:00 AM - 11:00 AM | Indoor Court</p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Section */}
          <div className="basketball-join">
            <h2 className="basketball-section-title">Join the Team</h2>
            <p className="basketball-join-text">
              Ready to join our basketball family? Tryouts are held at the beginning of each term.
              Contact our coach for more details.
            </p>
            <div className="basketball-contact">
              <p><strong>Coach:</strong> Ms. Sarah Mwangi</p>
              <p><strong>Email:</strong> basketball@malindihigh.ac.ke</p>
              <p><strong>Office:</strong> Sports Complex, Room 15</p>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Basketball;
