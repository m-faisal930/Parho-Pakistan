import React, { useState } from 'react';

export default function FAQs() {
  const [expanded, setExpanded] = useState({});

  const toggleFAQ = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  return (
    <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex flex-col text-left basis-1/2">
        <p className="inline-block font-semibold text-primary mb-4">
          Parho Pakistan FAQ
        </p>
        <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
          Frequently Asked Questions
        </p>
      </div>
      <ul className="basis-1/2">
        {[
          {
            question: 'How can I get involved with Parho Pakistan?',
            answer:
              'You can participate in Parho Pakistan by joining our network of schools, donors, and volunteers. Visit our "Get Involved" page to find out how you can help.',
          },
          {
            question: 'What are the facilties available for students?',
            answer:
              'Parho Pakistan provides students with access to free educational resources, including tutoring, study materials, and scholarship opportunities.',
          },
          {
            question: 'How does Parho Pakistan support schools?',
            answer:
              'We work closely with schools to improve education quality by providing technological tools, professional development for teachers, and financial support.',
          },
          {
            question: 'Can I donate to support Parho Pakistan?',
            answer:
              'Yes, we welcome donations to help fund our projects and initiatives. Your contributions will directly support educational programs and scholarships for students in need.',
          },
        ].map((faq, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
              aria-expanded={expanded[index] ? 'true' : 'false'}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-base-content">{faq.question}</span>
              <svg
                className="flex-shrink-0 w-4 h-4 ml-auto fill-current"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className={`transform origin-center transition duration-200 ease-out ${
                    expanded[index] ? 'rotate-90' : ''
                  }`}
                ></rect>
                <rect
                  y="7"
                  width="16"
                  height="2"
                  rx="1"
                  className={`transform origin-center transition duration-200 ease-out ${
                    expanded[index] ? '' : 'rotate-90'
                  }`}
                ></rect>
              </svg>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expanded[index] ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="pb-5 leading-relaxed">
                <div className="space-y-2 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
