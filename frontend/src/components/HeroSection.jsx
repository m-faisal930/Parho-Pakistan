import React from 'react';
import DonationForm from './DonationForm'; // Importing the form component

const HeroSection = () => {
  return (
    <div
      className="relative w-full min-h-[50vh] flex items-center justify-center bg-cover bg-center "
      style={{
        backgroundImage: "url('https://picsum.photos/id/1/1600/1900')",
      }}
    >
      {/* Overlay for darker effect */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content inside the Hero Section */}
      <div className=" relative z-10 max-w-6xl w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start justify-between pt-20">
        {/* Left Section: Donation Form */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <DonationForm />
        </div>

        {/* Right Section: Text Content */}
        <div className="w-full lg:w-1/2 text-white text-center lg:text-left mt-12">
          <h1 className="text-2xl lg:text-4xl font-bold mb-4">
            Empower Education. Change Lives.
          </h1>
          <p className="text-sm lg:text-base mb-6">
            Help us reach students worldwide by donating today. Every
            contribution makes a difference.
          </p>
          <button className="bg-[#3431BB] text-white px-4 py-2 rounded-md text-sm lg:text-base">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
