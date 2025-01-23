import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-scroll';
import AboutUs from './AboutUs';
import Mission from './Mission';
import Vision from './Vision';
import Values from './Values';

import { ThemeContext } from '../context/ThemeContext';

export default function NavbarWithScroll() {
  const [isSticky, setIsSticky] = useState(false);
  const [hasScrolledPastSections, setHasScrolledPastSections] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Access theme state from ThemeContext
  const { isDarkMode } = useContext(ThemeContext);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const initialNavbarElement = document.getElementById('initial-navbar');
    const lastSectionElement = document.getElementById('last-navbar-section');

    if (initialNavbarElement && lastSectionElement) {
      const initialNavbarOffsetTop = initialNavbarElement.offsetTop;
      const lastSectionOffsetTop = lastSectionElement.offsetTop;

      if (
        scrollPosition >=
          initialNavbarOffsetTop + initialNavbarElement.offsetHeight &&
        scrollPosition <= lastSectionOffsetTop
      ) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      if (scrollPosition > lastSectionOffsetTop) {
        setHasScrolledPastSections(true);
      } else {
        setHasScrolledPastSections(false);
      }
    }
  };

  useEffect(() => {
    const navbarElement = document.getElementById('initial-navbar');
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
    >
      {/* Initial Navbar */}
      <div id="initial-navbar" className={`p-4`}>
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="px-12 flex space-x-6 text-lg justify-between font-medium">
          <Link
            to="aboutUs"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-600"
          >
            About Us
          </Link>
          <Link
            to="mission"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-600"
          >
            Mission
          </Link>
          <Link
            to="vision"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-600"
          >
            Vision
          </Link>
          <Link
            to="values"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-600"
          >
            Values
          </Link>
        </div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Sticky Navbar */}
      <div
        id="sticky-navbar"
        className={`${
          isSticky && !hasScrolledPastSections
            ? `fixed top-0 left-0 right-0 z-50 shadow-md transition-transform duration-300 bg-dark text-light`
            : 'hidden'
        } flex items-center justify-center space-x-6 py-4`}
        style={isSticky ? { marginTop: `${navbarHeight}px` } : {}}
      >
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="flex space-x-6 text-lg font-medium">
          <Link
            to="aboutUs"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-600"
          >
            About Us
          </Link>
          <Link
            to="mission"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-600"
          >
            Mission
          </Link>
          <Link
            to="vision"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-600"
          >
            Vision
          </Link>
          <Link
            to="values"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-blue-600"
          >
            Values
          </Link>
        </div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <AboutUs />
      <Mission />
      <Vision />
      <Values />

      {/* Last Section */}
      <section id="last-navbar-section"></section>
    </div>
  );
}
