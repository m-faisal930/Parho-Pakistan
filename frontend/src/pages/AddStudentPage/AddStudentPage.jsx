import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-light shadow-xl rounded-lg">
            {/* Back Arrow Button */}
            <button
              onClick={() => navigate('/dashboard')}
              className="absolute top-8 left-8 text-lg focus:outline-none"
            >
              <FaArrowLeft className="text-2xl hover:opacity-80 transition-opacity" />
            </button>
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Personal Information
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter full name"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth (DD/MM/YYYY)
          </label>
          <input
            type="date"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture (Upload Image)
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@example.com"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 0300-1234567"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNIC/B-Form Number (if applicable)
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 12345-6789012-3"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guardian's Name
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Guardian's Name"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guardian's Contact Number
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 0300-9876543"
          />

          <button
            onClick={nextStep}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Educational Information
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current School Name
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter school name"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Grade/Class
          </label>
          <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Grade 1</option>
            <option>Grade 2</option>
            <option>Grade 3</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Address
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter school address"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Previous Academic Records (Upload Report Cards)
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Areas of Interest (e.g., Science, Arts, Sports)
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter areas of interest"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Career Aspiration (e.g., Doctor, Engineer, Artist)
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter career aspirations"
          />

          <button
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-6 rounded-md mr-4 hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Financial Information
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Family Income
          </label>
          <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Less than 20,000</option>
            <option>20,000-50,000</option>
            <option>Above 50,000</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Dependents in the Family
          </label>
          <input
            type="number"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of dependents"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any Existing Scholarships
          </label>
          <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Yes</option>
            <option>No</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount of Financial Assistance Needed
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose of Funding
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the purpose"
          />

          <button
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-6 rounded-md mr-4 hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Next
          </button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Supporting Documents
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student ID Card / B-Form
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recent Passport-Sized Photograph
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Income Proof (if available)
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Recommendation Letter (if available)
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-6 rounded-md mr-4 hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
          <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStudentForm;
