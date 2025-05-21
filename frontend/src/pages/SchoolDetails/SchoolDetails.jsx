
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaUsers,
  FaChalkboardTeacher,
  FaBus,
  FaGraduationCap,
  FaStar,
  FaTrophy,
  FaMedal,
  FaRegCalendarAlt,
  FaFileAlt,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { GiSchoolBag } from 'react-icons/gi';
// import { Gears } from 'react-icons/fa'; // If Gears is from FontAwesome
import { AiOutlineSafety } from 'react-icons/ai';
import { FaCogs } from "react-icons/fa"; // OR use GiGears if you want a game-style icon

import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import BackToTopButton from '../../components/BackToTopButton';
import ChatbotIcon from '../../components/ChatbotIcon';
import Suggestions from '../../components/Suggestions';

const SchoolDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [imageIndex, setImageIndex] = useState(0);
  const [isHoveringContact, setIsHoveringContact] = useState(false);
  const [showLevelsModal, setShowLevelsModal] = useState(false);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}school/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch school details');
        }
        const data = await response.json();
        setSchool(data.school);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchool();
  }, [id]);

  const handlePrevImage = () => {
    setImageIndex(prev => (prev === 0 ? schoolImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setImageIndex(prev => (prev === schoolImages.length - 1 ? 0 : prev + 1));
  };
  const getLevelDescription = (level) => {
  const descriptions = {
    1: "New School - Basic features unlocked",
    2: "Growing School - Enhanced student capacity",
    3: "Established School - Premium features unlocked",
    4: "Advanced School - Priority support access",
    5: "Elite School - All features unlocked"
  };
  return descriptions[level] || `Level ${level} - Premium status`;
};

const getLevelBenefits = (level) => {
  const benefits = {
    1: "Max 50 students",
    2: "Max 200 students, Basic analytics",
    3: "Max 500 students, Advanced features",
    4: "Max 1000 students, Priority support",
    5: "Unlimited students, All features"
  };
  return benefits[level] || `Level ${level} benefits`;
};

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <motion.p 
            className="mt-4 text-lg font-medium text-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading school details...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Error Loading School
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/schools')}
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
          >
            <IoIosArrowBack className="mr-2" />
            Back to Schools
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-blue-400 mb-4">
            School Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            The school you're looking for doesn't exist or may have been removed.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/schools')}
            className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium"
          >
            <IoIosArrowBack className="mr-2" />
            Back to Schools
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const schoolImages = [
    'https://images.unsplash.com/photo-1588072432906-62bc70b6aebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  ];

  const stats = [
    { icon: <FaUsers className="text-3xl" />, label: "Students", value: school.noOfStudents },
    { icon: <FaChalkboardTeacher className="text-3xl" />, label: "Staff", value: school.noOfStaff },
    { icon: <FaGraduationCap className="text-3xl" />, label: "Ratio", value: school.studentTeacherRatio },
    { icon: <FaBus className="text-3xl" />, label: "Transport", value: school.transportAvailability }
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-light text-dark font-work min-h-screen">
      <NavBar />

      {/* Back button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/schools')}
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition-colors font-medium"
        >
          <IoIosArrowBack className="mr-2" />
          Back to Schools
        </motion.button>
      </div>

      {/* School Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
        >
          {/* Image Gallery */}
          <div className="relative h-80 md:h-96 lg:h-[32rem] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={schoolImages[imageIndex]}
                alt={school.schoolName}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
            >
              <FaChevronRight />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
              {schoolImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    imageIndex === index
                      ? 'bg-blue-500 scale-125'
                      : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Rating Badge */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center shadow-lg"
            >
              <FaStar className="mr-2 text-yellow-300" />
              <span>4.8/5</span>
            </motion.div>

            {/* School Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8 pt-16">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {school.schoolName}
              </h1>
              <div className="flex items-center text-blue-300">
                <FaMapMarkerAlt className="mr-2" />
                <span>{school.address}</span>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-light p-6 rounded-xl text-center border border-gray-600 hover:border-blue-500 transition-all"
                >
                  <div className="text-blue-400 flex justify-center mb-3">
                    {stat.icon}
                  </div>
                  <h3 className="font-medium text-dark">{stat.label}</h3>
                  <p className="text-2xl font-bold text-dark mt-1">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-light rounded-2xl shadow-lg p-6 sticky top-28 border border-gray-700"
            >
              <h2 className="text-xl font-bold text-dark mb-6 pb-4 border-b border-gray-700">
                Quick Info
              </h2>

              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="text-blue-400 mt-1 mr-4">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Phone</h3>
                    <p className="text-dark">{school.contactNo}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-blue-400 mt-1 mr-4">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email</h3>
                    <p className="text-dark">{school.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-blue-400 mt-1 mr-4">
                    <FaGlobe />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Website
                    </h3>
                    <a
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline hover:text-blue-300"
                    >
                      {school.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-blue-400 mt-1 mr-4">
                    <GiSchoolBag />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Type</h3>
                    <p className="text-dark capitalize">{school.schoolType}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-blue-400 mt-1 mr-4">
                    <FaCogs size={24} />
                    {/* <Gears /> */}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Management
                    </h3>
                    <p className="text-dark capitalize">
                      {school.managementType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges & Level System */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-sm font-medium text-dark mb-4">
                  School Level
                </h3>
                <div className="flex items-center mb-6">
                  <div className="bg-yellow-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <FaTrophy className="text-gray-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-dark">
                      Level {school.level || 1}
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full h-2.5"
                        style={{
                          width: `${
                            (school.xp / ((school.level || 1) * 1000)) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {school.xp || 0}/{(school.level || 1) * 1000} XP to next
                      level
                    </p>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-gray-700 mb-4">
                  Earned Badges
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {school.badges?.map((badge, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-700 p-3 rounded-lg flex flex-col items-center text-center border border-gray-600"
                    >
                      <FaMedal className="text-yellow-400 text-xl mb-1" />
                      <span className="text-xs font-medium text-white">
                        {badge}
                      </span>
                    </motion.div>
                  ))}
                  {(!school.badges || school.badges.length === 0) && (
                    <p className="text-gray-400 text-sm col-span-3">
                      No badges yet. Complete more registrations to earn badges!
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowLevelsModal(true)}
                  className="text-xs text-blue-600 hover:underline mt-2"
                >
                  Learn about all levels →
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Courses Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {school.courses.map((course, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-900 bg-opacity-50 text-light px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {course}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-sm font-medium text-gray-400 mb-3">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {school.languages.map((language, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-900 bg-opacity-50 text-light px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {language}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Contact Button */}
              <motion.button
                whileHover={{
                  scale: 1.03,
                  backgroundColor: isHoveringContact ? '#3B82F6' : '#2563EB',
                  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHoveringContact(true)}
                onHoverEnd={() => setIsHoveringContact(false)}
                className="w-full mt-8 py-3 bg-blue-600 text-white rounded-xl font-medium transition-all flex items-center justify-center"
              >
                <FaPhone className="mr-2" />
                Contact School
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="lg:w-3/4">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-light rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-700"
            >
              <div className="border-b border-gray-700">
                <nav className="flex -mb-px">
                  {['overview', 'facilities', 'admissions', 'reviews'].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab
                            ? 'border-blue-500 text-blue-400'
                            : 'border-transparent text-dark hover:text-gray-600 hover:border-gray-600'
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
                </nav>
              </div>

              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {activeTab === 'overview' && (
                      <div>
                        <h2 className="text-2xl font-bold text-dark mb-6">
                          About {school.schoolName}
                        </h2>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                          {school.description ||
                            'This prestigious institution is known for its academic excellence and commitment to student development. With a rich history and modern facilities, we provide an environment where students can thrive both academically and personally.'}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl border border-blue-800"
                          >
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                                <FaGraduationCap />
                              </span>
                              Our Mission
                            </h3>
                            <p className="text-blue-100">
                              To empower students with knowledge, skills, and
                              values that prepare them for success in a rapidly
                              changing world while fostering a lifelong love of
                              learning.
                            </p>
                          </motion.div>
                          <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-xl border border-purple-800"
                          >
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                              <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3">
                                <FaStar />
                              </span>
                              Our Vision
                            </h3>
                            <p className="text-purple-100">
                              To be a leading educational institution recognized
                              for innovation, academic excellence, and the
                              development of well-rounded global citizens.
                            </p>
                          </motion.div>
                        </div>

                        <h3 className="text-xl font-semibold text-dark mb-6">
                          Principal's Message
                        </h3>
                        <motion.div
                          whileHover={{ y: -3 }}
                          className="flex items-start bg-light p-6 rounded-xl border border-gray-600"
                        >
                          <div className="mr-5">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                              {school.principalName
                                ? school.principalName.charAt(0)
                                : 'P'}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-dark text-lg">
                              {school.principalName || 'Principal Name'}
                            </h4>
                            <p className="text-blue-600 text-sm mb-4">
                              Principal
                            </p>
                            <p className="text-gray-700">
                              "At {school.schoolName}, we believe every child
                              has unique talents waiting to be discovered. Our
                              dedicated staff works tirelessly to create an
                              environment where students can explore their
                              potential while receiving a world-class
                              education."
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {activeTab === 'facilities' && (
                      <div>
                        <h2 className="text-2xl font-bold text-dark mb-8">
                          Facilities at {school.schoolName}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            {
                              title: 'Learning Environment',
                              icon: <FaChalkboardTeacher className="text-xl" />,
                              items: [
                                'Smart classrooms with digital boards',
                                'Well-equipped science laboratories',
                                'Computer lab with high-speed internet',
                                'Library with extensive book collection',
                              ],
                            },
                            {
                              title: 'Sports & Recreation',
                              icon: <FaTrophy className="text-xl" />,
                              items: [
                                'Indoor sports complex',
                                'Large playground',
                                'Swimming pool',
                                'Music and arts rooms',
                              ],
                            },
                            {
                              title: 'Health & Safety',
                              icon: <AiOutlineSafety className="text-xl" />,
                              items: [
                                'On-campus medical room with nurse',
                                '24/7 security and CCTV surveillance',
                                'Fire safety systems',
                                'Anti-bullying policies',
                              ],
                            },
                            {
                              title: 'Transportation',
                              icon: <FaBus className="text-xl" />,
                              items: [
                                school.transportAvailability,
                                'GPS-tracked vehicles',
                                'Trained drivers and attendants',
                                'Covered routes across the city',
                              ],
                            },
                          ].map((facility, index) => (
                            <motion.div
                              key={index}
                              whileHover={{ y: -5 }}
                              className="bg-gray-700 p-6 rounded-xl border border-gray-600"
                            >
                              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                                  {facility.icon}
                                </span>
                                {facility.title}
                              </h3>
                              <ul className="space-y-3 text-gray-300">
                                {facility.items.map((item, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-blue-400 mr-2 mt-1">
                                      •
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'admissions' && (
                      <div>
                        <h2 className="text-2xl font-bold text-dark mb-8">
                          Admission Process
                        </h2>

                        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-8 mb-10 border border-blue-700">
                          <h3 className="text-xl font-semibold text-white mb-6">
                            Tuition & Fees
                          </h3>
                          <div className="grid md:grid-cols-3 gap-5">
                            {[
                              {
                                title: 'Registration Fee',
                                amount: `Rs. ${
                                  school.tuitionAndFees || '5,000'
                                }`,
                                note: 'One-time payment',
                              },
                              {
                                title: 'Monthly Tuition',
                                amount: 'Rs. 15,000',
                                note: 'Payable in quarterly installments',
                              },
                              {
                                title: 'Other Charges',
                                amount: 'Rs. 10,000',
                                note: 'Annual charges',
                              },
                            ].map((fee, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="bg-gray-800 bg-opacity-50 p-5 rounded-lg border border-gray-700"
                              >
                                <h4 className="font-medium text-white mb-3">
                                  {fee.title}
                                </h4>
                                <p className="text-2xl font-bold text-blue-300">
                                  {fee.amount}
                                </p>
                                <p className="text-gray-400 text-sm mt-2">
                                  {fee.note}
                                </p>
                              </motion.div>
                            ))}
                          </div>

                          {school.scholarshipsOrFinancialAssistance && (
                            <div className="mt-8 pt-6 border-t border-blue-700">
                              <h4 className="font-medium text-white mb-3">
                                Financial Assistance
                              </h4>
                              <p className="text-blue-100">
                                {school.scholarshipsOrFinancialAssistance}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mb-10">
                          <h3 className="text-xl font-semibold text-dark mb-8">
                            How to Apply
                          </h3>
                          <div className="space-y-8">
                            {[
                              {
                                step: 1,
                                title: 'Submit Application',
                                icon: <FaFileAlt />,
                                description:
                                  'Complete the online application form available on our website or collect a physical form from the school office.',
                              },
                              {
                                step: 2,
                                title: 'Entrance Assessment',
                                icon: <FaGraduationCap />,
                                description:
                                  'Students will be invited for an age-appropriate assessment to evaluate their current academic level.',
                              },
                              {
                                step: 3,
                                title: 'Parent Interview',
                                icon: <FaUsers />,
                                description:
                                  "A meeting with the principal or head of admissions to discuss the school's philosophy and expectations.",
                              },
                              {
                                step: 4,
                                title: 'Admission Decision',
                                icon: <FaRegCalendarAlt />,
                                description:
                                  'You will receive notification of the admission decision within 7 working days of completing the process.',
                              },
                            ].map((step, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ x: 5 }}
                                className="flex"
                              >
                                <div className="flex-shrink-0 mr-5">
                                  <div className="flex items-center justify-center size-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xl font-bold shadow-lg">
                                    {step.icon}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-lg font-medium text-dark mb-2">
                                    {step.title}
                                  </h4>
                                  <p className="text-gray-700">
                                    {step.description}
                                  </p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-700 border border-gray-600 rounded-xl p-8">
                          <h3 className="text-xl font-semibold text-white mb-6">
                            Required Documents
                          </h3>
                          <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
                            {[
                              'Birth certificate (original + copy)',
                              'Previous school reports (if applicable)',
                              '4 recent passport-sized photographs',
                              'B-form or CNIC of student',
                              'CNIC copies of both parents',
                              'Vaccination records',
                            ].map((doc, index) => (
                              <motion.li
                                key={index}
                                whileHover={{ x: 5 }}
                                className="flex items-start"
                              >
                                <span className="text-blue-400 mr-2 mt-1">
                                  •
                                </span>
                                <span>{doc}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === 'reviews' && (
                      <div>
                        <h2 className="text-2xl font-bold text-dark mb-8">
                          Parent & Student Reviews
                        </h2>

                        <div className="bg-gray-700 rounded-xl shadow-lg p-8 mb-10 border border-gray-600">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div>
                              <div className="flex items-center mb-3">
                                <div className="flex mr-3">
                                  {[1, 2, 3, 4].map((star) => (
                                    <FaStar
                                      key={star}
                                      className="text-2xl text-yellow-400"
                                    />
                                  ))}
                                  <FaStar className="text-2xl text-gray-500" />
                                </div>
                                <span className="text-gray-300 text-lg">
                                  4.2 out of 5
                                </span>
                              </div>
                              <p className="text-gray-400">
                                Based on 24 reviews
                              </p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="mt-4 md:mt-0 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all"
                            >
                              Write a Review
                            </motion.button>
                          </div>

                          <div className="space-y-8">
                            {[
                              {
                                rating: 5,
                                title: 'Excellent School',
                                content: `My child has thrived at ${school.schoolName}. The teachers are dedicated and the facilities are top-notch. The focus on both academics and character development is impressive.`,
                                author: 'Ahmed R., Parent (Grade 5)',
                              },
                              {
                                rating: 4,
                                title: 'Great Experience',
                                content:
                                  'The school provides a balanced education with excellent extracurricular activities. The sports facilities are particularly good, and my son loves the football program.',
                                author: 'Fatima S., Parent (Grade 8)',
                              },
                              {
                                rating: 3,
                                title: 'Good but could improve',
                                content:
                                  'Overall a good school with qualified teachers. The communication with parents could be better, and the homework load is sometimes heavy for younger students.',
                                author: 'Usman K., Parent (Grade 3)',
                              },
                            ].map((review, index) => (
                              <motion.div
                                key={index}
                                whileHover={{ y: -3 }}
                                className="border-b border-gray-600 pb-8 last:border-0 last:pb-0"
                              >
                                <div className="flex items-center mb-4">
                                  <div className="flex mr-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <FaStar
                                        key={star}
                                        className={`${
                                          star <= review.rating
                                            ? 'text-yellow-400'
                                            : 'text-gray-500'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <h4 className="font-medium text-white">
                                    {review.title}
                                  </h4>
                                </div>
                                <p className="text-gray-300 mb-4 leading-relaxed">
                                  "{review.content}"
                                </p>
                                <p className="text-sm text-gray-400">
                                  - {review.author}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Location Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-light mb-4">
                  Location
                </h2>
                <p className="text-light mb-6">{school.address}</p>

                {/* Map placeholder - replace with actual map component */}
                <div className="bg-gray-200 h-64 md:h-80 rounded-lg flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <FaMapMarkerAlt className="text-4xl mx-auto text-blue-500 mb-3" />
                    <p>Interactive Map of {school.schoolName}</p>
                    <p className="text-sm mt-2">
                      (Would display Google Maps integration in production)
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <button className="px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <FaPhone className="mr-2" />
                    Call for Directions
                  </button>
                  <button className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                    <FaGlobe className="mr-2" />
                    Open in Maps
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold font-work text-dark text-center mt-4">
        Cases On Our Parho Pakistan
      </h2>

      <Suggestions />

      <ChatbotIcon />
      <BackToTopButton />
      <Footer />
      {/* Levels Information Modal */}
      {showLevelsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  School Level System
                </h3>
                <button
                  onClick={() => setShowLevelsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`p-4 rounded-lg border ${
                      level <= (school.level || 1)
                        ? 'border-blue-200 bg-blue-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          level <= (school.level || 1)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {level}
                      </div>
                      <h4 className="font-bold">
                        Level {level} {level <= (school.level || 1) && '✓'}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {getLevelDescription(level)}
                    </p>
                    <div className="text-xs text-gray-500">
                      Requires: {level * 1000} XP • {getLevelBenefits(level)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-2">
                  How to level up?
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Complete student registrations (+100 XP each)</li>
                  <li>• Maintain good student retention (+50 XP monthly)</li>
                  <li>• Update school information regularly (+30 XP)</li>
                  <li>• Engage with parent community (+20 XP)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolDetails;





