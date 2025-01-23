import { useEffect, useState } from 'react';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl transform transition-all ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      } hover:from-blue-600 hover:to-indigo-700 hover:scale-110 focus:outline-none`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 animate-bounce"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTopButton;
