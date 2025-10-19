import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1601597113720-6ec2e5c42f63",
      title: "Welcome to Malindi High School",
      subtitle: "Empowering young minds through education and character.",
    },
    {
      image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
      title: "Excellence in Academics & Discipline",
      subtitle: "Striving for greatness every single day.",
    },
    {
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      title: "A Place to Learn, Grow & Lead",
      subtitle: "Building leaders of tomorrow through knowledge and faith.",
    },
  ];

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center flex items-center justify-center text-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl mb-8">{slide.subtitle}</p>

                {/* Inline custom button (no external component needed) */}
                <Link
                  to="/about-us"
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
