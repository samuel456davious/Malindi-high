import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* === School Info === */}
        <div className="footer-section">
          <h3 className="footer-logo">Malindi High School</h3>
          <p>
            A center of excellence committed to nurturing future leaders through
            discipline, innovation, and integrity.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* === Quick Links === */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#academics">Academics</a></li>
            <li><a href="#studentlife">Student Life</a></li>
            <li><a href="#classroom">Classroom</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* === Contact Info === */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📍 Malindi Road, Malindi Town, Kenya</p>
          <p>📞 +254 712 345 678</p>
          <p>✉️ info@malindihigh.ac.ke</p>
        </div>

        {/* === FAQ === */}
        <div className="footer-section">
          <h4>FAQ</h4>
          <div className="faq-item">
            <h5>How can I apply for admission?</h5>
            <p>
              You can apply through our online portal or visit the school admission office for assistance.
            </p>
          </div>
          <div className="faq-item">
            <h5>Does the school offer boarding facilities?</h5>
            <p>
              Yes, we offer full boarding facilities with separate hostels for boys and girls.
            </p>
          </div>
          <div className="faq-item">
            <h5>What extracurricular activities are available?</h5>
            <p>
              We offer sports, music, drama, debate clubs, and science fairs to encourage holistic development.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Malindi High School. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
