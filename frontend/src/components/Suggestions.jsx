// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import CaseItem from './CaseItem';
// import image1 from '../assets/images/one.jpg';
// import image2 from '../assets/images/two.jpg';
// import image3 from '../assets/images/three.jpg';
// import image4 from '../assets/images/four.jpg';
// import { ThemeContext } from '../context/ThemeContext';
// import { motion, useInView } from 'framer-motion';

// const cases = [
//   {
//     student_name: 'M Bilal',
//     grade: '7th',
//     school_name: 'Govt High School',
//     age: 12,
//     city: 'Karachi',
//     summary:
//       'Dreams of becoming a doctor. He needs monthly support to stay in school.',
//     monthly_amount: 7000,
//     thumbnail_url: image1,
//     urgency_level: 'High',
//     details_link: '/case/123',
//   },
//   {
//     student_name: 'M Ali',
//     grade: '9th',
//     school_name: 'Govt High School',
//     age: 12,
//     city: 'Karachi',
//     summary:
//       'Dreams of becoming a doctor. He needs monthly support to stay in school.',
//     monthly_amount: 4000,
//     thumbnail_url: image2,
//     urgency_level: 'High',
//     details_link: '/case/123',
//   },
//   {
//     student_name: 'Uzair',
//     grade: '8th',
//     school_name: 'Govt High School',
//     age: 12,
//     city: 'Karachi',
//     summary:
//       'Dreams of becoming a doctor. He needs monthly support to stay in school.',
//     monthly_amount: 9000,
//     thumbnail_url: image3,
//     urgency_level: 'High',
//     details_link: '/case/123',
//   },
//   {
//     student_name: 'Hafeez',
//     grade: '7th',
//     school_name: 'Govt High School',
//     age: 12,
//     city: 'Karachi',
//     summary:
//       'Dreams of becoming a doctor. He needs monthly support to stay in school.',
//     monthly_amount: 2000,
//     thumbnail_url: image4,
//     urgency_level: 'High',
//     details_link: '/case/123',
//   },
// ];

// export default function Suggestions({ Heading }) {
//   const { isDarkMode } = useContext(ThemeContext);
//   const sectionRef = React.useRef(null);

//   // Use the InView hook to trigger animation when the section comes into view
//   const isInView = useInView(sectionRef, { triggerOnce: false });

//   // Animation Variants for the Section
//   const slideInUp = {
//     hidden: { opacity: 0, y: 50 }, // Hidden state (from below)
//     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }, // On scroll into view
//     exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } }, // Scroll back out (moving towards the bottom)
//   };

//   return (
//     <motion.div
//       ref={sectionRef}
//       variants={slideInUp}
//       initial="hidden"
//       animate={isInView ? 'visible' : 'hidden'}
//       exit="exit" // Ensure the section exits with the same animation when scrolling away
//       className={`${isDarkMode ? 'bg-dark' : 'bg-light'}`}
//     >
//       <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2
//           className={`${
//             isDarkMode ? 'text-light' : 'text-dark'
//           } text-2xl font-bold tracking-tight`}
//         >
//           {Heading}
//         </h2>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {cases.map((caseItem, index) => (
//             <CaseItem key={index} caseItem={caseItem} />
//           ))}
//         </div>

//         {/* View More Cases Button */}
//         <div className="mt-8 text-center">
//           <Link
//             to="/cases"
//             className={`${
//               isDarkMode
//                 ? 'border-light text-light hover:text-light'
//                 : 'border-dark text-dark hover:text-dark'
//             } inline-block bg-transparent border-2  text-lg  px-4 py-4 rounded-lg shadow-md transform transition duration-300 ease-in-out  hover:scale-105 hover:shadow-xl`}
//           >
//             View More Cases Like These
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// }






















// import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import CaseItem from './CaseItem';
// import { ThemeContext } from '../context/ThemeContext';
// import { motion, useInView } from 'framer-motion';

// export default function Suggestions({ Heading }) {
//   const { isDarkMode } = useContext(ThemeContext);
//   // const sectionRef = React.useRef(null);
//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//     const sectionRef = React.useRef(null);
//   // Use the InView hook to trigger animation when the section comes into view
//   const isInView = useInView(sectionRef, { triggerOnce: false });

//   // Use the InView hook to trigger animation when the section comes into view
//   // const isInView = useInView(sectionRef, { triggerOnce: false });
//   console.log("here",isInView);

//   // Animation Variants for the Section
//   const slideInUp = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
//     exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: 'easeIn' } },
//   };

//   useEffect(() => {
//     const fetchTopCases = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('http://localhost:3000/case/top?limit=4');
//         const data = await response.json();


//         if (!data.success) throw new Error('Failed to fetch cases');

//         // Fetch additional details for each case
//         const casesWithDetails = await Promise.all(
//           data.cases.map(async (caseItem) => {
//             try {
//               const [studentRes, schoolRes] = await Promise.all([
//                 fetch(
//                   `http://localhost:3000/student/profile/${caseItem.studentId}`
//                 ),
//                 fetch(`http://localhost:3000/school/${caseItem.schoolId}`),
//               ]);

//               const [studentData, schoolData] = await Promise.all([
//                 studentRes.json(),
//                 schoolRes.json(),
//               ]);

//               return {
//                 ...caseItem,
//                 student: studentData.data || studentData.student,
//                 school: schoolData.school,
//                 // Map to match your CaseItem props
//                 student_name: studentData.data?.fullName || 'Student',
//                 grade: studentData.data?.currentGrade || 'N/A',
//                 school_name: schoolData.school?.schoolName || 'Unknown School',
//                 age: studentData.data?.dateOfBirth
//                   ? new Date().getFullYear() -
//                     new Date(studentData.data.dateOfBirth).getFullYear()
//                   : 'N/A',
//                 city:
//                   schoolData.school?.address?.split(',')?.[1]?.trim() ||
//                   'Unknown',
//                 summary: caseItem.description,
//                 monthly_amount: caseItem.donationBreakdown
//                   ? Object.values(caseItem.donationBreakdown).reduce(
//                       (sum, amount) => sum + amount,
//                       0
//                     )
//                   : 0,
//                 thumbnail_url: studentData.data?.profilePicture || '',
//                 urgency_level: caseItem.urgency_level || 'Medium',
//                 details_link: `/case/${caseItem._id}`,
//               };
//             } catch (err) {
//               console.error(
//                 `Error fetching details for case ${caseItem._id}:`,
//                 err
//               );
//               return null;
//             }
//           })
//         );

//         setCases(casesWithDetails.filter((caseItem) => caseItem !== null));
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchTopCases();
//   }, []);

//   // console.log(cases);

//   // console.log('Cases:', cases);
  
//   if (loading)
//     return <div className="text-center py-8">Loading recommendations...</div>;
//   if (error)
//     return <div className="text-center py-8 text-red-500">Error: {error}</div>;

//   return (
//     <motion.div
    
//       ref={sectionRef}
//       variants={slideInUp}
//       initial="hidden"
//       animate={isInView ? 'visible' : 'hidden'}
//       exit="exit" // Ensure the section exits with the same animation when scrolling away
//       className={`${isDarkMode ? 'bg-dark ' : 'bg-light '}`}
//     >
//       <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2
//           className={`${
//             isDarkMode ? 'text-light' : 'text-dark'
//           } text-2xl font-bold tracking-tight`}
//         >
//           {Heading}
//         </h2>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {cases.map((caseItem) => (
//             // console.log(caseItem),
//             <CaseItem
//               // key={index}
//               key={caseItem._id}
//               caseItem={caseItem}
//               student={caseItem.student}
//               school={caseItem.school}
              
//             />
//           ))}
//         </div>

