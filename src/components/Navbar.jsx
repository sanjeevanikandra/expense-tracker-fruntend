import React, { useState, useEffect } from 'react';

import { Link } from 'react-scroll';
function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile or desktop
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Check screen size on initial load
    checkIsMobile();

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const toggleMobileMenu = () => {
    if (isMobile) {
      setMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <nav className={`navbar ${isMobileMenuOpen ? 'nav-active' : ''}`}>
      <div className="container">
        <Link to="/" className="logo">
          <img
            src="https://www.shutterstock.com/image-vector/expenses-stamp-on-white-260nw-1360392197.jpg"
            alt="Expense Logo"
            className="logo-img"
          />
          ExpenseApp
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Mobile and Desktop Nav Links */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-menu' : ''}`}>
        <li>
        <a href="/" onClick={toggleMobileMenu}>Home</a>
          </li>
          <li>
            <a href="/signup" onClick={toggleMobileMenu}>Sign Up</a>
          </li>
          <li>
            <a href="/login" onClick={toggleMobileMenu}>Log In</a>
          </li>
          <li>
            {/* Scroll to About section */}
            <Link 
              to="about" 
              smooth={true} 
              duration={500} 
              offset={-70} 
              onClick={toggleMobileMenu}
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
