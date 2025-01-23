import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ChatComponent from '../../components/ChatComponent';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SchoolProfile = () => {
  const schoolData = {
    school_info: {
      school_name: 'Green Valley High School',
      establishment_year: 1990,
      school_type: 'Public',
      total_students: 1200,
      principal_name: 'John Doe',
      contact_email: 'contact@greenvalleyhs.edu',
      contact_phone: '+92-300-1234567',
      website: 'https://greenvalleyhs.edu',
      address: {
        street: '123 Green Valley Road',
        city: 'Islamabad',
        region: 'Punjab',
        country: 'Pakistan',
        zipcode: '64000',
      },
    },
    school_performance: {
      student_success_rate: 85,
      funding_raised: 50000,
      students_funded: 120,
      donors_connected: 45,
    },
    ranking: {
      national_rank: 15,
      regional_rank: 3,
    },
    analysis_dashboard: {
      donation_trends: [
        { month: 'January', amount_raised: 10000 },
        { month: 'February', amount_raised: 15000 },
        { month: 'March', amount_raised: 12000 },
      ],
      school_performance_chart: {
        metric: 'Success Rate',
        values: [
          { year: 2021, value: 80 },
          { year: 2022, value: 85 },
          { year: 2023, value: 90 },
        ],
      },
    },
  };

  // Chart data for school performance
  const chartData = {
    labels: schoolData.analysis_dashboard.school_performance_chart.values.map(
      (item) => item.year
    ),
    datasets: [
      {
        label: schoolData.analysis_dashboard.school_performance_chart.metric,
        data: schoolData.analysis_dashboard.school_performance_chart.values.map(
          (item) => item.value
        ),
        borderColor: '#FF6F61',
        backgroundColor: 'rgba(255, 111, 97, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointBorderWidth: 3,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 transition-all duration-500">
      {/* School Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-teal-400 to-blue-500 p-8 rounded-xl shadow-2xl mb-12 w-full max-w-screen-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
        <div className="text-white text-center sm:text-left">
          <h1 className="text-4xl font-bold animate__animated animate__fadeIn animate__delay-1s">
            {schoolData.school_info.school_name}
          </h1>
          <p className="text-lg mt-2 ">
            {schoolData.school_info.establishment_year} |{' '}
            {schoolData.school_info.school_type}
          </p>
          <p className="mt-2 text-xl">
            {schoolData.school_info.total_students} Students
          </p>
        </div>
        <img
          src="https://linktothelogo.com/logo.png"
          alt="School Logo"
          className="w-32 h-32 rounded-full border-4 border-white shadow-xl mt-4 sm:mt-0 transition-all duration-500 transform hover:scale-110"
        />
      </div>

      {/* Social Media Sharing */}
      <div className="flex space-x-6 justify-center my-3">
        <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
          <FaFacebook size={24} />
        </button>
        <button className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
          <FaTwitter size={24} />
        </button>
        <button className="bg-blue-800 text-white p-3 rounded-full hover:bg-blue-900 transition-colors">
          <FaLinkedin size={24} />
        </button>
      </div>

      {/* School Contact and Address */}
      <div className="bg-white rounded-xl shadow-xl p-6 mb-10 w-full max-w-screen-lg hover:shadow-2xl transition-all duration-500">
        <h3 className="text-2xl font-bold text-gray-800">Contact & Address</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Principal:</span>{' '}
              {schoolData.school_info.principal_name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span>{' '}
              {schoolData.school_info.contact_email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span>{' '}
              {schoolData.school_info.contact_phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span>{' '}
              {schoolData.school_info.address.street},{' '}
              {schoolData.school_info.address.city},{' '}
              {schoolData.school_info.address.region},{' '}
              {schoolData.school_info.address.country} -{' '}
              {schoolData.school_info.address.zipcode}
            </p>
          </div>
          <div className="space-y-2">
            <a
              href={schoolData.school_info.website}
              className="text-blue-600 hover:text-blue-800 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Website
            </a>
            <p className="text-gray-700">
              National Rank: <strong>{schoolData.ranking.national_rank}</strong>
            </p>
            <p className="text-gray-700">
              Regional Rank: <strong>{schoolData.ranking.regional_rank}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="bg-white rounded-xl shadow-xl p-6 mb-10 w-full max-w-screen-lg hover:shadow-2xl transition-all duration-500">
        <h3 className="text-2xl font-bold text-gray-800">School Performance</h3>
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-gray-700">
              Success Rate:{' '}
              <strong>
                {schoolData.school_performance.student_success_rate}%
              </strong>
            </p>
            <p className="text-gray-700">
              Students Funded:{' '}
              <strong>{schoolData.school_performance.students_funded}</strong>
            </p>
            <p className="text-gray-700">
              Donors Connected:{' '}
              <strong>{schoolData.school_performance.donors_connected}</strong>
            </p>
          </div>
          <div className="text-center w-64">
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>

      {/* Funding Trends */}
      <div className="bg-white rounded-xl shadow-xl p-6 mb-10 w-full max-w-screen-lg hover:shadow-2xl transition-all duration-500">
        <h3 className="text-2xl font-bold text-gray-800">Funding Trends</h3>
        <div className="space-y-4 mt-6">
          {schoolData.analysis_dashboard.donation_trends.map((trend, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-all duration-300"
            >
              <span>{trend.month}</span>
              <span>${trend.amount_raised}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Call to Action Section */}
      <div className="flex justify-center mt-12 space-x-6">
        <button className="bg-teal-500 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 hover:bg-teal-600 transition-all duration-300">
          Donate Now
        </button>
        <button className="bg-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 hover:bg-indigo-700 transition-all duration-300">
          Join Our Community
        </button>
      </div>
      <ChatComponent />
    </div>
  );
};

export default SchoolProfile;
