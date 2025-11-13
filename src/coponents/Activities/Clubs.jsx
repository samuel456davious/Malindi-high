import React from "react";
// import Navigation from "@/components/Navigation";
// import Footer from "@/components/Footer";
import { HeartHandshake, Calendar, Users, Award } from "lucide-react";
import "./Clubs.css";

const Clubs = () => {
  return (
    <div className="clubs-page">
      {/* <Navigation /> */}

      <main className="clubs-main">
        <div className="clubs-container">
          {/* Hero Section */}
          <div className="clubs-header">
            <div className="clubs-icon">
              <HeartHandshake className="clubs-icon-svg" />
            </div>
            <h1 className="clubs-title">Clubs & Societies</h1>
            <p className="clubs-subtitle">
              Developing leaders, thinkers, and change-makers through diverse clubs and societies
            </p>
          </div>

          {/* Overview Section */}
          <div className="clubs-grid">
            <div className="clubs-card">
              <Users className="clubs-card-icon" />
              <h3 className="clubs-card-title">Active Clubs</h3>
              <p className="clubs-card-text">8+ Different Clubs</p>
            </div>

            <div className="clubs-card">
              <Calendar className="clubs-card-icon" />
              <h3 className="clubs-card-title">Meetings</h3>
              <p className="clubs-card-text">Weekly Sessions</p>
            </div>

            <div className="clubs-card">
              <Award className="clubs-card-icon" />
              <h3 className="clubs-card-title">Members</h3>
              <p className="clubs-card-text">200+ Active Students</p>
            </div>
          </div>

          {/* About Section */}
          <div className="clubs-section">
            <h2 className="clubs-section-title">Our Clubs & Societies</h2>
            <p>
              Malindi High School offers a diverse range of clubs and societies designed to cater to 
              various interests and passions. These organizations provide students with opportunities 
              to develop leadership skills, engage in community service, explore academic interests, 
              and make lasting friendships.
            </p>
            <p>
              Our clubs are student-led with guidance from dedicated faculty advisors. Each club 
              organizes regular meetings, special events, competitions, and community outreach 
              programs throughout the academic year.
            </p>
          </div>

          {/* Available Clubs */}
          <div className="clubs-section">
            <h2 className="clubs-section-title">Available Clubs</h2>
            <div className="clubs-list">
              {[
                {
                  name: "Debate Club",
                  desc: "Sharpen your argumentative and public speaking skills",
                  time: "Wednesday, 3:30 PM - 5:30 PM | Debate Hall",
                  patron: "Mr. Peter Ochieng",
                },
                {
                  name: "Science Club",
                  desc: "Explore scientific concepts through experiments and projects",
                  time: "Thursday, 3:30 PM - 5:30 PM | Science Lab",
                  patron: "Dr. Jane Mutua",
                },
                {
                  name: "Environmental Club",
                  desc: "Promote environmental conservation and sustainability",
                  time: "Friday, 3:00 PM - 5:00 PM | School Grounds",
                  patron: "Ms. Lucy Kamau",
                },
                {
                  name: "Red Cross Society",
                  desc: "First aid training and community health initiatives",
                  time: "Tuesday, 3:30 PM - 5:00 PM | Health Center",
                  patron: "Nurse Mary Njeri",
                },
                {
                  name: "Computer Club",
                  desc: "Programming, coding, and technology innovation",
                  time: "Monday & Thursday, 4:00 PM - 6:00 PM | ICT Lab",
                  patron: "Mr. Timothy Kipchoge",
                },
                {
                  name: "Young Farmers Club",
                  desc: "Agriculture, farming techniques, and agribusiness",
                  time: "Wednesday, 3:00 PM - 5:30 PM | School Farm",
                  patron: "Mr. Joseph Maina",
                },
                {
                  name: "Journalism Club",
                  desc: "School newspaper, reporting, and media production",
                  time: "Tuesday, 3:30 PM - 5:30 PM | Media Room",
                  patron: "Mrs. Anne Wambui",
                },
                {
                  name: "Mathematics Club",
                  desc: "Problem-solving, puzzles, and math competitions",
                  time: "Friday, 3:30 PM - 5:00 PM | Math Lab",
                  patron: "Mr. Robert Kibet",
                },
              ].map((club, index) => (
                <div className="clubs-list-item" key={index}>
                  <div className="clubs-list-name">{club.name}</div>
                  <div className="clubs-list-info">
                    <p className="clubs-list-desc">{club.desc}</p>
                    <p className="clubs-list-time">{club.time}</p>
                    <p className="clubs-list-patron">Patron: {club.patron}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Get Involved Section */}
          <div className="clubs-join">
            <h2 className="clubs-section-title">Get Involved</h2>
            <p className="clubs-join-text">
              Every student is encouraged to join at least one club. It's a great way to pursue your 
              interests, develop new skills, and connect with like-minded peers.
            </p>
            <div className="clubs-contact">
              <p><strong>Clubs Coordinator:</strong> Mr. Samuel Otieno</p>
              <p><strong>Email:</strong> clubs@malindihigh.ac.ke</p>
              <p><strong>Office:</strong> Administration Block, Room 20</p>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Clubs;
