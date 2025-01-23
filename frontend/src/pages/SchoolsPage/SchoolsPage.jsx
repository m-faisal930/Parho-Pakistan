import React, { useState } from 'react';
import {
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaGift,
  FaUserCircle,
  FaAward,
  FaStar,
  FaUniversity,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);


import Suggestions from '../../components/Suggestions';
import PerformanceAnalysis from '../../components/PerformanceAnalysis';
import FundsAllocation from '../../components/FundsAllocation';
import TeacherPerformance from '../../components/TeacherPerformance';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ChatComponent from '../../components/ChatComponent';
import DonationTrendsChart from '../../components/SchoolCharts/DonationTrendChart';
import DonationAllocationChart from '../../components/SchoolCharts/DonationAllocationChart';
import MonthlyDonationComparisonChart from '../../components/SchoolCharts/MonthlyDonationComparisonChart ';
import DonorDemographicsChart from '../../components/SchoolCharts/DonorDemographicsChart ';
import ChatbotIcon from '../../components/ChatbotIcon';


const SchoolsPage = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chatOpen, setChat] = useState(false);

  const schoolData = {
    school_name: 'Green Valley High School',
    tagline: 'Empowering students for a brighter future',
    address: '123 Green Valley Road, Islamabad, Punjab, Pakistan',
    followers: 1200,
    students: 850,
    member_since: 'January 2005',
    rating: 4.5,
    contact_info: {
      email: 'contact@greenvalleyhs.edu',
      phone: '+92-300-1234567',
      website: 'https://greenvalleyhs.edu',
    },
    about:
      'Green Valley High School was established in 1990 with the mission to provide quality education and foster all-round development of students. The school has a rich history of academic excellence and co-curricular achievements, providing a nurturing environment for students to grow into responsible citizens. Over the years, the school has introduced modern teaching methodologies and state-of-the-art facilities to keep up with the changing times.',
    badges: [
      'Top School Award 2023',
      'Best Library Award 2021',
      '100% Graduation Rate',
    ],
    cases: [
      {
        title: 'Library Renovation Project',
        description: 'Fundraising to renovate and upgrade the school library.',
      },
      {
        title: 'New Computer Lab Initiative',
        description:
          'Seeking donations to set up a state-of-the-art computer lab.',
      },
    ],
  };

  return (
    <div>
      <NavBar />
      <div className="bg-gray-100 min-h-screen p-4 md:p-8 mt-10">
        {/* First Section: Header, Address, Contact Info, Achievements */}
        <div className="bg-white p-6 rounded-lg">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-6xl text-gray-500" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {schoolData.school_name}
                </h1>
                <p className="text-dark italic">{schoolData.tagline}</p>
                <p className="text-dark font-bold">
                  {schoolData.followers} followers
                </p>
                <p className="text-dark">
                  Students:{' '}
                  <span className="font-bold"> {schoolData.students}</span>
                </p>
                <p className="text-dark">
                  Member with us since:{' '}
                  <span className="font-bold"> {schoolData.member_since} </span>
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Follow
              </button>
              <a
                href={schoolData.contact_info.website}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Visit
              </a>
            </div>
          </div>

          {/* Address and Contact Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
            <p className="text-gray-700 text-sm text-center sm:text-left">
              {schoolData.address}
            </p>
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-blue-600 hover:underline text-sm mt-2 sm:mt-0"
            >
              Contact Info
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mt-4">
            <p className="text-gray-700">Rating:</p>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                  key={index}
                  className={`text-yellow-500 ${
                    index < Math.floor(schoolData.rating) ? 'fill-current' : ''
                  }`}
                />
              ))}
              <span className="text-gray-600 ml-2">
                {schoolData.rating.toFixed(1)} / 5
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between mt-4 space-x-0 sm:space-x-4 p-3">
            <div className="justify-start">
              <button
                onClick={() => setChat(true)}
                className="btn btn-outline btn-primary btn-sm mb-2 sm:mb-0"
              >
                Message
              </button>
              <button className="btn btn-outline btn-primary btn-sm">
                Gift {schoolData.school_name}
              </button>
            </div>

            <div className="justify-end">
              {/* Social Media Sharing */}
              <div className="flex space-x-6 justify-center">
                <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <FaFacebook size={18} />
                </button>
                <button className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
                  <FaTwitter size={18} />
                </button>
                <button className="bg-blue-800 text-white p-3 rounded-full hover:bg-blue-900 transition-colors">
                  <FaLinkedin size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Contact Info */}
        {isContactOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg relative w-96">
              <button
                onClick={() => setIsContactOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <p className="flex items-center space-x-2 text-gray-700">
                <FaEnvelope /> <span>{schoolData.contact_info.email}</span>
              </p>
              <p className="flex items-center space-x-2 text-gray-700 mt-2">
                <FaPhone /> <span>{schoolData.contact_info.phone}</span>
              </p>
              <p className="flex items-center space-x-2 text-gray-700 mt-2">
                <FaGlobe />{' '}
                <a
                  href={schoolData.contact_info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {schoolData.contact_info.website}
                </a>
              </p>
            </div>
          </div>
        )}

        {/* About School */}
        <div className="mt-6 bg-white p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">About</h3>
            <div className="flex flex-wrap justify-start sm:justify-end space-x-4 items-center mt-4 sm:mt-0">
              {schoolData.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full shadow-sm mb-2 sm:mb-0"
                >
                  <FaAward className="text-yellow-500" />
                  <span className="text-gray-700 text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </div>
          <p
            className={`text-gray-700 leading-relaxed ${
              isExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {schoolData.about}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:underline mt-2"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
        <Suggestions Heading={'Schools Cases on Parho Pakistan'} />

        <div className="flex justify-center items-center bg-light text-dark shadow-lg p-6 rounded-lg mt-4">
          <div className="stats stats-vertical lg:stats-horizontal gap-5 px-auto bg-gray-200 text-dark">
            {/* Total Students */}
            <div className="stat text-dark">
              <div className="stat-title flex items-center">
                <FaUsers className="text-2xl mr-2" />
                Total Students
              </div>
              <div className="stat-value">850</div>
              <div className="stat-desc">Currently Enrolled</div>
            </div>

            {/* Total Teachers */}
            <div className="stat text-dark">
              <div className="stat-title flex items-center">
                <FaChalkboardTeacher className="text-2xl mr-2" />
                Total Teachers
              </div>
              <div className="stat-value">60</div>
              <div className="stat-desc">Qualified and Experienced</div>
            </div>

            {/* Graduation Rate */}
            <div className="stat text-dark">
              <div className="stat-title flex items-center">
                <FaUserGraduate className="text-2xl mr-2" />
                Graduation Rate
              </div>
              <div className="stat-value">100%</div>
              <div className="stat-desc">Every student graduates</div>
            </div>

            {/* School Capacity */}
            <div className="stat text-dark">
              <div className="stat-title flex items-center">
                <FaUniversity className="text-2xl mr-2" />
                School Capacity
              </div>
              <div className="stat-value">1,200</div>
              <div className="stat-desc">Maximum Capacity</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          <DonationTrendsChart />
          <DonationAllocationChart />
          <DonorDemographicsChart />
          <MonthlyDonationComparisonChart />
        </div>

        

        {/* <PerformanceAnalysis /> */}
        {/* <FundsAllocation /> */}
        {/* <TeacherPerformance /> */}
      </div>
      {chatOpen && <ChatComponent />}
      {/* <ChatComponent /> */}
      <ChatbotIcon />
      <Footer />
    </div>
  );
};

export default SchoolsPage;
