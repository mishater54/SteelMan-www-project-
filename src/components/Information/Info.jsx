import React from 'react';
import './Info.css';

export default function FitnessLandingPage() {
  return (
    <div className="fitness-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            „PRZEKRACZAJ GRANICE – ZWYCIĘŻAJ W KAŻDYM WYZWANIU”
          </h1>
        </div>
      </div>

      {/* Main Content Cards */}
      <div className="cards-section">
        <div className="cards-container">
          <div className="cards-grid">
            
            {/* Prepare Card */}
            <div className="card">
              <div className="card-image prepare-image"></div>
              <div className="card-content">
                <h3 className="card-title">Prepare</h3>
                <p className="card-text">
                  Your training is the heart of your IRONMAN preparation - training with purpose is the best way to reach your finish line and get there faster. Check out the journey ahead and get started today.
                </p>
                <button className="card-button">
                  <span>Learn More</span>
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </div>

            {/* Fuel Card */}
            <div className="card">
              <div className="card-image fuel-image"></div>
              <div className="card-content">
                <h3 className="card-title">Fuel</h3>
                <p className="card-text">
                  Nutrition is one of our favorite topics here at IRONMAN. Whether it's the nuances of daily nutrition—how you fuel your workouts and eat for recovery—to the complexities of how you fuel your race, we're here to help.
                </p>
                <button className="card-button">
                  <span>Learn More</span>
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </div>

            {/* Recover Card */}
            <div className="card">
              <div className="card-image recover-image"></div>
              <div className="card-content">
                <h3 className="card-title">Recover</h3>
                <p className="card-text">
                  There's nobody that works harder than triathletes. Restoring and replenishing your body helps you build fitness and perform at your best on race day. Make the most of your training with Hyperice.
                </p>
                <button className="card-button">
                  <span>Learn More</span>
                  <span className="button-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}