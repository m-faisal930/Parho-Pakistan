import ShareComponent from '../components/ShareComponent';
import image1 from '../assets/images/two.jpg';
import { Navbar } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import Suggestions from '../components/Suggestions';
import DonerComments from '../components/DonerComments';
import BackToTopButton from '../components/BackToTopButton';
import ChatbotIcon from '../components/ChatbotIcon';

const CaseDetails = () => {
  const caseData = {
    student_name: 'Ali Khan',
    age: 12,
    grade: '7th Grade',
    city: 'Karachi',
    profile_picture_url: 'https://example.com/images/ali.jpg',
    school_name: 'ABC High School',
    school_address: 'Gulshan-e-Iqbal, Karachi',
    school_rating: 4.5,
    school_feedback:
      'Ali is a hardworking student with an excellent academic record.',
    reason_for_request:
      "Ali's father lost his job, and the family is unable to afford the tuition fees. We need your help to keep him in school.",
    requested_support: 'Monthly Tuition Fee, School Supplies, Uniform',
    funding_needed: 2000,
    urgency_level: 'High',
    verification_status: 'Verified by ABC High School',
    supporting_documents: [
      'https://example.com/docs/report_card.pdf',
      'https://example.com/docs/verification_letter.pdf',
    ],
    donation_breakdown: {
      tuition_fee: 1200,
      school_supplies: 500,
      uniform: 300,
      total_monthly_need: 2000,
    },
    matched_donations: '30%',
    track_record: {
      academic_performance: 'A+',
      extracurricular: 'Math Olympiad Winner',
    },
    donor_comments: [
      {
        donor_name: 'John Doe',
        comment: 'I’m happy to support Ali’s education. Keep up the good work!',
      },
      {
        donor_name: 'Jane Smith',
        comment: 'Ali’s potential is amazing, glad I could help!',
      },
    ],
  };

  return (
    <>
      <NavBar />
      <div className="mt-20 flex flex-col sm:flex-row justify-between items-start mx-auto bg-gray-100 p-6 rounded-lg shadow-md gap-6">
        {/* Left Column */}
        <div className="w-full sm:w-1/2 p-4">
          <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center mb-4">
              <img
                src={image1}
                alt="Ali Khan"
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-800">
                  <Link to="/studentprofile" className="hover:underline">
                    {' '}
                    Ali Khan
                  </Link>
                </h2>
                <p className="text-lg text-gray-600">Grade: 7th Grade</p>
                <p className="text-sm text-gray-500">Age: 12</p>
                <p className="text-sm text-gray-500">City: Karachi</p>
              </div>
            </div>

            {/* Interests */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Education
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Donation
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Student Support
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Karachi
                </span>
              </div>
            </div>
            {/* Hobbies */}
            <div className="mt-4 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Hobbies
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Education
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Donation
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Student Support
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Karachi
                </span>
              </div>
            </div>

            <div className="mx-auto">
              <Link
                to="/school"
                className="text-blue-500 block hover:underline"
              >
                {caseData.school_name}
              </Link>

              <p className="text-sm block text-gray-500">
                Rating: {caseData.school_rating} ⭐
              </p>

              <p className="text-sm block text-gray-500 mt-2">
                <span className="font-bold">School Comment:</span>{' '}
                {caseData.school_feedback}
              </p>
            </div>
          </div>

          {/* Left: Donation Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6 text-dark">
            <h3 className="text-xl font-semibold text-dark mb-4">
              Donation Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="table table-xs w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Amount (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Tuition Fee</td>
                    <td>{caseData.donation_breakdown.tuition_fee}</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>School Supplies</td>
                    <td>{caseData.donation_breakdown.school_supplies}</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Uniform</td>
                    <td>{caseData.donation_breakdown.uniform}</td>
                  </tr>
                  <tr>
                    <th>4</th>
                    <td>Total Monthly Need</td>
                    <td>{caseData.donation_breakdown.total_monthly_need}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="w-full sm:w-1/2 p-4">
          <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
            {/* <ShareComponent /> */}
            <div className="flex justify-center mb-6">
              <Link to={'/sponsership'} className="bg-[#3431BB] text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-200">
                Sponsor Ali Now
              </Link>
              
            </div>
            <ShareComponent />

            {/* Project Description */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                About the Project
              </h3>
              <p className="text-gray-600 leading-relaxed">
                This initiative is focused on supporting students like Ali Khan
                who excel in academics but face financial constraints. By
                contributing, you are enabling their education and brightening
                their future.
              </p>
            </div>

            {/* Tags */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Education
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Donation
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Student Support
                </span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Karachi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DonerComments />

      <Suggestions />
      <ChatbotIcon />
      <BackToTopButton />
      <Footer />
    </>
  );
};

export default CaseDetails;
