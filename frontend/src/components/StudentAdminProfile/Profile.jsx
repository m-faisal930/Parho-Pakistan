// import React from 'react';

// const Profile = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-4xl bg-white p-6 md:p-10 font-normal leading-relaxed text-gray-900 shadow-xl rounded-2xl">
//         <div className="flex flex-col">
//           <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
//             <h2 className="mb-5 text-4xl font-bold text-blue-900">
//               Update Profile
//             </h2>
//             <div className="text-center">
//               <div>
//                 <img
//                   src="https://i.pravatar.cc/300"
//                   alt="Profile Picture"
//                   className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
//                 />
//                 <input
//                   type="file"
//                   name="profile"
//                   id="upload_profile"
//                   hidden
//                   required
//                 />
//                 <label
//                   htmlFor="upload_profile"
//                   className="inline-flex items-center cursor-pointer"
//                 >
//                   <svg
//                     className="w-5 h-5 text-blue-700"
//                     fill="none"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
//                     ></path>
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
//                     ></path>
//                   </svg>
//                 </label>
//               </div>
//               <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300">
//                 Change Profile Picture
//               </button>
//             </div>
//           </div>
//           <form className="space-y-4">
//             <div>
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 defaultValue="John Doe"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="title"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 defaultValue="Software Developer"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="organization"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Organization
//               </label>
//               <input
//                 type="text"
//                 id="organization"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 defaultValue="Estep Bilişim"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 defaultValue="john.doe@example.com"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="phone"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Phone
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 defaultValue="+1 (555) 123-4567"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="location"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Location
//               </label>
//               <input
//                 type="text"
//                 id="location"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                 defaultValue="San Francisco, CA"
//               />
//             </div>
//             <div className="flex justify-end space-x-4">
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





































































import React from 'react';

const Profile = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
        {/* Profile Picture Update */}
        <div className="text-center mb-6">
          <img
            src="https://i.pravatar.cc/300"
            alt="Profile Picture"
            className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
          />
          <input
            type="file"
            name="profile"
            id="upload_profile"
            hidden
            required
          />
          <label
            htmlFor="upload_profile"
            className="inline-flex items-center cursor-pointer"
          >
            <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300">
              Change Profile Picture
            </button>
          </label>
        </div>

        {/* Personal Details Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Personal Details
          </h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Title"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Date of Birth"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Gender"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
        </div>

        {/* Educational Details Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Educational Details
          </h2>
          <input
            type="text"
            placeholder="Highest Qualification"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Institution"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Year of Graduation"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Specialization"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
        </div>

        {/* Financial Details Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Financial Details
          </h2>
          <input
            type="text"
            placeholder="Bank Name"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Account Number"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="IFSC Code"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Tax Identification Number"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
        </div>

        {/* Supporting Documents Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            Supporting Documents
          </h2>
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
