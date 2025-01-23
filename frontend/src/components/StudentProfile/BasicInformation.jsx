import React from 'react';

export default function BasicInformation() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Basic Information
        </h2>

        <div className="space-y-6">
          {/* About Section */}
          <div className="relative">
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 font-semibold">Age:</span>
              <span className="text-gray-700">15 years</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 font-semibold">Gender:</span>
              <span className="text-gray-700">Female</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 font-semibold">Class/Grade:</span>
              <span className="text-gray-700">10th Grade</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 font-semibold">School Name:</span>
              <span className="text-gray-700">Springfield High School</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-900 font-semibold">City/Region:</span>
              <span className="text-gray-700">New York City</span>
            </div>
          </div>

          {/* Interests */}
          <div>
            <span className="text-gray-900 font-semibold">Interests:</span>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-full hover:bg-cyan-700 cursor-pointer">
                Reading
              </span>
              <span className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-full hover:bg-cyan-700 cursor-pointer">
                Technology
              </span>
              <span className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-full hover:bg-cyan-700 cursor-pointer">
                Music
              </span>
              <span className="px-4 py-2 text-sm text-white bg-cyan-600 rounded-full hover:bg-cyan-700 cursor-pointer">
                Traveling
              </span>
            </div>
          </div>

          {/* Hobbies */}
          <div>
            <span className="text-gray-900 font-semibold">Hobbies:</span>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="px-4 py-2 text-sm text-white bg-teal-600 rounded-full hover:bg-teal-700 cursor-pointer">
                Photography
              </span>
              <span className="px-4 py-2 text-sm text-white bg-teal-600 rounded-full hover:bg-teal-700 cursor-pointer">
                Cycling
              </span>
              <span className="px-4 py-2 text-sm text-white bg-teal-600 rounded-full hover:bg-teal-700 cursor-pointer">
                Painting
              </span>
              <span className="px-4 py-2 text-sm text-white bg-teal-600 rounded-full hover:bg-teal-700 cursor-pointer">
                Cooking
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
