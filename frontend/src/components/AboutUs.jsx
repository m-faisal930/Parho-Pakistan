import React, { useContext } from 'react';
import image1 from '../assets/images/about.jpg';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { motion, useInView } from 'framer-motion';

const AboutUs = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access theme state

  // Using useInView to detect when the section is in the viewport
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { triggerOnce: false });

  // Animation Variants for the About Us section
  const slideInUp = {
    hidden: { opacity: 0, y: 50 }, // Hidden state (starts from below)
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }, // Moves to position when scrolled in
    exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } }, // Moves back down when scrolled out
  };

  return (
    <motion.section
      ref={sectionRef}
      id="aboutUs"
      variants={slideInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      exit="exit"
      className={`py-16 ${
        isDarkMode ? 'bg-dark text-light' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Section: Image */}
          <div className="relative group">
            <div className="overflow-hidden rounded-lg shadow-lg max-w-md mx-auto md:max-w-full">
              <img
                src={image1}
                alt="About Us"
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="text-center md:text-left space-y-6">
            <h2
              className={`text-4xl font-extrabold ${
                isDarkMode ? 'text-light' : 'text-gray-800'
              }`}
            >
              Who We Are
            </h2>
            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              We create cutting-edge solutions, driven by a passion for
              innovation, collaboration, and impact. Our team is committed to
              transforming ideas into reality through creative problem-solving.
            </p>
            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Join us on this journey as we strive to build tech-powered
              solutions that solve real-world challenges and inspire a culture
              of continuous learning and growth.
            </p>

            {/* Read More Button */}
            <Link
              to="/about"
              className={`inline-block px-8 py-4 font-semibold rounded-lg shadow-lg transition-all ${
                isDarkMode
                  ? 'bg-light text-dark hover:bg-gray-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
