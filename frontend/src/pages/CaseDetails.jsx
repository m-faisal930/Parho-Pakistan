// import ShareComponent from '../components/ShareComponent';
// import image1 from '../assets/images/two.jpg';
// import { Navbar } from '@material-tailwind/react';
// import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';
// import NavBar from '../components/NavBar';
// import Suggestions from '../components/Suggestions';
// import DonerComments from '../components/DonerComments';
// import BackToTopButton from '../components/BackToTopButton';
// import ChatbotIcon from '../components/ChatbotIcon';

// const CaseDetails = () => {
//   const caseData = {
//     student_name: 'Ali Khan',
//     age: 12,
//     grade: '7th Grade',
//     city: 'Karachi',
//     profile_picture_url: 'https://example.com/images/ali.jpg',
//     school_name: 'ABC High School',
//     school_address: 'Gulshan-e-Iqbal, Karachi',
//     school_rating: 4.5,
//     school_feedback:
//       'Ali is a hardworking student with an excellent academic record.',
//     reason_for_request:
//       "Ali's father lost his job, and the family is unable to afford the tuition fees. We need your help to keep him in school.",
//     requested_support: 'Monthly Tuition Fee, School Supplies, Uniform',
//     funding_needed: 2000,
//     urgency_level: 'High',
//     verification_status: 'Verified by ABC High School',
//     supporting_documents: [
//       'https://example.com/docs/report_card.pdf',
//       'https://example.com/docs/verification_letter.pdf',
//     ],
//     donation_breakdown: {
//       tuition_fee: 1200,
//       school_supplies: 500,
//       uniform: 300,
//       total_monthly_need: 2000,
//     },
//     matched_donations: '30%',
//     track_record: {
//       academic_performance: 'A+',
//       extracurricular: 'Math Olympiad Winner',
//     },
//     donor_comments: [
//       {
//         donor_name: 'John Doe',
//         comment: 'I’m happy to support Ali’s education. Keep up the good work!',
//       },
//       {
//         donor_name: 'Jane Smith',
//         comment: 'Ali’s potential is amazing, glad I could help!',
//       },
//     ],
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="mt-20 flex flex-col sm:flex-row justify-between items-start mx-auto bg-gray-100 p-6 rounded-lg shadow-md gap-6">
//         {/* Left Column */}
//         <div className="w-full sm:w-1/2 p-4">
//           <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
//             <div className="flex items-center justify-center mb-4">
//               <img
//                 src={image1}
//                 alt="Ali Khan"
//                 className="w-20 h-20 rounded-full object-cover mr-4"
//               />
//               <div>
//                 <h2 className="text-2xl font-bold tracking-tight text-gray-800">
//                   <Link to="/studentprofile" className="hover:underline">
//                     {' '}
//                     Ali Khan
//                   </Link>
//                 </h2>
//                 <p className="text-lg text-gray-600">Grade: 7th Grade</p>
//                 <p className="text-sm text-gray-500">Age: 12</p>
//                 <p className="text-sm text-gray-500">City: Karachi</p>
//               </div>
//             </div>

//             {/* Interests */}
//             <div className="mt-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 Interests
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Education
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Donation
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Student Support
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Karachi
//                 </span>
//               </div>
//             </div>
//             {/* Hobbies */}
//             <div className="mt-4 mb-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 Hobbies
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Education
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Donation
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Student Support
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Karachi
//                 </span>
//               </div>
//             </div>

//             <div className="mx-auto">
//               <Link
//                 to="/school"
//                 className="text-blue-500 block hover:underline"
//               >
//                 {caseData.school_name}
//               </Link>

//               <p className="text-sm block text-gray-500">
//                 Rating: {caseData.school_rating} ⭐
//               </p>

//               <p className="text-sm block text-gray-500 mt-2">
//                 <span className="font-bold">School Comment:</span>{' '}
//                 {caseData.school_feedback}
//               </p>
//             </div>
//           </div>

//           {/* Left: Donation Breakdown */}
//           <div className="bg-white p-6 rounded-lg shadow-lg mt-6 text-dark">
//             <h3 className="text-xl font-semibold text-dark mb-4">
//               Donation Breakdown
//             </h3>
//             <div className="overflow-x-auto">
//               <table className="table table-xs w-full">
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Category</th>
//                     <th>Amount (PKR)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th>1</th>
//                     <td>Tuition Fee</td>
//                     <td>{caseData.donation_breakdown.tuition_fee}</td>
//                   </tr>
//                   <tr>
//                     <th>2</th>
//                     <td>School Supplies</td>
//                     <td>{caseData.donation_breakdown.school_supplies}</td>
//                   </tr>
//                   <tr>
//                     <th>3</th>
//                     <td>Uniform</td>
//                     <td>{caseData.donation_breakdown.uniform}</td>
//                   </tr>
//                   <tr>
//                     <th>4</th>
//                     <td>Total Monthly Need</td>
//                     <td>{caseData.donation_breakdown.total_monthly_need}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//         {/* Right Column */}
//         <div className="w-full sm:w-1/2 p-4">
//           <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
//             {/* <ShareComponent /> */}
//             <div className="flex justify-center mb-6">
//               <Link to={'/sponsership'} className="bg-[#3431BB] text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200">
//                 Sponsor Ali Now
//               </Link>
              
//             </div>
//             <ShareComponent />

//             {/* Project Description */}
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-4">
//                 About the Project
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 This initiative is focused on supporting students like Ali Khan
//                 who excel in academics but face financial constraints. By
//                 contributing, you are enabling their education and brightening
//                 their future.
//               </p>
//             </div>

//             {/* Tags */}
//             <div className="mt-4">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Education
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Donation
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Student Support
//                 </span>
//                 <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                   Karachi
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <DonerComments />

//       <Suggestions />
//       <ChatbotIcon />
//       <BackToTopButton />
//       <Footer />
//     </>
//   );
// };

// export default CaseDetails;









import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        const response = await fetch(`http://localhost:3000/case/${id}`);
        const data = await response.json();

        if (!data.success) throw new Error('Case not found');

        // Fetch student and school details
        const [studentRes, schoolRes] = await Promise.all([
          fetch(`http://localhost:3000/student/profile/${data.case.studentId}`),
          fetch(`http://localhost:3000/school/${data.case.schoolId}`),
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
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
                    {caseData.student?.profilePicture ? (
                      <img
                        src={caseData.student.profilePicture}
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
                    <h2 className="text-xl font-bold text-gray-900">
                      {caseData.student?.fullName || 'Student Name'}
                    </h2>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <FaSchool className="mr-2 text-indigo-500" />
                  School Details
                </h3>
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
                {caseData.student?.fullName?.split(' ')[0] || 'this student'}'s
                education.
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
  );
};

export default CaseDetails;


