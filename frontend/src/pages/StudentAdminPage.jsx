// import { useState, useEffect } from 'react';
// import {
//   FaUserEdit,
//   FaDonate,
//   FaHistory,
//   FaUpload,
//   FaCheckCircle,
// } from 'react-icons/fa';
// import { RiProfileLine } from 'react-icons/ri';
// import { motion } from 'framer-motion';
// import NavBar from '../components/NavBar';
// import Footer from '../components/Footer';

// const StudentAdminPage = () => {
//   // Static student data (would normally come from backend)
//   const [student, setStudent] = useState({
//     _id: '681479a72964d9b1a833c4f9',
//     fullName: 'Ali Ahmed',
//     dateOfBirth: '2005-05-15',
//     gender: 'Male',
//     profilePicture: '',
//     email: 'ali.ahmed@gmail.com',
//     contactNumber: '03001234567',
//     currentSchool: 'Government High School',
//     currentGrade: 'Grade 10',
//     schoolAddress: 'Lahore, Pakistan',
//     areasOfInterest: 'Mathematics, Science',
//     careerAspiration: 'Become an engineer',
//     monthlyFamilyIncome: 'Less than 20,000',
//     dependentsCount: 6,
//     existingScholarship: true,
//     fundingAmount: '2000',
//   });

//   // Mock sponsorship data
//   const [sponsorships, setSponsorships] = useState([
//     {
//       id: 1,
//       name: 'Asif Khan',
//       amount: 5000,
//       date: '2023-06-15',
//       message: 'Wishing you success in your studies!',
//     },
//     {
//       id: 2,
//       name: 'Fatima Malik',
//       amount: 3000,
//       date: '2023-05-20',
//       message: 'Keep up the good work!',
//     },
//     {
//       id: 3,
//       name: 'Zahid Ahmed',
//       amount: 2000,
//       date: '2023-04-10',
//       message: 'Happy to support your education',
//     },
//   ]);

//   const [activeTab, setActiveTab] = useState('profile');
//   const [profilePic, setProfilePic] = useState(student.profilePicture);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({ ...student });

//   const calculateTotalDonations = () => {
//     return sponsorships.reduce((total, sponsor) => total + sponsor.amount, 0);
//   };

//   const handleProfilePicChange = (e) => {
//     // In a real app, this would upload to a server
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result);
//         setUploadSuccess(true);
//         setTimeout(() => setUploadSuccess(false), 3000);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSaveChanges = () => {
//     setStudent(editData);
//     setIsEditing(false);
//     // In real app, would send to backend here
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen mt-5">
//       <NavBar />

//       <div className="container mx-auto px-4 py-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
//         >
//           {/* Student Header */}
//           <div className="bg-blue-600 p-6 text-white">
//             <div className="flex flex-col md:flex-row items-center">
//               <div className="relative mb-4 md:mb-0 md:mr-6">
//                 <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
//                   {profilePic ? (
//                     <img
//                       src={profilePic}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <RiProfileLine className="text-blue-600 text-4xl" />
//                   )}
//                 </div>
//                 <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
//                   <FaUpload className="text-blue-600" />
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleProfilePicChange}
//                   />
//                 </label>
//                 {uploadSuccess && (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center"
//                   >
//                     <FaCheckCircle className="mr-1" />
//                     Updated
//                   </motion.div>
//                 )}
//               </div>

