import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddStudentForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [ValidationError, setError] = useState(null);







  const validateStep = () => {
    let errors = [];

    if (step === 1) {
      if (!formData.name) errors.push('Full name is required');
      if (!formData.dob) errors.push('Date of birth is required');
      if (!formData.gender) errors.push('Gender is required');
      if (!formData.email) errors.push('Email is required');
      if (!formData.contactNumber) errors.push('Contact number is required');
      if (!formData.cnicOrBForm) errors.push('CNIC/B-Form is required');
        if (!formData.guardianName) errors.push('Guardian name is required');
      if (!formData.guardianContact)
        errors.push('Guardian contact is required');
    } else if (step === 2) {
      if (!formData.schoolName) errors.push('School name is required');
      if (!formData.grade) errors.push('Grade is required');
      if (!formData.schoolAddress) errors.push('School address is required');
      if (!formData.areaOfInterest) errors.push('Interests are required');
      if (!formData.careerAspirations)
        errors.push('Career aspiration is required');
    } 
    else if (step === 3) {
      if (!formData.monthIncome) errors.push('Monthly income is required');
      if (!formData.noOfDependents) errors.push('Number of dependents is required');
      if (!formData.existingScholarship) errors.push('Existing scholarship is required');
      if (!formData.amountNeeded) errors.push('Amount needed is required');
      if (!formData.purposeOfFunding) errors.push('Purpose of funding is required');
    }
    // else {
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
      setError(null)
    }
  };

  // const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    profilePic: '',
    email: '',
    contactNumber: '',
    gender: 'Male',
    cnicOrBForm: '',
    guardianName: '',
    guardianContact: '',
    schoolName: '',
    grade: 'Grade 1',
    schoolAddress: '',
    previousPerformance: '',
    areaOfInterest: '',
    careerAspirations: '',
    monthIncome: 'Less than 20,000',
    noOfDependents: '',
    existingScholarship: 'no',
    amountNeeded: '',
    purposeOfFunding: '',
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
  // console.log(formData);

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
            onChange={handleChange}
            name="name"
            value={formData.name}
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth (DD/MM/YYYY)
          </label>
          <input
            type="date"
            onChange={handleChange}
            name="dob"
            value={formData.dob}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="gender"
            onChange={handleChange}
            value={formData.gender}
          >
            {/* <option value="Male">Select Gender</option> Default empty option */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Picture (Upload Image)
          </label>
          <input
            type="file"
            onChange={handleChange}
            name="profilePic"
            value={formData.profilePic}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@example.com"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Number
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="contactNumber"
            value={formData.contactNumber}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 0300-1234567"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNIC/B-Form Number (if applicable)
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="cnicOrBForm"
            value={formData.cnicOrBForm}
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
            onChange={handleChange}
            name="guardianName"
            value={formData.guardianName}
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guardian's Contact Number
          </label>
          <input
            type="text"
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 0300-9876543"
            onChange={handleChange}
            name="guardianContact"
            value={formData.guardianContact}
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
            Educational Information
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current School Name
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="schoolName"
            value={formData.schoolName}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter school name"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Grade/Class
          </label>
          <select
            onChange={handleChange}
            name="grade"
            value={formData.grade}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            School Address
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="schoolAddress"
            value={formData.schoolAddress}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter school address"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Previous Academic Records (Upload Report Cards)
          </label>
          <input
            type="file"
            onChange={handleChange}
            name="previousPerformnace"
            value={formData.previousPerformance}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Areas of Interest (e.g., Science, Arts, Sports)
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="areaOfInterest"
            value={formData.areaOfInterest}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter areas of interest"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Career Aspiration (e.g., Doctor, Engineer, Artist)
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="careerAspirations"
            value={formData.careerAspirations}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter career aspirations"
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

      {step === 3 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Financial Information
          </h2>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Family Income
          </label>
          <select
            onChange={handleChange}
            name="monthIncome"
            value={formData.monthIncome}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value='Less than 20,000'>Less than 20,000</option>
            <option value='20,000-50,000'>20,000-50,000</option>
            <option value='Above 50,000'>Above 50,000</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Dependents in the Family
          </label>
          <input
            type="number"
            onChange={handleChange}
            name="noOfDependents"
            value={formData.noOfDependents}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of dependents"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any Existing Scholarships
          </label>
          <select
            onChange={handleChange}
            name="existingScholarship"
            value={formData.existingScholarship}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value='yes'>Yes</option>
            <option value='no'>No</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount of Financial Assistance Needed
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="amountNeeded"
            value={formData.amountNeeded}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose of Funding
          </label>
          <input
            type="text"
            onChange={handleChange}
            name="purposeOfFunding"
            value={formData.purposeOfFunding}
            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the purpose"
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
          {ValidationError && <p className="text-red-500">{ValidationError}</p>}

          <button
            onClick={prevStep}
            className="bg-gray-500 text-white py-2 px-6 rounded-md mr-4 hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
          <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
          
          onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddStudentForm;
