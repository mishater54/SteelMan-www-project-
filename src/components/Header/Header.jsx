import NavBar from "../NavBar/NavBar";
import React, { useState } from "react";
import "./Header.css";

import upperPhoto1 from "../../assets/upper-photo1.png";
import upperPhoto2 from "../../assets/upper-photo2.jpg";
import upperPhoto3 from "../../assets/upper-photo3.jpg";

function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "STEELMAN POLAND",
      subtitle: "REGISTRATION NOW OPEN",
      date: "August 21, 2025",
      location: "Krakow, Zakopane",
      backgroundImage: upperPhoto1,
    },
    {
      title: "CLIMBING FESTIVAL",
      subtitle: "JOIN US",
      date: "March 09, 2026",
      location: "Lodz, Fabryka wspinania",
      backgroundImage: upperPhoto2,
    },
    {
      title: "PUSH-UP CHALLENGE",
      subtitle: "CHALLEGE YOURSELF",
      date: "November 12, 2025",
      location: "Lodz, Fabryka Sportu",
      backgroundImage: upperPhoto3,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <NavBar />
      <div className="header-container">
        {/* Hero Background */}
        <div
          className="hero-background"
          style={{
            backgroundImage: `url(${slides[currentSlide].backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="background-overlay"></div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-container">
            <div className="content-wrapper">
              {/* Registration Badge */}
              <div className="registration-badge">
                <span className="badge-text">
                  {slides[currentSlide].subtitle}
                </span>
              </div>

              {/* Date */}
              <div className="event-date">{slides[currentSlide].date}</div>

              {/* Main Title */}
              <h1 className="main-title">{slides[currentSlide].title}</h1>

              {/* Location */}
              <div className="event-location">
                <span>{slides[currentSlide].location}</span>
              </div>

              {/* Register Button */}
              <button className="register-button">
                <span className="button-text">REGISTER →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="nav-arrow nav-arrow-left">
          <svg
            className="arrow-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button onClick={nextSlide} className="nav-arrow nav-arrow-right">
          <svg
            className="arrow-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`indicator ${
                currentSlide === index ? "active" : "inactive"
              }`}
            />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="bottom-gradient" />
      </div>
    </>
  );
}

export default Header;