//               <div>
//                 <h1 className="text-2xl font-bold">{student.fullName}</h1>
//                 <p className="opacity-90">{student.currentGrade} Student</p>
//                 <p className="mt-2 flex items-center">
//                   <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
//                     Total Received: Rs.{' '}
//                     {calculateTotalDonations().toLocaleString()}
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="border-b border-gray-200">
//             <nav className="flex">
//               <button
//                 onClick={() => setActiveTab('profile')}
//                 className={`py-4 px-6 text-center border-b-2 font-medium ${
//                   activeTab === 'profile'
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center justify-center">
//                   <RiProfileLine className="mr-2" />
//                   My Profile
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab('sponsors')}
//                 className={`py-4 px-6 text-center border-b-2 font-medium ${
//                   activeTab === 'sponsors'
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center justify-center">
//                   <FaDonate className="mr-2" />
//                   My Sponsors
//                 </div>
//               </button>
//               <button
//                 onClick={() => setActiveTab('history')}
//                 className={`py-4 px-6 text-center border-b-2 font-medium ${
//                   activeTab === 'history'
//                     ? 'border-blue-600 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 <div className="flex items-center justify-center">
//                   <FaHistory className="mr-2" />
//                   Payment History
//                 </div>
//               </button>
//             </nav>
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
//             {activeTab === 'profile' && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-xl font-bold text-gray-800">
//                     Profile Information
//                   </h2>
//                   {isEditing ? (
//                     <div className="space-x-2">
//                       <button
//                         onClick={() => setIsEditing(false)}
//                         className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         onClick={handleSaveChanges}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                       >
//                         Save Changes
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
//                     >
//                       <FaUserEdit className="mr-2" />
//                       Edit Profile
//                     </button>
//                   )}
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                       Personal Details
//                     </h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                           Full Name
//                         </label>
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             name="fullName"
//                             value={editData.fullName}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           />
//                         ) : (
//                           <p className="px-3 py-2 bg-gray-50 rounded-md">
//                             {student.fullName}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                           Date of Birth
//                         </label>
//                         {isEditing ? (
//                           <input
//                             type="date"
//                             name="dateOfBirth"
//                             value={editData.dateOfBirth}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           />
//                         ) : (
//                           <p className="px-3 py-2 bg-gray-50 rounded-md">
//                             {student.dateOfBirth}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                           Gender
//                         </label>
//                         {isEditing ? (
//                           <select
//                             name="gender"
//                             value={editData.gender}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           >
//                             <option value="Male">Male</option>
//                             <option value="Female">Female</option>
//                             <option value="Other">Other</option>
//                           </select>
//                         ) : (
//                           <p className="px-3 py-2 bg-gray-50 rounded-md">
//                             {student.gender}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                       Education Details
//                     </h3>
//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                           Current School
//                         </label>
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             name="currentSchool"
//                             value={editData.currentSchool}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           />
//                         ) : (
//                           <p className="px-3 py-2 bg-gray-50 rounded-md">
//                             {student.currentSchool}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                           Current Grade
//                         </label>
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             name="currentGrade"
//                             value={editData.currentGrade}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           />
//                         ) : (
//                           <p className="px-3 py-2 bg-gray-50 rounded-md">
//                             {student.currentGrade}
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                           School Address
//                         </label>
//                         {isEditing ? (
//                           <input
//                             type="text"
//                             name="schoolAddress"
//                             value={editData.schoolAddress}
//                             onChange={handleInputChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           />
//                         ) : (
//                           <p className="px-3 py-2 bg-gray-50 rounded-md">
//                             {student.schoolAddress}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                     Additional Information
//                   </h3>
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-600 mb-1">
//                         Areas of Interest
//                       </label>
//                       {isEditing ? (
//                         <textarea
//                           name="areasOfInterest"
//                           value={editData.areasOfInterest}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           rows="3"
//                         />
//                       ) : (
//                         <p className="px-3 py-2 bg-gray-50 rounded-md">
//                           {student.areasOfInterest}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-600 mb-1">
//                         Career Aspiration
//                       </label>
//                       {isEditing ? (
//                         <textarea
//                           name="careerAspiration"
//                           value={editData.careerAspiration}
//                           onChange={handleInputChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           rows="3"
//                         />
//                       ) : (
//                         <p className="px-3 py-2 bg-gray-50 rounded-md">
//                           {student.careerAspiration}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {activeTab === 'sponsors' && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h2 className="text-xl font-bold text-gray-800 mb-6">
//                   My Sponsors
//                 </h2>

//                 {sponsorships.length > 0 ? (
//                   <div className="space-y-4">
//                     {sponsorships.map((sponsor) => (
//                       <motion.div
//                         key={sponsor.id}
//                         whileHover={{ scale: 1.02 }}
//                         className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex items-start">
//                           <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
//                             <FaDonate className="text-xl" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                               <h3 className="font-bold text-gray-800">
//                                 {sponsor.name}
//                               </h3>
//                               <span className="text-sm text-gray-500">
//                                 {sponsor.date}
//                               </span>
//                             </div>
//                             <p className="text-gray-600 mt-1">
//                               {sponsor.message}
//                             </p>
//                             <div className="mt-2">
//                               <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//                                 Rs. {sponsor.amount.toLocaleString()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-12 bg-gray-50 rounded-lg">
//                     <FaDonate className="text-5xl text-gray-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-600">
//                       No sponsors yet
//                     </h3>
//                     <p className="text-gray-500 mt-1">
//                       Your profile is visible to potential sponsors
//                     </p>
//                   </div>
//                 )}
//               </motion.div>
//             )}

//             {activeTab === 'history' && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h2 className="text-xl font-bold text-gray-800 mb-6">
//                   Payment History
//                 </h2>

//                 <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
//                   <div className="grid grid-cols-4 bg-gray-100 p-3 font-medium text-gray-700">
//                     <div>Date</div>
//                     <div>Sponsor</div>
//                     <div>Amount</div>
//                     <div>Status</div>
//                   </div>

