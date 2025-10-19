import React, { useState } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import "./Navigation.css"; // Import the CSS file

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Academics", href: "/#academics" },
    { name: "Student Life", href: "/#student-life" },
    { name: "Chaplaincy", href: "/chaplaincy" },
    { name: "Classroom", href: "/classroom" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-header">
          <div className="nav-brand">
            <GraduationCap className="nav-icon" />
            <span className="nav-title">Malindi High School</span>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
            <button className="apply-btn">Apply Now</button>
          </div>

          {/* Mobile Menu Button */}
          <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mobile-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="mobile-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className="apply-btn full">Apply Now</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
