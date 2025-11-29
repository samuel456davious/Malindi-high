import React, { useContext } from "react";
import { ThemeContext } from "../Authentication/ThemeContext";
import { MapPin, Phone, Mail, Clock, Users, Calendar } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  const { theme, isDark } = useContext(ThemeContext);

  return (
    <section 
      id="contact" 
      className={`contact-section ${isDark ? 'contact-dark' : 'contact-light'}`}
      style={{
        '--bg-primary': isDark ? '#0F172A' : '#FFFFFF',
        '--bg-secondary': isDark ? '#1E293B' : '#F9FAFC',
        '--text-primary': isDark ? '#F1F5F9' : '#1E293B',
        '--text-secondary': isDark ? '#CBD5E1' : '#475569',
        '--text-tertiary': isDark ? '#94A3B8' : '#64748B',
        '--border-primary': isDark ? '#334155' : '#E2E8F0',
        '--accent-blue': '#3B82F6',
        '--accent-green': '#10B981',
        '--accent-orange': '#F59E0B',
        '--accent-purple': '#8B5CF6'
      }}
    >
      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <div className="contact-badge">
            Get In Touch
          </div>
          <h2>Connect With Us</h2>
          <p>
            We're here to help you with admissions, inquiries, or to schedule a campus visit. 
            Reach out and let's start the conversation.
          </p>
          <div className="contact-stats">
            <div className="contact-stat-item">
              <span className="contact-stat-number">24/7</span>
              <span className="contact-stat-label">Support</span>
            </div>
            <div className="contact-stat-item">
              <span className="contact-stat-number">50+</span>
              <span className="contact-stat-label">Staff</span>
            </div>
            <div className="contact-stat-item">
              <span className="contact-stat-number">98%</span>
              <span className="contact-stat-label">Response Rate</span>
            </div>
            <div className="contact-stat-item">
              <span className="contact-stat-number">1hr</span>
              <span className="contact-stat-label">Avg. Response</span>
            </div>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="contact-grid">
          <div 
            className="contact-card"
            style={{
              '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
              '--card-hover': isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              '--accent-color': '#3B82F6'
            }}
          >
            <div 
              className="icon-wrapper"
              style={{
                background: `linear-gradient(135deg, #3B82F620, #3B82F610)`,
                border: `1px solid #3B82F630`
              }}
            >
              <MapPin className="contact-icon" size={28} color="#3B82F6" />
            </div>
            <h3>Visit Our Campus</h3>
            <p>
              Malindi Road, Malindi Town<br />
              Kilifi County, Kenya<br />
              P.O. Box 123-80200
            </p>
            <div className="contact-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
              </div>
            </div>
            <button className="contact-action-btn">
              Get Directions
              <span className="btn-arrow">→</span>
            </button>
            <div 
              className="card-hover-overlay"
              style={{
                background: `linear-gradient(135deg, #3B82F615, transparent)`
              }}
            ></div>
          </div>

          <div 
            className="contact-card"
            style={{
              '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
              '--card-hover': isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              '--accent-color': '#10B981'
            }}
          >
            <div 
              className="icon-wrapper"
              style={{
                background: `linear-gradient(135deg, #10B98120, #10B98110)`,
                border: `1px solid #10B98130`
              }}
            >
              <Phone className="contact-icon" size={28} color="#10B981" />
            </div>
            <h3>Call Us Directly</h3>
            <p>
              +254 712 345 678<br />
              +254 734 567 890<br />
              +254 720 987 654
            </p>
            <div className="contact-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span>24/7 Emergency Line</span>
              </div>
            </div>
            <button className="contact-action-btn">
              Call Now
              <span className="btn-arrow">→</span>
            </button>
            <div 
              className="card-hover-overlay"
              style={{
                background: `linear-gradient(135deg, #10B98115, transparent)`
              }}
            ></div>
          </div>

          <div 
            className="contact-card"
            style={{
              '--card-bg': isDark ? '#1E293B' : '#FFFFFF',
              '--card-hover': isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              '--accent-color': '#F59E0B'
            }}
          >
            <div 
              className="icon-wrapper"
              style={{
                background: `linear-gradient(135deg, #F59E0B20, #F59E0B10)`,
                border: `1px solid #F59E0B30`
              }}
            >
              <Mail className="contact-icon" size={28} color="#F59E0B" />
            </div>
            <h3>Email Us</h3>
            <p>
              info@malindihigh.ac.ke<br />
              admissions@malindihigh.ac.ke<br />
              principal@malindihigh.ac.ke
            </p>
            <div className="contact-meta">
              <div className="meta-item">
                <Clock size={16} />
                <span>Response within 1 hour</span>
              </div>
            </div>
            <button className="contact-action-btn">
              Send Email
              <span className="btn-arrow">→</span>
            </button>
            <div 
              className="card-hover-overlay"
              style={{
                background: `linear-gradient(135deg, #F59E0B15, transparent)`
              }}
            ></div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="contact-cta">
          <div className="cta-content">
            <div className="cta-header">
              <h3>Begin Your Educational Journey</h3>
              <p>
                Applications for the 2024/2025 academic year are now being accepted. 
                Join our community of excellence and discover your potential.
              </p>
            </div>
            
            <div className="cta-features">
              <div className="feature-item">
                <Users size={20} />
                <span>Limited Spaces Available</span>
              </div>
              <div className="feature-item">
                <Calendar size={20} />
                <span>Early Application Discount</span>
              </div>
              <div className="feature-item">
                <Clock size={20} />
                <span>Quick Admission Process</span>
              </div>
            </div>

            <div className="cta-actions">
              <button className="cta-btn primary">
                Apply for Admission
              </button>
              <button className="cta-btn secondary">
                Download Brochure
              </button>
              <button className="cta-btn outline">
                Schedule Visit
              </button>
            </div>

            <div className="cta-footer">
              <p>Need help with your application? <a href="/help">Contact our admissions team</a></p>
            </div>
          </div>
          
          <div 
            className="cta-decoration"
            style={{
              background: `linear-gradient(135deg, var(--accent-blue, #3B82F6)10, var(--accent-purple, #8B5CF6)10)`
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Contact;