//                   {sponsorships.length > 0 ? (
//                     sponsorships.map((sponsor) => (
//                       <div
//                         key={sponsor.id}
//                         className="grid grid-cols-4 p-3 border-b border-gray-200 last:border-0 hover:bg-gray-50"
//                       >
//                         <div>{sponsor.date}</div>
//                         <div>{sponsor.name}</div>
//                         <div>Rs. {sponsor.amount.toLocaleString()}</div>
//                         <div>
//                           <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                             Received
//                           </span>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="p-6 text-center text-gray-500">
//                       No payment history available
//                     </div>
//                   )}
//                 </div>

//                 <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//                   <h3 className="font-medium text-blue-800 mb-2">
//                     Total Received
//                   </h3>
//                   <p className="text-2xl font-bold text-blue-600">
//                     Rs. {calculateTotalDonations().toLocaleString()}
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </motion.div>

//         {/* Help Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="bg-white rounded-xl shadow-md p-6"
//         >
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h2>
//           <p className="text-gray-600 mb-4">
//             If you're having trouble using this portal or have any questions
//             about your sponsorship, please contact our support team.
//           </p>
//           <div className="space-y-2">
//             <p className="flex items-center text-gray-700">
//               <span className="font-medium mr-2">Email:</span>{' '}
//               support@educationfund.org
//             </p>
//             <p className="flex items-center text-gray-700">
//               <span className="font-medium mr-2">Phone:</span> 0800-12345 (Toll
//               Free)
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default StudentAdminPage;













