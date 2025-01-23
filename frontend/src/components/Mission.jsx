import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useInView } from 'react-intersection-observer'; // Import Intersection Observer hook
import { FaLightbulb, FaGraduationCap, FaGlobe } from 'react-icons/fa';

const Mission = () => {
  const { isDarkMode } = useContext(ThemeContext); // Access theme state

  // Individual element animations
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: innovationRef, inView: innovationInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: educationRef, inView: educationInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: impactRef, inView: impactInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section
      id="mission"
      className={`py-16 ${
        isDarkMode ? 'bg-dark text-light' : 'bg-gray-200 text-gray-800'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center space-y-8">
          {/* Title */}
          <h2
            ref={titleRef}
            className={`text-4xl font-extrabold transition-opacity duration-1000 ease-in-out ${
              titleInView ? 'opacity-100' : 'opacity-0'
            } ${isDarkMode ? 'text-light' : 'text-gray-800'}`}
          >
            Our Mission
          </h2>

          {/* Content */}
          <p
            ref={contentRef}
            className={`text-lg leading-relaxed max-w-3xl mx-auto transition-opacity duration-1000 ease-in-out ${
              contentInView ? 'opacity-100' : 'opacity-0'
            } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Our mission is to empower the next generation with the skills they
            need to excel in a rapidly evolving digital world. Through
            innovation, collaboration, and a passion for learning, we aim to
            create technology-driven solutions that positively impact lives.
          </p>

          {/* Icons Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Innovation */}
            <div
              ref={innovationRef}
              className={`flex flex-col items-center transition-opacity duration-1000 ease-in-out ${
                innovationInView ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`p-6 rounded-full ${
                  isDarkMode
                    ? 'bg-light text-dark'
                    : 'bg-blue-100 text-blue-600'
                }`}
              >
                <FaLightbulb className="h-12 w-12" />
              </div>
              <h4
                className={`mt-4 text-xl font-semibold transition-opacity duration-1000 ease-in-out ${
                  innovationInView ? 'opacity-100' : 'opacity-0'
                } ${isDarkMode ? 'text-light' : 'text-gray-800'}`}
              >
                Innovation
              </h4>
              <p
                className={`mt-2 text-center transition-opacity duration-1000 ease-in-out ${
                  innovationInView ? 'opacity-100' : 'opacity-0'
                } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Driving progress through innovative ideas and creative thinking.
              </p>
            </div>

            {/* Education */}
            <div
              ref={educationRef}
              className={`flex flex-col items-center transition-opacity duration-1000 ease-in-out ${
                educationInView ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`p-6 rounded-full ${
                  isDarkMode
                    ? 'bg-light text-dark'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                <FaGraduationCap className="h-12 w-12" />
              </div>
              <h4
                className={`mt-4 text-xl font-semibold transition-opacity duration-1000 ease-in-out ${
                  educationInView ? 'opacity-100' : 'opacity-0'
                } ${isDarkMode ? 'text-light' : 'text-gray-800'}`}
              >
                Education
              </h4>
              <p
                className={`mt-2 text-center transition-opacity duration-1000 ease-in-out ${
                  educationInView ? 'opacity-100' : 'opacity-0'
                } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Building a future by fostering learning and personal
                development.
              </p>
            </div>

            {/* Impact */}
            <div
              ref={impactRef}
              className={`flex flex-col items-center transition-opacity duration-1000 ease-in-out ${
                impactInView ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className={`p-6 rounded-full ${
                  isDarkMode ? 'bg-light text-dark' : 'bg-red-100 text-red-600'
                }`}
              >
                <FaGlobe className="h-12 w-12" />
              </div>
              <h4
                className={`mt-4 text-xl font-semibold transition-opacity duration-1000 ease-in-out ${
                  impactInView ? 'opacity-100' : 'opacity-0'
                } ${isDarkMode ? 'text-light' : 'text-gray-800'}`}
              >
                Impact
              </h4>
              <p
                className={`mt-2 text-center transition-opacity duration-1000 ease-in-out ${
                  impactInView ? 'opacity-100' : 'opacity-0'
                } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Making a positive difference through meaningful tech solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
