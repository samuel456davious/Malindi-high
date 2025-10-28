import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import schoolgate from "../images/school-gate.jpg"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const images = [
    {
      src: schoolgate,
      alt: "Malindi High School Main Gate",
      title: "Gateway to Excellence",
      description: "Where discipline, determination, and distinction open every door to success"
    },
    {
      src: "/images/school-bus.jpg",
      alt: "Malindi High School Bus",
      title: "Journey to Success",
      description: "Every road leads to knowledge, discipline, and a brighter future"
    },
    {
      src: "/images/administration-block.jpg",
      alt: "School Administration Block",
      title: "The Pillar of Leadership",
      description: "Guided by wisdom, driven by purpose — where vision shapes the Malindi High legacy."
    },
    {
      src: "/images/assembly-ground.jpg",
      alt: "School Assembly Ground",
      title: "United in Purpose",
      description: "Where every voice comes together in discipline, pride, and the Malindi High spirit."
    },
    {
      src:"",
      alt:"School library photo",
      title:"Knowledge Is Power",
      description:"Empowering minds through books, research, and innovation"
    },
    {
      src:"",
      alt:"School computer lab",
      title:"Empowering Digital Learners",
      description:"Equipping students with 21st-century skills for a connected world."
    }
  ];

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-section">
      <div className="hero-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image.src})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <h1 className="slide-title">{image.title}</h1>
              <p className="slide-description">{image.description}</p>
              <div className="hero-buttons">
                <button className="btn btn-primary">Admissions</button>
                <button className="btn btn-secondary">Learn More</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile for cleaner look */}
      {!isMobile && (
        <>
          <button className="slider-nav prev" onClick={prevSlide}>
            <span>‹</span>
          </button>
          <button className="slider-nav next" onClick={nextSlide}>
            <span>›</span>
          </button>
        </>
      )}

      {/* Slide Indicators - Mobile optimized */}
      <div className="slide-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* School Info Bar - Stacked on mobile */}
      <div className="school-info-bar">
        <div className="container">
          <div className="info-items">
            <div className="info-item">
              <span className="info-number">50+</span>
              <span className="info-label">Years of Excellence</span>
            </div>
            <div className="info-item">
              <span className="info-number">1000+</span>
              <span className="info-label">Students</span>
            </div>
            <div className="info-item">
              <span className="info-number">98%</span>
              <span className="info-label">Success Rate</span>
            </div>
            <div className="info-item">
              <span className="info-number">50+</span>
              <span className="info-label">Qualified Staff</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Swipe Instructions */}
      {isMobile && (
        <div className="mobile-swipe-hint">
          <span>Swipe to navigate</span>
        </div>
      )}
    </section>
  );
};

export default HeroSection;