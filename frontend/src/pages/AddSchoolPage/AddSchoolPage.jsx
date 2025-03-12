import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const AddSchoolPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [ValidationError, setError] = useState(null);



    const validateStep = () => {
      let errors = [];

      if (step === 1) {
        if (!formData.schoolName) errors.push('School name is required');
        if (!formData.schoolType) errors.push('School type is required');
        if (!formData.address) errors.push('Address is required');
        if (!formData.contactNo) errors.push('Contact number is required');
        if (!formData.website) errors.push('Website is required');

      } else if (step === 2) {
        if (!formData.principalName)
          errors.push('Principal name is required');
        if (!formData.managementType)
          errors.push('Management type is required');
        if (!formData.noOfStudents)
          errors.push('Number of students is required');
        if (!formData.noOfStaff) errors.push('Number of staff is required');

      } else if (step === 3) {
        if (!formData.courses) errors.push('Courses are required');
        if (!formData.languages) errors.push('Languages are required');
        if (!formData.studentTeacherRatio)
          errors.push('Student-teacher ratio is required');
      }
      else if (step === 4) {
        if (!formData.tuitionAndFees) errors.push('Tuition and fees are required');
        if (!formData.scholarshipsOrFinancialAssistance) errors.push('Scholarships or financial assistance is required');
      }
      else if (step === 5) {
        if (!formData.additionalFacilities) errors.push('Additional facilities are required');
        if (!formData.transportAvailability) errors.push('Transport availability is required');
      }
      //  else {
      //   errors.push('Something went wrong!');
      // }

      if (errors.length > 0) {
        setError(errors[0]); // Show the first error in the list
        return false; // Prevent navigation
      }

      setError(null); // Clear errors if everything is fine
      return true; // Allow navigation
    };


      const nextStep = () => {
        // console.log(ValidationError);
        if (validateStep()) {
          // console.log('Error is here');
          setStep(step + 1);
          setError(null);
        }
      };

      // const nextStep = () => setStep(step + 1);
      const prevStep = () => setStep(step - 1);

      
  const [formData, setFormData] = useState({
    schoolName: '',
    schoolType: 'private',
    address: '',
    contactNo: '',
    website: '',
    principalName: '',
    managementType: 'trust',
    noOfStudents: '',
    noOfStaff: '',
    courses: [],
    languages: [],
    studentTeacherRatio: '',
    tuitionAndFees: '',
    additionalFacilities: '',
    transportAvailability: '',
    scholarshipsOrFinancialAssistance: '',
  });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // if (error) {
      //   setError(null);
      // }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
    };

  

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
            Basic Information
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Name
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter school name"
            onChange={handleChange}
            name="schoolName"
            value={formData.schoolName}
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Type (e.g., Private, Government)
          </label>
          <select
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            name="schoolType"
            value={formData.schoolType}
          >
            {/* <option value="">Select school type</option> */}
            <option value="private">Private</option>
            <option value="government">Public</option>
            <option value="international">Semi Private</option>
            <option value="other">Other</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address (City, Province, Postal Code)
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter address"
            onChange={handleChange}
            name="address"
            value={formData.address}
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 0300-1234567, example@example.com"
            onChange={handleChange}
            name="contactNo"
            value={formData.contactNo}
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <input
            type="url"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://www.schoolwebsite.com"
            onChange={handleChange}
            name="website"
            value={formData.website}
          />
          {ValidationError && <p className="text-red-500">{ValidationError}</p>}

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
            Administration
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Principal’s Name & Contact
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter principal's name and contact"
            onChange={handleChange}
            name="principalName"
            value={formData.principalName}
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Management Type (e.g., Trust, Private)
          </label>
          <select
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            name="managementType"
            value={formData.managementType}
          >
            {/* <option value="">Select management type</option> */}
            <option value="trust">Trust</option>
            <option value="private">Private</option>
            <option value="corporate">Corporate</option>
            <option value="non-profit">Non-profit</option>
            <option value="other">Other</option>
          </select>

          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Students
              </label>
              <input
                type="number"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of students"
                onChange={handleChange}
                name="noOfStudents"
                value={formData.noOfStudents}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Staff
              </label>
              <input
                type="number"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of staff"
                onChange={handleChange}
                name="noOfStaff"
                value={formData.noOfStaff}
              />
            </div>
          </div>
          {ValidationError && <p className="text-red-500">{ValidationError}</p>}

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
            Academic Details
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subjects/Courses
            </label>
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subjects or courses"
              rows="3"
              onChange={handleChange}
              name="courses"
              value={formData.courses}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages of Instruction
            </label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              name="languages"
              value={formData.languages}
            >
              <option value="">Select language</option>
              <option value="English">English</option>
              <option value="Spanish">Urdu</option>
              <option value="French">Punjabi</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student-Teacher Ratio
            </label>
            <input
              type="number"
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter student-teacher ratio"
              onChange={handleChange}
              name="studentTeacherRatio"
              value={formData.studentTeacherRatio}
            />
          </div>
          {ValidationError && <p className="text-red-500">{ValidationError}</p>}

          <div className="flex justify-between">
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
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Financial Information
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tuition & Additional Fees
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter tuition and additional fees"
            onChange={handleChange}
            name="tuitionAndFees"
            value={formData.tuitionAndFees}
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scholarships or Financial Assistance
          </label>
          <textarea
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter details about scholarships or financial assistance"
            onChange={handleChange}
            name="scholarshipsOrFinancialAssistance"
            value={formData.scholarshipsOrFinancialAssistance}
          />
          {ValidationError && <p className="text-red-500">{ValidationError}</p>}

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

      {step === 5 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Infrastructure
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facilities Available
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Labs
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Playground
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Library
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Sports Complex
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Auditorium
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Cafeteria
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Facilities (if any)
            </label>
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter additional facilities"
              rows="3"
              onChange={handleChange}
              name="additionalFacilities"
              value={formData.additionalFacilities}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transport Availability
            </label>
            <select
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              name="transportAvailability"
              value={formData.transportAvailability}
            >
              <option value="">Select transport availability</option>
              <option value="School Buses">School Buses</option>
              <option value="Private Vans">Private Vans</option>
              <option value="Public Transport">Public Transport</option>
              <option value="No Transport Facility">
                No Transport Facility
              </option>
            </select>
          </div>
          {ValidationError && <p className="text-red-500">{ValidationError}</p>}

          <div className="flex justify-between">
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
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Documents
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Registration Certificate
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accreditation Documents
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Principal’s Identity Proof
          </label>
          <input
            type="file"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {ValidationError && <p className="text-red-500">{ValidationError}</p>}

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

      {step === 7 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Agreement
          </h2>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Terms & Conditions Acceptance
          </label>
          <input type="checkbox" className="mr-2" />I agree to the terms and
          conditions.
          <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
            Privacy Policy Consent
          </label>
          <input type="checkbox" className="mr-2" />I consent to the privacy
          policy.
          {ValidationError && <p className="text-red-500">{ValidationError}</p>}
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-6 rounded-md mr-4 hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
          <button
            // onClick={nextStep}
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSchoolPage;
