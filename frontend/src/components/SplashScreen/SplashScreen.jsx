// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import logo from "../../assets/images/logo.png"
// import Spinner from '../Spinner';

// function SplashScreen({ isLoggedIn }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (isLoggedIn) {
//         navigate('/dashboard');
//       } else {
//         navigate('/dashboard');
//       }
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [isLoggedIn, navigate]);

//   return (
//     <div className="flex flex-col justify-center items-center h-screen w-screen bg-white text-black">
//       {/* <Spinner /> */}
//       <img src={logo} alt="Main Logo" className="h-30 mb-6" />
//       <h1 className="text-5xl font-bold text-gray-800 mb-4 drop-shadow-lg">
//         Parho Pakistan
//       </h1>
//       <p className="text-2xl font-light text-gray-700 italic drop-shadow-md tracking-wide">
//         Empower Pakistani Children
//       </p>
//     </div>
//   );
// }

// export default SplashScreen;

















import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaChild, FaSchool, FaHeart } from 'react-icons/fa';

import logo from '../../assets/images/logo.png';
import Spinner from '../Spinner';

function SplashScreen({ isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isLoggedIn ? '/dashboard' : '/dashboard');
    }, 4000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-br from-blue-50 to-white text-black overflow-hidden"
    >
      {/* Floating educational icons in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.2,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
            className="absolute text-blue-100"
          >
            {[FaBookOpen, FaChild, FaSchool, FaHeart][i % 4]({
              size: 24 + Math.random() * 24,
            })}
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center items-center relative z-10"
      >
        {/* Logo with floating animation */}
        <motion.div variants={floating}>
          <motion.img
            src={logo}
            alt="Main Logo"
            className="h-32 mb-6"
            variants={item}
          />
        </motion.div>

        {/* Main title with animation */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gray-800 mb-4"
          variants={item}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Parho Pakistan
          </span>
        </motion.h1>

        {/* Tagline with animation */}
        <motion.p
          className="text-2xl font-light text-gray-700 italic mb-8 tracking-wide"
          variants={item}
        >
          Empower Pakistani Children
        </motion.p>

        {/* Animated progress bar */}
        <motion.div
          className="h-2 bg-blue-100 rounded-full w-64 overflow-hidden"
          variants={item}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-blue-500 to-green-500"
          />
        </motion.div>

        {/* Mission statement with staggered animation */}
        <motion.div className="mt-12 text-center max-w-md" variants={container}>
          <motion.p className="text-gray-600 mb-2" variants={item}>
            <FaBookOpen className="inline mr-2 text-blue-500" />
            Education for All
          </motion.p>
          <motion.p className="text-gray-600 mb-2" variants={item}>
            <FaChild className="inline mr-2 text-green-500" />
            Empowering Future Generations
          </motion.p>
          <motion.p className="text-gray-600" variants={item}>
            <FaHeart className="inline mr-2 text-red-500" />
            Building a Brighter Pakistan
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Footer with subtle animation */}
      <motion.div
        className="absolute bottom-4 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Loading your educational journey...
      </motion.div>
    </motion.div>
  );
}

export default SplashScreen;