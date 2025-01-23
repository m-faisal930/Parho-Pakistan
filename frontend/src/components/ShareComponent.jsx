import React, { useState } from 'react';
import share from '../assets/images/social.jpg';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';

const ShareComponent = () => {
  const urlClipped = 'http://localhost:5173/casedetails';
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(urlClipped);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
  };

  return (
    <div className="py-6 px-5 w-auto bg-light rounded-lg shadow-lg max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <img
          src={share}
          alt="Boost"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h1 className="text-lg font-bold text-gray-800">
            Give his school a boost!
          </h1>
          <p className="text-sm text-gray-600">
            Help Ali to reach a better Donor
          </p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-start space-x-4 mb-6">
        <button className="text-blue-600 hover:text-blue-800 transition">
          <FaFacebook className="text-2xl" />
        </button>
        <button className="text-pink-500 hover:text-pink-700 transition">
          <FaInstagram className="text-2xl" />
        </button>
        <button className="text-blue-500 hover:text-blue-700 transition">
          <FaLinkedin className="text-2xl" />
        </button>
        <button className="text-green-500 hover:text-green-700 transition">
          <FaWhatsapp className="text-2xl" />
        </button>
      </div>

      {/* Copy Link Section */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={urlClipped}
          readOnly
          className={`w-48 px-3 py-1 text-sm border rounded-lg overflow-hidden text-ellipsis whitespace-nowrap bg-white focus:outline-none transition ${
            copied
              ? 'border-green-500 ring-2 ring-green-300'
              : 'border-gray-300'
          }`}
        />
        <button
          onClick={copyLink}
          className={`px-4 py-1 text-sm text-white bg-gray-600 hover:bg-gray-800 rounded-lg transform ${
            copied ? 'scale-105 bg-green-500' : ''
          } transition duration-300`}
        >
          {copied ? 'Copied!' : 'Copy URL'}
        </button>
      </div>
    </div>
  );
};

export default ShareComponent;
