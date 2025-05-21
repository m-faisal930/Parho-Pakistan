// import React, { useState } from 'react';
// import {
//   FaUser,
//   FaLock,
//   FaSchool,
//   FaEdit,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaEnvelope,
//   FaStar,
//   FaClipboardList,
// } from 'react-icons/fa';

// const Profile = ({id}) => {
//   console.log(id);
//   const [isEditing, setIsEditing] = useState(false); // Track editing mode
//   const [schoolProfile, setSchoolProfile] = useState({
//     schoolName: 'Springfield High School',
//     schoolEmail: 'school@springfield.com',
//     schoolContact: '+987 654 3210',
//     schoolAddress: '123 Main Street, Springfield, City',
//     schoolLogo: 'https://via.placeholder.com/150',
//     totalStudents: 350,
//     classrooms: 20,
//     teachers: 25,
//     about:
//       'Springfield High School is committed to excellence in education. We provide a holistic learning experience with a focus on academic achievement and personal growth.',
//     rating: 4.8,
//     donorComments: [
//       'Amazing infrastructure and dedicated staff!',
//       'A great place for students to grow academically and personally.',
//     ],
//     password: '',
//     confirmPassword: '',
//     twoFA: false,
//     notifications: {
//       email: true,
//       sms: false,
//     },
//   });

