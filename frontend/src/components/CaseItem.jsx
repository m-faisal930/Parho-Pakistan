import React, { useContext } from 'react';
import { FaMapMarkerAlt, FaRegCalendarAlt, FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // Import your ThemeContext

export default function CaseItem({ caseItem }) {
  // Access the dark mode state from ThemeContext
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden group transform transition duration-500 hover:scale-105 hover:shadow-2xl border ${
        isDarkMode
          ? 'bg-dark text-light border-gray-700'
          : 'bg-light text-dark border-gray-200'
      }`}
    >
      <div className="relative">
        <img
          alt={caseItem.student_name}
          src={caseItem.thumbnail_url}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs font-semibold px-2 py-1 rounded flex items-center">
          <FaMapMarkerAlt className="mr-1" /> {caseItem.city}
        </div>
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {caseItem.urgency_level}
        </div>
      </div>
      <div className="p-4">
        <h2
          className={`text-lg font-extrabold group-hover:text-blue-600 tracking-wide ${
            isDarkMode ? 'text-light' : 'text-dark'
          }`}
        >
          {caseItem.student_name}
        </h2>
        <p
          className={`text-sm mt-2 italic ${
            isDarkMode ? 'text-light' : 'text-gray-600'
          }`}
        >
          {caseItem.summary.length > 60
            ? caseItem.summary.slice(0, 60) + '...'
            : caseItem.summary}
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
              {caseItem.grade}
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
              {caseItem.age}
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
              {caseItem.school_name}
            </span>
          </div>
        </div>

        <div className="mt-1 border-t pt-4">
          <Link
            to="/casedetails"
            className={`block text-sm font-bold px-4 py-2 rounded-full shadow-lg text-center hover:shadow-xl hover:bg-blue-600 ${
              isDarkMode ? 'bg-buttons' : 'bg-[#3431BB] text-white'
            }`}
          >
            Sponsor {caseItem.student_name}
          </Link>
        </div>
      </div>
    </div>
  );
}
