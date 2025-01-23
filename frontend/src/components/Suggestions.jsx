import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CaseItem from './CaseItem';
import image1 from '../assets/images/one.jpg';
import image2 from '../assets/images/two.jpg';
import image3 from '../assets/images/three.jpg';
import image4 from '../assets/images/four.jpg';
import { ThemeContext } from '../context/ThemeContext';
import { motion, useInView } from 'framer-motion';

const cases = [
  {
    student_name: 'M Bilal',
    grade: '7th',
    school_name: 'Govt High School',
    age: 12,
    city: 'Karachi',
    summary:
      'Dreams of becoming a doctor. He needs monthly support to stay in school.',
    monthly_amount: 7000,
    thumbnail_url: image1,
    urgency_level: 'High',
    details_link: '/case/123',
  },
  {
    student_name: 'M Ali',
    grade: '9th',
    school_name: 'Govt High School',
    age: 12,
    city: 'Karachi',
    summary:
      'Dreams of becoming a doctor. He needs monthly support to stay in school.',
    monthly_amount: 4000,
    thumbnail_url: image2,
    urgency_level: 'High',
    details_link: '/case/123',
  },
  {
    student_name: 'Uzair',
    grade: '8th',
    school_name: 'Govt High School',
    age: 12,
    city: 'Karachi',
    summary:
      'Dreams of becoming a doctor. He needs monthly support to stay in school.',
    monthly_amount: 9000,
    thumbnail_url: image3,
    urgency_level: 'High',
    details_link: '/case/123',
  },
  {
    student_name: 'Hafeez',
    grade: '7th',
    school_name: 'Govt High School',
    age: 12,
    city: 'Karachi',
    summary:
      'Dreams of becoming a doctor. He needs monthly support to stay in school.',
    monthly_amount: 2000,
    thumbnail_url: image4,
    urgency_level: 'High',
    details_link: '/case/123',
  },
];

export default function Suggestions({ Heading }) {
  const { isDarkMode } = useContext(ThemeContext);
  const sectionRef = React.useRef(null);

  // Use the InView hook to trigger animation when the section comes into view
  const isInView = useInView(sectionRef, { triggerOnce: false });

  // Animation Variants for the Section
  const slideInUp = {
    hidden: { opacity: 0, y: 50 }, // Hidden state (from below)
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }, // On scroll into view
    exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } }, // Scroll back out (moving towards the bottom)
  };

  return (
    <motion.div
      ref={sectionRef}
      variants={slideInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      exit="exit" // Ensure the section exits with the same animation when scrolling away
      className={`${isDarkMode ? 'bg-dark' : 'bg-light'}`}
    >
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2
          className={`${
            isDarkMode ? 'text-light' : 'text-dark'
          } text-2xl font-bold tracking-tight`}
        >
          {Heading}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {cases.map((caseItem, index) => (
            <CaseItem key={index} caseItem={caseItem} />
          ))}
        </div>

        {/* View More Cases Button */}
        <div className="mt-8 text-center">
          <Link
            to="/cases"
            className={`${
              isDarkMode
                ? 'border-light text-light hover:text-light'
                : 'border-dark text-dark hover:text-dark'
            } inline-block bg-transparent border-2  text-lg  px-4 py-4 rounded-lg shadow-md transform transition duration-300 ease-in-out  hover:scale-105 hover:shadow-xl`}
          >
            View More Cases Like These
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
