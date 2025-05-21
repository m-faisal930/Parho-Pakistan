


import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FaUserGraduate,
  FaSchool,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTags,
  FaHeart,
  FaBook,
  FaBus,
} from 'react-icons/fa';

import LoadingSpinner from '../components/Spinner';
// import ErrorMessage from '../components/ErrorMessage';
import DonationProgress from '../components/DonationProgress';
// import CaseGallery from '../../components/CaseGallery';
import SponsorButton from '../components/SponserButton';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const CaseDetails = () => {
  console.log(useParams().id);
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}case/${id}`
        );
        const data = await response.json();

        if (!data.success) throw new Error('Case not found');

        // Fetch student and school details
        const [studentRes, schoolRes] = await Promise.all([
          fetch(
            `${import.meta.env.VITE_BASE_URL}student/profile/${
              data.case.studentId
            }`
          ),
          fetch(`${import.meta.env.VITE_BASE_URL}school/${data.case.schoolId}`),
        ]);
        console.log(studentRes, schoolRes);

        const [studentData, schoolData] = await Promise.all([
          studentRes.json(),
          schoolRes.json(),
        ]);

        setCaseData({
          ...data.case,
          student: studentData.data || studentData.student,
          school: schoolData.school,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id]);
  console.log("case data ", caseData);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!caseData) return <ErrorMessage message="Case not found" />;

  // Calculate total funding needed
  const totalFunding = caseData.donationBreakdown
    ? Object.values(caseData.donationBreakdown).reduce(
        (sum, amount) => sum + amount,
        0
      )
    : 0;

  // Calculate age from date of birth
  const dob = caseData.student?.dateOfBirth
    ? new Date(caseData.student.dateOfBirth)
    : null;
  const age = dob ? new Date().getFullYear() - dob.getFullYear() : 'N/A';

  // Extract city from school address
  const city = caseData.school?.address?.split(',')?.[1]?.trim() || 'Unknown';

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 mt-11 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back to cases arrow */}
          <div className="mb-4 flex items-center text-gray-600 cursor-pointer hover:text-gray-800 transition duration-200">
            <span className="text-sm font-semibold">
              <a href="/cases" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 
1 0 00-1.414 0L8 8.586V3a1 1 0 00-2 0v5.586l-3.293-3.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Cases
              </a>
            </span>
          </div>

          {/* Header Section - Compact Design */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end mb-6">
              <div className="flex-1">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    caseData.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : caseData.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {caseData.status || 'Unknown'} Case
                </span>

                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                    Supporting{' '}
                    {caseData.student?.fullName?.split(' ')[0] || 'Student'}'s
                    Education Journey
                  </h1>

              </div>
              <SponsorButton
                caseId={caseData._id}
                studentName={caseData.student?.fullName}
                className="w-full md:w-auto"
              />
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-700 font-medium">{caseData.title}</p>
              {caseData.description && (
                <p className="text-gray-600 mt-2">{caseData.description}</p>
              )}
            </div>
          </div>

          {/* Main Content Grid - Tightened Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Student Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Student Profile Card - Compact */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5">
                  <div className="flex items-center gap-5">
                    <div className="flex-shrink-0">
                      {caseData.student?.passportPhoto ? (
                        <img
                          src={caseData.student.passportPhoto}
                          alt={caseData.student.fullName}
                          className="h-20 w-20 rounded-full object-cover border-2 border-indigo-100"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center">
                          <FaUserGraduate className="text-3xl text-indigo-500" />
                        </div>
                      )}
                    </div>
                    <div>
                    <Link to={`/student/${caseData.student._id}`}>
                      <h2 className="text-xl font-bold text-gray-900">
                        {caseData.student?.fullName || 'Student Name'}
                      </h2>
                    </Link>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                        <span className="flex items-center text-gray-600">
                          <FaCalendarAlt className="mr-1.5 text-indigo-500 text-sm" />
                          {age} years
                        </span>
                        <span className="flex items-center text-gray-600">
                          <FaSchool className="mr-1.5 text-indigo-500 text-sm" />
                          {caseData.student?.currentGrade || 'N/A'}
                        </span>
                        <span className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="mr-1.5 text-indigo-500 text-sm" />
                          {city}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Funding Breakdown - Compact */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FaMoneyBillWave className="mr-2 text-indigo-500" />
                    Funding Needs
                  </h3>

                  <DonationProgress
                    raised={0}
                    goal={totalFunding}
                    compact={true}
                  />

                  <div className="mt-4 space-y-3">
                    {caseData.donationBreakdown &&
                      Object.entries(caseData.donationBreakdown).map(
                        ([category, amount]) => (
                          <div
                            key={category}
                            className="flex justify-between items-center text-sm"
                          >
                            <div className="flex items-center">
                              {category === 'Tuition Fees' && (
                                <FaSchool className="mr-2 text-indigo-500 text-sm" />
                              )}
                              {category === 'Books' && (
                                <FaBook className="mr-2 text-indigo-500 text-sm" />
                              )}
                              {category === 'Transport' && (
                                <FaBus className="mr-2 text-indigo-500 text-sm" />
                              )}
                              <span>{category}</span>
                            </div>
                            <span className="font-medium">
                              Rs. {amount.toLocaleString()}
                            </span>
                          </div>
                        )
                      )}
                    <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between font-medium">
                      <span>Total Needed</span>
                      <span>Rs. {totalFunding.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Story - Compact */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Student's Story
                  </h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      {caseData.student?.fundingPurpose ||
                        'No additional details provided.'}
                    </p>
                    <p>
                      <strong className="text-gray-700">Career Goal:</strong>{' '}
                      {caseData.student?.careerAspiration || 'Not specified'}
                    </p>
                    <p>
                      <strong className="text-gray-700">Interests:</strong>{' '}
                      {caseData.student?.areasOfInterest || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Compact */}
            <div className="space-y-6">
              {/* School Information - Compact */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5">
                <Link to={`/school/${caseData.school._id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <FaSchool className="mr-2 text-indigo-500" />
                    School Details
                  </h3>
                  </Link>
                  <div className="text-sm space-y-3">
                    <div>
                    
                      <p className="font-medium">
                        {caseData.school?.schoolName || 'Unknown School'}
                      </p>
                      
                      <p className="text-gray-600">
                        {caseData.school?.address || 'Address not available'}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-gray-500 text-xs">Type</p>
                        <p>{caseData.school?.schoolType || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Students</p>
                        <p>{caseData.school?.noOfStudents || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Principal</p>
                        <p>{caseData.school?.principalName || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Contact</p>
                        <p>{caseData.school?.contactNo || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags - Compact */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {caseData.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Sponsor CTA - Compact */}
              <div className="bg-indigo-50 rounded-xl shadow-sm overflow-hidden border border-indigo-100 p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Support This Student
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  100% of donations go directly to{' '}
                  {caseData.student?.fullName?.split(' ')[0] || 'this student'}
                  's education.
                </p>
                <SponsorButton
                  caseId={caseData._id}
                  studentName={caseData.student?.fullName}
                  compact={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseDetails;


