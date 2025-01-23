import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaHandHoldingHeart, FaLock, FaUsers } from 'react-icons/fa';

const Values = () => {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { ref: descriptionRef, inView: descriptionInView } = useInView({
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

  const values = [
    {
      title: 'Integrity',
      description:
        'We uphold honesty and strong moral principles in all that we do.',
      icon: <FaLock className="h-12 w-12 text-blue-600" />,
    },
    {
      title: 'Transparency',
      description:
        'We communicate openly and clearly with all our stakeholders.',
      icon: <FaHandHoldingHeart className="h-12 w-12 text-green-600" />,
    },
    {
      title: 'Collaboration',
      description:
        'We achieve the best outcomes through teamwork and shared goals.',
      icon: <FaUsers className="h-12 w-12 text-red-600" />,
    },
  ];

  return (
    <section id="values" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-16 text-center">
        {/* Title Section */}
        <h2
          ref={titleRef}
          className={`text-4xl font-extrabold text-gray-800 transition-transform duration-1000 ease-out transform ${
            titleInView
              ? 'translate-y-0 opacity-100'
              : '-translate-y-12 opacity-0'
          }`}
        >
          Our Values
        </h2>
        <p
          ref={descriptionRef}
          className={`mt-4 text-lg text-gray-700 max-w-2xl mx-auto transition-transform duration-1000 ease-out transform ${
            descriptionInView
              ? 'translate-x-0 opacity-100'
              : '-translate-x-12 opacity-0'
          }`}
        >
          We believe in integrity, transparency, and collaboration to drive
          meaningful impact.
        </p>

        {/* Values Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          role="list"
          aria-label="Core Values"
        >
          {values.map((value, index) => (
            <div
              ref={index === 0 ? card1Ref : index === 1 ? card2Ref : card3Ref}
              key={index}
              className={`p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow opacity-0 transition-transform duration-1000 ease-out transform ${
                index === 0
                  ? card1InView
                    ? 'opacity-100 scale-100 rotate-0'
                    : 'opacity-0 scale-95 rotate-6'
                  : index === 1
                  ? card2InView
                    ? 'opacity-100 scale-100 rotate-0'
                    : 'opacity-0 scale-95 rotate-6'
                  : card3InView
                  ? 'opacity-100 scale-100 rotate-0'
                  : 'opacity-0 scale-95 rotate-6'
              }`}
              role="listitem"
            >
              <div className="mb-6 flex justify-center">{value.icon}</div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                {value.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