//   // Handle changes for input fields
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSchoolProfile((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSaveChanges = () => {
//     setIsEditing(false);
//     // Here you would normally send the updated data to your backend server
//     console.log('Changes saved:', schoolProfile);
//   };

//   const handleCancelChanges = () => {
//     setIsEditing(false);
//     // Revert to the original values in case of cancellation
//     setSchoolProfile((prev) => ({ ...prev }));
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">School Profile</h2>

//       {/* Profile Header (Logo and School Name) */}
//       <div className="flex items-center gap-6 mb-6">
//         <img
//           src={schoolProfile.schoolLogo}
//           alt="School Logo"
//           className="w-24 h-24 object-cover rounded-full"
//         />
//         <div>
//           <h3 className="text-xl font-semibold">{schoolProfile.schoolName}</h3>
//           <p className="text-gray-500">{schoolProfile.schoolEmail}</p>
//           <p className="text-gray-500">{schoolProfile.schoolContact}</p>
//         </div>
//         {!isEditing && (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="ml-auto p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
//           >
//             <FaEdit />
//           </button>
//         )}
//       </div>

//       {/* School Information */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
//           <FaSchool className="text-green-500" /> School Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="schoolName"
//             value={schoolProfile.schoolName}
//             onChange={handleChange}
//             disabled={!isEditing}
//             placeholder="School Name"
//             className="p-2 border rounded-lg w-full"
//           />
//           <input
//             type="email"
//             name="schoolEmail"
//             value={schoolProfile.schoolEmail}
//             onChange={handleChange}
//             disabled={!isEditing}
//             placeholder="School Email"
//             className="p-2 border rounded-lg w-full"
//           />
//           <input
//             type="text"
//             name="schoolContact"
//             value={schoolProfile.schoolContact}
//             onChange={handleChange}
//             disabled={!isEditing}
//             placeholder="School Contact"
//             className="p-2 border rounded-lg w-full"
//           />
//           <input
//             type="text"
//             name="schoolAddress"
//             value={schoolProfile.schoolAddress}
//             onChange={handleChange}
//             disabled={!isEditing}
//             placeholder="School Address"
//             className="p-2 border rounded-lg w-full"
//           />
//         </div>
//       </div>

//       {/* About Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
//           <FaClipboardList className="text-blue-500" /> About School
//         </h3>
//         <textarea
//           name="about"
//           value={schoolProfile.about}
//           onChange={handleChange}
//           disabled={!isEditing}
//           placeholder="About School"
//           className="p-2 border rounded-lg w-full h-32"
//         />
//       </div>

//       {/* Additional Info (Students, Classrooms, Teachers) */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
//           <FaUser className="text-purple-500" /> Additional Information
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="flex justify-between">
//             <span>Total Students:</span>
//             <input
//               type="number"
//               name="totalStudents"
//               value={schoolProfile.totalStudents}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="p-2 border rounded-lg w-full"
//             />
//           </div>
//           <div className="flex justify-between">
//             <span>Classrooms:</span>
//             <input
//               type="number"
//               name="classrooms"
//               value={schoolProfile.classrooms}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="p-2 border rounded-lg w-full"
//             />
//           </div>
//           <div className="flex justify-between">
//             <span>Teachers Available:</span>
//             <input
//               type="number"
//               name="teachers"
//               value={schoolProfile.teachers}
//               onChange={handleChange}
//               disabled={!isEditing}
//               className="p-2 border rounded-lg w-full"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Ratings Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
//           <FaStar className="text-yellow-500" /> School Rating
//         </h3>
//         <div className="flex items-center gap-2">
//           <span className="text-xl">{schoolProfile.rating}</span>
//           <div className="flex gap-1">
//             {[...Array(5)].map((_, index) => (
//               <span
//                 key={index}
//                 className={
//                   index < Math.floor(schoolProfile.rating)
//                     ? 'text-yellow-500'
//                     : 'text-gray-300'
//                 }
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Donor Comments */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
//           <FaUser className="text-teal-500" /> Donor Comments
//         </h3>
//         <div>
//           {schoolProfile.donorComments.map((comment, index) => (
//             <div key={index} className="border-b py-3">
//               <p className="text-gray-600">{comment}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Save or Cancel Changes */}
//       {isEditing && (
//         <div className="flex gap-4 mt-4">
//           <button
//             onClick={handleSaveChanges}
//             className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={handleCancelChanges}
//             className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;


























import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaSchool,
  FaEdit,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaStar,
  FaClipboardList,
  FaGlobe,
  FaChalkboardTeacher,
  FaUsers,
  FaBus,
  FaGraduationCap,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schoolProfile, setSchoolProfile] = useState({
    schoolName: '',
    email: '',
    contactNo: '',
    address: '',
    schoolType: '',
    principalName: '',
    noOfStudents: 0,
    noOfStaff: 0,
    courses: [],
    languages: [],
    studentTeacherRatio: '',
    tuitionAndFees: '',
    additionalFacilities: '',
    transportAvailability: false,
    scholarshipsOrFinancialAssistance: false,
    website: '',
  });

  // Fetch school data
  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}school/${id}`
        );
        const data = await response.json();

        if (data.success) {
          setSchoolProfile(data.school);
        } else {
          throw new Error('Failed to fetch school data');
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchoolData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSchoolProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setSchoolProfile((prev) => ({
      ...prev,
      [field]: value.split(',').map((item) => item.trim()),
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/school/update/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(schoolProfile),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('School profile updated successfully!');
        setIsEditing(false);
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
    // Refetch original data
    fetch(`http://localhost:3000/school/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSchoolProfile(data.school);
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 bg-white p-6 rounded-xl shadow-sm">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <FaSchool className="text-blue-500 text-4xl" />
            </div>
          </div>

          <div className="flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {isEditing ? (
                <input
                  type="text"
                  name="schoolName"
                  value={schoolProfile.schoolName}
                  onChange={handleChange}
                  className="p-2 border rounded-lg w-full md:w-2/3 text-2xl font-bold"
                />
              ) : (
                schoolProfile.schoolName
              )}
            </h1>
            <div className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center text-gray-600">
                <FaEnvelope className="mr-2" /> {schoolProfile.email}
              </span>
              <span className="flex items-center text-gray-600">
                <FaPhoneAlt className="mr-2" /> {schoolProfile.contactNo}
              </span>
              <span className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" /> {schoolProfile.address}
              </span>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-800">
                <FaClipboardList className="text-blue-500" /> Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Type
                  </label>
                  {isEditing ? (
                    <select
                      name="schoolType"
                      value={schoolProfile.schoolType}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    >
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                      <option value="charter">Charter</option>
                    </select>
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.schoolType}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Principal
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="principalName"
                      value={schoolProfile.principalName}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.principalName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={schoolProfile.website}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <a
                      href={schoolProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-blue-600 hover:underline inline-block"
                    >
                      {schoolProfile.website}
                    </a>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student-Teacher Ratio
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="studentTeacherRatio"
                      value={schoolProfile.studentTeacherRatio}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.studentTeacherRatio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Courses & Languages */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-800">
                <FaGraduationCap className="text-green-500" /> Academic
                Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Courses Offered
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={schoolProfile.courses.join(', ')}
                      onChange={(e) => handleArrayChange(e, 'courses')}
                      placeholder="Math, Science, English"
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 p-2">
                      {schoolProfile.courses.map((course, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Languages
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={schoolProfile.languages.join(', ')}
                      onChange={(e) => handleArrayChange(e, 'languages')}
                      placeholder="English, Spanish"
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2 p-2">
                      {schoolProfile.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-800">
                <FaSchool className="text-purple-500" /> Facilities
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Facilities
                  </label>
                  {isEditing ? (
                    <textarea
                      name="additionalFacilities"
                      value={schoolProfile.additionalFacilities}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full h-24"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.additionalFacilities}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="transportAvailability"
                          checked={schoolProfile.transportAvailability}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="sr-only"
                        />
                        <div
                          className={`block w-10 h-6 rounded-full ${
                            schoolProfile.transportAvailability
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                            schoolProfile.transportAvailability
                              ? 'transform translate-x-4'
                              : ''
                          }`}
                        ></div>
                      </div>
                      <div className="ml-3 text-gray-700 font-medium flex items-center">
                        <FaBus className="mr-2" /> Transport Available
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="scholarshipsOrFinancialAssistance"
                          checked={
                            schoolProfile.scholarshipsOrFinancialAssistance
                          }
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="sr-only"
                        />
                        <div
                          className={`block w-10 h-6 rounded-full ${
                            schoolProfile.scholarshipsOrFinancialAssistance
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                            schoolProfile.scholarshipsOrFinancialAssistance
                              ? 'transform translate-x-4'
                              : ''
                          }`}
                        ></div>
                      </div>
                      <div className="ml-3 text-gray-700 font-medium flex items-center">
                        <FaMoneyBillWave className="mr-2" /> Financial
                        Assistance
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Statistics */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-800">
                <FaUsers className="text-yellow-500" /> Statistics
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Students
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="noOfStudents"
                      value={schoolProfile.noOfStudents}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.noOfStudents}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Staff
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="noOfStaff"
                      value={schoolProfile.noOfStaff}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.noOfStaff}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tuition & Fees
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="tuitionAndFees"
                      value={schoolProfile.tuitionAndFees}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.tuitionAndFees}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-gray-800">
                <FaPhoneAlt className="text-red-500" /> Contact Information
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={schoolProfile.email}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="contactNo"
                      value={schoolProfile.contactNo}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.contactNo}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={schoolProfile.address}
                      onChange={handleChange}
                      className="p-2 border rounded-lg w-full h-20"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {schoolProfile.address}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleCancelChanges}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;