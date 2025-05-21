import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaSchool, FaMapMarkerAlt, FaUserGraduate, FaChartLine, FaComments } from 'react-icons/fa';
import { IoMdArrowRoundBack, IoIosArrowBack } from 'react-icons/io';
import { GiAchievement } from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import dp from "../assets/images/dp.png";

const StudentProfilePage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  // Mock academic data - replace with actual data from backend
  const academicData = {
    grades: [
      { subject: 'Math', grade: 'A', progress: 85 },
      { subject: 'Science', grade: 'B+', progress: 78 },
      { subject: 'English', grade: 'A-', progress: 82 },
      { subject: 'Urdu', grade: 'B', progress: 75 },
    ],
    attendance: 92, // percentage
    schoolRating: 4.2, // out of 5
  };

  // Mock donor comments - replace with actual data from backend
  const donorComments = [
    {
      id: 1,
      name: 'Ali Khan',
      comment: 'This student shows remarkable potential in mathematics. Happy to support their education!',
      date: '2025-03-15',
      amount: 5000,
    },
    {
      id: 2,
      name: 'Fatima Ahmed',
      comment: 'Impressed by the dedication and improvement over the past year. Keep up the good work!',
      date: '2025-01-22',
      amount: 3000,
    },
  ];

  

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:3000/student/profile/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student details');
        }
        const data = await response.json();
        console.log(data);
        setStudent(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-buttons border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-dark">Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/students" className="inline-flex items-center px-4 py-2 bg-buttons text-white rounded-lg hover:bg-blue-700 transition-colors">
            <IoMdArrowRoundBack className="mr-2" />
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-dark mb-4">Student Not Found</h2>
          <p className="text-gray-600 mb-6">The student profile you're looking for doesn't exist.</p>
          <Link to="/students" className="inline-flex items-center px-4 py-2 bg-buttons text-white rounded-lg hover:bg-blue-700 transition-colors">
            <IoMdArrowRoundBack className="mr-2" />
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light">
      <NavBar />

      {/* Back button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Link
          to="/students"
          className="inline-flex items-center text-buttons hover:text-blue-800 mb-6 transition-colors"
        >
          <IoMdArrowRoundBack className="mr-2" />
          Back to Students
        </Link>
      </div>

      {/* Student Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Student Photo */}
            <div className="md:w-1/3 bg-lightdiv flex items-center justify-center p-8">
              <div className="relative">
                {student.passportPhoto ? (
                  <img
                    src={student.passportPhoto}
                    alt={student.passportPhoto}
                    className="w-64 h-64 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-64 h-64 rounded-full bg-buttons flex items-center justify-center text-white text-6xl font-bold border-4 border-white shadow-lg">
                    {student.fullName.charAt(0)}
                  </div>
                )}
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-md hover:scale-110 transition-transform"
                  aria-label={
                    isSaved ? 'Remove from saved' : 'Save to favorites'
                  }
                >
                  {isSaved ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-xl hover:text-red-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Student Info */}
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-dark mb-2">
                    {student.fullName}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center">
                      <FaUserGraduate className="mr-2 text-buttons" />
                      <span>
                        {student.gender}, {calculateAge(student.dateOfBirth)}{' '}
                        years
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-buttons" />
                      <span>{student.schoolAddress.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center">
                      <FaSchool className="mr-2 text-buttons" />
                      <span>{student.currentSchool}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="px-6 py-3 bg-buttons text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center">
                    Sponsor Education
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-lightdiv p-4 rounded-lg text-center">
                  <div className="text-buttons flex justify-center mb-2">
                    <FaUserGraduate className="text-2xl" />
                  </div>
                  <h3 className="font-medium text-dark">Grade</h3>
                  <p className="text-2xl font-bold text-dark">
                    {student.currentGrade}
                  </p>
                </div>
                <div className="bg-lightdiv p-4 rounded-lg text-center">
                  <div className="text-buttons flex justify-center mb-2">
                    <FaChartLine className="text-2xl" />
                  </div>
                  <h3 className="font-medium text-dark">Attendance</h3>
                  <p className="text-2xl font-bold text-dark">
                    {academicData.attendance}%
                  </p>
                </div>
                <div className="bg-lightdiv p-4 rounded-lg text-center">
                  <div className="text-buttons flex justify-center mb-2">
                    <FaStar className="text-2xl" />
                  </div>
                  <h3 className="font-medium text-dark">School Rating</h3>
                  <p className="text-2xl font-bold text-dark">
                    {academicData.schoolRating}/5
                  </p>
                </div>
                <div className="bg-lightdiv p-4 rounded-lg text-center">
                  <div className="text-buttons flex justify-center mb-2">
                    <GiAchievement className="text-2xl" />
                  </div>
                  <h3 className="font-medium text-dark">Potential</h3>
                  <p className="text-2xl font-bold text-dark">High</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-dark mb-3">
                  About Me
                </h3>
                <div
                  className={`text-gray-700 ${
                    showFullBio ? '' : 'line-clamp-3'
                  }`}
                >
                  {student.careerAspiration ? (
                    <p>{student.careerAspiration}</p>
                  ) : (
                    <p>
                      {student.fullName} is a dedicated {student.currentGrade}{' '}
                      student at {student.currentSchool} in{' '}
                      {student.schoolAddress.split(',')[0]}.
                      {student.areasOfInterest &&
                        ` Passionate about ${student.areasOfInterest.toLowerCase()}, `}
                      {student.fullName} demonstrates strong academic potential
                      and consistent attendance.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-buttons font-medium mt-2 hover:underline"
                >
                  {showFullBio ? 'Show less' : 'Read more'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-dark mb-4">
                Academic Performance
              </h2>

              <div className="space-y-4">
                {academicData.grades.map((subject, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-dark">
                        {subject.subject}
                      </span>
                      <span className="font-bold text-dark">
                        {subject.grade}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-buttons h-2.5 rounded-full"
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-dark mb-3">
                  Attendance
                </h3>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-4">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${academicData.attendance}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-dark">
                    {academicData.attendance}%
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-dark mb-3">
                  School Rating
                </h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${
                        i < Math.floor(academicData.schoolRating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-medium text-dark">
                    {academicData.schoolRating}/5
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-dark mb-3">
                  Financial Need
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Family Income</span>
                    <span className="font-medium text-dark">
                      {student.monthlyFamilyIncome}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dependents</span>
                    <span className="font-medium text-dark">
                      {student.dependentsCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Support</span>
                    <span className="font-medium text-dark">
                      {student.existingScholarship
                        ? 'Partial Scholarship'
                        : 'No Support'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
            >
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'border-buttons text-buttons'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('academics')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'academics'
                        ? 'border-buttons text-buttons'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Academics
                  </button>
                  <button
                    onClick={() => setActiveTab('supporters')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === 'supporters'
                        ? 'border-buttons text-buttons'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Supporters
                  </button>
                </nav>
              </div>

              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-dark mb-6">
                        Student Overview
                      </h2>

                      <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-lightdiv p-6 rounded-lg">
                          <h3 className="text-lg font-semibold text-dark mb-3">
                            Academic Goals
                          </h3>
                          <p className="text-gray-700">
                            {student.careerAspiration ||
                              `${student.fullName} is focused on excelling in ${student.currentGrade} and building a strong foundation for future academic success.`}
                          </p>
                        </div>
                        <div className="bg-lightdiv p-6 rounded-lg">
                          <h3 className="text-lg font-semibold text-dark mb-3">
                            Areas of Interest
                          </h3>
                          <p className="text-gray-700">
                            {student.areasOfInterest ||
                              `${student.fullName} shows interest in multiple subjects and is exploring different fields of study.`}
                          </p>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-dark mb-4">
                          Why Support {student.fullName.split(' ')[0]}?
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                              <div className="flex items-center justify-center size-10 rounded-full bg-buttons text-white font-bold">
                                1
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-dark mb-1">
                                Consistent Performer
                              </h4>
                              <p className="text-gray-700">
                                Maintains good grades with{' '}
                                {academicData.attendance}% attendance, showing
                                dedication to education.
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                              <div className="flex items-center justify-center size-10 rounded-full bg-buttons text-white font-bold">
                                2
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-dark mb-1">
                                Financial Need
                              </h4>
                              <p className="text-gray-700">
                                Comes from a family of {student.dependentsCount}{' '}
                                with limited resources (
                                {student.monthlyFamilyIncome} monthly income).
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="flex-shrink-0 mr-4">
                              <div className="flex items-center justify-center size-10 rounded-full bg-buttons text-white font-bold">
                                3
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium text-dark mb-1">
                                Potential for Impact
                              </h4>
                              <p className="text-gray-700">
                                Your support can make a significant difference
                                in {student.fullName.split(' ')[0]}'s
                                educational journey and future.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'academics' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-dark mb-6">
                        Academic Details
                      </h2>

                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-dark mb-4">
                          Current School
                        </h3>
                        <div className="bg-lightdiv p-6 rounded-lg">
                          <div className="flex items-center mb-3">
                            <FaSchool className="text-buttons mr-3 text-xl" />
                            <h4 className="text-lg font-medium text-dark">
                              {student.currentSchool}
                            </h4>
                          </div>
                          <div className="flex items-center mb-3">
                            <FaMapMarkerAlt className="text-buttons mr-3 text-xl" />
                            <p className="text-gray-700">
                              {student.schoolAddress}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <FaStar className="text-buttons mr-3 text-xl" />
                            <p className="text-gray-700">
                              School Rating: {academicData.schoolRating}/5 (
                              {academicData.schoolRating >= 4
                                ? 'Excellent'
                                : academicData.schoolRating >= 3
                                ? 'Good'
                                : 'Average'}
                              )
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-dark mb-4">
                          Subject Performance
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-buttons text-white">
                              <tr>
                                <th className="py-3 px-4 text-left">Subject</th>
                                <th className="py-3 px-4 text-left">Grade</th>
                                <th className="py-3 px-4 text-left">
                                  Progress
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {academicData.grades.map((subject, index) => (
                                <tr key={index}>
                                  <td className="py-3 px-4">
                                    {subject.subject}
                                  </td>
                                  <td className="py-3 px-4 font-medium">
                                    {subject.grade}
                                  </td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center">
                                      <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                                        <div
                                          className={`h-2.5 rounded-full ${
                                            subject.progress >= 80
                                              ? 'bg-green-500'
                                              : subject.progress >= 60
                                              ? 'bg-yellow-500'
                                              : 'bg-red-500'
                                          }`}
                                          style={{
                                            width: `${subject.progress}%`,
                                          }}
                                        ></div>
                                      </div>
                                      <span>{subject.progress}%</span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'supporters' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold text-dark mb-6">
                        Supporters & Comments
                      </h2>

                      <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-semibold text-dark mb-2">
                              Previous Supporters
                            </h3>
                            <p className="text-gray-600">
                              {donorComments.length} people have supported this
                              student
                            </p>
                          </div>
                          <button className="mt-4 md:mt-0 px-6 py-3 bg-buttons text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Become a Supporter
                          </button>
                        </div>

                        {donorComments.length > 0 ? (
                          <div className="space-y-6">
                            {donorComments.map((comment) => (
                              <div
                                key={comment.id}
                                className="border-b border-gray-200 pb-6 last:border-0"
                              >
                                <div className="flex items-start">
                                  <div className="mr-4">
                                    <div className="w-12 h-12 rounded-full bg-buttons flex items-center justify-center text-white font-bold">
                                      {comment.name.charAt(0)}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                      <h4 className="font-medium text-dark">
                                        {comment.name}
                                      </h4>
                                      <span className="text-sm text-gray-500">
                                        {comment.date}
                                      </span>
                                    </div>
                                    <p className="text-gray-700 mb-2">
                                      {comment.comment}
                                    </p>
                                    <div className="text-sm text-buttons font-medium">
                                      Supported with Rs.{' '}
                                      {comment.amount.toLocaleString()}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 bg-lightdiv rounded-lg">
                            <FaComments className="text-4xl text-gray-400 mx-auto mb-4" />
                            <h4 className="text-lg font-medium text-gray-600">
                              No comments yet
                            </h4>
                            <p className="text-gray-500">
                              Be the first to support this student!
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-r from-buttons to-blue-700 rounded-xl shadow-lg p-8 text-white mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">
                    Make a Difference Today
                  </h3>
                  <p className="opacity-90">
                    Your support can change {student.fullName.split(' ')[0]}'s
                    educational journey
                  </p>
                </div>
                <button className="px-8 py-3 bg-white text-buttons rounded-lg font-bold hover:bg-opacity-90 transition-colors shadow-lg">
                  Sponsor Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentProfilePage;