

import React, { useContext } from 'react';
import {
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaSchool,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function CaseItem({ caseItem, student, school }) {
  console.log('caseitem is :', caseItem); // Log the caseItem prop

  const { isDarkMode } = useContext(ThemeContext);

  // Calculate age from date of birth if available
  const calculateAge = (dob) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Calculate total funding needed
  const totalFunding = caseItem.donationBreakdown
    ? Object.values(caseItem.donationBreakdown).reduce(
        (sum, amount) => sum + amount,
        0
      )
    : caseItem.funding_needed || 0;

  // Extract city from school address
  const getCity = () => {
    if (school?.address) {
      const parts = school.address.split(',');
      return parts.length > 1 ? parts[1].trim() : parts[0].trim();
    }
    return 'Unknown';
  };

  return (
    <div
      className={`max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden group transform transition duration-500 hover:scale-105 hover:shadow-2xl border ${
        isDarkMode
          ? 'bg-dark text-light border-gray-700'
          : 'bg-light text-dark border-gray-200'
      }`}
    >
      <div className="relative h-48">
        {/* Profile picture or placeholder */}
        {student?.profilePicture ? (
          <img
            alt={student.fullName}
            src={student.profilePicture}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <FaUser className="text-6xl text-gray-400" />
          </div>
        )}

        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded flex items-center">
          <FaMapMarkerAlt className="mr-1" /> {getCity()}
        </div>
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {caseItem.urgency_level || 'Medium'}
        </div>
      </div>
      <div className="p-4">
        <h2
          className={`text-lg font-extrabold group-hover:text-blue-600 tracking-wide ${
            isDarkMode ? 'text-light' : 'text-dark'
          }`}
        >
          {student?.fullName || 'Student Name'}
        </h2>
        <p
          className={`text-sm mt-2 italic ${
            isDarkMode ? 'text-light' : 'text-gray-600'
          }`}
        >
          {caseItem.title || 'Scholarship Case'}
        </p>

        {/* Row 1: Grade and Age */}
        <div className="mt-1 flex justify-between items-center space-x-4 text-sm font-medium border-b-2 pb-3">
          {/* Grade Container */}
          <div className="flex items-center space-x-2 w-1/2">
            <div
              className={`text-gray-800 font-semibold ${
                isDarkMode ? 'text-light' : 'text-dark'
              }`}
            >
              Grade:
            </div>
            <span className={`${isDarkMode ? 'text-light' : 'text-gray-600'}`}>
              {student?.currentGrade || 'N/A'}
            </span>
          </div>

          {/* Age Container */}
          <div className="flex items-center space-x-2 w-1/2 font-normal">
            <div
              className={`text-gray-800 font-semibold ${
                isDarkMode ? 'text-light' : 'text-dark'
              }`}
            >
              Age:
            </div>
            <span className={`${isDarkMode ? 'text-light' : 'text-gray-600'}`}>
              {calculateAge(student?.dateOfBirth)}
            </span>
          </div>
        </div>

        {/* Row 2: School */}
        <div className="mt-1 flex text-xs">
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`text-gray-800 font-bold ${
                isDarkMode ? 'text-light' : 'text-dark'
              }`}
            >
              School:
            </div>
            <span className={`${isDarkMode ? 'text-light' : 'text-gray-600'}`}>
              {school?.schoolName || 'Unknown School'}
            </span>
          </div>
        </div>

        {/* Row 3: Funding Needed */}
        <div className="mt-1 flex text-xs">
          <div className="flex items-center space-x-2 w-full">
            <div
              className={`text-gray-800 font-bold ${
                isDarkMode ? 'text-light' : 'text-dark'
              }`}
            >
              Funding Needed:
            </div>
            <span className={`${isDarkMode ? 'text-light' : 'text-gray-600'}`}>
              Rs. {totalFunding.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-3 border-t pt-4">
          <Link
            to={`/casedetails/${caseItem._id}`}
            className={`block text-sm font-bold px-4 py-2 rounded-full shadow-lg text-center hover:shadow-xl hover:bg-blue-600 ${
              isDarkMode ? 'bg-buttons' : 'bg-[#3431BB] text-white'
            }`}
          >
            Sponsor {student?.fullName?.split(' ')[0] || 'Student'}
          </Link>
        </div>
      </div>
    </div>
  );
}