import { useState, useEffect } from 'react';
import {
  FaUserEdit,
  FaDonate,
  FaHistory,
  FaUpload,
  FaCheckCircle,
} from 'react-icons/fa';
import { RiProfileLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentAdminPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock sponsorship data (keeping this as is since you mentioned not to change these tabs)
  const [sponsorships, setSponsorships] = useState([
    {
      id: 1,
      name: 'Asif Khan',
      amount: 5000,
      date: '2023-06-15',
      message: 'Wishing you success in your studies!',
    },
    {
      id: 2,
      name: 'Fatima Malik',
      amount: 3000,
      date: '2023-05-20',
      message: 'Keep up the good work!',
    },
    {
      id: 3,
      name: 'Zahid Ahmed',
      amount: 2000,
      date: '2023-04-10',
      message: 'Happy to support your education',
    },
  ]);

  const [activeTab, setActiveTab] = useState('profile');
  const [profilePic, setProfilePic] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}student/profile/${id}`
        );
        const studentData = response.data.data;
        
        setStudent(studentData);
        setProfilePic(studentData.passportPhoto || '');
        setEditData({
          fullName: studentData.fullName,
          dateOfBirth: studentData.dateOfBirth.split('T')[0],
          gender: studentData.gender,
          email: studentData.email,
          contactNumber: studentData.contactNumber,
          currentSchool: studentData.currentSchool,
          currentGrade: studentData.currentGrade,
          schoolAddress: studentData.schoolAddress,
          areasOfInterest: studentData.areasOfInterest,
          careerAspiration: studentData.careerAspiration,
          monthlyFamilyIncome: studentData.monthlyFamilyIncome,
          dependentsCount: studentData.dependentsCount,
          existingScholarship: studentData.existingScholarship,
          fundingAmount: studentData.fundingAmount,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching student data:', err);
      }
    };

    fetchStudentData();
  }, [id]);

  const calculateTotalDonations = () => {
    return sponsorships.reduce((total, sponsor) => total + sponsor.amount, 0);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Prepare the data to send to the API
      const updatedData = {
        fullName: editData.fullName,
        dateOfBirth: editData.dateOfBirth,
        gender: editData.gender,
        email: editData.email,
        contactNumber: editData.contactNumber,
        currentSchool: editData.currentSchool,
        currentGrade: editData.currentGrade,
        schoolAddress: editData.schoolAddress,
        areasOfInterest: editData.areasOfInterest,
        careerAspiration: editData.careerAspiration,
        monthlyFamilyIncome: editData.monthlyFamilyIncome,
        dependentsCount: editData.dependentsCount,
        existingScholarship: editData.existingScholarship,
        fundingAmount: editData.fundingAmount,
      };

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}student/update/${id}`,
        updatedData
      );
      
      // Update local state with the new data
      setStudent(prev => ({
        ...prev,
        ...updatedData
      }));
      
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating student data:', err);
      // Handle error (you might want to show a notification to the user)
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error loading student data: {error}</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>No student data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen mt-5">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md overflow-hidden mb-8"
        >
          {/* Student Header */}
          <div className="bg-blue-600 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <RiProfileLine className="text-blue-600 text-4xl" />
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                  <FaUpload className="text-blue-600" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                  />
                </label>
                {uploadSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center"
                  >
                    <FaCheckCircle className="mr-1" />
                    Updated
                  </motion.div>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold">{student.fullName}</h1>
                <p className="opacity-90">{student.currentGrade} Student</p>
                <p className="mt-2 flex items-center">
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    Total Received: Rs.{' '}
                    {calculateTotalDonations().toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium ${
                  activeTab === 'profile'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center">
                  <RiProfileLine className="mr-2" />
                  My Profile
                </div>
              </button>
              <button
                onClick={() => setActiveTab('sponsors')}
                className={`py-4 px-6 text-center border-b-2 font-medium ${
                  activeTab === 'sponsors'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center">
                  <FaDonate className="mr-2" />
                  My Sponsors
                </div>
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-6 text-center border-b-2 font-medium ${
                  activeTab === 'history'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center">
                  <FaHistory className="mr-2" />
                  Payment History
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Profile Information
                  </h2>
                  {isEditing ? (
                    <div className="space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <FaUserEdit className="mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Personal Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="fullName"
                            value={editData.fullName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {student.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Date of Birth
                        </label>
                        {isEditing ? (
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={editData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {new Date(student.dateOfBirth).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Gender
                        </label>
                        {isEditing ? (
                          <select
                            name="gender"
                            value={editData.gender}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {student.gender}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {student.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Contact Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="contactNumber"
                            value={editData.contactNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {student.contactNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      Education Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Current School
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="currentSchool"
                            value={editData.currentSchool}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {student.currentSchool}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Current Grade
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="currentGrade"
                            value={editData.currentGrade}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {student.currentGrade}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          School Address
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="schoolAddress"
                            value={editData.schoolAddress}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          />
                        ) : (
                          <p className="px-3 py-2 bg-gray-50 rounded-md">
                            {student.schoolAddress}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Additional Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Areas of Interest
                      </label>
                      {isEditing ? (
                        <textarea
                          name="areasOfInterest"
                          value={editData.areasOfInterest}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows="3"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-md">
                          {student.areasOfInterest}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Career Aspiration
                      </label>
                      {isEditing ? (
                        <textarea
                          name="careerAspiration"
                          value={editData.careerAspiration}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows="3"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-md">
                          {student.careerAspiration}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Monthly Family Income
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="monthlyFamilyIncome"
                          value={editData.monthlyFamilyIncome}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-md">
                          Rs. {student.monthlyFamilyIncome}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Dependents Count
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="dependentsCount"
                          value={editData.dependentsCount}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <p className="px-3 py-2 bg-gray-50 rounded-md">
                          {student.dependentsCount}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Existing Scholarship
                    </label>
                    {isEditing ? (
                      <select
                        name="existingScholarship"
                        value={editData.existingScholarship}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-md">
                        {student.existingScholarship ? 'Yes' : 'No'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Funding Amount
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fundingAmount"
                        value={editData.fundingAmount}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 rounded-md">
                        Rs. {student.fundingAmount}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Rest of the tabs (sponsors and history) remain unchanged */}
            {activeTab === 'sponsors' && (
              // ... (keep the existing sponsors tab content)
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  My Sponsors
                </h2>

                {sponsorships.length > 0 ? (
                  <div className="space-y-4">
                    {sponsorships.map((sponsor) => (
                      <motion.div
                        key={sponsor.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start">
                          <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                            <FaDonate className="text-xl" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h3 className="font-bold text-gray-800">
                                {sponsor.name}
                              </h3>
                              <span className="text-sm text-gray-500">
                                {sponsor.date}
                              </span>
                            </div>
                            <p className="text-gray-600 mt-1">
                              {sponsor.message}
                            </p>
                            <div className="mt-2">
                              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                Rs. {sponsor.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FaDonate className="text-5xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">
                      No sponsors yet
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Your profile is visible to potential sponsors
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'history' && (
              // ... (keep the existing history tab content)
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Payment History
                </h2>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 bg-gray-100 p-3 font-medium text-gray-700">
                    <div>Date</div>
                    <div>Sponsor</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>

                  {sponsorships.length > 0 ? (
                    sponsorships.map((sponsor) => (
                      <div
                        key={sponsor.id}
                        className="grid grid-cols-4 p-3 border-b border-gray-200 last:border-0 hover:bg-gray-50"
                      >
                        <div>{sponsor.date}</div>
                        <div>{sponsor.name}</div>
                        <div>Rs. {sponsor.amount.toLocaleString()}</div>
                        <div>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Received
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No payment history available
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">
                    Total Received
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    Rs. {calculateTotalDonations().toLocaleString()}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you're having trouble using this portal or have any questions
            about your sponsorship, please contact our support team.
          </p>
          <div className="space-y-2">
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">Email:</span>{' '}
              support@educationfund.org
            </p>
            <p className="flex items-center text-gray-700">
              <span className="font-medium mr-2">Phone:</span> 0800-12345 (Toll
              Free)
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentAdminPage;