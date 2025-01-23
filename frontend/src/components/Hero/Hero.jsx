import React, { useContext, useEffect, useState, useRef } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import image1 from '../../assets/images/one.jpg';
import image2 from '../../assets/images/two.jpg';
import image3 from '../../assets/images/three.jpg';
import { Link } from 'react-router-dom';
import "./Hero.css";
import { motion, useInView } from 'framer-motion';

import { FaBook, FaPencilAlt, FaGraduationCap } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';

export default function Hero() {
  const { isDarkMode } = useContext(ThemeContext);
  const words = ['Sustainability', 'Growth', 'Impact'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Reference for the section to observe
  const sectionRef = useRef(null);

  // Detect if the section is in view
  const isInView = useInView(sectionRef, { triggerOnce: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const zoomInEffect = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  return (
    <section ref={sectionRef}>
      <div
        className={`${
          isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
        } py-8 transition-all ease-in-out duration-500 hero`}
      >
        {/* Floating icons */}
        <div className="icon">
          <FaBook />
        </div>
        <div className="icon">
          <FaPencilAlt />
        </div>
        <div className="icon">
          <FaGraduationCap />
        </div>
        <div className="icon">
          <MdSchool />
        </div>
        <div className="icon">
          <GiTeacher />
        </div>
        <div className="icon">
          <FaPencilAlt />
        </div>
        <div className="icon">
          <FaBook />
        </div>

        <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
          {/* Left Side: Text and Buttons */}
          <motion.div
            variants={zoomInEffect}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col w-full md:w-1/2 lg:w-2/5 justify-center items-start pl-10"
          >
            <div className="text-3xl md:text-5xl p-2 text-highlight tracking-loose whitespace-normal">
              <span className="inline-block">{words[currentWordIndex]}</span>
            </div>
            <h2 className="text-4xl md:text-4xl leading-tight mb-4 transition-all duration-500 ease-in-out transform hover:scale-105">
              <span className="block">Empower Pakistani</span>
              <span className="block">Children</span>
            </h2>
            <p className="text-base md:text-lg mb-6 opacity-80 transition-opacity duration-700 ease-in-out hover:opacity-100">
              Discover deserving students and contribute now to transform lives
              and build a brighter future.
            </p>

            <div className="flex flex-wrap gap-2">
              <Link
                to={'/cases'}
                type="button"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Become a Sponsor
              </Link>
              <Link
                to={'/addstudent'}
                type="button"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Register as Student
              </Link>
            </div>

            <Link
              to={'/addschool'}
              type="button"
              className="text-sm text-blue-500 hover:underline "
            >
              Register your school with Us
            </Link>
          </motion.div>

          {/* Right Side: Images */}
          <motion.div
            variants={zoomInEffect}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="p-4 mt-8 md:mt-0 lg:w-3/5 flex justify-center"
          >
            <div className="flex flex-wrap content-center gap-6 justify-center">
              {/* Left Frame */}
              <motion.div className="w-44 h-52 border rounded-sm shadow-lg transform hover:scale-105 transition-all flex items-center justify-center opacity-90 hover:opacity-100">
                <img
                  className="w-full h-full object-cover"
                  src={image1}
                  alt="Space Image 1"
                />
              </motion.div>

              {/* Center Frame - Larger */}
              <motion.div className="w-56 h-64 border shadow-2xl transform hover:scale-110 transition-all flex items-center justify-center rounded-md opacity-90 hover:opacity-100">
                <img
                  className="w-full h-full object-cover"
                  src={image3}
                  alt="Space Image 2"
                />
              </motion.div>

              {/* Right Frame */}
              <motion.div className="w-44 h-52 border rounded-sm shadow-lg transform hover:scale-105 transition-all flex items-center justify-center opacity-90 hover:opacity-100">
                <img
                  className="w-full h-full object-cover"
                  src={image2}
                  alt="Space Image 3"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
