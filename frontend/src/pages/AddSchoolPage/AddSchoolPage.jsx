
import { useState } from 'react';
import {
  FaArrowLeft,
  FaCheck,
  FaSchool,
  FaChalkboardTeacher,
  FaBook,
  FaMoneyBillWave,
  FaBus,
  FaFileAlt,
  FaSignature,
} from 'react-icons/fa';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';

const AddSchoolPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [validationError, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [files, setFiles] = useState({
    registrationCert: '',
    accreditationDocs: '',
    principalIdProof: '',
  });
  const fileInputRefs = {
    registrationCert: useRef(),
    accreditationDocs: useRef(),
    principalIdProof: useRef(),
  };

  const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Hyderabad',
    'Peshawar',
    'Quetta',
    'Gujranwala',
    'Sialkot',
    'Bahawalpur',
    'Sargodha',
    'Sukkur',
    'Larkana',
    'Sheikhupura',
    'Rahim Yar Khan',
    'Jhang',
    'Gujrat',
    'Mardan',
  ];

  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

  const stepTitles = [
    { title: 'Basic Information', icon: <FaSchool className="mr-2" /> },
    { title: 'Administration', icon: <FaChalkboardTeacher className="mr-2" /> },
    { title: 'Academic Details', icon: <FaBook className="mr-2" /> },
    {
      title: 'Financial Information',
      icon: <FaMoneyBillWave className="mr-2" />,
    },
    { title: 'Infrastructure', icon: <FaBus className="mr-2" /> },
    { title: 'Documents', icon: <FaFileAlt className="mr-2" /> },
    { title: 'Agreement', icon: <FaSignature className="mr-2" /> },
  ];

  const validateStep = () => {
    let errors = [];

    if (step === 1) {
      if (!formData.schoolName) errors.push('School name is required');
      if (!formData.city) errors.push('City is required');
      if (!formData.contactNo) errors.push('Contact number is required');
      if (!formData.website) errors.push('Website is required');
    } else if (step === 2) {
      if (!formData.principalName) errors.push('Principal name is required');
      if (!formData.noOfStudents) errors.push('Number of students is required');
      if (!formData.noOfStaff) errors.push('Number of staff is required');
    } else if (step === 3) {
      if (!formData.courses) errors.push('Courses are required');
      if (!formData.languages) errors.push('Languages are required');
      if (!formData.studentTeacherRatio)
        errors.push('Student-teacher ratio is required');
    } else if (step === 4) {
      if (!formData.tuitionAndFees)
        errors.push('Tuition and fees are required');
    } else if (step === 5) {
      if (!formData.transportAvailability)
        errors.push('Transport availability is required');
    }

    if (errors.length > 0) {
      setError(errors[0]);
      return false;
    }

    setError(null);
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      setError(null);
    }
  };

  const prevStep = () => setStep(step - 1);

  const [formData, setFormData] = useState({
    schoolName: '',
    schoolType: 'private',
    city: '',
    contactNo: '',
    email: '',
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

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({
        ...prev,
        [fieldName]: e.target.files[0],
      }));
    }
  };

  const uploadFile = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (facility) => {
    setFormData((prev) => {
      const facilities = prev.additionalFacilities.split(',').filter((f) => f);
      const newFacilities = facilities.includes(facility)
        ? facilities.filter((f) => f !== facility)
        : [...facilities, facility];
      return {
        ...prev,
        additionalFacilities: newFacilities.join(','),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Upload files only if they exist
      const uploadPromises = [];
      if (files.registrationCert)
        uploadPromises.push(uploadFile(files.registrationCert));
      if (files.accreditationDocs)
        uploadPromises.push(uploadFile(files.accreditationDocs));
      if (files.principalIdProof)
        uploadPromises.push(uploadFile(files.principalIdProof));

      const [registrationCertUrl, accreditationDocsUrl, principalIdProofUrl] =
        await Promise.all(uploadPromises);

      // Prepare data with proper type conversions
      const submissionData = {
        schoolName: formData.schoolName.trim(),
        schoolType: formData.schoolType,
        city: formData.city.trim(),
        contactNo: formData.contactNo.trim(),
        email: formData.email.trim(),
        website: formData.website.trim(),
        principalName: formData.principalName.trim(),
        managementType: formData.managementType,
        noOfStudents: Number(formData.noOfStudents),
        noOfStaff: Number(formData.noOfStaff),
        courses: formData.courses
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item),
        languages: Array.isArray(formData.languages)
          ? formData.languages
          : [formData.languages].filter(Boolean),
        studentTeacherRatio: formData.studentTeacherRatio,
        tuitionAndFees: formData.tuitionAndFees || '',
        additionalFacilities: formData.additionalFacilities,
        transportAvailability: formData.transportAvailability,
        scholarshipsOrFinancialAssistance:
          formData.scholarshipsOrFinancialAssistance,
          registrationCert: registrationCertUrl || '',
          accreditationDocs: accreditationDocsUrl || '',
          principalIdProof: principalIdProofUrl || '',
      };

      const res = await axios.post(
        'http://localhost:3000/school/add',
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        toast.success('School Added Successfully!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
        setSubmitSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      let errorMessage = 'Failed to add school';

      if (error.response) {
        // Server responded with error
        errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          JSON.stringify(error.response.data);

        // Handle validation errors specifically
        if (error.response.status === 400 && error.response.data.errors) {
          errorMessage = error.response.data.errors
            .map((err) => `${err.path}: ${err.message}`)
            .join('\n');
        }
      } else if (error.request) {
        errorMessage = 'No response received from server';
      }

      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } finally {
      setIsSubmitting(false);
    }
  };




// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setError(null); // Clear previous errors

//   try {
//     // Upload all files in parallel
//     const uploadPromises = [
//       uploadFile(files.registrationCert),
//       uploadFile(files.accreditationDocs),
//       uploadFile(files.principalIdProof),
//     ];

//     const [registrationCertUrl, accreditationDocsUrl, principalIdProofUrl] =
//       await Promise.all(uploadPromises);

//     // Prepare final submission data
//     const submissionData = {
//       ...formData,
//       courses: formData.courses.split(',').map((item) => item.trim()),
//       languages: [formData.languages],
//       documents: {
//         registrationCert: registrationCertUrl,
//         accreditationDocs: accreditationDocsUrl,
//         principalIdProof: principalIdProofUrl,
//       },
//     };

//     // Make API request
//     const res = await axios.post(
//       'http://localhost:3000/school/add',
//       submissionData
//     );

//     // Only show success if we get a 2xx response
//     if (res.status >= 200 && res.status < 300) {
//       toast.success('School Added Successfully!', {
//         position: 'top-center',
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light',
//         transition: Bounce,
//       });

//       setSubmitSuccess(true);
//       setTimeout(() => navigate('/dashboard'), 2000);
//     } else {
//       throw new Error(res.data.message || 'Failed to add school');
//     }
//   } catch (error) {
//     console.error('Submission error:', error);
//     setError(error.message);
//     toast.error(error.message || 'Failed to add school', {
//       position: 'top-center',
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: 'light',
//     });
//   } finally {
//     setIsSubmitting(false); // This will always run
//   }
// };
  const stepVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  // Update your file input components
  const renderFileInput = (fieldName, label) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
        <div className="space-y-1 text-center">
          {files[fieldName] ? (
            <div className="text-sm text-gray-600">
              <p>{files[fieldName].name}</p>
              <button
                type="button"
                className="text-indigo-600 hover:text-indigo-500"
                onClick={() => {
                  setFiles((prev) => ({ ...prev, [fieldName]: null }));
                  fileInputRefs[fieldName].current.value = '';
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    ref={fileInputRefs[fieldName]}
                    className="sr-only"
                    onChange={(e) => handleFileChange(e, fieldName)}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Arrow Button */}
        <motion.button
          onClick={() => navigate('/dashboard')}
          className="absolute top-6 left-6 text-lg focus:outline-none z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="text-2xl text-indigo-600 hover:text-indigo-800 transition-colors" />
        </motion.button>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {stepTitles.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${
                    step > index + 1
                      ? 'bg-green-500 text-white'
                      : step === index + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }
                  transition-colors duration-300`}
                >
                  {step > index + 1 ? <FaCheck /> : index + 1}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    step === index + 1
                      ? 'font-semibold text-indigo-600'
                      : 'text-gray-500'
                  }`}
                >
                  {item.title.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 7) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          className="bg-white shadow-xl rounded-lg overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Form Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              {stepTitles[step - 1].icon}
              {stepTitles[step - 1].title}
            </h2>
            <p className="text-indigo-100 text-sm mt-1">Step {step} of 7</p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {validationError && (
                  <motion.div
                    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p>{validationError}</p>
                  </motion.div>
                )}

                {submitSuccess ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCheck className="text-green-500 text-3xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Submission Successful!
                      </h3>
                      <p className="text-gray-600">
                        Your school information has been submitted successfully.
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <>
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            School Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter school name"
                            onChange={handleChange}
                            name="schoolName"
                            value={formData.schoolName}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            School Type
                          </label>
                          <select
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            onChange={handleChange}
                            name="schoolType"
                            value={formData.schoolType}
                          >
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                            <option value="Semi Public">Semi Public</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City <span className="text-red-500">*</span>
                          </label>
                          <select
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Select City"
                            onChange={handleChange}
                            name="city"
                            value={formData.city}
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                            
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Number{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="e.g., 0300-1234567"
                            onChange={handleChange}
                            name="contactNo"
                            value={formData.contactNo}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="e.g., 0300-1234567"
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Website URL <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="url"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="https://www.schoolwebsite.com"
                            onChange={handleChange}
                            name="website"
                            value={formData.website}
                          />
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Principal's Name{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter principal's name"
                            onChange={handleChange}
                            name="principalName"
                            value={formData.principalName}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Management Type
                          </label>
                          <select
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            onChange={handleChange}
                            name="managementType"
                            value={formData.managementType}
                          >
                            <option value="trust">Trust</option>
                            <option value="private">Private</option>
                            <option value="government">government</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Number of Students{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                              placeholder="Enter number of students"
                              onChange={handleChange}
                              name="noOfStudents"
                              value={formData.noOfStudents}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Number of Staff{' '}
                              <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="number"
                              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                              placeholder="Enter number of staff"
                              onChange={handleChange}
                              name="noOfStaff"
                              value={formData.noOfStaff}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subjects/Courses{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter subjects or courses (comma separated)"
                            rows="3"
                            onChange={handleChange}
                            name="courses"
                            value={formData.courses}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Languages of Instruction{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            onChange={handleChange}
                            name="languages"
                            value={formData.languages}
                          >
                            <option value="">Select language</option>
                            <option value="English">English</option>
                            <option value="Urdu">Urdu</option>
                            <option value="Punjabi">Punjabi</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Student-Teacher Ratio{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="e.g., 20:1"
                            onChange={handleChange}
                            name="studentTeacherRatio"
                            value={formData.studentTeacherRatio}
                          />
                        </div>
                      </div>
                    )}

                    {step === 4 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tuition & Additional Fees{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter tuition and additional fees"
                            onChange={handleChange}
                            name="tuitionAndFees"
                            value={formData.tuitionAndFees}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Scholarships or Financial Assistance
                          </label>
                          <textarea
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter details about scholarships or financial assistance"
                            rows="3"
                            onChange={handleChange}
                            name="scholarshipsOrFinancialAssistance"
                            value={formData.scholarshipsOrFinancialAssistance}
                          />
                        </div>
                      </div>
                    )}

                    {step === 5 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facilities Available
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                              'Labs',
                              'Playground',
                              'Library',
                              'Sports Complex',
                              'Auditorium',
                              'Cafeteria',
                            ].map((facility) => (
                              <label
                                key={facility}
                                className="flex items-center space-x-3"
                              >
                                <input
                                  type="checkbox"
                                  className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 transition"
                                  checked={formData.additionalFacilities.includes(
                                    facility
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(facility)
                                  }
                                />
                                <span className="text-gray-700">
                                  {facility}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Facilities (if any)
                          </label>
                          <textarea
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="Enter additional facilities"
                            rows="3"
                            onChange={handleChange}
                            name="additionalFacilities"
                            value={formData.additionalFacilities}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Transport Availability{' '}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            onChange={handleChange}
                            name="transportAvailability"
                            value={formData.transportAvailability}
                          >
                            <option value="">
                              Select transport availability
                            </option>
                            <option value="School Buses">School Buses</option>
                            <option value="Private Vans">Private Vans</option>
                            <option value="Public Transport">
                              Public Transport
                            </option>
                            <option value="No Transport Facility">
                              No Transport Facility
                            </option>
                          </select>
                        </div>
                      </div>
                    )}

                    {step === 6 && (
                      <div className="space-y-6">
                        {renderFileInput(
                          'registrationCert',
                          'School Registration Certificate'
                        )}
                        {renderFileInput(
                          'accreditationDocs',
                          'Accreditation Documents'
                        )}
                        {renderFileInput(
                          'principalIdProof',
                          "Principal's Identity Proof"
                        )}
                      </div>
                    )}

                    {step === 7 && (
                      <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Terms & Conditions
                          </h3>
                          <p className="text-sm text-gray-600">
                            By submitting this form, you agree to our terms of
                            service and privacy policy. You confirm that all
                            information provided is accurate to the best of your
                            knowledge.
                          </p>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              name="terms"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="terms"
                              className="font-medium text-gray-700"
                            >
                              I agree to the terms and conditions{' '}
                              <span className="text-red-500">*</span>
                            </label>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="privacy"
                              name="privacy"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="privacy"
                              className="font-medium text-gray-700"
                            >
                              I consent to the privacy policy{' '}
                              <span className="text-red-500">*</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Form Navigation */}
            {!submitSuccess && (
              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <motion.button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                )}
                {step < 7 ? (
                  <motion.button
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="ml-auto px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddSchoolPage;