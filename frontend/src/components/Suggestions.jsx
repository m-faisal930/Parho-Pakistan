


// import React, { useContext, useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import CaseItem from './CaseItem';
// import { ThemeContext } from '../context/ThemeContext';
// import { motion, useAnimation } from 'framer-motion';

// export default function Suggestions({ Heading }) {
//   const { isDarkMode } = useContext(ThemeContext);
//   const [cases, setCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const controls = useAnimation();
//   const sectionRef = useRef(null);
//   const [schoolData, setSchoolData] = useState([]);
//   const [studentData, setStudentData] = useState([]);

//   // Fallback animation trigger
//   useEffect(() => {
//     const handleScroll = () => {
//       if (sectionRef.current) {
//         const rect = sectionRef.current.getBoundingClientRect();
//         const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
//         if (isVisible) {
//           controls.start('visible');
//         }
//       }
//     };

//     // Initial check
//     handleScroll();

//     // Add scroll listener
//     window.addEventListener('scroll', handleScroll, { passive: true });

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [controls]);

//   const slideInUp = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: 'easeOut',
//         when: 'beforeChildren',
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   useEffect(() => {
//     const fetchTopCases = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           `${import.meta.env.VITE_BASE_URL}case/top?limit=4`
//         );


//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);

//         const data = await response.json();
//         // console.log('Data:', data);
//         if (!data.success)
//           throw new Error(data.message || 'Failed to fetch cases');


//         const casesWithDetails = await Promise.all(
//           data.cases.map(async (caseItem) => {
//             console.log('caseItem is:', caseItem); // Log the caseItem
//             try {
//               const [studentRes, schoolRes] = await Promise.all([
//                 fetch(
//                   `${import.meta.env.VITE_BASE_URL}student/profile/${
//                     caseItem.studentId
//                   }`
//                 ),
//                 fetch(
//                   `${import.meta.env.VITE_BASE_URL}school/${caseItem.schoolId}`
//                 ),
//               ]);

//               const [studentData, schoolData] = await Promise.all([
//                 studentRes.json(),
//                 schoolRes.json(),
//               ]);
//               // For school data (if schoolData is just an array)
//               setSchoolData((prev) => [...prev, schoolData.school]);

//               // For student data (if studentData is just an array)
//               setStudentData((prev) => [...prev, studentData.data]);

//               // setSchoolData(schoolData.school);
//               // setStudentData(studentData.data);

//               return {
//                 ...caseItem,
//               };
//             } catch (err) {
//               console.error(`Error fetching details: ${err}`);
//               return null;
//             }
//           })
//         );

//         setCases(casesWithDetails.filter(Boolean));
//       } catch (err) {
//         console.error('Fetch error:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopCases();
//   }, []);

//   console.log('Cases are:', cases);

//   if (loading) {
//     return (
//       <div
//         className={`${
//           isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
//         } min-h-[50vh] flex items-center justify-center`}
//       >
//         <div className="animate-pulse text-xl">Loading recommendations...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         className={`${
//           isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
//         } min-h-[50vh] flex flex-col items-center justify-center`}
//       >
//         <div className="text-red-500 text-xl mb-4">Error: {error}</div>
//         <button
//           onClick={() => window.location.reload()}
//           className={`px-4 py-2 rounded ${
//             isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
//           }`}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={`${isDarkMode ? 'bg-dark' : 'bg-light'}`}>
//       <motion.div
//         ref={sectionRef}
//         initial="hidden"
//         animate={controls}
//         variants={slideInUp}
//         className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
//         style={{ minHeight: '500px' }}
//       >
//         <h2
//           className={`${
//             isDarkMode ? 'text-light' : 'text-dark'
//           } text-3xl font-bold mb-8`}
//         >
//           {Heading}
//         </h2>

//         {cases.length > 0 ? (
//           <>
//             <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//               {cases.map((caseItem) => (
//                 <div key={caseItem._id} className="min-w-0">
//                   {' '}
//                   {/* Fixes overflow issues */}
//                   <motion.div variants={slideInUp}>
//                     <CaseItem
//                       caseItem={caseItem}
//                       school={schoolData}
//                       student={studentData}
//                     />
//                   </motion.div>
//                 </div>
//               ))}
//             </div>

//             <motion.div
//               className="mt-12 text-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.8 }}
//             >
//               <Link
//                 to="/cases"
//                 className={`
//                   ${
//                     isDarkMode
//                       ? 'border-light text-light hover:bg-light hover:text-dark'
//                       : 'border-dark text-dark hover:bg-dark hover:text-light'
//                   }
//                   inline-block border-2 text-lg px-6 py-3 rounded-lg
//                   transition-all duration-300 hover:scale-105
//                 `}
//               >
//                 View More Cases
//               </Link>
//             </motion.div>
//           </>
//         ) : (
//           <div
//             className={`${
//               isDarkMode ? 'text-light' : 'text-dark'
//             } text-center py-16`}
//           >
//             <p className="text-xl">No cases available at the moment.</p>
//             <Link
//               to="/cases"
//               className={`inline-block mt-4 ${
//                 isDarkMode ? 'text-blue-400' : 'text-blue-600'
//               } hover:underline`}
//             >
//               Browse all cases
//             </Link>
//           </div>
//         )}
//       </motion.div>
//     </div>
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

    handleScroll();
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
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}case/top?limit=4`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch cases');
        }

        // Fetch details for all cases in parallel
        const casesWithDetails = await Promise.all(
          data.cases.map(async (caseItem) => {
            try {
              const [studentRes, schoolRes] = await Promise.all([
                fetch(
                  `${import.meta.env.VITE_BASE_URL}student/profile/${
                    caseItem.studentId
                  }`
                ),
                fetch(
                  `${import.meta.env.VITE_BASE_URL}school/${caseItem.schoolId}`
                ),
              ]);

              const [studentData, schoolData] = await Promise.all([
                studentRes.json(),
                schoolRes.json(),
              ]);

              // Return the case with embedded student and school data
              return {
                ...caseItem,
                student: studentData.data,
                school: schoolData.school,
              };
            } catch (err) {
              console.error(
                `Error fetching details for case ${caseItem._id}:`,
                err
              );
              return null;
            }
          })
        );

        // Filter out any failed cases and set state
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
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {cases.map((caseItem) => (
                <div key={caseItem._id} className="min-w-0">
                  <motion.div variants={slideInUp}>
                    <CaseItem
                      caseItem={caseItem}
                      school={caseItem.school}
                      student={caseItem.student}
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