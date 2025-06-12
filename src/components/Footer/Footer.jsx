import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-section">
          <div className="logo-placeholder">SteelMan</div>
        </div>
        
        <div className="footer-content">
          <div className="footer-links">
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Use</a>
            <a href="/intellectual-property" className="footer-link">Intellectual Property</a>
            <a href="/privacy-choices" className="footer-link">Your Privacy Choices</a>
          </div>
          
          <div className="footer-designers">
            <span>Projektanci strony: Mykhailo Shulika, Andrii Maslov, Kacper Filipczak</span>
          </div>
          
          <div className="footer-copyright">
            <span>©2025 STEELMAN Group</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;