import React from 'react';
import { Link } from 'react-router-dom';

const SchoolCard = ({ schoolInfo }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* <img
        src={
          'https://static.vecteezy.com/system/resources/thumbnails/008/040/410/small_2x/school-logo-design-template-free-vector.jpg'
        }
        alt={schoolInfo.name}
        className="w-16 h-16 mb-3 rounded-full border border-gray-300 dark:border-gray-600 mx-auto"
      /> */}
      <a href="#">
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {schoolInfo.name}
        </h5>
      </a>
      <p className="mb-1 font-normal text-gray-500 dark:text-gray-400">
        Enrollment: {schoolInfo.enrollment}
      </p>
      <p className="mb-1 font-normal text-gray-500 dark:text-gray-400">
        Email: {schoolInfo.email}
      </p>
      <p className="mb-1 font-normal text-gray-500 dark:text-gray-400">
        Rating: {schoolInfo.rating} / 5
      </p>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Since: {schoolInfo.since}
      </p>
      
      <Link
        to='/school'
        className="inline-flex font-medium items-center text-blue-600 hover:underline"
      >
        Visit School Page
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </Link>
    </div>
  );
};

export default SchoolCard;
