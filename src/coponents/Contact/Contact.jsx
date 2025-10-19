import React from "react";
import "./Contact.css";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Get In Touch</h2>
          <p>
            We'd love to hear from you! Contact us for admissions, inquiries, or to schedule a visit.
          </p>
        </div>

        {/* === Contact Info Cards === */}
        <div className="contact-grid">
          <div className="contact-card">
            <div className="icon-circle">
              <MapPin className="icon" />
            </div>
            <h3>Visit Us</h3>
            <p>
              Malindi Road<br />
              Malindi Town<br />
              Kenya
            </p>
          </div>

          <div className="contact-card">
            <div className="icon-circle">
              <Phone className="icon" />
            </div>
            <h3>Call Us</h3>
            <p>
              +254 712 345 678<br />
              Mon - Fri: 8am - 5pm
            </p>
          </div>

          <div className="contact-card">
            <div className="icon-circle">
              <Mail className="icon" />
            </div>
            <h3>Email Us</h3>
            <p>
              info@malindihigh.ac.ke<br />
              admissions@malindihigh.ac.ke
            </p>
          </div>
        </div>

        {/* === CTA Box === */}
        <div className="contact-cta">
          <h3>Ready to Join Us?</h3>
          <p>
            Applications for the next academic year are now open. Start your journey to excellence today.
          </p>
          <button className="apply-btn">Apply for Admission</button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
