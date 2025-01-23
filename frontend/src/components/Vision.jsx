import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGlobe, FaGraduationCap, FaLightbulb } from 'react-icons/fa';

const Vision = () => {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: card1Ref, inView: card1InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: card2Ref, inView: card2InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: card3Ref, inView: card3InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section id="vision" className="py-16 bg-gray-300">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center space-y-8">
          <h2
            ref={titleRef}
            className={`text-4xl font-extrabold text-gray-800 transition-transform duration-1000 ease-out transform ${
              titleInView
                ? 'translate-y-0 opacity-100'
                : 'translate-y-12 opacity-0'
            }`}
          >
            Our Vision
          </h2>

          <p
            ref={contentRef}
            className={`text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto transition-transform duration-1000 ease-out transform ${
              contentInView
                ? 'translate-x-0 opacity-100'
                : '-translate-x-12 opacity-0'
            }`}
          >
            We envision a world where education and technology are accessible to
            everyone, breaking down barriers and building brighter futures.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div
              ref={card1Ref}
              className={`p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow opacity-0 transition-transform duration-1000 ease-out transform ${
                card1InView
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-95 rotate-6'
              }`}
            >
              <div className="text-blue-600 mb-4 text-center">
                <div className="flex justify-center items-center mb-4">

                <FaGlobe size={48} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Global Reach
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Expanding opportunities worldwide through innovative solutions.
              </p>
            </div>

            <div
              ref={card2Ref}
              className={`p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow opacity-0 transition-transform duration-1000 ease-out transform ${
                card2InView
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-95 rotate-6'
              }`}
            >
              <div className="text-green-600 mb-4 text-center">
                <div className="flex justify-center items-center mb-4">

                <FaGraduationCap size={48} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Quality Education
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Delivering world-class education to empower individuals and
                communities.
              </p>
            </div>

            <div
              ref={card3Ref}
              className={`p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow opacity-0 transition-transform duration-1000 ease-out transform ${
                card3InView
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-95 rotate-6'
              }`}
            >
              <div className="text-red-600 mb-4 text-center mx-auto">
                <div className="flex justify-center items-center mb-4">

                <FaLightbulb size={48} />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Sustainable Future
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Shaping a sustainable future through continuous learning and
                development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