//                 {/* View More Cases Button */}
//         <div className="mt-8 text-center">
//           <Link
//             to="/cases"
//             className={`${
//               isDarkMode
//                 ? 'border-light text-light hover:text-light'
//                 : 'border-dark text-dark hover:text-dark'
//             } inline-block bg-transparent border-2  text-lg  px-4 py-4 rounded-lg shadow-md transform transition duration-300 ease-in-out  hover:scale-105 hover:shadow-xl`}
//           >
//             View More Cases Like These
//           </Link>
//         </div>


//       </div>
//     </motion.div>
//   );
// }














import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CaseItem from './CaseItem';
import { ThemeContext } from '../context/ThemeContext';
import { motion, useAnimation } from 'framer-motion';

export default function Suggestions({ Heading }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [schoolData, setSchoolData] = useState(null);
  const [studentData, setStudentData] = useState(null);

  // Fallback animation trigger
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        if (isVisible) {
          controls.start('visible');
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const slideInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  useEffect(() => {
    const fetchTopCases = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/case/top?limit=4');

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (!data.success)
          throw new Error(data.message || 'Failed to fetch cases');

        const casesWithDetails = await Promise.all(
          data.cases.map(async (caseItem) => {
            try {
              const [studentRes, schoolRes] = await Promise.all([
                fetch(
                  `http://localhost:3000/student/profile/${caseItem.studentId}`
                ),
                fetch(`http://localhost:3000/school/${caseItem.schoolId}`),
              ]);

              const [studentData, schoolData] = await Promise.all([
                studentRes.json(),
                schoolRes.json(),
              ]);
              setSchoolData(schoolData.school);
              setStudentData(studentData.data);

              return {
                ...caseItem
              
              };
            } catch (err) {
              console.error(`Error fetching details: ${err}`);
              return null;
            }
          })
        );

        setCases(casesWithDetails.filter(Boolean));
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCases();
  }, []);

  console.log('Cases:', studentData, schoolData, cases);

  if (loading) {
    return (
      <div
        className={`${
          isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
        } min-h-[50vh] flex items-center justify-center`}
      >
        <div className="animate-pulse text-xl">Loading recommendations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${
          isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
        } min-h-[50vh] flex flex-col items-center justify-center`}
      >
        <div className="text-red-500 text-xl mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className={`px-4 py-2 rounded ${
            isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={`${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
      <motion.div
        ref={sectionRef}
        initial="hidden"
        animate={controls}
        variants={slideInUp}
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
        style={{ minHeight: '500px' }}
      >
        <h2
          className={`${
            isDarkMode ? 'text-light' : 'text-dark'
          } text-3xl font-bold mb-8`}
        >
          {Heading}
        </h2>

        {cases.length > 0 ? (
          <>
            {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {cases.map((caseItem) => (
                <motion.div 
                key={caseItem._id} 
                variants={slideInUp}
                className='w-full'
                >
                  <CaseItem
                    key={caseItem._id}
                    caseItem={caseItem}
                    student={studentData}
                    school={schoolData}
                  />
                </motion.div>
              ))}
            </div> */}

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {cases.map((caseItem) => (
                <div key={caseItem._id} className="min-w-0">
                  {' '}
                  {/* Fixes overflow issues */}
                  <motion.div variants={slideInUp}>
                    <CaseItem
                      caseItem={caseItem}
                      school={schoolData}
                      student={studentData}
                    />
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                to="/cases"
                className={`
                  ${
                    isDarkMode
                      ? 'border-light text-light hover:bg-light hover:text-dark'
                      : 'border-dark text-dark hover:bg-dark hover:text-light'
                  }
                  inline-block border-2 text-lg px-6 py-3 rounded-lg
                  transition-all duration-300 hover:scale-105
                `}
              >
                View More Cases
              </Link>
            </motion.div>
          </>
        ) : (
          <div
            className={`${
              isDarkMode ? 'text-light' : 'text-dark'
            } text-center py-16`}
          >
            <p className="text-xl">No cases available at the moment.</p>
            <Link
              to="/cases"
              className={`inline-block mt-4 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              } hover:underline`}
            >
              Browse all cases
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}