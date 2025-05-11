import React, { useState } from 'react';
import {
  FaUser,
  FaLock,
  FaSchool,
  FaEdit,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaStar,
  FaClipboardList,
} from 'react-icons/fa';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [schoolProfile, setSchoolProfile] = useState({
    schoolName: 'Springfield High School',
    schoolEmail: 'school@springfield.com',
    schoolContact: '+987 654 3210',
    schoolAddress: '123 Main Street, Springfield, City',
    schoolLogo: 'https://via.placeholder.com/150',
    totalStudents: 350,
    classrooms: 20,
    teachers: 25,
    about:
      'Springfield High School is committed to excellence in education. We provide a holistic learning experience with a focus on academic achievement and personal growth.',
    rating: 4.8,
    donorComments: [
      'Amazing infrastructure and dedicated staff!',
      'A great place for students to grow academically and personally.',
    ],
    password: '',
    confirmPassword: '',
    twoFA: false,
    notifications: {
      email: true,
      sms: false,
    },
  });

  // Handle changes for input fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSchoolProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Here you would normally send the updated data to your backend server
    console.log('Changes saved:', schoolProfile);
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
    // Revert to the original values in case of cancellation
    setSchoolProfile((prev) => ({ ...prev }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">School Profile</h2>

      {/* Profile Header (Logo and School Name) */}
      <div className="flex items-center gap-6 mb-6">
        <img
          src={schoolProfile.schoolLogo}
          alt="School Logo"
          className="w-24 h-24 object-cover rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold">{schoolProfile.schoolName}</h3>
          <p className="text-gray-500">{schoolProfile.schoolEmail}</p>
          <p className="text-gray-500">{schoolProfile.schoolContact}</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="ml-auto p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <FaEdit />
          </button>
        )}
      </div>

      {/* School Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <FaSchool className="text-green-500" /> School Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="schoolName"
            value={schoolProfile.schoolName}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="School Name"
            className="p-2 border rounded-lg w-full"
          />
          <input
            type="email"
            name="schoolEmail"
            value={schoolProfile.schoolEmail}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="School Email"
            className="p-2 border rounded-lg w-full"
          />
          <input
            type="text"
            name="schoolContact"
            value={schoolProfile.schoolContact}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="School Contact"
            className="p-2 border rounded-lg w-full"
          />
          <input
            type="text"
            name="schoolAddress"
            value={schoolProfile.schoolAddress}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="School Address"
            className="p-2 border rounded-lg w-full"
          />
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <FaClipboardList className="text-blue-500" /> About School
        </h3>
        <textarea
          name="about"
          value={schoolProfile.about}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="About School"
          className="p-2 border rounded-lg w-full h-32"
        />
      </div>

      {/* Additional Info (Students, Classrooms, Teachers) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <FaUser className="text-purple-500" /> Additional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex justify-between">
            <span>Total Students:</span>
            <input
              type="number"
              name="totalStudents"
              value={schoolProfile.totalStudents}
              onChange={handleChange}
              disabled={!isEditing}
              className="p-2 border rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between">
            <span>Classrooms:</span>
            <input
              type="number"
              name="classrooms"
              value={schoolProfile.classrooms}
              onChange={handleChange}
              disabled={!isEditing}
              className="p-2 border rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between">
            <span>Teachers Available:</span>
            <input
              type="number"
              name="teachers"
              value={schoolProfile.teachers}
              onChange={handleChange}
              disabled={!isEditing}
              className="p-2 border rounded-lg w-full"
            />
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <FaStar className="text-yellow-500" /> School Rating
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xl">{schoolProfile.rating}</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={
                  index < Math.floor(schoolProfile.rating)
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                }
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Donor Comments */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <FaUser className="text-teal-500" /> Donor Comments
        </h3>
        <div>
          {schoolProfile.donorComments.map((comment, index) => (
            <div key={index} className="border-b py-3">
              <p className="text-gray-600">{comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Save or Cancel Changes */}
      {isEditing && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSaveChanges}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            onClick={handleCancelChanges}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
